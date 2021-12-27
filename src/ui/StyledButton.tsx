import React, {FC} from 'react';
import styled, {css} from 'styled-components';

type ButtonProps = {
    readonly isLoading?: boolean;
    readonly outline?: boolean;
    readonly primary?: boolean;
    readonly visible?: boolean;
    readonly width?: string;
};

const StyledButton = styled.button<ButtonProps>`
    align-items: center;
    border-radius: 3px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    justify-content: center;
    padding: 0 8px;
    position: relative;
    transition: all 0.25s ease;

    display: ${({visible}) => (visible === false ? 'none' : 'flex')};
    width: ${({width}) => width};

    ${({primary}) =>
        primary &&
        css`
            background-color: #000;
            color: #fff;
        `}

    ${({outline}) =>
        outline &&
        css`
            background-color: #fff;
            border: 1px solid #000;
            color: #000;
        `}

    ${({isLoading}) =>
        isLoading &&
        css`
            opacity: 0.75;
        `}

    &:hover, &:focus {
        box-shadow: none !important;
        opacity: 0.75;
        outline: none;
    }
`;

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = ({isLoading, ...props}) => (
    <StyledButton disabled={isLoading} {...props}>
        {props.children}
    </StyledButton>
);

export {Button};
