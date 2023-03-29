// Import necessary modules
import { displayRecipeCards } from "./components/cards.js"; // function to display recipe cards
import { displayFilters } from "./components/filters.js"; // function to display filter options
import { handleFilterReload } from "./FiltersController.js"; // function to update filter status
import { matchesFilter } from "./utils.js"; // utility functions checking for filter matches

/**
 * Searches through a list of recipes and returns the matching recipes with any duplicates removed.
 * @param {array} recipes - The list of recipes to search through
 * @param {string} filter - The search filter to apply to the recipes
 * @returns {array} - The matching recipes with any duplicates removed
*/
export function getMatchingRecipes(recipes, filter) {
    // Convert the search filter to lowercase and remove any leading or trailing white spaces.
    const filterLowerCase = filter.toLowerCase().trim();
    // Initialize an empty set to store the matching recipes.
    const queriedCards = new Set();

    // Loop through all the recipes and check if they match the search filter.
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (matchesFilter(recipe, filterLowerCase)) {
            queriedCards.add(recipe);
        } else {
            // check if its ustensils or ingredients contain the search filter.
            for (let j = 0; j < recipe.ustensils.length; j++) {
                const ustensil = recipe.ustensils[j];
                if (ustensil.includes(filterLowerCase)) {
                    queriedCards.add(recipe);
                }
            }
            // Check if any of the recipe's ingredients match the search filter.
            for (let k = 0; k < recipe.ingredients.length; k++) {
                const ingredient = recipe.ingredients[k];
                if (ingredient.ingredient.includes(filterLowerCase)) {
                    queriedCards.add(recipe);
                }
            }
        }
    }
    // Convert the Set to an array and return the result.
    return [...queriedCards];
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
            displayRecipeAndFilter(recipes, null);
        }
    });
}
/**
 * Display the recipe cards and filter options
 * @param {array} recipes - array of objects
 */
function displayRecipeAndFilter(recipes, recipe) {
    // Display the search results on the page
    displayRecipeCards(recipes);
    // Generate filter options based on the input recipe and the search results
    displayFilters(recipes, recipe);
    // Update the filter status to reflect any changes in the search results
    handleFilterReload(recipes);
}













