import {Formik, FormikHelpers, Form} from 'formik';
import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import {Button} from '../ui/StyledButton';
import {Context} from '..';
import {Flex} from '../ui/StyledFlex';
import {FormikInput} from '../ui/StyledInput';

const ComponentWrapper = styled(Flex)`
    align-items: center;
    margin: auto;
    width: 50%;
`;

const FormInner = styled(Flex)`
    width: 360px;
`;

type LoginFormT = {email: string; password: string};

const LoginForm = () => {
    const {authStore} = useContext(Context);
    const [loginForm, setLoginForm] = useState(true);

    const submit = async (values: LoginFormT, {setSubmitting}: FormikHelpers<LoginFormT>) => {
        if (loginForm) {
            await authStore.login(values.email, values.password);
        } else {
            await authStore.registration(values.email, values.password);
        }

        setSubmitting(false);
    };

    return (
        <ComponentWrapper column gap="16px">
            <h1>{`${loginForm ? 'Login' : 'Registration'}`}</h1>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={submit}
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
                                {`${loginForm ? 'Login' : 'Registration'}`}
                            </Button>
                            <Button outline width="100%" onClick={() => setLoginForm(!loginForm)} type="button">
                                {`Go to ${loginForm ? 'registration' : 'login'}`}
                            </Button>
                        </FormInner>
                    </Form>
                )}
            </Formik>
        </ComponentWrapper>
    );
};

export default LoginForm;
