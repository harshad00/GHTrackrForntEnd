import { Link } from "react-router-dom";
import { Github, LogOut } from "lucide-react";
import Button from "./comen/button/Button";
import { useAuthSession } from "../hook/useAuthSession.js";

const Navbar = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/github";
  };

  const handleLogout = () => {
    window.location.href = "http://localhost:8000/auth/logout"; // This should clear the session on backend
  };

  const { user } = useAuthSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 bg-slate-700 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-gradient-primary">
                  GHTrackr
                </h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </nav>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-foreground">Welcome, {user.username}</span>
                <Button
                  className="bg-transparent border border-border text-foreground hover:bg-secondary/50 hover:border-destructive/50"
                  onClick={handleLogout}
                  icon={<LogOut />}
                  text="Logout"
                />
              </>
            ) : (
              <Button
                className="bg-transparent border border-border text-foreground hover:bg-secondary/50 hover:border-primary/50"
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
