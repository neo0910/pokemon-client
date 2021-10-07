import {observer} from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';

import {Context} from '.';
import {Flex} from './ui/StyledFlex';
import Content from './components/Content';
import LoginForm from './components/LoginForm';

function App() {
    const {authStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authStore.checkAuth();
        }
    }, [authStore]);

    return (
        <Flex column align="center" gap="42px">
            {typeof authStore.user.isActivated !== 'undefined' && !authStore.user.isActivated && (
                <h2 style={{textAlign: 'center'}}>User not activated</h2>
            )}
            {authStore.isAuth ? <Content /> : <LoginForm />}
        </Flex>
    );
}

export default observer(App);
