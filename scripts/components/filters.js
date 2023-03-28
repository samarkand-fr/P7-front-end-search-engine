// Import functions and modules
import {capitalize } from "../utils.js";
import {  listenToFilter } from "./tags.js";

/** 
 * function generates HTML for the filter options based on the provided list of data.
 *  It uses reduce to iterate through each item in the listData array
 *  and generate a string of HTML li elements 
 * @param {Array} listData - The list of data to generate the filter menu for.
 * @param {String} menuClass - The CSS class to apply to the filter menu.
 * @param {String} dataColor - The data color to apply to the filter options.
 * @return {String} The resulting HTML string inside a ul element with a class of filter__menu and the menuClass provided as an argument.
*/
const createFilterMenuHTML = (listData, menuClass, dataColor) => {
    const menuHTML = listData.reduce((acc, item) => {
        return acc + `<li class="filter__option" data-color="${dataColor}">${capitalize(item)}</li>`;
    }, "");
    // The resulting HTML string is returned inside a ul element 
    // with a class of filter__menu and the menuClass provided as an argument.
    return `<ul class="filter__menu ${menuClass}">${menuHTML}</ul>`;
};

/**
 * Returns an array of distinct ingredient names from the data array.
 * 
 * @param {array} data - The data array containing the recipes.
 * @param {string} filter - The filter string to be applied (optional).
 * @returns {array} - An array of distinct ingredient names, filtered by the specified filter (if provided).
 */
const getDistinctIngredients = (data, filter) => {
    // Extracts all ingredient names from the data array and flattens them into a single array.
    const ingredients = data.flatMap((recipe) => recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase().trim()));
    // Uses the Set object to get only the distinct values from the ingredients array, and sorts them alphabetically.
    const distinctIngredients = [...new Set(ingredients)].sort();

    // If a filter is provided, filters the distinctIngredients array to only include ingredient names that match the filter (case-insensitive).
    if (filter) {
        return distinctIngredients.filter((ingredient) => ingredient.includes(filter.toLowerCase().trim()));
    }
  
    return distinctIngredients;
};

/**
 * Returns an array of distinct appliance names from the data array.
 * 
 * @param {array} data - The data array containing the recipes.
 * @param {string} filter - The filter string to be applied (optional).
 * @returns {array} - An array of distinct appliance names, filtered by the specified filter (if provided).
 */
const getDistinctAppliances = (data, filter) => {
    // Extracts all appliance names from the data array and converts them to lowercase.
    const distinctAppliances = [
        ...new Set(
            data.map(recipe => recipe.appliance.toLowerCase().trim())
        )
    ].sort();
    // If a filter is provided, filters the distinctAppliances array to only include appliance names that match the filter (case-insensitive).
    return filter ? distinctAppliances.filter(
        appliance => appliance.includes(
            filter.toLowerCase().trim()
        )
        // If filter is false, then distinctAppliances is returned as is.
    ) : distinctAppliances;
      
};

/**
 * Returns an array of distinct utensil names from the data array.
 * 
 * @param {array} data - The data array containing the recipes.
 * @param {string} filter - The filter string to be applied (optional).
 * @returns {array} - An array of distinct utensil names, filtered by the specified filter (if provided).
 */
const getDistinctUstensils = (data, filter) => {
    // Extracts all utensil names from the data array, flattens them into a single array, and converts them to lowercase.
    const distinctUstensils = [
        // use the spread operator (...) to convert a Set object into an array. 
        ...new Set(
            data.flatMap(
                recipe => recipe.ustensils.map(
                    ustensil => ustensil.toLowerCase().trim()
                )
            )
        )
    ].sort();
      
    // If a filter is provided, filters the distinctUstensils array to only include utensil names that match the filter (case-insensitive).
    return filter ? distinctUstensils.filter(
        ustensil => ustensil.includes(
            filter.toLowerCase().trim()
        )
        // If filter is false (i.e., it is null, undefined, or an empty string), then distinctUstensils is returned as it is.
    ) : distinctUstensils;
};

/**
 * Applies the specified filter to the data array, and generates the corresponding filter menu HTML.
 * 
 * @param {array} data - The data array to be filtered.
 * @param {string} value - The type of filter to be applied (e.g., "Ingrédients", "Appareil", "Ustensiles", etc.).
 * @param {html element object} btn - The button that was clicked to apply the filter.
 * @param {string} datacolor - The color of the clicked button.
 * @param {string} filter - The filter type (e.g., "color", "size", etc.).
 */
const hydrateFilter = (data, value, btn, datacolor, filter) => {
    // Depending on the filter type (value), generates the corresponding filter menu HTML by calling the 
    // appropriate helper function (getDistinctIngredients, getDistinctAppliances, or getDistinctUstensils) 
    // to get the distinct values of the specified filter type in the data array. 
    // The filter menu HTML is generated using the createFilterMenuHTML function and inserted after the clicked button.
    switch (value) {
    case "Ingrédients":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(getDistinctIngredients(data, filter), "filter__menu--primary", datacolor)
        );
        break;
    case "Appareil":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(getDistinctAppliances(data, filter), "filter__menu--success", datacolor)
        );
        break;
    case "Ustensiles":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(getDistinctUstensils(data, filter), "filter__menu--danger", datacolor)
        );
        break;
    default:
        break;
    }
};

/**
 * Helps to apply filters to a given set of data based on user input.
 * @param {array} data - Data to be filtered.
 * @param {html element object } filter btn - clicked by user
 * @param {string} filter - Type of filter applied by user.
 * @param {string} value - Filter value.
 * @param {string} color - Specify color of button.
 */
export const displayFilters = (data, btn, filter, value, color) => {
    const applyFilter = (button) => {
        const buttonValue = button.getAttribute("value");
        const buttonColor = button.getAttribute("data-color");
        hydrateFilter(data, buttonValue, button, buttonColor, filter);
    };

    if (btn && filter && value && color) {
        hydrateFilter(data, value, btn, color, filter);
    } else if (data) {
        document.querySelectorAll(".filter__select").forEach(applyFilter);
    }


    listenToFilter(data, document.querySelectorAll(".filter__option"));
};
