// for app name and signin in google buttons we are storing them in navbar
import React, { useContext } from 'react';
import "./style.css";
import SignInBtn from '../../components/signin-btn';
import { UserContext } from '../../contexts/user';

export default function Navbar() {
    const [user, setUser] = useContext(UserContext).user
    return <div className="navbar">

        <p>
            POST-IT APP
        </p>
        {user ? <img className="navbar_img" src={user.photoURL} /> : <SignInBtn />}
    </div>


}