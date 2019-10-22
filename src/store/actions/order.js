import * as actionType from './actionTypes';
import axios from '../../axios-orders';


export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

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

export const purchaseBurgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerLoad());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionType.FETCH_ORDERS_INIT
    };
};

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        })
    }
}