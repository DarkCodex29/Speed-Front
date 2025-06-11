function format(e, t, r) {
  return (e || '') + (t ? ' '.concat(t) : '') + (r ? ' '.concat(r) : '');
}
function getPresentValue(e) {
  var t = e.target;
  var r = t.value;
  var a = t.selectionStart;
  var n = r.substring(0, a) + e.key + r.substring(a);
  return n;
}
function removeDoubleSpaces(e) {
  return e.replace(/\s{2,}/g, ' ');
}
function getValueByPath(e, t) {
  if (t.length === 1) {
    return e[t[0]];
  }
  var r = t[0];
  var a = e[r];
  if (a) {
    return getValueByPath(a, t.slice(1));
  }
  return '';
}
export { getPresentValue as a, format as f, getValueByPath as g, removeDoubleSpaces as r };
//# sourceMappingURL=utils-d44f9774.js.map
