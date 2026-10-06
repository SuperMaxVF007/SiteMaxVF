(() => {
  'use strict';

  /* ==========================================================
     0. i18n dictionary
     ========================================================== */
  const I18N = {
    ru: {
      'nav.ru': 'RU', 'nav.en': 'EN',
      'hero.role': 'PYTHON-РАЗРАБОТЧИК · АВТОМАТИЗАЦИЯ TELEGRAM',
      'hero.tagline': 'Пишу <strong>ботов, юзерботов и автоматизацию</strong>, которые живут на Raspberry Pi и не падают по ночам.',
      'hero.cta1': 'Обо мне',
      'hero.cta2': 'Мои проекты и ссылки',
      'hero.scroll': 'Листай вниз',
      'about.eyebrow': '// О себе',
      'about.title': 'Кто такой SuperMaxVF',
      'about.p1': 'Привет! Я <strong>Max</strong>, ученик 11 класса из Крыма, увлечён кибербезопасностью и автоматизацией. Пишу телеграм-ботов и юзерботов на <strong>Python</strong> (aiogram 3.x и Telethon) и поднимаю их в Docker на собственном <strong>Raspberry Pi 5</strong>.',
      'about.p2': 'Среди проектов — музыкальные загрузчики (Yandex Music, Spotify, SoundCloud) с шифрованным хранением токенов, ИИ-бот для анализа кода на уязвимости, модули для Hikka-юзербота, DVD-скринсейвер на ESP8266 и эксперименты с распознаванием жеста руки через OpenCV/MediaPipe.',
      'about.p3': 'Исходники и разборы выкладываю на <strong>GitHub</strong> и <strong>Boosty</strong>, процесс показываю в <strong>Telegram</strong> и на <strong>YouTube</strong>.',
      'terminal.path': '~/supermaxvf/about.py',
      'terminal.role': 'Роль',
      'terminal.role.val': 'Python- и Telegram-разработчик',
      'terminal.base': 'База',
      'terminal.base.val': 'Крым, Россия',
      'terminal.stack': 'Стек',
      'links.eyebrow': '// Найти меня',
      'links.title': 'Ссылки и соцсети',
      'links.lede': 'Все проекты, исходники и посты — по этим орбитам.',
      'links.tg.handle': '@MadeBySuperMaxVF',
      'links.yt.handle': '@SuperMaxVF',
      'links.gh.handle': 'SuperMaxVF007',
      'links.bst.handle': 'supermaxvf',
      'links.tt.handle': '@supermaxvf0o7',
      'footer.sub': 'Сайт-визитка · только статика, без бэкенда',
    },
    en: {
      'nav.ru': 'RU', 'nav.en': 'EN',
      'hero.role': 'PYTHON DEVELOPER · TELEGRAM AUTOMATION',
      'hero.tagline': 'I build <strong>bots, userbots and automation</strong> that live on a Raspberry Pi and don\u2019t crash at 3am.',
      'hero.cta1': 'About me',
      'hero.cta2': 'My projects & links',
      'hero.scroll': 'Scroll down',
      'about.eyebrow': '// About',
      'about.title': 'Who is SuperMaxVF',
      'about.p1': 'Hey! I\u2019m <strong>Max</strong>, an 11th-grade student from Crimea, into cybersecurity and automation. I write <strong>Python</strong> Telegram bots and userbots with aiogram 3.x and Telethon, self-hosted in Docker on my own <strong>Raspberry Pi 5</strong>.',
      'about.p2': 'Projects include music downloader bots (Yandex Music, Spotify, SoundCloud) with encrypted token storage, an AI-powered code security bot, custom Hikka userbot modules, a DVD-bounce screensaver on ESP8266, and hand-tracking experiments with OpenCV/MediaPipe.',
      'about.p3': 'Source code and write-ups go on <strong>GitHub</strong> and <strong>Boosty</strong>, the process is on <strong>Telegram</strong> and <strong>YouTube</strong>.',
      'terminal.path': '~/supermaxvf/about.py',
      'terminal.role': 'Role',
      'terminal.role.val': 'Python & Telegram Developer',
      'terminal.base': 'Base',
      'terminal.base.val': 'Crimea, Russia',
      'terminal.stack': 'Stack',
      'links.eyebrow': '// Find me',
      'links.title': 'Links & socials',
      'links.lede': 'Every project, source file and post lives on one of these orbits.',
      'links.tg.handle': '@MadeBySuperMaxVF',
      'links.yt.handle': '@SuperMaxVF',
      'links.gh.handle': 'SuperMaxVF007',
      'links.bst.handle': 'supermaxvf',
      'links.tt.handle': '@supermaxvf0o7',
      'footer.sub': 'Portfolio site \u00b7 static only, no backend',
    }
  };

  let currentLang = 'ru';
  const LANG_FADE_MS = 190;

  function moveThumb(lang){
    const toggle = document.querySelector('.lang-toggle');
    const thumb = document.querySelector('.lang-thumb');
    const btn = document.querySelector(`.lang-toggle button[data-lang="${lang}"]`);
    if (!toggle || !thumb || !btn) return;
    thumb.style.width = btn.offsetWidth + 'px';
    thumb.style.transform = `translateX(${btn.offsetLeft}px)`;
  }

  function applyLang(lang, animate){
    currentLang = lang;
    const doUpdate = () => {
      document.documentElement.setAttribute('lang', lang);
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const dict = I18N[lang];
        if (dict && dict[key] !== undefined) el.innerHTML = dict[key];
      });
    };

    if (animate) {
      document.body.classList.add('lang-fading');
      window.setTimeout(() => {
        doUpdate();
        document.body.classList.remove('lang-fading');
      }, LANG_FADE_MS);
    } else {
      doUpdate();
    }

    moveThumb(lang);
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function initLangToggle(){
    const toggle = document.querySelector('.lang-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-lang]');
      if (!btn || btn.dataset.lang === currentLang) return;
      applyLang(btn.dataset.lang, true);
    });
    window.addEventListener('resize', () => moveThumb(currentLang), { passive: true });
  }

  /* ==========================================================
     Общие утилиты: единый источник состояния курсора/пальца
     и скорости скролла. Все эффекты читают отсюда, а не
     вешают свои слушатели.
     ========================================================== */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const Pointer = { x: -9999, y: -9999, active: false, type: 'mouse' };
  (function initPointer(){
    const set = (e) => {
      Pointer.x = e.clientX;
      Pointer.y = e.clientY;
      Pointer.type = e.pointerType || 'mouse';
      Pointer.active = true;
    };
    const off = () => { Pointer.active = false; Pointer.x = -9999; Pointer.y = -9999; };
    window.addEventListener('pointermove', set, { passive: true });
    window.addEventListener('pointerdown', set, { passive: true });
    window.addEventListener('pointerup', (e) => { if (e.pointerType === 'touch') off(); }, { passive: true });
    window.addEventListener('pointercancel', off, { passive: true });
    document.documentElement.addEventListener('mouseleave', off, { passive: true });
    window.addEventListener('blur', off);
  })();

  /* ==========================================================
     ScrollFX — скорость скролла (px/с, сглаженная) для motion blur
     звёзд и направленного размытия заголовков (только ПК).
     ========================================================== */
  const ScrollFX = (() => {
    let y = window.scrollY || 0;
    let lastY = y;
    let vel = 0;
    let blurOn = false;
    let lastDev = -1;
    const node = document.getElementById('mblur-y-node');
    const targets = FINE_POINTER ? Array.from(document.querySelectorAll('.hero-title, .section-title')) : [];

    window.addEventListener('scroll', () => { y = window.scrollY; }, { passive: true });

    function update(dt){
      const inst = (y - lastY) / Math.max(dt, 1e-3);
      lastY = y;
      vel += (inst - vel) * (1 - Math.exp(-dt * 12));
      if (Math.abs(vel) < 0.5) vel = 0;
    }

    // Вертикальный motion blur заголовков: включается только пока скролл быстрый
    function applyBlur(){
      if (!node || targets.length === 0) return;
      const dev = Math.min(5, Math.abs(vel) / 450);
      if (dev < 0.35) {
        if (blurOn) { targets.forEach(t => t.classList.remove('mblur-on')); blurOn = false; lastDev = -1; }
        return;
      }
      if (!blurOn) { targets.forEach(t => t.classList.add('mblur-on')); blurOn = true; }
      if (Math.abs(dev - lastDev) > 0.12) {
        node.setAttribute('stdDeviation', '0 ' + dev.toFixed(2));
        lastDev = dev;
      }
    }

    return { update, applyBlur, get y(){ return y; }, get vel(){ return vel; } };
  })();

  /* ==========================================================
     1. Starfield — звёзды с параллаксом от скролла и motion blur:
     каждая звезда рисуется штрихом вдоль своей фактической
     скорости (скролл, уклонение от курсора). Свечение крупных
     звёзд — аддитивный «ореол» тем же штрихом, без shadowBlur.
     ========================================================== */
  const Starfield = (() => {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return { update(){}, draw(){}, resize(){} };
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });

    let w = 0, h = 0, dpr = 1;
    let stars = [];

    const AVOID_RADIUS = 140;
    const AVOID_STRENGTH = 3400;
    const EASE_RATE = 7;
    const PARALLAX = 0.16;     // доля скролла, на которую смещается самая близкая звезда
    const EXPOSURE = 0.034;    // «выдержка» в секундах: длина штриха = скорость × выдержка
    const MAX_STREAK = 38;     // потолок длины штриха, px

    const BUCKETS = 4;
    const VIOLET_RGB = '196,181,253';
    const GOLD_RGB   = '255,214,140';

    function starCount(){
      const area = w * h;
      const isSmall = w < 640;
      const density = isSmall ? 1 / 16000 : 1 / 11000;
      const max = isSmall ? 40 : 90;
      return Math.min(max, Math.round(area * density));
    }

    function buildStars(){
      const n = starCount();
      stars = new Array(n).fill(0).map(() => {
        const bx = Math.random() * w;
        const by = Math.random() * h;
        const z = 0.25 + Math.random() * 0.75;        // глубина: 1 — ближняя
        return {
          bx, by, z,
          big: z > 0.72,
          ox: 0, oy: 0,                               // смещение от курсора
          fx: bx, fy: by, wy: by, ready: false,       // экранная позиция и прошлый кадр
          vx: 0, vy: 0,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.5 + Math.random() * 1.1,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.06 + Math.random() * 0.10,
          driftR: Math.random() * 10 + 4,
          hue: Math.random() < 0.5 ? 0 : 1
        };
      });
    }

    function setupCanvas(){
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'lighter';   // аддитивное свечение
    }

    function resize(){
      const nw = window.innerWidth, nh = window.innerHeight;
      // на телефоне адресная строка меняет innerHeight при скролле — звёзды не пересоздаём
      const sameLayout = stars.length && nw === w && Math.abs(nh - h) < 120;
      w = nw; h = nh;
      setupCanvas();
      if (!sameLayout) buildStars();
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    function update(dt){
      const scrollOff = ScrollFX.y * PARALLAX;
      const k = 1 - Math.exp(-EASE_RATE * dt);
      const kv = 1 - Math.exp(-dt * 20);
      const safeDt = Math.max(dt, 1e-3);

      for (const s of stars) {
        s.driftAngle += s.driftSpeed * dt;
        const tx0 = s.bx + Math.cos(s.driftAngle) * s.driftR;
        let wy = (s.by + Math.sin(s.driftAngle) * s.driftR - scrollOff * s.z) % h;
        if (wy < 0) wy += h;

        let tox = 0, toy = 0;
        if (Pointer.active) {
          const dx = tx0 - Pointer.x;
          const dy = wy - Pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < AVOID_RADIUS * AVOID_RADIUS && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const falloff = 1 - dist / AVOID_RADIUS;
            const force = falloff * falloff * AVOID_STRENGTH * (1 / 60);
            tox = (dx / dist) * force;
            toy = (dy / dist) * force;
          }
        }
        s.ox += (tox - s.ox) * k;
        s.oy += (toy - s.oy) * k;

        const fx = tx0 + s.ox, fy = wy + s.oy;
        if (s.ready) {
          const wrapped = Math.abs(wy - s.wy) > h * 0.5;   // звезда перепрыгнула край экрана
          const ivx = (fx - s.fx) / safeDt;
          const ivy = wrapped ? 0 : (fy - s.fy) / safeDt;
          s.vx += (ivx - s.vx) * kv;
          s.vy += (ivy - s.vy) * kv;
        }
        s.fx = fx; s.fy = fy; s.wy = wy; s.ready = true;
        s.tw += s.twSpeed * dt;
      }
    }

    // [размер(2)][оттенок(2)][яркость(BUCKETS)] — Path2D переиспользуются между кадрами
    const GROUP = 2 * BUCKETS;
    const bucketPaths = new Array(2 * GROUP);
    const WIDTH = [1.3, 2.8];

    function draw(){
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < bucketPaths.length; i++) bucketPaths[i] = null;

      for (const s of stars) {
        const twinkle = 0.55 + Math.sin(s.tw) * 0.45;
        const bucket = Math.min(BUCKETS - 1, Math.floor(twinkle * BUCKETS));
        const key = (s.big ? GROUP : 0) + s.hue * BUCKETS + bucket;
        let p = bucketPaths[key];
        if (!p) { p = new Path2D(); bucketPaths[key] = p; }

        let tx = s.vx * EXPOSURE, ty = s.vy * EXPOSURE;
        const len = Math.hypot(tx, ty);
        if (len > MAX_STREAK) { tx *= MAX_STREAK / len; ty *= MAX_STREAK / len; }
        p.moveTo(s.fx, s.fy);
        p.lineTo(s.fx - tx - 0.01, s.fy - ty);
      }

      for (let size = 0; size < 2; size++) {
        for (let hue = 0; hue < 2; hue++) {
          const rgb = hue === 0 ? VIOLET_RGB : GOLD_RGB;
          for (let b = 0; b < BUCKETS; b++) {
            const p = bucketPaths[size * GROUP + hue * BUCKETS + b];
            if (!p) continue;
            const alpha = Math.max(0.12, (b + 1) / BUCKETS);
            if (size === 1) {                      // мягкий ореол крупных звёзд
              ctx.lineWidth = 9;
              ctx.strokeStyle = `rgba(${rgb},${(alpha * 0.14).toFixed(3)})`;
              ctx.stroke(p);
            }
            ctx.lineWidth = WIDTH[size];
            ctx.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx.stroke(p);
          }
        }
      }
    }

    return { update, draw, resize };
  })();

  /* ==========================================================
     2. Scroll reveal via IntersectionObserver — elements fade
     back out when scrolled past going the other way, mirroring
     how they appeared.
     ========================================================== */
  function initReveal(){
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || items.length === 0) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('in', entry.isIntersecting);
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
    items.forEach(el => io.observe(el));
  }


  /* ==========================================================
     3. TerminalFX — карточка ~/supermaxvf/about.py.
     • Мышь: наклон/сдвиг/блик пишутся прямо в кадре, без transition
       и без задержки (сглаживание ≈ 1 кадр только чтобы не было
       скачка при входе). Уход курсора — пружинный возврат.
     • Тач: нажатие «вдавливает» карточку этой частью и отодвигает
       от пальца; отпускание — недодемпфированная пружина (желе).
     Физика — пружина x'' = k(t−x) − c·x', шаг фиксированный.
     ========================================================== */
  const TerminalFX = (() => {
    const el = document.querySelector('.terminal[data-tilt]');
    const host = el ? el.parentElement : null;
    const NOOP = { update(){} };
    if (!el || !host) return NOOP;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return NOOP;

    const KEYS = ['x', 'y', 'rx', 'ry', 'sc', 'sq'];
    const P = { x: 0, y: 0, rx: 0, ry: 0, sc: 1, sq: 0 };   // текущее
    const V = { x: 0, y: 0, rx: 0, ry: 0, sc: 0, sq: 0 };   // скорость
    const T = { x: 0, y: 0, rx: 0, ry: 0, sc: 1, sq: 0 };   // цель

    const HOVER = { rot: 9, shift: 6, scale: 1.02 };
    const PRESS = { rot: 11, push: 9, scale: 0.965, squash: 0.02 };

    let mode = 'rest';            // rest | hover | press
    let K = 190, C = 17;          // жёсткость/демпфирование текущей пружины
    let awake = false;
    let pressedId = null;
    let mx = 50, my = 50, glow = 0, glowT = 0;

    function aim(e){
      const r = host.getBoundingClientRect();           // обёртка не трансформируется → нет обратной связи
      const px = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      const py = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      mx = (px * 0.5 + 0.5) * 100;
      my = (py * 0.5 + 0.5) * 100;
      glowT = 1;
      if (mode === 'hover') {
        T.ry = px * HOVER.rot;  T.rx = -py * HOVER.rot;
        T.x  = px * HOVER.shift; T.y  = py * HOVER.shift * 0.85;
        T.sc = HOVER.scale;     T.sq = 0;
      } else if (mode === 'press') {
        // нажатая сторона уходит вглубь, карточка отъезжает от пальца и «приседает»
        T.ry = px * PRESS.rot;  T.rx = -py * PRESS.rot;
        T.x  = -px * PRESS.push; T.y  = -py * PRESS.push;
        T.sc = PRESS.scale;     T.sq = PRESS.squash;
      }
    }

    function toRest(k, c){
      mode = 'rest';
      K = k; C = c;
      T.x = T.y = T.rx = T.ry = T.sq = 0; T.sc = 1;
      glowT = 0;
      awake = true;
    }

    host.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      mode = 'hover'; awake = true; aim(e);
    });
    host.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') { if (mode === 'press' && e.pointerId === pressedId) aim(e); return; }
      if (mode !== 'hover') { mode = 'hover'; awake = true; }
      aim(e);
    });
    host.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      toRest(190, 17);          // лёгкий перелёт при возврате под курсором
    });

    host.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return;
      pressedId = e.pointerId;
      mode = 'press'; K = 420; C = 26; awake = true;     // быстрое «вдавливание»
      aim(e);
      try { host.setPointerCapture(e.pointerId); } catch (_) {}
    });
    const release = (e) => {
      if (e.pointerType !== 'touch' || e.pointerId !== pressedId) return;
      pressedId = null;
      toRest(170, 7.5);         // ζ≈0.29 — заметное «желейное» дрожание
    };
    host.addEventListener('pointerup', release);
    host.addEventListener('pointercancel', release);
    host.addEventListener('lostpointercapture', release);

    function update(dt){
      if (!awake) return;

      if (mode === 'hover') {
        const k = 1 - Math.exp(-dt * 60);
        for (const key of KEYS) { P[key] += (T[key] - P[key]) * k; V[key] = 0; }
      } else {
        const n = Math.max(1, Math.ceil(dt / (1 / 120)));
        const h = dt / n;
        for (let i = 0; i < n; i++) {
          for (const key of KEYS) {
            V[key] += (K * (T[key] - P[key]) - C * V[key]) * h;
            P[key] += V[key] * h;
          }
        }
      }

      glow += (glowT - glow) * (1 - Math.exp(-dt * 10));

      let settled = false;
      if (mode === 'rest') {
        settled = glow < 0.003;
        for (const key of KEYS) {
          if (Math.abs(T[key] - P[key]) > 0.002 || Math.abs(V[key]) > 0.01) { settled = false; break; }
        }
      }

      if (settled) {
        for (const key of KEYS) { P[key] = T[key]; V[key] = 0; }
        glow = 0; awake = false;
        el.style.transform = '';
        el.style.setProperty('--glow', '0');
        return;
      }

      el.style.transform =
        `translate3d(${P.x.toFixed(2)}px,${P.y.toFixed(2)}px,0) ` +
        `rotateX(${P.rx.toFixed(3)}deg) rotateY(${P.ry.toFixed(3)}deg) ` +
        `scale(${(P.sc * (1 + P.sq)).toFixed(4)},${(P.sc * (1 - P.sq)).toFixed(4)})`;
      el.style.setProperty('--mx', mx.toFixed(1) + '%');
      el.style.setProperty('--my', my.toFixed(1) + '%');
      el.style.setProperty('--glow', glow.toFixed(3));
    }

    return { update };
  })();

  /* ==========================================================
     CursorGlow — два слоя света за курсором (ПК). Ближний следует
     быстро, дальний — с лагом и вытягивается вдоль скорости:
     получается размытие свечения в движении (motion blur).
     ========================================================== */
  const CursorGlow = (() => {
    const core = document.querySelector('.cursor-glow.core');
    const halo = document.querySelector('.cursor-glow.halo');
    if (!FINE_POINTER || !core || !halo) return { update(){} };

    let cx = 0, cy = 0, hx = 0, hy = 0, shown = false, inited = false;

    function update(dt){
      const active = Pointer.active && Pointer.type !== 'touch';
      if (active !== shown) {
        shown = active;
        core.style.opacity = halo.style.opacity = active ? '1' : '0';
      }
      if (!active) return;
      if (!inited) { cx = hx = Pointer.x; cy = hy = Pointer.y; inited = true; }

      cx += (Pointer.x - cx) * (1 - Math.exp(-dt * 26));
      cy += (Pointer.y - cy) * (1 - Math.exp(-dt * 26));
      const px = hx, py = hy;
      hx += (Pointer.x - hx) * (1 - Math.exp(-dt * 6));
      hy += (Pointer.y - hy) * (1 - Math.exp(-dt * 6));

      const vx = (hx - px) / Math.max(dt, 1e-3);
      const vy = (hy - py) / Math.max(dt, 1e-3);
      const speed = Math.hypot(vx, vy);
      const stretch = 1 + Math.min(speed / 900, 1.4);
      const ang = Math.atan2(vy, vx);

      core.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      halo.style.transform =
        `translate3d(${hx.toFixed(1)}px,${hy.toFixed(1)}px,0) rotate(${ang.toFixed(3)}rad) ` +
        `scale(${stretch.toFixed(3)},${(1 / Math.sqrt(stretch)).toFixed(3)})`;
    }

    return { update };
  })();

  /* ==========================================================
     4. Orbit — спутники на круговых орбитах + кометные следы
     (motion blur движения). Углы интегрирует общий master loop,
     draw() пишет left/top/transform/z-index и рисует следы.
     ========================================================== */
  const Orbit = (() => {
    const wrap = document.querySelector('.orbit-wrap');
    if (!wrap) return { update(){}, draw(){}, resize(){} };
    const links = Array.from(wrap.querySelectorAll('.orbit-link'));
    const rings = Array.from(wrap.querySelectorAll('.orbit-ring'));
    const tcanvas = wrap.querySelector('.orbit-trails');
    const tctx = tcanvas ? tcanvas.getContext('2d') : null;

    const sats = links.map((link, i) => {
      const s = {
        el: link,
        ringIndex: i % rings.length,
        angle: (parseFloat(link.dataset.angle) || 0) * (Math.PI / 180),
        // dataset.speed задан в градусах/секунду — переводим один раз
        speed: (parseFloat(link.dataset.speed) || 14) * (i % 2 === 0 ? 1 : -1) * (Math.PI / 180),
        x: 0, y: 0,
        paused: false,
        scale: 1, z: 4, dim: 1
      };
      link.addEventListener('mouseenter', () => { s.paused = true; });
      link.addEventListener('mouseleave', () => { s.paused = false; });
      return s;
    });

    let size = 0;
    let tdpr = 1;
    // Ближе этой дистанции (px) два спутника получают «глубину»:
    // один вылетает вперёд (крупнее), другой уходит назад (меньше и темнее).
    const COLLIDE_DIST = 46;

    const TRAIL_SEGMENTS = 18;
    const TRAIL_SPAN = 0.6;   // длина следа, рад

    function resize(){
      size = wrap.clientWidth;
      rings.forEach((ring, i) => {
        const d = size * (0.42 + i * 0.20);
        ring.style.width = d + 'px';
        ring.style.height = d + 'px';
      });
      if (tcanvas && size) {
        tdpr = Math.min(window.devicePixelRatio || 1, 1.5);
        tcanvas.width = tcanvas.height = Math.round(size * tdpr);
        tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
        tctx.lineCap = 'round';
        tctx.globalCompositeOperation = 'lighter';
      }
    }
    links.forEach(l => { l.style.position = 'absolute'; });
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function update(dt){
      sats.forEach(s => { if (!s.paused) s.angle += s.speed * dt; });
    }

    function drawTrails(cx, cy){
      tctx.clearRect(0, 0, size, size);
      const base = links[0] ? links[0].offsetWidth : 56;
      for (const s of sats) {
        if (s.paused) continue;
        const radius = (size * (0.42 + s.ringIndex * 0.20)) / 2;
        const sg = s.speed > 0 ? 1 : -1;
        for (let k = 0; k < TRAIL_SEGMENTS; k++) {
          const f0 = k / TRAIL_SEGMENTS, f1 = (k + 1) / TRAIL_SEGMENTS;
          const a0 = s.angle - sg * TRAIL_SPAN * f0;
          const a1 = s.angle - sg * TRAIL_SPAN * f1;
          const fade = (1 - f0) * (1 - f0);
          // золото у головы → фиолетовый к хвосту
          const r = Math.round(255 - 90 * f0), g = Math.round(201 - 70 * f0), b = Math.round(74 + 170 * f0);
          tctx.strokeStyle = `rgba(${r},${g},${b},${(fade * 0.42).toFixed(3)})`;
          tctx.lineWidth = base * 0.30 * (1 - f0 * 0.85);
          tctx.beginPath();
          tctx.arc(cx, cy, radius, a0, a1, sg > 0);
          tctx.stroke();
        }
      }
    }

    function draw(){
      if (!size) return;
      const cx = size / 2, cy = size / 2;

      sats.forEach(s => {
        const radius = (size * (0.42 + s.ringIndex * 0.20)) / 2;
        s.x = cx + Math.cos(s.angle) * radius;
        s.y = cy + Math.sin(s.angle) * radius;
        s.scale = 1; s.z = 4; s.dim = 1;
      });

      // Попарная проверка близости (10 пар на 5 спутников — дёшево)
      for (let i = 0; i < sats.length; i++) {
        for (let j = i + 1; j < sats.length; j++) {
          const a = sats[i], b = sats[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < COLLIDE_DIST) {
            const front = a.y >= b.y ? a : b; // ниже на экране = «ближе»
            const back = front === a ? b : a;
            front.scale = Math.max(front.scale, 1.16);
            front.z = Math.max(front.z, 8);
            back.scale = Math.min(back.scale, 0.82);
            back.z = Math.min(back.z, 2);
            back.dim = Math.min(back.dim, 0.72);
          }
        }
      }

      sats.forEach(s => {
        if (s.paused) { s.scale = Math.max(s.scale, 1.1); s.z = 9; s.dim = 1; }
        s.el.style.left = s.x + 'px';
        s.el.style.top = s.y + 'px';
        s.el.style.zIndex = s.z;
        s.el.style.transform = `translate(-50%,-50%) scale(${s.scale})`;
        s.el.style.filter = s.dim < 1 ? `brightness(${s.dim})` : '';
      });

      if (tctx) drawTrails(cx, cy);
    }

    return { update, draw, resize };
  })();

  /* ==========================================================
     Planet — планета на странице «Ссылки» (только ПК: на телефоне
     .orbit-wrap скрыт, и canvas с нулевым размером не рисуется).
     Реальная трассировка лучей в фрагментном шейдере: аналитические
     пересечения луча со сферой и плоскостью кольца, тени кольца на
     планете и планеты на кольце, процедурный газовый гигант на fbm,
     дифференциальное вращение, атмосфера. Свет и наклон следуют за
     курсором. Рисуется только когда виден на экране; если кадры
     тяжёлые — разрешение холста автоматически снижается.
     Если WebGL недоступен, остаётся прежняя CSS-сфера.
     ========================================================== */
  const Planet = (() => {
    const core = document.querySelector('.orbit-core');
    const canvas = core ? core.querySelector('.planet-canvas') : null;
    const NOOP = { measure(){}, update(){}, draw(){} };
    if (!canvas) return NOOP;

    const VERT = 'attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }';
    const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime;
uniform float uSpin;
uniform mat3  uP;   // планета -> мир (столбцы)
uniform vec3  uL;   // направление на свет в мировых координатах

const float EXT = 2.6;    // полуразмер холста в радиусах планеты
const float RI  = 1.38;   // внутренний радиус кольца
const float RO  = 1.92;   // внешний радиус кольца

float hash11(float n){ return fract(sin(n * 127.1) * 43758.5453); }

float hash31(vec3 p){
  p = 50.0 * fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise3(vec3 x){
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash31(i),                  hash31(i + vec3(1.0,0.0,0.0)), f.x),
        mix(hash31(i + vec3(0.0,1.0,0.0)), hash31(i + vec3(1.0,1.0,0.0)), f.x), f.y),
    mix(mix(hash31(i + vec3(0.0,0.0,1.0)), hash31(i + vec3(1.0,0.0,1.0)), f.x),
        mix(hash31(i + vec3(0.0,1.0,1.0)), hash31(i + vec3(1.0,1.0,1.0)), f.x), f.y),
    f.z);
}

