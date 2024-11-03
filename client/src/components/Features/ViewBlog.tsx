import { Params, useParams } from "react-router-dom"

const ViewBlog = () => {

    const id:Readonly<Params<string>>=useParams();
    console.log(id)
    return (
    <div className="w-full max-w-[1256px] mx-auto px-6 h-fit flex justify-center flex-col items-center">

        <div className="text-center w-full font-bold text-textPrimary tracking-[-0.02em] text-3xl
      largeTablet:text-6xl largeTablet:tracking-[-0.03em]">
            <h1>ViewBlog</h1>
            <div className="ml-36 w-full max-w-[780px] mt-6 largeTablet:mt-24 text-textPrimary contentWrapper text-lg prose prose-invert space-y-0  prose-ol:flex prose-ol:flex-col prose-ol:gap-0 prose-ul:flex prose-ul:flex-col prose-ul:gap-0 prose-headings:font-bold prose-headings:py-4 prose-a:no-underline">
                <p>From my time at GitHub, I learned that the label “good first issue” was created in response to the popularity of the first-timers-only project. Thanks to folks like </p>
            </div>
        </div>
    </div>
    )
}

export default ViewBlog