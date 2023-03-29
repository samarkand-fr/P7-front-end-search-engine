import { displayRecipeCards } from "./components/cards.js";
import { displayFilters } from "./components/filters.js";
import { handleFilterReload } from "./FiltersController.js";
import {  matchesFilter } from "./utils.js";



/**
 * Returns an array of recipe objects that match the given filter string.
 *
 * @param {Array} recipes - An array of recipe objects to filter.
 * @param {string} filter - A string to use as the filter criteria.
 * @returns {Array} An array of recipe objects that match the filter criteria.
 */
export function getMatchingRecipes(recipes, filter) {
    // Convert the filter string to lowercase and remove any leading or trailing whitespace
    const filterLowerCase = filter.toLowerCase().trim();
  
    // Map through each recipe object and check if it matches the filter or contains a matching utensil or ingredient
    const queriedCards = recipes.map(recipe => {
        if (matchesFilter(recipe, filterLowerCase)) {
        // If the recipe matches the filter, return the recipe object
            return recipe;
        } else if (
            recipe.ustensils.some(ustensil => ustensil.includes(filterLowerCase)) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.includes(filterLowerCase))
        ) {
        // If the recipe contains a matching utensil or ingredient, return the recipe object
            return recipe;
        } else {
        // If the recipe does not match the filter or contain a matching utensil or ingredient, return null
            return null;
        }
    });
  
    // Filter out any null recipe objects and return the resulting array of recipe objects
    return queriedCards.filter(recipe => recipe !== null);
}

/**
 * Define a function to handle recipe searching
 * @param {array} recipes - array of objects
*/
export function findRecipe(recipes) {
    // Get the input element for the search box
    const searchInput = document.querySelector(".search__input");
    let timeout = null;

    // Add an event listener for changes to the search box
    searchInput.addEventListener("input", () => {
        // Clear any existing timeouts
        clearTimeout(timeout);

        // Only perform the search if the user has entered at least 3 characters
        if (searchInput.value.length >= 3) {
            // Set a timeout to perform the search after 300ms
            timeout = setTimeout(() => {
                const matchingRecipes = getMatchingRecipes(recipes, searchInput.value);
                displayRecipeAndFilter(matchingRecipes);
            }, 300);
        } else {
            // If the search query is too short or empty, display all recipes and reset the filter status
            displayRecipeAndFilter(recipes);
        }
    });
}

/**
 * Display the recipe cards and filter options
 * @param {array} recipes - array of objects
 */
function displayRecipeAndFilter(recipes) {
    // Display the search results on the page
    displayRecipeCards(recipes);
    // Generate filter options based on the search results
    displayFilters(recipes);
    // Update the filter status to reflect any changes in the search results
    handleFilterReload(recipes);
}

