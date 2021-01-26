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
            requestPolicy: 'network-only',
            pause: !tokenMustExist
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

        // the token shouldn't exist and it doesn't
        // or the token exists and the user is valid
        if (
            (!getToken() && !tokenMustExist) ||
            (result.data && tokenMustExist)
        ) {
            return <Component {...props} />;
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

        if (result.data) {
            router.push('/admin');

            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        } else {
            deleteToken();
            router.push('/login?denied=true');
            return <ViewLoading />;
        }
    };

    return MyComp;
};

export default withToken;
