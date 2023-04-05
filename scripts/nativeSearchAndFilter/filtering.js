import {removeAccents} from  "../utils.js";

/**
 * Get distinct items of a certain type from a data array.
 * @param {Array} data - The data array to search through.
 * @param {String} filter - The filter string to match items against. Case-insensitive.
 * @param {String} type - The type of item to extract ('ustensils', 'appliances', or 'ingredients').
 * @returns {Array} - An array of distinct items of the specified type.
 */
export const getDistinctItems = (data, filter, type) => {
    let items = [];
    let distinctItems = [];
    
    // Determine which type of item to extract and extract them from the data array using a for loop.
    if (type === "ustensils") {
        for (let i = 0; i < data.length; i++) {
            const recipe = data[i];
            for (let j = 0; j < recipe.ustensils.length; j++) {
                const ustensil = recipe.ustensils[j].toLowerCase().trim();
                items.push(ustensil);
            }
        }
    } else if (type === "appliance") {
        for (let i = 0; i < data.length; i++) {
            const recipe = data[i];
            const appliance = recipe.appliance.toLowerCase().trim();
            items.push(appliance);
        }
    } else if (type === "ingredients") {
        for (let i = 0; i < data.length; i++) {
            const recipe = data[i];
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j].ingredient.toLowerCase().trim();
                items.push(ingredient);
            }
        }
    } else {
        return [];
    }
  
    // Get only the distinct values from the items array, and sort them alphabetically using a for loop.
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!distinctItems.includes(item)) {
            distinctItems.push(item);
        }
    }
    distinctItems.sort();
  
    // If a filter is provided, filter the distinctItems array to only include items that match the filter (case-insensitive) using a for loop.
    if (filter) {
        const filteredItems = [];
        const filterWithoutAccent = removeAccents(filter.toLowerCase().trim());
    
        for (let i = 0; i < distinctItems.length; i++) {
            const item = distinctItems[i];
            const itemWithoutAccent = removeAccents(item.toLowerCase().trim());
    
            if (itemWithoutAccent.includes(filterWithoutAccent)) {
                filteredItems.push(item);
            }
        }
    
        return filteredItems;
    } else {
        return distinctItems;
    }
}; 