import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../Styles/Menu.css"
import { Button, useToast } from '@chakra-ui/react';

const Menu = () => {
    const toast = useToast()
    const [menu, setMenu] = useState([]);
    const authrization = localStorage.getItem("food");
    useEffect(() => {
        axios.get(`https://food-server-6xik.onrender.com/dish/`, {
            headers: {
                'Authorization': authrization
            }
        })
            .then((res) => setMenu(res.data.post))
            .catch((er) => {
                console.log(er)
            })
    }, [authrization]);
    //console.log(menu)
    const Addtocart = (dish) => {
        console.log(dish.price)
        const order = {
            dishes: [
                {
                    dishId: dish._id,
                    quantity: 1,
                    name: dish.name,
                    image: dish.image,
                    price: dish.price
                },
            ],
            totalPrice: dish.price,
            estimatedDeliveryTime: '30 minutes', // You can adjust the delivery time as needed
        };

        axios.post('https://food-server-6xik.onrender.com/order/add', order, {
            headers: {
                Authorization: authrization,
            },
        })
            .then((res) => {
                console.log('Order placed:', res);
                if (res.data === "Please Login First") {
                    toast({
                        title: "Please Login First",
                        description: "Login First to add cart",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }
                else {
                    toast({
                        title: "Added to Cart",
                        description: "Successfully added to cart",
                        status: "success",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }

            })
            .catch((err) => {
                console.log('Error placing order:', err);
                // Handle error, e.g., show an error message
            });
    }

    return (
        <div id='menu' className='menu'>
            <div>
                <h1>Our daily dishes</h1>
                <p>Check out recommended dishes of your choice</p>
            </div>
            <div className='menuItem'>
                {menu && menu.map(item => (
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