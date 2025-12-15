import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import ApiPaths from 'utils/constants/apiPath';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            // try {
            //     const serviceToken = localStorage.getItem('serviceToken');
            //     if (serviceToken && verifyToken(serviceToken)) {
            //         setSession(serviceToken);
            //         const response = await axios.get(`${ApiPaths.verifyToken}?token=${serviceToken}`);
            //         const user = response.data.data;
            //         dispatch({
            //             type: LOGIN,
            //             payload: { user }
            //         });
            //     } else {
            //         dispatch({ type: LOGOUT });
            //     }
            // } catch (err) {
            //     console.error(err);
            //     dispatch({ type: LOGOUT });
            // }
            const token = localStorage.getItem('serviceToken');

            if (!token) {
                dispatch({ type: LOGOUT });
                return;
            }

            if (verifyToken(token)) {
                setSession(token);
                const res = await axios.get(`${ApiPaths.verifyToken}?token=${serviceToken}`);
                dispatch({ type: LOGIN, payload: { user: res.data.data } });
                return;
            }

            // token หมด → ลอง refresh
            try {
                const refreshRes = await axios.post(`${ApiPaths.refreshToken}?token=${serviceToken}`);
                const newToken = refreshRes.data.data.token;

                setSession(newToken);
                const res = await axios.get(`${ApiPaths.verifyToken}?token=${serviceToken}`);

                dispatch({ type: LOGIN, payload: { user: res.data.data } });
            } catch {
                dispatch({ type: LOGOUT });
            }
        };

        init();
    }, []);

    const login = async (username, password) => {
        const response = await axios.post(ApiPaths.login, { username, password });
        const serviceToken = response.data.data.token;
        const user = response.data.data;
        console.log('LOGIN SUCCESS', user);
        setSession(serviceToken);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (email, password, firstName, lastName) => {
        // todo: this flow need to be recode as it not verified
        const id = chance.bb_pin();
        const response = await axios.post('/api/account/register', {
            id,
            email,
            password,
            firstName,
            lastName
        });
        let users = response.data;

        if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
            const localUsers = window.localStorage.getItem('users');
            users = [
                ...JSON.parse(localUsers),
                {
                    id,
                    email,
                    password,
                    name: `${firstName} ${lastName}`
                }
            ];
        }

        window.localStorage.setItem('users', JSON.stringify(users));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (email) => {
        console.log(email);
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
