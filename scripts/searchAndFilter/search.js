import { displayRecipeCards } from "../components/cards.js";
import { displayFilters } from "../components/filters.js";
import { handleFilterReload } from "../FiltersController.js";
import {  matchesFilter } from "../utils.js";

/** 
 * This function filters recipes based on the provided filter string
 * @param {array} recipes - array of objects
 * @param {string} filter -  used to filter the recipes
 * @returns an array of recipe objects that match the filter
*/
export function getMatchingRecipes(recipes, filter) {
    // Convert the filter string to lowercase and remove any leading or trailing whitespace
    const filterLowerCase = filter.toLowerCase().trim();

    // Use map() to apply the matchesFilter() function to each recipe
    const queriedCards = recipes.map(recipe => {
        if (matchesFilter(recipe, filterLowerCase)) {
            return recipe;
        }
    }).filter(recipe => recipe);

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

