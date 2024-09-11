import { useState, useEffect } from 'react';
import axios from 'axios';
import blogsType from '../../types/BlogType';

const DisplayBlogs = () => {
    const [blogs, setBlogs] = useState<blogsType[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true)
                const url=import.meta.env.VITE_BACKEND_URL
                const response = await axios.get(url+'/blog/allblogs');
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
                    <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
                        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-700">{blog.content}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default DisplayBlogs;
