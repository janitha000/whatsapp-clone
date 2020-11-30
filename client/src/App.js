import React from 'react';
import Login from './Components/Login/Login'
import useLocalStorage from './Hooks/useLocalStorage';
import Dashboard from './Components/Dashboard/Dashboard'
import { ContactsProvider } from './Contexts/ContactsProvider';

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <Dashboard id={id} changeId={setId} />
    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />

  );
}

export default App;