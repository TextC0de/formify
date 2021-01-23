import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ViewLoading from '@src/components/common/ViewLoading';
import Seo from '@src/components/Seo';
import { getToken } from '@src/utils/auth';

const withToken = (
    Component: React.ComponentType,
    tokenMustExist = true
): React.FC => {
    const MyComp: React.FC = (props) => {
        const router = useRouter();
        const [firstRenderReady, setFirstRenderReady] = useState<boolean>(
            false
        );

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

        if (!!getToken() && !tokenMustExist) {
            router.push('/admin');

            return (
                <main>
                    <Seo />
                    <ViewLoading fullPage />
                </main>
            );
        }

        return <Component {...props} />;
    };

    return MyComp;
};

export default withToken;
