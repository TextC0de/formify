import Link from 'next/link';

import Button from '@src/components/styled/Button';
import Container from '@src/components/styled/Container';

import { Buttons, Logo, Wrapper } from './styles';

type Props = {
    onSaveClick: () => void;
    onPublishClick: () => void;
};

const EditFormHeader: React.FC<Props> = ({ onSaveClick, onPublishClick }) => {
    const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSaveClick();
    };

    const handlePublishClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onPublishClick();
    };

    return (
        <Wrapper>
            <Container>
                <Link href="/admin" passHref>
                    <Logo>{'<'} Volver</Logo>
                </Link>
                <Buttons>
                    <Button onClick={handleSaveClick} outline size="sm">
                        Guardar borrador
                    </Button>
                    <span style={{ margin: '0 0.5rem' }}>o</span>
                    <Button onClick={handlePublishClick} size="sm">
                        Guardar y publicar
                    </Button>
                </Buttons>
            </Container>
        </Wrapper>
    );
};

export default EditFormHeader;
