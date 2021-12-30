import {Form, Formik, FormikHelpers} from 'formik';
import {useNavigate} from 'react-router-dom';
import React, {FC, memo, useMemo} from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import {Button} from '../ui/StyledButton';
import {Flex} from '../ui/StyledFlex';
import {FormikInput} from '../ui/StyledInput';

const FormInner = styled(Flex)`
    width: 360px;
`;

export type LoginOrRegistrationFormT = {
    email: string;
    password: string;
};

type PropsType = {
    submitCallback: (values: LoginOrRegistrationFormT, helpers: FormikHelpers<LoginOrRegistrationFormT>) => void;
    type: 'login' | 'registration';
};

const LoginOrRegistrationForm: FC<PropsType> = ({submitCallback, type}) => {
    const navigate = useNavigate();

    const getDestination = useMemo(() => (type === 'login' ? 'registration' : 'login'), [type]);

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={submitCallback}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            })}
        >
            {({isSubmitting}) => (
                <Form>
                    <FormInner align="center" column gap="24px">
                        <FormikInput type="email" name="email" placeholder="any@email.com" label="Email" />
                        <FormikInput type="password" name="password" placeholder="password" label="Password" />
                        <Button primary type="submit" isLoading={isSubmitting} width="100%">
                            {`${type === 'login' ? 'Login' : 'Registration'}`}
                        </Button>
                        <Button outline width="100%" onClick={() => navigate(`/${getDestination}`)} type="button">
                            {`Go to ${getDestination}`}
                        </Button>
                    </FormInner>
                </Form>
            )}
        </Formik>
    );
};

export default memo(LoginOrRegistrationForm);
