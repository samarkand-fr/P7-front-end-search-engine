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
 * This function checks if a given recipe object matches the provided filter string
 * @param {Object} recipe - The recipe object to be checked.
 * @param {string} filterLowerCase - The search filter string in lowercase.
 * @returns {boolean} - True if the recipe matches the search filter, false otherwise.
*/
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;

    // Remove accents from the filter and recipe properties
    const nameWithoutAccent = removeAccents(name);
    const descriptionWithoutAccent = removeAccents(description);
    const applianceWithoutAccent = removeAccents(appliance);
    const ustensilsWithoutAccent = ustensils.map(ustensil => removeAccents(ustensil));
    const ingredientsWithoutAccent = ingredients.map(ingredient => removeAccents(ingredient.ingredient));

    // A helper function that checks if a string includes a given filter string, case-insensitively
    const includesFilter = (string) => string.toLowerCase().includes(filterLowerCase);

    return (
        includesFilter(nameWithoutAccent) ||
        includesFilter(descriptionWithoutAccent) ||
        includesFilter(applianceWithoutAccent) ||
        ustensilsWithoutAccent.some((ustensil) => includesFilter(ustensil)) ||
        ingredientsWithoutAccent.some(ingredient => includesFilter(ingredient))
    );
};
  
    
    
    
    