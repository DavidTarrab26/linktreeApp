import Authprovider from "../components/authprovider";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { deleteLink, getLinks, insertNewLink, updateLink } from "../firebase/firebase";
import Enlace from "../components/enlace";
import "./dashboardView.css"


const DashboardView = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [state, setState] = useState(0)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [links, setLinks] = useState([])
    

    const handleUserLogin = async (user) => {
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

    const handleDeleteLink = async (docId) => {
        await deleteLink(docId)
        const tmp = links.filter(link => link.docId !== docId)
        setLinks([...tmp])
    }
    const handleUpdateLink = async (docId, title, url) => {
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
        <div className="cont-dash">
            <h2 className="titulo" >Panel De Control</h2>
            <div className="cont-form">
                <form className="form" action="" onSubmit={handleOnSubmit}>

                    <input type="text" placeholder="Titulo" className="form-control input" name="title" onChange={handleOnChange}/>

                    <input type="text" placeholder="URL" className="form-control input" name="url" onChange={handleOnChange}/>
                    <p className="txt-porfa">Por favor poner el link completo!!</p>
                    <p className="txt-ejemplo">ejemplo: https://www.instagram.com/ </p>
                    <input className="btn btn-primary" type="submit" value="Crear nuevo link" />
                </form>
            </div>
            <div>
                {links.map(link=>(
                    <Enlace key={link.docId} docId={link.docId} title={link.title} url={link.url} onDelete={handleDeleteLink} onUpdate={handleUpdateLink} />
                ))}
            </div>
        </div>
    )
}
 
export default DashboardView;