/**
 * Get distinct items of a certain type from a data array.
 * @param {Array} data - The data array to search through.
 * @param {String} filter - The filter string to match items against. Case-insensitive.
 * @param {String} type - The type of item to extract ('ustensils', 'appliances', or 'ingredients').
 * @returns {Array} - An array of distinct items of the specified type.
 */
export const getDistinctItems = (data, filter, type) => {
    let items = [];
  
    // Determine which type of item to extract and extract them from the data array.
    switch (type) {
    case "ustensils":
        items = data.flatMap(recipe =>
            recipe.ustensils.map(
                ustensil => ustensil.toLowerCase().trim()
            )
        );
        break;
    case "appliances":
        items = data.map(
            recipe => recipe.appliance.toLowerCase().trim()
        );
        break;
    case "ingredients":
        items = data.flatMap(recipe =>
            recipe.ingredients.map(
                ingredient => ingredient.ingredient.toLowerCase().trim()
            )
        );
        break;
    default:
        return [];
    }
  
    // Get only the distinct values from the items array, and sort them alphabetically.
    const distinctItems = [...new Set(items)].sort();
  
    // If a filter is provided, filter the distinctItems array to only include items that match the filter (case-insensitive).
    return filter ? distinctItems.filter(
        item => item.includes(filter.toLowerCase().trim())
    ) : distinctItems;
};
  