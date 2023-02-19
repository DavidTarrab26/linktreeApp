import Authprovider from "../components/authprovider";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { existUsername, updateUser } from "../firebase/firebase";

const ChooseUserNameView = () => {
    const navigate = useNavigate()
    const [state, setState] = useState(0)
    const [currentUser, setCurrentUser] = useState({})
    const [username, setUsername] = useState("")

    const handleUserLogin = () => {
        navigate('/dashboard')
    }
    const handleUserNotRegister = (user) => {
        setCurrentUser(user)
        setState(3)
    }
    const handleUserNotLogin = () => {
        navigate('/login')
    }

    const handleInputUserName = (e) => {
        setUsername(e.target.value)
    }
    async function handleContinue() {
        if(username !== "") {
            const exists = await existUsername(username)
            if (exists){
                setState(5)
            }else{
                const tmp = {...currentUser}
                tmp.username = username
                tmp.processCompleted = true
                await updateUser(tmp)
                setState(6)
            }
        }
    }

    if (state == 3 || state == 5) {
        return(
            <div>
                <h2>Bienvenido {currentUser.displayName}</h2>
                <p>Para terminar el registro elige un nombre de usuario</p>
                {state == 5 ? <p>El nombre del usuario ya existe</p>: ""}
                <div>
                    <input type="text" onInput={handleInputUserName} />
                </div>
                <div>
                    <button onClick={handleContinue}>Continuar</button>
                </div>
            </div>
        )
    }
    if (state == 6) {
        return(
            <div>
                <h2>Felicidades ya puedes ir al Dashboard a crear tus links</h2>
                <Link to="/dashboard">Continuar</Link>
            </div>
        )
    }
    return ( 
        <Authprovider 
            onUserLogin={handleUserLogin} 
            onUserNotRegister={handleUserNotRegister}
            onUserNotLogin={handleUserNotLogin}
        >  
        </Authprovider>
     );
}
 
export default ChooseUserNameView;