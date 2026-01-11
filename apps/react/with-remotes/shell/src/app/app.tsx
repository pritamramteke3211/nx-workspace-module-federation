import * as React from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';
// import { init } from '@module-federation/runtime';
import useRemote from '../hooks/useRemote';

export function App() {
  const RemoteButton = useRemote({
    scope: 'myremote',
    module: 'MyRemoteButton', // Exposed module name not path
  });

  return (
    <React.Suspense fallback={null}>
      <div
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/myremote">Myremote</Link>
        </div>
        <div>
          <Link to="/remote1">Remote1</Link>
        </div>
      </div>

      <AppRoutes />

      <RemoteButton variant="primary" size="large">
        Remote Button from App.tsx
      </RemoteButton>
    </React.Suspense>
  );
}

export default App;
