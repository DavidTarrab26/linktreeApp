import Authprovider from "../components/authprovider";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";


const DashboardView = () => {
    const navigate = useNavigate()

    const handleUserLogin = () => {
        navigate('/dashboard')
    }
    const handleUserNotRegister = (user) => {
    }
    const handleUserNotLogin = () => {
        navigate('/login')
    }

    return ( 
        <Authprovider 
            onUserLogin={handleUserLogin} 
            onUserNotRegister={handleUserNotRegister}
            onUserNotLogin={handleUserNotLogin}
        >  
        <h1>holas</h1>
        </Authprovider>
     );
}
 
export default DashboardView;