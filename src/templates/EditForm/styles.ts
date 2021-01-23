import styled from 'styled-components';

import Button from '@src/components/styled/Button';

export const Wrapper = styled.div`
    ${Button} {
        margin-top: 1rem;
    }
`;

export const Content = styled.main`
    padding: 6rem 0;
`;

export const Field = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 720px) {
        flex-direction: column;
    }
`;

export const FieldHeader = styled.div`
    display: flex;

    svg {
        cursor: pointer;
    }

    svg:hover {
        filter: invert(23%) sepia(91%) saturate(6858%) hue-rotate(3deg)
            brightness(97%) contrast(103%);
    }
`;

export const EditableView = styled.div`
    flex: 0 50%;
    padding: 0 1.5rem 0 0;

    @media (max-width: 720px) {
        padding: 0;
        flex: 0 100%;
        width: 100%;
        margin-bottom: 1rem;
    }
`;

export const PreviewView = styled.div`
    border-left: 2px solid #777;
    flex: 0 50%;
    padding: 0 0 0 1.5rem;

    @media (max-width: 720px) {
        padding: 0;
        flex: 0 100%;
        border: 0;
    }
`;

export const FieldDivider = styled.span`
    width: 100%;
    margin: 5rem 0;
    height: 2px;
    background: rgba(0, 0, 0, 0.5);
    display: block;
`;

export const AddField = styled.div`
    width: 100%;
    height: 2px;
    background: rgba(0, 0, 0, 0.1);
    margin: 3rem 0;
    position: relative;

    svg {
        padding: 0.125rem;
        border: 1px solid rgba(0, 0, 0, 0.25);
        background: #fff;
        position: absolute;
        top: -1rem;
        left: calc(50% - 1rem);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        transition: 0.3s;

        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
`;
