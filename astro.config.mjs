import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { remarkMermaid } from './src/lib/remark-mermaid.mjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://chr0mazone.github.io',
  integrations: [
    react(),
    expressiveCode({
      themes: ['ayu-dark'],
      styleOverrides: {
        borderRadius: '0px',
        borderColor: 'var(--color-border)',
        codeFontFamily: 'JetBrains Mono, Consolas, monospace',
        uiFontFamily: 'JetBrains Mono, Consolas, monospace',
      },
      defaultProps: {
        showLineNumbers: false,
        wrap: false,
      },
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
    }),
    mdx(),
  ],
  markdown: {
    // remarkMermaid first so mermaid blocks are extracted before expressive-code
    remarkPlugins: [remarkMermaid, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
