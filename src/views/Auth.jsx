import {auth, provider} from "../firebase.js";
import {signInWithPopup} from "firebase/auth";
import Cookies from "universal-cookie";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../features/post/authSlice.js";
import {useNavigate} from "react-router-dom";

const cookies = new Cookies();

export const Auth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);

            dispatch(setUser({displayName: result.user.displayName, email: result.user.email}))
            dispatch(setToken(result.user.refreshToken))
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="auth">
            <p> Sign In With Google To Continue </p>
            <button onClick={signInWithGoogle}> Sign In With Google</button>
        </div>
    );
};
