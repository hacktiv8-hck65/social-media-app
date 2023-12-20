import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Layout;