import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button, Image, useToast, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text
} from '@chakra-ui/react';
import '../Styles/Cart.css';

const Cart = () => {
    const toast = useToast()
    const [cartItems, setCartItems] = useState([]);
    const [state, setState] = useState(true);
    const authrization = localStorage.getItem('food');
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        fetchData()
    }, [state]);
    const fetchData = () => {
        setState(true)
        axios.get('https://food-server-6xik.onrender.com/order/', {
            headers: {
                Authorization: authrization,
            },
        })
            .then((res) => {
                console.log(res.data.post)
                setCartItems(res.data.post)
                setState(false)
            })
            .catch((err) => {
                console.log(err);
            });
        setState(false)
    }



    const handleQuantityChange = (itemId, quantity) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === itemId) {
                return {
                    ...item,
                    dishes: [
                        {
                            ...item.dishes[0],
                            quantity,
                        },
                    ],
                    totalPrice: item.dishes[0].price * quantity,
                };
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };

    const handleDeleteItem = (itemId) => {
        setState(true)
        //console.log(itemId)
        axios.delete(`https://food-server-6xik.onrender.com/order/${itemId}`, {
            headers: {
                Authorization: authrization,
            },
        })
            .then((res) => {
                setState(true)
                toast({
                    title: "Item Deleted",
                    description: "Successfully Deleted from Cart",
                    status: "success",
                    position: "top",
                    duration: 3000,
                    isClosable: true,
                });
                console.log(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
        setTimeout(() => {
            fetchData()
        }, 10)
        setState(false)
    };

    const getTotalPrice = () => {
        const Totalprice = cartItems?.reduce((total, item) => total + item.totalPrice, 0);
        return Totalprice
    };
    const handleDeleteCart = () => {
        setState(true)
        axios.delete('https://food-server-6xik.onrender.com/order', {
            headers: {
                Authorization: authrization,
            },
        })
            .then((res) => {
                setState(true)

                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
        setState(false)
    }
    return (
        <div className="cart">
            <h1>Cart Item</h1>
            {cartItems?.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems && cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className='cartfix'>
                                    <div>
                                        <div className='CartImg'>
                                            <Image src={item.dishes[0].image}></Image>
                                        </div>
                                        <div><h3>{item.dishes[0].name}</h3></div>
                                        <p>Price: Rs: {item.totalPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <div className="quantity-container">
                                            <Button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        item.dishes[0].quantity - 1
                                                    )
                                                }
                                                disabled={item.dishes[0].quantity === 1}
                                                backgroundColor="#FF4D00"
                                                padding="4px"
                                                color="white"
                                                fontSize="18px"
                                                marginRight="5px"
                                                borderRadius="3px"
                                            >
                                                -
                                            </Button>
                                            <p>{item.dishes[0].quantity}</p>
                                            <Button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        item.dishes[0].quantity + 1
                                                    )
                                                }
                                                backgroundColor="#FF4D00"
                                                padding="4px"
                                                color="white"
                                                fontSize="18px"
                                                borderRadius="3px"
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <Button
                                            onClick={() => handleDeleteItem(item._id)}
                                            backgroundColor="#FF4D00"
                                            padding="5px"
                                            color="white"
                                            fontSize="15px"
                                            width="101px"
                                            borderRadius="5px"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <p>Total Items: {cartItems?.length}</p>
                        <p>Total Price: Rs: {getTotalPrice()}</p>
                        <p>Estimated Delivery Time: 30 minutes</p> {/* You can adjust the delivery time as needed */}
                        <Button
                            onClick={() => {
                                handleDeleteCart();
                                onOpen();
                            }}
                            backgroundColor="#FF4D00"
                            padding="15px"
                            color="white"
                            fontSize="17px"
                            borderRadius="21px"
                        >
                            Place Order
                        </Button>
                    </div>
                </>
            )}
            <>
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader color={"#FF4D00"}>Order Placed Successfuly</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Text>Your Item will be Delivered within 30 minutes</Text>
                        </ModalBody>
                        <ModalFooter>

                            <Button backgroundColor={"#FF4D00"} onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        </div>
    );
};

export default Cart;
