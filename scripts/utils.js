/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
 
/**
 * Check if a given recipe matches a given filter string.
 * @param {Object} recipe - The recipe object to check.
 * @param {string} filterLowerCase - The filter string to match against the recipe.
 * @returns {boolean} - True if the recipe matches the filter, false otherwise.
*/
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;

    // A helper function that checks if a string includes a given filter string, case-insensitively
    const includesFilter = (string) => string.toLowerCase().indexOf(filterLowerCase) !== -1;
    
    // Check if the filter matches the name, description, or appliance
    if (
        includesFilter(name) ||
        includesFilter(description) ||
        includesFilter(appliance)
    ) {
        return true;
    }
    
    // Check if the filter matches any of the ustensils
    for (let i = 0; i < ustensils.length; i++) {
        if (includesFilter(ustensils[i])) {
            return true;
        }
    }
    
    // Check if the filter matches any of the ingredients
    for (let i = 0; i < ingredients.length; i++) {
        if (includesFilter(ingredients[i].ingredient)) {
            return true;
        }
    }
    
    // If none of the checks above returned true, the filter does not match the recipe
    return false;
};