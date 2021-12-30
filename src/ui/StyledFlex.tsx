import styled, {css} from 'styled-components';

type FlexProps = {
    align?: string;
    column?: boolean;
    gap?: string;
    justify?: string;
    visible?: boolean;
    width?: string;
    wrap?: string;
};

const Flex = styled.div<FlexProps>`
    align-items: ${({align}) => align || 'flex-start'};
    flex-direction: ${({column}) => (column ? 'column' : 'row')};
    display: ${({visible}) => (visible === false ? 'none' : 'flex')};
    flex-wrap: ${({wrap}) => wrap || 'wrap'};
    justify-content: ${({justify}) => justify || 'space-between'};
    width: ${({width}) => width};

    ${({gap, column}) =>
        css`
            & > *:not(:last-child) {
                margin-${column ? 'bottom' : 'right'}: ${gap || '8px'};
            }
        `}
`;

export {Flex};
