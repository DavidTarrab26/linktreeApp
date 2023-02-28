import './linkPublic.css'

const LinkPublic = ({url, title}) => {
    return ( 
        <div>
            <button className="btn btn-warning btn-public">
                {/* falta url mal la direccion */}
                <a className="link-public text-white" href={url}>{title}</a>
            </button>
        </div>
     );
}
 
export default LinkPublic;