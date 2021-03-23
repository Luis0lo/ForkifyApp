import * as model from './model.js';
import recipeView from './views/recipeView.js';

// make old browser be supported by our app
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// API
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    //guard clause >> modern way << instead of wraping all the following syntax
    if (!id) return; // avoid error
    recipeView.renderSpinner();

    //STEP 1 loading recipe
    await model.loadRecipe(id);
    //STEP 2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

//publisher-subscriber pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
