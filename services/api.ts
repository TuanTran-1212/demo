import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export interface Meal {
  id: string
  title: string
  image: string
  category: string
  area: string
  cookTime: number
  difficulty: string
}

export interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  cookTime: number
  difficulty: string
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
}


export const searchMeals = async (): Promise<Meal[]> => {
  try {
    const response = await axios.get(`${API_BASE}/search.php?s=`);
    return response.data.meals?.map((meal: any) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      cookTime: Math.floor(Math.random() * 40) + 10,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
    })) || [];
  } catch (error) {
    console.log('Error searching meals:', error);
    return [];
  }
};

export const getMealDetail = async (id: string): Promise<RecipeDetail | null> => {
  try {
    const response = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  } catch (error) {
    console.log('Error fetching meal detail:', error);
    return null;
  }
};
