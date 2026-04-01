import { AppData } from "./dataService";

export const INITIAL_DATA: AppData = {
  masculino: {
    posicion: "3ª POSICIÓN",
    matches: [
      { title: "XORNADA ANTERIOR", date: "MAR 22", home: "CERCEDENSE", away: "BOIRO", score: "3 - 0", venue: "CAMPO O ROXO" },
      { title: "ESTA XORNADA", date: "MAR 29", home: "CERCEDENSE", away: "DESCANSO", score: "-", venue: "-", status: "DESCANSO" },
      { title: "PRÓXIMO", date: "POR DEFINIR", home: "ORDES CF", away: "CERCEDENSE", score: "POR DEFINIR", venue: "CAMPO DEP. ORDES" }
    ],
    standings: [
      { pos: 1, team: "VISANTOÑA C.F.", pts: 58, pj: 24 },
      { pos: 2, team: "S.D.C. TEIXEIRO", pts: 58, pj: 24 },
      { pos: 3, team: "ATLÉTICO CERCEDENSE", pts: 54, pj: 24, highlighted: true },
      { pos: 4, team: "BERGANTIÑOS C.F. 'B'", pts: 51, pj: 24 },
      { pos: 5, team: "C.D. X. ARANGA", pts: 42, pj: 24 }
    ],
    externalUrl: "https://futgal.es/pnfg/NPcd/NFG_VisClasificacion?cod_primaria=1000120&codgrupo=24967593&codcompeticion=24123231&codjornada=&codtemporada=21",
    socialPost: {
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
      caption: "¡Semana de derbi! El equipo se prepara para asaltar el liderato. Mañana nos vemos en O Roxo. 🏟️🔥",
      postUrl: "https://www.instagram.com/clubatleticocercedense/",
      date: "HARE 2 HORAS"
    }
  },
  femenino: {
    posicion: "1ª POSICIÓN - LÍDERES",
    matches: [
      { title: "XORNADA ANTERIOR", date: "MAR 15", home: "CERCEDENSE", away: "SP. MEICENDE", score: "3 - 3", venue: "CAMPO O ROXO" },
      { title: "ESTA XORNADA", date: "MAR 22", home: "AD CULLEREDO", away: "CERCEDENSE", score: "1 - 8", venue: "CAMPO ALEGRET" },
      { title: "PRÓXIMO", date: "POR DEFINIR", home: "CERCEDENSE", away: "C.C.D. CURTIS", score: "POR DEFINIR", venue: "CAMPO O ROXO" }
    ],
    standings: [
      { pos: 1, team: "ATLÉTICO CERCEDENSE", pts: 47, pj: 17, highlighted: true },
      { pos: 2, team: "C.C.D. CURTIS", pts: 43, pj: 17 },
      { pos: 3, team: "XUVENTUDE CRENDES", pts: 41, pj: 17 },
      { pos: 4, team: "SP. MEICENDE", pts: 38, pj: 17 },
      { pos: 5, team: "A.D. CULLEREDO", pts: 28, pj: 17 }
    ],
    externalUrl: "https://futgal.es/pnfg/NPcd/NFG_VisClasificacion?cod_primaria=1000120&codgrupo=26188029&codcompeticion=24123314&codjornada=&codtemporada=21",
    socialPost: {
      imageUrl: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000",
      caption: "¡LÍDERES! Orgullosos de este equipo tras la victoria 1-8. Próximo duelo contra el Curtis el 12 de abril. 💪🏆",
      postUrl: "https://www.instagram.com/clubatleticocercedense/",
      date: "AYER"
    }
  },
  resultadosContent: {
    results: [
      { id: 1, home: "CERCEDENSE", away: "PONTECARREIRA", score: "1 - 0", date: "MAR 22", category: "SENIOR MASCULINO", result: "VITORIA" },
      { id: 2, home: "AT. ARTEIXO", away: "CERCEDENSE", score: "2 - 1", date: "MAR 21", category: "SENIOR FEMININO", result: "DERROTA" },
      { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", score: "3 - 2", date: "MAR 21", category: "XUVENIL", result: "VITORIA" },
      { id: 4, home: "BERGANTIÑOS", away: "CERCEDENSE", score: "1 - 1", date: "MAR 20", category: "CADETE", result: "EMPATE" },
      { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", score: "0 - 2", date: "MAR 20", category: "INFANTIL", result: "DERROTA" }
    ],
    maleSeasonWins: 14,
    maleSeasonDraws: 4,
    maleSeasonLosses: 6,
    femaleSeasonWins: 10,
    femaleSeasonDraws: 2,
    femaleSeasonLosses: 3
  },
  directoContent: {
    isLive: false,
    statusText: "FÓRA DE EMISIÓN",
    description: "NON HAI NINGUNHA RETRANSMISIÓN ACTIVA NO MOMENTO.",
    youtubeUrl: "https://www.youtube.com/",
    nextEventTitle: "CERCEDENSE vs ORDES CF",
    nextEventDate: "DOMINGO 5 ABRIL · 17:00H"
  },
  contactoContent: {
    address: "CAMPO O ROXO, CERCEDA",
    email: "c.a.cercedense@gmail.com",
    phone: "+34 600 000 000",
    instagramUrl: "https://www.instagram.com/clubatleticocercedense/",
    facebookUrl: "https://facebook.com/clubatleticocercedense",
    twitterUrl: "https://twitter.com/cacercedense"
  },
  partidosContent: {
    matches: [
      { id: 1, home: "CERCEDENSE", away: "ORDES CF", date: "5 Abr", time: "17:00H", category: "SENIOR MASCULINO", venue: "CAMPO O ROXO" },
      { id: 2, home: "BETANZOS CF", away: "CERCEDENSE", date: "5 Abr", time: "12:00H", category: "SENIOR FEMININO", venue: "CAMPO DEP. BETANZOS" },
      { id: 3, home: "CERCEDENSE", away: "SD FISTERRA", date: "4 Abr", time: "16:30H", category: "XUVENIL", venue: "CAMPO O ROXO" },
      { id: 4, home: "BERGANTIÑOS FC", away: "CERCEDENSE", date: "4 Abr", time: "11:00H", category: "CADETE", venue: "CAMPO AS EIROAS" },
      { id: 5, home: "CERCEDENSE", away: "VICTORIA CF", date: "4 Abr", time: "10:30H", category: "INFANTIL", venue: "CAMPO O ROXO" }
    ]
  }
};
