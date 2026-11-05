(function () {
  var page = document.body.dataset.page || '';
  var cats = [
    { id: 'bela-tehnika', name: 'Bela tehnika', sub: 'Polizdelki za gospodinjske aparate', img: 'izdelki-bela-tehnika-02.jpg' },
    { id: 'merilna-tehnika', name: 'Merilna tehnika', sub: 'Deli za vodne tehtnice in letve', img: 'merilna-tehnika1.jpg' },
    { id: 'medicina', name: 'Medicinski polizdelki', sub: 'Kromirani deli iz ABS', img: 'medicina1.jpg' },
    { id: 'lastni', name: 'Lastni izdelki', sub: 'PE, PP, POM in 2K izdelki', img: 'lastni-izdelki1.jpg' }
  ];
  function a(href, label, key, cls) {
    return '<a href="' + href + '" class="' + (cls || '') + (page === key ? ' active' : '') + '">' + label + '</a>';
  }
  var mega = '<div class="mega"><div><h3>Izdelki po meri naročnika</h3><p>Brizgamo plastične izdelke in polizdelke iz termoplastov in TPE, z digitalnim tiskom in tampotiskom.</p><p style="margin-top:22px"><a class="link" href="izdelki.html" style="color:var(--ink)">Vsi izdelki <span>→</span></a></p></div>' +
    cats.map(function (c) {
      return '<a class="item" href="izdelki.html#' + c.id + '"><div class="ph"><img src="assets/img/' + c.img + '" alt="' + c.name + '" loading="lazy"></div><b>' + c.name + '</b><span>' + c.sub + '</span></a>';
    }).join('') + '</div>';

  var hdr = '<header class="hdr" id="hdr">' +
    '<a class="logo" href="index.html" aria-label="LVP domov"><img src="assets/img/logo.png" alt="LVP d.o.o."></a>' +
    '<nav class="nav">' +
      '<div class="has-mega">' + a('izdelki.html', 'Izdelki', 'izdelki') + mega + '</div>' +
      a('tehnologija.html', 'Tehnologija', 'tehnologija') +
      a('kakovost.html', 'Kakovost', 'kakovost') +
      a('o-nas.html', 'O nas', 'o-nas') +
      a('kontakt.html', 'Kontakt', 'kontakt', 'hide-md') +
      '<span class="lang hide-md"><b>SI</b><button data-toast="Angleška različica je v pripravi.">EN</button><button data-toast="Nemška različica je v pripravi.">DE</button></span>' +
      '<a href="kontakt.html#povprasevanje" class="cta">Povpraševanje</a>' +
    '</nav>' +
    '<button class="burger" aria-label="Meni"><span></span><span></span></button>' +
  '</header>' +
  '<div class="mnav"><div>' +
    '<a href="index.html">Domov</a><a href="izdelki.html">Izdelki</a><a href="tehnologija.html">Tehnologija</a><a href="kakovost.html">Kakovost</a><a href="o-nas.html">O nas</a><a href="kontakt.html">Kontakt</a>' +
  '</div><div class="sub">+386 2 82 40 470<br>matej.lvp@siol.net<br>Dobja vas 251, 2390 Ravne na Koroškem</div></div>';

  var ftr = '<section class="cta-sec">' +
      '<h2 class="d2" data-split>Imate del, ki ga je treba izdelati?</h2>' +
      '<div class="row rv"><a class="btn teal-b" href="kontakt.html#povprasevanje">Pošljite povpraševanje <span class="arr">→</span></a><a class="btn light" href="tel:+38631589330">+386 31 589 330</a></div>' +
    '</section>' +
    '<footer class="ftr">' +
      '<div class="fcols">' +
        '<div><h4>Podjetje</h4><p>L.V.P. d.o.o.<br>Proizvodnja plastičnih predmetov<br>in kartonske embalaže</p></div>' +
        '<div><h4>Proizvodnja</h4><p>Dobja vas 251<br>2390 Ravne na Koroškem</p><a href="o-nas.html#lokacija" class="link" style="display:inline-flex;margin-top:8px">Kako do nas →</a></div>' +
        '<div><h4>Kontakt</h4><a href="tel:+38628240470">+386 2 82 40 470</a><a href="tel:+38631589330">+386 31 589 330</a><a href="mailto:matej.lvp@siol.net">matej.lvp@siol.net</a></div>' +
        '<div><h4>Izdelki</h4>' + cats.map(function (c) { return '<a href="izdelki.html#' + c.id + '">' + c.name + '</a>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="bigword" aria-hidden="true">Plastika LVP</div>' +
      '<div class="fbot"><span>© 2026 LVP d.o.o. · Davčna št. SI46067167 · Matična št. 5678722000</span><span><a href="#">Pogoji uporabe</a> · <a href="#">Politika zasebnosti</a></span></div>' +
    '</footer><div class="toast" id="toast"></div>';

  document.body.insertAdjacentHTML('afterbegin', hdr);
  var slot = document.getElementById('footer-slot');
  if (slot) slot.outerHTML = ftr; else document.body.insertAdjacentHTML('beforeend', ftr);

  document.querySelector('.burger').addEventListener('click', function () {
    document.documentElement.classList.toggle('menu-open');
  });
  document.querySelectorAll('.mnav a').forEach(function (el) {
    el.addEventListener('click', function () { document.documentElement.classList.remove('menu-open'); });
  });
  var toast = document.getElementById('toast'), tt;
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toast]');
    if (!t) return;
    toast.textContent = t.dataset.toast;
    toast.classList.add('on');
    clearTimeout(tt);
    tt = setTimeout(function () { toast.classList.remove('on'); }, 2400);
  });
})();
