import {Link} from "react-router-dom"
import "./navBar.css"

const NavBar = () => {
    return ( 
        //Esto muestra si el user esta logueado
        <div className="bg-dark nav d-flex align-items-center">
            <h1 className="txt-nav logo">LOGO</h1>
            <div className="d-flex justify-content-between cont-menu">
                <Link to={"/dashboard"} className="txt-nav">Panel de control</Link>
                <Link to={"/dashboard/profile"} className="txt-nav">Perfil</Link>
                <Link to={"/signout"} className="txt-nav">Cerrar Sesion</Link>
            </div>
        </div>
        );
}
 
export default NavBar;