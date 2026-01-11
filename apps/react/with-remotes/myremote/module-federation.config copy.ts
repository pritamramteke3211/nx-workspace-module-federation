import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'myremote',
  exposes: {
    './Module': './src/remote-entry.ts',
    './MyRemoteButton': './src/components/Button.tsx',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName === 'react' || libraryName === 'react-dom') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    if (libraryName === 'react-router-dom') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
      };
    }
    if (libraryName.startsWith('@module-federation/')) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: false,
        eager: true,
      };
    }

    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
