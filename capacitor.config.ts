import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cercedense.app2',
  appName: 'Club Atletico Cercedense',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: "#ffffff"
    },
    LocalNotifications: {
      smallIcon: "ic_stat_logo",
      iconColor: "#DA291C",
    }
  },
  ios: {
    // @ts-ignore
    useSwiftPackageManager: false
  },
  experimental: {
    ios: {
      spm: {
        swiftToolsVersion: '5.9'
      }
    }
  }
};

export default config;
