import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
    title?: string;
    image?: string;
    description?: string;
    indexable?: boolean;
}

const Seo: React.FC<Props> = ({ title, description, image, indexable }) => {
    const router = useRouter();
    const url = `${process.env.NEXT_PUBLIC_HOST}${router.pathname}`;

    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />

            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            {!indexable && <meta name="robots" content="noindex, nofollow" />}
            {url && <meta property="og:url" content={url} />}
            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {image && <meta property="og:image" content={image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {title && <meta name="twitter:title" content={title} />}
            {description && (
                <meta name="twitter:description" content={description} />
            )}
            {image && <meta name="twitter:image" content={image} />}
        </Head>
    );
};

Seo.defaultProps = {
    title: 'Formify',
    description: 'Crea asombrosos formularios',
    image: ''
};

export default Seo;
