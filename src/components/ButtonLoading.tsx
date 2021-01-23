import styled from 'styled-components';

import Button, { Props } from './styled/Button';
import Spinner from './styled/Spinner';

const ThisButton = styled(Button)`
    padding: 0.375rem;
    width: 100%;
    display: block;

    span {
        display: inline-block;

        &::before {
            margin-left: -8px;
        }
    }
`;

const ButtonLoading: React.FC<Props> = (props) => (
    <ThisButton {...props}>
        <Spinner color="#fff" />
    </ThisButton>
);

export default ButtonLoading;
