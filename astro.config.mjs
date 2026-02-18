import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import { remarkMermaid } from './src/lib/remark-mermaid.mjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://chr0mazone.github.io',
  integrations: [
    expressiveCode({
      themes: ['ayu-dark'],
      styleOverrides: {
        borderRadius: '0px',
        borderColor: 'var(--color-border)',
        codeFontFamily: 'JetBrains Mono, Consolas, monospace',
        uiFontFamily: 'JetBrains Mono, Consolas, monospace',
      },
      defaultProps: {
        showLineNumbers: true,
        wrap: false,
      },
      plugins: [],
    }),
    mdx(),
  ],
  markdown: {
    // remarkMermaid first so mermaid blocks are extracted before expressive-code
    remarkPlugins: [remarkMermaid, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
