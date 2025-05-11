import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "../UI/UserIcon";

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showAuthLinks, setShowAuthLinks] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleAuthLinks = () => {
    setShowAuthLinks((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setShowAuthLinks(false);
    navigate("/signin");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left navigation */}
          <div className="flex space-x-6">
            <Link
              to="/home"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/myblogs"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
            >
              My Blogs
            </Link>
            <Link
              to="/newblog"
              className="text-lg font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Write
            </Link>
          </div>

          {/* Right Auth Section */}
          <div className="relative">
            {isLoggedIn ? (
              <div>
                <div
                  onClick={toggleAuthLinks}
                  className="flex items-center cursor-pointer hover:opacity-80"
                >
                  <UserIcon />
                </div>
                {showAuthLinks && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={toggleAuthLinks}
                  className="text-blue-600 font-medium hover:text-blue-700 transition"
                >
                  Account
                </button>
                {showAuthLinks && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 animate-fade-in">
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
