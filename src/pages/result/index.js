import {styled} from '@mui/material/styles';
import Page from "../../components/Page";
import Layout from "../../layouts";
import {Button, Container, Input} from "@mui/material";
import {useState} from "react";
import axios from "../../utils/axios";
import { useRouter } from 'next/router';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
    height: '100%',
    paddingTop: 88,
}));

const ContentStyle = styled('div')(({theme}) => ({
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.default,
}));

const InlineStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '10%',
    padding: 10
}));

const LineStyle = styled('div')(() => ({
    marginTop: 100,
    // marginLeft: 50
}));

const InlineLabelStyle = styled('div')(() => ({
    display: 'inline-block',
    width: '30%',
    padding: 10,
    marginLeft: 50,
    textAlign: 'right'
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
    const [sessionId, setSessionId] = useState('');
    const router = useRouter();

    const redirect = async () => {
        if (sessionId) router.push(`/result/${sessionId}`);
    }

    return (
        <Page title="BVDV Online Simulation">
            <RootStyle>
                <Container sx={{
                    textAlign: 'left',
                }}>
                    <LineStyle>
                        <InlineLabelStyle>Session id:</InlineLabelStyle>

                        <InlineStyle style={{width: '35%'}}><Input fullWidth={true} value={sessionId}
                                                                   onChange={e => setSessionId(e.currentTarget.value)}/></InlineStyle>

                        <InlineStyle>
                            <Button type={"submit"} onClick={redirect}>Find result</Button>
                        </InlineStyle>
                    </LineStyle>

                </Container>
            </RootStyle>
        </Page>
    );
}
