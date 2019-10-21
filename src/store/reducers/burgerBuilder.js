import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    const { type, ingredientName } = action;
    switch (type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {
                [ingredientName]: state.ingredients[ingredientName] + 1
            }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName]
            }
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {
                [ingredientName]: state.ingredients[ingredientName] - 1
            }
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName]
            }
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
}

export default reducer;