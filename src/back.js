import React, { Component } from 'react';
import InputComponent from './Component/InputComponent/InputComponent';
import Axios from './Axios.js';


class App extends Component {

  state = {
    currencies:[],
    currencies_input: 1,
    pair : ["AUD","CAD","CHF","EUR","GBP","IDR","JPY","USD"],
    choose_pair : '',
    currenciespair: null

    // currency_rates:null,
    // currency_pair: null
  }

  

  componentDidMount = () => {
    this.fetchingCurrency()
  }

  fetchingCurrency = () => {
    Axios.get("?base=USD")
    // .then( response => {
    //   Object.keys(response.data.rates).sort().map(key => {
    //     console.log(key)
    //     this.setState({
    //       currency_rates : response.data.rates[key],
    //       currency_pair : key
    //     })
    //   })
    // })
    .then( response => {
      let data = response.data.rates;
      // let b = [];
      // let x = null
      const pairs = Object.keys(data).sort().map(key => key);
      const rates = Object.keys(data).sort().map(key => data[key]);

      this.setState({
        currenciespair: {pair:pairs,rate:rates}
      })
    })

    // .then( response => {
      
    //     this.setState({
    //       currency_pair: response.data
    //     })
      
    // })

  }


  selectCurrentHandler = (e) => {
    let pair = e.target.value;
    let pairs= null;
    // console.log(Object.keys(this.state.currencies.rates).sort().map( key => key).filter(key => key === pair)) 
  }

  inputCurrenciesHandler = () => {
    let pair_input = this.firstname.value;
    let pair = this.state.currenciespair.pair.includes(pair_input);

    if(pair){
      console.log("ada")
    }
    else{
      let newPair = [...this.state.currenciespair.pair, pair_input];
      this.setState({
        currenciespair: {pair:newPair}
      })
    }
  }

  removePair = (pair) => {
    let pairs = this.state.currenciespair.pair;
    let removePair = pairs.filter( data => data !== pair );
    let newPair = [...removePair]
    // console.log([...pairs])

    // console.log(pair)

    this.setState({
      currenciespair: {pair:newPair}
    })
  }
  



  render() {   
  
  // const pair = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR",]  
  const {currencies,currencies_input,currenciespair} = this.state;
  let currVal = <p>Loading</p>;
  let currPair = <p>Loading Currencies</p>
  let pairs = null;


  if(currenciespair){
    pairs = (
      currenciespair.pair.map((data,index) => {
        return <p key={index} onClick={this.removePair.bind(this, data)}>{data}</p>
      })
    )
  }
  

    
    // // fetch currencies rates to component
    // if(this.state.currencies.rates) {
    //   currVal = (
    //     <div>
    //       {
    //         Object.keys(this.state.currencies.rates).sort().map( (key, index) => {
    //           return (
    //             <p key = {index}>{this.state.currencies.rates[key]}</p>
    //           )
    //         })
    //       }
    //     </div>
    //   )
    // }

    // // fetch currencies name to component
    // if(this.state.currencies.rates) {
    //   currPair = (
    //     <select>
    //       {
    //         Object.keys(this.state.currencies.rates).sort().map( (key, index) => {
    //           return (
    //             <option key = {index}>{key}</option>
    //           )
    //         })
    //       }
    //     </select>
    //   )
    // }



    // fetch currencies name to component
    // if(currencies.rates) {
    //   currVal = (
    //     <React.Fragment>
    //       {
    //         Object.keys(currencies.rates).sort().map( (key, index) => {
    //           return (
    //             <p key = {`${key}_${index}`}>{`${key} - ${currencies_input * currencies.rates[key].toFixed(4)}`}</p>
    //           )
    //         })
    //       }
    //       {
    //       // console.log(  Object.keys(currencies.rates).sort().map( (key, index) => key ).indexOf("CAD"))
    //       }
    //     </React.Fragment>
    //   )
    //   currPair = (
    //     <select name="currency_pair" onChange={this.selectCurrentHandler}>
    //       {
    //         Object.keys(currencies.rates).sort().map( (key, index) => {
    //           return (
    //             <option key = {`${key}_${index}`} value={key}>{key}</option>
    //           )
    //         })
    //       }
    //     </select>
    //   )
    // }
    


    return (
      
      <div>
        {/* <input type="text" ref={ (input) => {this.firstname = input} }/> */}
        <button onClick={this.inputCurrenciesHandler}>Add</button>
        <select name="" id="" ref={ (input) => {this.firstname = input} }>
          <option value="CAD">CAD</option>
          <option value="BHS">BHS</option>
        </select>
        
        {currPair}

        {currVal}
        {pairs}
      </div>
    );
  }
}

export default App;
