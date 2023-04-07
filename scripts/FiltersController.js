import { displayFilters } from "./components/filters.js";

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
    filterShow.parentNode.style.width = "170px";
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
 * Reloads the filter menus with new search data and customizes the input buttons.
 * @param {Object} data - The search data used to populate the filter menus.
 */
export function handleFilterReload(data) {
    // Select all filter menu elements and remove their previous UL containing LI elements.
    const filterMenus = document.querySelectorAll(".filter__menu");
    filterMenus.forEach((ul) => {
        ul.remove();
    });
  
    // Populate the filter menus with new search data.
    displayFilters(data);
  
    // Select all input buttons and customize them by opening in text mode.
    const inputButtons = document.querySelectorAll(".filter__btn");
    inputButtons.forEach((btn) => {
        // Get the button value.
        const btnvalue = btn.getAttribute("value");
  
        // Open input again in text mode.
        customizeSearchButton(btn, btnvalue);
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
        button.parentNode.style.width = "66%";
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add("filter__arrow--rotate");
        // the button is cleared and ready for the user to input a new value.
        button.value = "";
    }
}