float fbm(vec3 p){
  float a = 0.5;
  float s = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * noise3(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    a *= 0.5;
  }
  return s;
}

// Плотность/прозрачность кольца на радиусе r (0 вне кольца)
// detail: 1 — полная зернистость (само кольцо), 0 — сглаженная плотность (для теней)
float ringAlpha(float r, float detail){
  float x = (r - RI) / (RO - RI);
  if (x <= 0.0 || x >= 1.0) return 0.0;
  float grain = mix(0.72, 0.45 + 0.55 * hash11(floor(x * 120.0)), detail);
  float bands = mix(0.78, 0.62 + 0.38 * sin(x * 38.0 + 2.0 * sin(x * 9.0)), detail);
  float d = grain * bands;
  d *= smoothstep(0.0, 0.05, x) * (1.0 - smoothstep(0.93, 1.0, x));
  float gap1 = 1.0 - smoothstep(0.0, 0.035, abs(x - 0.62) - 0.02);   // щель Кассини
  float gap2 = 1.0 - smoothstep(0.0, 0.020, abs(x - 0.30) - 0.008);
  d *= 1.0 - 0.95 * gap1;
  d *= 1.0 - 0.70 * gap2;
  d *= mix(1.0, 0.62, smoothstep(0.62, 0.95, x));
  return clamp(d * 1.15, 0.0, 0.92);
}

