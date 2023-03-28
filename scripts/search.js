// Import modules
import { displayRecipeCards } from "./components/cards.js";
import { displayFilters } from "./components/filters.js";
import { handleFilterReload } from "./FiltersController.js";
import { matchesFilter } from "./utils.js";

export function getMatchingRecipes(recipes, filter) {
    // Convert the search filter to lowercase and remove any leading or trailing white spaces.
    const filterLowerCase = filter.toLowerCase().trim();
    // Initialize an empty array to store the matching recipes.
    const queriedCards = [];

    // Loop through all the recipes and check if they match the search filter.
    for (const recipe of recipes) {
        if (matchesFilter(recipe, filterLowerCase)) {
            queriedCards.push(recipe);
        } else {
            // If the recipe doesn't match the search filter,
            // check if its ustensils or ingredients contain the search filter.
            for (const ustensil of recipe.ustensils) {
                if (ustensil.includes(filterLowerCase)) {
                    queriedCards.push(recipe);
                    break;
                }
            }
            // Check if any of the recipe's ingredients match the search filter.
            for (const ingredient of recipe.ingredients) {
                if (ingredient.ingredient.includes(filterLowerCase)) {
                    queriedCards.push(recipe);
                    break;
                }
            }
        }
    }
    // Use `new Set` to remove any duplicate items from the queried recipe cards and convert it back to an array.
    return Array.from(new Set(queriedCards));
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
                // Pass the first matching recipe (if any) to the displayRecipeAndFilter function
                const inputRecipe = matchingRecipes.length > 0 ? matchingRecipes[0] : null;
                displayRecipeAndFilter(matchingRecipes, inputRecipe);
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
