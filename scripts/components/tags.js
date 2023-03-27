// imports
import { handleFilterReload } from "../FiltersController.js";
import { displayRecipeCards } from "./cards.js";
import { getMatchingRecipes } from "../search.js";

// Declare a variable to store the original recipe data.
let allRecipes = [];

// Declare an array to store the tags added by the user.
export let tagsArray = [];

/**
 * Add event listener to the 'close' button of each tag displayed in the UI.
 * @param {Array} data - The recipe data.
 */
const listenToTags = (data) => {
    document.querySelectorAll(".tags__close").forEach((tag) => {
        tag.addEventListener("click", handleTagRemoval);
        console.log(data);
    });
};

/**
 * Handle the case where the user clicks on the "None" filter tag, which removes all active filter tags.
 * @param {Event} event - The click event.
 */
const handleTagRemoval = (event) => {
    // Get the ID of the clicked element and parse it as an integer.
    const ID = parseInt(event.currentTarget.id);
   
    //  Remove the tag from the array of active filter tags.
    tagsArray.splice(ID, 1);
    

    // If there are no active filter tags, show all the original recipe cards.
    if (tagsArray.length === 0) {
        displayRecipeCards(allRecipes[0]);
        handleFilterReload(allRecipes[0]);
    } 
    // If there are still active filter tags, filter the recipe data accordingly and update the display.
    else {
        // ensure that all recipes are displayed on the page
        //  when the page is first loaded or when the filtering is reset.
        let tagReload = allRecipes[0];
        tagsArray.forEach((item) => {
            tagReload = getMatchingRecipes(tagReload, item.title);
        });
        handleFilterReload(tagReload);
        displayRecipeCards(tagReload);
    }

    // Update the list of active filter tags in the UI.
    showListOfTags(tagsArray);
};
/**
 * Handles the filtering options when there is only one recipe
 * and when tags are added or removed.
 * @param {Object[]} data - An array of recipe objects
 * @param {Object[]} tagsArray - An array of tag objects
*/
const handleFilterOption = (data, tagsArray) => {
    // If data has only one item, then all filter options are marked as active.
    if (data.length === 1) {
        document.querySelectorAll(".filter__option").forEach((li) => {
            li.classList.remove("filter__option");
            li.classList.add("active__filter");
        });
    }
    // update the CSS classes of the filter options based on the tags in tagsArray.
    //  If a tag matches a filter option, the filter option is marked as active; 
    // otherwise, it is marked as a regular filter option. 
    tagsArray.forEach((tag) => {
        document.querySelectorAll(".filter__option").forEach((li) => {
            if (tag.title.includes(li.textContent)) {
                li.classList.remove("filter__option");
                li.classList.add("active__filter");
            }
        });
    });
};
    
/**
 * Handles the logic for when a tag is clicked.
 * @param {HTMLElement} tag - The clicked tag element
 * @param {Object[]} data - An array of recipe objects
 * @param {Object[]} tagsArray - An array of tag objects
*/
const handleTagClick = (tag, data, tagsArray) => {
    const dataTitle = tag.textContent;
    const dataColor = tag.getAttribute("data-color");
    const tagObject = { title: dataTitle, color: dataColor };
    if (!tagsArray.some(tag => tag.title === tagObject.title)) {
        tagsArray.push(tagObject);
        showListOfTags(tagsArray, data);
   
        tagsArray.forEach((tag) => {
            data = getMatchingRecipes(data, tag.title);
        });
    
        handleFilterReload(data);
        displayRecipeCards(data);
        handleFilterOption(data, tagsArray);
    }
};
    
/**
 * Listens to click events on filter tags and calls the handleTagClick function.
 * @param {Object[]} data - An array of recipe objects
 * @param {HTMLElement[]} tagList - An array of tag elements
*/
export const listenToFilter = (data, tagList) => {
    allRecipes.push(data);
    tagList.forEach((tag) => {
        tag.addEventListener("click", () => handleTagClick(tag, data, tagsArray));
    });
};

/** 
 * Update the list of tags displayed in the UI.
 * @param {Array} arrayOfTags - The array of tags to display.
 * @param {Array} data - The recipe data.
*/
export const showListOfTags = function (arrayOfTags, data) {
    let tag_HTML = "";
    
    arrayOfTags.forEach((tag, index) => {
        tag_HTML += 
        `<span class="tags__item tags__item--${tag.color}">
            <span  class="tags__name">${tag.title}</span>
            <span id="${index}" class="tags__close">
               <img src="./assets/image/remove-icon.png" alt=""/>
            </span>
        </span>`;
    });
    document.querySelector(".tags").innerHTML = tag_HTML;
    listenToTags(data);
};