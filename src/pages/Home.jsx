import React, { useState } from "react";
import { Link } from "react-router-dom";

const featuredRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/0346a29a89ef229b1a0ff9697184f944/Derivates/cb5051204f4a4525c8b013c16418ae2904e737b7.jpg",
        ingredients: ["pasta", "egg", "cheese"],
    },
    {
        id: 2,
        title: "Chicken Biryani",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP8l2kuZDANQExDsYteLg0NEUEjLkjudABRg&s",
        ingredients: ["chicken", "rice", "spices"],
    },
    {
        id: 3,
        title: "Vegan Buddha Bowl",
        image: "https://www.sunglowkitchen.com/wp-content/uploads/2023/03/tofu-buddha-bowls-peanut-sauce-served-9.jpg",
        ingredients: ["quinoa", "chickpeas", "veggies"],
    },
];

function Home() {
    const [search, setSearch] = useState("");

    const filteredRecipes = featuredRecipes.filter((recipe) =>
        recipe.ingredients.join(" ").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-2">🍽️ Welcome to RecipeShare</h1>
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
            {filteredRecipes.length === 0 && (
                <p className="text-red-500">No recipes found.</p>
            )}
            {/* Featured Recipes */}
            <h2 className="text-2xl font-semibold mb-4">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
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
            </div>


            <div className="mt-8 space-x-4">
                <Link
                    to="/recipes"
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                    Explore More Recipes
                </Link>
                {/* <Link
                    to="/register"
                    className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded hover:bg-green-100"
                >
                    Join Now
                </Link> */}
            </div>
        </div>
    );
}

export default Home;
