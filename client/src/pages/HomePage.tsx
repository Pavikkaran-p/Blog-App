import DisplayBlogs from "../components/Home/DisplayBlogs";

export default function HomePage(){
    return(
        <>
        {/* <h1>Home Page</h1> */}
        <div className="dark:bg-slate-800 bg-black mx-1 sm:mx-4">
            <DisplayBlogs/>
        </div>
        </>
    )
}