// Цвет поверхности газового гиганта в точке q (единичная сфера, система вращения)
vec3 albedo(vec3 q){
  float lat = q.y;
  // дифференциальное вращение: разные широты дрейфуют с разной скоростью
  float sh = uTime * 0.04 * (1.0 - 0.55 * lat * lat);
  float cs = cos(sh);
  float sn = sin(sh);
  vec3 w = vec3(cs * q.x + sn * q.z, q.y, -sn * q.x + cs * q.z);

  float t1 = fbm(vec3(w.x * 2.2, w.y * 5.5, w.z * 2.2) + 3.1);
  float t2 = fbm(w * vec3(3.5, 11.0, 3.5) + 7.7);
  float coord = lat * 5.2 + (t1 - 0.5) * 1.5;
  float band  = 0.5 + 0.5 * sin(coord * 4.4 + 1.2 * t2);
  float band2 = 0.5 + 0.5 * sin(coord * 9.7 + 1.7 + 2.0 * t1);

  vec3 c0 = vec3(0.16, 0.07, 0.38);   // глубокий фиолетовый
  vec3 c1 = vec3(0.55, 0.30, 0.92);   // фиолетовый
  vec3 c2 = vec3(0.86, 0.45, 0.95);   // сиреневый
  vec3 c3 = vec3(1.00, 0.80, 0.45);   // золото
  vec3 c4 = vec3(1.00, 0.93, 0.74);   // кремовый

  vec3 col = mix(c0, c1, smoothstep(0.12, 0.75, band));
  col = mix(col, c2, smoothstep(0.55, 0.95, band2) * 0.65);
  col = mix(col, c3, smoothstep(0.60, 0.90, t2) * 0.75 * (0.35 + 0.65 * band));
  col += c4 * smoothstep(0.72, 0.92, t1) * 0.16;
  col = mix(col, c0 * 0.75, smoothstep(0.72, 1.0, abs(lat)) * 0.7);   // тёмные полюса

  // Большое пятно-шторм, закреплено на поверхности
  vec3 sc = normalize(vec3(0.72, -0.30, 0.62));
  float d = acos(clamp(dot(q, sc), -1.0, 1.0));
  float spot = 1.0 - smoothstep(0.07, 0.30, d);
  if (spot > 0.0) {
    vec3 u = normalize(cross(sc, vec3(0.0, 1.0, 0.0)));
    vec3 v = cross(sc, u);
    float a = atan(dot(q, v), dot(q, u));
    float sw = 0.5 + 0.5 * sin(a * 2.0 + d * 26.0 - uTime * 0.5 + 3.0 * t2);
    vec3 sp = mix(vec3(0.92, 0.30, 0.58), c3, sw);
    col = mix(col, sp, spot * 0.82);
  }
  return col;
}

