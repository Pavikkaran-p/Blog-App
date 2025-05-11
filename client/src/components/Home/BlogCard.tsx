import { useNavigate } from "react-router-dom";
import blogsType from "../../types/BlogType";

export interface BlogCardType {
  blog: blogsType;
}

const BlogCard: React.FC<BlogCardType> = ({ blog }) => {
  const navigate = useNavigate();
  const onClickHandler = () => navigate(`/blog/${blog.blogId}`);

  return (
    <div
      onClick={onClickHandler}
      className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
    >
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
