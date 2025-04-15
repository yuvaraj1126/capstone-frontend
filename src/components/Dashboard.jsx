import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeService } from "../services/recipesApi";

function Dashboard() {
    const recipeService = new RecipeService();

    const [userRecipes, setUserRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDelete = async (recipeId) => {

        if (!window.confirm("Are you sure you want to delete this recipe?")) return;

        try {
            const res = await recipeService.deleteRecipes(recipeId)
            if (res?.status === 200) {
                setUserRecipes((prev) => prev.filter((r) => r._id !== recipeId));
            } else {
                console.error("Failed to delete recipe");
            }
        } catch (err) {
            console.error("Error deleting recipe:", err);
        }
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            try {
                const res = await recipeService.getUserRecipes(storedUser?.id)
                if (res?.status === 200) {
                    setUserRecipes(res?.data)
                }
            } catch (err) {
                console.log("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);



    if (loading) return <p className="text-center py-10">Loading dashboard...</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-600">My Dashboard</h2>
                <Link
                    to="/add-recipe"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                    + New Recipe
                </Link>
            </div>

            {/* My Recipes Section */}
            <section className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">My Recipes</h3>
                {userRecipes.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {userRecipes.map((recipe) => (
                            <div key={recipe._id} className="bg-white rounded shadow-md overflow-hidden">
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2">{recipe.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Ingredients: {recipe.ingredients.slice(0, 3).join(", ")}...
                                    </p>
                                </div>
                                <div className="flex justify-end gap-2 mb-2 p-2">

                                    <button
                                        onClick={() => handleDelete(recipe._id)}
                                        className="text-red-500 hover:underline text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            //   <div key={recipe._id} className="bg-white p-4 rounded shadow">
                            //     <h4 className="text-lg font-bold">{recipe.title}</h4>
                            //     <p className="text-sm text-gray-600">{recipe.description}</p>
                            // <div className="flex justify-end gap-2 mt-2">

                            //   <button
                            //     onClick={() => handleDelete(recipe._id)}
                            //     className="text-red-500 hover:underline text-sm"
                            //   >
                            //     Delete
                            //   </button>
                            // </div>
                            //   </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven't added any recipes yet.</p>
                )}
            </section>

            {/* Saved Recipes Section */}
            {/* <section>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Saved Favorites</h3>
        {savedRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {savedRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-bold">{recipe.title}</h4>
                <p className="text-sm text-gray-600">{recipe.description}</p>
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="text-green-500 hover:underline text-sm"
                >
                  View Recipe
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No saved recipes yet.</p>
        )}
      </section> */}
        </div>
    );
}

export default Dashboard;
