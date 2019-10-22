import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/burgerBuilder';
import { purchaseInit } from '../../store/actions/order';
import { setAuthRedirect } from '../../store/actions/auth';

import axios from '../../axios-orders';
import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');

    }

    updatePurchaseStatus = () => {
        const sum = Object.keys(this.props.ings)
            .map(igKey => {
                return this.props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }


    render() {
        const { purchasing } = this.state;
        const {
            ings,
            onAddIngredient,
            onRemoveIngredient,
            price,
            error,
            isAuthenticated
        } = this.props;
        const {
            purchaseHandler,
            purchaseCancelHandler,
            purchaseContinueHandler,
            updatePurchaseStatus } = this;
        const disableInfo = {
            ...ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Auxilliary>
                {error ? <p>No Ingredients ;(</p> : null}
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {(ings === null) ?
                        <Spinner /> :
                        <OrderSummary
                            price={price}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            ingredients={ings} />}
                </Modal>
                {ings ?
                    <Auxilliary>
                        <Burger ingredients={ings} />
                        <BuildControls
                            addIngred={onAddIngredient}
                            subIngred={onRemoveIngredient}
                            disabled={disableInfo}
                            ordered={purchaseHandler}
                            price={price}
                            purchasable={updatePurchaseStatus()}
                            isAuth={isAuthenticated}
                        />
                    </Auxilliary>
                    : <Spinner />}
            </Auxilliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        purchased: state.order.purchased,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch(addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onPurchaseInit: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));