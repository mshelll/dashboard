import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';


export const cryptoRequest = {
    method: 'GET',
    url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=bitcoin%2Cethereum%2Csolana&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    params : {},
    headers: {
    }
};


/*
There is scope to abstract out all data with value and its trend
*/
export class Crypto {
    bitcoin: string
    bitcoinUp: boolean
    ethereum: string
    ethereumUp: boolean
    solana: string
    solanaUp: boolean

    constructor() {
        this.bitcoin = ''
        this.bitcoinUp = true
        this.ethereum = ''
        this.ethereumUp = true
        this.solana = ''
        this.solanaUp = true
    }
}

export const fetchCrypto = (response: any): Crypto => {

    const data = new Crypto();

    // console.log("Inside fetchCrypto")
    // console.log(response.data);
    for (var match in response.data) {
        const  obj = response.data[match]
        console.log(obj)
        if (obj['id'] == 'bitcoin') {
            data.bitcoin =  obj['current_price']
            data.bitcoinUp = obj['price_change_percentage_24h'] > 0
        }
        if (obj['id'] == 'ethereum') {
            data.ethereum =  obj['current_price']
            data.ethereumUp = obj['price_change_percentage_24h'] > 0
        }
        if (obj['id'] == 'solana') {
            data.solana =  obj['current_price']
            data.solanaUp = obj['price_change_percentage_24h'] > 0
        }
    }
    console.log(data);
    return data;

}

interface Props {
    crypto: Crypto,
}

export const CryptoCard = (props: Props) => {

    const {crypto} = props;

    const card_style = {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 200,
        minHeight: 220,
        flexDirection: 'column',
        border: 2,
        margin: 2,
    }

    return(
        <Card sx={card_style}>
            <CardContent>
                <Typography display='flex' justifyContent='center' marginBottom={4}>
                    CRYPTO-COINS
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Bitcoin</Typography>
                    <Typography sx={{color:crypto.bitcoinUp ? "green" : "red"}}>
                        {crypto.bitcoinUp ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        {crypto.bitcoin}
                    </Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Ethereum</Typography>
                    <Typography sx={{color:crypto.ethereumUp ? "green" : "red"}}>
                        {crypto.ethereumUp ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        {crypto.ethereum}
                    </Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Solana</Typography>
                    <Typography sx={{color:crypto.solanaUp ? "green" : "red"}}>
                        {crypto.solanaUp ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        {crypto.solana}
                    </Typography>
                 </Typography>
            </CardContent>
        </Card>
    )
}