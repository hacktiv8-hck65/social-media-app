import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../firebase.js";
import {setToken, setUser} from "../features/post/authSlice.js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signInWithGoogle = async (event) => {
        event.preventDefault()
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);

            dispatch(setUser({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }))
            dispatch(setToken(result.user.refreshToken))
            navigate('/')
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="container-login flex h-screen items-center justify-center">
                <div
                    className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                    <div className="w-full">
                        <div className="text-center">
                            <h1
                                className="text-3xl font-semibold text-gray-900"
                                style={{
                                    fontfamily: "serif",
                                    letterSpacing: "2px",
                                    fontWeight: "bold",
                                }}
                            >
                                Sign In
                            </h1>
                            <p className="mt-2 text-gray-500">
                                Sign in below to access your account
                            </p>
                        </div>
                        <div className="mt-5">
                            <form action="">

                                <div className="my-6">
                                    <button
                                        onClick={signInWithGoogle}
                                        type="submit"
                                        className="w-full rounded-m px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                                        style={{
                                            backgroundColor: "black",
                                            borderRadius: "7px",
                                            fontWeight: "bold",
                                            letterSpacing: "2px",
                                        }}
                                    >
                                        SIGN IN
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
