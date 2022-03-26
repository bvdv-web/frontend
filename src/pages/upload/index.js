import {styled} from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {Container} from '@mui/material';
import UploadPage from "../../sections/bvdv/UploadPage";

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
    return (
        <Page title="BVDV Online Simulation">
            <RootStyle>
                <Container sx={{
                    textAlign: 'left',
                }}>
                    <UploadPage/>
                </Container>
            </RootStyle>
        </Page>
    );
}
