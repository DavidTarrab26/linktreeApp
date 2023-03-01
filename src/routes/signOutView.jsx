import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { logout } from "../firebase/firebase";
import "./signOutView.css"

const SignOutView = () => {
    const navigate = useNavigate()
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
            <div className="cont-signout">
                <h2>Estas seguro que quieres cerrar sesion?</h2>
                <div>
                    <button className="btn btn-secondary m-1" onClick={handleCancelLogout}>No</button>
                    <button className="btn btn-danger m-1" onClick={handleLogout} >Si</button>
                </div>
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