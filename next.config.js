const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = withPlugins([
    [withBundleAnalyzer],
    [withImages]
], {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // config.plugins.push(new DuplicatePackageCheckerPlugin())
        config.resolve.alias['fast-deep-equal'] = path.resolve(
          __dirname,
          'node_modules',
          'fast-deep-equal'
        )
        return config
    },
    basePath: isDev ? '' : '/formify',
    poweredByHeader: false,
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    env: {
        NEXT_PUBLIC_HOST: isDev
            ? 'http://localhost:3000'
            : 'https://textcode.me/formify',
        NEXT_PUBLIC_ANALYITICS_ID: isDev ? '' : 'UA-98491944-6'
    },
    images: {
        domains: ['textcode.me']
    }
})