// Builds one self-contained HTML file (single/index.html) with the CSS and JS inlined.
// Used for the private claude.ai preview link; normal hosting uses dist/ as usual.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';

const assets = readdirSync('dist/assets');
const css = assets.filter((f) => f.endsWith('.css')).map((f) => readFileSync(`dist/assets/${f}`, 'utf8')).join('\n');
const js = assets.filter((f) => f.endsWith('.js')).map((f) => readFileSync(`dist/assets/${f}`, 'utf8')).join('\n');
const safeJs = js.replace(/<\/script/gi, '<\\/script');

const html = `<title>Walnut Development Plan</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="robots" content="noindex, nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&family=Spectral:ital,wght@0,600;1,600&display=swap">
<style>
${css}
</style>
<div id="root"></div>
<script type="module">
${safeJs}
</script>
`;

mkdirSync('single', { recursive: true });
writeFileSync('single/index.html', html);
console.log(`single/index.html written (${Math.round(html.length / 1024)} KB)`);
