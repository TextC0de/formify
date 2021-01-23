import { RenderPageResult } from 'next/dist/next-server/lib/utils';
import Document, {
    DocumentContext,
    DocumentInitialProps,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { GA_TRACKING_ID } from '@src/utils/analytics';

interface Props extends DocumentInitialProps {
    isProduction: boolean;
    styles: React.ReactElement;
}

export default class SiteDocument extends Document<Props> {
    static async getInitialProps(ctx: DocumentContext): Promise<Props> {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
                originalRenderPage({
                    enhanceApp: (App) => (
                        props
                    ): React.ReactElement<{ sheet: ServerStyleSheet }> =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await Document.getInitialProps(ctx);
            const isProduction = process.env.NODE_ENV === 'production';

            return {
                isProduction,
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render(): React.ReactElement {
        const { isProduction } = this.props;

        return (
            <Html lang="es">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap"
                        rel="stylesheet"
                    />
                    {isProduction && (
                        <>
                            {/* Global Site Tag (gtag.js) - Google Analytics */}
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        
                                        function gtag() {
                                            dataLayer.push(arguments);
                                        }

                                        gtag('js', new Date());

                                        gtag('config', '${GA_TRACKING_ID}', {
                                            page_path: window.location.pathname,
                                        });
                                    `
                                }}
                            />
                        </>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
