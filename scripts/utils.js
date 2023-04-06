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
export const matchesFilter = (recipe, filter) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;
  
    // Remove accents from the filter string
    const filterWithoutAccents = removeAccents(filter);
  
    // Remove accents from the recipe properties
    const nameWithoutAccents = removeAccents(name);
    const descriptionWithoutAccents = removeAccents(description);
    const applianceWithoutAccents = removeAccents(appliance);
    const ustensilsWithoutAccents = ustensils.map(ustensil => removeAccents(ustensil));
    const ingredientsWithoutAccents = ingredients.map(ingredient => removeAccents(ingredient.ingredient));
  
    // Check if the filter string is included in any of the recipe properties
    const includesFilter = (string) => string.toLowerCase().includes(filterWithoutAccents.toLowerCase());
  
    return (
        includesFilter(nameWithoutAccents) ||
      includesFilter(descriptionWithoutAccents) ||
      includesFilter(applianceWithoutAccents) ||
      ustensilsWithoutAccents.some((ustensil) => includesFilter(ustensil)) ||
      ingredientsWithoutAccents.some(ingredient => includesFilter(ingredient))
    );
};
     
    
    
    