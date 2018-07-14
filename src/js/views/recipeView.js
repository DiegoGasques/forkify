import {elements} from './base';
import {Fraction} from 'fractional';

export function clearRecipe() {
    elements.recipe.innerHTML = '';
};

export function updateServingsIngredients(recipe) {
    // Update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // Update Ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
}

export function renderRecipe(recipe, isLiked) {
    elements.recipe.insertAdjacentHTML('afterbegin', createRecipeTemplate(recipe, isLiked));
};

function createRecipeTemplate(recipe, isLiked) {
    return `
    <figure class="recipe__fig">
        <img src="${recipe.image}" alt="Tomato" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${createIngredientsList(recipe.ingredients)}
        </ul>
        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>                
        </button>
    </div>
    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
    </div>
    `;
};

function createIngredientsList(ingredients) {

    let ingredientsArray = Array.from(ingredients);
    return ingredientsArray.reduce((acc, ingredient) => {
        return `
            ${acc}
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${formatCount(ingredient.count)}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${ingredient.unit}</span>
                    ${ingredient.ingredient}
                </div>
            </li>
        `;
    }, '');
};

function formatCount(count) {

    if(count) {
        const [inte, dec] = count.toString().split('.').map(el => parseInt(el));

        if(!dec) return count;

        if(inte === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(count - inte);
            return `${inte} ${fr.numerator}/${fr.denominator}`;
        }
    }

    return '?';
}