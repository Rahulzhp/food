import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../Styles/Menu.css"
import { Button } from '@chakra-ui/react';

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const authrization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGIwMDYyOTE5Y2YxOTRkZWQzYzA0NGIiLCJpYXQiOjE2ODkyNTc1MjJ9.LIn0M8WFqgKTFG0Pg7PaNvRnKfrSGN7ukEzmEQABq2c"

    useEffect(() => {
        axios.get(`http://localhost:8080/dish/`, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => setMenu(res.data.post))
            .catch((er) => {
                console.log(er)
            })
    }, []);
    //console.log(menu)
    const Addtocart = (el) => {
        console.log(el)
    }

    return (
        <div className='menu'>
            <div>
                <h1>Our daily dishes</h1>
                <p>Check out recommended dishes of your choice</p>
            </div>
            <div className='menuItem'>
                {menu.map(item => (
                    <div key={item._id} className="dish-card">
                        <div className='dishimg'>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className='dishprice'>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: Rs : <span>{item.price.toFixed(2)}</span></p>
                        </div>
                        <div>
                            <Button onClick={() => Addtocart(item)} backgroundColor={"#FF4D00"} padding={"15px"} color={"white"} fontSize={"17px"} borderRadius={"21px"}>Add to Cart</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Menu