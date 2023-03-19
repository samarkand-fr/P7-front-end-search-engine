// capitalize the first letter of a string
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper function to check if a recipe matches the search filter
export const matchesFilter = (recipe, filterLowerCase) => {
    const { name, description, appliance, ustensils, ingredients } = recipe;
    const includesFilter = (string) => string.toLowerCase().includes(filterLowerCase);

    return (
        includesFilter(name) ||
  includesFilter(description) ||
  includesFilter(appliance) ||
  ustensils.some((ustensil) => includesFilter(ustensil)) ||
  ingredients.some((ingredient) => includesFilter(ingredient.ingredient))
    );
};


// removes duplicate items from an array based on the id property of each item.
export const removeDuplicateItems = (array) => {
    let cleanArray = [];
    array.forEach((item) => {
        if (cleanArray.findIndex((el) => el.id === item.id) === -1) {
            cleanArray.push(item);
        }
    });
    return cleanArray;
};