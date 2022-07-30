import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import axios from 'axios';

export class Score {

  team: string
  flag: string
  runs: string
  overs: string
  wickets: string

  constructor() {
    this.team = ''
    this.flag = ''
    this.runs = '0'
    this.overs = '0'
    this.wickets = '0'
  }
}

export class Game {
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

export const fetchScore = (response: any): Game => {

      const cur_game = new Game

      console.log(cur_game.score2)
  
      for (var match in response.data.data) {
        const  obj = response.data.data[match]
  
        if (obj['name'].includes('India')) {
          console.log(obj)
          cur_game.venue = obj['venue']
          cur_game.status = obj['status']

          let team1 = obj['teamInfo'][0]
          cur_game.score1.team = team1['shortname']
          cur_game.score1.flag = team1['img']

          let team2 = obj['teamInfo'][1]
          cur_game.score2.team = team2['shortname']
          cur_game.score2.flag = team2['img']

          const team1Index = obj['score'].length > 2 ? 2 : 0

          let score1 = obj['score'][team1Index]
          cur_game.score1.runs = score1['r'].toLocaleString()
          cur_game.score1.overs = score1['o'].toLocaleString()
          cur_game.score1.wickets = score1['w'].toLocaleString()

          const team2Index = obj['score'].length > 3 ? 3 : 1

          let score2 = obj['score'][team2Index] || null
          if (score2) {
            cur_game.score2.runs = score2['r'].toLocaleString()
            cur_game.score2.overs = score2['o'].toLocaleString()
            cur_game.score2.wickets = score2['w'].toLocaleString()
          }
          return cur_game
        }
      }

    return cur_game
}


interface Props {
    game: Game,
}
  
export const ScoreCard = (props: Props
  ) => {
  
    const {game} = props
  
    const card_style = {
      display: 'flex',
      minWidth: 200,
      minHeight: 200,
      flexDirection: 'column',
      border: 2,
    }
    
    const header_style = {
    }
    
    const status_style = {
      marginTop: 2,
    }
  
    const score_style = {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: 0,
      marginTop: 2,
    }
  
    return(
      <Card 
        sx={card_style}>
        <CardContent>
          <Typography sx={header_style}>
            {game.venue}
          </Typography>
          <Typography sx={score_style}>
            <Typography> <img width={20} height={20} src={game.score1.flag}></img>{game.score1.team}</Typography>
            <Typography>{game.score1.runs}/{game.score1.wickets}({game.score1.overs})</Typography>
          </Typography>
          <Typography sx={score_style}>
            <Typography><img  width={20} height={20} src={game.score2.flag}></img>{game.score2.team}</Typography>
            <Typography>{game.score2.runs}/{game.score2.wickets}({game.score2.overs})</Typography>
          </Typography>
          <Typography sx={status_style}>
            {game.status}
          </Typography>
        </CardContent>
      </Card>
    )
}
