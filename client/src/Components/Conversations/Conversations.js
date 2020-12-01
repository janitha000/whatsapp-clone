import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { useConversations } from '../../Contexts/ConversationsProvider'

const Conversations = () => {
    const { conversations, selectConversationIndex, removeConversation } = useConversations();


    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (

                <ListGroup.Item className="d-flex justify-content-between"
                    key={index}
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected} >
                    {conversation.recipients.map(r => r.name).join(', ')}
                    <Button variant="secondary" onClick={() => removeConversation(index)}>Del</Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default Conversations
