import {
    AppPropsType,
    NextWebVitalsMetric
} from 'next/dist/next-server/lib/utils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import {
    Provider as UrqlProvider,
    cacheExchange,
    createClient,
    dedupExchange,
    fetchExchange
} from 'urql';

import { API_URI } from '@src/graphql/constants';
import ResetStyle from '@src/styles/reset';
import theme from '@src/styles/theme';
import { trackPageView } from '@src/utils/analytics';
import { getToken } from '@src/utils/auth';

const client = createClient({
    url: API_URI,
    fetchOptions: () => {
        const token = getToken();
        return {
            headers: { authorization: token ? `Bearer ${token}` : '' }
        };
    },
    exchanges: [dedupExchange, cacheExchange, fetchExchange]
});

const App: React.FC<AppPropsType> = ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;

        const handleRouteChange = (url: string): void => {
            trackPageView({ url });
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return (): void => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <ThemeProvider theme={theme}>
            <ResetStyle />

            <ToastProvider>
                <UrqlProvider value={client}>
                    <Component {...pageProps} />
                </UrqlProvider>
            </ToastProvider>
        </ThemeProvider>
    );
};

export const reportWebVitals = ({
    id,
    name,
    label,
    value
}: NextWebVitalsMetric): void => {
    if (!window.gtag || process.env.NODE_ENV !== 'production') return;
    window.gtag('event', name, {
        event_category:
            label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id, // id unique to current page load
        non_interaction: true // avoids affecting bounce rate.
    });
};

export default App;
