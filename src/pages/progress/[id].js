// @mui
import {styled} from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections


import {useRouter} from "next/router";
import {Container} from "@mui/material";
import ProgressPage from "../../sections/bvdv/ProgressPage";

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

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page) {
    return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
    const {query} = useRouter();
    const {id} = query;


    return (
        <Page title="BVDV Online Simulation">
            <RootStyle>
                <Container sx={{
                    textAlign: 'left',
                }}>
                    <ProgressPage id={id}/>
                </Container>
            </RootStyle>
        </Page>
    );
}
