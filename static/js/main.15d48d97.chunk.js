(this.webpackJsonpdots_game=this.webpackJsonpdots_game||[]).push([[0],{65:function(e,t,a){e.exports=a(94)},70:function(e,t,a){},88:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a(0),i=a.n(r),l=a(7),c=a.n(l),s=(a(70),a(10)),u={SET_WINNERS:"SET_WINNERS",SET_SETTINGS:"SET_SETTINGS",SET_USERNAME:"SER_USERNAME",SET_DELAY:"SET_DELAY",SET_FIELD_SIZE:"SET_FIELD_SIZE",SET_FIELD_ARRAY:"SET_FIELD_ARRAY",START_GAME:"START_GAME",FINISH_GAME:"FINISH_GAME",SET_GAME_PERMISSION:"SET_GAME_PERMISSION",CLICK_SQUARE:"CLICK_SQUARE"},o=i.a.createContext({settings:null,field:[],delay:null,size:null,isGameStart:!1,isGameFinish:!1,winners:null,winner:""});var E=function(e,t){switch(t.type){case u.SET_SETTINGS:return Object(s.a)(Object(s.a)({},e),{},{settings:t.payload});case u.SET_GAME_DELAY:return Object(s.a)(Object(s.a)({},e),{},{delay:t.payload});case u.SET_FIELD_SIZE:return Object(s.a)(Object(s.a)({},e),{},{size:t.payload});case u.SET_WINNERS:return Object(s.a)(Object(s.a)({},e),{},{winners:t.payload});case u.SET_FIELD_ARRAY:return Object(s.a)(Object(s.a)({},e),{},{field:t.payload});case u.START_GAME:return Object(s.a)(Object(s.a)({},e),{},{isGameStart:!0});case u.FINISH_GAME:return Object(s.a)(Object(s.a)({},e),{},{isGameFinish:!0,isGameStart:!1,isGamePermission:!1,winner:t.payload});case u.SET_GAME_PERMISSION:return Object(s.a)(Object(s.a)({},e),{},{isGamePermission:!0,isGameFinish:!1,winner:""});case u.CLICK_SQUARE:return e.field[t.payload].isBlueSquare?Object(s.a)(Object(s.a)({},e),{},{field:e.field.map((function(e,a){return a===t.payload?Object(s.a)(Object(s.a)({},e),{},{isBlueSquare:!1,isGreenSquare:!0,disabled:!0}):e}))}):e;default:throw new Error}},d=a(129),m=a(134),f=a(125),S=a(32),b=a.n(S),p=b.a.create({baseURL:"https://starnavi-frontend-test-task.herokuapp.com/"});a(88);var _=a(54),g=a.n(_),y=function(e){var t=e.isGreenSquare,a=e.isRedSquare,n=e.isBlueSquare,r=e.onClick,l=e.size,c=g()({btn:!0,"btn-blue":n,"btn-red":a,"btn-green":t,"btn-small":5===l,"btn-medium":10===l,"btn-large":15===l});return i.a.createElement("button",{onClick:r,className:c})};var I=function(){var e=Object(r.useContext)(o),t=e.state,a=e.dispatch,n=t.size,l=t.field,c=Object(r.useCallback)((function(e){a({type:u.CLICK_SQUARE,payload:e})}),[a]),s=l.map((function(e,t){return(t+1)%n===0?i.a.createElement(i.a.Fragment,{key:e.id},i.a.createElement(y,Object.assign({key:e.id},e,{size:n,onClick:function(){return c(t)}})),i.a.createElement("p",null)):i.a.createElement(y,Object.assign({size:n,key:e.id},e,{onClick:function(){return c(t)}}))}));return i.a.createElement(f.a,{item:!0},i.a.createElement("div",null,s))};a(92);var O=function(e){var t=e.winner;return i.a.createElement("div",{className:"leaders_item"},i.a.createElement("div",{className:"leaders_item-row"},i.a.createElement("p",null," ",t.winner),i.a.createElement("p",null,t.date)))},v=function(e){var t=e.winners;return i.a.createElement("div",{className:"leaders"},i.a.createElement("h1",{className:"leaders_title"},"Leader Board"),t&&t.map((function(e,t){return i.a.createElement(O,{key:e.id,winner:e})})))},A=a(17),j=a(130),T=a(136),h=a(135),R=a(132),G=a(138),N=a(139),M=a(133),w=a(39),C=a.n(w);var k=Object(d.a)((function(e){return{formControl:{width:"100%"},input:{padding:"23px 12px 6px",minWidth:"145px",textAlign:"left"},label:{transform:"translate(12px, 18px) scale(1)"},button:{padding:"12px 50px",color:"#fff",backgroundColor:C.a[800],"&:hover":{backgroundColor:C.a[900]}},buttonDisabled:{backgroundColor:"#7B8D93 !important",color:"#fff !important"}}})),D=function(e){for(var t=[],a=0;a<e*e;a++){var n={id:a,isGreenSquare:!1,isRedSquare:!1,isBlueSquare:!1,isAvailable:!0,isDisabled:!1};t.push(n)}return t};var x=function(){var e=k(),t=Object(r.useContext)(o),a=t.state,l=t.dispatch,c=Object(r.useState)(""),s=Object(n.a)(c,2),E=s[0],d=s[1],m=Object(r.useState)(""),S=Object(n.a)(m,2),b=S[0],_=S[1],g=a.settings,y=a.isGameStart,I=a.size,O=a.field,v=a.delay,w=a.isGameFinish,C=a.winner;return Object(r.useEffect)((function(){E&&(l({type:u.SET_FIELD_SIZE,payload:g[E].field}),l({type:u.SET_GAME_DELAY,payload:g[E].delay}),l({type:u.SET_GAME_PERMISSION}))}),[E,l,g]),Object(r.useEffect)((function(){if(I){var e=D(I);l({type:u.SET_FIELD_ARRAY,payload:e})}}),[I,l]),Object(r.useEffect)((function(){if(y&&w){var e=D(I);l({type:u.SET_FIELD_ARRAY,payload:e}),l({type:u.SET_GAME_PERMISSION,payload:""})}}),[y,I,w,l]),Object(r.useEffect)((function(){var e;if(y&&!w){e=setInterval((function e(){var t=Object(A.a)(O),a=t.filter((function(e){return e.isBlueSquare})),n=t.filter((function(e){return e.isGreenSquare})),r=t.filter((function(e){return e.isRedSquare})),i=t.filter((function(e){return e.isAvailable}));if(a.length){var c=a[0];t[c.id].isBlueSquare=!1,t[c.id].isRedSquare=!0,t[c.id].isDisabled=!0}if(n.length===Math.round(I*I/2))clearInterval(e),l({type:u.FINISH_GAME,payload:b});else if(r.length===Math.round(I*I/2))clearInterval(e),l({type:u.FINISH_GAME,payload:"Computer"});else{if(i.length){var s=i[Math.floor(Math.random()*i.length)];t[s.id].isBlueSquare=!0,t[s.id].isRedSquare=!1,t[s.id].isAvailable=!1}l({type:u.SET_FIELD_ARRAY,payload:t})}}),v)}return function(){clearTimeout(e)}}),[y,w,I,l,b,v,O]),Object(r.useEffect)((function(){if(w){var e=function(){var e=new Date,t=e.toLocaleDateString("en-US",{month:"long",year:"numeric"});return"".concat(e.getHours(),":").concat(e.getMinutes(),"; ").concat(("0"+e.getDate()).slice(-2)," ").concat(t)}();(function(e,t){return p.post("/winners",{winner:e,date:t})})(C,e).then((function(e){return l({type:u.SET_WINNERS,payload:e.data})}))}}),[w,l,C]),i.a.createElement(i.a.Fragment,null,i.a.createElement(f.a,{item:!0,lg:4},i.a.createElement(j.a,{variant:"filled",className:e.formControl},i.a.createElement(T.a,{classes:{root:e.label},id:"select-mode-label"},"Pick game mode"),i.a.createElement(h.a,{input:i.a.createElement(R.a,{classes:{input:e.input}}),labelId:"select-mode-label",id:"select-mode",value:E,label:"Pick game mode",disabled:y,onChange:function(e){return d(e.target.value)}},a.settings&&Object.keys(a.settings).map((function(e,t){return i.a.createElement(G.a,{key:e,value:e},e)}))))),i.a.createElement(f.a,{item:!0,lg:4},i.a.createElement(j.a,{className:e.formControl},i.a.createElement(N.a,{size:"small",label:"Enter your name",variant:"filled",onChange:function(e){return _(e.target.value)},disabled:y,value:b}))),i.a.createElement(f.a,{item:!0,container:!0,lg:4},i.a.createElement(M.a,{onClick:function(){return l({type:u.START_GAME})},classes:{root:e.button,disabled:e.buttonDisabled,contained:e.buttonDisabled},color:"primary",className:e.button,disabled:!E||!b||y},w?"Play again":"Play")),i.a.createElement(f.a,{item:!0,xs:12},C&&i.a.createElement("h3",{style:{textAlign:"center"}}," ",C," win! ")))},F=(a(93),new Array(10).fill("element"));function L(){return i.a.createElement("div",{class:"loader"},F&&F.map((function(e,t){return i.a.createElement("span",{key:t,className:"loader-block"})})))}var q=Object(d.a)((function(e){return{mainGrid:{padding:e.spacing(6),border:"2px solid #E7E7E9",minHeight:"100vh",paddingTop:"10%"}}}));var P=function(){var e=q(),t=Object(r.useState)(!1),a=Object(n.a)(t,2),l=a[0],c=a[1],s=Object(r.useState)(!1),E=Object(n.a)(s,2),d=E[0],S=E[1],_=Object(r.useContext)(o),g=_.state,y=_.dispatch,O=g.winners;Object(r.useEffect)((function(){S(!1),c(!0),b.a.all([p.get("/game-settings"),p.get("/winners")]).then(b.a.spread((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];var n=t[0],r=t[1];y({type:u.SET_SETTINGS,payload:n.data}),y({type:u.SET_WINNERS,payload:r.data})}))).catch((function(e){S(!0)})).finally((function(){return c(!1)}))}),[y]);var A=Object(r.useMemo)((function(){return i.a.createElement(v,{winners:O})}),[O]);return i.a.createElement(m.a,{maxWidth:"xl"},i.a.createElement("main",null,d?"Something go wrong":null,l?i.a.createElement(L,null):i.a.createElement(f.a,{className:e.mainGrid,container:!0,direction:"row",alignItems:"flex-start",spacing:2},i.a.createElement(f.a,{container:!0,item:!0,spacing:2,alignItems:"flex-start",sm:6},i.a.createElement(x,null),i.a.createElement(I,null)),i.a.createElement(f.a,{container:!0,alignItems:"center",item:!0,sm:6},A))))},B=function(){var e=Object(r.useContext)(o),t=Object(r.useReducer)(E,e),a=Object(n.a)(t,2),l=a[0],c=a[1];return i.a.createElement(o.Provider,{value:{state:l,dispatch:c}},i.a.createElement(P,null))};c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(B,null)),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.15d48d97.chunk.js.map