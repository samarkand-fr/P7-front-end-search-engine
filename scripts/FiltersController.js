import { displayFilters } from "./components/filters.js";
import { tagsArray ,showListOfTags} from "./components/tags.js";
import { displayRecipeCards } from "./components/cards.js";

// constants
const FILTER_MENU_WIDTH = "170px";
const SEARCH_INPUT_WIDTH = "66%";

const filterButtons = document.querySelectorAll(".filter__select");

// Add event listeners to filter buttons for opening and closing the filters
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.getAttribute("value");
        isFiltersInteractive(button, buttonValue);
    });
});

/**
 * Toggles the display of the keyword filter when a filter button is clicked.
 * @param {HTMLElement} btn - The button element that was clicked.
 * @param {string} buttonValue - The value of the button element.
 */
export function isFiltersInteractive(btn, buttonValue) {
    // Get the filter menu element.
    const filterMenu = btn.nextElementSibling;

    // If the filter menu is already displayed, close the selected menu.
    if (filterMenu.classList.contains("filter__show")) {
        closeSelectFilter(filterMenu);
    } else {
        // If other filters are open, close them.
        isFilterClosed();
        // Open the selected filter.
        customizeSearchButton(btn, buttonValue);
    }
}

/**
 * Closes the selected menu and reverts its customization
 * @param {HTMLElement} filterShow - The HTML element to hide
 */
export function closeSelectFilter(filterShow) {
    const inputBtn = filterShow.previousElementSibling;
    inputBtn.setAttribute("type", "button");
    inputBtn.setAttribute("value", inputBtn.getAttribute("data-value"));
    inputBtn.removeAttribute("placeholder");
    filterShow.classList.remove("filter__show");
    filterShow.parentNode.style.width = FILTER_MENU_WIDTH;
    filterShow.parentNode.firstElementChild.classList.remove(
        "filter__arrow--rotate"
    );
}

/**
 * Checks if other filters are open and closes them.
 */
export function isFilterClosed() {
    // Get all filter menus.
    document.querySelectorAll(".filter__menu").forEach((filter) => {
        // If the current filter menu is open, close it.
        if (filter.classList.contains("filter__show")) {
            closeSelectFilter(filter);
        }
    });
}

/**
 * Changes the type, placeholder, width, and other attributes of a given button element based on a specified buttonValue.
 * @param {Element} button - The button element to customize.
 * @param {string} buttonValue - The value of the button to customize, used to determine how to customize the button.
 */
export function customizeSearchButton(button, buttonValue) {
    // Object containing the values to customize the button for each filter.
    const values = {
        Appareil: "Recherche un appareil",
        Ingrédients: "Recherche un ingrédient",
        Ustensiles: "Recherche un ustensile",
    };

    const value = values[buttonValue];

    if (value) {
        button.setAttribute("type", "text");
        button.setAttribute("data-value", buttonValue);
        button.setAttribute("placeholder", value);
        button.parentNode.style.width = SEARCH_INPUT_WIDTH ;
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add("filter__arrow--rotate");
        // the button is cleared and ready for the user to input a new value.
        button.value = "";
    }
}

/**
 * Binds event listeners to filter select elements and updates the display
 * of recipe cards based on the selected filters.
 * @param {Array} recipes - The list of recipes to filter.
 * @param {boolean} isReload - Whether the function was called from a filter reload event or not.
 */
const bindFilterEvents = (recipes, isReload = false) => {
    // Get all filter select elements on the page
    const filterInputValue = document.querySelectorAll(".filter__select");
  
    // Add an event listener for each filter select element
    for (const input of filterInputValue) {
        input.addEventListener("input", (e) => {
            e.preventDefault();
  
            // show the list of tags
            showListOfTags(tagsArray);
  
            // Display all recipe cards if not called from a filter reload event
            if (!isReload) {
                displayRecipeCards(recipes);
            }
  
            // Get the value of (data-value and data-color) attributes from the filter select element
            const value = input.getAttribute("data-value");
            const color = input.getAttribute("data-color");
  
            // Remove the tag list element from the DOM 
            input.nextElementSibling.remove();
  
            // Call the displayFilters function with the selected filter options
            displayFilters(recipes, input, input.value, value, color);
  
            // Update the style of the filter select element and show the dropdown list
            input.setAttribute("value", input.value);
            input.parentNode.style.width = SEARCH_INPUT_WIDTH;
            input.nextElementSibling.classList.add("filter__show");
            input.previousElementSibling.classList.add("filter__arrow--rotate");
        });
    }
};

/**
 * Reloads the filter and updates the display of recipe cards based on a new list of recipes to filter.
 * @param {Array} data - The new list of recipes to filter
 */
export function handleFilterReload(data) {
    const filterMenus = document.querySelectorAll(".filter__menu");

    // Loop through each filter menu.
    filterMenus.forEach((filter) => {
        // Check if the filter menu is open.
        if (filter.classList.contains("filter__show")) {
            // Get the input button and its value.
            const inputBtn = filter.previousElementSibling;
            const btnvalue = inputBtn.getAttribute("value");

            // Remove previous UL containing LI elements.
            filter.remove();

            // Populate LI elements with new search.
            displayFilters(data);
            // Open input again in text mode.
            customizeSearchButton(inputBtn, btnvalue);

            // Bind filter events to the new filter menus
            bindFilterEvents(data, true);
        }
    });
}
