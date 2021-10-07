import React, {FC, memo} from 'react';
import styled from 'styled-components';

type OptionsT = {
    title?: string;
    width?: string;
};

type PropsType = {
    children: any;
    options?: OptionsT;
    setVisible: (visible: boolean) => void;
    visible: boolean;
};

const Mask = styled.div`
    background-color: rgba(0, 0, 0, 0.25);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
`;

const ModalWrapper = styled.div<{width?: string}>`
    background-color: #fff;
    border-radius: 4px;
    left: 50%;
    position: absolute;
    top: 10%;
    transform: translateX(-50%);

    width: ${({width}) => width || '500px'};
`;

const ModalHeader = styled.div`
    font-size: 18px;
    font-weight: 600;
    padding: 16px;
`;

const ModalBody = styled.div`
    padding: 16px;
`;

const Modal: FC<PropsType> = ({visible, setVisible, children, options = {} as OptionsT}) => {
    return visible ? (
        <Mask onClick={() => setVisible(false)}>
            <ModalWrapper width={options?.width} onClick={(e) => e.stopPropagation()}>
                <ModalHeader>{options?.title || 'Modal'}</ModalHeader>
                <ModalBody>{children}</ModalBody>
            </ModalWrapper>
        </Mask>
    ) : (
        <></>
    );
};

export default memo(Modal);
