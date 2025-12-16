import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';
import RoutePaths from './routePaths';

// dashboard routing
const DefaultTheme = Loadable(lazy(() => import('views/pages/menu-mc/Default_Theme/index')));
const McRegister = Loadable(lazy(() => import('views/pages/menu-mc/Mc_Register/index')));
const McAllData = Loadable(lazy(() => import('views/pages/menu-mc/MC_All_Data/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        // {
        //     path: RoutePaths.menuDefault,
        //     element: <DefaultTheme />
        // },
        {
            path: RoutePaths.menuAllData,
            element: <McAllData />
        },
        {
            path: RoutePaths.menudRegister,
            element: <McRegister />
        }
    ]
};

export default MainRoutes;