// Освещение поверхности: диффузия, мягкий терминатор, тень от кольца, блик, атмосфера
vec3 shadePlanet(vec3 p, vec3 rd, vec3 L){
  vec3 n = p;
  float cs = cos(uSpin);
  float sn = sin(uSpin);
  vec3 q = vec3(cs * p.x + sn * p.z, p.y, -sn * p.x + cs * p.z);
  vec3 alb = albedo(q);

  float ndl = dot(n, L);
  float lit = smoothstep(-0.08, 0.42, ndl);

  // Тень кольца: луч от точки к свету пересекает плоскость кольца (y = 0)
  float rs = 1.0;
  if (abs(L.y) > 1e-3) {
    float t = -p.y / L.y;
    if (t > 0.0) {
      vec3 qq = p + L * t;
      rs = 1.0 - 0.88 * ringAlpha(length(qq.xz), 0.0);
    }
  }

  vec3 V = -rd;
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(n, H), 0.0), 42.0) * 0.20 * lit * rs;
  float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
  float tw = smoothstep(-0.18, 0.0, ndl) * (1.0 - smoothstep(0.0, 0.38, ndl));

  vec3 amb = vec3(0.50, 0.38, 1.0) * 0.06;
  vec3 col = alb * (amb + vec3(1.0, 0.95, 0.88) * 1.18 * lit * rs);
  col += alb * vec3(0.85, 0.28, 0.55) * tw * 0.30 * rs;
  col += vec3(1.0, 0.92, 0.8) * spec;
  col += vec3(0.58, 0.46, 1.0) * fres * (0.16 + 0.95 * smoothstep(-0.35, 0.55, ndl));
  return col;
}

