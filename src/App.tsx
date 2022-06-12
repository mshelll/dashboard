import React from 'react';
import logo from './logo.svg';
import './App.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function App() {
  return (
    <div className="App">
      <ScoreCard></ScoreCard>
    </div>
  );
}


function ScoreCard() {
  return(
    <Card sx={{maxWidth: 50}}>Score</Card>
  )
}

export default App;
