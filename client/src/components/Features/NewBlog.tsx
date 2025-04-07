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
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">New Blog</h1>
      <Formik
        initialValues={{ title: "", content: "", tags: [] }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            await handleUploadImage();
            const blogData = { ...values, tags, imageUrl };
            await api.post(endpoints.blog.create, blogData);
            setStatus({ success: true });
          } catch (error) {
            console.error(error);
            setStatus({ success: false });
          } finally {
            setSubmitting(false);
          }          
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <Field
                type="text"
                name="title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setFile(files[0]);
                  }
                }}
                className="file-input"
              />
              <button
                type="button"
                className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition ${
                  imageUploadProgress ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleUploadImage}
                disabled={imageUploadProgress !== null}
              >
                {imageUploadProgress ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white" style={{ borderTopColor: 'transparent' }} />
                    <span className="ml-2">{`${imageUploadProgress || 0}%`}</span>
                  </div>
                ) : (
                  'Upload Image'
                )}
              </button>
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Content</label>
              <Field
                as="textarea"
                name="content"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="content" component="div" className="text-red-500 mt-1" />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Tags</label>
              <input
                type="text"
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add tag"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-1 mr-2 mb-2"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 font-bold"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition ${
                isSubmitting ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBlog;
