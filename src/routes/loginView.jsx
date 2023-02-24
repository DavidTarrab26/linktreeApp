import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import {useNavigate} from "react-router-dom";
import Authprovider from "../components/authprovider";
import "./loginView.css"
const LoginView = () => {

    const navigate = useNavigate()
    /*const [currentUser, setCurrentUser] = useState(null)
    State 
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logueado
    5: ya existe el username
    6: nuevo username, click para continuar
    7: username no existe
    */
    const [state, setState] = useState(0)

    const onHandleClick = async() => {
        const googleProvider = new GoogleAuthProvider()
        await signInWithGoogle(googleProvider)
    }

    const signInWithGoogle = async (googleProvider) => {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            return res
        } catch (error) {
            console.error(error)
        }
    }

    const handleUserLogin = () => {
        navigate('/dashboard')
    }
    const handleUserNotRegister = () => {
        navigate('/choose-username')
    }
    const handleUserNotLogin = () => {
        setState(4)
    }

    if (state === 4) {
        return(
            <div className="container">
                <div className="cont-btn">
                    <div className="shadow p-3 mb-5 bg-body rounded p-5" >
                        <h1>Link Tree</h1>
                        <p>Bienvenido a Link Tree. La pagina donde podes guardar y compartir toda tu informacion de las redes</p>
                        <button onClick={onHandleClick} className="btn btn-primary login-btn">Login with Google</button>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <Authprovider 
            onUserLogin={handleUserLogin} 
            onUserNotRegister={handleUserNotRegister}
            onUserNotLogin={handleUserNotLogin}
        >
            <div>Loading...</div>        
        </Authprovider>
    );
}
 
export default LoginView;