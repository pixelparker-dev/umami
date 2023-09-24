!(function () {
  !(function (t) {
    const e = t.screen; const n = e.width; const r = e.height; const a = t.navigator.language; const i = t.location; const o = t.localStorage;
    const u = t.document; const c = t.history; const s = i.hostname; const f = i.pathname; const l = i.search; const
      d = u.currentScript;
    if (d) {
      const m = 'data-';
      const p = d.getAttribute.bind(d);
      const v = p(`${m}website-id`);
      // const h = p(`${m}host-url`);
      // const h = 'https://dsc-platform-apps-umami.azurewebsites.net';
      const h = 'http://localhost:3000';
      const g = p(`${m}auto-track`) !== 'false';
      const b = p(`${m}do-not-track`);
      const y = p(`${m}domains`) || '';
      const S = y.split(',').map(((t) => t.trim()));
      const k = `${h ? h.replace(/\/$/, '') : d.src.split('/').slice(0, -1).join('/')}/api/send`;
      const j = `${n}x${r}`;
      const w = /data-umami-event-([\w-_]+)/;
      const N = `${m}umami-event`;
      const T = 300;
      const A = function (t, e, n) {
        const r = t[e];
        return function () {
          for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
          return n.apply(null, e), r.apply(t, e);
        };
      };
      const x = function () {
        return {
          website: v, hostname: s, screen: j, language: a, title: M, url: I, referrer: J,
        };
      };
      const E = function () {
        return o && o.getItem('umami.disabled') || b && (function () {
          const e = t.doNotTrack; const n = t.navigator; const r = t.external; const a = 'msTrackingProtectionEnabled';
          const i = e || n.doNotTrack || n.msDoNotTrack || r && a in r && r[a]();
          return i == '1' || i === 'yes';
        }()) || y && !S.includes(s);
      };
      const O = function (t, e, n) {
        n && (J = I, (I = (function (t) {
          return t.substring(0, 4) === 'http' ? `/${t.split('/').splice(3).join('/')}` : t;
        }(n.toString()))) !== J && setTimeout(K, T));
      };

      const D = function (t, e) {
        if (void 0 === e && (e = 'event'), !E()) {
          const n = {
            'Content-Type': 'application/json',
            'X-Unique-ID': localStorage.getItem('token-sub') ?? '-',
          };
          console.log('X-Unique-ID:', localStorage.getItem('token-sub') ?? '-');
          console.log('User-Agent:', navigator.userAgent);
          return void 0 !== L && (n['x-umami-cache'] = L), fetch(k, {
            method: 'POST',
            body: JSON.stringify({ type: e, payload: t }),
            headers: n,
          }).then(((t) => t.text())).then(((t) => L = t));
        }
      };
      var K = function (t, e) {
        return D(typeof t === 'string' ? ({
          ...x(),
          name: t,
          data: typeof e === 'object' ? e : void 0,
        }) : typeof t === 'object' ? t : typeof t === 'function' ? t(x()) : x());
      };
      t.umami || (t.umami = {
        track: K,
        identify(t) {
          return D({ ...x(), data: t }, 'identify');
        },
      });
      let L; let P; let _; let q; let C; var I = `${f}${l}`; var J = u.referrer; var
        M = u.title;
      if (g && !E()) {
        c.pushState = A(c, 'pushState', O), c.replaceState = A(c, 'replaceState', O), C = function (t) {
          const e = t.getAttribute.bind(t); const
            n = e(N);
          if (n) {
            const r = {};
            return t.getAttributeNames().forEach(((t) => {
              const n = t.match(w);
              n && (r[n[1]] = e(t));
            })), K(n, r);
          }
          return Promise.resolve();
        }, u.addEventListener('click', ((t) => {
          const e = t.target; const
            n = e.tagName === 'A' ? e : (function (t, e) {
              for (let n = t, r = 0; r < e; r++) {
                if (n.tagName === 'A') return n;
                if (!(n = n.parentElement)) return null;
              }
              return null;
            }(e, 10));
          if (n) {
            const r = n.href;
            const a = n.target === '_blank' || t.ctrlKey || t.shiftKey || t.metaKey || t.button && t.button === 1;
            if (n.getAttribute(N) && r) {
              return a || t.preventDefault(), C(n).then((() => {
                a || (i.href = r);
              }));
            }
          } else C(e);
        }), !0), _ = new MutationObserver(((t) => {
          const e = t[0];
          M = e && e.target ? e.target.text : void 0;
        })), (q = u.querySelector('head > title')) && _.observe(q, {
          subtree: !0,
          characterData: !0,
          childList: !0,
        });
        const $ = function () {
          u.readyState !== 'complete' || P || (K(), P = !0);
        };
        u.addEventListener('readystatechange', $, !0), $();
      }
    }
  }(window));
}());
