import React from 'react';

const MyRemoteButton = React.lazy(() => import('myremote/MyRemoteButton'));

const Home = () => {
  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'red',
      }}
    >
      Shell Home
      <MyRemoteButton
        onClick={() => {
          alert('Hello from Remote Button!');
        }}
        variant="primary"
        size="large"
      >
        Remote Button
      </MyRemoteButton>
    </div>
  );
};

export default Home;
