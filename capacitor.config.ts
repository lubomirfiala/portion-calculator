import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.servings.app',
  appName: 'Servings',
  webDir: 'dist',
  server: {
    // Dev only — remove for production builds
    url: 'http://localhost:8103',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#1868b2',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
}

export default config
