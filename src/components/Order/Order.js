import React from 'react';
import classes from './Order.css';

const order = (props) => (
    <div className={classes.Order}>
        <div>Ingredients: 
            <p className={classes.Ingredients}>Salad ({props.salad})</p>
            <p className={classes.Ingredients}>Bacon ({props.bacon})</p>
            <p className={classes.Ingredients}>Cheese ({props.cheese})</p>
            <p className={classes.Ingredients}>Meat ({props.meat})</p>
        </div>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}$</strong></p>
    </div>
);


export default order;