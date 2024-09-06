import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage";

const BlogRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<HomePage/>} />
    </Routes>
  )
}

export default BlogRouter