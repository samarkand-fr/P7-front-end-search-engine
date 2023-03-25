// Import modules
import { displayRecipeCards } from "./components/cards.js";
import { displayFilters } from "./components/filters.js";
import { showListOfTags } from "./components/tags.js";
import { tagsArray } from "./components/tags.js";
import { handleFilterReload } from "./FiltersController.js";
import { removeDuplicateItems,matchesFilter  } from "./utils.js";

/**
 * searches through a list of recipes and returns the matching recipes with any duplicates removed.
 * @param {array} recipes - The list of recipes to search through
 * @param {string} filter - The search filter to apply to the recipes
 * @returns {array} - The matching recipes with any duplicates removed
*/
export let getMatchingRecipes = (recipes, filter) => {
    // Convert the search filter to lowercase and remove any leading or trailing white spaces.
    const filterLowerCase = filter.toLowerCase().trim();
    // Initialize an empty array to store the matching recipes.
    let queriedCards = [];
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
    // Remove any duplicate items from the queried recipe cards and return the result.
    const distinctRecipes = removeDuplicateItems(queriedCards);
    return distinctRecipes;
};

/** 
 * Define a function to handle recipe searching
 * @param {array} recipes - array of objects
*/
export let findRecipe = (recipes) => {
    // Get the input element for the search box
    const searchInput = document.querySelector(".search__input");
    // Initialize a variable to store a timeout ID
    let timeout = null;
  
    // Add an event listener for changes to the search box
    searchInput.addEventListener("input", () => {
        // Clear any existing timeouts
        clearTimeout(timeout);
  
        // Only perform the search if the user has entered at least 3 characters
        if (searchInput.value.length >= 3) {
        // Set a timeout to perform the search after 300ms
            timeout = setTimeout(() => {
                // Find all recipes that match the search query
                const matchingRecipes = getMatchingRecipes(recipes, searchInput.value);
  
                // Display the search results on the page
                displayRecipeCards(matchingRecipes);
                // Generate filter options based on the search results
                displayFilters(matchingRecipes);
                // Update the filter status to reflect any changes in the search results
                handleFilterReload(recipes);
            }, 300);
        } else {
            // If the search query is too short or empty, display all recipes and reset the filter status
            displayRecipeCards(recipes);
            handleFilterReload(recipes);
            // Clear any selected filters and reset the tags array
            tagsArray.length = 0;
            showListOfTags(tagsArray);
            document.querySelectorAll(".active__filter").forEach((filter) => {
                filter.classList.remove("active__filter");
            });
        }
    });
};

/**
 * Listens for user input in the ingredient filters and calls the displayFilters function
 * @param {Array} recipes - The list of recipes to filter.
*/
export const taggedItem = (recipes) => {
    // Get all input elements with the class "filter__select".
    const filterInputs = document.querySelectorAll(".filter__select");
    
    // Loop through each input element.
    for (const input of filterInputs) {
    // Add an event listener for the "input" event.
        input.addEventListener("input", (event) => {
            // Prevent the default action and stop the event from bubbling up the DOM.
            event.preventDefault();
            event.stopPropagation();  

            // Clear the tagsArray and show the updated list of tags.
            tagsArray.length = 0;
            showListOfTags(tagsArray);

            // Display all recipe cards.
            displayRecipeCards(recipes);

            // Get the "data-value" and "data-color" attributes of the input element.
            const value = input.getAttribute("data-value");
            const color = input.getAttribute("data-color");

            // Call the displayFilters function with the appropriate arguments.
            displayFilters(recipes, input, input.value, value, color);
  
        });
    }
};





















