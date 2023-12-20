import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="container-navbar">
        <header>
          <nav className="z-10 mb-5">
            <div className="flex flex-row items-center justify-between px-6 py-4 text-indigo-100 bg-indigo-900">
              <h3 className="font-bold">
                {" "}
                <a href="/">Instax</a>
              </h3>

              <div className="div-add">
                <button>
                  <Link to="/add-post">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      dataSlot="icon"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </Link>
                </button>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}

export default Navbar;
