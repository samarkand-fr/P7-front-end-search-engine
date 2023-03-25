/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
 
/**
 * Returns a boolean value indicating whether any of the ingredients match the search filter.
 *
 * @param {Array} ingredients - An array of ingredient objects to be checked.
 * @param {function} includesFilter - A function that takes a string argument and returns true if the string includes the search filter.
 * @returns {boolean} - True if any of the ingredients match the search filter, false otherwise.
 */
const ingredientsMatchFilter = (ingredients, includesFilter) => {
    return (
        ingredients.length > 0 &&
        ingredients.some(({ ingredient }) => includesFilter(ingredient))
    );
};

/**
 * Helper function to check if a recipe matches the search filter
 *
 * @param {Object} recipe - The recipe object to be checked.
 * @param {string} filterLowerCase - The search filter string in lowercase.
 * @returns {boolean} - True if the recipe matches the search filter, false otherwise.
 */
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;
    const includesFilter = (string) => string.toLowerCase().includes(filterLowerCase);
    
    return (
        includesFilter(name) ||
        includesFilter(description) ||
        includesFilter(appliance) ||
        ustensils.some((ustensil) => includesFilter(ustensil)) ||
        ingredientsMatchFilter(ingredients, includesFilter)
    );
};

/**
 * Removes duplicate items from an array based on the id property of each item.
 * @param {Array} array - The input array to remove duplicate items from.
 * @returns {Array} - An array with unique items based on the id property of each item.
*/
export const removeDuplicateItems = (array) => {
    let cleanArray = []; // An array to store unique items.
    array.forEach((item) => {
        // Check if there is already an item in `cleanArray` with the same `id` property as the current `item`.
        // If the item already exists, skip it. Otherwise, add it to `cleanArray`.
        if (cleanArray.findIndex((el) => el.id === item.id) === -1) {
            cleanArray.push(item);
        }
    });
    return cleanArray;
};



