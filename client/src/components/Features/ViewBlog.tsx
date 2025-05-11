import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackendUrl } from "../../config/AppConfig";
import api from "../../config/api";

const ViewBlog = () => {
  const { blogId } = useParams(); // ✅ extract blogid as string
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  useEffect(() => {
    
    const fetchBlog = async () => {
      try {
        const response = await api.get(`${BackendUrl}/api/v1/blog/getblog`, {
          headers: {
            blogId: blogId || "", // ✅ make sure it's a string
          },
        });
        setBlog(response.data);
        setComments(response.data['comments']);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    // const fetchComments = async () => {
    //   try {
    //     const response = await axios.get(`${BackendUrl}/api/v1/comment/getcomments`, {
    //       headers: {
    //         blogId: blogId || "",
    //       },
    //     });
    //     setComments(response.data);
    //   } catch (error) {
    //     console.error("Error fetching comments:", error);
    //   }
    // };

    console.log("blogId",blogId)
    if (blogId) {
      fetchBlog();
      // fetchComments();
    }
  }, []);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        `${BackendUrl}/api/v1/blog/newComment`,
        {
          blogId,
          text: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No blog found.</div>;
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 leading-tight sm:text-5xl">
          {blog.title}
        </h1>
  
        <div className="mt-8 text-lg text-gray-800 leading-relaxed prose max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-a:underline">
          <p>{blog.content}</p>
        </div>
      </div>
  
      <div className="w-full max-w-5xl mx-auto px-4 mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 border-b pb-2">Comments</h2>
  
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Comment
          </button>
        </form>
  
        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 italic">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
                <p className="text-gray-700 mb-2">{comment.text}</p>
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>{comment.user?.name || "Anonymous"}</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
  
};

export default ViewBlog;
