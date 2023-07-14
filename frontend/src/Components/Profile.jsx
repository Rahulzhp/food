import { Button } from '@chakra-ui/react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../Styles/Profile.css"

const Profile = () => {
    const navigate = useNavigate()
    // const pro = JSON.parse(localStorage.getItem("owner"));
    const pro = {
        name: "ram"
    }
    console.log(pro)
    const name = pro.name
    var firstLetter = name.charAt(0).toUpperCase();
    const logout = () => {
        localStorage.removeItem("owner");
        localStorage.removeItem("food");
        navigate("/")
    }
    return (
        <div className='profilecont'>
            <div className='profile'>
                <div>
                    <h1>User Info</h1>

                    <div id="proname"><h1>ram</h1></div>
                    <h6>Full Name : <span>raj</span></h6>
                    <h6>Email : <span>ar</span></h6>
                    <h6>Subscription Plan : <span>hhj (<span id='plan'>change plan</span>)</span></h6>
                    <h6>Subscription Status : <span>Active</span></h6>
                    <Button onClick={logout}>Logout</Button>
                    <hr className='hrline'></hr>
                </div>
                <div>
                    <h1>Payment Methods</h1>
                    <div className='paymentstatus'>
                        <div className='paymentmode'>
                            <h4>Card</h4>
                            <h4>Last 4 Numbers</h4>
                            <h4>Expiration Date</h4>
                            <h4>Actions</h4>
                        </div>
                        <div><p>No Records found</p></div>
                    </div>
                    <hr className='hrline'></hr>
                </div>
                <div>
                    <h1>Billing History</h1>
                    <div className='paymentstatus'>
                        <div className='paymentmode'>
                            <h4>Amount</h4>
                            <h4>Status</h4>
                            <h4>Reason for failure</h4>
                            <h4>Description</h4>
                            <h4>Date</h4>
                            <h4>Receipt</h4>
                        </div>
                        <div><p>No Records found</p></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile