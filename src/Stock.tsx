
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


export const nifty50Req = {
    method: "GET",
    url: 'https://latest-stock-price.p.rapidapi.com/price',
    params: {Indices: 'NIFTY 50'},
    headers: {
      "X-RapidAPI-Key": "ebc213ac00mshcdbcf4e4c60518bp195c0cjsn751c7380510c",
      "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
    },
};

export const next50Req = {
    method: "GET",
    url: 'https://latest-stock-price.p.rapidapi.com/price',
    params: {Indices: 'NIFTY NEXT 50'},
    headers: {
      "X-RapidAPI-Key": "ebc213ac00mshcdbcf4e4c60518bp195c0cjsn751c7380510c",
      "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
    },
};

export class Stock {
    nifty50: string
    nifty50Up: boolean
    niftyNext50: string
    niftyNext50Up: boolean
    sensex: string

    constructor() {
        this.nifty50 = ''
        this.nifty50Up = true
        this.niftyNext50 = ''
        this.niftyNext50Up = true
        this.sensex = ''
    }
}

interface Props {
    stock: Stock,
}

export const IndexCard = (props: Props)  => {

    const {stock} = props;

    const card_style = {
        display: 'flex',
        minWidth: 200,
        minHeight: 220,
        flexDirection: 'column',
        border: 2,
        margin: 2,
    }

    const header_style = {
        display: 'flex',
        justifyContent: 'center',
    }

    return(
        <Card sx={card_style}>
            <CardContent>
                <Typography display='flex' justifyContent='center' marginBottom={4}>
                    STOCK-INDEX
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>NIFTY50</Typography>
                    <Typography sx={{color:stock.nifty50Up ? "green" : "red"}}>
                        {stock.nifty50Up ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        {stock.nifty50}
                    </Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>NEXT50</Typography>
                    <Typography sx={{color:stock.niftyNext50Up ? "green" : "red"}}>
                        {stock.niftyNext50Up? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        {stock.niftyNext50}
                    </Typography>
                 </Typography>
            </CardContent>
        </Card>
    )
 }
