/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
 
/**
 * Removes all accents from a string.
 *
 * @param {string} str - The string to remove accents from.
 * @returns {string} The string without any accents.
 */
export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Check if a given recipe matches a given filter string.
 * @param {Object} recipe - The recipe object to check.
 * @param {string} filterLowerCase - The filter string to match against the recipe.
 * @returns {boolean} - True if the recipe matches the filter, false otherwise.
*/
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;
  
    // Remove accents from the filter and recipe properties
    const filterWithoutAccent = removeAccents(filterLowerCase);
    const nameWithoutAccent = removeAccents(name);
    const descriptionWithoutAccent = removeAccents(description);
    const applianceWithoutAccent = removeAccents(appliance);
    
    // Remove accents from each ustensil string using a for loop
    const ustensilsWithoutAccent = [];
    for (let i = 0; i < ustensils.length; i++) {
        ustensilsWithoutAccent.push(removeAccents(ustensils[i]));
    }
    
    // Remove accents from each ingredient string using a for loop
    const ingredientsWithoutAccent = [];
    for (let i = 0; i < ingredients.length; i++) {
        ingredientsWithoutAccent.push(removeAccents(ingredients[i].ingredient));
    }
  
    // A helper function that checks if a string includes a given filter string, case-insensitively
    const includesFilter = (string) => string.toLowerCase().indexOf(filterWithoutAccent) !== -1;
  
    // Check if the filter matches the name, description, or appliance
    if (
        includesFilter(nameWithoutAccent) ||
      includesFilter(descriptionWithoutAccent) ||
      includesFilter(applianceWithoutAccent)
    ) {
        return true;
    }
  
    // Check if the filter matches any of the ustensils
    for (let i = 0; i < ustensilsWithoutAccent.length; i++) {
        if (includesFilter(ustensilsWithoutAccent[i])) {
            return true;
        }
    }
  
    // Check if the filter matches any of the ingredients
    for (let i = 0; i < ingredientsWithoutAccent.length; i++) {
        if (includesFilter(ingredientsWithoutAccent[i])) {
            return true;
        }
    }
  
    // If none of the checks above returned true, the filter does not match the recipe
    return false;
};
  