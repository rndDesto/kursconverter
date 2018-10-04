import React from 'react';
// import PropTypes from 'prop-types';
import classes from './HeaderPair.css';

const HeaderPair = (props) => {
  return (
    <div className={classes.ovh}>
        <h1 className={classes.input_logo}>USD Calculator</h1>
        <div className={classes.input_box}>
        <input 
            className={classes.currency_input}
            type="text"
            pattern="[0-9]*"
            value={props.nominal}
            placeholder="how much you want to trade?"
            onChange={props.typechange}
        />
        </div>
    </div>
  )
}
// HeaderPair.propTypes = {
//     pairrate : PropTypes.number
// }
export default HeaderPair;
