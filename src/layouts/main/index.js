import PropTypes from 'prop-types';
// next
import {useRouter} from 'next/router';
// @mui
import {Box, Link, Container, Typography, Stack} from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function MainLayout({children}) {
    const {pathname} = useRouter();

    const isHome = pathname === '/';

    return (
        <Stack sx={{minHeight: 1}}>
            <MainHeader/>

            {children}

            <Box sx={{flexGrow: 1}}/>

            <MainFooter/>
        </Stack>
    );
}
