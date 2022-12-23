import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.newagro.com',
  appName: 'New Agro',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 10000,
      launchAutoHide: false
    }
  }
};

export default config;
