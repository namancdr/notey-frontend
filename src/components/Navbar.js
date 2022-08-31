import {Link, useLocation, useNavigate} from 'react-router-dom'
import profileIcon from '../assets/profile.png'
import logo from '../assets/logo.png'


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogout= () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link className="navbar-brand light" to="/"><img src={logo} className="logo" alt="Notey" /></Link>
                
                
                {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link to='/login' className="btn  mx-1" role="button">Login</Link>
                        <Link to='/signup' className="btn btn-primary mx-1" role="button">Signup</Link>
                    </form> : 
                    <form className='d-flex'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname==='/profile' ? "active" : "" }`} aria-current="page" to="/profile"><img src={profileIcon} className="profileIcon" alt="Profile" /></Link>}
                            </li>
                                
                        </ul> 
                        <button onClick={handleLogout} className="btn btn-danger mx-1">Logout</button>
                    </form>
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar