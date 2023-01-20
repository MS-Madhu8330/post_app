// For authentication purpose we are using auth.js
import { auth, provider } from "../firebase";

export const signInWithGoogle = async () => {
    let user;
    await auth
        .signInWithPopup(provider)
        .then((res) => {
            user = res.user;
        })
        .catch((error) => {
            console.log(error.message);
        });
    // we are using await and async because once the user authentication completed then only it has to return the user.
    return user;
}

// Logout functionality

export const logout = async () => {
    let logout_success;
    // we are creating a flag for logout purpose.
    await auth.signOut
        .then(() => {
            logout_success = true;
        })
        .catch((error) => {
            console.log(error.message);
        });
    return logout_success;

}