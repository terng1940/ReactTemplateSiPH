import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';
import RoutePaths from './routePaths';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication/Register')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication/ForgotPassword')));
const AuthResetPassword = Loadable(lazy(() => import('views/pages/authentication/authentication/ResetPassword')));
const AuthCheckMail = Loadable(lazy(() => import('views/pages/authentication/authentication/CheckMail')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: RoutePaths.login,
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        },
        {
            path: RoutePaths.resetPassword,
            element: <AuthResetPassword />
        },
        {
            path: '/check-mail',
            element: <AuthCheckMail />
        }
    ]
};

export default LoginRoutes;
