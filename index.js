// Import modules
import { displayRecipeCards } from "./scripts/components/cards.js";
import { displayFilters , bindFilterEvents } from "./scripts/components/filters.js";
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
        bindFilterEvents(this.recipes);
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