//For sign in purpose we are using signin-btn
import React, { useContext } from "react";
import "./style.css";

import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../contexts/user";


export default function SignInBtn() {

    // Here we are using the hooks to check the user
    const [, setUser] = useContext(UserContext).user;

    const signInBtnClick = async () => {
        let userBySignin = await signInWithGoogle();
        if (userBySignin) setUser(userBySignin);
        //console.log(userBySignin);
    };



    return (
        <div className="signInBtn" onClick={signInBtnClick}>
            <p>Sign-in with Google</p>
        </div>)
}