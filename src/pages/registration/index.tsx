import {FormikHelpers} from 'formik';
import React, {useCallback} from 'react';
import styled from 'styled-components';

import {authApi} from '../../services/AuthService';
import {Flex} from '../../ui/StyledFlex';
import {useNavigate} from 'react-router-dom';
import LoginOrRegistrationForm, {LoginOrRegistrationFormT} from '../../components/LoginOrRegistrationForm';

const RegistrationWrapper = styled(Flex)`
    align-items: center;
    margin: auto;
    width: 50%;
`;

const Registration = () => {
    const navigate = useNavigate();
    const [registration] = authApi.useRegistrationMutation();

    const submit = useCallback(
        async (values: LoginOrRegistrationFormT, {setSubmitting}: FormikHelpers<LoginOrRegistrationFormT>) => {
            try {
                await registration(values).unwrap();
                setSubmitting(false);
                navigate('/pokedex');
            } catch (e: any) {}
        },
        [registration, navigate]
    );

    return (
        <RegistrationWrapper column gap="16px">
            <h1>Registration</h1>
            <LoginOrRegistrationForm submitCallback={submit} type="registration" />
        </RegistrationWrapper>
    );
};

export default Registration;
