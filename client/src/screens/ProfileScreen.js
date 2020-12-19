import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card, Toast } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"

const ProfileScreen = ({location, history}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [name,setName] = useState("")

    const [updateMode, setUpdateMode] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { loading, error, success } = userUpdateProfile
 
    useEffect(() => {
        if(!userInfo) {
            history.push("/login")
            return
        }
        if(!userInfo.name) {
            dispatch(getUserDetails("profile"))
            return
        }
        setName(userInfo.name)
        setEmail(userInfo.email)
    },[history, dispatch, userInfo, error, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!updateMode) return setUpdateMode(true)
        if(password !== confirmPassword)
            return setMessage("Passwords do not match.")
        dispatch(updateUserProfile({ id:userInfo._id, name, email, password }))
        setMessage(null)
        setSuccessMessage(success)
    }

    const toggleSuccessMessage = () => setSuccessMessage(!successMessage)

    return (
        <Row>
            <Col md={4}>
                <h3>Your Info</h3>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {/* {success && <Message variant="success">Profile updated succesfully!</Message>} */}
                {loading && <Loader />}
                <Card className="my-3 p-3  rounded">
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control disabled={!updateMode} type="text" placeholder="Enter Name..." value = {name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control disabled={!updateMode} type="email" placeholder="Enter Email..." value = {email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={ updateMode? "" : "hidden" } controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password..." value = {password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className={ updateMode? "" : "hidden" } controlId="confPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary">{ updateMode ? "Update" : "Edit Profile"}</Button>
                    </Form>
                </Card>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
            <Toast className="success-toast" autohide onClose={toggleSuccessMessage}  show={successMessage} animation={true}>
                <Toast.Body>Profile Updated Succesfully!</Toast.Body>
            </Toast>
        </Row>
    )
}

export default ProfileScreen
