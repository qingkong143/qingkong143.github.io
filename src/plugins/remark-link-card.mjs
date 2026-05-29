/**
 * remark plugin: converts fenced code blocks with language "link-card" or "card"
 * into external-link-card HTML.
 *
 * Syntax:
 *   ```link-card
 *   url: https://example.com
 *   title: Card Title
 *   desc: A short description
 *   img: https://example.com/icon.png
 *   ```
 *
 * `url` and `title` are required.
 */
import { visit } from 'unist-util-visit';

export default function remarkLinkCard() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'link-card' && node.lang !== 'card') return;
      const fields = {};
      for (const line of node.value.split('\n')) {
        const m = line.match(/^(\w+):\s*(.*)/);
        if (m) fields[m[1]] = m[2].trim();
      }
      const url = fields.url || fields.href || '';
      const title = fields.title || fields.name || '';
      if (!url && !title) return;

      let html = url
        ? `<a class="external-link-card" href="${esc(url)}" target="_blank" rel="noopener">`
        : '<div class="external-link-card">';
      const img = fields.img || fields.icon || fields.image;
      if (img) html += `<img src="${esc(img)}" alt="${esc(title)}" loading="lazy" />`;
      html += '<span class="link-card-body">';
      if (title) html += `<span class="link-card-title">${esc(title)}</span>`;
      const desc = fields.desc || fields.description;
      if (desc) html += `<span class="link-card-desc">${esc(desc)}</span>`;
      html += '</span>';
      html += url ? '</a>' : '</div>';

      parent.children.splice(index, 1, { type: 'html', value: html });
    });
  };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
