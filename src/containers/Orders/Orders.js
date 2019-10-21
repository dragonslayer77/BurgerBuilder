import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/order';

class Orders extends Component {
    componentDidMount () {
        this.props.onfetchOrders();
    }
    render () {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = <div>
            {this.props.orders.map(order => (
                <Order 
                key={order.id} 
                meat={order.ingredients.meat}
                bacon={order.ingredients.bacon}
                salad={order.ingredients.salad}
                cheese={order.ingredients.cheese}
                price={order.price}/>
            ))}
        </div>
        }
        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders: () => dispatch(fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
