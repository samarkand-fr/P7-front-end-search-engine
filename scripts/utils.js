/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
 
/**    
 * This function checks if a given recipe object matches the provided filter string
 * @param {Object} recipe - The recipe object to be checked.
 * @param {string} filterLowerCase - The search filter string in lowercase.
 * @returns {boolean} - True if the recipe matches the search filter, false otherwise.
*/
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;

    // A helper function that checks if a string includes a given filter string, case-insensitively
    const includesFilter = (string) => string.toLowerCase().includes(filterLowerCase);
    
    return (
        includesFilter(name) ||
        includesFilter(description) ||
        includesFilter(appliance) ||
        ustensils.some((ustensil) => includesFilter(ustensil)) ||
        ingredients.some(ingredient => includesFilter(ingredient.ingredient))
    );
};
    
    
    
    
    