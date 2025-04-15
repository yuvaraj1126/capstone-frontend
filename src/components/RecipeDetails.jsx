import { useState, useEffect } from "react";
import StarRating from "../components/StarRating"; // Make sure you created this component too
import { RecipeService } from "../services/recipesApi";

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

  const handleRating = async (value) => {

    const res = await recipeService.addRating(recipe._id, value)
    if (res?.status === 200) {
      setRating(value);
      await getRatecomments()
    } else {
      console.error("Failed to delete recipe");
    }

  };

  const submitComment = async () => {

    const res = await recipeService.addComment(recipe._id, comment, storedUser?.id)
    if (res?.status === 200) {
      await getRatecomments()
    } else {
      console.error("Failed to delete recipe");
    }
  }


  const getRatecomments = async () => {
    const res = await recipeService.getRatecomments(recipe._id, storedUser?.id)
    if (res?.status === 200) {
      setReviews(res?.data)
    } else {
      console.error("Failed to delete recipe");
    }
  }


  return (
    <div>
      <h2 className="text-2xl font-bold">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="w-full max-h-96 object-cover rounded mb-4" />

      <p className="mb-2"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
      <p className="mb-4"><strong>Instructions:</strong> {recipe.instructions}</p>

      <div className="mb-2">
        <strong>Average Rating:</strong> {reviews.averageRating} / 5
      </div>

      <StarRating rating={rating} onRate={handleRating} />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        className="w-full border p-2 mt-2 rounded"
      />
      <button
        onClick={submitComment}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Submit
      </button>

      <div className="mt-4">
        <h3 className="font-semibold text-lg">User Reviews</h3>
        {reviews.comments?.map((c, idx) => (
          <div key={idx} className="border-t pt-2 mt-2">
            <p className="text-sm text-gray-600">{c.user.username}</p>
            <p>{c.text}</p>
            {/* <p className="text-sm text-gray-600">{c.recipe.rating}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
