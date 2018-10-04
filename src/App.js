import React, { Component } from 'react';
import Axios from './Axios.js';
import classes from './App.css';
import PairList from './Component/PairList/PairList';
import EmptyList from './Component/EmptyList/EmptyList.js';
import HeaderPair from './Component/HeaderPair/HeaderPair.js';


class App extends Component {

  state = {
    currencies_input: "",
    selected_pairs: null,
    currencies_pair: null,
    loading: true,
    error: false,
    cekPair: '',
    more_currency: true
  }

  componentDidMount = () => {
    this.fetchingCurrency()
  }

  fetchingCurrency = () => {
    Axios.get("?base=USD")
      .then(response => {
        let data = response.data.rates;
        const news_currencies = Object.keys(data).sort().map(key => {
          return { pair: key, rate: data[key] }
        });

        const news_selected = [
          { pair: "CAD", rate: data.CAD },
          { pair: "IDR", rate: data.IDR },
          { pair: "GBP", rate: data.GBP },
          { pair: "CHF", rate: data.CHF },
          { pair: "SGD", rate: data.SGD },
          { pair: "INR", rate: data.INR },
          { pair: "MYR", rate: data.MYR },
          { pair: "JPY", rate: data.JPY },
          { pair: "KRW", rate: data.KRW }
        ]
        this.setState({
          selected_pairs: news_selected,
          currencies_pair: news_currencies,
          loading: false
        })
      })
      .catch(e => {
        this.setState({
          error: true,
          loading: false
        })
      });
  }

  currenciesTimes = (e) => {
    let numTimes = e.target.value;
    if (!e.target.validity.valid){
      e.preventDefault();
    }
    else {
      this.setState({
        currencies_input: numTimes
      })
    }
    
  }

  timeOutPair = () => {
    setTimeout( () => {
      this.setState({
        cekPair: ''
      })
    },1000)
  }

  addPair = () => {
    let pairVal = this.firstname.value;
    let pairText = this.firstname[pairVal].text;
    let pair = this.state.selected_pairs.map(data=>data.pair).includes(pairText);

    if (pair) {
      this.setState({
        cekPair: 'Pair is already exist'
      });
      this.timeOutPair()
    }
    else {
      let selectedPair = this.state.currencies_pair[pairVal];
      let newPair = [...this.state.selected_pairs];
      newPair.unshift(selectedPair);
      this.setState({
        selected_pairs: newPair,
        cekPair: '',
        more_currency : true
      })
    }
  }

  removePair = (pair) => {
    let indexPair = this.state.selected_pairs.map(data => data.pair).indexOf(pair);
    let newsPair = [...this.state.selected_pairs];
    newsPair.splice(indexPair,1);
    this.setState({
      selected_pairs: [...newsPair]
    })
  }

  showMoreCurrency = () => {
    this.setState({
      more_currency : false
    })
  }


  render() {
    const { 
      selected_pairs, 
      currencies_pair,
      currencies_input,
      error,
      loading,
      cekPair,
      more_currency
    } = this.state;
    
    let currVal, currPair, existPair  = null;

    if(cekPair) {
      existPair = (
        <div className={classes.already_added}>{cekPair}</div>
      )
    }

    if(loading){
      currVal = (
        <EmptyList messege= "Loading..."/>
      )
    }
    else if(error) {
      currVal = (
        <EmptyList messege= "Terjadi Kesalahan Dalam Memuat Data !__!"/>
      )
    }
    else{

      if(selected_pairs.length <= 0){
        currVal =(
          <EmptyList messege= "Please choose Currency Pair"/>
        )
      }
      else {
        currVal = (
          <div>
            {existPair}
            <ul className={classes.currencies_value}>
              {
                selected_pairs.map((data, index) => {
                  return (
                    <PairList 
                      key = {index}
                      pairname = {data.pair}
                      pairrate = {data.rate}
                      basepair = {currencies_input}
                      removepair = {this.removePair}
                    />
                  )
                })
              }
            </ul>
          </div>
        )
      }


      if(more_currency) {
        currPair = (
          <div className={classes.panel_pair}>
            <p className={classes.add_more} onClick={this.showMoreCurrency}>(+) Add More Currency</p>
          </div>
        )
      }
      else {
        currPair = (
          <div className={classes.panel_pair}>
            <div className={classes.other_pair}>
            <select className={classes.select_pair} name="" id="" ref={(input) => { this.firstname = input }}>
              {
                currencies_pair.map((data, index) => {
                  return <option key={index} value={index} name={data.pair}>{data.pair}</option>
                })
              }
            </select>
            </div>
            <div className={classes.btn_add}>
              <button className={classes.add_icon} onClick={this.addPair}>Add</button>
            </div>
          </div>
        ) 
      }
      
    }


    return (
      <div>
        <HeaderPair 
          nominal = {`${this.state.currencies_input}`} 
          typechange = {this.currenciesTimes}
        />

        {currVal}
        {currPair}

      </div>
    );
  }
}

export default App;
