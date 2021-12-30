import {useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {authApi} from '../services/AuthService';
import {useTypedSelector} from '../hooks';

const PrivateRoute = ({children}: any): JSX.Element => {
    const location = useLocation();
    const {currentUser} = useTypedSelector((s) => s.auth);
    const [trigger] = authApi.useLazyCheckAuthQuery();

    useEffect(() => {
        if (localStorage.getItem('token') && !currentUser) {
            trigger();
        }
    }, [currentUser, trigger]);

    return localStorage.getItem('token') ? children : <Navigate to="/login" state={{from: location}} replace />;
};

export default PrivateRoute;
