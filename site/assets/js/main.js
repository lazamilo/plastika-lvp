(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = window.gsap && window.ScrollTrigger;
  if (reduced || !hasGsap) root.classList.add('reduced');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* smooth scroll */
  var lenis;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })();
    }
    document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var url = new URL(el.href, location.href);
        if (url.pathname !== location.pathname || !url.hash) return;
        var target = document.querySelector(url.hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -140 });
      });
    });
  }
  if (location.hash) {
    window.addEventListener('load', function () {
      var t = document.querySelector(location.hash);
      if (t) setTimeout(function () { lenis ? lenis.scrollTo(t, { offset: -140, immediate: true }) : t.scrollIntoView(); }, 60);
    });
  }

  /* header state */
  var hdr = document.getElementById('hdr');
  var darkZones = [].slice.call(document.querySelectorAll('[data-dark]'));
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    var overDark = darkZones.some(function (z) { var r = z.getBoundingClientRect(); return r.top <= 40 && r.bottom > 60; });
    hdr.classList.toggle('on-dark', overDark);
    hdr.classList.toggle('solid', y > 60 && !overDark);
    hdr.classList.toggle('hide', y > lastY && y > 400 && !root.classList.contains('menu-open'));
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* split headings into masked words */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="line" style="display:inline-block"><span>' + w + '</span></span>'; }).join(' ');
  });

  /* loader + hero intro */
  var loader = document.querySelector('.loader');
  function intro() {
    if (!hasGsap || reduced) { root.classList.add('loaded'); return; }
    var heroWords = document.querySelectorAll('.hero h1 .line > span');
    var tl = gsap.timeline();
    if (loader) {
      tl.from('.loader img', { scale: 0.6, autoAlpha: 0, duration: 0.7, ease: 'expo.out' })
        .to('.loader img', { scale: 0.92, duration: 0.5, ease: 'power2.inOut' })
        .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut', onComplete: function () { root.classList.add('loaded'); } })
        .from('.hero-media', { scale: 1.18, duration: 1.8, ease: 'expo.out' }, '-=0.7');
    }
    if (heroWords.length) tl.from(heroWords, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, loader ? '-=1.5' : 0.1);
    tl.from('.hero-side > *', { y: 30, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 }, '-=0.8');
    tl.fromTo('#hdr', { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out', clearProps: 'transform,opacity,visibility' }, '-=0.9');
  }
  if (loader && sessionStorage.getItem('lvp-intro')) { loader.remove(); loader = null; }
  if (loader) sessionStorage.setItem('lvp-intro', '1');
  intro();

  /* page hero words (subpages) */
  if (hasGsap && !reduced) {
    var ph = document.querySelectorAll('.phero h1 .line > span');
    if (ph.length) gsap.from(ph, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.05, delay: 0.1 });
  }

  if (!hasGsap || reduced) { setupStatic(); return; }

  /* split headings outside hero reveal on scroll */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    if (el.closest('.hero') || el.closest('.phero')) return;
    gsap.from(el.querySelectorAll('.line > span'), {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* generic reveals */
  ScrollTrigger.batch('.rv', {
    start: 'top 90%',
    onEnter: function (els) { gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }); }
  });

  /* parallax inside frames */
  document.querySelectorAll('[data-par]').forEach(function (img) {
    var amt = parseFloat(img.dataset.par) || 10;
    gsap.fromTo(img, { yPercent: -amt }, {
      yPercent: amt, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* hero scroll out */
  if (document.querySelector('.hero')) {
    gsap.to('.hero-media', { yPercent: 18, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero-in', { yPercent: -30, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true } });
  }

  /* statement word fill */
  document.querySelectorAll('[data-fill]').forEach(function (p) {
    var words = p.textContent.trim().split(/\s+/);
    p.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    var ws = p.querySelectorAll('.w');
    gsap.to(ws, {
      color: '#121416', stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 45%', scrub: true }
    });
  });

  /* counters */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count), obj = { v: 0 };
    var sup = el.querySelector('sup'); var supHtml = sup ? sup.outerHTML : '';
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: function () {
        gsap.to(obj, { v: end, duration: 2, ease: 'power3.out', onUpdate: function () { el.innerHTML = Math.round(obj.v) + supHtml; } });
      }
    });
  });

  /* tiles stagger */
  if (document.querySelector('.tiles')) {
    gsap.from('.tile', { y: 80, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.tiles', start: 'top 85%' } });
  }

  /* process sticky steps */
  var imgs = document.querySelectorAll('.process .stick > *');
  var steps = [].slice.call(document.querySelectorAll('.process .step'));
  var activeStep = -1;
  function pickStep() {
    var mid = window.innerHeight * 0.5, best = 0, bestD = Infinity;
    steps.forEach(function (s, i) {
      var r = s.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    if (best === activeStep) return;
    activeStep = best;
    steps.forEach(function (s, i) { s.classList.toggle('on', i === best); });
    imgs.forEach(function (im, j) { im.classList.toggle('on', j === best); });
  }
  if (steps.length) { window.addEventListener('scroll', pickStep, { passive: true }); pickStep(); }

  /* machine bars */
  document.querySelectorAll('.mtable').forEach(function (t) {
    ScrollTrigger.create({ trigger: t, start: 'top 80%', once: true, onEnter: function () { t.classList.add('bars-on'); fillBars(t); } });
  });

  /* timeline */
  if (document.querySelector('.tl')) {
    gsap.from('.tl > div', { y: 60, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.tl', start: 'top 82%' } });
  }

  /* certificates */
  if (document.querySelector('.certs')) {
    gsap.from('.certs figure', { y: 120, autoAlpha: 0, duration: 1.3, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.certs', start: 'top 85%' } });
  }

  /* big footer word */
  gsap.from('.bigword', { yPercent: 40, autoAlpha: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.bigword', start: 'top 98%' } });

  setupCommon();
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });

  function fillBars(t) {
    t.querySelectorAll('.bar i').forEach(function (b) { b.style.setProperty('--v', b.dataset.v); });
  }
  function setupStatic() {
    root.classList.add('loaded');
    document.querySelectorAll('.mtable').forEach(fillBars);
    document.querySelectorAll('.process .stick > *').forEach(function (im, j) { im.classList.toggle('on', j === 0); });
    document.querySelectorAll('.process .step').forEach(function (s) { s.classList.add('on'); });
    setupCommon();
  }
  function setupCommon() {
    /* machine filter */
    document.querySelectorAll('.filters').forEach(function (f) {
      var table = document.querySelector(f.dataset.for);
      f.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        f.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
        var r = b.dataset.range.split('-').map(Number);
        table.querySelectorAll('tbody tr').forEach(function (tr) {
          var t = Number(tr.dataset.t);
          tr.classList.toggle('hidden', !(t >= r[0] && t <= r[1]));
        });
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    });
    /* product category nav highlight */
    var catLinks = document.querySelectorAll('.cat-nav a');
    if (catLinks.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.isIntersecting) catLinks.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      document.querySelectorAll('.cat').forEach(function (c) { io.observe(c); });
    }
    /* contact form */
    document.querySelectorAll('form.form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (inp) {
          var bad = !inp.value.trim() || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(inp.value));
          inp.closest('.field').classList.toggle('err', bad);
          if (bad) ok = false;
        });
        if (ok) form.classList.add('sent');
      });
    });
  }
})();
