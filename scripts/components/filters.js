// Import functions and modules
import {capitalize } from "../utils.js";
import { listenToFilter, showListOfTags,tagsArray } from "./tags.js";
import { displayRecipeCards } from "./cards.js";
import {getDistinctItems} from "../searchAndFilter/filtering.js";

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
    
    let distinctValues ;//an array of distinct filtered values

    switch (value) {
    case "Ingrédients":
        distinctValues = getDistinctItems(data, filter, "ingredients");
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(distinctValues, "filter__menu--primary", datacolor)
        );
        break;
    case "Appareil":
        distinctValues = getDistinctItems(data, filter, "appliance");
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(distinctValues, "filter__menu--success", datacolor)
        );
        break;
    case "Ustensiles":
        distinctValues = getDistinctItems(data, filter, "ustensils");
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(distinctValues, "filter__menu--danger", datacolor)
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


/**
 * Binds event listeners to filter select elements and updates the display
 * of recipe cards based on the selected filters.
 * @param {Array} recipes - The list of recipes to filter.
 */
export let bindFilterEvents = (recipes) => {
    // Get all filter select elements on the page
    const filterInputValue = document.querySelectorAll(".filter__select");
  
    // Add an event listener for each filter select element
    for (const input of filterInputValue) {
        input.addEventListener("input", (e) => {
            e.preventDefault();
  
            // show the list of tags
            showListOfTags(tagsArray);
  
            // Display all recipe cards
            displayRecipeCards(recipes);
  
            // Get the value of (data-value and data-color) attributes from the filter select element
            const value = input.getAttribute("data-value");
            const color = input.getAttribute("data-color");
  
            // Remove the tag list element from the DOM 
            input.nextElementSibling.remove();
  
            // Call the displayFilters function with the selected filter options
            displayFilters(recipes, input, input.value, value, color);
  
            // Update the style of the filter select element and show the tag list
            input.nextElementSibling.classList.add("filter__show");
            input.previousElementSibling.classList.add("filter__arrow--rotate");
        });
    }
};



