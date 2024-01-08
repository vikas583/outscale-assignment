import React from 'react';
import { Spinner } from 'reactstrap';

const Loading: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0, overflow: 'hidden', margin: 'auto' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Loading...</h1>
        <Spinner />
      </div>
    </div>
  )
}

export default Loading