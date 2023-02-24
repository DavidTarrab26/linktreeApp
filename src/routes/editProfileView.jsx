import DashboardWrapper from "../components/dashboardWrapper";
import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useRef, useState } from "react";
import { async } from "@firebase/util";
import { getProfileFotoUrl, setUserProfileFoto, updateUser } from "../firebase/firebase";

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
            <DashboardWrapper>
                <div>
                    <h3>Edit Profile</h3>
                    <h1>{currentUser.username}</h1>
                    <div>
                        <div>
                            <img src={profileUrl} alt="" width={100} />
                        </div>
                        <div>
                            <button onClick={handleOpenFilePicker}>Selecciona una nueva foto de perfil</button>
                            <input ref={fileRef} type="file" style={{display:"none"}} onChange={handleChangeFile} />
                        </div>
                    </div>
                </div>
            </DashboardWrapper>
     );
}
 
export default EditProfileView;