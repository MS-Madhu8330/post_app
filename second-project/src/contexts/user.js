
// when we want to use user authentication within the app, ex- in settings, we are creating the contexts user.js and we can re use this one where ever we want.

import {createContext, useState} from "react";

export const UserContext=createContext();

export const UserContextProvider=(props)=>{
    const[user, setUser]=useState(null);

    return (
        <UserContext.Provider value={{user:[user, setUser] }}>
            {props.children}
            </UserContext.Provider>
    );
};