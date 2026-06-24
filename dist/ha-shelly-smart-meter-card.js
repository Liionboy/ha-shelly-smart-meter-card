function t(t,e,s,i){var o,a=arguments.length,r=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(r=(a<3?o(r):a>3?o(e,s,r):o(e,s))||r);return a>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new a(s,t,i)},n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,m=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},b=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const a=i?.call(this);o?.call(this,e),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const a=o.fromAttribute(e,t.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const a=this.constructor;if(!1===i&&(o=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??b)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==o||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,v?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,k=w.trustedTypes,E=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+C,P=`<${z}>`,O=document,M=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,H=/>/g,F=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,W=/"/g,L=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),I=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,G=O.createTreeWalker(O,129);function J(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let o,a=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<s;e++){const s=t[e];let n,c,l=-1,h=0;for(;h<s.length&&(r.lastIndex=h,c=r.exec(s),null!==c);)h=r.lastIndex,r===N?"!--"===c[1]?r=D:void 0!==c[1]?r=H:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=F):void 0!==c[3]&&(r=F):r===F?">"===c[0]?(r=o??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,n=c[1],r=void 0===c[3]?F:'"'===c[3]?W:j):r===W||r===j?r=F:r===D||r===H?r=N:(r=F,o=void 0);const d=r===F&&t[e+1].startsWith("/>")?" ":"";a+=r===N?s+P:l>=0?(i.push(n),s.slice(0,l)+S+s.slice(l)+C+d):s+C+(-2===l?e:d)}return[J(t,a+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,a=0;const r=t.length-1,n=this.parts,[c,l]=Y(t,e);if(this.el=K.createElement(c,s),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=G.nextNode())&&n.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=l[a++],s=i.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:o}),i.removeAttribute(t));if(L.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=k?k.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),G.nextNode(),n.push({type:2,index:++o});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===z)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)n.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const s=O.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===I)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const a=T(e)?void 0:e._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);G.currentNode=i;let o=G.nextNode(),a=0,r=0,n=s[0];for(;void 0!==n;){if(a===n.index){let e;2===n.type?e=new X(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new ot(o,this,t)),this._$AV.push(e),n=s[++r]}a!==n?.index&&(o=G.nextNode(),a++)}return G.currentNode=O,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),T(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const o=this.strings;let a=!1;if(void 0===o)t=Z(this,t,e,0),a=!T(t)||t!==this._$AH&&t!==I,a&&(this._$AH=t);else{const i=t;let r,n;for(t=o[0],r=0;r<o.length-1;r++)n=Z(this,i[s+r],e,r),n===I&&(n=this._$AH[r]),a||=!T(n)||n!==this._$AH[r],n===B?t=B:t!==B&&(t+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!i&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===I)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(K,X),(w.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(M(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},dt=(t=ht,e,s)=>{const{kind:i,metadata:o}=s;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function _t(t){return pt({...t,state:!0,attribute:!1})}var ut,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ut||(ut={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));const ft=(t,e,s,i)=>{i=i||{},s=null==s?{}:s;const o=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,t.dispatchEvent(o),o},vt="ha-shelly-smart-meter-card";console.info("%c ⚡ SHELLY-SMART-METER-CARD %c v2.0.0 ","color:#fff;background:#f59e0b;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#fff;background:#6b7280;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");const mt={phase_a_power:"_phase_a_active_power",phase_a_apparent:"_phase_a_apparent_power",phase_a_voltage:"_phase_a_voltage",phase_a_current:"_phase_a_current",phase_a_pf:"_phase_a_power_factor",phase_a_freq:"_phase_a_frequency",phase_a_energy:"_phase_a_total_active_energy",phase_a_returned:"_phase_a_total_active_returned_energy",phase_b_power:"_phase_b_active_power",phase_b_apparent:"_phase_b_apparent_power",phase_b_voltage:"_phase_b_voltage",phase_b_current:"_phase_b_current",phase_b_pf:"_phase_b_power_factor",phase_b_freq:"_phase_b_frequency",phase_b_energy:"_phase_b_total_active_energy",phase_b_returned:"_phase_b_total_active_returned_energy",phase_c_power:"_phase_c_active_power",phase_c_apparent:"_phase_c_apparent_power",phase_c_voltage:"_phase_c_voltage",phase_c_current:"_phase_c_current",phase_c_pf:"_phase_c_power_factor",phase_c_freq:"_phase_c_frequency",phase_c_energy:"_phase_c_total_active_energy",phase_c_returned:"_phase_c_total_active_returned_energy",total_power:"_total_active_power",total_apparent:"_total_apparent_power",total_current:"_total_current",total_energy:"_total_active_energy",total_returned:"_total_active_returned_energy",total_cost:"_total_active_energy_cost",temperature:"_temperature",rssi:"_rssi",uptime:"_uptime"},$t={cloud:"_cloud",restart_required:"_restart_required"},bt={firmware:"_firmware_update",beta_firmware:"_beta_firmware_update"},xt={ble_integration:"_aioshelly_ble_integration",monitor_production:"_monitor_production_js"},yt={reboot:"_reboot"},wt={A:"Faza A",B:"Faza B",C:"Faza C"};let At=null;function kt(t){if(At)return At;const e=Object.keys(t.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_phase_a_active_power"));if(!e)return{};const s=e.replace("sensor.","").replace("_phase_a_active_power",""),i={};for(const[e,o]of Object.entries(mt)){const a=`sensor.${s}${o}`;t.states[a]&&(i[e]=a)}for(const[e,o]of Object.entries($t)){const a=`binary_sensor.${s}${o}`;t.states[a]&&(i[e]=a)}for(const[e,o]of Object.entries(bt)){const a=`update.${s}${o}`;t.states[a]&&(i[e]=a)}for(const[e,o]of Object.entries(xt)){const a=`switch.${s}${o}`;t.states[a]&&(i[e]=a)}for(const[e,o]of Object.entries(yt)){const a=`button.${s}${o}`;t.states[a]&&(i[e]=a)}const o=`device_tracker.${s}`;return t.states[o]&&(i.device_tracker=o),At=i,i}let Et=class extends nt{constructor(){super(...arguments),this._showPhaseDetails=!1,this._showTotals=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return Ct}),document.createElement("ha-shelly-smart-meter-editor")}static getStubConfig(){return{type:vt,title:"⚡ Smart Meter",show_header:!0,show_flow:!0,show_phases:!0,show_totals:!0,show_energy:!0,show_costs:!0,show_device:!0,show_controls:!1,cost_per_kwh:.85,entities:{},phase_labels:wt}}setConfig(t){if(!t)throw new Error("Invalid config");At=null,this.config={...t,type:vt,title:t.title||"⚡ Smart Meter",show_header:t.show_header??!0,show_flow:t.show_flow??!0,show_phases:t.show_phases??!0,show_totals:t.show_totals??!0,show_energy:t.show_energy??!0,show_costs:t.show_costs??!0,show_device:t.show_device??!0,show_controls:t.show_controls??!1,cost_per_kwh:t.cost_per_kwh??.85,entities:t.entities||{},phase_labels:{...wt,...t.phase_labels}}}_resolve(t){return this.config.entities?.[t]||this.hass&&kt(this.hass)[t]||""}_s(t){const e=this._resolve(t);return e?this.hass?.states[e]?.state:void 0}_n(t){const e=parseFloat(this._s(t)||"");return isNaN(e)?0:e}_e(t){return this._resolve(t)}_attr(t,e){const s=this._resolve(t);return s?this.hass?.states[s]?.attributes?.[e]:void 0}_changed(t){const e=this._resolve(t);if(!e)return"";const s=this.hass?.states[e];if(!s?.last_changed)return"";const i=Math.floor((Date.now()-new Date(s.last_changed).getTime())/6e4);if(i<1)return"acum";if(i<60)return`${i} min`;const o=Math.floor(i/60);return o<24?`${o}h ${i%60}min`:`${Math.floor(o/24)}z ${o%24}h`}_more(t){t&&ft(this,"hass-more-info",{entityId:t})}_fmt(t,e=1){return Math.abs(t)>=1e3?(t/1e3).toFixed(e)+"k":t.toFixed(e)}_fmtDate(t){try{const e=new Date(t),s=Date.now()-e.getTime(),i=Math.floor(s/864e5),o=Math.floor(s%864e5/36e5);if(i>0)return`${i}z ${o}h`;return`${o}h ${Math.floor(s%36e5/6e4)}min`}catch{return t}}getCardSize(){return 8}render(){if(!this.config||!this.hass)return B;const t=kt(this.hass);if(!(Object.keys(t).length>0||Object.keys(this.config.entities||{}).length>0))return q`
        <ha-card>
          <div class="header importing"><div class="header-icon">⚡</div>
            <div class="header-text"><div class="header-title">Shelly Smart Meter</div>
              <div class="header-sub">Nu s-au găsit entități Shelly Pro 3EM</div>
            </div></div>
          <div class="content"><div class="no-device">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <p>Nu am detectat automat un Shelly Pro 3EM.</p>
            <p>Adaugă entitățile manual în config sau verifică integrarea.</p>
          </div></div>
        </ha-card>`;const e=this._n("total_power"),s=e<0,i=Math.abs(Math.round(e)),o=["a","b","c"].map(t=>({key:t.toUpperCase(),label:this.config.phase_labels?.[t.toUpperCase()]||`Faza ${t.toUpperCase()}`,power:this._n(`phase_${t}_power`),apparent:this._n(`phase_${t}_apparent`),voltage:this._n(`phase_${t}_voltage`),current:this._n(`phase_${t}_current`),pf:this._n(`phase_${t}_pf`),freq:this._n(`phase_${t}_freq`),energy:this._n(`phase_${t}_energy`),returned:this._n(`phase_${t}_returned`)})),a=this._n("daily_consumed"),r=this._n("daily_grid"),n=this._n("daily_return"),c=this._n("daily_hp"),l=this._n("total_energy"),h=this._n("total_returned"),d=this._n("total_cost"),p=this.config.cost_per_kwh||.85,_=r*p,u=this._s("temperature"),g=this._n("rssi"),f=this._s("uptime"),v="on"===this._s("cloud"),m="on"===this._s("restart_required"),$="on"===this._s("ble_integration"),b="on"===this._s("monitor_production"),x="on"===this._s("firmware"),y="on"===this._s("beta_firmware"),w="home"===this._s("device_tracker"),A=this._n("total_apparent"),k=A>0?Math.abs(e)/A:0;return q`
      <ha-card>
        <!-- HEADER -->
        ${!1!==this.config.show_header?q`
          <div class="header ${s?"exporting":"importing"}">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">${this.config.title}</div>
              <div class="header-sub">
                ${s?`↗ Export ${i}W în rețea`:e>50?`↙ Import ${i}W din rețea`:"⚖ Consum echilibrat"}
                ${m?" · ⚠️ Restart necesar":""}
                ${x?" · 🔄 Update disponibil":""}
              </div>
            </div>
            <div class="power-badge ${s?"export":"import"}">
              ${s?"↗":"↙"} ${i}W
            </div>
          </div>
        `:B}

        <div class="content">

          <!-- FLOW DIAGRAM -->
          ${!1!==this.config.show_flow?q`
            <div class="flow">
              <div class="flow-node solar ${s?"active":""}">
                <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                <span class="flow-val">${s?i:0}W</span>
                <small>Solar</small>
              </div>
              <div class="flow-arrow">
                <div class="arrow-line ${s?"export":e>50?"import":"idle"}">
                  <ha-icon icon=${s?"mdi:arrow-right-bold":e>50?"mdi:arrow-left-bold":"mdi:swap-horizontal"}></ha-icon>
                </div>
              </div>
              <div class="flow-node house">
                <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
                <span class="flow-val">${Math.round(A||i)}W</span>
                <small>Consum</small>
              </div>
              <div class="flow-arrow">
                <div class="arrow-line ${!s&&e>50?"import":s?"export":"idle"}">
                  <ha-icon icon=${!s&&e>50?"mdi:arrow-left-bold":"mdi:arrow-right-bold"}></ha-icon>
                </div>
              </div>
              <div class="flow-node grid ${!s&&e>50?"active":""}">
                <ha-icon icon="mdi:transmission-tower"></ha-icon>
                <span class="flow-val">${!s&&e>50||s?i:0}W</span>
                <small>Rețea</small>
              </div>
            </div>
          `:B}

          <!-- PHASES -->
          ${!1!==this.config.show_phases?q`
            <div class="section-header" @click=${()=>{this._showPhaseDetails=!this._showPhaseDetails}}>
              <span class="section-title">⚡ Faze</span>
              <ha-icon .icon=${this._showPhaseDetails?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </div>
            <div class="phases">
              ${o.map(t=>{const e=Math.round(t.power),s=e<0;return q`
                  <div class="phase-card" @click=${()=>this._more(this._e(`phase_${t.key.toLowerCase()}_power`))}>
                    <div class="phase-header">
                      <span class="phase-label">${t.key}</span>
                      <span class="phase-name">${t.label}</span>
                      <span class="phase-power ${s?"export":"import"}">${s?"↗":"↙"} ${Math.abs(e)}W</span>
                    </div>
                    ${this._showPhaseDetails?q`
                      <div class="phase-details">
                        <div class="pd"><ha-icon icon="mdi:flash"></ha-icon><span>${t.voltage.toFixed(1)}V</span></div>
                        <div class="pd"><ha-icon icon="mdi:current-ac"></ha-icon><span>${t.current.toFixed(2)}A</span></div>
                        <div class="pd"><ha-icon icon="mdi:cosine-wave"></ha-icon><span>PF ${t.pf.toFixed(2)}</span></div>
                        <div class="pd"><ha-icon icon="mdi:sine-wave"></ha-icon><span>${t.freq.toFixed(1)}Hz</span></div>
                        <div class="pd"><ha-icon icon="mdi:lightning-bolt"></ha-icon><span>${Math.round(t.apparent)}VA</span></div>
                        <div class="pd"><ha-icon icon="mdi:counter"></ha-icon><span>${t.pf>=0?(100*t.pf).toFixed(0):"—"}%</span></div>
                      </div>
                      <div class="phase-energy">
                        <span class="ein"><ha-icon icon="mdi:transmission-tower-import"></ha-icon>${t.energy.toFixed(1)} kWh</span>
                        <span class="eout"><ha-icon icon="mdi:transmission-tower-export"></ha-icon>${t.returned.toFixed(1)} kWh</span>
                      </div>
                    `:B}
                  </div>
                `})}
            </div>
          `:B}

          <!-- TOTALS -->
          ${!1!==this.config.show_totals?q`
            <div class="section-header" @click=${()=>{this._showTotals=!this._showTotals}}>
              <span class="section-title">📊 Totaluri</span>
              <ha-icon .icon=${this._showTotals?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </div>
            ${this._showTotals?q`
              <div class="totals-grid">
                <div class="total-item" @click=${()=>this._more(this._e("total_power"))}>
                  <ha-icon icon="mdi:flash"></ha-icon>
                  <span class="tl">Putere activă</span>
                  <span class="tv">${this._fmt(e)}W</span>
                </div>
                <div class="total-item" @click=${()=>this._more(this._e("total_apparent"))}>
                  <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                  <span class="tl">Putere aparentă</span>
                  <span class="tv">${this._fmt(A)}VA</span>
                </div>
                <div class="total-item" @click=${()=>this._more(this._e("total_current"))}>
                  <ha-icon icon="mdi:current-ac"></ha-icon>
                  <span class="tl">Curent total</span>
                  <span class="tv">${this._n("total_current").toFixed(2)}A</span>
                </div>
                <div class="total-item">
                  <ha-icon icon="mdi:cosine-wave"></ha-icon>
                  <span class="tl">Power Factor</span>
                  <span class="tv">${k.toFixed(2)}</span>
                </div>
                <div class="total-item" @click=${()=>this._more(this._e("total_energy"))}>
                  <ha-icon icon="mdi:meter-electric"></ha-icon>
                  <span class="tl">Energie consumată</span>
                  <span class="tv">${this._fmt(l)} kWh</span>
                </div>
                <div class="total-item" @click=${()=>this._more(this._e("total_returned"))}>
                  <ha-icon icon="mdi:flash-outline"></ha-icon>
                  <span class="tl">Energie returnată</span>
                  <span class="tv">${this._fmt(h)} kWh</span>
                </div>
                <div class="total-item" @click=${()=>this._more(this._e("total_cost"))}>
                  <ha-icon icon="mdi:cash"></ha-icon>
                  <span class="tl">Cost total</span>
                  <span class="tv">${d.toFixed(2)} RON</span>
                </div>
              </div>
            `:B}
          `:B}

          <!-- ENERGY DAILY -->
          ${!1!==this.config.show_energy&&(this._e("daily_consumed")||this._e("daily_return")||this._e("daily_grid"))?q`
            <div class="section-header"><span class="section-title">📈 Energie zilnică</span></div>
            <div class="energy-grid">
              ${this._e("daily_consumed")?q`
                <div class="ec consumed" @click=${()=>this._more(this._e("daily_consumed"))}>
                  <ha-icon icon="mdi:counter"></ha-icon>
                  <div class="ei"><span class="el">Consum casă</span><span class="ev">${a.toFixed(2)} kWh</span></div>
                </div>`:B}
              ${this._e("daily_grid")?q`
                <div class="ec grid-in" @click=${()=>this._more(this._e("daily_grid"))}>
                  <ha-icon icon="mdi:transmission-tower-import"></ha-icon>
                  <div class="ei"><span class="el">Import rețea</span><span class="ev">${r.toFixed(2)} kWh</span></div>
                </div>`:B}
              ${this._e("daily_return")?q`
                <div class="ec returned" @click=${()=>this._more(this._e("daily_return"))}>
                  <ha-icon icon="mdi:solar-power"></ha-icon>
                  <div class="ei"><span class="el">Export rețea</span><span class="ev">${n.toFixed(2)} kWh</span></div>
                </div>`:B}
              ${this._e("daily_hp")?q`
                <div class="ec hp" @click=${()=>this._more(this._e("daily_hp"))}>
                  <ha-icon icon="mdi:heat-pump"></ha-icon>
                  <div class="ei"><span class="el">Pompă căldură</span><span class="ev">${c.toFixed(2)} kWh</span></div>
                </div>`:B}
            </div>
          `:B}

          <!-- COSTS -->
          ${!1!==this.config.show_costs&&this._e("daily_grid")?q`
            <div class="section-header"><span class="section-title">💰 Costuri</span></div>
            <div class="costs">
              <div class="cost-row">
                <ha-icon icon="mdi:cash"></ha-icon>
                <span>Cost estimat azi (rețea)</span>
                <span class="cost-val">${_.toFixed(2)} RON</span>
              </div>
              <div class="cost-row small">
                <span></span>
                <span class="cost-note">${r.toFixed(2)} kWh × ${p} RON/kWh</span>
                ${d?q`<span class="cost-note">Total: ${d.toFixed(2)} RON</span>`:B}
              </div>
            </div>
          `:B}

          <!-- DEVICE STATUS -->
          ${!1!==this.config.show_device?q`
            <div class="section-header"><span class="section-title">📡 Device</span></div>
            <div class="device-grid">
              ${u?q`<div class="di"><ha-icon icon="mdi:thermometer"></ha-icon><span>${u}°C</span></div>`:B}
              ${g?q`<div class="di ${g<-75?"weak":g<-60?"ok":"good"}"><ha-icon icon="mdi:wifi"></ha-icon><span>${g} dBm</span></div>`:B}
              ${this._e("cloud")?q`<div class="di"><ha-icon icon=${v?"mdi:cloud-check":"mdi:cloud-off-outline"}></ha-icon><span>${v?"Cloud":"Local"}</span></div>`:B}
              ${this._e("device_tracker")?q`<div class="di ${w?"good":"weak"}"><ha-icon icon=${w?"mdi:access-point-network":"mdi:access-point-off"}></ha-icon><span>${w?"Online":"Offline"}</span></div>`:B}
              ${f?q`<div class="di"><ha-icon icon="mdi:clock-outline"></ha-icon><span>Uptime: ${this._fmtDate(f)}</span></div>`:B}
              ${m?q`<div class="di warn"><ha-icon icon="mdi:alert"></ha-icon><span>Restart necesar</span></div>`:B}
              ${x?q`<div class="di warn"><ha-icon icon="mdi:update"></ha-icon><span>Update disponibil</span></div>`:B}
              ${y?q`<div class="di"><ha-icon icon="mdi:test-tube"></ha-icon><span>Beta update</span></div>`:B}
            </div>
          `:B}

          <!-- CONTROLS -->
          ${this.config.show_controls?q`
            <div class="section-header"><span class="section-title">🎮 Control</span></div>
            <div class="controls">
              ${this._e("reboot")?q`
                <div class="ctrl" @click=${()=>this._more(this._e("reboot"))}>
                  <ha-icon icon="mdi:restart"></ha-icon><span>Reboot</span>
                </div>`:B}
              ${this._e("ble_integration")?q`
                <div class="ctrl ${$?"on":""}" @click=${()=>this._more(this._e("ble_integration"))}>
                  <ha-icon icon="mdi:bluetooth"></ha-icon><span>BLE: ${$?"ON":"OFF"}</span>
                </div>`:B}
              ${this._e("monitor_production")?q`
                <div class="ctrl ${b?"on":""}" @click=${()=>this._more(this._e("monitor_production"))}>
                  <ha-icon icon="mdi:script-text"></ha-icon><span>Monitor JS: ${b?"ON":"OFF"}</span>
                </div>`:B}
            </div>
          `:B}
        </div>

        <div class="footer">
          <span>Update: ${this._changed("total_power")}</span>
        </div>
      </ha-card>
    `}static get styles(){return r`
      :host { display: block; }
      ha-card { border-radius: 16px; overflow: hidden; background: var(--card-background-color, #1c1c1e); }

      .header { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .header.exporting { background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(234,179,8,0.06)); }
      .header.importing { background: linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.04)); }
      .header-icon { font-size: 28px; }
      .header-text { flex: 1; }
      .header-title { font-size: 16px; font-weight: 600; color: var(--primary-text-color); }
      .header-sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .power-badge { padding: 6px 14px; border-radius: 14px; font-size: 16px; font-weight: 700; letter-spacing: -0.5px; }
      .power-badge.export { background: rgba(34,197,94,0.15); color: #22c55e; }
      .power-badge.import { background: rgba(239,68,68,0.12); color: #ef4444; }
      .content { padding: 14px; }

      .no-device { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; text-align: center; }
      .no-device ha-icon { --mdc-icon-size: 40px; color: var(--secondary-text-color); }
      .no-device p { margin: 0; font-size: 13px; color: var(--secondary-text-color); }

      /* Flow */
      .flow { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px; padding: 8px 0; }
      .flow-node { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 14px; border-radius: 14px; min-width: 76px; transition: all 0.3s; }
      .flow-node ha-icon { --mdc-icon-size: 26px; }
      .flow-node.solar { background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.15); }
      .flow-node.solar.active { background: rgba(234,179,8,0.15); border-color: rgba(234,179,8,0.3); box-shadow: 0 0 12px rgba(234,179,8,0.15); }
      .flow-node.solar ha-icon { color: #eab308; }
      .flow-node.house { background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); }
      .flow-node.house ha-icon { color: #3b82f6; }
      .flow-node.grid { background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.15); }
      .flow-node.grid.active { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.3); }
      .flow-node.grid ha-icon { color: #8b5cf6; }
      .flow-val { font-size: 17px; font-weight: 700; color: var(--primary-text-color); }
      .flow-node small { font-size: 11px; color: var(--secondary-text-color); }
      .flow-arrow { display: flex; align-items: center; }
      .arrow-line { display: flex; align-items: center; padding: 4px 6px; border-radius: 8px; opacity: 0.3; }
      .arrow-line.export { color: #22c55e; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.import { color: #ef4444; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.idle { color: var(--secondary-text-color); }
      .arrow-line ha-icon { --mdc-icon-size: 20px; }
      @keyframes flowPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

      /* Section headers */
      .section-header { display: flex; align-items: center; justify-content: space-between; padding: 6px 4px; cursor: pointer; margin-bottom: 6px; }
      .section-header:hover { opacity: 0.8; }
      .section-title { font-size: 13px; font-weight: 600; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
      .section-header ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }

      /* Phases */
      .phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
      .phase-card { padding: 10px; border-radius: 12px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); cursor: pointer; transition: all 0.2s; }
      .phase-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); }
      .phase-header { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
      .phase-label { width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; background: rgba(59,130,246,0.15); color: #60a5fa; }
      .phase-name { flex: 1; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .phase-power { font-size: 14px; font-weight: 700; white-space: nowrap; }
      .phase-power.export { color: #22c55e; }
      .phase-power.import { color: #ef4444; }
      .phase-details { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
      .pd { display: flex; align-items: center; gap: 4px; }
      .pd ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .pd span { font-size: 11px; color: var(--secondary-text-color); }
      .phase-energy { display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.04); }
      .ein, .eout { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--secondary-text-color); }
      .phase-energy ha-icon { --mdc-icon-size: 12px; }
      .ein ha-icon { color: #ef4444; }
      .eout ha-icon { color: #22c55e; }

      /* Totals */
      .totals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 14px; }
      .total-item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); cursor: pointer; }
      .total-item:hover { background: rgba(255,255,255,0.05); }
      .total-item ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); flex-shrink: 0; }
      .tl { flex: 1; font-size: 11px; color: var(--secondary-text-color); }
      .tv { font-size: 13px; font-weight: 600; color: var(--primary-text-color); }

      /* Energy */
      .energy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
      .ec { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
      .ec:hover { opacity: 0.85; }
      .ec.consumed { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.1); }
      .ec.consumed ha-icon { color: #ef4444; }
      .ec.grid-in { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.1); }
      .ec.grid-in ha-icon { color: #f59e0b; }
      .ec.returned { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.1); }
      .ec.returned ha-icon { color: #22c55e; }
      .ec.hp { background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.1); }
      .ec.hp ha-icon { color: #06b6d4; }
      .ec ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }
      .ei { display: flex; flex-direction: column; }
      .el { font-size: 11px; color: var(--secondary-text-color); }
      .ev { font-size: 14px; font-weight: 700; color: var(--primary-text-color); }

      /* Costs */
      .costs { padding: 10px 14px; border-radius: 10px; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.1); margin-bottom: 14px; cursor: pointer; }
      .costs:hover { background: rgba(34,197,94,0.08); }
      .cost-row { display: flex; align-items: center; gap: 8px; }
      .cost-row ha-icon { --mdc-icon-size: 18px; color: #22c55e; }
      .cost-row span:first-of-type { flex: 1; font-size: 13px; color: var(--secondary-text-color); }
      .cost-val { font-size: 16px; font-weight: 700; color: #22c55e; }
      .cost-row.small { margin-top: 4px; }
      .cost-row.small ha-icon { display: none; }
      .cost-note { font-size: 11px; color: var(--secondary-text-color); }

      /* Device */
      .device-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
      .di { display: flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); }
      .di ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .di span { font-size: 11px; color: var(--secondary-text-color); }
      .di.good ha-icon { color: #22c55e; }
      .di.ok ha-icon { color: #f59e0b; }
      .di.weak ha-icon { color: #ef4444; }
      .di.warn { background: rgba(245,158,11,0.08); }
      .di.warn ha-icon { color: #f59e0b; }
      .di.warn span { color: #f59e0b; }

      /* Controls */
      .controls { display: flex; gap: 8px; margin-bottom: 14px; }
      .ctrl { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); cursor: pointer; transition: all 0.2s; }
      .ctrl:hover { background: rgba(255,255,255,0.08); }
      .ctrl.on { border-color: rgba(34,197,94,0.3); }
      .ctrl ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }
      .ctrl span { font-size: 12px; color: var(--secondary-text-color); }

      .footer { display: flex; justify-content: flex-end; padding: 8px 16px; border-top: 1px solid rgba(255,255,255,0.04); font-size: 11px; color: var(--secondary-text-color); }

      @media (max-width: 420px) {
        .phases { grid-template-columns: 1fr; }
        .energy-grid, .totals-grid { grid-template-columns: 1fr; }
        .flow { flex-wrap: wrap; }
      }
    `}};t([pt({attribute:!1})],Et.prototype,"hass",void 0),t([pt({attribute:!1})],Et.prototype,"config",void 0),t([_t()],Et.prototype,"_showPhaseDetails",void 0),t([_t()],Et.prototype,"_showTotals",void 0),Et=t([lt(vt)],Et);let St=class extends nt{constructor(){super(...arguments),this._section="general"}setConfig(t){this._config={...t}}_u(t,e){this._config={...this._config,[t]:e},ft(this,"config-changed",{config:this._config})}_ue(t,e){const s={...this._config.entities||{}};e?s[t]=e:delete s[t],this._u("entities",s)}_ul(t,e){const s={...this._config.phase_labels||{}};s[t]=e,this._u("phase_labels",s)}_getDeviceHint(){if(!this.hass)return"";const t=Object.keys(this.hass.states).find(t=>t.startsWith("sensor.")&&t.endsWith("_phase_a_active_power"));return t?t.replace("sensor.","").replace("_phase_a_active_power",""):""}render(){if(!this.hass||!this._config)return B;const t=this._getDeviceHint(),e=this._config.entities||{};return q`
      <div class="tabs">${[{k:"general",l:"General",i:"mdi:cog"},{k:"phases",l:"Faze",i:"mdi:flash"},{k:"totals",l:"Totaluri",i:"mdi:counter"},{k:"energy",l:"Energie",i:"mdi:solar-power"},{k:"device",l:"Device",i:"mdi:chip"}].map(t=>q`
        <div class="tab ${this._section===t.k?"active":""}" @click=${()=>{this._section=t.k}}>
          <ha-icon .icon=${t.i}></ha-icon><span>${t.l}</span>
        </div>`)}</div>

      ${t?q`<div class="hint ok"><ha-icon icon="mdi:magnify"></ha-icon><span>Device detectat: <strong>${t}</strong></span></div>`:q`<div class="hint warn"><ha-icon icon="mdi:alert"></ha-icon><span>Nu s-a detectat un Shelly Pro 3EM. Completează manual.</span></div>`}

      <div class="cfg">
        ${"general"===this._section?q`
          <ha-textfield label="Titlu" .value=${this._config.title||""} @input=${t=>this._u("title",t.target.value)}></ha-textfield>
          ${[["show_header","Header"],["show_flow","Flow Diagram"],["show_phases","Faze"],["show_totals","Totaluri detaliate"],["show_energy","Energie zilnică"],["show_costs","Costuri"],["show_device","Device Info"],["show_controls","Control (reboot, BLE)"]].map(([t,e])=>q`
            <div class="row"><ha-switch .checked=${!1!==this._config[t]&&"show_controls"!==t||!!this._config[t]} @change=${e=>this._u(t,e.target.checked)}></ha-switch><span>${e}</span></div>
          `)}
          <ha-textfield label="Cost kWh (RON)" type="number" .value=${String(this._config.cost_per_kwh||.85)} @input=${t=>this._u("cost_per_kwh",parseFloat(t.target.value))}></ha-textfield>
        `:B}

        ${"phases"===this._section?q`
          <div class="st">Etichete faze</div>
          ${["A","B","C"].map(t=>q`<ha-textfield label="Faza ${t}" .value=${(this._config.phase_labels||{})[t]||""} @input=${e=>this._ul(t,e.target.value)}></ha-textfield>`)}
          <div class="st">Entități per fază <span class="h">(lasă gol = auto)</span></div>
          ${["a","b","c"].flatMap(t=>[`phase_${t}_power`,`phase_${t}_apparent`,`phase_${t}_voltage`,`phase_${t}_current`,`phase_${t}_pf`,`phase_${t}_freq`,`phase_${t}_energy`,`phase_${t}_returned`]).map(t=>q`<ha-textfield label=${t} .value=${e[t]||""} placeholder="auto" @input=${e=>this._ue(t,e.target.value)}></ha-textfield>`)}
        `:B}

        ${"totals"===this._section?q`
          <div class="st">Totaluri Shelly</div>
          ${["total_power","total_apparent","total_current","total_energy","total_returned","total_cost"].map(t=>q`
            <ha-textfield label=${t} .value=${e[t]||""} placeholder="auto" @input=${e=>this._ue(t,e.target.value)}></ha-textfield>`)}
        `:B}

        ${"energy"===this._section?q`
          <div class="st">Contoare zilnice <span class="h">(helper entities)</span></div>
          ${["daily_consumed","daily_grid","daily_return","daily_hp"].map(t=>q`
            <ha-textfield label=${t} .value=${e[t]||""} placeholder="opțional" @input=${e=>this._ue(t,e.target.value)}></ha-textfield>`)}
        `:B}

        ${"device"===this._section?q`
          <div class="st">Device Info <span class="h">(auto)</span></div>
          ${["temperature","rssi","uptime","cloud","restart_required","firmware","beta_firmware","device_tracker"].map(t=>q`
            <ha-textfield label=${t} .value=${e[t]||""} placeholder="auto" @input=${e=>this._ue(t,e.target.value)}></ha-textfield>`)}
          <div class="st">Control <span class="h">(auto)</span></div>
          ${["reboot","ble_integration","monitor_production"].map(t=>q`
            <ha-textfield label=${t} .value=${e[t]||""} placeholder="auto" @input=${e=>this._ue(t,e.target.value)}></ha-textfield>`)}
        `:B}
      </div>
    `}static get styles(){return r`
    .tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; flex-wrap: wrap; }
    .tab { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--secondary-text-color); transition: all 0.2s; }
    .tab:hover { background: rgba(255,255,255,0.05); }
    .tab.active { background: rgba(59,130,246,0.15); color: #60a5fa; }
    .tab ha-icon { --mdc-icon-size: 16px; }
    .cfg { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
    .st { font-size: 14px; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
    .st .h { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }
    .row { display: flex; align-items: center; gap: 12px; }
    .row span { font-size: 14px; color: var(--primary-text-color); }
    ha-textfield { width: 100%; }
    .hint { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; font-size: 12px; margin-bottom: 8px; }
    .hint.ok { background: rgba(34,197,94,0.08); color: #22c55e; }
    .hint.warn { background: rgba(245,158,11,0.08); color: #f59e0b; }
    .hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
  `}};t([pt({attribute:!1})],St.prototype,"hass",void 0),t([pt({attribute:!1})],St.prototype,"config",void 0),t([_t()],St.prototype,"_config",void 0),t([_t()],St.prototype,"_section",void 0),St=t([lt("ha-shelly-smart-meter-editor")],St);var Ct=Object.freeze({__proto__:null,get ShellySmartMeterEditor(){return St}});export{Et as ShellySmartMeterCard};
