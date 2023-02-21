import { useState } from "react"

export default function Enlace({docId, title, url, onDelete, onUpdate}){

    const [currentTitle, setCurrentTitle] = useState(title)
    const [currentUrl, setCurrentUrl] = useState(url)
    const [EditTitle, setEditTitle] = useState(false)
    const [EditUrl, setEditUrl] = useState(false)

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
    return(
        <div key={docId}>
            <div>
                {EditTitle ? 
                <>
                    <input type="text" value={currentTitle} onChange={handleChangeTitle} />
                </>
                :
                <div>
                    <button onClick={handleEditTitle}>Editar</button>
                    <h4>{title}</h4>
                </div>   
                }
                <div>
                {EditUrl ? 
                <>
                    <input type="text" value={currentUrl} onChange={handleChangeUrl} />
                </>
                :
                <div>
                    <button onClick={handleEditUrl}>Editar</button>
                    <h4>{url}</h4>
                </div>   
                }
                </div>
            </div>
            <div>
                <button>Eliminar</button>
            </div>
        </div>
    )
}