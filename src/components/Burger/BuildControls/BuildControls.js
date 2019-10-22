import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            subtracted={() => props.subIngred(ctrl.type)}
            added={() => props.addIngred(ctrl.type)} 
            disabled={props.disabled[ctrl.type]} />
        ))}
        <button 
        onClick={props.ordered}
        disabled={!props.purchasable}
        className={classes.OrderButton}>{ props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}</button>
    </div>
);

export default buildControls;