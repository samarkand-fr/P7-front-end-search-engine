// Import necessary modules
import { displayRecipeCards } from "../components/cards.js"; // function to display recipe cards
import { displayFilters } from "../components/filters.js"; // function to display filter options
import { handleFilterReload } from "../FiltersController.js"; // function to update filter status
import { matchesFilter } from "../utils.js"; // utility functions checking for filter matches


/**

Returns an array of recipe objects that match a given filter string.

@param {Array} recipes - An array of recipe objects to filter.

@param {string} filter - The filter string to match against the recipes.

@returns {Array} - An array of recipe objects that match the filter.
*/
export function getMatchingRecipes(recipes, filter) {
    // Convert the filter string to lowercase and remove any leading or trailing whitespace
    const filterLowerCase = filter.toLowerCase().trim();
    
    const queriedCards = [];
    
    // Loop through each recipe and check if it matches the filter
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
   
        if (matchesFilter(recipe, filterLowerCase)) {
            queriedCards.push(recipe);
        }
    }
    
    return queriedCards;
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













