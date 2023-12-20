import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="container-navbar">
        <header>
          <nav className="z-10 mb-5">
            <div className="flex flex-row items-center justify-between px-6 py-4 text-indigo-100 bg-indigo-900">
              <h3 className="font-bold">
                <Link to="/">Instax</Link>
              </h3>

              <Link to="/">Logout</Link>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Navbar;
