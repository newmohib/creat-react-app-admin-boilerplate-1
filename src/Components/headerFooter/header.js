import React from 'react';
import { FaSignOutAlt,FaSearch } from "react-icons/fa";
import { NavLink, useHistory } from 'react-router-dom';

function Header() {
    const githubPath= process.env.REACT_APP_GITHUB_PATH;
    return (
        <div className="container-fluid">
            <div className="row navbar navbar-expand-lg navbar-light bg-light p-2 shadow bg-light rounded">
                <div className="col-auto mr-auto float-left">
                    <div>
                        <NavLink className="navbar-brand" to={`/${githubPath}`}>Home</NavLink>
                        <NavLink className="navbar-brand" to={`/${githubPath}/admin/users`} >Users</NavLink>
                    </div>
                </div>
                <div className="col-auto float-right">
                    <NavLink className="btn btn-outline-primary btn-sm" to={`/${githubPath}/signout`} ><span className="mr-2">Sign Out</span><span><FaSignOutAlt /></span></NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;
