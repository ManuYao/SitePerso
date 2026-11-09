/* ==========================================================================
   Yao — portfolio : comportements communs + accueil
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** Petit helper de création de nœuds : h('a', {href}, 'texte', autreNoeud) */
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === false || v == null) continue;
      if (k === 'style') el.style.cssText = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return el;
  }
  window.h = h;

  /* ---------- Cartes projet (grille de l'accueil + « autres projets ») ---------- */
  function cardEl(p, i) {
    return h('a', {
      class: 'card', href: 'projet.html?p=' + encodeURIComponent(p.slug), 'data-reveal': '',
      style: `--bx:${p.mask[0]};--by:${p.mask[1]};--dim:${p.dim ?? .6};--d:${i * 90}ms`,
      'aria-label': `${p.title} — ${p.tag}`,
    },
      h('img', { class: 'card__img', src: p.hover || p.cover, alt: '', loading: 'lazy', decoding: 'async' }),
      h('span', { class: 'card__top' },
        h('span', { class: 'pill pill--plain' }, p.n),
        h('span', { class: 'pill pill--plain' }, p.year)),
      h('span', { class: 'card__body' },
        h('span', { class: 'card__title' }, p.title),
        // le sous-titre est « découpé » dans l'image du projet
        h('span', { class: 'card__tag', style: `background-image:${p.maskBg || `url('${p.cover}')`}` }, p.tag)),
      h('span', { class: 'card__foot' },
        h('span', {}, p.kind),
        h('span', { class: 'card__arrow', 'aria-hidden': 'true' }, '↗')));
  }
  window.renderCards = (container, list) => { list.forEach((p, i) => container.append(cardEl(p, i))); };

  /* ---------- Header : transparent → flou au scroll ---------- */
  function initHeader() {
    const header = $('#header');
    const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  function initMenu() {
    const btn = $('.menu-btn'), menu = $('#mobile-menu');
    if (!btn || !menu) return;
    const set = (open) => {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.firstElementChild.textContent = open ? 'Fermer' : 'Menu';
      menu.inert = !open;
    };
    btn.addEventListener('click', () => set(!document.body.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  /* ---------- Lien actif selon la section visible (accueil) ---------- */
  function initScrollSpy() {
    const links = $$('[data-spy]');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map(links.map((a) => [a.dataset.spy, a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        map.get(en.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    // dans le hero : aucun lien actif
    const hero = $('#hero');
    if (hero) new IntersectionObserver(([en]) => { if (en.isIntersecting) links.forEach((a) => a.classList.remove('is-active')); }, { rootMargin: '-50% 0px -49% 0px' }).observe(hero);
  }

  /* ---------- Apparition au scroll ---------- */
  function initReveal() {
    const els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Texte « À propos » : les mots s'allument au scroll ---------- */
  function initStatement() {
    const st = $('[data-lit]');
    if (!st) return;
    const words = st.textContent.trim().split(/\s+/);
    st.textContent = '';
    const spans = words.map((w, i) => { const s = h('span', { class: 'w' }, w); st.append(s, i < words.length - 1 ? ' ' : ''); return s; });
    if (reduceMotion) { spans.forEach((s) => s.classList.add('on')); return; }
    const update = () => {
      const r = st.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * .88 - r.top) / (r.height + vh * .3)));
      const n = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < n));
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- Formulaire : ouvre le client mail (site 100 % statique) ---------- */
  function initForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('.form__status', form);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const subject = `Portfolio — message de ${d.get('nom')}`;
      const body = `${d.get('message')}\n\n— ${d.get('nom')} (${d.get('email')})`;
      location.href = `mailto:${window.SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Ton application mail s’ouvre…';
    });
  }

  /* ---------- Footer : liste des projets ---------- */
  function initFooter() {
    const ul = $('#footer-projects');
    if (!ul) return;
    window.PROJECTS.forEach((p) => ul.append(h('li', {}, h('a', { href: 'projet.html?p=' + encodeURIComponent(p.slug) }, p.title))));
  }

  /* ==========================================================================
     Hero : la vidéo « remplit » le mot marqué data-vfill.
     Le mot reste du vrai texte (accessible, sélectionnable) ; un canvas posé
     dessus dessine la vidéo, découpée par la forme des lettres.
     ========================================================================== */
  function initVideoFill() {
    const hero = $('#hero'), video = $('.hero__video');
    const targets = $$('[data-vfill]');
    if (!hero || !video || !targets.length) return;

    const poster = new Image();
    poster.src = video.getAttribute('poster') || '';
    const canFilter = 'filter' in CanvasRenderingContext2D.prototype;

    const items = targets.map((el) => {
      const text = el.textContent.trim();
      const canvas = h('canvas', { class: 'vf', 'aria-hidden': 'true' });
      const probe = h('i', { class: 'vf-probe', 'aria-hidden': 'true' });
      el.append(canvas, probe);
      return { el, text, canvas, probe, ctx: canvas.getContext('2d'), g: null };
    });

    const offsetIn = (el, anc) => { let x = 0, y = 0; while (el && el !== anc) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x, y }; };

    function measure() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      items.forEach((it) => {
        const cs = getComputedStyle(it.el);
        const fs = parseFloat(cs.fontSize);
        const pad = Math.ceil(fs * .06) + 2;
        const w = it.el.offsetWidth, hgt = it.el.offsetHeight;
        it.canvas.width = Math.ceil((w + pad * 2) * dpr);
        it.canvas.height = Math.ceil((hgt + pad * 2) * dpr);
        it.canvas.style.cssText = `left:${-pad}px;top:${-pad}px;width:${w + pad * 2}px;height:${hgt + pad * 2}px`;
        const o = offsetIn(it.el, hero);
        it.g = { dpr, pad, w, h: hgt, ox: o.x - pad, oy: o.y - pad, base: it.probe.offsetTop, font: `${cs.fontWeight} ${fs}px ${cs.fontFamily}` };
      });
      draw();
    }

    function draw() {
      const src = video.readyState >= 2 ? video : (poster.complete && poster.naturalWidth ? poster : null);
      if (!src) return;
      const vw = src.videoWidth || src.naturalWidth, vh = src.videoHeight || src.naturalHeight;
      if (!vw) return;
      const W = hero.clientWidth, H = hero.clientHeight;
      const s = Math.max(W / vw, H / vh), dw = vw * s, dh = vh * s, dx = (W - dw) / 2, dy = (H - dh) / 2;
      items.forEach((it) => {
        const g = it.g; if (!g) return;
        const c = it.ctx;
        c.setTransform(g.dpr, 0, 0, g.dpr, 0, 0);
        c.globalCompositeOperation = 'source-over';
        c.clearRect(0, 0, g.w + g.pad * 2, g.h + g.pad * 2);
        // 1. la vidéo (éclaircie pour ressortir sur le fond assombri)
        if (canFilter) c.filter = 'brightness(3.2) saturate(1.3)';
        c.drawImage(src, dx - g.ox, dy - g.oy, dw, dh);
        c.filter = 'none';
        // 2. on ne garde que la forme des lettres
        c.font = g.font; c.textBaseline = 'alphabetic';
        c.globalCompositeOperation = 'destination-in';
        c.fillStyle = '#fff';
        c.fillText(it.text, g.pad, g.pad + g.base);
        // 3. un voile ambré pour que le mot reste lisible même quand la vidéo est sombre
        c.globalCompositeOperation = 'lighter';
        c.fillStyle = 'rgba(255,175,70,.3)';
        c.fillText(it.text, g.pad, g.pad + g.base);
        // 4. fin contour
        c.globalCompositeOperation = 'source-over';
        c.lineWidth = 1.4; c.strokeStyle = 'rgba(255,255,255,.7)';
        c.strokeText(it.text, g.pad, g.pad + g.base);
        it.el.classList.add('is-ready');
      });
    }

    // boucle : une image dessinée par image vidéo (≈ 30 fps)
    let visible = true;
    const tick = () => { if (visible) draw(); schedule(); };
    const schedule = () => (video.requestVideoFrameCallback ? video.requestVideoFrameCallback(tick) : requestAnimationFrame(tick));

    const start = () => { measure(); if (!reduceMotion) schedule(); };
    const fontsReady = (document.fonts && document.fonts.load) ? document.fonts.load('800 100px "Big Shoulders Display"').catch(() => {}).then(() => document.fonts.ready) : Promise.resolve();
    fontsReady.then(start);

    if ('ResizeObserver' in window) new ResizeObserver(() => items[0].g && measure()).observe(hero);
    video.addEventListener('loadeddata', draw);
    poster.addEventListener('load', draw);

    if (reduceMotion) { video.pause(); video.removeAttribute('autoplay'); }
    else if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        visible = en.isIntersecting;
        if (visible) video.play().catch(() => {}); else video.pause();
      }).observe(hero);
    }
  }

  /* ---------- Init ---------- */
  function init() {
    initHeader();
    initMenu();
    initFooter();
    const grid = $('#grid');
    if (grid) window.renderCards(grid, window.PROJECTS);
    if (window.buildProjectPage) window.buildProjectPage();
    initReveal();
    initScrollSpy();
    initStatement();
    initForm();
    initVideoFill();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
