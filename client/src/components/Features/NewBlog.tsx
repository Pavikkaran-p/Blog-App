import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../config/api";
import { endpoints } from "../../constants/endpoints";

const NewBlog = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<String|null>("")

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      setTags([...tags, event.currentTarget.value.trim()]);
      event.currentTarget.value = "";
      event.preventDefault();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUploadImage = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${url}/api/v1/blog/uploadfile`, formData, {
        // onUploadProgress: (progressEvent) => {
        //   const { loaded, total } = progressEvent;
        //   setImageUploadProgress(Math.round((loaded * 100) / total));
        // }
        
      });
      console.log(response.data);
      setImageUrl(response.data.fileUrl)
      setImageUploadProgress(null);
      toast.success("Image uploaded sucessfully")
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed")
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 border border-gray-200">
  <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Create a New Blog</h1>
  <Formik
    initialValues={{ title: "", content: "", tags: [] }}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      try {
        await handleUploadImage();
        const blogData = { ...values, tags, imageUrl };
        await api.post(endpoints.blog.create, blogData);
        setStatus({ success: true });
        toast.success("Blog created successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to create blog.");
        setStatus({ success: false });
      } finally {
        setSubmitting(false);
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Title</label>
          <Field
            type="text"
            name="title"
            placeholder="Enter your blog title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="title" component="div" className="text-red-500 mt-1 text-sm" />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Blog Image</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setFile(files[0]);
                }
              }}
              className="mb-2 sm:mb-0"
            />
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={imageUploadProgress !== null}
              className={`bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition ${
                imageUploadProgress ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {imageUploadProgress ? (
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full" />
                  Uploading...
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Content</label>
          <Field
            as="textarea"
            name="content"
            placeholder="Write your blog content here..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage name="content" component="div" className="text-red-500 mt-1 text-sm" />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Tags</label>
          <input
            type="text"
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap mt-3 gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Blog"}
        </button>
      </Form>
    )}
  </Formik>
</div>

  );
};

export default NewBlog;
