// routes
import {PATH_AUTH, PATH_DOCS, PATH_PAGE} from '../../routes/paths';
// components
import {PATH_AFTER_LOGIN} from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
    width: 22,
    height: 22,
};

const menuConfig = (isAuthenticated = false) => {
    let menu = [
        {
            title: 'Home',
            icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
            path: '/',
        },
        {
            title: 'Run Simulation',
            icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
            path: PATH_PAGE.upload,
        },
        {
            title: 'Result Search',
            icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
            path: PATH_PAGE.result,
        },
        isAuthenticated ? {
            title: 'My simulations',
            icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
            path: PATH_PAGE.results,
        } : {
            title: 'Login',
            icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
            path: PATH_PAGE.login,
        }
    ];

    if (isAuthenticated) {
        menu.push({
            title: 'My account',
            icon: <Iconify icon={'eva:book-open-fill'} {...ICON_SIZE} />,
            path: PATH_PAGE.myAccount,
        })
    }
    return menu;
}

export default menuConfig;
