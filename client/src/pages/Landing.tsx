import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div>
      <div className="mx-32 mt-60 ">
      <h1 className="px-32 text-3xl">A place to read, write, and deepen your understanding</h1>
      </div>
      <button className="text-2xl bg-black text-white mt-40 mx-60 px-4 py-1 rounded-3xl">
        <Link to={'/home'}>Get started</Link>
      </button>
    </div>
  )
}

export default Landing