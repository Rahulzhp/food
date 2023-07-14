import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/react';
import logo from "../Images/Foodpanda.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import cart from "../Images/cart.png"
import "../Styles/Navbar.css";


const Navbar = () => {
    const authrization = localStorage.getItem("food");
    const [scrolled, setScrolled] = useState(false);
    const [total, setTotal] = useState(0);
    const menuLinks = [
        { name: "HOME", link: "#home" },
        { name: "MENU", link: "#menu" },
        { name: "SERVICE", link: "#service" },
        { name: "CART", link: "/cart", image: cart },
        { name: "LOGIN", link: "/login" },
    ];

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
    }, [authrization]);

    useEffect(() => {
        const fetchCartItemsCount = async () => {
            try {
                const response = await axios.get('https://food-server-6xik.onrender.com/order/', {
                    headers: {
                        Authorization: authrization,
                    },
                });
                const itemCount = response.data.post.length;
                setTotal(itemCount);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCartItemsCount();
    }, [authrization]);

    return (
        <div className={scrolled ? 'navbar scrolled' : 'navbar'}>
            <div>
                <Link to="/">
                    <Image width={"60%"} src={logo} alt="logo" />
                </Link>
            </div>
            <div>
                <div className='pages'>
                    {menuLinks?.map((menu, i) => (
                        <div key={i} className="px-6 hover:text-rose-600">
                            {menu.link === "/login" || menu.link === "/cart" ? (
                                <Link to={menu.link}>
                                    {menu.name === "CART" ? (
                                        <div className='navuser'>
                                            <div><Image src={menu.image} /></div>
                                            {authrization ? (<div className='cartI'><p></p></div>) : null}
                                            <div>{menu.name}</div>
                                        </div>
                                    ) : (
                                        menu.name
                                    )}
                                </Link>
                            ) : (
                                <a href={menu.link}>{menu.name}</a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
