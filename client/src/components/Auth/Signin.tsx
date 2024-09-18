import { useFormik } from "formik";
import axios from "axios";
import { BackendUrl } from "../../config/AppConfig";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "./GoogleAuthButton";
import toast from "react-hot-toast";
// import Button from "../UI/Button";

export default function SigninComponent() {
    const navigate=useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                console.log(values)
                
                const response  = await axios.post(BackendUrl+"/auth/signin", values);
                localStorage.setItem("authtoken",response.data.token)
                console.log("Sign-in successful", response.data);
                toast("Sign in sucessful")
                navigate('/home')
            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div>
                        <div className="px-10">
                            <div className="text-xl font-extrabold mb-10">
                                <p>Sign in to Blogs</p>
                            </div>
                        </div>
                        <div className="mb-2 bg-gray-50 border border-gray-300  rounded-xl w-full flex justify-center items-center">
                            {/* <p>Continue with Google</p> */}
                            <GoogleAuthButton/>
                        </div>
                        <div className="bg-gray-50 border border-gray-300 py-2 rounded-xl w-full flex justify-center items-center">
                            <p>Continue with Github</p>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="pt-2">
                            <LabelledInput
                                label="Email"
                                placeholder="abc@gmail.com"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <LabelledInput
                                label="Password"
                                type="password"
                                placeholder="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <button className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, name, value, onChange }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input
                type={type || "text"}
                name={name}
                value={value}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
