(this["webpackJsonpbase-app"]=this["webpackJsonpbase-app"]||[]).push([[0],{57:function(e,t,a){},58:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var c=a(3),n=a(1),r=a.n(n),s=a(28),i=a.n(s),o=a(11),l=a(23),u=(a(57),a(31)),j=a(45),d=a(43),b=a.n(d),h=(a(58),a.p+"static/media/iconClose.42061dc9.svg"),O=a.p+"static/media/iconCloseRound.33fd2b69.svg",p=a.p+"static/media/iconCloudyDay.1decc728.svg",m=a(9),_=a(25),x=Object(_.a)([function(e){return e.ui.weather}],(function(e){return Object(m.a)({},e)})),f=Object(_.a)([function(e){return e.ui.cities}],(function(e){return e})),v=Object(_.a)([function(e){return e.ui.city}],(function(e){return e})),w=Object(_.a)([function(e){return e.ui.openSearch}],(function(e){return e})),N=a(77),g="SET_OPEN_SEARCH",y="LOAD_WEATHER",S="LOAD_WEATHER_SUCCESS",C="LOAD_CITIES",k="LOAD_CITIES_SUCCESS",E=Object(N.a)(g,(function(e){return e})),A=Object(N.a)(y,(function(e){return e})),D=Object(N.a)(S,(function(e){return e})),T=Object(N.a)(C,(function(e){return e})),I=Object(N.a)(k,(function(e){return e}));function R(){var e=r.a.useState(""),t=Object(j.a)(e,2),a=t[0],n=t[1],s=Object(o.d)(),i=Object(o.e)(x),l=Object(o.e)(f),u=Object(o.e)(v),d=Object(o.e)(w),m=function(){return s(E(!d))};return Object(c.jsxs)("div",{className:"app",children:[Object(c.jsx)("header",{className:"app__header",children:Object(c.jsx)("button",{className:"app__btn-menu app__btn-menu--dotted",onClick:m,children:Object(c.jsx)("span",{className:"sr-only",children:"Open menu"})})}),Object(c.jsx)("main",{className:"app__main",children:Object(c.jsxs)("section",{className:"weather",children:[Object(c.jsx)("img",{className:"weather__icon",src:p,alt:""}),Object(c.jsx)("strong",{className:"weather__title",children:"Cloudy"}),u&&Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("span",{className:"weather__location",children:u}),Object(c.jsx)("div",{className:"weather__info",children:Object(c.jsxs)("div",{className:"weather-info",children:[i.temp&&Object(c.jsxs)("div",{className:"weather-info__item",children:[Object(c.jsxs)("strong",{className:"weather-info__title",children:[i.temp,"\xb0"]}),Object(c.jsx)("span",{className:"weather-info__desc",children:"Feels like"})]}),i.wind&&Object(c.jsxs)("div",{className:"weather-info__item",children:[Object(c.jsxs)("strong",{className:"weather-info__title",children:[i.wind," km/h"]}),Object(c.jsx)("span",{className:"weather-info__desc",children:"Wind speed"})]})]})})]})]})}),Object(c.jsx)("aside",{className:b()({app__aside:!0,"app__aside--show":d}),children:Object(c.jsxs)("section",{className:"weather-search",children:[Object(c.jsxs)("header",{className:"weather-search__header",children:[Object(c.jsx)("strong",{className:"weather-search__title",children:"Choose city"}),Object(c.jsx)("button",{className:"app__btn-menu weather-search__btn-close",onClick:m,children:Object(c.jsx)("img",{width:18,height:18,src:h,alt:"close"})})]}),Object(c.jsxs)("div",{className:"weather-search-input",children:[Object(c.jsx)("input",{onChange:function(e){e.target.value!==a&&n(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&s(T(a))},value:a,className:"weather-search-input__field",placeholder:"Search"}),Object(c.jsx)("button",{onClick:function(){return n("")},className:"app__btn-menu weather-search-input__btn-clear",children:Object(c.jsx)("img",{width:14,height:14,src:O,alt:"close"})})]}),Object(c.jsx)("ul",{className:"weather-search-suggestion",children:l.map((function(e){return Object(c.jsx)("li",{onClick:function(){var t;t=null===e||void 0===e?void 0:e.name,s(A(t)),n("")},className:"weather-search-suggestion__item",children:null===e||void 0===e?void 0:e.name},null===e||void 0===e?void 0:e.id)}))})]})})]})}function W(){return Object(c.jsx)(u.c,{children:Object(c.jsx)(u.a,{path:"/",children:Object(c.jsx)(R,{})})})}var L,H=a(16),F=a(41),J=a(44),K=a(46),M=a(15),P=Object(M.a)(),U=a(18),B=a(76),q=(L={},Object(U.a)(L,y,(function(e,t){var a=t.payload;return Object(m.a)(Object(m.a)({},e),{},{city:a,weather:{temp:null,wind:null}})})),Object(U.a)(L,S,(function(e,t){var a=t.payload;return Object(m.a)(Object(m.a)({},e),{},{weather:Object(m.a)({},a)})})),Object(U.a)(L,k,(function(e,t){var a=t.payload;return Object(m.a)(Object(m.a)({},e),{},{cities:a})})),Object(U.a)(L,g,(function(e,t){var a=t.payload;return Object(m.a)(Object(m.a)({},e),{},{openSearch:a})})),L),z=Object(B.a)(q,{cities:[],weather:{temp:null,wind:null},city:null,openSearch:!1}),G=Object(H.combineReducers)({ui:z,router:Object(l.b)(P)}),Q=a(14),V=a.n(Q),X=a(10),Y=a(37),Z=a.n(Y),$="botx",ee="current_weather",te="cities_autocomplete",ae=V.a.mark(re),ce=V.a.mark(se),ne=V.a.mark(ie);function re(e){var t,a,c,n,r,s,i;return V.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return t=e.payload,o.prev=1,o.next=4,Z.a.send({type:ee,handler:$,payload:t});case 4:return s=o.sent,i={temp:(null===s||void 0===s||null===(a=s.payload)||void 0===a||null===(c=a.weather)||void 0===c?void 0:c.tempC)||null,wind:(null===s||void 0===s||null===(n=s.payload)||void 0===n||null===(r=n.weather)||void 0===r?void 0:r.windKph)||null},o.next=8,Object(X.c)(D(i));case 8:return o.next=10,Object(X.c)(I([]));case 10:return o.next=12,Object(X.c)(E(!1));case 12:o.next=17;break;case 14:o.prev=14,o.t0=o.catch(1),console.error("loadWeatherSaga error: ".concat(o.t0.message));case 17:case"end":return o.stop()}}),ae,null,[[1,14]])}function se(e){var t,a;return V.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.payload,c.prev=1,c.next=4,Z.a.send({type:te,handler:$,payload:t});case 4:return a=c.sent,c.next=7,Object(X.c)(I(a.payload.cities));case 7:c.next=12;break;case 9:c.prev=9,c.t0=c.catch(1),console.error("loadCitiesSaga error: ".concat(c.t0.message));case 12:case"end":return c.stop()}}),ce,null,[[1,9]])}function ie(){return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(X.a)([Object(X.d)(y,re)]);case 2:return e.next=4,Object(X.a)([Object(X.d)(C,se)]);case 4:case"end":return e.stop()}}),ne)}var oe=V.a.mark(le);function le(){return V.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(X.a)([Object(X.b)(ie)]);case 2:case"end":return e.stop()}}),oe)}var ue=le;var je=function(e){var t=Object(K.a)(),a=Object(F.a)(P),c=Object(H.createStore)(G,e,Object(J.composeWithDevTools)(Object(H.applyMiddleware)(t,a)));return t.run(ue).toPromise().catch((function(e){return console.error("Saga error",e)})),c}();i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(o.a,{store:je,children:Object(c.jsx)(l.a,{history:P,children:Object(c.jsx)(W,{})})})}),document.getElementById("root"))}},[[74,1,2]]]);
//# sourceMappingURL=main.fec630a1.chunk.js.map