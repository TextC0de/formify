import Link from 'next/link';

import IconAdd from '@src/components/icons/IconAdd';
import { MyFormsQueryData } from '@src/graphql/query/myForms.query';
import { splitToChunksWithLength } from '@src/utils/common';

import {
    AddItem,
    AddItemText,
    EditFields,
    Item,
    ItemTitle,
    List,
    Row,
    SeeSubmissions
} from './styles';

type Props = {
    forms: MyFormsQueryData['getMyForms'];
};

const FormsList: React.FC<Props> = ({ forms }) => {
    const first3Forms = forms.slice(0, 3);
    const restOfForms = forms.slice(3, forms.length);

    return (
        <List>
            <Row>
                <Link href="/admin/new" passHref>
                    <AddItem>
                        <IconAdd />
                        <AddItemText>Crear un nuevo formulario</AddItemText>
                    </AddItem>
                </Link>
                {first3Forms.map((form) => (
                    <Link
                        href={`/admin/${form.isLive ? 'submissions' : 'edit'}/${
                            form._id
                        }`}
                        passHref
                        key={form._id}
                    >
                        <Item>
                            <ItemTitle>{form.title}</ItemTitle>
                            {form.isLive ? (
                                <SeeSubmissions>Ver respuestas</SeeSubmissions>
                            ) : (
                                <EditFields>Editar preguntas</EditFields>
                            )}
                        </Item>
                    </Link>
                ))}
            </Row>
            {splitToChunksWithLength(restOfForms, 4).map((chunk, i) => (
                <Row key={i.toString()}>
                    {chunk.map((form) => (
                        <Link
                            href={`/admin/${
                                form.isLive ? 'submissions' : 'edit'
                            }/${form._id}`}
                            passHref
                            key={form._id}
                        >
                            <Item>
                                <ItemTitle>{form.title}</ItemTitle>
                                {form.isLive ? (
                                    <SeeSubmissions>
                                        Ver respuestas
                                    </SeeSubmissions>
                                ) : (
                                    <EditFields>Editar preguntas</EditFields>
                                )}
                            </Item>
                        </Link>
                    ))}
                </Row>
            ))}
        </List>
    );
};

export default FormsList;
