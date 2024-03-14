import './Navbar.css'
import menu from "../assets/menu.png"
import logo from "../assets/logo.png"
import search from "../assets/search.png"
import upload_icon from "../assets/upload.png"
import more_icon from "../assets/more.png"
import notification_icon from "../assets/notification.png"
import profile_icon from "../assets/jack.png"
import YouTube_Logo from "../assets/YouTube_Logo.png"
import { Link } from 'react-router-dom'
const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'> 
      <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=> setSidebar(prev=> prev===false ? true : false)} src={menu} alt="" />
            <Link to={"/"}>   

            <img className='logo' src={YouTube_Logo} alt="" />
            </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="searchbox flex-div">
        <input type="text" placeholder='Search' />
        <img src={search} alt="" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img  className='profile_icon' src={profile_icon} alt="" />
      </div>
    </nav>
  )
}

export default Navbar
