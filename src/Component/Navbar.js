import React, {useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";

import ListComponent from './ListComponent';

const Navbar = () => {
    let location = useLocation();
    useEffect(() => {
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <ListComponent
                        itemList={[{title: "Home",url: "/"},{title: "About",url: "/about"}]}
                        renderItem={(item, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <Link className={`nav-link ${location.pathname === item.url ? "active" : ""}`} aria-current="page" to={item.url}>{item.title}</Link>
                                </li>
                            )
                        }}
                        />
                    </ul>
                    <form className="d-flex">
                        <Link className="btn btn-primary mx-3" to="/login" >Login</Link>
                        <Link className="btn btn-primary" to="/signup">SignUp</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
