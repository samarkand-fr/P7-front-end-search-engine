import { capitalize } from "../utils.js";

// CARDS COMPONENT
export const displayRecipeCards = (recipes) => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    // Display message when no recipes are found
    if (recipes.length === 0) {
        const noRecipesMsg = document.createElement("div");
        noRecipesMsg.className = "cards__no-recipes";
        noRecipesMsg.innerHTML = "<p class=\"cards__no-recipes-text\">Aucune recette ne correspond à votre critère… </p>";
        cards.appendChild(noRecipesMsg);
    } else {
    // Remove message when recipes are found
        const noRecipesMsg = document.querySelector(".cards__no-recipes");
        if (noRecipesMsg) {
            noRecipesMsg.remove();
        }

        // Display recipe cards
        // creating a Document Fragment to store recipe cards that will be dynamically added to the web page.
        const fragment = document.createDocumentFragment();
        recipes.forEach((recipe) => {
            const { name, time, description, ingredients } = recipe;

            const listCard_HTML = ingredients
                .map((elt) => {
                    const { ingredient, quantity, unit } = elt;
                    return `<li class="card__ingredient">
                      <span class="card__ingredient--bold">${ingredient ? capitalize(ingredient).trim() : ""}</span>
                      ${quantity ? quantity.toString().trim() : ""} ${unit ? unit.toLowerCase().trim() : ""}
                    </li>`;
                })
                .join("");

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

            const card = document.createRange().createContextualFragment(card_HTML);
            fragment.appendChild(card);
        });
        cards.appendChild(fragment);
    }
};


