// Import modules
import { displayRecipeCards } from "./scripts/components/cards.js";
import { displayFilters , bindFilterEvents } from "./scripts/components/filters.js";
import {  findRecipe } from "./scripts/searchAndFilter/search.js";
import { recipes } from "./data/recipes.js";

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

// Render the recipe list
recipeRenderer.renderRecipes();
