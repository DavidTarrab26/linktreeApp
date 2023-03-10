import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkPublic from "../components/linkPublic";
import {existUsername, getProfileFotoUrl, getUserPublicProfileInfo} from "../firebase/firebase"
import "./publicProfileView.css"

const PublicProfileView = () => {
    const params = useParams()
    const [profile, setProfile] = useState(null)
    const [url, setUrl] = useState("")
    const [state, setState] = useState(0)

    useEffect(()=>{
        const getProfile = async () => {
            const username = params.username
            try {
                const userUid = await existUsername(username)
                if (userUid){
                    const userInfo = await getUserPublicProfileInfo(userUid)
                    setProfile(userInfo)

                    const url = await getProfileFotoUrl(userInfo.profileInfo.profilePicture)
                    setUrl(url)
                }else {
                    setState(7)
                }
            } catch (error) {
                console.error(error)
            }
        }
        getProfile()
    },[params])

    if(state === 7){
        return(
            <div>
                <h1>Ese usuario no existe</h1>
            </div>
        )
    }
    return ( 
        <div className="container cont-public">
            <h3 className="title-public">Public profile</h3>
            <img className="fto-public" src={url} alt="" />
            <div className="cont-txt-public">
                <h2 className="txt-public">{profile?.profileInfo.username}</h2>
                <h3>{profile?.profileInfo.displayName}</h3>
            </div>
            <div>
                {profile?.linksInfo.map(link => (
                    <LinkPublic key={link.docId} url={link.url} title={link.title} />
                ))}
            </div>
        </div>
     );
}
 
export default PublicProfileView;