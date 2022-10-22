import React, { useEffect } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';

import axios from 'axios';

import {ScoreCards, fetchScore, Game,} from './Score'
import { nifty50Req, next50Req, IndexCard, Stock,  } from './Stock';
import { covidRequest, CovidCard, Covid, fetchCovid } from './Covid';
import { cryptoRequest, CryptoCard, Crypto, fetchCrypto } from './Crypto';
import { Typography } from '@mui/material';

const useSemiPersistentState = (key: string, defaultValue: any) => {


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

  const [cur_stock, setStock] = useSemiPersistentState('stock', new Stock())

  const [covid, setCovid] = useSemiPersistentState('covid', new Covid())

  const [crypto, setCrypto] =  useSemiPersistentState('crypto', new Crypto())

  const handleScore = () => {

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
      //console.log(response)
      const cur_games = fetchScore(response)
      setGames(cur_games)
    })
  }

  const handleNifty50 = () => {

    axios.request(nifty50Req).then(function (response) {
      //console.log(response.data);
      for (var index in response.data) {
        let item = response.data[index];
        if(item.symbol == "NIFTY 50") {
          cur_stock.nifty50 = item.lastPrice;
          cur_stock.nifty50Up = +item.lastPrice > +item.Open;
          break;
        }
      }

      setStock(cur_stock);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const handleNiftyNext50 = () => {

    axios.request(next50Req).then(function (response) {
      //console.log(response.data);
      for (var index in response.data) {
        let item = response.data[index];
        if(item.symbol == "NIFTY NEXT 50") {
          cur_stock.niftyNext50 = item.lastPrice;
          cur_stock.niftyNext50Up = +item.lastPrice > +item.Open;
          break;
        }
      }
      setStock(cur_stock);
    }).catch(function (error) {
      console.error(error);
    });
  }

  const handleCovid = () => {

    axios.request(covidRequest).then(function (response) {
      // console.log("Inside covid response")
      // console.log(response.data);
      const covid = fetchCovid(response)
      setCovid(covid)
    }).catch(function (error) {
      console.error(error);
    });
  }
  
  const handleCrypto = () => {

    axios.request(cryptoRequest).then(function (response) {
      console.log("Inside crypto")
      console.log(response.data);
      const crypto = fetchCrypto(response)
      setCrypto(crypto)
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    handleScore()
    handleNifty50()
    handleNiftyNext50()
    handleCrypto()
    handleCovid()
  }, [])

  const header_style = {
    color: "blue",
    fontSize: 50,
    margin: 10,
  }

  const grid_style = {
    direction: "row",
    justifyContent: "space-around",
    alignItems: "center",
    spacing: 30,
    margin: 20,
    marginLeft: 30,
    maxWidth: "70%",
    minHeight: "80%",
  }

  return (
    <div className="App">
      <Typography sx={header_style}>
        INDIA-DASHBOARD
      </Typography>
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
      <CovidCard
        covid={covid}
      />
      <CryptoCard
        crypto={crypto}
      />
      </Grid>
    </div>
  );
}

export default App;
