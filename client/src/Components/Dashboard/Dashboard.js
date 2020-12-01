import React from 'react'
import { Button } from 'react-bootstrap'
import Sidebar from '../Sidebar/Sidebar'
import OpenCovesations from '../Conversations/OpenConversation'
import { useConversations } from '../../Contexts/ConversationsProvider'

const Dashboard = ({ id, changeId }) => {
    const { selectedConversation } = useConversations();

    const logout = () => {
        changeId('')
    }


    return (
        <>
            {id ? <Button onClick={logout} style={{ position: "absolute", right: "10px", top: "10px" }}>LogOut</Button> : ''}
            <div className="d-flex" style={{ height: "95vh", margin: "20px 20px" }}>
                <Sidebar id={id} />
                {selectedConversation && <OpenCovesations />}
            </div>

        </>
    )
}

export default Dashboard
