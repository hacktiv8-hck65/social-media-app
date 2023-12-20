import {Link, useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../firebase.js";
import {setToken, setUser} from "../features/post/authSlice.js";

const cookies = new Cookies();

function Navbar() {
    const navigate = useNavigate()


    const logout = async (event) => {
        event.preventDefault()
        try {
            cookies.remove("auth-token");
            navigate('/login')
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="container-navbar">
                <header>
                    <nav className="z-10 mb-5">
                        <div
                            className="flex flex-row items-center justify-between px-6 py-4 text-indigo-100 bg-indigo-900">
                            <h3 className="font-bold">
                                <Link to="/">Instax Forum</Link>
                            </h3>

                            <span onClick={logout}>Logout</span>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}

export default Navbar;
