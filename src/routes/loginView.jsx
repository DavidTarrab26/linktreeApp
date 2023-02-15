import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";

const LoginView = () => {

    const [currentUser, setCurrentUser] = useState(null)
    /* State 
    1: loading
    2: login completo
    3: login pero sin registro
    4: no hay nadie logueado */
    const [state, setState] = useState(0)


    useEffect(()=>{
        setState(1)
        onAuthStateChanged(auth, handleUserStateChanged)
    },[])

    async function handleUserStateChanged(user) {
        if (user) {
            const isRegistered = await userExists(user.uid)
            if (isRegistered) {
                setState(2)
            } else{
                setState(3)
            }
        }else{
            setState(4)
            console.log("no hay nadie logueado")
        }
    }  

    async function onHandleClick() {
        const googleProvider = new GoogleAuthProvider()
        await signInWithGoogle(googleProvider)
    }

    async function signInWithGoogle (googleProvider) {
        try {
            const res = await signInWithPopup(auth, googleProvider)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
    <>    
        {state == 1 ? 
            <div>LOADING...</div>
        :
        state == 3 ?
            <div>Estas logueado pero no registrado</div>
        : 
            <div>No hay nadie logueado</div>
        }
    </>    
     );
}
 
export default LoginView;