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
}

export default config
