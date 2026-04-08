const axios = require('axios');
const fs = require('fs');

const ONESIGNAL_APP_ID = "791bfab7-3758-4426-b7ce-d2dba13d2f37";
const ONESIGNAL_REST_KEY = process.env.ONESIGNAL_REST_KEY;
const STATE_FILE = '.last_match_state.json';

async function sendNotification(title, message) {
  if (!ONESIGNAL_REST_KEY) {
    console.log("No REST KEY found, skipping notification:", title);
    return;
  }
  try {
    await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: ONESIGNAL_APP_ID,
      included_segments: ['All'],
      headings: { en: title, es: title },
      contents: { en: message, es: message }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${ONESIGNAL_REST_KEY}`
      }
    });
    console.log("Notification sent:", title);
  } catch (error) {
    console.error("Error sending notification:", error.response?.data || error.message);
  }
}

function parseScore(score) {
  if (!score) return [0, 0];
  const parts = score.split(/[\-\svs]+/).filter(p => !isNaN(parseInt(p)));
  if (parts.length < 2) return [0, 0];
  return [parseInt(parts[0]), parseInt(parts[1])];
}

async function run() {
  console.log("Checking for club updates (Matches, Results, and Schedule)...");
  
  // 1. Load Current Data
  const data = JSON.parse(fs.readFileSync('public/app_data.json', 'utf8'));
  
  // 2. Load Previous State
  let state = { masculino: {}, femenino: {}, seen_results: [], scheduled_matches: {} };
  if (fs.existsSync(STATE_FILE)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      // Migrating from old format if necessary
      if (!state.seen_results) state.seen_results = [];
      if (!state.scheduled_matches) state.scheduled_matches = {};
    } catch (e) {
      console.error("Error loading state, using defaults");
    }
  }

  // --- 3. Live Match Monitoring (Senior M/F) ---
  for (const cat of ['masculino', 'femenino']) {
    const matches = data.equipos?.[cat]?.matches;
    if (!matches || matches.length < 2) continue;
    
    const m = matches[1]; // Middle card
    const catTitle = cat === 'masculino' ? 'Sénior Masc.' : 'Sénior Fem.';
    const currentStatus = (m.status || "").toUpperCase().trim();
    const currentScore = m.score || "0 - 0";
    const prev = state[cat] || {};
    
    if (prev.status !== currentStatus && currentStatus !== "") {
      if (currentStatus === "EN XOGO") {
        const titleMsg = prev.status === "DESCANSO" ? `🔴 ${catTitle}: INICIO DA SEGUNDA METADE` : `🔴 ${catTitle}: ¡PARTIDO EN XOGO!`;
        const bodyMsg = prev.status === "DESCANSO" ? `Continúa o encontro: ${m.home} ${m.score} ${m.away}` : `Comeza o encontro: ${m.home} vs ${m.away}`;
        await sendNotification(titleMsg, bodyMsg);
      } else if (currentStatus === "DESCANSO") {
        await sendNotification(`⏸️ ${catTitle}: DESCANSO`, `Descanso: ${m.home} ${m.score} ${m.away}`);
      } else if (currentStatus === "FIN" || currentStatus === "FINALIZADO") {
        await sendNotification(`🏁 ${catTitle}: FINAL DO PARTIDO`, `Resultado final: ${m.home} ${m.score} ${m.away}`);
      }
    }

    if (prev.score !== currentScore && currentStatus === "EN XOGO" && prev.score) {
      const [prevHome, prevAway] = parseScore(prev.score);
      const [currHome, currAway] = parseScore(currentScore);
      const isHomeCercedense = m.home.toUpperCase().includes("CERCEDENSE");

      if (currHome > prevHome) {
        if (isHomeCercedense) {
          await sendNotification(`⚽🔴⚪ ${catTitle}: ¡¡¡GOOOOOL DO CERCEDENSE!!!`, `O marcador escala a: ${m.home} ${m.score} ${m.away}`);
        } else {
          await sendNotification(`⚽ ${catTitle}: Gol do ${m.home}.`, `Marcador actual: ${m.home} ${m.score} ${m.away}`);
        }
      } else if (currAway > prevAway) {
        if (!isHomeCercedense) {
          await sendNotification(`⚽🔴⚪ ${catTitle}: ¡¡¡GOOOOOL DO CERCEDENSE!!!`, `O marcador escala a: ${m.home} ${m.score} ${m.away}`);
        } else {
          await sendNotification(`⚽ ${catTitle}: Gol do ${m.away}.`, `Marcador actual: ${m.home} ${m.score} ${m.away}`);
        }
      }
    }
    state[cat] = { status: currentStatus, score: currentScore };
  }

  // --- 4. Results List Monitoring (All Club) ---
  const results = data.resultados?.lista || [];
  for (const r of results) {
    if (!state.seen_results.includes(r.id)) {
      await sendNotification(`📈 RESULTADO ACTUALIZADO: ${r.category}`, `${r.home} ${r.score} ${r.away}`);
      state.seen_results.push(r.id);
    }
  }
  // Keep only the last 100 results to avoid state file bloat
  if (state.seen_results.length > 100) state.seen_results = state.seen_results.slice(-100);

  // --- 5. Upcoming Matches Monitoring (Schedule) ---
  const upcoming = data.partidos?.proximos || [];
  for (const p of upcoming) {
    const prevSched = state.scheduled_matches[p.id] || {};
    const isNew = !state.scheduled_matches[p.id];
    const timeChanged = p.time !== prevSched.time || p.date !== prevSched.date;
    const isFixed = p.time && !p.time.toUpperCase().includes("POR DETERMINAR") && !p.time.toUpperCase().includes("DESCANSA");

    if ((isNew || timeChanged) && isFixed) {
      await sendNotification(`📅 XORNADA FIXADA: ${p.category}`, `${p.home} vs ${p.away} - ${p.date} ás ${p.time}`);
    }
    state.scheduled_matches[p.id] = { date: p.date, time: p.time };
  }

  // 6. Save State
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  console.log("Club update check complete.");
}

run().catch(console.error);
