import React, { useState } from 'react'
import "../Styles/Login.css"
import { Button, Text, FormControl, FormLabel, Image, Input, useDisclosure } from '@chakra-ui/react'
import logo from "../Images/logo.png"
import axios from 'axios'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [local, setLocal] = useState("")
    const [emai, setEmai] = useState("")
    const [passwor, setPasswor] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const payload = {
        email,
        password
    }
    const signuppayload = {
        name,
        email: emai,
        password: passwor
    }


    const handlelogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/users/login", payload)
            .then((res) => {
                setLocal(res.data.user)
                console.log(res)
                if (res.data.token) {
                    localStorage.setItem("food", res.data.token);
                    toast({
                        title: "Welcome Back",
                        description: "Successfully Logged In",
                        status: "success",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 900)
                }
                else {
                    return toast({
                        title: "Error",
                        description: "Invalid Credentials",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch((er) => {
                console.log(er)
            })
    }

    const handlesignup = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/users/register", signuppayload)
            .then((res) => {
                console.log(res)
                if (res.data === "Registered") {
                    toast({
                        title: "Account created.",
                        description: "Successfully Created your Account",
                        status: "success",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                    onCloseCreate()
                    setTimeout(() => {
                        navigate('/login');
                    }, 900)
                }
                else {
                    toast({
                        title: "Error",
                        description: "Please Enter all the detail",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch((er) => {
                console.log(er)
            })
    }
    return (
        <div className='logn'>
            <div className='loginMain'>
                <div className='loginLogo'>
                    <img src={logo} alt={logo}></img>
                </div>
                <div className='loginHed'>
                    <div>
                        <h1>Log in</h1>
                        <p>Log in to unlock the full Nolan Experience.</p>
                    </div>
                </div>
                <div className='loginCont'>
                    <div>
                        <div className='loginBtn'>
                            <div><Button onClick={onOpenLogin} width={"205px"} backgroundColor={"#cc5e5e"} color={"white"} borderRadius={"19px"}>Login with Email</Button></div>
                            <div><Button width={"205px"} backgroundColor={"#cc5e5e"} color={"white"} borderRadius={"19px"}>Continue with Google</Button></div>
                            <div><Button onClick={onOpenCreate} width={"205px"} backgroundColor={"#cc5e5e"} color={"white"} borderRadius={"19px"}>Create an Account</Button></div>
                            <Text>Forgot Password?</Text>
                        </div>
                        <div className='policy'>
                            <p>By signing up, you agree to the <span style={{ color: "blue" }}> Terms of Service </span>and <span style={{ color: "blue" }}>Privacy Policy</span>.</p>
                        </div>
                    </div>
                </div>
                <>
                    <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpenCreate}
                        onClose={onCloseCreate}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create Account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                < FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input ref={initialRef} value={name}
                                        onChange={(e) => setName(e.target.value)} borderRadius={"21px"} placeholder='Enter your Name' />
                                </FormControl>
                                <FormControl isRequired mt={4}>
                                    <FormLabel>Email</FormLabel>
                                    <Input value={emai}
                                        onChange={(e) => setEmai(e.target.value)} borderRadius={"21px"} placeholder='Enter your Email' />
                                </FormControl>
                                <FormControl isRequired mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input value={passwor}
                                        onChange={(e) => setPasswor(e.target.value)} borderRadius={"21px"} placeholder='Enter your Password' />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handlesignup} colorScheme='red' mr={3}>
                                    Signup
                                </Button>
                                <Button onClick={onCloseCreate}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            </div>
            <>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpenLogin}
                    onClose={onCloseLogin}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Login</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            < FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input value={email}
                                    onChange={(e) => setEmail(e.target.value)} ref={initialRef} borderRadius={"21px"} placeholder='Enter Email' />
                            </FormControl>
                            <FormControl isRequired mt={5}>
                                <FormLabel>Password</FormLabel>
                                <Input value={password}
                                    onChange={(e) => setPassword(e.target.value)} borderRadius={"21px"} placeholder='Enter Password' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlelogin} colorScheme='red' mr={3}>
                                Login
                            </Button>
                            <Button onClick={onCloseLogin}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </div>
    )
}

export default Login