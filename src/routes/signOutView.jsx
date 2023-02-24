import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import { logout } from "../firebase/firebase";

const SignOutView = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)

    const handleUserLogin = () => {
        setState(8)
    }
    const handleUserNotRegister = () => {
        navigate('/login')
    }
    const handleUserNotLogin = () => {
        navigate('/login')
    }
    const handleLogout = async () => {
        await logout()
    }
    const handleCancelLogout = () => {
        navigate('/dashboard')
    }
    if(state === 8) {
        return(
            <div>
                <h2>Estas seguro que quieres cerrar sesion?</h2>
                <button onClick={handleCancelLogout}>No</button>
                <button onClick={handleLogout} >Si</button>
            </div>
        )
    }
    return ( 
        <Authprovider 
            onUserLogin={handleUserLogin} 
            onUserNotRegister={handleUserNotRegister}
            onUserNotLogin={handleUserNotLogin}
        ></Authprovider>
    )
}
 
export default SignOutView;