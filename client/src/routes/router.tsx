import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage";
import NewBlog from "../components/Features/NewBlog";

const BlogRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/newblog" element={<NewBlog/>} />
    </Routes>
  )
}

export default BlogRouter