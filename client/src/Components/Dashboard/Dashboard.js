import React from 'react'
import { Button } from 'react-bootstrap'
import Sidebar from '../Sidebar/Sidebar'

const Dashboard = ({ id, changeId }) => {

    const logout = () => {
        changeId('')
    }


    return (
        <>
            {id ? <Button onClick={logout} style={{ position: "absolute", right: "10px", top: "10px" }}>LogOut</Button> : ''}
            <div className="d-flex" style={{ height: "95vh", margin: "20px 20px" }}>
                <Sidebar id={id} />
            </div>

        </>
    )
}

export default Dashboard
