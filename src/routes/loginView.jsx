import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import {useNavigate} from "react-router-dom";
import Authprovider from "../components/authprovider";
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
            <div>
                <button onClick={onHandleClick}>Login with Google</button>
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