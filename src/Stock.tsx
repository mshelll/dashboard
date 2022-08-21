
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export class Stock {
    nifty50: string
    nifty50Up: boolean
    nifty50Color: string
    niftyNext50: string
    niftyNext50Color: string
    sensex: string

    constructor() {
        this.nifty50 = ''
        this.nifty50Up = true
        this.nifty50Color = "green"
        this.niftyNext50 = ''
        this.niftyNext50Color = "green"
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
    }

    const header_style = {
        display: 'flex',
        justifyContent: 'center',
    }

    return(
        <Card sx={card_style}>
            <CardContent>
                <Typography display='flex' justifyContent='center' marginBottom={4}>
                    INDEX
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>NIFTY50</Typography>
                    <Typography sx={{color:stock.nifty50Color}}>{stock.nifty50}</Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>NEXT50</Typography>
                    <Typography sx={{color:stock.niftyNext50Color}}>{stock.niftyNext50}</Typography>
                 </Typography>
            </CardContent>
        </Card>
    )
 }
