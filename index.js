// Import modules
import { displayRecipeCards } from "./scripts/components/cards.js"; // import function to display recipe cards
import { displayFilters } from "./scripts/components/filters.js"; // import function to display filters
import { isFiltersInteractive } from "./scripts/FiltersController.js"; // import function to handle filter interaction
import { taggedItem, findRecipe } from "./scripts/search.js"; // import functions to handle searching
import { recipes } from "./recipes.js"; // import the recipe data

// Define a class for rendering recipes
class RecipeRenderer {
    constructor(recipes) {
        this.recipes = recipes; // set the recipes property of the instance
    }

    // Render the recipes
    renderRecipes() {
        displayRecipeCards(this.recipes); // display the recipe cards
        findRecipe(this.recipes); // add search functionality
        displayFilters(this.recipes); // display the filters
        taggedItem(this.recipes); // add filtering functionality
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
