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

import axios from 'axios';
import { type } from 'os';


function App() {

  const [score, setScore] = React.useState({
    venue: 'NA',
    status: 'NA',
  })

  let fetchScore = () => {

    let cur_score = {
      venue: 'NA',
      status: 'NA',
    }

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
  
      for (var match in response.data.data) {
        const  obj = response.data.data[match]
  
        if (obj['name'].includes('India')) {
          console.log(obj['venue'], obj['status'])
          cur_score.venue = obj['venue']
          cur_score.status = obj['status']
        }
      }
    })
    
    setScore(cur_score)
  }

  //fetchScore()

  return (
    <div className="App">
      <ScoreCard
       score={score}
      >
      </ScoreCard>
    </div>
  );
}





const ScoreCard = ({score}: any,
) => {


  const card_style = {
    bgcolor: 'red',
    // padding: 2,
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',

  }
  
  const header_style = {
    bgcolor: 'green',
    display: 'flex',
    // margin: 2,
  }
  
  const status_style = {
    bgcolor: 'blue',
    display: 'flex',
    // margin: 2,
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
          {score.venue}
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
          {score.status}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default App;
