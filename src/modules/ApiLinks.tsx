export const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

export const searchMeal = (query: string) => `${baseUrl}/search.php?s=${query}`;
