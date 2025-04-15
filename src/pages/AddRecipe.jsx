import React, { useState } from "react";
import { RecipeService } from "../services/recipesApi";
import { useNavigate } from "react-router-dom";


function AddRecipe() {
  const recipeService = new RecipeService();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    servings: "",
    image: "",
    video: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const payload ={...form, userId: storedUser?.id}
    const res= await recipeService.createRecipes(payload)
   if(res?.status === 200){
    navigate("/recipes")
   }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
        <textarea name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredients" className="w-full border p-2 rounded" required />
        <textarea name="steps" value={form.steps} onChange={handleChange} placeholder="Steps" className="w-full border p-2 rounded" required />
        <input name="cookingTime" value={form.cookingTime} onChange={handleChange} placeholder="Cooking Time (in minutes)" className="w-full border p-2 rounded" required />
        <input name="servings" value={form.servings} onChange={handleChange} placeholder="Servings" className="w-full border p-2 rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded" />
        <input name="video" value={form.video} onChange={handleChange} placeholder="YouTube Video URL" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
