// // Import modules
// import { displayRecipeCards } from "./scripts/components/cards.js"; 
// import { isFiltersInteractive } from "./scripts/FiltersController.js";
// import { findRecipe } from "./scripts/search.js"; 
// import { recipes } from "./recipes.js"; // import the recipe data

// // Define a class for rendering recipes
// class RecipeRenderer {
//     constructor(recipes) {
//         this.recipes = recipes; // set the recipes property of the instance
//     }

//     // method responsible for rendering and displaying recipe data to the user interface.
//     renderRecipes() {
//         displayRecipeCards(this.recipes); // display the recipe cards
//         findRecipe(this.recipes); // add search functionality
//         return this.recipes; // return the recipes
//     }
// }

// // Create a new instance of the RecipeRenderer class
// const recipeRenderer = new RecipeRenderer(recipes); // pass in the recipe data

// // Add event listeners to filter buttons for opening and closing the filters
// const filterButtons = document.querySelectorAll(".filter__select"); // select all filter buttons
// filterButtons.forEach((button) => { // loop through each button
//     button.addEventListener("click", () => { // add a click event listener to the button
//         const buttonValue = button.getAttribute("value"); // get the button's value attribute
//         isFiltersInteractive(button, buttonValue); // handle filter interaction
//     });
// });

// // Render the recipe list
// recipeRenderer.renderRecipes(); // call the renderRecipes method on the instance




// good with json file 
// "use strict";

// import { displayRecipeCards } from "./JS/factories/cards.js";
// import { displayFilters } from "./JS/factories/filters.js";
// import { isFiltersInteractive } from "./JS/interactiveFilters.js";
// import { taggedItem, findRecipe } from "./JS/search.js";

// // GET DATA
// export const getRecipes = (async () => {
//     await fetch("./recipes.json")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         displayRecipeList(data.recipes);
  
//       })
//       .catch((error) => {
//         error.message;
//       });
//   })();

// // Constructor function for rendering recipes
// export function RecipeRenderer(data) {
//   this.data = data;
//   this.returnRecipes = function (data) {
//     console.log(data);
//     return data;
//   };
// }

// RecipeRenderer.prototype.getAllRecipes = function (recipes) {
//   return displayRecipeList(recipes);
// };

// // Hydrate the components with the data retrieved from the API
// const displayRecipeList = (recipes) => {
//   findRecipe(recipes);
//   displayFilters(recipes);
//   taggedItem(recipes);
//   displayRecipeCards(recipes);
//   return recipes;
// };

// // Add event listeners to filter buttons for opening and closing the filters
// const buttons = document.querySelectorAll(".filter__select");
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const buttonValue = button.getAttribute("value");
//     isFiltersInteractive(button, buttonValue);
//   });
// });



// Import modules
import { displayRecipeCards } from "./scripts/components/cards.js";
import { displayFilters } from "./scripts/components/filters.js";
import { isFiltersInteractive } from "./scripts/FiltersController.js";
import {  findRecipe } from "./scripts/search.js";
import { recipes } from "./recipes.js";

// Define a class for rendering recipes
class RecipeRenderer {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderRecipes() {
        displayRecipeCards(this.recipes);
        findRecipe(this.recipes);
        displayFilters(this.recipes);
        return this.recipes;
    }
}

// Create a new instance of the RecipeRenderer class
const recipeRenderer = new RecipeRenderer(recipes);

// Add event listeners to filter buttons for opening and closing the filters
const filterButtons = document.querySelectorAll(".filter__select");
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.getAttribute("value");
        isFiltersInteractive(button, buttonValue);
    });
});

// Render the recipe list
recipeRenderer.renderRecipes();
