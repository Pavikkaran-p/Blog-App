import { useNavigate } from "react-router-dom"
import blogsType from "../../types/BlogType"

export interface BlogCardType{
  blog: blogsType
}

const BlogCard: React.FC<BlogCardType> = ({blog}) => {
  const navigate=useNavigate()
  function onClickHandler(){
    const id=blog._id
    navigate(`/blog/${id}`)
  }
  return (
    <>
      <div onClick={onClickHandler}
      
      className="bg-white p-4 shadow-md rounded-lg mb-4 hover:cursor-pointer">
        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-700">{blog.content}</p>
      </div>
    </>
  )
}

export default BlogCard