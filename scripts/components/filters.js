// Import functions and modules
import {capitalize } from "../utils.js";


const createFilterMenuHTML = (listData, menuClass, dataColor) => {
    const menuHTML = listData.reduce((acc, item) => {
        return acc + `<li class="filter__option" data-color="${dataColor}">${capitalize(item)}</li>`;
    }, "");
    return `<ul class="filter__menu ${menuClass}">${menuHTML}</ul>`;
};

// Define a function to display the distinct filter options for ingredients
const displayFilterIngredients = (data, filter) => {
    // Get all distinct ingredients from recipe data
    const distinctIngredients = [
        ...new Set(
            data.map((recipe) =>
                recipe.ingredients.map((ingredient) =>
                    ingredient.ingredient.toLowerCase().trim()
                )
            ).flat().sort()
        )
    ];
    // Filter the distinct ingredients based on user input
    if (filter) {
        return distinctIngredients.filter((ingredient) =>
            ingredient.includes(filter.toLowerCase().trim())
        );
    }
    return distinctIngredients;
};

// Define a function to display the distinct filter options for appliance
const displayFilterAppliance = (data, filter) => {
    // Get all distinct appliances from recipe data
    const distinctAppliance = [
        ...new Set(
            data.map((recipe) => recipe.appliance.toLowerCase().trim()).sort()
        )
    ];
    // Filter the distinct appliances based on user input
    if (filter) {
        return distinctAppliance.filter((appliance) =>
            appliance.includes(filter.toLowerCase().trim())
        );
    }
    // Return the array of distinct appliances
    return distinctAppliance;
};

// Define a function to display the distinct filter options for ustensils
const displayFilterUstensils = (data, filter) => {
    const distinctUstensils = [
        ...new Set(
            data.map((recipe) =>
                recipe.ustensils.map((item) => item.toLowerCase().trim())
            ).flat().sort()
        )
    ];
    // Filter the distinct ustensils based on user input
    if (filter) {
        return distinctUstensils.filter((ustensil) =>
            ustensil.includes(filter.toLowerCase().trim())
        );
    }
    // Return the array of distinct ustensils
    return distinctUstensils;
};

const hydrateFilter = (data, value, btn, datacolor, filter) => {
    switch (value) {
    case "Ingrédients":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(displayFilterIngredients(data, filter), "filter__menu--primary", datacolor)
        );
        break;
    case "Appareil":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(displayFilterAppliance(data, filter), "filter__menu--success", datacolor)
        );
        break;
    case "Ustensiles":
        btn.insertAdjacentHTML(
            "afterend",
            createFilterMenuHTML(displayFilterUstensils(data, filter), "filter__menu--danger", datacolor)
        );
        break;
    default:
        break;
    }
};

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


   
};


