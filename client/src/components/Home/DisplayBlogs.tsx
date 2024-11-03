import { useState, useEffect } from 'react';
import axios from 'axios';
import blogsType from '../../types/BlogType';
import BlogCard from './BlogCard';

const DisplayBlogs = () => {
    const [blogs, setBlogs] = useState<blogsType[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true)
                const url=import.meta.env.VITE_BACKEND_URL
                const response = await axios.get(url+'/api/v1/blog/allblogs');
                console.log(response.data)
                setBlogs(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);
    if(isLoading) return <div>
        <p className="text-center">Loading...</p>
    </div>
    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
            {
                blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog}/>
                ))
            }
        </div>
    );
};

export default DisplayBlogs;
