import { useState } from 'react';
import Login from './Components/Login/Login'

function App() {
  const [id, setId] = useState('111');

  return (
    <>
      <Login onIdSubmit={setId} />
      {id}
    </>
  );
}

export default App;