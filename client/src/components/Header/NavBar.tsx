import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import UserIcon from "../UI/UserIcon";
// import AuthNavBar from "./AuthNavBar"

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthLinks, setShowAuthLinks] = useState(false)

  useEffect(() => {
    // setIsLoggedIn(true);
    if (localStorage.getItem("authtoken")!==null) {
      setIsLoggedIn(true);
    }
  }, [])
  
  const toggleAuthLinks = () => {
    setShowAuthLinks(!showAuthLinks);
  }

  return (
    <div className="flex justify-between items-center text-xl sm:text-xl lg:text-2xl sm:mx-2 py-2 bg-blue-50 rounded-b-2xl shadow-lg">
      <div className="flex space-x-4 mx-4">
        <span className="text-orange-500 hover:text-orange-600 transition duration-300">
          <Link to={'/home'}>Home</Link>
        </span>
        <span className="hover:text-orange-600 transition duration-300">
          <Link to={'/myblogs'}>My Blogs</Link>
        </span>
        <span className="hover:text-orange-600 transition duration-300">
          <Link to={'/newblog'}>Write</Link>
        </span>
      </div>
      
      {isLoggedIn ? (
        <div className="relative ml-32 pl-12">
          <div onClick={toggleAuthLinks} className="cursor-pointer">
            <UserIcon />
          </div>
          {showAuthLinks && (
            <ul className="absolute right-0 mt-4 w-48 bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 transform scale-95 origin-top-right">
              <li className="border-b border-gray-200 hover:bg-gray-100">
                <Link className="block px-4 py-2" to={'/profile'}>
                  Profile
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link className="block px-4 py-2" to={'/logout'}>
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="relative">
          <button onClick={toggleAuthLinks} className="text-orange-500 hover:text-orange-600 transition duration-300">
            Account
          </button>
          {showAuthLinks && (
            <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 transform scale-95 origin-top-right">
              <li className="border-b border-gray-200 hover:bg-gray-100">
                <Link className="block px-4 py-2" to={'/signin'}>
                  Sign in
                </Link>
              </li>
              <li className="hover:bg-gray-100">
                <Link className="block px-4 py-2" to={'/signup'}>
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default NavBar