import React, { Component } from 'react';
import classes from './PairList.css';

export class PairList extends Component {

  box = (commma) => {
    commma[0] = commma[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    commma.join(".");
    return commma;
  }
  
  render() {
    let pairName = this.props.pairname;
    let pairRate = this.props.pairrate.toFixed(4);
    let pair = parseFloat(pairRate*this.props.basepair).toFixed(4);
    // let pair = 12345.6789;
    
    let pairTimes = pair.toString().split(".");
    let pairStatic = pairRate.toString().split(".");
    let timesRates = this.box(pairTimes);
    let basesRates = this.box(pairStatic);

    return (
      <li className={classes.flex_row}>
        <div className={classes.pair_list}>
          <p className={classes.base_pair}>{pairName} <span className={classes.times_pair}>{`${timesRates}`}</span></p>
          <p className={classes.note_pair}>{`1 USD = ${pairName} ${basesRates}`}</p>
        </div>

        <div 
          className={classes.remove_pair}
          onClick={this.props.removepair.bind(this,pairName)}>
          <div className={classes.delete_icon}>-</div>  
        </div>
      </li>
    )
  }
}

export default PairList;



