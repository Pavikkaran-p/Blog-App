import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserIcon from "../UI/UserIcon";
// import AuthNavBar from "./AuthNavBar"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("authtoken")!==null) {
      setIsLoggedIn(true);
    }
  }, [])
  
  return (
    <div className="flex justify-between items-center text-xl sm:text-xl lg:text-2xl sm:mx-2 py-2 bg-blue-50 rounded-b-2xl">
        <div className=" ">
          <span className="mx-2 pl-2 text-orange-500">
            <Link to={'/home'}>Home</Link>
          </span>
          <span className="mx-2">
            <Link to={'/myblogs'}>My Blogs</Link>
          </span>
          <span className="mx-2">
            <Link to={'/newblog'}>Write</Link>
          </span>
        </div>
        
        {(isLoggedIn===true)?
        <div className="ml-32 pl-12">
          <UserIcon/>
        </div>
        
        :
        <>
        <div className=" px-4 block sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-black dark:text-black"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
              />
          </svg>
        </div>
        
        <div className="hidden sm:flex">
          <Link className="mx-2" to={'/signin'}>
            <span>Sign in</span>
          </Link>
          <Link to={'/signup'}>
          <span>Sign up</span>
          </Link>
        </div>
        </>
      }
    </div>
  )
}

export default NavBar