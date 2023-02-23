import { useEffect, useRef, useState } from "react"

export default function Enlace({docId, title, url, onDelete, onUpdate}){

    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentUrl, setCurrentUrl] = useState(url)
    const [editTitle, setEditTitle] = useState(false)
    const [editUrl, setEditUrl] = useState(false)
    const titleRef = useRef(null)
    const urlRef = useRef(null)

    useEffect(()=>{
        if(titleRef.current){
            titleRef.current.focus()
        }
    },[editTitle])
    useEffect(()=>{
        if(urlRef.current){
            urlRef.current.focus()
        }
    },[editUrl])

    const handleEditTitle = () => {
        setEditTitle(true)
    }
    const handleEditUrl = () => {
        setEditUrl(true)
    }
    const handleChangeTitle = (e) => { 
        setCurrentTitle(e.target.value)
    }
    const handleChangeUrl = (e) => {
        setCurrentUrl(e.target.value)
    }
    const handleBlurTitle = (e) => {
        setEditTitle(false)
        onUpdate(docId, currentTitle, currentUrl)
    }
    const handleBlurUrl = (e) => {
        setEditUrl(false)
    }
    const handleDelete = () => {
        onDelete(docId)
    }

    return(
        <div key={docId}>
            <div>
                {editTitle ? 
                <>
                    <input type="text" value={currentTitle} ref={titleRef} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
                </>
                :
                <div>
                    <button onClick={handleEditTitle}>Editar</button>
                    <h4>{currentTitle}</h4>
                </div>   
                }
                <div>
                {editUrl ? 
                <>
                    <input type="text" value={currentUrl} ref={urlRef} onChange={handleChangeUrl} onBlur={handleBlurUrl} />
                </>
                :
                <div>
                    <button onClick={handleEditUrl}>Editar</button>
                    <h4>{currentUrl}</h4>
                </div>   
                }
                </div>
            </div>
            <div>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    )
}