import styled from 'styled-components';

const Input = styled.input`
    padding: 0.875rem 1.6rem;
    display: block;
    margin-top: 0.375rem;
    font-size: 0.875rem;
    width: 100%;
    background: ${({ disabled }) => (disabled ? '#f0f0f0' : '#fff')};
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.9);

    &::placeholder {
        color: rgba(0, 0, 0, 0.4);
    }

    &[type='checkbox'],
    &[type='radio'] {
        display: inline-block;
        border: 0;
        border-radius: 0;
        margin: 0 0.2rem 0 0;
    }
`;

export default Input;
