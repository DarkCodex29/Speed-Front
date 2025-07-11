var __extends =
  (this && this.__extends) ||
  (function () {
    var e = function (t, n) {
      e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t) if (Object.prototype.hasOwnProperty.call(t, n)) e[n] = t[n];
        };
      return e(t, n);
    };
    return function (t, n) {
      if (typeof n !== 'function' && n !== null) throw new TypeError('Class extends value ' + String(n) + ' is not a constructor or null');
      e(t, n);
      function r() {
        this.constructor = t;
      }
      t.prototype = n === null ? Object.create(n) : ((r.prototype = n.prototype), new r());
    };
  })();
var __awaiter =
  (this && this.__awaiter) ||
  function (e, t, n, r) {
    function a(e) {
      return e instanceof n
        ? e
        : new n(function (t) {
            t(e);
          });
    }
    return new (n || (n = Promise))(function (n, o) {
      function s(e) {
        try {
          l(r.next(e));
        } catch (e) {
          o(e);
        }
      }
      function i(e) {
        try {
          l(r['throw'](e));
        } catch (e) {
          o(e);
        }
      }
      function l(e) {
        e.done ? n(e.value) : a(e.value).then(s, i);
      }
      l((r = r.apply(e, t || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (e, t) {
    var n = {
        label: 0,
        sent: function () {
          if (o[0] & 1) throw o[1];
          return o[1];
        },
        trys: [],
        ops: [],
      },
      r,
      a,
      o,
      s;
    return (
      (s = { next: i(0), throw: i(1), return: i(2) }),
      typeof Symbol === 'function' &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function i(e) {
      return function (t) {
        return l([e, t]);
      };
    }
    function l(i) {
      if (r) throw new TypeError('Generator is already executing.');
      while ((s && ((s = 0), i[0] && (n = 0)), n))
        try {
          if (
            ((r = 1),
            a &&
              (o = i[0] & 2 ? a['return'] : i[0] ? a['throw'] || ((o = a['return']) && o.call(a), 0) : a.next) &&
              !(o = o.call(a, i[1])).done)
          )
            return o;
          if (((a = 0), o)) i = [i[0] & 2, o.value];
          switch (i[0]) {
            case 0:
            case 1:
              o = i;
              break;
            case 4:
              n.label++;
              return { value: i[1], done: false };
            case 5:
              n.label++;
              a = i[1];
              i = [0];
              continue;
            case 7:
              i = n.ops.pop();
              n.trys.pop();
              continue;
            default:
              if (!((o = n.trys), (o = o.length > 0 && o[o.length - 1])) && (i[0] === 6 || i[0] === 2)) {
                n = 0;
                continue;
              }
              if (i[0] === 3 && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                n.label = i[1];
                break;
              }
              if (i[0] === 6 && n.label < o[1]) {
                n.label = o[1];
                o = i;
                break;
              }
              if (o && n.label < o[2]) {
                n.label = o[2];
                n.ops.push(i);
                break;
              }
              if (o[2]) n.ops.pop();
              n.trys.pop();
              continue;
          }
          i = t.call(e, n);
        } catch (e) {
          i = [6, e];
          a = 0;
        } finally {
          r = o = 0;
        }
      if (i[0] & 5) throw i[1];
      return { value: i[0] ? i[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, a = t.length, o; r < a; r++) {
        if (o || !(r in t)) {
          if (!o) o = Array.prototype.slice.call(t, 0, r);
          o[r] = t[r];
        }
      }
    return e.concat(o || Array.prototype.slice.call(t));
  };
var NAMESPACE = 'hdc-wc';
var scopeId;
var hostTagName;
var isSvgMode = false;
var queuePending = false;
var createTime = function (e, t) {
  if (t === void 0) {
    t = '';
  }
  {
    return function () {
      return;
    };
  }
};
var uniqueTime = function (e, t) {
  {
    return function () {
      return;
    };
  }
};
var HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
var EMPTY_OBJ = {};
var SVG_NS = 'http://www.w3.org/2000/svg';
var HTML_NS = 'http://www.w3.org/1999/xhtml';
var isDef = function (e) {
  return e != null;
};
var isComplexType = function (e) {
  e = typeof e;
  return e === 'object' || e === 'function';
};
function queryNonceMetaTagContent(e) {
  var t, n, r;
  return (r =
    (n = (t = e.head) === null || t === void 0 ? void 0 : t.querySelector('meta[name="csp-nonce"]')) === null || n === void 0
      ? void 0
      : n.getAttribute('content')) !== null && r !== void 0
    ? r
    : undefined;
}
var h = function (e, t) {
  var n = [];
  for (var r = 2; r < arguments.length; r++) {
    n[r - 2] = arguments[r];
  }
  var a = null;
  var o = null;
  var s = false;
  var i = false;
  var l = [];
  var u = function (t) {
    for (var n = 0; n < t.length; n++) {
      a = t[n];
      if (Array.isArray(a)) {
        u(a);
      } else if (a != null && typeof a !== 'boolean') {
        if ((s = typeof e !== 'function' && !isComplexType(a))) {
          a = String(a);
        }
        if (s && i) {
          l[l.length - 1].$text$ += a;
        } else {
          l.push(s ? newVNode(null, a) : a);
        }
        i = s;
      }
    }
  };
  u(n);
  if (t) {
    if (t.key) {
      o = t.key;
    }
    {
      var c = t.className || t.class;
      if (c) {
        t.class =
          typeof c !== 'object'
            ? c
            : Object.keys(c)
                .filter(function (e) {
                  return c[e];
                })
                .join(' ');
      }
    }
  }
  var f = newVNode(e, null);
  f.$attrs$ = t;
  if (l.length > 0) {
    f.$children$ = l;
  }
  {
    f.$key$ = o;
  }
  return f;
};
var newVNode = function (e, t) {
  var n = { $flags$: 0, $tag$: e, $text$: t, $elm$: null, $children$: null };
  {
    n.$attrs$ = null;
  }
  {
    n.$key$ = null;
  }
  return n;
};
var Host = {};
var isHost = function (e) {
  return e && e.$tag$ === Host;
};
var parsePropertyValue = function (e, t) {
  if (e != null && !isComplexType(e)) {
    if (t & 4) {
      return e === 'false' ? false : e === '' || !!e;
    }
    if (t & 2) {
      return parseFloat(e);
    }
    if (t & 1) {
      return String(e);
    }
    return e;
  }
  return e;
};
var getElement = function (e) {
  return getHostRef(e).$hostElement$;
};
var createEvent = function (e, t, n) {
  var r = getElement(e);
  return {
    emit: function (e) {
      return emitEvent(r, t, { bubbles: !!(n & 4), composed: !!(n & 2), cancelable: !!(n & 1), detail: e });
    },
  };
};
var emitEvent = function (e, t, n) {
  var r = plt.ce(t, n);
  e.dispatchEvent(r);
  return r;
};
var rootAppliedStyles = new WeakMap();
var registerStyle = function (e, t, n) {
  var r = styles.get(e);
  if (supportsConstructableStylesheets && n) {
    r = r || new CSSStyleSheet();
    if (typeof r === 'string') {
      r = t;
    } else {
      r.replaceSync(t);
    }
  } else {
    r = t;
  }
  styles.set(e, r);
};
var addStyle = function (e, t, n) {
  var r;
  var a = getScopeId(t);
  var o = styles.get(a);
  e = e.nodeType === 11 ? e : doc;
  if (o) {
    if (typeof o === 'string') {
      e = e.head || e;
      var s = rootAppliedStyles.get(e);
      var i = void 0;
      if (!s) {
        rootAppliedStyles.set(e, (s = new Set()));
      }
      if (!s.has(a)) {
        {
          i = doc.createElement('style');
          i.innerHTML = o;
          var l = (r = plt.$nonce$) !== null && r !== void 0 ? r : queryNonceMetaTagContent(doc);
          if (l != null) {
            i.setAttribute('nonce', l);
          }
          e.insertBefore(i, e.querySelector('link'));
        }
        if (s) {
          s.add(a);
        }
      }
    } else if (!e.adoptedStyleSheets.includes(o)) {
      e.adoptedStyleSheets = __spreadArray(__spreadArray([], e.adoptedStyleSheets, true), [o], false);
    }
  }
  return a;
};
var attachStyles = function (e) {
  var t = e.$cmpMeta$;
  var n = e.$hostElement$;
  var r = t.$flags$;
  var a = createTime('attachStyles', t.$tagName$);
  var o = addStyle(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
  if (r & 10) {
    n['s-sc'] = o;
    n.classList.add(o + '-h');
  }
  a();
};
var getScopeId = function (e, t) {
  return 'sc-' + e.$tagName$;
};
var setAccessor = function (e, t, n, r, a, o) {
  if (n !== r) {
    var s = isMemberInElement(e, t);
    var i = t.toLowerCase();
    if (t === 'class') {
      var l = e.classList;
      var u = parseClassList(n);
      var c = parseClassList(r);
      l.remove.apply(
        l,
        u.filter(function (e) {
          return e && !c.includes(e);
        }),
      );
      l.add.apply(
        l,
        c.filter(function (e) {
          return e && !u.includes(e);
        }),
      );
    } else if (t === 'style') {
      {
        for (var f in n) {
          if (!r || r[f] == null) {
            if (f.includes('-')) {
              e.style.removeProperty(f);
            } else {
              e.style[f] = '';
            }
          }
        }
      }
      for (var f in r) {
        if (!n || r[f] !== n[f]) {
          if (f.includes('-')) {
            e.style.setProperty(f, r[f]);
          } else {
            e.style[f] = r[f];
          }
        }
      }
    } else if (t === 'key');
    else if (!s && t[0] === 'o' && t[1] === 'n') {
      if (t[2] === '-') {
        t = t.slice(3);
      } else if (isMemberInElement(win, i)) {
        t = i.slice(2);
      } else {
        t = i[2] + t.slice(3);
      }
      if (n) {
        plt.rel(e, t, n, false);
      }
      if (r) {
        plt.ael(e, t, r, false);
      }
    } else {
      var $ = isComplexType(r);
      if ((s || ($ && r !== null)) && !a) {
        try {
          if (!e.tagName.includes('-')) {
            var v = r == null ? '' : r;
            if (t === 'list') {
              s = false;
            } else if (n == null || e[t] != v) {
              e[t] = v;
            }
          } else {
            e[t] = r;
          }
        } catch (e) {}
      }
      if (r == null || r === false) {
        if (r !== false || e.getAttribute(t) === '') {
          {
            e.removeAttribute(t);
          }
        }
      } else if ((!s || o & 4 || a) && !$) {
        r = r === true ? '' : r;
        {
          e.setAttribute(t, r);
        }
      }
    }
  }
};
var parseClassListRegex = /\s/;
var parseClassList = function (e) {
  return !e ? [] : e.split(parseClassListRegex);
};
var updateElement = function (e, t, n, r) {
  var a = t.$elm$.nodeType === 11 && t.$elm$.host ? t.$elm$.host : t.$elm$;
  var o = (e && e.$attrs$) || EMPTY_OBJ;
  var s = t.$attrs$ || EMPTY_OBJ;
  {
    for (r in o) {
      if (!(r in s)) {
        setAccessor(a, r, o[r], undefined, n, t.$flags$);
      }
    }
  }
  for (r in s) {
    setAccessor(a, r, o[r], s[r], n, t.$flags$);
  }
};
var createElm = function (e, t, n, r) {
  var a = t.$children$[n];
  var o = 0;
  var s;
  var i;
  if (a.$text$ !== null) {
    s = a.$elm$ = doc.createTextNode(a.$text$);
  } else {
    if (!isSvgMode) {
      isSvgMode = a.$tag$ === 'svg';
    }
    s = a.$elm$ = doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, a.$tag$);
    if (isSvgMode && a.$tag$ === 'foreignObject') {
      isSvgMode = false;
    }
    {
      updateElement(null, a, isSvgMode);
    }
    if (isDef(scopeId) && s['s-si'] !== scopeId) {
      s.classList.add((s['s-si'] = scopeId));
    }
    if (a.$children$) {
      for (o = 0; o < a.$children$.length; ++o) {
        i = createElm(e, a, o);
        if (i) {
          s.appendChild(i);
        }
      }
    }
    {
      if (a.$tag$ === 'svg') {
        isSvgMode = false;
      } else if (s.tagName === 'foreignObject') {
        isSvgMode = true;
      }
    }
  }
  return s;
};
var addVnodes = function (e, t, n, r, a, o) {
  var s = e;
  var i;
  if (s.shadowRoot && s.tagName === hostTagName) {
    s = s.shadowRoot;
  }
  for (; a <= o; ++a) {
    if (r[a]) {
      i = createElm(null, n, a);
      if (i) {
        r[a].$elm$ = i;
        s.insertBefore(i, t);
      }
    }
  }
};
var removeVnodes = function (e, t, n) {
  for (var r = t; r <= n; ++r) {
    var a = e[r];
    if (a) {
      var o = a.$elm$;
      if (o) {
        o.remove();
      }
    }
  }
};
var updateChildren = function (e, t, n, r) {
  var a = 0;
  var o = 0;
  var s = 0;
  var i = 0;
  var l = t.length - 1;
  var u = t[0];
  var c = t[l];
  var f = r.length - 1;
  var $ = r[0];
  var v = r[f];
  var d;
  var p;
  while (a <= l && o <= f) {
    if (u == null) {
      u = t[++a];
    } else if (c == null) {
      c = t[--l];
    } else if ($ == null) {
      $ = r[++o];
    } else if (v == null) {
      v = r[--f];
    } else if (isSameVnode(u, $)) {
      patch(u, $);
      u = t[++a];
      $ = r[++o];
    } else if (isSameVnode(c, v)) {
      patch(c, v);
      c = t[--l];
      v = r[--f];
    } else if (isSameVnode(u, v)) {
      patch(u, v);
      e.insertBefore(u.$elm$, c.$elm$.nextSibling);
      u = t[++a];
      v = r[--f];
    } else if (isSameVnode(c, $)) {
      patch(c, $);
      e.insertBefore(c.$elm$, u.$elm$);
      c = t[--l];
      $ = r[++o];
    } else {
      s = -1;
      {
        for (i = a; i <= l; ++i) {
          if (t[i] && t[i].$key$ !== null && t[i].$key$ === $.$key$) {
            s = i;
            break;
          }
        }
      }
      if (s >= 0) {
        p = t[s];
        if (p.$tag$ !== $.$tag$) {
          d = createElm(t && t[o], n, s);
        } else {
          patch(p, $);
          t[s] = undefined;
          d = p.$elm$;
        }
        $ = r[++o];
      } else {
        d = createElm(t && t[o], n, o);
        $ = r[++o];
      }
      if (d) {
        {
          u.$elm$.parentNode.insertBefore(d, u.$elm$);
        }
      }
    }
  }
  if (a > l) {
    addVnodes(e, r[f + 1] == null ? null : r[f + 1].$elm$, n, r, o, f);
  } else if (o > f) {
    removeVnodes(t, a, l);
  }
};
var isSameVnode = function (e, t) {
  if (e.$tag$ === t.$tag$) {
    {
      return e.$key$ === t.$key$;
    }
  }
  return false;
};
var patch = function (e, t) {
  var n = (t.$elm$ = e.$elm$);
  var r = e.$children$;
  var a = t.$children$;
  var o = t.$tag$;
  var s = t.$text$;
  if (s === null) {
    {
      isSvgMode = o === 'svg' ? true : o === 'foreignObject' ? false : isSvgMode;
    }
    {
      {
        updateElement(e, t, isSvgMode);
      }
    }
    if (r !== null && a !== null) {
      updateChildren(n, r, t, a);
    } else if (a !== null) {
      if (e.$text$ !== null) {
        n.textContent = '';
      }
      addVnodes(n, null, t, a, 0, a.length - 1);
    } else if (r !== null) {
      removeVnodes(r, 0, r.length - 1);
    }
    if (isSvgMode && o === 'svg') {
      isSvgMode = false;
    }
  } else if (e.$text$ !== s) {
    n.data = s;
  }
};
var renderVdom = function (e, t, n) {
  if (n === void 0) {
    n = false;
  }
  var r = e.$hostElement$;
  var a = e.$vnode$ || newVNode(null, null);
  var o = isHost(t) ? t : h(null, null, t);
  hostTagName = r.tagName;
  if (n && o.$attrs$) {
    for (var s = 0, i = Object.keys(o.$attrs$); s < i.length; s++) {
      var l = i[s];
      if (r.hasAttribute(l) && !['key', 'ref', 'style', 'class'].includes(l)) {
        o.$attrs$[l] = r[l];
      }
    }
  }
  o.$tag$ = null;
  o.$flags$ |= 4;
  e.$vnode$ = o;
  o.$elm$ = a.$elm$ = r.shadowRoot || r;
  {
    scopeId = r['s-sc'];
  }
  patch(a, o);
};
var attachToAncestor = function (e, t) {
  if (t && !e.$onRenderResolve$ && t['s-p']) {
    t['s-p'].push(
      new Promise(function (t) {
        return (e.$onRenderResolve$ = t);
      }),
    );
  }
};
var scheduleUpdate = function (e, t) {
  {
    e.$flags$ |= 16;
  }
  if (e.$flags$ & 4) {
    e.$flags$ |= 512;
    return;
  }
  attachToAncestor(e, e.$ancestorComponent$);
  var n = function () {
    return dispatchHooks(e, t);
  };
  return writeTask(n);
};
var dispatchHooks = function (e, t) {
  var n = createTime('scheduleUpdate', e.$cmpMeta$.$tagName$);
  var r = e.$lazyInstance$;
  var a;
  if (t) {
    {
      e.$flags$ |= 256;
      if (e.$queuedListeners$) {
        e.$queuedListeners$.map(function (e) {
          var t = e[0],
            n = e[1];
          return safeCall(r, t, n);
        });
        e.$queuedListeners$ = undefined;
      }
    }
  } else {
    {
      a = safeCall(r, 'componentWillUpdate');
    }
  }
  n();
  return enqueue(a, function () {
    return updateComponent(e, r, t);
  });
};
var enqueue = function (e, t) {
  return isPromisey(e) ? e.then(t) : t();
};
var isPromisey = function (e) {
  return e instanceof Promise || (e && e.then && typeof e.then === 'function');
};
var updateComponent = function (e, t, n) {
  return __awaiter(void 0, void 0, void 0, function () {
    var r, a, o, s, i, l, u;
    return __generator(this, function (c) {
      a = e.$hostElement$;
      o = createTime('update', e.$cmpMeta$.$tagName$);
      s = a['s-rc'];
      if (n) {
        attachStyles(e);
      }
      i = createTime('render', e.$cmpMeta$.$tagName$);
      {
        callRender(e, t, a, n);
      }
      if (s) {
        s.map(function (e) {
          return e();
        });
        a['s-rc'] = undefined;
      }
      i();
      o();
      {
        l = (r = a['s-p']) !== null && r !== void 0 ? r : [];
        u = function () {
          return postUpdateComponent(e);
        };
        if (l.length === 0) {
          u();
        } else {
          Promise.all(l).then(u);
          e.$flags$ |= 4;
          l.length = 0;
        }
      }
      return [2];
    });
  });
};
var callRender = function (e, t, n, r) {
  try {
    t = t.render();
    {
      e.$flags$ &= ~16;
    }
    {
      e.$flags$ |= 2;
    }
    {
      {
        {
          renderVdom(e, t, r);
        }
      }
    }
  } catch (t) {
    consoleError(t, e.$hostElement$);
  }
  return null;
};
var postUpdateComponent = function (e) {
  var t = e.$cmpMeta$.$tagName$;
  var n = e.$hostElement$;
  var r = createTime('postUpdate', t);
  var a = e.$ancestorComponent$;
  if (!(e.$flags$ & 64)) {
    e.$flags$ |= 64;
    {
      addHydratedFlag(n);
    }
    r();
    {
      e.$onReadyResolve$(n);
      if (!a) {
        appDidLoad();
      }
    }
  } else {
    r();
  }
  {
    e.$onInstanceResolve$(n);
  }
  {
    if (e.$onRenderResolve$) {
      e.$onRenderResolve$();
      e.$onRenderResolve$ = undefined;
    }
    if (e.$flags$ & 512) {
      nextTick(function () {
        return scheduleUpdate(e, false);
      });
    }
    e.$flags$ &= ~(4 | 512);
  }
};
var appDidLoad = function (e) {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(function () {
    return emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } });
  });
};
var safeCall = function (e, t, n) {
  if (e && e[t]) {
    try {
      return e[t](n);
    } catch (e) {
      consoleError(e);
    }
  }
  return undefined;
};
var addHydratedFlag = function (e) {
  return e.classList.add('hydrated');
};
var getValue = function (e, t) {
  return getHostRef(e).$instanceValues$.get(t);
};
var setValue = function (e, t, n, r) {
  var a = getHostRef(e);
  var o = a.$instanceValues$.get(t);
  var s = a.$flags$;
  var i = a.$lazyInstance$;
  n = parsePropertyValue(n, r.$members$[t][0]);
  var l = Number.isNaN(o) && Number.isNaN(n);
  var u = n !== o && !l;
  if ((!(s & 8) || o === undefined) && u) {
    a.$instanceValues$.set(t, n);
    if (i) {
      if ((s & (2 | 16)) === 2) {
        scheduleUpdate(a, false);
      }
    }
  }
};
var proxyComponent = function (e, t, n) {
  if (t.$members$) {
    var r = Object.entries(t.$members$);
    var a = e.prototype;
    r.map(function (e) {
      var r = e[0],
        o = e[1][0];
      if (o & 31 || (n & 2 && o & 32)) {
        Object.defineProperty(a, r, {
          get: function () {
            return getValue(this, r);
          },
          set: function (e) {
            setValue(this, r, e, t);
          },
          configurable: true,
          enumerable: true,
        });
      } else if (n & 1 && o & 64) {
        Object.defineProperty(a, r, {
          value: function () {
            var e = [];
            for (var t = 0; t < arguments.length; t++) {
              e[t] = arguments[t];
            }
            var n = getHostRef(this);
            return n.$onInstancePromise$.then(function () {
              var t;
              return (t = n.$lazyInstance$)[r].apply(t, e);
            });
          },
        });
      }
    });
    if (n & 1) {
      var o = new Map();
      a.attributeChangedCallback = function (e, t, n) {
        var r = this;
        plt.jmp(function () {
          var t = o.get(e);
          if (r.hasOwnProperty(t)) {
            n = r[t];
            delete r[t];
          } else if (a.hasOwnProperty(t) && typeof r[t] === 'number' && r[t] == n) {
            return;
          }
          r[t] = n === null && typeof r[t] === 'boolean' ? false : n;
        });
      };
      e.observedAttributes = r
        .filter(function (e) {
          var t = e[0],
            n = e[1];
          return n[0] & 15;
        })
        .map(function (e) {
          var t = e[0],
            n = e[1];
          var r = n[1] || t;
          o.set(r, t);
          return r;
        });
    }
  }
  return e;
};
var initializeComponent = function (e, t, n, r, a) {
  return __awaiter(void 0, void 0, void 0, function () {
    var e, r, o, s, i, l, u;
    return __generator(this, function (c) {
      switch (c.label) {
        case 0:
          if (!((t.$flags$ & 32) === 0)) return [3, 3];
          t.$flags$ |= 32;
          a = loadModule(n);
          if (!a.then) return [3, 2];
          e = uniqueTime();
          return [4, a];
        case 1:
          a = c.sent();
          e();
          c.label = 2;
        case 2:
          if (!a.isProxied) {
            proxyComponent(a, n, 2);
            a.isProxied = true;
          }
          r = createTime('createInstance', n.$tagName$);
          {
            t.$flags$ |= 8;
          }
          try {
            new a(t);
          } catch (e) {
            consoleError(e);
          }
          {
            t.$flags$ &= ~8;
          }
          r();
          if (a.style) {
            o = a.style;
            s = getScopeId(n);
            if (!styles.has(s)) {
              i = createTime('registerStyles', n.$tagName$);
              registerStyle(s, o, !!(n.$flags$ & 1));
              i();
            }
          }
          c.label = 3;
        case 3:
          l = t.$ancestorComponent$;
          u = function () {
            return scheduleUpdate(t, true);
          };
          if (l && l['s-rc']) {
            l['s-rc'].push(u);
          } else {
            u();
          }
          return [2];
      }
    });
  });
};
var fireConnectedCallback = function (e) {};
var connectedCallback = function (e) {
  if ((plt.$flags$ & 1) === 0) {
    var t = getHostRef(e);
    var n = t.$cmpMeta$;
    var r = createTime('connectedCallback', n.$tagName$);
    if (!(t.$flags$ & 1)) {
      t.$flags$ |= 1;
      {
        var a = e;
        while ((a = a.parentNode || a.host)) {
          if (a['s-p']) {
            attachToAncestor(t, (t.$ancestorComponent$ = a));
            break;
          }
        }
      }
      if (n.$members$) {
        Object.entries(n.$members$).map(function (t) {
          var n = t[0],
            r = t[1][0];
          if (r & 31 && e.hasOwnProperty(n)) {
            var a = e[n];
            delete e[n];
            e[n] = a;
          }
        });
      }
      {
        initializeComponent(e, t, n);
      }
    } else {
      addHostEventListeners(e, t, n.$listeners$);
      if (t === null || t === void 0 ? void 0 : t.$lazyInstance$);
      else if (t === null || t === void 0 ? void 0 : t.$onReadyPromise$) {
        t.$onReadyPromise$.then(function () {
          return fireConnectedCallback();
        });
      }
    }
    r();
  }
};
var disconnectInstance = function (e) {};
var disconnectedCallback = function (e) {
  return __awaiter(void 0, void 0, void 0, function () {
    var t;
    return __generator(this, function (n) {
      if ((plt.$flags$ & 1) === 0) {
        t = getHostRef(e);
        {
          if (t.$rmListeners$) {
            t.$rmListeners$.map(function (e) {
              return e();
            });
            t.$rmListeners$ = undefined;
          }
        }
        if (t === null || t === void 0 ? void 0 : t.$lazyInstance$);
        else if (t === null || t === void 0 ? void 0 : t.$onReadyPromise$) {
          t.$onReadyPromise$.then(function () {
            return disconnectInstance();
          });
        }
      }
      return [2];
    });
  });
};
var bootstrapLazy = function (e, t) {
  if (t === void 0) {
    t = {};
  }
  var n;
  var r = createTime();
  var a = [];
  var o = t.exclude || [];
  var s = win.customElements;
  var i = doc.head;
  var l = i.querySelector('meta[charset]');
  var u = doc.createElement('style');
  var c = [];
  var f;
  var $ = true;
  Object.assign(plt, t);
  plt.$resourcesUrl$ = new URL(t.resourcesUrl || './', doc.baseURI).href;
  e.map(function (e) {
    e[1].map(function (t) {
      var n = { $flags$: t[0], $tagName$: t[1], $members$: t[2], $listeners$: t[3] };
      {
        n.$members$ = t[2];
      }
      {
        n.$listeners$ = t[3];
      }
      var r = n.$tagName$;
      var i = (function (e) {
        __extends(t, e);
        function t(t) {
          var r = e.call(this, t) || this;
          t = r;
          registerHost(t, n);
          if (n.$flags$ & 1) {
            {
              {
                t.attachShadow({ mode: 'open' });
              }
            }
          }
          return r;
        }
        t.prototype.connectedCallback = function () {
          var e = this;
          if (f) {
            clearTimeout(f);
            f = null;
          }
          if ($) {
            c.push(this);
          } else {
            plt.jmp(function () {
              return connectedCallback(e);
            });
          }
        };
        t.prototype.disconnectedCallback = function () {
          var e = this;
          plt.jmp(function () {
            return disconnectedCallback(e);
          });
        };
        t.prototype.componentOnReady = function () {
          return getHostRef(this).$onReadyPromise$;
        };
        return t;
      })(HTMLElement);
      n.$lazyBundleId$ = e[0];
      if (!o.includes(r) && !s.get(r)) {
        a.push(r);
        s.define(r, proxyComponent(i, n, 1));
      }
    });
  });
  {
    u.innerHTML = a + HYDRATED_CSS;
    u.setAttribute('data-styles', '');
    var v = (n = plt.$nonce$) !== null && n !== void 0 ? n : queryNonceMetaTagContent(doc);
    if (v != null) {
      u.setAttribute('nonce', v);
    }
    i.insertBefore(u, l ? l.nextSibling : i.firstChild);
  }
  $ = false;
  if (c.length) {
    c.map(function (e) {
      return e.connectedCallback();
    });
  } else {
    {
      plt.jmp(function () {
        return (f = setTimeout(appDidLoad, 30));
      });
    }
  }
  r();
};
var addHostEventListeners = function (e, t, n, r) {
  if (n) {
    n.map(function (n) {
      var r = n[0],
        a = n[1],
        o = n[2];
      var s = getHostListenerTarget(e, r);
      var i = hostListenerProxy(t, o);
      var l = hostListenerOpts(r);
      plt.ael(s, a, i, l);
      (t.$rmListeners$ = t.$rmListeners$ || []).push(function () {
        return plt.rel(s, a, i, l);
      });
    });
  }
};
var hostListenerProxy = function (e, t) {
  return function (n) {
    try {
      {
        if (e.$flags$ & 256) {
          e.$lazyInstance$[t](n);
        } else {
          (e.$queuedListeners$ = e.$queuedListeners$ || []).push([t, n]);
        }
      }
    } catch (e) {
      consoleError(e);
    }
  };
};
var getHostListenerTarget = function (e, t) {
  if (t & 8) return win;
  return e;
};
var hostListenerOpts = function (e) {
  return (e & 2) !== 0;
};
var setNonce = function (e) {
  return (plt.$nonce$ = e);
};
var hostRefs = new WeakMap();
var getHostRef = function (e) {
  return hostRefs.get(e);
};
var registerInstance = function (e, t) {
  return hostRefs.set((t.$lazyInstance$ = e), t);
};
var registerHost = function (e, t) {
  var n = { $flags$: 0, $hostElement$: e, $cmpMeta$: t, $instanceValues$: new Map() };
  {
    n.$onInstancePromise$ = new Promise(function (e) {
      return (n.$onInstanceResolve$ = e);
    });
  }
  {
    n.$onReadyPromise$ = new Promise(function (e) {
      return (n.$onReadyResolve$ = e);
    });
    e['s-p'] = [];
    e['s-rc'] = [];
  }
  addHostEventListeners(e, n, t.$listeners$);
  return hostRefs.set(e, n);
};
var isMemberInElement = function (e, t) {
  return t in e;
};
var consoleError = function (e, t) {
  return (0, console.error)(e, t);
};
var cmpModules = new Map();
var loadModule = function (e, t, n) {
  var r = e.$tagName$.replace(/-/g, '_');
  var a = e.$lazyBundleId$;
  var o = cmpModules.get(a);
  if (o) {
    return o[r];
  }
  /*!__STENCIL_STATIC_IMPORT_SWITCH__*/ return import('./'.concat(a, '.entry.js').concat('')).then(function (e) {
    {
      cmpModules.set(a, e);
    }
    return e[r];
  }, consoleError);
};
var styles = new Map();
var win = typeof window !== 'undefined' ? window : {};
var doc = win.document || { head: {} };
var plt = {
  $flags$: 0,
  $resourcesUrl$: '',
  jmp: function (e) {
    return e();
  },
  raf: function (e) {
    return requestAnimationFrame(e);
  },
  ael: function (e, t, n, r) {
    return e.addEventListener(t, n, r);
  },
  rel: function (e, t, n, r) {
    return e.removeEventListener(t, n, r);
  },
  ce: function (e, t) {
    return new CustomEvent(e, t);
  },
};
var promiseResolve = function (e) {
  return Promise.resolve(e);
};
var supportsConstructableStylesheets = (function () {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === 'function';
  } catch (e) {}
  return false;
})();
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = function (e, t) {
  return function (n) {
    e.push(n);
    if (!queuePending) {
      queuePending = true;
      if (t && plt.$flags$ & 4) {
        nextTick(flush);
      } else {
        plt.raf(flush);
      }
    }
  };
};
var consume = function (e) {
  for (var t = 0; t < e.length; t++) {
    try {
      e[t](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  e.length = 0;
};
var flush = function () {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if ((queuePending = queueDomReads.length > 0)) {
      plt.raf(flush);
    }
  }
};
var nextTick = function (e) {
  return promiseResolve().then(e);
};
var writeTask = queueTask(queueDomWrites, true);
export { bootstrapLazy as b, createEvent as c, getElement as g, h, promiseResolve as p, registerInstance as r, setNonce as s };
//# sourceMappingURL=index-c60ff716.js.map
