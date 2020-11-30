import React, { useState } from 'react'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
import Conversations from '../Conversations/Conversations';
import Contacts from '../Contacts/Contacts';
import ConversationModal from '../Conversations/ConversationModal';
import ContactsModal from '../Contacts/ContactsModal';

const Sidebar = ({ id }) => {
    const [activeKey, setActiveKey] = useState('conversations');
    const [modalOpen, setModalOpen] = useState(false)
    const isConversation = activeKey === 'conversations'

    const closeModel = () => {
        setModalOpen(false)
    }

    const openModel = () => {
        setModalOpen(true)
    }

    return (
        <div style={{ width: "250px" }} className="d-flex flex-column">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link eventKey="conversations">Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="contacts">Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className="border-right border-left overflow-auto flex-grow-1">
                    <Tab.Pane eventKey="conversations">
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey="contacts">
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-left border-right small">
                    Your Id is:<span className="text-muted"> {id}</span>
                </div>
                <Button className="rounded-0" onClick={() => setModalOpen(true)}>New {(isConversation) ? 'Conversation' : 'Contact'}</Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={(closeModel)}>
                {isConversation ? <ConversationModal closeModel={closeModel} /> : <ContactsModal closeModel={closeModel} />}
            </Modal>

        </div>
    )
}

export default Sidebar
