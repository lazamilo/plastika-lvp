(function () {
  // Brizgalni stroji, povzeto po strani Tehnologija (zapiralna sila v t, največja masa brizga PS v g)
  var M = [
    ['Arburg 520-2000', 'Arburg Multilift robot', 200, 350, 1],
    ['Chen Hsong 168', 'Wittmann robot', 168, 400, 1],
    ['Arburg 470-1500-400C ASH', 'Wittmann robot', 150, 184, 1],
    ['Battenfeld 150/750', 'Wittmann robot', 150, 287, 1],
    ['Battenfeld Smart Power 120', 'Fanuc robot', 120, 220, 1],
    ['Arburg 420-1000-290C', 'Wittmann robot', 100, 132, 1],
    ['Arburg 420-1000-290C', '', 100, 132, 1],
    ['Wittmann Smart Power 90', 'Wittmann robot', 90, 180, 1],
    ['Battenfeld Smart Power 90', 'Wittmann robot', 90, 180, 1],
    ['KraussMaffei KM 80-380 CX', 'Robot', 80, 180, 1],
    ['Battenfeld Smart Power 60', 'Wittmann robot', 60, 120, 2],
    ['Arburg 320C-500-170', 'Wittmann robot', 50, 109, 1],
    ['Arburg 320C-500-170', 'Sepro robot', 50, 77, 1],
    ['Arburg 320-500-170', 'Wittmann robot', 50, 50, 2],
    ['Battenfeld HM 45/130', 'Robot', 45, 40, 1],
    ['Arburg 270-400-70C ASH', '', 40, 40, 1],
    ['Battenfeld 250/230', 'Robot', 25, 64, 1]
  ];
  document.querySelectorAll('table[data-machines]').forEach(function (t) {
    var rows = M.map(function (m) {
      return '<tr data-t="' + m[2] + '"><td>' + m[0] + (m[4] > 1 ? ' <span class="muted">× ' + m[4] + '</span>' : '') +
        '<span class="sub">' + (m[1] ? '+ ' + m[1] : 'Samostojna enota') + '</span></td>' +
        '<td class="r">' + m[2] + ' t<span class="bar"><i data-v="' + (m[2] / 200).toFixed(3) + '"></i></span></td>' +
        '<td class="r">' + m[3] + ' g</td></tr>';
    }).join('');
    t.innerHTML = '<thead><tr><th>Stroj</th><th>Zapiralna sila</th><th>Največja masa brizga (PS)</th></tr></thead><tbody>' + rows + '</tbody>';
  });
})();
