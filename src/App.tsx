import React from 'react';
import styled from 'styled-components';

import {authApi} from './services/AuthService';
import {Button} from './ui/StyledButton';
import {Flex} from './ui/StyledFlex';
import {Outlet} from 'react-router-dom';
import {useTypedSelector} from './hooks';
import AddPokemon from './components/AddPokemon';
import AddType from './components/AddType';

const Header = styled(Flex)`
    padding: 24px 16px;
`;

const Body = styled(Flex)`
    padding: 0 16px;
`;

function App() {
    const {currentUser} = useTypedSelector((s) => s.auth);

    const [logout] = authApi.useLogoutMutation();

    const headerContent = (isActivated: boolean): JSX.Element => {
        const variableContent = isActivated ? (
            <>
                <AddPokemon />
                <AddType />
            </>
        ) : (
            <h2 style={{textAlign: 'center'}}>User not activated</h2>
        );

        return (
            <>
                {variableContent}
                <Button primary onClick={() => logout()} style={{marginLeft: 'auto'}}>
                    Logout
                </Button>
            </>
        );
    };

    return (
        <Flex column align="center" gap="42px">
            <Header align="center" visible={!!currentUser} width="100%">
                {currentUser !== null && headerContent(currentUser.isActivated)}
            </Header>
            <Body justify="flex-start">
                <Outlet />
            </Body>
        </Flex>
    );
}

export default App;
