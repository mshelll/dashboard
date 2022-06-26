import React, { useEffect } from 'react';
import './App.css';

import Grid from '@mui/material/Grid';

import axios from 'axios';

import {ScoreCard, fetchScore, Game,} from './Score'

function App() {


  const [game, setGame] = React.useState(new Game)

  const handleScore = () => {

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
      const cur_game = fetchScore(response)
      setGame(cur_game)
    })
  }

  useEffect(() => {
    handleScore()
  }, [])


  const grid_style = {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    spacing: 2,
    border: 1,
    margin: 2,
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
      </Grid>
    </div>
  );
}

export default App;
