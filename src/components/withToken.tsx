import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

import ViewLoading from '@src/components/common/ViewLoading';
import Seo from '@src/components/Seo';
import { ME_QUERY, MeQueryData } from '@src/graphql/query/user.query';
import { getToken } from '@src/utils/auth';
import { deleteToken } from '@src/utils/auth';

const withToken = (
    Component: React.ComponentType,
    tokenMustExist = true
): React.FC => {
    const MyComp: React.FC = (props) => {
        const router = useRouter();
        const [firstRenderReady, setFirstRenderReady] = useState<boolean>(
            false
        );

        const [result] = useQuery<MeQueryData>({
            query: ME_QUERY,
            requestPolicy: 'network-only'
        });

        useEffect(() => {
            setFirstRenderReady(true);
        }, []);

        if (!firstRenderReady) {
            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        }

        // the token should exist, redirect to login
        if (!getToken() && tokenMustExist) {
            router.push({
                pathname: '/login',
                query: { denied: true }
            });

            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        }

        if (result.fetching) {
            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        }

        // the user shouldn't be auth but it does
        // redirect to admin
        if (result.data && !tokenMustExist) {
            router.push('/admin');

            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        }

        // the user should be auth but it doesn't
        // redirect to login
        if (!result.data && tokenMustExist) {
            deleteToken();
            router.push('/login?denied=true');
            return <ViewLoading />;
        }

        // the token shouldn't exist and it doesn't
        // or the token exists and the user is valid
        return <Component {...props} />;
    };

    return MyComp;
};

export default withToken;
