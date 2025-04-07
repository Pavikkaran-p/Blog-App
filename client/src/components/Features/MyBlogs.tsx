import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BackendUrl } from '../../config/AppConfig';
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(BackendUrl+'/api/v1/blog/allblogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blogs</h1>
      {blogs.map((blog:any, index:number) => (
        <div onClick={() => handleBlogClick(blog._id)} key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 flex">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">{blog.content}</p>
            <div className="flex flex-wrap">
              {blog.tags && blog.tags.map((tag:string, tagIndex:number) => (
                <div key={tagIndex}>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 ml-4">
            <img src={blog.imageUrl} alt="img" className="w-32 h-32 rounded-2xl  object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;