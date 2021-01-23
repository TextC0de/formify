import styled from 'styled-components';

export const Wrapper = styled.div`
    position: flex;
    flex-direction: column-reverse;

    input {
        &:focus,
        &:active {
            & + label {
                font-size: 0.5rem;
            }
        }
    }
`;

export const Input = styled.input`
    font-size: 1.5rem;
    width: 100%;
    padding: 0.375rem 0rem;
    border: 0;
    border-bottom: 2px solid #333;
    background: #fff;
    transition: 0.3s ease-in-out;
    position: relative;
    display: block;
`;
