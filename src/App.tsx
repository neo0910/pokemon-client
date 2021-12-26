import React, {useEffect} from 'react';

import {checkAuth} from './store/authSlice';
import {Flex} from './ui/StyledFlex';
import {useTypedDispatch, useTypedSelector} from './hooks';
import Content from './components/Content';
import LoginForm from './components/LoginForm';

function App() {
    const dispatch = useTypedDispatch();

    const {user, isAuth} = useTypedSelector((s) => ({user: s.auth.user, isAuth: s.auth.isAuth}));

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [dispatch]);

    return (
        <Flex column align="center" gap="42px">
            {typeof user.isActivated !== 'undefined' && !user.isActivated && (
                <h2 style={{textAlign: 'center'}}>User not activated</h2>
            )}
            {isAuth ? <Content /> : <LoginForm />}
        </Flex>
    );
}

export default App;
