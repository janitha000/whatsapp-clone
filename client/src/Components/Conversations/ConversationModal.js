import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../../Contexts/ContactsProvider'
import { useConversations } from '../../Contexts/ConversationsProvider'

const ConversationModal = ({ closeModal }) => {
    const [selectedContactsIds, setSelectedContactsIds] = useState([])

    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleSubmit = (e) => {
        e.preventDefault()
        createConversation(selectedContactsIds)
        //closeModal();
    }

    const handleCheckBoxChange = (contactId) => {
        setSelectedContactsIds(prevContactIds => {
            if (prevContactIds.includes(contactId)) {
                return prevContactIds.filter(preContactId => { return preContactId !== contactId })
            } else {
                return [...prevContactIds, contactId]
            }
        })
    }
    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contact => (
                        <Form.Group controlId={contact?.id} key={contact?.id}>
                            <Form.Check
                                type="checkbox"
                                value={selectedContactsIds.includes(contact?.id)}
                                label={contact?.name}
                                onChange={() => handleCheckBoxChange(contact?.id)}
                            />
                        </Form.Group>
                    ))}

                    <Button type="submit">Add Contact</Button>
                </Form>
            </Modal.Body>

        </>
    )
}

export default ConversationModal
