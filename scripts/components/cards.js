import { capitalize } from "../utils.js";

/**
 * Renders recipe cards on the web page.
 * @param {Array} recipes - An array of recipe objects to be displayed.
 */
export const displayRecipeCards = (recipes) => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    // Display a message when no recipes are found.
    if (recipes.length === 0) {
        const noRecipesMsg = document.createElement("div");
        noRecipesMsg.className = "cards__no-recipes";
        noRecipesMsg.innerHTML = "<p class=\"cards__no-recipes-text\">Aucune recette ne correspond à votre critère… </p>";
        cards.appendChild(noRecipesMsg);
    } else {
        // Remove the message when recipes are found.
        const noRecipesMsg = document.querySelector(".cards__no-recipes");
        if (noRecipesMsg) {
            noRecipesMsg.remove();
        }

        // Create a document fragment to hold the recipe cards before inserting them into the web page.
        const fragment = document.createDocumentFragment();

        // Loop through each recipe and create a card for it.
        recipes.forEach((recipe) => {
            const { name, time, description, ingredients } = recipe;

            // Create the list of ingredients for the card.
            const listCard_HTML = ingredients
                .map((elt) => {
                    const { ingredient, quantity, unit } = elt;
                    return `<li class="card__ingredient">
                      <span class="card__ingredient--bold">${ingredient ? capitalize(ingredient).trim() : ""}</span>
                      ${quantity ? quantity.toString().trim() : ""} ${unit ? unit.toLowerCase().trim() : ""}
                    </li>`;
                })
                .join("");

            // Create the HTML for the card.
            const card_HTML = `<article class="card">
                            <a href="#">
                              <div class="card__snapshot"></div>
                              <div class="card__body">
                                <div class="card__head">
                                  <h2 class="card__title">${capitalize(name.trim())}</h2>
                                  <div class="card__time">
                                    <i class="card__clock"></i>
                                    <p class="card__minutes">${time.toString().trim()} min</p>
                                  </div>
                                </div>
                                <div class="card__content">
                                  <ul class="card__ingredients">${listCard_HTML}</ul>
                                  <p class="card__description">${description.trim()}</p>
                                </div>
                              </div>
                            </a>
                          </article>`;

            // Create a new DOM element from the HTML code.
            const card = document.createRange().createContextualFragment(card_HTML);

            // Add the card to the document fragment.
            fragment.appendChild(card);
        });

        // Insert the cards into the web page.
        cards.appendChild(fragment);
    }
};
