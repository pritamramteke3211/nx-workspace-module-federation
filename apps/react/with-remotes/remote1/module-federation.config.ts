import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote1',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    // 1. Standard React sharing
    if (['react', 'react-dom', 'react-router-dom'].includes(libraryName)) {
      return {
        ...defaultConfig,
        singleton: true,
        eager: true, // Making these eager helps avoid initialization race conditions
        requiredVersion: false,
      };
    }

    // 2. CRITICAL: Remove the manual sharing of @module-federation/ runtime
    // or set it explicitly like this if you must keep it:
    // if (libraryName === '@module-federation/runtime') {
    //   return {
    //     ...defaultConfig,
    //     singleton: true,
    //     eager: true,
    //   };
    // }

    return defaultConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
