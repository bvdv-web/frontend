import {styled} from '@mui/material/styles';
import Page from "../../components/Page";
import Layout from "../../layouts";
import {Button, Container, Input} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "../../utils/axios";
import moment from 'moment';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    height: '100%',
    paddingTop: 88,
    marginBottom: 100
}));


const LineStyle = styled('div')(() => ({
    marginTop: 10,
    // marginLeft: 50
}));


const HeadStyle = styled('div')(() => ({
    fontWeight: 'bold',
    marginTop: 50
}));

const SessionStyle = styled('div')(() => ({
    margin: 'auto',
    borderRadius: 3,
    color: '#80C480',
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: 4,
    padding: '15px 40px',
}));

const TimeStyle = styled('div')(() => ({
    color: '#80C480',
}));

const ResultStyle = styled('div')(() => ({
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
    marginBottom: 30,
    background: '#f7f7f7',
    border: '1px solid #80C480',
    borderRadius: 3,
    color: '#80C480',
    letterSpacing: 4,
    padding: '15px 40px',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
    }
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
    const [results, setResults] = useState([]);


    useEffect(async () => {
        const response = await axios.get(`/bvdv`, {});
        setResults(response.data);
        // setTotalAnimalsLabel([...Array(response.data?.results?.length).keys()].map(v => TIME_INTERVAL[v % 26]));
        // setTotalAnimalsData(response.data?.results);
        // setPtResult(response.data);
    }, [])

    return (
        <Page title="BVDV Online Simulation">
            <RootStyle>
                <Container sx={{
                    textAlign: 'left',
                }}>
                    <HeadStyle>
                        Recent simulations:
                    </HeadStyle>
                    {
                        results.map(result => (<LineStyle>
                            <ResultStyle>
                                <a style={{textDecoration: 'none'}} href={'/result/' + result.sessionId} target={'_blank'}>
                                    <SessionStyle>{result.sessionId}</SessionStyle>
                                    <TimeStyle>{moment(result.createdAt).format("HH:mm DD/MM/YYYY")}</TimeStyle>
                                </a>
                            </ResultStyle>
                        </LineStyle>))
                    }

                </Container>
            </RootStyle>
        </Page>
    );
}
