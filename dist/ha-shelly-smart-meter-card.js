function e(e,t,s,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(a=(r<3?o(a):r>3?o(t,s,a):o(t,s))||a);return r>3&&a&&Object.defineProperty(t,s,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new r(s,e,i)},n=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",m=g.reactiveElementPolyfillSupport,v=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},y=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);o?.call(this,t),this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=i;const r=o.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(void 0!==e){const r=this.constructor;if(!1===i&&(o=this[e]),s??=r.getPropertyOptions(e),!((s.hasChanged??y)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==o||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=e=>e,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,z=`<${P}>`,M=document,O=()=>M.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,D=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,W=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,G=M.createTreeWalker(M,129);function J(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const s=e.length-1,i=[];let o,r=2===t?"<svg>":3===t?"<math>":"",a=H;for(let t=0;t<s;t++){const s=e[t];let n,c,l=-1,h=0;for(;h<s.length&&(a.lastIndex=h,c=a.exec(s),null!==c);)h=a.lastIndex,a===H?"!--"===c[1]?a=N:void 0!==c[1]?a=D:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),a=j):void 0!==c[3]&&(a=j):a===j?">"===c[0]?(a=o??H,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,n=c[1],a=void 0===c[3]?j:'"'===c[3]?W:F):a===W||a===F?a=j:a===N||a===D?a=H:(a=j,o=void 0);const d=a===j&&e[t+1].startsWith("/>")?" ":"";r+=a===H?s+z:l>=0?(i.push(n),s.slice(0,l)+k+s.slice(l)+C+d):s+C+(-2===l?t:d)}return[J(e,r+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Y{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,r=0;const a=e.length-1,n=this.parts,[c,l]=K(e,t);if(this.el=Y.createElement(c,s),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(k)){const t=l[r++],s=i.getAttribute(e).split(C),a=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:a[2],strings:s,ctor:"."===a[1]?te:"?"===a[1]?se:"@"===a[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:o}),i.removeAttribute(e));if(L.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],O()),G.nextNode(),n.push({type:2,index:++o});i.append(e[t],O())}}}else if(8===i.nodeType)if(i.data===P)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)n.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,i){if(t===q)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=U(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);G.currentNode=i;let o=G.nextNode(),r=0,a=0,n=s[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new X(o,o.nextSibling,this,e):1===n.type?t=new n.ctor(o,n.name,n.strings,this,e):6===n.type&&(t=new oe(o,this,e)),this._$AV.push(t),n=s[++a]}r!==n?.index&&(o=G.nextNode(),r++)}return G.currentNode=M,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),U(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Y(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(e,t=this,s,i){const o=this.strings;let r=!1;if(void 0===o)e=Z(this,e,t,0),r=!U(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const i=e;let a,n;for(e=o[0],a=0;a<o.length-1;a++)n=Z(this,i[s+a],t,a),n===q&&(n=this._$AH[a]),r||=!U(n)||n!==this._$AH[a],n===B?e=B:e!==B&&(e+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!i&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ie extends ee{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??B)===q)return;const s=this._$AH,i=e===B&&s!==B||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=w.litHtmlPolyfillSupport;re?.(Y,X),(w.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new X(t.insertBefore(O(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ne._$litElement$=!0,ne.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ne});const ce=ae.litElementPolyfillSupport;ce?.({LitElement:ne}),(ae.litElementVersions??=[]).push("4.2.2");const le=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},de=(e=he,t,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const o=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,o,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];t.call(this,s),this.requestUpdate(i,o,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pe(e){return(t,s)=>"object"==typeof s?de(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function _e(e){return pe({...e,state:!0,attribute:!1})}var ge,ue;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ge||(ge={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ue||(ue={}));const fe=(e,t,s,i)=>{i=i||{},s=null==s?{}:s;const o=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,e.dispatchEvent(o),o},me="ha-shelly-smart-meter-card";console.info("%c ⚡ SHELLY-SMART-METER-CARD %c v1.0.0 ","color:#fff;background:#f59e0b;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#fff;background:#6b7280;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");const ve={phase_a_power:"sensor.smartmetersolar_phase_a_active_power",phase_a_voltage:"sensor.smartmetersolar_phase_a_voltage",phase_a_current:"sensor.smartmetersolar_phase_a_current",phase_a_pf:"sensor.smartmetersolar_phase_a_power_factor",phase_a_freq:"sensor.smartmetersolar_phase_a_frequency",phase_a_energy:"sensor.smartmetersolar_phase_a_total_active_energy",phase_a_returned:"sensor.smartmetersolar_phase_a_total_active_returned_energy",phase_b_power:"sensor.smartmetersolar_phase_b_active_power",phase_b_voltage:"sensor.smartmetersolar_phase_b_voltage",phase_b_current:"sensor.smartmetersolar_phase_b_current",phase_b_pf:"sensor.smartmetersolar_phase_b_power_factor",phase_b_freq:"sensor.smartmetersolar_phase_b_frequency",phase_b_energy:"sensor.smartmetersolar_phase_b_total_active_energy",phase_b_returned:"sensor.smartmetersolar_phase_b_total_active_returned_energy",phase_c_power:"sensor.smartmetersolar_phase_c_active_power",phase_c_voltage:"sensor.smartmetersolar_phase_c_voltage",phase_c_current:"sensor.smartmetersolar_phase_c_current",phase_c_pf:"sensor.smartmetersolar_phase_c_power_factor",phase_c_freq:"sensor.smartmetersolar_phase_c_frequency",phase_c_energy:"sensor.smartmetersolar_phase_c_total_active_energy",phase_c_returned:"sensor.smartmetersolar_phase_c_total_active_returned_energy",total_power:"sensor.smartmetersolar_total_active_power",total_apparent:"sensor.smartmetersolar_total_apparent_power",total_current:"sensor.smartmetersolar_total_current",total_energy:"sensor.smartmetersolar_total_active_energy",total_returned:"sensor.smartmetersolar_total_active_returned_energy",daily_consumed:"sensor.consum_zilnic_energy_casa",daily_grid:"sensor.consum_zilnic_grid",daily_return:"sensor.shelly_daily_return_grid",total_cost:"sensor.smartmetersolar_total_active_energy_cost",temperature:"sensor.smartmetersolar_temperature",rssi:"sensor.smartmetersolar_rssi",uptime:"sensor.smartmetersolar_uptime",cloud:"binary_sensor.smartmetersolar_cloud",firmware:"update.smartmetersolar_firmware_update"},$e={A:"Casa",B:"Pompă Căldură",C:"Plită"};let ye=class extends ne{constructor(){super(...arguments),this._showAllPhases=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return xe}),document.createElement("ha-shelly-smart-meter-editor")}static getStubConfig(){return{type:me,title:"⚡ Smart Meter Solar",show_header:!0,show_phases:!0,show_energy:!0,show_costs:!0,show_device:!0,show_flow:!0,cost_per_kwh:.85,entities:ve,phase_labels:$e}}setConfig(e){if(!e)throw new Error("Invalid config");this.config={...e,type:me,title:e.title||"⚡ Smart Meter Solar",show_header:e.show_header??!0,show_phases:e.show_phases??!0,show_energy:e.show_energy??!0,show_costs:e.show_costs??!0,show_device:e.show_device??!0,show_flow:e.show_flow??!0,cost_per_kwh:e.cost_per_kwh??.85,entities:{...ve,...e.entities},phase_labels:{...$e,...e.phase_labels}}}_s(e){return this.hass?.states[this.config.entities?.[e]||""]?.state}_n(e){const t=parseFloat(this._s(e)||"");return isNaN(t)?0:t}_e(e){return this.config.entities?.[e]||""}_unit(e){return this.hass?.states[this.config.entities?.[e]||""]?.attributes?.unit_of_measurement||""}_changed(e){const t=this.hass?.states[this.config.entities?.[e]||""];if(!t?.last_changed)return"";const s=Math.floor((Date.now()-new Date(t.last_changed).getTime())/6e4);if(s<1)return"acum";if(s<60)return`${s} min`;const i=Math.floor(s/60);return i<24?`${i}h ${s%60}min`:`${Math.floor(i/24)}z ${i%24}h`}_handleMore(e){fe(this,"hass-more-info",{entityId:e})}_fmt(e,t=1){return Math.abs(e)>=1e3?(e/1e3).toFixed(t)+"k":e.toFixed(t)}getCardSize(){return 6}render(){if(!this.config||!this.hass)return B;const e=this._n("total_power"),t=e<0,s=Math.abs(Math.round(e)),i=["a","b","c"].map(e=>({key:e.toUpperCase(),label:this.config.phase_labels?.[e.toUpperCase()]||e.toUpperCase(),power:this._n(`phase_${e}_power`),voltage:this._n(`phase_${e}_voltage`),current:this._n(`phase_${e}_current`),pf:this._n(`phase_${e}_pf`),freq:this._n(`phase_${e}_freq`),energy:this._n(`phase_${e}_energy`),returned:this._n(`phase_${e}_returned`)})),o=this._n("daily_consumed"),r=this._n("daily_grid"),a=this._n("daily_return"),n=this._n("total_energy"),c=this._n("total_returned"),l=this.config.cost_per_kwh||.85,h=r*l,d=this._s("temperature"),p=this._n("rssi"),_="on"===this._s("cloud");return I`
      <ha-card>
        <!-- HEADER -->
        ${!1!==this.config.show_header?I`
          <div class="header ${t?"exporting":"importing"}">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">${this.config.title||"Smart Meter Solar"}</div>
              <div class="header-sub">
                ${t?`↗ Export ${s}W în rețea`:e>50?`↙ Import ${s}W din rețea`:"⚖ Consum echilibrat"}
              </div>
            </div>
            <div class="power-badge ${t?"export":"import"}">
              ${t?"↗":"↙"} ${s}W
            </div>
          </div>
        `:B}

        <div class="content">
          <!-- FLOW DIAGRAM -->
          ${!1!==this.config.show_flow?I`
            <div class="flow">
              <div class="flow-node solar ${t?"active":""}">
                <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                <span class="flow-val">${t?s:0}W</span>
                <small>Solar</small>
              </div>

              <div class="flow-arrow ${t?"to-grid":"from-grid"}">
                <div class="arrow-line ${t?"export":e>50?"import":"idle"}">
                  <ha-icon icon=${t?"mdi:arrow-right-bold":e>50?"mdi:arrow-left-bold":"mdi:swap-horizontal"}></ha-icon>
                </div>
              </div>

              <div class="flow-node house">
                <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
                <span class="flow-val">${Math.round(this._n("total_apparent")||s)}W</span>
                <small>Consum</small>
              </div>

              <div class="flow-arrow ${!t&&e>50?"from-grid":"to-grid"}">
                <div class="arrow-line ${!t&&e>50?"import":t?"export":"idle"}">
                  <ha-icon icon=${!t&&e>50?"mdi:arrow-left-bold":"mdi:arrow-right-bold"}></ha-icon>
                </div>
              </div>

              <div class="flow-node grid ${!t&&e>50?"active":""}">
                <ha-icon icon="mdi:transmission-tower"></ha-icon>
                <span class="flow-val">${!t&&e>50||t?s:0}W</span>
                <small>Rețea</small>
              </div>
            </div>
          `:B}

          <!-- PHASE CARDS -->
          ${!1!==this.config.show_phases?I`
            <div class="phases-header" @click=${()=>{this._showAllPhases=!this._showAllPhases}}>
              <span class="phases-title">Faze</span>
              <ha-icon .icon=${this._showAllPhases?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
            </div>
            <div class="phases">
              ${i.map(e=>{const t=Math.round(e.power),s=t<0;return I`
                  <div class="phase-card" @click=${()=>this._handleMore(this._e(`phase_${e.key.toLowerCase()}_power`))}>
                    <div class="phase-header">
                      <span class="phase-label">${e.key}</span>
                      <span class="phase-name">${e.label}</span>
                      <span class="phase-power ${s?"export":"import"}">
                        ${s?"↗":"↙"} ${Math.abs(t)}W
                      </span>
                    </div>
                    ${this._showAllPhases?I`
                      <div class="phase-details">
                        <div class="phase-detail">
                          <ha-icon icon="mdi:flash"></ha-icon>
                          <span>${e.voltage.toFixed(1)}V</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <span>${e.current.toFixed(2)}A</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:cosine-wave"></ha-icon>
                          <span>PF ${e.pf.toFixed(2)}</span>
                        </div>
                        <div class="phase-detail">
                          <ha-icon icon="mdi:sine-wave"></ha-icon>
                          <span>${e.freq.toFixed(1)}Hz</span>
                        </div>
                      </div>
                      <div class="phase-energy">
                        <span class="energy-in">
                          <ha-icon icon="mdi:transmission-tower-import"></ha-icon>
                          ${e.energy.toFixed(1)} kWh
                        </span>
                        <span class="energy-out">
                          <ha-icon icon="mdi:transmission-tower-export"></ha-icon>
                          ${e.returned.toFixed(1)} kWh
                        </span>
                      </div>
                    `:B}
                  </div>
                `})}
            </div>
          `:B}

          <!-- ENERGY COUNTERS -->
          ${!1!==this.config.show_energy?I`
            <div class="energy-section">
              <div class="energy-grid">
                <div class="energy-card consumed" @click=${()=>this._handleMore(this._e("daily_consumed"))}>
                  <ha-icon icon="mdi:counter"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Consum azi</span>
                    <span class="energy-val">${o.toFixed(2)} kWh</span>
                  </div>
                </div>
                <div class="energy-card returned" @click=${()=>this._handleMore(this._e("daily_return"))}>
                  <ha-icon icon="mdi:solar-power"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Returnat azi</span>
                    <span class="energy-val">${a.toFixed(2)} kWh</span>
                  </div>
                </div>
                <div class="energy-card total-in" @click=${()=>this._handleMore(this._e("total_energy"))}>
                  <ha-icon icon="mdi:meter-electric"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total consumat</span>
                    <span class="energy-val">${this._fmt(n)} kWh</span>
                  </div>
                </div>
                <div class="energy-card total-out" @click=${()=>this._handleMore(this._e("total_returned"))}>
                  <ha-icon icon="mdi:flash-outline"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total returnat</span>
                    <span class="energy-val">${this._fmt(c)} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          `:B}

          <!-- COSTS -->
          ${!1!==this.config.show_costs?I`
            <div class="costs" @click=${()=>this._handleMore(this._e("daily_grid"))}>
              <div class="cost-row">
                <ha-icon icon="mdi:cash"></ha-icon>
                <span>Cost estimat azi (rețea)</span>
                <span class="cost-val">${h.toFixed(2)} RON</span>
              </div>
              <div class="cost-row small">
                <span></span>
                <span class="cost-note">${r.toFixed(2)} kWh × ${l} RON/kWh</span>
                <span class="cost-note">Total: ${this._s("total_cost")?parseFloat(this._s("total_cost")).toFixed(2)+" RON":"—"}</span>
              </div>
            </div>
          `:B}

          <!-- DEVICE INFO -->
          ${!1!==this.config.show_device?I`
            <div class="device">
              <div class="device-item">
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${d||"?"}°C</span>
              </div>
              <div class="device-item ${p<-75?"weak":p<-60?"ok":"good"}">
                <ha-icon icon="mdi:wifi"></ha-icon>
                <span>${p} dBm</span>
              </div>
              <div class="device-item">
                <ha-icon icon=${_?"mdi:cloud-check":"mdi:cloud-off-outline"}></ha-icon>
                <span>${_?"Cloud":"Local"}</span>
              </div>
            </div>
          `:B}
        </div>

        <div class="footer">
          <span>Update: ${this._changed("total_power")}</span>
        </div>
      </ha-card>
    `}static get styles(){return a`
      :host { display: block; }
      ha-card {
        border-radius: 16px;
        overflow: hidden;
        background: var(--card-background-color, #1c1c1e);
      }

      /* Header */
      .header {
        display: flex; align-items: center; gap: 12px;
        padding: 18px 20px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .header.exporting { background: linear-gradient(135deg, rgba(34,197,94,0.08), rgba(234,179,8,0.06)); }
      .header.importing { background: linear-gradient(135deg, rgba(239,68,68,0.06), rgba(245,158,11,0.04)); }
      .header-icon { font-size: 28px; }
      .header-text { flex: 1; }
      .header-title { font-size: 16px; font-weight: 600; color: var(--primary-text-color); }
      .header-sub { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .power-badge {
        padding: 6px 14px; border-radius: 14px;
        font-size: 16px; font-weight: 700;
        letter-spacing: -0.5px;
      }
      .power-badge.export { background: rgba(34,197,94,0.15); color: #22c55e; }
      .power-badge.import { background: rgba(239,68,68,0.12); color: #ef4444; }

      .content { padding: 14px; }

      /* Flow Diagram */
      .flow {
        display: flex; align-items: center; justify-content: center;
        gap: 8px; margin-bottom: 16px; padding: 8px 0;
      }
      .flow-node {
        display: flex; flex-direction: column; align-items: center;
        gap: 4px; padding: 12px 14px; border-radius: 14px;
        min-width: 76px; transition: all 0.3s;
      }
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
      .arrow-line {
        display: flex; align-items: center; padding: 4px 6px;
        border-radius: 8px; opacity: 0.3;
      }
      .arrow-line.export { color: #22c55e; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.import { color: #ef4444; opacity: 1; animation: flowPulse 2s infinite; }
      .arrow-line.idle { color: var(--secondary-text-color); }
      .arrow-line ha-icon { --mdc-icon-size: 20px; }
      @keyframes flowPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

      /* Phases */
      .phases-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 6px 4px; cursor: pointer; margin-bottom: 6px;
      }
      .phases-header:hover { opacity: 0.8; }
      .phases-title { font-size: 13px; font-weight: 600; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.5px; }
      .phases-header ha-icon { --mdc-icon-size: 18px; color: var(--secondary-text-color); }

      .phases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
      .phase-card {
        padding: 10px; border-radius: 12px;
        background: rgba(255,255,255,0.025);
        border: 1px solid rgba(255,255,255,0.06);
        cursor: pointer; transition: all 0.2s;
      }
      .phase-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); }
      .phase-header { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
      .phase-label {
        width: 22px; height: 22px; border-radius: 6px;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 700;
        background: rgba(59,130,246,0.15); color: #60a5fa;
      }
      .phase-name { flex: 1; font-size: 11px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .phase-power { font-size: 14px; font-weight: 700; white-space: nowrap; }
      .phase-power.export { color: #22c55e; }
      .phase-power.import { color: #ef4444; }

      .phase-details { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
      .phase-detail { display: flex; align-items: center; gap: 4px; }
      .phase-detail ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .phase-detail span { font-size: 11px; color: var(--secondary-text-color); }

      .phase-energy { display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.04); }
      .phase-energy .energy-in, .phase-energy .energy-out { display: flex; align-items: center; gap: 3px; font-size: 10px; color: var(--secondary-text-color); }
      .phase-energy ha-icon { --mdc-icon-size: 12px; }
      .energy-in ha-icon { color: #ef4444; }
      .energy-out ha-icon { color: #22c55e; }

      /* Energy Section */
      .energy-section { margin-bottom: 12px; }
      .energy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .energy-card {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 12px; border-radius: 10px;
        cursor: pointer; transition: all 0.2s;
      }
      .energy-card:hover { opacity: 0.85; }
      .energy-card.consumed { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.1); }
      .energy-card.consumed ha-icon { color: #ef4444; }
      .energy-card.returned { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.1); }
      .energy-card.returned ha-icon { color: #22c55e; }
      .energy-card.total-in { background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.1); }
      .energy-card.total-in ha-icon { color: #f59e0b; }
      .energy-card.total-out { background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.1); }
      .energy-card.total-out ha-icon { color: #06b6d4; }
      .energy-card ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }
      .energy-info { display: flex; flex-direction: column; }
      .energy-label { font-size: 11px; color: var(--secondary-text-color); }
      .energy-val { font-size: 14px; font-weight: 700; color: var(--primary-text-color); }

      /* Costs */
      .costs {
        padding: 10px 14px; border-radius: 10px;
        background: rgba(34,197,94,0.05);
        border: 1px solid rgba(34,197,94,0.1);
        margin-bottom: 12px; cursor: pointer;
      }
      .costs:hover { background: rgba(34,197,94,0.08); }
      .cost-row { display: flex; align-items: center; gap: 8px; }
      .cost-row ha-icon { --mdc-icon-size: 18px; color: #22c55e; }
      .cost-row span:first-of-type { flex: 1; font-size: 13px; color: var(--secondary-text-color); }
      .cost-val { font-size: 16px; font-weight: 700; color: #22c55e; }
      .cost-row.small { margin-top: 4px; }
      .cost-row.small ha-icon { display: none; }
      .cost-note { font-size: 11px; color: var(--secondary-text-color); }

      /* Device */
      .device {
        display: flex; align-items: center; justify-content: center;
        gap: 16px; padding: 8px 0;
      }
      .device-item { display: flex; align-items: center; gap: 4px; }
      .device-item ha-icon { --mdc-icon-size: 14px; color: var(--secondary-text-color); }
      .device-item span { font-size: 11px; color: var(--secondary-text-color); }
      .device-item.good ha-icon { color: #22c55e; }
      .device-item.ok ha-icon { color: #f59e0b; }
      .device-item.weak ha-icon { color: #ef4444; }

      /* Footer */
      .footer {
        display: flex; justify-content: flex-end;
        padding: 8px 16px;
        border-top: 1px solid rgba(255,255,255,0.04);
        font-size: 11px; color: var(--secondary-text-color);
      }

      /* Responsive */
      @media (max-width: 420px) {
        .phases { grid-template-columns: 1fr; }
        .energy-grid { grid-template-columns: 1fr; }
        .flow { flex-wrap: wrap; }
      }
    `}};e([pe({attribute:!1})],ye.prototype,"hass",void 0),e([pe({attribute:!1})],ye.prototype,"config",void 0),e([_e()],ye.prototype,"_showAllPhases",void 0),ye=e([le(me)],ye);let be=class extends ne{constructor(){super(...arguments),this._section="general"}setConfig(e){this._config={...e}}_update(e,t){this._config={...this._config,[e]:t},fe(this,"config-changed",{config:this._config})}_updateEntity(e,t){const s={...this._config.entities||{}};s[e]=t,this._update("entities",s)}_updatePhaseLabel(e,t){const s={...this._config.phase_labels||{}};s[e]=t,this._update("phase_labels",s)}render(){if(!this.hass||!this._config)return B;return I`
      <div class="tabs">
        ${[{key:"general",label:"General",icon:"mdi:cog"},{key:"phases",label:"Faze",icon:"mdi:flash"},{key:"energy",label:"Energie",icon:"mdi:counter"},{key:"device",label:"Device",icon:"mdi:chip"}].map(e=>I`
          <div class="tab ${this._section===e.key?"active":""}" @click=${()=>{this._section=e.key}}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </div>
        `)}
      </div>

      <div class="config">
        ${"general"===this._section?I`
          <ha-textfield label="Titlu" .value=${this._config.title||""} @input=${e=>this._update("title",e.target.value)}></ha-textfield>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_header} @change=${e=>this._update("show_header",e.target.checked)}></ha-switch><span>Header</span></div>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_flow} @change=${e=>this._update("show_flow",e.target.checked)}></ha-switch><span>Flow Diagram</span></div>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_phases} @change=${e=>this._update("show_phases",e.target.checked)}></ha-switch><span>Faze</span></div>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_energy} @change=${e=>this._update("show_energy",e.target.checked)}></ha-switch><span>Energie</span></div>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_costs} @change=${e=>this._update("show_costs",e.target.checked)}></ha-switch><span>Costuri</span></div>
          <div class="row"><ha-switch .checked=${!1!==this._config.show_device} @change=${e=>this._update("show_device",e.target.checked)}></ha-switch><span>Device Info</span></div>
          <ha-textfield label="Cost kWh (RON)" type="number" .value=${String(this._config.cost_per_kwh||.85)} @input=${e=>this._update("cost_per_kwh",parseFloat(e.target.value))}></ha-textfield>
        `:B}

        ${"phases"===this._section?I`
          <div class="section-title">Etichete faze</div>
          ${["A","B","C"].map(e=>I`
            <ha-textfield label="Faza ${e}" .value=${(this._config.phase_labels||{})[e]||""} @input=${t=>this._updatePhaseLabel(e,t.target.value)}></ha-textfield>
          `)}
          <div class="section-title">Entități faze</div>
          ${["a","b","c"].flatMap(e=>[`phase_${e}_power`,`phase_${e}_voltage`,`phase_${e}_current`,`phase_${e}_pf`,`phase_${e}_freq`,`phase_${e}_energy`,`phase_${e}_returned`]).map(e=>I`
            <ha-textfield label=${e} .value=${(this._config.entities||{})[e]||""} @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}

        ${"energy"===this._section?I`
          <div class="section-title">Totaluri</div>
          ${["total_power","total_apparent","total_current","total_energy","total_returned"].map(e=>I`
            <ha-textfield label=${e} .value=${(this._config.entities||{})[e]||""} @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
          <div class="section-title">Contoare zilnice</div>
          ${["daily_consumed","daily_grid","daily_return","total_cost"].map(e=>I`
            <ha-textfield label=${e} .value=${(this._config.entities||{})[e]||""} @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}

        ${"device"===this._section?I`
          <div class="section-title">Device Info</div>
          ${["temperature","rssi","uptime","cloud","firmware"].map(e=>I`
            <ha-textfield label=${e} .value=${(this._config.entities||{})[e]||""} @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}
      </div>
    `}static get styles(){return a`
      .tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
      .tab { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--secondary-text-color); transition: all 0.2s; }
      .tab:hover { background: rgba(255,255,255,0.05); }
      .tab.active { background: rgba(59,130,246,0.15); color: #60a5fa; }
      .tab ha-icon { --mdc-icon-size: 16px; }
      .config { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
      .section-title { font-size: 14px; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
      .row { display: flex; align-items: center; gap: 12px; }
      .row span { font-size: 14px; color: var(--primary-text-color); }
      ha-textfield { width: 100%; }
    `}};e([pe({attribute:!1})],be.prototype,"hass",void 0),e([pe({attribute:!1})],be.prototype,"config",void 0),e([_e()],be.prototype,"_config",void 0),e([_e()],be.prototype,"_section",void 0),be=e([le("ha-shelly-smart-meter-editor")],be);var xe=Object.freeze({__proto__:null,get ShellySmartMeterEditor(){return be}});export{ye as ShellySmartMeterCard};
