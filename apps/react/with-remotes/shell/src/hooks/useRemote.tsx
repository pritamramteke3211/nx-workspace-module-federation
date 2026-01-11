import { registerRemotes, loadRemote } from '@module-federation/runtime';
import React, { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export type RemoteDetails = {
  scope: string;
  module: string;
};

// This should return the remoteEntry.js URL, NOT a tsconfig.json or module path
export async function getRemoteEntryUrl(scope: string): Promise<string> {
  const remoteMap: Record<string, string> = {
    myremote: 'http://localhost:4201/remoteEntry.js', // Ensure this is remoteEntry.js
  };
  return remoteMap[scope];
}

export default function useRemote({ scope, module }: RemoteDetails) {
  // Use useMemo so we don't recreate the lazy component on every render
  const LazyComponent = useMemo(() => {
    return React.lazy(async () => {
      const remoteUrl = await getRemoteEntryUrl(scope);

      // 1. Register the remote dynamically
      registerRemotes([
        {
          name: scope,
          entry: remoteUrl,
        },
      ]);

      // 2. Load the specific module using the Federation Runtime
      // This returns the actual module object { default: Component }

      // Ensure there is only ONE slash between scope and module
      // and remove any leading dot from the module name if it exists
      const sanitizedModule = module.startsWith('./')
        ? module.slice(2)
        : module;

      console.log(`Loading module ${sanitizedModule} from scope ${scope}`);

      const remoteModule = await loadRemote<any>(`${scope}/${sanitizedModule}`);

      if (!remoteModule) {
        throw new Error(`Failed to load module ${module} from scope ${scope}`);
      }

      return remoteModule;
    });
  }, [scope, module]);

  return (props: any) => (
    <ErrorBoundary
      FallbackComponent={() => <div>Failed to load remote component.</div>}
      onError={(error) => {
        console.log('Error loading remote component:', error);
      }}
    >
      <Suspense fallback={<div>Loading remote component...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
