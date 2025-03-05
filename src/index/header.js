import React from 'react'
import { Link } from 'react-router-dom'
// import Home from './Home'
// import Spareparts from '../Spareparts/spareparts'


function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link className="navbar-brand" to="https://gillsinternational.com/">
            <img src="https://gillsinternational.com/wp-content/uploads/2024/01/Gills-Logo-2.png" width="75" height="75" alt="" />
        </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/Home">Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/spareparts">Spare Parts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Pricing</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link " to="#">Requests</Link>
            </li>
            <li>
                <form className="form-inline my-2 my-lg-0 justify-item-right ">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

                    
            </form>
            </li>
            
    </ul>

    </div>
</nav>
    </header>



  )
}

export default Header
