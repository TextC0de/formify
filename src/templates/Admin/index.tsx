import { useQuery } from 'urql';

import Header from '@src/components/common/Header';
import ViewLoading from '@src/components/common/ViewLoading';
import Seo from '@src/components/Seo';
import Container from '@src/components/styled/Container';
import withToken from '@src/components/withToken';
import {
    MY_FORMS_QUERY,
    MyFormsQueryData
} from '@src/graphql/query/myForms.query';
import { ME_QUERY, MeQueryData } from '@src/graphql/query/user.query';
import FormsList from '@src/views/admin/FormsList';

import { Welcome, Wrapper } from './styles';

const AdminTemplate: React.FC = () => {
    const [result] = useQuery<MeQueryData>({
        query: ME_QUERY
    });

    const [myFormsResult] = useQuery<MyFormsQueryData>({
        query: MY_FORMS_QUERY
    });

    return (
        <>
            <Seo title="Administración" />
            <Header />
            <main>
                {result.fetching && <ViewLoading fullPage />}
                {result.data?.user && (
                    <Wrapper>
                        <Container>
                            <Welcome>
                                Bienvenido {result.data?.user.username}
                            </Welcome>
                            {myFormsResult.fetching && <ViewLoading />}
                            {myFormsResult.data?.getMyForms && (
                                <FormsList
                                    forms={myFormsResult.data.getMyForms}
                                />
                            )}
                        </Container>
                    </Wrapper>
                )}
            </main>
        </>
    );
};

export default withToken(AdminTemplate);
