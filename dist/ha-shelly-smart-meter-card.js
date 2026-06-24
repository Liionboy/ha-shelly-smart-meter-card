function e(e,t,s,i){var o,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,i);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(r=(a<3?o(r):a>3?o(t,s,r):o(t,s))||r);return a>3&&r&&Object.defineProperty(t,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let a=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new a(s,e,i)},n=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",v=u.reactiveElementPolyfillSupport,m=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},$=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const a=i?.call(this);o?.call(this,t),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...d(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const a=o.fromAttribute(t,e.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(void 0!==e){const a=this.constructor;if(!1===i&&(o=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??$)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==o||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,v?.({ReactiveElement:x}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=e=>e,E=w.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,z=`<${P}>`,M=document,O=()=>M.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,W=/"/g,L=/^(?:script|style|textarea|title)$/i,I=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),q=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),V=new WeakMap,G=M.createTreeWalker(M,129);function J(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const K=(e,t)=>{const s=e.length-1,i=[];let o,a=2===t?"<svg>":3===t?"<math>":"",r=T;for(let t=0;t<s;t++){const s=e[t];let n,c,l=-1,h=0;for(;h<s.length&&(r.lastIndex=h,c=r.exec(s),null!==c);)h=r.lastIndex,r===T?"!--"===c[1]?r=H:void 0!==c[1]?r=D:void 0!==c[2]?(L.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=j):void 0!==c[3]&&(r=j):r===j?">"===c[0]?(r=o??T,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,n=c[1],r=void 0===c[3]?j:'"'===c[3]?W:F):r===W||r===F?r=j:r===H||r===D?r=T:(r=j,o=void 0);const d=r===j&&e[t+1].startsWith("/>")?" ":"";a+=r===T?s+z:l>=0?(i.push(n),s.slice(0,l)+S+s.slice(l)+C+d):s+C+(-2===l?t:d)}return[J(e,a+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Y{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,a=0;const r=e.length-1,n=this.parts,[c,l]=K(e,t);if(this.el=Y.createElement(c,s),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&n.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=l[a++],s=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?te:"?"===r[1]?se:"@"===r[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:o}),i.removeAttribute(e));if(L.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],O()),G.nextNode(),n.push({type:2,index:++o});i.append(e[t],O())}}}else if(8===i.nodeType)if(i.data===P)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)n.push({type:7,index:o}),e+=C.length-1}o++}}static createElement(e,t){const s=M.createElement("template");return s.innerHTML=e,s}}function Z(e,t,s=e,i){if(t===q)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const a=U(t)?void 0:t._$litDirective$;return o?.constructor!==a&&(o?._$AO?.(!1),void 0===a?o=void 0:(o=new a(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=Z(e,o._$AS(e,t.values),o,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);G.currentNode=i;let o=G.nextNode(),a=0,r=0,n=s[0];for(;void 0!==n;){if(a===n.index){let t;2===n.type?t=new X(o,o.nextSibling,this,e):1===n.type?t=new n.ctor(o,n.name,n.strings,this,e):6===n.type&&(t=new oe(o,this,e)),this._$AV.push(t),n=s[++r]}a!==n?.index&&(o=G.nextNode(),a++)}return G.currentNode=M,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),U(e)?e===B||null==e||""===e?(this._$AH!==B&&this._$AR(),this._$AH=B):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==B&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Y.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Y(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new X(this.O(O()),this.O(O()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=A(e).nextSibling;A(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(e,t=this,s,i){const o=this.strings;let a=!1;if(void 0===o)e=Z(this,e,t,0),a=!U(e)||e!==this._$AH&&e!==q,a&&(this._$AH=e);else{const i=e;let r,n;for(e=o[0],r=0;r<o.length-1;r++)n=Z(this,i[s+r],t,r),n===q&&(n=this._$AH[r]),a||=!U(n)||n!==this._$AH[r],n===B?e=B:e!==B&&(e+=(n??"")+o[r+1]),this._$AH[r]=n}a&&!i&&this.j(e)}j(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===B?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==B)}}class ie extends ee{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??B)===q)return;const s=this._$AH,i=e===B&&s!==B||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ae=w.litHtmlPolyfillSupport;ae?.(Y,X),(w.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new X(t.insertBefore(O(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ne._$litElement$=!0,ne.finalized=!0,re.litElementHydrateSupport?.({LitElement:ne});const ce=re.litElementPolyfillSupport;ce?.({LitElement:ne}),(re.litElementVersions??=[]).push("4.2.2");const le=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},de=(e=he,t,s)=>{const{kind:i,metadata:o}=s;let a=globalThis.litPropertyMetadata.get(o);if(void 0===a&&globalThis.litPropertyMetadata.set(o,a=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),a.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const o=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,o,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];t.call(this,s),this.requestUpdate(i,o,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pe(e){return(t,s)=>"object"==typeof s?de(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function _e(e){return pe({...e,state:!0,attribute:!1})}var ue,ge;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ue||(ue={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ge||(ge={}));const fe=(e,t,s,i)=>{i=i||{},s=null==s?{}:s;const o=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,e.dispatchEvent(o),o},ve="ha-shelly-smart-meter-card";console.info("%c ⚡ SHELLY-SMART-METER-CARD %c v1.1.0 ","color:#fff;background:#f59e0b;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;","color:#fff;background:#6b7280;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;");const me={phase_a_power:"_phase_a_active_power",phase_a_voltage:"_phase_a_voltage",phase_a_current:"_phase_a_current",phase_a_pf:"_phase_a_power_factor",phase_a_freq:"_phase_a_frequency",phase_a_energy:"_phase_a_total_active_energy",phase_a_returned:"_phase_a_total_active_returned_energy",phase_b_power:"_phase_b_active_power",phase_b_voltage:"_phase_b_voltage",phase_b_current:"_phase_b_current",phase_b_pf:"_phase_b_power_factor",phase_b_freq:"_phase_b_frequency",phase_b_energy:"_phase_b_total_active_energy",phase_b_returned:"_phase_b_total_active_returned_energy",phase_c_power:"_phase_c_active_power",phase_c_voltage:"_phase_c_voltage",phase_c_current:"_phase_c_current",phase_c_pf:"_phase_c_power_factor",phase_c_freq:"_phase_c_frequency",phase_c_energy:"_phase_c_total_active_energy",phase_c_returned:"_phase_c_total_active_returned_energy",total_power:"_total_active_power",total_apparent:"_total_apparent_power",total_current:"_total_current",total_energy:"_total_active_energy",total_returned:"_total_active_returned_energy",temperature:"_temperature",rssi:"_rssi",uptime:"_uptime"},ye={A:"Faza A",B:"Faza B",C:"Faza C"};let $e=null;function be(e){if($e)return $e;const t=Object.keys(e.states).find(e=>e.startsWith("sensor.")&&e.endsWith("_phase_a_active_power"));if(!t)return{};const s=t.replace("sensor.","").replace("_phase_a_active_power",""),i={};for(const[t,o]of Object.entries(me)){const a=`sensor.${s}${o}`;e.states[a]&&(i[t]=a)}const o=`binary_sensor.${s}_cloud`;e.states[o]&&(i.cloud=o);const a=`update.${s}_firmware_update`;return e.states[a]&&(i.firmware=a),$e=i,i}let xe=class extends ne{constructor(){super(...arguments),this._showAllPhases=!1}static async getConfigElement(){return await Promise.resolve().then(function(){return Ae}),document.createElement("ha-shelly-smart-meter-editor")}static getStubConfig(){return{type:ve,title:"⚡ Smart Meter",show_header:!0,show_phases:!0,show_energy:!0,show_costs:!0,show_device:!0,show_flow:!0,cost_per_kwh:.85,entities:{},phase_labels:ye}}setConfig(e){if(!e)throw new Error("Invalid config");$e=null,this.config={...e,type:ve,title:e.title||"⚡ Smart Meter",show_header:e.show_header??!0,show_phases:e.show_phases??!0,show_energy:e.show_energy??!0,show_costs:e.show_costs??!0,show_device:e.show_device??!0,show_flow:e.show_flow??!0,cost_per_kwh:e.cost_per_kwh??.85,entities:e.entities||{},phase_labels:{...ye,...e.phase_labels}}}_resolve(e){const t=this.config.entities?.[e];if(t)return t;if(this.hass){const t=be(this.hass);if(t[e])return t[e]}return""}_s(e){const t=this._resolve(e);return t?this.hass?.states[t]?.state:void 0}_n(e){const t=parseFloat(this._s(e)||"");return isNaN(t)?0:t}_e(e){return this._resolve(e)}_unit(e){const t=this._resolve(e);return t&&this.hass?.states[t]?.attributes?.unit_of_measurement||""}_changed(e){const t=this._resolve(e);if(!t)return"";const s=this.hass?.states[t];if(!s?.last_changed)return"";const i=Math.floor((Date.now()-new Date(s.last_changed).getTime())/6e4);if(i<1)return"acum";if(i<60)return`${i} min`;const o=Math.floor(i/60);return o<24?`${o}h ${i%60}min`:`${Math.floor(o/24)}z ${o%24}h`}_handleMore(e){e&&fe(this,"hass-more-info",{entityId:e})}_fmt(e,t=1){return Math.abs(e)>=1e3?(e/1e3).toFixed(t)+"k":e.toFixed(t)}getCardSize(){return 6}render(){if(!this.config||!this.hass)return B;const e=this.hass?be(this.hass):{},t=Object.keys(e).length>0,s=Object.keys(this.config.entities||{}).length>0;if(!t&&!s)return I`
        <ha-card>
          <div class="header importing">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">Shelly Smart Meter</div>
              <div class="header-sub">Nu s-au găsit entități Shelly Pro 3EM</div>
            </div>
          </div>
          <div class="content">
            <div class="no-device">
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <p>Nu am detectat automat un Shelly Pro 3EM.</p>
              <p>Adaugă entitățile manual în config sau verifică că device-ul este integrat în Home Assistant.</p>
              <code>type: custom:ha-shelly-smart-meter-card<br>entities:<br>&nbsp;&nbsp;phase_a_power: sensor.numele_tau_phase_a_active_power</code>
            </div>
          </div>
        </ha-card>
      `;const i=this._n("total_power"),o=i<0,a=Math.abs(Math.round(i)),r=["a","b","c"].map(e=>({key:e.toUpperCase(),label:this.config.phase_labels?.[e.toUpperCase()]||`Faza ${e.toUpperCase()}`,power:this._n(`phase_${e}_power`),voltage:this._n(`phase_${e}_voltage`),current:this._n(`phase_${e}_current`),pf:this._n(`phase_${e}_pf`),freq:this._n(`phase_${e}_freq`),energy:this._n(`phase_${e}_energy`),returned:this._n(`phase_${e}_returned`)})),n=this._n("daily_consumed"),c=this._n("daily_grid"),l=this._n("daily_return"),h=this._n("total_energy"),d=this._n("total_returned"),p=this.config.cost_per_kwh||.85,_=c*p,u=this._s("temperature"),g=this._n("rssi"),f="on"===this._s("cloud");return I`
      <ha-card>
        <!-- HEADER -->
        ${!1!==this.config.show_header?I`
          <div class="header ${o?"exporting":"importing"}">
            <div class="header-icon">⚡</div>
            <div class="header-text">
              <div class="header-title">${this.config.title||"Smart Meter"}</div>
              <div class="header-sub">
                ${o?`↗ Export ${a}W în rețea`:i>50?`↙ Import ${a}W din rețea`:"⚖ Consum echilibrat"}
              </div>
            </div>
            <div class="power-badge ${o?"export":"import"}">
              ${o?"↗":"↙"} ${a}W
            </div>
          </div>
        `:B}

        <div class="content">
          <!-- FLOW DIAGRAM -->
          ${!1!==this.config.show_flow?I`
            <div class="flow">
              <div class="flow-node solar ${o?"active":""}">
                <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                <span class="flow-val">${o?a:0}W</span>
                <small>Solar</small>
              </div>

              <div class="flow-arrow">
                <div class="arrow-line ${o?"export":i>50?"import":"idle"}">
                  <ha-icon icon=${o?"mdi:arrow-right-bold":i>50?"mdi:arrow-left-bold":"mdi:swap-horizontal"}></ha-icon>
                </div>
              </div>

              <div class="flow-node house">
                <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
                <span class="flow-val">${Math.round(this._n("total_apparent")||a)}W</span>
                <small>Consum</small>
              </div>

              <div class="flow-arrow">
                <div class="arrow-line ${!o&&i>50?"import":o?"export":"idle"}">
                  <ha-icon icon=${!o&&i>50?"mdi:arrow-left-bold":"mdi:arrow-right-bold"}></ha-icon>
                </div>
              </div>

              <div class="flow-node grid ${!o&&i>50?"active":""}">
                <ha-icon icon="mdi:transmission-tower"></ha-icon>
                <span class="flow-val">${!o&&i>50||o?a:0}W</span>
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
              ${r.map(e=>{const t=Math.round(e.power),s=t<0;return I`
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
          ${!1!==this.config.show_energy&&(this._e("daily_consumed")||this._e("daily_return")||h)?I`
            <div class="energy-section">
              <div class="energy-grid">
                ${this._e("daily_consumed")?I`
                  <div class="energy-card consumed" @click=${()=>this._handleMore(this._e("daily_consumed"))}>
                    <ha-icon icon="mdi:counter"></ha-icon>
                    <div class="energy-info">
                      <span class="energy-label">Consum azi</span>
                      <span class="energy-val">${n.toFixed(2)} kWh</span>
                    </div>
                  </div>
                `:B}
                ${this._e("daily_return")?I`
                  <div class="energy-card returned" @click=${()=>this._handleMore(this._e("daily_return"))}>
                    <ha-icon icon="mdi:solar-power"></ha-icon>
                    <div class="energy-info">
                      <span class="energy-label">Returnat azi</span>
                      <span class="energy-val">${l.toFixed(2)} kWh</span>
                    </div>
                  </div>
                `:B}
                <div class="energy-card total-in" @click=${()=>this._handleMore(this._e("total_energy"))}>
                  <ha-icon icon="mdi:meter-electric"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total consumat</span>
                    <span class="energy-val">${this._fmt(h)} kWh</span>
                  </div>
                </div>
                <div class="energy-card total-out" @click=${()=>this._handleMore(this._e("total_returned"))}>
                  <ha-icon icon="mdi:flash-outline"></ha-icon>
                  <div class="energy-info">
                    <span class="energy-label">Total returnat</span>
                    <span class="energy-val">${this._fmt(d)} kWh</span>
                  </div>
                </div>
              </div>
            </div>
          `:B}

          <!-- COSTS -->
          ${!1!==this.config.show_costs&&this._e("daily_grid")?I`
            <div class="costs" @click=${()=>this._handleMore(this._e("daily_grid"))}>
              <div class="cost-row">
                <ha-icon icon="mdi:cash"></ha-icon>
                <span>Cost estimat azi (rețea)</span>
                <span class="cost-val">${_.toFixed(2)} RON</span>
              </div>
              <div class="cost-row small">
                <span></span>
                <span class="cost-note">${c.toFixed(2)} kWh × ${p} RON/kWh</span>
                ${this._e("total_cost")?I`
                  <span class="cost-note">Total: ${parseFloat(this._s("total_cost")||"0").toFixed(2)} RON</span>
                `:B}
              </div>
            </div>
          `:B}

          <!-- DEVICE INFO -->
          ${!1!==this.config.show_device&&(u||g)?I`
            <div class="device">
              ${u?I`
                <div class="device-item">
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <span>${u}°C</span>
                </div>
              `:B}
              ${g?I`
                <div class="device-item ${g<-75?"weak":g<-60?"ok":"good"}">
                  <ha-icon icon="mdi:wifi"></ha-icon>
                  <span>${g} dBm</span>
                </div>
              `:B}
              ${this._e("cloud")?I`
                <div class="device-item">
                  <ha-icon icon=${f?"mdi:cloud-check":"mdi:cloud-off-outline"}></ha-icon>
                  <span>${f?"Cloud":"Local"}</span>
                </div>
              `:B}
            </div>
          `:B}
        </div>

        <div class="footer">
          <span>Update: ${this._changed("total_power")}</span>
        </div>
      </ha-card>
    `}static get styles(){return r`
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

      /* No device found */
      .no-device {
        display: flex; flex-direction: column; align-items: center;
        gap: 8px; padding: 24px 16px; text-align: center;
      }
      .no-device ha-icon { --mdc-icon-size: 40px; color: var(--secondary-text-color); }
      .no-device p { margin: 0; font-size: 13px; color: var(--secondary-text-color); }
      .no-device code {
        display: block; margin-top: 8px; padding: 12px; border-radius: 8px;
        background: rgba(255,255,255,0.04); font-size: 11px; text-align: left;
        color: var(--secondary-text-color); white-space: pre-wrap;
      }

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
    `}};e([pe({attribute:!1})],xe.prototype,"hass",void 0),e([pe({attribute:!1})],xe.prototype,"config",void 0),e([_e()],xe.prototype,"_showAllPhases",void 0),xe=e([le(ve)],xe);let we=class extends ne{constructor(){super(...arguments),this._section="general"}setConfig(e){this._config={...e}}_update(e,t){this._config={...this._config,[e]:t},fe(this,"config-changed",{config:this._config})}_updateEntity(e,t){const s={...this._config.entities||{}};t?s[e]=t:delete s[e],this._update("entities",s)}_updatePhaseLabel(e,t){const s={...this._config.phase_labels||{}};s[e]=t,this._update("phase_labels",s)}_getDeviceHint(){if(!this.hass)return"";const e=Object.keys(this.hass.states).find(e=>e.startsWith("sensor.")&&e.endsWith("_phase_a_active_power"));return e?e.replace("sensor.","").replace("_phase_a_active_power",""):""}render(){if(!this.hass||!this._config)return B;const e=this._getDeviceHint(),t=this._config.entities||{};return I`
      <div class="tabs">
        ${[{key:"general",label:"General",icon:"mdi:cog"},{key:"phases",label:"Faze",icon:"mdi:flash"},{key:"energy",label:"Energie",icon:"mdi:counter"},{key:"device",label:"Device",icon:"mdi:chip"}].map(e=>I`
          <div class="tab ${this._section===e.key?"active":""}" @click=${()=>{this._section=e.key}}>
            <ha-icon .icon=${e.icon}></ha-icon>
            <span>${e.label}</span>
          </div>
        `)}
      </div>

      ${e?I`
        <div class="discovery-hint">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <span>Device detectat: <strong>${e}</strong> — entitățile se completează automat</span>
        </div>
      `:I`
        <div class="discovery-hint warn">
          <ha-icon icon="mdi:alert"></ha-icon>
          <span>Nu s-a detectat automat un Shelly Pro 3EM. Completează entitățile manual.</span>
        </div>
      `}

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
          <div class="section-title">Entități faze <span class="hint">(lasă gol pentru auto-discovery)</span></div>
          ${["a","b","c"].flatMap(e=>[`phase_${e}_power`,`phase_${e}_voltage`,`phase_${e}_current`,`phase_${e}_pf`,`phase_${e}_freq`,`phase_${e}_energy`,`phase_${e}_returned`]).map(e=>I`
            <ha-textfield label=${e} .value=${t[e]||""} placeholder="auto" @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}

        ${"energy"===this._section?I`
          <div class="section-title">Totaluri</div>
          ${["total_power","total_apparent","total_current","total_energy","total_returned"].map(e=>I`
            <ha-textfield label=${e} .value=${t[e]||""} placeholder="auto" @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
          <div class="section-title">Contoare zilnice <span class="hint">(helper entities — necesită config manual)</span></div>
          ${["daily_consumed","daily_grid","daily_return","total_cost"].map(e=>I`
            <ha-textfield label=${e} .value=${t[e]||""} placeholder="opțional" @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}

        ${"device"===this._section?I`
          <div class="section-title">Device Info <span class="hint">(lasă gol pentru auto-discovery)</span></div>
          ${["temperature","rssi","uptime","cloud","firmware"].map(e=>I`
            <ha-textfield label=${e} .value=${t[e]||""} placeholder="auto" @input=${t=>this._updateEntity(e,t.target.value)}></ha-textfield>
          `)}
        `:B}
      </div>
    `}static get styles(){return r`
      .tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; }
      .tab { display: flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 13px; color: var(--secondary-text-color); transition: all 0.2s; }
      .tab:hover { background: rgba(255,255,255,0.05); }
      .tab.active { background: rgba(59,130,246,0.15); color: #60a5fa; }
      .tab ha-icon { --mdc-icon-size: 16px; }
      .config { display: flex; flex-direction: column; gap: 12px; padding: 4px 0; }
      .section-title { font-size: 14px; font-weight: 600; color: var(--primary-text-color); margin-top: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; }
      .section-title .hint { font-size: 11px; font-weight: 400; color: var(--secondary-text-color); }
      .row { display: flex; align-items: center; gap: 12px; }
      .row span { font-size: 14px; color: var(--primary-text-color); }
      ha-textfield { width: 100%; }
      .discovery-hint { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: rgba(34,197,94,0.08); font-size: 12px; color: #22c55e; margin-bottom: 8px; }
      .discovery-hint.warn { background: rgba(245,158,11,0.08); color: #f59e0b; }
      .discovery-hint ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }
    `}};e([pe({attribute:!1})],we.prototype,"hass",void 0),e([pe({attribute:!1})],we.prototype,"config",void 0),e([_e()],we.prototype,"_config",void 0),e([_e()],we.prototype,"_section",void 0),we=e([le("ha-shelly-smart-meter-editor")],we);var Ae=Object.freeze({__proto__:null,get ShellySmartMeterEditor(){return we}});export{xe as ShellySmartMeterCard};
