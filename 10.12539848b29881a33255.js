(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+0qA":function(n,l,e){"use strict";var t=e("CcnG"),o=e("oBZk"),u=e("ZZ/e"),r=e("5Jug"),i=e("DuA2"),c=e("Ip0R"),a=function(){function n(){this.exemplarSelected=new t.m}return n.prototype.ngOnInit=function(){},n.prototype.selectExemplar=function(n){this.exemplarSelected.emit(n)},n}(),s=t.pb({encapsulation:2,styles:[],data:{}});function p(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null))],null,function(n,l){n(l,0,0,t.tb(1,"",l.parent.context.$implicit.book.coverUrl||"../assets/img/no_cover.jpg",""))})}function b(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t.Gb(1,null,["",""]))],null,function(n,l){n(l,1,0,l.parent.context.$implicit.book.title)})}function d(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,5,"ion-col",[["size","4"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.selectExemplar(n.context.$implicit)&&t),t},o.E,o.g)),t.qb(1,49152,null,0,u.s,[t.h,t.k],{size:[0,"size"]},null),(n()(),t.ib(16777216,null,0,1,null,p)),t.qb(3,16384,null,0,c.j,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(n()(),t.ib(16777216,null,0,1,null,b)),t.qb(5,16384,null,0,c.j,[t.Q,t.N],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,1,0,"4"),n(l,3,0,l.context.$implicit.book.coverUrl),n(l,5,0,!l.context.$implicit.book.coverUrl)},null)}function m(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,5,"ion-grid",[],null,null,null,o.G,o.i)),t.qb(1,49152,null,0,u.z,[t.h,t.k],null,null),(n()(),t.rb(2,0,null,0,3,"ion-row",[["align-items-end",""]],null,null,null,o.O,o.q)),t.qb(3,49152,null,0,u.hb,[t.h,t.k],null,null),(n()(),t.ib(16777216,null,0,1,null,d)),t.qb(5,278528,null,0,c.i,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null)],function(n,l){n(l,5,0,l.component.exemplars)},null)}function f(n){return t.Ib(0,[(n()(),t.ib(16777216,null,null,1,null,m)),t.qb(1,16384,null,0,c.j,[t.Q,t.N],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,1,0,e.exemplars&&e.exemplars.length>0)},null)}var h=e("6YVB"),v=e("yGQT"),g=e("ZYCi");e.d(l,"a",function(){return j});var k=t.pb({encapsulation:0,styles:[".avatar-small[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n  }"],data:{}});function x(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,17,"ion-header",[],null,null,null,o.H,o.j)),t.qb(1,49152,null,0,u.A,[t.h,t.k],null,null),(n()(),t.rb(2,0,null,0,15,"ion-toolbar",[],null,null,null,o.V,o.x)),t.qb(3,49152,null,0,u.Ab,[t.h,t.k],null,null),(n()(),t.rb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.B,o.d)),t.qb(5,49152,null,0,u.k,[t.h,t.k],null,null),(n()(),t.rb(6,0,null,0,2,"app-avatar",[["class","avatar-small"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onAvatarClicked(e)&&t),t},r.b,r.a)),t.qb(7,114688,null,0,i.a,[],{user:[0,"user"]},null),t.Cb(131072,c.b,[t.h]),(n()(),t.rb(9,0,null,0,2,"ion-title",[],null,null,null,o.U,o.w)),t.qb(10,49152,null,0,u.yb,[t.h,t.k],null,null),(n()(),t.Gb(-1,0,["Sammlung"])),(n()(),t.rb(12,0,null,0,5,"ion-buttons",[["slot","end"]],null,null,null,o.B,o.d)),t.qb(13,49152,null,0,u.k,[t.h,t.k],null,null),(n()(),t.rb(14,0,null,0,3,"ion-button",[["icon-only",""]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onAddClicked(e)&&t),t},o.A,o.c)),t.qb(15,49152,null,0,u.j,[t.h,t.k],null,null),(n()(),t.rb(16,0,null,0,1,"ion-icon",[["name","add"]],null,null,null,o.I,o.k)),t.qb(17,49152,null,0,u.B,[t.h,t.k],{name:[0,"name"]},null),(n()(),t.rb(18,0,null,null,4,"ion-content",[],null,null,null,o.F,o.h)),t.qb(19,49152,null,0,u.t,[t.h,t.k],null,null),(n()(),t.rb(20,0,null,0,2,"app-exemplar-grid",[],null,[[null,"exemplarSelected"]],function(n,l,e){var t=!0;return"exemplarSelected"===l&&(t=!1!==n.component.onExemplarSelected(e)&&t),t},f,s)),t.qb(21,114688,null,0,a,[],{exemplars:[0,"exemplars"]},{exemplarSelected:"exemplarSelected"}),t.Cb(131072,c.b,[t.h])],function(n,l){var e,o=l.component;n(l,7,0,t.Hb(l,7,0,t.Bb(l,8).transform(o.user$))),n(l,17,0,"add"),n(l,21,0,null==(e=t.Hb(l,21,0,t.Bb(l,22).transform(o.collection$)))?null:e.exemplars)},null)}function C(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,1,"collection-details-page",[],null,null,null,x,k)),t.qb(1,114688,null,0,h.a,[v.n,u.Gb,g.a],null,null)],function(n,l){n(l,1,0)},null)}var j=t.nb("collection-details-page",h.a,C,{},{},[])},"1Alg":function(n,l,e){"use strict";e.d(l,"a",function(){return f});var t=e("yGQT"),o=e("F/XL"),u=e("67Y/"),r=e("t9fZ"),i=e("xMyE"),c=e("9Z1F"),a=e("15JJ"),s=e("CjZJ"),p=e("DgPm"),b=e("/Qm2"),d=e("CcnG"),m=e("ZYCi"),f=function(){function n(n,l,e){this.store=n,this.collectionService=l,this.router=e}return n.prototype.hasCollectionInStore=function(n){return this.store.pipe(Object(t.E)(s.c),Object(u.a)(function(l){return l&&!!l[n]}),Object(r.a)(1))},n.prototype.hasCollectionInApi=function(n){var l=this;return console.log("hasCollectionInApi: ",n),this.collectionService.loadCollection(n).pipe(Object(u.a)(function(n){return new b.g({collection:n})}),Object(i.a)(function(n){return l.store.dispatch(n)}),Object(u.a)(function(n){return!!n}),Object(c.a)(function(){return l.router.navigate(["/404"]),Object(o.a)(!1)}))},n.prototype.hasCollection=function(n){var l=this;return console.log("hasCollection: ",n),this.hasCollectionInStore(n).pipe(Object(a.a)(function(e){return e?(console.log("collection found in store"),Object(o.a)(e)):l.hasCollectionInApi(n)}))},n.prototype.canActivate=function(n){return console.log("collectionexistsguard"),this.hasCollection(n.params.ownerId)},n.ngInjectableDef=d.U({factory:function(){return new n(d.Y(t.n),d.Y(p.a),d.Y(m.m))},token:n,providedIn:"root"}),n}()},"5lrZ":function(n,l,e){"use strict";e.d(l,"a",function(){return c});var t=e("yGQT"),o=e("CjZJ"),u=e("/Qm2"),r=e("67Y/"),i=e("4ald"),c=function(){function n(n,l){this.store=n,this.activatedRoute=l}return n.prototype.ngOnInit=function(){this.user$=this.store.pipe(Object(t.E)(i.d));var n=this.activatedRoute.snapshot.paramMap.get("ownerId");this.collection$=this.store.pipe(Object(t.E)(o.d(n)));var l=this.activatedRoute.snapshot.paramMap.get("exemplarId");this.exemplar$=this.store.pipe(Object(t.E)(o.d(n)),Object(r.a)(function(n){return n.exemplars.find(function(n){return n.exemplarId===l})}))},n.prototype.onAddToCollection=function(n){this.store.dispatch(new u.a({book:n}))},n.prototype.onRemoveExemplar=function(n){this.store.dispatch(new u.h({exemplar:n}))},n}()},"6YVB":function(n,l,e){"use strict";e.d(l,"a",function(){return i});var t=e("yGQT"),o=e("4ald"),u=(e("ZZ/e"),e("CjZJ")),r=e("/Qm2"),i=function(){function n(n,l,e){this.store=n,this.navCtrl=l,this.activatedRoute=e}return n.prototype.ngOnInit=function(){var n=this.activatedRoute.snapshot.paramMap.get("ownerId");n?this.collection$=this.store.pipe(Object(t.E)(u.d(n))):(this.collection$=this.store.pipe(Object(t.E)(u.b)),this.store.dispatch(new r.e)),this.user$=this.store.pipe(Object(t.E)(o.d))},n.prototype.onAvatarClicked=function(n){this.navCtrl.navigateRoot("/app/profile")},n.prototype.onExemplarSelected=function(n){this.navCtrl.navigateForward("/app/collection/"+n.ownerId+"/"+n.exemplarId)},n.prototype.onAddClicked=function(n){this.navCtrl.navigateForward("/app/book")},n}()},AuB6:function(n,l,e){"use strict";var t=e("CcnG"),o=e("oBZk"),u=e("ZZ/e"),r=e("Ip0R"),i=e("Tbkv"),c=e("BlLv"),a=function(){function n(){this.removeExemplar=new t.m}return n.prototype.ngOnInit=function(){},n.prototype.deleteExemplar=function(){this.removeExemplar.emit(this.exemplar)},n.prototype.ngOnChanges=function(n){console.log("ExemplarLinksComponent onChanges")},n}(),s=t.pb({encapsulation:0,styles:[[""]],data:{}});function p(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,11,null,null,null,null,null,null,null)),(n()(),t.rb(1,0,null,null,10,"ion-row",[],null,null,null,o.O,o.q)),t.qb(2,49152,null,0,u.hb,[t.h,t.k],null,null),(n()(),t.rb(3,0,null,0,8,"ion-col",[["center",""],["text-center",""]],null,null,null,o.E,o.g)),t.qb(4,49152,null,0,u.s,[t.h,t.k],null,null),(n()(),t.rb(5,0,null,0,6,"ion-note",[],null,null,null,o.N,o.p)),t.qb(6,49152,null,0,u.W,[t.h,t.k],null,null),(n()(),t.rb(7,0,null,0,4,"ion-button",[],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.deleteExemplar()&&t),t},o.A,o.c)),t.qb(8,49152,null,0,u.j,[t.h,t.k],null,null),(n()(),t.rb(9,0,null,0,1,"ion-icon",[["name","trash"],["slot","start"]],null,null,null,o.I,o.k)),t.qb(10,49152,null,0,u.B,[t.h,t.k],{name:[0,"name"]},null),(n()(),t.Gb(-1,0,[" Entfernen "]))],function(n,l){n(l,10,0,"trash")},null)}function b(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,2,null,null,null,null,null,null,null)),(n()(),t.ib(16777216,null,null,1,null,p)),t.qb(2,16384,null,0,r.j,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(n()(),t.ib(0,null,null,0))],function(n,l){var e=l.component;n(l,2,0,e.user.name==e.exemplar.ownerId)},null)}function d(n){return t.Ib(0,[(n()(),t.ib(16777216,null,null,1,null,b)),t.qb(1,16384,null,0,r.j,[t.Q,t.N],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,1,0,e.user&&e.exemplar)},null)}var m=e("5lrZ"),f=e("yGQT"),h=e("ZYCi");e.d(l,"a",function(){return x});var v=t.pb({encapsulation:2,styles:[],data:{}});function g(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,12,"ion-header",[],null,null,null,o.H,o.j)),t.qb(1,49152,null,0,u.A,[t.h,t.k],null,null),(n()(),t.rb(2,0,null,0,10,"ion-toolbar",[],null,null,null,o.V,o.x)),t.qb(3,49152,null,0,u.Ab,[t.h,t.k],null,null),(n()(),t.rb(4,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,o.B,o.d)),t.qb(5,49152,null,0,u.k,[t.h,t.k],null,null),(n()(),t.rb(6,0,null,0,2,"ion-back-button",[["text","Zur\xfcck"]],null,[[null,"click"]],function(n,l,e){var o=!0;return"click"===l&&(o=!1!==t.Bb(n,8).onClick(e)&&o),o},o.z,o.b)),t.qb(7,49152,null,0,u.f,[t.h,t.k],{text:[0,"text"]},null),t.qb(8,16384,null,0,u.g,[[2,u.gb],u.Gb],null,null),(n()(),t.rb(9,0,null,0,3,"ion-title",[],null,null,null,o.U,o.w)),t.qb(10,49152,null,0,u.yb,[t.h,t.k],null,null),(n()(),t.Gb(11,0,["",""])),t.Cb(131072,r.b,[t.h]),(n()(),t.rb(13,0,null,null,8,"ion-content",[],null,null,null,o.F,o.h)),t.qb(14,49152,null,0,u.t,[t.h,t.k],null,null),(n()(),t.rb(15,0,null,0,2,"app-book-details",[],null,null,null,i.b,i.a)),t.qb(16,114688,null,0,c.a,[],{book:[0,"book"]},null),t.Cb(131072,r.b,[t.h]),(n()(),t.rb(18,0,null,0,3,"app-exemplar-links",[],null,[[null,"removeExemplar"]],function(n,l,e){var t=!0;return"removeExemplar"===l&&(t=!1!==n.component.onRemoveExemplar(e)&&t),t},d,s)),t.qb(19,638976,null,0,a,[],{exemplar:[0,"exemplar"],user:[1,"user"]},{removeExemplar:"removeExemplar"}),t.Cb(131072,r.b,[t.h]),t.Cb(131072,r.b,[t.h])],function(n,l){var e,o=l.component;n(l,7,0,"Zur\xfcck"),n(l,16,0,null==(e=t.Hb(l,16,0,t.Bb(l,17).transform(o.exemplar$)))?null:e.book),n(l,19,0,t.Hb(l,19,0,t.Bb(l,20).transform(o.exemplar$)),t.Hb(l,19,1,t.Bb(l,21).transform(o.user$)))},function(n,l){var e,o=l.component;n(l,11,0,null==(e=t.Hb(l,11,0,t.Bb(l,12).transform(o.exemplar$)))?null:e.book.title)})}function k(n){return t.Ib(0,[(n()(),t.rb(0,0,null,null,1,"exemplar-details-page",[],null,null,null,g,v)),t.qb(1,114688,null,0,m.a,[f.n,h.a],null,null)],function(n,l){n(l,1,0)},null)}var x=t.nb("exemplar-details-page",m.a,k,{},{},[])},DgPm:function(n,l,e){"use strict";e.d(l,"a",function(){return u});var t=e("CcnG"),o=e("t/Na"),u=function(){function n(n){this.httpClient=n,this.BASE_URL="https://42ss414z2g.execute-api.eu-central-1.amazonaws.com"}return n.prototype.addToCollection=function(n){if(n._links&&n._links.addToCollection){var l=this.BASE_URL+n._links.addToCollection.href;return this.httpClient[n._links.addToCollection.method.toLowerCase()](l)}throw new Error("book cannot be added to collection")},n.prototype.loadCollection=function(n){return this.httpClient.get(n?this.BASE_URL+"/latest/collections/"+n:this.BASE_URL+"/latest/collections")},n.prototype.removeExemplar=function(n){if(n._links&&n._links.removeExemplar){var l=this.BASE_URL+n._links.removeExemplar.href;return this.httpClient[n._links.removeExemplar.method.toLowerCase()](l)}throw new Error("exemplar cannot be removed from collection")},n.ngInjectableDef=t.U({factory:function(){return new n(t.Y(o.c))},token:n,providedIn:"root"}),n}()},OqGx:function(n,l,e){"use strict";e.d(l,"a",function(){return t}),e("6YVB"),e("5lrZ"),e("1Alg");var t=function(){return function(){}}()},pFv1:function(n,l,e){"use strict";e.d(l,"a",function(){return s});var t=e("mrSG"),o=e("jYNz"),u=e("15JJ"),r=e("67Y/"),i=e("9Z1F"),c=e("F/XL"),a=e("/Qm2"),s=function(){function n(n,l,e,t,s){var p=this;this.actions$=n,this.collectionService=l,this.loadingCtrl=e,this.navCtrl=t,this.toastCtrl=s,this.loadCollection$=this.actions$.pipe(Object(o.d)(a.d.LoadCollection),Object(u.a)(function(n){var l;return n.payload&&n.payload.ownerId&&(l=n.payload.ownerId),p.collectionService.loadCollection(l).pipe(Object(r.a)(function(n){return new a.g({collection:n})}),Object(i.a)(function(n){return Object(c.a)(new a.f({errorMessage:n.message}))}))})),this.addBookToCollection$=this.actions$.pipe(Object(o.d)(a.d.AddBookToCollection),Object(u.a)(function(n){return n.payload.book._links&&n.payload.book._links.addToCollection?p.collectionService.addToCollection(n.payload.book).pipe(Object(r.a)(function(n){return new a.c({exemplar:n})}),Object(i.a)(function(n){return Object(c.a)(new a.b({errorMessage:n.message}))})):Object(c.a)(new a.b({errorMessage:"addToCollection link is not present"}))})),this.removeExemplar$=this.actions$.pipe(Object(o.d)(a.d.RemoveExemplar),Object(u.a)(function(n){return n.payload.exemplar._links&&n.payload.exemplar._links.removeExemplar?p.collectionService.removeExemplar(n.payload.exemplar).pipe(Object(r.a)(function(l){return new a.j({exemplar:n.payload.exemplar})}),Object(i.a)(function(n){return Object(c.a)(new a.i({errorMessage:n.message}))})):Object(c.a)(new a.b({errorMessage:"removeExemplar link is not present"}))})),this.createLoadingOnRequests$=this.actions$.pipe(Object(o.d)(a.d.AddBookToCollection,a.d.LoadCollection,a.d.RemoveExemplar),Object(r.a)(function(n){p.loadingCtrl.create().then(function(n){p.loading=n,n.present()})})),this.dismissLoadingAfterRequests$=this.actions$.pipe(Object(o.d)(a.d.AddBookToCollectionSuccess,a.d.AddBookToCollectionError,a.d.LoadCollectionSuccess,a.d.LoadCollectionError,a.d.RemoveExemplarSuccess,a.d.RemoveExemplarError),Object(r.a)(function(){p.loading&&p.loading.dismiss()})),this.navigateOnAddToCollectionSuccess$=this.actions$.pipe(Object(o.d)(a.d.AddBookToCollectionSuccess),Object(r.a)(function(n){var l=n.payload.exemplar;p.toastCtrl.create({message:l.book.title+" wurde zur Sammlung hinzugef\xfcgt",duration:2e3,position:"top",buttons:[{side:"end",icon:"open",text:"Bring mich hin",handler:function(){p.navCtrl.navigateRoot("/app/collection/"+l.ownerId+"/"+l.exemplarId)}}]}).then(function(n){return n.present()})})),this.navigateOnRemoveExemplarSuccess$=this.actions$.pipe(Object(o.d)(a.d.RemoveExemplarSuccess),Object(r.a)(function(n){p.navCtrl.navigateRoot("/app/collection"),p.toastCtrl.create({message:n.payload.exemplar.book.title+" wurde aus der Sammlung entfernt",duration:2e3,position:"top"}).then(function(n){return n.present()})}))}return t.c([Object(o.b)(),t.f("design:type",Object)],n.prototype,"loadCollection$",void 0),t.c([Object(o.b)(),t.f("design:type",Object)],n.prototype,"addBookToCollection$",void 0),t.c([Object(o.b)(),t.f("design:type",Object)],n.prototype,"removeExemplar$",void 0),t.c([Object(o.b)({dispatch:!1}),t.f("design:type",Object)],n.prototype,"createLoadingOnRequests$",void 0),t.c([Object(o.b)({dispatch:!1}),t.f("design:type",Object)],n.prototype,"dismissLoadingAfterRequests$",void 0),t.c([Object(o.b)({dispatch:!1}),t.f("design:type",Object)],n.prototype,"navigateOnAddToCollectionSuccess$",void 0),t.c([Object(o.b)({dispatch:!1}),t.f("design:type",Object)],n.prototype,"navigateOnRemoveExemplarSuccess$",void 0),n}()}}]);