import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

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
      const response = await axios.post(`${url}/blog/uploadfile`, formData, {
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
    <div className="sm:px-28 sm:py-14 sm:mx-12 flex-col items-center rounded-2xl text-2xl justify-center">
      <h1>New Blog</h1>
      <Formik
        initialValues={{ title: "", content: "", tags: [] }}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const url = import.meta.env.VITE_BACKEND_URL;
            handleUploadImage()
            const blogData = { ...values, tags,imageUrl };
            await axios.post(`${url}/blog/newblog`, blogData);
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
          <Form className="mx-2 px-6 sm:px-12 py-4 rounded-xl shadow-md shadow-slate-500">
            <div className="justify-center">
              <p>Title</p>
              <Field
                type="text"
                name="title"
                className="bg-gray-100 border-none rounded-xl"
              />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>

            <div className="mt-5 flex gap-4 items-center justify-between border-4  p-3">
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
                className={`bg-gradient-to-r rounded-2xl from-purple-500 to-blue-500 text-white p-2 hover:bg-opacity-90 ${
                  imageUploadProgress ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleUploadImage}
                disabled={imageUploadProgress !== null}
              >
                {imageUploadProgress ? (
                  <div className="w-16 h-16 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" style={{ borderTopColor: 'transparent' }} />
                    <span className="absolute text-white">{`${imageUploadProgress || 0}%`}</span>
                  </div>
                ) : (
                  'Upload Image'
                )}
              </button>
            </div>

            <div>
              <p>Content</p>
              <Field
                as="textarea"
                name="content"
                className="bg-gray-100 border-none rounded-xl"
              />
              <ErrorMessage name="content" component="div" className="text-red-500" />
            </div>

            <div>
              <p>Tags</p>
              <input
                type="text"
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add tag"
                className="bg-gray-100 border-none rounded-xl px-2"
              />
              <div className="flex flex-wrap mt-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 rounded-full px-4 py-1 mr-2 mb-2"
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
              className={`${isSubmitting ? "cursor-not-allowed" : ""}`}
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
