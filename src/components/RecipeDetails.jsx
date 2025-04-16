import { useState, useEffect } from "react";
import StarRating from "../components/StarRating"; // Make sure you created this component too
import { RecipeService } from "../services/recipesApi";
import { Link } from "react-router-dom";

const RecipeDetails = ({ recipe }) => {
  const recipeService = new RecipeService();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState({ averageRating: 0, comments: [] });

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getRatecomments()
  }, [recipe._id]);

  // const handleRating = async (value) => {

  //   const res = await recipeService.addRating(recipe._id, value)
  //   if (res?.status === 200) {
  //     setRating(value);
  //     await getRatecomments()
  //   } else {
  //     console.error("Failed to delete recipe");
  //   }

  // };
  const handleRating = async (value) => {
    try {
      // Send the rating value to the backend
      const res = await recipeService.addRating(recipe._id, value);
      
      // Check if the rating was successfully added
      if (res?.status === 200) {
        setRating(value); // Update the local state with the new rating
        await getRatecomments(); // Fetch the updated recipe data (including the new averageRating)
      } else {
        console.error("Failed to add rating");
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };
  
  const submitComment = async () => {

    const res = await recipeService.addComment(recipe._id, comment, storedUser?.id,rating);
    console.log("Submit comment with rating:", rating);
    if (res?.status === 200) {
      await getRatecomments()
      setComment(""); // optional: clear input
      setRating(0);   // optional: reset star
    } else {
      console.error("Failed to delete recipe");
    }
  }


  const getRatecomments = async () => {
    const res = await recipeService.getRatecomments(recipe._id, storedUser?.id)
    if (res?.status === 200) {
      setReviews(res?.data)
      // setRating(res.data.userRating || 0);
    } else {
      console.error("Failed to delete recipe");
    }
  }


  return (
    // <div>
    //   <h2 className="text-2xl font-bold">{recipe.title}</h2>
    //   <img src={recipe.image} alt={recipe.title} className="w-full max-h-96 object-cover rounded mb-4" />

    //   <p className="mb-2"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
    //   <p className="mb-4"><strong>Instructions:</strong> {recipe.instructions}</p>

    //   <div className="mb-2">
    //     <strong>Average Rating:</strong> {reviews.averageRating} / 5
    //   </div>

    //   <StarRating rating={rating} onRate={handleRating} />

    //   <textarea
    //     value={comment}
    //     onChange={(e) => setComment(e.target.value)}
    //     placeholder="Leave a comment..."
    //     className="w-full border p-2 mt-2 rounded"
    //   />
    //   <button
    //     onClick={submitComment}
    //     className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
    //   >
    //     Submit
    //   </button>

    //   <div className="mt-4">
    //     <h3 className="font-semibold text-lg">User Reviews</h3>
    //     {reviews.comments?.map((c, idx) => (
    //       <div key={idx} className="border-t pt-2 mt-2">
    //         <p className="text-sm text-gray-600">{c.user.username}</p>
    //         <p>{c.text}</p>
    //         <p className="text-yellow-600 text-sm">Rated: ★ {c.rating || "No rating"}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
  <h2 className="text-3xl font-semibold text-gray-900 mb-4">{recipe.title}</h2>
  
  <img 
    src={recipe.image} 
    alt={recipe.title} 
    className="w-full h-64 object-cover rounded-lg mb-4 shadow-md" 
  />

  <div className="mb-4">
    <p className="text-gray-700 text-lg mb-2"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
    <p className="text-gray-700 text-lg"><strong>Instructions:</strong> {recipe.instructions}</p>
  </div>

  <div className="mb-6">
    <p className="text-gray-800 text-lg font-medium mb-2">
      <strong>Average Rating:</strong> {reviews.averageRating} / 5
    </p>
  </div>

  <div className="mb-6">
    <StarRating 
      rating={rating} 
      onRate={handleRating} 
      className="mb-4"
    />
  </div>

  <div className="mb-4">
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Leave a comment..."
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  <button
    onClick={submitComment}
    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
  >
    Submit
  </button>
  <div className="mt-6">
  <Link
    to={`/recipes`}
    className="block text-center bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
  >
    Go to Recipe
  </Link>
</div>

  <div className="mt-6">
    <h3 className="font-semibold text-xl text-gray-800 mb-4">User Reviews</h3>
    {reviews.comments?.map((c, idx) => (
      <div key={idx} className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-600">User: <strong>{c.user.username}</strong></p>
          <p className="text-sm text-gray-500">Rated: ★ {c.rating || "No rating"}</p>
        </div>
        <p className="text-gray-700">Comment: <strong>{c.text}</strong></p>
      </div>
    ))}
  </div>
</div>

  );
};

export default RecipeDetails;
