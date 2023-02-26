import Authprovider from "../components/authprovider";
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import { existUsername, updateUser } from "../firebase/firebase";
import "./chooseUserNameView.css"

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
    const handleContinue = async () => {
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
            <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div className="cont-per">
                    <h2>Bienvenido {currentUser.displayName}</h2>
                    <p>Para terminar el registro elige un nombre de usuario!</p>
                    <div className="mt-3">
                        <input type="text" onInput={handleInputUserName} />
                    </div>
                    {state == 5 ? <p className="text-danger">El nombre del usuario ya existe!</p>: ""}
                    <div>
                        <button className="btn btn-primary mt-5" onClick={handleContinue}>Continuar</button>
                    </div>
                </div>
            </div>
        )
    }
    if (state == 6) {
        return(
            <div className="container shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                <div className="cont-per">
                    <h2>Felicidades ya puedes ir al panel a crear tus links</h2>
                    <Link to="/dashboard" className="btn btn-primary mt-5">Continuar</Link>
                </div>
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