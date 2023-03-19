import { displayRecipeCards } from "./factories/cards.js";
import { removeDuplicateItems,matchesFilter  } from "./utils.js";


// filters a list of recipes based on a specified search filter, 
// and returns the matching recipes with any duplicate results removed
export let getMatchingRecipes = (recipes, filter) => {
    const filterLowerCase = filter.toLowerCase().trim();

    let queriedCards = [];

    for (const recipe of recipes) {
        if (matchesFilter(recipe, filterLowerCase)) {
            queriedCards.push(recipe);
        } else {
            for (const ustensil of recipe.ustensils) {
                if (ustensil.includes(filterLowerCase)) {
                    queriedCards.push(recipe);
                    break;
                }
            }

            for (const ingredient of recipe.ingredients) {
                if (ingredient.ingredient.includes(filterLowerCase)) {
                    queriedCards.push(recipe);
                    break;
                }
            }
        }
    }

    return removeDuplicateItems(queriedCards);
};

// searching() listens for user input in the search bar and calls the getMatchingRecipes function, passing in
//  the current recipe list and the user's input as the filter
export let findRecipe  = (recipes) => {
    const inputValue = document.querySelector(".search__input");
    let timeout = null;

    inputValue.addEventListener("input", () => {
        clearTimeout(timeout);

        // Only perform the search if there are at least 3 characters
        if (inputValue .value.length >= 3) {
            timeout = setTimeout(() => {
                const matchingRecipes = getMatchingRecipes(recipes, inputValue.value);
                const distinctRecipes = removeDuplicateItems(matchingRecipes);

                displayRecipeCards(distinctRecipes);
               
            }, 300);
        } else {
            displayRecipeCards(recipes);
       

            document
                .querySelectorAll(".active__filter")
                .forEach((li) => {
                    li.classList.remove("active__filter");
                });
        }
    });
};
























