import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { logoutUser } from "../redux/auth/authThunk";



export default function Header() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)
  return (
   <div className="navbar shadow-sm bg-base-100 px-10">
  <div className="navbar-start">
    <Link to="/dashboard" className="btn btn-ghost text-xl">Blog-App</Link>
  </div>

  <div className="navbar-end">
    <div className="me-3">
      <button>
        <IoSunny />
      </button>
    </div>
    
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto me-2" />
    {
      user ? 
         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li>
          <Link onClick={()=> dispatch(logoutUser()) }>Logout</Link>
        </li>
      </ul>
    </div>: 
    <Link to="/login" className="btn btn-outline-primary">Login</Link>
    }
  </div>
</div>
  )
}
