import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetails from "../components/RecipeDetails";
import { RecipeService } from "../services/recipesApi";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const service = new RecipeService();
        const res = await service.getRecipeById(id);
        if (res?.status === 200) {
          setRecipe(res.data);
        } else {
          console.error("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
      }
    };
  
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading recipe...</div>;

  return <RecipeDetails recipe={recipe} />;
};

export default RecipeDetailsPage;
