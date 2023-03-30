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
    } else if (type === "appliances") {
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
        for (let i = 0; i < distinctItems.length; i++) {
            const item = distinctItems[i];
            if (item.toLowerCase().trim().includes(filter.toLowerCase().trim())) {
                filteredItems.push(item);
            }
        }
        return filteredItems;
    }
    
    return distinctItems;
};
  