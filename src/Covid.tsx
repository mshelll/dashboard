import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export const covidRequest = {
    method: 'GET',
    url: 'https://coronavirus-smartable.p.rapidapi.com/stats/v1/IN/',
    params : {},
    headers: {
      'X-RapidAPI-Key': 'ebc213ac00mshcdbcf4e4c60518bp195c0cjsn751c7380510c',
      'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com'
    }
};

export class Covid {

    totalConfirmed: string
    totalRecovered: string
    totalDeaths: string

    constructor() {
      this.totalConfirmed = ''
      this.totalRecovered = ''
      this.totalDeaths = ''
    }
}

export const fetchCovid = (response: any): Covid => {

    const data = new Covid();

    // console.log("Inside fetchCovid")
    // console.log(response.data.stats);
    data.totalConfirmed = response.data.stats.totalConfirmedCases;
    data.totalDeaths = response.data.stats.totalDeaths;
    data.totalRecovered = response.data.stats.totalRecoveredCases;
    console.log(data);
    return data;

}

interface Props {
    covid: Covid,
}

export const CovidCard = (props: Props) => {

    const {covid} = props;

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
                    COVID-CASES
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Confirmed</Typography>
                    <Typography sx={{color:"blue"}}>
                         {covid.totalConfirmed}
                    </Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Recovered</Typography>
                    <Typography sx={{color:"green"}}>
                         {covid.totalRecovered}
                    </Typography>
                 </Typography>
                 <Typography display='flex' justifyContent='space-between' marginBottom={3}>
                    <Typography>Deaths</Typography>
                    <Typography sx={{color:"red"}}>
                         {covid.totalDeaths}
                    </Typography>
                 </Typography>
            </CardContent>
        </Card>
    )
}