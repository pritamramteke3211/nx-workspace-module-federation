import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['remote1', 'myremote'],
  // Add this property to the root of the config object
  // @ts-ignore - Nx types might not have caught up to MF 2.0 properties yet
  shareStrategy: 'eager-first',
  shared: (libraryName, defaultConfig) => {
    if (libraryName.startsWith('@module-federation/')) {
      return false;
    }
    if (['react', 'react-dom', 'react-router-dom'].includes(libraryName)) {
      return {
        ...defaultConfig,
        singleton: true,
        eager: true,
        requiredVersion: false,
      };
    }
    return defaultConfig;
  },
};

export default config;
