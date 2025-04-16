import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RecipeService } from "../services/recipesApi";



function Recipes() {

  const recipeService = new RecipeService();
  const [allRecipes, setAllRecipes] = useState([])
  const [search, setSearch] = useState("");
  const [filteredval, setFilteredval] = useState([])


  useEffect(() => {
    setFilteredval(allRecipes)


  }, [allRecipes])
  useEffect(() => {
    if (search) {
      const filteredRecipes = allRecipes.filter((recipe) =>
        recipe.ingredients.join(" ").toLowerCase().includes(search.toLowerCase())
      );
      setFilteredval(filteredRecipes)
    }
  }, [search])



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
      <h2 className="text-2xl font-semibold mb-2 text-center">Featured Recipes</h2>
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

      <div className="p-8 text-center">
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Discover delicious recipes, share your creations, and connect with fellow foodies!
        </p>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by ingredient (e.g. rice, egg...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded mb-6"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredval.map((recipe) => (
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
              <div className="mb-6">
                <p className="text-yellow-500 text-sm mb-2">
                  <strong>Average Rating:</strong> ★ {recipe.averageRating || "No rating yet"}
                </p>
              </div>
              <Link
                to={`/recipes/${recipe._id}`}
                className="text-blue-500 underline hover:text-blue-700"
              >
                View Recipe
              </Link>
            </div>
          </div>
        ))}
         {filteredval.length === 0 && (
                <p className="text-red-500">No recipes found.</p>
            )}
      </div>

    </div>

  );
}

export default Recipes;
