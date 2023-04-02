// Import modules
import { displayFilters }from "./components/filters.js";

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
        closeSelectFilter(
            filterMenu.previousElementSibling,
            filterMenu,
            filterMenu.parentNode,
            filterMenu.parentNode.firstElementChild
        );
    } else {
        // If other filters are open, close them.
        isFilterClosed();
  
        // Open the selected filter.
        customizeSearchButton(btn, buttonValue);
    }
}

/**
 * Closes the selected menu and reverts its customization
 * @param {HTMLElement} inputBtn - The input button element to revert
 * @param {HTMLElement} filterShow - The HTML element to hide
 * @param {HTMLElement} parentWidth - The parent element to resize
 * @param {HTMLElement} rotateArrow - The arrow element to rotate
*/
export function closeSelectFilter(inputBtn, filterShow, parentWidth, rotateArrow) {
    inputBtn.setAttribute("type", "button");
    inputBtn.setAttribute("value", `${inputBtn.getAttribute("data-value")}`);
    inputBtn.removeAttribute("placeholder");
    filterShow.classList.remove("filter__show");
    parentWidth.style.width = "170px";
    rotateArrow.classList.remove("filter__arrow--rotate");
}

/**
 * Checks if other filters are open and closes them.
*/
export function isFilterClosed() {
    // Get all filter menus.
    document.querySelectorAll(".filter__menu").forEach((filter) => {
        // If the current filter menu is open, close it.
        if (filter.classList.contains("filter__show")) {
            closeSelectFilter(
                filter.previousElementSibling,
                filter,
                filter.parentNode,
                filter.parentNode.firstElementChild
            );
        }
    });
}

/**
 * Closes the filter and loads new elements based on a new list of recipes to filter.
 * @param {Array} data - The new list of recipes to filter
 * Checks if any of the filters have been reloaded, and if so,
 * it updates the corresponding search button and repopulates the filter options.
 */
export function handleFilterReload(data) {
    // Loop through each filter menu.
    document.querySelectorAll(".filter__menu").forEach((filter) => {
        // Check if the filter menu is open.
        if (filter.classList.contains("filter__show")) {
            // Get the input button and its value.
            let btn = filter.previousElementSibling;
            let btnvalue = btn.getAttribute("value");
            
            // Remove previous UL containing LI elements.
            document.querySelectorAll(".filter__menu").forEach((ul) => {
                ul.remove();
            });
            
            // Populate LI elements with new search.
            displayFilters(data);
            
            // Open input again in text mode.
            customizeSearchButton(btn, btnvalue);
        }
    });
}

/**
 * Changes the type, placeholder, width, and other attributes of a given button element based on a specified buttonValue.
 * @param {Element} button - The button element to customize.
 * @param {string} buttonValue - The value of the button to customize, used to determine how to customize the button.
 * @returns {void}
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
        const parentNode = button.parentNode;
        const nextElementSibling = button.nextElementSibling;
        const prevElementSibling = button.previousElementSibling;
  
        parentNode.style.width = "66%";
        button.setAttribute("type", "text");
        button.setAttribute("data-value", buttonValue);
        button.setAttribute("placeholder", value);
        nextElementSibling.classList.add("filter__show");
        prevElementSibling.classList.add("filter__arrow--rotate");
        // the button is cleared and ready for the user to input a new value.
        button.value = "";
    }
}