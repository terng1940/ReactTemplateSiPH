import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const { isLoggedIn, isInitialized } = useAuth();
    console.log('AuthGuard', { isInitialized, isLoggedIn });
    if (!isInitialized) {
        return null;
    }
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
