import { Link } from "react-router-dom"

function AuthNavBar() {
  return (
    <div className=" ">
      <Link to={'/signin'}>
        <span>Sign in</span>
      </Link>
      <Link to={'/signup'}>
      <span>Sign up</span>
      </Link>
    </div>
  )
}

export default AuthNavBar