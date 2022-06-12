import React from 'react';
import logo from './logo.svg';
import './App.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { minHeight } from '@mui/system';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { red } from '@mui/material/colors';


function App() {
  return (
    <div className="App">
      <ScoreCard></ScoreCard>
    </div>
  );
}


function ScoreCard() {

  const card_style = {
    bgcolor: 'red',
    padding: 2,
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

  }
  
  const header_style = {
    bgcolor: 'green',
    display: 'flex',
    margin: 2,
  }
  
  const status_style = {
    bgcolor: 'blue',
    display: 'flex',
    margin: 2,
  }

  const score_style = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 2,
  }

  return(
    <Card 
      sx={card_style}>
      <CardContent>
        <Typography sx={header_style}>
          LIVE:2nd Test:Bangalore
        </Typography>
        <Typography sx={score_style}>
          <Typography>Team1</Typography>
          <Typography>Score1</Typography>
        </Typography>
        <Typography sx={score_style}>
          <Typography>Team2</Typography>
          <Typography>Score2</Typography>
        </Typography>
        <Typography sx={status_style}>
          Status
        </Typography>
      </CardContent>
    </Card>
  )
}

export default App;
