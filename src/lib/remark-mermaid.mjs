// src/lib/remark-mermaid.mjs
// No external deps — walks the mdast manually.
// Converts ```mermaid fenced blocks to raw HTML divs BEFORE
// astro-expressive-code gets a chance to syntax-highlight them.

export function remarkMermaid() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (!node.children) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === 'code' && child.lang === 'mermaid') {
      const escaped = child.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      node.children[i] = {
        type: 'html',
        value: `<div class="mermaid-diagram" data-mermaid="${encodeURIComponent(child.value)}"><pre style="display:none">${escaped}</pre></div>`,
      };
    } else {
      walk(child);
    }
  }
}
