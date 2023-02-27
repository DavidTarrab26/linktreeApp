import { useEffect, useRef, useState } from "react"
import "./enlace.css"

const Enlace = ({docId, title, url, onDelete, onUpdate}) => {
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
        <div key={docId} className="shadow p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-between">
            <div>
                {editTitle ? 
                <>
                    <input type="text" value={currentTitle} ref={titleRef} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
                </>
                :
                <div className="d-flex">
                    <button className="btn btn-secondary" onClick={handleEditTitle}><i className="bi bi-pencil"></i></button>
                    <h4 className="title">{currentTitle}</h4>
                </div>   
                }
                <div>
                {editUrl ? 
                <>
                    <input type="text" value={currentUrl} ref={urlRef} onChange={handleChangeUrl} onBlur={handleBlurUrl} />
                </>
                :
                <div className="d-flex mt-3">
                    <button className="btn btn-secondary" onClick={handleEditUrl}><i className="bi bi-pencil"></i></button>
                    <h4 className="url">{currentUrl}</h4>
                </div>   
                }
                </div>
            </div>
            <div className="d-flex align-items-center m-3">
                <button className="btn btn-outline-danger" onClick={handleDelete}><i className="bi bi-trash-fill iconBasura"></i></button>
            </div>
        </div>
    )
}
 
export default Enlace;