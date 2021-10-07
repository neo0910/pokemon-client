import styled, {css} from 'styled-components';

type FlexProps = {
    align?: string;
    column?: boolean;
    gap?: string;
    justify?: string;
    width?: string;
};

const Flex = styled.div<FlexProps>`
    display: flex;

    align-items: ${({align}) => align || 'flex-start'};
    flex-direction: ${({column}) => (column ? 'column' : 'row')};
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
