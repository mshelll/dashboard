import React, { useEffect } from 'react';
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

interface Score  {
  team: string,
  runs: string,
  overs: string,
  wickets: string,
}

interface Game {
  status: string,
  venue: string,
  score1: Score,
  score2: Score,
}


class Score {

  team: string
  runs: string
  overs: string
  wickets: string

  constructor() {
    this.team = ''
    this.runs = '0'
    this.overs = '0'
    this.wickets = '0'
  }
}

class Game {
  status: string
  venue: string
  score1: Score
  score2: Score

  constructor() {
    this.status = ''
    this.venue = ''
    this.score1 = new Score
    this.score2 = new Score
  }
}


function App() {

  const [game, setGame] = React.useState(new Game)

  const fetchScore = () => {

    let cur_game = new Game

    const API_ENDPT = 'https://api.cricapi.com/v1/currentMatches?apikey=27bc8116-3ed7-4902-82d4-29ada2df17c1'
    axios.get(API_ENDPT).then((response) => {
  
      for (var match in response.data.data) {
        const  obj = response.data.data[match]
  
        if (obj['name'].includes('India')) {
          console.log(obj)
          cur_game.venue = obj['venue']
          cur_game.status = obj['status']

          let team1 = obj['teamInfo'][0]
          cur_game.score1.team = team1['shortname']

          let team2 = obj['teamInfo'][1]
          cur_game.score2.team = team2['shortname']

          if (obj['score'].length > 0) {
  
            let score1 = obj['score'][0]
            cur_game.score1.runs = score1['r'].toLocaleString()
            cur_game.score1.overs = score1['o'].toLocaleString()
            cur_game.score1.wickets = score1['w'].toLocaleString()

          }

          if (obj['score'].length > 1) {

            let score2 = obj['score'][1]
            cur_game.score2.runs = score2['r'].toLocaleString()
            cur_game.score2.overs = score2['o'].toLocaleString()
            cur_game.score2.wickets = score2['w'].toLocaleString()

          }
          console.log(cur_game)
          break
        }
      }
      setGame(cur_game)
    })
  }

  useEffect(() => {
    fetchScore()
  }, [])

  return (
    <div className="App">
      <ScoreCard
       game={game}
      />
    </div>
  );
}

interface Props {
  game: Game,
}

const ScoreCard = (props: Props
) => {

  const {game} = props

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
          {game.venue}
        </Typography>
        <Typography sx={score_style}>
          <Typography>{game.score1.team}</Typography>
          <Typography>{game.score1.runs}/{game.score1.wickets}({game.score1.overs})</Typography>
        </Typography>
        <Typography sx={score_style}>
          <Typography>{game.score2.team}</Typography>
          <Typography>{game.score2.runs}/{game.score2.wickets}({game.score2.overs})</Typography>
        </Typography>
        <Typography sx={status_style}>
          {game.status}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default App;
