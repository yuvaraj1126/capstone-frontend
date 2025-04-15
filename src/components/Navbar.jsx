import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [tokenExists, setTokenExists] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    setTokenExists(!!localStorage.getItem("token"));
  }, [location]); 

  return (
    <div className="space-x-8 p-4 shadow-md bg-green-500 px-4 py-2 rounded hover:bg-green-600 flex justify-end">
      {tokenExists ? (
        <>
          <Link to="/" className="text-white hover:text-black">
            Home
          </Link>
          <Link to="/recipes" className="text-white hover:text-black">
            Recipes
          </Link>
          <Link to="/profile" className="text-white hover:text-black">
            Profile
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="text-white hover:text-black">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-black">
            Register
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
