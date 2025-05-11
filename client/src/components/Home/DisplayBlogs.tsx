import { useState, useEffect } from 'react';
import axios from 'axios';
import blogsType from '../../types/BlogType';
import BlogCard from './BlogCard';

const DisplayBlogs = () => {
  const [blogs, setBlogs] = useState<blogsType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const url = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(url + '/api/v1/blog/allblogs');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Latest Blog Posts</h1>
        {isLoading ? (
          <div className="text-center text-lg text-gray-600">Loading blogs...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayBlogs;
