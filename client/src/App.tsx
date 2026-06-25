import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import BlogRouter from "./routes/router";

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' ? <NavBar /> : null}
      <BlogRouter />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
