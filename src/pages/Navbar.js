import React, {useRef} from 'react'
import { NavLink, Link} from 'react-router-dom'

function Navbar(props) {

  const navbar = useRef(null)

  const handleClick = () => {
    if(navbar.current.className === 'closed'){
      navbar.current.className = 'open'
    }
    else{
      navbar.current.className = 'closed'
    }
  }
  

  return (
    <header className='navbar'>
      <h1>{props.webName}</h1>
        <ul ref={navbar} className='closed'>
            <li><NavLink to='/' className={(navData) => (navData.isActive ? "active-style" : 'none')}>Home</NavLink></li>
            <li><NavLink to='/mystash' className={(navData) => (navData.isActive ? "active-style" : 'none')}>Watched Movies</NavLink></li>
            <li><NavLink to='/search' className={(navData) => (navData.isActive ? "active-style" : 'none')}>Search</NavLink></li>
            <li><NavLink to='/about' className={(navData) => (navData.isActive ? "active-style" : 'none')}>About</NavLink></li>
        </ul>
        <button onClick={handleClick} id="menu" className="header__menu">☰</button>
    </header>
  )
}

export default Navbar