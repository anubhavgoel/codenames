!(function () {
  "use strict";
  function M(e) {
    return (M =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function t(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      e &&
        (i = i.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        n.push.apply(n, i);
    }
    return n;
  }
  function W(r) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? t(Object(o), !0).forEach(function (e) {
            var t, n, i;
            (t = r),
              (i = o[(n = e)]),
              n in t
                ? Object.defineProperty(t, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (t[n] = i);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(o))
        : t(Object(o)).forEach(function (e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(o, e));
          });
    }
    return r;
  }
  function o(e, t, n) {
    var i,
      r = "";
    if ((e = "number" == typeof e ? String(e) : e).length > t) return e;
    for (i = 0; i < t; i += 1) r += String(n);
    return (r + e).slice(-r.length);
  }
  function F() {
    (this.secondTenths = 0),
      (this.seconds = 0),
      (this.minutes = 0),
      (this.hours = 0),
      (this.days = 0),
      (this.toString = function () {
        var e =
            0 < arguments.length && void 0 !== arguments[0]
              ? arguments[0]
              : ["hours", "minutes", "seconds"],
          t =
            1 < arguments.length && void 0 !== arguments[1]
              ? arguments[1]
              : ":",
          n =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 2;
        (e = e || ["hours", "minutes", "seconds"]),
          (t = t || ":"),
          (n = n || 2);
        var i,
          r = [];
        for (i = 0; i < e.length; i += 1)
          void 0 !== this[e[i]] &&
            ("secondTenths" === e[i]
              ? r.push(this[e[i]])
              : r.push(o(this[e[i]], n, "0")));
        return r.join(t);
      });
  }
  var e = "undefined" != typeof window ? window.CustomEvent : void 0;
  "undefined" != typeof window &&
    "function" != typeof e &&
    (((e = function (e, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }).prototype = window.Event.prototype),
    (window.CustomEvent = e));
  var V = "secondTenths",
    q = "seconds",
    U = "minutes",
    B = "hours",
    G = "days",
    K = [V, q, U, B, G],
    Q = {
      secondTenths: 100,
      seconds: 1e3,
      minutes: 6e4,
      hours: 36e5,
      days: 864e5,
    },
    $ = { secondTenths: 10, seconds: 60, minutes: 60, hours: 24 },
    X =
      "undefined" != typeof module &&
      module.exports &&
      "function" == typeof require
        ? require("events")
        : void 0;
  function Y() {
    return "undefined" != typeof document;
  }
  function z() {
    return X;
  }
  function J(e, t) {
    return ((e % t) + t) % t;
  }
  function n() {
    var t,
      n,
      r,
      i,
      o,
      s,
      a,
      l,
      u,
      c,
      f = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      d = new F(),
      h = new F(),
      p = Y()
        ? document.createElement("span")
        : z()
        ? new X.EventEmitter()
        : void 0,
      g = !1,
      m = !1,
      v = {},
      y = { detail: { timer: this } };
    function _(e, t) {
      var n,
        i,
        r = h[t];
      return (
        (i = O(e, Q[(n = t)])),
        (h[n] = i),
        (d[n] = n === G ? i : 0 <= i ? J(i, $[n]) : $[n] - J(i, $[n])),
        h[t] !== r
      );
    }
    function e() {
      E(),
        (function () {
          for (var e in d)
            d.hasOwnProperty(e) && "number" == typeof d[e] && (d[e] = 0);
          for (var t in h)
            h.hasOwnProperty(t) && "number" == typeof h[t] && (h[t] = 0);
        })();
    }
    function E() {
      clearInterval(t), (t = void 0), (m = g = !1);
    }
    function T(e) {
      R() ? ((u = b()), (s = I(o.target))) : D(e),
        (function () {
          var e = Q[n];
          if (A(S(Date.now()))) return;
          (t = setInterval(w, e)), (g = !0), (m = !1);
        })();
    }
    function b() {
      return S(Date.now()) - h.secondTenths * Q[V] * r;
    }
    function w() {
      var e = S(Date.now());
      !(function (e) {
        e[V] && H("secondTenthsUpdated", y);
        e[q] && H("secondsUpdated", y);
        e[U] && H("minutesUpdated", y);
        e[B] && H("hoursUpdated", y);
        e[G] && H("daysUpdated", y);
      })(C()),
        i(y.detail.timer),
        A(e) && (L(), H("targetAchieved", y));
    }
    function C(e) {
      var t = 0 < arguments.length && void 0 !== e ? e : S(Date.now()),
        n = 0 < r ? t - u : u - t,
        i = {};
      return (
        (i[V] = _(n, V)),
        (i[q] = _(n, q)),
        (i[U] = _(n, U)),
        (i[B] = _(n, B)),
        (i[G] = _(n, G)),
        i
      );
    }
    function S(e) {
      return Math.floor(e / Q[n]) * Q[n];
    }
    function A(e) {
      return s instanceof Array && c <= e;
    }
    function D(e) {
      var t;
      (n = (function (e) {
        if (
          (function (e) {
            return 0 <= K.indexOf(e);
          })((e = typeof e === "string" ? e : q))
        )
          return e;
        throw new Error(
          "Error in precision parameter: ".concat(e, " is not a valid value")
        );
      })((e = e || {}).precision)),
        (i = "function" == typeof e.callback ? e.callback : function () {}),
        (l = !0 === e.countdown),
        (r = !0 == l ? -1 : 1),
        "object" === M(e.startValues)
          ? ((t = e.startValues),
            (a = x(t)),
            (d.secondTenths = a[0]),
            (d.seconds = a[1]),
            (d.minutes = a[2]),
            (d.hours = a[3]),
            (d.days = a[4]),
            (h = N(a, h)))
          : (a = null),
        (u = b()),
        C(),
        (s =
          "object" === M(e.target)
            ? I(e.target)
            : l
            ? ((e.target = { seconds: 0 }), I(e.target))
            : null),
        (v = {
          precision: n,
          callback: i,
          countdown: "object" === M(e) && !0 === e.countdown,
          target: s,
          startValues: a,
        }),
        (o = e);
    }
    function x(e) {
      var t, n, i, r, o, s;
      if ("object" === M(e))
        if (e instanceof Array) {
          if (5 !== e.length) throw new Error("Array size not valid");
          s = e;
        } else {
          for (var a in e)
            if (K.indexOf(a) < 0)
              throw new Error(
                "Error in startValues or target parameter: ".concat(
                  a,
                  " is not a valid input value"
                )
              );
          s = [
            e.secondTenths || 0,
            e.seconds || 0,
            e.minutes || 0,
            e.hours || 0,
            e.days || 0,
          ];
        }
      return (
        (t = s[0]),
        (n = s[1] + O(t, 10)),
        (i = s[2] + O(n, 60)),
        (r = s[3] + O(i, 60)),
        (o = s[4] + O(r, 24)),
        (s[0] = t % 10),
        (s[1] = n % 60),
        (s[2] = i % 60),
        (s[3] = r % 24),
        (s[4] = o),
        s
      );
    }
    function O(e, t) {
      var n = e / t;
      return n < 0 ? Math.ceil(n) : Math.floor(n);
    }
    function I(e) {
      if (e) {
        var t = N((s = x(e)));
        return (c = u + t.secondTenths * Q[V] * r), s;
      }
    }
    function N(e, t) {
      var n = t || {};
      return (
        (n.days = e[4]),
        (n.hours = 24 * n.days + e[3]),
        (n.minutes = 60 * n.hours + e[2]),
        (n.seconds = 60 * n.minutes + e[1]),
        (n.secondTenths = 10 * n.seconds + e[[0]]),
        n
      );
    }
    function L() {
      e(), H("stopped", y);
    }
    function k(e, t) {
      Y() ? p.addEventListener(e, t) : z() && p.on(e, t);
    }
    function P(e, t) {
      Y() ? p.removeEventListener(e, t) : z() && p.removeListener(e, t);
    }
    function H(e, t) {
      Y() ? p.dispatchEvent(new CustomEvent(e, t)) : z() && p.emit(e, t);
    }
    function j() {
      return g;
    }
    function R() {
      return m;
    }
    D(f),
      void 0 !== this &&
        ((this.start = function () {
          var e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          (e = W({}, f, {}, e)), j() || (T(e), H("started", y));
        }),
        (this.pause = function () {
          E(), (m = !0), H("paused", y);
        }),
        (this.stop = L),
        (this.reset = function () {
          e(), T(o), H("reset", y);
        }),
        (this.isRunning = j),
        (this.isPaused = R),
        (this.getTimeValues = function () {
          return d;
        }),
        (this.getTotalTimeValues = function () {
          return h;
        }),
        (this.getConfig = function () {
          return v;
        }),
        (this.addEventListener = k),
        (this.on = k),
        (this.removeEventListener = P),
        (this.off = P));
  }
  var i =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function r(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports;
  }
  var s = r(function (e) {
    var t, n;
    (t = "undefined" != typeof window ? window : i),
      (n = function (w, e) {
        function g(e) {
          return null != e && e === e.window;
        }
        var t = [],
          C = w.document,
          i = Object.getPrototypeOf,
          a = t.slice,
          m = t.concat,
          l = t.push,
          r = t.indexOf,
          n = {},
          o = n.toString,
          v = n.hasOwnProperty,
          s = v.toString,
          u = s.call(Object),
          y = {},
          _ = function (e) {
            return "function" == typeof e && "number" != typeof e.nodeType;
          },
          c = { type: !0, src: !0, nonce: !0, noModule: !0 };
        function E(e, t, n) {
          var i,
            r,
            o = (n = n || C).createElement("script");
          if (((o.text = e), t))
            for (i in c)
              (r = t[i] || (t.getAttribute && t.getAttribute(i))) &&
                o.setAttribute(i, r);
          n.head.appendChild(o).parentNode.removeChild(o);
        }
        function T(e) {
          return null == e
            ? e + ""
            : "object" == typeof e || "function" == typeof e
            ? n[o.call(e)] || "object"
            : typeof e;
        }
        var S = function (e, t) {
            return new S.fn.init(e, t);
          },
          f = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        function d(e) {
          var t = !!e && "length" in e && e.length,
            n = T(e);
          return (
            !_(e) &&
            !g(e) &&
            ("array" === n ||
              0 === t ||
              ("number" == typeof t && 0 < t && t - 1 in e))
          );
        }
        (S.fn = S.prototype = {
          jquery: "3.4.1",
          constructor: S,
          length: 0,
          toArray: function () {
            return a.call(this);
          },
          get: function (e) {
            return null == e
              ? a.call(this)
              : e < 0
              ? this[e + this.length]
              : this[e];
          },
          pushStack: function (e) {
            var t = S.merge(this.constructor(), e);
            return (t.prevObject = this), t;
          },
          each: function (e) {
            return S.each(this, e);
          },
          map: function (n) {
            return this.pushStack(
              S.map(this, function (e, t) {
                return n.call(e, t, e);
              })
            );
          },
          slice: function () {
            return this.pushStack(a.apply(this, arguments));
          },
          first: function () {
            return this.eq(0);
          },
          last: function () {
            return this.eq(-1);
          },
          eq: function (e) {
            var t = this.length,
              n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : []);
          },
          end: function () {
            return this.prevObject || this.constructor();
          },
          push: l,
          sort: t.sort,
          splice: t.splice,
        }),
          (S.extend = S.fn.extend = function () {
            var e,
              t,
              n,
              i,
              r,
              o,
              s = arguments[0] || {},
              a = 1,
              l = arguments.length,
              u = !1;
            for (
              "boolean" == typeof s && ((u = s), (s = arguments[a] || {}), a++),
                "object" == typeof s || _(s) || (s = {}),
                a === l && ((s = this), a--);
              a < l;
              a++
            )
              if (null != (e = arguments[a]))
                for (t in e)
                  (i = e[t]),
                    "__proto__" !== t &&
                      s !== i &&
                      (u && i && (S.isPlainObject(i) || (r = Array.isArray(i)))
                        ? ((n = s[t]),
                          (o =
                            r && !Array.isArray(n)
                              ? []
                              : r || S.isPlainObject(n)
                              ? n
                              : {}),
                          (r = !1),
                          (s[t] = S.extend(u, o, i)))
                        : void 0 !== i && (s[t] = i));
            return s;
          }),
          S.extend({
            expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
              throw new Error(e);
            },
            noop: function () {},
            isPlainObject: function (e) {
              var t, n;
              return (
                !(!e || "[object Object]" !== o.call(e)) &&
                (!(t = i(e)) ||
                  ("function" ==
                    typeof (n = v.call(t, "constructor") && t.constructor) &&
                    s.call(n) === u))
              );
            },
            isEmptyObject: function (e) {
              var t;
              for (t in e) return !1;
              return !0;
            },
            globalEval: function (e, t) {
              E(e, { nonce: t && t.nonce });
            },
            each: function (e, t) {
              var n,
                i = 0;
              if (d(e))
                for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
              else for (i in e) if (!1 === t.call(e[i], i, e[i])) break;
              return e;
            },
            trim: function (e) {
              return null == e ? "" : (e + "").replace(f, "");
            },
            makeArray: function (e, t) {
              var n = t || [];
              return (
                null != e &&
                  (d(Object(e))
                    ? S.merge(n, "string" == typeof e ? [e] : e)
                    : l.call(n, e)),
                n
              );
            },
            inArray: function (e, t, n) {
              return null == t ? -1 : r.call(t, e, n);
            },
            merge: function (e, t) {
              for (var n = +t.length, i = 0, r = e.length; i < n; i++)
                e[r++] = t[i];
              return (e.length = r), e;
            },
            grep: function (e, t, n) {
              for (var i = [], r = 0, o = e.length, s = !n; r < o; r++)
                !t(e[r], r) != s && i.push(e[r]);
              return i;
            },
            map: function (e, t, n) {
              var i,
                r,
                o = 0,
                s = [];
              if (d(e))
                for (i = e.length; o < i; o++)
                  null != (r = t(e[o], o, n)) && s.push(r);
              else for (o in e) null != (r = t(e[o], o, n)) && s.push(r);
              return m.apply([], s);
            },
            guid: 1,
            support: y,
          }),
          "function" == typeof Symbol &&
            (S.fn[Symbol.iterator] = t[Symbol.iterator]),
          S.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
              " "
            ),
            function (e, t) {
              n["[object " + t + "]"] = t.toLowerCase();
            }
          );
        var h = (function (n) {
          function f(e, t, n) {
            var i = "0x" + t - 65536;
            return i != i || n
              ? t
              : i < 0
              ? String.fromCharCode(65536 + i)
              : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
          }
          function r() {
            b();
          }
          var e,
            h,
            E,
            o,
            s,
            p,
            d,
            g,
            T,
            l,
            u,
            b,
            w,
            a,
            C,
            m,
            c,
            v,
            y,
            S = "sizzle" + 1 * new Date(),
            _ = n.document,
            A = 0,
            i = 0,
            D = le(),
            x = le(),
            O = le(),
            I = le(),
            N = function (e, t) {
              return e === t && (u = !0), 0;
            },
            L = {}.hasOwnProperty,
            t = [],
            k = t.pop,
            P = t.push,
            H = t.push,
            j = t.slice,
            R = function (e, t) {
              for (var n = 0, i = e.length; n < i; n++)
                if (e[n] === t) return n;
              return -1;
            },
            M =
              "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            W = "[\\x20\\t\\r\\n\\f]",
            F = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            V =
              "\\[" +
              W +
              "*(" +
              F +
              ")(?:" +
              W +
              "*([*^$|!~]?=)" +
              W +
              "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
              F +
              "))|)" +
              W +
              "*\\]",
            q =
              ":(" +
              F +
              ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
              V +
              ")*)|.*)\\)|)",
            U = new RegExp(W + "+", "g"),
            B = new RegExp(
              "^" + W + "+|((?:^|[^\\\\])(?:\\\\.)*)" + W + "+$",
              "g"
            ),
            G = new RegExp("^" + W + "*," + W + "*"),
            K = new RegExp("^" + W + "*([>+~]|" + W + ")" + W + "*"),
            Q = new RegExp(W + "|>"),
            $ = new RegExp(q),
            X = new RegExp("^" + F + "$"),
            Y = {
              ID: new RegExp("^#(" + F + ")"),
              CLASS: new RegExp("^\\.(" + F + ")"),
              TAG: new RegExp("^(" + F + "|[*])"),
              ATTR: new RegExp("^" + V),
              PSEUDO: new RegExp("^" + q),
              CHILD: new RegExp(
                "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                  W +
                  "*(even|odd|(([+-]|)(\\d*)n|)" +
                  W +
                  "*(?:([+-]|)" +
                  W +
                  "*(\\d+)|))" +
                  W +
                  "*\\)|)",
                "i"
              ),
              bool: new RegExp("^(?:" + M + ")$", "i"),
              needsContext: new RegExp(
                "^" +
                  W +
                  "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                  W +
                  "*((?:-\\d)?\\d*)" +
                  W +
                  "*\\)|)(?=[^-]|$)",
                "i"
              ),
            },
            z = /HTML$/i,
            J = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            ee = /^[^{]+\{\s*\[native \w/,
            te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ne = /[+~]/,
            ie = new RegExp(
              "\\\\([\\da-f]{1,6}" + W + "?|(" + W + ")|.)",
              "ig"
            ),
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            oe = function (e, t) {
              return t
                ? "\0" === e
                  ? "�"
                  : e.slice(0, -1) +
                    "\\" +
                    e.charCodeAt(e.length - 1).toString(16) +
                    " "
                : "\\" + e;
            },
            se = Ee(
              function (e) {
                return (
                  !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
                );
              },
              { dir: "parentNode", next: "legend" }
            );
          try {
            H.apply((t = j.call(_.childNodes)), _.childNodes),
              t[_.childNodes.length].nodeType;
          } catch (e) {
            H = {
              apply: t.length
                ? function (e, t) {
                    P.apply(e, j.call(t));
                  }
                : function (e, t) {
                    for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                    e.length = n - 1;
                  },
            };
          }
          function ae(t, e, n, i) {
            var r,
              o,
              s,
              a,
              l,
              u,
              c,
              f = e && e.ownerDocument,
              d = e ? e.nodeType : 9;
            if (
              ((n = n || []),
              "string" != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))
            )
              return n;
            if (
              !i &&
              ((e ? e.ownerDocument || e : _) !== w && b(e), (e = e || w), C)
            ) {
              if (11 !== d && (l = te.exec(t)))
                if ((r = l[1])) {
                  if (9 === d) {
                    if (!(s = e.getElementById(r))) return n;
                    if (s.id === r) return n.push(s), n;
                  } else if (
                    f &&
                    (s = f.getElementById(r)) &&
                    y(e, s) &&
                    s.id === r
                  )
                    return n.push(s), n;
                } else {
                  if (l[2]) return H.apply(n, e.getElementsByTagName(t)), n;
                  if (
                    (r = l[3]) &&
                    h.getElementsByClassName &&
                    e.getElementsByClassName
                  )
                    return H.apply(n, e.getElementsByClassName(r)), n;
                }
              if (
                h.qsa &&
                !I[t + " "] &&
                (!m || !m.test(t)) &&
                (1 !== d || "object" !== e.nodeName.toLowerCase())
              ) {
                if (((c = t), (f = e), 1 === d && Q.test(t))) {
                  for (
                    (a = e.getAttribute("id"))
                      ? (a = a.replace(re, oe))
                      : e.setAttribute("id", (a = S)),
                      o = (u = p(t)).length;
                    o--;

                  )
                    u[o] = "#" + a + " " + _e(u[o]);
                  (c = u.join(",")),
                    (f = (ne.test(t) && ve(e.parentNode)) || e);
                }
                try {
                  return H.apply(n, f.querySelectorAll(c)), n;
                } catch (e) {
                  I(t, !0);
                } finally {
                  a === S && e.removeAttribute("id");
                }
              }
            }
            return g(t.replace(B, "$1"), e, n, i);
          }
          function le() {
            var i = [];
            return function e(t, n) {
              return (
                i.push(t + " ") > E.cacheLength && delete e[i.shift()],
                (e[t + " "] = n)
              );
            };
          }
          function ue(e) {
            return (e[S] = !0), e;
          }
          function ce(e) {
            var t = w.createElement("fieldset");
            try {
              return !!e(t);
            } catch (e) {
              return !1;
            } finally {
              t.parentNode && t.parentNode.removeChild(t), (t = null);
            }
          }
          function fe(e, t) {
            for (var n = e.split("|"), i = n.length; i--; )
              E.attrHandle[n[i]] = t;
          }
          function de(e, t) {
            var n = t && e,
              i =
                n &&
                1 === e.nodeType &&
                1 === t.nodeType &&
                e.sourceIndex - t.sourceIndex;
            if (i) return i;
            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
            return e ? 1 : -1;
          }
          function he(t) {
            return function (e) {
              return "input" === e.nodeName.toLowerCase() && e.type === t;
            };
          }
          function pe(n) {
            return function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t || "button" === t) && e.type === n;
            };
          }
          function ge(t) {
            return function (e) {
              return "form" in e
                ? e.parentNode && !1 === e.disabled
                  ? "label" in e
                    ? "label" in e.parentNode
                      ? e.parentNode.disabled === t
                      : e.disabled === t
                    : e.isDisabled === t || (e.isDisabled !== !t && se(e) === t)
                  : e.disabled === t
                : "label" in e && e.disabled === t;
            };
          }
          function me(s) {
            return ue(function (o) {
              return (
                (o = +o),
                ue(function (e, t) {
                  for (var n, i = s([], e.length, o), r = i.length; r--; )
                    e[(n = i[r])] && (e[n] = !(t[n] = e[n]));
                })
              );
            });
          }
          function ve(e) {
            return e && void 0 !== e.getElementsByTagName && e;
          }
          for (e in ((h = ae.support = {}),
          (s = ae.isXML = function (e) {
            var t = e.namespaceURI,
              n = (e.ownerDocument || e).documentElement;
            return !z.test(t || (n && n.nodeName) || "HTML");
          }),
          (b = ae.setDocument = function (e) {
            var t,
              n,
              i = e ? e.ownerDocument || e : _;
            return (
              i !== w &&
                9 === i.nodeType &&
                i.documentElement &&
                ((a = (w = i).documentElement),
                (C = !s(w)),
                _ !== w &&
                  (n = w.defaultView) &&
                  n.top !== n &&
                  (n.addEventListener
                    ? n.addEventListener("unload", r, !1)
                    : n.attachEvent && n.attachEvent("onunload", r)),
                (h.attributes = ce(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (h.getElementsByTagName = ce(function (e) {
                  return (
                    e.appendChild(w.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (h.getElementsByClassName = ee.test(w.getElementsByClassName)),
                (h.getById = ce(function (e) {
                  return (
                    (a.appendChild(e).id = S),
                    !w.getElementsByName || !w.getElementsByName(S).length
                  );
                })),
                h.getById
                  ? ((E.filter.ID = function (e) {
                      var t = e.replace(ie, f);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }),
                    (E.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && C) {
                        var n = t.getElementById(e);
                        return n ? [n] : [];
                      }
                    }))
                  : ((E.filter.ID = function (e) {
                      var n = e.replace(ie, f);
                      return function (e) {
                        var t =
                          void 0 !== e.getAttributeNode &&
                          e.getAttributeNode("id");
                        return t && t.value === n;
                      };
                    }),
                    (E.find.ID = function (e, t) {
                      if (void 0 !== t.getElementById && C) {
                        var n,
                          i,
                          r,
                          o = t.getElementById(e);
                        if (o) {
                          if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                          for (
                            r = t.getElementsByName(e), i = 0;
                            (o = r[i++]);

                          )
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                              return [o];
                        }
                        return [];
                      }
                    })),
                (E.find.TAG = h.getElementsByTagName
                  ? function (e, t) {
                      return void 0 !== t.getElementsByTagName
                        ? t.getElementsByTagName(e)
                        : h.qsa
                        ? t.querySelectorAll(e)
                        : void 0;
                    }
                  : function (e, t) {
                      var n,
                        i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                      if ("*" !== e) return o;
                      for (; (n = o[r++]); ) 1 === n.nodeType && i.push(n);
                      return i;
                    }),
                (E.find.CLASS =
                  h.getElementsByClassName &&
                  function (e, t) {
                    if (void 0 !== t.getElementsByClassName && C)
                      return t.getElementsByClassName(e);
                  }),
                (c = []),
                (m = []),
                (h.qsa = ee.test(w.querySelectorAll)) &&
                  (ce(function (e) {
                    (a.appendChild(e).innerHTML =
                      "<a id='" +
                      S +
                      "'></a><select id='" +
                      S +
                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                      e.querySelectorAll("[msallowcapture^='']").length &&
                        m.push("[*^$]=" + W + "*(?:''|\"\")"),
                      e.querySelectorAll("[selected]").length ||
                        m.push("\\[" + W + "*(?:value|" + M + ")"),
                      e.querySelectorAll("[id~=" + S + "-]").length ||
                        m.push("~="),
                      e.querySelectorAll(":checked").length ||
                        m.push(":checked"),
                      e.querySelectorAll("a#" + S + "+*").length ||
                        m.push(".#.+[+~]");
                  }),
                  ce(function (e) {
                    e.innerHTML =
                      "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = w.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("name", "D"),
                      e.querySelectorAll("[name=d]").length &&
                        m.push("name" + W + "*[*^$|!~]?="),
                      2 !== e.querySelectorAll(":enabled").length &&
                        m.push(":enabled", ":disabled"),
                      (a.appendChild(e).disabled = !0),
                      2 !== e.querySelectorAll(":disabled").length &&
                        m.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      m.push(",.*:");
                  })),
                (h.matchesSelector = ee.test(
                  (v =
                    a.matches ||
                    a.webkitMatchesSelector ||
                    a.mozMatchesSelector ||
                    a.oMatchesSelector ||
                    a.msMatchesSelector)
                )) &&
                  ce(function (e) {
                    (h.disconnectedMatch = v.call(e, "*")),
                      v.call(e, "[s!='']:x"),
                      c.push("!=", q);
                  }),
                (m = m.length && new RegExp(m.join("|"))),
                (c = c.length && new RegExp(c.join("|"))),
                (t = ee.test(a.compareDocumentPosition)),
                (y =
                  t || ee.test(a.contains)
                    ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                          i = t && t.parentNode;
                        return (
                          e === i ||
                          !(
                            !i ||
                            1 !== i.nodeType ||
                            !(n.contains
                              ? n.contains(i)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(i))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          for (; (t = t.parentNode); ) if (t === e) return !0;
                        return !1;
                      }),
                (N = t
                  ? function (e, t) {
                      if (e === t) return (u = !0), 0;
                      var n =
                        !e.compareDocumentPosition - !t.compareDocumentPosition;
                      return (
                        n ||
                        (1 &
                          (n =
                            (e.ownerDocument || e) === (t.ownerDocument || t)
                              ? e.compareDocumentPosition(t)
                              : 1) ||
                        (!h.sortDetached && t.compareDocumentPosition(e) === n)
                          ? e === w || (e.ownerDocument === _ && y(_, e))
                            ? -1
                            : t === w || (t.ownerDocument === _ && y(_, t))
                            ? 1
                            : l
                            ? R(l, e) - R(l, t)
                            : 0
                          : 4 & n
                          ? -1
                          : 1)
                      );
                    }
                  : function (e, t) {
                      if (e === t) return (u = !0), 0;
                      var n,
                        i = 0,
                        r = e.parentNode,
                        o = t.parentNode,
                        s = [e],
                        a = [t];
                      if (!r || !o)
                        return e === w
                          ? -1
                          : t === w
                          ? 1
                          : r
                          ? -1
                          : o
                          ? 1
                          : l
                          ? R(l, e) - R(l, t)
                          : 0;
                      if (r === o) return de(e, t);
                      for (n = e; (n = n.parentNode); ) s.unshift(n);
                      for (n = t; (n = n.parentNode); ) a.unshift(n);
                      for (; s[i] === a[i]; ) i++;
                      return i
                        ? de(s[i], a[i])
                        : s[i] === _
                        ? -1
                        : a[i] === _
                        ? 1
                        : 0;
                    })),
              w
            );
          }),
          (ae.matches = function (e, t) {
            return ae(e, null, null, t);
          }),
          (ae.matchesSelector = function (e, t) {
            if (
              ((e.ownerDocument || e) !== w && b(e),
              h.matchesSelector &&
                C &&
                !I[t + " "] &&
                (!c || !c.test(t)) &&
                (!m || !m.test(t)))
            )
              try {
                var n = v.call(e, t);
                if (
                  n ||
                  h.disconnectedMatch ||
                  (e.document && 11 !== e.document.nodeType)
                )
                  return n;
              } catch (e) {
                I(t, !0);
              }
            return 0 < ae(t, w, null, [e]).length;
          }),
          (ae.contains = function (e, t) {
            return (e.ownerDocument || e) !== w && b(e), y(e, t);
          }),
          (ae.attr = function (e, t) {
            (e.ownerDocument || e) !== w && b(e);
            var n = E.attrHandle[t.toLowerCase()],
              i =
                n && L.call(E.attrHandle, t.toLowerCase())
                  ? n(e, t, !C)
                  : void 0;
            return void 0 !== i
              ? i
              : h.attributes || !C
              ? e.getAttribute(t)
              : (i = e.getAttributeNode(t)) && i.specified
              ? i.value
              : null;
          }),
          (ae.escape = function (e) {
            return (e + "").replace(re, oe);
          }),
          (ae.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
          }),
          (ae.uniqueSort = function (e) {
            var t,
              n = [],
              i = 0,
              r = 0;
            if (
              ((u = !h.detectDuplicates),
              (l = !h.sortStable && e.slice(0)),
              e.sort(N),
              u)
            ) {
              for (; (t = e[r++]); ) t === e[r] && (i = n.push(r));
              for (; i--; ) e.splice(n[i], 1);
            }
            return (l = null), e;
          }),
          (o = ae.getText = function (e) {
            var t,
              n = "",
              i = 0,
              r = e.nodeType;
            if (r) {
              if (1 === r || 9 === r || 11 === r) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
              } else if (3 === r || 4 === r) return e.nodeValue;
            } else for (; (t = e[i++]); ) n += o(t);
            return n;
          }),
          ((E = ae.selectors = {
            cacheLength: 50,
            createPseudo: ue,
            match: Y,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace(ie, f)),
                  (e[3] = (e[3] || e[4] || e[5] || "").replace(ie, f)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || ae.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && ae.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var t,
                  n = !e[6] && e[2];
                return Y.CHILD.test(e[0])
                  ? null
                  : (e[3]
                      ? (e[2] = e[4] || e[5] || "")
                      : n &&
                        $.test(n) &&
                        (t = p(n, !0)) &&
                        (t = n.indexOf(")", n.length - t) - n.length) &&
                        ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(ie, f).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = D[e + " "];
                return (
                  t ||
                  ((t = new RegExp("(^|" + W + ")" + e + "(" + W + "|$)")) &&
                    D(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (void 0 !== e.getAttribute &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (n, i, r) {
                return function (e) {
                  var t = ae.attr(e, n);
                  return null == t
                    ? "!=" === i
                    : !i ||
                        ((t += ""),
                        "=" === i
                          ? t === r
                          : "!=" === i
                          ? t !== r
                          : "^=" === i
                          ? r && 0 === t.indexOf(r)
                          : "*=" === i
                          ? r && -1 < t.indexOf(r)
                          : "$=" === i
                          ? r && t.slice(-r.length) === r
                          : "~=" === i
                          ? -1 < (" " + t.replace(U, " ") + " ").indexOf(r)
                          : "|=" === i &&
                            (t === r || t.slice(0, r.length + 1) === r + "-"));
                };
              },
              CHILD: function (p, e, t, g, m) {
                var v = "nth" !== p.slice(0, 3),
                  y = "last" !== p.slice(-4),
                  _ = "of-type" === e;
                return 1 === g && 0 === m
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (e, t, n) {
                      var i,
                        r,
                        o,
                        s,
                        a,
                        l,
                        u = v != y ? "nextSibling" : "previousSibling",
                        c = e.parentNode,
                        f = _ && e.nodeName.toLowerCase(),
                        d = !n && !_,
                        h = !1;
                      if (c) {
                        if (v) {
                          for (; u; ) {
                            for (s = e; (s = s[u]); )
                              if (
                                _
                                  ? s.nodeName.toLowerCase() === f
                                  : 1 === s.nodeType
                              )
                                return !1;
                            l = u = "only" === p && !l && "nextSibling";
                          }
                          return !0;
                        }
                        if (((l = [y ? c.firstChild : c.lastChild]), y && d)) {
                          for (
                            h =
                              (a =
                                (i =
                                  (r =
                                    (o = (s = c)[S] || (s[S] = {}))[
                                      s.uniqueID
                                    ] || (o[s.uniqueID] = {}))[p] || [])[0] ===
                                  A && i[1]) && i[2],
                              s = a && c.childNodes[a];
                            (s = (++a && s && s[u]) || (h = a = 0) || l.pop());

                          )
                            if (1 === s.nodeType && ++h && s === e) {
                              r[p] = [A, a, h];
                              break;
                            }
                        } else if (
                          (d &&
                            (h = a =
                              (i =
                                (r =
                                  (o = (s = e)[S] || (s[S] = {}))[s.uniqueID] ||
                                  (o[s.uniqueID] = {}))[p] || [])[0] === A &&
                              i[1]),
                          !1 === h)
                        )
                          for (
                            ;
                            (s =
                              (++a && s && s[u]) || (h = a = 0) || l.pop()) &&
                            ((_
                              ? s.nodeName.toLowerCase() !== f
                              : 1 !== s.nodeType) ||
                              !++h ||
                              (d &&
                                ((r =
                                  (o = s[S] || (s[S] = {}))[s.uniqueID] ||
                                  (o[s.uniqueID] = {}))[p] = [A, h]),
                              s !== e));

                          );
                        return (h -= m) === g || (h % g == 0 && 0 <= h / g);
                      }
                    };
              },
              PSEUDO: function (e, o) {
                var t,
                  s =
                    E.pseudos[e] ||
                    E.setFilters[e.toLowerCase()] ||
                    ae.error("unsupported pseudo: " + e);
                return s[S]
                  ? s(o)
                  : 1 < s.length
                  ? ((t = [e, e, "", o]),
                    E.setFilters.hasOwnProperty(e.toLowerCase())
                      ? ue(function (e, t) {
                          for (var n, i = s(e, o), r = i.length; r--; )
                            e[(n = R(e, i[r]))] = !(t[n] = i[r]);
                        })
                      : function (e) {
                          return s(e, 0, t);
                        })
                  : s;
              },
            },
            pseudos: {
              not: ue(function (e) {
                var i = [],
                  r = [],
                  a = d(e.replace(B, "$1"));
                return a[S]
                  ? ue(function (e, t, n, i) {
                      for (var r, o = a(e, null, i, []), s = e.length; s--; )
                        (r = o[s]) && (e[s] = !(t[s] = r));
                    })
                  : function (e, t, n) {
                      return (
                        (i[0] = e), a(i, null, n, r), (i[0] = null), !r.pop()
                      );
                    };
              }),
              has: ue(function (t) {
                return function (e) {
                  return 0 < ae(t, e).length;
                };
              }),
              contains: ue(function (t) {
                return (
                  (t = t.replace(ie, f)),
                  function (e) {
                    return -1 < (e.textContent || o(e)).indexOf(t);
                  }
                );
              }),
              lang: ue(function (n) {
                return (
                  X.test(n || "") || ae.error("unsupported lang: " + n),
                  (n = n.replace(ie, f).toLowerCase()),
                  function (e) {
                    var t;
                    do {
                      if (
                        (t = C
                          ? e.lang
                          : e.getAttribute("xml:lang") ||
                            e.getAttribute("lang"))
                      )
                        return (
                          (t = t.toLowerCase()) === n ||
                          0 === t.indexOf(n + "-")
                        );
                    } while ((e = e.parentNode) && 1 === e.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (e) {
                var t = n.location && n.location.hash;
                return t && t.slice(1) === e.id;
              },
              root: function (e) {
                return e === a;
              },
              focus: function (e) {
                return (
                  e === w.activeElement &&
                  (!w.hasFocus || w.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: ge(!1),
              disabled: ge(!0),
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeType < 6) return !1;
                return !0;
              },
              parent: function (e) {
                return !E.pseudos.empty(e);
              },
              header: function (e) {
                return Z.test(e.nodeName);
              },
              input: function (e) {
                return J.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                var t;
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (t = e.getAttribute("type")) ||
                    "text" === t.toLowerCase())
                );
              },
              first: me(function () {
                return [0];
              }),
              last: me(function (e, t) {
                return [t - 1];
              }),
              eq: me(function (e, t, n) {
                return [n < 0 ? n + t : n];
              }),
              even: me(function (e, t) {
                for (var n = 0; n < t; n += 2) e.push(n);
                return e;
              }),
              odd: me(function (e, t) {
                for (var n = 1; n < t; n += 2) e.push(n);
                return e;
              }),
              lt: me(function (e, t, n) {
                for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i; )
                  e.push(i);
                return e;
              }),
              gt: me(function (e, t, n) {
                for (var i = n < 0 ? n + t : n; ++i < t; ) e.push(i);
                return e;
              }),
            },
          }).pseudos.nth = E.pseudos.eq),
          { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            E.pseudos[e] = he(e);
          for (e in { submit: !0, reset: !0 }) E.pseudos[e] = pe(e);
          function ye() {}
          function _e(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
            return i;
          }
          function Ee(a, e, t) {
            var l = e.dir,
              u = e.next,
              c = u || l,
              f = t && "parentNode" === c,
              d = i++;
            return e.first
              ? function (e, t, n) {
                  for (; (e = e[l]); )
                    if (1 === e.nodeType || f) return a(e, t, n);
                  return !1;
                }
              : function (e, t, n) {
                  var i,
                    r,
                    o,
                    s = [A, d];
                  if (n) {
                    for (; (e = e[l]); )
                      if ((1 === e.nodeType || f) && a(e, t, n)) return !0;
                  } else
                    for (; (e = e[l]); )
                      if (1 === e.nodeType || f)
                        if (
                          ((r =
                            (o = e[S] || (e[S] = {}))[e.uniqueID] ||
                            (o[e.uniqueID] = {})),
                          u && u === e.nodeName.toLowerCase())
                        )
                          e = e[l] || e;
                        else {
                          if ((i = r[c]) && i[0] === A && i[1] === d)
                            return (s[2] = i[2]);
                          if (((r[c] = s)[2] = a(e, t, n))) return !0;
                        }
                  return !1;
                };
          }
          function Te(r) {
            return 1 < r.length
              ? function (e, t, n) {
                  for (var i = r.length; i--; ) if (!r[i](e, t, n)) return !1;
                  return !0;
                }
              : r[0];
          }
          function be(e, t, n, i, r) {
            for (var o, s = [], a = 0, l = e.length, u = null != t; a < l; a++)
              (o = e[a]) && ((n && !n(o, i, r)) || (s.push(o), u && t.push(a)));
            return s;
          }
          function we(h, p, g, m, v, e) {
            return (
              m && !m[S] && (m = we(m)),
              v && !v[S] && (v = we(v, e)),
              ue(function (e, t, n, i) {
                var r,
                  o,
                  s,
                  a = [],
                  l = [],
                  u = t.length,
                  c =
                    e ||
                    (function (e, t, n) {
                      for (var i = 0, r = t.length; i < r; i++) ae(e, t[i], n);
                      return n;
                    })(p || "*", n.nodeType ? [n] : n, []),
                  f = !h || (!e && p) ? c : be(c, a, h, n, i),
                  d = g ? (v || (e ? h : u || m) ? [] : t) : f;
                if ((g && g(f, d, n, i), m))
                  for (r = be(d, l), m(r, [], n, i), o = r.length; o--; )
                    (s = r[o]) && (d[l[o]] = !(f[l[o]] = s));
                if (e) {
                  if (v || h) {
                    if (v) {
                      for (r = [], o = d.length; o--; )
                        (s = d[o]) && r.push((f[o] = s));
                      v(null, (d = []), r, i);
                    }
                    for (o = d.length; o--; )
                      (s = d[o]) &&
                        -1 < (r = v ? R(e, s) : a[o]) &&
                        (e[r] = !(t[r] = s));
                  }
                } else (d = be(d === t ? d.splice(u, d.length) : d)), v ? v(null, t, d, i) : H.apply(t, d);
              })
            );
          }
          function Ce(e) {
            for (
              var r,
                t,
                n,
                i = e.length,
                o = E.relative[e[0].type],
                s = o || E.relative[" "],
                a = o ? 1 : 0,
                l = Ee(
                  function (e) {
                    return e === r;
                  },
                  s,
                  !0
                ),
                u = Ee(
                  function (e) {
                    return -1 < R(r, e);
                  },
                  s,
                  !0
                ),
                c = [
                  function (e, t, n) {
                    var i =
                      (!o && (n || t !== T)) ||
                      ((r = t).nodeType ? l(e, t, n) : u(e, t, n));
                    return (r = null), i;
                  },
                ];
              a < i;
              a++
            )
              if ((t = E.relative[e[a].type])) c = [Ee(Te(c), t)];
              else {
                if ((t = E.filter[e[a].type].apply(null, e[a].matches))[S]) {
                  for (n = ++a; n < i && !E.relative[e[n].type]; n++);
                  return we(
                    1 < a && Te(c),
                    1 < a &&
                      _e(
                        e
                          .slice(0, a - 1)
                          .concat({ value: " " === e[a - 2].type ? "*" : "" })
                      ).replace(B, "$1"),
                    t,
                    a < n && Ce(e.slice(a, n)),
                    n < i && Ce((e = e.slice(n))),
                    n < i && _e(e)
                  );
                }
                c.push(t);
              }
            return Te(c);
          }
          function Se(m, v) {
            function e(e, t, n, i, r) {
              var o,
                s,
                a,
                l = 0,
                u = "0",
                c = e && [],
                f = [],
                d = T,
                h = e || (_ && E.find.TAG("*", r)),
                p = (A += null == d ? 1 : Math.random() || 0.1),
                g = h.length;
              for (
                r && (T = t === w || t || r);
                u !== g && null != (o = h[u]);
                u++
              ) {
                if (_ && o) {
                  for (
                    s = 0, t || o.ownerDocument === w || (b(o), (n = !C));
                    (a = m[s++]);

                  )
                    if (a(o, t || w, n)) {
                      i.push(o);
                      break;
                    }
                  r && (A = p);
                }
                y && ((o = !a && o) && l--, e && c.push(o));
              }
              if (((l += u), y && u !== l)) {
                for (s = 0; (a = v[s++]); ) a(c, f, t, n);
                if (e) {
                  if (0 < l) for (; u--; ) c[u] || f[u] || (f[u] = k.call(i));
                  f = be(f);
                }
                H.apply(i, f),
                  r &&
                    !e &&
                    0 < f.length &&
                    1 < l + v.length &&
                    ae.uniqueSort(i);
              }
              return r && ((A = p), (T = d)), c;
            }
            var y = 0 < v.length,
              _ = 0 < m.length;
            return y ? ue(e) : e;
          }
          return (
            (ye.prototype = E.filters = E.pseudos),
            (E.setFilters = new ye()),
            (p = ae.tokenize = function (e, t) {
              var n,
                i,
                r,
                o,
                s,
                a,
                l,
                u = x[e + " "];
              if (u) return t ? 0 : u.slice(0);
              for (s = e, a = [], l = E.preFilter; s; ) {
                for (o in ((n && !(i = G.exec(s))) ||
                  (i && (s = s.slice(i[0].length) || s), a.push((r = []))),
                (n = !1),
                (i = K.exec(s)) &&
                  ((n = i.shift()),
                  r.push({ value: n, type: i[0].replace(B, " ") }),
                  (s = s.slice(n.length))),
                E.filter))
                  !(i = Y[o].exec(s)) ||
                    (l[o] && !(i = l[o](i))) ||
                    ((n = i.shift()),
                    r.push({ value: n, type: o, matches: i }),
                    (s = s.slice(n.length)));
                if (!n) break;
              }
              return t ? s.length : s ? ae.error(e) : x(e, a).slice(0);
            }),
            (d = ae.compile = function (e, t) {
              var n,
                i = [],
                r = [],
                o = O[e + " "];
              if (!o) {
                for (n = (t = t || p(e)).length; n--; )
                  (o = Ce(t[n]))[S] ? i.push(o) : r.push(o);
                (o = O(e, Se(r, i))).selector = e;
              }
              return o;
            }),
            (g = ae.select = function (e, t, n, i) {
              var r,
                o,
                s,
                a,
                l,
                u = "function" == typeof e && e,
                c = !i && p((e = u.selector || e));
              if (((n = n || []), 1 === c.length)) {
                if (
                  2 < (o = c[0] = c[0].slice(0)).length &&
                  "ID" === (s = o[0]).type &&
                  9 === t.nodeType &&
                  C &&
                  E.relative[o[1].type]
                ) {
                  if (
                    !(t = (E.find.ID(s.matches[0].replace(ie, f), t) || [])[0])
                  )
                    return n;
                  u && (t = t.parentNode),
                    (e = e.slice(o.shift().value.length));
                }
                for (
                  r = Y.needsContext.test(e) ? 0 : o.length;
                  r-- && ((s = o[r]), !E.relative[(a = s.type)]);

                )
                  if (
                    (l = E.find[a]) &&
                    (i = l(
                      s.matches[0].replace(ie, f),
                      (ne.test(o[0].type) && ve(t.parentNode)) || t
                    ))
                  ) {
                    if ((o.splice(r, 1), !(e = i.length && _e(o))))
                      return H.apply(n, i), n;
                    break;
                  }
              }
              return (
                (u || d(e, c))(
                  i,
                  t,
                  !C,
                  n,
                  !t || (ne.test(e) && ve(t.parentNode)) || t
                ),
                n
              );
            }),
            (h.sortStable = S.split("").sort(N).join("") === S),
            (h.detectDuplicates = !!u),
            b(),
            (h.sortDetached = ce(function (e) {
              return 1 & e.compareDocumentPosition(w.createElement("fieldset"));
            })),
            ce(function (e) {
              return (
                (e.innerHTML = "<a href='#'></a>"),
                "#" === e.firstChild.getAttribute("href")
              );
            }) ||
              fe("type|href|height|width", function (e, t, n) {
                if (!n)
                  return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
              }),
            (h.attributes &&
              ce(function (e) {
                return (
                  (e.innerHTML = "<input/>"),
                  e.firstChild.setAttribute("value", ""),
                  "" === e.firstChild.getAttribute("value")
                );
              })) ||
              fe("value", function (e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                  return e.defaultValue;
              }),
            ce(function (e) {
              return null == e.getAttribute("disabled");
            }) ||
              fe(M, function (e, t, n) {
                var i;
                if (!n)
                  return !0 === e[t]
                    ? t.toLowerCase()
                    : (i = e.getAttributeNode(t)) && i.specified
                    ? i.value
                    : null;
              }),
            ae
          );
        })(w);
        (S.find = h),
          (S.expr = h.selectors),
          (S.expr[":"] = S.expr.pseudos),
          (S.uniqueSort = S.unique = h.uniqueSort),
          (S.text = h.getText),
          (S.isXMLDoc = h.isXML),
          (S.contains = h.contains),
          (S.escapeSelector = h.escape);
        function p(e, t, n) {
          for (var i = [], r = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
              if (r && S(e).is(n)) break;
              i.push(e);
            }
          return i;
        }
        function b(e, t) {
          for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
          return n;
        }
        var A = S.expr.match.needsContext;
        function D(e, t) {
          return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        }
        var x = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function O(e, n, i) {
          return _(n)
            ? S.grep(e, function (e, t) {
                return !!n.call(e, t, e) !== i;
              })
            : n.nodeType
            ? S.grep(e, function (e) {
                return (e === n) !== i;
              })
            : "string" != typeof n
            ? S.grep(e, function (e) {
                return -1 < r.call(n, e) !== i;
              })
            : S.filter(n, e, i);
        }
        (S.filter = function (e, t, n) {
          var i = t[0];
          return (
            n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === i.nodeType
              ? S.find.matchesSelector(i, e)
                ? [i]
                : []
              : S.find.matches(
                  e,
                  S.grep(t, function (e) {
                    return 1 === e.nodeType;
                  })
                )
          );
        }),
          S.fn.extend({
            find: function (e) {
              var t,
                n,
                i = this.length,
                r = this;
              if ("string" != typeof e)
                return this.pushStack(
                  S(e).filter(function () {
                    for (t = 0; t < i; t++)
                      if (S.contains(r[t], this)) return !0;
                  })
                );
              for (n = this.pushStack([]), t = 0; t < i; t++)
                S.find(e, r[t], n);
              return 1 < i ? S.uniqueSort(n) : n;
            },
            filter: function (e) {
              return this.pushStack(O(this, e || [], !1));
            },
            not: function (e) {
              return this.pushStack(O(this, e || [], !0));
            },
            is: function (e) {
              return !!O(
                this,
                "string" == typeof e && A.test(e) ? S(e) : e || [],
                !1
              ).length;
            },
          });
        var I,
          N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((S.fn.init = function (e, t, n) {
          var i, r;
          if (!e) return this;
          if (((n = n || I), "string" != typeof e))
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : _(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(S)
              : S.makeArray(e, this);
          if (
            !(i =
              "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
                ? [null, e, null]
                : N.exec(e)) ||
            (!i[1] && t)
          )
            return !t || t.jquery
              ? (t || n).find(e)
              : this.constructor(t).find(e);
          if (i[1]) {
            if (
              ((t = t instanceof S ? t[0] : t),
              S.merge(
                this,
                S.parseHTML(
                  i[1],
                  t && t.nodeType ? t.ownerDocument || t : C,
                  !0
                )
              ),
              x.test(i[1]) && S.isPlainObject(t))
            )
              for (i in t) _(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            return this;
          }
          return (
            (r = C.getElementById(i[2])) && ((this[0] = r), (this.length = 1)),
            this
          );
        }).prototype = S.fn),
          (I = S(C));
        var L = /^(?:parents|prev(?:Until|All))/,
          k = { children: !0, contents: !0, next: !0, prev: !0 };
        function P(e, t) {
          for (; (e = e[t]) && 1 !== e.nodeType; );
          return e;
        }
        S.fn.extend({
          has: function (e) {
            var t = S(e, this),
              n = t.length;
            return this.filter(function () {
              for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
            });
          },
          closest: function (e, t) {
            var n,
              i = 0,
              r = this.length,
              o = [],
              s = "string" != typeof e && S(e);
            if (!A.test(e))
              for (; i < r; i++)
                for (n = this[i]; n && n !== t; n = n.parentNode)
                  if (
                    n.nodeType < 11 &&
                    (s
                      ? -1 < s.index(n)
                      : 1 === n.nodeType && S.find.matchesSelector(n, e))
                  ) {
                    o.push(n);
                    break;
                  }
            return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
          },
          index: function (e) {
            return e
              ? "string" == typeof e
                ? r.call(S(e), this[0])
                : r.call(this, e.jquery ? e[0] : e)
              : this[0] && this[0].parentNode
              ? this.first().prevAll().length
              : -1;
          },
          add: function (e, t) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
          },
          addBack: function (e) {
            return this.add(
              null == e ? this.prevObject : this.prevObject.filter(e)
            );
          },
        }),
          S.each(
            {
              parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null;
              },
              parents: function (e) {
                return p(e, "parentNode");
              },
              parentsUntil: function (e, t, n) {
                return p(e, "parentNode", n);
              },
              next: function (e) {
                return P(e, "nextSibling");
              },
              prev: function (e) {
                return P(e, "previousSibling");
              },
              nextAll: function (e) {
                return p(e, "nextSibling");
              },
              prevAll: function (e) {
                return p(e, "previousSibling");
              },
              nextUntil: function (e, t, n) {
                return p(e, "nextSibling", n);
              },
              prevUntil: function (e, t, n) {
                return p(e, "previousSibling", n);
              },
              siblings: function (e) {
                return b((e.parentNode || {}).firstChild, e);
              },
              children: function (e) {
                return b(e.firstChild);
              },
              contents: function (e) {
                return void 0 !== e.contentDocument
                  ? e.contentDocument
                  : (D(e, "template") && (e = e.content || e),
                    S.merge([], e.childNodes));
              },
            },
            function (i, r) {
              S.fn[i] = function (e, t) {
                var n = S.map(this, r, e);
                return (
                  "Until" !== i.slice(-5) && (t = e),
                  t && "string" == typeof t && (n = S.filter(t, n)),
                  1 < this.length &&
                    (k[i] || S.uniqueSort(n), L.test(i) && n.reverse()),
                  this.pushStack(n)
                );
              };
            }
          );
        var H = /[^\x20\t\r\n\f]+/g;
        function j(e) {
          return e;
        }
        function R(e) {
          throw e;
        }
        function M(e, t, n, i) {
          var r;
          try {
            e && _((r = e.promise))
              ? r.call(e).done(t).fail(n)
              : e && _((r = e.then))
              ? r.call(e, t, n)
              : t.apply(void 0, [e].slice(i));
          } catch (e) {
            n.apply(void 0, [e]);
          }
        }
        (S.Callbacks = function (i) {
          var e, n;
          i =
            "string" == typeof i
              ? ((e = i),
                (n = {}),
                S.each(e.match(H) || [], function (e, t) {
                  n[t] = !0;
                }),
                n)
              : S.extend({}, i);
          function r() {
            for (a = a || i.once, s = o = !0; u.length; c = -1)
              for (t = u.shift(); ++c < l.length; )
                !1 === l[c].apply(t[0], t[1]) &&
                  i.stopOnFalse &&
                  ((c = l.length), (t = !1));
            i.memory || (t = !1), (o = !1), a && (l = t ? [] : "");
          }
          var o,
            t,
            s,
            a,
            l = [],
            u = [],
            c = -1,
            f = {
              add: function () {
                return (
                  l &&
                    (t && !o && ((c = l.length - 1), u.push(t)),
                    (function n(e) {
                      S.each(e, function (e, t) {
                        _(t)
                          ? (i.unique && f.has(t)) || l.push(t)
                          : t && t.length && "string" !== T(t) && n(t);
                      });
                    })(arguments),
                    t && !o && r()),
                  this
                );
              },
              remove: function () {
                return (
                  S.each(arguments, function (e, t) {
                    for (var n; -1 < (n = S.inArray(t, l, n)); )
                      l.splice(n, 1), n <= c && c--;
                  }),
                  this
                );
              },
              has: function (e) {
                return e ? -1 < S.inArray(e, l) : 0 < l.length;
              },
              empty: function () {
                return (l = l && []), this;
              },
              disable: function () {
                return (a = u = []), (l = t = ""), this;
              },
              disabled: function () {
                return !l;
              },
              lock: function () {
                return (a = u = []), t || o || (l = t = ""), this;
              },
              locked: function () {
                return !!a;
              },
              fireWith: function (e, t) {
                return (
                  a ||
                    ((t = [e, (t = t || []).slice ? t.slice() : t]),
                    u.push(t),
                    o || r()),
                  this
                );
              },
              fire: function () {
                return f.fireWith(this, arguments), this;
              },
              fired: function () {
                return !!s;
              },
            };
          return f;
        }),
          S.extend({
            Deferred: function (e) {
              var o = [
                  [
                    "notify",
                    "progress",
                    S.Callbacks("memory"),
                    S.Callbacks("memory"),
                    2,
                  ],
                  [
                    "resolve",
                    "done",
                    S.Callbacks("once memory"),
                    S.Callbacks("once memory"),
                    0,
                    "resolved",
                  ],
                  [
                    "reject",
                    "fail",
                    S.Callbacks("once memory"),
                    S.Callbacks("once memory"),
                    1,
                    "rejected",
                  ],
                ],
                r = "pending",
                s = {
                  state: function () {
                    return r;
                  },
                  always: function () {
                    return a.done(arguments).fail(arguments), this;
                  },
                  catch: function (e) {
                    return s.then(null, e);
                  },
                  pipe: function () {
                    var r = arguments;
                    return S.Deferred(function (i) {
                      S.each(o, function (e, t) {
                        var n = _(r[t[4]]) && r[t[4]];
                        a[t[1]](function () {
                          var e = n && n.apply(this, arguments);
                          e && _(e.promise)
                            ? e
                                .promise()
                                .progress(i.notify)
                                .done(i.resolve)
                                .fail(i.reject)
                            : i[t[0] + "With"](this, n ? [e] : arguments);
                        });
                      }),
                        (r = null);
                    }).promise();
                  },
                  then: function (t, n, i) {
                    var l = 0;
                    function u(r, o, s, a) {
                      return function () {
                        function e() {
                          var e, t;
                          if (!(r < l)) {
                            if ((e = s.apply(n, i)) === o.promise())
                              throw new TypeError("Thenable self-resolution");
                            (t =
                              e &&
                              ("object" == typeof e ||
                                "function" == typeof e) &&
                              e.then),
                              _(t)
                                ? a
                                  ? t.call(e, u(l, o, j, a), u(l, o, R, a))
                                  : (l++,
                                    t.call(
                                      e,
                                      u(l, o, j, a),
                                      u(l, o, R, a),
                                      u(l, o, j, o.notifyWith)
                                    ))
                                : (s !== j && ((n = void 0), (i = [e])),
                                  (a || o.resolveWith)(n, i));
                          }
                        }
                        var n = this,
                          i = arguments,
                          t = a
                            ? e
                            : function () {
                                try {
                                  e();
                                } catch (e) {
                                  S.Deferred.exceptionHook &&
                                    S.Deferred.exceptionHook(e, t.stackTrace),
                                    l <= r + 1 &&
                                      (s !== R && ((n = void 0), (i = [e])),
                                      o.rejectWith(n, i));
                                }
                              };
                        r
                          ? t()
                          : (S.Deferred.getStackHook &&
                              (t.stackTrace = S.Deferred.getStackHook()),
                            w.setTimeout(t));
                      };
                    }
                    return S.Deferred(function (e) {
                      o[0][3].add(u(0, e, _(i) ? i : j, e.notifyWith)),
                        o[1][3].add(u(0, e, _(t) ? t : j)),
                        o[2][3].add(u(0, e, _(n) ? n : R));
                    }).promise();
                  },
                  promise: function (e) {
                    return null != e ? S.extend(e, s) : s;
                  },
                },
                a = {};
              return (
                S.each(o, function (e, t) {
                  var n = t[2],
                    i = t[5];
                  (s[t[1]] = n.add),
                    i &&
                      n.add(
                        function () {
                          r = i;
                        },
                        o[3 - e][2].disable,
                        o[3 - e][3].disable,
                        o[0][2].lock,
                        o[0][3].lock
                      ),
                    n.add(t[3].fire),
                    (a[t[0]] = function () {
                      return (
                        a[t[0] + "With"](this === a ? void 0 : this, arguments),
                        this
                      );
                    }),
                    (a[t[0] + "With"] = n.fireWith);
                }),
                s.promise(a),
                e && e.call(a, a),
                a
              );
            },
            when: function (e) {
              function t(t) {
                return function (e) {
                  (r[t] = this),
                    (o[t] = 1 < arguments.length ? a.call(arguments) : e),
                    --n || s.resolveWith(r, o);
                };
              }
              var n = arguments.length,
                i = n,
                r = Array(i),
                o = a.call(arguments),
                s = S.Deferred();
              if (
                n <= 1 &&
                (M(e, s.done(t(i)).resolve, s.reject, !n),
                "pending" === s.state() || _(o[i] && o[i].then))
              )
                return s.then();
              for (; i--; ) M(o[i], t(i), s.reject);
              return s.promise();
            },
          });
        var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (S.Deferred.exceptionHook = function (e, t) {
          w.console &&
            w.console.warn &&
            e &&
            W.test(e.name) &&
            w.console.warn(
              "jQuery.Deferred exception: " + e.message,
              e.stack,
              t
            );
        }),
          (S.readyException = function (e) {
            w.setTimeout(function () {
              throw e;
            });
          });
        var F = S.Deferred();
        function V() {
          C.removeEventListener("DOMContentLoaded", V),
            w.removeEventListener("load", V),
            S.ready();
        }
        (S.fn.ready = function (e) {
          return (
            F.then(e).catch(function (e) {
              S.readyException(e);
            }),
            this
          );
        }),
          S.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (e) {
              (!0 === e ? --S.readyWait : S.isReady) ||
                ((S.isReady = !0) !== e && 0 < --S.readyWait) ||
                F.resolveWith(C, [S]);
            },
          }),
          (S.ready.then = F.then),
          "complete" === C.readyState ||
          ("loading" !== C.readyState && !C.documentElement.doScroll)
            ? w.setTimeout(S.ready)
            : (C.addEventListener("DOMContentLoaded", V),
              w.addEventListener("load", V));
        var q = function (e, t, n, i, r, o, s) {
            var a = 0,
              l = e.length,
              u = null == n;
            if ("object" === T(n))
              for (a in ((r = !0), n)) q(e, t, a, n[a], !0, o, s);
            else if (
              void 0 !== i &&
              ((r = !0),
              _(i) || (s = !0),
              u &&
                (t = s
                  ? (t.call(e, i), null)
                  : ((u = t),
                    function (e, t, n) {
                      return u.call(S(e), n);
                    })),
              t)
            )
              for (; a < l; a++)
                t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
            return r ? e : u ? t.call(e) : l ? t(e[0], n) : o;
          },
          U = /^-ms-/,
          B = /-([a-z])/g;
        function G(e, t) {
          return t.toUpperCase();
        }
        function K(e) {
          return e.replace(U, "ms-").replace(B, G);
        }
        function Q(e) {
          return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
        }
        function $() {
          this.expando = S.expando + $.uid++;
        }
        ($.uid = 1),
          ($.prototype = {
            cache: function (e) {
              var t = e[this.expando];
              return (
                t ||
                  ((t = {}),
                  Q(e) &&
                    (e.nodeType
                      ? (e[this.expando] = t)
                      : Object.defineProperty(e, this.expando, {
                          value: t,
                          configurable: !0,
                        }))),
                t
              );
            },
            set: function (e, t, n) {
              var i,
                r = this.cache(e);
              if ("string" == typeof t) r[K(t)] = n;
              else for (i in t) r[K(i)] = t[i];
              return r;
            },
            get: function (e, t) {
              return void 0 === t
                ? this.cache(e)
                : e[this.expando] && e[this.expando][K(t)];
            },
            access: function (e, t, n) {
              return void 0 === t || (t && "string" == typeof t && void 0 === n)
                ? this.get(e, t)
                : (this.set(e, t, n), void 0 !== n ? n : t);
            },
            remove: function (e, t) {
              var n,
                i = e[this.expando];
              if (void 0 !== i) {
                if (void 0 !== t) {
                  n = (t = Array.isArray(t)
                    ? t.map(K)
                    : (t = K(t)) in i
                    ? [t]
                    : t.match(H) || []).length;
                  for (; n--; ) delete i[t[n]];
                }
                (void 0 !== t && !S.isEmptyObject(i)) ||
                  (e.nodeType
                    ? (e[this.expando] = void 0)
                    : delete e[this.expando]);
              }
            },
            hasData: function (e) {
              var t = e[this.expando];
              return void 0 !== t && !S.isEmptyObject(t);
            },
          });
        var X = new $(),
          Y = new $(),
          z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
          J = /[A-Z]/g;
        function Z(e, t, n) {
          var i, r;
          if (void 0 === n && 1 === e.nodeType)
            if (
              ((i = "data-" + t.replace(J, "-$&").toLowerCase()),
              "string" == typeof (n = e.getAttribute(i)))
            ) {
              try {
                n =
                  "true" === (r = n) ||
                  ("false" !== r &&
                    ("null" === r
                      ? null
                      : r === +r + ""
                      ? +r
                      : z.test(r)
                      ? JSON.parse(r)
                      : r));
              } catch (e) {}
              Y.set(e, t, n);
            } else n = void 0;
          return n;
        }
        S.extend({
          hasData: function (e) {
            return Y.hasData(e) || X.hasData(e);
          },
          data: function (e, t, n) {
            return Y.access(e, t, n);
          },
          removeData: function (e, t) {
            Y.remove(e, t);
          },
          _data: function (e, t, n) {
            return X.access(e, t, n);
          },
          _removeData: function (e, t) {
            X.remove(e, t);
          },
        }),
          S.fn.extend({
            data: function (n, e) {
              var t,
                i,
                r,
                o = this[0],
                s = o && o.attributes;
              if (void 0 !== n)
                return "object" == typeof n
                  ? this.each(function () {
                      Y.set(this, n);
                    })
                  : q(
                      this,
                      function (e) {
                        var t;
                        if (o && void 0 === e)
                          return void 0 !== (t = Y.get(o, n))
                            ? t
                            : void 0 !== (t = Z(o, n))
                            ? t
                            : void 0;
                        this.each(function () {
                          Y.set(this, n, e);
                        });
                      },
                      null,
                      e,
                      1 < arguments.length,
                      null,
                      !0
                    );
              if (
                this.length &&
                ((r = Y.get(o)), 1 === o.nodeType && !X.get(o, "hasDataAttrs"))
              ) {
                for (t = s.length; t--; )
                  s[t] &&
                    0 === (i = s[t].name).indexOf("data-") &&
                    ((i = K(i.slice(5))), Z(o, i, r[i]));
                X.set(o, "hasDataAttrs", !0);
              }
              return r;
            },
            removeData: function (e) {
              return this.each(function () {
                Y.remove(this, e);
              });
            },
          }),
          S.extend({
            queue: function (e, t, n) {
              var i;
              if (e)
                return (
                  (t = (t || "fx") + "queue"),
                  (i = X.get(e, t)),
                  n &&
                    (!i || Array.isArray(n)
                      ? (i = X.access(e, t, S.makeArray(n)))
                      : i.push(n)),
                  i || []
                );
            },
            dequeue: function (e, t) {
              t = t || "fx";
              var n = S.queue(e, t),
                i = n.length,
                r = n.shift(),
                o = S._queueHooks(e, t);
              "inprogress" === r && ((r = n.shift()), i--),
                r &&
                  ("fx" === t && n.unshift("inprogress"),
                  delete o.stop,
                  r.call(
                    e,
                    function () {
                      S.dequeue(e, t);
                    },
                    o
                  )),
                !i && o && o.empty.fire();
            },
            _queueHooks: function (e, t) {
              var n = t + "queueHooks";
              return (
                X.get(e, n) ||
                X.access(e, n, {
                  empty: S.Callbacks("once memory").add(function () {
                    X.remove(e, [t + "queue", n]);
                  }),
                })
              );
            },
          }),
          S.fn.extend({
            queue: function (t, n) {
              var e = 2;
              return (
                "string" != typeof t && ((n = t), (t = "fx"), e--),
                arguments.length < e
                  ? S.queue(this[0], t)
                  : void 0 === n
                  ? this
                  : this.each(function () {
                      var e = S.queue(this, t, n);
                      S._queueHooks(this, t),
                        "fx" === t &&
                          "inprogress" !== e[0] &&
                          S.dequeue(this, t);
                    })
              );
            },
            dequeue: function (e) {
              return this.each(function () {
                S.dequeue(this, e);
              });
            },
            clearQueue: function (e) {
              return this.queue(e || "fx", []);
            },
            promise: function (e, t) {
              function n() {
                --r || o.resolveWith(s, [s]);
              }
              var i,
                r = 1,
                o = S.Deferred(),
                s = this,
                a = this.length;
              for (
                "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
                a--;

              )
                (i = X.get(s[a], e + "queueHooks")) &&
                  i.empty &&
                  (r++, i.empty.add(n));
              return n(), o.promise(t);
            },
          });
        var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
          te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
          ne = ["Top", "Right", "Bottom", "Left"],
          ie = C.documentElement,
          re = function (e) {
            return S.contains(e.ownerDocument, e);
          },
          oe = { composed: !0 };
        ie.getRootNode &&
          (re = function (e) {
            return (
              S.contains(e.ownerDocument, e) ||
              e.getRootNode(oe) === e.ownerDocument
            );
          });
        function se(e, t, n, i) {
          var r,
            o,
            s = {};
          for (o in t) (s[o] = e.style[o]), (e.style[o] = t[o]);
          for (o in ((r = n.apply(e, i || [])), t)) e.style[o] = s[o];
          return r;
        }
        var ae = function (e, t) {
          return (
            "none" === (e = t || e).style.display ||
            ("" === e.style.display && re(e) && "none" === S.css(e, "display"))
          );
        };
        function le(e, t, n, i) {
          var r,
            o,
            s = 20,
            a = i
              ? function () {
                  return i.cur();
                }
              : function () {
                  return S.css(e, t, "");
                },
            l = a(),
            u = (n && n[3]) || (S.cssNumber[t] ? "" : "px"),
            c =
              e.nodeType &&
              (S.cssNumber[t] || ("px" !== u && +l)) &&
              te.exec(S.css(e, t));
          if (c && c[3] !== u) {
            for (l /= 2, u = u || c[3], c = +l || 1; s--; )
              S.style(e, t, c + u),
                (1 - o) * (1 - (o = a() / l || 0.5)) <= 0 && (s = 0),
                (c /= o);
            (c *= 2), S.style(e, t, c + u), (n = n || []);
          }
          return (
            n &&
              ((c = +c || +l || 0),
              (r = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
              i && ((i.unit = u), (i.start = c), (i.end = r))),
            r
          );
        }
        var ue = {};
        function ce(e, t) {
          for (var n, i, r, o, s, a, l, u = [], c = 0, f = e.length; c < f; c++)
            (i = e[c]).style &&
              ((n = i.style.display),
              t
                ? ("none" === n &&
                    ((u[c] = X.get(i, "display") || null),
                    u[c] || (i.style.display = "")),
                  "" === i.style.display &&
                    ae(i) &&
                    (u[c] =
                      ((l = s = o = void 0),
                      (s = (r = i).ownerDocument),
                      (a = r.nodeName),
                      (l = ue[a]) ||
                        ((o = s.body.appendChild(s.createElement(a))),
                        (l = S.css(o, "display")),
                        o.parentNode.removeChild(o),
                        "none" === l && (l = "block"),
                        (ue[a] = l)))))
                : "none" !== n && ((u[c] = "none"), X.set(i, "display", n)));
          for (c = 0; c < f; c++) null != u[c] && (e[c].style.display = u[c]);
          return e;
        }
        S.fn.extend({
          show: function () {
            return ce(this, !0);
          },
          hide: function () {
            return ce(this);
          },
          toggle: function (e) {
            return "boolean" == typeof e
              ? e
                ? this.show()
                : this.hide()
              : this.each(function () {
                  ae(this) ? S(this).show() : S(this).hide();
                });
          },
        });
        var fe = /^(?:checkbox|radio)$/i,
          de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
          he = /^$|^module$|\/(?:java|ecma)script/i,
          pe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
          };
        function ge(e, t) {
          var n;
          return (
            (n =
              void 0 !== e.getElementsByTagName
                ? e.getElementsByTagName(t || "*")
                : void 0 !== e.querySelectorAll
                ? e.querySelectorAll(t || "*")
                : []),
            void 0 === t || (t && D(e, t)) ? S.merge([e], n) : n
          );
        }
        function me(e, t) {
          for (var n = 0, i = e.length; n < i; n++)
            X.set(e[n], "globalEval", !t || X.get(t[n], "globalEval"));
        }
        (pe.optgroup = pe.option),
          (pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead),
          (pe.th = pe.td);
        var ve,
          ye,
          _e = /<|&#?\w+;/;
        function Ee(e, t, n, i, r) {
          for (
            var o,
              s,
              a,
              l,
              u,
              c,
              f = t.createDocumentFragment(),
              d = [],
              h = 0,
              p = e.length;
            h < p;
            h++
          )
            if ((o = e[h]) || 0 === o)
              if ("object" === T(o)) S.merge(d, o.nodeType ? [o] : o);
              else if (_e.test(o)) {
                for (
                  s = s || f.appendChild(t.createElement("div")),
                    a = (de.exec(o) || ["", ""])[1].toLowerCase(),
                    l = pe[a] || pe._default,
                    s.innerHTML = l[1] + S.htmlPrefilter(o) + l[2],
                    c = l[0];
                  c--;

                )
                  s = s.lastChild;
                S.merge(d, s.childNodes), ((s = f.firstChild).textContent = "");
              } else d.push(t.createTextNode(o));
          for (f.textContent = "", h = 0; (o = d[h++]); )
            if (i && -1 < S.inArray(o, i)) r && r.push(o);
            else if (
              ((u = re(o)), (s = ge(f.appendChild(o), "script")), u && me(s), n)
            )
              for (c = 0; (o = s[c++]); ) he.test(o.type || "") && n.push(o);
          return f;
        }
        (ve = C.createDocumentFragment().appendChild(C.createElement("div"))),
          (ye = C.createElement("input")).setAttribute("type", "radio"),
          ye.setAttribute("checked", "checked"),
          ye.setAttribute("name", "t"),
          ve.appendChild(ye),
          (y.checkClone = ve.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (ve.innerHTML = "<textarea>x</textarea>"),
          (y.noCloneChecked = !!ve.cloneNode(!0).lastChild.defaultValue);
        var Te = /^key/,
          be = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
          we = /^([^.]*)(?:\.(.+)|)/;
        function Ce() {
          return !0;
        }
        function Se() {
          return !1;
        }
        function Ae(e, t) {
          return (
            (e ===
              (function () {
                try {
                  return C.activeElement;
                } catch (e) {}
              })()) ==
            ("focus" === t)
          );
        }
        function De(e, t, n, i, r, o) {
          var s, a;
          if ("object" == typeof t) {
            for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), t))
              De(e, a, n, i, t[a], o);
            return e;
          }
          if (
            (null == i && null == r
              ? ((r = n), (i = n = void 0))
              : null == r &&
                ("string" == typeof n
                  ? ((r = i), (i = void 0))
                  : ((r = i), (i = n), (n = void 0))),
            !1 === r)
          )
            r = Se;
          else if (!r) return e;
          return (
            1 === o &&
              ((s = r),
              ((r = function (e) {
                return S().off(e), s.apply(this, arguments);
              }).guid = s.guid || (s.guid = S.guid++))),
            e.each(function () {
              S.event.add(this, t, r, i, n);
            })
          );
        }
        function xe(e, r, o) {
          o
            ? (X.set(e, r, !1),
              S.event.add(e, r, {
                namespace: !1,
                handler: function (e) {
                  var t,
                    n,
                    i = X.get(this, r);
                  if (1 & e.isTrigger && this[r]) {
                    if (i.length)
                      (S.event.special[r] || {}).delegateType &&
                        e.stopPropagation();
                    else if (
                      ((i = a.call(arguments)),
                      X.set(this, r, i),
                      (t = o(this, r)),
                      this[r](),
                      i !== (n = X.get(this, r)) || t
                        ? X.set(this, r, !1)
                        : (n = {}),
                      i !== n)
                    )
                      return (
                        e.stopImmediatePropagation(),
                        e.preventDefault(),
                        n.value
                      );
                  } else
                    i.length &&
                      (X.set(this, r, {
                        value: S.event.trigger(
                          S.extend(i[0], S.Event.prototype),
                          i.slice(1),
                          this
                        ),
                      }),
                      e.stopImmediatePropagation());
                },
              }))
            : void 0 === X.get(e, r) && S.event.add(e, r, Ce);
        }
        (S.event = {
          global: {},
          add: function (t, e, n, i, r) {
            var o,
              s,
              a,
              l,
              u,
              c,
              f,
              d,
              h,
              p,
              g,
              m = X.get(t);
            if (m)
              for (
                n.handler && ((n = (o = n).handler), (r = o.selector)),
                  r && S.find.matchesSelector(ie, r),
                  n.guid || (n.guid = S.guid++),
                  (l = m.events) || (l = m.events = {}),
                  (s = m.handle) ||
                    (s = m.handle = function (e) {
                      return void 0 !== S && S.event.triggered !== e.type
                        ? S.event.dispatch.apply(t, arguments)
                        : void 0;
                    }),
                  u = (e = (e || "").match(H) || [""]).length;
                u--;

              )
                (h = g = (a = we.exec(e[u]) || [])[1]),
                  (p = (a[2] || "").split(".").sort()),
                  h &&
                    ((f = S.event.special[h] || {}),
                    (h = (r ? f.delegateType : f.bindType) || h),
                    (f = S.event.special[h] || {}),
                    (c = S.extend(
                      {
                        type: h,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && S.expr.match.needsContext.test(r),
                        namespace: p.join("."),
                      },
                      o
                    )),
                    (d = l[h]) ||
                      (((d = l[h] = []).delegateCount = 0),
                      (f.setup && !1 !== f.setup.call(t, i, p, s)) ||
                        (t.addEventListener && t.addEventListener(h, s))),
                    f.add &&
                      (f.add.call(t, c),
                      c.handler.guid || (c.handler.guid = n.guid)),
                    r ? d.splice(d.delegateCount++, 0, c) : d.push(c),
                    (S.event.global[h] = !0));
          },
          remove: function (e, t, n, i, r) {
            var o,
              s,
              a,
              l,
              u,
              c,
              f,
              d,
              h,
              p,
              g,
              m = X.hasData(e) && X.get(e);
            if (m && (l = m.events)) {
              for (u = (t = (t || "").match(H) || [""]).length; u--; )
                if (
                  ((h = g = (a = we.exec(t[u]) || [])[1]),
                  (p = (a[2] || "").split(".").sort()),
                  h)
                ) {
                  for (
                    f = S.event.special[h] || {},
                      d = l[(h = (i ? f.delegateType : f.bindType) || h)] || [],
                      a =
                        a[2] &&
                        new RegExp(
                          "(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"
                        ),
                      s = o = d.length;
                    o--;

                  )
                    (c = d[o]),
                      (!r && g !== c.origType) ||
                        (n && n.guid !== c.guid) ||
                        (a && !a.test(c.namespace)) ||
                        (i &&
                          i !== c.selector &&
                          ("**" !== i || !c.selector)) ||
                        (d.splice(o, 1),
                        c.selector && d.delegateCount--,
                        f.remove && f.remove.call(e, c));
                  s &&
                    !d.length &&
                    ((f.teardown && !1 !== f.teardown.call(e, p, m.handle)) ||
                      S.removeEvent(e, h, m.handle),
                    delete l[h]);
                } else for (h in l) S.event.remove(e, h + t[u], n, i, !0);
              S.isEmptyObject(l) && X.remove(e, "handle events");
            }
          },
          dispatch: function (e) {
            var t,
              n,
              i,
              r,
              o,
              s,
              a = S.event.fix(e),
              l = new Array(arguments.length),
              u = (X.get(this, "events") || {})[a.type] || [],
              c = S.event.special[a.type] || {};
            for (l[0] = a, t = 1; t < arguments.length; t++)
              l[t] = arguments[t];
            if (
              ((a.delegateTarget = this),
              !c.preDispatch || !1 !== c.preDispatch.call(this, a))
            ) {
              for (
                s = S.event.handlers.call(this, a, u), t = 0;
                (r = s[t++]) && !a.isPropagationStopped();

              )
                for (
                  a.currentTarget = r.elem, n = 0;
                  (o = r.handlers[n++]) && !a.isImmediatePropagationStopped();

                )
                  (a.rnamespace &&
                    !1 !== o.namespace &&
                    !a.rnamespace.test(o.namespace)) ||
                    ((a.handleObj = o),
                    (a.data = o.data),
                    void 0 !==
                      (i = (
                        (S.event.special[o.origType] || {}).handle || o.handler
                      ).apply(r.elem, l)) &&
                      !1 === (a.result = i) &&
                      (a.preventDefault(), a.stopPropagation()));
              return c.postDispatch && c.postDispatch.call(this, a), a.result;
            }
          },
          handlers: function (e, t) {
            var n,
              i,
              r,
              o,
              s,
              a = [],
              l = t.delegateCount,
              u = e.target;
            if (l && u.nodeType && !("click" === e.type && 1 <= e.button))
              for (; u !== this; u = u.parentNode || this)
                if (
                  1 === u.nodeType &&
                  ("click" !== e.type || !0 !== u.disabled)
                ) {
                  for (o = [], s = {}, n = 0; n < l; n++)
                    void 0 === s[(r = (i = t[n]).selector + " ")] &&
                      (s[r] = i.needsContext
                        ? -1 < S(r, this).index(u)
                        : S.find(r, this, null, [u]).length),
                      s[r] && o.push(i);
                  o.length && a.push({ elem: u, handlers: o });
                }
            return (
              (u = this),
              l < t.length && a.push({ elem: u, handlers: t.slice(l) }),
              a
            );
          },
          addProp: function (t, e) {
            Object.defineProperty(S.Event.prototype, t, {
              enumerable: !0,
              configurable: !0,
              get: _(e)
                ? function () {
                    if (this.originalEvent) return e(this.originalEvent);
                  }
                : function () {
                    if (this.originalEvent) return this.originalEvent[t];
                  },
              set: function (e) {
                Object.defineProperty(this, t, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: e,
                });
              },
            });
          },
          fix: function (e) {
            return e[S.expando] ? e : new S.Event(e);
          },
          special: {
            load: { noBubble: !0 },
            click: {
              setup: function (e) {
                var t = this || e;
                return (
                  fe.test(t.type) &&
                    t.click &&
                    D(t, "input") &&
                    xe(t, "click", Ce),
                  !1
                );
              },
              trigger: function (e) {
                var t = this || e;
                return (
                  fe.test(t.type) && t.click && D(t, "input") && xe(t, "click"),
                  !0
                );
              },
              _default: function (e) {
                var t = e.target;
                return (
                  (fe.test(t.type) &&
                    t.click &&
                    D(t, "input") &&
                    X.get(t, "click")) ||
                  D(t, "a")
                );
              },
            },
            beforeunload: {
              postDispatch: function (e) {
                void 0 !== e.result &&
                  e.originalEvent &&
                  (e.originalEvent.returnValue = e.result);
              },
            },
          },
        }),
          (S.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n);
          }),
          (S.Event = function (e, t) {
            if (!(this instanceof S.Event)) return new S.Event(e, t);
            e && e.type
              ? ((this.originalEvent = e),
                (this.type = e.type),
                (this.isDefaultPrevented =
                  e.defaultPrevented ||
                  (void 0 === e.defaultPrevented && !1 === e.returnValue)
                    ? Ce
                    : Se),
                (this.target =
                  e.target && 3 === e.target.nodeType
                    ? e.target.parentNode
                    : e.target),
                (this.currentTarget = e.currentTarget),
                (this.relatedTarget = e.relatedTarget))
              : (this.type = e),
              t && S.extend(this, t),
              (this.timeStamp = (e && e.timeStamp) || Date.now()),
              (this[S.expando] = !0);
          }),
          (S.Event.prototype = {
            constructor: S.Event,
            isDefaultPrevented: Se,
            isPropagationStopped: Se,
            isImmediatePropagationStopped: Se,
            isSimulated: !1,
            preventDefault: function () {
              var e = this.originalEvent;
              (this.isDefaultPrevented = Ce),
                e && !this.isSimulated && e.preventDefault();
            },
            stopPropagation: function () {
              var e = this.originalEvent;
              (this.isPropagationStopped = Ce),
                e && !this.isSimulated && e.stopPropagation();
            },
            stopImmediatePropagation: function () {
              var e = this.originalEvent;
              (this.isImmediatePropagationStopped = Ce),
                e && !this.isSimulated && e.stopImmediatePropagation(),
                this.stopPropagation();
            },
          }),
          S.each(
            {
              altKey: !0,
              bubbles: !0,
              cancelable: !0,
              changedTouches: !0,
              ctrlKey: !0,
              detail: !0,
              eventPhase: !0,
              metaKey: !0,
              pageX: !0,
              pageY: !0,
              shiftKey: !0,
              view: !0,
              char: !0,
              code: !0,
              charCode: !0,
              key: !0,
              keyCode: !0,
              button: !0,
              buttons: !0,
              clientX: !0,
              clientY: !0,
              offsetX: !0,
              offsetY: !0,
              pointerId: !0,
              pointerType: !0,
              screenX: !0,
              screenY: !0,
              targetTouches: !0,
              toElement: !0,
              touches: !0,
              which: function (e) {
                var t = e.button;
                return null == e.which && Te.test(e.type)
                  ? null != e.charCode
                    ? e.charCode
                    : e.keyCode
                  : !e.which && void 0 !== t && be.test(e.type)
                  ? 1 & t
                    ? 1
                    : 2 & t
                    ? 3
                    : 4 & t
                    ? 2
                    : 0
                  : e.which;
              },
            },
            S.event.addProp
          ),
          S.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
            S.event.special[e] = {
              setup: function () {
                return xe(this, e, Ae), !1;
              },
              trigger: function () {
                return xe(this, e), !0;
              },
              delegateType: t,
            };
          }),
          S.each(
            {
              mouseenter: "mouseover",
              mouseleave: "mouseout",
              pointerenter: "pointerover",
              pointerleave: "pointerout",
            },
            function (e, r) {
              S.event.special[e] = {
                delegateType: r,
                bindType: r,
                handle: function (e) {
                  var t,
                    n = e.relatedTarget,
                    i = e.handleObj;
                  return (
                    (n && (n === this || S.contains(this, n))) ||
                      ((e.type = i.origType),
                      (t = i.handler.apply(this, arguments)),
                      (e.type = r)),
                    t
                  );
                },
              };
            }
          ),
          S.fn.extend({
            on: function (e, t, n, i) {
              return De(this, e, t, n, i);
            },
            one: function (e, t, n, i) {
              return De(this, e, t, n, i, 1);
            },
            off: function (e, t, n) {
              var i, r;
              if (e && e.preventDefault && e.handleObj)
                return (
                  (i = e.handleObj),
                  S(e.delegateTarget).off(
                    i.namespace ? i.origType + "." + i.namespace : i.origType,
                    i.selector,
                    i.handler
                  ),
                  this
                );
              if ("object" != typeof e)
                return (
                  (!1 !== t && "function" != typeof t) ||
                    ((n = t), (t = void 0)),
                  !1 === n && (n = Se),
                  this.each(function () {
                    S.event.remove(this, e, n, t);
                  })
                );
              for (r in e) this.off(r, t, e[r]);
              return this;
            },
          });
        var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
          Ie = /<script|<style|<link/i,
          Ne = /checked\s*(?:[^=]|=\s*.checked.)/i,
          Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function ke(e, t) {
          return (
            (D(e, "table") &&
              D(11 !== t.nodeType ? t : t.firstChild, "tr") &&
              S(e).children("tbody")[0]) ||
            e
          );
        }
        function Pe(e) {
          return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
        }
        function He(e) {
          return (
            "true/" === (e.type || "").slice(0, 5)
              ? (e.type = e.type.slice(5))
              : e.removeAttribute("type"),
            e
          );
        }
        function je(e, t) {
          var n, i, r, o, s, a, l, u;
          if (1 === t.nodeType) {
            if (
              X.hasData(e) &&
              ((o = X.access(e)), (s = X.set(t, o)), (u = o.events))
            )
              for (r in (delete s.handle, (s.events = {}), u))
                for (n = 0, i = u[r].length; n < i; n++)
                  S.event.add(t, r, u[r][n]);
            Y.hasData(e) &&
              ((a = Y.access(e)), (l = S.extend({}, a)), Y.set(t, l));
          }
        }
        function Re(n, i, r, o) {
          i = m.apply([], i);
          var e,
            t,
            s,
            a,
            l,
            u,
            c = 0,
            f = n.length,
            d = f - 1,
            h = i[0],
            p = _(h);
          if (
            p ||
            (1 < f && "string" == typeof h && !y.checkClone && Ne.test(h))
          )
            return n.each(function (e) {
              var t = n.eq(e);
              p && (i[0] = h.call(this, e, t.html())), Re(t, i, r, o);
            });
          if (
            f &&
            ((t = (e = Ee(i, n[0].ownerDocument, !1, n, o)).firstChild),
            1 === e.childNodes.length && (e = t),
            t || o)
          ) {
            for (a = (s = S.map(ge(e, "script"), Pe)).length; c < f; c++)
              (l = e),
                c !== d &&
                  ((l = S.clone(l, !0, !0)), a && S.merge(s, ge(l, "script"))),
                r.call(n[c], l, c);
            if (a)
              for (
                u = s[s.length - 1].ownerDocument, S.map(s, He), c = 0;
                c < a;
                c++
              )
                (l = s[c]),
                  he.test(l.type || "") &&
                    !X.access(l, "globalEval") &&
                    S.contains(u, l) &&
                    (l.src && "module" !== (l.type || "").toLowerCase()
                      ? S._evalUrl &&
                        !l.noModule &&
                        S._evalUrl(l.src, {
                          nonce: l.nonce || l.getAttribute("nonce"),
                        })
                      : E(l.textContent.replace(Le, ""), l, u));
          }
          return n;
        }
        function Me(e, t, n) {
          for (
            var i, r = t ? S.filter(t, e) : e, o = 0;
            null != (i = r[o]);
            o++
          )
            n || 1 !== i.nodeType || S.cleanData(ge(i)),
              i.parentNode &&
                (n && re(i) && me(ge(i, "script")),
                i.parentNode.removeChild(i));
          return e;
        }
        S.extend({
          htmlPrefilter: function (e) {
            return e.replace(Oe, "<$1></$2>");
          },
          clone: function (e, t, n) {
            var i,
              r,
              o,
              s,
              a,
              l,
              u,
              c = e.cloneNode(!0),
              f = re(e);
            if (
              !(
                y.noCloneChecked ||
                (1 !== e.nodeType && 11 !== e.nodeType) ||
                S.isXMLDoc(e)
              )
            )
              for (s = ge(c), i = 0, r = (o = ge(e)).length; i < r; i++)
                (a = o[i]),
                  (l = s[i]),
                  "input" === (u = l.nodeName.toLowerCase()) && fe.test(a.type)
                    ? (l.checked = a.checked)
                    : ("input" !== u && "textarea" !== u) ||
                      (l.defaultValue = a.defaultValue);
            if (t)
              if (n)
                for (
                  o = o || ge(e), s = s || ge(c), i = 0, r = o.length;
                  i < r;
                  i++
                )
                  je(o[i], s[i]);
              else je(e, c);
            return (
              0 < (s = ge(c, "script")).length && me(s, !f && ge(e, "script")),
              c
            );
          },
          cleanData: function (e) {
            for (
              var t, n, i, r = S.event.special, o = 0;
              void 0 !== (n = e[o]);
              o++
            )
              if (Q(n)) {
                if ((t = n[X.expando])) {
                  if (t.events)
                    for (i in t.events)
                      r[i]
                        ? S.event.remove(n, i)
                        : S.removeEvent(n, i, t.handle);
                  n[X.expando] = void 0;
                }
                n[Y.expando] && (n[Y.expando] = void 0);
              }
          },
        }),
          S.fn.extend({
            detach: function (e) {
              return Me(this, e, !0);
            },
            remove: function (e) {
              return Me(this, e);
            },
            text: function (e) {
              return q(
                this,
                function (e) {
                  return void 0 === e
                    ? S.text(this)
                    : this.empty().each(function () {
                        (1 !== this.nodeType &&
                          11 !== this.nodeType &&
                          9 !== this.nodeType) ||
                          (this.textContent = e);
                      });
                },
                null,
                e,
                arguments.length
              );
            },
            append: function () {
              return Re(this, arguments, function (e) {
                (1 !== this.nodeType &&
                  11 !== this.nodeType &&
                  9 !== this.nodeType) ||
                  ke(this, e).appendChild(e);
              });
            },
            prepend: function () {
              return Re(this, arguments, function (e) {
                if (
                  1 === this.nodeType ||
                  11 === this.nodeType ||
                  9 === this.nodeType
                ) {
                  var t = ke(this, e);
                  t.insertBefore(e, t.firstChild);
                }
              });
            },
            before: function () {
              return Re(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this);
              });
            },
            after: function () {
              return Re(this, arguments, function (e) {
                this.parentNode &&
                  this.parentNode.insertBefore(e, this.nextSibling);
              });
            },
            empty: function () {
              for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType &&
                  (S.cleanData(ge(e, !1)), (e.textContent = ""));
              return this;
            },
            clone: function (e, t) {
              return (
                (e = null != e && e),
                (t = null == t ? e : t),
                this.map(function () {
                  return S.clone(this, e, t);
                })
              );
            },
            html: function (e) {
              return q(
                this,
                function (e) {
                  var t = this[0] || {},
                    n = 0,
                    i = this.length;
                  if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                  if (
                    "string" == typeof e &&
                    !Ie.test(e) &&
                    !pe[(de.exec(e) || ["", ""])[1].toLowerCase()]
                  ) {
                    e = S.htmlPrefilter(e);
                    try {
                      for (; n < i; n++)
                        1 === (t = this[n] || {}).nodeType &&
                          (S.cleanData(ge(t, !1)), (t.innerHTML = e));
                      t = 0;
                    } catch (e) {}
                  }
                  t && this.empty().append(e);
                },
                null,
                e,
                arguments.length
              );
            },
            replaceWith: function () {
              var n = [];
              return Re(
                this,
                arguments,
                function (e) {
                  var t = this.parentNode;
                  S.inArray(this, n) < 0 &&
                    (S.cleanData(ge(this)), t && t.replaceChild(e, this));
                },
                n
              );
            },
          }),
          S.each(
            {
              appendTo: "append",
              prependTo: "prepend",
              insertBefore: "before",
              insertAfter: "after",
              replaceAll: "replaceWith",
            },
            function (e, s) {
              S.fn[e] = function (e) {
                for (
                  var t, n = [], i = S(e), r = i.length - 1, o = 0;
                  o <= r;
                  o++
                )
                  (t = o === r ? this : this.clone(!0)),
                    S(i[o])[s](t),
                    l.apply(n, t.get());
                return this.pushStack(n);
              };
            }
          );
        var We,
          Fe,
          Ve,
          qe,
          Ue,
          Be,
          Ge,
          Ke = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
          Qe = function (e) {
            var t = e.ownerDocument.defaultView;
            return (t && t.opener) || (t = w), t.getComputedStyle(e);
          },
          $e = new RegExp(ne.join("|"), "i");
        function Xe() {
          if (Ge) {
            (Be.style.cssText =
              "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
              (Ge.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
              ie.appendChild(Be).appendChild(Ge);
            var e = w.getComputedStyle(Ge);
            (We = "1%" !== e.top),
              (Ue = 12 === Ye(e.marginLeft)),
              (Ge.style.right = "60%"),
              (qe = 36 === Ye(e.right)),
              (Fe = 36 === Ye(e.width)),
              (Ge.style.position = "absolute"),
              (Ve = 12 === Ye(Ge.offsetWidth / 3)),
              ie.removeChild(Be),
              (Ge = null);
          }
        }
        function Ye(e) {
          return Math.round(parseFloat(e));
        }
        function ze(e, t, n) {
          var i,
            r,
            o,
            s,
            a = e.style;
          return (
            (n = n || Qe(e)) &&
              ("" !== (s = n.getPropertyValue(t) || n[t]) ||
                re(e) ||
                (s = S.style(e, t)),
              !y.pixelBoxStyles() &&
                Ke.test(s) &&
                $e.test(t) &&
                ((i = a.width),
                (r = a.minWidth),
                (o = a.maxWidth),
                (a.minWidth = a.maxWidth = a.width = s),
                (s = n.width),
                (a.width = i),
                (a.minWidth = r),
                (a.maxWidth = o))),
            void 0 !== s ? s + "" : s
          );
        }
        function Je(e, t) {
          return {
            get: function () {
              if (!e()) return (this.get = t).apply(this, arguments);
              delete this.get;
            },
          };
        }
        (Be = C.createElement("div")),
          (Ge = C.createElement("div")).style &&
            ((Ge.style.backgroundClip = "content-box"),
            (Ge.cloneNode(!0).style.backgroundClip = ""),
            (y.clearCloneStyle = "content-box" === Ge.style.backgroundClip),
            S.extend(y, {
              boxSizingReliable: function () {
                return Xe(), Fe;
              },
              pixelBoxStyles: function () {
                return Xe(), qe;
              },
              pixelPosition: function () {
                return Xe(), We;
              },
              reliableMarginLeft: function () {
                return Xe(), Ue;
              },
              scrollboxSize: function () {
                return Xe(), Ve;
              },
            }));
        var Ze = ["Webkit", "Moz", "ms"],
          et = C.createElement("div").style,
          tt = {};
        function nt(e) {
          var t = S.cssProps[e] || tt[e];
          return (
            t ||
            (e in et
              ? e
              : (tt[e] =
                  (function (e) {
                    for (
                      var t = e[0].toUpperCase() + e.slice(1), n = Ze.length;
                      n--;

                    )
                      if ((e = Ze[n] + t) in et) return e;
                  })(e) || e))
          );
        }
        var it = /^(none|table(?!-c[ea]).+)/,
          rt = /^--/,
          ot = { position: "absolute", visibility: "hidden", display: "block" },
          st = { letterSpacing: "0", fontWeight: "400" };
        function at(e, t, n) {
          var i = te.exec(t);
          return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t;
        }
        function lt(e, t, n, i, r, o) {
          var s = "width" === t ? 1 : 0,
            a = 0,
            l = 0;
          if (n === (i ? "border" : "content")) return 0;
          for (; s < 4; s += 2)
            "margin" === n && (l += S.css(e, n + ne[s], !0, r)),
              i
                ? ("content" === n && (l -= S.css(e, "padding" + ne[s], !0, r)),
                  "margin" !== n &&
                    (l -= S.css(e, "border" + ne[s] + "Width", !0, r)))
                : ((l += S.css(e, "padding" + ne[s], !0, r)),
                  "padding" !== n
                    ? (l += S.css(e, "border" + ne[s] + "Width", !0, r))
                    : (a += S.css(e, "border" + ne[s] + "Width", !0, r)));
          return (
            !i &&
              0 <= o &&
              (l +=
                Math.max(
                  0,
                  Math.ceil(
                    e["offset" + t[0].toUpperCase() + t.slice(1)] -
                      o -
                      l -
                      a -
                      0.5
                  )
                ) || 0),
            l
          );
        }
        function ut(e, t, n) {
          var i = Qe(e),
            r =
              (!y.boxSizingReliable() || n) &&
              "border-box" === S.css(e, "boxSizing", !1, i),
            o = r,
            s = ze(e, t, i),
            a = "offset" + t[0].toUpperCase() + t.slice(1);
          if (Ke.test(s)) {
            if (!n) return s;
            s = "auto";
          }
          return (
            ((!y.boxSizingReliable() && r) ||
              "auto" === s ||
              (!parseFloat(s) && "inline" === S.css(e, "display", !1, i))) &&
              e.getClientRects().length &&
              ((r = "border-box" === S.css(e, "boxSizing", !1, i)),
              (o = a in e) && (s = e[a])),
            (s = parseFloat(s) || 0) +
              lt(e, t, n || (r ? "border" : "content"), o, i, s) +
              "px"
          );
        }
        function ct(e, t, n, i, r) {
          return new ct.prototype.init(e, t, n, i, r);
        }
        S.extend({
          cssHooks: {
            opacity: {
              get: function (e, t) {
                if (t) {
                  var n = ze(e, "opacity");
                  return "" === n ? "1" : n;
                }
              },
            },
          },
          cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
          },
          cssProps: {},
          style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
              var r,
                o,
                s,
                a = K(t),
                l = rt.test(t),
                u = e.style;
              if (
                (l || (t = nt(a)),
                (s = S.cssHooks[t] || S.cssHooks[a]),
                void 0 === n)
              )
                return s && "get" in s && void 0 !== (r = s.get(e, !1, i))
                  ? r
                  : u[t];
              "string" === (o = typeof n) &&
                (r = te.exec(n)) &&
                r[1] &&
                ((n = le(e, t, r)), (o = "number")),
                null != n &&
                  n == n &&
                  ("number" !== o ||
                    l ||
                    (n += (r && r[3]) || (S.cssNumber[a] ? "" : "px")),
                  y.clearCloneStyle ||
                    "" !== n ||
                    0 !== t.indexOf("background") ||
                    (u[t] = "inherit"),
                  (s && "set" in s && void 0 === (n = s.set(e, n, i))) ||
                    (l ? u.setProperty(t, n) : (u[t] = n)));
            }
          },
          css: function (e, t, n, i) {
            var r,
              o,
              s,
              a = K(t);
            return (
              rt.test(t) || (t = nt(a)),
              (s = S.cssHooks[t] || S.cssHooks[a]) &&
                "get" in s &&
                (r = s.get(e, !0, n)),
              void 0 === r && (r = ze(e, t, i)),
              "normal" === r && t in st && (r = st[t]),
              "" === n || n
                ? ((o = parseFloat(r)), !0 === n || isFinite(o) ? o || 0 : r)
                : r
            );
          },
        }),
          S.each(["height", "width"], function (e, l) {
            S.cssHooks[l] = {
              get: function (e, t, n) {
                if (t)
                  return !it.test(S.css(e, "display")) ||
                    (e.getClientRects().length &&
                      e.getBoundingClientRect().width)
                    ? ut(e, l, n)
                    : se(e, ot, function () {
                        return ut(e, l, n);
                      });
              },
              set: function (e, t, n) {
                var i,
                  r = Qe(e),
                  o = !y.scrollboxSize() && "absolute" === r.position,
                  s = (o || n) && "border-box" === S.css(e, "boxSizing", !1, r),
                  a = n ? lt(e, l, n, s, r) : 0;
                return (
                  s &&
                    o &&
                    (a -= Math.ceil(
                      e["offset" + l[0].toUpperCase() + l.slice(1)] -
                        parseFloat(r[l]) -
                        lt(e, l, "border", !1, r) -
                        0.5
                    )),
                  a &&
                    (i = te.exec(t)) &&
                    "px" !== (i[3] || "px") &&
                    ((e.style[l] = t), (t = S.css(e, l))),
                  at(0, t, a)
                );
              },
            };
          }),
          (S.cssHooks.marginLeft = Je(y.reliableMarginLeft, function (e, t) {
            if (t)
              return (
                (parseFloat(ze(e, "marginLeft")) ||
                  e.getBoundingClientRect().left -
                    se(e, { marginLeft: 0 }, function () {
                      return e.getBoundingClientRect().left;
                    })) + "px"
              );
          })),
          S.each({ margin: "", padding: "", border: "Width" }, function (r, o) {
            (S.cssHooks[r + o] = {
              expand: function (e) {
                for (
                  var t = 0,
                    n = {},
                    i = "string" == typeof e ? e.split(" ") : [e];
                  t < 4;
                  t++
                )
                  n[r + ne[t] + o] = i[t] || i[t - 2] || i[0];
                return n;
              },
            }),
              "margin" !== r && (S.cssHooks[r + o].set = at);
          }),
          S.fn.extend({
            css: function (e, t) {
              return q(
                this,
                function (e, t, n) {
                  var i,
                    r,
                    o = {},
                    s = 0;
                  if (Array.isArray(t)) {
                    for (i = Qe(e), r = t.length; s < r; s++)
                      o[t[s]] = S.css(e, t[s], !1, i);
                    return o;
                  }
                  return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
                },
                e,
                t,
                1 < arguments.length
              );
            },
          }),
          (((S.Tween = ct).prototype = {
            constructor: ct,
            init: function (e, t, n, i, r, o) {
              (this.elem = e),
                (this.prop = n),
                (this.easing = r || S.easing._default),
                (this.options = t),
                (this.start = this.now = this.cur()),
                (this.end = i),
                (this.unit = o || (S.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
              var e = ct.propHooks[this.prop];
              return e && e.get ? e.get(this) : ct.propHooks._default.get(this);
            },
            run: function (e) {
              var t,
                n = ct.propHooks[this.prop];
              return (
                this.options.duration
                  ? (this.pos = t = S.easing[this.easing](
                      e,
                      this.options.duration * e,
                      0,
                      1,
                      this.options.duration
                    ))
                  : (this.pos = t = e),
                (this.now = (this.end - this.start) * t + this.start),
                this.options.step &&
                  this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : ct.propHooks._default.set(this),
                this
              );
            },
          }).init.prototype = ct.prototype),
          ((ct.propHooks = {
            _default: {
              get: function (e) {
                var t;
                return 1 !== e.elem.nodeType ||
                  (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                  ? e.elem[e.prop]
                  : (t = S.css(e.elem, e.prop, "")) && "auto" !== t
                  ? t
                  : 0;
              },
              set: function (e) {
                S.fx.step[e.prop]
                  ? S.fx.step[e.prop](e)
                  : 1 !== e.elem.nodeType ||
                    (!S.cssHooks[e.prop] && null == e.elem.style[nt(e.prop)])
                  ? (e.elem[e.prop] = e.now)
                  : S.style(e.elem, e.prop, e.now + e.unit);
              },
            },
          }).scrollTop = ct.propHooks.scrollLeft = {
            set: function (e) {
              e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
            },
          }),
          (S.easing = {
            linear: function (e) {
              return e;
            },
            swing: function (e) {
              return 0.5 - Math.cos(e * Math.PI) / 2;
            },
            _default: "swing",
          }),
          (S.fx = ct.prototype.init),
          (S.fx.step = {});
        var ft,
          dt,
          ht,
          pt,
          gt = /^(?:toggle|show|hide)$/,
          mt = /queueHooks$/;
        function vt() {
          dt &&
            (!1 === C.hidden && w.requestAnimationFrame
              ? w.requestAnimationFrame(vt)
              : w.setTimeout(vt, S.fx.interval),
            S.fx.tick());
        }
        function yt() {
          return (
            w.setTimeout(function () {
              ft = void 0;
            }),
            (ft = Date.now())
          );
        }
        function _t(e, t) {
          var n,
            i = 0,
            r = { height: e };
          for (t = t ? 1 : 0; i < 4; i += 2 - t)
            r["margin" + (n = ne[i])] = r["padding" + n] = e;
          return t && (r.opacity = r.width = e), r;
        }
        function Et(e, t, n) {
          for (
            var i,
              r = (Tt.tweeners[t] || []).concat(Tt.tweeners["*"]),
              o = 0,
              s = r.length;
            o < s;
            o++
          )
            if ((i = r[o].call(n, t, e))) return i;
        }
        function Tt(o, e, t) {
          var n,
            s,
            i = 0,
            r = Tt.prefilters.length,
            a = S.Deferred().always(function () {
              delete l.elem;
            }),
            l = function () {
              if (s) return !1;
              for (
                var e = ft || yt(),
                  t = Math.max(0, u.startTime + u.duration - e),
                  n = 1 - (t / u.duration || 0),
                  i = 0,
                  r = u.tweens.length;
                i < r;
                i++
              )
                u.tweens[i].run(n);
              return (
                a.notifyWith(o, [u, n, t]),
                n < 1 && r
                  ? t
                  : (r || a.notifyWith(o, [u, 1, 0]), a.resolveWith(o, [u]), !1)
              );
            },
            u = a.promise({
              elem: o,
              props: S.extend({}, e),
              opts: S.extend(
                !0,
                { specialEasing: {}, easing: S.easing._default },
                t
              ),
              originalProperties: e,
              originalOptions: t,
              startTime: ft || yt(),
              duration: t.duration,
              tweens: [],
              createTween: function (e, t) {
                var n = S.Tween(
                  o,
                  u.opts,
                  e,
                  t,
                  u.opts.specialEasing[e] || u.opts.easing
                );
                return u.tweens.push(n), n;
              },
              stop: function (e) {
                var t = 0,
                  n = e ? u.tweens.length : 0;
                if (s) return this;
                for (s = !0; t < n; t++) u.tweens[t].run(1);
                return (
                  e
                    ? (a.notifyWith(o, [u, 1, 0]), a.resolveWith(o, [u, e]))
                    : a.rejectWith(o, [u, e]),
                  this
                );
              },
            }),
            c = u.props;
          for (
            !(function (e, t) {
              var n, i, r, o, s;
              for (n in e)
                if (
                  ((r = t[(i = K(n))]),
                  (o = e[n]),
                  Array.isArray(o) && ((r = o[1]), (o = e[n] = o[0])),
                  n !== i && ((e[i] = o), delete e[n]),
                  (s = S.cssHooks[i]) && ("expand" in s))
                )
                  for (n in ((o = s.expand(o)), delete e[i], o))
                    (n in e) || ((e[n] = o[n]), (t[n] = r));
                else t[i] = r;
            })(c, u.opts.specialEasing);
            i < r;
            i++
          )
            if ((n = Tt.prefilters[i].call(u, o, c, u.opts)))
              return (
                _(n.stop) &&
                  (S._queueHooks(u.elem, u.opts.queue).stop = n.stop.bind(n)),
                n
              );
          return (
            S.map(c, Et, u),
            _(u.opts.start) && u.opts.start.call(o, u),
            u
              .progress(u.opts.progress)
              .done(u.opts.done, u.opts.complete)
              .fail(u.opts.fail)
              .always(u.opts.always),
            S.fx.timer(S.extend(l, { elem: o, anim: u, queue: u.opts.queue })),
            u
          );
        }
        (S.Animation = S.extend(Tt, {
          tweeners: {
            "*": [
              function (e, t) {
                var n = this.createTween(e, t);
                return le(n.elem, e, te.exec(t), n), n;
              },
            ],
          },
          tweener: function (e, t) {
            for (
              var n,
                i = 0,
                r = (e = _(e) ? ((t = e), ["*"]) : e.match(H)).length;
              i < r;
              i++
            )
              (n = e[i]),
                (Tt.tweeners[n] = Tt.tweeners[n] || []),
                Tt.tweeners[n].unshift(t);
          },
          prefilters: [
            function (e, t, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                u,
                c,
                f = "width" in t || "height" in t,
                d = this,
                h = {},
                p = e.style,
                g = e.nodeType && ae(e),
                m = X.get(e, "fxshow");
              for (i in (n.queue ||
                (null == (s = S._queueHooks(e, "fx")).unqueued &&
                  ((s.unqueued = 0),
                  (a = s.empty.fire),
                  (s.empty.fire = function () {
                    s.unqueued || a();
                  })),
                s.unqueued++,
                d.always(function () {
                  d.always(function () {
                    s.unqueued--, S.queue(e, "fx").length || s.empty.fire();
                  });
                })),
              t))
                if (((r = t[i]), gt.test(r))) {
                  if (
                    (delete t[i],
                    (o = o || "toggle" === r),
                    r === (g ? "hide" : "show"))
                  ) {
                    if ("show" !== r || !m || void 0 === m[i]) continue;
                    g = !0;
                  }
                  h[i] = (m && m[i]) || S.style(e, i);
                }
              if ((l = !S.isEmptyObject(t)) || !S.isEmptyObject(h))
                for (i in (f &&
                  1 === e.nodeType &&
                  ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                  null == (u = m && m.display) && (u = X.get(e, "display")),
                  "none" === (c = S.css(e, "display")) &&
                    (u
                      ? (c = u)
                      : (ce([e], !0),
                        (u = e.style.display || u),
                        (c = S.css(e, "display")),
                        ce([e]))),
                  ("inline" === c || ("inline-block" === c && null != u)) &&
                    "none" === S.css(e, "float") &&
                    (l ||
                      (d.done(function () {
                        p.display = u;
                      }),
                      null == u &&
                        ((c = p.display), (u = "none" === c ? "" : c))),
                    (p.display = "inline-block"))),
                n.overflow &&
                  ((p.overflow = "hidden"),
                  d.always(function () {
                    (p.overflow = n.overflow[0]),
                      (p.overflowX = n.overflow[1]),
                      (p.overflowY = n.overflow[2]);
                  })),
                (l = !1),
                h))
                  l ||
                    (m
                      ? "hidden" in m && (g = m.hidden)
                      : (m = X.access(e, "fxshow", { display: u })),
                    o && (m.hidden = !g),
                    g && ce([e], !0),
                    d.done(function () {
                      for (i in (g || ce([e]), X.remove(e, "fxshow"), h))
                        S.style(e, i, h[i]);
                    })),
                    (l = Et(g ? m[i] : 0, i, d)),
                    i in m ||
                      ((m[i] = l.start),
                      g && ((l.end = l.start), (l.start = 0)));
            },
          ],
          prefilter: function (e, t) {
            t ? Tt.prefilters.unshift(e) : Tt.prefilters.push(e);
          },
        })),
          (S.speed = function (e, t, n) {
            var i =
              e && "object" == typeof e
                ? S.extend({}, e)
                : {
                    complete: n || (!n && t) || (_(e) && e),
                    duration: e,
                    easing: (n && t) || (t && !_(t) && t),
                  };
            return (
              S.fx.off
                ? (i.duration = 0)
                : "number" != typeof i.duration &&
                  (i.duration in S.fx.speeds
                    ? (i.duration = S.fx.speeds[i.duration])
                    : (i.duration = S.fx.speeds._default)),
              (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
              (i.old = i.complete),
              (i.complete = function () {
                _(i.old) && i.old.call(this),
                  i.queue && S.dequeue(this, i.queue);
              }),
              i
            );
          }),
          S.fn.extend({
            fadeTo: function (e, t, n, i) {
              return this.filter(ae)
                .css("opacity", 0)
                .show()
                .end()
                .animate({ opacity: t }, e, n, i);
            },
            animate: function (t, e, n, i) {
              function r() {
                var e = Tt(this, S.extend({}, t), s);
                (o || X.get(this, "finish")) && e.stop(!0);
              }
              var o = S.isEmptyObject(t),
                s = S.speed(e, n, i);
              return (
                (r.finish = r),
                o || !1 === s.queue ? this.each(r) : this.queue(s.queue, r)
              );
            },
            stop: function (r, e, o) {
              function s(e) {
                var t = e.stop;
                delete e.stop, t(o);
              }
              return (
                "string" != typeof r && ((o = e), (e = r), (r = void 0)),
                e && !1 !== r && this.queue(r || "fx", []),
                this.each(function () {
                  var e = !0,
                    t = null != r && r + "queueHooks",
                    n = S.timers,
                    i = X.get(this);
                  if (t) i[t] && i[t].stop && s(i[t]);
                  else for (t in i) i[t] && i[t].stop && mt.test(t) && s(i[t]);
                  for (t = n.length; t--; )
                    n[t].elem !== this ||
                      (null != r && n[t].queue !== r) ||
                      (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
                  (!e && o) || S.dequeue(this, r);
                })
              );
            },
            finish: function (s) {
              return (
                !1 !== s && (s = s || "fx"),
                this.each(function () {
                  var e,
                    t = X.get(this),
                    n = t[s + "queue"],
                    i = t[s + "queueHooks"],
                    r = S.timers,
                    o = n ? n.length : 0;
                  for (
                    t.finish = !0,
                      S.queue(this, s, []),
                      i && i.stop && i.stop.call(this, !0),
                      e = r.length;
                    e--;

                  )
                    r[e].elem === this &&
                      r[e].queue === s &&
                      (r[e].anim.stop(!0), r.splice(e, 1));
                  for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                  delete t.finish;
                })
              );
            },
          }),
          S.each(["toggle", "show", "hide"], function (e, i) {
            var r = S.fn[i];
            S.fn[i] = function (e, t, n) {
              return null == e || "boolean" == typeof e
                ? r.apply(this, arguments)
                : this.animate(_t(i, !0), e, t, n);
            };
          }),
          S.each(
            {
              slideDown: _t("show"),
              slideUp: _t("hide"),
              slideToggle: _t("toggle"),
              fadeIn: { opacity: "show" },
              fadeOut: { opacity: "hide" },
              fadeToggle: { opacity: "toggle" },
            },
            function (e, i) {
              S.fn[e] = function (e, t, n) {
                return this.animate(i, e, t, n);
              };
            }
          ),
          (S.timers = []),
          (S.fx.tick = function () {
            var e,
              t = 0,
              n = S.timers;
            for (ft = Date.now(); t < n.length; t++)
              (e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || S.fx.stop(), (ft = void 0);
          }),
          (S.fx.timer = function (e) {
            S.timers.push(e), S.fx.start();
          }),
          (S.fx.interval = 13),
          (S.fx.start = function () {
            dt || ((dt = !0), vt());
          }),
          (S.fx.stop = function () {
            dt = null;
          }),
          (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
          (S.fn.delay = function (i, e) {
            return (
              (i = (S.fx && S.fx.speeds[i]) || i),
              (e = e || "fx"),
              this.queue(e, function (e, t) {
                var n = w.setTimeout(e, i);
                t.stop = function () {
                  w.clearTimeout(n);
                };
              })
            );
          }),
          (ht = C.createElement("input")),
          (pt = C.createElement("select").appendChild(
            C.createElement("option")
          )),
          (ht.type = "checkbox"),
          (y.checkOn = "" !== ht.value),
          (y.optSelected = pt.selected),
          ((ht = C.createElement("input")).value = "t"),
          (ht.type = "radio"),
          (y.radioValue = "t" === ht.value);
        var bt,
          wt = S.expr.attrHandle;
        S.fn.extend({
          attr: function (e, t) {
            return q(this, S.attr, e, t, 1 < arguments.length);
          },
          removeAttr: function (e) {
            return this.each(function () {
              S.removeAttr(this, e);
            });
          },
        }),
          S.extend({
            attr: function (e, t, n) {
              var i,
                r,
                o = e.nodeType;
              if (3 !== o && 8 !== o && 2 !== o)
                return void 0 === e.getAttribute
                  ? S.prop(e, t, n)
                  : ((1 === o && S.isXMLDoc(e)) ||
                      (r =
                        S.attrHooks[t.toLowerCase()] ||
                        (S.expr.match.bool.test(t) ? bt : void 0)),
                    void 0 !== n
                      ? null === n
                        ? void S.removeAttr(e, t)
                        : r && "set" in r && void 0 !== (i = r.set(e, n, t))
                        ? i
                        : (e.setAttribute(t, n + ""), n)
                      : r && "get" in r && null !== (i = r.get(e, t))
                      ? i
                      : null == (i = S.find.attr(e, t))
                      ? void 0
                      : i);
            },
            attrHooks: {
              type: {
                set: function (e, t) {
                  if (!y.radioValue && "radio" === t && D(e, "input")) {
                    var n = e.value;
                    return e.setAttribute("type", t), n && (e.value = n), t;
                  }
                },
              },
            },
            removeAttr: function (e, t) {
              var n,
                i = 0,
                r = t && t.match(H);
              if (r && 1 === e.nodeType)
                for (; (n = r[i++]); ) e.removeAttribute(n);
            },
          }),
          (bt = {
            set: function (e, t, n) {
              return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
            },
          }),
          S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var s = wt[t] || S.find.attr;
            wt[t] = function (e, t, n) {
              var i,
                r,
                o = t.toLowerCase();
              return (
                n ||
                  ((r = wt[o]),
                  (wt[o] = i),
                  (i = null != s(e, t, n) ? o : null),
                  (wt[o] = r)),
                i
              );
            };
          });
        var Ct = /^(?:input|select|textarea|button)$/i,
          St = /^(?:a|area)$/i;
        function At(e) {
          return (e.match(H) || []).join(" ");
        }
        function Dt(e) {
          return (e.getAttribute && e.getAttribute("class")) || "";
        }
        function xt(e) {
          return Array.isArray(e)
            ? e
            : ("string" == typeof e && e.match(H)) || [];
        }
        S.fn.extend({
          prop: function (e, t) {
            return q(this, S.prop, e, t, 1 < arguments.length);
          },
          removeProp: function (e) {
            return this.each(function () {
              delete this[S.propFix[e] || e];
            });
          },
        }),
          S.extend({
            prop: function (e, t, n) {
              var i,
                r,
                o = e.nodeType;
              if (3 !== o && 8 !== o && 2 !== o)
                return (
                  (1 === o && S.isXMLDoc(e)) ||
                    ((t = S.propFix[t] || t), (r = S.propHooks[t])),
                  void 0 !== n
                    ? r && "set" in r && void 0 !== (i = r.set(e, n, t))
                      ? i
                      : (e[t] = n)
                    : r && "get" in r && null !== (i = r.get(e, t))
                    ? i
                    : e[t]
                );
            },
            propHooks: {
              tabIndex: {
                get: function (e) {
                  var t = S.find.attr(e, "tabindex");
                  return t
                    ? parseInt(t, 10)
                    : Ct.test(e.nodeName) || (St.test(e.nodeName) && e.href)
                    ? 0
                    : -1;
                },
              },
            },
            propFix: { for: "htmlFor", class: "className" },
          }),
          y.optSelected ||
            (S.propHooks.selected = {
              get: function (e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null;
              },
              set: function (e) {
                var t = e.parentNode;
                t &&
                  (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
              },
            }),
          S.each(
            [
              "tabIndex",
              "readOnly",
              "maxLength",
              "cellSpacing",
              "cellPadding",
              "rowSpan",
              "colSpan",
              "useMap",
              "frameBorder",
              "contentEditable",
            ],
            function () {
              S.propFix[this.toLowerCase()] = this;
            }
          ),
          S.fn.extend({
            addClass: function (t) {
              var e,
                n,
                i,
                r,
                o,
                s,
                a,
                l = 0;
              if (_(t))
                return this.each(function (e) {
                  S(this).addClass(t.call(this, e, Dt(this)));
                });
              if ((e = xt(t)).length)
                for (; (n = this[l++]); )
                  if (
                    ((r = Dt(n)), (i = 1 === n.nodeType && " " + At(r) + " "))
                  ) {
                    for (s = 0; (o = e[s++]); )
                      i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                    r !== (a = At(i)) && n.setAttribute("class", a);
                  }
              return this;
            },
            removeClass: function (t) {
              var e,
                n,
                i,
                r,
                o,
                s,
                a,
                l = 0;
              if (_(t))
                return this.each(function (e) {
                  S(this).removeClass(t.call(this, e, Dt(this)));
                });
              if (!arguments.length) return this.attr("class", "");
              if ((e = xt(t)).length)
                for (; (n = this[l++]); )
                  if (
                    ((r = Dt(n)), (i = 1 === n.nodeType && " " + At(r) + " "))
                  ) {
                    for (s = 0; (o = e[s++]); )
                      for (; -1 < i.indexOf(" " + o + " "); )
                        i = i.replace(" " + o + " ", " ");
                    r !== (a = At(i)) && n.setAttribute("class", a);
                  }
              return this;
            },
            toggleClass: function (r, t) {
              var o = typeof r,
                s = "string" == o || Array.isArray(r);
              return "boolean" == typeof t && s
                ? t
                  ? this.addClass(r)
                  : this.removeClass(r)
                : _(r)
                ? this.each(function (e) {
                    S(this).toggleClass(r.call(this, e, Dt(this), t), t);
                  })
                : this.each(function () {
                    var e, t, n, i;
                    if (s)
                      for (t = 0, n = S(this), i = xt(r); (e = i[t++]); )
                        n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                    else
                      (void 0 !== r && "boolean" != o) ||
                        ((e = Dt(this)) && X.set(this, "__className__", e),
                        this.setAttribute &&
                          this.setAttribute(
                            "class",
                            e || !1 === r
                              ? ""
                              : X.get(this, "__className__") || ""
                          ));
                  });
            },
            hasClass: function (e) {
              var t,
                n,
                i = 0;
              for (t = " " + e + " "; (n = this[i++]); )
                if (1 === n.nodeType && -1 < (" " + At(Dt(n)) + " ").indexOf(t))
                  return !0;
              return !1;
            },
          });
        var Ot = /\r/g;
        S.fn.extend({
          val: function (n) {
            var i,
              e,
              r,
              t = this[0];
            return arguments.length
              ? ((r = _(n)),
                this.each(function (e) {
                  var t;
                  1 === this.nodeType &&
                    (null == (t = r ? n.call(this, e, S(this).val()) : n)
                      ? (t = "")
                      : "number" == typeof t
                      ? (t += "")
                      : Array.isArray(t) &&
                        (t = S.map(t, function (e) {
                          return null == e ? "" : e + "";
                        })),
                    ((i =
                      S.valHooks[this.type] ||
                      S.valHooks[this.nodeName.toLowerCase()]) &&
                      "set" in i &&
                      void 0 !== i.set(this, t, "value")) ||
                      (this.value = t));
                }))
              : t
              ? (i =
                  S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) &&
                "get" in i &&
                void 0 !== (e = i.get(t, "value"))
                ? e
                : "string" == typeof (e = t.value)
                ? e.replace(Ot, "")
                : null == e
                ? ""
                : e
              : void 0;
          },
        }),
          S.extend({
            valHooks: {
              option: {
                get: function (e) {
                  var t = S.find.attr(e, "value");
                  return null != t ? t : At(S.text(e));
                },
              },
              select: {
                get: function (e) {
                  var t,
                    n,
                    i,
                    r = e.options,
                    o = e.selectedIndex,
                    s = "select-one" === e.type,
                    a = s ? null : [],
                    l = s ? o + 1 : r.length;
                  for (i = o < 0 ? l : s ? o : 0; i < l; i++)
                    if (
                      ((n = r[i]).selected || i === o) &&
                      !n.disabled &&
                      (!n.parentNode.disabled || !D(n.parentNode, "optgroup"))
                    ) {
                      if (((t = S(n).val()), s)) return t;
                      a.push(t);
                    }
                  return a;
                },
                set: function (e, t) {
                  for (
                    var n, i, r = e.options, o = S.makeArray(t), s = r.length;
                    s--;

                  )
                    ((i = r[s]).selected =
                      -1 < S.inArray(S.valHooks.option.get(i), o)) && (n = !0);
                  return n || (e.selectedIndex = -1), o;
                },
              },
            },
          }),
          S.each(["radio", "checkbox"], function () {
            (S.valHooks[this] = {
              set: function (e, t) {
                if (Array.isArray(t))
                  return (e.checked = -1 < S.inArray(S(e).val(), t));
              },
            }),
              y.checkOn ||
                (S.valHooks[this].get = function (e) {
                  return null === e.getAttribute("value") ? "on" : e.value;
                });
          }),
          (y.focusin = "onfocusin" in w);
        function It(e) {
          e.stopPropagation();
        }
        var Nt = /^(?:focusinfocus|focusoutblur)$/;
        S.extend(S.event, {
          trigger: function (e, t, n, i) {
            var r,
              o,
              s,
              a,
              l,
              u,
              c,
              f,
              d = [n || C],
              h = v.call(e, "type") ? e.type : e,
              p = v.call(e, "namespace") ? e.namespace.split(".") : [];
            if (
              ((o = f = s = n = n || C),
              3 !== n.nodeType &&
                8 !== n.nodeType &&
                !Nt.test(h + S.event.triggered) &&
                (-1 < h.indexOf(".") &&
                  ((h = (p = h.split(".")).shift()), p.sort()),
                (l = h.indexOf(":") < 0 && "on" + h),
                ((e = e[S.expando]
                  ? e
                  : new S.Event(h, "object" == typeof e && e)).isTrigger = i
                  ? 2
                  : 3),
                (e.namespace = p.join(".")),
                (e.rnamespace = e.namespace
                  ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
                  : null),
                (e.result = void 0),
                e.target || (e.target = n),
                (t = null == t ? [e] : S.makeArray(t, [e])),
                (c = S.event.special[h] || {}),
                i || !c.trigger || !1 !== c.trigger.apply(n, t)))
            ) {
              if (!i && !c.noBubble && !g(n)) {
                for (
                  a = c.delegateType || h, Nt.test(a + h) || (o = o.parentNode);
                  o;
                  o = o.parentNode
                )
                  d.push(o), (s = o);
                s === (n.ownerDocument || C) &&
                  d.push(s.defaultView || s.parentWindow || w);
              }
              for (r = 0; (o = d[r++]) && !e.isPropagationStopped(); )
                (f = o),
                  (e.type = 1 < r ? a : c.bindType || h),
                  (u =
                    (X.get(o, "events") || {})[e.type] && X.get(o, "handle")) &&
                    u.apply(o, t),
                  (u = l && o[l]) &&
                    u.apply &&
                    Q(o) &&
                    ((e.result = u.apply(o, t)),
                    !1 === e.result && e.preventDefault());
              return (
                (e.type = h),
                i ||
                  e.isDefaultPrevented() ||
                  (c._default && !1 !== c._default.apply(d.pop(), t)) ||
                  !Q(n) ||
                  (l &&
                    _(n[h]) &&
                    !g(n) &&
                    ((s = n[l]) && (n[l] = null),
                    (S.event.triggered = h),
                    e.isPropagationStopped() && f.addEventListener(h, It),
                    n[h](),
                    e.isPropagationStopped() && f.removeEventListener(h, It),
                    (S.event.triggered = void 0),
                    s && (n[l] = s))),
                e.result
              );
            }
          },
          simulate: function (e, t, n) {
            var i = S.extend(new S.Event(), n, { type: e, isSimulated: !0 });
            S.event.trigger(i, null, t);
          },
        }),
          S.fn.extend({
            trigger: function (e, t) {
              return this.each(function () {
                S.event.trigger(e, t, this);
              });
            },
            triggerHandler: function (e, t) {
              var n = this[0];
              if (n) return S.event.trigger(e, t, n, !0);
            },
          }),
          y.focusin ||
            S.each({ focus: "focusin", blur: "focusout" }, function (n, i) {
              function r(e) {
                S.event.simulate(i, e.target, S.event.fix(e));
              }
              S.event.special[i] = {
                setup: function () {
                  var e = this.ownerDocument || this,
                    t = X.access(e, i);
                  t || e.addEventListener(n, r, !0),
                    X.access(e, i, (t || 0) + 1);
                },
                teardown: function () {
                  var e = this.ownerDocument || this,
                    t = X.access(e, i) - 1;
                  t
                    ? X.access(e, i, t)
                    : (e.removeEventListener(n, r, !0), X.remove(e, i));
                },
              };
            });
        var Lt = w.location,
          kt = Date.now(),
          Pt = /\?/;
        S.parseXML = function (e) {
          var t;
          if (!e || "string" != typeof e) return null;
          try {
            t = new w.DOMParser().parseFromString(e, "text/xml");
          } catch (e) {
            t = void 0;
          }
          return (
            (t && !t.getElementsByTagName("parsererror").length) ||
              S.error("Invalid XML: " + e),
            t
          );
        };
        var Ht = /\[\]$/,
          jt = /\r?\n/g,
          Rt = /^(?:submit|button|image|reset|file)$/i,
          Mt = /^(?:input|select|textarea|keygen)/i;
        function Wt(n, e, i, r) {
          var t;
          if (Array.isArray(e))
            S.each(e, function (e, t) {
              i || Ht.test(n)
                ? r(n, t)
                : Wt(
                    n +
                      "[" +
                      ("object" == typeof t && null != t ? e : "") +
                      "]",
                    t,
                    i,
                    r
                  );
            });
          else if (i || "object" !== T(e)) r(n, e);
          else for (t in e) Wt(n + "[" + t + "]", e[t], i, r);
        }
        (S.param = function (e, t) {
          function n(e, t) {
            var n = _(t) ? t() : t;
            r[r.length] =
              encodeURIComponent(e) +
              "=" +
              encodeURIComponent(null == n ? "" : n);
          }
          var i,
            r = [];
          if (null == e) return "";
          if (Array.isArray(e) || (e.jquery && !S.isPlainObject(e)))
            S.each(e, function () {
              n(this.name, this.value);
            });
          else for (i in e) Wt(i, e[i], t, n);
          return r.join("&");
        }),
          S.fn.extend({
            serialize: function () {
              return S.param(this.serializeArray());
            },
            serializeArray: function () {
              return this.map(function () {
                var e = S.prop(this, "elements");
                return e ? S.makeArray(e) : this;
              })
                .filter(function () {
                  var e = this.type;
                  return (
                    this.name &&
                    !S(this).is(":disabled") &&
                    Mt.test(this.nodeName) &&
                    !Rt.test(e) &&
                    (this.checked || !fe.test(e))
                  );
                })
                .map(function (e, t) {
                  var n = S(this).val();
                  return null == n
                    ? null
                    : Array.isArray(n)
                    ? S.map(n, function (e) {
                        return { name: t.name, value: e.replace(jt, "\r\n") };
                      })
                    : { name: t.name, value: n.replace(jt, "\r\n") };
                })
                .get();
            },
          });
        var Ft = /%20/g,
          Vt = /#.*$/,
          qt = /([?&])_=[^&]*/,
          Ut = /^(.*?):[ \t]*([^\r\n]*)$/gm,
          Bt = /^(?:GET|HEAD)$/,
          Gt = /^\/\//,
          Kt = {},
          Qt = {},
          $t = "*/".concat("*"),
          Xt = C.createElement("a");
        function Yt(o) {
          return function (e, t) {
            "string" != typeof e && ((t = e), (e = "*"));
            var n,
              i = 0,
              r = e.toLowerCase().match(H) || [];
            if (_(t))
              for (; (n = r[i++]); )
                "+" === n[0]
                  ? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(t))
                  : (o[n] = o[n] || []).push(t);
          };
        }
        function zt(t, r, o, s) {
          var a = {},
            l = t === Qt;
          function u(e) {
            var i;
            return (
              (a[e] = !0),
              S.each(t[e] || [], function (e, t) {
                var n = t(r, o, s);
                return "string" != typeof n || l || a[n]
                  ? l
                    ? !(i = n)
                    : void 0
                  : (r.dataTypes.unshift(n), u(n), !1);
              }),
              i
            );
          }
          return u(r.dataTypes[0]) || (!a["*"] && u("*"));
        }
        function Jt(e, t) {
          var n,
            i,
            r = S.ajaxSettings.flatOptions || {};
          for (n in t)
            void 0 !== t[n] && ((r[n] ? e : (i = i || {}))[n] = t[n]);
          return i && S.extend(!0, e, i), e;
        }
        (Xt.href = Lt.href),
          S.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
              url: Lt.href,
              type: "GET",
              isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                Lt.protocol
              ),
              global: !0,
              processData: !0,
              async: !0,
              contentType: "application/x-www-form-urlencoded; charset=UTF-8",
              accepts: {
                "*": $t,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
              },
              contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
              responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON",
              },
              converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": S.parseXML,
              },
              flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (e, t) {
              return t ? Jt(Jt(e, S.ajaxSettings), t) : Jt(S.ajaxSettings, e);
            },
            ajaxPrefilter: Yt(Kt),
            ajaxTransport: Yt(Qt),
            ajax: function (e, t) {
              "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
              var c,
                f,
                d,
                n,
                h,
                i,
                p,
                g,
                r,
                o,
                m = S.ajaxSetup({}, t),
                v = m.context || m,
                y = m.context && (v.nodeType || v.jquery) ? S(v) : S.event,
                _ = S.Deferred(),
                E = S.Callbacks("once memory"),
                T = m.statusCode || {},
                s = {},
                a = {},
                l = "canceled",
                b = {
                  readyState: 0,
                  getResponseHeader: function (e) {
                    var t;
                    if (p) {
                      if (!n)
                        for (n = {}; (t = Ut.exec(d)); )
                          n[t[1].toLowerCase() + " "] = (
                            n[t[1].toLowerCase() + " "] || []
                          ).concat(t[2]);
                      t = n[e.toLowerCase() + " "];
                    }
                    return null == t ? null : t.join(", ");
                  },
                  getAllResponseHeaders: function () {
                    return p ? d : null;
                  },
                  setRequestHeader: function (e, t) {
                    return (
                      null == p &&
                        ((e = a[e.toLowerCase()] = a[e.toLowerCase()] || e),
                        (s[e] = t)),
                      this
                    );
                  },
                  overrideMimeType: function (e) {
                    return null == p && (m.mimeType = e), this;
                  },
                  statusCode: function (e) {
                    var t;
                    if (e)
                      if (p) b.always(e[b.status]);
                      else for (t in e) T[t] = [T[t], e[t]];
                    return this;
                  },
                  abort: function (e) {
                    var t = e || l;
                    return c && c.abort(t), u(0, t), this;
                  },
                };
              if (
                (_.promise(b),
                (m.url = ((e || m.url || Lt.href) + "").replace(
                  Gt,
                  Lt.protocol + "//"
                )),
                (m.type = t.method || t.type || m.method || m.type),
                (m.dataTypes = (m.dataType || "*").toLowerCase().match(H) || [
                  "",
                ]),
                null == m.crossDomain)
              ) {
                i = C.createElement("a");
                try {
                  (i.href = m.url),
                    (i.href = i.href),
                    (m.crossDomain =
                      Xt.protocol + "//" + Xt.host !=
                      i.protocol + "//" + i.host);
                } catch (e) {
                  m.crossDomain = !0;
                }
              }
              if (
                (m.data &&
                  m.processData &&
                  "string" != typeof m.data &&
                  (m.data = S.param(m.data, m.traditional)),
                zt(Kt, m, t, b),
                p)
              )
                return b;
              for (r in ((g = S.event && m.global) &&
                0 == S.active++ &&
                S.event.trigger("ajaxStart"),
              (m.type = m.type.toUpperCase()),
              (m.hasContent = !Bt.test(m.type)),
              (f = m.url.replace(Vt, "")),
              m.hasContent
                ? m.data &&
                  m.processData &&
                  0 ===
                    (m.contentType || "").indexOf(
                      "application/x-www-form-urlencoded"
                    ) &&
                  (m.data = m.data.replace(Ft, "+"))
                : ((o = m.url.slice(f.length)),
                  m.data &&
                    (m.processData || "string" == typeof m.data) &&
                    ((f += (Pt.test(f) ? "&" : "?") + m.data), delete m.data),
                  !1 === m.cache &&
                    ((f = f.replace(qt, "$1")),
                    (o = (Pt.test(f) ? "&" : "?") + "_=" + kt++ + o)),
                  (m.url = f + o)),
              m.ifModified &&
                (S.lastModified[f] &&
                  b.setRequestHeader("If-Modified-Since", S.lastModified[f]),
                S.etag[f] && b.setRequestHeader("If-None-Match", S.etag[f])),
              ((m.data && m.hasContent && !1 !== m.contentType) ||
                t.contentType) &&
                b.setRequestHeader("Content-Type", m.contentType),
              b.setRequestHeader(
                "Accept",
                m.dataTypes[0] && m.accepts[m.dataTypes[0]]
                  ? m.accepts[m.dataTypes[0]] +
                      ("*" !== m.dataTypes[0] ? ", " + $t + "; q=0.01" : "")
                  : m.accepts["*"]
              ),
              m.headers))
                b.setRequestHeader(r, m.headers[r]);
              if (m.beforeSend && (!1 === m.beforeSend.call(v, b, m) || p))
                return b.abort();
              if (
                ((l = "abort"),
                E.add(m.complete),
                b.done(m.success),
                b.fail(m.error),
                (c = zt(Qt, m, t, b)))
              ) {
                if (((b.readyState = 1), g && y.trigger("ajaxSend", [b, m]), p))
                  return b;
                m.async &&
                  0 < m.timeout &&
                  (h = w.setTimeout(function () {
                    b.abort("timeout");
                  }, m.timeout));
                try {
                  (p = !1), c.send(s, u);
                } catch (e) {
                  if (p) throw e;
                  u(-1, e);
                }
              } else u(-1, "No Transport");
              function u(e, t, n, i) {
                var r,
                  o,
                  s,
                  a,
                  l,
                  u = t;
                p ||
                  ((p = !0),
                  h && w.clearTimeout(h),
                  (c = void 0),
                  (d = i || ""),
                  (b.readyState = 0 < e ? 4 : 0),
                  (r = (200 <= e && e < 300) || 304 === e),
                  n &&
                    (a = (function (e, t, n) {
                      for (
                        var i, r, o, s, a = e.contents, l = e.dataTypes;
                        "*" === l[0];

                      )
                        l.shift(),
                          void 0 === i &&
                            (i =
                              e.mimeType ||
                              t.getResponseHeader("Content-Type"));
                      if (i)
                        for (r in a)
                          if (a[r] && a[r].test(i)) {
                            l.unshift(r);
                            break;
                          }
                      if (l[0] in n) o = l[0];
                      else {
                        for (r in n) {
                          if (!l[0] || e.converters[r + " " + l[0]]) {
                            o = r;
                            break;
                          }
                          s = s || r;
                        }
                        o = o || s;
                      }
                      if (o) return o !== l[0] && l.unshift(o), n[o];
                    })(m, b, n)),
                  (a = (function (e, t, n, i) {
                    var r,
                      o,
                      s,
                      a,
                      l,
                      u = {},
                      c = e.dataTypes.slice();
                    if (c[1])
                      for (s in e.converters)
                        u[s.toLowerCase()] = e.converters[s];
                    for (o = c.shift(); o; )
                      if (
                        (e.responseFields[o] && (n[e.responseFields[o]] = t),
                        !l &&
                          i &&
                          e.dataFilter &&
                          (t = e.dataFilter(t, e.dataType)),
                        (l = o),
                        (o = c.shift()))
                      )
                        if ("*" === o) o = l;
                        else if ("*" !== l && l !== o) {
                          if (!(s = u[l + " " + o] || u["* " + o]))
                            for (r in u)
                              if (
                                (a = r.split(" "))[1] === o &&
                                (s = u[l + " " + a[0]] || u["* " + a[0]])
                              ) {
                                !0 === s
                                  ? (s = u[r])
                                  : !0 !== u[r] &&
                                    ((o = a[0]), c.unshift(a[1]));
                                break;
                              }
                          if (!0 !== s)
                            if (s && e.throws) t = s(t);
                            else
                              try {
                                t = s(t);
                              } catch (e) {
                                return {
                                  state: "parsererror",
                                  error: s
                                    ? e
                                    : "No conversion from " + l + " to " + o,
                                };
                              }
                        }
                    return { state: "success", data: t };
                  })(m, a, b, r)),
                  r
                    ? (m.ifModified &&
                        ((l = b.getResponseHeader("Last-Modified")) &&
                          (S.lastModified[f] = l),
                        (l = b.getResponseHeader("etag")) && (S.etag[f] = l)),
                      204 === e || "HEAD" === m.type
                        ? (u = "nocontent")
                        : 304 === e
                        ? (u = "notmodified")
                        : ((u = a.state), (o = a.data), (r = !(s = a.error))))
                    : ((s = u), (!e && u) || ((u = "error"), e < 0 && (e = 0))),
                  (b.status = e),
                  (b.statusText = (t || u) + ""),
                  r ? _.resolveWith(v, [o, u, b]) : _.rejectWith(v, [b, u, s]),
                  b.statusCode(T),
                  (T = void 0),
                  g &&
                    y.trigger(r ? "ajaxSuccess" : "ajaxError", [
                      b,
                      m,
                      r ? o : s,
                    ]),
                  E.fireWith(v, [b, u]),
                  g &&
                    (y.trigger("ajaxComplete", [b, m]),
                    --S.active || S.event.trigger("ajaxStop")));
              }
              return b;
            },
            getJSON: function (e, t, n) {
              return S.get(e, t, n, "json");
            },
            getScript: function (e, t) {
              return S.get(e, void 0, t, "script");
            },
          }),
          S.each(["get", "post"], function (e, r) {
            S[r] = function (e, t, n, i) {
              return (
                _(t) && ((i = i || n), (n = t), (t = void 0)),
                S.ajax(
                  S.extend(
                    { url: e, type: r, dataType: i, data: t, success: n },
                    S.isPlainObject(e) && e
                  )
                )
              );
            };
          }),
          (S._evalUrl = function (e, t) {
            return S.ajax({
              url: e,
              type: "GET",
              dataType: "script",
              cache: !0,
              async: !1,
              global: !1,
              converters: { "text script": function () {} },
              dataFilter: function (e) {
                S.globalEval(e, t);
              },
            });
          }),
          S.fn.extend({
            wrapAll: function (e) {
              var t;
              return (
                this[0] &&
                  (_(e) && (e = e.call(this[0])),
                  (t = S(e, this[0].ownerDocument).eq(0).clone(!0)),
                  this[0].parentNode && t.insertBefore(this[0]),
                  t
                    .map(function () {
                      for (var e = this; e.firstElementChild; )
                        e = e.firstElementChild;
                      return e;
                    })
                    .append(this)),
                this
              );
            },
            wrapInner: function (n) {
              return _(n)
                ? this.each(function (e) {
                    S(this).wrapInner(n.call(this, e));
                  })
                : this.each(function () {
                    var e = S(this),
                      t = e.contents();
                    t.length ? t.wrapAll(n) : e.append(n);
                  });
            },
            wrap: function (t) {
              var n = _(t);
              return this.each(function (e) {
                S(this).wrapAll(n ? t.call(this, e) : t);
              });
            },
            unwrap: function (e) {
              return (
                this.parent(e)
                  .not("body")
                  .each(function () {
                    S(this).replaceWith(this.childNodes);
                  }),
                this
              );
            },
          }),
          (S.expr.pseudos.hidden = function (e) {
            return !S.expr.pseudos.visible(e);
          }),
          (S.expr.pseudos.visible = function (e) {
            return !!(
              e.offsetWidth ||
              e.offsetHeight ||
              e.getClientRects().length
            );
          }),
          (S.ajaxSettings.xhr = function () {
            try {
              return new w.XMLHttpRequest();
            } catch (e) {}
          });
        var Zt = { 0: 200, 1223: 204 },
          en = S.ajaxSettings.xhr();
        (y.cors = !!en && "withCredentials" in en),
          (y.ajax = en = !!en),
          S.ajaxTransport(function (r) {
            var o, s;
            if (y.cors || (en && !r.crossDomain))
              return {
                send: function (e, t) {
                  var n,
                    i = r.xhr();
                  if (
                    (i.open(r.type, r.url, r.async, r.username, r.password),
                    r.xhrFields)
                  )
                    for (n in r.xhrFields) i[n] = r.xhrFields[n];
                  for (n in (r.mimeType &&
                    i.overrideMimeType &&
                    i.overrideMimeType(r.mimeType),
                  r.crossDomain ||
                    e["X-Requested-With"] ||
                    (e["X-Requested-With"] = "XMLHttpRequest"),
                  e))
                    i.setRequestHeader(n, e[n]);
                  (o = function (e) {
                    return function () {
                      o &&
                        ((o = s = i.onload = i.onerror = i.onabort = i.ontimeout = i.onreadystatechange = null),
                        "abort" === e
                          ? i.abort()
                          : "error" === e
                          ? "number" != typeof i.status
                            ? t(0, "error")
                            : t(i.status, i.statusText)
                          : t(
                              Zt[i.status] || i.status,
                              i.statusText,
                              "text" !== (i.responseType || "text") ||
                                "string" != typeof i.responseText
                                ? { binary: i.response }
                                : { text: i.responseText },
                              i.getAllResponseHeaders()
                            ));
                    };
                  }),
                    (i.onload = o()),
                    (s = i.onerror = i.ontimeout = o("error")),
                    void 0 !== i.onabort
                      ? (i.onabort = s)
                      : (i.onreadystatechange = function () {
                          4 === i.readyState &&
                            w.setTimeout(function () {
                              o && s();
                            });
                        }),
                    (o = o("abort"));
                  try {
                    i.send((r.hasContent && r.data) || null);
                  } catch (e) {
                    if (o) throw e;
                  }
                },
                abort: function () {
                  o && o();
                },
              };
          }),
          S.ajaxPrefilter(function (e) {
            e.crossDomain && (e.contents.script = !1);
          }),
          S.ajaxSetup({
            accepts: {
              script:
                "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
              "text script": function (e) {
                return S.globalEval(e), e;
              },
            },
          }),
          S.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1),
              e.crossDomain && (e.type = "GET");
          }),
          S.ajaxTransport("script", function (n) {
            var i, r;
            if (n.crossDomain || n.scriptAttrs)
              return {
                send: function (e, t) {
                  (i = S("<script>")
                    .attr(n.scriptAttrs || {})
                    .prop({ charset: n.scriptCharset, src: n.url })
                    .on(
                      "load error",
                      (r = function (e) {
                        i.remove(),
                          (r = null),
                          e && t("error" === e.type ? 404 : 200, e.type);
                      })
                    )),
                    C.head.appendChild(i[0]);
                },
                abort: function () {
                  r && r();
                },
              };
          });
        var tn,
          nn = [],
          rn = /(=)\?(?=&|$)|\?\?/;
        S.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function () {
            var e = nn.pop() || S.expando + "_" + kt++;
            return (this[e] = !0), e;
          },
        }),
          S.ajaxPrefilter("json jsonp", function (e, t, n) {
            var i,
              r,
              o,
              s =
                !1 !== e.jsonp &&
                (rn.test(e.url)
                  ? "url"
                  : "string" == typeof e.data &&
                    0 ===
                      (e.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    rn.test(e.data) &&
                    "data");
            if (s || "jsonp" === e.dataTypes[0])
              return (
                (i = e.jsonpCallback = _(e.jsonpCallback)
                  ? e.jsonpCallback()
                  : e.jsonpCallback),
                s
                  ? (e[s] = e[s].replace(rn, "$1" + i))
                  : !1 !== e.jsonp &&
                    (e.url += (Pt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i),
                (e.converters["script json"] = function () {
                  return o || S.error(i + " was not called"), o[0];
                }),
                (e.dataTypes[0] = "json"),
                (r = w[i]),
                (w[i] = function () {
                  o = arguments;
                }),
                n.always(function () {
                  void 0 === r ? S(w).removeProp(i) : (w[i] = r),
                    e[i] && ((e.jsonpCallback = t.jsonpCallback), nn.push(i)),
                    o && _(r) && r(o[0]),
                    (o = r = void 0);
                }),
                "script"
              );
          }),
          (y.createHTMLDocument =
            (((tn = C.implementation.createHTMLDocument("").body).innerHTML =
              "<form></form><form></form>"),
            2 === tn.childNodes.length)),
          (S.parseHTML = function (e, t, n) {
            return "string" != typeof e
              ? []
              : ("boolean" == typeof t && ((n = t), (t = !1)),
                t ||
                  (y.createHTMLDocument
                    ? (((i = (t = C.implementation.createHTMLDocument(
                        ""
                      )).createElement("base")).href = C.location.href),
                      t.head.appendChild(i))
                    : (t = C)),
                (o = !n && []),
                (r = x.exec(e))
                  ? [t.createElement(r[1])]
                  : ((r = Ee([e], t, o)),
                    o && o.length && S(o).remove(),
                    S.merge([], r.childNodes)));
            var i, r, o;
          }),
          (S.fn.load = function (e, t, n) {
            var i,
              r,
              o,
              s = this,
              a = e.indexOf(" ");
            return (
              -1 < a && ((i = At(e.slice(a))), (e = e.slice(0, a))),
              _(t)
                ? ((n = t), (t = void 0))
                : t && "object" == typeof t && (r = "POST"),
              0 < s.length &&
                S.ajax({ url: e, type: r || "GET", dataType: "html", data: t })
                  .done(function (e) {
                    (o = arguments),
                      s.html(i ? S("<div>").append(S.parseHTML(e)).find(i) : e);
                  })
                  .always(
                    n &&
                      function (e, t) {
                        s.each(function () {
                          n.apply(this, o || [e.responseText, t, e]);
                        });
                      }
                  ),
              this
            );
          }),
          S.each(
            [
              "ajaxStart",
              "ajaxStop",
              "ajaxComplete",
              "ajaxError",
              "ajaxSuccess",
              "ajaxSend",
            ],
            function (e, t) {
              S.fn[t] = function (e) {
                return this.on(t, e);
              };
            }
          ),
          (S.expr.pseudos.animated = function (t) {
            return S.grep(S.timers, function (e) {
              return t === e.elem;
            }).length;
          }),
          (S.offset = {
            setOffset: function (e, t, n) {
              var i,
                r,
                o,
                s,
                a,
                l,
                u = S.css(e, "position"),
                c = S(e),
                f = {};
              "static" === u && (e.style.position = "relative"),
                (a = c.offset()),
                (o = S.css(e, "top")),
                (l = S.css(e, "left")),
                (r =
                  ("absolute" === u || "fixed" === u) &&
                  -1 < (o + l).indexOf("auto")
                    ? ((s = (i = c.position()).top), i.left)
                    : ((s = parseFloat(o) || 0), parseFloat(l) || 0)),
                _(t) && (t = t.call(e, n, S.extend({}, a))),
                null != t.top && (f.top = t.top - a.top + s),
                null != t.left && (f.left = t.left - a.left + r),
                "using" in t ? t.using.call(e, f) : c.css(f);
            },
          }),
          S.fn.extend({
            offset: function (t) {
              if (arguments.length)
                return void 0 === t
                  ? this
                  : this.each(function (e) {
                      S.offset.setOffset(this, t, e);
                    });
              var e,
                n,
                i = this[0];
              return i
                ? i.getClientRects().length
                  ? ((e = i.getBoundingClientRect()),
                    (n = i.ownerDocument.defaultView),
                    {
                      top: e.top + n.pageYOffset,
                      left: e.left + n.pageXOffset,
                    })
                  : { top: 0, left: 0 }
                : void 0;
            },
            position: function () {
              if (this[0]) {
                var e,
                  t,
                  n,
                  i = this[0],
                  r = { top: 0, left: 0 };
                if ("fixed" === S.css(i, "position"))
                  t = i.getBoundingClientRect();
                else {
                  for (
                    t = this.offset(),
                      n = i.ownerDocument,
                      e = i.offsetParent || n.documentElement;
                    e &&
                    (e === n.body || e === n.documentElement) &&
                    "static" === S.css(e, "position");

                  )
                    e = e.parentNode;
                  e &&
                    e !== i &&
                    1 === e.nodeType &&
                    (((r = S(e).offset()).top += S.css(
                      e,
                      "borderTopWidth",
                      !0
                    )),
                    (r.left += S.css(e, "borderLeftWidth", !0)));
                }
                return {
                  top: t.top - r.top - S.css(i, "marginTop", !0),
                  left: t.left - r.left - S.css(i, "marginLeft", !0),
                };
              }
            },
            offsetParent: function () {
              return this.map(function () {
                for (
                  var e = this.offsetParent;
                  e && "static" === S.css(e, "position");

                )
                  e = e.offsetParent;
                return e || ie;
              });
            },
          }),
          S.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (t, r) {
              var o = "pageYOffset" === r;
              S.fn[t] = function (e) {
                return q(
                  this,
                  function (e, t, n) {
                    var i;
                    if (
                      (g(e) ? (i = e) : 9 === e.nodeType && (i = e.defaultView),
                      void 0 === n)
                    )
                      return i ? i[r] : e[t];
                    i
                      ? i.scrollTo(o ? i.pageXOffset : n, o ? n : i.pageYOffset)
                      : (e[t] = n);
                  },
                  t,
                  e,
                  arguments.length
                );
              };
            }
          ),
          S.each(["top", "left"], function (e, n) {
            S.cssHooks[n] = Je(y.pixelPosition, function (e, t) {
              if (t)
                return (
                  (t = ze(e, n)), Ke.test(t) ? S(e).position()[n] + "px" : t
                );
            });
          }),
          S.each({ Height: "height", Width: "width" }, function (s, a) {
            S.each(
              { padding: "inner" + s, content: a, "": "outer" + s },
              function (i, o) {
                S.fn[o] = function (e, t) {
                  var n = arguments.length && (i || "boolean" != typeof e),
                    r = i || (!0 === e || !0 === t ? "margin" : "border");
                  return q(
                    this,
                    function (e, t, n) {
                      var i;
                      return g(e)
                        ? 0 === o.indexOf("outer")
                          ? e["inner" + s]
                          : e.document.documentElement["client" + s]
                        : 9 === e.nodeType
                        ? ((i = e.documentElement),
                          Math.max(
                            e.body["scroll" + s],
                            i["scroll" + s],
                            e.body["offset" + s],
                            i["offset" + s],
                            i["client" + s]
                          ))
                        : void 0 === n
                        ? S.css(e, t, r)
                        : S.style(e, t, n, r);
                    },
                    a,
                    n ? e : void 0,
                    n
                  );
                };
              }
            );
          }),
          S.each(
            "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
              " "
            ),
            function (e, n) {
              S.fn[n] = function (e, t) {
                return 0 < arguments.length
                  ? this.on(n, null, e, t)
                  : this.trigger(n);
              };
            }
          ),
          S.fn.extend({
            hover: function (e, t) {
              return this.mouseenter(e).mouseleave(t || e);
            },
          }),
          S.fn.extend({
            bind: function (e, t, n) {
              return this.on(e, null, t, n);
            },
            unbind: function (e, t) {
              return this.off(e, null, t);
            },
            delegate: function (e, t, n, i) {
              return this.on(t, e, n, i);
            },
            undelegate: function (e, t, n) {
              return 1 === arguments.length
                ? this.off(e, "**")
                : this.off(t, e || "**", n);
            },
          }),
          (S.proxy = function (e, t) {
            var n, i, r;
            if (("string" == typeof t && ((n = e[t]), (t = e), (e = n)), _(e)))
              return (
                (i = a.call(arguments, 2)),
                ((r = function () {
                  return e.apply(t || this, i.concat(a.call(arguments)));
                }).guid = e.guid = e.guid || S.guid++),
                r
              );
          }),
          (S.holdReady = function (e) {
            e ? S.readyWait++ : S.ready(!0);
          }),
          (S.isArray = Array.isArray),
          (S.parseJSON = JSON.parse),
          (S.nodeName = D),
          (S.isFunction = _),
          (S.isWindow = g),
          (S.camelCase = K),
          (S.type = T),
          (S.now = Date.now),
          (S.isNumeric = function (e) {
            var t = S.type(e);
            return (
              ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            );
          });
        var on = w.jQuery,
          sn = w.$;
        return (
          (S.noConflict = function (e) {
            return (
              w.$ === S && (w.$ = sn), e && w.jQuery === S && (w.jQuery = on), S
            );
          }),
          e || (w.jQuery = w.$ = S),
          S
        );
      }),
      (e.exports = t.document
        ? n(t, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return n(e);
          });
  });
  window.jQuery = s;
  var a =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    l = (function () {
      for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
        if (a && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
      return 0;
    })();
  var u =
    a && window.Promise
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, l));
          };
        };
  function c(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function E(e, t) {
    if (1 !== e.nodeType) return [];
    var n = e.ownerDocument.defaultView.getComputedStyle(e, null);
    return t ? n[t] : n;
  }
  function p(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function g(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var t = E(e),
      n = t.overflow,
      i = t.overflowX,
      r = t.overflowY;
    return /(auto|scroll|overlay)/.test(n + r + i) ? e : g(p(e));
  }
  function m(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  var f = a && !(!window.MSInputMethodContext || !document.documentMode),
    d = a && /MSIE 10/.test(navigator.userAgent);
  function v(e) {
    return 11 === e ? f : 10 === e ? d : f || d;
  }
  function _(e) {
    if (!e) return document.documentElement;
    for (
      var t = v(10) ? document.body : null, n = e.offsetParent || null;
      n === t && e.nextElementSibling;

    )
      n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === E(n, "position")
        ? _(n)
        : n
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function h(e) {
    return null !== e.parentNode ? h(e.parentNode) : e;
  }
  function y(e, t) {
    if (!(e && e.nodeType && t && t.nodeType)) return document.documentElement;
    var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = n ? e : t,
      r = n ? t : e,
      o = document.createRange();
    o.setStart(i, 0), o.setEnd(r, 0);
    var s,
      a,
      l = o.commonAncestorContainer;
    if ((e !== l && t !== l) || i.contains(r))
      return "BODY" === (a = (s = l).nodeName) ||
        ("HTML" !== a && _(s.firstElementChild) !== s)
        ? _(l)
        : l;
    var u = h(e);
    return u.host ? y(u.host, t) : y(e, h(t).host);
  }
  function T(e, t) {
    var n =
        "top" === (1 < arguments.length && void 0 !== t ? t : "top")
          ? "scrollTop"
          : "scrollLeft",
      i = e.nodeName;
    if ("BODY" !== i && "HTML" !== i) return e[n];
    var r = e.ownerDocument.documentElement;
    return (e.ownerDocument.scrollingElement || r)[n];
  }
  function b(e, t) {
    var n = "x" === t ? "Left" : "Top",
      i = "Left" == n ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + n + "Width"], 10) +
      parseFloat(e["border" + i + "Width"], 10)
    );
  }
  function w(e, t, n, i) {
    return Math.max(
      t["offset" + e],
      t["scroll" + e],
      n["client" + e],
      n["offset" + e],
      n["scroll" + e],
      v(10)
        ? parseInt(n["offset" + e]) +
            parseInt(i["margin" + ("Height" === e ? "Top" : "Left")]) +
            parseInt(i["margin" + ("Height" === e ? "Bottom" : "Right")])
        : 0
    );
  }
  function C(e) {
    var t = e.body,
      n = e.documentElement,
      i = v(10) && getComputedStyle(n);
    return { height: w("Height", t, n, i), width: w("Width", t, n, i) };
  }
  var S = function (e, t, n) {
    return t && A(e.prototype, t), n && A(e, n), e;
  };
  function A(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function D(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  var x =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var i in n)
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
      }
      return e;
    };
  function O(e) {
    return x({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function I(e) {
    var t = {};
    try {
      if (v(10)) {
        t = e.getBoundingClientRect();
        var n = T(e, "top"),
          i = T(e, "left");
        (t.top += n), (t.left += i), (t.bottom += n), (t.right += i);
      } else t = e.getBoundingClientRect();
    } catch (e) {}
    var r = {
        left: t.left,
        top: t.top,
        width: t.right - t.left,
        height: t.bottom - t.top,
      },
      o = "HTML" === e.nodeName ? C(e.ownerDocument) : {},
      s = o.width || e.clientWidth || r.width,
      a = o.height || e.clientHeight || r.height,
      l = e.offsetWidth - s,
      u = e.offsetHeight - a;
    if (l || u) {
      var c = E(e);
      (l -= b(c, "x")), (u -= b(c, "y")), (r.width -= l), (r.height -= u);
    }
    return O(r);
  }
  function N(e, t, n) {
    var i = 2 < arguments.length && void 0 !== n && n,
      r = v(10),
      o = "HTML" === t.nodeName,
      s = I(e),
      a = I(t),
      l = g(e),
      u = E(t),
      c = parseFloat(u.borderTopWidth, 10),
      f = parseFloat(u.borderLeftWidth, 10);
    i && o && ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
    var d = O({
      top: s.top - a.top - c,
      left: s.left - a.left - f,
      width: s.width,
      height: s.height,
    });
    if (((d.marginTop = 0), (d.marginLeft = 0), !r && o)) {
      var h = parseFloat(u.marginTop, 10),
        p = parseFloat(u.marginLeft, 10);
      (d.top -= c - h),
        (d.bottom -= c - h),
        (d.left -= f - p),
        (d.right -= f - p),
        (d.marginTop = h),
        (d.marginLeft = p);
    }
    return (
      (r && !i ? t.contains(l) : t === l && "BODY" !== l.nodeName) &&
        (d = (function (e, t, n) {
          var i = 2 < arguments.length && void 0 !== n && n,
            r = T(t, "top"),
            o = T(t, "left"),
            s = i ? -1 : 1;
          return (
            (e.top += r * s),
            (e.bottom += r * s),
            (e.left += o * s),
            (e.right += o * s),
            e
          );
        })(d, t)),
      d
    );
  }
  function L(e) {
    if (!e || !e.parentElement || v()) return document.documentElement;
    for (var t = e.parentElement; t && "none" === E(t, "transform"); )
      t = t.parentElement;
    return t || document.documentElement;
  }
  function k(e, t, n, i, r) {
    var o = 4 < arguments.length && void 0 !== r && r,
      s = { top: 0, left: 0 },
      a = o ? L(e) : y(e, m(t));
    if ("viewport" === i)
      s = (function (e, t) {
        var n = 1 < arguments.length && void 0 !== t && t,
          i = e.ownerDocument.documentElement,
          r = N(e, i),
          o = Math.max(i.clientWidth, window.innerWidth || 0),
          s = Math.max(i.clientHeight, window.innerHeight || 0),
          a = n ? 0 : T(i),
          l = n ? 0 : T(i, "left");
        return O({
          top: a - r.top + r.marginTop,
          left: l - r.left + r.marginLeft,
          width: o,
          height: s,
        });
      })(a, o);
    else {
      var l = void 0;
      "scrollParent" === i
        ? "BODY" === (l = g(p(t))).nodeName &&
          (l = e.ownerDocument.documentElement)
        : (l = "window" === i ? e.ownerDocument.documentElement : i);
      var u = N(l, a, o);
      if (
        "HTML" !== l.nodeName ||
        (function e(t) {
          var n = t.nodeName;
          if ("BODY" === n || "HTML" === n) return !1;
          if ("fixed" === E(t, "position")) return !0;
          var i = p(t);
          return !!i && e(i);
        })(a)
      )
        s = u;
      else {
        var c = C(e.ownerDocument),
          f = c.height,
          d = c.width;
        (s.top += u.top - u.marginTop),
          (s.bottom = f + u.top),
          (s.left += u.left - u.marginLeft),
          (s.right = d + u.left);
      }
    }
    var h = "number" == typeof (n = n || 0);
    return (
      (s.left += h ? n : n.left || 0),
      (s.top += h ? n : n.top || 0),
      (s.right -= h ? n : n.right || 0),
      (s.bottom -= h ? n : n.bottom || 0),
      s
    );
  }
  function P(e, t, i, n, r, o) {
    var s = 5 < arguments.length && void 0 !== o ? o : 0;
    if (-1 === e.indexOf("auto")) return e;
    var a = k(i, n, s, r),
      l = {
        top: { width: a.width, height: t.top - a.top },
        right: { width: a.right - t.right, height: a.height },
        bottom: { width: a.width, height: a.bottom - t.bottom },
        left: { width: t.left - a.left, height: a.height },
      },
      u = Object.keys(l)
        .map(function (e) {
          return x({ key: e }, l[e], { area: (t = l[e]).width * t.height });
          var t;
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      c = u.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= i.clientWidth && n >= i.clientHeight;
      }),
      f = 0 < c.length ? c[0].key : u[0].key,
      d = e.split("-")[1];
    return f + (d ? "-" + d : "");
  }
  function H(e, t, n, i) {
    var r = 3 < arguments.length && void 0 !== i ? i : null;
    return N(n, r ? L(t) : y(t, m(n)), r);
  }
  function j(e) {
    var t = e.ownerDocument.defaultView.getComputedStyle(e),
      n = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
      i = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
    return { width: e.offsetWidth + i, height: e.offsetHeight + n };
  }
  function R(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function Z(e, t, n) {
    n = n.split("-")[0];
    var i = j(e),
      r = { width: i.width, height: i.height },
      o = -1 !== ["right", "left"].indexOf(n),
      s = o ? "top" : "left",
      a = o ? "left" : "top",
      l = o ? "height" : "width",
      u = o ? "width" : "height";
    return (
      (r[s] = t[s] + t[l] / 2 - i[l] / 2),
      (r[a] = n === a ? t[a] - i[u] : t[R(a)]),
      r
    );
  }
  function ee(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function te(e, n, t) {
    return (
      (void 0 === t
        ? e
        : e.slice(
            0,
            (function (e, t, n) {
              if (Array.prototype.findIndex)
                return e.findIndex(function (e) {
                  return e[t] === n;
                });
              var i = ee(e, function (e) {
                return e[t] === n;
              });
              return e.indexOf(i);
            })(e, "name", t)
          )
      ).forEach(function (e) {
        e.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var t = e.function || e.fn;
        e.enabled &&
          c(t) &&
          ((n.offsets.popper = O(n.offsets.popper)),
          (n.offsets.reference = O(n.offsets.reference)),
          (n = t(n, e)));
      }),
      n
    );
  }
  function ne(e, n) {
    return e.some(function (e) {
      var t = e.name;
      return e.enabled && t === n;
    });
  }
  function ie(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        n = e.charAt(0).toUpperCase() + e.slice(1),
        i = 0;
      i < t.length;
      i++
    ) {
      var r = t[i],
        o = r ? "" + r + n : e;
      if (void 0 !== document.body.style[o]) return o;
    }
    return null;
  }
  function re(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function oe(e, t, n, i) {
    (n.updateBound = i),
      re(e).addEventListener("resize", n.updateBound, { passive: !0 });
    var r = g(e);
    return (
      (function e(t, n, i, r) {
        var o = "BODY" === t.nodeName,
          s = o ? t.ownerDocument.defaultView : t;
        s.addEventListener(n, i, { passive: !0 }),
          o || e(g(s.parentNode), n, i, r),
          r.push(s);
      })(r, "scroll", n.updateBound, n.scrollParents),
      (n.scrollElement = r),
      (n.eventsEnabled = !0),
      n
    );
  }
  function se() {
    var e, t;
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state =
        ((e = this.reference),
        (t = this.state),
        re(e).removeEventListener("resize", t.updateBound),
        t.scrollParents.forEach(function (e) {
          e.removeEventListener("scroll", t.updateBound);
        }),
        (t.updateBound = null),
        (t.scrollParents = []),
        (t.scrollElement = null),
        (t.eventsEnabled = !1),
        t)));
  }
  function ae(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function le(n, i) {
    Object.keys(i).forEach(function (e) {
      var t = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(e) &&
        ae(i[e]) &&
        (t = "px"),
        (n.style[e] = i[e] + t);
    });
  }
  function ue(e, t) {
    function n(e) {
      return e;
    }
    var i = e.offsets,
      r = i.popper,
      o = i.reference,
      s = Math.round,
      a = Math.floor,
      l = s(o.width),
      u = s(r.width),
      c = -1 !== ["left", "right"].indexOf(e.placement),
      f = -1 !== e.placement.indexOf("-"),
      d = t ? (c || f || l % 2 == u % 2 ? s : a) : n,
      h = t ? s : n;
    return {
      left: d(l % 2 == 1 && u % 2 == 1 && !f && t ? r.left - 1 : r.left),
      top: h(r.top),
      bottom: h(r.bottom),
      right: d(r.right),
    };
  }
  var ce = a && /Firefox/i.test(navigator.userAgent);
  function fe(e, t, n) {
    var i = ee(e, function (e) {
        return e.name === t;
      }),
      r =
        !!i &&
        e.some(function (e) {
          return e.name === n && e.enabled && e.order < i.order;
        });
    if (!r) {
      var o = "`" + t + "`",
        s = "`" + n + "`";
      console.warn(
        s +
          " modifier is required by " +
          o +
          " modifier in order to work, be sure to include it before " +
          o +
          "!"
      );
    }
    return r;
  }
  var de = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    he = de.slice(3);
  function pe(e, t) {
    var n = 1 < arguments.length && void 0 !== t && t,
      i = he.indexOf(e),
      r = he.slice(i + 1).concat(he.slice(0, i));
    return n ? r.reverse() : r;
  }
  var ge = "flip",
    me = "clockwise",
    ve = "counterclockwise";
  function ye(e, r, o, t) {
    var s = [0, 0],
      a = -1 !== ["right", "left"].indexOf(t),
      n = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      i = n.indexOf(
        ee(n, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    n[i] &&
      -1 === n[i].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var l = /\s*,\s*|\s+/,
      u =
        -1 !== i
          ? [
              n.slice(0, i).concat([n[i].split(l)[0]]),
              [n[i].split(l)[1]].concat(n.slice(i + 1)),
            ]
          : [n];
    return (
      (u = u.map(function (e, t) {
        var n = (1 === t ? !a : a) ? "height" : "width",
          i = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (i = !0), e)
              : i
              ? ((e[e.length - 1] += t), (i = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return (function (e, t, n, i) {
              var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                o = +r[1],
                s = r[2];
              if (!o) return e;
              if (0 !== s.indexOf("%"))
                return "vh" !== s && "vw" !== s
                  ? o
                  : (("vh" === s
                      ? Math.max(
                          document.documentElement.clientHeight,
                          window.innerHeight || 0
                        )
                      : Math.max(
                          document.documentElement.clientWidth,
                          window.innerWidth || 0
                        )) /
                      100) *
                      o;
              var a = void 0;
              switch (s) {
                case "%p":
                  a = n;
                  break;
                case "%":
                case "%r":
                default:
                  a = i;
              }
              return (O(a)[t] / 100) * o;
            })(e, n, r, o);
          });
      })).forEach(function (n, i) {
        n.forEach(function (e, t) {
          ae(e) && (s[i] += e * ("-" === n[t - 1] ? -1 : 1));
        });
      }),
      s
    );
  }
  var _e = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              n = t.split("-")[0],
              i = t.split("-")[1];
            if (i) {
              var r = e.offsets,
                o = r.reference,
                s = r.popper,
                a = -1 !== ["bottom", "top"].indexOf(n),
                l = a ? "left" : "top",
                u = a ? "width" : "height",
                c = {
                  start: D({}, l, o[l]),
                  end: D({}, l, o[l] + o[u] - s[u]),
                };
              e.offsets.popper = x({}, s, c[i]);
            }
            return e;
          },
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function (e, t) {
            var n = t.offset,
              i = e.placement,
              r = e.offsets,
              o = r.popper,
              s = r.reference,
              a = i.split("-")[0],
              l = void 0;
            return (
              (l = ae(+n) ? [+n, 0] : ye(n, o, s, a)),
              "left" === a
                ? ((o.top += l[0]), (o.left -= l[1]))
                : "right" === a
                ? ((o.top += l[0]), (o.left += l[1]))
                : "top" === a
                ? ((o.left += l[0]), (o.top -= l[1]))
                : "bottom" === a && ((o.left += l[0]), (o.top += l[1])),
              (e.popper = o),
              e
            );
          },
          offset: 0,
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, i) {
            var t = i.boundariesElement || _(e.instance.popper);
            e.instance.reference === t && (t = _(t));
            var n = ie("transform"),
              r = e.instance.popper.style,
              o = r.top,
              s = r.left,
              a = r[n];
            (r.top = ""), (r.left = ""), (r[n] = "");
            var l = k(
              e.instance.popper,
              e.instance.reference,
              i.padding,
              t,
              e.positionFixed
            );
            (r.top = o), (r.left = s), (r[n] = a), (i.boundaries = l);
            var u = i.priority,
              c = e.offsets.popper,
              f = {
                primary: function (e) {
                  var t = c[e];
                  return (
                    c[e] < l[e] &&
                      !i.escapeWithReference &&
                      (t = Math.max(c[e], l[e])),
                    D({}, e, t)
                  );
                },
                secondary: function (e) {
                  var t = "right" === e ? "left" : "top",
                    n = c[t];
                  return (
                    c[e] > l[e] &&
                      !i.escapeWithReference &&
                      (n = Math.min(
                        c[t],
                        l[e] - ("right" === e ? c.width : c.height)
                      )),
                    D({}, t, n)
                  );
                },
              };
            return (
              u.forEach(function (e) {
                var t =
                  -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                c = x({}, c, f[t](e));
              }),
              (e.offsets.popper = c),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              n = t.popper,
              i = t.reference,
              r = e.placement.split("-")[0],
              o = Math.floor,
              s = -1 !== ["top", "bottom"].indexOf(r),
              a = s ? "right" : "bottom",
              l = s ? "left" : "top",
              u = s ? "width" : "height";
            return (
              n[a] < o(i[l]) && (e.offsets.popper[l] = o(i[l]) - n[u]),
              n[l] > o(i[a]) && (e.offsets.popper[l] = o(i[a])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, t) {
            var n;
            if (!fe(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var i = t.element;
            if ("string" == typeof i) {
              if (!(i = e.instance.popper.querySelector(i))) return e;
            } else if (!e.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var r = e.placement.split("-")[0],
              o = e.offsets,
              s = o.popper,
              a = o.reference,
              l = -1 !== ["left", "right"].indexOf(r),
              u = l ? "height" : "width",
              c = l ? "Top" : "Left",
              f = c.toLowerCase(),
              d = l ? "left" : "top",
              h = l ? "bottom" : "right",
              p = j(i)[u];
            a[h] - p < s[f] && (e.offsets.popper[f] -= s[f] - (a[h] - p)),
              a[f] + p > s[h] && (e.offsets.popper[f] += a[f] + p - s[h]),
              (e.offsets.popper = O(e.offsets.popper));
            var g = a[f] + a[u] / 2 - p / 2,
              m = E(e.instance.popper),
              v = parseFloat(m["margin" + c], 10),
              y = parseFloat(m["border" + c + "Width"], 10),
              _ = g - e.offsets.popper[f] - v - y;
            return (
              (_ = Math.max(Math.min(s[u] - p, _), 0)),
              (e.arrowElement = i),
              (e.offsets.arrow =
                (D((n = {}), f, Math.round(_)), D(n, d, ""), n)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (m, v) {
            if (ne(m.instance.modifiers, "inner")) return m;
            if (m.flipped && m.placement === m.originalPlacement) return m;
            var y = k(
                m.instance.popper,
                m.instance.reference,
                v.padding,
                v.boundariesElement,
                m.positionFixed
              ),
              _ = m.placement.split("-")[0],
              E = R(_),
              T = m.placement.split("-")[1] || "",
              b = [];
            switch (v.behavior) {
              case ge:
                b = [_, E];
                break;
              case me:
                b = pe(_);
                break;
              case ve:
                b = pe(_, !0);
                break;
              default:
                b = v.behavior;
            }
            return (
              b.forEach(function (e, t) {
                if (_ !== e || b.length === t + 1) return m;
                (_ = m.placement.split("-")[0]), (E = R(_));
                var n,
                  i = m.offsets.popper,
                  r = m.offsets.reference,
                  o = Math.floor,
                  s =
                    ("left" === _ && o(i.right) > o(r.left)) ||
                    ("right" === _ && o(i.left) < o(r.right)) ||
                    ("top" === _ && o(i.bottom) > o(r.top)) ||
                    ("bottom" === _ && o(i.top) < o(r.bottom)),
                  a = o(i.left) < o(y.left),
                  l = o(i.right) > o(y.right),
                  u = o(i.top) < o(y.top),
                  c = o(i.bottom) > o(y.bottom),
                  f =
                    ("left" === _ && a) ||
                    ("right" === _ && l) ||
                    ("top" === _ && u) ||
                    ("bottom" === _ && c),
                  d = -1 !== ["top", "bottom"].indexOf(_),
                  h =
                    !!v.flipVariations &&
                    ((d && "start" === T && a) ||
                      (d && "end" === T && l) ||
                      (!d && "start" === T && u) ||
                      (!d && "end" === T && c)),
                  p =
                    !!v.flipVariationsByContent &&
                    ((d && "start" === T && l) ||
                      (d && "end" === T && a) ||
                      (!d && "start" === T && c) ||
                      (!d && "end" === T && u)),
                  g = h || p;
                (s || f || g) &&
                  ((m.flipped = !0),
                  (s || f) && (_ = b[t + 1]),
                  g &&
                    (T =
                      "end" === (n = T) ? "start" : "start" === n ? "end" : n),
                  (m.placement = _ + (T ? "-" + T : "")),
                  (m.offsets.popper = x(
                    {},
                    m.offsets.popper,
                    Z(m.instance.popper, m.offsets.reference, m.placement)
                  )),
                  (m = te(m.instance.modifiers, m, "flip")));
              }),
              m
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              n = t.split("-")[0],
              i = e.offsets,
              r = i.popper,
              o = i.reference,
              s = -1 !== ["left", "right"].indexOf(n),
              a = -1 === ["top", "left"].indexOf(n);
            return (
              (r[s ? "left" : "top"] =
                o[n] - (a ? r[s ? "width" : "height"] : 0)),
              (e.placement = R(t)),
              (e.offsets.popper = O(r)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!fe(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              n = ee(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < n.top ||
              t.left > n.right ||
              t.top > n.bottom ||
              t.right < n.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var n = t.x,
              i = t.y,
              r = e.offsets.popper,
              o = ee(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== o &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s = void 0 !== o ? o : t.gpuAcceleration,
              a = _(e.instance.popper),
              l = I(a),
              u = { position: r.position },
              c = ue(e, window.devicePixelRatio < 2 || !ce),
              f = "bottom" === n ? "top" : "bottom",
              d = "right" === i ? "left" : "right",
              h = ie("transform"),
              p = void 0,
              g = void 0;
            if (
              ((g =
                "bottom" == f
                  ? "HTML" === a.nodeName
                    ? -a.clientHeight + c.bottom
                    : -l.height + c.bottom
                  : c.top),
              (p =
                "right" == d
                  ? "HTML" === a.nodeName
                    ? -a.clientWidth + c.right
                    : -l.width + c.right
                  : c.left),
              s && h)
            )
              (u[h] = "translate3d(" + p + "px, " + g + "px, 0)"),
                (u[f] = 0),
                (u[d] = 0),
                (u.willChange = "transform");
            else {
              var m = "bottom" == f ? -1 : 1,
                v = "right" == d ? -1 : 1;
              (u[f] = g * m), (u[d] = p * v), (u.willChange = f + ", " + d);
            }
            var y = { "x-placement": e.placement };
            return (
              (e.attributes = x({}, y, e.attributes)),
              (e.styles = x({}, u, e.styles)),
              (e.arrowStyles = x({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            var t, n;
            return (
              le(e.instance.popper, e.styles),
              (t = e.instance.popper),
              (n = e.attributes),
              Object.keys(n).forEach(function (e) {
                !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e);
              }),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                le(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, t, n, i, r) {
            var o = H(r, t, e, n.positionFixed),
              s = P(
                n.placement,
                o,
                t,
                e,
                n.modifiers.flip.boundariesElement,
                n.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", s),
              le(t, { position: n.positionFixed ? "fixed" : "absolute" }),
              n
            );
          },
          gpuAcceleration: void 0,
        },
      },
    },
    Ee =
      (S(Te, [
        {
          key: "update",
          value: function () {
            return function () {
              if (!this.state.isDestroyed) {
                var e = {
                  instance: this,
                  styles: {},
                  arrowStyles: {},
                  attributes: {},
                  flipped: !1,
                  offsets: {},
                };
                (e.offsets.reference = H(
                  this.state,
                  this.popper,
                  this.reference,
                  this.options.positionFixed
                )),
                  (e.placement = P(
                    this.options.placement,
                    e.offsets.reference,
                    this.popper,
                    this.reference,
                    this.options.modifiers.flip.boundariesElement,
                    this.options.modifiers.flip.padding
                  )),
                  (e.originalPlacement = e.placement),
                  (e.positionFixed = this.options.positionFixed),
                  (e.offsets.popper = Z(
                    this.popper,
                    e.offsets.reference,
                    e.placement
                  )),
                  (e.offsets.popper.position = this.options.positionFixed
                    ? "fixed"
                    : "absolute"),
                  (e = te(this.modifiers, e)),
                  this.state.isCreated
                    ? this.options.onUpdate(e)
                    : ((this.state.isCreated = !0), this.options.onCreate(e));
              }
            }.call(this);
          },
        },
        {
          key: "destroy",
          value: function () {
            return function () {
              return (
                (this.state.isDestroyed = !0),
                ne(this.modifiers, "applyStyle") &&
                  (this.popper.removeAttribute("x-placement"),
                  (this.popper.style.position = ""),
                  (this.popper.style.top = ""),
                  (this.popper.style.left = ""),
                  (this.popper.style.right = ""),
                  (this.popper.style.bottom = ""),
                  (this.popper.style.willChange = ""),
                  (this.popper.style[ie("transform")] = "")),
                this.disableEventListeners(),
                this.options.removeOnDestroy &&
                  this.popper.parentNode.removeChild(this.popper),
                this
              );
            }.call(this);
          },
        },
        {
          key: "enableEventListeners",
          value: function () {
            return function () {
              this.state.eventsEnabled ||
                (this.state = oe(
                  this.reference,
                  this.options,
                  this.state,
                  this.scheduleUpdate
                ));
            }.call(this);
          },
        },
        {
          key: "disableEventListeners",
          value: function () {
            return se.call(this);
          },
        },
      ]),
      Te);
  function Te(e, t) {
    var n = this,
      i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
    !(function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    })(this, Te),
      (this.scheduleUpdate = function () {
        return requestAnimationFrame(n.update);
      }),
      (this.update = u(this.update.bind(this))),
      (this.options = x({}, Te.Defaults, i)),
      (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
      (this.reference = e && e.jquery ? e[0] : e),
      (this.popper = t && t.jquery ? t[0] : t),
      (this.options.modifiers = {}),
      Object.keys(x({}, Te.Defaults.modifiers, i.modifiers)).forEach(function (
        e
      ) {
        n.options.modifiers[e] = x(
          {},
          Te.Defaults.modifiers[e] || {},
          i.modifiers ? i.modifiers[e] : {}
        );
      }),
      (this.modifiers = Object.keys(this.options.modifiers)
        .map(function (e) {
          return x({ name: e }, n.options.modifiers[e]);
        })
        .sort(function (e, t) {
          return e.order - t.order;
        })),
      this.modifiers.forEach(function (e) {
        e.enabled &&
          c(e.onLoad) &&
          e.onLoad(n.reference, n.popper, n.options, e, n.state);
      }),
      this.update();
    var r = this.options.eventsEnabled;
    r && this.enableEventListeners(), (this.state.eventsEnabled = r);
  }
  (Ee.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
    (Ee.placements = de),
    (Ee.Defaults = _e);
  var be,
    we = r(function (e, t) {
      !(function (e, m, d) {
        function i(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || false;
            i.configurable = true;
            if ("value" in i) i.writable = true;
            Object.defineProperty(e, i.key, i);
          }
        }
        function o(e, t, n) {
          if (t) i(e.prototype, t);
          if (n) i(e, n);
          return e;
        }
        function r(e, t, n) {
          if (t in e) {
            Object.defineProperty(e, t, {
              value: n,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            e[t] = n;
          }
          return e;
        }
        function s(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            if (e)
              i = i.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              });
            n.push.apply(n, i);
          }
          return n;
        }
        function a(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = arguments[e] != null ? arguments[e] : {};
            if (e % 2) {
              s(Object(n), true).forEach(function (e) {
                r(t, e, n[e]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(t, Object.getOwnPropertyDescriptors(n));
            } else {
              s(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
            }
          }
          return t;
        }
        function n(e, t) {
          e.prototype = Object.create(t.prototype);
          e.prototype.constructor = e;
          e.__proto__ = t;
        }
        (m = m && m.hasOwnProperty("default") ? m["default"] : m),
          (d = d && d.hasOwnProperty("default") ? d["default"] : d);
        var l = "transitionend",
          u = 1e6,
          c = 1e3;
        function f(e) {
          return {}.toString
            .call(e)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase();
        }
        function t() {
          return {
            bindType: l,
            delegateType: l,
            handle: function e(t) {
              if (m(t.target).is(this)) {
                return t.handleObj.handler.apply(this, arguments);
              }
              return undefined;
            },
          };
        }
        function h(e) {
          var t = this;
          var n = false;
          m(this).one(v.TRANSITION_END, function () {
            n = true;
          });
          setTimeout(function () {
            if (!n) {
              v.triggerTransitionEnd(t);
            }
          }, e);
          return this;
        }
        function p() {
          m.fn.emulateTransitionEnd = h;
          m.event.special[v.TRANSITION_END] = t();
        }
        var v = {
          TRANSITION_END: "bsTransitionEnd",
          getUID: function e(t) {
            do {
              t += ~~(Math.random() * u);
            } while (document.getElementById(t));
            return t;
          },
          getSelectorFromElement: function e(t) {
            var n = t.getAttribute("data-target");
            if (!n || n === "#") {
              var i = t.getAttribute("href");
              n = i && i !== "#" ? i.trim() : "";
            }
            try {
              return document.querySelector(n) ? n : null;
            } catch (e) {
              return null;
            }
          },
          getTransitionDurationFromElement: function e(t) {
            if (!t) {
              return 0;
            }
            var n = m(t).css("transition-duration");
            var i = m(t).css("transition-delay");
            var r = parseFloat(n);
            var o = parseFloat(i);
            if (!r && !o) {
              return 0;
            }
            n = n.split(",")[0];
            i = i.split(",")[0];
            return (parseFloat(n) + parseFloat(i)) * c;
          },
          reflow: function e(t) {
            return t.offsetHeight;
          },
          triggerTransitionEnd: function e(t) {
            m(t).trigger(l);
          },
          supportsTransitionEnd: function e() {
            return Boolean(l);
          },
          isElement: function e(t) {
            return (t[0] || t).nodeType;
          },
          typeCheckConfig: function e(t, n, i) {
            for (var r in i) {
              if (Object.prototype.hasOwnProperty.call(i, r)) {
                var o = i[r];
                var s = n[r];
                var a = s && v.isElement(s) ? "element" : f(s);
                if (!new RegExp(o).test(a)) {
                  throw new Error(
                    t.toUpperCase() +
                      ": " +
                      ('Option "' + r + '" provided type "' + a + '" ') +
                      ('but expected type "' + o + '".')
                  );
                }
              }
            }
          },
          findShadowRoot: function e(t) {
            if (!document.documentElement.attachShadow) {
              return null;
            }
            if (typeof t.getRootNode === "function") {
              var n = t.getRootNode();
              return n instanceof ShadowRoot ? n : null;
            }
            if (t instanceof ShadowRoot) {
              return t;
            }
            if (!t.parentNode) {
              return null;
            }
            return v.findShadowRoot(t.parentNode);
          },
          jQueryDetection: function e() {
            if (typeof m === "undefined") {
              throw new TypeError(
                "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
              );
            }
            var t = m.fn.jquery.split(" ")[0].split(".");
            var n = 1;
            var i = 2;
            var r = 9;
            var o = 1;
            var s = 4;
            if (
              (t[0] < i && t[1] < r) ||
              (t[0] === n && t[1] === r && t[2] < o) ||
              t[0] >= s
            ) {
              throw new Error(
                "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
              );
            }
          },
        };
        v.jQueryDetection(), p();
        var g = "alert",
          y = "4.4.1",
          _ = "bs.alert",
          E = "." + _,
          T = ".data-api",
          b = m.fn[g],
          w = { DISMISS: '[data-dismiss="alert"]' },
          C = {
            CLOSE: "close" + E,
            CLOSED: "closed" + E,
            CLICK_DATA_API: "click" + E + T,
          },
          S = { ALERT: "alert", FADE: "fade", SHOW: "show" },
          A = (function () {
            function i(e) {
              this._element = e;
            }
            var e = i.prototype;
            e.close = function e(t) {
              var n = this._element;
              if (t) {
                n = this._getRootElement(t);
              }
              var i = this._triggerCloseEvent(n);
              if (i.isDefaultPrevented()) {
                return;
              }
              this._removeElement(n);
            };
            e.dispose = function e() {
              m.removeData(this._element, _);
              this._element = null;
            };
            e._getRootElement = function e(t) {
              var n = v.getSelectorFromElement(t);
              var i = false;
              if (n) {
                i = document.querySelector(n);
              }
              if (!i) {
                i = m(t).closest("." + S.ALERT)[0];
              }
              return i;
            };
            e._triggerCloseEvent = function e(t) {
              var n = m.Event(C.CLOSE);
              m(t).trigger(n);
              return n;
            };
            e._removeElement = function e(t) {
              var n = this;
              m(t).removeClass(S.SHOW);
              if (!m(t).hasClass(S.FADE)) {
                this._destroyElement(t);
                return;
              }
              var i = v.getTransitionDurationFromElement(t);
              m(t)
                .one(v.TRANSITION_END, function (e) {
                  return n._destroyElement(t, e);
                })
                .emulateTransitionEnd(i);
            };
            e._destroyElement = function e(t) {
              m(t).detach().trigger(C.CLOSED).remove();
            };
            i._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this);
                var t = e.data(_);
                if (!t) {
                  t = new i(this);
                  e.data(_, t);
                }
                if (n === "close") {
                  t[n](this);
                }
              });
            };
            i._handleDismiss = function e(t) {
              return function (e) {
                if (e) {
                  e.preventDefault();
                }
                t.close(this);
              };
            };
            o(i, null, [
              {
                key: "VERSION",
                get: function e() {
                  return y;
                },
              },
            ]);
            return i;
          })();
        m(document).on(C.CLICK_DATA_API, w.DISMISS, A._handleDismiss(new A())),
          (m.fn[g] = A._jQueryInterface),
          (m.fn[g].Constructor = A),
          (m.fn[g].noConflict = function () {
            m.fn[g] = b;
            return A._jQueryInterface;
          });
        var D = "button",
          x = "4.4.1",
          O = "bs.button",
          I = "." + O,
          N = ".data-api",
          L = m.fn[D],
          k = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
          P = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLES: '[data-toggle="buttons"]',
            DATA_TOGGLE: '[data-toggle="button"]',
            DATA_TOGGLES_BUTTONS: '[data-toggle="buttons"] .btn',
            INPUT: 'input:not([type="hidden"])',
            ACTIVE: ".active",
            BUTTON: ".btn",
          },
          H = {
            CLICK_DATA_API: "click" + I + N,
            FOCUS_BLUR_DATA_API: "focus" + I + N + " " + ("blur" + I + N),
            LOAD_DATA_API: "load" + I + N,
          },
          j = (function () {
            function n(e) {
              this._element = e;
            }
            var e = n.prototype;
            e.toggle = function e() {
              var t = true;
              var n = true;
              var i = m(this._element).closest(P.DATA_TOGGLES)[0];
              if (i) {
                var r = this._element.querySelector(P.INPUT);
                if (r) {
                  if (r.type === "radio") {
                    if (
                      r.checked &&
                      this._element.classList.contains(k.ACTIVE)
                    ) {
                      t = false;
                    } else {
                      var o = i.querySelector(P.ACTIVE);
                      if (o) {
                        m(o).removeClass(k.ACTIVE);
                      }
                    }
                  } else if (r.type === "checkbox") {
                    if (
                      this._element.tagName === "LABEL" &&
                      r.checked === this._element.classList.contains(k.ACTIVE)
                    ) {
                      t = false;
                    }
                  } else {
                    t = false;
                  }
                  if (t) {
                    r.checked = !this._element.classList.contains(k.ACTIVE);
                    m(r).trigger("change");
                  }
                  r.focus();
                  n = false;
                }
              }
              if (
                !(
                  this._element.hasAttribute("disabled") ||
                  this._element.classList.contains("disabled")
                )
              ) {
                if (n) {
                  this._element.setAttribute(
                    "aria-pressed",
                    !this._element.classList.contains(k.ACTIVE)
                  );
                }
                if (t) {
                  m(this._element).toggleClass(k.ACTIVE);
                }
              }
            };
            e.dispose = function e() {
              m.removeData(this._element, O);
              this._element = null;
            };
            n._jQueryInterface = function e(t) {
              return this.each(function () {
                var e = m(this).data(O);
                if (!e) {
                  e = new n(this);
                  m(this).data(O, e);
                }
                if (t === "toggle") {
                  e[t]();
                }
              });
            };
            o(n, null, [
              {
                key: "VERSION",
                get: function e() {
                  return x;
                },
              },
            ]);
            return n;
          })();
        m(document)
          .on(H.CLICK_DATA_API, P.DATA_TOGGLE_CARROT, function (e) {
            var t = e.target;
            if (!m(t).hasClass(k.BUTTON)) {
              t = m(t).closest(P.BUTTON)[0];
            }
            if (
              !t ||
              t.hasAttribute("disabled") ||
              t.classList.contains("disabled")
            ) {
              e.preventDefault();
            } else {
              var n = t.querySelector(P.INPUT);
              if (
                n &&
                (n.hasAttribute("disabled") || n.classList.contains("disabled"))
              ) {
                e.preventDefault();
                return;
              }
              j._jQueryInterface.call(m(t), "toggle");
            }
          })
          .on(H.FOCUS_BLUR_DATA_API, P.DATA_TOGGLE_CARROT, function (e) {
            var t = m(e.target).closest(P.BUTTON)[0];
            m(t).toggleClass(k.FOCUS, /^focus(in)?$/.test(e.type));
          }),
          m(window).on(H.LOAD_DATA_API, function () {
            var e = [].slice.call(
              document.querySelectorAll(P.DATA_TOGGLES_BUTTONS)
            );
            for (var t = 0, n = e.length; t < n; t++) {
              var i = e[t];
              var r = i.querySelector(P.INPUT);
              if (r.checked || r.hasAttribute("checked")) {
                i.classList.add(k.ACTIVE);
              } else {
                i.classList.remove(k.ACTIVE);
              }
            }
            e = [].slice.call(document.querySelectorAll(P.DATA_TOGGLE));
            for (var o = 0, s = e.length; o < s; o++) {
              var a = e[o];
              if (a.getAttribute("aria-pressed") === "true") {
                a.classList.add(k.ACTIVE);
              } else {
                a.classList.remove(k.ACTIVE);
              }
            }
          }),
          (m.fn[D] = j._jQueryInterface),
          (m.fn[D].Constructor = j),
          (m.fn[D].noConflict = function () {
            m.fn[D] = L;
            return j._jQueryInterface;
          });
        var R = "carousel",
          M = "4.4.1",
          W = "bs.carousel",
          F = "." + W,
          V = ".data-api",
          q = m.fn[R],
          U = 37,
          B = 39,
          G = 500,
          K = 40,
          Q = {
            interval: 5e3,
            keyboard: true,
            slide: false,
            pause: "hover",
            wrap: true,
            touch: true,
          },
          $ = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean",
          },
          X = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
          Y = {
            SLIDE: "slide" + F,
            SLID: "slid" + F,
            KEYDOWN: "keydown" + F,
            MOUSEENTER: "mouseenter" + F,
            MOUSELEAVE: "mouseleave" + F,
            TOUCHSTART: "touchstart" + F,
            TOUCHMOVE: "touchmove" + F,
            TOUCHEND: "touchend" + F,
            POINTERDOWN: "pointerdown" + F,
            POINTERUP: "pointerup" + F,
            DRAG_START: "dragstart" + F,
            LOAD_DATA_API: "load" + F + V,
            CLICK_DATA_API: "click" + F + V,
          },
          z = {
            CAROUSEL: "carousel",
            ACTIVE: "active",
            SLIDE: "slide",
            RIGHT: "carousel-item-right",
            LEFT: "carousel-item-left",
            NEXT: "carousel-item-next",
            PREV: "carousel-item-prev",
            ITEM: "carousel-item",
            POINTER_EVENT: "pointer-event",
          },
          J = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            ITEM_IMG: ".carousel-item img",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]',
          },
          Z = { TOUCH: "touch", PEN: "pen" },
          ee = (function () {
            function s(e, t) {
              this._items = null;
              this._interval = null;
              this._activeElement = null;
              this._isPaused = false;
              this._isSliding = false;
              this.touchTimeout = null;
              this.touchStartX = 0;
              this.touchDeltaX = 0;
              this._config = this._getConfig(t);
              this._element = e;
              this._indicatorsElement = this._element.querySelector(
                J.INDICATORS
              );
              this._touchSupported =
                "ontouchstart" in document.documentElement ||
                navigator.maxTouchPoints > 0;
              this._pointerEvent = Boolean(
                window.PointerEvent || window.MSPointerEvent
              );
              this._addEventListeners();
            }
            var e = s.prototype;
            e.next = function e() {
              if (!this._isSliding) {
                this._slide(X.NEXT);
              }
            };
            e.nextWhenVisible = function e() {
              if (
                !document.hidden &&
                m(this._element).is(":visible") &&
                m(this._element).css("visibility") !== "hidden"
              ) {
                this.next();
              }
            };
            e.prev = function e() {
              if (!this._isSliding) {
                this._slide(X.PREV);
              }
            };
            e.pause = function e(t) {
              if (!t) {
                this._isPaused = true;
              }
              if (this._element.querySelector(J.NEXT_PREV)) {
                v.triggerTransitionEnd(this._element);
                this.cycle(true);
              }
              clearInterval(this._interval);
              this._interval = null;
            };
            e.cycle = function e(t) {
              if (!t) {
                this._isPaused = false;
              }
              if (this._interval) {
                clearInterval(this._interval);
                this._interval = null;
              }
              if (this._config.interval && !this._isPaused) {
                this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                );
              }
            };
            e.to = function e(t) {
              var n = this;
              this._activeElement = this._element.querySelector(J.ACTIVE_ITEM);
              var i = this._getItemIndex(this._activeElement);
              if (t > this._items.length - 1 || t < 0) {
                return;
              }
              if (this._isSliding) {
                m(this._element).one(Y.SLID, function () {
                  return n.to(t);
                });
                return;
              }
              if (i === t) {
                this.pause();
                this.cycle();
                return;
              }
              var r = t > i ? X.NEXT : X.PREV;
              this._slide(r, this._items[t]);
            };
            e.dispose = function e() {
              m(this._element).off(F);
              m.removeData(this._element, W);
              this._items = null;
              this._config = null;
              this._element = null;
              this._interval = null;
              this._isPaused = null;
              this._isSliding = null;
              this._activeElement = null;
              this._indicatorsElement = null;
            };
            e._getConfig = function e(t) {
              t = a({}, Q, {}, t);
              v.typeCheckConfig(R, t, $);
              return t;
            };
            e._handleSwipe = function e() {
              var t = Math.abs(this.touchDeltaX);
              if (t <= K) {
                return;
              }
              var n = t / this.touchDeltaX;
              this.touchDeltaX = 0;
              if (n > 0) {
                this.prev();
              }
              if (n < 0) {
                this.next();
              }
            };
            e._addEventListeners = function e() {
              var t = this;
              if (this._config.keyboard) {
                m(this._element).on(Y.KEYDOWN, function (e) {
                  return t._keydown(e);
                });
              }
              if (this._config.pause === "hover") {
                m(this._element)
                  .on(Y.MOUSEENTER, function (e) {
                    return t.pause(e);
                  })
                  .on(Y.MOUSELEAVE, function (e) {
                    return t.cycle(e);
                  });
              }
              if (this._config.touch) {
                this._addTouchEventListeners();
              }
            };
            e._addTouchEventListeners = function e() {
              var n = this;
              if (!this._touchSupported) {
                return;
              }
              var t = function e(t) {
                if (
                  n._pointerEvent &&
                  Z[t.originalEvent.pointerType.toUpperCase()]
                ) {
                  n.touchStartX = t.originalEvent.clientX;
                } else if (!n._pointerEvent) {
                  n.touchStartX = t.originalEvent.touches[0].clientX;
                }
              };
              var i = function e(t) {
                if (
                  t.originalEvent.touches &&
                  t.originalEvent.touches.length > 1
                ) {
                  n.touchDeltaX = 0;
                } else {
                  n.touchDeltaX =
                    t.originalEvent.touches[0].clientX - n.touchStartX;
                }
              };
              var r = function e(t) {
                if (
                  n._pointerEvent &&
                  Z[t.originalEvent.pointerType.toUpperCase()]
                ) {
                  n.touchDeltaX = t.originalEvent.clientX - n.touchStartX;
                }
                n._handleSwipe();
                if (n._config.pause === "hover") {
                  n.pause();
                  if (n.touchTimeout) {
                    clearTimeout(n.touchTimeout);
                  }
                  n.touchTimeout = setTimeout(function (e) {
                    return n.cycle(e);
                  }, G + n._config.interval);
                }
              };
              m(this._element.querySelectorAll(J.ITEM_IMG)).on(
                Y.DRAG_START,
                function (e) {
                  return e.preventDefault();
                }
              );
              if (this._pointerEvent) {
                m(this._element).on(Y.POINTERDOWN, function (e) {
                  return t(e);
                });
                m(this._element).on(Y.POINTERUP, function (e) {
                  return r(e);
                });
                this._element.classList.add(z.POINTER_EVENT);
              } else {
                m(this._element).on(Y.TOUCHSTART, function (e) {
                  return t(e);
                });
                m(this._element).on(Y.TOUCHMOVE, function (e) {
                  return i(e);
                });
                m(this._element).on(Y.TOUCHEND, function (e) {
                  return r(e);
                });
              }
            };
            e._keydown = function e(t) {
              if (/input|textarea/i.test(t.target.tagName)) {
                return;
              }
              switch (t.which) {
                case U:
                  t.preventDefault();
                  this.prev();
                  break;
                case B:
                  t.preventDefault();
                  this.next();
                  break;
              }
            };
            e._getItemIndex = function e(t) {
              this._items =
                t && t.parentNode
                  ? [].slice.call(t.parentNode.querySelectorAll(J.ITEM))
                  : [];
              return this._items.indexOf(t);
            };
            e._getItemByDirection = function e(t, n) {
              var i = t === X.NEXT;
              var r = t === X.PREV;
              var o = this._getItemIndex(n);
              var s = this._items.length - 1;
              var a = (r && o === 0) || (i && o === s);
              if (a && !this._config.wrap) {
                return n;
              }
              var l = t === X.PREV ? -1 : 1;
              var u = (o + l) % this._items.length;
              return u === -1
                ? this._items[this._items.length - 1]
                : this._items[u];
            };
            e._triggerSlideEvent = function e(t, n) {
              var i = this._getItemIndex(t);
              var r = this._getItemIndex(
                this._element.querySelector(J.ACTIVE_ITEM)
              );
              var o = m.Event(Y.SLIDE, {
                relatedTarget: t,
                direction: n,
                from: r,
                to: i,
              });
              m(this._element).trigger(o);
              return o;
            };
            e._setActiveIndicatorElement = function e(t) {
              if (this._indicatorsElement) {
                var n = [].slice.call(
                  this._indicatorsElement.querySelectorAll(J.ACTIVE)
                );
                m(n).removeClass(z.ACTIVE);
                var i = this._indicatorsElement.children[this._getItemIndex(t)];
                if (i) {
                  m(i).addClass(z.ACTIVE);
                }
              }
            };
            e._slide = function e(t, n) {
              var i = this;
              var r = this._element.querySelector(J.ACTIVE_ITEM);
              var o = this._getItemIndex(r);
              var s = n || (r && this._getItemByDirection(t, r));
              var a = this._getItemIndex(s);
              var l = Boolean(this._interval);
              var u;
              var c;
              var f;
              if (t === X.NEXT) {
                u = z.LEFT;
                c = z.NEXT;
                f = X.LEFT;
              } else {
                u = z.RIGHT;
                c = z.PREV;
                f = X.RIGHT;
              }
              if (s && m(s).hasClass(z.ACTIVE)) {
                this._isSliding = false;
                return;
              }
              var d = this._triggerSlideEvent(s, f);
              if (d.isDefaultPrevented()) {
                return;
              }
              if (!r || !s) {
                return;
              }
              this._isSliding = true;
              if (l) {
                this.pause();
              }
              this._setActiveIndicatorElement(s);
              var h = m.Event(Y.SLID, {
                relatedTarget: s,
                direction: f,
                from: o,
                to: a,
              });
              if (m(this._element).hasClass(z.SLIDE)) {
                m(s).addClass(c);
                v.reflow(s);
                m(r).addClass(u);
                m(s).addClass(u);
                var p = parseInt(s.getAttribute("data-interval"), 10);
                if (p) {
                  this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval;
                  this._config.interval = p;
                } else {
                  this._config.interval =
                    this._config.defaultInterval || this._config.interval;
                }
                var g = v.getTransitionDurationFromElement(r);
                m(r)
                  .one(v.TRANSITION_END, function () {
                    m(s)
                      .removeClass(u + " " + c)
                      .addClass(z.ACTIVE);
                    m(r).removeClass(z.ACTIVE + " " + c + " " + u);
                    i._isSliding = false;
                    setTimeout(function () {
                      return m(i._element).trigger(h);
                    }, 0);
                  })
                  .emulateTransitionEnd(g);
              } else {
                m(r).removeClass(z.ACTIVE);
                m(s).addClass(z.ACTIVE);
                this._isSliding = false;
                m(this._element).trigger(h);
              }
              if (l) {
                this.cycle();
              }
            };
            s._jQueryInterface = function e(i) {
              return this.each(function () {
                var e = m(this).data(W);
                var t = a({}, Q, {}, m(this).data());
                if (typeof i === "object") {
                  t = a({}, t, {}, i);
                }
                var n = typeof i === "string" ? i : t.slide;
                if (!e) {
                  e = new s(this, t);
                  m(this).data(W, e);
                }
                if (typeof i === "number") {
                  e.to(i);
                } else if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n]();
                } else if (t.interval && t.ride) {
                  e.pause();
                  e.cycle();
                }
              });
            };
            s._dataApiClickHandler = function e(t) {
              var n = v.getSelectorFromElement(this);
              if (!n) {
                return;
              }
              var i = m(n)[0];
              if (!i || !m(i).hasClass(z.CAROUSEL)) {
                return;
              }
              var r = a({}, m(i).data(), {}, m(this).data());
              var o = this.getAttribute("data-slide-to");
              if (o) {
                r.interval = false;
              }
              s._jQueryInterface.call(m(i), r);
              if (o) {
                m(i).data(W).to(o);
              }
              t.preventDefault();
            };
            o(s, null, [
              {
                key: "VERSION",
                get: function e() {
                  return M;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return Q;
                },
              },
            ]);
            return s;
          })();
        m(document).on(Y.CLICK_DATA_API, J.DATA_SLIDE, ee._dataApiClickHandler),
          m(window).on(Y.LOAD_DATA_API, function () {
            var e = [].slice.call(document.querySelectorAll(J.DATA_RIDE));
            for (var t = 0, n = e.length; t < n; t++) {
              var i = m(e[t]);
              ee._jQueryInterface.call(i, i.data());
            }
          }),
          (m.fn[R] = ee._jQueryInterface),
          (m.fn[R].Constructor = ee),
          (m.fn[R].noConflict = function () {
            m.fn[R] = q;
            return ee._jQueryInterface;
          });
        var te = "collapse",
          ne = "4.4.1",
          ie = "bs.collapse",
          re = "." + ie,
          oe = ".data-api",
          se = m.fn[te],
          ae = { toggle: true, parent: "" },
          le = { toggle: "boolean", parent: "(string|element)" },
          ue = {
            SHOW: "show" + re,
            SHOWN: "shown" + re,
            HIDE: "hide" + re,
            HIDDEN: "hidden" + re,
            CLICK_DATA_API: "click" + re + oe,
          },
          ce = {
            SHOW: "show",
            COLLAPSE: "collapse",
            COLLAPSING: "collapsing",
            COLLAPSED: "collapsed",
          },
          fe = { WIDTH: "width", HEIGHT: "height" },
          de = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]',
          },
          he = (function () {
            function c(t, e) {
              this._isTransitioning = false;
              this._element = t;
              this._config = this._getConfig(e);
              this._triggerArray = [].slice.call(
                document.querySelectorAll(
                  '[data-toggle="collapse"][href="#' +
                    t.id +
                    '"],' +
                    ('[data-toggle="collapse"][data-target="#' + t.id + '"]')
                )
              );
              var n = [].slice.call(document.querySelectorAll(de.DATA_TOGGLE));
              for (var i = 0, r = n.length; i < r; i++) {
                var o = n[i];
                var s = v.getSelectorFromElement(o);
                var a = [].slice
                  .call(document.querySelectorAll(s))
                  .filter(function (e) {
                    return e === t;
                  });
                if (s !== null && a.length > 0) {
                  this._selector = s;
                  this._triggerArray.push(o);
                }
              }
              this._parent = this._config.parent ? this._getParent() : null;
              if (!this._config.parent) {
                this._addAriaAndCollapsedClass(
                  this._element,
                  this._triggerArray
                );
              }
              if (this._config.toggle) {
                this.toggle();
              }
            }
            var e = c.prototype;
            e.toggle = function e() {
              if (m(this._element).hasClass(ce.SHOW)) {
                this.hide();
              } else {
                this.show();
              }
            };
            e.show = function e() {
              var t = this;
              if (this._isTransitioning || m(this._element).hasClass(ce.SHOW)) {
                return;
              }
              var n;
              var i;
              if (this._parent) {
                n = [].slice
                  .call(this._parent.querySelectorAll(de.ACTIVES))
                  .filter(function (e) {
                    if (typeof t._config.parent === "string") {
                      return e.getAttribute("data-parent") === t._config.parent;
                    }
                    return e.classList.contains(ce.COLLAPSE);
                  });
                if (n.length === 0) {
                  n = null;
                }
              }
              if (n) {
                i = m(n).not(this._selector).data(ie);
                if (i && i._isTransitioning) {
                  return;
                }
              }
              var r = m.Event(ue.SHOW);
              m(this._element).trigger(r);
              if (r.isDefaultPrevented()) {
                return;
              }
              if (n) {
                c._jQueryInterface.call(m(n).not(this._selector), "hide");
                if (!i) {
                  m(n).data(ie, null);
                }
              }
              var o = this._getDimension();
              m(this._element).removeClass(ce.COLLAPSE).addClass(ce.COLLAPSING);
              this._element.style[o] = 0;
              if (this._triggerArray.length) {
                m(this._triggerArray)
                  .removeClass(ce.COLLAPSED)
                  .attr("aria-expanded", true);
              }
              this.setTransitioning(true);
              var s = function e() {
                m(t._element)
                  .removeClass(ce.COLLAPSING)
                  .addClass(ce.COLLAPSE)
                  .addClass(ce.SHOW);
                t._element.style[o] = "";
                t.setTransitioning(false);
                m(t._element).trigger(ue.SHOWN);
              };
              var a = o[0].toUpperCase() + o.slice(1);
              var l = "scroll" + a;
              var u = v.getTransitionDurationFromElement(this._element);
              m(this._element).one(v.TRANSITION_END, s).emulateTransitionEnd(u);
              this._element.style[o] = this._element[l] + "px";
            };
            e.hide = function e() {
              var t = this;
              if (
                this._isTransitioning ||
                !m(this._element).hasClass(ce.SHOW)
              ) {
                return;
              }
              var n = m.Event(ue.HIDE);
              m(this._element).trigger(n);
              if (n.isDefaultPrevented()) {
                return;
              }
              var i = this._getDimension();
              this._element.style[i] =
                this._element.getBoundingClientRect()[i] + "px";
              v.reflow(this._element);
              m(this._element)
                .addClass(ce.COLLAPSING)
                .removeClass(ce.COLLAPSE)
                .removeClass(ce.SHOW);
              var r = this._triggerArray.length;
              if (r > 0) {
                for (var o = 0; o < r; o++) {
                  var s = this._triggerArray[o];
                  var a = v.getSelectorFromElement(s);
                  if (a !== null) {
                    var l = m([].slice.call(document.querySelectorAll(a)));
                    if (!l.hasClass(ce.SHOW)) {
                      m(s).addClass(ce.COLLAPSED).attr("aria-expanded", false);
                    }
                  }
                }
              }
              this.setTransitioning(true);
              var u = function e() {
                t.setTransitioning(false);
                m(t._element)
                  .removeClass(ce.COLLAPSING)
                  .addClass(ce.COLLAPSE)
                  .trigger(ue.HIDDEN);
              };
              this._element.style[i] = "";
              var c = v.getTransitionDurationFromElement(this._element);
              m(this._element).one(v.TRANSITION_END, u).emulateTransitionEnd(c);
            };
            e.setTransitioning = function e(t) {
              this._isTransitioning = t;
            };
            e.dispose = function e() {
              m.removeData(this._element, ie);
              this._config = null;
              this._parent = null;
              this._element = null;
              this._triggerArray = null;
              this._isTransitioning = null;
            };
            e._getConfig = function e(t) {
              t = a({}, ae, {}, t);
              t.toggle = Boolean(t.toggle);
              v.typeCheckConfig(te, t, le);
              return t;
            };
            e._getDimension = function e() {
              var t = m(this._element).hasClass(fe.WIDTH);
              return t ? fe.WIDTH : fe.HEIGHT;
            };
            e._getParent = function e() {
              var n = this;
              var t;
              if (v.isElement(this._config.parent)) {
                t = this._config.parent;
                if (typeof this._config.parent.jquery !== "undefined") {
                  t = this._config.parent[0];
                }
              } else {
                t = document.querySelector(this._config.parent);
              }
              var i =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]';
              var r = [].slice.call(t.querySelectorAll(i));
              m(r).each(function (e, t) {
                n._addAriaAndCollapsedClass(c._getTargetFromElement(t), [t]);
              });
              return t;
            };
            e._addAriaAndCollapsedClass = function e(t, n) {
              var i = m(t).hasClass(ce.SHOW);
              if (n.length) {
                m(n).toggleClass(ce.COLLAPSED, !i).attr("aria-expanded", i);
              }
            };
            c._getTargetFromElement = function e(t) {
              var n = v.getSelectorFromElement(t);
              return n ? document.querySelector(n) : null;
            };
            c._jQueryInterface = function e(i) {
              return this.each(function () {
                var e = m(this);
                var t = e.data(ie);
                var n = a(
                  {},
                  ae,
                  {},
                  e.data(),
                  {},
                  typeof i === "object" && i ? i : {}
                );
                if (!t && n.toggle && /show|hide/.test(i)) {
                  n.toggle = false;
                }
                if (!t) {
                  t = new c(this, n);
                  e.data(ie, t);
                }
                if (typeof i === "string") {
                  if (typeof t[i] === "undefined") {
                    throw new TypeError('No method named "' + i + '"');
                  }
                  t[i]();
                }
              });
            };
            o(c, null, [
              {
                key: "VERSION",
                get: function e() {
                  return ne;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return ae;
                },
              },
            ]);
            return c;
          })();
        m(document).on(ue.CLICK_DATA_API, de.DATA_TOGGLE, function (e) {
          if (e.currentTarget.tagName === "A") {
            e.preventDefault();
          }
          var i = m(this);
          var t = v.getSelectorFromElement(this);
          var n = [].slice.call(document.querySelectorAll(t));
          m(n).each(function () {
            var e = m(this);
            var t = e.data(ie);
            var n = t ? "toggle" : i.data();
            he._jQueryInterface.call(e, n);
          });
        }),
          (m.fn[te] = he._jQueryInterface),
          (m.fn[te].Constructor = he),
          (m.fn[te].noConflict = function () {
            m.fn[te] = se;
            return he._jQueryInterface;
          });
        var pe = "dropdown",
          ge = "4.4.1",
          me = "bs.dropdown",
          ve = "." + me,
          ye = ".data-api",
          _e = m.fn[pe],
          Ee = 27,
          Te = 32,
          be = 9,
          we = 38,
          Ce = 40,
          Se = 3,
          Ae = new RegExp(we + "|" + Ce + "|" + Ee),
          De = {
            HIDE: "hide" + ve,
            HIDDEN: "hidden" + ve,
            SHOW: "show" + ve,
            SHOWN: "shown" + ve,
            CLICK: "click" + ve,
            CLICK_DATA_API: "click" + ve + ye,
            KEYDOWN_DATA_API: "keydown" + ve + ye,
            KEYUP_DATA_API: "keyup" + ve + ye,
          },
          xe = {
            DISABLED: "disabled",
            SHOW: "show",
            DROPUP: "dropup",
            DROPRIGHT: "dropright",
            DROPLEFT: "dropleft",
            MENURIGHT: "dropdown-menu-right",
            MENULEFT: "dropdown-menu-left",
            POSITION_STATIC: "position-static",
          },
          Oe = {
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            MENU: ".dropdown-menu",
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS:
              ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
          },
          Ie = {
            TOP: "top-start",
            TOPEND: "top-end",
            BOTTOM: "bottom-start",
            BOTTOMEND: "bottom-end",
            RIGHT: "right-start",
            RIGHTEND: "right-end",
            LEFT: "left-start",
            LEFTEND: "left-end",
          },
          Ne = {
            offset: 0,
            flip: true,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
          },
          Le = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)",
          },
          ke = (function () {
            function c(e, t) {
              this._element = e;
              this._popper = null;
              this._config = this._getConfig(t);
              this._menu = this._getMenuElement();
              this._inNavbar = this._detectNavbar();
              this._addEventListeners();
            }
            var e = c.prototype;
            e.toggle = function e() {
              if (
                this._element.disabled ||
                m(this._element).hasClass(xe.DISABLED)
              ) {
                return;
              }
              var t = m(this._menu).hasClass(xe.SHOW);
              c._clearMenus();
              if (t) {
                return;
              }
              this.show(true);
            };
            e.show = function e(t) {
              if (t === void 0) {
                t = false;
              }
              if (
                this._element.disabled ||
                m(this._element).hasClass(xe.DISABLED) ||
                m(this._menu).hasClass(xe.SHOW)
              ) {
                return;
              }
              var n = { relatedTarget: this._element };
              var i = m.Event(De.SHOW, n);
              var r = c._getParentFromElement(this._element);
              m(r).trigger(i);
              if (i.isDefaultPrevented()) {
                return;
              }
              if (!this._inNavbar && t) {
                if (typeof d === "undefined") {
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                  );
                }
                var o = this._element;
                if (this._config.reference === "parent") {
                  o = r;
                } else if (v.isElement(this._config.reference)) {
                  o = this._config.reference;
                  if (typeof this._config.reference.jquery !== "undefined") {
                    o = this._config.reference[0];
                  }
                }
                if (this._config.boundary !== "scrollParent") {
                  m(r).addClass(xe.POSITION_STATIC);
                }
                this._popper = new d(o, this._menu, this._getPopperConfig());
              }
              if (
                "ontouchstart" in document.documentElement &&
                m(r).closest(Oe.NAVBAR_NAV).length === 0
              ) {
                m(document.body).children().on("mouseover", null, m.noop);
              }
              this._element.focus();
              this._element.setAttribute("aria-expanded", true);
              m(this._menu).toggleClass(xe.SHOW);
              m(r).toggleClass(xe.SHOW).trigger(m.Event(De.SHOWN, n));
            };
            e.hide = function e() {
              if (
                this._element.disabled ||
                m(this._element).hasClass(xe.DISABLED) ||
                !m(this._menu).hasClass(xe.SHOW)
              ) {
                return;
              }
              var t = { relatedTarget: this._element };
              var n = m.Event(De.HIDE, t);
              var i = c._getParentFromElement(this._element);
              m(i).trigger(n);
              if (n.isDefaultPrevented()) {
                return;
              }
              if (this._popper) {
                this._popper.destroy();
              }
              m(this._menu).toggleClass(xe.SHOW);
              m(i).toggleClass(xe.SHOW).trigger(m.Event(De.HIDDEN, t));
            };
            e.dispose = function e() {
              m.removeData(this._element, me);
              m(this._element).off(ve);
              this._element = null;
              this._menu = null;
              if (this._popper !== null) {
                this._popper.destroy();
                this._popper = null;
              }
            };
            e.update = function e() {
              this._inNavbar = this._detectNavbar();
              if (this._popper !== null) {
                this._popper.scheduleUpdate();
              }
            };
            e._addEventListeners = function e() {
              var t = this;
              m(this._element).on(De.CLICK, function (e) {
                e.preventDefault();
                e.stopPropagation();
                t.toggle();
              });
            };
            e._getConfig = function e(t) {
              t = a(
                {},
                this.constructor.Default,
                {},
                m(this._element).data(),
                {},
                t
              );
              v.typeCheckConfig(pe, t, this.constructor.DefaultType);
              return t;
            };
            e._getMenuElement = function e() {
              if (!this._menu) {
                var t = c._getParentFromElement(this._element);
                if (t) {
                  this._menu = t.querySelector(Oe.MENU);
                }
              }
              return this._menu;
            };
            e._getPlacement = function e() {
              var t = m(this._element.parentNode);
              var n = Ie.BOTTOM;
              if (t.hasClass(xe.DROPUP)) {
                n = Ie.TOP;
                if (m(this._menu).hasClass(xe.MENURIGHT)) {
                  n = Ie.TOPEND;
                }
              } else if (t.hasClass(xe.DROPRIGHT)) {
                n = Ie.RIGHT;
              } else if (t.hasClass(xe.DROPLEFT)) {
                n = Ie.LEFT;
              } else if (m(this._menu).hasClass(xe.MENURIGHT)) {
                n = Ie.BOTTOMEND;
              }
              return n;
            };
            e._detectNavbar = function e() {
              return m(this._element).closest(".navbar").length > 0;
            };
            e._getOffset = function e() {
              var t = this;
              var n = {};
              if (typeof this._config.offset === "function") {
                n.fn = function (e) {
                  e.offsets = a(
                    {},
                    e.offsets,
                    {},
                    t._config.offset(e.offsets, t._element) || {}
                  );
                  return e;
                };
              } else {
                n.offset = this._config.offset;
              }
              return n;
            };
            e._getPopperConfig = function e() {
              var t = {
                placement: this._getPlacement(),
                modifiers: {
                  offset: this._getOffset(),
                  flip: { enabled: this._config.flip },
                  preventOverflow: { boundariesElement: this._config.boundary },
                },
              };
              if (this._config.display === "static") {
                t.modifiers.applyStyle = { enabled: false };
              }
              return a({}, t, {}, this._config.popperConfig);
            };
            c._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this).data(me);
                var t = typeof n === "object" ? n : null;
                if (!e) {
                  e = new c(this, t);
                  m(this).data(me, e);
                }
                if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n]();
                }
              });
            };
            c._clearMenus = function e(t) {
              if (
                t &&
                (t.which === Se || (t.type === "keyup" && t.which !== be))
              ) {
                return;
              }
              var n = [].slice.call(document.querySelectorAll(Oe.DATA_TOGGLE));
              for (var i = 0, r = n.length; i < r; i++) {
                var o = c._getParentFromElement(n[i]);
                var s = m(n[i]).data(me);
                var a = { relatedTarget: n[i] };
                if (t && t.type === "click") {
                  a.clickEvent = t;
                }
                if (!s) {
                  continue;
                }
                var l = s._menu;
                if (!m(o).hasClass(xe.SHOW)) {
                  continue;
                }
                if (
                  t &&
                  ((t.type === "click" &&
                    /input|textarea/i.test(t.target.tagName)) ||
                    (t.type === "keyup" && t.which === be)) &&
                  m.contains(o, t.target)
                ) {
                  continue;
                }
                var u = m.Event(De.HIDE, a);
                m(o).trigger(u);
                if (u.isDefaultPrevented()) {
                  continue;
                }
                if ("ontouchstart" in document.documentElement) {
                  m(document.body).children().off("mouseover", null, m.noop);
                }
                n[i].setAttribute("aria-expanded", "false");
                if (s._popper) {
                  s._popper.destroy();
                }
                m(l).removeClass(xe.SHOW);
                m(o).removeClass(xe.SHOW).trigger(m.Event(De.HIDDEN, a));
              }
            };
            c._getParentFromElement = function e(t) {
              var n;
              var i = v.getSelectorFromElement(t);
              if (i) {
                n = document.querySelector(i);
              }
              return n || t.parentNode;
            };
            c._dataApiKeydownHandler = function e(t) {
              if (
                /input|textarea/i.test(t.target.tagName)
                  ? t.which === Te ||
                    (t.which !== Ee &&
                      ((t.which !== Ce && t.which !== we) ||
                        m(t.target).closest(Oe.MENU).length))
                  : !Ae.test(t.which)
              ) {
                return;
              }
              t.preventDefault();
              t.stopPropagation();
              if (this.disabled || m(this).hasClass(xe.DISABLED)) {
                return;
              }
              var n = c._getParentFromElement(this);
              var i = m(n).hasClass(xe.SHOW);
              if (!i && t.which === Ee) {
                return;
              }
              if (!i || (i && (t.which === Ee || t.which === Te))) {
                if (t.which === Ee) {
                  var r = n.querySelector(Oe.DATA_TOGGLE);
                  m(r).trigger("focus");
                }
                m(this).trigger("click");
                return;
              }
              var o = [].slice
                .call(n.querySelectorAll(Oe.VISIBLE_ITEMS))
                .filter(function (e) {
                  return m(e).is(":visible");
                });
              if (o.length === 0) {
                return;
              }
              var s = o.indexOf(t.target);
              if (t.which === we && s > 0) {
                s--;
              }
              if (t.which === Ce && s < o.length - 1) {
                s++;
              }
              if (s < 0) {
                s = 0;
              }
              o[s].focus();
            };
            o(c, null, [
              {
                key: "VERSION",
                get: function e() {
                  return ge;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return Ne;
                },
              },
              {
                key: "DefaultType",
                get: function e() {
                  return Le;
                },
              },
            ]);
            return c;
          })();
        m(document)
          .on(De.KEYDOWN_DATA_API, Oe.DATA_TOGGLE, ke._dataApiKeydownHandler)
          .on(De.KEYDOWN_DATA_API, Oe.MENU, ke._dataApiKeydownHandler)
          .on(De.CLICK_DATA_API + " " + De.KEYUP_DATA_API, ke._clearMenus)
          .on(De.CLICK_DATA_API, Oe.DATA_TOGGLE, function (e) {
            e.preventDefault();
            e.stopPropagation();
            ke._jQueryInterface.call(m(this), "toggle");
          })
          .on(De.CLICK_DATA_API, Oe.FORM_CHILD, function (e) {
            e.stopPropagation();
          }),
          (m.fn[pe] = ke._jQueryInterface),
          (m.fn[pe].Constructor = ke),
          (m.fn[pe].noConflict = function () {
            m.fn[pe] = _e;
            return ke._jQueryInterface;
          });
        var Pe = "modal",
          He = "4.4.1",
          je = "bs.modal",
          Re = "." + je,
          Me = ".data-api",
          We = m.fn[Pe],
          Fe = 27,
          Ve = { backdrop: true, keyboard: true, focus: true, show: true },
          qe = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean",
          },
          Ue = {
            HIDE: "hide" + Re,
            HIDE_PREVENTED: "hidePrevented" + Re,
            HIDDEN: "hidden" + Re,
            SHOW: "show" + Re,
            SHOWN: "shown" + Re,
            FOCUSIN: "focusin" + Re,
            RESIZE: "resize" + Re,
            CLICK_DISMISS: "click.dismiss" + Re,
            KEYDOWN_DISMISS: "keydown.dismiss" + Re,
            MOUSEUP_DISMISS: "mouseup.dismiss" + Re,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + Re,
            CLICK_DATA_API: "click" + Re + Me,
          },
          Be = {
            SCROLLABLE: "modal-dialog-scrollable",
            SCROLLBAR_MEASURER: "modal-scrollbar-measure",
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            SHOW: "show",
            STATIC: "modal-static",
          },
          Ge = {
            DIALOG: ".modal-dialog",
            MODAL_BODY: ".modal-body",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            STICKY_CONTENT: ".sticky-top",
          },
          Ke = (function () {
            function r(e, t) {
              this._config = this._getConfig(t);
              this._element = e;
              this._dialog = e.querySelector(Ge.DIALOG);
              this._backdrop = null;
              this._isShown = false;
              this._isBodyOverflowing = false;
              this._ignoreBackdropClick = false;
              this._isTransitioning = false;
              this._scrollbarWidth = 0;
            }
            var e = r.prototype;
            e.toggle = function e(t) {
              return this._isShown ? this.hide() : this.show(t);
            };
            e.show = function e(t) {
              var n = this;
              if (this._isShown || this._isTransitioning) {
                return;
              }
              if (m(this._element).hasClass(Be.FADE)) {
                this._isTransitioning = true;
              }
              var i = m.Event(Ue.SHOW, { relatedTarget: t });
              m(this._element).trigger(i);
              if (this._isShown || i.isDefaultPrevented()) {
                return;
              }
              this._isShown = true;
              this._checkScrollbar();
              this._setScrollbar();
              this._adjustDialog();
              this._setEscapeEvent();
              this._setResizeEvent();
              m(this._element).on(Ue.CLICK_DISMISS, Ge.DATA_DISMISS, function (
                e
              ) {
                return n.hide(e);
              });
              m(this._dialog).on(Ue.MOUSEDOWN_DISMISS, function () {
                m(n._element).one(Ue.MOUSEUP_DISMISS, function (e) {
                  if (m(e.target).is(n._element)) {
                    n._ignoreBackdropClick = true;
                  }
                });
              });
              this._showBackdrop(function () {
                return n._showElement(t);
              });
            };
            e.hide = function e(t) {
              var n = this;
              if (t) {
                t.preventDefault();
              }
              if (!this._isShown || this._isTransitioning) {
                return;
              }
              var i = m.Event(Ue.HIDE);
              m(this._element).trigger(i);
              if (!this._isShown || i.isDefaultPrevented()) {
                return;
              }
              this._isShown = false;
              var r = m(this._element).hasClass(Be.FADE);
              if (r) {
                this._isTransitioning = true;
              }
              this._setEscapeEvent();
              this._setResizeEvent();
              m(document).off(Ue.FOCUSIN);
              m(this._element).removeClass(Be.SHOW);
              m(this._element).off(Ue.CLICK_DISMISS);
              m(this._dialog).off(Ue.MOUSEDOWN_DISMISS);
              if (r) {
                var o = v.getTransitionDurationFromElement(this._element);
                m(this._element)
                  .one(v.TRANSITION_END, function (e) {
                    return n._hideModal(e);
                  })
                  .emulateTransitionEnd(o);
              } else {
                this._hideModal();
              }
            };
            e.dispose = function e() {
              [window, this._element, this._dialog].forEach(function (e) {
                return m(e).off(Re);
              });
              m(document).off(Ue.FOCUSIN);
              m.removeData(this._element, je);
              this._config = null;
              this._element = null;
              this._dialog = null;
              this._backdrop = null;
              this._isShown = null;
              this._isBodyOverflowing = null;
              this._ignoreBackdropClick = null;
              this._isTransitioning = null;
              this._scrollbarWidth = null;
            };
            e.handleUpdate = function e() {
              this._adjustDialog();
            };
            e._getConfig = function e(t) {
              t = a({}, Ve, {}, t);
              v.typeCheckConfig(Pe, t, qe);
              return t;
            };
            e._triggerBackdropTransition = function e() {
              var t = this;
              if (this._config.backdrop === "static") {
                var n = m.Event(Ue.HIDE_PREVENTED);
                m(this._element).trigger(n);
                if (n.defaultPrevented) {
                  return;
                }
                this._element.classList.add(Be.STATIC);
                var i = v.getTransitionDurationFromElement(this._element);
                m(this._element)
                  .one(v.TRANSITION_END, function () {
                    t._element.classList.remove(Be.STATIC);
                  })
                  .emulateTransitionEnd(i);
                this._element.focus();
              } else {
                this.hide();
              }
            };
            e._showElement = function e(t) {
              var n = this;
              var i = m(this._element).hasClass(Be.FADE);
              var r = this._dialog
                ? this._dialog.querySelector(Ge.MODAL_BODY)
                : null;
              if (
                !this._element.parentNode ||
                this._element.parentNode.nodeType !== Node.ELEMENT_NODE
              ) {
                document.body.appendChild(this._element);
              }
              this._element.style.display = "block";
              this._element.removeAttribute("aria-hidden");
              this._element.setAttribute("aria-modal", true);
              if (m(this._dialog).hasClass(Be.SCROLLABLE) && r) {
                r.scrollTop = 0;
              } else {
                this._element.scrollTop = 0;
              }
              if (i) {
                v.reflow(this._element);
              }
              m(this._element).addClass(Be.SHOW);
              if (this._config.focus) {
                this._enforceFocus();
              }
              var o = m.Event(Ue.SHOWN, { relatedTarget: t });
              var s = function e() {
                if (n._config.focus) {
                  n._element.focus();
                }
                n._isTransitioning = false;
                m(n._element).trigger(o);
              };
              if (i) {
                var a = v.getTransitionDurationFromElement(this._dialog);
                m(this._dialog)
                  .one(v.TRANSITION_END, s)
                  .emulateTransitionEnd(a);
              } else {
                s();
              }
            };
            e._enforceFocus = function e() {
              var t = this;
              m(document)
                .off(Ue.FOCUSIN)
                .on(Ue.FOCUSIN, function (e) {
                  if (
                    document !== e.target &&
                    t._element !== e.target &&
                    m(t._element).has(e.target).length === 0
                  ) {
                    t._element.focus();
                  }
                });
            };
            e._setEscapeEvent = function e() {
              var t = this;
              if (this._isShown && this._config.keyboard) {
                m(this._element).on(Ue.KEYDOWN_DISMISS, function (e) {
                  if (e.which === Fe) {
                    t._triggerBackdropTransition();
                  }
                });
              } else if (!this._isShown) {
                m(this._element).off(Ue.KEYDOWN_DISMISS);
              }
            };
            e._setResizeEvent = function e() {
              var t = this;
              if (this._isShown) {
                m(window).on(Ue.RESIZE, function (e) {
                  return t.handleUpdate(e);
                });
              } else {
                m(window).off(Ue.RESIZE);
              }
            };
            e._hideModal = function e() {
              var t = this;
              this._element.style.display = "none";
              this._element.setAttribute("aria-hidden", true);
              this._element.removeAttribute("aria-modal");
              this._isTransitioning = false;
              this._showBackdrop(function () {
                m(document.body).removeClass(Be.OPEN);
                t._resetAdjustments();
                t._resetScrollbar();
                m(t._element).trigger(Ue.HIDDEN);
              });
            };
            e._removeBackdrop = function e() {
              if (this._backdrop) {
                m(this._backdrop).remove();
                this._backdrop = null;
              }
            };
            e._showBackdrop = function e(t) {
              var n = this;
              var i = m(this._element).hasClass(Be.FADE) ? Be.FADE : "";
              if (this._isShown && this._config.backdrop) {
                this._backdrop = document.createElement("div");
                this._backdrop.className = Be.BACKDROP;
                if (i) {
                  this._backdrop.classList.add(i);
                }
                m(this._backdrop).appendTo(document.body);
                m(this._element).on(Ue.CLICK_DISMISS, function (e) {
                  if (n._ignoreBackdropClick) {
                    n._ignoreBackdropClick = false;
                    return;
                  }
                  if (e.target !== e.currentTarget) {
                    return;
                  }
                  n._triggerBackdropTransition();
                });
                if (i) {
                  v.reflow(this._backdrop);
                }
                m(this._backdrop).addClass(Be.SHOW);
                if (!t) {
                  return;
                }
                if (!i) {
                  t();
                  return;
                }
                var r = v.getTransitionDurationFromElement(this._backdrop);
                m(this._backdrop)
                  .one(v.TRANSITION_END, t)
                  .emulateTransitionEnd(r);
              } else if (!this._isShown && this._backdrop) {
                m(this._backdrop).removeClass(Be.SHOW);
                var o = function e() {
                  n._removeBackdrop();
                  if (t) {
                    t();
                  }
                };
                if (m(this._element).hasClass(Be.FADE)) {
                  var s = v.getTransitionDurationFromElement(this._backdrop);
                  m(this._backdrop)
                    .one(v.TRANSITION_END, o)
                    .emulateTransitionEnd(s);
                } else {
                  o();
                }
              } else if (t) {
                t();
              }
            };
            e._adjustDialog = function e() {
              var t =
                this._element.scrollHeight >
                document.documentElement.clientHeight;
              if (!this._isBodyOverflowing && t) {
                this._element.style.paddingLeft = this._scrollbarWidth + "px";
              }
              if (this._isBodyOverflowing && !t) {
                this._element.style.paddingRight = this._scrollbarWidth + "px";
              }
            };
            e._resetAdjustments = function e() {
              this._element.style.paddingLeft = "";
              this._element.style.paddingRight = "";
            };
            e._checkScrollbar = function e() {
              var t = document.body.getBoundingClientRect();
              this._isBodyOverflowing = t.left + t.right < window.innerWidth;
              this._scrollbarWidth = this._getScrollbarWidth();
            };
            e._setScrollbar = function e() {
              var r = this;
              if (this._isBodyOverflowing) {
                var t = [].slice.call(
                  document.querySelectorAll(Ge.FIXED_CONTENT)
                );
                var n = [].slice.call(
                  document.querySelectorAll(Ge.STICKY_CONTENT)
                );
                m(t).each(function (e, t) {
                  var n = t.style.paddingRight;
                  var i = m(t).css("padding-right");
                  m(t)
                    .data("padding-right", n)
                    .css(
                      "padding-right",
                      parseFloat(i) + r._scrollbarWidth + "px"
                    );
                });
                m(n).each(function (e, t) {
                  var n = t.style.marginRight;
                  var i = m(t).css("margin-right");
                  m(t)
                    .data("margin-right", n)
                    .css(
                      "margin-right",
                      parseFloat(i) - r._scrollbarWidth + "px"
                    );
                });
                var i = document.body.style.paddingRight;
                var o = m(document.body).css("padding-right");
                m(document.body)
                  .data("padding-right", i)
                  .css(
                    "padding-right",
                    parseFloat(o) + this._scrollbarWidth + "px"
                  );
              }
              m(document.body).addClass(Be.OPEN);
            };
            e._resetScrollbar = function e() {
              var t = [].slice.call(
                document.querySelectorAll(Ge.FIXED_CONTENT)
              );
              m(t).each(function (e, t) {
                var n = m(t).data("padding-right");
                m(t).removeData("padding-right");
                t.style.paddingRight = n ? n : "";
              });
              var n = [].slice.call(
                document.querySelectorAll("" + Ge.STICKY_CONTENT)
              );
              m(n).each(function (e, t) {
                var n = m(t).data("margin-right");
                if (typeof n !== "undefined") {
                  m(t).css("margin-right", n).removeData("margin-right");
                }
              });
              var i = m(document.body).data("padding-right");
              m(document.body).removeData("padding-right");
              document.body.style.paddingRight = i ? i : "";
            };
            e._getScrollbarWidth = function e() {
              var t = document.createElement("div");
              t.className = Be.SCROLLBAR_MEASURER;
              document.body.appendChild(t);
              var n = t.getBoundingClientRect().width - t.clientWidth;
              document.body.removeChild(t);
              return n;
            };
            r._jQueryInterface = function e(n, i) {
              return this.each(function () {
                var e = m(this).data(je);
                var t = a(
                  {},
                  Ve,
                  {},
                  m(this).data(),
                  {},
                  typeof n === "object" && n ? n : {}
                );
                if (!e) {
                  e = new r(this, t);
                  m(this).data(je, e);
                }
                if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n](i);
                } else if (t.show) {
                  e.show(i);
                }
              });
            };
            o(r, null, [
              {
                key: "VERSION",
                get: function e() {
                  return He;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return Ve;
                },
              },
            ]);
            return r;
          })();
        m(document).on(Ue.CLICK_DATA_API, Ge.DATA_TOGGLE, function (e) {
          var t = this;
          var n;
          var i = v.getSelectorFromElement(this);
          if (i) {
            n = document.querySelector(i);
          }
          var r = m(n).data(je)
            ? "toggle"
            : a({}, m(n).data(), {}, m(this).data());
          if (this.tagName === "A" || this.tagName === "AREA") {
            e.preventDefault();
          }
          var o = m(n).one(Ue.SHOW, function (e) {
            if (e.isDefaultPrevented()) {
              return;
            }
            o.one(Ue.HIDDEN, function () {
              if (m(t).is(":visible")) {
                t.focus();
              }
            });
          });
          Ke._jQueryInterface.call(m(n), r, this);
        }),
          (m.fn[Pe] = Ke._jQueryInterface),
          (m.fn[Pe].Constructor = Ke),
          (m.fn[Pe].noConflict = function () {
            m.fn[Pe] = We;
            return Ke._jQueryInterface;
          });
        var Qe = [
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
          ],
          $e,
          Xe = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
          },
          Ye = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
          ze = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
        function Je(e, t) {
          var n = e.nodeName.toLowerCase();
          if (t.indexOf(n) !== -1) {
            if (Qe.indexOf(n) !== -1) {
              return Boolean(e.nodeValue.match(Ye) || e.nodeValue.match(ze));
            }
            return true;
          }
          var i = t.filter(function (e) {
            return e instanceof RegExp;
          });
          for (var r = 0, o = i.length; r < o; r++) {
            if (n.match(i[r])) {
              return true;
            }
          }
          return false;
        }
        function Ze(e, a, t) {
          if (e.length === 0) {
            return e;
          }
          if (t && typeof t === "function") {
            return t(e);
          }
          var n = new window.DOMParser();
          var i = n.parseFromString(e, "text/html");
          var l = Object.keys(a);
          var u = [].slice.call(i.body.querySelectorAll("*"));
          var r = function e(t, n) {
            var i = u[t];
            var r = i.nodeName.toLowerCase();
            if (l.indexOf(i.nodeName.toLowerCase()) === -1) {
              i.parentNode.removeChild(i);
              return "continue";
            }
            var o = [].slice.call(i.attributes);
            var s = [].concat(a["*"] || [], a[r] || []);
            o.forEach(function (e) {
              if (!Je(e, s)) {
                i.removeAttribute(e.nodeName);
              }
            });
          };
          for (var o = 0, s = u.length; o < s; o++) {
            var c = r(o);
            if (c === "continue") continue;
          }
          return i.body.innerHTML;
        }
        var et = "tooltip",
          tt = "4.4.1",
          nt = "bs.tooltip",
          it = "." + nt,
          rt = m.fn[et],
          ot = "bs-tooltip",
          st = new RegExp("(^|\\s)" + ot + "\\S+", "g"),
          at = ["sanitize", "whiteList", "sanitizeFn"],
          lt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)",
          },
          ut = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left",
          },
          ct = {
            animation: true,
            template:
              '<div class="tooltip" role="tooltip">' +
              '<div class="arrow"></div>' +
              '<div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: false,
            selector: false,
            placement: "top",
            offset: 0,
            container: false,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: true,
            sanitizeFn: null,
            whiteList: Xe,
            popperConfig: null,
          },
          ft = { SHOW: "show", OUT: "out" },
          dt = {
            HIDE: "hide" + it,
            HIDDEN: "hidden" + it,
            SHOW: "show" + it,
            SHOWN: "shown" + it,
            INSERTED: "inserted" + it,
            CLICK: "click" + it,
            FOCUSIN: "focusin" + it,
            FOCUSOUT: "focusout" + it,
            MOUSEENTER: "mouseenter" + it,
            MOUSELEAVE: "mouseleave" + it,
          },
          ht = { FADE: "fade", SHOW: "show" },
          pt = {
            TOOLTIP: ".tooltip",
            TOOLTIP_INNER: ".tooltip-inner",
            ARROW: ".arrow",
          },
          gt = {
            HOVER: "hover",
            FOCUS: "focus",
            CLICK: "click",
            MANUAL: "manual",
          },
          mt = (function () {
            function i(e, t) {
              if (typeof d === "undefined") {
                throw new TypeError(
                  "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
                );
              }
              this._isEnabled = true;
              this._timeout = 0;
              this._hoverState = "";
              this._activeTrigger = {};
              this._popper = null;
              this.element = e;
              this.config = this._getConfig(t);
              this.tip = null;
              this._setListeners();
            }
            var e = i.prototype;
            e.enable = function e() {
              this._isEnabled = true;
            };
            e.disable = function e() {
              this._isEnabled = false;
            };
            e.toggleEnabled = function e() {
              this._isEnabled = !this._isEnabled;
            };
            e.toggle = function e(t) {
              if (!this._isEnabled) {
                return;
              }
              if (t) {
                var n = this.constructor.DATA_KEY;
                var i = m(t.currentTarget).data(n);
                if (!i) {
                  i = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  );
                  m(t.currentTarget).data(n, i);
                }
                i._activeTrigger.click = !i._activeTrigger.click;
                if (i._isWithActiveTrigger()) {
                  i._enter(null, i);
                } else {
                  i._leave(null, i);
                }
              } else {
                if (m(this.getTipElement()).hasClass(ht.SHOW)) {
                  this._leave(null, this);
                  return;
                }
                this._enter(null, this);
              }
            };
            e.dispose = function e() {
              clearTimeout(this._timeout);
              m.removeData(this.element, this.constructor.DATA_KEY);
              m(this.element).off(this.constructor.EVENT_KEY);
              m(this.element)
                .closest(".modal")
                .off("hide.bs.modal", this._hideModalHandler);
              if (this.tip) {
                m(this.tip).remove();
              }
              this._isEnabled = null;
              this._timeout = null;
              this._hoverState = null;
              this._activeTrigger = null;
              if (this._popper) {
                this._popper.destroy();
              }
              this._popper = null;
              this.element = null;
              this.config = null;
              this.tip = null;
            };
            e.show = function e() {
              var n = this;
              if (m(this.element).css("display") === "none") {
                throw new Error("Please use show on visible elements");
              }
              var t = m.Event(this.constructor.Event.SHOW);
              if (this.isWithContent() && this._isEnabled) {
                m(this.element).trigger(t);
                var i = v.findShadowRoot(this.element);
                var r = m.contains(
                  i !== null ? i : this.element.ownerDocument.documentElement,
                  this.element
                );
                if (t.isDefaultPrevented() || !r) {
                  return;
                }
                var o = this.getTipElement();
                var s = v.getUID(this.constructor.NAME);
                o.setAttribute("id", s);
                this.element.setAttribute("aria-describedby", s);
                this.setContent();
                if (this.config.animation) {
                  m(o).addClass(ht.FADE);
                }
                var a =
                  typeof this.config.placement === "function"
                    ? this.config.placement.call(this, o, this.element)
                    : this.config.placement;
                var l = this._getAttachment(a);
                this.addAttachmentClass(l);
                var u = this._getContainer();
                m(o).data(this.constructor.DATA_KEY, this);
                if (
                  !m.contains(
                    this.element.ownerDocument.documentElement,
                    this.tip
                  )
                ) {
                  m(o).appendTo(u);
                }
                m(this.element).trigger(this.constructor.Event.INSERTED);
                this._popper = new d(this.element, o, this._getPopperConfig(l));
                m(o).addClass(ht.SHOW);
                if ("ontouchstart" in document.documentElement) {
                  m(document.body).children().on("mouseover", null, m.noop);
                }
                var c = function e() {
                  if (n.config.animation) {
                    n._fixTransition();
                  }
                  var t = n._hoverState;
                  n._hoverState = null;
                  m(n.element).trigger(n.constructor.Event.SHOWN);
                  if (t === ft.OUT) {
                    n._leave(null, n);
                  }
                };
                if (m(this.tip).hasClass(ht.FADE)) {
                  var f = v.getTransitionDurationFromElement(this.tip);
                  m(this.tip).one(v.TRANSITION_END, c).emulateTransitionEnd(f);
                } else {
                  c();
                }
              }
            };
            e.hide = function e(t) {
              var n = this;
              var i = this.getTipElement();
              var r = m.Event(this.constructor.Event.HIDE);
              var o = function e() {
                if (n._hoverState !== ft.SHOW && i.parentNode) {
                  i.parentNode.removeChild(i);
                }
                n._cleanTipClass();
                n.element.removeAttribute("aria-describedby");
                m(n.element).trigger(n.constructor.Event.HIDDEN);
                if (n._popper !== null) {
                  n._popper.destroy();
                }
                if (t) {
                  t();
                }
              };
              m(this.element).trigger(r);
              if (r.isDefaultPrevented()) {
                return;
              }
              m(i).removeClass(ht.SHOW);
              if ("ontouchstart" in document.documentElement) {
                m(document.body).children().off("mouseover", null, m.noop);
              }
              this._activeTrigger[gt.CLICK] = false;
              this._activeTrigger[gt.FOCUS] = false;
              this._activeTrigger[gt.HOVER] = false;
              if (m(this.tip).hasClass(ht.FADE)) {
                var s = v.getTransitionDurationFromElement(i);
                m(i).one(v.TRANSITION_END, o).emulateTransitionEnd(s);
              } else {
                o();
              }
              this._hoverState = "";
            };
            e.update = function e() {
              if (this._popper !== null) {
                this._popper.scheduleUpdate();
              }
            };
            e.isWithContent = function e() {
              return Boolean(this.getTitle());
            };
            e.addAttachmentClass = function e(t) {
              m(this.getTipElement()).addClass(ot + "-" + t);
            };
            e.getTipElement = function e() {
              this.tip = this.tip || m(this.config.template)[0];
              return this.tip;
            };
            e.setContent = function e() {
              var t = this.getTipElement();
              this.setElementContent(
                m(t.querySelectorAll(pt.TOOLTIP_INNER)),
                this.getTitle()
              );
              m(t).removeClass(ht.FADE + " " + ht.SHOW);
            };
            e.setElementContent = function e(t, n) {
              if (typeof n === "object" && (n.nodeType || n.jquery)) {
                if (this.config.html) {
                  if (!m(n).parent().is(t)) {
                    t.empty().append(n);
                  }
                } else {
                  t.text(m(n).text());
                }
                return;
              }
              if (this.config.html) {
                if (this.config.sanitize) {
                  n = Ze(n, this.config.whiteList, this.config.sanitizeFn);
                }
                t.html(n);
              } else {
                t.text(n);
              }
            };
            e.getTitle = function e() {
              var t = this.element.getAttribute("data-original-title");
              if (!t) {
                t =
                  typeof this.config.title === "function"
                    ? this.config.title.call(this.element)
                    : this.config.title;
              }
              return t;
            };
            e._getPopperConfig = function e(t) {
              var n = this;
              var i = {
                placement: t,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: pt.ARROW },
                  preventOverflow: { boundariesElement: this.config.boundary },
                },
                onCreate: function e(t) {
                  if (t.originalPlacement !== t.placement) {
                    n._handlePopperPlacementChange(t);
                  }
                },
                onUpdate: function e(t) {
                  return n._handlePopperPlacementChange(t);
                },
              };
              return a({}, i, {}, this.config.popperConfig);
            };
            e._getOffset = function e() {
              var t = this;
              var n = {};
              if (typeof this.config.offset === "function") {
                n.fn = function (e) {
                  e.offsets = a(
                    {},
                    e.offsets,
                    {},
                    t.config.offset(e.offsets, t.element) || {}
                  );
                  return e;
                };
              } else {
                n.offset = this.config.offset;
              }
              return n;
            };
            e._getContainer = function e() {
              if (this.config.container === false) {
                return document.body;
              }
              if (v.isElement(this.config.container)) {
                return m(this.config.container);
              }
              return m(document).find(this.config.container);
            };
            e._getAttachment = function e(t) {
              return ut[t.toUpperCase()];
            };
            e._setListeners = function e() {
              var i = this;
              var t = this.config.trigger.split(" ");
              t.forEach(function (e) {
                if (e === "click") {
                  m(i.element).on(
                    i.constructor.Event.CLICK,
                    i.config.selector,
                    function (e) {
                      return i.toggle(e);
                    }
                  );
                } else if (e !== gt.MANUAL) {
                  var t =
                    e === gt.HOVER
                      ? i.constructor.Event.MOUSEENTER
                      : i.constructor.Event.FOCUSIN;
                  var n =
                    e === gt.HOVER
                      ? i.constructor.Event.MOUSELEAVE
                      : i.constructor.Event.FOCUSOUT;
                  m(i.element)
                    .on(t, i.config.selector, function (e) {
                      return i._enter(e);
                    })
                    .on(n, i.config.selector, function (e) {
                      return i._leave(e);
                    });
                }
              });
              this._hideModalHandler = function () {
                if (i.element) {
                  i.hide();
                }
              };
              m(this.element)
                .closest(".modal")
                .on("hide.bs.modal", this._hideModalHandler);
              if (this.config.selector) {
                this.config = a({}, this.config, {
                  trigger: "manual",
                  selector: "",
                });
              } else {
                this._fixTitle();
              }
            };
            e._fixTitle = function e() {
              var t = typeof this.element.getAttribute("data-original-title");
              if (this.element.getAttribute("title") || t !== "string") {
                this.element.setAttribute(
                  "data-original-title",
                  this.element.getAttribute("title") || ""
                );
                this.element.setAttribute("title", "");
              }
            };
            e._enter = function e(t, n) {
              var i = this.constructor.DATA_KEY;
              n = n || m(t.currentTarget).data(i);
              if (!n) {
                n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                );
                m(t.currentTarget).data(i, n);
              }
              if (t) {
                n._activeTrigger[
                  t.type === "focusin" ? gt.FOCUS : gt.HOVER
                ] = true;
              }
              if (
                m(n.getTipElement()).hasClass(ht.SHOW) ||
                n._hoverState === ft.SHOW
              ) {
                n._hoverState = ft.SHOW;
                return;
              }
              clearTimeout(n._timeout);
              n._hoverState = ft.SHOW;
              if (!n.config.delay || !n.config.delay.show) {
                n.show();
                return;
              }
              n._timeout = setTimeout(function () {
                if (n._hoverState === ft.SHOW) {
                  n.show();
                }
              }, n.config.delay.show);
            };
            e._leave = function e(t, n) {
              var i = this.constructor.DATA_KEY;
              n = n || m(t.currentTarget).data(i);
              if (!n) {
                n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                );
                m(t.currentTarget).data(i, n);
              }
              if (t) {
                n._activeTrigger[
                  t.type === "focusout" ? gt.FOCUS : gt.HOVER
                ] = false;
              }
              if (n._isWithActiveTrigger()) {
                return;
              }
              clearTimeout(n._timeout);
              n._hoverState = ft.OUT;
              if (!n.config.delay || !n.config.delay.hide) {
                n.hide();
                return;
              }
              n._timeout = setTimeout(function () {
                if (n._hoverState === ft.OUT) {
                  n.hide();
                }
              }, n.config.delay.hide);
            };
            e._isWithActiveTrigger = function e() {
              for (var t in this._activeTrigger) {
                if (this._activeTrigger[t]) {
                  return true;
                }
              }
              return false;
            };
            e._getConfig = function e(t) {
              var n = m(this.element).data();
              Object.keys(n).forEach(function (e) {
                if (at.indexOf(e) !== -1) {
                  delete n[e];
                }
              });
              t = a(
                {},
                this.constructor.Default,
                {},
                n,
                {},
                typeof t === "object" && t ? t : {}
              );
              if (typeof t.delay === "number") {
                t.delay = { show: t.delay, hide: t.delay };
              }
              if (typeof t.title === "number") {
                t.title = t.title.toString();
              }
              if (typeof t.content === "number") {
                t.content = t.content.toString();
              }
              v.typeCheckConfig(et, t, this.constructor.DefaultType);
              if (t.sanitize) {
                t.template = Ze(t.template, t.whiteList, t.sanitizeFn);
              }
              return t;
            };
            e._getDelegateConfig = function e() {
              var t = {};
              if (this.config) {
                for (var n in this.config) {
                  if (this.constructor.Default[n] !== this.config[n]) {
                    t[n] = this.config[n];
                  }
                }
              }
              return t;
            };
            e._cleanTipClass = function e() {
              var t = m(this.getTipElement());
              var n = t.attr("class").match(st);
              if (n !== null && n.length) {
                t.removeClass(n.join(""));
              }
            };
            e._handlePopperPlacementChange = function e(t) {
              var n = t.instance;
              this.tip = n.popper;
              this._cleanTipClass();
              this.addAttachmentClass(this._getAttachment(t.placement));
            };
            e._fixTransition = function e() {
              var t = this.getTipElement();
              var n = this.config.animation;
              if (t.getAttribute("x-placement") !== null) {
                return;
              }
              m(t).removeClass(ht.FADE);
              this.config.animation = false;
              this.hide();
              this.show();
              this.config.animation = n;
            };
            i._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this).data(nt);
                var t = typeof n === "object" && n;
                if (!e && /dispose|hide/.test(n)) {
                  return;
                }
                if (!e) {
                  e = new i(this, t);
                  m(this).data(nt, e);
                }
                if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n]();
                }
              });
            };
            o(i, null, [
              {
                key: "VERSION",
                get: function e() {
                  return tt;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return ct;
                },
              },
              {
                key: "NAME",
                get: function e() {
                  return et;
                },
              },
              {
                key: "DATA_KEY",
                get: function e() {
                  return nt;
                },
              },
              {
                key: "Event",
                get: function e() {
                  return dt;
                },
              },
              {
                key: "EVENT_KEY",
                get: function e() {
                  return it;
                },
              },
              {
                key: "DefaultType",
                get: function e() {
                  return lt;
                },
              },
            ]);
            return i;
          })();
        (m.fn[et] = mt._jQueryInterface),
          (m.fn[et].Constructor = mt),
          (m.fn[et].noConflict = function () {
            m.fn[et] = rt;
            return mt._jQueryInterface;
          });
        var vt = "popover",
          yt = "4.4.1",
          _t = "bs.popover",
          Et = "." + _t,
          Tt = m.fn[vt],
          bt = "bs-popover",
          wt = new RegExp("(^|\\s)" + bt + "\\S+", "g"),
          Ct = a({}, mt.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template:
              '<div class="popover" role="tooltip">' +
              '<div class="arrow"></div>' +
              '<h3 class="popover-header"></h3>' +
              '<div class="popover-body"></div></div>',
          }),
          St = a({}, mt.DefaultType, { content: "(string|element|function)" }),
          At = { FADE: "fade", SHOW: "show" },
          Dt = { TITLE: ".popover-header", CONTENT: ".popover-body" },
          xt = {
            HIDE: "hide" + Et,
            HIDDEN: "hidden" + Et,
            SHOW: "show" + Et,
            SHOWN: "shown" + Et,
            INSERTED: "inserted" + Et,
            CLICK: "click" + Et,
            FOCUSIN: "focusin" + Et,
            FOCUSOUT: "focusout" + Et,
            MOUSEENTER: "mouseenter" + Et,
            MOUSELEAVE: "mouseleave" + Et,
          },
          Ot = (function (e) {
            n(i, e);
            function i() {
              return e.apply(this, arguments) || this;
            }
            var t = i.prototype;
            t.isWithContent = function e() {
              return this.getTitle() || this._getContent();
            };
            t.addAttachmentClass = function e(t) {
              m(this.getTipElement()).addClass(bt + "-" + t);
            };
            t.getTipElement = function e() {
              this.tip = this.tip || m(this.config.template)[0];
              return this.tip;
            };
            t.setContent = function e() {
              var t = m(this.getTipElement());
              this.setElementContent(t.find(Dt.TITLE), this.getTitle());
              var n = this._getContent();
              if (typeof n === "function") {
                n = n.call(this.element);
              }
              this.setElementContent(t.find(Dt.CONTENT), n);
              t.removeClass(At.FADE + " " + At.SHOW);
            };
            t._getContent = function e() {
              return (
                this.element.getAttribute("data-content") || this.config.content
              );
            };
            t._cleanTipClass = function e() {
              var t = m(this.getTipElement());
              var n = t.attr("class").match(wt);
              if (n !== null && n.length > 0) {
                t.removeClass(n.join(""));
              }
            };
            i._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this).data(_t);
                var t = typeof n === "object" ? n : null;
                if (!e && /dispose|hide/.test(n)) {
                  return;
                }
                if (!e) {
                  e = new i(this, t);
                  m(this).data(_t, e);
                }
                if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n]();
                }
              });
            };
            o(i, null, [
              {
                key: "VERSION",
                get: function e() {
                  return yt;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return Ct;
                },
              },
              {
                key: "NAME",
                get: function e() {
                  return vt;
                },
              },
              {
                key: "DATA_KEY",
                get: function e() {
                  return _t;
                },
              },
              {
                key: "Event",
                get: function e() {
                  return xt;
                },
              },
              {
                key: "EVENT_KEY",
                get: function e() {
                  return Et;
                },
              },
              {
                key: "DefaultType",
                get: function e() {
                  return St;
                },
              },
            ]);
            return i;
          })(mt);
        (m.fn[vt] = Ot._jQueryInterface),
          (m.fn[vt].Constructor = Ot),
          (m.fn[vt].noConflict = function () {
            m.fn[vt] = Tt;
            return Ot._jQueryInterface;
          });
        var It = "scrollspy",
          Nt = "4.4.1",
          Lt = "bs.scrollspy",
          kt = "." + Lt,
          Pt = ".data-api",
          Ht = m.fn[It],
          jt = { offset: 10, method: "auto", target: "" },
          Rt = {
            offset: "number",
            method: "string",
            target: "(string|element)",
          },
          Mt = {
            ACTIVATE: "activate" + kt,
            SCROLL: "scroll" + kt,
            LOAD_DATA_API: "load" + kt + Pt,
          },
          Wt = {
            DROPDOWN_ITEM: "dropdown-item",
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
          },
          Ft = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            NAV_ITEMS: ".nav-item",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle",
          },
          Vt = { OFFSET: "offset", POSITION: "position" },
          qt = (function () {
            function i(e, t) {
              var n = this;
              this._element = e;
              this._scrollElement = e.tagName === "BODY" ? window : e;
              this._config = this._getConfig(t);
              this._selector =
                this._config.target +
                " " +
                Ft.NAV_LINKS +
                "," +
                (this._config.target + " " + Ft.LIST_ITEMS + ",") +
                (this._config.target + " " + Ft.DROPDOWN_ITEMS);
              this._offsets = [];
              this._targets = [];
              this._activeTarget = null;
              this._scrollHeight = 0;
              m(this._scrollElement).on(Mt.SCROLL, function (e) {
                return n._process(e);
              });
              this.refresh();
              this._process();
            }
            var e = i.prototype;
            e.refresh = function e() {
              var t = this;
              var n =
                this._scrollElement === this._scrollElement.window
                  ? Vt.OFFSET
                  : Vt.POSITION;
              var r = this._config.method === "auto" ? n : this._config.method;
              var o = r === Vt.POSITION ? this._getScrollTop() : 0;
              this._offsets = [];
              this._targets = [];
              this._scrollHeight = this._getScrollHeight();
              var i = [].slice.call(document.querySelectorAll(this._selector));
              i.map(function (e) {
                var t;
                var n = v.getSelectorFromElement(e);
                if (n) {
                  t = document.querySelector(n);
                }
                if (t) {
                  var i = t.getBoundingClientRect();
                  if (i.width || i.height) {
                    return [m(t)[r]().top + o, n];
                  }
                }
                return null;
              })
                .filter(function (e) {
                  return e;
                })
                .sort(function (e, t) {
                  return e[0] - t[0];
                })
                .forEach(function (e) {
                  t._offsets.push(e[0]);
                  t._targets.push(e[1]);
                });
            };
            e.dispose = function e() {
              m.removeData(this._element, Lt);
              m(this._scrollElement).off(kt);
              this._element = null;
              this._scrollElement = null;
              this._config = null;
              this._selector = null;
              this._offsets = null;
              this._targets = null;
              this._activeTarget = null;
              this._scrollHeight = null;
            };
            e._getConfig = function e(t) {
              t = a({}, jt, {}, typeof t === "object" && t ? t : {});
              if (typeof t.target !== "string") {
                var n = m(t.target).attr("id");
                if (!n) {
                  n = v.getUID(It);
                  m(t.target).attr("id", n);
                }
                t.target = "#" + n;
              }
              v.typeCheckConfig(It, t, Rt);
              return t;
            };
            e._getScrollTop = function e() {
              return this._scrollElement === window
                ? this._scrollElement.pageYOffset
                : this._scrollElement.scrollTop;
            };
            e._getScrollHeight = function e() {
              return (
                this._scrollElement.scrollHeight ||
                Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight
                )
              );
            };
            e._getOffsetHeight = function e() {
              return this._scrollElement === window
                ? window.innerHeight
                : this._scrollElement.getBoundingClientRect().height;
            };
            e._process = function e() {
              var t = this._getScrollTop() + this._config.offset;
              var n = this._getScrollHeight();
              var i = this._config.offset + n - this._getOffsetHeight();
              if (this._scrollHeight !== n) {
                this.refresh();
              }
              if (t >= i) {
                var r = this._targets[this._targets.length - 1];
                if (this._activeTarget !== r) {
                  this._activate(r);
                }
                return;
              }
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                this._offsets[0] > 0
              ) {
                this._activeTarget = null;
                this._clear();
                return;
              }
              var o = this._offsets.length;
              for (var s = o; s--; ) {
                var a =
                  this._activeTarget !== this._targets[s] &&
                  t >= this._offsets[s] &&
                  (typeof this._offsets[s + 1] === "undefined" ||
                    t < this._offsets[s + 1]);
                if (a) {
                  this._activate(this._targets[s]);
                }
              }
            };
            e._activate = function e(t) {
              this._activeTarget = t;
              this._clear();
              var n = this._selector.split(",").map(function (e) {
                return (
                  e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                );
              });
              var i = m([].slice.call(document.querySelectorAll(n.join(","))));
              if (i.hasClass(Wt.DROPDOWN_ITEM)) {
                i.closest(Ft.DROPDOWN)
                  .find(Ft.DROPDOWN_TOGGLE)
                  .addClass(Wt.ACTIVE);
                i.addClass(Wt.ACTIVE);
              } else {
                i.addClass(Wt.ACTIVE);
                i.parents(Ft.NAV_LIST_GROUP)
                  .prev(Ft.NAV_LINKS + ", " + Ft.LIST_ITEMS)
                  .addClass(Wt.ACTIVE);
                i.parents(Ft.NAV_LIST_GROUP)
                  .prev(Ft.NAV_ITEMS)
                  .children(Ft.NAV_LINKS)
                  .addClass(Wt.ACTIVE);
              }
              m(this._scrollElement).trigger(Mt.ACTIVATE, { relatedTarget: t });
            };
            e._clear = function e() {
              [].slice
                .call(document.querySelectorAll(this._selector))
                .filter(function (e) {
                  return e.classList.contains(Wt.ACTIVE);
                })
                .forEach(function (e) {
                  return e.classList.remove(Wt.ACTIVE);
                });
            };
            i._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this).data(Lt);
                var t = typeof n === "object" && n;
                if (!e) {
                  e = new i(this, t);
                  m(this).data(Lt, e);
                }
                if (typeof n === "string") {
                  if (typeof e[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  e[n]();
                }
              });
            };
            o(i, null, [
              {
                key: "VERSION",
                get: function e() {
                  return Nt;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return jt;
                },
              },
            ]);
            return i;
          })();
        m(window).on(Mt.LOAD_DATA_API, function () {
          var e = [].slice.call(document.querySelectorAll(Ft.DATA_SPY));
          var t = e.length;
          for (var n = t; n--; ) {
            var i = m(e[n]);
            qt._jQueryInterface.call(i, i.data());
          }
        }),
          (m.fn[It] = qt._jQueryInterface),
          (m.fn[It].Constructor = qt),
          (m.fn[It].noConflict = function () {
            m.fn[It] = Ht;
            return qt._jQueryInterface;
          });
        var Ut = "tab",
          Bt = "4.4.1",
          Gt = "bs.tab",
          Kt = "." + Gt,
          Qt = ".data-api",
          $t = m.fn[Ut],
          Xt = {
            HIDE: "hide" + Kt,
            HIDDEN: "hidden" + Kt,
            SHOW: "show" + Kt,
            SHOWN: "shown" + Kt,
            CLICK_DATA_API: "click" + Kt + Qt,
          },
          Yt = {
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
            DISABLED: "disabled",
            FADE: "fade",
            SHOW: "show",
          },
          zt = {
            DROPDOWN: ".dropdown",
            NAV_LIST_GROUP: ".nav, .list-group",
            ACTIVE: ".active",
            ACTIVE_UL: "> li > .active",
            DATA_TOGGLE:
              '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            DROPDOWN_TOGGLE: ".dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active",
          },
          Jt = (function () {
            function i(e) {
              this._element = e;
            }
            var e = i.prototype;
            e.show = function e() {
              var i = this;
              if (
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  m(this._element).hasClass(Yt.ACTIVE)) ||
                m(this._element).hasClass(Yt.DISABLED)
              ) {
                return;
              }
              var t;
              var r;
              var n = m(this._element).closest(zt.NAV_LIST_GROUP)[0];
              var o = v.getSelectorFromElement(this._element);
              if (n) {
                var s =
                  n.nodeName === "UL" || n.nodeName === "OL"
                    ? zt.ACTIVE_UL
                    : zt.ACTIVE;
                r = m.makeArray(m(n).find(s));
                r = r[r.length - 1];
              }
              var a = m.Event(Xt.HIDE, { relatedTarget: this._element });
              var l = m.Event(Xt.SHOW, { relatedTarget: r });
              if (r) {
                m(r).trigger(a);
              }
              m(this._element).trigger(l);
              if (l.isDefaultPrevented() || a.isDefaultPrevented()) {
                return;
              }
              if (o) {
                t = document.querySelector(o);
              }
              this._activate(this._element, n);
              var u = function e() {
                var t = m.Event(Xt.HIDDEN, { relatedTarget: i._element });
                var n = m.Event(Xt.SHOWN, { relatedTarget: r });
                m(r).trigger(t);
                m(i._element).trigger(n);
              };
              if (t) {
                this._activate(t, t.parentNode, u);
              } else {
                u();
              }
            };
            e.dispose = function e() {
              m.removeData(this._element, Gt);
              this._element = null;
            };
            e._activate = function e(t, n, i) {
              var r = this;
              var o =
                n && (n.nodeName === "UL" || n.nodeName === "OL")
                  ? m(n).find(zt.ACTIVE_UL)
                  : m(n).children(zt.ACTIVE);
              var s = o[0];
              var a = i && s && m(s).hasClass(Yt.FADE);
              var l = function e() {
                return r._transitionComplete(t, s, i);
              };
              if (s && a) {
                var u = v.getTransitionDurationFromElement(s);
                m(s)
                  .removeClass(Yt.SHOW)
                  .one(v.TRANSITION_END, l)
                  .emulateTransitionEnd(u);
              } else {
                l();
              }
            };
            e._transitionComplete = function e(t, n, i) {
              if (n) {
                m(n).removeClass(Yt.ACTIVE);
                var r = m(n.parentNode).find(zt.DROPDOWN_ACTIVE_CHILD)[0];
                if (r) {
                  m(r).removeClass(Yt.ACTIVE);
                }
                if (n.getAttribute("role") === "tab") {
                  n.setAttribute("aria-selected", false);
                }
              }
              m(t).addClass(Yt.ACTIVE);
              if (t.getAttribute("role") === "tab") {
                t.setAttribute("aria-selected", true);
              }
              v.reflow(t);
              if (t.classList.contains(Yt.FADE)) {
                t.classList.add(Yt.SHOW);
              }
              if (t.parentNode && m(t.parentNode).hasClass(Yt.DROPDOWN_MENU)) {
                var o = m(t).closest(zt.DROPDOWN)[0];
                if (o) {
                  var s = [].slice.call(o.querySelectorAll(zt.DROPDOWN_TOGGLE));
                  m(s).addClass(Yt.ACTIVE);
                }
                t.setAttribute("aria-expanded", true);
              }
              if (i) {
                i();
              }
            };
            i._jQueryInterface = function e(n) {
              return this.each(function () {
                var e = m(this);
                var t = e.data(Gt);
                if (!t) {
                  t = new i(this);
                  e.data(Gt, t);
                }
                if (typeof n === "string") {
                  if (typeof t[n] === "undefined") {
                    throw new TypeError('No method named "' + n + '"');
                  }
                  t[n]();
                }
              });
            };
            o(i, null, [
              {
                key: "VERSION",
                get: function e() {
                  return Bt;
                },
              },
            ]);
            return i;
          })();
        m(document).on(Xt.CLICK_DATA_API, zt.DATA_TOGGLE, function (e) {
          e.preventDefault();
          Jt._jQueryInterface.call(m(this), "show");
        }),
          (m.fn[Ut] = Jt._jQueryInterface),
          (m.fn[Ut].Constructor = Jt),
          (m.fn[Ut].noConflict = function () {
            m.fn[Ut] = $t;
            return Jt._jQueryInterface;
          });
        var Zt = "toast",
          en = "4.4.1",
          tn = "bs.toast",
          nn = "." + tn,
          rn = m.fn[Zt],
          on = {
            CLICK_DISMISS: "click.dismiss" + nn,
            HIDE: "hide" + nn,
            HIDDEN: "hidden" + nn,
            SHOW: "show" + nn,
            SHOWN: "shown" + nn,
          },
          sn = { FADE: "fade", HIDE: "hide", SHOW: "show", SHOWING: "showing" },
          an = { animation: "boolean", autohide: "boolean", delay: "number" },
          ln = { animation: true, autohide: true, delay: 500 },
          un = { DATA_DISMISS: '[data-dismiss="toast"]' },
          cn = (function () {
            function r(e, t) {
              this._element = e;
              this._config = this._getConfig(t);
              this._timeout = null;
              this._setListeners();
            }
            var e = r.prototype;
            e.show = function e() {
              var t = this;
              var n = m.Event(on.SHOW);
              m(this._element).trigger(n);
              if (n.isDefaultPrevented()) {
                return;
              }
              if (this._config.animation) {
                this._element.classList.add(sn.FADE);
              }
              var i = function e() {
                t._element.classList.remove(sn.SHOWING);
                t._element.classList.add(sn.SHOW);
                m(t._element).trigger(on.SHOWN);
                if (t._config.autohide) {
                  t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay);
                }
              };
              this._element.classList.remove(sn.HIDE);
              v.reflow(this._element);
              this._element.classList.add(sn.SHOWING);
              if (this._config.animation) {
                var r = v.getTransitionDurationFromElement(this._element);
                m(this._element)
                  .one(v.TRANSITION_END, i)
                  .emulateTransitionEnd(r);
              } else {
                i();
              }
            };
            e.hide = function e() {
              if (!this._element.classList.contains(sn.SHOW)) {
                return;
              }
              var t = m.Event(on.HIDE);
              m(this._element).trigger(t);
              if (t.isDefaultPrevented()) {
                return;
              }
              this._close();
            };
            e.dispose = function e() {
              clearTimeout(this._timeout);
              this._timeout = null;
              if (this._element.classList.contains(sn.SHOW)) {
                this._element.classList.remove(sn.SHOW);
              }
              m(this._element).off(on.CLICK_DISMISS);
              m.removeData(this._element, tn);
              this._element = null;
              this._config = null;
            };
            e._getConfig = function e(t) {
              t = a(
                {},
                ln,
                {},
                m(this._element).data(),
                {},
                typeof t === "object" && t ? t : {}
              );
              v.typeCheckConfig(Zt, t, this.constructor.DefaultType);
              return t;
            };
            e._setListeners = function e() {
              var t = this;
              m(this._element).on(
                on.CLICK_DISMISS,
                un.DATA_DISMISS,
                function () {
                  return t.hide();
                }
              );
            };
            e._close = function e() {
              var t = this;
              var n = function e() {
                t._element.classList.add(sn.HIDE);
                m(t._element).trigger(on.HIDDEN);
              };
              this._element.classList.remove(sn.SHOW);
              if (this._config.animation) {
                var i = v.getTransitionDurationFromElement(this._element);
                m(this._element)
                  .one(v.TRANSITION_END, n)
                  .emulateTransitionEnd(i);
              } else {
                n();
              }
            };
            r._jQueryInterface = function e(i) {
              return this.each(function () {
                var e = m(this);
                var t = e.data(tn);
                var n = typeof i === "object" && i;
                if (!t) {
                  t = new r(this, n);
                  e.data(tn, t);
                }
                if (typeof i === "string") {
                  if (typeof t[i] === "undefined") {
                    throw new TypeError('No method named "' + i + '"');
                  }
                  t[i](this);
                }
              });
            };
            o(r, null, [
              {
                key: "VERSION",
                get: function e() {
                  return en;
                },
              },
              {
                key: "DefaultType",
                get: function e() {
                  return an;
                },
              },
              {
                key: "Default",
                get: function e() {
                  return ln;
                },
              },
            ]);
            return r;
          })();
        (m.fn[Zt] = cn._jQueryInterface),
          (m.fn[Zt].Constructor = cn),
          (m.fn[Zt].noConflict = function () {
            m.fn[Zt] = rn;
            return cn._jQueryInterface;
          }),
          (e.Alert = A),
          (e.Button = j),
          (e.Carousel = ee),
          (e.Collapse = he),
          (e.Dropdown = ke),
          (e.Modal = Ke),
          (e.Popover = Ot),
          (e.Scrollspy = qt),
          (e.Tab = Jt),
          (e.Toast = cn),
          (e.Tooltip = mt),
          (e.Util = v),
          Object.defineProperty(e, "__esModule", { value: true });
      })(t, s, Ee);
    });
  (be = we) &&
    be.__esModule &&
    Object.prototype.hasOwnProperty.call(be, "default") &&
    be.default,
    (window.jQuery = s)(function () {
      s(".nav-tabs a").click(function (e) {
        e.preventDefault(), s(this).tab("show");
      });
    }),
    s(function () {
      var t = new n();
      t.start(),
        t.addEventListener("secondsUpdated", function (e) {
          s("#basicUsage").html(t.getTimeValues().toString());
        });
    }),
    s(function () {
      var t = new n();
      t.start({ precision: "seconds" }),
        t.addEventListener("secondsUpdated", function (e) {
          s("#gettingValuesExample .days").html(t.getTimeValues().days),
            s("#gettingValuesExample .hours").html(t.getTimeValues().hours),
            s("#gettingValuesExample .minutes").html(t.getTimeValues().minutes),
            s("#gettingValuesExample .seconds").html(t.getTimeValues().seconds),
            s("#gettingValuesExample .secondTenths").html(
              t.getTimeValues().secondTenths
            ),
            s("#gettingTotalValuesExample .days").html(
              t.getTotalTimeValues().days
            ),
            s("#gettingTotalValuesExample .hours").html(
              t.getTotalTimeValues().hours
            ),
            s("#gettingTotalValuesExample .minutes").html(
              t.getTotalTimeValues().minutes
            ),
            s("#gettingTotalValuesExample .seconds").html(
              t.getTotalTimeValues().seconds
            ),
            s("#gettingTotalValuesExample .secondTenths").html(
              t.getTotalTimeValues().secondTenths
            );
        });
    }),
    s(function () {
      var t = new n();
      s("#chronoExample .startButton").click(function () {
        t.start();
      }),
        s("#chronoExample .pauseButton").click(function () {
          t.pause();
        }),
        s("#chronoExample .stopButton").click(function () {
          t.stop();
        }),
        s("#chronoExample .resetButton").click(function () {
          t.reset();
        }),
        t.addEventListener("secondsUpdated", function (e) {
          s("#chronoExample .values").html(t.getTimeValues().toString());
        }),
        t.addEventListener("started", function (e) {
          s("#chronoExample .values").html(t.getTimeValues().toString());
        }),
        t.addEventListener("reset", function (e) {
          s("#chronoExample .values").html(t.getTimeValues().toString());
        });
    }),
    s(function () {
      var t = new n();
      t.start({
        precision: "seconds",
        startValues: { seconds: 90 },
        target: { seconds: 120 },
      }),
        s("#startValuesAndTargetExample .values").html(
          t.getTimeValues().toString()
        ),
        t.addEventListener("secondsUpdated", function (e) {
          s("#startValuesAndTargetExample .values").html(
            t.getTimeValues().toString()
          ),
            s("#startValuesAndTargetExample .progress_bar").html(
              s("#startValuesAndTargetExample .progress_bar").html() + "."
            );
        }),
        t.addEventListener("targetAchieved", function (e) {
          s("#startValuesAndTargetExample .progress_bar").html("COMPLETE!!");
        });
    }),
    s(function () {
      var t = new n();
      t.start({ countdown: !0, startValues: { seconds: 30 } }),
        s("#countdownExample .values").html(t.getTimeValues().toString()),
        t.addEventListener("secondsUpdated", function (e) {
          s("#countdownExample .values").html(t.getTimeValues().toString());
        }),
        t.addEventListener("targetAchieved", function (e) {
          s("#countdownExample .values").html("KABOOM!!");
        });
    }),
    s(function () {
      new n().start({
        callback: function (e) {
          s("#callbackExample .values").html(
            "Hello, I am a callback and I am counting time: " +
              e
                .getTimeValues()
                .toString(["hours", "minutes", "seconds", "secondTenths"])
          );
        },
      });
    }),
    s(function () {
      var t = new n();
      t.start({ precision: "secondTenths" }),
        t.addEventListener("secondTenthsUpdated", function (e) {
          s("#secondTenthsExample .values").html(
            t
              .getTimeValues()
              .toString(["hours", "minutes", "seconds", "secondTenths"])
          );
        });
    }),
    s(function () {
      var t = new n({ countdown: !0, startValues: { seconds: 5 } });
      t.start({ startValues: { seconds: 30 }, target: { seconds: 10 } }),
        s("#defaultParamsExample .values").html(t.getTimeValues().toString()),
        t.addEventListener("secondsUpdated", function (e) {
          s("#defaultParamsExample .values").html(t.getTimeValues().toString());
        }),
        t.addEventListener("targetAchieved", function (e) {
          s("#defaultParamsExample .values").html("The bomb has been defused!");
        });
    });
})();
