const t = 'hdc-wc';
let e;
let n;
let s = false;
let l = false;
const o = (t, e = '') => {
  {
    return () => {};
  }
};
const c = (t, e) => {
  {
    return () => {};
  }
};
const i = '{visibility:hidden}.hydrated{visibility:inherit}';
const f = {};
const r = 'http://www.w3.org/2000/svg';
const u = 'http://www.w3.org/1999/xhtml';
const a = (t) => t != null;
const d = (t) => {
  t = typeof t;
  return t === 'object' || t === 'function';
};
function h(t) {
  var e, n, s;
  return (s =
    (n = (e = t.head) === null || e === void 0 ? void 0 : e.querySelector('meta[name="csp-nonce"]')) === null || n === void 0
      ? void 0
      : n.getAttribute('content')) !== null && s !== void 0
    ? s
    : undefined;
}
const p = (t, e, ...n) => {
  let s = null;
  let l = null;
  let o = false;
  let c = false;
  const i = [];
  const f = (e) => {
    for (let n = 0; n < e.length; n++) {
      s = e[n];
      if (Array.isArray(s)) {
        f(s);
      } else if (s != null && typeof s !== 'boolean') {
        if ((o = typeof t !== 'function' && !d(s))) {
          s = String(s);
        }
        if (o && c) {
          i[i.length - 1].t += s;
        } else {
          i.push(o ? y(null, s) : s);
        }
        c = o;
      }
    }
  };
  f(n);
  if (e) {
    if (e.key) {
      l = e.key;
    }
    {
      const t = e.className || e.class;
      if (t) {
        e.class =
          typeof t !== 'object'
            ? t
            : Object.keys(t)
                .filter((e) => t[e])
                .join(' ');
      }
    }
  }
  const r = y(t, null);
  r.l = e;
  if (i.length > 0) {
    r.o = i;
  }
  {
    r.i = l;
  }
  return r;
};
const y = (t, e) => {
  const n = { u: 0, h: t, t: e, p: null, o: null };
  {
    n.l = null;
  }
  {
    n.i = null;
  }
  return n;
};
const m = {};
const b = (t) => t && t.h === m;
const w = (t, e) => {
  if (t != null && !d(t)) {
    if (e & 4) {
      return t === 'false' ? false : t === '' || !!t;
    }
    if (e & 2) {
      return parseFloat(t);
    }
    if (e & 1) {
      return String(t);
    }
    return t;
  }
  return t;
};
const $ = (t) => ut(t).m;
const v = (t, e, n) => {
  const s = $(t);
  return { emit: (t) => g(s, e, { bubbles: !!(n & 4), composed: !!(n & 2), cancelable: !!(n & 1), detail: t }) };
};
const g = (t, e, n) => {
  const s = vt.ce(e, n);
  t.dispatchEvent(s);
  return s;
};
const S = new WeakMap();
const j = (t, e, n) => {
  let s = bt.get(t);
  if (St && n) {
    s = s || new CSSStyleSheet();
    if (typeof s === 'string') {
      s = e;
    } else {
      s.replaceSync(e);
    }
  } else {
    s = e;
  }
  bt.set(t, s);
};
const O = (t, e, n) => {
  var s;
  const l = M(e);
  const o = bt.get(l);
  t = t.nodeType === 11 ? t : $t;
  if (o) {
    if (typeof o === 'string') {
      t = t.head || t;
      let e = S.get(t);
      let n;
      if (!e) {
        S.set(t, (e = new Set()));
      }
      if (!e.has(l)) {
        {
          n = $t.createElement('style');
          n.innerHTML = o;
          const e = (s = vt.$) !== null && s !== void 0 ? s : h($t);
          if (e != null) {
            n.setAttribute('nonce', e);
          }
          t.insertBefore(n, t.querySelector('link'));
        }
        if (e) {
          e.add(l);
        }
      }
    } else if (!t.adoptedStyleSheets.includes(o)) {
      t.adoptedStyleSheets = [...t.adoptedStyleSheets, o];
    }
  }
  return l;
};
const k = (t) => {
  const e = t.v;
  const n = t.m;
  const s = e.u;
  const l = o('attachStyles', e.g);
  const c = O(n.shadowRoot ? n.shadowRoot : n.getRootNode(), e);
  if (s & 10) {
    n['s-sc'] = c;
    n.classList.add(c + '-h');
  }
  l();
};
const M = (t, e) => 'sc-' + t.g;
const C = (t, e, n, s, l, o) => {
  if (n !== s) {
    let c = ht(t, e);
    let i = e.toLowerCase();
    if (e === 'class') {
      const e = t.classList;
      const l = U(n);
      const o = U(s);
      e.remove(...l.filter((t) => t && !o.includes(t)));
      e.add(...o.filter((t) => t && !l.includes(t)));
    } else if (e === 'style') {
      {
        for (const e in n) {
          if (!s || s[e] == null) {
            if (e.includes('-')) {
              t.style.removeProperty(e);
            } else {
              t.style[e] = '';
            }
          }
        }
      }
      for (const e in s) {
        if (!n || s[e] !== n[e]) {
          if (e.includes('-')) {
            t.style.setProperty(e, s[e]);
          } else {
            t.style[e] = s[e];
          }
        }
      }
    } else if (e === 'key');
    else if (!c && e[0] === 'o' && e[1] === 'n') {
      if (e[2] === '-') {
        e = e.slice(3);
      } else if (ht(wt, i)) {
        e = i.slice(2);
      } else {
        e = i[2] + e.slice(3);
      }
      if (n) {
        vt.rel(t, e, n, false);
      }
      if (s) {
        vt.ael(t, e, s, false);
      }
    } else {
      const i = d(s);
      if ((c || (i && s !== null)) && !l) {
        try {
          if (!t.tagName.includes('-')) {
            const l = s == null ? '' : s;
            if (e === 'list') {
              c = false;
            } else if (n == null || t[e] != l) {
              t[e] = l;
            }
          } else {
            t[e] = s;
          }
        } catch (t) {}
      }
      if (s == null || s === false) {
        if (s !== false || t.getAttribute(e) === '') {
          {
            t.removeAttribute(e);
          }
        }
      } else if ((!c || o & 4 || l) && !i) {
        s = s === true ? '' : s;
        {
          t.setAttribute(e, s);
        }
      }
    }
  }
};
const P = /\s/;
const U = (t) => (!t ? [] : t.split(P));
const x = (t, e, n, s) => {
  const l = e.p.nodeType === 11 && e.p.host ? e.p.host : e.p;
  const o = (t && t.l) || f;
  const c = e.l || f;
  {
    for (s in o) {
      if (!(s in c)) {
        C(l, s, o[s], undefined, n, e.u);
      }
    }
  }
  for (s in c) {
    C(l, s, o[s], c[s], n, e.u);
  }
};
const E = (t, n, l, o) => {
  const c = n.o[l];
  let i = 0;
  let f;
  let d;
  if (c.t !== null) {
    f = c.p = $t.createTextNode(c.t);
  } else {
    if (!s) {
      s = c.h === 'svg';
    }
    f = c.p = $t.createElementNS(s ? r : u, c.h);
    if (s && c.h === 'foreignObject') {
      s = false;
    }
    {
      x(null, c, s);
    }
    if (a(e) && f['s-si'] !== e) {
      f.classList.add((f['s-si'] = e));
    }
    if (c.o) {
      for (i = 0; i < c.o.length; ++i) {
        d = E(t, c, i);
        if (d) {
          f.appendChild(d);
        }
      }
    }
    {
      if (c.h === 'svg') {
        s = false;
      } else if (f.tagName === 'foreignObject') {
        s = true;
      }
    }
  }
  return f;
};
const N = (t, e, s, l, o, c) => {
  let i = t;
  let f;
  if (i.shadowRoot && i.tagName === n) {
    i = i.shadowRoot;
  }
  for (; o <= c; ++o) {
    if (l[o]) {
      f = E(null, s, o);
      if (f) {
        l[o].p = f;
        i.insertBefore(f, e);
      }
    }
  }
};
const T = (t, e, n) => {
  for (let s = e; s <= n; ++s) {
    const e = t[s];
    if (e) {
      const t = e.p;
      if (t) {
        t.remove();
      }
    }
  }
};
const W = (t, e, n, s) => {
  let l = 0;
  let o = 0;
  let c = 0;
  let i = 0;
  let f = e.length - 1;
  let r = e[0];
  let u = e[f];
  let a = s.length - 1;
  let d = s[0];
  let h = s[a];
  let p;
  let y;
  while (l <= f && o <= a) {
    if (r == null) {
      r = e[++l];
    } else if (u == null) {
      u = e[--f];
    } else if (d == null) {
      d = s[++o];
    } else if (h == null) {
      h = s[--a];
    } else if (A(r, d)) {
      F(r, d);
      r = e[++l];
      d = s[++o];
    } else if (A(u, h)) {
      F(u, h);
      u = e[--f];
      h = s[--a];
    } else if (A(r, h)) {
      F(r, h);
      t.insertBefore(r.p, u.p.nextSibling);
      r = e[++l];
      h = s[--a];
    } else if (A(u, d)) {
      F(u, d);
      t.insertBefore(u.p, r.p);
      u = e[--f];
      d = s[++o];
    } else {
      c = -1;
      {
        for (i = l; i <= f; ++i) {
          if (e[i] && e[i].i !== null && e[i].i === d.i) {
            c = i;
            break;
          }
        }
      }
      if (c >= 0) {
        y = e[c];
        if (y.h !== d.h) {
          p = E(e && e[o], n, c);
        } else {
          F(y, d);
          e[c] = undefined;
          p = y.p;
        }
        d = s[++o];
      } else {
        p = E(e && e[o], n, o);
        d = s[++o];
      }
      if (p) {
        {
          r.p.parentNode.insertBefore(p, r.p);
        }
      }
    }
  }
  if (l > f) {
    N(t, s[a + 1] == null ? null : s[a + 1].p, n, s, o, a);
  } else if (o > a) {
    T(e, l, f);
  }
};
const A = (t, e) => {
  if (t.h === e.h) {
    {
      return t.i === e.i;
    }
  }
  return false;
};
const F = (t, e) => {
  const n = (e.p = t.p);
  const l = t.o;
  const o = e.o;
  const c = e.h;
  const i = e.t;
  if (i === null) {
    {
      s = c === 'svg' ? true : c === 'foreignObject' ? false : s;
    }
    {
      {
        x(t, e, s);
      }
    }
    if (l !== null && o !== null) {
      W(n, l, e, o);
    } else if (o !== null) {
      if (t.t !== null) {
        n.textContent = '';
      }
      N(n, null, e, o, 0, o.length - 1);
    } else if (l !== null) {
      T(l, 0, l.length - 1);
    }
    if (s && c === 'svg') {
      s = false;
    }
  } else if (t.t !== i) {
    n.data = i;
  }
};
const L = (t, s, l = false) => {
  const o = t.m;
  const c = t.S || y(null, null);
  const i = b(s) ? s : p(null, null, s);
  n = o.tagName;
  if (l && i.l) {
    for (const t of Object.keys(i.l)) {
      if (o.hasAttribute(t) && !['key', 'ref', 'style', 'class'].includes(t)) {
        i.l[t] = o[t];
      }
    }
  }
  i.h = null;
  i.u |= 4;
  t.S = i;
  i.p = c.p = o.shadowRoot || o;
  {
    e = o['s-sc'];
  }
  F(c, i);
};
const R = (t, e) => {
  if (e && !t.j && e['s-p']) {
    e['s-p'].push(new Promise((e) => (t.j = e)));
  }
};
const q = (t, e) => {
  {
    t.u |= 16;
  }
  if (t.u & 4) {
    t.u |= 512;
    return;
  }
  R(t, t.O);
  const n = () => H(t, e);
  return Ut(n);
};
const H = (t, e) => {
  const n = o('scheduleUpdate', t.v.g);
  const s = t.k;
  let l;
  if (e) {
    {
      t.u |= 256;
      if (t.M) {
        t.M.map(([t, e]) => G(s, t, e));
        t.M = undefined;
      }
    }
  } else {
    {
      l = G(s, 'componentWillUpdate');
    }
  }
  n();
  return I(l, () => _(t, s, e));
};
const I = (t, e) => (V(t) ? t.then(e) : e());
const V = (t) => t instanceof Promise || (t && t.then && typeof t.then === 'function');
const _ = async (t, e, n) => {
  var s;
  const l = t.m;
  const c = o('update', t.v.g);
  const i = l['s-rc'];
  if (n) {
    k(t);
  }
  const f = o('render', t.v.g);
  {
    z(t, e, l, n);
  }
  if (i) {
    i.map((t) => t());
    l['s-rc'] = undefined;
  }
  f();
  c();
  {
    const e = (s = l['s-p']) !== null && s !== void 0 ? s : [];
    const n = () => B(t);
    if (e.length === 0) {
      n();
    } else {
      Promise.all(e).then(n);
      t.u |= 4;
      e.length = 0;
    }
  }
};
const z = (t, e, n, s) => {
  try {
    e = e.render();
    {
      t.u &= ~16;
    }
    {
      t.u |= 2;
    }
    {
      {
        {
          L(t, e, s);
        }
      }
    }
  } catch (e) {
    pt(e, t.m);
  }
  return null;
};
const B = (t) => {
  const e = t.v.g;
  const n = t.m;
  const s = o('postUpdate', e);
  const l = t.O;
  if (!(t.u & 64)) {
    t.u |= 64;
    {
      J(n);
    }
    s();
    {
      t.C(n);
      if (!l) {
        D();
      }
    }
  } else {
    s();
  }
  {
    t.P(n);
  }
  {
    if (t.j) {
      t.j();
      t.j = undefined;
    }
    if (t.u & 512) {
      Pt(() => q(t, false));
    }
    t.u &= ~(4 | 512);
  }
};
const D = (e) => {
  {
    J($t.documentElement);
  }
  Pt(() => g(wt, 'appload', { detail: { namespace: t } }));
};
const G = (t, e, n) => {
  if (t && t[e]) {
    try {
      return t[e](n);
    } catch (t) {
      pt(t);
    }
  }
  return undefined;
};
const J = (t) => t.classList.add('hydrated');
const K = (t, e) => ut(t).U.get(e);
const Q = (t, e, n, s) => {
  const l = ut(t);
  const o = l.U.get(e);
  const c = l.u;
  const i = l.k;
  n = w(n, s.N[e][0]);
  const f = Number.isNaN(o) && Number.isNaN(n);
  const r = n !== o && !f;
  if ((!(c & 8) || o === undefined) && r) {
    l.U.set(e, n);
    if (i) {
      if ((c & (2 | 16)) === 2) {
        q(l, false);
      }
    }
  }
};
const X = (t, e, n) => {
  if (e.N) {
    const s = Object.entries(e.N);
    const l = t.prototype;
    s.map(([t, [s]]) => {
      if (s & 31 || (n & 2 && s & 32)) {
        Object.defineProperty(l, t, {
          get() {
            return K(this, t);
          },
          set(n) {
            Q(this, t, n, e);
          },
          configurable: true,
          enumerable: true,
        });
      } else if (n & 1 && s & 64) {
        Object.defineProperty(l, t, {
          value(...e) {
            const n = ut(this);
            return n.T.then(() => n.k[t](...e));
          },
        });
      }
    });
    if (n & 1) {
      const e = new Map();
      l.attributeChangedCallback = function (t, n, s) {
        vt.jmp(() => {
          const n = e.get(t);
          if (this.hasOwnProperty(n)) {
            s = this[n];
            delete this[n];
          } else if (l.hasOwnProperty(n) && typeof this[n] === 'number' && this[n] == s) {
            return;
          }
          this[n] = s === null && typeof this[n] === 'boolean' ? false : s;
        });
      };
      t.observedAttributes = s
        .filter(([t, e]) => e[0] & 15)
        .map(([t, n]) => {
          const s = n[1] || t;
          e.set(s, t);
          return s;
        });
    }
  }
  return t;
};
const Y = async (t, e, n, s, l) => {
  if ((e.u & 32) === 0) {
    e.u |= 32;
    {
      l = mt(n);
      if (l.then) {
        const t = c();
        l = await l;
        t();
      }
      if (!l.isProxied) {
        X(l, n, 2);
        l.isProxied = true;
      }
      const t = o('createInstance', n.g);
      {
        e.u |= 8;
      }
      try {
        new l(e);
      } catch (t) {
        pt(t);
      }
      {
        e.u &= ~8;
      }
      t();
    }
    if (l.style) {
      let t = l.style;
      const e = M(n);
      if (!bt.has(e)) {
        const s = o('registerStyles', n.g);
        j(e, t, !!(n.u & 1));
        s();
      }
    }
  }
  const i = e.O;
  const f = () => q(e, true);
  if (i && i['s-rc']) {
    i['s-rc'].push(f);
  } else {
    f();
  }
};
const Z = (t) => {};
const tt = (t) => {
  if ((vt.u & 1) === 0) {
    const e = ut(t);
    const n = e.v;
    const s = o('connectedCallback', n.g);
    if (!(e.u & 1)) {
      e.u |= 1;
      {
        let n = t;
        while ((n = n.parentNode || n.host)) {
          if (n['s-p']) {
            R(e, (e.O = n));
            break;
          }
        }
      }
      if (n.N) {
        Object.entries(n.N).map(([e, [n]]) => {
          if (n & 31 && t.hasOwnProperty(e)) {
            const n = t[e];
            delete t[e];
            t[e] = n;
          }
        });
      }
      {
        Y(t, e, n);
      }
    } else {
      lt(t, e, n.W);
      if (e === null || e === void 0 ? void 0 : e.k);
      else if (e === null || e === void 0 ? void 0 : e.A) {
        e.A.then(() => Z());
      }
    }
    s();
  }
};
const et = (t) => {};
const nt = async (t) => {
  if ((vt.u & 1) === 0) {
    const e = ut(t);
    {
      if (e.F) {
        e.F.map((t) => t());
        e.F = undefined;
      }
    }
    if (e === null || e === void 0 ? void 0 : e.k);
    else if (e === null || e === void 0 ? void 0 : e.A) {
      e.A.then(() => et());
    }
  }
};
const st = (t, e = {}) => {
  var n;
  const s = o();
  const l = [];
  const c = e.exclude || [];
  const f = wt.customElements;
  const r = $t.head;
  const u = r.querySelector('meta[charset]');
  const a = $t.createElement('style');
  const d = [];
  let p;
  let y = true;
  Object.assign(vt, e);
  vt.L = new URL(e.resourcesUrl || './', $t.baseURI).href;
  t.map((t) => {
    t[1].map((e) => {
      const n = { u: e[0], g: e[1], N: e[2], W: e[3] };
      {
        n.N = e[2];
      }
      {
        n.W = e[3];
      }
      const s = n.g;
      const o = class extends HTMLElement {
        constructor(t) {
          super(t);
          t = this;
          dt(t, n);
          if (n.u & 1) {
            {
              {
                t.attachShadow({ mode: 'open' });
              }
            }
          }
        }
        connectedCallback() {
          if (p) {
            clearTimeout(p);
            p = null;
          }
          if (y) {
            d.push(this);
          } else {
            vt.jmp(() => tt(this));
          }
        }
        disconnectedCallback() {
          vt.jmp(() => nt(this));
        }
        componentOnReady() {
          return ut(this).A;
        }
      };
      n.R = t[0];
      if (!c.includes(s) && !f.get(s)) {
        l.push(s);
        f.define(s, X(o, n, 1));
      }
    });
  });
  {
    a.innerHTML = l + i;
    a.setAttribute('data-styles', '');
    const t = (n = vt.$) !== null && n !== void 0 ? n : h($t);
    if (t != null) {
      a.setAttribute('nonce', t);
    }
    r.insertBefore(a, u ? u.nextSibling : r.firstChild);
  }
  y = false;
  if (d.length) {
    d.map((t) => t.connectedCallback());
  } else {
    {
      vt.jmp(() => (p = setTimeout(D, 30)));
    }
  }
  s();
};
const lt = (t, e, n, s) => {
  if (n) {
    n.map(([n, s, l]) => {
      const o = ct(t, n);
      const c = ot(e, l);
      const i = it(n);
      vt.ael(o, s, c, i);
      (e.F = e.F || []).push(() => vt.rel(o, s, c, i));
    });
  }
};
const ot = (t, e) => (n) => {
  try {
    {
      if (t.u & 256) {
        t.k[e](n);
      } else {
        (t.M = t.M || []).push([e, n]);
      }
    }
  } catch (t) {
    pt(t);
  }
};
const ct = (t, e) => {
  if (e & 8) return wt;
  return t;
};
const it = (t) => (t & 2) !== 0;
const ft = (t) => (vt.$ = t);
const rt = new WeakMap();
const ut = (t) => rt.get(t);
const at = (t, e) => rt.set((e.k = t), e);
const dt = (t, e) => {
  const n = { u: 0, m: t, v: e, U: new Map() };
  {
    n.T = new Promise((t) => (n.P = t));
  }
  {
    n.A = new Promise((t) => (n.C = t));
    t['s-p'] = [];
    t['s-rc'] = [];
  }
  lt(t, n, e.W);
  return rt.set(t, n);
};
const ht = (t, e) => e in t;
const pt = (t, e) => (0, console.error)(t, e);
const yt = new Map();
const mt = (t, e, n) => {
  const s = t.g.replace(/-/g, '_');
  const l = t.R;
  const o = yt.get(l);
  if (o) {
    return o[s];
  }
  /*!__STENCIL_STATIC_IMPORT_SWITCH__*/ return import(`./${l}.entry.js${''}`).then((t) => {
    {
      yt.set(l, t);
    }
    return t[s];
  }, pt);
};
const bt = new Map();
const wt = typeof window !== 'undefined' ? window : {};
const $t = wt.document || { head: {} };
const vt = {
  u: 0,
  L: '',
  jmp: (t) => t(),
  raf: (t) => requestAnimationFrame(t),
  ael: (t, e, n, s) => t.addEventListener(e, n, s),
  rel: (t, e, n, s) => t.removeEventListener(e, n, s),
  ce: (t, e) => new CustomEvent(t, e),
};
const gt = (t) => Promise.resolve(t);
const St = (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch (t) {}
  return false;
})();
const jt = [];
const Ot = [];
const kt = (t, e) => (n) => {
  t.push(n);
  if (!l) {
    l = true;
    if (e && vt.u & 4) {
      Pt(Ct);
    } else {
      vt.raf(Ct);
    }
  }
};
const Mt = (t) => {
  for (let e = 0; e < t.length; e++) {
    try {
      t[e](performance.now());
    } catch (t) {
      pt(t);
    }
  }
  t.length = 0;
};
const Ct = () => {
  Mt(jt);
  {
    Mt(Ot);
    if ((l = jt.length > 0)) {
      vt.raf(Ct);
    }
  }
};
const Pt = (t) => gt().then(t);
const Ut = kt(Ot, true);
export { st as b, v as c, $ as g, p as h, gt as p, at as r, ft as s };
//# sourceMappingURL=p-ac9b30d0.js.map
