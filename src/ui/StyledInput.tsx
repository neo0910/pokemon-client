import {FC} from 'react';
import {useField} from 'formik';
import styled from 'styled-components';

const InputWrapper = styled.div`
    width: 100%;
`;

type InputProps = {
    label?: string;
    placeholder?: string;
};

const StyledInput = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    label {
        cursor: pointer;
        font-weight: 600;
        margin-bottom: 8px;
    }

    input {
        border: 1px solid gray;
        border-radius: 3px;
        height: 32px;
        outline: transparent;
        text-indent: 4px;
        width: 100%;
    }
`;

const InputError = styled.div`
    color: red;
    margin-top: 4px;
`;

const Input = (props: React.InputHTMLAttributes<HTMLInputElement> & InputProps) => {
    return (
        <StyledInput>
            <label htmlFor={props.id || props.name}>{props.label}</label>
            <input id={props.id || props.name} {...props} />
        </StyledInput>
    );
};

const FormikInput: FC<Record<string, unknown>> = (props) => {
    const [field, meta] = useField(props as any);

    return (
        <InputWrapper>
            <Input {...field} {...props} />
            {meta.touched && meta.error ? <InputError>{meta.error}</InputError> : null}
        </InputWrapper>
    );
};

export {Input, FormikInput};
