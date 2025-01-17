import type { StorybookConfig } from '@storybook/react-webpack5';
import type { PluginItem } from '@babel/core';
import path from 'path';
import remarkGfm from 'remark-gfm';

const toPath = (_path: string) => path.join(process.cwd(), _path);

const config: StorybookConfig = {
  staticDirs: [toPath('.storybook/public')],
  stories: [
    '../packages/circuit-ui/**/*.@(mdx|stories.@(js|ts|tsx))',
    '../docs/**/*.@(mdx|stories.@(js|ts|tsx))',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-storysource',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-interactions',
    '@storybook/addon-toolbars',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ...(options.presets as PluginItem[]),
      // HACK: Storybook includes `@babel/preset-react` by default, which
      // overrides the custom preset configuration in `babel.config.json`.
      // This override overrides the override.
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
        'preset-jsx-import-source',
      ],
      '@babel/preset-typescript',
    ],
  }),
};

export default config;
