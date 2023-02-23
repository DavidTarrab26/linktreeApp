import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { deleteLink, getLinks, insertNewLink, updateLink } from "../firebase/firebase";
import Enlace from "../components/enlace";


const DashboardView = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [links, setLinks] = useState([])
    

    async function handleUserLogin (user) {
        setCurrentUser(user)
        setState(2)
        const resLinks = await getLinks(user.uid)
        setLinks([...resLinks])
    }
    const handleUserNotRegister = (user) => {
        navigate('/login')
    }
    const handleUserNotLogin = () => {
        navigate('/login')
    }



    const handleOnSubmit = (e) => {
        e.preventDefault()
        addLink()
    }
    const addLink = () => {
        if(title !== "" && url !== ""){
            const newLink = {
                id: uuidv4(),
                title: title,
                url: url,
                uid: currentUser.uid
            }
            const res = insertNewLink(newLink)
            newLink.docId = res.id
            setTitle('')
            setUrl('')
            setLinks([...links, newLink])
        }
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        if (e.target.name == 'title'){
            setTitle(value)
        } 
        if (e.target.name == 'url'){
            setUrl(value)
        }
    }

    async function handleDeleteLink(docId) {
        await deleteLink(docId)
        const tmp = links.filter(link => link.docId !== docId)
        setLinks([...tmp])
    }
    async function handleUpdateLink (docId, title, url){
        const link = links.find(link => link.docId == docId)
        link.title = title
        link.url = url
        await updateLink(docId, link)
    }
    if(state == 0){
        return ( 
            <Authprovider 
                onUserLogin={handleUserLogin} 
                onUserNotRegister={handleUserNotRegister}
                onUserNotLogin={handleUserNotLogin}
            >  
            <h1>Loading...</h1>
            </Authprovider>
         );
    }

    return(
        <DashboardWrapper>
            <div>
                <h2>Dashboard</h2>

                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Titulo</label>
                    <input type="text" name="title" onChange={handleOnChange}/>

                    <label htmlFor="url">URL</label>
                    <input type="text" name="url" onChange={handleOnChange}/>

                    <input type="submit" value="Crar nuevo link" />
                </form>
                <div>
                    {links.map(link=>(
                        <Enlace key={link.docId} docId={link.docId} title={link.title} url={link.url} onDelete={handleDeleteLink} onUpdate={handleUpdateLink} />
                    ))}
                </div>
            </div>
        </DashboardWrapper>
    )
}
 
export default DashboardView;