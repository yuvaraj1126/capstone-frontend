import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeService } from "../services/recipesApi";



function Recipes() {

  const recipeService = new RecipeService();
  const [allRecipes, setAllRecipes] = useState([])

  useEffect(() => {
    const getRecipe = async () => {
      const res = await recipeService.getAllRecipes()
      if (res?.status === 200) {
        setAllRecipes(res?.data)
      }

      console.log("res", res)
    }

    getRecipe()

  }, [])

  console.log("allRecipes", allRecipes)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Recipes</h2>
        <Link to="/add-recipe" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Add Recipe
        </Link>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}

      {allRecipes.length === 0 && (
        <p className="text-red-500">No recipes found.</p>
      )}
      {/* Featured Recipes */}
      <h2 className="text-2xl font-semibold mb-4">Featured Recipes</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allRecipes.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded shadow-md overflow-hidden">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{recipe.title}</h3>
                            <p className="text-sm text-gray-500">
                                Ingredients: {recipe.ingredients.join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allRecipes.map((recipe) => (
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
              <p className="text-yellow-500 text-sm mb-2">
                ★ {recipe.averageRating || "No rating yet"}
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="text-blue-500 underline hover:text-blue-700"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
}

export default Recipes;
