/*
 * チーム名の置き換えロジック（ブラウザ・Nodeテスト共通）
 * 「Aチーム」→「Dチーム」、「A-1」→「D-1」を、複数の組を同時に1回で置き換える（連鎖置換しない）
 */
(function (root) {
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  // pairs: [{from:'A', to:'D'}, ...]
  function buildReplacer(pairs) {
    var list = pairs.filter(function (p) { return p.from && p.to && p.from !== p.to; });
    if (!list.length) return null;
    var map = {};
    list.forEach(function (p) { map[p.from] = p.to; });
    // 長い名前を先に（「AB」と「A」が両方ある場合の誤一致防止）
    var keys = Object.keys(map).sort(function (a, b) { return b.length - a.length; }).map(esc).join('|');
    var re = new RegExp('(^|[^A-Za-z0-9])(' + keys + ')(チーム|-(\\d+))(?![A-Za-z0-9])', 'g');
    return function (text) {
      var n = 0;
      var out = String(text).replace(re, function (m, pre, key, suf) { n++; return pre + map[key] + suf; });
      return { text: out, count: n };
    };
  }
  var api = { buildReplacer: buildReplacer };
  if (typeof module !== 'undefined') module.exports = api; else root.TeamRename = api;
})(this);
