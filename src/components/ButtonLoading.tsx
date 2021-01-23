import styled from 'styled-components';

import Button, { Props } from './styled/Button';
import Spinner from './styled/Spinner';

const ThisButton = styled(Button)`
    padding: 1.75rem 0.875rem;
    width: 100%;
    display: block;
`;

const ButtonLoading: React.FC<Props> = (props) => (
    <ThisButton {...props}>
        <Spinner color="#fff" />
    </ThisButton>
);

export default ButtonLoading;
