import React from 'react';
import Login from './Components/Login/Login'
import useLocalStorage from './Hooks/useLocalStorage';
import Dashboard from './Components/Dashboard/Dashboard'
import { ContactsProvider } from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id}>
        <Dashboard id={id} changeId={setId} />
      </ConversationsProvider>

    </ContactsProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />

  );
}

export default App;