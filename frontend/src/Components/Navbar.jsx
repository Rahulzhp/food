import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import logo from "../Images/Foodpanda.png";
import { Link } from 'react-router-dom';
import "../Styles/Navbar.css";

const Navbar = () => {
    const authrization = localStorage.getItem("food");
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
    const handleCart = () => {
        alert("cart")
    }
    return (
        <div className={scrolled ? 'navbar scrolled' : 'navbar'}>
            <div>
                <Link to="/">
                    <Image width={"60%"} src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <div className='pages'>
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/service">Services</Link>
                    <Link to="/about">About Us</Link>
                    <Link onClick={handleCart} to="/cart">Cart</Link>
                    {authrization ? (
                        <Link to='/profile'>Profile</Link>
                    ) : (
                        <Link to='/login'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
