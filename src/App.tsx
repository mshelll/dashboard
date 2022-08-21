import React, { useEffect } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';

import axios from 'axios';

import {ScoreCards, fetchScore, Game,} from './Score'
import { IndexCard, Stock,  } from './Stock';

const useSemiPersistentState = (key: string, defaultValue: Stock) => {

  console.log(JSON.stringify(defaultValue))


  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

function App() {


  const [games, setGames] = React.useState(new Array<Game>)

  // const [nifty50, setNifty50] = React.useState("")
  // const [next50, setNext50] = React.useState("")

  const [cur_stock, setStock] = useSemiPersistentState('stock', new Stock())

  const handleScore = () => {

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
      //console.log(response)
      const cur_games = fetchScore(response)
      setGames(cur_games)
    })
  }

  const handleNifty50 = () => {
    const options = {
      method: "GET",
      url: 'https://latest-stock-price.p.rapidapi.com/price',
      params: {Indices: 'NIFTY 50'},
      headers: {
        "X-RapidAPI-Key": "ebc213ac00mshcdbcf4e4c60518bp195c0cjsn751c7380510c",
        "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
      },
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      for (var index in response.data) {
        let item = response.data[index];
        if(item.symbol == "NIFTY 50") {
          //console.log("Found nifty 50")
          cur_stock.nifty50 = item.lastPrice;
          cur_stock.nifty50Color = +item.lastPrice > +item.Open ? "green" : "red"
          break;
        }
      }

      //console.log("NIFTY 50", cur_stock)
      setStock(cur_stock);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const handleNiftyNext50 = () => {
    
    const options = {
      method: "GET",
      url: 'https://latest-stock-price.p.rapidapi.com/price',
      params: {Indices: 'NIFTY NEXT 50'},
      headers: {
        "X-RapidAPI-Key": "ebc213ac00mshcdbcf4e4c60518bp195c0cjsn751c7380510c",
        "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
      },
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      for (var index in response.data) {
        let item = response.data[index];
        if(item.symbol == "NIFTY NEXT 50") {
          //console.log("Found next 50")
          cur_stock.niftyNext50 = item.lastPrice;
          cur_stock.niftyNext50Color = +item.lastPrice > +item.Open ? "green" : "red"
          break;
        }
      }
      //console.log("NEXT 50", cur_stock)
      setStock(cur_stock);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    handleScore()
    handleNifty50()
    handleNiftyNext50()
    // handleSnP()
  }, [])


  const grid_style = {
    direction: "row",
    justifyContent: "space-around",
    alignItems: "space-around",
    spacing: 2,
    marginTop: 10,
  }

  return (
    <div className="App">
      <Grid
       container
       sx={grid_style}
       className="container"
      >
      <ScoreCards
       games={games}
      />
      <IndexCard
        stock={cur_stock}
      />
      </Grid>
    </div>
  );
}

export default App;
