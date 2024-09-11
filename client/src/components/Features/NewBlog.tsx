// import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const NewBlog = () => {
  return (
    <div className="px-28 py-14 mx-12 rounded-2xl text-2xl justify-center">
      <h1>New Blog</h1>
      <Formik   
       initialValues={{ title: '', content: '' }}
        // validate={values => {
        //   const errors:{ title: string; content: string; } = {title:"",content:""};
        //   if (!values.title) {
        //     errors.title = 'Required';
        //   }
        //   if (!values.content) {
        //     errors.content = 'Required';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting, setStatus }) => {
          const submitBlog = async () => {
            try {
              const url=import.meta.env.VITE_BACKEND_URL
              await axios.post(`${url}/blog/newblog`, values);
              setStatus({ success: true });
            } catch (error) {
              console.log(error)
              setStatus({ success: false });
            } finally {
              setSubmitting(false);
            }
          };
          submitBlog();
        }}>
        {({ isSubmitting, status }) => (
          <Form className='px-12 py-4 rounded-xl shadow-xl shadow-slate-500'>
            <div className=" justify-center ">
              <p>Title</p>
              <Field
                type="text"
                name="title"
                className="bg-gray-100 border-none rounded-xl"
              />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>
            <div>
              <p>content</p>
              <Field
                as="textarea"
                name="content"
                className="bg-gray-100 border-none rounded-xl"
              />
              <ErrorMessage name="content" component="div" className="text-red-500" />
            </div>
            {status?.success === false && <p className="text-red-500">Submission failed. Please try again.</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBlog;
