import { Link } from "react-router-dom"
import AuthNavBar from "./AuthNavBar"

function NavBar() {
  return (
    <div className="flex text-xl mx-2">
        <div className="w-full ">
          <span className="mx-2">
            <Link to={'/home'}>Home</Link>
          </span>
          <span className="mx-2">
            <Link to={'/myblogs'}>My Blogs</Link>
          </span>
          <span className="mx-2">
            <Link to={'/newblog'}>Write</Link>
          </span>
        </div>
        <AuthNavBar/>
    </div>
  )
}

export default NavBar