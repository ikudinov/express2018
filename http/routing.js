! function() {
    "use strict";
    var t = "undefined" == typeof global ? self : global;
    if ("function" != typeof t.require) {
        var n = {},
            e = {},
            r = {},
            i = {}.hasOwnProperty,
            o = /^\.\.?(\/|$)/,
            u = function(t, n) {
                for (var e, r = [], i = (o.test(n) ? t + "/" + n : n).split("/"), u = 0, a = i.length; a > u; u++) e = i[u], ".." === e ? r.pop() : "." !== e && "" !== e && r.push(e);
                return r.join("/")
            },
            a = function(t) {
                return t.split("/").slice(0, -1).join("/")
            },
            s = function(n) {
                return function(e) {
                    var r = u(a(n), e);
                    return t.require(r, n)
                }
            },
            c = function(t, n) {
                var r = v && v.createHot(t),
                    i = {
                        id: t,
                        exports: {},
                        hot: r
                    };
                return e[t] = i, n(i.exports, s(t), i), i.exports
            },
            f = function(t) {
                return r[t] ? f(r[t]) : t
            },
            l = function(t, n) {
                return f(u(a(t), n))
            },
            h = function(t, r) {
                null == r && (r = "/");
                var o = f(t);
                if (i.call(e, o)) return e[o].exports;
                if (i.call(n, o)) return c(o, n[o]);
                throw new Error("Cannot find module '" + t + "' from '" + r + "'")
            };
        h.alias = function(t, n) {
            r[n] = t
        };
        var p = /\.[^.\/]+$/,
            d = /\/index(\.[^\/]+)?$/,
            g = function(t) {
                if (p.test(t)) {
                    var n = t.replace(p, "");
                    i.call(r, n) && r[n].replace(p, "") !== n + "/index" || (r[n] = t)
                }
                if (d.test(t)) {
                    var e = t.replace(d, "");
                    i.call(r, e) || (r[e] = t)
                }
            };
        h.register = h.define = function(t, r) {
            if (t && "object" == typeof t)
                for (var o in t) i.call(t, o) && h.register(o, t[o]);
            else n[t] = r, delete e[t], g(t)
        }, h.list = function() {
            var t = [];
            for (var e in n) i.call(n, e) && t.push(e);
            return t
        };
        var v = t._hmr && new t._hmr(l, h, n, e);
        h._cache = e, h.hmr = v && v.wrap, h.brunch = !0, t.require = h
    }
}(),
function() {
    var t = ("undefined" == typeof window ? this : window, function(t, n, e) {
        var r = {},
            i = function(n, e) {
                var o;
                try {
                    return o = t(e + "/node_modules/" + n)
                } catch (u) {
                    if (-1 === u.toString().indexOf("Cannot find module")) throw u;
                    if (-1 !== e.indexOf("node_modules")) {
                        var a = e.split("/"),
                            s = a.lastIndexOf("node_modules"),
                            c = a.slice(0, s).join("/");
                        return i(n, c)
                    }
                }
                return r
            };
        return function(o) {
            if (o in n && (o = n[o]), o) {
                if ("." !== o[0] && e) {
                    var u = i(o, e);
                    if (u !== r) return u
                }
                return t(o)
            }
        }
    });
    require.register("web/static/js/routing.js", function(t, n, e) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.buildRoutingAt = t.centerClientView = t.initView = void 0;
        var i = n("./d3/forceUserPosition"),
            o = r(i),
            u = n("./decodeHtml"),
            a = r(u),
            s = n("d3-collection"),
            c = "$rts",
            f = "$cts",
            l = "$user",
            h = "https://rts1dev.ccsteam.ru/api/v1/routing_schema/routing_json",
            p = new URL(window.location.href),
            d = function() {
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
            },
            g = function() {
                return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
            };
        t.initView = function(t, params, n) {
            window.history && window.history.scrollRestoration && (history.scrollRestoration = "manual");
            var width = params && params.width,
                height = params && params.height, height;
            t.style.width = (width || 1500) + "px", t.style.height = (height || 1500) + "px", t.style.overflow = "scroll", n()
        }, t.centerClientView = function(t) {
            if (!p.searchParams.get("disable_centering")) {
                var n = t.clientWidth,
                    e = t.clientHeight,
                    r = n / 2 - d() / 2,
                    i = e / 2 - g() / 2;
                setTimeout(function() {
                    return window.scrollTo(r, i)
                }, 50)
            }
        }, t.buildRoutingAt = function(t, n) {
            var element = t;
            var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = d3.select(t),
                i = r.append("defs").attr("id", "imgdefs"),
                u = n.user_huid,
                p = r.node().clientWidth,
                d = r.node().clientHeight,
                v = p / 2,
                _ = d / 2,
                y = function(t) {
                    return e + "/routing_schema/static/images/" + t + ".png"
                },
                m = y("rts"),
                x = y("cts"),
                b = y("user");
            window.devicePixelRatio >= 2 && (m = y("rts@2x"), x = y("cts@2x"));
            var w = d3.forceCenter(v, _),
                M = o["default"](u, v, _ + .2 * g()),
                k = d3.forceLink().id(function(t) {
                    return t.uuid
                }).distance(80),
                T = d3.forceManyBody().strength(-60).theta(5e3),
                S = d3.forceCollide(23),
                N = d3.forceSimulation().force("link", k).force("charge", T).force("center", w).force("collide", S).force("currentUserPosition", M),
                E = i.append("linearGradient").attr("id", "linearGradient").attr("x1", "0%").attr("y1", "100%").attr("x2", "0%").attr("y2", "0%");
            E.append("stop").attr("offset", "0%").attr("stop-color", "rgb(71, 153, 227)"), E.append("stop").attr("offset", "100%").attr("stop-color", "rgb(157, 156, 156)");
            var A = function(t, n) {
                    i.append("pattern").attr("id", t).attr("x", 0).attr("y", 0).attr("width", 1).attr("height", 1).append("image").attr("xlink:href", n).attr("x", 0).attr("y", 0).attr("width", 40).attr("height", 40)
                },
                C = function(t) {
                    return "rts" === t.type ? "url(#" + c + ")" : "cts" === t.type ? "url(#" + f + ")" : "user" === t.type ? null === t.avatar ? "url(#" + l + ")" : "url(#" + t.uuid + ")" : void 0
                },
                P = function(t) {
                    d3.event.active || N.alphaTarget(.3).restart(), t.fx = t.x, t.fy = t.y
                },
                z = function(t) {
                    t.fx = d3.event.x, t.fy = d3.event.y
                },
                R = function(t) {
                    d3.event.active || N.alphaTarget(0), t.fx = null, t.fy = null
                },
                q = d3.drag().on("start", P).on("drag", z).on("end", R),
                L = function(t) {
                    A(c, m), A(f, x), A(l, b);
                    for (var n = 0; n < t.nodes.length; n++) {
                        var e = t.nodes[n];
                        "user" == e.type && null !== e.avatar && A(e.uuid, e.avatar)
                    }

                    // Add
                    const minWidth = t.nodes.length * 40 * 2
                    const minHeight = t.nodes.length * 40 * 2
                    element.style.width = element.style.width > minWidth ? element.style.width : minWidth
                    element.style.height = element.style.height > minHeight ? element.style.height : minHeight


                    var i = s.map(t.nodes, function(t) {
                            return t.uuid
                        }),
                        o = r.append("g").attr("class", "links").selectAll("line").data(t.links).enter().append("line").attr("stroke-width", 2),
                        h = r.selectAll(".node").data(t.nodes).enter().append("g").attr("class", "node").call(q),
                        p = function() {
                            o.attr("x1", function(t) {
                                return t.source.x
                            }).attr("y1", function(t) {
                                return t.source.y
                            }).attr("x2", function(t) {
                                return t.target.x
                            }).attr("y2", function(t) {
                                return t.target.y
                            }), h.attr("transform", function(t) {
                                return "translate(" + t.x + "," + t.y + ")"
                            })
                        };
                    h.append("circle").attr("r", 20).attr("fill", "white"), h.append("circle").attr("r", 20).attr("fill", function(t) {
                        return C(t)
                    }).attr("stroke", function(t) {
                        return t.uuid == u ? "rgb(71, 153, 227)" : "rgb(157, 156, 156)"
                    }).attr("stroke-width", 2), h.append("text").attr("text-anchor", "middle").attr("dy", 35).text(function(t) {
                        return a["default"](t.name)
                    }), o.attr("stroke", function(t) {
                        var n = i.get(t.source);
                        return n.uuid == u ? "url(#linearGradient)" : "rgb(157, 156, 156)"
                    }), N.nodes(t.nodes).on("tick", p), N.force("link").links(t.links)
                },
                U = function(t) {
                    var n = JSON.parse(t.target.responseText);
                    alert(n.reason)
                };
            d3.request(e + h).header("Content-Type", "application/json").post(JSON.stringify(n)).on("error", U).on("load", function(t) {
                return L(JSON.parse(t.responseText))
            })
        }
    }), require.register("d3-collection/build/d3-collection.js", function(n, e, r) {
        e = t(e, {}, "d3-collection"),
            function() {
                ! function(t, e) {
                    "object" == typeof n && "undefined" != typeof r ? e(n) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.d3 = t.d3 || {})
                }(this, function(t) {
                    "use strict";

                    function n() {}

                    function e(t, e) {
                        var r = new n;
                        if (t instanceof n) t.each(function(t, n) {
                            r.set(n, t)
                        });
                        else if (Array.isArray(t)) {
                            var i, o = -1,
                                u = t.length;
                            if (null == e)
                                for (; ++o < u;) r.set(o, t[o]);
                            else
                                for (; ++o < u;) r.set(e(i = t[o], o, t), i)
                        } else if (t)
                            for (var a in t) r.set(a, t[a]);
                        return r
                    }

                    function r() {
                        return {}
                    }

                    function i(t, n, e) {
                        t[n] = e
                    }

                    function o() {
                        return e()
                    }

                    function u(t, n, e) {
                        t.set(n, e)
                    }

                    function a() {}

                    function s(t, n) {
                        var e = new a;
                        if (t instanceof a) t.each(function(t) {
                            e.add(t)
                        });
                        else if (t) {
                            var r = -1,
                                i = t.length;
                            if (null == n)
                                for (; ++r < i;) e.add(t[r]);
                            else
                                for (; ++r < i;) e.add(n(t[r], r, t))
                        }
                        return e
                    }
                    var c = "$";
                    n.prototype = e.prototype = {
                        constructor: n,
                        has: function(t) {
                            return c + t in this
                        },
                        get: function(t) {
                            return this[c + t]
                        },
                        set: function(t, n) {
                            return this[c + t] = n, this
                        },
                        remove: function(t) {
                            var n = c + t;
                            return n in this && delete this[n]
                        },
                        clear: function() {
                            for (var t in this) t[0] === c && delete this[t]
                        },
                        keys: function() {
                            var t = [];
                            for (var n in this) n[0] === c && t.push(n.slice(1));
                            return t
                        },
                        values: function() {
                            var t = [];
                            for (var n in this) n[0] === c && t.push(this[n]);
                            return t
                        },
                        entries: function() {
                            var t = [];
                            for (var n in this) n[0] === c && t.push({
                                key: n.slice(1),
                                value: this[n]
                            });
                            return t
                        },
                        size: function() {
                            var t = 0;
                            for (var n in this) n[0] === c && ++t;
                            return t
                        },
                        empty: function() {
                            for (var t in this)
                                if (t[0] === c) return !1;
                            return !0
                        },
                        each: function(t) {
                            for (var n in this) n[0] === c && t(this[n], n.slice(1), this)
                        }
                    };
                    var f = function() {
                            function t(n, r, i, o) {
                                if (r >= f.length) return null != a && n.sort(a), null != s ? s(n) : n;
                                for (var u, c, l, h = -1, p = n.length, d = f[r++], g = e(), v = i(); ++h < p;)(l = g.get(u = d(c = n[h]) + "")) ? l.push(c) : g.set(u, [c]);
                                return g.each(function(n, e) {
                                    o(v, e, t(n, r, i, o))
                                }), v
                            }

                            function n(t, e) {
                                if (++e > f.length) return t;
                                var r, i = l[e - 1];
                                return null != s && e >= f.length ? r = t.entries() : (r = [], t.each(function(t, i) {
                                    r.push({
                                        key: i,
                                        values: n(t, e)
                                    })
                                })), null != i ? r.sort(function(t, n) {
                                    return i(t.key, n.key)
                                }) : r
                            }
                            var a, s, c, f = [],
                                l = [];
                            return c = {
                                object: function(n) {
                                    return t(n, 0, r, i)
                                },
                                map: function(n) {
                                    return t(n, 0, o, u)
                                },
                                entries: function(e) {
                                    return n(t(e, 0, o, u), 0)
                                },
                                key: function(t) {
                                    return f.push(t), c
                                },
                                sortKeys: function(t) {
                                    return l[f.length - 1] = t, c
                                },
                                sortValues: function(t) {
                                    return a = t, c
                                },
                                rollup: function(t) {
                                    return s = t, c
                                }
                            }
                        },
                        l = e.prototype;
                    a.prototype = s.prototype = {
                        constructor: a,
                        has: l.has,
                        add: function(t) {
                            return t += "", this[c + t] = t, this
                        },
                        remove: l.remove,
                        clear: l.clear,
                        values: l.keys,
                        size: l.size,
                        empty: l.empty,
                        each: l.each
                    };
                    var h = function(t) {
                            var n = [];
                            for (var e in t) n.push(e);
                            return n
                        },
                        p = function(t) {
                            var n = [];
                            for (var e in t) n.push(t[e]);
                            return n
                        },
                        d = function(t) {
                            var n = [];
                            for (var e in t) n.push({
                                key: e,
                                value: t[e]
                            });
                            return n
                        };
                    t.nest = f, t.set = s, t.map = e, t.keys = h, t.values = p, t.entries = d, Object.defineProperty(t, "__esModule", {
                        value: !0
                    })
                })
            }()
    }), require.register("d3/build/d3.js", function(n, e, r) {
        e = t(e, {}, "d3"),
            function() {
                ! function(t, e) {
                    "object" == typeof n && "undefined" != typeof r ? e(n) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.d3 = t.d3 || {})
                }(this, function(t) {
                    "use strict";

                    function n(t) {
                        return function(n, e) {
                            return qc(t(n), e)
                        }
                    }

                    function e(t, n) {
                        return [t, n]
                    }

                    function r(t, n, e) {
                        var r = Math.abs(n - t) / Math.max(0, e),
                            i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
                            o = r / i;
                        return o >= Qc ? i *= 10 : o >= Kc ? i *= 5 : o >= tf && (i *= 2), t > n ? -i : i
                    }

                    function i(t) {
                        return t.length
                    }

                    function o(t) {
                        return "translate(" + t + ",0)"
                    }

                    function u(t) {
                        return "translate(0," + t + ")"
                    }

                    function a(t) {
                        var n = t.bandwidth() / 2;
                        return t.round() && (n = Math.round(n)),
                            function(e) {
                                return t(e) + n
                            }
                    }

                    function s() {
                        return !this.__axis
                    }

                    function c(t, n) {
                        function e(e) {
                            var o = null == c ? n.ticks ? n.ticks.apply(n, i) : n.domain() : c,
                                u = null == f ? n.tickFormat ? n.tickFormat.apply(n, i) : xf : f,
                                _ = Math.max(l, 0) + p,
                                y = n.range(),
                                m = y[0] + .5,
                                x = y[y.length - 1] + .5,
                                b = (n.bandwidth ? a : xf)(n.copy()),
                                w = e.selection ? e.selection() : e,
                                M = w.selectAll(".domain").data([null]),
                                k = w.selectAll(".tick").data(o, n).order(),
                                T = k.exit(),
                                S = k.enter().append("g").attr("class", "tick"),
                                N = k.select("line"),
                                E = k.select("text");
                            M = M.merge(M.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000")), k = k.merge(S), N = N.merge(S.append("line").attr("stroke", "#000").attr(r + "2", d * l).attr(g + "1", .5).attr(g + "2", .5)), E = E.merge(S.append("text").attr("fill", "#000").attr(r, d * _).attr(g, .5).attr("dy", t === bf ? "0em" : t === Mf ? "0.71em" : "0.32em")), e !== w && (M = M.transition(e), k = k.transition(e), N = N.transition(e), E = E.transition(e), T = T.transition(e).attr("opacity", Tf).attr("transform", function(t) {
                                return isFinite(t = b(t)) ? v(t) : this.getAttribute("transform")
                            }), S.attr("opacity", Tf).attr("transform", function(t) {
                                var n = this.parentNode.__axis;
                                return v(n && isFinite(n = n(t)) ? n : b(t))
                            })), T.remove(), M.attr("d", t === kf || t == wf ? "M" + d * h + "," + m + "H0.5V" + x + "H" + d * h : "M" + m + "," + d * h + "V0.5H" + x + "V" + d * h), k.attr("opacity", 1).attr("transform", function(t) {
                                return v(b(t))
                            }), N.attr(r + "2", d * l), E.attr(r, d * _).text(u), w.filter(s).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === wf ? "start" : t === kf ? "end" : "middle"), w.each(function() {
                                this.__axis = b
                            })
                        }
                        var r, i = [],
                            c = null,
                            f = null,
                            l = 6,
                            h = 6,
                            p = 3,
                            d = t === bf || t === kf ? -1 : 1,
                            g = t === kf || t === wf ? (r = "x", "y") : (r = "y", "x"),
                            v = t === bf || t === Mf ? o : u;
                        return e.scale = function(t) {
                            return arguments.length ? (n = t, e) : n
                        }, e.ticks = function() {
                            return i = mf.call(arguments), e
                        }, e.tickArguments = function(t) {
                            return arguments.length ? (i = null == t ? [] : mf.call(t), e) : i.slice()
                        }, e.tickValues = function(t) {
                            return arguments.length ? (c = null == t ? null : mf.call(t), e) : c && c.slice()
                        }, e.tickFormat = function(t) {
                            return arguments.length ? (f = t, e) : f
                        }, e.tickSize = function(t) {
                            return arguments.length ? (l = h = +t, e) : l
                        }, e.tickSizeInner = function(t) {
                            return arguments.length ? (l = +t, e) : l
                        }, e.tickSizeOuter = function(t) {
                            return arguments.length ? (h = +t, e) : h
                        }, e.tickPadding = function(t) {
                            return arguments.length ? (p = +t, e) : p
                        }, e
                    }

                    function f(t) {
                        return c(bf, t)
                    }

                    function l(t) {
                        return c(wf, t)
                    }

                    function h(t) {
                        return c(Mf, t)
                    }

                    function p(t) {
                        return c(kf, t)
                    }

                    function d() {
                        for (var t, n = 0, e = arguments.length, r = {}; e > n; ++n) {
                            if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " + t);
                            r[t] = []
                        }
                        return new g(r)
                    }

                    function g(t) {
                        this._ = t
                    }

                    function v(t, n) {
                        return t.trim().split(/^|\s+/).map(function(t) {
                            var e = "",
                                r = t.indexOf(".");
                            if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
                            return {
                                type: t,
                                name: e
                            }
                        })
                    }

                    function _(t, n) {
                        for (var e, r = 0, i = t.length; i > r; ++r)
                            if ((e = t[r]).name === n) return e.value
                    }

                    function y(t, n, e) {
                        for (var r = 0, i = t.length; i > r; ++r)
                            if (t[r].name === n) {
                                t[r] = Sf, t = t.slice(0, r).concat(t.slice(r + 1));
                                break
                            }
                        return null != e && t.push({
                            name: n,
                            value: e
                        }), t
                    }

                    function m(t) {
                        return function() {
                            var n = this.ownerDocument,
                                e = this.namespaceURI;
                            return e === Nf && n.documentElement.namespaceURI === Nf ? n.createElement(t) : n.createElementNS(e, t)
                        }
                    }

                    function x(t) {
                        return function() {
                            return this.ownerDocument.createElementNS(t.space, t.local)
                        }
                    }

                    function b() {
                        return new w
                    }

                    function w() {
                        this._ = "@" + (++Pf).toString(36)
                    }

                    function M(t, n, e) {
                        return t = k(t, n, e),
                            function(n) {
                                var e = n.relatedTarget;
                                e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n)
                            }
                    }

                    function k(n, e, r) {
                        return function(i) {
                            var o = t.event;
                            t.event = i;
                            try {
                                n.call(this, this.__data__, e, r)
                            } finally {
                                t.event = o
                            }
                        }
                    }

                    function T(t) {
                        return t.trim().split(/^|\s+/).map(function(t) {
                            var n = "",
                                e = t.indexOf(".");
                            return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
                                type: t,
                                name: n
                            }
                        })
                    }

                    function S(t) {
                        return function() {
                            var n = this.__on;
                            if (n) {
                                for (var e, r = 0, i = -1, o = n.length; o > r; ++r) e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
                                ++i ? n.length = i : delete this.__on
                            }
                        }
                    }

                    function N(t, n, e) {
                        var r = Uf.hasOwnProperty(t.type) ? M : k;
                        return function(i, o, u) {
                            var a, s = this.__on,
                                c = r(n, o, u);
                            if (s)
                                for (var f = 0, l = s.length; l > f; ++f)
                                    if ((a = s[f]).type === t.type && a.name === t.name) return this.removeEventListener(a.type, a.listener, a.capture), this.addEventListener(a.type, a.listener = c, a.capture = e), void(a.value = n);
                            this.addEventListener(t.type, c, e), a = {
                                type: t.type,
                                name: t.name,
                                value: n,
                                listener: c,
                                capture: e
                            }, s ? s.push(a) : this.__on = [a]
                        }
                    }

                    function E(n, e, r, i) {
                        var o = t.event;
                        n.sourceEvent = t.event, t.event = n;
                        try {
                            return e.apply(r, i)
                        } finally {
                            t.event = o
                        }
                    }

                    function A() {}

                    function C() {
                        return []
                    }

                    function P(t, n) {
                        this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
                    }

                    function z(t, n, e, r, i, o) {
                        for (var u, a = 0, s = n.length, c = o.length; c > a; ++a)(u = n[a]) ? (u.__data__ = o[a], r[a] = u) : e[a] = new P(t, o[a]);
                        for (; s > a; ++a)(u = n[a]) && (i[a] = u)
                    }

                    function R(t, n, e, r, i, o, u) {
                        var a, s, c, f = {},
                            l = n.length,
                            h = o.length,
                            p = new Array(l);
                        for (a = 0; l > a; ++a)(s = n[a]) && (p[a] = c = Zf + u.call(s, s.__data__, a, n), c in f ? i[a] = s : f[c] = s);
                        for (a = 0; h > a; ++a) c = Zf + u.call(t, o[a], a, o), (s = f[c]) ? (r[a] = s, s.__data__ = o[a], f[c] = null) : e[a] = new P(t, o[a]);
                        for (a = 0; l > a; ++a)(s = n[a]) && f[p[a]] === s && (i[a] = s)
                    }

                    function q(t, n) {
                        return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN
                    }

                    function L(t) {
                        return function() {
                            this.removeAttribute(t)
                        }
                    }

                    function U(t) {
                        return function() {
                            this.removeAttributeNS(t.space, t.local)
                        }
                    }

                    function O(t, n) {
                        return function() {
                            this.setAttribute(t, n)
                        }
                    }

                    function D(t, n) {
                        return function() {
                            this.setAttributeNS(t.space, t.local, n)
                        }
                    }

                    function j(t, n) {
                        return function() {
                            var e = n.apply(this, arguments);
                            null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
                        }
                    }

                    function F(t, n) {
                        return function() {
                            var e = n.apply(this, arguments);
                            null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
                        }
                    }

                    function I(t) {
                        return function() {
                            this.style.removeProperty(t)
                        }
                    }

                    function Y(t, n, e) {
                        return function() {
                            this.style.setProperty(t, n, e)
                        }
                    }

                    function H(t, n, e) {
                        return function() {
                            var r = n.apply(this, arguments);
                            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
                        }
                    }

                    function B(t) {
                        return function() {
                            delete this[t]
                        }
                    }

                    function X(t, n) {
                        return function() {
                            this[t] = n
                        }
                    }

                    function V(t, n) {
                        return function() {
                            var e = n.apply(this, arguments);
                            null == e ? delete this[t] : this[t] = e
                        }
                    }

                    function W(t) {
                        return t.trim().split(/^|\s+/)
                    }

                    function $(t) {
                        return t.classList || new G(t)
                    }

                    function G(t) {
                        this._node = t, this._names = W(t.getAttribute("class") || "")
                    }

                    function Z(t, n) {
                        for (var e = $(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
                    }

                    function J(t, n) {
                        for (var e = $(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
                    }

                    function Q(t) {
                        return function() {
                            Z(this, t)
                        }
                    }

                    function K(t) {
                        return function() {
                            J(this, t)
                        }
                    }

                    function tt(t, n) {
                        return function() {
                            (n.apply(this, arguments) ? Z : J)(this, t)
                        }
                    }

                    function nt() {
                        this.textContent = ""
                    }

                    function et(t) {
                        return function() {
                            this.textContent = t
                        }
                    }

                    function rt(t) {
                        return function() {
                            var n = t.apply(this, arguments);
                            this.textContent = null == n ? "" : n
                        }
                    }

                    function it() {
                        this.innerHTML = ""
                    }

                    function ot(t) {
                        return function() {
                            this.innerHTML = t
                        }
                    }

                    function ut(t) {
                        return function() {
                            var n = t.apply(this, arguments);
                            this.innerHTML = null == n ? "" : n
                        }
                    }

                    function at() {
                        this.nextSibling && this.parentNode.appendChild(this)
                    }

                    function st() {
                        this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
                    }

                    function ct() {
                        return null
                    }

                    function ft() {
                        var t = this.parentNode;
                        t && t.removeChild(this)
                    }

                    function lt(t, n, e) {
                        var r = cl(t),
                            i = r.CustomEvent;
                        i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
                    }

                    function ht(t, n) {
                        return function() {
                            return lt(this, t, n)
                        }
                    }

                    function pt(t, n) {
                        return function() {
                            return lt(this, t, n.apply(this, arguments))
                        }
                    }

                    function dt(t, n) {
                        this._groups = t, this._parents = n
                    }

                    function gt() {
                        return new dt([
                            [document.documentElement]
                        ], wl)
                    }

                    function vt() {
                        t.event.stopImmediatePropagation()
                    }

                    function _t(t, n) {
                        var e = t.document.documentElement,
                            r = Ml(t).on("dragstart.drag", null);
                        n && (r.on("click.drag", Nl, !0), setTimeout(function() {
                            r.on("click.drag", null)
                        }, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect)
                    }

                    function yt(t, n, e, r, i, o, u, a, s, c) {
                        this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = u, this.dx = a, this.dy = s, this._ = c
                    }

                    function mt() {
                        return !t.event.button
                    }

                    function xt() {
                        return this.parentNode
                    }

                    function bt(n) {
                        return null == n ? {
                            x: t.event.x,
                            y: t.event.y
                        } : n
                    }

                    function wt(t, n) {
                        var e = Object.create(t.prototype);
                        for (var r in n) e[r] = n[r];
                        return e
                    }

                    function Mt() {}

                    function kt(t) {
                        var n;
                        return t = (t + "").trim().toLowerCase(), (n = Ol.exec(t)) ? (n = parseInt(n[1], 16), new At(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1)) : (n = Dl.exec(t)) ? Tt(parseInt(n[1], 16)) : (n = jl.exec(t)) ? new At(n[1], n[2], n[3], 1) : (n = Fl.exec(t)) ? new At(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = Il.exec(t)) ? St(n[1], n[2], n[3], n[4]) : (n = Yl.exec(t)) ? St(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Hl.exec(t)) ? Ct(n[1], n[2] / 100, n[3] / 100, 1) : (n = Bl.exec(t)) ? Ct(n[1], n[2] / 100, n[3] / 100, n[4]) : Xl.hasOwnProperty(t) ? Tt(Xl[t]) : "transparent" === t ? new At(NaN, NaN, NaN, 0) : null
                    }

                    function Tt(t) {
                        return new At(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
                    }

                    function St(t, n, e, r) {
                        return 0 >= r && (t = n = e = NaN), new At(t, n, e, r)
                    }

                    function Nt(t) {
                        return t instanceof Mt || (t = kt(t)), t ? (t = t.rgb(), new At(t.r, t.g, t.b, t.opacity)) : new At
                    }

                    function Et(t, n, e, r) {
                        return 1 === arguments.length ? Nt(t) : new At(t, n, e, null == r ? 1 : r)
                    }

                    function At(t, n, e, r) {
                        this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
                    }

                    function Ct(t, n, e, r) {
                        return 0 >= r ? t = n = e = NaN : 0 >= e || e >= 1 ? t = n = NaN : 0 >= n && (t = NaN), new Rt(t, n, e, r)
                    }

                    function Pt(t) {
                        if (t instanceof Rt) return new Rt(t.h, t.s, t.l, t.opacity);
                        if (t instanceof Mt || (t = kt(t)), !t) return new Rt;
                        if (t instanceof Rt) return t;
                        t = t.rgb();
                        var n = t.r / 255,
                            e = t.g / 255,
                            r = t.b / 255,
                            i = Math.min(n, e, r),
                            o = Math.max(n, e, r),
                            u = NaN,
                            a = o - i,
                            s = (o + i) / 2;
                        return a ? (u = n === o ? (e - r) / a + 6 * (r > e) : e === o ? (r - n) / a + 2 : (n - e) / a + 4, a /= .5 > s ? o + i : 2 - o - i, u *= 60) : a = s > 0 && 1 > s ? 0 : u, new Rt(u, a, s, t.opacity)
                    }

                    function zt(t, n, e, r) {
                        return 1 === arguments.length ? Pt(t) : new Rt(t, n, e, null == r ? 1 : r)
                    }

                    function Rt(t, n, e, r) {
                        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
                    }

                    function qt(t, n, e) {
                        return 255 * (60 > t ? n + (e - n) * t / 60 : 180 > t ? e : 240 > t ? n + (e - n) * (240 - t) / 60 : n)
                    }

                    function Lt(t) {
                        if (t instanceof Ot) return new Ot(t.l, t.a, t.b, t.opacity);
                        if (t instanceof Bt) {
                            var n = t.h * Vl;
                            return new Ot(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
                        }
                        t instanceof At || (t = Nt(t));
                        var e = It(t.r),
                            r = It(t.g),
                            i = It(t.b),
                            o = Dt((.4124564 * e + .3575761 * r + .1804375 * i) / Gl),
                            u = Dt((.2126729 * e + .7151522 * r + .072175 * i) / Zl),
                            a = Dt((.0193339 * e + .119192 * r + .9503041 * i) / Jl);
                        return new Ot(116 * u - 16, 500 * (o - u), 200 * (u - a), t.opacity)
                    }

                    function Ut(t, n, e, r) {
                        return 1 === arguments.length ? Lt(t) : new Ot(t, n, e, null == r ? 1 : r)
                    }

                    function Ot(t, n, e, r) {
                        this.l = +t, this.a = +n, this.b = +e, this.opacity = +r
                    }

                    function Dt(t) {
                        return t > nh ? Math.pow(t, 1 / 3) : t / th + Ql
                    }

                    function jt(t) {
                        return t > Kl ? t * t * t : th * (t - Ql)
                    }

                    function Ft(t) {
                        return 255 * (.0031308 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
                    }

                    function It(t) {
                        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
                    }

                    function Yt(t) {
                        if (t instanceof Bt) return new Bt(t.h, t.c, t.l, t.opacity);
                        t instanceof Ot || (t = Lt(t));
                        var n = Math.atan2(t.b, t.a) * Wl;
                        return new Bt(0 > n ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
                    }

                    function Ht(t, n, e, r) {
                        return 1 === arguments.length ? Yt(t) : new Bt(t, n, e, null == r ? 1 : r)
                    }

                    function Bt(t, n, e, r) {
                        this.h = +t, this.c = +n, this.l = +e, this.opacity = +r
                    }

                    function Xt(t) {
                        if (t instanceof Wt) return new Wt(t.h, t.s, t.l, t.opacity);
                        t instanceof At || (t = Nt(t));
                        var n = t.r / 255,
                            e = t.g / 255,
                            r = t.b / 255,
                            i = (ch * r + ah * n - sh * e) / (ch + ah - sh),
                            o = r - i,
                            u = (uh * (e - i) - ih * o) / oh,
                            a = Math.sqrt(u * u + o * o) / (uh * i * (1 - i)),
                            s = a ? Math.atan2(u, o) * Wl - 120 : NaN;
                        return new Wt(0 > s ? s + 360 : s, a, i, t.opacity)
                    }

                    function Vt(t, n, e, r) {
                        return 1 === arguments.length ? Xt(t) : new Wt(t, n, e, null == r ? 1 : r)
                    }

                    function Wt(t, n, e, r) {
                        this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
                    }

                    function $t(t, n, e, r, i) {
                        var o = t * t,
                            u = o * t;
                        return ((1 - 3 * t + 3 * o - u) * n + (4 - 6 * o + 3 * u) * e + (1 + 3 * t + 3 * o - 3 * u) * r + u * i) / 6
                    }

                    function Gt(t, n) {
                        return function(e) {
                            return t + e * n
                        }
                    }

                    function Zt(t, n, e) {
                        return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
                            function(r) {
                                return Math.pow(t + r * n, e)
                            }
                    }

                    function Jt(t, n) {
                        var e = n - t;
                        return e ? Gt(t, e > 180 || -180 > e ? e - 360 * Math.round(e / 360) : e) : yh(isNaN(t) ? n : t)
                    }

                    function Qt(t) {
                        return 1 === (t = +t) ? Kt : function(n, e) {
                            return e - n ? Zt(n, e, t) : yh(isNaN(n) ? e : n)
                        }
                    }

                    function Kt(t, n) {
                        var e = n - t;
                        return e ? Gt(t, e) : yh(isNaN(t) ? n : t)
                    }

                    function tn(t) {
                        return function(n) {
                            var e, r, i = n.length,
                                o = new Array(i),
                                u = new Array(i),
                                a = new Array(i);
                            for (e = 0; i > e; ++e) r = Et(n[e]), o[e] = r.r || 0, u[e] = r.g || 0, a[e] = r.b || 0;
                            return o = t(o), u = t(u), a = t(a), r.opacity = 1,
                                function(t) {
                                    return r.r = o(t), r.g = u(t), r.b = a(t), r + ""
                                }
                        }
                    }

                    function nn(t) {
                        return function() {
                            return t
                        }
                    }

                    function en(t) {
                        return function(n) {
                            return t(n) + ""
                        }
                    }

                    function rn(t) {
                        return "none" === t ? zh : (fh || (fh = document.createElement("DIV"), lh = document.documentElement, hh = document.defaultView), fh.style.transform = t, t = hh.getComputedStyle(lh.appendChild(fh), null).getPropertyValue("transform"), lh.removeChild(fh), t = t.slice(7, -1).split(","), Rh(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
                    }

                    function on(t) {
                        return null == t ? zh : (ph || (ph = document.createElementNS("http://www.w3.org/2000/svg", "g")), ph.setAttribute("transform", t), (t = ph.transform.baseVal.consolidate()) ? (t = t.matrix, Rh(t.a, t.b, t.c, t.d, t.e, t.f)) : zh)
                    }

                    function un(t, n, e, r) {
                        function i(t) {
                            return t.length ? t.pop() + " " : ""
                        }

                        function o(t, r, i, o, u, a) {
                            if (t !== i || r !== o) {
                                var s = u.push("translate(", null, n, null, e);
                                a.push({
                                    i: s - 4,
                                    x: kh(t, i)
                                }, {
                                    i: s - 2,
                                    x: kh(r, o)
                                })
                            } else(i || o) && u.push("translate(" + i + n + o + e)
                        }

                        function u(t, n, e, o) {
                            t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
                                i: e.push(i(e) + "rotate(", null, r) - 2,
                                x: kh(t, n)
                            })) : n && e.push(i(e) + "rotate(" + n + r)
                        }

                        function a(t, n, e, o) {
                            t !== n ? o.push({
                                i: e.push(i(e) + "skewX(", null, r) - 2,
                                x: kh(t, n)
                            }) : n && e.push(i(e) + "skewX(" + n + r)
                        }

                        function s(t, n, e, r, o, u) {
                            if (t !== e || n !== r) {
                                var a = o.push(i(o) + "scale(", null, ",", null, ")");
                                u.push({
                                    i: a - 4,
                                    x: kh(t, e)
                                }, {
                                    i: a - 2,
                                    x: kh(n, r)
                                })
                            } else(1 !== e || 1 !== r) && o.push(i(o) + "scale(" + e + "," + r + ")")
                        }
                        return function(n, e) {
                            var r = [],
                                i = [];
                            return n = t(n), e = t(e), o(n.translateX, n.translateY, e.translateX, e.translateY, r, i), u(n.rotate, e.rotate, r, i), a(n.skewX, e.skewX, r, i), s(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i), n = e = null,
                                function(t) {
                                    for (var n, e = -1, o = i.length; ++e < o;) r[(n = i[e]).i] = n.x(t);
                                    return r.join("")
                                }
                        }
                    }

                    function an(t) {
                        return ((t = Math.exp(t)) + 1 / t) / 2
                    }

                    function sn(t) {
                        return ((t = Math.exp(t)) - 1 / t) / 2
                    }

                    function cn(t) {
                        return ((t = Math.exp(2 * t)) - 1) / (t + 1)
                    }

                    function fn(t) {
                        return function(n, e) {
                            var r = t((n = zt(n)).h, (e = zt(e)).h),
                                i = Kt(n.s, e.s),
                                o = Kt(n.l, e.l),
                                u = Kt(n.opacity, e.opacity);
                            return function(t) {
                                return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = u(t), n + ""
                            }
                        }
                    }

                    function ln(t, n) {
                        var e = Kt((t = Ut(t)).l, (n = Ut(n)).l),
                            r = Kt(t.a, n.a),
                            i = Kt(t.b, n.b),
                            o = Kt(t.opacity, n.opacity);
                        return function(n) {
                            return t.l = e(n), t.a = r(n), t.b = i(n), t.opacity = o(n), t + ""
                        }
                    }

                    function hn(t) {
                        return function(n, e) {
                            var r = t((n = Ht(n)).h, (e = Ht(e)).h),
                                i = Kt(n.c, e.c),
                                o = Kt(n.l, e.l),
                                u = Kt(n.opacity, e.opacity);
                            return function(t) {
                                return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = u(t), n + ""
                            }
                        }
                    }

                    function pn(t) {
                        return function n(e) {
                            function r(n, r) {
                                var i = t((n = Vt(n)).h, (r = Vt(r)).h),
                                    o = Kt(n.s, r.s),
                                    u = Kt(n.l, r.l),
                                    a = Kt(n.opacity, r.opacity);
                                return function(t) {
                                    return n.h = i(t), n.s = o(t), n.l = u(Math.pow(t, e)), n.opacity = a(t), n + ""
                                }
                            }
                            return e = +e, r.gamma = n, r
                        }(1)
                    }

                    function dn() {
                        return Kh || (ep(gn), Kh = np.now() + tp)
                    }

                    function gn() {
                        Kh = 0
                    }

                    function vn() {
                        this._call = this._time = this._next = null
                    }

                    function _n(t, n, e) {
                        var r = new vn;
                        return r.restart(t, n, e), r
                    }

                    function yn() {
                        dn(), ++$h;
                        for (var t, n = dh; n;)(t = Kh - n._time) >= 0 && n._call.call(null, t), n = n._next;
                        --$h
                    }

                    function mn() {
                        Kh = (Qh = np.now()) + tp, $h = Gh = 0;
                        try {
                            yn()
                        } finally {
                            $h = 0, bn(), Kh = 0
                        }
                    }

                    function xn() {
                        var t = np.now(),
                            n = t - Qh;
                        n > Jh && (tp -= n, Qh = t)
                    }

                    function bn() {
                        for (var t, n, e = dh, r = 1 / 0; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : dh = n);
                        gh = t, wn(r)
                    }

                    function wn(t) {
                        if (!$h) {
                            Gh && (Gh = clearTimeout(Gh));
                            var n = t - Kh;
                            n > 24 ? (1 / 0 > t && (Gh = setTimeout(mn, n)), Zh && (Zh = clearInterval(Zh))) : (Zh || (Qh = Kh, Zh = setInterval(xn, Jh)), $h = 1, ep(mn))
                        }
                    }

                    function Mn(t, n) {
                        var e = t.__transition;
                        if (!e || !(e = e[n]) || e.state > ap) throw new Error("too late");
                        return e
                    }

                    function kn(t, n) {
                        var e = t.__transition;
                        if (!e || !(e = e[n]) || e.state > cp) throw new Error("too late");
                        return e
                    }

                    function Tn(t, n) {
                        var e = t.__transition;
                        if (!e || !(e = e[n])) throw new Error("too late");
                        return e
                    }

                    function Sn(t, n, e) {
                        function r(t) {
                            e.state = sp, e.timer.restart(i, e.delay, e.time), e.delay <= t && i(t - e.delay)
                        }

                        function i(r) {
                            var c, f, l, h;
                            if (e.state !== sp) return u();
                            for (c in s)
                                if (h = s[c], h.name === e.name) {
                                    if (h.state === fp) return rp(i);
                                    h.state === lp ? (h.state = pp, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete s[c]) : n > +c && (h.state = pp, h.timer.stop(), delete s[c])
                                }
                            if (rp(function() {
                                    e.state === fp && (e.state = lp, e.timer.restart(o, e.delay, e.time), o(r))
                                }), e.state = cp, e.on.call("start", t, t.__data__, e.index, e.group), e.state === cp) {
                                for (e.state = fp, a = new Array(l = e.tween.length), c = 0, f = -1; l > c; ++c)(h = e.tween[c].value.call(t, t.__data__, e.index, e.group)) && (a[++f] = h);
                                a.length = f + 1
                            }
                        }

                        function o(n) {
                            for (var r = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(u), e.state = hp, 1), i = -1, o = a.length; ++i < o;) a[i].call(null, r);
                            e.state === hp && (e.on.call("end", t, t.__data__, e.index, e.group), u())
                        }

                        function u() {
                            e.state = pp, e.timer.stop(), delete s[n];
                            for (var r in s) return;
                            delete t.__transition
                        }
                        var a, s = t.__transition;
                        s[n] = e, e.timer = _n(r, 0, e.time)
                    }

                    function Nn(t, n) {
                        var e, r;
                        return function() {
                            var i = kn(this, t),
                                o = i.tween;
                            if (o !== e) {
                                r = e = o;
                                for (var u = 0, a = r.length; a > u; ++u)
                                    if (r[u].name === n) {
                                        r = r.slice(), r.splice(u, 1);
                                        break
                                    }
                            }
                            i.tween = r
                        }
                    }

                    function En(t, n, e) {
                        var r, i;
                        if ("function" != typeof e) throw new Error;
                        return function() {
                            var o = kn(this, t),
                                u = o.tween;
                            if (u !== r) {
                                i = (r = u).slice();
                                for (var a = {
                                        name: n,
                                        value: e
                                    }, s = 0, c = i.length; c > s; ++s)
                                    if (i[s].name === n) {
                                        i[s] = a;
                                        break
                                    }
                                s === c && i.push(a)
                            }
                            o.tween = i
                        }
                    }

                    function An(t, n, e) {
                        var r = t._id;
                        return t.each(function() {
                                var t = kn(this, r);
                                (t.value || (t.value = {}))[n] = e.apply(this, arguments)
                            }),
                            function(t) {
                                return Tn(t, r).value[n]
                            }
                    }

                    function Cn(t) {
                        return function() {
                            this.removeAttribute(t)
                        }
                    }

                    function Pn(t) {
                        return function() {
                            this.removeAttributeNS(t.space, t.local)
                        }
                    }

                    function zn(t, n, e) {
                        var r, i;
                        return function() {
                            var o = this.getAttribute(t);
                            return o === e ? null : o === r ? i : i = n(r = o, e)
                        }
                    }

                    function Rn(t, n, e) {
                        var r, i;
                        return function() {
                            var o = this.getAttributeNS(t.space, t.local);
                            return o === e ? null : o === r ? i : i = n(r = o, e)
                        }
                    }

                    function qn(t, n, e) {
                        var r, i, o;
                        return function() {
                            var u, a = e(this);
                            return null == a ? void this.removeAttribute(t) : (u = this.getAttribute(t), u === a ? null : u === r && a === i ? o : o = n(r = u, i = a))
                        }
                    }

                    function Ln(t, n, e) {
                        var r, i, o;
                        return function() {
                            var u, a = e(this);
                            return null == a ? void this.removeAttributeNS(t.space, t.local) : (u = this.getAttributeNS(t.space, t.local), u === a ? null : u === r && a === i ? o : o = n(r = u, i = a))
                        }
                    }

                    function Un(t, n) {
                        function e() {
                            var e = this,
                                r = n.apply(e, arguments);
                            return r && function(n) {
                                e.setAttributeNS(t.space, t.local, r(n))
                            }
                        }
                        return e._value = n, e
                    }

                    function On(t, n) {
                        function e() {
                            var e = this,
                                r = n.apply(e, arguments);
                            return r && function(n) {
                                e.setAttribute(t, r(n))
                            }
                        }
                        return e._value = n, e
                    }

                    function Dn(t, n) {
                        return function() {
                            Mn(this, t).delay = +n.apply(this, arguments)
                        }
                    }

                    function jn(t, n) {
                        return n = +n,
                            function() {
                                Mn(this, t).delay = n
                            }
                    }

                    function Fn(t, n) {
                        return function() {
                            kn(this, t).duration = +n.apply(this, arguments)
                        }
                    }

                    function In(t, n) {
                        return n = +n,
                            function() {
                                kn(this, t).duration = n
                            }
                    }

                    function Yn(t, n) {
                        if ("function" != typeof n) throw new Error;
                        return function() {
                            kn(this, t).ease = n
                        }
                    }

                    function Hn(t) {
                        return (t + "").trim().split(/^|\s+/).every(function(t) {
                            var n = t.indexOf(".");
                            return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
                        })
                    }

                    function Bn(t, n, e) {
                        var r, i, o = Hn(n) ? Mn : kn;
                        return function() {
                            var u = o(this, t),
                                a = u.on;
                            a !== r && (i = (r = a).copy()).on(n, e), u.on = i
                        }
                    }

                    function Xn(t) {
                        return function() {
                            var n = this.parentNode;
                            for (var e in this.__transition)
                                if (+e !== t) return;
                            n && n.removeChild(this)
                        }
                    }

                    function Vn(t, n) {
                        var e, r, i;
                        return function() {
                            var o = cl(this).getComputedStyle(this, null),
                                u = o.getPropertyValue(t),
                                a = (this.style.removeProperty(t), o.getPropertyValue(t));
                            return u === a ? null : u === e && a === r ? i : i = n(e = u, r = a)
                        }
                    }

                    function Wn(t) {
                        return function() {
                            this.style.removeProperty(t)
                        }
                    }

                    function $n(t, n, e) {
                        var r, i;
                        return function() {
                            var o = cl(this).getComputedStyle(this, null).getPropertyValue(t);
                            return o === e ? null : o === r ? i : i = n(r = o, e)
                        }
                    }

                    function Gn(t, n, e) {
                        var r, i, o;
                        return function() {
                            var u = cl(this).getComputedStyle(this, null),
                                a = u.getPropertyValue(t),
                                s = e(this);
                            return null == s && (this.style.removeProperty(t), s = u.getPropertyValue(t)), a === s ? null : a === r && s === i ? o : o = n(r = a, i = s)
                        }
                    }

                    function Zn(t, n, e) {
                        function r() {
                            var r = this,
                                i = n.apply(r, arguments);
                            return i && function(n) {
                                r.style.setProperty(t, i(n), e)
                            }
                        }
                        return r._value = n, r
                    }

                    function Jn(t) {
                        return function() {
                            this.textContent = t
                        }
                    }

                    function Qn(t) {
                        return function() {
                            var n = t(this);
                            this.textContent = null == n ? "" : n
                        }
                    }

                    function Kn(t, n, e, r) {
                        this._groups = t, this._parents = n, this._name = e, this._id = r
                    }

                    function te(t) {
                        return gt().transition(t)
                    }

                    function ne() {
                        return ++Up
                    }

                    function ee(t) {
                        return +t
                    }

                    function re(t) {
                        return t * t
                    }

                    function ie(t) {
                        return t * (2 - t)
                    }

                    function oe(t) {
                        return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
                    }

                    function ue(t) {
                        return t * t * t
                    }

                    function ae(t) {
                        return --t * t * t + 1
                    }

                    function se(t) {
                        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
                    }

                    function ce(t) {
                        return 1 - Math.cos(t * Hp)
                    }

                    function fe(t) {
                        return Math.sin(t * Hp)
                    }

                    function le(t) {
                        return (1 - Math.cos(Yp * t)) / 2
                    }

                    function he(t) {
                        return Math.pow(2, 10 * t - 10)
                    }

                    function pe(t) {
                        return 1 - Math.pow(2, -10 * t)
                    }

                    function de(t) {
                        return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2
                    }

                    function ge(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    }

                    function ve(t) {
                        return Math.sqrt(1 - --t * t)
                    }

                    function _e(t) {
                        return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
                    }

                    function ye(t) {
                        return 1 - me(1 - t)
                    }

                    function me(t) {
                        return (t = +t) < Bp ? Kp * t * t : Vp > t ? Kp * (t -= Xp) * t + Wp : Gp > t ? Kp * (t -= $p) * t + Zp : Kp * (t -= Jp) * t + Qp
                    }

                    function xe(t) {
                        return ((t *= 2) <= 1 ? 1 - me(1 - t) : me(t - 1) + 1) / 2
                    }

                    function be(t, n) {
                        for (var e; !(e = t.__transition) || !(e = e[n]);)
                            if (!(t = t.parentNode)) return fd.time = dn(), fd;
                        return e
                    }

                    function we() {
                        t.event.stopImmediatePropagation()
                    }

                    function Me(t) {
                        return {
                            type: t
                        }
                    }

                    function ke() {
                        return !t.event.button
                    }

                    function Te() {
                        var t = this.ownerSVGElement || this;
                        return [
                            [0, 0],
                            [t.width.baseVal.value, t.height.baseVal.value]
                        ]
                    }

                    function Se(t) {
                        for (; !t.__brush;)
                            if (!(t = t.parentNode)) return;
                        return t.__brush
                    }

                    function Ne(t) {
                        return t[0][0] === t[1][0] || t[0][1] === t[1][1]
                    }

                    function Ee(t) {
                        var n = t.__brush;
                        return n ? n.dim.output(n.selection) : null
                    }

                    function Ae() {
                        return Pe(bd)
                    }

                    function Ce() {
                        return Pe(wd)
                    }

                    function Pe(n) {
                        function e(t) {
                            var e = t.property("__brush", a).selectAll(".overlay").data([Me("overlay")]);
                            e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", kd.overlay).merge(e).each(function() {
                                var t = Se(this).extent;
                                Ml(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1])
                            }), t.selectAll(".selection").data([Me("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", kd.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
                            var i = t.selectAll(".handle").data(n.handles, function(t) {
                                return t.type
                            });
                            i.exit().remove(), i.enter().append("rect").attr("class", function(t) {
                                return "handle handle--" + t.type
                            }).attr("cursor", function(t) {
                                return kd[t.type]
                            }), t.each(r).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", u)
                        }

                        function r() {
                            var t = Ml(this),
                                n = Se(this).selection;
                            n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]), t.selectAll(".handle").style("display", null).attr("x", function(t) {
                                return "e" === t.type[t.type.length - 1] ? n[1][0] - h / 2 : n[0][0] - h / 2
                            }).attr("y", function(t) {
                                return "s" === t.type[0] ? n[1][1] - h / 2 : n[0][1] - h / 2
                            }).attr("width", function(t) {
                                return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + h : h
                            }).attr("height", function(t) {
                                return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + h : h
                            })) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null)
                        }

                        function i(t, n) {
                            return t.__brush.emitter || new o(t, n)
                        }

                        function o(t, n) {
                            this.that = t, this.args = n, this.state = t.__brush, this.active = 0
                        }

                        function u() {
                            function e() {
                                var t = If(k);
                                !U || w || M || (Math.abs(t[0] - D[0]) > Math.abs(t[1] - D[1]) ? M = !0 : w = !0), D = t, b = !0, vd(), o()
                            }

                            function o() {
                                var t;
                                switch (m = D[0] - O[0], x = D[1] - O[1], S) {
                                    case yd:
                                    case _d:
                                        N && (m = Math.max(z - l, Math.min(q - g, m)), h = l + m, v = g + m), E && (x = Math.max(R - p, Math.min(L - _, x)), d = p + x, y = _ + x);
                                        break;
                                    case md:
                                        0 > N ? (m = Math.max(z - l, Math.min(q - l, m)), h = l + m, v = g) : N > 0 && (m = Math.max(z - g, Math.min(q - g, m)), h = l, v = g + m), 0 > E ? (x = Math.max(R - p, Math.min(L - p, x)), d = p + x, y = _) : E > 0 && (x = Math.max(R - _, Math.min(L - _, x)), d = p, y = _ + x);
                                        break;
                                    case xd:
                                        N && (h = Math.max(z, Math.min(q, l - m * N)), v = Math.max(z, Math.min(q, g + m * N))), E && (d = Math.max(R, Math.min(L, p - x * E)), y = Math.max(R, Math.min(L, _ + x * E)))
                                }
                                h > v && (N *= -1, t = l, l = g, g = t, t = h, h = v, v = t, T in Td && I.attr("cursor", kd[T = Td[T]])), d > y && (E *= -1, t = p, p = _, _ = t, t = d, d = y, y = t, T in Sd && I.attr("cursor", kd[T = Sd[T]])), A.selection && (P = A.selection), w && (h = P[0][0], v = P[1][0]), M && (d = P[0][1], y = P[1][1]), (P[0][0] !== h || P[0][1] !== d || P[1][0] !== v || P[1][1] !== y) && (A.selection = [
                                    [h, d],
                                    [v, y]
                                ], r.call(k), j.brush())
                            }

                            function u() {
                                if (we(), t.event.touches) {
                                    if (t.event.touches.length) return;
                                    s && clearTimeout(s), s = setTimeout(function() {
                                        s = null
                                    }, 500), F.on("touchmove.brush touchend.brush touchcancel.brush", null)
                                } else _t(t.event.view, b), Y.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
                                F.attr("pointer-events", "all"), I.attr("cursor", kd.overlay), A.selection && (P = A.selection), Ne(P) && (A.selection = null, r.call(k)), j.end()
                            }

                            function a() {
                                switch (t.event.keyCode) {
                                    case 16:
                                        U = N && E;
                                        break;
                                    case 18:
                                        S === md && (N && (g = v - m * N, l = h + m * N), E && (_ = y - x * E, p = d + x * E), S = xd, o());
                                        break;
                                    case 32:
                                        (S === md || S === xd) && (0 > N ? g = v - m : N > 0 && (l = h - m), 0 > E ? _ = y - x : E > 0 && (p = d - x), S = yd, I.attr("cursor", kd.selection), o());
                                        break;
                                    default:
                                        return
                                }
                                vd()
                            }

                            function c() {
                                switch (t.event.keyCode) {
                                    case 16:
                                        U && (w = M = U = !1, o());
                                        break;
                                    case 18:
                                        S === xd && (0 > N ? g = v : N > 0 && (l = h), 0 > E ? _ = y : E > 0 && (p = d), S = md, o());
                                        break;
                                    case 32:
                                        S === yd && (t.event.altKey ? (N && (g = v - m * N, l = h + m * N), E && (_ = y - x * E, p = d + x * E), S = xd) : (0 > N ? g = v : N > 0 && (l = h), 0 > E ? _ = y : E > 0 && (p = d), S = md), I.attr("cursor", kd[T]), o());
                                        break;
                                    default:
                                        return
                                }
                                vd()
                            }
                            if (t.event.touches) {
                                if (t.event.changedTouches.length < t.event.touches.length) return vd()
                            } else if (s) return;
                            if (f.apply(this, arguments)) {
                                var l, h, p, d, g, v, _, y, m, x, b, w, M, k = this,
                                    T = t.event.target.__data__.type,
                                    S = "selection" === (t.event.metaKey ? T = "overlay" : T) ? _d : t.event.altKey ? xd : md,
                                    N = n === wd ? null : Nd[T],
                                    E = n === bd ? null : Ed[T],
                                    A = Se(k),
                                    C = A.extent,
                                    P = A.selection,
                                    z = C[0][0],
                                    R = C[0][1],
                                    q = C[1][0],
                                    L = C[1][1],
                                    U = N && E && t.event.shiftKey,
                                    O = If(k),
                                    D = O,
                                    j = i(k, arguments).beforestart();
                                "overlay" === T ? A.selection = P = [
                                    [l = n === wd ? z : O[0], p = n === bd ? R : O[1]],
                                    [g = n === wd ? q : l, _ = n === bd ? L : p]
                                ] : (l = P[0][0], p = P[0][1], g = P[1][0], _ = P[1][1]), h = l, d = p, v = g, y = _;
                                var F = Ml(k).attr("pointer-events", "none"),
                                    I = F.selectAll(".overlay").attr("cursor", kd[T]);
                                if (t.event.touches) F.on("touchmove.brush", e, !0).on("touchend.brush touchcancel.brush", u, !0);
                                else {
                                    var Y = Ml(t.event.view).on("keydown.brush", a, !0).on("keyup.brush", c, !0).on("mousemove.brush", e, !0).on("mouseup.brush", u, !0);
                                    El(t.event.view)
                                }
                                we(), gp(k), r.call(k), j.start()
                            }
                        }

                        function a() {
                            var t = this.__brush || {
                                selection: null
                            };
                            return t.extent = c.apply(this, arguments), t.dim = n, t
                        }
                        var s, c = Te,
                            f = ke,
                            l = d(e, "start", "brush", "end"),
                            h = 6;
                        return e.move = function(t, e) {
                            t.selection ? t.on("start.brush", function() {
                                i(this, arguments).beforestart().start()
                            }).on("interrupt.brush end.brush", function() {
                                i(this, arguments).end()
                            }).tween("brush", function() {
                                function t(t) {
                                    u.selection = 1 === t && Ne(c) ? null : f(t), r.call(o), a.brush()
                                }
                                var o = this,
                                    u = o.__brush,
                                    a = i(o, arguments),
                                    s = u.selection,
                                    c = n.input("function" == typeof e ? e.apply(this, arguments) : e, u.extent),
                                    f = Ah(s, c);
                                return s && c ? t : t(1)
                            }) : t.each(function() {
                                var t = this,
                                    o = arguments,
                                    u = t.__brush,
                                    a = n.input("function" == typeof e ? e.apply(t, o) : e, u.extent),
                                    s = i(t, o).beforestart();
                                gp(t), u.selection = null == a || Ne(a) ? null : a, r.call(t), s.start().brush().end()
                            })
                        }, o.prototype = {
                            beforestart: function() {
                                return 1 === ++this.active && (this.state.emitter = this, this.starting = !0), this
                            },
                            start: function() {
                                return this.starting && (this.starting = !1, this.emit("start")), this
                            },
                            brush: function() {
                                return this.emit("brush"), this
                            },
                            end: function() {
                                return 0 === --this.active && (delete this.state.emitter, this.emit("end")), this
                            },
                            emit: function(t) {
                                E(new gd(e, t, n.output(this.state.selection)), l.apply, l, [t, this.that, this.args])
                            }
                        }, e.extent = function(t) {
                            return arguments.length ? (c = "function" == typeof t ? t : dd([
                                [+t[0][0], +t[0][1]],
                                [+t[1][0], +t[1][1]]
                            ]), e) : c
                        }, e.filter = function(t) {
                            return arguments.length ? (f = "function" == typeof t ? t : dd(!!t), e) : f
                        }, e.handleSize = function(t) {
                            return arguments.length ? (h = +t, e) : h
                        }, e.on = function() {
                            var t = l.on.apply(l, arguments);
                            return t === l ? e : t
                        }, e
                    }

                    function ze(t) {
                        return function(n, e) {
                            return t(n.source.value + n.target.value, e.source.value + e.target.value)
                        }
                    }

                    function Re() {
                        this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
                    }

                    function qe() {
                        return new Re
                    }

                    function Le(t) {
                        return t.source
                    }

                    function Ue(t) {
                        return t.target
                    }

                    function Oe(t) {
                        return t.radius
                    }

                    function De(t) {
                        return t.startAngle
                    }

                    function je(t) {
                        return t.endAngle
                    }

                    function Fe() {}

                    function Ie(t, n) {
                        var e = new Fe;
                        if (t instanceof Fe) t.each(function(t, n) {
                            e.set(n, t)
                        });
                        else if (Array.isArray(t)) {
                            var r, i = -1,
                                o = t.length;
                            if (null == n)
                                for (; ++i < o;) e.set(i, t[i]);
                            else
                                for (; ++i < o;) e.set(n(r = t[i], i, t), r)
                        } else if (t)
                            for (var u in t) e.set(u, t[u]);
                        return e
                    }

                    function Ye() {
                        return {}
                    }

                    function He(t, n, e) {
                        t[n] = e
                    }

                    function Be() {
                        return Ie()
                    }

                    function Xe(t, n, e) {
                        t.set(n, e)
                    }

                    function Ve() {}

                    function We(t, n) {
                        var e = new Ve;
                        if (t instanceof Ve) t.each(function(t) {
                            e.add(t)
                        });
                        else if (t) {
                            var r = -1,
                                i = t.length;
                            if (null == n)
                                for (; ++r < i;) e.add(t[r]);
                            else
                                for (; ++r < i;) e.add(n(t[r], r, t))
                        }
                        return e
                    }

                    function $e(t) {
                        return new Function("d", "return {" + t.map(function(t, n) {
                            return JSON.stringify(t) + ": d[" + n + "]"
                        }).join(",") + "}")
                    }

                    function Ge(t, n) {
                        var e = $e(t);
                        return function(r, i) {
                            return n(e(r), i, t)
                        }
                    }

                    function Ze(t) {
                        var n = Object.create(null),
                            e = [];
                        return t.forEach(function(t) {
                            for (var r in t) r in n || e.push(n[r] = r)
                        }), e
                    }

                    function Je(t, n, e, r) {
                        if (isNaN(n) || isNaN(e)) return t;
                        var i, o, u, a, s, c, f, l, h, p = t._root,
                            d = {
                                data: r
                            },
                            g = t._x0,
                            v = t._y0,
                            _ = t._x1,
                            y = t._y1;
                        if (!p) return t._root = d, t;
                        for (; p.length;)
                            if ((c = n >= (o = (g + _) / 2)) ? g = o : _ = o, (f = e >= (u = (v + y) / 2)) ? v = u : y = u, i = p, !(p = p[l = f << 1 | c])) return i[l] = d, t;
                        if (a = +t._x.call(null, p.data), s = +t._y.call(null, p.data), n === a && e === s) return d.next = p, i ? i[l] = d : t._root = d, t;
                        do i = i ? i[l] = new Array(4) : t._root = new Array(4), (c = n >= (o = (g + _) / 2)) ? g = o : _ = o, (f = e >= (u = (v + y) / 2)) ? v = u : y = u; while ((l = f << 1 | c) === (h = (s >= u) << 1 | a >= o));
                        return i[h] = p, i[l] = d, t
                    }

                    function Qe(t) {
                        var n, e, r, i, o = t.length,
                            u = new Array(o),
                            a = new Array(o),
                            s = 1 / 0,
                            c = 1 / 0,
                            f = -(1 / 0),
                            l = -(1 / 0);
                        for (e = 0; o > e; ++e) isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (u[e] = r, a[e] = i, s > r && (s = r), r > f && (f = r), c > i && (c = i), i > l && (l = i));
                        for (s > f && (s = this._x0, f = this._x1), c > l && (c = this._y0, l = this._y1), this.cover(s, c).cover(f, l), e = 0; o > e; ++e) Je(this, u[e], a[e], t[e]);
                        return this
                    }

                    function Ke(t) {
                        for (var n = 0, e = t.length; e > n; ++n) this.remove(t[n]);
                        return this
                    }

                    function tr(t) {
                        return t[0]
                    }

                    function nr(t) {
                        return t[1]
                    }

                    function er(t, n, e) {
                        var r = new rr(null == n ? tr : n, null == e ? nr : e, NaN, NaN, NaN, NaN);
                        return null == t ? r : r.addAll(t)
                    }

                    function rr(t, n, e, r, i, o) {
                        this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0
                    }

                    function ir(t) {
                        for (var n = {
                                data: t.data
                            }, e = n; t = t.next;) e = e.next = {
                            data: t.data
                        };
                        return n
                    }

                    function or(t) {
                        return t.x + t.vx
                    }

                    function ur(t) {
                        return t.y + t.vy
                    }

                    function ar(t) {
                        return t.index
                    }

                    function sr(t, n) {
                        var e = t.get(n);
                        if (!e) throw new Error("missing: " + n);
                        return e
                    }

                    function cr(t) {
                        return t.x
                    }

                    function fr(t) {
                        return t.y
                    }

                    function lr(t) {
                        return new hr(t)
                    }

                    function hr(t) {
                        if (!(n = Ig.exec(t))) throw new Error("invalid format: " + t);
                        var n, e = n[1] || " ",
                            r = n[2] || ">",
                            i = n[3] || "-",
                            o = n[4] || "",
                            u = !!n[5],
                            a = n[6] && +n[6],
                            s = !!n[7],
                            c = n[8] && +n[8].slice(1),
                            f = n[9] || "";
                        "n" === f ? (s = !0, f = "g") : Fg[f] || (f = ""), (u || "0" === e && "=" === r) && (u = !0, e = "0", r = "="), this.fill = e, this.align = r, this.sign = i, this.symbol = o, this.zero = u, this.width = a, this.comma = s, this.precision = c, this.type = f
                    }

                    function pr(n) {
                        return Yg = Xg(n), t.format = Yg.format, t.formatPrefix = Yg.formatPrefix, Yg
                    }

                    function dr() {
                        this.reset()
                    }

                    function gr(t, n, e) {
                        var r = t.s = n + e,
                            i = r - n,
                            o = r - i;
                        t.t = n - o + (e - i)
                    }

                    function vr(t) {
                        return t > 1 ? 0 : -1 > t ? Cv : Math.acos(t)
                    }

                    function _r(t) {
                        return t > 1 ? Pv : -1 > t ? -Pv : Math.asin(t)
                    }

                    function yr(t) {
                        return (t = Bv(t / 2)) * t
                    }

                    function mr() {}

                    function xr(t, n) {
                        t && Gv.hasOwnProperty(t.type) && Gv[t.type](t, n)
                    }

                    function br(t, n, e) {
                        var r, i = -1,
                            o = t.length - e;
                        for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
                        n.lineEnd()
                    }

                    function wr(t, n) {
                        var e = -1,
                            r = t.length;
                        for (n.polygonStart(); ++e < r;) br(t[e], n, 1);
                        n.polygonEnd()
                    }

                    function Mr() {
                        Kv.point = Tr
                    }

                    function kr() {
                        Sr(Zg, Jg)
                    }

                    function Tr(t, n) {
                        Kv.point = Sr, Zg = t, Jg = n, t *= Lv, n *= Lv, Qg = t, Kg = jv(n = n / 2 + zv), tv = Bv(n)
                    }

                    function Sr(t, n) {
                        t *= Lv, n *= Lv, n = n / 2 + zv;
                        var e = t - Qg,
                            r = e >= 0 ? 1 : -1,
                            i = r * e,
                            o = jv(n),
                            u = Bv(n),
                            a = tv * u,
                            s = Kg * o + a * jv(i),
                            c = a * r * Bv(i);
                        Jv.add(Dv(c, s)), Qg = t, Kg = o, tv = u
                    }

                    function Nr(t) {
                        return [Dv(t[1], t[0]), _r(t[2])]
                    }

                    function Er(t) {
                        var n = t[0],
                            e = t[1],
                            r = jv(e);
                        return [r * jv(n), r * Bv(n), Bv(e)]
                    }

                    function Ar(t, n) {
                        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
                    }

                    function Cr(t, n) {
                        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
                    }

                    function Pr(t, n) {
                        t[0] += n[0], t[1] += n[1], t[2] += n[2]
                    }

                    function zr(t, n) {
                        return [t[0] * n, t[1] * n, t[2] * n]
                    }

                    function Rr(t) {
                        var n = Vv(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
                        t[0] /= n, t[1] /= n, t[2] /= n
                    }

                    function qr(t, n) {
                        cv.push(fv = [nv = t, rv = t]), ev > n && (ev = n), n > iv && (iv = n)
                    }

                    function Lr(t, n) {
                        var e = Er([t * Lv, n * Lv]);
                        if (sv) {
                            var r = Cr(sv, e),
                                i = [r[1], -r[0], 0],
                                o = Cr(i, r);
                            Rr(o), o = Nr(o);
                            var u, a = t - ov,
                                s = a > 0 ? 1 : -1,
                                c = o[0] * qv * s,
                                f = Uv(a) > 180;
                            f ^ (c > s * ov && s * t > c) ? (u = o[1] * qv, u > iv && (iv = u)) : (c = (c + 360) % 360 - 180, f ^ (c > s * ov && s * t > c) ? (u = -o[1] * qv, ev > u && (ev = u)) : (ev > n && (ev = n), n > iv && (iv = n))), f ? ov > t ? Ir(nv, t) > Ir(nv, rv) && (rv = t) : Ir(t, rv) > Ir(nv, rv) && (nv = t) : rv >= nv ? (nv > t && (nv = t), t > rv && (rv = t)) : t > ov ? Ir(nv, t) > Ir(nv, rv) && (rv = t) : Ir(t, rv) > Ir(nv, rv) && (nv = t)
                        } else cv.push(fv = [nv = t, rv = t]);
                        ev > n && (ev = n), n > iv && (iv = n), sv = e, ov = t
                    }

                    function Ur() {
                        e_.point = Lr
                    }

                    function Or() {
                        fv[0] = nv, fv[1] = rv, e_.point = qr, sv = null
                    }

                    function Dr(t, n) {
                        if (sv) {
                            var e = t - ov;
                            n_.add(Uv(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
                        } else uv = t, av = n;
                        Kv.point(t, n), Lr(t, n)
                    }

                    function jr() {
                        Kv.lineStart()
                    }

                    function Fr() {
                        Dr(uv, av), Kv.lineEnd(), Uv(n_) > Ev && (nv = -(rv = 180)), fv[0] = nv, fv[1] = rv, sv = null
                    }

                    function Ir(t, n) {
                        return (n -= t) < 0 ? n + 360 : n
                    }

                    function Yr(t, n) {
                        return t[0] - n[0]
                    }

                    function Hr(t, n) {
                        return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
                    }

                    function Br(t, n) {
                        t *= Lv, n *= Lv;
                        var e = jv(n);
                        Xr(e * jv(t), e * Bv(t), Bv(n))
                    }

                    function Xr(t, n, e) {
                        ++lv, pv += (t - pv) / lv, dv += (n - dv) / lv, gv += (e - gv) / lv
                    }

                    function Vr() {
                        i_.point = Wr
                    }

                    function Wr(t, n) {
                        t *= Lv, n *= Lv;
                        var e = jv(n);
                        kv = e * jv(t), Tv = e * Bv(t), Sv = Bv(n), i_.point = $r, Xr(kv, Tv, Sv)
                    }

                    function $r(t, n) {
                        t *= Lv, n *= Lv;
                        var e = jv(n),
                            r = e * jv(t),
                            i = e * Bv(t),
                            o = Bv(n),
                            u = Dv(Vv((u = Tv * o - Sv * i) * u + (u = Sv * r - kv * o) * u + (u = kv * i - Tv * r) * u), kv * r + Tv * i + Sv * o);
                        hv += u, vv += u * (kv + (kv = r)), _v += u * (Tv + (Tv = i)), yv += u * (Sv + (Sv = o)), Xr(kv, Tv, Sv)
                    }

                    function Gr() {
                        i_.point = Br
                    }

                    function Zr() {
                        i_.point = Qr
                    }

                    function Jr() {
                        Kr(wv, Mv), i_.point = Br
                    }

                    function Qr(t, n) {
                        wv = t, Mv = n, t *= Lv, n *= Lv, i_.point = Kr;
                        var e = jv(n);
                        kv = e * jv(t), Tv = e * Bv(t), Sv = Bv(n), Xr(kv, Tv, Sv)
                    }

                    function Kr(t, n) {
                        t *= Lv, n *= Lv;
                        var e = jv(n),
                            r = e * jv(t),
                            i = e * Bv(t),
                            o = Bv(n),
                            u = Tv * o - Sv * i,
                            a = Sv * r - kv * o,
                            s = kv * i - Tv * r,
                            c = Vv(u * u + a * a + s * s),
                            f = _r(c),
                            l = c && -f / c;
                        mv += l * u, xv += l * a, bv += l * s, hv += f, vv += f * (kv + (kv = r)), _v += f * (Tv + (Tv = i)), yv += f * (Sv + (Sv = o)), Xr(kv, Tv, Sv)
                    }

                    function ti(t, n) {
                        return [t > Cv ? t - Rv : -Cv > t ? t + Rv : t, n]
                    }

                    function ni(t, n, e) {
                        return (t %= Rv) ? n || e ? a_(ri(t), ii(n, e)) : ri(t) : n || e ? ii(n, e) : ti
                    }

                    function ei(t) {
                        return function(n, e) {
                            return n += t, [n > Cv ? n - Rv : -Cv > n ? n + Rv : n, e]
                        }
                    }

                    function ri(t) {
                        var n = ei(t);
                        return n.invert = ei(-t), n
                    }

                    function ii(t, n) {
                        function e(t, n) {
                            var e = jv(n),
                                a = jv(t) * e,
                                s = Bv(t) * e,
                                c = Bv(n),
                                f = c * r + a * i;
                            return [Dv(s * o - f * u, a * r - c * i), _r(f * o + s * u)]
                        }
                        var r = jv(t),
                            i = Bv(t),
                            o = jv(n),
                            u = Bv(n);
                        return e.invert = function(t, n) {
                            var e = jv(n),
                                a = jv(t) * e,
                                s = Bv(t) * e,
                                c = Bv(n),
                                f = c * o - s * u;
                            return [Dv(s * o + c * u, a * r + f * i), _r(f * r - a * i)]
                        }, e
                    }

                    function oi(t, n, e, r, i, o) {
                        if (e) {
                            var u = jv(n),
                                a = Bv(n),
                                s = r * e;
                            null == i ? (i = n + r * Rv, o = n - s / 2) : (i = ui(u, i), o = ui(u, o), (r > 0 ? o > i : i > o) && (i += r * Rv));
                            for (var c, f = i; r > 0 ? f > o : o > f; f -= s) c = Nr([u, -a * jv(f), -a * Bv(f)]), t.point(c[0], c[1])
                        }
                    }

                    function ui(t, n) {
                        n = Er(n), n[0] -= t, Rr(n);
                        var e = vr(-n[1]);
                        return ((-n[2] < 0 ? -e : e) + Rv - Ev) % Rv
                    }

                    function ai(t, n, e, r) {
                        this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
                    }

                    function si(t) {
                        if (n = t.length) {
                            for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
                            i.n = e = t[0], e.p = i
                        }
                    }

                    function ci(t, n, e, r) {
                        function i(i, o) {
                            return i >= t && e >= i && o >= n && r >= o
                        }

                        function o(i, o, a, c) {
                            var f = 0,
                                l = 0;
                            if (null == i || (f = u(i, a)) !== (l = u(o, a)) || s(i, o) < 0 ^ a > 0) {
                                do c.point(0 === f || 3 === f ? t : e, f > 1 ? r : n); while ((f = (f + a + 4) % 4) !== l)
                            } else c.point(o[0], o[1])
                        }

                        function u(r, i) {
                            return Uv(r[0] - t) < Ev ? i > 0 ? 0 : 3 : Uv(r[0] - e) < Ev ? i > 0 ? 2 : 1 : Uv(r[1] - n) < Ev ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
                        }

                        function a(t, n) {
                            return s(t.x, n.x)
                        }

                        function s(t, n) {
                            var e = u(t, 1),
                                r = u(n, 1);
                            return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
                        }
                        return function(u) {
                            function s(t, n) {
                                i(t, n) && S.point(t, n)
                            }

                            function c() {
                                for (var n = 0, e = 0, i = v.length; i > e; ++e)
                                    for (var o, u, a = v[e], s = 1, c = a.length, f = a[0], l = f[0], h = f[1]; c > s; ++s) o = l, u = h, f = a[s], l = f[0], h = f[1], r >= u ? h > r && (l - o) * (r - u) > (h - u) * (t - o) && ++n : r >= h && (h - u) * (t - o) > (l - o) * (r - u) && --n;
                                return n
                            }

                            function f() {
                                S = N, g = [], v = [], T = !0
                            }

                            function l() {
                                var t = c(),
                                    n = T && t,
                                    e = (g = lf(g)).length;
                                (n || e) && (u.polygonStart(), n && (u.lineStart(), o(null, null, 1, u), u.lineEnd()), e && k_(g, a, t, o, u), u.polygonEnd()), S = u, g = v = _ = null
                            }

                            function h() {
                                E.point = d, v && v.push(_ = []), k = !0, M = !1, b = w = NaN
                            }

                            function p() {
                                g && (d(y, m), x && M && N.rejoin(), g.push(N.result())), E.point = s, M && S.lineEnd()
                            }

                            function d(o, u) {
                                var a = i(o, u);
                                if (v && _.push([o, u]), k) y = o, m = u, x = a, k = !1, a && (S.lineStart(), S.point(o, u));
                                else if (a && M) S.point(o, u);
                                else {
                                    var s = [b = Math.max(S_, Math.min(T_, b)), w = Math.max(S_, Math.min(T_, w))],
                                        c = [o = Math.max(S_, Math.min(T_, o)), u = Math.max(S_, Math.min(T_, u))];
                                    w_(s, c, t, n, e, r) ? (M || (S.lineStart(), S.point(s[0], s[1])), S.point(c[0], c[1]), a || S.lineEnd(), T = !1) : a && (S.lineStart(), S.point(o, u), T = !1)
                                }
                                b = o, w = u, M = a
                            }
                            var g, v, _, y, m, x, b, w, M, k, T, S = u,
                                N = b_(),
                                E = {
                                    point: s,
                                    lineStart: h,
                                    lineEnd: p,
                                    polygonStart: f,
                                    polygonEnd: l
                                };
                            return E
                        }
                    }

                    function fi() {
                        P_.point = hi, P_.lineEnd = li
                    }

                    function li() {
                        P_.point = P_.lineEnd = mr
                    }

                    function hi(t, n) {
                        t *= Lv, n *= Lv, s_ = t, c_ = Bv(n), f_ = jv(n), P_.point = pi
                    }

                    function pi(t, n) {
                        t *= Lv, n *= Lv;
                        var e = Bv(n),
                            r = jv(n),
                            i = Uv(t - s_),
                            o = jv(i),
                            u = Bv(i),
                            a = r * u,
                            s = f_ * e - c_ * r * o,
                            c = c_ * e + f_ * r * o;
                        C_.add(Dv(Vv(a * a + s * s), c)), s_ = t, c_ = e, f_ = r
                    }

                    function di(t, n) {
                        return t && O_.hasOwnProperty(t.type) ? O_[t.type](t, n) : !1
                    }

                    function gi(t, n) {
                        return 0 === L_(t, n)
                    }

                    function vi(t, n) {
                        var e = L_(t[0], t[1]),
                            r = L_(t[0], n),
                            i = L_(n, t[1]);
                        return e + Ev >= r + i
                    }

                    function _i(t, n) {
                        return !!A_(t.map(yi), mi(n))
                    }

                    function yi(t) {
                        return t = t.map(mi), t.pop(), t
                    }

                    function mi(t) {
                        return [t[0] * Lv, t[1] * Lv]
                    }

                    function xi(t, n, e) {
                        var r = Jc(t, n - Ev, e).concat(n);
                        return function(t) {
                            return r.map(function(n) {
                                return [t, n]
                            })
                        }
                    }

                    function bi(t, n, e) {
                        var r = Jc(t, n - Ev, e).concat(n);
                        return function(t) {
                            return r.map(function(n) {
                                return [n, t]
                            })
                        }
                    }

                    function wi() {
                        function t() {
                            return {
                                type: "MultiLineString",
                                coordinates: n()
                            }
                        }

                        function n() {
                            return Jc(Fv(o / v) * v, i, v).map(h).concat(Jc(Fv(c / _) * _, s, _).map(p)).concat(Jc(Fv(r / d) * d, e, d).filter(function(t) {
                                return Uv(t % v) > Ev
                            }).map(f)).concat(Jc(Fv(a / g) * g, u, g).filter(function(t) {
                                return Uv(t % _) > Ev
                            }).map(l))
                        }
                        var e, r, i, o, u, a, s, c, f, l, h, p, d = 10,
                            g = d,
                            v = 90,
                            _ = 360,
                            y = 2.5;
                        return t.lines = function() {
                            return n().map(function(t) {
                                return {
                                    type: "LineString",
                                    coordinates: t
                                }
                            })
                        }, t.outline = function() {
                            return {
                                type: "Polygon",
                                coordinates: [h(o).concat(p(s).slice(1), h(i).reverse().slice(1), p(c).reverse().slice(1))]
                            }
                        }, t.extent = function(n) {
                            return arguments.length ? t.extentMajor(n).extentMinor(n) : t.extentMinor()
                        }, t.extentMajor = function(n) {
                            return arguments.length ? (o = +n[0][0], i = +n[1][0], c = +n[0][1], s = +n[1][1], o > i && (n = o, o = i, i = n), c > s && (n = c, c = s, s = n), t.precision(y)) : [
                                [o, c],
                                [i, s]
                            ]
                        }, t.extentMinor = function(n) {
                            return arguments.length ? (r = +n[0][0], e = +n[1][0], a = +n[0][1], u = +n[1][1], r > e && (n = r, r = e, e = n), a > u && (n = a, a = u, u = n), t.precision(y)) : [
                                [r, a],
                                [e, u]
                            ]
                        }, t.step = function(n) {
                            return arguments.length ? t.stepMajor(n).stepMinor(n) : t.stepMinor()
                        }, t.stepMajor = function(n) {
                            return arguments.length ? (v = +n[0], _ = +n[1], t) : [v, _]
                        }, t.stepMinor = function(n) {
                            return arguments.length ? (d = +n[0], g = +n[1], t) : [d, g]
                        }, t.precision = function(n) {
                            return arguments.length ? (y = +n, f = xi(a, u, 90), l = bi(r, e, y), h = xi(c, s, 90), p = bi(o, i, y), t) : y
                        }, t.extentMajor([
                            [-180, -90 + Ev],
                            [180, 90 - Ev]
                        ]).extentMinor([
                            [-180, -80 - Ev],
                            [180, 80 + Ev]
                        ])
                    }

                    function Mi() {
                        return wi()()
                    }

                    function ki() {
                        H_.point = Ti
                    }

                    function Ti(t, n) {
                        H_.point = Si, l_ = p_ = t, h_ = d_ = n
                    }

                    function Si(t, n) {
                        Y_.add(d_ * t - p_ * n), p_ = t, d_ = n
                    }

                    function Ni() {
                        Si(l_, h_)
                    }

                    function Ei(t, n) {
                        B_ > t && (B_ = t), t > V_ && (V_ = t), X_ > n && (X_ = n), n > W_ && (W_ = n)
                    }

                    function Ai(t, n) {
                        G_ += t, Z_ += n, ++J_
                    }

                    function Ci() {
                        iy.point = Pi
                    }

                    function Pi(t, n) {
                        iy.point = zi, Ai(__ = t, y_ = n)
                    }

                    function zi(t, n) {
                        var e = t - __,
                            r = n - y_,
                            i = Vv(e * e + r * r);
                        Q_ += i * (__ + t) / 2, K_ += i * (y_ + n) / 2, ty += i, Ai(__ = t, y_ = n)
                    }

                    function Ri() {
                        iy.point = Ai
                    }

                    function qi() {
                        iy.point = Ui
                    }

                    function Li() {
                        Oi(g_, v_)
                    }

                    function Ui(t, n) {
                        iy.point = Oi, Ai(g_ = __ = t, v_ = y_ = n)
                    }

                    function Oi(t, n) {
                        var e = t - __,
                            r = n - y_,
                            i = Vv(e * e + r * r);
                        Q_ += i * (__ + t) / 2, K_ += i * (y_ + n) / 2, ty += i, i = y_ * t - __ * n, ny += i * (__ + t), ey += i * (y_ + n), ry += 3 * i, Ai(__ = t, y_ = n)
                    }

                    function Di(t) {
                        this._context = t
                    }

                    function ji(t, n) {
                        ly.point = Fi, uy = sy = t, ay = cy = n
                    }

                    function Fi(t, n) {
                        sy -= t, cy -= n, fy.add(Vv(sy * sy + cy * cy)), sy = t, cy = n
                    }

                    function Ii() {
                        this._string = []
                    }

                    function Yi(t) {
                        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
                    }

                    function Hi(t) {
                        return t.length > 1
                    }

                    function Bi(t, n) {
                        return ((t = t.x)[0] < 0 ? t[1] - Pv - Ev : Pv - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Pv - Ev : Pv - n[1])
                    }

                    function Xi(t) {
                        var n, e = NaN,
                            r = NaN,
                            i = NaN;
                        return {
                            lineStart: function() {
                                t.lineStart(), n = 1
                            },
                            point: function(o, u) {
                                var a = o > 0 ? Cv : -Cv,
                                    s = Uv(o - e);
                                Uv(s - Cv) < Ev ? (t.point(e, r = (r + u) / 2 > 0 ? Pv : -Pv), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), t.point(o, r), n = 0) : i !== a && s >= Cv && (Uv(e - i) < Ev && (e -= i * Ev), Uv(o - a) < Ev && (o -= a * Ev), r = Vi(e, r, o, u), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), n = 0), t.point(e = o, r = u), i = a
                            },
                            lineEnd: function() {
                                t.lineEnd(), e = r = NaN
                            },
                            clean: function() {
                                return 2 - n
                            }
                        }
                    }

                    function Vi(t, n, e, r) {
                        var i, o, u = Bv(t - e);
                        return Uv(u) > Ev ? Ov((Bv(n) * (o = jv(r)) * Bv(e) - Bv(r) * (i = jv(n)) * Bv(t)) / (i * o * u)) : (n + r) / 2
                    }

                    function Wi(t, n, e, r) {
                        var i;
                        if (null == t) i = e * Pv, r.point(-Cv, i), r.point(0, i), r.point(Cv, i), r.point(Cv, 0), r.point(Cv, -i), r.point(0, -i), r.point(-Cv, -i), r.point(-Cv, 0), r.point(-Cv, i);
                        else if (Uv(t[0] - n[0]) > Ev) {
                            var o = t[0] < n[0] ? Cv : -Cv;
                            i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
                        } else r.point(n[0], n[1])
                    }

                    function $i(t) {
                        return function(n) {
                            var e = new Gi;
                            for (var r in t) e[r] = t[r];
                            return e.stream = n, e
                        }
                    }

                    function Gi() {}

                    function Zi(t, n, e) {
                        var r = n[1][0] - n[0][0],
                            i = n[1][1] - n[0][1],
                            o = t.clipExtent && t.clipExtent();
                        t.scale(150).translate([0, 0]), null != o && t.clipExtent(null), Zv(e, t.stream($_));
                        var u = $_.result(),
                            a = Math.min(r / (u[1][0] - u[0][0]), i / (u[1][1] - u[0][1])),
                            s = +n[0][0] + (r - a * (u[1][0] + u[0][0])) / 2,
                            c = +n[0][1] + (i - a * (u[1][1] + u[0][1])) / 2;
                        return null != o && t.clipExtent(o), t.scale(150 * a).translate([s, c])
                    }

                    function Ji(t, n, e) {
                        return Zi(t, [
                            [0, 0], n
                        ], e)
                    }

                    function Qi(t) {
                        return $i({
                            point: function(n, e) {
                                n = t(n, e), this.stream.point(n[0], n[1])
                            }
                        })
                    }

                    function Ki(t, n) {
                        function e(r, i, o, u, a, s, c, f, l, h, p, d, g, v) {
                            var _ = c - r,
                                y = f - i,
                                m = _ * _ + y * y;
                            if (m > 4 * n && g--) {
                                var x = u + h,
                                    b = a + p,
                                    w = s + d,
                                    M = Vv(x * x + b * b + w * w),
                                    k = _r(w /= M),
                                    T = Uv(Uv(w) - 1) < Ev || Uv(o - l) < Ev ? (o + l) / 2 : Dv(b, x),
                                    S = t(T, k),
                                    N = S[0],
                                    E = S[1],
                                    A = N - r,
                                    C = E - i,
                                    P = y * A - _ * C;
                                (P * P / m > n || Uv((_ * A + y * C) / m - .5) > .3 || yy > u * h + a * p + s * d) && (e(r, i, o, u, a, s, N, E, T, x /= M, b /= M, w, g, v), v.point(N, E), e(N, E, T, x, b, w, c, f, l, h, p, d, g, v))
                            }
                        }
                        return function(n) {
                            function r(e, r) {
                                e = t(e, r), n.point(e[0], e[1])
                            }

                            function i() {
                                _ = NaN, w.point = o, n.lineStart()
                            }

                            function o(r, i) {
                                var o = Er([r, i]),
                                    u = t(r, i);
                                e(_, y, v, m, x, b, _ = u[0], y = u[1], v = r, m = o[0], x = o[1], b = o[2], _y, n), n.point(_, y)
                            }

                            function u() {
                                w.point = r, n.lineEnd()
                            }

                            function a() {
                                i(), w.point = s, w.lineEnd = c
                            }

                            function s(t, n) {
                                o(f = t, n), l = _, h = y, p = m, d = x, g = b, w.point = o
                            }

                            function c() {
                                e(_, y, v, m, x, b, l, h, f, p, d, g, _y, n), w.lineEnd = u, u()
                            }
                            var f, l, h, p, d, g, v, _, y, m, x, b, w = {
                                point: r,
                                lineStart: i,
                                lineEnd: u,
                                polygonStart: function() {
                                    n.polygonStart(), w.lineStart = a
                                },
                                polygonEnd: function() {
                                    n.polygonEnd(), w.lineStart = i
                                }
                            };
                            return w
                        }
                    }

                    function to(t) {
                        return no(function() {
                            return t
                        })()
                    }

                    function no(t) {
                        function n(t) {
                            return t = f(t[0] * Lv, t[1] * Lv), [t[0] * v + a, s - t[1] * v]
                        }

                        function e(t) {
                            return t = f.invert((t[0] - a) / v, (s - t[1]) / v), t && [t[0] * qv, t[1] * qv]
                        }

                        function r(t, n) {
                            return t = u(t, n), [t[0] * v + a, s - t[1] * v]
                        }

                        function i() {
                            f = a_(c = ni(b, w, M), u);
                            var t = u(m, x);
                            return a = _ - t[0] * v, s = y + t[1] * v, o()
                        }

                        function o() {
                            return d = g = null, n
                        }
                        var u, a, s, c, f, l, h, p, d, g, v = 150,
                            _ = 480,
                            y = 250,
                            m = 0,
                            x = 0,
                            b = 0,
                            w = 0,
                            M = 0,
                            k = null,
                            T = dy,
                            S = null,
                            N = F_,
                            E = .5,
                            A = my(r, E);
                        return n.stream = function(t) {
                                return d && g === t ? d : d = xy(T(c, A(N(g = t))))
                            }, n.clipAngle = function(t) {
                                return arguments.length ? (T = +t ? gy(k = t * Lv, 6 * Lv) : (k = null, dy), o()) : k * qv
                            }, n.clipExtent = function(t) {
                                return arguments.length ? (N = null == t ? (S = l = h = p = null, F_) : ci(S = +t[0][0], l = +t[0][1], h = +t[1][0], p = +t[1][1]), o()) : null == S ? null : [
                                    [S, l],
                                    [h, p]
                                ]
                            }, n.scale = function(t) {
                                return arguments.length ? (v = +t, i()) : v
                            }, n.translate = function(t) {
                                return arguments.length ? (_ = +t[0], y = +t[1], i()) : [_, y]
                            }, n.center = function(t) {
                                return arguments.length ? (m = t[0] % 360 * Lv, x = t[1] % 360 * Lv, i()) : [m * qv, x * qv]
                            }, n.rotate = function(t) {
                                return arguments.length ? (b = t[0] % 360 * Lv, w = t[1] % 360 * Lv, M = t.length > 2 ? t[2] % 360 * Lv : 0, i()) : [b * qv, w * qv, M * qv]
                            }, n.precision = function(t) {
                                return arguments.length ? (A = my(r, E = t * t), o()) : Vv(E)
                            }, n.fitExtent = function(t, e) {
                                return Zi(n, t, e)
                            }, n.fitSize = function(t, e) {
                                return Ji(n, t, e)
                            },
                            function() {
                                return u = t.apply(this, arguments), n.invert = u.invert && e, i()
                            }
                    }

                    function eo(t) {
                        var n = 0,
                            e = Cv / 3,
                            r = no(t),
                            i = r(n, e);
                        return i.parallels = function(t) {
                            return arguments.length ? r(n = t[0] * Lv, e = t[1] * Lv) : [n * qv, e * qv]
                        }, i
                    }

                    function ro(t) {
                        function n(t, n) {
                            return [t * e, Bv(n) / e]
                        }
                        var e = jv(t);
                        return n.invert = function(t, n) {
                            return [t / e, _r(n * e)]
                        }, n
                    }

                    function io(t, n) {
                        function e(t, n) {
                            var e = Vv(o - 2 * i * Bv(n)) / i;
                            return [e * Bv(t *= i), u - e * jv(t)]
                        }
                        var r = Bv(t),
                            i = (r + Bv(n)) / 2;
                        if (Uv(i) < Ev) return ro(t);
                        var o = 1 + r * (2 * i - r),
                            u = Vv(o) / i;
                        return e.invert = function(t, n) {
                            var e = u - n;
                            return [Dv(t, Uv(e)) / i * Xv(e), _r((o - (t * t + e * e) * i * i) / (2 * i))]
                        }, e
                    }

                    function oo(t) {
                        var n = t.length;
                        return {
                            point: function(e, r) {
                                for (var i = -1; ++i < n;) t[i].point(e, r)
                            },
                            sphere: function() {
                                for (var e = -1; ++e < n;) t[e].sphere()
                            },
                            lineStart: function() {
                                for (var e = -1; ++e < n;) t[e].lineStart()
                            },
                            lineEnd: function() {
                                for (var e = -1; ++e < n;) t[e].lineEnd()
                            },
                            polygonStart: function() {
                                for (var e = -1; ++e < n;) t[e].polygonStart()
                            },
                            polygonEnd: function() {
                                for (var e = -1; ++e < n;) t[e].polygonEnd()
                            }
                        }
                    }

                    function uo(t) {
                        return function(n, e) {
                            var r = jv(n),
                                i = jv(e),
                                o = t(r * i);
                            return [o * i * Bv(n), o * Bv(e)]
                        }
                    }

                    function ao(t) {
                        return function(n, e) {
                            var r = Vv(n * n + e * e),
                                i = t(r),
                                o = Bv(i),
                                u = jv(i);
                            return [Dv(n * o, r * u), _r(r && e * o / r)]
                        }
                    }

                    function so(t, n) {
                        return [t, Yv(Wv((Pv + n) / 2))]
                    }

                    function co(t) {
                        function n() {
                            var n = Cv * a(),
                                u = o(m_(o.rotate()).invert([0, 0]));
                            return c(null == f ? [
                                [u[0] - n, u[1] - n],
                                [u[0] + n, u[1] + n]
                            ] : t === so ? [
                                [Math.max(u[0] - n, f), e],
                                [Math.min(u[0] + n, r), i]
                            ] : [
                                [f, Math.max(u[1] - n, e)],
                                [r, Math.min(u[1] + n, i)]
                            ])
                        }
                        var e, r, i, o = to(t),
                            u = o.center,
                            a = o.scale,
                            s = o.translate,
                            c = o.clipExtent,
                            f = null;
                        return o.scale = function(t) {
                            return arguments.length ? (a(t), n()) : a()
                        }, o.translate = function(t) {
                            return arguments.length ? (s(t), n()) : s()
                        }, o.center = function(t) {
                            return arguments.length ? (u(t), n()) : u()
                        }, o.clipExtent = function(t) {
                            return arguments.length ? (null == t ? f = e = r = i = null : (f = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]), n()) : null == f ? null : [
                                [f, e],
                                [r, i]
                            ]
                        }, n()
                    }

                    function fo(t) {
                        return Wv((Pv + t) / 2)
                    }

                    function lo(t, n) {
                        function e(t, n) {
                            o > 0 ? -Pv + Ev > n && (n = -Pv + Ev) : n > Pv - Ev && (n = Pv - Ev);
                            var e = o / Hv(fo(n), i);
                            return [e * Bv(i * t), o - e * jv(i * t)]
                        }
                        var r = jv(t),
                            i = t === n ? Bv(t) : Yv(r / jv(n)) / Yv(fo(n) / fo(t)),
                            o = r * Hv(fo(t), i) / i;
                        return i ? (e.invert = function(t, n) {
                            var e = o - n,
                                r = Xv(i) * Vv(t * t + e * e);
                            return [Dv(t, Uv(e)) / i * Xv(e), 2 * Ov(Hv(o / r, 1 / i)) - Pv]
                        }, e) : so
                    }

                    function ho(t, n) {
                        return [t, n]
                    }

                    function po(t, n) {
                        function e(t, n) {
                            var e = o - n,
                                r = i * t;
                            return [e * Bv(r), o - e * jv(r)]
                        }
                        var r = jv(t),
                            i = t === n ? Bv(t) : (r - jv(n)) / (n - t),
                            o = r / i + t;
                        return Uv(i) < Ev ? ho : (e.invert = function(t, n) {
                            var e = o - n;
                            return [Dv(t, Uv(e)) / i * Xv(e), o - Xv(i) * Vv(t * t + e * e)]
                        }, e)
                    }

                    function go(t, n) {
                        var e = jv(n),
                            r = jv(t) * e;
                        return [e * Bv(t) / r, Bv(n) / r]
                    }

                    function vo(t, n, e, r) {
                        return 1 === t && 1 === n && 0 === e && 0 === r ? F_ : $i({
                            point: function(i, o) {
                                this.stream.point(i * t + e, o * n + r)
                            }
                        })
                    }

                    function _o(t, n) {
                        return [jv(n) * Bv(t), Bv(n)]
                    }

                    function yo(t, n) {
                        var e = jv(n),
                            r = 1 + jv(t) * e;
                        return [e * Bv(t) / r, Bv(n) / r]
                    }

                    function mo(t, n) {
                        return [Yv(Wv((Pv + n) / 2)), -t]
                    }

                    function xo(t, n) {
                        return t.parent === n.parent ? 1 : 2
                    }

                    function bo(t) {
                        return t.reduce(wo, 0) / t.length
                    }

                    function wo(t, n) {
                        return t + n.x
                    }

                    function Mo(t) {
                        return 1 + t.reduce(ko, 0)
                    }

                    function ko(t, n) {
                        return Math.max(t, n.y)
                    }

                    function To(t) {
                        for (var n; n = t.children;) t = n[0];
                        return t
                    }

                    function So(t) {
                        for (var n; n = t.children;) t = n[n.length - 1];
                        return t
                    }

                    function No(t) {
                        var n = 0,
                            e = t.children,
                            r = e && e.length;
                        if (r)
                            for (; --r >= 0;) n += e[r].value;
                        else n = 1;
                        t.value = n
                    }

                    function Eo(t, n) {
                        if (t === n) return t;
                        var e = t.ancestors(),
                            r = n.ancestors(),
                            i = null;
                        for (t = e.pop(), n = r.pop(); t === n;) i = t, t = e.pop(), n = r.pop();
                        return i
                    }

                    function Ao(t, n) {
                        var e, r, i, o, u, a = new qo(t),
                            s = +t.value && (a.value = t.value),
                            c = [a];
                        for (null == n && (n = Po); e = c.pop();)
                            if (s && (e.value = +e.data.value), (i = n(e.data)) && (u = i.length))
                                for (e.children = new Array(u), o = u - 1; o >= 0; --o) c.push(r = e.children[o] = new qo(i[o])), r.parent = e, r.depth = e.depth + 1;
                        return a.eachBefore(Ro)
                    }

                    function Co() {
                        return Ao(this).eachBefore(zo)
                    }

                    function Po(t) {
                        return t.children
                    }

                    function zo(t) {
                        t.data = t.data.data
                    }

                    function Ro(t) {
                        var n = 0;
                        do t.height = n; while ((t = t.parent) && t.height < ++n)
                    }

                    function qo(t) {
                        this.data = t, this.depth = this.height = 0, this.parent = null
                    }

                    function Lo(t) {
                        this._ = t, this.next = null
                    }

                    function Uo(t, n) {
                        var e = n.x - t.x,
                            r = n.y - t.y,
                            i = t.r - n.r;
                        return i * i + 1e-6 > e * e + r * r
                    }

                    function Oo(t, n) {
                        var e, r, i, o = null,
                            u = t.head;
                        switch (n.length) {
                            case 1:
                                e = Do(n[0]);
                                break;
                            case 2:
                                e = jo(n[0], n[1]);
                                break;
                            case 3:
                                e = Fo(n[0], n[1], n[2])
                        }
                        for (; u;) i = u._, r = u.next, e && Uo(e, i) ? o = u : (o ? (t.tail = o, o.next = null) : t.head = t.tail = null, n.push(i), e = Oo(t, n), n.pop(), t.head ? (u.next = t.head, t.head = u) : (u.next = null, t.head = t.tail = u), o = t.tail, o.next = r), u = r;
                        return t.tail = o, e
                    }

                    function Do(t) {
                        return {
                            x: t.x,
                            y: t.y,
                            r: t.r
                        }
                    }

                    function jo(t, n) {
                        var e = t.x,
                            r = t.y,
                            i = t.r,
                            o = n.x,
                            u = n.y,
                            a = n.r,
                            s = o - e,
                            c = u - r,
                            f = a - i,
                            l = Math.sqrt(s * s + c * c);
                        return {
                            x: (e + o + s / l * f) / 2,
                            y: (r + u + c / l * f) / 2,
                            r: (l + i + a) / 2
                        }
                    }

                    function Fo(t, n, e) {
                        var r = t.x,
                            i = t.y,
                            o = t.r,
                            u = n.x,
                            a = n.y,
                            s = n.r,
                            c = e.x,
                            f = e.y,
                            l = e.r,
                            h = 2 * (r - u),
                            p = 2 * (i - a),
                            d = 2 * (s - o),
                            g = r * r + i * i - o * o - u * u - a * a + s * s,
                            v = 2 * (r - c),
                            _ = 2 * (i - f),
                            y = 2 * (l - o),
                            m = r * r + i * i - o * o - c * c - f * f + l * l,
                            x = v * p - h * _,
                            b = (p * m - _ * g) / x - r,
                            w = (_ * d - p * y) / x,
                            M = (v * g - h * m) / x - i,
                            k = (h * y - v * d) / x,
                            T = w * w + k * k - 1,
                            S = 2 * (b * w + M * k + o),
                            N = b * b + M * M - o * o,
                            E = (-S - Math.sqrt(S * S - 4 * T * N)) / (2 * T);
                        return {
                            x: b + w * E + r,
                            y: M + k * E + i,
                            r: E
                        }
                    }

                    function Io(t, n, e) {
                        var r = t.x,
                            i = t.y,
                            o = n.r + e.r,
                            u = t.r + e.r,
                            a = n.x - r,
                            s = n.y - i,
                            c = a * a + s * s;
                        if (c) {
                            var f = .5 + ((u *= u) - (o *= o)) / (2 * c),
                                l = Math.sqrt(Math.max(0, 2 * o * (u + c) - (u -= c) * u - o * o)) / (2 * c);
                            e.x = r + f * a + l * s, e.y = i + f * s - l * a
                        } else e.x = r + u, e.y = i
                    }

                    function Yo(t, n) {
                        var e = n.x - t.x,
                            r = n.y - t.y,
                            i = t.r + n.r;
                        return i * i - 1e-6 > e * e + r * r
                    }

                    function Ho(t, n, e) {
                        var r = t._,
                            i = t.next._,
                            o = r.r + i.r,
                            u = (r.x * i.r + i.x * r.r) / o - n,
                            a = (r.y * i.r + i.y * r.r) / o - e;
                        return u * u + a * a
                    }

                    function Bo(t) {
                        this._ = t, this.next = null, this.previous = null
                    }

                    function Xo(t) {
                        if (!(i = t.length)) return 0;
                        var n, e, r, i;
                        if (n = t[0], n.x = 0, n.y = 0, !(i > 1)) return n.r;
                        if (e = t[1], n.x = -e.r, e.x = n.r, e.y = 0, !(i > 2)) return n.r + e.r;
                        Io(e, n, r = t[2]);
                        var o, u, a, s, c, f, l, h = n.r * n.r,
                            p = e.r * e.r,
                            d = r.r * r.r,
                            g = h + p + d,
                            v = h * n.x + p * e.x + d * r.x,
                            _ = h * n.y + p * e.y + d * r.y;
                        n = new Bo(n), e = new Bo(e), r = new Bo(r), n.next = r.previous = e, e.next = n.previous = r, r.next = e.previous = n;
                        t: for (a = 3; i > a; ++a) {
                            Io(n._, e._, r = t[a]), r = new Bo(r), s = e.next, c = n.previous, f = e._.r, l = n._.r;
                            do
                                if (l >= f) {
                                    if (Yo(s._, r._)) {
                                        e = s, n.next = e, e.previous = n, --a;
                                        continue t
                                    }
                                    f += s._.r, s = s.next
                                } else {
                                    if (Yo(c._, r._)) {
                                        n = c, n.next = e, e.previous = n, --a;
                                        continue t
                                    }
                                    l += c._.r, c = c.previous
                                }
                            while (s !== c.next);
                            for (r.previous = n, r.next = e, n.next = e.previous = e = r, g += d = r._.r * r._.r, v += d * r._.x, _ += d * r._.y, h = Ho(n, o = v / g, u = _ / g);
                                (r = r.next) !== e;)(d = Ho(r, o, u)) < h && (n = r, h = d);
                            e = n.next
                        }
                        for (n = [e._], r = e;
                            (r = r.next) !== e;) n.push(r._);
                        for (r = Zy(n), a = 0; i > a; ++a) n = t[a], n.x -= r.x, n.y -= r.y;
                        return r.r
                    }

                    function Vo(t) {
                        return null == t ? null : Wo(t)
                    }

                    function Wo(t) {
                        if ("function" != typeof t) throw new Error;
                        return t
                    }

                    function $o() {
                        return 0
                    }

                    function Go(t) {
                        return Math.sqrt(t.value)
                    }

                    function Zo(t) {
                        return function(n) {
                            n.children || (n.r = Math.max(0, +t(n) || 0))
                        }
                    }

                    function Jo(t, n) {
                        return function(e) {
                            if (r = e.children) {
                                var r, i, o, u = r.length,
                                    a = t(e) * n || 0;
                                if (a)
                                    for (i = 0; u > i; ++i) r[i].r += a;
                                if (o = Xo(r), a)
                                    for (i = 0; u > i; ++i) r[i].r -= a;
                                e.r = o + a
                            }
                        }
                    }

                    function Qo(t) {
                        return function(n) {
                            var e = n.parent;
                            n.r *= t, e && (n.x = e.x + t * n.x, n.y = e.y + t * n.y)
                        }
                    }

                    function Ko(t) {
                        return t.id
                    }

                    function tu(t) {
                        return t.parentId
                    }

                    function nu(t, n) {
                        return t.parent === n.parent ? 1 : 2
                    }

                    function eu(t) {
                        var n = t.children;
                        return n ? n[0] : t.t
                    }

                    function ru(t) {
                        var n = t.children;
                        return n ? n[n.length - 1] : t.t
                    }

                    function iu(t, n, e) {
                        var r = e / (n.i - t.i);
                        n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e
                    }

                    function ou(t) {
                        for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;) n = i[o], n.z += e, n.m += e, e += n.s + (r += n.c)
                    }

                    function uu(t, n, e) {
                        return t.a.parent === n.parent ? t.a : e
                    }

                    function au(t, n) {
                        this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = n
                    }

                    function su(t) {
                        for (var n, e, r, i, o, u = new au(t, 0), a = [u]; n = a.pop();)
                            if (r = n._.children)
                                for (n.children = new Array(o = r.length), i = o - 1; i >= 0; --i) a.push(e = n.children[i] = new au(r[i], i)), e.parent = n;
                        return (u.parent = new au(null, 0)).children = [u], u
                    }

                    function cu(t, n, e, r, i, o) {
                        for (var u, a, s, c, f, l, h, p, d, g, v, _ = [], y = n.children, m = 0, x = 0, b = y.length, w = n.value; b > m;) {
                            s = i - e, c = o - r;
                            do f = y[x++].value; while (!f && b > x);
                            for (l = h = f, g = Math.max(c / s, s / c) / (w * t), v = f * f * g, d = Math.max(h / v, v / l); b > x; ++x) {
                                if (f += a = y[x].value, l > a && (l = a), a > h && (h = a), v = f * f * g, p = Math.max(h / v, v / l), p > d) {
                                    f -= a;
                                    break
                                }
                                d = p
                            }
                            _.push(u = {
                                value: f,
                                dice: c > s,
                                children: y.slice(m, x)
                            }), u.dice ? nm(u, e, r, i, w ? r += c * f / w : o) : sm(u, e, r, w ? e += s * f / w : i, o), w -= f, m = x
                        }
                        return _
                    }

                    function fu(t, n) {
                        return t[0] - n[0] || t[1] - n[1]
                    }

                    function lu(t) {
                        for (var n = t.length, e = [0, 1], r = 2, i = 2; n > i; ++i) {
                            for (; r > 1 && _m(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0;) --r;
                            e[r++] = i
                        }
                        return e.slice(0, r)
                    }

                    function hu(t) {
                        if (!(t >= 1)) throw new Error;
                        this._size = t, this._call = this._error = null, this._tasks = [], this._data = [], this._waiting = this._active = this._ended = this._start = 0
                    }

                    function pu(t) {
                        if (!t._start) try {
                            du(t)
                        } catch (n) {
                            if (t._tasks[t._ended + t._active - 1]) vu(t, n);
                            else if (!t._data) throw n
                        }
                    }

                    function du(t) {
                        for (; t._start = t._waiting && t._active < t._size;) {
                            var n = t._ended + t._active,
                                e = t._tasks[n],
                                r = e.length - 1,
                                i = e[r];
                            e[r] = gu(t, n), --t._waiting, ++t._active, e = i.apply(null, e), t._tasks[n] && (t._tasks[n] = e || wm)
                        }
                    }

                    function gu(t, n) {
                        return function(e, r) {
                            t._tasks[n] && (--t._active, ++t._ended, t._tasks[n] = null, null == t._error && (null != e ? vu(t, e) : (t._data[n] = r, t._waiting ? pu(t) : _u(t))))
                        }
                    }

                    function vu(t, n) {
                        var e, r = t._tasks.length;
                        for (t._error = n, t._data = void 0, t._waiting = NaN; --r >= 0;)
                            if ((e = t._tasks[r]) && (t._tasks[r] = null, e.abort)) try {
                                e.abort()
                            } catch (n) {}
                        t._active = NaN, _u(t)
                    }

                    function _u(t) {
                        if (!t._active && t._call) {
                            var n = t._data;
                            t._data = void 0, t._call(t._error, n)
                        }
                    }

                    function yu(t) {
                        return new hu(arguments.length ? +t : 1 / 0)
                    }

                    function mu(t) {
                        return function(n, e) {
                            t(null == n ? e : null)
                        }
                    }

                    function xu(t) {
                        var n = t.responseType;
                        return n && "text" !== n ? t.response : t.responseText
                    }

                    function bu(t, n) {
                        return function(e) {
                            return t(e.responseText, n)
                        }
                    }

                    function wu(t) {
                        function n(n) {
                            var o = n + "",
                                u = e.get(o);
                            if (!u) {
                                if (i !== Im) return i;
                                e.set(o, u = r.push(n))
                            }
                            return t[(u - 1) % t.length]
                        }
                        var e = Ie(),
                            r = [],
                            i = Im;
                        return t = null == t ? [] : Fm.call(t), n.domain = function(t) {
                            if (!arguments.length) return r.slice();
                            r = [], e = Ie();
                            for (var i, o, u = -1, a = t.length; ++u < a;) e.has(o = (i = t[u]) + "") || e.set(o, r.push(i));
                            return n
                        }, n.range = function(e) {
                            return arguments.length ? (t = Fm.call(e), n) : t.slice()
                        }, n.unknown = function(t) {
                            return arguments.length ? (i = t, n) : i
                        }, n.copy = function() {
                            return wu().domain(r).range(t).unknown(i)
                        }, n
                    }

                    function Mu() {
                        function t() {
                            var t = i().length,
                                r = u[1] < u[0],
                                l = u[r - 0],
                                h = u[1 - r];
                            n = (h - l) / Math.max(1, t - s + 2 * c), a && (n = Math.floor(n)), l += (h - l - n * (t - s)) * f, e = n * (1 - s), a && (l = Math.round(l), e = Math.round(e));
                            var p = Jc(t).map(function(t) {
                                return l + n * t
                            });
                            return o(r ? p.reverse() : p)
                        }
                        var n, e, r = wu().unknown(void 0),
                            i = r.domain,
                            o = r.range,
                            u = [0, 1],
                            a = !1,
                            s = 0,
                            c = 0,
                            f = .5;
                        return delete r.unknown,
                            r.domain = function(n) {
                                return arguments.length ? (i(n), t()) : i()
                            }, r.range = function(n) {
                                return arguments.length ? (u = [+n[0], +n[1]], t()) : u.slice()
                            }, r.rangeRound = function(n) {
                                return u = [+n[0], +n[1]], a = !0, t()
                            }, r.bandwidth = function() {
                                return e
                            }, r.step = function() {
                                return n
                            }, r.round = function(n) {
                                return arguments.length ? (a = !!n, t()) : a
                            }, r.padding = function(n) {
                                return arguments.length ? (s = c = Math.max(0, Math.min(1, n)), t()) : s
                            }, r.paddingInner = function(n) {
                                return arguments.length ? (s = Math.max(0, Math.min(1, n)), t()) : s
                            }, r.paddingOuter = function(n) {
                                return arguments.length ? (c = Math.max(0, Math.min(1, n)), t()) : c
                            }, r.align = function(n) {
                                return arguments.length ? (f = Math.max(0, Math.min(1, n)), t()) : f
                            }, r.copy = function() {
                                return Mu().domain(i()).range(u).round(a).paddingInner(s).paddingOuter(c).align(f)
                            }, t()
                    }

                    function ku(t) {
                        var n = t.copy;
                        return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
                            return ku(n())
                        }, t
                    }

                    function Tu() {
                        return ku(Mu().paddingInner(1))
                    }

                    function Su(t, n) {
                        return (n -= t = +t) ? function(e) {
                            return (e - t) / n
                        } : Ym(n)
                    }

                    function Nu(t) {
                        return function(n, e) {
                            var r = t(n = +n, e = +e);
                            return function(t) {
                                return n >= t ? 0 : t >= e ? 1 : r(t)
                            }
                        }
                    }

                    function Eu(t) {
                        return function(n, e) {
                            var r = t(n = +n, e = +e);
                            return function(t) {
                                return 0 >= t ? n : t >= 1 ? e : r(t)
                            }
                        }
                    }

                    function Au(t, n, e, r) {
                        var i = t[0],
                            o = t[1],
                            u = n[0],
                            a = n[1];
                        return i > o ? (i = e(o, i), u = r(a, u)) : (i = e(i, o), u = r(u, a)),
                            function(t) {
                                return u(i(t))
                            }
                    }

                    function Cu(t, n, e, r) {
                        var i = Math.min(t.length, n.length) - 1,
                            o = new Array(i),
                            u = new Array(i),
                            a = -1;
                        for (t[i] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a < i;) o[a] = e(t[a], t[a + 1]), u[a] = r(n[a], n[a + 1]);
                        return function(n) {
                            var e = Oc(t, n, 1, i) - 1;
                            return u[e](o[e](n))
                        }
                    }

                    function Pu(t, n) {
                        return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
                    }

                    function zu(t, n) {
                        function e() {
                            return i = Math.min(a.length, s.length) > 2 ? Cu : Au, o = u = null, r
                        }

                        function r(n) {
                            return (o || (o = i(a, s, f ? Nu(t) : t, c)))(+n)
                        }
                        var i, o, u, a = Bm,
                            s = Bm,
                            c = Ah,
                            f = !1;
                        return r.invert = function(t) {
                            return (u || (u = i(s, a, Su, f ? Eu(n) : n)))(+t)
                        }, r.domain = function(t) {
                            return arguments.length ? (a = jm.call(t, Hm), e()) : a.slice()
                        }, r.range = function(t) {
                            return arguments.length ? (s = Fm.call(t), e()) : s.slice()
                        }, r.rangeRound = function(t) {
                            return s = Fm.call(t), c = Ch, e()
                        }, r.clamp = function(t) {
                            return arguments.length ? (f = !!t, e()) : f
                        }, r.interpolate = function(t) {
                            return arguments.length ? (c = t, e()) : c
                        }, e()
                    }

                    function Ru(t) {
                        var n = t.domain;
                        return t.ticks = function(t) {
                            var e = n();
                            return nf(e[0], e[e.length - 1], null == t ? 10 : t)
                        }, t.tickFormat = function(t, e) {
                            return Xm(n(), t, e)
                        }, t.nice = function(e) {
                            var i = n(),
                                o = i.length - 1,
                                u = null == e ? 10 : e,
                                a = i[0],
                                s = i[o],
                                c = r(a, s, u);
                            return c && (c = r(Math.floor(a / c) * c, Math.ceil(s / c) * c, u), i[0] = Math.floor(a / c) * c, i[o] = Math.ceil(s / c) * c, n(i)), t
                        }, t
                    }

                    function qu() {
                        var t = zu(Su, kh);
                        return t.copy = function() {
                            return Pu(t, qu())
                        }, Ru(t)
                    }

                    function Lu() {
                        function t(t) {
                            return +t
                        }
                        var n = [0, 1];
                        return t.invert = t, t.domain = t.range = function(e) {
                            return arguments.length ? (n = jm.call(e, Hm), t) : n.slice()
                        }, t.copy = function() {
                            return Lu().domain(n)
                        }, Ru(t)
                    }

                    function Uu(t, n) {
                        return (n = Math.log(n / t)) ? function(e) {
                            return Math.log(e / t) / n
                        } : Ym(n)
                    }

                    function Ou(t, n) {
                        return 0 > t ? function(e) {
                            return -Math.pow(-n, e) * Math.pow(-t, 1 - e)
                        } : function(e) {
                            return Math.pow(n, e) * Math.pow(t, 1 - e)
                        }
                    }

                    function Du(t) {
                        return isFinite(t) ? +("1e" + t) : 0 > t ? 0 : t
                    }

                    function ju(t) {
                        return 10 === t ? Du : t === Math.E ? Math.exp : function(n) {
                            return Math.pow(t, n)
                        }
                    }

                    function Fu(t) {
                        return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function(n) {
                            return Math.log(n) / t
                        })
                    }

                    function Iu(t) {
                        return function(n) {
                            return -t(-n)
                        }
                    }

                    function Yu() {
                        function n() {
                            return o = Fu(i), u = ju(i), r()[0] < 0 && (o = Iu(o), u = Iu(u)), e
                        }
                        var e = zu(Uu, Ou).domain([1, 10]),
                            r = e.domain,
                            i = 10,
                            o = Fu(10),
                            u = ju(10);
                        return e.base = function(t) {
                            return arguments.length ? (i = +t, n()) : i
                        }, e.domain = function(t) {
                            return arguments.length ? (r(t), n()) : r()
                        }, e.ticks = function(t) {
                            var n, e = r(),
                                a = e[0],
                                s = e[e.length - 1];
                            (n = a > s) && (h = a, a = s, s = h);
                            var c, f, l, h = o(a),
                                p = o(s),
                                d = null == t ? 10 : +t,
                                g = [];
                            if (!(i % 1) && d > p - h) {
                                if (h = Math.round(h) - 1, p = Math.round(p) + 1, a > 0) {
                                    for (; p > h; ++h)
                                        for (f = 1, c = u(h); i > f; ++f)
                                            if (l = c * f, !(a > l)) {
                                                if (l > s) break;
                                                g.push(l)
                                            }
                                } else
                                    for (; p > h; ++h)
                                        for (f = i - 1, c = u(h); f >= 1; --f)
                                            if (l = c * f, !(a > l)) {
                                                if (l > s) break;
                                                g.push(l)
                                            }
                            } else g = nf(h, p, Math.min(p - h, d)).map(u);
                            return n ? g.reverse() : g
                        }, e.tickFormat = function(n, r) {
                            if (null == r && (r = 10 === i ? ".0e" : ","), "function" != typeof r && (r = t.format(r)), n === 1 / 0) return r;
                            null == n && (n = 10);
                            var a = Math.max(1, i * n / e.ticks().length);
                            return function(t) {
                                var n = t / u(Math.round(o(t)));
                                return i - .5 > n * i && (n *= i), a >= n ? r(t) : ""
                            }
                        }, e.nice = function() {
                            return r(Vm(r(), {
                                floor: function(t) {
                                    return u(Math.floor(o(t)))
                                },
                                ceil: function(t) {
                                    return u(Math.ceil(o(t)))
                                }
                            }))
                        }, e.copy = function() {
                            return Pu(e, Yu().base(i))
                        }, e
                    }

                    function Hu(t, n) {
                        return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n)
                    }

                    function Bu() {
                        function t(t, n) {
                            return (n = Hu(n, e) - (t = Hu(t, e))) ? function(r) {
                                return (Hu(r, e) - t) / n
                            } : Ym(n)
                        }

                        function n(t, n) {
                            return n = Hu(n, e) - (t = Hu(t, e)),
                                function(r) {
                                    return Hu(t + n * r, 1 / e)
                                }
                        }
                        var e = 1,
                            r = zu(t, n),
                            i = r.domain;
                        return r.exponent = function(t) {
                            return arguments.length ? (e = +t, i(i())) : e
                        }, r.copy = function() {
                            return Pu(r, Bu().exponent(e))
                        }, Ru(r)
                    }

                    function Xu() {
                        return Bu().exponent(.5)
                    }

                    function Vu() {
                        function t() {
                            var t = 0,
                                o = Math.max(1, r.length);
                            for (i = new Array(o - 1); ++t < o;) i[t - 1] = of (e, t / o);
                            return n
                        }

                        function n(t) {
                            return isNaN(t = +t) ? void 0 : r[Oc(i, t)]
                        }
                        var e = [],
                            r = [],
                            i = [];
                        return n.invertExtent = function(t) {
                            var n = r.indexOf(t);
                            return 0 > n ? [NaN, NaN] : [n > 0 ? i[n - 1] : e[0], n < i.length ? i[n] : e[e.length - 1]]
                        }, n.domain = function(n) {
                            if (!arguments.length) return e.slice();
                            e = [];
                            for (var r, i = 0, o = n.length; o > i; ++i) r = n[i], null == r || isNaN(r = +r) || e.push(r);
                            return e.sort(qc), t()
                        }, n.range = function(n) {
                            return arguments.length ? (r = Fm.call(n), t()) : r.slice()
                        }, n.quantiles = function() {
                            return i.slice()
                        }, n.copy = function() {
                            return Vu().domain(e).range(r)
                        }, n
                    }

                    function Wu() {
                        function t(t) {
                            return t >= t ? u[Oc(o, t, 0, i)] : void 0
                        }

                        function n() {
                            var n = -1;
                            for (o = new Array(i); ++n < i;) o[n] = ((n + 1) * r - (n - i) * e) / (i + 1);
                            return t
                        }
                        var e = 0,
                            r = 1,
                            i = 1,
                            o = [.5],
                            u = [0, 1];
                        return t.domain = function(t) {
                            return arguments.length ? (e = +t[0], r = +t[1], n()) : [e, r]
                        }, t.range = function(t) {
                            return arguments.length ? (i = (u = Fm.call(t)).length - 1, n()) : u.slice()
                        }, t.invertExtent = function(t) {
                            var n = u.indexOf(t);
                            return 0 > n ? [NaN, NaN] : 1 > n ? [e, o[0]] : n >= i ? [o[i - 1], r] : [o[n - 1], o[n]]
                        }, t.copy = function() {
                            return Wu().domain([e, r]).range(u)
                        }, Ru(t)
                    }

                    function $u() {
                        function t(t) {
                            return t >= t ? e[Oc(n, t, 0, r)] : void 0
                        }
                        var n = [.5],
                            e = [0, 1],
                            r = 1;
                        return t.domain = function(i) {
                            return arguments.length ? (n = Fm.call(i), r = Math.min(n.length, e.length - 1), t) : n.slice()
                        }, t.range = function(i) {
                            return arguments.length ? (e = Fm.call(i), r = Math.min(n.length, e.length - 1), t) : e.slice()
                        }, t.invertExtent = function(t) {
                            var r = e.indexOf(t);
                            return [n[r - 1], n[r]]
                        }, t.copy = function() {
                            return $u().domain(n).range(e)
                        }, t
                    }

                    function Gu(t, n, e, r) {
                        function i(n) {
                            return t(n = new Date(+n)), n
                        }
                        return i.floor = i, i.ceil = function(e) {
                            return t(e = new Date(e - 1)), n(e, 1), t(e), e
                        }, i.round = function(t) {
                            var n = i(t),
                                e = i.ceil(t);
                            return e - t > t - n ? n : e
                        }, i.offset = function(t, e) {
                            return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
                        }, i.range = function(e, r, o) {
                            var u = [];
                            if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(r > e && o > 0)) return u;
                            do u.push(new Date(+e)); while (n(e, o), t(e), r > e);
                            return u
                        }, i.filter = function(e) {
                            return Gu(function(n) {
                                if (n >= n)
                                    for (; t(n), !e(n);) n.setTime(n - 1)
                            }, function(t, r) {
                                if (t >= t)
                                    for (; --r >= 0;)
                                        for (; n(t, 1), !e(t););
                            })
                        }, e && (i.count = function(n, r) {
                            return Wm.setTime(+n), $m.setTime(+r), t(Wm), t($m), Math.floor(e(Wm, $m))
                        }, i.every = function(t) {
                            return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function(n) {
                                return r(n) % t === 0
                            } : function(n) {
                                return i.count(0, n) % t === 0
                            }) : i : null
                        }), i
                    }

                    function Zu(t) {
                        return Gu(function(n) {
                            n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setDate(t.getDate() + 7 * n)
                        }, function(t, n) {
                            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Qm) / nx
                        })
                    }

                    function Ju(t) {
                        return Gu(function(n) {
                            n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setUTCDate(t.getUTCDate() + 7 * n)
                        }, function(t, n) {
                            return (n - t) / nx
                        })
                    }

                    function Qu(t) {
                        if (0 <= t.y && t.y < 100) {
                            var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
                            return n.setFullYear(t.y), n
                        }
                        return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
                    }

                    function Ku(t) {
                        if (0 <= t.y && t.y < 100) {
                            var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
                            return n.setUTCFullYear(t.y), n
                        }
                        return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
                    }

                    function ta(t) {
                        return {
                            y: t,
                            m: 0,
                            d: 1,
                            H: 0,
                            M: 0,
                            S: 0,
                            L: 0
                        }
                    }

                    function na(t) {
                        function n(t, n) {
                            return function(e) {
                                var r, i, o, u = [],
                                    a = -1,
                                    s = 0,
                                    c = t.length;
                                for (e instanceof Date || (e = new Date(+e)); ++a < c;) 37 === t.charCodeAt(a) && (u.push(t.slice(s, a)), null != (i = Kx[r = t.charAt(++a)]) ? r = t.charAt(++a) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), u.push(r), s = a + 1);
                                return u.push(t.slice(s, a)), u.join("")
                            }
                        }

                        function e(t, n) {
                            return function(e) {
                                var i = ta(1900),
                                    o = r(i, t, e += "", 0);
                                if (o != e.length) return null;
                                if ("p" in i && (i.H = i.H % 12 + 12 * i.p), "W" in i || "U" in i) {
                                    "w" in i || (i.w = "W" in i ? 1 : 0);
                                    var u = "Z" in i ? Ku(ta(i.y)).getUTCDay() : n(ta(i.y)).getDay();
                                    i.m = 0, i.d = "W" in i ? (i.w + 6) % 7 + 7 * i.W - (u + 5) % 7 : i.w + 7 * i.U - (u + 6) % 7
                                }
                                return "Z" in i ? (i.H += i.Z / 100 | 0, i.M += i.Z % 100, Ku(i)) : n(i)
                            }
                        }

                        function r(t, n, e, r) {
                            for (var i, o, u = 0, a = n.length, s = e.length; a > u;) {
                                if (r >= s) return -1;
                                if (i = n.charCodeAt(u++), 37 === i) {
                                    if (i = n.charAt(u++), o = Y[i in Kx ? n.charAt(u++) : i], !o || (r = o(t, e, r)) < 0) return -1
                                } else if (i != e.charCodeAt(r++)) return -1
                            }
                            return r
                        }

                        function i(t, n, e) {
                            var r = C.exec(n.slice(e));
                            return r ? (t.p = P[r[0].toLowerCase()], e + r[0].length) : -1
                        }

                        function o(t, n, e) {
                            var r = q.exec(n.slice(e));
                            return r ? (t.w = L[r[0].toLowerCase()], e + r[0].length) : -1
                        }

                        function u(t, n, e) {
                            var r = z.exec(n.slice(e));
                            return r ? (t.w = R[r[0].toLowerCase()], e + r[0].length) : -1
                        }

                        function a(t, n, e) {
                            var r = D.exec(n.slice(e));
                            return r ? (t.m = j[r[0].toLowerCase()], e + r[0].length) : -1
                        }

                        function s(t, n, e) {
                            var r = U.exec(n.slice(e));
                            return r ? (t.m = O[r[0].toLowerCase()], e + r[0].length) : -1
                        }

                        function c(t, n, e) {
                            return r(t, w, n, e)
                        }

                        function f(t, n, e) {
                            return r(t, M, n, e)
                        }

                        function l(t, n, e) {
                            return r(t, k, n, e)
                        }

                        function h(t) {
                            return N[t.getDay()]
                        }

                        function p(t) {
                            return S[t.getDay()]
                        }

                        function d(t) {
                            return A[t.getMonth()]
                        }

                        function g(t) {
                            return E[t.getMonth()]
                        }

                        function v(t) {
                            return T[+(t.getHours() >= 12)]
                        }

                        function _(t) {
                            return N[t.getUTCDay()]
                        }

                        function y(t) {
                            return S[t.getUTCDay()]
                        }

                        function m(t) {
                            return A[t.getUTCMonth()]
                        }

                        function x(t) {
                            return E[t.getUTCMonth()]
                        }

                        function b(t) {
                            return T[+(t.getUTCHours() >= 12)]
                        }
                        var w = t.dateTime,
                            M = t.date,
                            k = t.time,
                            T = t.periods,
                            S = t.days,
                            N = t.shortDays,
                            E = t.months,
                            A = t.shortMonths,
                            C = ia(T),
                            P = oa(T),
                            z = ia(S),
                            R = oa(S),
                            q = ia(N),
                            L = oa(N),
                            U = ia(E),
                            O = oa(E),
                            D = ia(A),
                            j = oa(A),
                            F = {
                                a: h,
                                A: p,
                                b: d,
                                B: g,
                                c: null,
                                d: xa,
                                e: xa,
                                H: ba,
                                I: wa,
                                j: Ma,
                                L: ka,
                                m: Ta,
                                M: Sa,
                                p: v,
                                S: Na,
                                U: Ea,
                                w: Aa,
                                W: Ca,
                                x: null,
                                X: null,
                                y: Pa,
                                Y: za,
                                Z: Ra,
                                "%": $a
                            },
                            I = {
                                a: _,
                                A: y,
                                b: m,
                                B: x,
                                c: null,
                                d: qa,
                                e: qa,
                                H: La,
                                I: Ua,
                                j: Oa,
                                L: Da,
                                m: ja,
                                M: Fa,
                                p: b,
                                S: Ia,
                                U: Ya,
                                w: Ha,
                                W: Ba,
                                x: null,
                                X: null,
                                y: Xa,
                                Y: Va,
                                Z: Wa,
                                "%": $a
                            },
                            Y = {
                                a: o,
                                A: u,
                                b: a,
                                B: s,
                                c: c,
                                d: pa,
                                e: pa,
                                H: ga,
                                I: ga,
                                j: da,
                                L: ya,
                                m: ha,
                                M: va,
                                p: i,
                                S: _a,
                                U: aa,
                                w: ua,
                                W: sa,
                                x: f,
                                X: l,
                                y: fa,
                                Y: ca,
                                Z: la,
                                "%": ma
                            };
                        return F.x = n(M, F), F.X = n(k, F), F.c = n(w, F), I.x = n(M, I), I.X = n(k, I), I.c = n(w, I), {
                            format: function(t) {
                                var e = n(t += "", F);
                                return e.toString = function() {
                                    return t
                                }, e
                            },
                            parse: function(t) {
                                var n = e(t += "", Qu);
                                return n.toString = function() {
                                    return t
                                }, n
                            },
                            utcFormat: function(t) {
                                var e = n(t += "", I);
                                return e.toString = function() {
                                    return t
                                }, e
                            },
                            utcParse: function(t) {
                                var n = e(t, Ku);
                                return n.toString = function() {
                                    return t
                                }, n
                            }
                        }
                    }

                    function ea(t, n, e) {
                        var r = 0 > t ? "-" : "",
                            i = (r ? -t : t) + "",
                            o = i.length;
                        return r + (e > o ? new Array(e - o + 1).join(n) + i : i)
                    }

                    function ra(t) {
                        return t.replace(eb, "\\$&")
                    }

                    function ia(t) {
                        return new RegExp("^(?:" + t.map(ra).join("|") + ")", "i")
                    }

                    function oa(t) {
                        for (var n = {}, e = -1, r = t.length; ++e < r;) n[t[e].toLowerCase()] = e;
                        return n
                    }

                    function ua(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 1));
                        return r ? (t.w = +r[0], e + r[0].length) : -1
                    }

                    function aa(t, n, e) {
                        var r = tb.exec(n.slice(e));
                        return r ? (t.U = +r[0], e + r[0].length) : -1
                    }

                    function sa(t, n, e) {
                        var r = tb.exec(n.slice(e));
                        return r ? (t.W = +r[0], e + r[0].length) : -1
                    }

                    function ca(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 4));
                        return r ? (t.y = +r[0], e + r[0].length) : -1
                    }

                    function fa(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1
                    }

                    function la(t, n, e) {
                        var r = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e, e + 6));
                        return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1
                    }

                    function ha(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.m = r[0] - 1, e + r[0].length) : -1
                    }

                    function pa(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.d = +r[0], e + r[0].length) : -1
                    }

                    function da(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 3));
                        return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1
                    }

                    function ga(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.H = +r[0], e + r[0].length) : -1
                    }

                    function va(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.M = +r[0], e + r[0].length) : -1
                    }

                    function _a(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 2));
                        return r ? (t.S = +r[0], e + r[0].length) : -1
                    }

                    function ya(t, n, e) {
                        var r = tb.exec(n.slice(e, e + 3));
                        return r ? (t.L = +r[0], e + r[0].length) : -1
                    }

                    function ma(t, n, e) {
                        var r = nb.exec(n.slice(e, e + 1));
                        return r ? e + r[0].length : -1
                    }

                    function xa(t, n) {
                        return ea(t.getDate(), n, 2)
                    }

                    function ba(t, n) {
                        return ea(t.getHours(), n, 2)
                    }

                    function wa(t, n) {
                        return ea(t.getHours() % 12 || 12, n, 2)
                    }

                    function Ma(t, n) {
                        return ea(1 + sx.count(Sx(t), t), n, 3)
                    }

                    function ka(t, n) {
                        return ea(t.getMilliseconds(), n, 3)
                    }

                    function Ta(t, n) {
                        return ea(t.getMonth() + 1, n, 2)
                    }

                    function Sa(t, n) {
                        return ea(t.getMinutes(), n, 2)
                    }

                    function Na(t, n) {
                        return ea(t.getSeconds(), n, 2)
                    }

                    function Ea(t, n) {
                        return ea(fx.count(Sx(t), t), n, 2)
                    }

                    function Aa(t) {
                        return t.getDay()
                    }

                    function Ca(t, n) {
                        return ea(lx.count(Sx(t), t), n, 2)
                    }

                    function Pa(t, n) {
                        return ea(t.getFullYear() % 100, n, 2)
                    }

                    function za(t, n) {
                        return ea(t.getFullYear() % 1e4, n, 4)
                    }

                    function Ra(t) {
                        var n = t.getTimezoneOffset();
                        return (n > 0 ? "-" : (n *= -1, "+")) + ea(n / 60 | 0, "0", 2) + ea(n % 60, "0", 2)
                    }

                    function qa(t, n) {
                        return ea(t.getUTCDate(), n, 2)
                    }

                    function La(t, n) {
                        return ea(t.getUTCHours(), n, 2)
                    }

                    function Ua(t, n) {
                        return ea(t.getUTCHours() % 12 || 12, n, 2)
                    }

                    function Oa(t, n) {
                        return ea(1 + zx.count(Zx(t), t), n, 3)
                    }

                    function Da(t, n) {
                        return ea(t.getUTCMilliseconds(), n, 3)
                    }

                    function ja(t, n) {
                        return ea(t.getUTCMonth() + 1, n, 2)
                    }

                    function Fa(t, n) {
                        return ea(t.getUTCMinutes(), n, 2)
                    }

                    function Ia(t, n) {
                        return ea(t.getUTCSeconds(), n, 2)
                    }

                    function Ya(t, n) {
                        return ea(qx.count(Zx(t), t), n, 2)
                    }

                    function Ha(t) {
                        return t.getUTCDay()
                    }

                    function Ba(t, n) {
                        return ea(Lx.count(Zx(t), t), n, 2)
                    }

                    function Xa(t, n) {
                        return ea(t.getUTCFullYear() % 100, n, 2)
                    }

                    function Va(t, n) {
                        return ea(t.getUTCFullYear() % 1e4, n, 4)
                    }

                    function Wa() {
                        return "+0000"
                    }

                    function $a() {
                        return "%"
                    }

                    function Ga(n) {
                        return Jx = na(n), t.timeFormat = Jx.format, t.timeParse = Jx.parse, t.utcFormat = Jx.utcFormat, t.utcParse = Jx.utcParse, Jx
                    }

                    function Za(t) {
                        return t.toISOString()
                    }

                    function Ja(t) {
                        var n = new Date(t);
                        return isNaN(n) ? null : n
                    }

                    function Qa(t) {
                        return new Date(t)
                    }

                    function Ka(t) {
                        return t instanceof Date ? +t : +new Date(+t)
                    }

                    function ts(t, n, e, i, o, u, a, s, c) {
                        function f(r) {
                            return (a(r) < r ? g : u(r) < r ? v : o(r) < r ? _ : i(r) < r ? y : n(r) < r ? e(r) < r ? m : x : t(r) < r ? b : w)(r)
                        }

                        function l(n, e, i, o) {
                            if (null == n && (n = 10), "number" == typeof n) {
                                var u = Math.abs(i - e) / n,
                                    a = Lc(function(t) {
                                        return t[2]
                                    }).right(M, u);
                                a === M.length ? (o = r(e / hb, i / hb, n), n = t) : a ? (a = M[u / M[a - 1][2] < M[a][2] / u ? a - 1 : a], o = a[1], n = a[0]) : (o = r(e, i, n), n = s)
                            }
                            return null == o ? n : n.every(o)
                        }
                        var h = zu(Su, kh),
                            p = h.invert,
                            d = h.domain,
                            g = c(".%L"),
                            v = c(":%S"),
                            _ = c("%I:%M"),
                            y = c("%I %p"),
                            m = c("%a %d"),
                            x = c("%b %d"),
                            b = c("%B"),
                            w = c("%Y"),
                            M = [
                                [a, 1, ub],
                                [a, 5, 5 * ub],
                                [a, 15, 15 * ub],
                                [a, 30, 30 * ub],
                                [u, 1, ab],
                                [u, 5, 5 * ab],
                                [u, 15, 15 * ab],
                                [u, 30, 30 * ab],
                                [o, 1, sb],
                                [o, 3, 3 * sb],
                                [o, 6, 6 * sb],
                                [o, 12, 12 * sb],
                                [i, 1, cb],
                                [i, 2, 2 * cb],
                                [e, 1, fb],
                                [n, 1, lb],
                                [n, 3, 3 * lb],
                                [t, 1, hb]
                            ];
                        return h.invert = function(t) {
                            return new Date(p(t))
                        }, h.domain = function(t) {
                            return arguments.length ? d(jm.call(t, Ka)) : d().map(Qa)
                        }, h.ticks = function(t, n) {
                            var e, r = d(),
                                i = r[0],
                                o = r[r.length - 1],
                                u = i > o;
                            return u && (e = i, i = o, o = e), e = l(t, i, o, n), e = e ? e.range(i, o + 1) : [], u ? e.reverse() : e
                        }, h.tickFormat = function(t, n) {
                            return null == n ? f : c(n)
                        }, h.nice = function(t, n) {
                            var e = d();
                            return (t = l(t, e[0], e[e.length - 1], n)) ? d(Vm(e, t)) : h
                        }, h.copy = function() {
                            return Pu(h, ts(t, n, e, i, o, u, a, s, c))
                        }, h
                    }

                    function ns(t) {
                        var n = t.length;
                        return function(e) {
                            return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
                        }
                    }

                    function es(t) {
                        function n(n) {
                            var o = (n - e) / (r - e);
                            return t(i ? Math.max(0, Math.min(1, o)) : o)
                        }
                        var e = 0,
                            r = 1,
                            i = !1;
                        return n.domain = function(t) {
                            return arguments.length ? (e = +t[0], r = +t[1], n) : [e, r]
                        }, n.clamp = function(t) {
                            return arguments.length ? (i = !!t, n) : i
                        }, n.interpolator = function(e) {
                            return arguments.length ? (t = e, n) : t
                        }, n.copy = function() {
                            return es(t).domain([e, r]).clamp(i)
                        }, Ru(n)
                    }

                    function rs(t) {
                        return t > 1 ? 0 : -1 > t ? Db : Math.acos(t)
                    }

                    function is(t) {
                        return t >= 1 ? jb : -1 >= t ? -jb : Math.asin(t)
                    }

                    function os(t) {
                        return t.innerRadius
                    }

                    function us(t) {
                        return t.outerRadius
                    }

                    function as(t) {
                        return t.startAngle
                    }

                    function ss(t) {
                        return t.endAngle
                    }

                    function cs(t) {
                        return t && t.padAngle
                    }

                    function fs(t, n, e, r, i, o, u, a) {
                        var s = e - t,
                            c = r - n,
                            f = u - i,
                            l = a - o,
                            h = (f * (n - o) - l * (t - i)) / (l * s - f * c);
                        return [t + h * s, n + h * c]
                    }

                    function ls(t, n, e, r, i, o, u) {
                        var a = t - e,
                            s = n - r,
                            c = (u ? o : -o) / Ub(a * a + s * s),
                            f = c * s,
                            l = -c * a,
                            h = t + f,
                            p = n + l,
                            d = e + f,
                            g = r + l,
                            v = (h + d) / 2,
                            _ = (p + g) / 2,
                            y = d - h,
                            m = g - p,
                            x = y * y + m * m,
                            b = i - o,
                            w = h * g - d * p,
                            M = (0 > m ? -1 : 1) * Ub(Rb(0, b * b * x - w * w)),
                            k = (w * m - y * M) / x,
                            T = (-w * y - m * M) / x,
                            S = (w * m + y * M) / x,
                            N = (-w * y + m * M) / x,
                            E = k - v,
                            A = T - _,
                            C = S - v,
                            P = N - _;
                        return E * E + A * A > C * C + P * P && (k = S, T = N), {
                            cx: k,
                            cy: T,
                            x01: -f,
                            y01: -l,
                            x11: k * (i / b - 1),
                            y11: T * (i / b - 1)
                        }
                    }

                    function hs(t) {
                        this._context = t
                    }

                    function ps(t) {
                        return t[0]
                    }

                    function ds(t) {
                        return t[1]
                    }

                    function gs(t) {
                        this._curve = t
                    }

                    function vs(t) {
                        function n(n) {
                            return new gs(t(n))
                        }
                        return n._curve = t, n
                    }

                    function _s(t) {
                        var n = t.curve;
                        return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function(t) {
                            return arguments.length ? n(vs(t)) : n()._curve
                        }, t
                    }

                    function ys(t, n, e) {
                        t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
                    }

                    function ms(t) {
                        this._context = t
                    }

                    function xs(t) {
                        this._context = t
                    }

                    function bs(t) {
                        this._context = t
                    }

                    function ws(t, n) {
                        this._basis = new ms(t), this._beta = n
                    }

                    function Ms(t, n, e) {
                        t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2)
                    }

                    function ks(t, n) {
                        this._context = t, this._k = (1 - n) / 6
                    }

                    function Ts(t, n) {
                        this._context = t, this._k = (1 - n) / 6
                    }

                    function Ss(t, n) {
                        this._context = t, this._k = (1 - n) / 6
                    }

                    function Ns(t, n, e) {
                        var r = t._x1,
                            i = t._y1,
                            o = t._x2,
                            u = t._y2;
                        if (t._l01_a > Ob) {
                            var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
                                s = 3 * t._l01_a * (t._l01_a + t._l12_a);
                            r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / s, i = (i * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / s
                        }
                        if (t._l23_a > Ob) {
                            var c = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
                                f = 3 * t._l23_a * (t._l23_a + t._l12_a);
                            o = (o * c + t._x1 * t._l23_2a - n * t._l12_2a) / f, u = (u * c + t._y1 * t._l23_2a - e * t._l12_2a) / f
                        }
                        t._context.bezierCurveTo(r, i, o, u, t._x2, t._y2)
                    }

                    function Es(t, n) {
                        this._context = t, this._alpha = n
                    }

                    function As(t, n) {
                        this._context = t, this._alpha = n
                    }

                    function Cs(t, n) {
                        this._context = t, this._alpha = n
                    }

                    function Ps(t) {
                        this._context = t
                    }

                    function zs(t) {
                        return 0 > t ? -1 : 1
                    }

                    function Rs(t, n, e) {
                        var r = t._x1 - t._x0,
                            i = n - t._x1,
                            o = (t._y1 - t._y0) / (r || 0 > i && -0),
                            u = (e - t._y1) / (i || 0 > r && -0),
                            a = (o * i + u * r) / (r + i);
                        return (zs(o) + zs(u)) * Math.min(Math.abs(o), Math.abs(u), .5 * Math.abs(a)) || 0
                    }

                    function qs(t, n) {
                        var e = t._x1 - t._x0;
                        return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
                    }

                    function Ls(t, n, e) {
                        var r = t._x0,
                            i = t._y0,
                            o = t._x1,
                            u = t._y1,
                            a = (o - r) / 3;
                        t._context.bezierCurveTo(r + a, i + a * n, o - a, u - a * e, o, u)
                    }

                    function Us(t) {
                        this._context = t
                    }

                    function Os(t) {
                        this._context = new Ds(t)
                    }

                    function Ds(t) {
                        this._context = t
                    }

                    function js(t) {
                        return new Us(t)
                    }

                    function Fs(t) {
                        return new Os(t)
                    }

                    function Is(t) {
                        this._context = t
                    }

                    function Ys(t) {
                        var n, e, r = t.length - 1,
                            i = new Array(r),
                            o = new Array(r),
                            u = new Array(r);
                        for (i[0] = 0, o[0] = 2, u[0] = t[0] + 2 * t[1], n = 1; r - 1 > n; ++n) i[n] = 1, o[n] = 4, u[n] = 4 * t[n] + 2 * t[n + 1];
                        for (i[r - 1] = 2, o[r - 1] = 7, u[r - 1] = 8 * t[r - 1] + t[r], n = 1; r > n; ++n) e = i[n] / o[n - 1], o[n] -= e, u[n] -= e * u[n - 1];
                        for (i[r - 1] = u[r - 1] / o[r - 1], n = r - 2; n >= 0; --n) i[n] = (u[n] - i[n + 1]) / o[n];
                        for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; r - 1 > n; ++n) o[n] = 2 * t[n + 1] - i[n + 1];
                        return [i, o]
                    }

                    function Hs(t, n) {
                        this._context = t, this._t = n
                    }

                    function Bs(t) {
                        return new Hs(t, 0)
                    }

                    function Xs(t) {
                        return new Hs(t, 1)
                    }

                    function Vs(t, n) {
                        return t[n]
                    }

                    function Ws(t) {
                        for (var n, e = 0, r = -1, i = t.length; ++r < i;)(n = +t[r][1]) && (e += n);
                        return e
                    }

                    function $s(t) {
                        return t[0]
                    }

                    function Gs(t) {
                        return t[1]
                    }

                    function Zs() {
                        this._ = null
                    }

                    function Js(t) {
                        t.U = t.C = t.L = t.R = t.P = t.N = null
                    }

                    function Qs(t, n) {
                        var e = n,
                            r = n.R,
                            i = e.U;
                        i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
                    }

                    function Ks(t, n) {
                        var e = n,
                            r = n.L,
                            i = e.U;
                        i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
                    }

                    function tc(t) {
                        for (; t.L;) t = t.L;
                        return t
                    }

                    function nc(t, n, e, r) {
                        var i = [null, null],
                            o = Ww.push(i) - 1;
                        return i.left = t, i.right = n, e && rc(i, t, n, e), r && rc(i, n, t, r), Xw[t.index].halfedges.push(o), Xw[n.index].halfedges.push(o), i
                    }

                    function ec(t, n, e) {
                        var r = [n, e];
                        return r.left = t, r
                    }

                    function rc(t, n, e, r) {
                        t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r, t.left = n, t.right = e)
                    }

                    function ic(t, n, e, r, i) {
                        var o, u = t[0],
                            a = t[1],
                            s = u[0],
                            c = u[1],
                            f = a[0],
                            l = a[1],
                            h = 0,
                            p = 1,
                            d = f - s,
                            g = l - c;
                        if (o = n - s, d || !(o > 0)) {
                            if (o /= d, 0 > d) {
                                if (h > o) return;
                                p > o && (p = o)
                            } else if (d > 0) {
                                if (o > p) return;
                                o > h && (h = o)
                            }
                            if (o = r - s, d || !(0 > o)) {
                                if (o /= d, 0 > d) {
                                    if (o > p) return;
                                    o > h && (h = o)
                                } else if (d > 0) {
                                    if (h > o) return;
                                    p > o && (p = o)
                                }
                                if (o = e - c, g || !(o > 0)) {
                                    if (o /= g, 0 > g) {
                                        if (h > o) return;
                                        p > o && (p = o)
                                    } else if (g > 0) {
                                        if (o > p) return;
                                        o > h && (h = o)
                                    }
                                    if (o = i - c, g || !(0 > o)) {
                                        if (o /= g, 0 > g) {
                                            if (o > p) return;
                                            o > h && (h = o)
                                        } else if (g > 0) {
                                            if (h > o) return;
                                            p > o && (p = o)
                                        }
                                        return h > 0 || 1 > p ? (h > 0 && (t[0] = [s + h * d, c + h * g]), 1 > p && (t[1] = [s + p * d, c + p * g]), !0) : !0
                                    }
                                }
                            }
                        }
                    }

                    function oc(t, n, e, r, i) {
                        var o = t[1];
                        if (o) return !0;
                        var u, a, s = t[0],
                            c = t.left,
                            f = t.right,
                            l = c[0],
                            h = c[1],
                            p = f[0],
                            d = f[1],
                            g = (l + p) / 2,
                            v = (h + d) / 2;
                        if (d === h) {
                            if (n > g || g >= r) return;
                            if (l > p) {
                                if (s) {
                                    if (s[1] >= i) return
                                } else s = [g, e];
                                o = [g, i]
                            } else {
                                if (s) {
                                    if (s[1] < e) return
                                } else s = [g, i];
                                o = [g, e]
                            }
                        } else if (u = (l - p) / (d - h), a = v - u * g, -1 > u || u > 1)
                            if (l > p) {
                                if (s) {
                                    if (s[1] >= i) return
                                } else s = [(e - a) / u, e];
                                o = [(i - a) / u, i]
                            } else {
                                if (s) {
                                    if (s[1] < e) return
                                } else s = [(i - a) / u, i];
                                o = [(e - a) / u, e]
                            }
                        else if (d > h) {
                            if (s) {
                                if (s[0] >= r) return
                            } else s = [n, u * n + a];
                            o = [r, u * r + a]
                        } else {
                            if (s) {
                                if (s[0] < n) return
                            } else s = [r, u * r + a];
                            o = [n, u * n + a]
                        }
                        return t[0] = s, t[1] = o, !0
                    }

                    function uc(t, n, e, r) {
                        for (var i, o = Ww.length; o--;) oc(i = Ww[o], t, n, e, r) && ic(i, t, n, e, r) && (Math.abs(i[0][0] - i[1][0]) > Zw || Math.abs(i[0][1] - i[1][1]) > Zw) || delete Ww[o]
                    }

                    function ac(t) {
                        return Xw[t.index] = {
                            site: t,
                            halfedges: []
                        }
                    }

                    function sc(t, n) {
                        var e = t.site,
                            r = n.left,
                            i = n.right;
                        return e === i && (i = r, r = e), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (e === r ? (r = n[1], i = n[0]) : (r = n[0], i = n[1]), Math.atan2(r[0] - i[0], i[1] - r[1]))
                    }

                    function cc(t, n) {
                        return n[+(n.left !== t.site)]
                    }

                    function fc(t, n) {
                        return n[+(n.left === t.site)]
                    }

                    function lc() {
                        for (var t, n, e, r, i = 0, o = Xw.length; o > i; ++i)
                            if ((t = Xw[i]) && (r = (n = t.halfedges).length)) {
                                var u = new Array(r),
                                    a = new Array(r);
                                for (e = 0; r > e; ++e) u[e] = e, a[e] = sc(t, Ww[n[e]]);
                                for (u.sort(function(t, n) {
                                        return a[n] - a[t]
                                    }), e = 0; r > e; ++e) a[e] = n[u[e]];
                                for (e = 0; r > e; ++e) n[e] = a[e]
                            }
                    }

                    function hc(t, n, e, r) {
                        var i, o, u, a, s, c, f, l, h, p, d, g, v = Xw.length,
                            _ = !0;
                        for (i = 0; v > i; ++i)
                            if (o = Xw[i]) {
                                for (u = o.site, s = o.halfedges, a = s.length; a--;) Ww[s[a]] || s.splice(a, 1);
                                for (a = 0, c = s.length; c > a;) p = fc(o, Ww[s[a]]), d = p[0], g = p[1], f = cc(o, Ww[s[++a % c]]), l = f[0], h = f[1], (Math.abs(d - l) > Zw || Math.abs(g - h) > Zw) && (s.splice(a, 0, Ww.push(ec(u, p, Math.abs(d - t) < Zw && r - g > Zw ? [t, Math.abs(l - t) < Zw ? h : r] : Math.abs(g - r) < Zw && e - d > Zw ? [Math.abs(h - r) < Zw ? l : e, r] : Math.abs(d - e) < Zw && g - n > Zw ? [e, Math.abs(l - e) < Zw ? h : n] : Math.abs(g - n) < Zw && d - t > Zw ? [Math.abs(h - n) < Zw ? l : t, n] : null)) - 1), ++c);
                                c && (_ = !1)
                            }
                        if (_) {
                            var y, m, x, b = 1 / 0;
                            for (i = 0, _ = null; v > i; ++i)(o = Xw[i]) && (u = o.site, y = u[0] - t, m = u[1] - n, x = y * y + m * m, b > x && (b = x, _ = o));
                            if (_) {
                                var w = [t, n],
                                    M = [t, r],
                                    k = [e, r],
                                    T = [e, n];
                                _.halfedges.push(Ww.push(ec(u = _.site, w, M)) - 1, Ww.push(ec(u, M, k)) - 1, Ww.push(ec(u, k, T)) - 1, Ww.push(ec(u, T, w)) - 1)
                            }
                        }
                        for (i = 0; v > i; ++i)(o = Xw[i]) && (o.halfedges.length || delete Xw[i])
                    }

                    function pc() {
                        Js(this), this.x = this.y = this.arc = this.site = this.cy = null
                    }

                    function dc(t) {
                        var n = t.P,
                            e = t.N;
                        if (n && e) {
                            var r = n.site,
                                i = t.site,
                                o = e.site;
                            if (r !== o) {
                                var u = i[0],
                                    a = i[1],
                                    s = r[0] - u,
                                    c = r[1] - a,
                                    f = o[0] - u,
                                    l = o[1] - a,
                                    h = 2 * (s * l - c * f);
                                if (!(h >= -Jw)) {
                                    var p = s * s + c * c,
                                        d = f * f + l * l,
                                        g = (l * p - c * d) / h,
                                        v = (s * d - f * p) / h,
                                        _ = $w.pop() || new pc;
                                    _.arc = t, _.site = i, _.x = g + u, _.y = (_.cy = v + a) + Math.sqrt(g * g + v * v), t.circle = _;
                                    for (var y = null, m = Vw._; m;)
                                        if (_.y < m.y || _.y === m.y && _.x <= m.x) {
                                            if (!m.L) {
                                                y = m.P;
                                                break
                                            }
                                            m = m.L
                                        } else {
                                            if (!m.R) {
                                                y = m;
                                                break
                                            }
                                            m = m.R
                                        }
                                    Vw.insert(y, _), y || (Hw = _)
                                }
                            }
                        }
                    }

                    function gc(t) {
                        var n = t.circle;
                        n && (n.P || (Hw = n.N), Vw.remove(n), $w.push(n), Js(n), t.circle = null)
                    }

                    function vc() {
                        Js(this), this.edge = this.site = this.circle = null
                    }

                    function _c(t) {
                        var n = Gw.pop() || new vc;
                        return n.site = t, n
                    }

                    function yc(t) {
                        gc(t), Bw.remove(t), Gw.push(t), Js(t)
                    }

                    function mc(t) {
                        var n = t.circle,
                            e = n.x,
                            r = n.cy,
                            i = [e, r],
                            o = t.P,
                            u = t.N,
                            a = [t];
                        yc(t);
                        for (var s = o; s.circle && Math.abs(e - s.circle.x) < Zw && Math.abs(r - s.circle.cy) < Zw;) o = s.P, a.unshift(s), yc(s), s = o;
                        a.unshift(s), gc(s);
                        for (var c = u; c.circle && Math.abs(e - c.circle.x) < Zw && Math.abs(r - c.circle.cy) < Zw;) u = c.N, a.push(c), yc(c), c = u;
                        a.push(c), gc(c);
                        var f, l = a.length;
                        for (f = 1; l > f; ++f) c = a[f], s = a[f - 1], rc(c.edge, s.site, c.site, i);
                        s = a[0], c = a[l - 1], c.edge = nc(s.site, c.site, null, i), dc(s), dc(c)
                    }

                    function xc(t) {
                        for (var n, e, r, i, o = t[0], u = t[1], a = Bw._; a;)
                            if (r = bc(a, u) - o, r > Zw) a = a.L;
                            else {
                                if (i = o - wc(a, u), !(i > Zw)) {
                                    r > -Zw ? (n = a.P, e = a) : i > -Zw ? (n = a, e = a.N) : n = e = a;
                                    break
                                }
                                if (!a.R) {
                                    n = a;
                                    break
                                }
                                a = a.R
                            }
                        ac(t);
                        var s = _c(t);
                        if (Bw.insert(n, s), n || e) {
                            if (n === e) return gc(n), e = _c(n.site), Bw.insert(s, e), s.edge = e.edge = nc(n.site, s.site), dc(n), void dc(e);
                            if (!e) return void(s.edge = nc(n.site, s.site));
                            gc(n), gc(e);
                            var c = n.site,
                                f = c[0],
                                l = c[1],
                                h = t[0] - f,
                                p = t[1] - l,
                                d = e.site,
                                g = d[0] - f,
                                v = d[1] - l,
                                _ = 2 * (h * v - p * g),
                                y = h * h + p * p,
                                m = g * g + v * v,
                                x = [(v * y - p * m) / _ + f, (h * m - g * y) / _ + l];
                            rc(e.edge, c, d, x), s.edge = nc(c, t, null, x), e.edge = nc(t, d, null, x), dc(n), dc(e)
                        }
                    }

                    function bc(t, n) {
                        var e = t.site,
                            r = e[0],
                            i = e[1],
                            o = i - n;
                        if (!o) return r;
                        var u = t.P;
                        if (!u) return -(1 / 0);
                        e = u.site;
                        var a = e[0],
                            s = e[1],
                            c = s - n;
                        if (!c) return a;
                        var f = a - r,
                            l = 1 / o - 1 / c,
                            h = f / c;
                        return l ? (-h + Math.sqrt(h * h - 2 * l * (f * f / (-2 * c) - s + c / 2 + i - o / 2))) / l + r : (r + a) / 2
                    }

                    function wc(t, n) {
                        var e = t.N;
                        if (e) return bc(e, n);
                        var r = t.site;
                        return r[1] === n ? r[0] : 1 / 0
                    }

                    function Mc(t, n, e) {
                        return (t[0] - e[0]) * (n[1] - t[1]) - (t[0] - n[0]) * (e[1] - t[1])
                    }

                    function kc(t, n) {
                        return n[1] - t[1] || n[0] - t[0]
                    }

                    function Tc(t, n) {
                        var e, r, i, o = t.sort(kc).pop();
                        for (Ww = [], Xw = new Array(t.length), Bw = new Zs, Vw = new Zs;;)
                            if (i = Hw, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x))(o[0] !== e || o[1] !== r) && (xc(o), e = o[0], r = o[1]), o = t.pop();
                            else {
                                if (!i) break;
                                mc(i.arc)
                            }
                        if (lc(), n) {
                            var u = +n[0][0],
                                a = +n[0][1],
                                s = +n[1][0],
                                c = +n[1][1];
                            uc(u, a, s, c), hc(u, a, s, c)
                        }
                        this.edges = Ww, this.cells = Xw, Bw = Vw = Ww = Xw = null
                    }

                    function Sc(t, n, e) {
                        this.target = t, this.type = n, this.transform = e
                    }

                    function Nc(t, n, e) {
                        this.k = t, this.x = n, this.y = e
                    }

                    function Ec(t) {
                        return t.__zoom || tM
                    }

                    function Ac() {
                        t.event.stopImmediatePropagation()
                    }

                    function Cc() {
                        return !t.event.button
                    }

                    function Pc() {
                        var t, n, e = this;
                        return e instanceof SVGElement ? (e = e.ownerSVGElement || e, t = e.width.baseVal.value, n = e.height.baseVal.value) : (t = e.clientWidth, n = e.clientHeight), [
                            [0, 0],
                            [t, n]
                        ]
                    }

                    function zc() {
                        return this.__zoom || tM
                    }
                    var Rc = "4.7.4",
                        qc = function(t, n) {
                            return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN
                        },
                        Lc = function(t) {
                            return 1 === t.length && (t = n(t)), {
                                left: function(n, e, r, i) {
                                    for (null == r && (r = 0), null == i && (i = n.length); i > r;) {
                                        var o = r + i >>> 1;
                                        t(n[o], e) < 0 ? r = o + 1 : i = o
                                    }
                                    return r
                                },
                                right: function(n, e, r, i) {
                                    for (null == r && (r = 0), null == i && (i = n.length); i > r;) {
                                        var o = r + i >>> 1;
                                        t(n[o], e) > 0 ? i = o : r = o + 1
                                    }
                                    return r
                                }
                            }
                        },
                        Uc = Lc(qc),
                        Oc = Uc.right,
                        Dc = Uc.left,
                        jc = function(t, n) {
                            null == n && (n = e);
                            for (var r = 0, i = t.length - 1, o = t[0], u = new Array(0 > i ? 0 : i); i > r;) u[r] = n(o, o = t[++r]);
                            return u
                        },
                        Fc = function(t, n, r) {
                            var i, o, u, a, s = t.length,
                                c = n.length,
                                f = new Array(s * c);
                            for (null == r && (r = e), i = u = 0; s > i; ++i)
                                for (a = t[i], o = 0; c > o; ++o, ++u) f[u] = r(a, n[o]);
                            return f
                        },
                        Ic = function(t, n) {
                            return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN
                        },
                        Yc = function(t) {
                            return null === t ? NaN : +t
                        },
                        Hc = function(t, n) {
                            var e, r, i = t.length,
                                o = 0,
                                u = 0,
                                a = -1,
                                s = 0;
                            if (null == n)
                                for (; ++a < i;) isNaN(e = Yc(t[a])) || (r = e - o, o += r / ++s, u += r * (e - o));
                            else
                                for (; ++a < i;) isNaN(e = Yc(n(t[a], a, t))) || (r = e - o, o += r / ++s, u += r * (e - o));
                            return s > 1 ? u / (s - 1) : void 0
                        },
                        Bc = function(t, n) {
                            var e = Hc(t, n);
                            return e ? Math.sqrt(e) : e
                        },
                        Xc = function(t, n) {
                            var e, r, i, o = -1,
                                u = t.length;
                            if (null == n) {
                                for (; ++o < u;)
                                    if (null != (r = t[o]) && r >= r) {
                                        e = i = r;
                                        break
                                    }
                                for (; ++o < u;) null != (r = t[o]) && (e > r && (e = r), r > i && (i = r))
                            } else {
                                for (; ++o < u;)
                                    if (null != (r = n(t[o], o, t)) && r >= r) {
                                        e = i = r;
                                        break
                                    }
                                for (; ++o < u;) null != (r = n(t[o], o, t)) && (e > r && (e = r), r > i && (i = r))
                            }
                            return [e, i]
                        },
                        Vc = Array.prototype,
                        Wc = Vc.slice,
                        $c = Vc.map,
                        Gc = function(t) {
                            return function() {
                                return t
                            }
                        },
                        Zc = function(t) {
                            return t
                        },
                        Jc = function(t, n, e) {
                            t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : 3 > i ? 1 : +e;
                            for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i;) o[r] = t + r * e;
                            return o
                        },
                        Qc = Math.sqrt(50),
                        Kc = Math.sqrt(10),
                        tf = Math.sqrt(2),
                        nf = function(t, n, e) {
                            var i = r(t, n, e);
                            return Jc(Math.ceil(t / i) * i, Math.floor(n / i) * i + i / 2, i)
                        },
                        ef = function(t) {
                            return Math.ceil(Math.log(t.length) / Math.LN2) + 1
                        },
                        rf = function() {
                            function t(t) {
                                var i, o, u = t.length,
                                    a = new Array(u);
                                for (i = 0; u > i; ++i) a[i] = n(t[i], i, t);
                                var s = e(a),
                                    c = s[0],
                                    f = s[1],
                                    l = r(a, c, f);
                                Array.isArray(l) || (l = nf(c, f, l));
                                for (var h = l.length; l[0] <= c;) l.shift(), --h;
                                for (; l[h - 1] >= f;) l.pop(), --h;
                                var p, d = new Array(h + 1);
                                for (i = 0; h >= i; ++i) p = d[i] = [], p.x0 = i > 0 ? l[i - 1] : c, p.x1 = h > i ? l[i] : f;
                                for (i = 0; u > i; ++i) o = a[i], o >= c && f >= o && d[Oc(l, o, 0, h)].push(t[i]);
                                return d
                            }
                            var n = Zc,
                                e = Xc,
                                r = ef;
                            return t.value = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Gc(e), t) : n
                            }, t.domain = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Gc([n[0], n[1]]), t) : e
                            }, t.thresholds = function(n) {
                                return arguments.length ? (r = "function" == typeof n ? n : Gc(Array.isArray(n) ? Wc.call(n) : n), t) : r
                            }, t
                        },
                        of = function(t, n, e) {
                            if (null == e && (e = Yc), r = t.length) {
                                if ((n = +n) <= 0 || 2 > r) return +e(t[0], 0, t);
                                if (n >= 1) return +e(t[r - 1], r - 1, t);
                                var r, i = (r - 1) * n,
                                    o = Math.floor(i),
                                    u = +e(t[o], o, t),
                                    a = +e(t[o + 1], o + 1, t);
                                return u + (a - u) * (i - o)
                            }
                        },
                        uf = function(t, n, e) {
                            return t = $c.call(t, Yc).sort(qc), Math.ceil((e - n) / (2 * ( of (t, .75) - of (t, .25)) * Math.pow(t.length, -1 / 3)))
                        },
                        af = function(t, n, e) {
                            return Math.ceil((e - n) / (3.5 * Bc(t) * Math.pow(t.length, -1 / 3)))
                        },
                        sf = function(t, n) {
                            var e, r, i = -1,
                                o = t.length;
                            if (null == n) {
                                for (; ++i < o;)
                                    if (null != (r = t[i]) && r >= r) {
                                        e = r;
                                        break
                                    }
                                for (; ++i < o;) null != (r = t[i]) && r > e && (e = r)
                            } else {
                                for (; ++i < o;)
                                    if (null != (r = n(t[i], i, t)) && r >= r) {
                                        e = r;
                                        break
                                    }
                                for (; ++i < o;) null != (r = n(t[i], i, t)) && r > e && (e = r)
                            }
                            return e
                        },
                        cf = function(t, n) {
                            var e, r = 0,
                                i = t.length,
                                o = -1,
                                u = i;
                            if (null == n)
                                for (; ++o < i;) isNaN(e = Yc(t[o])) ? --u : r += e;
                            else
                                for (; ++o < i;) isNaN(e = Yc(n(t[o], o, t))) ? --u : r += e;
                            return u ? r / u : void 0
                        },
                        ff = function(t, n) {
                            var e, r = [],
                                i = t.length,
                                o = -1;
                            if (null == n)
                                for (; ++o < i;) isNaN(e = Yc(t[o])) || r.push(e);
                            else
                                for (; ++o < i;) isNaN(e = Yc(n(t[o], o, t))) || r.push(e);
                            return of(r.sort(qc), .5)
                        },
                        lf = function(t) {
                            for (var n, e, r, i = t.length, o = -1, u = 0; ++o < i;) u += t[o].length;
                            for (e = new Array(u); --i >= 0;)
                                for (r = t[i], n = r.length; --n >= 0;) e[--u] = r[n];
                            return e
                        },
                        hf = function(t, n) {
                            var e, r, i = -1,
                                o = t.length;
                            if (null == n) {
                                for (; ++i < o;)
                                    if (null != (r = t[i]) && r >= r) {
                                        e = r;
                                        break
                                    }
                                for (; ++i < o;) null != (r = t[i]) && e > r && (e = r)
                            } else {
                                for (; ++i < o;)
                                    if (null != (r = n(t[i], i, t)) && r >= r) {
                                        e = r;
                                        break
                                    }
                                for (; ++i < o;) null != (r = n(t[i], i, t)) && e > r && (e = r)
                            }
                            return e
                        },
                        pf = function(t, n) {
                            for (var e = n.length, r = new Array(e); e--;) r[e] = t[n[e]];
                            return r
                        },
                        df = function(t, n) {
                            if (e = t.length) {
                                var e, r, i = 0,
                                    o = 0,
                                    u = t[o];
                                for (n || (n = qc); ++i < e;)(n(r = t[i], u) < 0 || 0 !== n(u, u)) && (u = r, o = i);
                                return 0 === n(u, u) ? o : void 0
                            }
                        },
                        gf = function(t, n, e) {
                            for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o;) i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r;
                            return t
                        },
                        vf = function(t, n) {
                            var e, r = 0,
                                i = t.length,
                                o = -1;
                            if (null == n)
                                for (; ++o < i;)(e = +t[o]) && (r += e);
                            else
                                for (; ++o < i;)(e = +n(t[o], o, t)) && (r += e);
                            return r
                        },
                        _f = function(t) {
                            if (!(o = t.length)) return [];
                            for (var n = -1, e = hf(t, i), r = new Array(e); ++n < e;)
                                for (var o, u = -1, a = r[n] = new Array(o); ++u < o;) a[u] = t[u][n];
                            return r
                        },
                        yf = function() {
                            return _f(arguments)
                        },
                        mf = Array.prototype.slice,
                        xf = function(t) {
                            return t
                        },
                        bf = 1,
                        wf = 2,
                        Mf = 3,
                        kf = 4,
                        Tf = 1e-6,
                        Sf = {
                            value: function() {}
                        };
                    g.prototype = d.prototype = {
                        constructor: g,
                        on: function(t, n) {
                            var e, r = this._,
                                i = v(t + "", r),
                                o = -1,
                                u = i.length; {
                                if (!(arguments.length < 2)) {
                                    if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
                                    for (; ++o < u;)
                                        if (e = (t = i[o]).type) r[e] = y(r[e], t.name, n);
                                        else if (null == n)
                                        for (e in r) r[e] = y(r[e], t.name, null);
                                    return this
                                }
                                for (; ++o < u;)
                                    if ((e = (t = i[o]).type) && (e = _(r[e], t.name))) return e
                            }
                        },
                        copy: function() {
                            var t = {},
                                n = this._;
                            for (var e in n) t[e] = n[e].slice();
                            return new g(t)
                        },
                        call: function(t, n) {
                            if ((e = arguments.length - 2) > 0)
                                for (var e, r, i = new Array(e), o = 0; e > o; ++o) i[o] = arguments[o + 2];
                            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
                            for (r = this._[t], o = 0, e = r.length; e > o; ++o) r[o].value.apply(n, i)
                        },
                        apply: function(t, n, e) {
                            if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
                            for (var r = this._[t], i = 0, o = r.length; o > i; ++i) r[i].value.apply(n, e)
                        }
                    };
                    var Nf = "http://www.w3.org/1999/xhtml",
                        Ef = {
                            svg: "http://www.w3.org/2000/svg",
                            xhtml: Nf,
                            xlink: "http://www.w3.org/1999/xlink",
                            xml: "http://www.w3.org/XML/1998/namespace",
                            xmlns: "http://www.w3.org/2000/xmlns/"
                        },
                        Af = function(t) {
                            var n = t += "",
                                e = n.indexOf(":");
                            return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), Ef.hasOwnProperty(n) ? {
                                space: Ef[n],
                                local: t
                            } : t
                        },
                        Cf = function(t) {
                            var n = Af(t);
                            return (n.local ? x : m)(n)
                        },
                        Pf = 0;
                    w.prototype = b.prototype = {
                        constructor: w,
                        get: function(t) {
                            for (var n = this._; !(n in t);)
                                if (!(t = t.parentNode)) return;
                            return t[n]
                        },
                        set: function(t, n) {
                            return t[this._] = n
                        },
                        remove: function(t) {
                            return this._ in t && delete t[this._]
                        },
                        toString: function() {
                            return this._
                        }
                    };
                    var zf = function(t) {
                        return function() {
                            return this.matches(t)
                        }
                    };
                    if ("undefined" != typeof document) {
                        var Rf = document.documentElement;
                        if (!Rf.matches) {
                            var qf = Rf.webkitMatchesSelector || Rf.msMatchesSelector || Rf.mozMatchesSelector || Rf.oMatchesSelector;
                            zf = function(t) {
                                return function() {
                                    return qf.call(this, t)
                                }
                            }
                        }
                    }
                    var Lf = zf,
                        Uf = {};
                    if (t.event = null, "undefined" != typeof document) {
                        var Of = document.documentElement;
                        "onmouseenter" in Of || (Uf = {
                            mouseenter: "mouseover",
                            mouseleave: "mouseout"
                        })
                    }
                    var Df = function(t, n, e) {
                            var r, i, o = T(t + ""),
                                u = o.length; {
                                if (!(arguments.length < 2)) {
                                    for (a = n ? N : S, null == e && (e = !1), r = 0; u > r; ++r) this.each(a(o[r], n, e));
                                    return this
                                }
                                var a = this.node().__on;
                                if (a)
                                    for (var s, c = 0, f = a.length; f > c; ++c)
                                        for (r = 0, s = a[c]; u > r; ++r)
                                            if ((i = o[r]).type === s.type && i.name === s.name) return s.value
                            }
                        },
                        jf = function() {
                            for (var n, e = t.event; n = e.sourceEvent;) e = n;
                            return e
                        },
                        Ff = function(t, n) {
                            var e = t.ownerSVGElement || t;
                            if (e.createSVGPoint) {
                                var r = e.createSVGPoint();
                                return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
                            }
                            var i = t.getBoundingClientRect();
                            return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]
                        },
                        If = function(t) {
                            var n = jf();
                            return n.changedTouches && (n = n.changedTouches[0]), Ff(t, n)
                        },
                        Yf = function(t) {
                            return null == t ? A : function() {
                                return this.querySelector(t)
                            }
                        },
                        Hf = function(t) {
                            "function" != typeof t && (t = Yf(t));
                            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; e > i; ++i)
                                for (var o, u, a = n[i], s = a.length, c = r[i] = new Array(s), f = 0; s > f; ++f)(o = a[f]) && (u = t.call(o, o.__data__, f, a)) && ("__data__" in o && (u.__data__ = o.__data__), c[f] = u);
                            return new dt(r, this._parents)
                        },
                        Bf = function(t) {
                            return null == t ? C : function() {
                                return this.querySelectorAll(t)
                            }
                        },
                        Xf = function(t) {
                            "function" != typeof t && (t = Bf(t));
                            for (var n = this._groups, e = n.length, r = [], i = [], o = 0; e > o; ++o)
                                for (var u, a = n[o], s = a.length, c = 0; s > c; ++c)(u = a[c]) && (r.push(t.call(u, u.__data__, c, a)), i.push(u));
                            return new dt(r, i)
                        },
                        Vf = function(t) {
                            "function" != typeof t && (t = Lf(t));
                            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; e > i; ++i)
                                for (var o, u = n[i], a = u.length, s = r[i] = [], c = 0; a > c; ++c)(o = u[c]) && t.call(o, o.__data__, c, u) && s.push(o);
                            return new dt(r, this._parents)
                        },
                        Wf = function(t) {
                            return new Array(t.length)
                        },
                        $f = function() {
                            return new dt(this._enter || this._groups.map(Wf), this._parents)
                        };
                    P.prototype = {
                        constructor: P,
                        appendChild: function(t) {
                            return this._parent.insertBefore(t, this._next)
                        },
                        insertBefore: function(t, n) {
                            return this._parent.insertBefore(t, n)
                        },
                        querySelector: function(t) {
                            return this._parent.querySelector(t)
                        },
                        querySelectorAll: function(t) {
                            return this._parent.querySelectorAll(t)
                        }
                    };
                    var Gf = function(t) {
                            return function() {
                                return t
                            }
                        },
                        Zf = "$",
                        Jf = function(t, n) {
                            if (!t) return p = new Array(this.size()), c = -1, this.each(function(t) {
                                p[++c] = t
                            }), p;
                            var e = n ? R : z,
                                r = this._parents,
                                i = this._groups;
                            "function" != typeof t && (t = Gf(t));
                            for (var o = i.length, u = new Array(o), a = new Array(o), s = new Array(o), c = 0; o > c; ++c) {
                                var f = r[c],
                                    l = i[c],
                                    h = l.length,
                                    p = t.call(f, f && f.__data__, c, r),
                                    d = p.length,
                                    g = a[c] = new Array(d),
                                    v = u[c] = new Array(d),
                                    _ = s[c] = new Array(h);
                                e(f, l, g, v, _, p, n);
                                for (var y, m, x = 0, b = 0; d > x; ++x)
                                    if (y = g[x]) {
                                        for (x >= b && (b = x + 1); !(m = v[b]) && ++b < d;);
                                        y._next = m || null
                                    }
                            }
                            return u = new dt(u, r), u._enter = a, u._exit = s, u
                        },
                        Qf = function() {
                            return new dt(this._exit || this._groups.map(Wf), this._parents)
                        },
                        Kf = function(t) {
                            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; o > a; ++a)
                                for (var s, c = n[a], f = e[a], l = c.length, h = u[a] = new Array(l), p = 0; l > p; ++p)(s = c[p] || f[p]) && (h[p] = s);
                            for (; r > a; ++a) u[a] = n[a];
                            return new dt(u, this._parents)
                        },
                        tl = function() {
                            for (var t = this._groups, n = -1, e = t.length; ++n < e;)
                                for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0;)(r = i[o]) && (u && u !== r.nextSibling && u.parentNode.insertBefore(r, u), u = r);
                            return this
                        },
                        nl = function(t) {
                            function n(n, e) {
                                return n && e ? t(n.__data__, e.__data__) : !n - !e
                            }
                            t || (t = q);
                            for (var e = this._groups, r = e.length, i = new Array(r), o = 0; r > o; ++o) {
                                for (var u, a = e[o], s = a.length, c = i[o] = new Array(s), f = 0; s > f; ++f)(u = a[f]) && (c[f] = u);
                                c.sort(n)
                            }
                            return new dt(i, this._parents).order()
                        },
                        el = function() {
                            var t = arguments[0];
                            return arguments[0] = this, t.apply(null, arguments), this
                        },
                        rl = function() {
                            var t = new Array(this.size()),
                                n = -1;
                            return this.each(function() {
                                t[++n] = this
                            }), t
                        },
                        il = function() {
                            for (var t = this._groups, n = 0, e = t.length; e > n; ++n)
                                for (var r = t[n], i = 0, o = r.length; o > i; ++i) {
                                    var u = r[i];
                                    if (u) return u
                                }
                            return null
                        },
                        ol = function() {
                            var t = 0;
                            return this.each(function() {
                                ++t
                            }), t
                        },
                        ul = function() {
                            return !this.node()
                        },
                        al = function(t) {
                            for (var n = this._groups, e = 0, r = n.length; r > e; ++e)
                                for (var i, o = n[e], u = 0, a = o.length; a > u; ++u)(i = o[u]) && t.call(i, i.__data__, u, o);
                            return this
                        },
                        sl = function(t, n) {
                            var e = Af(t);
                            if (arguments.length < 2) {
                                var r = this.node();
                                return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
                            }
                            return this.each((null == n ? e.local ? U : L : "function" == typeof n ? e.local ? F : j : e.local ? D : O)(e, n))
                        },
                        cl = function(t) {
                            return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
                        },
                        fl = function(t, n, e) {
                            var r;
                            return arguments.length > 1 ? this.each((null == n ? I : "function" == typeof n ? H : Y)(t, n, null == e ? "" : e)) : cl(r = this.node()).getComputedStyle(r, null).getPropertyValue(t)
                        },
                        ll = function(t, n) {
                            return arguments.length > 1 ? this.each((null == n ? B : "function" == typeof n ? V : X)(t, n)) : this.node()[t]
                        };
                    G.prototype = {
                        add: function(t) {
                            var n = this._names.indexOf(t);
                            0 > n && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
                        },
                        remove: function(t) {
                            var n = this._names.indexOf(t);
                            n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
                        },
                        contains: function(t) {
                            return this._names.indexOf(t) >= 0
                        }
                    };
                    var hl = function(t, n) {
                            var e = W(t + "");
                            if (arguments.length < 2) {
                                for (var r = $(this.node()), i = -1, o = e.length; ++i < o;)
                                    if (!r.contains(e[i])) return !1;
                                return !0
                            }
                            return this.each(("function" == typeof n ? tt : n ? Q : K)(e, n))
                        },
                        pl = function(t) {
                            return arguments.length ? this.each(null == t ? nt : ("function" == typeof t ? rt : et)(t)) : this.node().textContent
                        },
                        dl = function(t) {
                            return arguments.length ? this.each(null == t ? it : ("function" == typeof t ? ut : ot)(t)) : this.node().innerHTML
                        },
                        gl = function() {
                            return this.each(at)
                        },
                        vl = function() {
                            return this.each(st)
                        },
                        _l = function(t) {
                            var n = "function" == typeof t ? t : Cf(t);
                            return this.select(function() {
                                return this.appendChild(n.apply(this, arguments))
                            })
                        },
                        yl = function(t, n) {
                            var e = "function" == typeof t ? t : Cf(t),
                                r = null == n ? ct : "function" == typeof n ? n : Yf(n);
                            return this.select(function() {
                                return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
                            })
                        },
                        ml = function() {
                            return this.each(ft)
                        },
                        xl = function(t) {
                            return arguments.length ? this.property("__data__", t) : this.node().__data__
                        },
                        bl = function(t, n) {
                            return this.each(("function" == typeof n ? pt : ht)(t, n))
                        },
                        wl = [null];
                    dt.prototype = gt.prototype = {
                        constructor: dt,
                        select: Hf,
                        selectAll: Xf,
                        filter: Vf,
                        data: Jf,
                        enter: $f,
                        exit: Qf,
                        merge: Kf,
                        order: tl,
                        sort: nl,
                        call: el,
                        nodes: rl,
                        node: il,
                        size: ol,
                        empty: ul,
                        each: al,
                        attr: sl,
                        style: fl,
                        property: ll,
                        classed: hl,
                        text: pl,
                        html: dl,
                        raise: gl,
                        lower: vl,
                        append: _l,
                        insert: yl,
                        remove: ml,
                        datum: xl,
                        on: Df,
                        dispatch: bl
                    };
                    var Ml = function(t) {
                            return "string" == typeof t ? new dt([
                                [document.querySelector(t)]
                            ], [document.documentElement]) : new dt([
                                [t]
                            ], wl)
                        },
                        kl = function(t) {
                            return "string" == typeof t ? new dt([document.querySelectorAll(t)], [document.documentElement]) : new dt([null == t ? [] : t], wl)
                        },
                        Tl = function(t, n, e) {
                            arguments.length < 3 && (e = n, n = jf().changedTouches);
                            for (var r, i = 0, o = n ? n.length : 0; o > i; ++i)
                                if ((r = n[i]).identifier === e) return Ff(t, r);
                            return null
                        },
                        Sl = function(t, n) {
                            null == n && (n = jf().touches);
                            for (var e = 0, r = n ? n.length : 0, i = new Array(r); r > e; ++e) i[e] = Ff(t, n[e]);
                            return i
                        },
                        Nl = function() {
                            t.event.preventDefault(), t.event.stopImmediatePropagation()
                        },
                        El = function(t) {
                            var n = t.document.documentElement,
                                e = Ml(t).on("dragstart.drag", Nl, !0);
                            "onselectstart" in n ? e.on("selectstart.drag", Nl, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none")
                        },
                        Al = function(t) {
                            return function() {
                                return t
                            }
                        };
                    yt.prototype.on = function() {
                        var t = this._.on.apply(this._, arguments);
                        return t === this._ ? this : t
                    };
                    var Cl = function() {
                            function n(t) {
                                t.on("mousedown.drag", e).on("touchstart.drag", o).on("touchmove.drag", u).on("touchend.drag touchcancel.drag", a).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                            }

                            function e() {
                                if (!f && l.apply(this, arguments)) {
                                    var n = s("mouse", h.apply(this, arguments), If, this, arguments);
                                    n && (Ml(t.event.view).on("mousemove.drag", r, !0).on("mouseup.drag", i, !0), El(t.event.view), vt(), c = !1, n("start"))
                                }
                            }

                            function r() {
                                Nl(), c = !0, g.mouse("drag")
                            }

                            function i() {
                                Ml(t.event.view).on("mousemove.drag mouseup.drag", null), _t(t.event.view, c), Nl(), g.mouse("end")
                            }

                            function o() {
                                if (l.apply(this, arguments)) {
                                    var n, e, r = t.event.changedTouches,
                                        i = h.apply(this, arguments),
                                        o = r.length;
                                    for (n = 0; o > n; ++n)(e = s(r[n].identifier, i, Tl, this, arguments)) && (vt(), e("start"))
                                }
                            }

                            function u() {
                                var n, e, r = t.event.changedTouches,
                                    i = r.length;
                                for (n = 0; i > n; ++n)(e = g[r[n].identifier]) && (Nl(), e("drag"))
                            }

                            function a() {
                                var n, e, r = t.event.changedTouches,
                                    i = r.length;
                                for (f && clearTimeout(f), f = setTimeout(function() {
                                        f = null
                                    }, 500), n = 0; i > n; ++n)(e = g[r[n].identifier]) && (vt(), e("end"))
                            }

                            function s(e, r, i, o, u) {
                                var a, s, c, f = i(r, e),
                                    l = v.copy();
                                if (E(new yt(n, "beforestart", a, e, _, f[0], f[1], 0, 0, l), function() {
                                        return null == (t.event.subject = a = p.apply(o, u)) ? !1 : (s = a.x - f[0] || 0, c = a.y - f[1] || 0, !0)
                                    })) return function h(t) {
                                    var p, d = f;
                                    switch (t) {
                                        case "start":
                                            g[e] = h, p = _++;
                                            break;
                                        case "end":
                                            delete g[e], --_;
                                        case "drag":
                                            f = i(r, e), p = _
                                    }
                                    E(new yt(n, t, a, e, p, f[0] + s, f[1] + c, f[0] - d[0], f[1] - d[1], l), l.apply, l, [t, o, u])
                                }
                            }
                            var c, f, l = mt,
                                h = xt,
                                p = bt,
                                g = {},
                                v = d("start", "drag", "end"),
                                _ = 0;
                            return n.filter = function(t) {
                                return arguments.length ? (l = "function" == typeof t ? t : Al(!!t), n) : l
                            }, n.container = function(t) {
                                return arguments.length ? (h = "function" == typeof t ? t : Al(t), n) : h
                            }, n.subject = function(t) {
                                return arguments.length ? (p = "function" == typeof t ? t : Al(t), n) : p
                            }, n.on = function() {
                                var t = v.on.apply(v, arguments);
                                return t === v ? n : t
                            }, n
                        },
                        Pl = function(t, n, e) {
                            t.prototype = n.prototype = e, e.constructor = t
                        },
                        zl = .7,
                        Rl = 1 / zl,
                        ql = "\\s*([+-]?\\d+)\\s*",
                        Ll = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
                        Ul = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
                        Ol = /^#([0-9a-f]{3})$/,
                        Dl = /^#([0-9a-f]{6})$/,
                        jl = new RegExp("^rgb\\(" + [ql, ql, ql] + "\\)$"),
                        Fl = new RegExp("^rgb\\(" + [Ul, Ul, Ul] + "\\)$"),
                        Il = new RegExp("^rgba\\(" + [ql, ql, ql, Ll] + "\\)$"),
                        Yl = new RegExp("^rgba\\(" + [Ul, Ul, Ul, Ll] + "\\)$"),
                        Hl = new RegExp("^hsl\\(" + [Ll, Ul, Ul] + "\\)$"),
                        Bl = new RegExp("^hsla\\(" + [Ll, Ul, Ul, Ll] + "\\)$"),
                        Xl = {
                            aliceblue: 15792383,
                            antiquewhite: 16444375,
                            aqua: 65535,
                            aquamarine: 8388564,
                            azure: 15794175,
                            beige: 16119260,
                            bisque: 16770244,
                            black: 0,
                            blanchedalmond: 16772045,
                            blue: 255,
                            blueviolet: 9055202,
                            brown: 10824234,
                            burlywood: 14596231,
                            cadetblue: 6266528,
                            chartreuse: 8388352,
                            chocolate: 13789470,
                            coral: 16744272,
                            cornflowerblue: 6591981,
                            cornsilk: 16775388,
                            crimson: 14423100,
                            cyan: 65535,
                            darkblue: 139,
                            darkcyan: 35723,
                            darkgoldenrod: 12092939,
                            darkgray: 11119017,
                            darkgreen: 25600,
                            darkgrey: 11119017,
                            darkkhaki: 12433259,
                            darkmagenta: 9109643,
                            darkolivegreen: 5597999,
                            darkorange: 16747520,
                            darkorchid: 10040012,
                            darkred: 9109504,
                            darksalmon: 15308410,
                            darkseagreen: 9419919,
                            darkslateblue: 4734347,
                            darkslategray: 3100495,
                            darkslategrey: 3100495,
                            darkturquoise: 52945,
                            darkviolet: 9699539,
                            deeppink: 16716947,
                            deepskyblue: 49151,
                            dimgray: 6908265,
                            dimgrey: 6908265,
                            dodgerblue: 2003199,
                            firebrick: 11674146,
                            floralwhite: 16775920,
                            forestgreen: 2263842,
                            fuchsia: 16711935,
                            gainsboro: 14474460,
                            ghostwhite: 16316671,
                            gold: 16766720,
                            goldenrod: 14329120,
                            gray: 8421504,
                            green: 32768,
                            greenyellow: 11403055,
                            grey: 8421504,
                            honeydew: 15794160,
                            hotpink: 16738740,
                            indianred: 13458524,
                            indigo: 4915330,
                            ivory: 16777200,
                            khaki: 15787660,
                            lavender: 15132410,
                            lavenderblush: 16773365,
                            lawngreen: 8190976,
                            lemonchiffon: 16775885,
                            lightblue: 11393254,
                            lightcoral: 15761536,
                            lightcyan: 14745599,
                            lightgoldenrodyellow: 16448210,
                            lightgray: 13882323,
                            lightgreen: 9498256,
                            lightgrey: 13882323,
                            lightpink: 16758465,
                            lightsalmon: 16752762,
                            lightseagreen: 2142890,
                            lightskyblue: 8900346,
                            lightslategray: 7833753,
                            lightslategrey: 7833753,
                            lightsteelblue: 11584734,
                            lightyellow: 16777184,
                            lime: 65280,
                            limegreen: 3329330,
                            linen: 16445670,
                            magenta: 16711935,
                            maroon: 8388608,
                            mediumaquamarine: 6737322,
                            mediumblue: 205,
                            mediumorchid: 12211667,
                            mediumpurple: 9662683,
                            mediumseagreen: 3978097,
                            mediumslateblue: 8087790,
                            mediumspringgreen: 64154,
                            mediumturquoise: 4772300,
                            mediumvioletred: 13047173,
                            midnightblue: 1644912,
                            mintcream: 16121850,
                            mistyrose: 16770273,
                            moccasin: 16770229,
                            navajowhite: 16768685,
                            navy: 128,
                            oldlace: 16643558,
                            olive: 8421376,
                            olivedrab: 7048739,
                            orange: 16753920,
                            orangered: 16729344,
                            orchid: 14315734,
                            palegoldenrod: 15657130,
                            palegreen: 10025880,
                            paleturquoise: 11529966,
                            palevioletred: 14381203,
                            papayawhip: 16773077,
                            peachpuff: 16767673,
                            peru: 13468991,
                            pink: 16761035,
                            plum: 14524637,
                            powderblue: 11591910,
                            purple: 8388736,
                            rebeccapurple: 6697881,
                            red: 16711680,
                            rosybrown: 12357519,
                            royalblue: 4286945,
                            saddlebrown: 9127187,
                            salmon: 16416882,
                            sandybrown: 16032864,
                            seagreen: 3050327,
                            seashell: 16774638,
                            sienna: 10506797,
                            silver: 12632256,
                            skyblue: 8900331,
                            slateblue: 6970061,
                            slategray: 7372944,
                            slategrey: 7372944,
                            snow: 16775930,
                            springgreen: 65407,
                            steelblue: 4620980,
                            tan: 13808780,
                            teal: 32896,
                            thistle: 14204888,
                            tomato: 16737095,
                            turquoise: 4251856,
                            violet: 15631086,
                            wheat: 16113331,
                            white: 16777215,
                            whitesmoke: 16119285,
                            yellow: 16776960,
                            yellowgreen: 10145074
                        };
                    Pl(Mt, kt, {
                        displayable: function() {
                            return this.rgb().displayable()
                        },
                        toString: function() {
                            return this.rgb() + ""
                        }
                    }), Pl(At, Et, wt(Mt, {
                        brighter: function(t) {
                            return t = null == t ? Rl : Math.pow(Rl, t), new At(this.r * t, this.g * t, this.b * t, this.opacity)
                        },
                        darker: function(t) {
                            return t = null == t ? zl : Math.pow(zl, t), new At(this.r * t, this.g * t, this.b * t, this.opacity)
                        },
                        rgb: function() {
                            return this
                        },
                        displayable: function() {
                            return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
                        },
                        toString: function() {
                            var t = this.opacity;
                            return t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t)), (1 === t ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
                        }
                    })), Pl(Rt, zt, wt(Mt, {
                        brighter: function(t) {
                            return t = null == t ? Rl : Math.pow(Rl, t), new Rt(this.h, this.s, this.l * t, this.opacity)
                        },
                        darker: function(t) {
                            return t = null == t ? zl : Math.pow(zl, t), new Rt(this.h, this.s, this.l * t, this.opacity)
                        },
                        rgb: function() {
                            var t = this.h % 360 + 360 * (this.h < 0),
                                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                                e = this.l,
                                r = e + (.5 > e ? e : 1 - e) * n,
                                i = 2 * e - r;
                            return new At(qt(t >= 240 ? t - 240 : t + 120, i, r), qt(t, i, r), qt(120 > t ? t + 240 : t - 120, i, r), this.opacity)
                        },
                        displayable: function() {
                            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
                        }
                    }));
                    var Vl = Math.PI / 180,
                        Wl = 180 / Math.PI,
                        $l = 18,
                        Gl = .95047,
                        Zl = 1,
                        Jl = 1.08883,
                        Ql = 4 / 29,
                        Kl = 6 / 29,
                        th = 3 * Kl * Kl,
                        nh = Kl * Kl * Kl;
                    Pl(Ot, Ut, wt(Mt, {
                        brighter: function(t) {
                            return new Ot(this.l + $l * (null == t ? 1 : t), this.a, this.b, this.opacity)
                        },
                        darker: function(t) {
                            return new Ot(this.l - $l * (null == t ? 1 : t), this.a, this.b, this.opacity)
                        },
                        rgb: function() {
                            var t = (this.l + 16) / 116,
                                n = isNaN(this.a) ? t : t + this.a / 500,
                                e = isNaN(this.b) ? t : t - this.b / 200;
                            return t = Zl * jt(t), n = Gl * jt(n), e = Jl * jt(e), new At(Ft(3.2404542 * n - 1.5371385 * t - .4985314 * e), Ft(-.969266 * n + 1.8760108 * t + .041556 * e), Ft(.0556434 * n - .2040259 * t + 1.0572252 * e), this.opacity)
                        }
                    })), Pl(Bt, Ht, wt(Mt, {
                        brighter: function(t) {
                            return new Bt(this.h, this.c, this.l + $l * (null == t ? 1 : t), this.opacity)
                        },
                        darker: function(t) {
                            return new Bt(this.h, this.c, this.l - $l * (null == t ? 1 : t), this.opacity)
                        },
                        rgb: function() {
                            return Lt(this).rgb()
                        }
                    }));
                    var eh = -.14861,
                        rh = 1.78277,
                        ih = -.29227,
                        oh = -.90649,
                        uh = 1.97294,
                        ah = uh * oh,
                        sh = uh * rh,
                        ch = rh * ih - oh * eh;
                    Pl(Wt, Vt, wt(Mt, {
                        brighter: function(t) {
                            return t = null == t ? Rl : Math.pow(Rl, t), new Wt(this.h, this.s, this.l * t, this.opacity)
                        },
                        darker: function(t) {
                            return t = null == t ? zl : Math.pow(zl, t), new Wt(this.h, this.s, this.l * t, this.opacity)
                        },
                        rgb: function() {
                            var t = isNaN(this.h) ? 0 : (this.h + 120) * Vl,
                                n = +this.l,
                                e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
                                r = Math.cos(t),
                                i = Math.sin(t);
                            return new At(255 * (n + e * (eh * r + rh * i)), 255 * (n + e * (ih * r + oh * i)), 255 * (n + e * (uh * r)), this.opacity)
                        }
                    }));
                    var fh, lh, hh, ph, dh, gh, vh = function(t) {
                            var n = t.length - 1;
                            return function(e) {
                                var r = 0 >= e ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n),
                                    i = t[r],
                                    o = t[r + 1],
                                    u = r > 0 ? t[r - 1] : 2 * i - o,
                                    a = n - 1 > r ? t[r + 2] : 2 * o - i;
                                return $t((e - r / n) * n, u, i, o, a)
                            }
                        },
                        _h = function(t) {
                            var n = t.length;
                            return function(e) {
                                var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
                                    i = t[(r + n - 1) % n],
                                    o = t[r % n],
                                    u = t[(r + 1) % n],
                                    a = t[(r + 2) % n];
                                return $t((e - r / n) * n, i, o, u, a)
                            }
                        },
                        yh = function(t) {
                            return function() {
                                return t
                            }
                        },
                        mh = function rM(t) {
                            function n(t, n) {
                                var r = e((t = Et(t)).r, (n = Et(n)).r),
                                    i = e(t.g, n.g),
                                    o = e(t.b, n.b),
                                    u = Kt(t.opacity, n.opacity);
                                return function(n) {
                                    return t.r = r(n), t.g = i(n), t.b = o(n), t.opacity = u(n), t + ""
                                }
                            }
                            var e = Qt(t);
                            return n.gamma = rM, n
                        }(1),
                        xh = tn(vh),
                        bh = tn(_h),
                        wh = function(t, n) {
                            var e, r = n ? n.length : 0,
                                i = t ? Math.min(r, t.length) : 0,
                                o = new Array(r),
                                u = new Array(r);
                            for (e = 0; i > e; ++e) o[e] = Ah(t[e], n[e]);
                            for (; r > e; ++e) u[e] = n[e];
                            return function(t) {
                                for (e = 0; i > e; ++e) u[e] = o[e](t);
                                return u
                            }
                        },
                        Mh = function(t, n) {
                            var e = new Date;
                            return t = +t, n -= t,
                                function(r) {
                                    return e.setTime(t + n * r), e
                                }
                        },
                        kh = function(t, n) {
                            return t = +t, n -= t,
                                function(e) {
                                    return t + n * e
                                }
                        },
                        Th = function(t, n) {
                            var e, r = {},
                                i = {};
                            (null === t || "object" != typeof t) && (t = {}), (null === n || "object" != typeof n) && (n = {});
                            for (e in n) e in t ? r[e] = Ah(t[e], n[e]) : i[e] = n[e];
                            return function(t) {
                                for (e in r) i[e] = r[e](t);
                                return i
                            }
                        },
                        Sh = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
                        Nh = new RegExp(Sh.source, "g"),
                        Eh = function(t, n) {
                            var e, r, i, o = Sh.lastIndex = Nh.lastIndex = 0,
                                u = -1,
                                a = [],
                                s = [];
                            for (t += "", n += "";
                                (e = Sh.exec(t)) && (r = Nh.exec(n));)(i = r.index) > o && (i = n.slice(o, i), a[u] ? a[u] += i : a[++u] = i), (e = e[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, s.push({
                                i: u,
                                x: kh(e, r)
                            })), o = Nh.lastIndex;
                            return o < n.length && (i = n.slice(o), a[u] ? a[u] += i : a[++u] = i), a.length < 2 ? s[0] ? en(s[0].x) : nn(n) : (n = s.length, function(t) {
                                for (var e, r = 0; n > r; ++r) a[(e = s[r]).i] = e.x(t);
                                return a.join("")
                            })
                        },
                        Ah = function(t, n) {
                            var e, r = typeof n;
                            return null == n || "boolean" === r ? yh(n) : ("number" === r ? kh : "string" === r ? (e = kt(n)) ? (n = e, mh) : Eh : n instanceof kt ? mh : n instanceof Date ? Mh : Array.isArray(n) ? wh : isNaN(n) ? Th : kh)(t, n)
                        },
                        Ch = function(t, n) {
                            return t = +t, n -= t,
                                function(e) {
                                    return Math.round(t + n * e)
                                }
                        },
                        Ph = 180 / Math.PI,
                        zh = {
                            translateX: 0,
                            translateY: 0,
                            rotate: 0,
                            skewX: 0,
                            scaleX: 1,
                            scaleY: 1
                        },
                        Rh = function(t, n, e, r, i, o) {
                            var u, a, s;
                            return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (s = t * e + n * r) && (e -= t * s, r -= n * s), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, s /= a), n * e > t * r && (t = -t, n = -n, s = -s, u = -u), {
                                translateX: i,
                                translateY: o,
                                rotate: Math.atan2(n, t) * Ph,
                                skewX: Math.atan(s) * Ph,
                                scaleX: u,
                                scaleY: a
                            }
                        },
                        qh = un(rn, "px, ", "px)", "deg)"),
                        Lh = un(on, ", ", ")", ")"),
                        Uh = Math.SQRT2,
                        Oh = 2,
                        Dh = 4,
                        jh = 1e-12,
                        Fh = function(t, n) {
                            var e, r, i = t[0],
                                o = t[1],
                                u = t[2],
                                a = n[0],
                                s = n[1],
                                c = n[2],
                                f = a - i,
                                l = s - o,
                                h = f * f + l * l;
                            if (jh > h) r = Math.log(c / u) / Uh, e = function(t) {
                                return [i + t * f, o + t * l, u * Math.exp(Uh * t * r)]
                            };
                            else {
                                var p = Math.sqrt(h),
                                    d = (c * c - u * u + Dh * h) / (2 * u * Oh * p),
                                    g = (c * c - u * u - Dh * h) / (2 * c * Oh * p),
                                    v = Math.log(Math.sqrt(d * d + 1) - d),
                                    _ = Math.log(Math.sqrt(g * g + 1) - g);
                                r = (_ - v) / Uh, e = function(t) {
                                    var n = t * r,
                                        e = an(v),
                                        a = u / (Oh * p) * (e * cn(Uh * n + v) - sn(v));
                                    return [i + a * f, o + a * l, u * e / an(Uh * n + v)]
                                }
                            }
                            return e.duration = 1e3 * r, e
                        },
                        Ih = fn(Jt),
                        Yh = fn(Kt),
                        Hh = hn(Jt),
                        Bh = hn(Kt),
                        Xh = pn(Jt),
                        Vh = pn(Kt),
                        Wh = function(t, n) {
                            for (var e = new Array(n), r = 0; n > r; ++r) e[r] = t(r / (n - 1));
                            return e
                        },
                        $h = 0,
                        Gh = 0,
                        Zh = 0,
                        Jh = 1e3,
                        Qh = 0,
                        Kh = 0,
                        tp = 0,
                        np = "object" == typeof performance && performance.now ? performance : Date,
                        ep = "function" == typeof requestAnimationFrame ? requestAnimationFrame : function(t) {
                            setTimeout(t, 17)
                        };
                    vn.prototype = _n.prototype = {
                        constructor: vn,
                        restart: function(t, n, e) {
                            if ("function" != typeof t) throw new TypeError("callback is not a function");
                            e = (null == e ? dn() : +e) + (null == n ? 0 : +n), this._next || gh === this || (gh ? gh._next = this : dh = this, gh = this), this._call = t, this._time = e, wn()
                        },
                        stop: function() {
                            this._call && (this._call = null, this._time = 1 / 0, wn())
                        }
                    };
                    var rp = function(t, n, e) {
                            var r = new vn;
                            return n = null == n ? 0 : +n, r.restart(function(e) {
                                r.stop(), t(e + n)
                            }, n, e), r
                        },
                        ip = function(t, n, e) {
                            var r = new vn,
                                i = n;
                            return null == n ? (r.restart(t, n, e), r) : (n = +n, e = null == e ? dn() : +e, r.restart(function o(u) {
                                u += i, r.restart(o, i += n, e), t(u)
                            }, n, e), r)
                        },
                        op = d("start", "end", "interrupt"),
                        up = [],
                        ap = 0,
                        sp = 1,
                        cp = 2,
                        fp = 3,
                        lp = 4,
                        hp = 5,
                        pp = 6,
                        dp = function(t, n, e, r, i, o) {
                            var u = t.__transition;
                            if (u) {
                                if (e in u) return
                            } else t.__transition = {};
                            Sn(t, e, {
                                name: n,
                                index: r,
                                group: i,
                                on: op,
                                tween: up,
                                time: o.time,
                                delay: o.delay,
                                duration: o.duration,
                                ease: o.ease,
                                timer: null,
                                state: ap
                            })
                        },
                        gp = function(t, n) {
                            var e, r, i, o = t.__transition,
                                u = !0;
                            if (o) {
                                n = null == n ? null : n + "";
                                for (i in o)(e = o[i]).name === n ? (r = e.state > cp && e.state < hp, e.state = pp, e.timer.stop(), r && e.on.call("interrupt", t, t.__data__, e.index, e.group), delete o[i]) : u = !1;
                                u && delete t.__transition
                            }
                        },
                        vp = function(t) {
                            return this.each(function() {
                                gp(this, t)
                            })
                        },
                        _p = function(t, n) {
                            var e = this._id;
                            if (t += "", arguments.length < 2) {
                                for (var r, i = Tn(this.node(), e).tween, o = 0, u = i.length; u > o; ++o)
                                    if ((r = i[o]).name === t) return r.value;
                                return null
                            }
                            return this.each((null == n ? Nn : En)(e, t, n))
                        },
                        yp = function(t, n) {
                            var e;
                            return ("number" == typeof n ? kh : n instanceof kt ? mh : (e = kt(n)) ? (n = e, mh) : Eh)(t, n)
                        },
                        mp = function(t, n) {
                            var e = Af(t),
                                r = "transform" === e ? Lh : yp;
                            return this.attrTween(t, "function" == typeof n ? (e.local ? Ln : qn)(e, r, An(this, "attr." + t, n)) : null == n ? (e.local ? Pn : Cn)(e) : (e.local ? Rn : zn)(e, r, n + ""))
                        },
                        xp = function(t, n) {
                            var e = "attr." + t;
                            if (arguments.length < 2) return (e = this.tween(e)) && e._value;
                            if (null == n) return this.tween(e, null);
                            if ("function" != typeof n) throw new Error;
                            var r = Af(t);
                            return this.tween(e, (r.local ? Un : On)(r, n))
                        },
                        bp = function(t) {
                            var n = this._id;
                            return arguments.length ? this.each(("function" == typeof t ? Dn : jn)(n, t)) : Tn(this.node(), n).delay
                        },
                        wp = function(t) {
                            var n = this._id;
                            return arguments.length ? this.each(("function" == typeof t ? Fn : In)(n, t)) : Tn(this.node(), n).duration
                        },
                        Mp = function(t) {
                            var n = this._id;
                            return arguments.length ? this.each(Yn(n, t)) : Tn(this.node(), n).ease
                        },
                        kp = function(t) {
                            "function" != typeof t && (t = Lf(t));
                            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; e > i; ++i)
                                for (var o, u = n[i], a = u.length, s = r[i] = [], c = 0; a > c; ++c)(o = u[c]) && t.call(o, o.__data__, c, u) && s.push(o);
                            return new Kn(r, this._parents, this._name, this._id)
                        },
                        Tp = function(t) {
                            if (t._id !== this._id) throw new Error;
                            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; o > a; ++a)
                                for (var s, c = n[a], f = e[a], l = c.length, h = u[a] = new Array(l), p = 0; l > p; ++p)(s = c[p] || f[p]) && (h[p] = s);
                            for (; r > a; ++a) u[a] = n[a];
                            return new Kn(u, this._parents, this._name, this._id)
                        },
                        Sp = function(t, n) {
                            var e = this._id;
                            return arguments.length < 2 ? Tn(this.node(), e).on.on(t) : this.each(Bn(e, t, n))
                        },
                        Np = function() {
                            return this.on("end.remove", Xn(this._id))
                        },
                        Ep = function(t) {
                            var n = this._name,
                                e = this._id;
                            "function" != typeof t && (t = Yf(t));
                            for (var r = this._groups, i = r.length, o = new Array(i), u = 0; i > u; ++u)
                                for (var a, s, c = r[u], f = c.length, l = o[u] = new Array(f), h = 0; f > h; ++h)(a = c[h]) && (s = t.call(a, a.__data__, h, c)) && ("__data__" in a && (s.__data__ = a.__data__), l[h] = s, dp(l[h], n, e, h, l, Tn(a, e)));
                            return new Kn(o, this._parents, n, e)
                        },
                        Ap = function(t) {
                            var n = this._name,
                                e = this._id;
                            "function" != typeof t && (t = Bf(t));
                            for (var r = this._groups, i = r.length, o = [], u = [], a = 0; i > a; ++a)
                                for (var s, c = r[a], f = c.length, l = 0; f > l; ++l)
                                    if (s = c[l]) {
                                        for (var h, p = t.call(s, s.__data__, l, c), d = Tn(s, e), g = 0, v = p.length; v > g; ++g)(h = p[g]) && dp(h, n, e, g, p, d);
                                        o.push(p), u.push(s)
                                    }
                            return new Kn(o, u, n, e)
                        },
                        Cp = gt.prototype.constructor,
                        Pp = function() {
                            return new Cp(this._groups, this._parents)
                        },
                        zp = function(t, n, e) {
                            var r = "transform" == (t += "") ? qh : yp;
                            return null == n ? this.styleTween(t, Vn(t, r)).on("end.style." + t, Wn(t)) : this.styleTween(t, "function" == typeof n ? Gn(t, r, An(this, "style." + t, n)) : $n(t, r, n + ""), e)
                        },
                        Rp = function(t, n, e) {
                            var r = "style." + (t += "");
                            if (arguments.length < 2) return (r = this.tween(r)) && r._value;
                            if (null == n) return this.tween(r, null);
                            if ("function" != typeof n) throw new Error;
                            return this.tween(r, Zn(t, n, null == e ? "" : e))
                        },
                        qp = function(t) {
                            return this.tween("text", "function" == typeof t ? Qn(An(this, "text", t)) : Jn(null == t ? "" : t + ""))
                        },
                        Lp = function() {
                            for (var t = this._name, n = this._id, e = ne(), r = this._groups, i = r.length, o = 0; i > o; ++o)
                                for (var u, a = r[o], s = a.length, c = 0; s > c; ++c)
                                    if (u = a[c]) {
                                        var f = Tn(u, n);
                                        dp(u, t, e, c, a, {
                                            time: f.time + f.delay + f.duration,
                                            delay: 0,
                                            duration: f.duration,
                                            ease: f.ease
                                        })
                                    }
                            return new Kn(r, this._parents, t, e)
                        },
                        Up = 0,
                        Op = gt.prototype;
                    Kn.prototype = te.prototype = {
                        constructor: Kn,
                        select: Ep,
                        selectAll: Ap,
                        filter: kp,
                        merge: Tp,
                        selection: Pp,
                        transition: Lp,
                        call: Op.call,
                        nodes: Op.nodes,
                        node: Op.node,
                        size: Op.size,
                        empty: Op.empty,
                        each: Op.each,
                        on: Sp,
                        attr: mp,
                        attrTween: xp,
                        style: zp,
                        styleTween: Rp,
                        text: qp,
                        remove: Np,
                        tween: _p,
                        delay: bp,
                        duration: wp,
                        ease: Mp
                    };
                    var Dp = 3,
                        jp = function iM(t) {
                            function n(n) {
                                return Math.pow(n, t)
                            }
                            return t = +t, n.exponent = iM, n
                        }(Dp),
                        Fp = function oM(t) {
                            function n(n) {
                                return 1 - Math.pow(1 - n, t)
                            }
                            return t = +t, n.exponent = oM, n
                        }(Dp),
                        Ip = function uM(t) {
                            function n(n) {
                                return ((n *= 2) <= 1 ? Math.pow(n, t) : 2 - Math.pow(2 - n, t)) / 2
                            }
                            return t = +t, n.exponent = uM, n
                        }(Dp),
                        Yp = Math.PI,
                        Hp = Yp / 2,
                        Bp = 4 / 11,
                        Xp = 6 / 11,
                        Vp = 8 / 11,
                        Wp = .75,
                        $p = 9 / 11,
                        Gp = 10 / 11,
                        Zp = .9375,
                        Jp = 21 / 22,
                        Qp = 63 / 64,
                        Kp = 1 / Bp / Bp,
                        td = 1.70158,
                        nd = function aM(t) {
                            function n(n) {
                                return n * n * ((t + 1) * n - t)
                            }
                            return t = +t, n.overshoot = aM, n
                        }(td),
                        ed = function sM(t) {
                            function n(n) {
                                return --n * n * ((t + 1) * n + t) + 1
                            }
                            return t = +t, n.overshoot = sM, n
                        }(td),
                        rd = function cM(t) {
                            function n(n) {
                                return ((n *= 2) < 1 ? n * n * ((t + 1) * n - t) : (n -= 2) * n * ((t + 1) * n + t) + 2) / 2
                            }
                            return t = +t, n.overshoot = cM, n
                        }(td),
                        id = 2 * Math.PI,
                        od = 1,
                        ud = .3,
                        ad = function fM(t, n) {
                            function e(e) {
                                return t * Math.pow(2, 10 * --e) * Math.sin((r - e) / n)
                            }
                            var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= id);
                            return e.amplitude = function(t) {
                                return fM(t, n * id)
                            }, e.period = function(n) {
                                return fM(t, n)
                            }, e
                        }(od, ud),
                        sd = function lM(t, n) {
                            function e(e) {
                                return 1 - t * Math.pow(2, -10 * (e = +e)) * Math.sin((e + r) / n)
                            }
                            var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= id);
                            return e.amplitude = function(t) {
                                return lM(t, n * id)
                            }, e.period = function(n) {
                                return lM(t, n)
                            }, e
                        }(od, ud),
                        cd = function hM(t, n) {
                            function e(e) {
                                return ((e = 2 * e - 1) < 0 ? t * Math.pow(2, 10 * e) * Math.sin((r - e) / n) : 2 - t * Math.pow(2, -10 * e) * Math.sin((r + e) / n)) / 2
                            }
                            var r = Math.asin(1 / (t = Math.max(1, t))) * (n /= id);
                            return e.amplitude = function(t) {
                                return hM(t, n * id)
                            }, e.period = function(n) {
                                return hM(t, n)
                            }, e
                        }(od, ud),
                        fd = {
                            time: null,
                            delay: 0,
                            duration: 250,
                            ease: se
                        },
                        ld = function(t) {
                            var n, e;
                            t instanceof Kn ? (n = t._id, t = t._name) : (n = ne(), (e = fd).time = dn(), t = null == t ? null : t + "");
                            for (var r = this._groups, i = r.length, o = 0; i > o; ++o)
                                for (var u, a = r[o], s = a.length, c = 0; s > c; ++c)(u = a[c]) && dp(u, t, n, c, a, e || be(u, n));
                            return new Kn(r, this._parents, t, n)
                        };
                    gt.prototype.interrupt = vp, gt.prototype.transition = ld;
                    var hd = [null],
                        pd = function(t, n) {
                            var e, r, i = t.__transition;
                            if (i) {
                                n = null == n ? null : n + "";
                                for (r in i)
                                    if ((e = i[r]).state > sp && e.name === n) return new Kn([
                                        [t]
                                    ], hd, n, +r)
                            }
                            return null
                        },
                        dd = function(t) {
                            return function() {
                                return t
                            }
                        },
                        gd = function(t, n, e) {
                            this.target = t, this.type = n, this.selection = e
                        },
                        vd = function() {
                            t.event.preventDefault(), t.event.stopImmediatePropagation()
                        },
                        _d = {
                            name: "drag"
                        },
                        yd = {
                            name: "space"
                        },
                        md = {
                            name: "handle"
                        },
                        xd = {
                            name: "center"
                        },
                        bd = {
                            name: "x",
                            handles: ["e", "w"].map(Me),
                            input: function(t, n) {
                                return t && [
                                    [t[0], n[0][1]],
                                    [t[1], n[1][1]]
                                ]
                            },
                            output: function(t) {
                                return t && [t[0][0], t[1][0]]
                            }
                        },
                        wd = {
                            name: "y",
                            handles: ["n", "s"].map(Me),
                            input: function(t, n) {
                                return t && [
                                    [n[0][0], t[0]],
                                    [n[1][0], t[1]]
                                ]
                            },
                            output: function(t) {
                                return t && [t[0][1], t[1][1]]
                            }
                        },
                        Md = {
                            name: "xy",
                            handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(Me),
                            input: function(t) {
                                return t
                            },
                            output: function(t) {
                                return t
                            }
                        },
                        kd = {
                            overlay: "crosshair",
                            selection: "move",
                            n: "ns-resize",
                            e: "ew-resize",
                            s: "ns-resize",
                            w: "ew-resize",
                            nw: "nwse-resize",
                            ne: "nesw-resize",
                            se: "nwse-resize",
                            sw: "nesw-resize"
                        },
                        Td = {
                            e: "w",
                            w: "e",
                            nw: "ne",
                            ne: "nw",
                            se: "sw",
                            sw: "se"
                        },
                        Sd = {
                            n: "s",
                            s: "n",
                            nw: "sw",
                            ne: "se",
                            se: "ne",
                            sw: "nw"
                        },
                        Nd = {
                            overlay: 1,
                            selection: 1,
                            n: null,
                            e: 1,
                            s: null,
                            w: -1,
                            nw: -1,
                            ne: 1,
                            se: 1,
                            sw: -1
                        },
                        Ed = {
                            overlay: 1,
                            selection: 1,
                            n: -1,
                            e: null,
                            s: 1,
                            w: null,
                            nw: -1,
                            ne: -1,
                            se: 1,
                            sw: 1
                        },
                        Ad = function() {
                            return Pe(Md)
                        },
                        Cd = Math.cos,
                        Pd = Math.sin,
                        zd = Math.PI,
                        Rd = zd / 2,
                        qd = 2 * zd,
                        Ld = Math.max,
                        Ud = function() {
                            function t(t) {
                                var o, u, a, s, c, f, l = t.length,
                                    h = [],
                                    p = Jc(l),
                                    d = [],
                                    g = [],
                                    v = g.groups = new Array(l),
                                    _ = new Array(l * l);
                                for (o = 0, c = -1; ++c < l;) {
                                    for (u = 0, f = -1; ++f < l;) u += t[c][f];
                                    h.push(u), d.push(Jc(l)), o += u
                                }
                                for (e && p.sort(function(t, n) {
                                        return e(h[t], h[n])
                                    }), r && d.forEach(function(n, e) {
                                        n.sort(function(n, i) {
                                            return r(t[e][n], t[e][i])
                                        })
                                    }), o = Ld(0, qd - n * l) / o, s = o ? n : qd / l, u = 0, c = -1; ++c < l;) {
                                    for (a = u, f = -1; ++f < l;) {
                                        var y = p[c],
                                            m = d[y][f],
                                            x = t[y][m],
                                            b = u,
                                            w = u += x * o;
                                        _[m * l + y] = {
                                            index: y,
                                            subindex: m,
                                            startAngle: b,
                                            endAngle: w,
                                            value: x
                                        }
                                    }
                                    v[y] = {
                                        index: y,
                                        startAngle: a,
                                        endAngle: u,
                                        value: h[y]
                                    }, u += s
                                }
                                for (c = -1; ++c < l;)
                                    for (f = c - 1; ++f < l;) {
                                        var M = _[f * l + c],
                                            k = _[c * l + f];
                                        (M.value || k.value) && g.push(M.value < k.value ? {
                                            source: k,
                                            target: M
                                        } : {
                                            source: M,
                                            target: k
                                        })
                                    }
                                return i ? g.sort(i) : g
                            }
                            var n = 0,
                                e = null,
                                r = null,
                                i = null;
                            return t.padAngle = function(e) {
                                return arguments.length ? (n = Ld(0, e), t) : n
                            }, t.sortGroups = function(n) {
                                return arguments.length ? (e = n, t) : e
                            }, t.sortSubgroups = function(n) {
                                return arguments.length ? (r = n, t) : r
                            }, t.sortChords = function(n) {
                                return arguments.length ? (null == n ? i = null : (i = ze(n))._ = n, t) : i && i._
                            }, t
                        },
                        Od = Array.prototype.slice,
                        Dd = function(t) {
                            return function() {
                                return t
                            }
                        },
                        jd = Math.PI,
                        Fd = 2 * jd,
                        Id = 1e-6,
                        Yd = Fd - Id;
                    Re.prototype = qe.prototype = {
                        constructor: Re,
                        moveTo: function(t, n) {
                            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
                        },
                        closePath: function() {
                            null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
                        },
                        lineTo: function(t, n) {
                            this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
                        },
                        quadraticCurveTo: function(t, n, e, r) {
                            this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
                        },
                        bezierCurveTo: function(t, n, e, r, i, o) {
                            this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
                        },
                        arcTo: function(t, n, e, r, i) {
                            t = +t, n = +n, e = +e, r = +r, i = +i;
                            var o = this._x1,
                                u = this._y1,
                                a = e - t,
                                s = r - n,
                                c = o - t,
                                f = u - n,
                                l = c * c + f * f;
                            if (0 > i) throw new Error("negative radius: " + i);
                            if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
                            else if (l > Id)
                                if (Math.abs(f * a - s * c) > Id && i) {
                                    var h = e - o,
                                        p = r - u,
                                        d = a * a + s * s,
                                        g = h * h + p * p,
                                        v = Math.sqrt(d),
                                        _ = Math.sqrt(l),
                                        y = i * Math.tan((jd - Math.acos((d + l - g) / (2 * v * _))) / 2),
                                        m = y / _,
                                        x = y / v;
                                    Math.abs(m - 1) > Id && (this._ += "L" + (t + m * c) + "," + (n + m * f)), this._ += "A" + i + "," + i + ",0,0," + +(f * h > c * p) + "," + (this._x1 = t + x * a) + "," + (this._y1 = n + x * s)
                                } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
                            else;
                        },
                        arc: function(t, n, e, r, i, o) {
                            t = +t, n = +n, e = +e;
                            var u = e * Math.cos(r),
                                a = e * Math.sin(r),
                                s = t + u,
                                c = n + a,
                                f = 1 ^ o,
                                l = o ? r - i : i - r;
                            if (0 > e) throw new Error("negative radius: " + e);
                            null === this._x1 ? this._ += "M" + s + "," + c : (Math.abs(this._x1 - s) > Id || Math.abs(this._y1 - c) > Id) && (this._ += "L" + s + "," + c), e && (0 > l && (l = l % Fd + Fd), l > Yd ? this._ += "A" + e + "," + e + ",0,1," + f + "," + (t - u) + "," + (n - a) + "A" + e + "," + e + ",0,1," + f + "," + (this._x1 = s) + "," + (this._y1 = c) : l > Id && (this._ += "A" + e + "," + e + ",0," + +(l >= jd) + "," + f + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
                        },
                        rect: function(t, n, e, r) {
                            this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
                        },
                        toString: function() {
                            return this._
                        }
                    };
                    var Hd = function() {
                            function t() {
                                var t, a = Od.call(arguments),
                                    s = n.apply(this, a),
                                    c = e.apply(this, a),
                                    f = +r.apply(this, (a[0] = s, a)),
                                    l = i.apply(this, a) - Rd,
                                    h = o.apply(this, a) - Rd,
                                    p = f * Cd(l),
                                    d = f * Pd(l),
                                    g = +r.apply(this, (a[0] = c, a)),
                                    v = i.apply(this, a) - Rd,
                                    _ = o.apply(this, a) - Rd;
                                return u || (u = t = qe()), u.moveTo(p, d), u.arc(0, 0, f, l, h), (l !== v || h !== _) && (u.quadraticCurveTo(0, 0, g * Cd(v), g * Pd(v)), u.arc(0, 0, g, v, _)), u.quadraticCurveTo(0, 0, p, d), u.closePath(), t ? (u = null, t + "" || null) : void 0
                            }
                            var n = Le,
                                e = Ue,
                                r = Oe,
                                i = De,
                                o = je,
                                u = null;
                            return t.radius = function(n) {
                                return arguments.length ? (r = "function" == typeof n ? n : Dd(+n), t) : r
                            }, t.startAngle = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Dd(+n), t) : i
                            }, t.endAngle = function(n) {
                                return arguments.length ? (o = "function" == typeof n ? n : Dd(+n), t) : o
                            }, t.source = function(e) {
                                return arguments.length ? (n = e, t) : n
                            }, t.target = function(n) {
                                return arguments.length ? (e = n, t) : e
                            }, t.context = function(n) {
                                return arguments.length ? (u = null == n ? null : n, t) : u
                            }, t
                        },
                        Bd = "$";
                    Fe.prototype = Ie.prototype = {
                        constructor: Fe,
                        has: function(t) {
                            return Bd + t in this
                        },
                        get: function(t) {
                            return this[Bd + t]
                        },
                        set: function(t, n) {
                            return this[Bd + t] = n, this
                        },
                        remove: function(t) {
                            var n = Bd + t;
                            return n in this && delete this[n]
                        },
                        clear: function() {
                            for (var t in this) t[0] === Bd && delete this[t]
                        },
                        keys: function() {
                            var t = [];
                            for (var n in this) n[0] === Bd && t.push(n.slice(1));
                            return t
                        },
                        values: function() {
                            var t = [];
                            for (var n in this) n[0] === Bd && t.push(this[n]);
                            return t
                        },
                        entries: function() {
                            var t = [];
                            for (var n in this) n[0] === Bd && t.push({
                                key: n.slice(1),
                                value: this[n]
                            });
                            return t
                        },
                        size: function() {
                            var t = 0;
                            for (var n in this) n[0] === Bd && ++t;
                            return t
                        },
                        empty: function() {
                            for (var t in this)
                                if (t[0] === Bd) return !1;
                            return !0
                        },
                        each: function(t) {
                            for (var n in this) n[0] === Bd && t(this[n], n.slice(1), this)
                        }
                    };
                    var Xd = function() {
                            function t(n, i, u, a) {
                                if (i >= o.length) return null != r ? r(n) : null != e ? n.sort(e) : n;
                                for (var s, c, f, l = -1, h = n.length, p = o[i++], d = Ie(), g = u(); ++l < h;)(f = d.get(s = p(c = n[l]) + "")) ? f.push(c) : d.set(s, [c]);
                                return d.each(function(n, e) {
                                    a(g, e, t(n, i, u, a))
                                }), g
                            }

                            function n(t, e) {
                                if (++e > o.length) return t;
                                var i, a = u[e - 1];
                                return null != r && e >= o.length ? i = t.entries() : (i = [], t.each(function(t, r) {
                                    i.push({
                                        key: r,
                                        values: n(t, e)
                                    })
                                })), null != a ? i.sort(function(t, n) {
                                    return a(t.key, n.key)
                                }) : i
                            }
                            var e, r, i, o = [],
                                u = [];
                            return i = {
                                object: function(n) {
                                    return t(n, 0, Ye, He);
                                },
                                map: function(n) {
                                    return t(n, 0, Be, Xe)
                                },
                                entries: function(e) {
                                    return n(t(e, 0, Be, Xe), 0)
                                },
                                key: function(t) {
                                    return o.push(t), i
                                },
                                sortKeys: function(t) {
                                    return u[o.length - 1] = t, i
                                },
                                sortValues: function(t) {
                                    return e = t, i
                                },
                                rollup: function(t) {
                                    return r = t, i
                                }
                            }
                        },
                        Vd = Ie.prototype;
                    Ve.prototype = We.prototype = {
                        constructor: Ve,
                        has: Vd.has,
                        add: function(t) {
                            return t += "", this[Bd + t] = t, this
                        },
                        remove: Vd.remove,
                        clear: Vd.clear,
                        values: Vd.keys,
                        size: Vd.size,
                        empty: Vd.empty,
                        each: Vd.each
                    };
                    var Wd = function(t) {
                            var n = [];
                            for (var e in t) n.push(e);
                            return n
                        },
                        $d = function(t) {
                            var n = [];
                            for (var e in t) n.push(t[e]);
                            return n
                        },
                        Gd = function(t) {
                            var n = [];
                            for (var e in t) n.push({
                                key: e,
                                value: t[e]
                            });
                            return n
                        },
                        Zd = function(t) {
                            function n(t, n) {
                                var r, i, o = e(t, function(t, e) {
                                    return r ? r(t, e - 1) : (i = t, void(r = n ? Ge(t, n) : $e(t)))
                                });
                                return o.columns = i, o
                            }

                            function e(t, n) {
                                function e() {
                                    if (f >= c) return u;
                                    if (i) return i = !1, o;
                                    var n, e = f;
                                    if (34 === t.charCodeAt(e)) {
                                        for (var r = e; r++ < c;)
                                            if (34 === t.charCodeAt(r)) {
                                                if (34 !== t.charCodeAt(r + 1)) break;
                                                ++r
                                            }
                                        return f = r + 2, n = t.charCodeAt(r + 1), 13 === n ? (i = !0, 10 === t.charCodeAt(r + 2) && ++f) : 10 === n && (i = !0), t.slice(e + 1, r).replace(/""/g, '"')
                                    }
                                    for (; c > f;) {
                                        var a = 1;
                                        if (n = t.charCodeAt(f++), 10 === n) i = !0;
                                        else if (13 === n) i = !0, 10 === t.charCodeAt(f) && (++f, ++a);
                                        else if (n !== s) continue;
                                        return t.slice(e, f - a)
                                    }
                                    return t.slice(e)
                                }
                                for (var r, i, o = {}, u = {}, a = [], c = t.length, f = 0, l = 0;
                                    (r = e()) !== u;) {
                                    for (var h = []; r !== o && r !== u;) h.push(r), r = e();
                                    n && null == (h = n(h, l++)) || a.push(h)
                                }
                                return a
                            }

                            function r(n, e) {
                                return null == e && (e = Ze(n)), [e.map(u).join(t)].concat(n.map(function(n) {
                                    return e.map(function(t) {
                                        return u(n[t])
                                    }).join(t)
                                })).join("\n")
                            }

                            function i(t) {
                                return t.map(o).join("\n")
                            }

                            function o(n) {
                                return n.map(u).join(t)
                            }

                            function u(t) {
                                return null == t ? "" : a.test(t += "") ? '"' + t.replace(/\"/g, '""') + '"' : t
                            }
                            var a = new RegExp('["' + t + "\n\r]"),
                                s = t.charCodeAt(0);
                            return {
                                parse: n,
                                parseRows: e,
                                format: r,
                                formatRows: i
                            }
                        },
                        Jd = Zd(","),
                        Qd = Jd.parse,
                        Kd = Jd.parseRows,
                        tg = Jd.format,
                        ng = Jd.formatRows,
                        eg = Zd(" "),
                        rg = eg.parse,
                        ig = eg.parseRows,
                        og = eg.format,
                        ug = eg.formatRows,
                        ag = function(t, n) {
                            function e() {
                                var e, i, o = r.length,
                                    u = 0,
                                    a = 0;
                                for (e = 0; o > e; ++e) i = r[e], u += i.x, a += i.y;
                                for (u = u / o - t, a = a / o - n, e = 0; o > e; ++e) i = r[e], i.x -= u, i.y -= a
                            }
                            var r;
                            return null == t && (t = 0), null == n && (n = 0), e.initialize = function(t) {
                                r = t
                            }, e.x = function(n) {
                                return arguments.length ? (t = +n, e) : t
                            }, e.y = function(t) {
                                return arguments.length ? (n = +t, e) : n
                            }, e
                        },
                        sg = function(t) {
                            return function() {
                                return t
                            }
                        },
                        cg = function() {
                            return 1e-6 * (Math.random() - .5)
                        },
                        fg = function(t) {
                            var n = +this._x.call(null, t),
                                e = +this._y.call(null, t);
                            return Je(this.cover(n, e), n, e, t)
                        },
                        lg = function(t, n) {
                            if (isNaN(t = +t) || isNaN(n = +n)) return this;
                            var e = this._x0,
                                r = this._y0,
                                i = this._x1,
                                o = this._y1;
                            if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
                            else {
                                if (!(e > t || t > i || r > n || n > o)) return this;
                                var u, a, s = i - e,
                                    c = this._root;
                                switch (a = ((r + o) / 2 > n) << 1 | (e + i) / 2 > t) {
                                    case 0:
                                        do u = new Array(4), u[a] = c, c = u; while (s *= 2, i = e + s, o = r + s, t > i || n > o);
                                        break;
                                    case 1:
                                        do u = new Array(4), u[a] = c, c = u; while (s *= 2, e = i - s, o = r + s, e > t || n > o);
                                        break;
                                    case 2:
                                        do u = new Array(4), u[a] = c, c = u; while (s *= 2, i = e + s, r = o - s, t > i || r > n);
                                        break;
                                    case 3:
                                        do u = new Array(4), u[a] = c, c = u; while (s *= 2, e = i - s, r = o - s, e > t || r > n)
                                }
                                this._root && this._root.length && (this._root = c)
                            }
                            return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this
                        },
                        hg = function() {
                            var t = [];
                            return this.visit(function(n) {
                                if (!n.length)
                                    do t.push(n.data); while (n = n.next)
                            }), t
                        },
                        pg = function(t) {
                            return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [
                                [this._x0, this._y0],
                                [this._x1, this._y1]
                            ]
                        },
                        dg = function(t, n, e, r, i) {
                            this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i
                        },
                        gg = function(t, n, e) {
                            var r, i, o, u, a, s, c, f = this._x0,
                                l = this._y0,
                                h = this._x1,
                                p = this._y1,
                                d = [],
                                g = this._root;
                            for (g && d.push(new dg(g, f, l, h, p)), null == e ? e = 1 / 0 : (f = t - e, l = n - e, h = t + e, p = n + e, e *= e); s = d.pop();)
                                if (!(!(g = s.node) || (i = s.x0) > h || (o = s.y0) > p || (u = s.x1) < f || (a = s.y1) < l))
                                    if (g.length) {
                                        var v = (i + u) / 2,
                                            _ = (o + a) / 2;
                                        d.push(new dg(g[3], v, _, u, a), new dg(g[2], i, _, v, a), new dg(g[1], v, o, u, _), new dg(g[0], i, o, v, _)), (c = (n >= _) << 1 | t >= v) && (s = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - c], d[d.length - 1 - c] = s)
                                    } else {
                                        var y = t - +this._x.call(null, g.data),
                                            m = n - +this._y.call(null, g.data),
                                            x = y * y + m * m;
                                        if (e > x) {
                                            var b = Math.sqrt(e = x);
                                            f = t - b, l = n - b, h = t + b, p = n + b, r = g.data
                                        }
                                    }
                            return r
                        },
                        vg = function(t) {
                            if (isNaN(o = +this._x.call(null, t)) || isNaN(u = +this._y.call(null, t))) return this;
                            var n, e, r, i, o, u, a, s, c, f, l, h, p = this._root,
                                d = this._x0,
                                g = this._y0,
                                v = this._x1,
                                _ = this._y1;
                            if (!p) return this;
                            if (p.length)
                                for (;;) {
                                    if ((c = o >= (a = (d + v) / 2)) ? d = a : v = a, (f = u >= (s = (g + _) / 2)) ? g = s : _ = s, n = p, !(p = p[l = f << 1 | c])) return this;
                                    if (!p.length) break;
                                    (n[l + 1 & 3] || n[l + 2 & 3] || n[l + 3 & 3]) && (e = n, h = l)
                                }
                            for (; p.data !== t;)
                                if (r = p, !(p = p.next)) return this;
                            return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[l] = i : delete n[l], (p = n[0] || n[1] || n[2] || n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[h] = p : this._root = p), this) : (this._root = i, this)
                        },
                        _g = function() {
                            return this._root
                        },
                        yg = function() {
                            var t = 0;
                            return this.visit(function(n) {
                                if (!n.length)
                                    do ++t; while (n = n.next)
                            }), t
                        },
                        mg = function(t) {
                            var n, e, r, i, o, u, a = [],
                                s = this._root;
                            for (s && a.push(new dg(s, this._x0, this._y0, this._x1, this._y1)); n = a.pop();)
                                if (!t(s = n.node, r = n.x0, i = n.y0, o = n.x1, u = n.y1) && s.length) {
                                    var c = (r + o) / 2,
                                        f = (i + u) / 2;
                                    (e = s[3]) && a.push(new dg(e, c, f, o, u)), (e = s[2]) && a.push(new dg(e, r, f, c, u)), (e = s[1]) && a.push(new dg(e, c, i, o, f)), (e = s[0]) && a.push(new dg(e, r, i, c, f))
                                }
                            return this
                        },
                        xg = function(t) {
                            var n, e = [],
                                r = [];
                            for (this._root && e.push(new dg(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
                                var i = n.node;
                                if (i.length) {
                                    var o, u = n.x0,
                                        a = n.y0,
                                        s = n.x1,
                                        c = n.y1,
                                        f = (u + s) / 2,
                                        l = (a + c) / 2;
                                    (o = i[0]) && e.push(new dg(o, u, a, f, l)), (o = i[1]) && e.push(new dg(o, f, a, s, l)), (o = i[2]) && e.push(new dg(o, u, l, f, c)), (o = i[3]) && e.push(new dg(o, f, l, s, c))
                                }
                                r.push(n)
                            }
                            for (; n = r.pop();) t(n.node, n.x0, n.y0, n.x1, n.y1);
                            return this
                        },
                        bg = function(t) {
                            return arguments.length ? (this._x = t, this) : this._x
                        },
                        wg = function(t) {
                            return arguments.length ? (this._y = t, this) : this._y
                        },
                        Mg = er.prototype = rr.prototype;
                    Mg.copy = function() {
                        var t, n, e = new rr(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
                            r = this._root;
                        if (!r) return e;
                        if (!r.length) return e._root = ir(r), e;
                        for (t = [{
                                source: r,
                                target: e._root = new Array(4)
                            }]; r = t.pop();)
                            for (var i = 0; 4 > i; ++i)(n = r.source[i]) && (n.length ? t.push({
                                source: n,
                                target: r.target[i] = new Array(4)
                            }) : r.target[i] = ir(n));
                        return e
                    }, Mg.add = fg, Mg.addAll = Qe, Mg.cover = lg, Mg.data = hg, Mg.extent = pg, Mg.find = gg, Mg.remove = vg, Mg.removeAll = Ke, Mg.root = _g, Mg.size = yg, Mg.visit = mg, Mg.visitAfter = xg, Mg.x = bg, Mg.y = wg;
                    var kg, Tg = function(t) {
                            function n() {
                                function t(t, n, e, r, i) {
                                    var o = t.data,
                                        a = t.r,
                                        p = l + a; {
                                        if (!o) return n > c + p || c - p > r || e > f + p || f - p > i;
                                        if (o.index > s.index) {
                                            var d = c - o.x - o.vx,
                                                g = f - o.y - o.vy,
                                                v = d * d + g * g;
                                            p * p > v && (0 === d && (d = cg(), v += d * d), 0 === g && (g = cg(), v += g * g), v = (p - (v = Math.sqrt(v))) / v * u, s.vx += (d *= v) * (p = (a *= a) / (h + a)), s.vy += (g *= v) * p, o.vx -= d * (p = 1 - p), o.vy -= g * p)
                                        }
                                    }
                                }
                                for (var n, r, s, c, f, l, h, p = i.length, d = 0; a > d; ++d)
                                    for (r = er(i, or, ur).visitAfter(e), n = 0; p > n; ++n) s = i[n], l = o[s.index], h = l * l, c = s.x + s.vx, f = s.y + s.vy, r.visit(t)
                            }

                            function e(t) {
                                if (t.data) return t.r = o[t.data.index];
                                for (var n = t.r = 0; 4 > n; ++n) t[n] && t[n].r > t.r && (t.r = t[n].r)
                            }

                            function r() {
                                if (i) {
                                    var n, e, r = i.length;
                                    for (o = new Array(r), n = 0; r > n; ++n) e = i[n], o[e.index] = +t(e, n, i)
                                }
                            }
                            var i, o, u = 1,
                                a = 1;
                            return "function" != typeof t && (t = sg(null == t ? 1 : +t)), n.initialize = function(t) {
                                i = t, r()
                            }, n.iterations = function(t) {
                                return arguments.length ? (a = +t, n) : a
                            }, n.strength = function(t) {
                                return arguments.length ? (u = +t, n) : u
                            }, n.radius = function(e) {
                                return arguments.length ? (t = "function" == typeof e ? e : sg(+e), r(), n) : t
                            }, n
                        },
                        Sg = function(t) {
                            function n(t) {
                                return 1 / Math.min(c[t.source.index], c[t.target.index])
                            }

                            function e(n) {
                                for (var e = 0, r = t.length; d > e; ++e)
                                    for (var i, o, s, c, l, h, p, g = 0; r > g; ++g) i = t[g], o = i.source, s = i.target, c = s.x + s.vx - o.x - o.vx || cg(), l = s.y + s.vy - o.y - o.vy || cg(), h = Math.sqrt(c * c + l * l), h = (h - a[g]) / h * n * u[g], c *= h, l *= h, s.vx -= c * (p = f[g]), s.vy -= l * p, o.vx += c * (p = 1 - p), o.vy += l * p
                            }

                            function r() {
                                if (s) {
                                    var n, e, r = s.length,
                                        h = t.length,
                                        p = Ie(s, l);
                                    for (n = 0, c = new Array(r); h > n; ++n) e = t[n], e.index = n, "object" != typeof e.source && (e.source = sr(p, e.source)), "object" != typeof e.target && (e.target = sr(p, e.target)), c[e.source.index] = (c[e.source.index] || 0) + 1, c[e.target.index] = (c[e.target.index] || 0) + 1;
                                    for (n = 0, f = new Array(h); h > n; ++n) e = t[n], f[n] = c[e.source.index] / (c[e.source.index] + c[e.target.index]);
                                    u = new Array(h), i(), a = new Array(h), o()
                                }
                            }

                            function i() {
                                if (s)
                                    for (var n = 0, e = t.length; e > n; ++n) u[n] = +h(t[n], n, t)
                            }

                            function o() {
                                if (s)
                                    for (var n = 0, e = t.length; e > n; ++n) a[n] = +p(t[n], n, t)
                            }
                            var u, a, s, c, f, l = ar,
                                h = n,
                                p = sg(30),
                                d = 1;
                            return null == t && (t = []), e.initialize = function(t) {
                                s = t, r()
                            }, e.links = function(n) {
                                return arguments.length ? (t = n, r(), e) : t
                            }, e.id = function(t) {
                                return arguments.length ? (l = t, e) : l
                            }, e.iterations = function(t) {
                                return arguments.length ? (d = +t, e) : d
                            }, e.strength = function(t) {
                                return arguments.length ? (h = "function" == typeof t ? t : sg(+t), i(), e) : h
                            }, e.distance = function(t) {
                                return arguments.length ? (p = "function" == typeof t ? t : sg(+t), o(), e) : p
                            }, e
                        },
                        Ng = 10,
                        Eg = Math.PI * (3 - Math.sqrt(5)),
                        Ag = function(t) {
                            function n() {
                                e(), p.call("tick", o), a > u && (h.stop(), p.call("end", o))
                            }

                            function e() {
                                var n, e, r = t.length;
                                for (u += (c - u) * s, l.each(function(t) {
                                        t(u)
                                    }), n = 0; r > n; ++n) e = t[n], null == e.fx ? e.x += e.vx *= f : (e.x = e.fx, e.vx = 0), null == e.fy ? e.y += e.vy *= f : (e.y = e.fy, e.vy = 0)
                            }

                            function r() {
                                for (var n, e = 0, r = t.length; r > e; ++e) {
                                    if (n = t[e], n.index = e, isNaN(n.x) || isNaN(n.y)) {
                                        var i = Ng * Math.sqrt(e),
                                            o = e * Eg;
                                        n.x = i * Math.cos(o), n.y = i * Math.sin(o)
                                    }(isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0)
                                }
                            }

                            function i(n) {
                                return n.initialize && n.initialize(t), n
                            }
                            var o, u = 1,
                                a = .001,
                                s = 1 - Math.pow(a, 1 / 300),
                                c = 0,
                                f = .6,
                                l = Ie(),
                                h = _n(n),
                                p = d("tick", "end");
                            return null == t && (t = []), r(), o = {
                                tick: e,
                                restart: function() {
                                    return h.restart(n), o
                                },
                                stop: function() {
                                    return h.stop(), o
                                },
                                nodes: function(n) {
                                    return arguments.length ? (t = n, r(), l.each(i), o) : t
                                },
                                alpha: function(t) {
                                    return arguments.length ? (u = +t, o) : u
                                },
                                alphaMin: function(t) {
                                    return arguments.length ? (a = +t, o) : a
                                },
                                alphaDecay: function(t) {
                                    return arguments.length ? (s = +t, o) : +s
                                },
                                alphaTarget: function(t) {
                                    return arguments.length ? (c = +t, o) : c
                                },
                                velocityDecay: function(t) {
                                    return arguments.length ? (f = 1 - t, o) : 1 - f
                                },
                                force: function(t, n) {
                                    return arguments.length > 1 ? (null == n ? l.remove(t) : l.set(t, i(n)), o) : l.get(t)
                                },
                                find: function(n, e, r) {
                                    var i, o, u, a, s, c = 0,
                                        f = t.length;
                                    for (null == r ? r = 1 / 0 : r *= r, c = 0; f > c; ++c) a = t[c], i = n - a.x, o = e - a.y, u = i * i + o * o, r > u && (s = a, r = u);
                                    return s
                                },
                                on: function(t, n) {
                                    return arguments.length > 1 ? (p.on(t, n), o) : p.on(t)
                                }
                            }
                        },
                        Cg = function() {
                            function t(t) {
                                var n, a = i.length,
                                    s = er(i, cr, fr).visitAfter(e);
                                for (u = t, n = 0; a > n; ++n) o = i[n], s.visit(r)
                            }

                            function n() {
                                if (i) {
                                    var t, n, e = i.length;
                                    for (a = new Array(e), t = 0; e > t; ++t) n = i[t], a[n.index] = +s(n, t, i)
                                }
                            }

                            function e(t) {
                                var n, e, r, i, o, u = 0;
                                if (t.length) {
                                    for (r = i = o = 0; 4 > o; ++o)(n = t[o]) && (e = n.value) && (u += e, r += e * n.x, i += e * n.y);
                                    t.x = r / u, t.y = i / u
                                } else {
                                    n = t, n.x = n.data.x, n.y = n.data.y;
                                    do u += a[n.data.index]; while (n = n.next)
                                }
                                t.value = u
                            }

                            function r(t, n, e, r) {
                                if (!t.value) return !0;
                                var i = t.x - o.x,
                                    s = t.y - o.y,
                                    h = r - n,
                                    p = i * i + s * s;
                                if (p > h * h / l) return f > p && (0 === i && (i = cg(), p += i * i), 0 === s && (s = cg(), p += s * s), c > p && (p = Math.sqrt(c * p)), o.vx += i * t.value * u / p, o.vy += s * t.value * u / p), !0;
                                if (!(t.length || p >= f)) {
                                    (t.data !== o || t.next) && (0 === i && (i = cg(), p += i * i), 0 === s && (s = cg(), p += s * s), c > p && (p = Math.sqrt(c * p)));
                                    do t.data !== o && (h = a[t.data.index] * u / p, o.vx += i * h, o.vy += s * h); while (t = t.next)
                                }
                            }
                            var i, o, u, a, s = sg(-30),
                                c = 1,
                                f = 1 / 0,
                                l = .81;
                            return t.initialize = function(t) {
                                i = t, n()
                            }, t.strength = function(e) {
                                return arguments.length ? (s = "function" == typeof e ? e : sg(+e), n(), t) : s
                            }, t.distanceMin = function(n) {
                                return arguments.length ? (c = n * n, t) : Math.sqrt(c)
                            }, t.distanceMax = function(n) {
                                return arguments.length ? (f = n * n, t) : Math.sqrt(f)
                            }, t.theta = function(n) {
                                return arguments.length ? (l = n * n, t) : Math.sqrt(l)
                            }, t
                        },
                        Pg = function(t) {
                            function n(t) {
                                for (var n, e = 0, u = r.length; u > e; ++e) n = r[e], n.vx += (o[e] - n.x) * i[e] * t
                            }

                            function e() {
                                if (r) {
                                    var n, e = r.length;
                                    for (i = new Array(e), o = new Array(e), n = 0; e > n; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
                                }
                            }
                            var r, i, o, u = sg(.1);
                            return "function" != typeof t && (t = sg(null == t ? 0 : +t)), n.initialize = function(t) {
                                r = t, e()
                            }, n.strength = function(t) {
                                return arguments.length ? (u = "function" == typeof t ? t : sg(+t), e(), n) : u
                            }, n.x = function(r) {
                                return arguments.length ? (t = "function" == typeof r ? r : sg(+r), e(), n) : t
                            }, n
                        },
                        zg = function(t) {
                            function n(t) {
                                for (var n, e = 0, u = r.length; u > e; ++e) n = r[e], n.vy += (o[e] - n.y) * i[e] * t
                            }

                            function e() {
                                if (r) {
                                    var n, e = r.length;
                                    for (i = new Array(e), o = new Array(e), n = 0; e > n; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
                                }
                            }
                            var r, i, o, u = sg(.1);
                            return "function" != typeof t && (t = sg(null == t ? 0 : +t)), n.initialize = function(t) {
                                r = t, e()
                            }, n.strength = function(t) {
                                return arguments.length ? (u = "function" == typeof t ? t : sg(+t), e(), n) : u
                            }, n.y = function(r) {
                                return arguments.length ? (t = "function" == typeof r ? r : sg(+r), e(), n) : t
                            }, n
                        },
                        Rg = function(t, n) {
                            if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
                            var e, r = t.slice(0, e);
                            return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
                        },
                        qg = function(t) {
                            return t = Rg(Math.abs(t)), t ? t[1] : NaN
                        },
                        Lg = function(t, n) {
                            return function(e, r) {
                                for (var i = e.length, o = [], u = 0, a = t[0], s = 0; i > 0 && a > 0 && (s + a + 1 > r && (a = Math.max(1, r - s)), o.push(e.substring(i -= a, i + a)), !((s += a + 1) > r));) a = t[u = (u + 1) % t.length];
                                return o.reverse().join(n)
                            }
                        },
                        Ug = function(t) {
                            return function(n) {
                                return n.replace(/[0-9]/g, function(n) {
                                    return t[+n]
                                })
                            }
                        },
                        Og = function(t, n) {
                            t = t.toPrecision(n);
                            t: for (var e, r = t.length, i = 1, o = -1; r > i; ++i) switch (t[i]) {
                                case ".":
                                    o = e = i;
                                    break;
                                case "0":
                                    0 === o && (o = i), e = i;
                                    break;
                                case "e":
                                    break t;
                                default:
                                    o > 0 && (o = 0)
                            }
                            return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t
                        },
                        Dg = function(t, n) {
                            var e = Rg(t, n);
                            if (!e) return t + "";
                            var r = e[0],
                                i = e[1],
                                o = i - (kg = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
                                u = r.length;
                            return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + Rg(t, Math.max(0, n + o - 1))[0]
                        },
                        jg = function(t, n) {
                            var e = Rg(t, n);
                            if (!e) return t + "";
                            var r = e[0],
                                i = e[1];
                            return 0 > i ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
                        },
                        Fg = {
                            "": Og,
                            "%": function(t, n) {
                                return (100 * t).toFixed(n)
                            },
                            b: function(t) {
                                return Math.round(t).toString(2)
                            },
                            c: function(t) {
                                return t + ""
                            },
                            d: function(t) {
                                return Math.round(t).toString(10)
                            },
                            e: function(t, n) {
                                return t.toExponential(n)
                            },
                            f: function(t, n) {
                                return t.toFixed(n)
                            },
                            g: function(t, n) {
                                return t.toPrecision(n)
                            },
                            o: function(t) {
                                return Math.round(t).toString(8)
                            },
                            p: function(t, n) {
                                return jg(100 * t, n)
                            },
                            r: jg,
                            s: Dg,
                            X: function(t) {
                                return Math.round(t).toString(16).toUpperCase()
                            },
                            x: function(t) {
                                return Math.round(t).toString(16)
                            }
                        },
                        Ig = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
                    lr.prototype = hr.prototype, hr.prototype.toString = function() {
                        return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
                    };
                    var Yg, Hg = function(t) {
                            return t
                        },
                        Bg = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
                        Xg = function(t) {
                            function n(t) {
                                function n(t) {
                                    var n, i, c, m = g,
                                        x = v;
                                    if ("c" === d) x = _(t) + x, t = "";
                                    else {
                                        t = +t;
                                        var b = 0 > t;
                                        if (t = _(Math.abs(t), p), b && 0 === +t && (b = !1), m = (b ? "(" === s ? s : "-" : "-" === s || "(" === s ? "" : s) + m, x = x + ("s" === d ? Bg[8 + kg / 3] : "") + (b && "(" === s ? ")" : ""), y)
                                            for (n = -1, i = t.length; ++n < i;)
                                                if (c = t.charCodeAt(n), 48 > c || c > 57) {
                                                    x = (46 === c ? o + t.slice(n + 1) : t.slice(n)) + x, t = t.slice(0, n);
                                                    break
                                                }
                                    }
                                    h && !f && (t = r(t, 1 / 0));
                                    var w = m.length + t.length + x.length,
                                        M = l > w ? new Array(l - w + 1).join(e) : "";
                                    switch (h && f && (t = r(M + t, M.length ? l - x.length : 1 / 0), M = ""), a) {
                                        case "<":
                                            t = m + t + x + M;
                                            break;
                                        case "=":
                                            t = m + M + t + x;
                                            break;
                                        case "^":
                                            t = M.slice(0, w = M.length >> 1) + m + t + x + M.slice(w);
                                            break;
                                        default:
                                            t = M + m + t + x
                                    }
                                    return u(t)
                                }
                                t = lr(t);
                                var e = t.fill,
                                    a = t.align,
                                    s = t.sign,
                                    c = t.symbol,
                                    f = t.zero,
                                    l = t.width,
                                    h = t.comma,
                                    p = t.precision,
                                    d = t.type,
                                    g = "$" === c ? i[0] : "#" === c && /[boxX]/.test(d) ? "0" + d.toLowerCase() : "",
                                    v = "$" === c ? i[1] : /[%p]/.test(d) ? "%" : "",
                                    _ = Fg[d],
                                    y = !d || /[defgprs%]/.test(d);
                                return p = null == p ? d ? 6 : 12 : /[gprs]/.test(d) ? Math.max(1, Math.min(21, p)) : Math.max(0, Math.min(20, p)), n.toString = function() {
                                    return t + ""
                                }, n
                            }

                            function e(t, e) {
                                var r = n((t = lr(t), t.type = "f", t)),
                                    i = 3 * Math.max(-8, Math.min(8, Math.floor(qg(e) / 3))),
                                    o = Math.pow(10, -i),
                                    u = Bg[8 + i / 3];
                                return function(t) {
                                    return r(o * t) + u
                                }
                            }
                            var r = t.grouping && t.thousands ? Lg(t.grouping, t.thousands) : Hg,
                                i = t.currency,
                                o = t.decimal,
                                u = t.numerals ? Ug(t.numerals) : Hg;
                            return {
                                format: n,
                                formatPrefix: e
                            }
                        };
                    pr({
                        decimal: ".",
                        thousands: ",",
                        grouping: [3],
                        currency: ["$", ""]
                    });
                    var Vg = function(t) {
                            return Math.max(0, -qg(Math.abs(t)))
                        },
                        Wg = function(t, n) {
                            return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(qg(n) / 3))) - qg(Math.abs(t)))
                        },
                        $g = function(t, n) {
                            return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, qg(n) - qg(t)) + 1
                        },
                        Gg = function() {
                            return new dr
                        };
                    dr.prototype = {
                        constructor: dr,
                        reset: function() {
                            this.s = this.t = 0
                        },
                        add: function(t) {
                            gr(Nv, t, this.t), gr(this, Nv.s, this.s), this.s ? this.t += Nv.t : this.s = Nv.t
                        },
                        valueOf: function() {
                            return this.s
                        }
                    };
                    var Zg, Jg, Qg, Kg, tv, nv, ev, rv, iv, ov, uv, av, sv, cv, fv, lv, hv, pv, dv, gv, vv, _v, yv, mv, xv, bv, wv, Mv, kv, Tv, Sv, Nv = new dr,
                        Ev = 1e-6,
                        Av = 1e-12,
                        Cv = Math.PI,
                        Pv = Cv / 2,
                        zv = Cv / 4,
                        Rv = 2 * Cv,
                        qv = 180 / Cv,
                        Lv = Cv / 180,
                        Uv = Math.abs,
                        Ov = Math.atan,
                        Dv = Math.atan2,
                        jv = Math.cos,
                        Fv = Math.ceil,
                        Iv = Math.exp,
                        Yv = Math.log,
                        Hv = Math.pow,
                        Bv = Math.sin,
                        Xv = Math.sign || function(t) {
                            return t > 0 ? 1 : 0 > t ? -1 : 0
                        },
                        Vv = Math.sqrt,
                        Wv = Math.tan,
                        $v = {
                            Feature: function(t, n) {
                                xr(t.geometry, n)
                            },
                            FeatureCollection: function(t, n) {
                                for (var e = t.features, r = -1, i = e.length; ++r < i;) xr(e[r].geometry, n)
                            }
                        },
                        Gv = {
                            Sphere: function(t, n) {
                                n.sphere()
                            },
                            Point: function(t, n) {
                                t = t.coordinates, n.point(t[0], t[1], t[2])
                            },
                            MultiPoint: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
                            },
                            LineString: function(t, n) {
                                br(t.coordinates, n, 0)
                            },
                            MultiLineString: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) br(e[r], n, 0)
                            },
                            Polygon: function(t, n) {
                                wr(t.coordinates, n)
                            },
                            MultiPolygon: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) wr(e[r], n)
                            },
                            GeometryCollection: function(t, n) {
                                for (var e = t.geometries, r = -1, i = e.length; ++r < i;) xr(e[r], n)
                            }
                        },
                        Zv = function(t, n) {
                            t && $v.hasOwnProperty(t.type) ? $v[t.type](t, n) : xr(t, n)
                        },
                        Jv = Gg(),
                        Qv = Gg(),
                        Kv = {
                            point: mr,
                            lineStart: mr,
                            lineEnd: mr,
                            polygonStart: function() {
                                Jv.reset(), Kv.lineStart = Mr, Kv.lineEnd = kr
                            },
                            polygonEnd: function() {
                                var t = +Jv;
                                Qv.add(0 > t ? Rv + t : t), this.lineStart = this.lineEnd = this.point = mr
                            },
                            sphere: function() {
                                Qv.add(Rv)
                            }
                        },
                        t_ = function(t) {
                            return Qv.reset(), Zv(t, Kv), 2 * Qv
                        },
                        n_ = Gg(),
                        e_ = {
                            point: qr,
                            lineStart: Ur,
                            lineEnd: Or,
                            polygonStart: function() {
                                e_.point = Dr, e_.lineStart = jr, e_.lineEnd = Fr, n_.reset(), Kv.polygonStart()
                            },
                            polygonEnd: function() {
                                Kv.polygonEnd(), e_.point = qr, e_.lineStart = Ur, e_.lineEnd = Or, 0 > Jv ? (nv = -(rv = 180), ev = -(iv = 90)) : n_ > Ev ? iv = 90 : -Ev > n_ && (ev = -90), fv[0] = nv, fv[1] = rv
                            }
                        },
                        r_ = function(t) {
                            var n, e, r, i, o, u, a;
                            if (iv = rv = -(nv = ev = 1 / 0), cv = [], Zv(t, e_), e = cv.length) {
                                for (cv.sort(Yr), n = 1, r = cv[0], o = [r]; e > n; ++n) i = cv[n], Hr(r, i[0]) || Hr(r, i[1]) ? (Ir(r[0], i[1]) > Ir(r[0], r[1]) && (r[1] = i[1]), Ir(i[0], r[1]) > Ir(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
                                for (u = -(1 / 0), e = o.length - 1, n = 0, r = o[e]; e >= n; r = i, ++n) i = o[n], (a = Ir(r[1], i[0])) > u && (u = a, nv = i[0], rv = r[1])
                            }
                            return cv = fv = null, nv === 1 / 0 || ev === 1 / 0 ? [
                                [NaN, NaN],
                                [NaN, NaN]
                            ] : [
                                [nv, ev],
                                [rv, iv]
                            ]
                        },
                        i_ = {
                            sphere: mr,
                            point: Br,
                            lineStart: Vr,
                            lineEnd: Gr,
                            polygonStart: function() {
                                i_.lineStart = Zr, i_.lineEnd = Jr
                            },
                            polygonEnd: function() {
                                i_.lineStart = Vr, i_.lineEnd = Gr
                            }
                        },
                        o_ = function(t) {
                            lv = hv = pv = dv = gv = vv = _v = yv = mv = xv = bv = 0, Zv(t, i_);
                            var n = mv,
                                e = xv,
                                r = bv,
                                i = n * n + e * e + r * r;
                            return Av > i && (n = vv, e = _v, r = yv, Ev > hv && (n = pv, e = dv, r = gv), i = n * n + e * e + r * r, Av > i) ? [NaN, NaN] : [Dv(e, n) * qv, _r(r / Vv(i)) * qv]
                        },
                        u_ = function(t) {
                            return function() {
                                return t
                            }
                        },
                        a_ = function(t, n) {
                            function e(e, r) {
                                return e = t(e, r), n(e[0], e[1])
                            }
                            return t.invert && n.invert && (e.invert = function(e, r) {
                                return e = n.invert(e, r), e && t.invert(e[0], e[1])
                            }), e
                        };
                    ti.invert = ti;
                    var s_, c_, f_, l_, h_, p_, d_, g_, v_, __, y_, m_ = function(t) {
                            function n(n) {
                                return n = t(n[0] * Lv, n[1] * Lv), n[0] *= qv, n[1] *= qv, n
                            }
                            return t = ni(t[0] * Lv, t[1] * Lv, t.length > 2 ? t[2] * Lv : 0), n.invert = function(n) {
                                return n = t.invert(n[0] * Lv, n[1] * Lv), n[0] *= qv, n[1] *= qv, n
                            }, n
                        },
                        x_ = function() {
                            function t(t, n) {
                                e.push(t = r(t, n)), t[0] *= qv, t[1] *= qv
                            }

                            function n() {
                                var t = i.apply(this, arguments),
                                    n = o.apply(this, arguments) * Lv,
                                    s = u.apply(this, arguments) * Lv;
                                return e = [], r = ni(-t[0] * Lv, -t[1] * Lv, 0).invert, oi(a, n, s, 1), t = {
                                    type: "Polygon",
                                    coordinates: [e]
                                }, e = r = null, t
                            }
                            var e, r, i = u_([0, 0]),
                                o = u_(90),
                                u = u_(6),
                                a = {
                                    point: t
                                };
                            return n.center = function(t) {
                                return arguments.length ? (i = "function" == typeof t ? t : u_([+t[0], +t[1]]), n) : i
                            }, n.radius = function(t) {
                                return arguments.length ? (o = "function" == typeof t ? t : u_(+t), n) : o
                            }, n.precision = function(t) {
                                return arguments.length ? (u = "function" == typeof t ? t : u_(+t), n) : u
                            }, n
                        },
                        b_ = function() {
                            var t, n = [];
                            return {
                                point: function(n, e) {
                                    t.push([n, e])
                                },
                                lineStart: function() {
                                    n.push(t = [])
                                },
                                lineEnd: mr,
                                rejoin: function() {
                                    n.length > 1 && n.push(n.pop().concat(n.shift()))
                                },
                                result: function() {
                                    var e = n;
                                    return n = [], t = null, e
                                }
                            }
                        },
                        w_ = function(t, n, e, r, i, o) {
                            var u, a = t[0],
                                s = t[1],
                                c = n[0],
                                f = n[1],
                                l = 0,
                                h = 1,
                                p = c - a,
                                d = f - s;
                            if (u = e - a, p || !(u > 0)) {
                                if (u /= p, 0 > p) {
                                    if (l > u) return;
                                    h > u && (h = u)
                                } else if (p > 0) {
                                    if (u > h) return;
                                    u > l && (l = u)
                                }
                                if (u = i - a, p || !(0 > u)) {
                                    if (u /= p, 0 > p) {
                                        if (u > h) return;
                                        u > l && (l = u)
                                    } else if (p > 0) {
                                        if (l > u) return;
                                        h > u && (h = u)
                                    }
                                    if (u = r - s, d || !(u > 0)) {
                                        if (u /= d, 0 > d) {
                                            if (l > u) return;
                                            h > u && (h = u)
                                        } else if (d > 0) {
                                            if (u > h) return;
                                            u > l && (l = u)
                                        }
                                        if (u = o - s, d || !(0 > u)) {
                                            if (u /= d, 0 > d) {
                                                if (u > h) return;
                                                u > l && (l = u)
                                            } else if (d > 0) {
                                                if (l > u) return;
                                                h > u && (h = u)
                                            }
                                            return l > 0 && (t[0] = a + l * p, t[1] = s + l * d), 1 > h && (n[0] = a + h * p, n[1] = s + h * d), !0
                                        }
                                    }
                                }
                            }
                        },
                        M_ = function(t, n) {
                            return Uv(t[0] - n[0]) < Ev && Uv(t[1] - n[1]) < Ev
                        },
                        k_ = function(t, n, e, r, i) {
                            var o, u, a = [],
                                s = [];
                            if (t.forEach(function(t) {
                                    if (!((n = t.length - 1) <= 0)) {
                                        var n, e, r = t[0],
                                            u = t[n];
                                        if (M_(r, u)) {
                                            for (i.lineStart(), o = 0; n > o; ++o) i.point((r = t[o])[0], r[1]);
                                            return void i.lineEnd()
                                        }
                                        a.push(e = new ai(r, t, null, !0)), s.push(e.o = new ai(r, null, e, !1)), a.push(e = new ai(u, t, null, !1)), s.push(e.o = new ai(u, null, e, !0))
                                    }
                                }), a.length) {
                                for (s.sort(n), si(a), si(s), o = 0, u = s.length; u > o; ++o) s[o].e = e = !e;
                                for (var c, f, l = a[0];;) {
                                    for (var h = l, p = !0; h.v;)
                                        if ((h = h.n) === l) return;
                                    c = h.z, i.lineStart();
                                    do {
                                        if (h.v = h.o.v = !0, h.e) {
                                            if (p)
                                                for (o = 0, u = c.length; u > o; ++o) i.point((f = c[o])[0], f[1]);
                                            else r(h.x, h.n.x, 1, i);
                                            h = h.n
                                        } else {
                                            if (p)
                                                for (c = h.p.z, o = c.length - 1; o >= 0; --o) i.point((f = c[o])[0], f[1]);
                                            else r(h.x, h.p.x, -1, i);
                                            h = h.p
                                        }
                                        h = h.o, c = h.z, p = !p
                                    } while (!h.v);
                                    i.lineEnd()
                                }
                            }
                        },
                        T_ = 1e9,
                        S_ = -T_,
                        N_ = function() {
                            var t, n, e, r = 0,
                                i = 0,
                                o = 960,
                                u = 500;
                            return e = {
                                stream: function(e) {
                                    return t && n === e ? t : t = ci(r, i, o, u)(n = e)
                                },
                                extent: function(a) {
                                    return arguments.length ? (r = +a[0][0], i = +a[0][1], o = +a[1][0], u = +a[1][1], t = n = null, e) : [
                                        [r, i],
                                        [o, u]
                                    ]
                                }
                            }
                        },
                        E_ = Gg(),
                        A_ = function(t, n) {
                            var e = n[0],
                                r = n[1],
                                i = [Bv(e), -jv(e), 0],
                                o = 0,
                                u = 0;
                            E_.reset();
                            for (var a = 0, s = t.length; s > a; ++a)
                                if (f = (c = t[a]).length)
                                    for (var c, f, l = c[f - 1], h = l[0], p = l[1] / 2 + zv, d = Bv(p), g = jv(p), v = 0; f > v; ++v, h = y, d = x, g = b, l = _) {
                                        var _ = c[v],
                                            y = _[0],
                                            m = _[1] / 2 + zv,
                                            x = Bv(m),
                                            b = jv(m),
                                            w = y - h,
                                            M = w >= 0 ? 1 : -1,
                                            k = M * w,
                                            T = k > Cv,
                                            S = d * x;
                                        if (E_.add(Dv(S * M * Bv(k), g * b + S * jv(k))), o += T ? w + M * Rv : w, T ^ h >= e ^ y >= e) {
                                            var N = Cr(Er(l), Er(_));
                                            Rr(N);
                                            var E = Cr(i, N);
                                            Rr(E);
                                            var A = (T ^ w >= 0 ? -1 : 1) * _r(E[2]);
                                            (r > A || r === A && (N[0] || N[1])) && (u += T ^ w >= 0 ? 1 : -1)
                                        }
                                    }
                            return (-Ev > o || Ev > o && -Ev > E_) ^ 1 & u
                        },
                        C_ = Gg(),
                        P_ = {
                            sphere: mr,
                            point: mr,
                            lineStart: fi,
                            lineEnd: mr,
                            polygonStart: mr,
                            polygonEnd: mr
                        },
                        z_ = function(t) {
                            return C_.reset(), Zv(t, P_), +C_
                        },
                        R_ = [null, null],
                        q_ = {
                            type: "LineString",
                            coordinates: R_
                        },
                        L_ = function(t, n) {
                            return R_[0] = t, R_[1] = n, z_(q_)
                        },
                        U_ = {
                            Feature: function(t, n) {
                                return di(t.geometry, n)
                            },
                            FeatureCollection: function(t, n) {
                                for (var e = t.features, r = -1, i = e.length; ++r < i;)
                                    if (di(e[r].geometry, n)) return !0;
                                return !1
                            }
                        },
                        O_ = {
                            Sphere: function() {
                                return !0
                            },
                            Point: function(t, n) {
                                return gi(t.coordinates, n)
                            },
                            MultiPoint: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                                    if (gi(e[r], n)) return !0;
                                return !1
                            },
                            LineString: function(t, n) {
                                return vi(t.coordinates, n)
                            },
                            MultiLineString: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                                    if (vi(e[r], n)) return !0;
                                return !1
                            },
                            Polygon: function(t, n) {
                                return _i(t.coordinates, n)
                            },
                            MultiPolygon: function(t, n) {
                                for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
                                    if (_i(e[r], n)) return !0;
                                return !1
                            },
                            GeometryCollection: function(t, n) {
                                for (var e = t.geometries, r = -1, i = e.length; ++r < i;)
                                    if (di(e[r], n)) return !0;
                                return !1
                            }
                        },
                        D_ = function(t, n) {
                            return (t && U_.hasOwnProperty(t.type) ? U_[t.type] : di)(t, n)
                        },
                        j_ = function(t, n) {
                            var e = t[0] * Lv,
                                r = t[1] * Lv,
                                i = n[0] * Lv,
                                o = n[1] * Lv,
                                u = jv(r),
                                a = Bv(r),
                                s = jv(o),
                                c = Bv(o),
                                f = u * jv(e),
                                l = u * Bv(e),
                                h = s * jv(i),
                                p = s * Bv(i),
                                d = 2 * _r(Vv(yr(o - r) + u * s * yr(i - e))),
                                g = Bv(d),
                                v = d ? function(t) {
                                    var n = Bv(t *= d) / g,
                                        e = Bv(d - t) / g,
                                        r = e * f + n * h,
                                        i = e * l + n * p,
                                        o = e * a + n * c;
                                    return [Dv(i, r) * qv, Dv(o, Vv(r * r + i * i)) * qv]
                                } : function() {
                                    return [e * qv, r * qv]
                                };
                            return v.distance = d, v
                        },
                        F_ = function(t) {
                            return t
                        },
                        I_ = Gg(),
                        Y_ = Gg(),
                        H_ = {
                            point: mr,
                            lineStart: mr,
                            lineEnd: mr,
                            polygonStart: function() {
                                H_.lineStart = ki, H_.lineEnd = Ni
                            },
                            polygonEnd: function() {
                                H_.lineStart = H_.lineEnd = H_.point = mr, I_.add(Uv(Y_)), Y_.reset()
                            },
                            result: function() {
                                var t = I_ / 2;
                                return I_.reset(), t
                            }
                        },
                        B_ = 1 / 0,
                        X_ = B_,
                        V_ = -B_,
                        W_ = V_,
                        $_ = {
                            point: Ei,
                            lineStart: mr,
                            lineEnd: mr,
                            polygonStart: mr,
                            polygonEnd: mr,
                            result: function() {
                                var t = [
                                    [B_, X_],
                                    [V_, W_]
                                ];
                                return V_ = W_ = -(X_ = B_ = 1 / 0), t
                            }
                        },
                        G_ = 0,
                        Z_ = 0,
                        J_ = 0,
                        Q_ = 0,
                        K_ = 0,
                        ty = 0,
                        ny = 0,
                        ey = 0,
                        ry = 0,
                        iy = {
                            point: Ai,
                            lineStart: Ci,
                            lineEnd: Ri,
                            polygonStart: function() {
                                iy.lineStart = qi, iy.lineEnd = Li
                            },
                            polygonEnd: function() {
                                iy.point = Ai, iy.lineStart = Ci, iy.lineEnd = Ri
                            },
                            result: function() {
                                var t = ry ? [ny / ry, ey / ry] : ty ? [Q_ / ty, K_ / ty] : J_ ? [G_ / J_, Z_ / J_] : [NaN, NaN];
                                return G_ = Z_ = J_ = Q_ = K_ = ty = ny = ey = ry = 0, t
                            }
                        };
                    Di.prototype = {
                        _radius: 4.5,
                        pointRadius: function(t) {
                            return this._radius = t, this
                        },
                        polygonStart: function() {
                            this._line = 0
                        },
                        polygonEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._point = 0
                        },
                        lineEnd: function() {
                            0 === this._line && this._context.closePath(), this._point = NaN
                        },
                        point: function(t, n) {
                            switch (this._point) {
                                case 0:
                                    this._context.moveTo(t, n), this._point = 1;
                                    break;
                                case 1:
                                    this._context.lineTo(t, n);
                                    break;
                                default:
                                    this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, Rv)
                            }
                        },
                        result: mr
                    };
                    var oy, uy, ay, sy, cy, fy = Gg(),
                        ly = {
                            point: mr,
                            lineStart: function() {
                                ly.point = ji
                            },
                            lineEnd: function() {
                                oy && Fi(uy, ay), ly.point = mr
                            },
                            polygonStart: function() {
                                oy = !0
                            },
                            polygonEnd: function() {
                                oy = null
                            },
                            result: function() {
                                var t = +fy;
                                return fy.reset(), t
                            }
                        };
                    Ii.prototype = {
                        _circle: Yi(4.5),
                        pointRadius: function(t) {
                            return this._circle = Yi(t), this
                        },
                        polygonStart: function() {
                            this._line = 0
                        },
                        polygonEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._point = 0
                        },
                        lineEnd: function() {
                            0 === this._line && this._string.push("Z"), this._point = NaN
                        },
                        point: function(t, n) {
                            switch (this._point) {
                                case 0:
                                    this._string.push("M", t, ",", n), this._point = 1;
                                    break;
                                case 1:
                                    this._string.push("L", t, ",", n);
                                    break;
                                default:
                                    this._string.push("M", t, ",", n, this._circle)
                            }
                        },
                        result: function() {
                            if (this._string.length) {
                                var t = this._string.join("");
                                return this._string = [], t
                            }
                        }
                    };
                    var hy = function(t, n) {
                            function e(t) {
                                return t && ("function" == typeof o && i.pointRadius(+o.apply(this, arguments)), Zv(t, r(i))), i.result()
                            }
                            var r, i, o = 4.5;
                            return e.area = function(t) {
                                return Zv(t, r(H_)), H_.result()
                            }, e.measure = function(t) {
                                return Zv(t, r(ly)), ly.result()
                            }, e.bounds = function(t) {
                                return Zv(t, r($_)), $_.result()
                            }, e.centroid = function(t) {
                                return Zv(t, r(iy)), iy.result()
                            }, e.projection = function(n) {
                                return arguments.length ? (r = null == n ? (t = null, F_) : (t = n).stream, e) : t
                            }, e.context = function(t) {
                                return arguments.length ? (i = null == t ? (n = null, new Ii) : new Di(n = t), "function" != typeof o && i.pointRadius(o), e) : n
                            }, e.pointRadius = function(t) {
                                return arguments.length ? (o = "function" == typeof t ? t : (i.pointRadius(+t), +t), e) : o
                            }, e.projection(t).context(n)
                        },
                        py = function(t, n, e, r) {
                            return function(i, o) {
                                function u(n, e) {
                                    var r = i(n, e);
                                    t(n = r[0], e = r[1]) && o.point(n, e)
                                }

                                function a(t, n) {
                                    var e = i(t, n);
                                    v.point(e[0], e[1])
                                }

                                function s() {
                                    b.point = a, v.lineStart()
                                }

                                function c() {
                                    b.point = u, v.lineEnd()
                                }

                                function f(t, n) {
                                    g.push([t, n]);
                                    var e = i(t, n);
                                    m.point(e[0], e[1])
                                }

                                function l() {
                                    m.lineStart(), g = []
                                }

                                function h() {
                                    f(g[0][0], g[0][1]), m.lineEnd();
                                    var t, n, e, r, i = m.clean(),
                                        u = y.result(),
                                        a = u.length;
                                    if (g.pop(), p.push(g), g = null, a)
                                        if (1 & i) {
                                            if (e = u[0], (n = e.length - 1) > 0) {
                                                for (x || (o.polygonStart(), x = !0), o.lineStart(), t = 0; n > t; ++t) o.point((r = e[t])[0], r[1]);
                                                o.lineEnd()
                                            }
                                        } else a > 1 && 2 & i && u.push(u.pop().concat(u.shift())), d.push(u.filter(Hi))
                                }
                                var p, d, g, v = n(o),
                                    _ = i.invert(r[0], r[1]),
                                    y = b_(),
                                    m = n(y),
                                    x = !1,
                                    b = {
                                        point: u,
                                        lineStart: s,
                                        lineEnd: c,
                                        polygonStart: function() {
                                            b.point = f, b.lineStart = l, b.lineEnd = h, d = [], p = []
                                        },
                                        polygonEnd: function() {
                                            b.point = u, b.lineStart = s, b.lineEnd = c, d = lf(d);
                                            var t = A_(p, _);
                                            d.length ? (x || (o.polygonStart(), x = !0), k_(d, Bi, t, e, o)) : t && (x || (o.polygonStart(), x = !0), o.lineStart(), e(null, null, 1, o), o.lineEnd()), x && (o.polygonEnd(), x = !1), d = p = null
                                        },
                                        sphere: function() {
                                            o.polygonStart(), o.lineStart(), e(null, null, 1, o), o.lineEnd(), o.polygonEnd()
                                        }
                                    };
                                return b
                            }
                        },
                        dy = py(function() {
                            return !0
                        }, Xi, Wi, [-Cv, -Pv]),
                        gy = function(t, n) {
                            function e(e, r, i, o) {
                                oi(o, t, n, i, e, r)
                            }

                            function r(t, n) {
                                return jv(t) * jv(n) > a
                            }

                            function i(t) {
                                var n, e, i, a, f;
                                return {
                                    lineStart: function() {
                                        a = i = !1, f = 1
                                    },
                                    point: function(l, h) {
                                        var p, d = [l, h],
                                            g = r(l, h),
                                            v = s ? g ? 0 : u(l, h) : g ? u(l + (0 > l ? Cv : -Cv), h) : 0;
                                        if (!n && (a = i = g) && t.lineStart(), g !== i && (p = o(n, d), (M_(n, p) || M_(d, p)) && (d[0] += Ev, d[1] += Ev, g = r(d[0], d[1]))), g !== i) f = 0, g ? (t.lineStart(), p = o(d, n), t.point(p[0], p[1])) : (p = o(n, d), t.point(p[0], p[1]), t.lineEnd()), n = p;
                                        else if (c && n && s ^ g) {
                                            var _;
                                            v & e || !(_ = o(d, n, !0)) || (f = 0, s ? (t.lineStart(), t.point(_[0][0], _[0][1]), t.point(_[1][0], _[1][1]), t.lineEnd()) : (t.point(_[1][0], _[1][1]), t.lineEnd(), t.lineStart(), t.point(_[0][0], _[0][1])))
                                        }!g || n && M_(n, d) || t.point(d[0], d[1]), n = d, i = g, e = v
                                    },
                                    lineEnd: function() {
                                        i && t.lineEnd(), n = null
                                    },
                                    clean: function() {
                                        return f | (a && i) << 1
                                    }
                                }
                            }

                            function o(t, n, e) {
                                var r = Er(t),
                                    i = Er(n),
                                    o = [1, 0, 0],
                                    u = Cr(r, i),
                                    s = Ar(u, u),
                                    c = u[0],
                                    f = s - c * c;
                                if (!f) return !e && t;
                                var l = a * s / f,
                                    h = -a * c / f,
                                    p = Cr(o, u),
                                    d = zr(o, l),
                                    g = zr(u, h);
                                Pr(d, g);
                                var v = p,
                                    _ = Ar(d, v),
                                    y = Ar(v, v),
                                    m = _ * _ - y * (Ar(d, d) - 1);
                                if (!(0 > m)) {
                                    var x = Vv(m),
                                        b = zr(v, (-_ - x) / y);
                                    if (Pr(b, d), b = Nr(b), !e) return b;
                                    var w, M = t[0],
                                        k = n[0],
                                        T = t[1],
                                        S = n[1];
                                    M > k && (w = M, M = k, k = w);
                                    var N = k - M,
                                        E = Uv(N - Cv) < Ev,
                                        A = E || Ev > N;
                                    if (!E && T > S && (w = T, T = S, S = w), A ? E ? T + S > 0 ^ b[1] < (Uv(b[0] - M) < Ev ? T : S) : T <= b[1] && b[1] <= S : N > Cv ^ (M <= b[0] && b[0] <= k)) {
                                        var C = zr(v, (-_ + x) / y);
                                        return Pr(C, d), [b, Nr(C)]
                                    }
                                }
                            }

                            function u(n, e) {
                                var r = s ? t : Cv - t,
                                    i = 0;
                                return -r > n ? i |= 1 : n > r && (i |= 2), -r > e ? i |= 4 : e > r && (i |= 8), i
                            }
                            var a = jv(t),
                                s = a > 0,
                                c = Uv(a) > Ev;
                            return py(r, i, e, s ? [0, -t] : [-Cv, t - Cv])
                        },
                        vy = function(t) {
                            return {
                                stream: $i(t)
                            }
                        };
                    Gi.prototype = {
                        constructor: Gi,
                        point: function(t, n) {
                            this.stream.point(t, n)
                        },
                        sphere: function() {
                            this.stream.sphere()
                        },
                        lineStart: function() {
                            this.stream.lineStart()
                        },
                        lineEnd: function() {
                            this.stream.lineEnd()
                        },
                        polygonStart: function() {
                            this.stream.polygonStart()
                        },
                        polygonEnd: function() {
                            this.stream.polygonEnd()
                        }
                    };
                    var _y = 16,
                        yy = jv(30 * Lv),
                        my = function(t, n) {
                            return +n ? Ki(t, n) : Qi(t)
                        },
                        xy = $i({
                            point: function(t, n) {
                                this.stream.point(t * Lv, n * Lv)
                            }
                        }),
                        by = function() {
                            return eo(io).scale(155.424).center([0, 33.6442])
                        },
                        wy = function() {
                            return by().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
                        },
                        My = function() {
                            function t(t) {
                                var n = t[0],
                                    e = t[1];
                                return a = null, i.point(n, e), a || (o.point(n, e), a) || (u.point(n, e), a)
                            }

                            function n() {
                                return e = r = null, t
                            }
                            var e, r, i, o, u, a, s = wy(),
                                c = by().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
                                f = by().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
                                l = {
                                    point: function(t, n) {
                                        a = [t, n]
                                    }
                                };
                            return t.invert = function(t) {
                                var n = s.scale(),
                                    e = s.translate(),
                                    r = (t[0] - e[0]) / n,
                                    i = (t[1] - e[1]) / n;
                                return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? c : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? f : s).invert(t)
                            }, t.stream = function(t) {
                                return e && r === t ? e : e = oo([s.stream(r = t), c.stream(t), f.stream(t)])
                            }, t.precision = function(t) {
                                return arguments.length ? (s.precision(t), c.precision(t), f.precision(t), n()) : s.precision()
                            }, t.scale = function(n) {
                                return arguments.length ? (s.scale(n), c.scale(.35 * n), f.scale(n), t.translate(s.translate())) : s.scale()
                            }, t.translate = function(t) {
                                if (!arguments.length) return s.translate();
                                var e = s.scale(),
                                    r = +t[0],
                                    a = +t[1];
                                return i = s.translate(t).clipExtent([
                                    [r - .455 * e, a - .238 * e],
                                    [r + .455 * e, a + .238 * e]
                                ]).stream(l), o = c.translate([r - .307 * e, a + .201 * e]).clipExtent([
                                    [r - .425 * e + Ev, a + .12 * e + Ev],
                                    [r - .214 * e - Ev, a + .234 * e - Ev]
                                ]).stream(l), u = f.translate([r - .205 * e, a + .212 * e]).clipExtent([
                                    [r - .214 * e + Ev, a + .166 * e + Ev],
                                    [r - .115 * e - Ev, a + .234 * e - Ev]
                                ]).stream(l), n()
                            }, t.fitExtent = function(n, e) {
                                return Zi(t, n, e)
                            }, t.fitSize = function(n, e) {
                                return Ji(t, n, e)
                            }, t.scale(1070)
                        },
                        ky = uo(function(t) {
                            return Vv(2 / (1 + t))
                        });
                    ky.invert = ao(function(t) {
                        return 2 * _r(t / 2)
                    });
                    var Ty = function() {
                            return to(ky).scale(124.75).clipAngle(179.999)
                        },
                        Sy = uo(function(t) {
                            return (t = vr(t)) && t / Bv(t)
                        });
                    Sy.invert = ao(function(t) {
                        return t
                    });
                    var Ny = function() {
                        return to(Sy).scale(79.4188).clipAngle(179.999)
                    };
                    so.invert = function(t, n) {
                        return [t, 2 * Ov(Iv(n)) - Pv]
                    };
                    var Ey = function() {
                            return co(so).scale(961 / Rv)
                        },
                        Ay = function() {
                            return eo(lo).scale(109.5).parallels([30, 30])
                        };
                    ho.invert = ho;
                    var Cy = function() {
                            return to(ho).scale(152.63)
                        },
                        Py = function() {
                            return eo(po).scale(131.154).center([0, 13.9389])
                        };
                    go.invert = ao(Ov);
                    var zy = function() {
                            return to(go).scale(144.049).clipAngle(60)
                        },
                        Ry = function() {
                            function t() {
                                return i = o = null, u
                            }
                            var n, e, r, i, o, u, a = 1,
                                s = 0,
                                c = 0,
                                f = 1,
                                l = 1,
                                h = F_,
                                p = null,
                                d = F_;
                            return u = {
                                stream: function(t) {
                                    return i && o === t ? i : i = h(d(o = t))
                                },
                                clipExtent: function(i) {
                                    return arguments.length ? (d = null == i ? (p = n = e = r = null, F_) : ci(p = +i[0][0], n = +i[0][1], e = +i[1][0], r = +i[1][1]), t()) : null == p ? null : [
                                        [p, n],
                                        [e, r]
                                    ]
                                },
                                scale: function(n) {
                                    return arguments.length ? (h = vo((a = +n) * f, a * l, s, c),
                                        t()) : a
                                },
                                translate: function(n) {
                                    return arguments.length ? (h = vo(a * f, a * l, s = +n[0], c = +n[1]), t()) : [s, c]
                                },
                                reflectX: function(n) {
                                    return arguments.length ? (h = vo(a * (f = n ? -1 : 1), a * l, s, c), t()) : 0 > f
                                },
                                reflectY: function(n) {
                                    return arguments.length ? (h = vo(a * f, a * (l = n ? -1 : 1), s, c), t()) : 0 > l
                                },
                                fitExtent: function(t, n) {
                                    return Zi(u, t, n)
                                },
                                fitSize: function(t, n) {
                                    return Ji(u, t, n)
                                }
                            }
                        };
                    _o.invert = ao(_r);
                    var qy = function() {
                        return to(_o).scale(249.5).clipAngle(90 + Ev)
                    };
                    yo.invert = ao(function(t) {
                        return 2 * Ov(t)
                    });
                    var Ly = function() {
                        return to(yo).scale(250).clipAngle(142)
                    };
                    mo.invert = function(t, n) {
                        return [-n, 2 * Ov(Iv(t)) - Pv]
                    };
                    var Uy = function() {
                            var t = co(mo),
                                n = t.center,
                                e = t.rotate;
                            return t.center = function(t) {
                                return arguments.length ? n([-t[1], t[0]]) : (t = n(), [t[1], -t[0]])
                            }, t.rotate = function(t) {
                                return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = e(), [t[0], t[1], t[2] - 90])
                            }, e([0, 0, 90]).scale(159.155)
                        },
                        Oy = function() {
                            function t(t) {
                                var o, u = 0;
                                t.eachAfter(function(t) {
                                    var e = t.children;
                                    e ? (t.x = bo(e), t.y = Mo(e)) : (t.x = o ? u += n(t, o) : 0, t.y = 0, o = t)
                                });
                                var a = To(t),
                                    s = So(t),
                                    c = a.x - n(a, s) / 2,
                                    f = s.x + n(s, a) / 2;
                                return t.eachAfter(i ? function(n) {
                                    n.x = (n.x - t.x) * e, n.y = (t.y - n.y) * r
                                } : function(n) {
                                    n.x = (n.x - c) / (f - c) * e, n.y = (1 - (t.y ? n.y / t.y : 1)) * r
                                })
                            }
                            var n = xo,
                                e = 1,
                                r = 1,
                                i = !1;
                            return t.separation = function(e) {
                                return arguments.length ? (n = e, t) : n
                            }, t.size = function(n) {
                                return arguments.length ? (i = !1, e = +n[0], r = +n[1], t) : i ? null : [e, r]
                            }, t.nodeSize = function(n) {
                                return arguments.length ? (i = !0, e = +n[0], r = +n[1], t) : i ? [e, r] : null
                            }, t
                        },
                        Dy = function() {
                            return this.eachAfter(No)
                        },
                        jy = function(t) {
                            var n, e, r, i, o = this,
                                u = [o];
                            do
                                for (n = u.reverse(), u = []; o = n.pop();)
                                    if (t(o), e = o.children)
                                        for (r = 0, i = e.length; i > r; ++r) u.push(e[r]); while (u.length);
                            return this
                        },
                        Fy = function(t) {
                            for (var n, e, r = this, i = [r]; r = i.pop();)
                                if (t(r), n = r.children)
                                    for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
                            return this
                        },
                        Iy = function(t) {
                            for (var n, e, r, i = this, o = [i], u = []; i = o.pop();)
                                if (u.push(i), n = i.children)
                                    for (e = 0, r = n.length; r > e; ++e) o.push(n[e]);
                            for (; i = u.pop();) t(i);
                            return this
                        },
                        Yy = function(t) {
                            return this.eachAfter(function(n) {
                                for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;) e += r[i].value;
                                n.value = e
                            })
                        },
                        Hy = function(t) {
                            return this.eachBefore(function(n) {
                                n.children && n.children.sort(t)
                            })
                        },
                        By = function(t) {
                            for (var n = this, e = Eo(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
                            for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
                            return r
                        },
                        Xy = function() {
                            for (var t = this, n = [t]; t = t.parent;) n.push(t);
                            return n
                        },
                        Vy = function() {
                            var t = [];
                            return this.each(function(n) {
                                t.push(n)
                            }), t
                        },
                        Wy = function() {
                            var t = [];
                            return this.eachBefore(function(n) {
                                n.children || t.push(n)
                            }), t
                        },
                        $y = function() {
                            var t = this,
                                n = [];
                            return t.each(function(e) {
                                e !== t && n.push({
                                    source: e.parent,
                                    target: e
                                })
                            }), n
                        };
                    qo.prototype = Ao.prototype = {
                        constructor: qo,
                        count: Dy,
                        each: jy,
                        eachAfter: Iy,
                        eachBefore: Fy,
                        sum: Yy,
                        sort: Hy,
                        path: By,
                        ancestors: Xy,
                        descendants: Vy,
                        leaves: Wy,
                        links: $y,
                        copy: Co
                    };
                    var Gy = function(t) {
                            for (var n, e = (t = t.slice()).length, r = null, i = r; e;) {
                                var o = new Lo(t[e - 1]);
                                i = i ? i.next = o : r = o, t[n] = t[--e]
                            }
                            return {
                                head: r,
                                tail: i
                            }
                        },
                        Zy = function(t) {
                            return Oo(Gy(t), [])
                        },
                        Jy = function(t) {
                            return Xo(t), t
                        },
                        Qy = function(t) {
                            return function() {
                                return t
                            }
                        },
                        Ky = function() {
                            function t(t) {
                                return t.x = e / 2, t.y = r / 2, n ? t.eachBefore(Zo(n)).eachAfter(Jo(i, .5)).eachBefore(Qo(1)) : t.eachBefore(Zo(Go)).eachAfter(Jo($o, 1)).eachAfter(Jo(i, t.r / Math.min(e, r))).eachBefore(Qo(Math.min(e, r) / (2 * t.r))), t
                            }
                            var n = null,
                                e = 1,
                                r = 1,
                                i = $o;
                            return t.radius = function(e) {
                                return arguments.length ? (n = Vo(e), t) : n
                            }, t.size = function(n) {
                                return arguments.length ? (e = +n[0], r = +n[1], t) : [e, r]
                            }, t.padding = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Qy(+n), t) : i
                            }, t
                        },
                        tm = function(t) {
                            t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
                        },
                        nm = function(t, n, e, r, i) {
                            for (var o, u = t.children, a = -1, s = u.length, c = t.value && (r - n) / t.value; ++a < s;) o = u[a], o.y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * c
                        },
                        em = function() {
                            function t(t) {
                                var u = t.height + 1;
                                return t.x0 = t.y0 = i, t.x1 = e, t.y1 = r / u, t.eachBefore(n(r, u)), o && t.eachBefore(tm), t
                            }

                            function n(t, n) {
                                return function(e) {
                                    e.children && nm(e, e.x0, t * (e.depth + 1) / n, e.x1, t * (e.depth + 2) / n);
                                    var r = e.x0,
                                        o = e.y0,
                                        u = e.x1 - i,
                                        a = e.y1 - i;
                                    r > u && (r = u = (r + u) / 2), o > a && (o = a = (o + a) / 2), e.x0 = r, e.y0 = o, e.x1 = u, e.y1 = a
                                }
                            }
                            var e = 1,
                                r = 1,
                                i = 0,
                                o = !1;
                            return t.round = function(n) {
                                return arguments.length ? (o = !!n, t) : o
                            }, t.size = function(n) {
                                return arguments.length ? (e = +n[0], r = +n[1], t) : [e, r]
                            }, t.padding = function(n) {
                                return arguments.length ? (i = +n, t) : i
                            }, t
                        },
                        rm = "$",
                        im = {
                            depth: -1
                        },
                        om = {},
                        um = function() {
                            function t(t) {
                                var r, i, o, u, a, s, c, f = t.length,
                                    l = new Array(f),
                                    h = {};
                                for (i = 0; f > i; ++i) r = t[i], a = l[i] = new qo(r), null != (s = n(r, i, t)) && (s += "") && (c = rm + (a.id = s), h[c] = c in h ? om : a);
                                for (i = 0; f > i; ++i)
                                    if (a = l[i], s = e(t[i], i, t), null != s && (s += "")) {
                                        if (u = h[rm + s], !u) throw new Error("missing: " + s);
                                        if (u === om) throw new Error("ambiguous: " + s);
                                        u.children ? u.children.push(a) : u.children = [a], a.parent = u
                                    } else {
                                        if (o) throw new Error("multiple roots");
                                        o = a
                                    }
                                if (!o) throw new Error("no root");
                                if (o.parent = im, o.eachBefore(function(t) {
                                        t.depth = t.parent.depth + 1, --f
                                    }).eachBefore(Ro), o.parent = null, f > 0) throw new Error("cycle");
                                return o
                            }
                            var n = Ko,
                                e = tu;
                            return t.id = function(e) {
                                return arguments.length ? (n = Wo(e), t) : n
                            }, t.parentId = function(n) {
                                return arguments.length ? (e = Wo(n), t) : e
                            }, t
                        };
                    au.prototype = Object.create(qo.prototype);
                    var am = function() {
                            function t(t) {
                                var r = su(t);
                                if (r.eachAfter(n), r.parent.m = -r.z, r.eachBefore(e), s) t.eachBefore(i);
                                else {
                                    var c = t,
                                        f = t,
                                        l = t;
                                    t.eachBefore(function(t) {
                                        t.x < c.x && (c = t), t.x > f.x && (f = t), t.depth > l.depth && (l = t)
                                    });
                                    var h = c === f ? 1 : o(c, f) / 2,
                                        p = h - c.x,
                                        d = u / (f.x + h + p),
                                        g = a / (l.depth || 1);
                                    t.eachBefore(function(t) {
                                        t.x = (t.x + p) * d, t.y = t.depth * g
                                    })
                                }
                                return t
                            }

                            function n(t) {
                                var n = t.children,
                                    e = t.parent.children,
                                    i = t.i ? e[t.i - 1] : null;
                                if (n) {
                                    ou(t);
                                    var u = (n[0].z + n[n.length - 1].z) / 2;
                                    i ? (t.z = i.z + o(t._, i._), t.m = t.z - u) : t.z = u
                                } else i && (t.z = i.z + o(t._, i._));
                                t.parent.A = r(t, i, t.parent.A || e[0])
                            }

                            function e(t) {
                                t._.x = t.z + t.parent.m, t.m += t.parent.m
                            }

                            function r(t, n, e) {
                                if (n) {
                                    for (var r, i = t, u = t, a = n, s = i.parent.children[0], c = i.m, f = u.m, l = a.m, h = s.m; a = ru(a), i = eu(i), a && i;) s = eu(s), u = ru(u), u.a = t, r = a.z + l - i.z - c + o(a._, i._), r > 0 && (iu(uu(a, t, e), t, r), c += r, f += r), l += a.m, c += i.m, h += s.m, f += u.m;
                                    a && !ru(u) && (u.t = a, u.m += l - f), i && !eu(s) && (s.t = i, s.m += c - h, e = t)
                                }
                                return e
                            }

                            function i(t) {
                                t.x *= u, t.y = t.depth * a
                            }
                            var o = nu,
                                u = 1,
                                a = 1,
                                s = null;
                            return t.separation = function(n) {
                                return arguments.length ? (o = n, t) : o
                            }, t.size = function(n) {
                                return arguments.length ? (s = !1, u = +n[0], a = +n[1], t) : s ? null : [u, a]
                            }, t.nodeSize = function(n) {
                                return arguments.length ? (s = !0, u = +n[0], a = +n[1], t) : s ? [u, a] : null
                            }, t
                        },
                        sm = function(t, n, e, r, i) {
                            for (var o, u = t.children, a = -1, s = u.length, c = t.value && (i - e) / t.value; ++a < s;) o = u[a], o.x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o.value * c
                        },
                        cm = (1 + Math.sqrt(5)) / 2,
                        fm = function pM(t) {
                            function n(n, e, r, i, o) {
                                cu(t, n, e, r, i, o)
                            }
                            return n.ratio = function(t) {
                                return pM((t = +t) > 1 ? t : 1)
                            }, n
                        }(cm),
                        lm = function() {
                            function t(t) {
                                return t.x0 = t.y0 = 0, t.x1 = i, t.y1 = o, t.eachBefore(n), u = [0], r && t.eachBefore(tm), t
                            }

                            function n(t) {
                                var n = u[t.depth],
                                    r = t.x0 + n,
                                    i = t.y0 + n,
                                    o = t.x1 - n,
                                    h = t.y1 - n;
                                r > o && (r = o = (r + o) / 2), i > h && (i = h = (i + h) / 2), t.x0 = r, t.y0 = i, t.x1 = o, t.y1 = h, t.children && (n = u[t.depth + 1] = a(t) / 2, r += l(t) - n, i += s(t) - n, o -= c(t) - n, h -= f(t) - n, r > o && (r = o = (r + o) / 2), i > h && (i = h = (i + h) / 2), e(t, r, i, o, h))
                            }
                            var e = fm,
                                r = !1,
                                i = 1,
                                o = 1,
                                u = [0],
                                a = $o,
                                s = $o,
                                c = $o,
                                f = $o,
                                l = $o;
                            return t.round = function(n) {
                                return arguments.length ? (r = !!n, t) : r
                            }, t.size = function(n) {
                                return arguments.length ? (i = +n[0], o = +n[1], t) : [i, o]
                            }, t.tile = function(n) {
                                return arguments.length ? (e = Wo(n), t) : e
                            }, t.padding = function(n) {
                                return arguments.length ? t.paddingInner(n).paddingOuter(n) : t.paddingInner()
                            }, t.paddingInner = function(n) {
                                return arguments.length ? (a = "function" == typeof n ? n : Qy(+n), t) : a
                            }, t.paddingOuter = function(n) {
                                return arguments.length ? t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n) : t.paddingTop()
                            }, t.paddingTop = function(n) {
                                return arguments.length ? (s = "function" == typeof n ? n : Qy(+n), t) : s
                            }, t.paddingRight = function(n) {
                                return arguments.length ? (c = "function" == typeof n ? n : Qy(+n), t) : c
                            }, t.paddingBottom = function(n) {
                                return arguments.length ? (f = "function" == typeof n ? n : Qy(+n), t) : f
                            }, t.paddingLeft = function(n) {
                                return arguments.length ? (l = "function" == typeof n ? n : Qy(+n), t) : l
                            }, t
                        },
                        hm = function(t, n, e, r, i) {
                            function o(t, n, e, r, i, u, a) {
                                if (t >= n - 1) {
                                    var c = s[t];
                                    return c.x0 = r, c.y0 = i, c.x1 = u, c.y1 = a, void 0
                                }
                                for (var l = f[t], h = e / 2 + l, p = t + 1, d = n - 1; d > p;) {
                                    var g = p + d >>> 1;
                                    f[g] < h ? p = g + 1 : d = g
                                }
                                h - f[p - 1] < f[p] - h && p > t + 1 && --p;
                                var v = f[p] - l,
                                    _ = e - v;
                                if (u - r > a - i) {
                                    var y = (r * _ + u * v) / e;
                                    o(t, p, v, r, i, y, a), o(p, n, _, y, i, u, a)
                                } else {
                                    var m = (i * _ + a * v) / e;
                                    o(t, p, v, r, i, u, m), o(p, n, _, r, m, u, a)
                                }
                            }
                            var u, a, s = t.children,
                                c = s.length,
                                f = new Array(c + 1);
                            for (f[0] = a = u = 0; c > u; ++u) f[u + 1] = a += s[u].value;
                            o(0, c, t.value, n, e, r, i)
                        },
                        pm = function(t, n, e, r, i) {
                            (1 & t.depth ? sm : nm)(t, n, e, r, i)
                        },
                        dm = function dM(t) {
                            function n(n, e, r, i, o) {
                                if ((u = n._squarify) && u.ratio === t)
                                    for (var u, a, s, c, f, l = -1, h = u.length, p = n.value; ++l < h;) {
                                        for (a = u[l], s = a.children, c = a.value = 0, f = s.length; f > c; ++c) a.value += s[c].value;
                                        a.dice ? nm(a, e, r, i, r += (o - r) * a.value / p) : sm(a, e, r, e += (i - e) * a.value / p, o), p -= a.value
                                    } else n._squarify = u = cu(t, n, e, r, i, o), u.ratio = t
                            }
                            return n.ratio = function(t) {
                                return dM((t = +t) > 1 ? t : 1)
                            }, n
                        }(cm),
                        gm = function(t) {
                            for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r;) n = i, i = t[e], o += n[1] * i[0] - n[0] * i[1];
                            return o / 2
                        },
                        vm = function(t) {
                            for (var n, e, r = -1, i = t.length, o = 0, u = 0, a = t[i - 1], s = 0; ++r < i;) n = a, a = t[r], s += e = n[0] * a[1] - a[0] * n[1], o += (n[0] + a[0]) * e, u += (n[1] + a[1]) * e;
                            return s *= 3, [o / s, u / s]
                        },
                        _m = function(t, n, e) {
                            return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
                        },
                        ym = function(t) {
                            if ((e = t.length) < 3) return null;
                            var n, e, r = new Array(e),
                                i = new Array(e);
                            for (n = 0; e > n; ++n) r[n] = [+t[n][0], +t[n][1], n];
                            for (r.sort(fu), n = 0; e > n; ++n) i[n] = [r[n][0], -r[n][1]];
                            var o = lu(r),
                                u = lu(i),
                                a = u[0] === o[0],
                                s = u[u.length - 1] === o[o.length - 1],
                                c = [];
                            for (n = o.length - 1; n >= 0; --n) c.push(t[r[o[n]][2]]);
                            for (n = +a; n < u.length - s; ++n) c.push(t[r[u[n]][2]]);
                            return c
                        },
                        mm = function(t, n) {
                            for (var e, r, i = t.length, o = t[i - 1], u = n[0], a = n[1], s = o[0], c = o[1], f = !1, l = 0; i > l; ++l) o = t[l], e = o[0], r = o[1], r > a != c > a && (s - e) * (a - r) / (c - r) + e > u && (f = !f), s = e, c = r;
                            return f
                        },
                        xm = function(t) {
                            for (var n, e, r = -1, i = t.length, o = t[i - 1], u = o[0], a = o[1], s = 0; ++r < i;) n = u, e = a, o = t[r], u = o[0], a = o[1], n -= u, e -= a, s += Math.sqrt(n * n + e * e);
                            return s
                        },
                        bm = [].slice,
                        wm = {};
                    hu.prototype = yu.prototype = {
                        constructor: hu,
                        defer: function(t) {
                            if ("function" != typeof t || this._call) throw new Error;
                            if (null != this._error) return this;
                            var n = bm.call(arguments, 1);
                            return n.push(t), ++this._waiting, this._tasks.push(n), pu(this), this
                        },
                        abort: function() {
                            return null == this._error && vu(this, new Error("abort")), this
                        },
                        await: function(t) {
                            if ("function" != typeof t || this._call) throw new Error;
                            return this._call = function(n, e) {
                                t.apply(null, [n].concat(e))
                            }, _u(this), this
                        },
                        awaitAll: function(t) {
                            if ("function" != typeof t || this._call) throw new Error;
                            return this._call = t, _u(this), this
                        }
                    };
                    var Mm = function(t, n) {
                            return t = null == t ? 0 : +t, n = null == n ? 1 : +n, 1 === arguments.length ? (n = t, t = 0) : n -= t,
                                function() {
                                    return Math.random() * n + t
                                }
                        },
                        km = function(t, n) {
                            var e, r;
                            return t = null == t ? 0 : +t, n = null == n ? 1 : +n,
                                function() {
                                    var i;
                                    if (null != e) i = e, e = null;
                                    else
                                        do e = 2 * Math.random() - 1, i = 2 * Math.random() - 1, r = e * e + i * i; while (!r || r > 1);
                                    return t + n * i * Math.sqrt(-2 * Math.log(r) / r)
                                }
                        },
                        Tm = function() {
                            var t = km.apply(this, arguments);
                            return function() {
                                return Math.exp(t())
                            }
                        },
                        Sm = function(t) {
                            return function() {
                                for (var n = 0, e = 0; t > e; ++e) n += Math.random();
                                return n
                            }
                        },
                        Nm = function(t) {
                            var n = Sm(t);
                            return function() {
                                return n() / t
                            }
                        },
                        Em = function(t) {
                            return function() {
                                return -Math.log(1 - Math.random()) / t
                            }
                        },
                        Am = function(t, n) {
                            function e(t) {
                                var n, e = c.status;
                                if (!e && xu(c) || e >= 200 && 300 > e || 304 === e) {
                                    if (o) try {
                                        n = o.call(r, c)
                                    } catch (i) {
                                        return void a.call("error", r, i)
                                    } else n = c;
                                    a.call("load", r, n)
                                } else a.call("error", r, t)
                            }
                            var r, i, o, u, a = d("beforesend", "progress", "load", "error"),
                                s = Ie(),
                                c = new XMLHttpRequest,
                                f = null,
                                l = null,
                                h = 0;
                            if ("undefined" == typeof XDomainRequest || "withCredentials" in c || !/^(http(s)?:)?\/\//.test(t) || (c = new XDomainRequest), "onload" in c ? c.onload = c.onerror = c.ontimeout = e : c.onreadystatechange = function(t) {
                                    c.readyState > 3 && e(t)
                                }, c.onprogress = function(t) {
                                    a.call("progress", r, t)
                                }, r = {
                                    header: function(t, n) {
                                        return t = (t + "").toLowerCase(), arguments.length < 2 ? s.get(t) : (null == n ? s.remove(t) : s.set(t, n + ""), r)
                                    },
                                    mimeType: function(t) {
                                        return arguments.length ? (i = null == t ? null : t + "", r) : i
                                    },
                                    responseType: function(t) {
                                        return arguments.length ? (u = t, r) : u
                                    },
                                    timeout: function(t) {
                                        return arguments.length ? (h = +t, r) : h
                                    },
                                    user: function(t) {
                                        return arguments.length < 1 ? f : (f = null == t ? null : t + "", r)
                                    },
                                    password: function(t) {
                                        return arguments.length < 1 ? l : (l = null == t ? null : t + "", r)
                                    },
                                    response: function(t) {
                                        return o = t, r
                                    },
                                    get: function(t, n) {
                                        return r.send("GET", t, n)
                                    },
                                    post: function(t, n) {
                                        return r.send("POST", t, n)
                                    },
                                    send: function(n, e, o) {
                                        return c.open(n, t, !0, f, l), null == i || s.has("accept") || s.set("accept", i + ",*/*"), c.setRequestHeader && s.each(function(t, n) {
                                            c.setRequestHeader(n, t)
                                        }), null != i && c.overrideMimeType && c.overrideMimeType(i), null != u && (c.responseType = u), h > 0 && (c.timeout = h), null == o && "function" == typeof e && (o = e, e = null), null != o && 1 === o.length && (o = mu(o)), null != o && r.on("error", o).on("load", function(t) {
                                            o(null, t)
                                        }), a.call("beforesend", r, c), c.send(null == e ? null : e), r
                                    },
                                    abort: function() {
                                        return c.abort(), r
                                    },
                                    on: function() {
                                        var t = a.on.apply(a, arguments);
                                        return t === a ? r : t
                                    }
                                }, null != n) {
                                if ("function" != typeof n) throw new Error("invalid callback: " + n);
                                return r.get(n)
                            }
                            return r
                        },
                        Cm = function(t, n) {
                            return function(e, r) {
                                var i = Am(e).mimeType(t).response(n);
                                if (null != r) {
                                    if ("function" != typeof r) throw new Error("invalid callback: " + r);
                                    return i.get(r)
                                }
                                return i
                            }
                        },
                        Pm = Cm("text/html", function(t) {
                            return document.createRange().createContextualFragment(t.responseText)
                        }),
                        zm = Cm("application/json", function(t) {
                            return JSON.parse(t.responseText)
                        }),
                        Rm = Cm("text/plain", function(t) {
                            return t.responseText
                        }),
                        qm = Cm("application/xml", function(t) {
                            var n = t.responseXML;
                            if (!n) throw new Error("parse error");
                            return n
                        }),
                        Lm = function(t, n) {
                            return function(e, r, i) {
                                arguments.length < 3 && (i = r, r = null);
                                var o = Am(e).mimeType(t);
                                return o.row = function(t) {
                                    return arguments.length ? o.response(bu(n, r = t)) : r
                                }, o.row(r), i ? o.get(i) : o
                            }
                        },
                        Um = Lm("text/csv", Qd),
                        Om = Lm("text/tab-separated-values", rg),
                        Dm = Array.prototype,
                        jm = Dm.map,
                        Fm = Dm.slice,
                        Im = {
                            name: "implicit"
                        },
                        Ym = function(t) {
                            return function() {
                                return t
                            }
                        },
                        Hm = function(t) {
                            return +t
                        },
                        Bm = [0, 1],
                        Xm = function(n, e, i) {
                            var o, u = n[0],
                                a = n[n.length - 1],
                                s = r(u, a, null == e ? 10 : e);
                            switch (i = lr(null == i ? ",f" : i), i.type) {
                                case "s":
                                    var c = Math.max(Math.abs(u), Math.abs(a));
                                    return null != i.precision || isNaN(o = Wg(s, c)) || (i.precision = o), t.formatPrefix(i, c);
                                case "":
                                case "e":
                                case "g":
                                case "p":
                                case "r":
                                    null != i.precision || isNaN(o = $g(s, Math.max(Math.abs(u), Math.abs(a)))) || (i.precision = o - ("e" === i.type));
                                    break;
                                case "f":
                                case "%":
                                    null != i.precision || isNaN(o = Vg(s)) || (i.precision = o - 2 * ("%" === i.type))
                            }
                            return t.format(i)
                        },
                        Vm = function(t, n) {
                            t = t.slice();
                            var e, r = 0,
                                i = t.length - 1,
                                o = t[r],
                                u = t[i];
                            return o > u && (e = r, r = i, i = e, e = o, o = u, u = e), t[r] = n.floor(o), t[i] = n.ceil(u), t
                        },
                        Wm = new Date,
                        $m = new Date,
                        Gm = Gu(function() {}, function(t, n) {
                            t.setTime(+t + n)
                        }, function(t, n) {
                            return n - t
                        });
                    Gm.every = function(t) {
                        return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? Gu(function(n) {
                            n.setTime(Math.floor(n / t) * t)
                        }, function(n, e) {
                            n.setTime(+n + e * t)
                        }, function(n, e) {
                            return (e - n) / t
                        }) : Gm : null
                    };
                    var Zm = Gm.range,
                        Jm = 1e3,
                        Qm = 6e4,
                        Km = 36e5,
                        tx = 864e5,
                        nx = 6048e5,
                        ex = Gu(function(t) {
                            t.setTime(Math.floor(t / Jm) * Jm)
                        }, function(t, n) {
                            t.setTime(+t + n * Jm)
                        }, function(t, n) {
                            return (n - t) / Jm
                        }, function(t) {
                            return t.getUTCSeconds()
                        }),
                        rx = ex.range,
                        ix = Gu(function(t) {
                            t.setTime(Math.floor(t / Qm) * Qm)
                        }, function(t, n) {
                            t.setTime(+t + n * Qm)
                        }, function(t, n) {
                            return (n - t) / Qm
                        }, function(t) {
                            return t.getMinutes()
                        }),
                        ox = ix.range,
                        ux = Gu(function(t) {
                            var n = t.getTimezoneOffset() * Qm % Km;
                            0 > n && (n += Km), t.setTime(Math.floor((+t - n) / Km) * Km + n)
                        }, function(t, n) {
                            t.setTime(+t + n * Km)
                        }, function(t, n) {
                            return (n - t) / Km
                        }, function(t) {
                            return t.getHours()
                        }),
                        ax = ux.range,
                        sx = Gu(function(t) {
                            t.setHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setDate(t.getDate() + n)
                        }, function(t, n) {
                            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Qm) / tx
                        }, function(t) {
                            return t.getDate() - 1
                        }),
                        cx = sx.range,
                        fx = Zu(0),
                        lx = Zu(1),
                        hx = Zu(2),
                        px = Zu(3),
                        dx = Zu(4),
                        gx = Zu(5),
                        vx = Zu(6),
                        _x = fx.range,
                        yx = lx.range,
                        mx = hx.range,
                        xx = px.range,
                        bx = dx.range,
                        wx = gx.range,
                        Mx = vx.range,
                        kx = Gu(function(t) {
                            t.setDate(1), t.setHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setMonth(t.getMonth() + n)
                        }, function(t, n) {
                            return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
                        }, function(t) {
                            return t.getMonth()
                        }),
                        Tx = kx.range,
                        Sx = Gu(function(t) {
                            t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setFullYear(t.getFullYear() + n)
                        }, function(t, n) {
                            return n.getFullYear() - t.getFullYear()
                        }, function(t) {
                            return t.getFullYear()
                        });
                    Sx.every = function(t) {
                        return isFinite(t = Math.floor(t)) && t > 0 ? Gu(function(n) {
                            n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0)
                        }, function(n, e) {
                            n.setFullYear(n.getFullYear() + e * t)
                        }) : null
                    };
                    var Nx = Sx.range,
                        Ex = Gu(function(t) {
                            t.setUTCSeconds(0, 0)
                        }, function(t, n) {
                            t.setTime(+t + n * Qm)
                        }, function(t, n) {
                            return (n - t) / Qm
                        }, function(t) {
                            return t.getUTCMinutes()
                        }),
                        Ax = Ex.range,
                        Cx = Gu(function(t) {
                            t.setUTCMinutes(0, 0, 0)
                        }, function(t, n) {
                            t.setTime(+t + n * Km)
                        }, function(t, n) {
                            return (n - t) / Km
                        }, function(t) {
                            return t.getUTCHours()
                        }),
                        Px = Cx.range,
                        zx = Gu(function(t) {
                            t.setUTCHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setUTCDate(t.getUTCDate() + n)
                        }, function(t, n) {
                            return (n - t) / tx
                        }, function(t) {
                            return t.getUTCDate() - 1
                        }),
                        Rx = zx.range,
                        qx = Ju(0),
                        Lx = Ju(1),
                        Ux = Ju(2),
                        Ox = Ju(3),
                        Dx = Ju(4),
                        jx = Ju(5),
                        Fx = Ju(6),
                        Ix = qx.range,
                        Yx = Lx.range,
                        Hx = Ux.range,
                        Bx = Ox.range,
                        Xx = Dx.range,
                        Vx = jx.range,
                        Wx = Fx.range,
                        $x = Gu(function(t) {
                            t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setUTCMonth(t.getUTCMonth() + n)
                        }, function(t, n) {
                            return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
                        }, function(t) {
                            return t.getUTCMonth()
                        }),
                        Gx = $x.range,
                        Zx = Gu(function(t) {
                            t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
                        }, function(t, n) {
                            t.setUTCFullYear(t.getUTCFullYear() + n)
                        }, function(t, n) {
                            return n.getUTCFullYear() - t.getUTCFullYear()
                        }, function(t) {
                            return t.getUTCFullYear()
                        });
                    Zx.every = function(t) {
                        return isFinite(t = Math.floor(t)) && t > 0 ? Gu(function(n) {
                            n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0)
                        }, function(n, e) {
                            n.setUTCFullYear(n.getUTCFullYear() + e * t)
                        }) : null
                    };
                    var Jx, Qx = Zx.range,
                        Kx = {
                            "-": "",
                            _: " ",
                            0: "0"
                        },
                        tb = /^\s*\d+/,
                        nb = /^%/,
                        eb = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
                    Ga({
                        dateTime: "%x, %X",
                        date: "%-m/%-d/%Y",
                        time: "%-I:%M:%S %p",
                        periods: ["AM", "PM"],
                        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                    });
                    var rb = "%Y-%m-%dT%H:%M:%S.%LZ",
                        ib = Date.prototype.toISOString ? Za : t.utcFormat(rb),
                        ob = +new Date("2000-01-01T00:00:00.000Z") ? Ja : t.utcParse(rb),
                        ub = 1e3,
                        ab = 60 * ub,
                        sb = 60 * ab,
                        cb = 24 * sb,
                        fb = 7 * cb,
                        lb = 30 * cb,
                        hb = 365 * cb,
                        pb = function() {
                            return ts(Sx, kx, fx, sx, ux, ix, ex, Gm, t.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)])
                        },
                        db = function() {
                            return ts(Zx, $x, qx, zx, Cx, Ex, ex, Gm, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)])
                        },
                        gb = function(t) {
                            return t.match(/.{6}/g).map(function(t) {
                                return "#" + t
                            })
                        },
                        vb = gb("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
                        _b = gb("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),
                        yb = gb("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),
                        mb = gb("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),
                        xb = Vh(Vt(300, .5, 0), Vt(-240, .5, 1)),
                        bb = Vh(Vt(-100, .75, .35), Vt(80, 1.5, .8)),
                        wb = Vh(Vt(260, .75, .35), Vt(80, 1.5, .8)),
                        Mb = Vt(),
                        kb = function(t) {
                            (0 > t || t > 1) && (t -= Math.floor(t));
                            var n = Math.abs(t - .5);
                            return Mb.h = 360 * t - 100, Mb.s = 1.5 - 1.5 * n, Mb.l = .8 - .9 * n, Mb + ""
                        },
                        Tb = ns(gb("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),
                        Sb = ns(gb("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
                        Nb = ns(gb("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
                        Eb = ns(gb("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),
                        Ab = function(t) {
                            return function() {
                                return t
                            }
                        },
                        Cb = Math.abs,
                        Pb = Math.atan2,
                        zb = Math.cos,
                        Rb = Math.max,
                        qb = Math.min,
                        Lb = Math.sin,
                        Ub = Math.sqrt,
                        Ob = 1e-12,
                        Db = Math.PI,
                        jb = Db / 2,
                        Fb = 2 * Db,
                        Ib = function() {
                            function t() {
                                var t, c, f = +n.apply(this, arguments),
                                    l = +e.apply(this, arguments),
                                    h = o.apply(this, arguments) - jb,
                                    p = u.apply(this, arguments) - jb,
                                    d = Cb(p - h),
                                    g = p > h;
                                if (s || (s = t = qe()), f > l && (c = l, l = f, f = c), l > Ob)
                                    if (d > Fb - Ob) s.moveTo(l * zb(h), l * Lb(h)), s.arc(0, 0, l, h, p, !g), f > Ob && (s.moveTo(f * zb(p), f * Lb(p)), s.arc(0, 0, f, p, h, g));
                                    else {
                                        var v, _, y = h,
                                            m = p,
                                            x = h,
                                            b = p,
                                            w = d,
                                            M = d,
                                            k = a.apply(this, arguments) / 2,
                                            T = k > Ob && (i ? +i.apply(this, arguments) : Ub(f * f + l * l)),
                                            S = qb(Cb(l - f) / 2, +r.apply(this, arguments)),
                                            N = S,
                                            E = S;
                                        if (T > Ob) {
                                            var A = is(T / f * Lb(k)),
                                                C = is(T / l * Lb(k));
                                            (w -= 2 * A) > Ob ? (A *= g ? 1 : -1, x += A, b -= A) : (w = 0, x = b = (h + p) / 2), (M -= 2 * C) > Ob ? (C *= g ? 1 : -1, y += C, m -= C) : (M = 0, y = m = (h + p) / 2)
                                        }
                                        var P = l * zb(y),
                                            z = l * Lb(y),
                                            R = f * zb(b),
                                            q = f * Lb(b);
                                        if (S > Ob) {
                                            var L = l * zb(m),
                                                U = l * Lb(m),
                                                O = f * zb(x),
                                                D = f * Lb(x);
                                            if (Db > d) {
                                                var j = w > Ob ? fs(P, z, O, D, L, U, R, q) : [R, q],
                                                    F = P - j[0],
                                                    I = z - j[1],
                                                    Y = L - j[0],
                                                    H = U - j[1],
                                                    B = 1 / Lb(rs((F * Y + I * H) / (Ub(F * F + I * I) * Ub(Y * Y + H * H))) / 2),
                                                    X = Ub(j[0] * j[0] + j[1] * j[1]);
                                                N = qb(S, (f - X) / (B - 1)), E = qb(S, (l - X) / (B + 1))
                                            }
                                        }
                                        M > Ob ? E > Ob ? (v = ls(O, D, P, z, l, E, g), _ = ls(L, U, R, q, l, E, g), s.moveTo(v.cx + v.x01, v.cy + v.y01), S > E ? s.arc(v.cx, v.cy, E, Pb(v.y01, v.x01), Pb(_.y01, _.x01), !g) : (s.arc(v.cx, v.cy, E, Pb(v.y01, v.x01), Pb(v.y11, v.x11), !g), s.arc(0, 0, l, Pb(v.cy + v.y11, v.cx + v.x11), Pb(_.cy + _.y11, _.cx + _.x11), !g), s.arc(_.cx, _.cy, E, Pb(_.y11, _.x11), Pb(_.y01, _.x01), !g))) : (s.moveTo(P, z), s.arc(0, 0, l, y, m, !g)) : s.moveTo(P, z), f > Ob && w > Ob ? N > Ob ? (v = ls(R, q, L, U, f, -N, g), _ = ls(P, z, O, D, f, -N, g), s.lineTo(v.cx + v.x01, v.cy + v.y01), S > N ? s.arc(v.cx, v.cy, N, Pb(v.y01, v.x01), Pb(_.y01, _.x01), !g) : (s.arc(v.cx, v.cy, N, Pb(v.y01, v.x01), Pb(v.y11, v.x11), !g), s.arc(0, 0, f, Pb(v.cy + v.y11, v.cx + v.x11), Pb(_.cy + _.y11, _.cx + _.x11), g), s.arc(_.cx, _.cy, N, Pb(_.y11, _.x11), Pb(_.y01, _.x01), !g))) : s.arc(0, 0, f, b, x, g) : s.lineTo(R, q)
                                    }
                                else s.moveTo(0, 0);
                                return s.closePath(), t ? (s = null, t + "" || null) : void 0
                            }
                            var n = os,
                                e = us,
                                r = Ab(0),
                                i = null,
                                o = as,
                                u = ss,
                                a = cs,
                                s = null;
                            return t.centroid = function() {
                                var t = (+n.apply(this, arguments) + +e.apply(this, arguments)) / 2,
                                    r = (+o.apply(this, arguments) + +u.apply(this, arguments)) / 2 - Db / 2;
                                return [zb(r) * t, Lb(r) * t]
                            }, t.innerRadius = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Ab(+e), t) : n
                            }, t.outerRadius = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Ab(+n), t) : e
                            }, t.cornerRadius = function(n) {
                                return arguments.length ? (r = "function" == typeof n ? n : Ab(+n), t) : r
                            }, t.padRadius = function(n) {
                                return arguments.length ? (i = null == n ? null : "function" == typeof n ? n : Ab(+n), t) : i
                            }, t.startAngle = function(n) {
                                return arguments.length ? (o = "function" == typeof n ? n : Ab(+n), t) : o
                            }, t.endAngle = function(n) {
                                return arguments.length ? (u = "function" == typeof n ? n : Ab(+n), t) : u
                            }, t.padAngle = function(n) {
                                return arguments.length ? (a = "function" == typeof n ? n : Ab(+n), t) : a
                            }, t.context = function(n) {
                                return arguments.length ? (s = null == n ? null : n, t) : s
                            }, t
                        };
                    hs.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._point = 0
                        },
                        lineEnd: function() {
                            (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                    break;
                                case 1:
                                    this._point = 2;
                                default:
                                    this._context.lineTo(t, n)
                            }
                        }
                    };
                    var Yb = function(t) {
                            return new hs(t)
                        },
                        Hb = function() {
                            function t(t) {
                                var a, s, c, f = t.length,
                                    l = !1;
                                for (null == i && (u = o(c = qe())), a = 0; f >= a; ++a) !(f > a && r(s = t[a], a, t)) === l && ((l = !l) ? u.lineStart() : u.lineEnd()), l && u.point(+n(s, a, t), +e(s, a, t));
                                return c ? (u = null, c + "" || null) : void 0
                            }
                            var n = ps,
                                e = ds,
                                r = Ab(!0),
                                i = null,
                                o = Yb,
                                u = null;
                            return t.x = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Ab(+e), t) : n
                            }, t.y = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Ab(+n), t) : e
                            }, t.defined = function(n) {
                                return arguments.length ? (r = "function" == typeof n ? n : Ab(!!n), t) : r
                            }, t.curve = function(n) {
                                return arguments.length ? (o = n, null != i && (u = o(i)), t) : o
                            }, t.context = function(n) {
                                return arguments.length ? (null == n ? i = u = null : u = o(i = n), t) : i
                            }, t
                        },
                        Bb = function() {
                            function t(t) {
                                var n, f, l, h, p, d = t.length,
                                    g = !1,
                                    v = new Array(d),
                                    _ = new Array(d);
                                for (null == a && (c = s(p = qe())), n = 0; d >= n; ++n) {
                                    if (!(d > n && u(h = t[n], n, t)) === g)
                                        if (g = !g) f = n, c.areaStart(), c.lineStart();
                                        else {
                                            for (c.lineEnd(), c.lineStart(), l = n - 1; l >= f; --l) c.point(v[l], _[l]);
                                            c.lineEnd(), c.areaEnd()
                                        }
                                    g && (v[n] = +e(h, n, t), _[n] = +i(h, n, t), c.point(r ? +r(h, n, t) : v[n], o ? +o(h, n, t) : _[n]))
                                }
                                return p ? (c = null, p + "" || null) : void 0
                            }

                            function n() {
                                return Hb().defined(u).curve(s).context(a)
                            }
                            var e = ps,
                                r = null,
                                i = Ab(0),
                                o = ds,
                                u = Ab(!0),
                                a = null,
                                s = Yb,
                                c = null;
                            return t.x = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Ab(+n), r = null, t) : e
                            }, t.x0 = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Ab(+n), t) : e
                            }, t.x1 = function(n) {
                                return arguments.length ? (r = null == n ? null : "function" == typeof n ? n : Ab(+n), t) : r
                            }, t.y = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Ab(+n), o = null, t) : i
                            }, t.y0 = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Ab(+n), t) : i
                            }, t.y1 = function(n) {
                                return arguments.length ? (o = null == n ? null : "function" == typeof n ? n : Ab(+n), t) : o
                            }, t.lineX0 = t.lineY0 = function() {
                                return n().x(e).y(i)
                            }, t.lineY1 = function() {
                                return n().x(e).y(o)
                            }, t.lineX1 = function() {
                                return n().x(r).y(i)
                            }, t.defined = function(n) {
                                return arguments.length ? (u = "function" == typeof n ? n : Ab(!!n), t) : u
                            }, t.curve = function(n) {
                                return arguments.length ? (s = n, null != a && (c = s(a)), t) : s
                            }, t.context = function(n) {
                                return arguments.length ? (null == n ? a = c = null : c = s(a = n), t) : a
                            }, t
                        },
                        Xb = function(t, n) {
                            return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN
                        },
                        Vb = function(t) {
                            return t
                        },
                        Wb = function() {
                            function t(t) {
                                var a, s, c, f, l, h = t.length,
                                    p = 0,
                                    d = new Array(h),
                                    g = new Array(h),
                                    v = +i.apply(this, arguments),
                                    _ = Math.min(Fb, Math.max(-Fb, o.apply(this, arguments) - v)),
                                    y = Math.min(Math.abs(_) / h, u.apply(this, arguments)),
                                    m = y * (0 > _ ? -1 : 1);
                                for (a = 0; h > a; ++a)(l = g[d[a] = a] = +n(t[a], a, t)) > 0 && (p += l);
                                for (null != e ? d.sort(function(t, n) {
                                        return e(g[t], g[n])
                                    }) : null != r && d.sort(function(n, e) {
                                        return r(t[n], t[e])
                                    }), a = 0, c = p ? (_ - h * m) / p : 0; h > a; ++a, v = f) s = d[a], l = g[s], f = v + (l > 0 ? l * c : 0) + m, g[s] = {
                                    data: t[s],
                                    index: a,
                                    value: l,
                                    startAngle: v,
                                    endAngle: f,
                                    padAngle: y
                                };
                                return g
                            }
                            var n = Vb,
                                e = Xb,
                                r = null,
                                i = Ab(0),
                                o = Ab(Fb),
                                u = Ab(0);
                            return t.value = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Ab(+e), t) : n
                            }, t.sortValues = function(n) {
                                return arguments.length ? (e = n, r = null, t) : e
                            }, t.sort = function(n) {
                                return arguments.length ? (r = n, e = null, t) : r
                            }, t.startAngle = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Ab(+n), t) : i
                            }, t.endAngle = function(n) {
                                return arguments.length ? (o = "function" == typeof n ? n : Ab(+n), t) : o
                            }, t.padAngle = function(n) {
                                return arguments.length ? (u = "function" == typeof n ? n : Ab(+n), t) : u
                            }, t
                        },
                        $b = vs(Yb);
                    gs.prototype = {
                        areaStart: function() {
                            this._curve.areaStart()
                        },
                        areaEnd: function() {
                            this._curve.areaEnd()
                        },
                        lineStart: function() {
                            this._curve.lineStart()
                        },
                        lineEnd: function() {
                            this._curve.lineEnd()
                        },
                        point: function(t, n) {
                            this._curve.point(n * Math.sin(t), n * -Math.cos(t))
                        }
                    };
                    var Gb = function() {
                            return _s(Hb().curve($b))
                        },
                        Zb = function() {
                            var t = Bb().curve($b),
                                n = t.curve,
                                e = t.lineX0,
                                r = t.lineX1,
                                i = t.lineY0,
                                o = t.lineY1;
                            return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius = t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle = function() {
                                return _s(e())
                            }, delete t.lineX0, t.lineEndAngle = function() {
                                return _s(r())
                            }, delete t.lineX1, t.lineInnerRadius = function() {
                                return _s(i())
                            }, delete t.lineY0, t.lineOuterRadius = function() {
                                return _s(o())
                            }, delete t.lineY1, t.curve = function(t) {
                                return arguments.length ? n(vs(t)) : n()._curve
                            }, t
                        },
                        Jb = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n / Db);
                                t.moveTo(e, 0), t.arc(0, 0, e, 0, Fb)
                            }
                        },
                        Qb = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n / 5) / 2;
                                t.moveTo(-3 * e, -e), t.lineTo(-e, -e), t.lineTo(-e, -3 * e), t.lineTo(e, -3 * e), t.lineTo(e, -e), t.lineTo(3 * e, -e), t.lineTo(3 * e, e), t.lineTo(e, e), t.lineTo(e, 3 * e), t.lineTo(-e, 3 * e), t.lineTo(-e, e), t.lineTo(-3 * e, e), t.closePath()
                            }
                        },
                        Kb = Math.sqrt(1 / 3),
                        tw = 2 * Kb,
                        nw = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n / tw),
                                    r = e * Kb;
                                t.moveTo(0, -e), t.lineTo(r, 0), t.lineTo(0, e), t.lineTo(-r, 0), t.closePath()
                            }
                        },
                        ew = .8908130915292852,
                        rw = Math.sin(Db / 10) / Math.sin(7 * Db / 10),
                        iw = Math.sin(Fb / 10) * rw,
                        ow = -Math.cos(Fb / 10) * rw,
                        uw = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n * ew),
                                    r = iw * e,
                                    i = ow * e;
                                t.moveTo(0, -e), t.lineTo(r, i);
                                for (var o = 1; 5 > o; ++o) {
                                    var u = Fb * o / 5,
                                        a = Math.cos(u),
                                        s = Math.sin(u);
                                    t.lineTo(s * e, -a * e), t.lineTo(a * r - s * i, s * r + a * i)
                                }
                                t.closePath()
                            }
                        },
                        aw = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n),
                                    r = -e / 2;
                                t.rect(r, r, e, e)
                            }
                        },
                        sw = Math.sqrt(3),
                        cw = {
                            draw: function(t, n) {
                                var e = -Math.sqrt(n / (3 * sw));
                                t.moveTo(0, 2 * e), t.lineTo(-sw * e, -e), t.lineTo(sw * e, -e), t.closePath()
                            }
                        },
                        fw = -.5,
                        lw = Math.sqrt(3) / 2,
                        hw = 1 / Math.sqrt(12),
                        pw = 3 * (hw / 2 + 1),
                        dw = {
                            draw: function(t, n) {
                                var e = Math.sqrt(n / pw),
                                    r = e / 2,
                                    i = e * hw,
                                    o = r,
                                    u = e * hw + e,
                                    a = -o,
                                    s = u;
                                t.moveTo(r, i), t.lineTo(o, u), t.lineTo(a, s), t.lineTo(fw * r - lw * i, lw * r + fw * i), t.lineTo(fw * o - lw * u, lw * o + fw * u), t.lineTo(fw * a - lw * s, lw * a + fw * s), t.lineTo(fw * r + lw * i, fw * i - lw * r), t.lineTo(fw * o + lw * u, fw * u - lw * o), t.lineTo(fw * a + lw * s, fw * s - lw * a), t.closePath()
                            }
                        },
                        gw = [Jb, Qb, nw, aw, uw, cw, dw],
                        vw = function() {
                            function t() {
                                var t;
                                return r || (r = t = qe()), n.apply(this, arguments).draw(r, +e.apply(this, arguments)), t ? (r = null, t + "" || null) : void 0
                            }
                            var n = Ab(Jb),
                                e = Ab(64),
                                r = null;
                            return t.type = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Ab(e), t) : n
                            }, t.size = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Ab(+n), t) : e
                            }, t.context = function(n) {
                                return arguments.length ? (r = null == n ? null : n, t) : r
                            }, t
                        },
                        _w = function() {};
                    ms.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 3:
                                    ys(this, this._x1, this._y1);
                                case 2:
                                    this._context.lineTo(this._x1, this._y1)
                            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                    break;
                                case 1:
                                    this._point = 2;
                                    break;
                                case 2:
                                    this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
                                default:
                                    ys(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
                        }
                    };
                    var yw = function(t) {
                        return new ms(t)
                    };
                    xs.prototype = {
                        areaStart: _w,
                        areaEnd: _w,
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 1:
                                    this._context.moveTo(this._x2, this._y2), this._context.closePath();
                                    break;
                                case 2:
                                    this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
                                    break;
                                case 3:
                                    this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4)
                            }
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._x2 = t, this._y2 = n;
                                    break;
                                case 1:
                                    this._point = 2, this._x3 = t, this._y3 = n;
                                    break;
                                case 2:
                                    this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
                                    break;
                                default:
                                    ys(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
                        }
                    };
                    var mw = function(t) {
                        return new xs(t)
                    };
                    bs.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1;
                                    break;
                                case 1:
                                    this._point = 2;
                                    break;
                                case 2:
                                    this._point = 3;
                                    var e = (this._x0 + 4 * this._x1 + t) / 6,
                                        r = (this._y0 + 4 * this._y1 + n) / 6;
                                    this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
                                    break;
                                case 3:
                                    this._point = 4;
                                default:
                                    ys(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
                        }
                    };
                    var xw = function(t) {
                        return new bs(t)
                    };
                    ws.prototype = {
                        lineStart: function() {
                            this._x = [], this._y = [], this._basis.lineStart()
                        },
                        lineEnd: function() {
                            var t = this._x,
                                n = this._y,
                                e = t.length - 1;
                            if (e > 0)
                                for (var r, i = t[0], o = n[0], u = t[e] - i, a = n[e] - o, s = -1; ++s <= e;) r = s / e, this._basis.point(this._beta * t[s] + (1 - this._beta) * (i + r * u), this._beta * n[s] + (1 - this._beta) * (o + r * a));
                            this._x = this._y = null, this._basis.lineEnd()
                        },
                        point: function(t, n) {
                            this._x.push(+t), this._y.push(+n)
                        }
                    };
                    var bw = function gM(t) {
                        function n(n) {
                            return 1 === t ? new ms(n) : new ws(n, t)
                        }
                        return n.beta = function(t) {
                            return gM(+t)
                        }, n
                    }(.85);
                    ks.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 2:
                                    this._context.lineTo(this._x2, this._y2);
                                    break;
                                case 3:
                                    Ms(this, this._x1, this._y1)
                            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                    break;
                                case 1:
                                    this._point = 2, this._x1 = t, this._y1 = n;
                                    break;
                                case 2:
                                    this._point = 3;
                                default:
                                    Ms(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var ww = function vM(t) {
                        function n(n) {
                            return new ks(n, t)
                        }
                        return n.tension = function(t) {
                            return vM(+t)
                        }, n
                    }(0);
                    Ts.prototype = {
                        areaStart: _w,
                        areaEnd: _w,
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 1:
                                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                                    break;
                                case 2:
                                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                                    break;
                                case 3:
                                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
                            }
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._x3 = t, this._y3 = n;
                                    break;
                                case 1:
                                    this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                                    break;
                                case 2:
                                    this._point = 3, this._x5 = t, this._y5 = n;
                                    break;
                                default:
                                    Ms(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var Mw = function _M(t) {
                        function n(n) {
                            return new Ts(n, t)
                        }
                        return n.tension = function(t) {
                            return _M(+t)
                        }, n
                    }(0);
                    Ss.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1;
                                    break;
                                case 1:
                                    this._point = 2;
                                    break;
                                case 2:
                                    this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                                    break;
                                case 3:
                                    this._point = 4;
                                default:
                                    Ms(this, t, n)
                            }
                            this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var kw = function yM(t) {
                        function n(n) {
                            return new Ss(n, t)
                        }
                        return n.tension = function(t) {
                            return yM(+t)
                        }, n
                    }(0);
                    Es.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 2:
                                    this._context.lineTo(this._x2, this._y2);
                                    break;
                                case 3:
                                    this.point(this._x2, this._y2)
                            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            if (t = +t, n = +n, this._point) {
                                var e = this._x2 - t,
                                    r = this._y2 - n;
                                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                            }
                            switch (this._point) {
                                case 0:
                                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                    break;
                                case 1:
                                    this._point = 2;
                                    break;
                                case 2:
                                    this._point = 3;
                                default:
                                    Ns(this, t, n)
                            }
                            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var Tw = function mM(t) {
                        function n(n) {
                            return t ? new Es(n, t) : new ks(n, 0)
                        }
                        return n.alpha = function(t) {
                            return mM(+t)
                        }, n
                    }(.5);
                    As.prototype = {
                        areaStart: _w,
                        areaEnd: _w,
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 1:
                                    this._context.moveTo(this._x3, this._y3), this._context.closePath();
                                    break;
                                case 2:
                                    this._context.lineTo(this._x3, this._y3), this._context.closePath();
                                    break;
                                case 3:
                                    this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
                            }
                        },
                        point: function(t, n) {
                            if (t = +t, n = +n, this._point) {
                                var e = this._x2 - t,
                                    r = this._y2 - n;
                                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                            }
                            switch (this._point) {
                                case 0:
                                    this._point = 1, this._x3 = t, this._y3 = n;
                                    break;
                                case 1:
                                    this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
                                    break;
                                case 2:
                                    this._point = 3, this._x5 = t, this._y5 = n;
                                    break;
                                default:
                                    Ns(this, t, n)
                            }
                            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var Sw = function xM(t) {
                        function n(n) {
                            return t ? new As(n, t) : new Ts(n, 0)
                        }
                        return n.alpha = function(t) {
                            return xM(+t)
                        }, n
                    }(.5);
                    Cs.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
                        },
                        lineEnd: function() {
                            (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            if (t = +t, n = +n, this._point) {
                                var e = this._x2 - t,
                                    r = this._y2 - n;
                                this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                            }
                            switch (this._point) {
                                case 0:
                                    this._point = 1;
                                    break;
                                case 1:
                                    this._point = 2;
                                    break;
                                case 2:
                                    this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                                    break;
                                case 3:
                                    this._point = 4;
                                default:
                                    Ns(this, t, n)
                            }
                            this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
                        }
                    };
                    var Nw = function bM(t) {
                        function n(n) {
                            return t ? new Cs(n, t) : new Ss(n, 0)
                        }
                        return n.alpha = function(t) {
                            return bM(+t)
                        }, n
                    }(.5);
                    Ps.prototype = {
                        areaStart: _w,
                        areaEnd: _w,
                        lineStart: function() {
                            this._point = 0
                        },
                        lineEnd: function() {
                            this._point && this._context.closePath()
                        },
                        point: function(t, n) {
                            t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n))
                        }
                    };
                    var Ew = function(t) {
                        return new Ps(t)
                    };
                    Us.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            switch (this._point) {
                                case 2:
                                    this._context.lineTo(this._x1, this._y1);
                                    break;
                                case 3:
                                    Ls(this, this._t0, qs(this, this._t0))
                            }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
                        },
                        point: function(t, n) {
                            var e = NaN;
                            if (t = +t, n = +n, t !== this._x1 || n !== this._y1) {
                                switch (this._point) {
                                    case 0:
                                        this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                        break;
                                    case 1:
                                        this._point = 2;
                                        break;
                                    case 2:
                                        this._point = 3, Ls(this, qs(this, e = Rs(this, t, n)), e);
                                        break;
                                    default:
                                        Ls(this, this._t0, e = Rs(this, t, n))
                                }
                                this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e
                            }
                        }
                    }, (Os.prototype = Object.create(Us.prototype)).point = function(t, n) {
                        Us.prototype.point.call(this, n, t)
                    }, Ds.prototype = {
                        moveTo: function(t, n) {
                            this._context.moveTo(n, t)
                        },
                        closePath: function() {
                            this._context.closePath()
                        },
                        lineTo: function(t, n) {
                            this._context.lineTo(n, t)
                        },
                        bezierCurveTo: function(t, n, e, r, i, o) {
                            this._context.bezierCurveTo(n, t, r, e, o, i)
                        }
                    }, Is.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x = [], this._y = []
                        },
                        lineEnd: function() {
                            var t = this._x,
                                n = this._y,
                                e = t.length;
                            if (e)
                                if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e) this._context.lineTo(t[1], n[1]);
                                else
                                    for (var r = Ys(t), i = Ys(n), o = 0, u = 1; e > u; ++o, ++u) this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[u], n[u]);
                            (this._line || 0 !== this._line && 1 === e) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
                        },
                        point: function(t, n) {
                            this._x.push(+t), this._y.push(+n)
                        }
                    };
                    var Aw = function(t) {
                        return new Is(t)
                    };
                    Hs.prototype = {
                        areaStart: function() {
                            this._line = 0
                        },
                        areaEnd: function() {
                            this._line = NaN
                        },
                        lineStart: function() {
                            this._x = this._y = NaN, this._point = 0
                        },
                        lineEnd: function() {
                            0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
                        },
                        point: function(t, n) {
                            switch (t = +t, n = +n, this._point) {
                                case 0:
                                    this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                                    break;
                                case 1:
                                    this._point = 2;
                                default:
                                    if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);
                                    else {
                                        var e = this._x * (1 - this._t) + t * this._t;
                                        this._context.lineTo(e, this._y), this._context.lineTo(e, n)
                                    }
                            }
                            this._x = t, this._y = n
                        }
                    };
                    var Cw = function(t) {
                            return new Hs(t, .5)
                        },
                        Pw = Array.prototype.slice,
                        zw = function(t, n) {
                            if ((r = t.length) > 1)
                                for (var e, r, i = 1, o = t[n[0]], u = o.length; r > i; ++i) {
                                    e = o, o = t[n[i]];
                                    for (var a = 0; u > a; ++a) o[a][1] += o[a][0] = isNaN(e[a][1]) ? e[a][0] : e[a][1]
                                }
                        },
                        Rw = function(t) {
                            for (var n = t.length, e = new Array(n); --n >= 0;) e[n] = n;
                            return e
                        },
                        qw = function() {
                            function t(t) {
                                var o, u, a = n.apply(this, arguments),
                                    s = t.length,
                                    c = a.length,
                                    f = new Array(c);
                                for (o = 0; c > o; ++o) {
                                    for (var l, h = a[o], p = f[o] = new Array(s), d = 0; s > d; ++d) p[d] = l = [0, +i(t[d], h, d, t)], l.data = t[d];
                                    p.key = h
                                }
                                for (o = 0, u = e(f); c > o; ++o) f[u[o]].index = o;
                                return r(f, u), f
                            }
                            var n = Ab([]),
                                e = Rw,
                                r = zw,
                                i = Vs;
                            return t.keys = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Ab(Pw.call(e)), t) : n
                            }, t.value = function(n) {
                                return arguments.length ? (i = "function" == typeof n ? n : Ab(+n), t) : i
                            }, t.order = function(n) {
                                return arguments.length ? (e = null == n ? Rw : "function" == typeof n ? n : Ab(Pw.call(n)), t) : e
                            }, t.offset = function(n) {
                                return arguments.length ? (r = null == n ? zw : n, t) : r
                            }, t
                        },
                        Lw = function(t, n) {
                            if ((r = t.length) > 0) {
                                for (var e, r, i, o = 0, u = t[0].length; u > o; ++o) {
                                    for (i = e = 0; r > e; ++e) i += t[e][o][1] || 0;
                                    if (i)
                                        for (e = 0; r > e; ++e) t[e][o][1] /= i
                                }
                                zw(t, n)
                            }
                        },
                        Uw = function(t, n) {
                            if ((e = t.length) > 0) {
                                for (var e, r = 0, i = t[n[0]], o = i.length; o > r; ++r) {
                                    for (var u = 0, a = 0; e > u; ++u) a += t[u][r][1] || 0;
                                    i[r][1] += i[r][0] = -a / 2
                                }
                                zw(t, n)
                            }
                        },
                        Ow = function(t, n) {
                            if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
                                for (var e, r, i, o = 0, u = 1; r > u; ++u) {
                                    for (var a = 0, s = 0, c = 0; i > a; ++a) {
                                        for (var f = t[n[a]], l = f[u][1] || 0, h = f[u - 1][1] || 0, p = (l - h) / 2, d = 0; a > d; ++d) {
                                            var g = t[n[d]],
                                                v = g[u][1] || 0,
                                                _ = g[u - 1][1] || 0;
                                            p += v - _
                                        }
                                        s += l, c += p * l
                                    }
                                    e[u - 1][1] += e[u - 1][0] = o, s && (o -= c / s)
                                }
                                e[u - 1][1] += e[u - 1][0] = o, zw(t, n)
                            }
                        },
                        Dw = function(t) {
                            var n = t.map(Ws);
                            return Rw(t).sort(function(t, e) {
                                return n[t] - n[e]
                            })
                        },
                        jw = function(t) {
                            return Dw(t).reverse()
                        },
                        Fw = function(t) {
                            var n, e, r = t.length,
                                i = t.map(Ws),
                                o = Rw(t).sort(function(t, n) {
                                    return i[n] - i[t]
                                }),
                                u = 0,
                                a = 0,
                                s = [],
                                c = [];
                            for (n = 0; r > n; ++n) e = o[n], a > u ? (u += i[e], s.push(e)) : (a += i[e], c.push(e));
                            return c.reverse().concat(s)
                        },
                        Iw = function(t) {
                            return Rw(t).reverse()
                        },
                        Yw = function(t) {
                            return function() {
                                return t
                            }
                        };
                    Zs.prototype = {
                        constructor: Zs,
                        insert: function(t, n) {
                            var e, r, i;
                            if (t) {
                                if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
                                    for (t = t.R; t.L;) t = t.L;
                                    t.L = n
                                } else t.R = n;
                                e = t
                            } else this._ ? (t = tc(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null);
                            for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (Qs(this, e), t = e, e = t.U), e.C = !1, r.C = !0, Ks(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (Ks(this, e), t = e, e = t.U), e.C = !1, r.C = !0, Qs(this, r))), e = t.U;
                            this._.C = !1
                        },
                        remove: function(t) {
                            t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
                            var n, e, r, i = t.U,
                                o = t.L,
                                u = t.R;
                            if (e = o ? u ? tc(u) : o : u, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && u ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== u ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = u, u.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r) {
                                if (t && t.C) return void(t.C = !1);
                                do {
                                    if (t === this._) break;
                                    if (t === i.L) {
                                        if (n = i.R, n.C && (n.C = !1, i.C = !0, Qs(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
                                            n.R && n.R.C || (n.L.C = !1, n.C = !0, Ks(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, Qs(this, i), t = this._;
                                            break
                                        }
                                    } else if (n = i.L, n.C && (n.C = !1, i.C = !0, Ks(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
                                        n.L && n.L.C || (n.R.C = !1, n.C = !0, Qs(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, Ks(this, i), t = this._;
                                        break
                                    }
                                    n.C = !0, t = i, i = i.U
                                } while (!t.C);
                                t && (t.C = !1)
                            }
                        }
                    };
                    var Hw, Bw, Xw, Vw, Ww, $w = [],
                        Gw = [],
                        Zw = 1e-6,
                        Jw = 1e-12;
                    Tc.prototype = {
                        constructor: Tc,
                        polygons: function() {
                            var t = this.edges;
                            return this.cells.map(function(n) {
                                var e = n.halfedges.map(function(e) {
                                    return cc(n, t[e])
                                });
                                return e.data = n.site.data, e
                            })
                        },
                        triangles: function() {
                            var t = [],
                                n = this.edges;
                            return this.cells.forEach(function(e, r) {
                                if (o = (i = e.halfedges).length)
                                    for (var i, o, u, a = e.site, s = -1, c = n[i[o - 1]], f = c.left === a ? c.right : c.left; ++s < o;) u = f, c = n[i[s]], f = c.left === a ? c.right : c.left, u && f && r < u.index && r < f.index && Mc(a, u, f) < 0 && t.push([a.data, u.data, f.data])
                            }), t
                        },
                        links: function() {
                            return this.edges.filter(function(t) {
                                return t.right
                            }).map(function(t) {
                                return {
                                    source: t.left.data,
                                    target: t.right.data
                                }
                            })
                        },
                        find: function(t, n, e) {
                            for (var r, i, o = this, u = o._found || 0, a = o.cells.length; !(i = o.cells[u]);)
                                if (++u >= a) return null;
                            var s = t - i.site[0],
                                c = n - i.site[1],
                                f = s * s + c * c;
                            do i = o.cells[r = u], u = null, i.halfedges.forEach(function(e) {
                                var r = o.edges[e],
                                    a = r.left;
                                if (a !== i.site && a || (a = r.right)) {
                                    var s = t - a[0],
                                        c = n - a[1],
                                        l = s * s + c * c;
                                    f > l && (f = l, u = a.index)
                                }
                            }); while (null !== u);
                            return o._found = r, null == e || e * e >= f ? i.site : null
                        }
                    };
                    var Qw = function() {
                            function t(t) {
                                return new Tc(t.map(function(r, i) {
                                    var o = [Math.round(n(r, i, t) / Zw) * Zw, Math.round(e(r, i, t) / Zw) * Zw];
                                    return o.index = i, o.data = r, o
                                }), r)
                            }
                            var n = $s,
                                e = Gs,
                                r = null;
                            return t.polygons = function(n) {
                                return t(n).polygons()
                            }, t.links = function(n) {
                                return t(n).links()
                            }, t.triangles = function(n) {
                                return t(n).triangles()
                            }, t.x = function(e) {
                                return arguments.length ? (n = "function" == typeof e ? e : Yw(+e), t) : n
                            }, t.y = function(n) {
                                return arguments.length ? (e = "function" == typeof n ? n : Yw(+n), t) : e
                            }, t.extent = function(n) {
                                return arguments.length ? (r = null == n ? null : [
                                    [+n[0][0], +n[0][1]],
                                    [+n[1][0], +n[1][1]]
                                ], t) : r && [
                                    [r[0][0], r[0][1]],
                                    [r[1][0], r[1][1]]
                                ]
                            }, t.size = function(n) {
                                return arguments.length ? (r = null == n ? null : [
                                    [0, 0],
                                    [+n[0], +n[1]]
                                ], t) : r && [r[1][0] - r[0][0], r[1][1] - r[0][1]]
                            }, t
                        },
                        Kw = function(t) {
                            return function() {
                                return t
                            }
                        };
                    Nc.prototype = {
                        constructor: Nc,
                        scale: function(t) {
                            return 1 === t ? this : new Nc(this.k * t, this.x, this.y)
                        },
                        translate: function(t, n) {
                            return 0 === t & 0 === n ? this : new Nc(this.k, this.x + this.k * t, this.y + this.k * n)
                        },
                        apply: function(t) {
                            return [t[0] * this.k + this.x, t[1] * this.k + this.y]
                        },
                        applyX: function(t) {
                            return t * this.k + this.x
                        },
                        applyY: function(t) {
                            return t * this.k + this.y
                        },
                        invert: function(t) {
                            return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
                        },
                        invertX: function(t) {
                            return (t - this.x) / this.k
                        },
                        invertY: function(t) {
                            return (t - this.y) / this.k
                        },
                        rescaleX: function(t) {
                            return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
                        },
                        rescaleY: function(t) {
                            return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
                        },
                        toString: function() {
                            return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
                        }
                    };
                    var tM = new Nc(1, 0, 0);
                    Ec.prototype = Nc.prototype;
                    var nM = function() {
                            t.event.preventDefault(), t.event.stopImmediatePropagation()
                        },
                        eM = function() {
                            function n(t) {
                                t.on("wheel.zoom", c).on("mousedown.zoom", f).on("dblclick.zoom", l).on("touchstart.zoom", h).on("touchmove.zoom", p).on("touchend.zoom touchcancel.zoom", g).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").property("__zoom", zc)
                            }

                            function e(t, n) {
                                return n = Math.max(x, Math.min(b, n)), n === t.k ? t : new Nc(n, t.x, t.y)
                            }

                            function r(t, n, e) {
                                var r = n[0] - e[0] * t.k,
                                    i = n[1] - e[1] * t.k;
                                return r === t.x && i === t.y ? t : new Nc(t.k, r, i)
                            }

                            function i(t, n) {
                                var e = t.invertX(n[0][0]) - w,
                                    r = t.invertX(n[1][0]) - M,
                                    i = t.invertY(n[0][1]) - k,
                                    o = t.invertY(n[1][1]) - T;
                                return t.translate(r > e ? (e + r) / 2 : Math.min(0, e) || Math.max(0, r), o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o))
                            }

                            function o(t) {
                                return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
                            }

                            function u(t, n, e) {
                                t.on("start.zoom", function() {
                                    a(this, arguments).start()
                                }).on("interrupt.zoom end.zoom", function() {
                                    a(this, arguments).end()
                                }).tween("zoom", function() {
                                    var t = this,
                                        r = arguments,
                                        i = a(t, r),
                                        u = m.apply(t, r),
                                        s = e || o(u),
                                        c = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]),
                                        f = t.__zoom,
                                        l = "function" == typeof n ? n.apply(t, r) : n,
                                        h = N(f.invert(s).concat(c / f.k), l.invert(s).concat(c / l.k));
                                    return function(t) {
                                        if (1 === t) t = l;
                                        else {
                                            var n = h(t),
                                                e = c / n[2];
                                            t = new Nc(e, s[0] - n[0] * e, s[1] - n[1] * e)
                                        }
                                        i.zoom(null, t)
                                    }
                                })
                            }

                            function a(t, n) {
                                for (var e, r = 0, i = A.length; i > r; ++r)
                                    if ((e = A[r]).that === t) return e;
                                return new s(t, n)
                            }

                            function s(t, n) {
                                this.that = t, this.args = n, this.index = -1, this.active = 0, this.extent = m.apply(t, n)
                            }

                            function c() {
                                function n() {
                                    o.wheel = null, o.end()
                                }
                                if (y.apply(this, arguments)) {
                                    var o = a(this, arguments),
                                        u = this.__zoom,
                                        s = Math.max(x, Math.min(b, u.k * Math.pow(2, -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500))),
                                        c = If(this);
                                    if (o.wheel)(o.mouse[0][0] !== c[0] || o.mouse[0][1] !== c[1]) && (o.mouse[1] = u.invert(o.mouse[0] = c)), clearTimeout(o.wheel);
                                    else {
                                        if (u.k === s) return;
                                        o.mouse = [c, u.invert(c)], gp(this), o.start()
                                    }
                                    nM(), o.wheel = setTimeout(n, z), o.zoom("mouse", i(r(e(u, s), o.mouse[0], o.mouse[1]), o.extent))
                                }
                            }

                            function f() {
                                function n() {
                                    nM(), o.moved = !0, o.zoom("mouse", i(r(o.that.__zoom, o.mouse[0] = If(o.that), o.mouse[1]), o.extent))
                                }

                                function e() {
                                    u.on("mousemove.zoom mouseup.zoom", null), _t(t.event.view, o.moved), nM(), o.end()
                                }
                                if (!_ && y.apply(this, arguments)) {
                                    var o = a(this, arguments),
                                        u = Ml(t.event.view).on("mousemove.zoom", n, !0).on("mouseup.zoom", e, !0),
                                        s = If(this);
                                    El(t.event.view), Ac(), o.mouse = [s, this.__zoom.invert(s)], gp(this), o.start()
                                }
                            }

                            function l() {
                                if (y.apply(this, arguments)) {
                                    var o = this.__zoom,
                                        a = If(this),
                                        s = o.invert(a),
                                        c = o.k * (t.event.shiftKey ? .5 : 2),
                                        f = i(r(e(o, c), a, s), m.apply(this, arguments));
                                    nM(), S > 0 ? Ml(this).transition().duration(S).call(u, f, a) : Ml(this).call(n.transform, f)
                                }
                            }

                            function h() {
                                if (y.apply(this, arguments)) {
                                    var n, e, r, i, o = a(this, arguments),
                                        u = t.event.changedTouches,
                                        s = u.length;
                                    for (Ac(), e = 0; s > e; ++e) r = u[e], i = Tl(this, u, r.identifier), i = [i, this.__zoom.invert(i), r.identifier], o.touch0 ? o.touch1 || (o.touch1 = i) : (o.touch0 = i, n = !0);
                                    return v && (v = clearTimeout(v), !o.touch1) ? (o.end(), i = Ml(this).on("dblclick.zoom"), void(i && i.apply(this, arguments))) : void(n && (v = setTimeout(function() {
                                        v = null
                                    }, P), gp(this), o.start()))
                                }
                            }

                            function p() {
                                var n, o, u, s, c = a(this, arguments),
                                    f = t.event.changedTouches,
                                    l = f.length;
                                for (nM(), v && (v = clearTimeout(v)), n = 0; l > n; ++n) o = f[n], u = Tl(this, f, o.identifier), c.touch0 && c.touch0[2] === o.identifier ? c.touch0[0] = u : c.touch1 && c.touch1[2] === o.identifier && (c.touch1[0] = u);
                                if (o = c.that.__zoom, c.touch1) {
                                    var h = c.touch0[0],
                                        p = c.touch0[1],
                                        d = c.touch1[0],
                                        g = c.touch1[1],
                                        _ = (_ = d[0] - h[0]) * _ + (_ = d[1] - h[1]) * _,
                                        y = (y = g[0] - p[0]) * y + (y = g[1] - p[1]) * y;
                                    o = e(o, Math.sqrt(_ / y)), u = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2], s = [(p[0] + g[0]) / 2, (p[1] + g[1]) / 2]
                                } else {
                                    if (!c.touch0) return;
                                    u = c.touch0[0], s = c.touch0[1]
                                }
                                c.zoom("touch", i(r(o, u, s), c.extent))
                            }

                            function g() {
                                var n, e, r = a(this, arguments),
                                    i = t.event.changedTouches,
                                    o = i.length;
                                for (Ac(), _ && clearTimeout(_), _ = setTimeout(function() {
                                        _ = null
                                    }, P), n = 0; o > n; ++n) e = i[n], r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
                                r.touch1 && !r.touch0 && (r.touch0 = r.touch1, delete r.touch1), r.touch0 ? r.touch0[1] = this.__zoom.invert(r.touch0[0]) : r.end()
                            }
                            var v, _, y = Cc,
                                m = Pc,
                                x = 0,
                                b = 1 / 0,
                                w = -b,
                                M = b,
                                k = w,
                                T = M,
                                S = 250,
                                N = Fh,
                                A = [],
                                C = d("start", "zoom", "end"),
                                P = 500,
                                z = 150;
                            return n.transform = function(t, n) {
                                var e = t.selection ? t.selection() : t;
                                e.property("__zoom", zc), t !== e ? u(t, n) : e.interrupt().each(function() {
                                    a(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
                                })
                            }, n.scaleBy = function(t, e) {
                                n.scaleTo(t, function() {
                                    var t = this.__zoom.k,
                                        n = "function" == typeof e ? e.apply(this, arguments) : e;
                                    return t * n
                                })
                            }, n.scaleTo = function(t, u) {
                                n.transform(t, function() {
                                    var t = m.apply(this, arguments),
                                        n = this.__zoom,
                                        a = o(t),
                                        s = n.invert(a),
                                        c = "function" == typeof u ? u.apply(this, arguments) : u;
                                    return i(r(e(n, c), a, s), t)
                                })
                            }, n.translateBy = function(t, e, r) {
                                n.transform(t, function() {
                                    return i(this.__zoom.translate("function" == typeof e ? e.apply(this, arguments) : e, "function" == typeof r ? r.apply(this, arguments) : r), m.apply(this, arguments))
                                })
                            }, s.prototype = {
                                start: function() {
                                    return 1 === ++this.active && (this.index = A.push(this) - 1, this.emit("start")), this
                                },
                                zoom: function(t, n) {
                                    return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this
                                },
                                end: function() {
                                    return 0 === --this.active && (A.splice(this.index, 1), this.index = -1, this.emit("end")), this
                                },
                                emit: function(t) {
                                    E(new Sc(n, t, this.that.__zoom), C.apply, C, [t, this.that, this.args])
                                }
                            }, n.filter = function(t) {
                                return arguments.length ? (y = "function" == typeof t ? t : Kw(!!t), n) : y
                            }, n.extent = function(t) {
                                return arguments.length ? (m = "function" == typeof t ? t : Kw([
                                    [+t[0][0], +t[0][1]],
                                    [+t[1][0], +t[1][1]]
                                ]), n) : m
                            }, n.scaleExtent = function(t) {
                                return arguments.length ? (x = +t[0], b = +t[1], n) : [x, b]
                            }, n.translateExtent = function(t) {
                                return arguments.length ? (w = +t[0][0], M = +t[1][0], k = +t[0][1], T = +t[1][1], n) : [
                                    [w, k],
                                    [M, T]
                                ]
                            }, n.duration = function(t) {
                                return arguments.length ? (S = +t, n) : S
                            }, n.interpolate = function(t) {
                                return arguments.length ? (N = t, n) : N
                            }, n.on = function() {
                                var t = C.on.apply(C, arguments);
                                return t === C ? n : t
                            }, n
                        };
                    t.version = Rc, t.bisect = Oc, t.bisectRight = Oc, t.bisectLeft = Dc, t.ascending = qc, t.bisector = Lc, t.cross = Fc, t.descending = Ic, t.deviation = Bc, t.extent = Xc, t.histogram = rf, t.thresholdFreedmanDiaconis = uf, t.thresholdScott = af, t.thresholdSturges = ef, t.max = sf, t.mean = cf, t.median = ff, t.merge = lf, t.min = hf, t.pairs = jc, t.permute = pf, t.quantile = of , t.range = Jc, t.scan = df, t.shuffle = gf, t.sum = vf, t.ticks = nf, t.tickStep = r, t.transpose = _f, t.variance = Hc, t.zip = yf, t.axisTop = f, t.axisRight = l, t.axisBottom = h, t.axisLeft = p, t.brush = Ad, t.brushX = Ae, t.brushY = Ce, t.brushSelection = Ee, t.chord = Ud, t.ribbon = Hd, t.nest = Xd, t.set = We, t.map = Ie, t.keys = Wd, t.values = $d, t.entries = Gd, t.color = kt, t.rgb = Et, t.hsl = zt, t.lab = Ut, t.hcl = Ht, t.cubehelix = Vt, t.dispatch = d, t.drag = Cl, t.dragDisable = El, t.dragEnable = _t, t.dsvFormat = Zd, t.csvParse = Qd, t.csvParseRows = Kd, t.csvFormat = tg, t.csvFormatRows = ng, t.tsvParse = rg, t.tsvParseRows = ig, t.tsvFormat = og, t.tsvFormatRows = ug, t.easeLinear = ee, t.easeQuad = oe, t.easeQuadIn = re, t.easeQuadOut = ie, t.easeQuadInOut = oe, t.easeCubic = se, t.easeCubicIn = ue, t.easeCubicOut = ae, t.easeCubicInOut = se, t.easePoly = Ip, t.easePolyIn = jp, t.easePolyOut = Fp, t.easePolyInOut = Ip, t.easeSin = le, t.easeSinIn = ce, t.easeSinOut = fe, t.easeSinInOut = le, t.easeExp = de, t.easeExpIn = he, t.easeExpOut = pe, t.easeExpInOut = de, t.easeCircle = _e, t.easeCircleIn = ge, t.easeCircleOut = ve, t.easeCircleInOut = _e, t.easeBounce = me, t.easeBounceIn = ye, t.easeBounceOut = me, t.easeBounceInOut = xe, t.easeBack = rd, t.easeBackIn = nd, t.easeBackOut = ed, t.easeBackInOut = rd, t.easeElastic = sd, t.easeElasticIn = ad, t.easeElasticOut = sd, t.easeElasticInOut = cd, t.forceCenter = ag, t.forceCollide = Tg, t.forceLink = Sg, t.forceManyBody = Cg, t.forceSimulation = Ag, t.forceX = Pg, t.forceY = zg, t.formatDefaultLocale = pr, t.formatLocale = Xg, t.formatSpecifier = lr, t.precisionFixed = Vg, t.precisionPrefix = Wg, t.precisionRound = $g, t.geoArea = t_, t.geoBounds = r_, t.geoCentroid = o_, t.geoCircle = x_, t.geoClipExtent = N_, t.geoContains = D_, t.geoDistance = L_, t.geoGraticule = wi, t.geoGraticule10 = Mi, t.geoInterpolate = j_, t.geoLength = z_, t.geoPath = hy, t.geoAlbers = wy, t.geoAlbersUsa = My, t.geoAzimuthalEqualArea = Ty, t.geoAzimuthalEqualAreaRaw = ky, t.geoAzimuthalEquidistant = Ny, t.geoAzimuthalEquidistantRaw = Sy, t.geoConicConformal = Ay, t.geoConicConformalRaw = lo, t.geoConicEqualArea = by, t.geoConicEqualAreaRaw = io, t.geoConicEquidistant = Py, t.geoConicEquidistantRaw = po, t.geoEquirectangular = Cy, t.geoEquirectangularRaw = ho, t.geoGnomonic = zy, t.geoGnomonicRaw = go, t.geoIdentity = Ry, t.geoProjection = to, t.geoProjectionMutator = no, t.geoMercator = Ey, t.geoMercatorRaw = so, t.geoOrthographic = qy, t.geoOrthographicRaw = _o, t.geoStereographic = Ly, t.geoStereographicRaw = yo, t.geoTransverseMercator = Uy, t.geoTransverseMercatorRaw = mo, t.geoRotation = m_, t.geoStream = Zv, t.geoTransform = vy, t.cluster = Oy, t.hierarchy = Ao, t.pack = Ky, t.packSiblings = Jy, t.packEnclose = Zy, t.partition = em, t.stratify = um, t.tree = am, t.treemap = lm, t.treemapBinary = hm, t.treemapDice = nm, t.treemapSlice = sm, t.treemapSliceDice = pm, t.treemapSquarify = fm, t.treemapResquarify = dm, t.interpolate = Ah, t.interpolateArray = wh, t.interpolateBasis = vh, t.interpolateBasisClosed = _h, t.interpolateDate = Mh, t.interpolateNumber = kh, t.interpolateObject = Th, t.interpolateRound = Ch, t.interpolateString = Eh, t.interpolateTransformCss = qh, t.interpolateTransformSvg = Lh, t.interpolateZoom = Fh, t.interpolateRgb = mh, t.interpolateRgbBasis = xh, t.interpolateRgbBasisClosed = bh, t.interpolateHsl = Ih, t.interpolateHslLong = Yh, t.interpolateLab = ln, t.interpolateHcl = Hh, t.interpolateHclLong = Bh, t.interpolateCubehelix = Xh, t.interpolateCubehelixLong = Vh, t.quantize = Wh, t.path = qe, t.polygonArea = gm, t.polygonCentroid = vm, t.polygonHull = ym, t.polygonContains = mm, t.polygonLength = xm, t.quadtree = er, t.queue = yu, t.randomUniform = Mm, t.randomNormal = km, t.randomLogNormal = Tm, t.randomBates = Nm, t.randomIrwinHall = Sm, t.randomExponential = Em, t.request = Am, t.html = Pm, t.json = zm, t.text = Rm, t.xml = qm, t.csv = Um, t.tsv = Om, t.scaleBand = Mu, t.scalePoint = Tu, t.scaleIdentity = Lu, t.scaleLinear = qu, t.scaleLog = Yu, t.scaleOrdinal = wu, t.scaleImplicit = Im, t.scalePow = Bu, t.scaleSqrt = Xu, t.scaleQuantile = Vu, t.scaleQuantize = Wu, t.scaleThreshold = $u, t.scaleTime = pb, t.scaleUtc = db, t.schemeCategory10 = vb, t.schemeCategory20b = _b, t.schemeCategory20c = yb, t.schemeCategory20 = mb, t.interpolateCubehelixDefault = xb, t.interpolateRainbow = kb, t.interpolateWarm = bb, t.interpolateCool = wb, t.interpolateViridis = Tb, t.interpolateMagma = Sb, t.interpolateInferno = Nb, t.interpolatePlasma = Eb, t.scaleSequential = es, t.creator = Cf, t.local = b, t.matcher = Lf, t.mouse = If, t.namespace = Af, t.namespaces = Ef, t.select = Ml, t.selectAll = kl, t.selection = gt, t.selector = Yf, t.selectorAll = Bf, t.touch = Tl, t.touches = Sl, t.window = cl, t.customEvent = E, t.arc = Ib, t.area = Bb, t.line = Hb, t.pie = Wb, t.radialArea = Zb, t.radialLine = Gb, t.symbol = vw, t.symbols = gw, t.symbolCircle = Jb, t.symbolCross = Qb, t.symbolDiamond = nw, t.symbolSquare = aw, t.symbolStar = uw, t.symbolTriangle = cw, t.symbolWye = dw, t.curveBasisClosed = mw, t.curveBasisOpen = xw, t.curveBasis = yw, t.curveBundle = bw, t.curveCardinalClosed = Mw, t.curveCardinalOpen = kw, t.curveCardinal = ww, t.curveCatmullRomClosed = Sw, t.curveCatmullRomOpen = Nw, t.curveCatmullRom = Tw, t.curveLinearClosed = Ew, t.curveLinear = Yb, t.curveMonotoneX = js, t.curveMonotoneY = Fs, t.curveNatural = Aw, t.curveStep = Cw, t.curveStepAfter = Xs, t.curveStepBefore = Bs, t.stack = qw, t.stackOffsetExpand = Lw, t.stackOffsetNone = zw, t.stackOffsetSilhouette = Uw, t.stackOffsetWiggle = Ow, t.stackOrderAscending = Dw, t.stackOrderDescending = jw, t.stackOrderInsideOut = Fw, t.stackOrderNone = Rw, t.stackOrderReverse = Iw, t.timeInterval = Gu, t.timeMillisecond = Gm, t.timeMilliseconds = Zm, t.utcMillisecond = Gm, t.utcMilliseconds = Zm, t.timeSecond = ex, t.timeSeconds = rx, t.utcSecond = ex, t.utcSeconds = rx, t.timeMinute = ix, t.timeMinutes = ox, t.timeHour = ux, t.timeHours = ax, t.timeDay = sx, t.timeDays = cx, t.timeWeek = fx, t.timeWeeks = _x, t.timeSunday = fx, t.timeSundays = _x, t.timeMonday = lx, t.timeMondays = yx, t.timeTuesday = hx, t.timeTuesdays = mx, t.timeWednesday = px, t.timeWednesdays = xx, t.timeThursday = dx, t.timeThursdays = bx, t.timeFriday = gx, t.timeFridays = wx, t.timeSaturday = vx,
                        t.timeSaturdays = Mx, t.timeMonth = kx, t.timeMonths = Tx, t.timeYear = Sx, t.timeYears = Nx, t.utcMinute = Ex, t.utcMinutes = Ax, t.utcHour = Cx, t.utcHours = Px, t.utcDay = zx, t.utcDays = Rx, t.utcWeek = qx, t.utcWeeks = Ix, t.utcSunday = qx, t.utcSundays = Ix, t.utcMonday = Lx, t.utcMondays = Yx, t.utcTuesday = Ux, t.utcTuesdays = Hx, t.utcWednesday = Ox, t.utcWednesdays = Bx, t.utcThursday = Dx, t.utcThursdays = Xx, t.utcFriday = jx, t.utcFridays = Vx, t.utcSaturday = Fx, t.utcSaturdays = Wx, t.utcMonth = $x, t.utcMonths = Gx, t.utcYear = Zx, t.utcYears = Qx, t.timeFormatDefaultLocale = Ga, t.timeFormatLocale = na, t.isoFormat = ib, t.isoParse = ob, t.now = dn, t.timer = _n, t.timerFlush = yn, t.timeout = rp, t.interval = ip, t.transition = te, t.active = pd, t.interrupt = gp, t.voronoi = Qw, t.zoom = eM, t.zoomTransform = Ec, t.zoomIdentity = tM, Object.defineProperty(t, "__esModule", {
                            value: !0
                        })
                })
            }()
    }), require.register("web/static/js/app.js", function(t, n, e) {
        "use strict";

        function r(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        var i = n("./domReady"),
            o = r(i),
            u = n("./routing");
        window.routingSchemaService = {
            domReady: o["default"],
            initView: u.initView,
            buildRoutingAt: u.buildRoutingAt,
            centerClientView: u.centerClientView
        }
    }), require.register("web/static/js/d3/forceGrid.js", function(t, n, e) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function(t, n, e) {
            var r = [],
                i = function(t) {};
            return i.initialize = function(t) {
                r = t
            }, i
        }
    }), require.register("web/static/js/d3/forceUserPosition.js", function(t, n, e) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function(t, n, e) {
            var r = [],
                i = function(i) {
                    for (var o = 0, u = r.length; u > o; ++o) r[o].uuid && r[o].uuid == t && (r[o].fx = n, r[o].fy = e)
                };
            return i.initialize = function(t) {
                r = t
            }, i
        }
    }), require.register("web/static/js/decodeHtml.js", function(t, n, e) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = document.createElement("textarea");
        t["default"] = function(t) {
            r.innerHTML = t;
            var n = r.value;
            return r.innerHTML = "", n
        }
    }), require.register("web/static/js/domReady.js", function(t, n, e) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = function(t) {
            "loading" != document.readyState ? t() : document.addEventListener ? document.addEventListener("DOMContentLoaded", t) : document.attachEvent("onreadystatechange", function() {
                "loading" != document.readyState && t()
            })
        }
    }), require.alias("d3/build/d3.js", "d3"), require.alias("d3-collection/build/d3-collection.js", "d3-collection"), require.register("___globals___", function(t, n, e) {
        window.d3 = n("d3")
    })
}(), require("___globals___"), require("web/static/js/app");