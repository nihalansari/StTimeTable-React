import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from "./auth";

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Course Monitor</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/course" className="nav-link">Courses</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="nav-link" onClick={()=> auth.logout(() => {console.log("logged out")}) }>Logout</Link>
                        </li>


                    </ul>
                </div>
            </nav>
        );
    }
}
