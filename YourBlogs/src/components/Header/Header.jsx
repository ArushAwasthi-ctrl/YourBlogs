import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, Container, LogoutBtn } from "../input";

function Header() {
  const user = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "Login", path: "/login", active: !user },
    { name: "Signup", path: "/signup", active: !user },
    { name: "My Posts", path: "/my-posts", active: user },
    { name: "Add Post", path: "/add-post", active: user },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <Container>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 md:px-6">
          
          {/* ---- Logo ---- */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            <Logo width="45px" />
            <span className="hidden sm:inline-block tracking-tight">YourBlogs</span>
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="px-5 py-2 text-base font-medium text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {user && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* ---- Mobile Menu Icon (Hamburger) ---- */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Header;
