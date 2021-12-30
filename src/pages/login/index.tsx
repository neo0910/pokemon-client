import {FormikHelpers} from 'formik';
import {useNavigate} from 'react-router-dom';
import React, {useCallback} from 'react';
import styled from 'styled-components';

import {authApi} from '../../services/AuthService';
import {Flex} from '../../ui/StyledFlex';
import LoginOrRegistrationForm, {LoginOrRegistrationFormT} from '../../components/LoginOrRegistrationForm';

const LoginWrapper = styled(Flex)`
    align-items: center;
    margin: auto;
    width: 50%;
`;

const Login = () => {
    const navigate = useNavigate();
    const [login] = authApi.useLoginMutation();

    const submit = useCallback(
        async (values: LoginOrRegistrationFormT, {setSubmitting}: FormikHelpers<LoginOrRegistrationFormT>) => {
            try {
                await login(values).unwrap();
                setSubmitting(false);
                navigate('/pokedex');
            } catch (e: any) {
                console.dir(`Error on login: ${e.message}`);
            }
        },
        [login, navigate]
    );

    return (
        <LoginWrapper column gap="16px">
            <h1>Login</h1>
            <LoginOrRegistrationForm submitCallback={submit} type="login" />
        </LoginWrapper>
    );
};

export default Login;
