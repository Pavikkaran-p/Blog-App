import { Link } from "react-router-dom"
import AuthNavBar from "./AuthNavBar"

function NavBar() {
  return (
    <div>
        <span>
          <Link to={'/home'}>Home</Link>
        </span>
        <span>
          <Link to={'/myblogs'}>My Blogs</Link>
        </span>
        <AuthNavBar/>
    </div>
  )
}

export default NavBar