// Кольцо: цвет, тень планеты (луч к свету пересекает сферу), премультиплицированный результат
vec4 shadeRing(vec3 q, float r, float a, vec3 L){
  float x = (r - RI) / (RO - RI);
  vec3 base = mix(vec3(0.98, 0.80, 0.52), vec3(0.72, 0.60, 0.98), smoothstep(0.0, 1.0, x));
  base = mix(base, vec3(1.0, 0.93, 0.78), 0.25 * hash11(floor(x * 60.0)));

  float b = dot(q, L);
  float s = b * b - (dot(q, q) - 1.0);          // > 0: луч к свету попадает в планету
  float shadow = (b < 0.0) ? smoothstep(-0.03, 0.06, s) : 0.0;
  float lightK = mix(0.5, 1.0, smoothstep(0.0, 0.35, abs(L.y)));
  float lit = lightK * (1.0 - 0.93 * shadow);

  vec3 col = base * (0.10 + lit);
  return vec4(col * a, a);
}

vec4 over(vec4 a, vec4 b){ return a + b * (1.0 - a.a); }

void main(){
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y * EXT;

  // Камера в мировых координатах: (0,0,9) смотрит в -Z; переводим луч в систему планеты
  vec3 ro = vec3(0.0, 0.0, 9.0) * uP;
  vec3 rd = normalize(vec3(uv, -9.0)) * uP;
  vec3 L  = normalize(uL * uP);
  float pw = 2.0 * EXT / uRes.y;                // размер пикселя в мировых единицах

  // Ближайшая точка луча к центру планеты
  float tc = -dot(ro, rd);
  vec3 cp = ro + rd * tc;
  float dmin = length(cp);
  float h = dmin - 1.0;

  // Атмосферное гало вокруг планеты (смесь фиолет/золото, ярче со стороны света)
  float side = dot(cp / max(dmin, 1e-3), L) * 0.5 + 0.5;
  float ga = exp(-max(h, 0.0) * 4.2) * 0.5 * (0.10 + 0.90 * side * side);
  ga *= 1.0 - smoothstep(0.80, 1.0, max(abs(uv.x), abs(uv.y)) / EXT);
  vec3 gc = mix(vec3(0.38, 0.20, 0.95), vec3(1.0, 0.76, 0.42), pow(side, 4.0) * 0.65);
  vec4 G = vec4(gc * ga, ga * 0.30);

  // Сфера: аналитическое пересечение; край сглажен покрытием (без MSAA)
  float cov = clamp(0.5 - h / pw, 0.0, 1.0);
  float ts = 1e9;
  vec4 S = vec4(0.0);
  if (cov > 0.0) {
    ts = tc - sqrt(max(1.0 - dmin * dmin, 0.0));
    vec3 p = normalize(ro + rd * ts);
    S = vec4(shadePlanet(p, rd, L) * cov, cov);
  }

  // Кольцо: пересечение луча с плоскостью y = 0
  vec4 R = vec4(0.0);
  float tr = 1e9;
  if (abs(rd.y) > 1e-4) {
    float t = -ro.y / rd.y;
    if (t > 0.0) {
      vec3 pr = ro + rd * t;
      float r = length(pr.xz);
      float a = ringAlpha(r, 1.0);
      if (a > 0.003) { tr = t; R = shadeRing(pr, r, a, L); }
    }
  }

  // Порядок слоёв по глубине
  bool ringFront = (R.a > 0.0) && (cov <= 0.0 || tr < ts);
  vec4 o = ringFront ? over(R, over(S, G)) : over(S, over(R, G));

  // Дизеринг против бэндинга градиентов
  o.rgb += (hash31(vec3(gl_FragCoord.xy, 1.0)) - 0.5) / 255.0 * step(0.002, o.a);
  gl_FragColor = o;
}
`;

    let gl = null, U = null, ok = false;
    let visible = false, needs = true;
    let quality = 1, cssSize = 0, slow = 0, ema = 1 / 60;

    // состояние сцены (всё плавно догоняет цель)
    let time = 0, spin = 0;
    let lx = -0.7, ly = 0.5, lz = 0.6;
    let ax = 0.42, az = 0.30;
    let cx = 0, cy = 0;                 // центр холста в координатах окна
    const P = new Float32Array(9);

    function compile(type, src){
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('[planet] shader:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    function init(){
      gl = canvas.getContext('webgl', {
        alpha: true, premultipliedAlpha: true, antialias: false,
        depth: false, stencil: false, powerPreference: 'high-performance'
      });
      if (!gl) return false;
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return false;
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('[planet] link:', gl.getProgramInfoLog(prog));
        return false;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);   // один треугольник на весь экран
      const loc = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      U = {
        res:  gl.getUniformLocation(prog, 'uRes'),
        time: gl.getUniformLocation(prog, 'uTime'),
        spin: gl.getUniformLocation(prog, 'uSpin'),
        P:    gl.getUniformLocation(prog, 'uP'),
        L:    gl.getUniformLocation(prog, 'uL')
      };
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);
      core.classList.add('planet-ready');
      resizeCanvas();
      return true;
    }

    function resizeCanvas(){
      cssSize = canvas.clientWidth;
      if (!cssSize || !gl) return;
      const px = Math.max(96, Math.round(cssSize * Math.min(window.devicePixelRatio || 1, 2) * quality));
      if (canvas.width !== px) {
        canvas.width = canvas.height = px;
        gl.viewport(0, 0, px, px);
      }
      needs = true;
    }

    ok = init();
    if (!ok) return NOOP;

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      ok = false;
      core.classList.remove('planet-ready');     // вернётся CSS-сфера
    });
    canvas.addEventListener('webglcontextrestored', () => { ok = init(); needs = true; });

    if ('ResizeObserver' in window) new ResizeObserver(resizeCanvas).observe(canvas);
    window.addEventListener('resize', resizeCanvas, { passive: true });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1].isIntersecting;
        needs = true;
      }).observe(canvas);
    } else {
      visible = true;
    }

    // Чтение геометрии — в начале кадра, до записей стилей (без принудительного layout)
    function measure(){
      if (!ok || !visible) return;
      const r = canvas.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
    }

    function update(dt){
      if (!ok || !visible) return;

      time += dt;
      spin = (spin + dt * 0.16) % (Math.PI * 2);

      let tx, ty, tz, tax, taz;
      if (Pointer.active && Pointer.type !== 'touch') {
        const dx = Pointer.x - cx, dy = Pointer.y - cy;
        tx = clamp(dx / 420, -1.3, 1.3);
        ty = clamp(-dy / 420, -1.3, 1.3);
        tz = 0.62;
        tax = 0.42 - clamp(dy / window.innerHeight, -1, 1) * 0.16;
        taz = 0.30 + clamp(dx / window.innerWidth, -1, 1) * 0.14;
      } else {
        const a = time * 0.12;                  // без курсора свет медленно «дышит»
        tx = -0.7 + Math.sin(a) * 0.15;
        ty = 0.5 + Math.cos(a * 0.8) * 0.1;
        tz = 0.6; tax = 0.42; taz = 0.30;
      }
      const k = 1 - Math.exp(-dt * 5);
      lx += (tx - lx) * k; ly += (ty - ly) * k; lz += (tz - lz) * k;
      ax += (tax - ax) * k; az += (taz - az) * k;

      // Адаптивное качество: при стабильно тяжёлых кадрах снижаем разрешение холста
      ema += (dt - ema) * 0.05;
      if (ema > 0.026) {
        if (++slow > 90 && quality > 0.55) { quality -= 0.15; slow = 0; ema = 1 / 60; resizeCanvas(); }
      } else {
        slow = 0;
      }
      needs = true;
    }

    function draw(){
      if (!ok || !visible || !needs || !cssSize) return;
      needs = false;

      // Матрица «планета → мир» = Rz(az)·Rx(ax), столбцами (column-major)
      const cX = Math.cos(ax), sX = Math.sin(ax), cZ = Math.cos(az), sZ = Math.sin(az);
      P[0] = cZ;       P[1] = sZ;        P[2] = 0;
      P[3] = -sZ * cX; P[4] = cZ * cX;   P[5] = sX;
      P[6] = sZ * sX;  P[7] = -cZ * sX;  P[8] = cX;

      const len = Math.hypot(lx, ly, lz) || 1;
      gl.uniform2f(U.res, canvas.width, canvas.height);
      gl.uniform1f(U.time, time);
      gl.uniform1f(U.spin, spin);
      gl.uniformMatrix3fv(U.P, false, P);
      gl.uniform3f(U.L, lx / len, ly / len, lz / len);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    return { measure, update, draw };
  })();

  /* ==========================================================
     Master loop — один requestAnimationFrame на все эффекты,
     реальное прошедшее время (dt). Сначала читаем геометрию,
     потом пишем стили — так не возникает лишних layout'ов.
     ========================================================== */
  function startMasterLoop(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = performance.now();
    let raf = null;

    function tick(now){
      let dt = (now - last) / 1000;
      last = now;
      // ограничиваем dt, чтобы после переключения вкладки всё не «улетало»
      dt = Math.min(dt, 1 / 20);

      Planet.measure();                      // чтения
      ScrollFX.update(dt);

      if (!reduceMotion) {
        Starfield.update(dt);
        Orbit.update(dt);
        TerminalFX.update(dt);
        CursorGlow.update(dt);
        Planet.update(dt);
        ScrollFX.applyBlur();
      }
      Starfield.draw();
      Orbit.draw();
      Planet.draw();

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
  }

  /* ==========================================================
     Init
     ========================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(currentLang, false);
    initLangToggle();
    initReveal();
    startMasterLoop();
  });
})();
