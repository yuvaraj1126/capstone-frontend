import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        console.log("storeduser", storedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-green-100 to-green-50 flex justify-center items-center overflow-hidden">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-md box-border">   
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-600">User Profile</h1>
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}
        </div>

        {user ? (
          <div className="space-y-4 text-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg font-semibold">{user?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user?.email || "N/A"}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No user information found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
