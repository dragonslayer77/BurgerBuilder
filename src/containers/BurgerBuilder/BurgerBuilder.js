import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //this.setState({ loading: true });
        //const order = {
          //  ingredients: this.state.ingredients,
            //price: this.state.totalPrice,
            //customer: {
              //  name: 'Isabella',
                //street: 'Campo Pequeno',
              //  country: 'Portugal'
            //},
            //delivery: true,
          //  pickup: false
        //}
        //axios.post('/orders.json', order)
            //.then(response => {
              //  this.setState({ loading: false, purchasing: false });
            //})
            //.catch(err => {
              //  this.setState({ loading: false, purchasing: false });
            //})

            const queryParams =  [];
            for  (let  i in this.state.ingredients) {
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/checkout',
                search:'?' + queryString
            });

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
            purchasing,
            loading,
            error } = this.state;
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
                    {error ? <p>No Ingredients ;(</p> : null}
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {(loading || this.state.ingredients === null) ?
                        <Spinner /> :
                        <OrderSummary
                            price={totalPrice}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            ingredients={ingredients} />}
                </Modal>
                {ingredients ?
                    <Auxilliary>
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
                    : <Spinner />}
            </Auxilliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);