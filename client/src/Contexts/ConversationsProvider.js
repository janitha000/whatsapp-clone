import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../Hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { UseSocket } from './SocketProvider';

const CoversationsContext = createContext();

export const useConversations = () => {
    return useContext(CoversationsContext)
}

export const ConversationsProvider = ({ id, children }) => {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
    const { contacts } = useContacts();
    const socket = UseSocket();



    const createConversation = (recipients) => {
        setConversations(prevConversations => {
            return [...prevConversations, { recipients, messages: [] }]
        })
    }

    const ArrayEquality = (a, b) => {
        debugger;
        if (!a || !b) return false;
        if (a.length !== b.length) return false;

        a.sort();
        b.sort();

        return a.every((element, index) => {
            return element === b[index]
        })
    }

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        debugger;
        setConversations(prevConversations => {
            debugger;
            let isNewConversation = false;
            const newMessage = { sender, text }

            const newConversations = prevConversations.map(conversation => {
                if (ArrayEquality(conversation.recipients, recipients)) {
                    isNewConversation = false;
                    return { ...conversation, messages: [...conversation.messages, newMessage] }
                }
                return conversation;
            })

            if (isNewConversation) {
                return [...prevConversations, { recipients, messages: [newMessage] }]
            }
            else {
                return newConversations
            }
        })
    }, [setConversations])

    const sendMessage = (recipients, text) => {
        socket.emit('send-message', { recipients, text })
        addMessageToConversation({ recipients, text, sender: id })
    }

    const removeConversation = (index) => {
        setConversations(prevConversations => {
            return prevConversations.splice(index, 1)
        })
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => contact.id === recipient);
            const name = (contact && contact.name) || recipient;

            return { id: recipient, name }
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => contact.id === message.sender);
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender

            return { ...message, senderName: name, fromMe }
        })

        const selected = index === selectedConversationIndex

        return { ...conversation, messages, recipients, selected }
    })

    useEffect(() => {
        if (socket == null) return;
        socket.on('recieve-message', addMessageToConversation)

        return () => socket.off('recieve-message')
    }, [socket, addMessageToConversation])

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        createConversation,
        selectConversationIndex: setSelectedConversationIndex,
        removeConversation,
        sendMessage
    }

    return (
        <CoversationsContext.Provider value={value}>
            {children}
        </CoversationsContext.Provider>
    )
}

