import { Toaster } from "react-hot-toast";
import NavBar from "./components/Header/NavBar";
import BlogRouter from "./routes/router";

export default function App() {
  
  return (
    <>
      {window.location.pathname !== '/' ? <NavBar /> : null}
      <BlogRouter/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}