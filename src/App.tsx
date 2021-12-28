import React, {useEffect} from 'react';

import {authApi} from './services/AuthService';
import {Flex} from './ui/StyledFlex';
import {useTypedSelector} from './hooks';
import Content from './components/Content';
import LoginForm from './components/LoginForm';

function App() {
    const {user, isAuth} = useTypedSelector((s) => ({user: s.auth.user, isAuth: s.auth.isAuth}));
    const [trigger] = authApi.useLazyCheckAuthQuery();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            trigger();
        }
    }, [trigger]);

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
