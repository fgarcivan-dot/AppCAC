import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export const notificationService = {
  async requestPermissions() {
    const perm = await LocalNotifications.requestPermissions();
    return perm.display === 'granted';
  },

  async schedule(title: string, body: string, id: number = Math.floor(Math.random() * 1000000)) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id,
            schedule: { at: new Date(Date.now() + 1000) }, // Trigger in 1s
            sound: undefined,
            actionTypeId: '',
            extra: null,
            smallIcon: 'ic_stat_logo',
            attachments: Capacitor.getPlatform() === 'ios' 
              ? [{ id: 'escudo', url: 'escudo.png' }] 
              : undefined,
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  },

  getStatusMessage(status: string, home: string, away: string, score: string, prevStatus?: string | null, teamTitle?: string) {
    const s = status.toUpperCase().trim();
    const prev = prevStatus?.toUpperCase().trim();
    const prefix = teamTitle ? `${teamTitle.toUpperCase()}: ` : "";

    if (s === 'EN XOGO') {
      if (prev === 'DESCANSO') {
        return {
          title: `🔴 ${prefix}INICIO DA SEGUNDA METADE`,
          body: `Continúa o encontro: ${home} ${score} ${away}`
        };
      }
      return {
        title: `🔴 ${prefix}¡PARTIDO EN XOGO!`,
        body: `Comeza o encontro: ${home} vs ${away}`
      };
    }
    if (s === 'DESCANSO') {
      return {
        title: `⏸️ ${prefix}DESCANSO`,
        body: `Descanso: ${home} ${score} ${away}`
      };
    }
    if (s === 'FIN' || s === 'FINALIZADO') {
      return {
        title: `🏁 ${prefix}FINAL DO PARTIDO`,
        body: `Resultado final: ${home} ${score} ${away}`
      };
    }
    if (s === 'GOL_PROPIO') {
      return {
        title: `⚽🔴⚪ ¡¡¡GOOOOOL DO CERCEDENSE!!!`,
        body: `O marcador escala a: ${home} ${score} ${away}`
      };
    }
    if (s === 'GOL_RIVAL') {
      const isHomeCercedense = home.toUpperCase().includes("CERCEDENSE");
      const rivalName = isHomeCercedense ? away : home;
      return {
        title: `⚽ Gol do ${rivalName}.`,
        body: `Marcador actual: ${home} ${score} ${away}`
      };
    }
    return null;
  }
};
