import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import HomePage from "../pages/HomePage";
import NewBlog from "../components/Features/NewBlog";
import SigninPage from "../pages/Auth/SigninPage";
import SignupPage from "../pages/Auth/SignupPage";
import ViewBlog from "../components/Features/ViewBlog";
import MyBlogs from "../components/Features/MyBlogs";
import Profile from "../pages/Profile";
const BlogRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/blog/:blogId" element={<ViewBlog/>} />
        <Route path="/newblog" element={<NewBlog/>} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/myblogs" element={<MyBlogs/>} />
        <Route path="/profile" element={<Profile/>} />
    </Routes>
  )
}

export default BlogRouter