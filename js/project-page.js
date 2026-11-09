/* ==========================================================================
   Page projet : lit ?p=<slug> et remplit projet.html depuis js/projects.js
   Appelée par main.js avant l'animation d'apparition.
   ========================================================================== */
window.buildProjectPage = function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const h = window.h;
  const list = window.PROJECTS;

  const slug = new URLSearchParams(location.search).get('p');
  const i = list.findIndex((p) => p.slug === slug);
  if (i < 0) { location.replace('index.html#projets'); return; }
  const p = list[i];

  document.title = `${p.title} — Yao`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = `${p.title} : ${p.intro}`;

  const cover = $('#p-cover');
  cover.src = p.cover; cover.alt = '';
  cover.style.objectPosition = p.pos;

  $('#p-crumb').textContent = p.title;
  $('#p-title').textContent = p.title;
  $('#p-intro').textContent = p.intro;

  const meta = $('#p-meta');
  [['Année', p.year], ['Type', p.type], ['Statut', p.status]].forEach(([k, v]) => {
    meta.append(h('div', {}, h('dt', {}, k), h('dd', {}, v)));
  });

  const descEl = $('#p-desc');
  p.description.forEach((t) => descEl.append(h('p', {}, t)));

  const feat = $('#p-features');
  p.features.forEach((t) => feat.append(h('li', {}, t)));

  const stack = $('#p-stack');
  p.stack.forEach((t) => stack.append(h('li', {}, t)));

  const links = $('#p-links');
  p.links.forEach((l) => links.append(h('a', { class: 'btn' + (l.ghost ? ' btn--ghost' : ''), href: l.url, target: '_blank', rel: 'noopener' }, l.label + ' ↗')));

  const gal = $('#p-gallery');
  (p.gallery || []).forEach((row) => {
    const r = h('div', { class: 'g-row' + (row.phones ? ' g-row--phones' : ''), style: row.max ? `max-width:${row.max}` : '' });
    row.items.forEach((it) => {
      r.append(h('figure', { class: 'g-item' },
        h('img', { src: it.src, alt: it.alt, loading: 'lazy', decoding: 'async' }),
        it.caption ? h('figcaption', {}, it.caption) : null));
    });
    gal.append(r);
  });

  // autres projets : tous les projets sauf celui-ci
  const others = list.filter((_, k) => k !== i);
  window.renderCards($('#more-grid'), others);
};
