export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strTags: string;
  strSource: string;
  strYoutube: string;
}

export interface RecipeInfoType {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strTags: string;
  strSource: string;
  strYoutube: string;
  [key: string]: string | undefined;
}

export interface RecipeResponse {
  meals: RecipeInfoType[];
}

export interface WatchHistoryContextType {
  setWatchHistory: React.Dispatch<React.SetStateAction<RecipeInfoType[]>>;
  watchHistory: RecipeInfoType[];
}
