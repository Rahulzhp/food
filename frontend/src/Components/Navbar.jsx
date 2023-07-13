import React, { useEffect, useState } from 'react'
import { Image } from '@chakra-ui/react'
import logo from "../Images/logo.png"
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"

const Navbar = () => {
    const pro = JSON.parse(localStorage.getItem('user'));
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className='container'>
                <div className={scrolled ? 'navbar scrolled' : 'navbar'}>
                    <div>
                        <Link to="/"><Image src={logo} alt="logo"></Image></Link>

                    </div>
                    <div>
                        <div className='pages'>
                            {/* <p>Dashboard</p> */}
                            <Link to="/" > Home</Link>
                            {/* <p>About Us</p> */}
                            <Link > Menu</Link>
                            {/* <p>Pricing</p> */}
                            <Link to="/price" > Services</Link>
                            {/* <p onClick={onOpen}>Create Script</p> */}
                            <Link >About Us</Link>
                            <Link >Cart</Link>
                            {/* <p>Blog</p> */}
                            {pro ? (
                                <Link to='/profile'>Profile</Link>
                            ) : (
                                <Link to='/login'>Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar