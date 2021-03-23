import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

//export to be used in the controller
export const state = {
  recipe: {},
};
// fetching the recipe data from the API
export const loadRecipe = async function (id) {
  //Ajax request to the Api
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (err) {
    //temp error handling
    console.error(`${err} ⚡⚡⚡ Can not find Recipe! 🍴🍴🍴`);
    throw err;
  }
};
