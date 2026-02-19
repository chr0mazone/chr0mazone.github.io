// src/lib/mermaid-init.ts
// Loaded lazily on pages that contain .mermaid-diagram elements.

export async function initMermaid() {
  const diagrams = document.querySelectorAll<HTMLElement>('.mermaid-diagram');
  if (diagrams.length === 0) return;

  const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs' as any);

  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    darkMode: true,
    themeVariables: {
      background:          '#0d1117',
      mainBkg:             '#1a2332',
      nodeBorder:          '#00d4aa',
      lineColor:           '#00a885',
      primaryColor:        '#1a2332',
      primaryBorderColor:  '#00d4aa',
      primaryTextColor:    '#e2e8f0',
      secondaryColor:      '#111827',
      secondaryBorderColor:'#1e3a4a',
      secondaryTextColor:  '#94a3b8',
      tertiaryColor:       '#1e2d3d',
      tertiaryBorderColor: '#2a5060',
      tertiaryTextColor:   '#94a3b8',
      edgeLabelBackground: '#111827',
      clusterBkg:          '#111827',
      clusterBorder:       '#1e3a4a',
      titleColor:          '#e2e8f0',
      fontFamily:          'JetBrains Mono, monospace',
      fontSize:            '14px',
    },
    flowchart: { curve: 'basis', htmlLabels: true },
    sequence:  { actorMargin: 50 },
    gantt:     { axisFormat: '%Y-%m-%d' },
  });

  let id = 0;
  for (const el of diagrams) {
    const encoded = el.getAttribute('data-mermaid');
    if (!encoded) continue;

    const code = decodeURIComponent(encoded);
    const diagramId = `mermaid-svg-${id++}`;

    el.classList.add('mermaid-loading');
    el.textContent = 'Rendering diagram…';

    try {
      const { svg } = await mermaid.render(diagramId, code);
      el.innerHTML = svg;
      el.classList.remove('mermaid-loading');
    } catch (err: any) {
      el.classList.remove('mermaid-loading');
      el.classList.add('mermaid-error');
      el.innerHTML = `<strong>⚠ Mermaid error</strong><pre>${err.message ?? err}</pre>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', initMermaid);
