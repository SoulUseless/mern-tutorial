(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],Array(19).concat([function(e,t,a){e.exports=a(44)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(6),r=a.n(c),i=(a(24),a(4)),o=a(1),m=(a(25),a(26),function(e){return l.a.createElement("div",{className:"avatar ".concat(e.className),style:e.style},l.a.createElement("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}}))}),s=(a(27),function(e){return l.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)});a(28);var u=function(e){return l.a.createElement("li",{className:"user-item"},l.a.createElement(s,{className:"user-item__content"},l.a.createElement(i.b,{to:"/".concat(e.id,"/places")},l.a.createElement("div",{className:"user-item__image"},l.a.createElement(m,{image:e.image,alt:e.name})),l.a.createElement("div",{className:"user-item__info"},l.a.createElement("h2",null," ",e.name," "),l.a.createElement("h3",null,e.placeCount," ",1===e.placeCount?"Place":"Places")))))};var d=function(e){return 0===e.items.length?l.a.createElement("div",{className:"center"},l.a.createElement(s,null,l.a.createElement("h2",null," No Users Found "))):l.a.createElement("ul",{className:"users-list"},e.items.map((function(e){return l.a.createElement(u,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places})})))};var E=function(){return l.a.createElement(d,{items:[{id:"u1",name:"john",image:"https://drinkstraightup.files.wordpress.com/2013/05/a-gentlemans-friend-2-feature-e1368290909533.jpg?w=297&h=196",places:123}]})};var f=function(e){return l.a.createElement("h2",null,"Place placeholder")},h=a(10);a(34);var p=function(e){return l.a.createElement("header",{className:"main-header"},e.children)};a(35);var v=function(e){return l.a.createElement("ul",{className:"nav-links"},l.a.createElement("li",null,l.a.createElement(i.c,{to:"/",exact:!0}," All Users ")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/u1/places"}," My Places ")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/places/new"}," Add Places ")),l.a.createElement("li",null,l.a.createElement(i.c,{to:"/auth"}," Authenticate ")))},g=(a(36),a(45));a(37);var b=function(e){var t=l.a.createElement(g.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children));return r.a.createPortal(t,document.getElementById("drawer-hook"))},N=(a(38),function(e){return r.a.createPortal(l.a.createElement("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))});var _=function(e){var t=Object(n.useState)(!1),a=Object(h.a)(t,2),c=a[0],r=a[1];function o(){r(!1)}return l.a.createElement(l.a.Fragment,null,c?l.a.createElement(N,{onClick:o}):null,l.a.createElement(b,{show:c,onClick:o},l.a.createElement("nav",{className:"main-navigation__drawer-nav"},l.a.createElement(v,null))),l.a.createElement(p,null,l.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(){r(!0)}},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)),l.a.createElement("h1",{className:"main-navigation__title"},l.a.createElement(i.b,{to:"/"},"Your Places")),l.a.createElement("nav",{className:"main-navigation__header-nav"},l.a.createElement(v,null))))};a(39);function k(e){var t=l.a.createElement("div",{className:"modal ".concat(e.className),style:e.style},l.a.createElement("header",{className:"modal__header ".concat(e.headerClass)},l.a.createElement("h2",null," ",e.header," ")),l.a.createElement("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()}},l.a.createElement("div",{className:"modal__content ".concat(e.contentClass)},e.children),l.a.createElement("footer",{className:"modal__footer ".concat(e.footerClass)},e.footer)));return r.a.createPortal(t,document.getElementById("modal-hook"))}var C=function(e){return l.a.createElement(l.a.Fragment,null,e.show&&l.a.createElement(N,{onClick:e.onCancel}),l.a.createElement(g.a,{in:e.show,mountonEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal"},l.a.createElement(k,e)))},w=(a(40),function(e){return e.href?l.a.createElement("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href},e.children):e.to?l.a.createElement(i.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger")},e.children):l.a.createElement("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled},e.children)});a(41);var y=function(e){var t=Object(n.useState)(!1),a=Object(h.a)(t,2),c=a[0],r=a[1];function i(){r(!1)}return l.a.createElement(l.a.Fragment,null,l.a.createElement(C,{show:c,onCancel:i,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:l.a.createElement(w,{onClick:i},"CLOSE")},l.a.createElement("div",{className:"map-container"},l.a.createElement("h2",null," THEMAP "))),l.a.createElement("li",{className:"place-item"},l.a.createElement(s,{className:"place-item__content"},l.a.createElement("div",{className:"place-item__image"},l.a.createElement("img",{src:e.imageUrl,alt:e.title})),l.a.createElement("div",{className:"place-item__info"},l.a.createElement("h2",null," ",e.title," "),l.a.createElement("h3",null," ",e.address," "),l.a.createElement("p",null," ",e.description," ")),l.a.createElement("div",{className:"place-item__actions"},l.a.createElement(w,{inverse:!0,onClick:function(){r(!0)}}," VIEW ON MAP "),l.a.createElement(w,{to:"/places/".concat(e.id)}," EDIT "),l.a.createElement(w,{danger:!0}," DELETE ")))))};a(42);var P=function(e){return 0===e.items.length?l.a.createElement("div",{className:"place-list center"},l.a.createElement(s,null,l.a.createElement("h2",null," No places found, time to create one?"),l.a.createElement("button",null,"Share Place"))):l.a.createElement("ul",{className:"place-list"},e.items.map((function(e){return l.a.createElement(y,{key:e.id,id:e.id,image:e.imageUrl,title:e.title,description:e.description,address:e.address,creatorId:e.creator,coordinates:e.location})})))},O=(a(43),[{id:"p1",imageUrl:"https://img.travelawaits.com/quill/f/d/f/c/2/4/fdfc242ffd612382c212e04702e4d5f0fae144dd.jpg",title:"Merlion",description:"foobarfizzbang",address:"Marina Bay",creator:"u1",location:{lat:1.2868,lng:103.8545}},{id:"p2",imageUrl:"https://img.travelawaits.com/quill/f/d/f/c/2/4/fdfc242ffd612382c212e04702e4d5f0fae144dd.jpg",title:"Merlion",description:"foobarfizzbang",address:"Marina Bay",creator:"u2",location:{lat:1.2868,lng:103.8545}}]);var j=function(e){var t=Object(o.g)().userId,a=O.filter((function(e){return e.creator===t}));return l.a.createElement(P,{items:a})};var I=function(){return l.a.createElement(i.a,null,l.a.createElement(_,null),l.a.createElement("main",null,l.a.createElement(o.d,null,l.a.createElement(o.b,{path:"/",exact:!0},l.a.createElement(E,null)),l.a.createElement(o.b,{path:"/:userId/places"},l.a.createElement(j,null)),l.a.createElement(o.b,{path:"/places/new"},l.a.createElement(f,null)),l.a.createElement(o.a,{to:"/"}))))};r.a.render(l.a.createElement(I,null),document.getElementById("root"))}]),[[19,1,2]]]);
//# sourceMappingURL=main.627fd481.chunk.js.map