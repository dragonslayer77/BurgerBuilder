import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    updatePurchaseStatus = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseStatus(updatedIngredients);
    }

    subtractIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseStatus(updatedIngredients);
    }

    render() {
        const {
            ingredients,
            totalPrice,
            purchasable,
            purchasing } = this.state;
        const {
            addIngredientHandler,
            subtractIngredientHandler,
            purchaseHandler,
            purchaseCancelHandler,
            purchaseContinueHandler } = this;
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Auxilliary>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    <OrderSummary
                        price={totalPrice}
                        purchaseCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinueHandler}
                        ingredients={ingredients} />
                </Modal>
                <Burger ingredients={ingredients} />
                <BuildControls
                    addIngred={addIngredientHandler}
                    subIngred={subtractIngredientHandler}
                    disabled={disableInfo}
                    ordered={purchaseHandler}
                    price={totalPrice}
                    purchasable={purchasable}
                />
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;