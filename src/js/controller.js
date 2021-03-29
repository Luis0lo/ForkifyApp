import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// make old browser be supported by our app
import 'core-js/stable';
import 'regenerator-runtime/runtime';
//this module comes from parcel
if (module.hot) {
  module.hot.accept();
}

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
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2) load search results
    await model.loadSearchResults(query);

    //3) render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    //4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();

const controlPagination = function (goToPage) {
  //1) render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  //2) render NEW pagination buttons
  paginationView.render(model.state.search);
};

//publisher-subscriber pattern || handlers

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
