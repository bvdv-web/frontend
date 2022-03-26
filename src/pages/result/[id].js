// @mui
import {styled} from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections

import {DB, useFirestore} from '../../contexts/FirebaseContext';
import {
    HomeHero,
    HomeMinimal,
    HomeDarkMode,
    HomeLookingFor,
    HomeColorPresets,
    HomePricingPlans,
    HomeAdvertisement,
    HomeCleanInterfaces,
    HomeHugePackElements,
} from '../../sections/home';
import {collection, doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ResultPage from "../../sections/bvdv/ResultPage";
import {Container} from "@mui/material";
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
    const {query} = useRouter();
    const {id} = query;


    return (
        <Page title="BVDV Online Simulation">
            <RootStyle>
                <Container sx={{
                    textAlign: 'left',
                }}>
                    <ResultPage id={id}/>
                </Container>
            </RootStyle>
        </Page>
    );
}
