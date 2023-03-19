
// Import modules
import { displayRecipeCards } from "./scripts/factories/cards.js";
import { findRecipe } from "./scripts/search.js";
import { recipes } from "./recipes.js";

// Define a class for rendering recipes
class RecipeRenderer {
    constructor(recipes) {
        this.recipes = recipes;
    }

    renderRecipes() {
        displayRecipeCards(this.recipes);
        findRecipe(this.recipes);
        return this.recipes;
    }
}

// Create a new instance of the RecipeRenderer class
const recipeRenderer = new RecipeRenderer(recipes);

// Render the recipe list
recipeRenderer.renderRecipes();
