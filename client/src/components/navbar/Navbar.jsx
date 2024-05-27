import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/Authcontext'

const Navbar = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
            <span className="logo">Booking App</span>
          </Link>
{     user ? user.name :       <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login">
            <button className="navButton">Login</button>
            </Link>
        </div>
}        </div>
    </div>
  )
}

export default Navbar