import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import largeLogo from "../Images/largeLogo.png"
import "../Styles/Home.css"

const Home = () => {
    return (
        <div className='mainContainer'>
            <div className='home'>
                <div>
                    <div className='homeLogo'>
                        <img src={largeLogo} alt="logo"></img>
                    </div>
                    <div className='home_title'>
                        <h3>Enjoy <span>home made meals </span>far away <br></br> from home & The <span>Fastest </span> Food Delivery with <span>Nolan</span> </h3>
                        <p>Helping you enjoy comfortable and healthy food anywhere and anytime on the go </p>
                    </div>
                    <div className='home_btn'>
                        <Button backgroundColor={"#FF4D00"} padding={"35px"} color={"white"} fontSize={"17px"} borderRadius={"21px"}>Order Now</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home