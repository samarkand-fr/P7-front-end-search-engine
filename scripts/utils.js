// capitalize the first letter of a string
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper function to check if a recipe matches the search filter
// @arguments object recipe and a string to check 
// return boolean
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

// function returns a boolean value indicating whether any of the ingredients match the filterLowerCase string.
// takes in the ingredients array and the includesFilter function as arguments
const ingredientsMatchFilter = (ingredients, includesFilter) => {
    return (
        ingredients.length > 0 &&
            ingredients.some(({ ingredient }) => includesFilter(ingredient))
    );
};

// removes duplicate items from an array based on the id property of each item.
export const removeDuplicateItems = (array) => {
    let cleanArray = [];//store unique items
    array.forEach((item) => {
        // check  if there is already an item in cleanArray with the same id property as the current item
        //returns +ve index i.e item already exist ,skip
        // returns -1 no matching item ,add to cleanArray
        if (cleanArray.findIndex((el) => el.id === item.id) === -1) {
            cleanArray.push(item);
        }
    });
    return cleanArray;
};


