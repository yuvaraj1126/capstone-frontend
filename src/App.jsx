import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Recipes from './pages/Recipes.jsx';
import Profile from './pages/Profile.jsx';
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
import AddRecipe from './pages/AddRecipe.jsx';
import Dashboard from './components/Dashboard.jsx';
import RecipeDetailsPage from './pages/RecipeDetailsPage.jsx';

// Route guard for private routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {

  return (
    <Router>
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <Recipes />
              </PrivateRoute>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-recipe"
            element={
              <PrivateRoute>
                <AddRecipe />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
