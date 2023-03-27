// Import modules
import { displayRecipeCards } from "./scripts/components/cards.js"; 
import { isFiltersInteractive } from "./scripts/FiltersController.js";
import { findRecipe } from "./scripts/search.js"; 
import { recipes } from "./recipes.js"; // import the recipe data

// Define a class for rendering recipes
class RecipeRenderer {
    constructor(recipes) {
        this.recipes = recipes; // set the recipes property of the instance
    }

    // method responsible for rendering and displaying recipe data to the user interface.
    renderRecipes() {
        displayRecipeCards(this.recipes); // display the recipe cards
        findRecipe(this.recipes); // add search functionality
        return this.recipes; // return the recipes
    }
}

// Create a new instance of the RecipeRenderer class
const recipeRenderer = new RecipeRenderer(recipes); // pass in the recipe data

// Add event listeners to filter buttons for opening and closing the filters
const filterButtons = document.querySelectorAll(".filter__select"); // select all filter buttons
filterButtons.forEach((button) => { // loop through each button
    button.addEventListener("click", () => { // add a click event listener to the button
        const buttonValue = button.getAttribute("value"); // get the button's value attribute
        isFiltersInteractive(button, buttonValue); // handle filter interaction
    });
});

// Render the recipe list
recipeRenderer.renderRecipes(); // call the renderRecipes method on the instance
