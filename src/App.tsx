import React, { useEffect } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';

import axios from 'axios';

import {ScoreCard, fetchScore, Game,} from './Score'
import { IndexCard, Stock,  } from './Stock';

function App() {


  const [game, setGame] = React.useState(new Game)

  const [stock, setStock] = React.useState(new Stock)

  const handleScore = () => {

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
      const cur_game = fetchScore(response)
      setGame(cur_game)
    })
  }

  // const handleSnP = () => {
  //   const options = {
  //     method: "GET",
  //     url: 'https://financialmodelingprep.com/api/v3/quote/%5EGSPC?apikey=3a062116ba88c0674c0a4edc028fddf2',
  //   };
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
  // }

  let cur_stock = new Stock();

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
        if(item.symbol == 'NIFTY 50') {
          cur_stock.nifty50 = item.lastPrice;
          break;
        }
      }
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
        if(item.symbol == 'NIFTY NEXT 50') {
          cur_stock.niftyNext50 = item.lastPrice;
          break;
        }
      }
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
      <ScoreCard
       game={game}
      />
      <IndexCard
      stock={stock}
      />
      </Grid>
    </div>
  );
}

export default App;
