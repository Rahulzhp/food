
import { Routes, Route } from "react-router-dom"
import React from 'react'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Service from './Service'
import Menu from "./Menu"

const Allroute = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/menu' element={<Menu />}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/service' element={<Service />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
        </Routes>
    )
}

export default Allroute