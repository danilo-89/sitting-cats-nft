import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
    webpackFinal: async (config: any) => ({
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                '@': path.resolve(__dirname, '../'),
            },
        },
    }),
}
export default config
