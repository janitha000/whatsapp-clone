import React from 'react';
import Login from './Components/Login/Login'
import useLocalStorage from './Hooks/useLocalStorage';
import Dashboard from './Components/Dashboard/Dashboard'
import { ContactsProvider } from './Contexts/ContactsProvider';
import { ConversationsProvider } from './Contexts/ConversationsProvider';
import { SocketProvider } from './Contexts/SocketProvider';

function App() {
  const [id, setId] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} changeId={setId} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />

  );
}

export default App;