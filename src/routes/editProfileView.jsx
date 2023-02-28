import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import { getProfileFotoUrl, setUserProfileFoto, updateUser } from "../firebase/firebase";
import "./editProfileView.css"

const EditProfileView = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    const [profileUrl, setProfileUrl] = useState(null)
    const fileRef = useRef(null)

    const handleUserLogin = async (user) => {
        setCurrentUser(user)
        const url = await getProfileFotoUrl(user.profilePicture)
        setProfileUrl(url)
        setState(2)
    }
    const handleUserNotRegister = () => {
        navigate('/login')
    }
    const handleUserNotLogin = () => {
        navigate('/login')
    }

    const handleOpenFilePicker = () => {
        if(fileRef.current){
            fileRef.current.click()
        }
    }
    const handleChangeFile = (e)=>{
        const files = e.target.files
        const fileReader = new FileReader()

        if(fileReader && files && files.length > 0){
            fileReader.readAsArrayBuffer(files[0])
            fileReader.onload = async function(){
                const imageData = fileReader.result
                const res = await setUserProfileFoto(currentUser.uid, imageData)
                
                if(res){
                    const tmpUser = {...currentUser}
                    tmpUser.profilePicture = res.metadata.fullPath
                    await updateUser(tmpUser)
                    setCurrentUser({...tmpUser})
                    const url = await getProfileFotoUrl(currentUser.profilePicture)
                    setProfileUrl(url)
                }
            }

        }
    }

    if(state !== 2){
        return(
            <Authprovider 
                    onUserLogin={handleUserLogin} 
                    onUserNotRegister={handleUserNotRegister}
                    onUserNotLogin={handleUserNotLogin}
                ></Authprovider>
        )
    }
    return (   
            <div className="container">
                <h3 className="title-profile">Edit Profile Info</h3>
                <div className="cont-profile">
                    <div>
                        <div>
                            <img src={profileUrl} alt="" className="fto-profile" />
                        </div>
                        <div>
                            <button className="btn btn-dark" onClick={handleOpenFilePicker}>Selecciona una nueva foto de perfil</button>
                            <input ref={fileRef} type="file" style={{display:"none"}} onChange={handleChangeFile} />
                        </div>
                    </div>
                    <div className="cont-txt">
                        <div className="d-flex m-2">
                            {/* falta la funcion de los botones de edit */}
                            <button className="btn btn-secondary mx-2"><i className="bi bi-pencil"></i></button>
                            <h2 className="txt-name">{currentUser.username}</h2>
                        </div>
                        <div className="d-flex m-2">
                            {/* falta la funcion de los botones de edit */}
                            <button className="btn btn-secondary mx-2"><i className="bi bi-pencil"></i></button>
                            <h2>{currentUser.displayName}</h2>
                        </div>
                    </div>
                </div>
            </div>
     );
}
 
export default EditProfileView;