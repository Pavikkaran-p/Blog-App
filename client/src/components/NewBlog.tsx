import axios from "axios"
import { useState } from "react"

const NewBlog = () => {
    const [blogData, setBlogData] = useState({
        title:"",
        description:""
    })
    const [isLoading, setIsLetloading] = useState(false)

    function handlesubmit(){
        async function SubmitBlog(){
            setIsLetloading(true)
            // const response=await axios.post('/api/v1/newblog',blogData)
            setTimeout(() => {
                setIsLetloading(false)
            }, 3000);
        }
        SubmitBlog()
    }
    return (
        <div className=" px-28 py-14 mx-12 rounded-2xl text-2xl justify-center">   
            <h1 className="">NewBlog</h1>
            <div className="justify-center">
                <p>Title</p>
                <input className="bg-gray-100 border-none rounded-xl" type="text" onChange={(e)=>{
                    setBlogData({
                        ...blogData,
                        title:e.target.value
                    })
                }} />
            </div>
            <div>
                <p>Description</p>
                <textarea className="bg-gray-100 border-none rounded-xl"  onChange={(e)=>{
                    setBlogData({
                        ...blogData,
                        description:e.target.value
                    })
                }} />
            </div>
            {isLoading? <button className={'cursor-not-allowed'} >Submitting...</button> :
            <button className="" onClick={handlesubmit} disabled={isLoading}>Submit</button>
        }
        </div>

    )
}

export default NewBlog