import * as actionType from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: order
    }
}

export const purchaseBurgerFail = (err) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: err
    }
}

export const purchaseBurgerLoad = () => {
    return {
        type: actionType.PURCHASE_BURGER_LOAD
    }
}

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerLoad());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    }
}