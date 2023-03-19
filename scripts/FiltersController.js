import {  } from "./components/cards.js";
import { displayFilters }from "./components/filters.js";

// function to open and close filters/buttons
export function isFiltersInteractive(btn, buttonValue) {
    // get keyword component
    const displayKeyword = btn.nextElementSibling;
  
    if (displayKeyword.classList.contains("filter__show")) {
    // close the selected menu
        closeSelectFilter(
            displayKeyword.previousElementSibling,
            displayKeyword,
            displayKeyword.parentNode,
            displayKeyword.parentNode.firstElementChild
        );
    } else {
    // check if other filters are open and close them
        isFilterClosed();
        // open selected filter
        customizeSearchButton(btn, buttonValue);
    }
}

// function to close the selected menu
export function closeSelectFilter(inputBtn, filterShow, parentWidth, rotateArrow) {
    inputBtn.setAttribute("type", "button");
    inputBtn.setAttribute("value", `${inputBtn.getAttribute("data-value")}`);
    inputBtn.removeAttribute("placeholder");
    filterShow.classList.remove("filter__show");
    parentWidth.style.width = "170px";
    rotateArrow.classList.remove("filter__arrow--rotate");
}

// function to check if other filters are open and close them
export function isFilterClosed() {
    document.querySelectorAll(".filter__menu").forEach((filter) => {
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

// function to close the filter and load new elements
// checks if any of the filters have been reloaded, and if so,
//  it updates the corresponding search button and repopulates the filter options
export function handleFilterReload(data) {
    document.querySelectorAll(".filter__menu").forEach((filter) => {
        if (filter.classList.contains("filter__show")) {
            let btn = filter.previousElementSibling;
            let btnvalue = btn.getAttribute("value");
            // remove previous UL containing LI elements
            document.querySelectorAll(".filter__menu").forEach((ul) => {
                ul.remove();
            });
            // populate LI elements with new search
            displayFilters(data);
            // open input again in text mode
            customizeSearchButton(btn, btnvalue);
        }
    });
}

// function to change input type to text and open filter
// changes the type, placeholder, width, and other attributes 
// of a given button element based on a specified buttonValue
export function customizeSearchButton(button, buttonValue) {
    button.setAttribute("type", "text");
    button.setAttribute("data-value", `${buttonValue}`);
    button.value = "";
    switch (buttonValue) {
    case "Appareil":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un appareil");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add("filter__arrow--rotate");
        break;
    case "Ingrédients":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ingrédient");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add("filter__arrow--rotate");
        break;
    case "Ustensiles":
        button.parentNode.style.width = "66%";
        button.setAttribute("placeholder", "Recherche un ustensile");
        button.nextElementSibling.classList.add("filter__show");
        button.previousElementSibling.classList.add("filter__arrow--rotate");
        break;
    default:
        break;
    }
}
