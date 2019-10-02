import React from 'react';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxilliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" marginBottom="32px" />
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Auxilliary>
    );
};

export default sideDrawer;