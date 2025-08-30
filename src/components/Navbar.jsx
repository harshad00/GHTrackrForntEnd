import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, LogOut } from "lucide-react";
import Button from "./comen/button/Button";
import { useAuth } from "../hook/useAuth"; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  const handleLogout = async () => {
    await logout(); // logout using the hook
    window.location.href = "/"; // redirect after logout
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-700 bg-opacity-90 backdrop-blur-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-bold text-white">GHTrackr</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-yellow-300">Home</Link>
              {user ?
             ( <Link to="/myrepos" className="text-white hover:text-yellow-300">MY REPOS</Link>):(<></>)
              }
            </nav>
          </div>

          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            {user ? (
              <>
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                  <div className="absolute top-12 right-0 w-48 bg-white rounded shadow-md p-3 z-50">
                    <p className="text-sm text-gray-800 mb-2">Hi, {user.username}</p>
                    <Button
                      className="w-full bg-red-500 text-white hover:bg-red-600"
                      onClick={handleLogout}
                      icon={<LogOut size={16} />}
                      text="Logout"
                    />
                  </div>
                )}
              </>
            ) : (
              <Button
                className="bg-transparent border border-white text-white hover:bg-green-500"
                onClick={handleLogin}
                icon={<Github />}
                text="Login with GitHub"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
