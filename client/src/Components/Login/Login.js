import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ onIdSubmit }) => {

    const idRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = idRef.current.value;
        onIdSubmit(id)
    }

    const createId = () => {
        const newId = uuidV4();
        onIdSubmit(newId)
    }

    return (
        <Container onSubmit={handleSubmit} className="align-items-center d-flex" style={{ height: "100vh" }}>
            <Form className="w-50">
                <Form.Group>
                    <Form.Label>Enter Your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="mr-2">Login</Button>
                <Button onClick={createId} variant="secondary">Create New ID</Button>
            </Form>
        </Container>
    )
}

export default Login
