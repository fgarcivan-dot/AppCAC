import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cercedense.app2',
  appName: 'Club Atletico Cercedense',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#000000"
    }
  }
};

export default config;
