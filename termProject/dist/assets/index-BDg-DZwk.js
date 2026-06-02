(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();class ue{constructor(){this.currentScene=null}changeScene(e){this.currentScene&&this.currentScene.exit(),this.currentScene=e,this.currentScene&&this.currentScene.enter()}update(e){this.currentScene&&this.currentScene.update(e)}render(){this.currentScene&&this.currentScene.render()}}const E=new ue;class ${constructor(e){this.gl=e}enter(){}exit(){}update(){}render(){}}const ge="modulepreload",fe=function(t){return"/computerGraphics/termProject/"+t},Z={},C=function(e,r,n){let i=Promise.resolve();if(r&&r.length>0){let d=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};var a=d;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");i=d(r.map(h=>{if(h=fe(h),h in Z)return;Z[h]=!0;const u=h.endsWith(".css"),c=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${c}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":ge,u||(g.as="script"),g.crossOrigin="",g.href=h,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((b,v)=>{g.addEventListener("load",b),g.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function s(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})},k="shadowMatch_save",ee={cleared:!1,bestScore:5999,bestStars:0},G={_load(){try{const t=window.localStorage.getItem(k);if(t!==null)return JSON.parse(t)}catch(t){console.error(t)}return{stages:{}}},_save(t){localStorage.setItem(k,JSON.stringify(t))},saveResult(t,{score:e,stars:r}){let n=this._load();t in n.stages?(n.stages[t].bestScore=Math.min(n.stages[t].bestScore,e),n.stages[t].bestStars=Math.max(n.stages[t].bestStars,r)):n.stages[t]={cleared:!0,bestScore:e,bestStars:r},this._save(n)},getResult(t){return this._load().stages[t]??ee},unlockNext(t){let e=this._load().stages;t+1 in e||(e[t+1]=ee)},isUnlocked(t){return t===0||this.getResult(t-1).cleared},reset(){window.localstorage.removeItem(k)}};async function ve(){try{return await(await fetch("/computerGraphics/termProject/data/stageConfig.json")).json()}catch(t){return console.error("Error loading stage config:",t),[]}}const O={_stages:[],async load(){this._stages=await ve()},getAll(){return this._stages},getById(t){return this._stages.find(e=>e.id===t)||null},getTotalCount(){return this._stages.length}};class me{constructor(e){this.selectedStageId=e,this.threestarTime=0}async init(){const e=O.getById(this.selectedStageId);if(!e){console.error(`Stage with ID ${this.selectedStageId} not found!`);return}this.threestarTime=e.threestartime??60}calculate(e,r,n=0){const s=this.threestarTime/.25*(1-.75**r);e+=s;const a=this.threestarTime*2*(1+n);return 1+(e<=this.threestarTime)+(e<=a)}}class te extends ${constructor(e,r){super(e),this.result=r,this.stars=0}async enter(){this.stars=await this._calcStars(),G.saveResult(this.result.stageId,{score:this.result.time,stars:this.stars}),this._buildUI()}exit(){this._removeUI()}update(){}render(){this.gl.clearColor(.05,.05,.05,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}async _calcStars(){const e=new me(this.result.stageId);return await e.init(),await e.calculate(this.result.time,this.result.hintCount)}_padTime(e){const r=String(Math.floor(e/60)).padStart(2,"0"),n=String(Math.floor(e%60)).padStart(2,"0");return`${r}:${n}`}_buildUI(){const{time:e,stageId:r}=this.result,n=this._padTime(e),i="★".repeat(this.stars)+"☆".repeat(3-this.stars),s=this._padTime(G.getResult(r).bestScore);this._ui=document.createElement("div"),this._ui.id="clear-scene",this._ui.innerHTML=`
            <h2>Stage Clear!</h2>
            <p>Stage: ${r+1}</p>
            <div id="clear-stars">${i}</div>
            <p>highscore: ${s}</p>
            <p>Time: ${n}</p>
            <button id="btn-next">Next Stage</button>
            <button id="btn-retry">Retry</button>
            <button id="btn-menu">Menu</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-next").addEventListener("click",()=>{C(async()=>{const{default:a}=await Promise.resolve().then(()=>ie);return{default:a}},void 0).then(({default:a})=>{E.changeScene(new a(this.gl,r+1))})}),r>=O.getTotalCount()-1&&(document.getElementById("btn-next").style.display="none"),document.getElementById("btn-retry").addEventListener("click",()=>{C(async()=>{const{default:a}=await Promise.resolve().then(()=>ie);return{default:a}},void 0).then(({default:a})=>{E.changeScene(new a(this.gl,r))})}),document.getElementById("btn-menu").addEventListener("click",()=>{C(async()=>{const{default:a}=await Promise.resolve().then(()=>he);return{default:a}},void 0).then(({default:a})=>{E.changeScene(new a(this.gl))})})}_removeUI(){this._ui?.remove()}}var N=1e-6,T=typeof Float32Array<"u"?Float32Array:Array;function ae(){var t=new T(9);return T!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function _e(t,e){var r=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],d=e[7],h=e[8],u=e[9],c=e[10],g=e[11],b=e[12],v=e[13],f=e[14],w=e[15],y=r*o-n*a,m=r*l-i*a,p=r*d-s*a,_=n*l-i*o,S=n*d-s*o,R=i*d-s*l,L=h*v-u*b,P=h*f-c*b,F=h*w-g*b,Y=u*f-c*v,I=u*w-g*v,U=c*w-g*f,x=y*U-m*I+p*Y+_*F-S*P+R*L;return x?(x=1/x,t[0]=(o*U-l*I+d*Y)*x,t[1]=(l*F-a*U-d*P)*x,t[2]=(a*I-o*F+d*L)*x,t[3]=(i*I-n*U-s*Y)*x,t[4]=(r*U-i*F+s*P)*x,t[5]=(n*F-r*I-s*L)*x,t[6]=(v*R-f*S+w*_)*x,t[7]=(f*p-b*R-w*m)*x,t[8]=(b*S-v*p+w*y)*x,t):null}function A(){var t=new T(16);return T!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function be(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function j(t,e,r){var n=e[0],i=e[1],s=e[2],a=e[3],o=e[4],l=e[5],d=e[6],h=e[7],u=e[8],c=e[9],g=e[10],b=e[11],v=e[12],f=e[13],w=e[14],y=e[15],m=r[0],p=r[1],_=r[2],S=r[3];return t[0]=m*n+p*o+_*u+S*v,t[1]=m*i+p*l+_*c+S*f,t[2]=m*s+p*d+_*g+S*w,t[3]=m*a+p*h+_*b+S*y,m=r[4],p=r[5],_=r[6],S=r[7],t[4]=m*n+p*o+_*u+S*v,t[5]=m*i+p*l+_*c+S*f,t[6]=m*s+p*d+_*g+S*w,t[7]=m*a+p*h+_*b+S*y,m=r[8],p=r[9],_=r[10],S=r[11],t[8]=m*n+p*o+_*u+S*v,t[9]=m*i+p*l+_*c+S*f,t[10]=m*s+p*d+_*g+S*w,t[11]=m*a+p*h+_*b+S*y,m=r[12],p=r[13],_=r[14],S=r[15],t[12]=m*n+p*o+_*u+S*v,t[13]=m*i+p*l+_*c+S*f,t[14]=m*s+p*d+_*g+S*w,t[15]=m*a+p*h+_*b+S*y,t}function z(t,e,r){var n=r[0],i=r[1],s=r[2],a,o,l,d,h,u,c,g,b,v,f,w;return e===t?(t[12]=e[0]*n+e[4]*i+e[8]*s+e[12],t[13]=e[1]*n+e[5]*i+e[9]*s+e[13],t[14]=e[2]*n+e[6]*i+e[10]*s+e[14],t[15]=e[3]*n+e[7]*i+e[11]*s+e[15]):(a=e[0],o=e[1],l=e[2],d=e[3],h=e[4],u=e[5],c=e[6],g=e[7],b=e[8],v=e[9],f=e[10],w=e[11],t[0]=a,t[1]=o,t[2]=l,t[3]=d,t[4]=h,t[5]=u,t[6]=c,t[7]=g,t[8]=b,t[9]=v,t[10]=f,t[11]=w,t[12]=a*n+h*i+b*s+e[12],t[13]=o*n+u*i+v*s+e[13],t[14]=l*n+c*i+f*s+e[14],t[15]=d*n+g*i+w*s+e[15]),t}function re(t,e,r){var n=r[0],i=r[1],s=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*s,t[9]=e[9]*s,t[10]=e[10]*s,t[11]=e[11]*s,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Se(t,e,r){var n=Math.sin(r),i=Math.cos(r),s=e[0],a=e[1],o=e[2],l=e[3],d=e[4],h=e[5],u=e[6],c=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=s*i+d*n,t[1]=a*i+h*n,t[2]=o*i+u*n,t[3]=l*i+c*n,t[4]=d*i-s*n,t[5]=h*i-a*n,t[6]=u*i-o*n,t[7]=c*i-l*n,t}function ne(t,e){var r=e[0],n=e[1],i=e[2],s=e[3],a=r+r,o=n+n,l=i+i,d=r*a,h=n*a,u=n*o,c=i*a,g=i*o,b=i*l,v=s*a,f=s*o,w=s*l;return t[0]=1-u-b,t[1]=h+w,t[2]=c-f,t[3]=0,t[4]=h-w,t[5]=1-d-b,t[6]=g+v,t[7]=0,t[8]=c+f,t[9]=g-v,t[10]=1-d-u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function pe(t,e,r,n,i){var s=1/Math.tan(e/2);if(t[0]=s/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,i!=null&&i!==1/0){var a=1/(n-i);t[10]=(i+n)*a,t[14]=2*i*n*a}else t[10]=-1,t[14]=-2*n;return t}var we=pe;function K(t,e,r,n){var i,s,a,o,l,d,h,u,c,g,b=e[0],v=e[1],f=e[2],w=n[0],y=n[1],m=n[2],p=r[0],_=r[1],S=r[2];return Math.abs(b-p)<N&&Math.abs(v-_)<N&&Math.abs(f-S)<N?be(t):(h=b-p,u=v-_,c=f-S,g=1/Math.sqrt(h*h+u*u+c*c),h*=g,u*=g,c*=g,i=y*c-m*u,s=m*h-w*c,a=w*u-y*h,g=Math.sqrt(i*i+s*s+a*a),g?(g=1/g,i*=g,s*=g,a*=g):(i=0,s=0,a=0),o=u*a-c*s,l=c*i-h*a,d=h*s-u*i,g=Math.sqrt(o*o+l*l+d*d),g?(g=1/g,o*=g,l*=g,d*=g):(o=0,l=0,d=0),t[0]=i,t[1]=o,t[2]=h,t[3]=0,t[4]=s,t[5]=l,t[6]=u,t[7]=0,t[8]=a,t[9]=d,t[10]=c,t[11]=0,t[12]=-(i*b+s*v+a*f),t[13]=-(o*b+l*v+d*f),t[14]=-(h*b+u*v+c*f),t[15]=1,t)}function D(){var t=new T(3);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function ye(t){var e=t[0],r=t[1],n=t[2];return Math.sqrt(e*e+r*r+n*n)}function M(t,e,r){var n=new T(3);return n[0]=t,n[1]=e,n[2]=r,n}function Ee(t,e,r,n){return t[0]=e,t[1]=r,t[2]=n,t}function W(t,e){var r=e[0],n=e[1],i=e[2],s=r*r+n*n+i*i;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t[2]=e[2]*s,t}function oe(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function V(t,e,r){var n=e[0],i=e[1],s=e[2],a=r[0],o=r[1],l=r[2];return t[0]=i*l-s*o,t[1]=s*a-n*l,t[2]=n*o-i*a,t}function xe(t,e,r){var n=e[0],i=e[1],s=e[2],a=r[3]*n+r[7]*i+r[11]*s+r[15];return a=a||1,t[0]=(r[0]*n+r[4]*i+r[8]*s+r[12])/a,t[1]=(r[1]*n+r[5]*i+r[9]*s+r[13])/a,t[2]=(r[2]*n+r[6]*i+r[10]*s+r[14])/a,t}var Ae=ye;(function(){var t=D();return function(e,r,n,i,s,a){var o,l;for(r||(r=3),n||(n=0),i?l=Math.min(i*r+n,e.length):l=e.length,o=n;o<l;o+=r)t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],s(t,t,a),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2];return e}})();function Me(){var t=new T(4);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function Te(t,e){var r=e[0],n=e[1],i=e[2],s=e[3],a=r*r+n*n+i*i+s*s;return a>0&&(a=1/Math.sqrt(a)),t[0]=r*a,t[1]=n*a,t[2]=i*a,t[3]=s*a,t}(function(){var t=Me();return function(e,r,n,i,s,a){var o,l;for(r||(r=4),n||(n=0),i?l=Math.min(i*r+n,e.length):l=e.length,o=n;o<l;o+=r)t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],t[3]=e[o+3],s(t,t,a),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2],e[o+3]=t[3];return e}})();function B(){var t=new T(4);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function le(t,e,r){r=r*.5;var n=Math.sin(r);return t[0]=n*e[0],t[1]=n*e[1],t[2]=n*e[2],t[3]=Math.cos(r),t}function Re(t,e,r){var n=e[0],i=e[1],s=e[2],a=e[3],o=r[0],l=r[1],d=r[2],h=r[3];return t[0]=n*h+a*o+i*d-s*l,t[1]=i*h+a*l+s*o-n*d,t[2]=s*h+a*d+n*l-i*o,t[3]=a*h-n*o-i*l-s*d,t}function H(t,e,r,n){var i=e[0],s=e[1],a=e[2],o=e[3],l=r[0],d=r[1],h=r[2],u=r[3],c,g,b,v,f;return g=i*l+s*d+a*h+o*u,g<0&&(g=-g,l=-l,d=-d,h=-h,u=-u),1-g>N?(c=Math.acos(g),b=Math.sin(c),v=Math.sin((1-n)*c)/b,f=Math.sin(n*c)/b):(v=1-n,f=n),t[0]=v*i+f*l,t[1]=v*s+f*d,t[2]=v*a+f*h,t[3]=v*o+f*u,t}function Fe(t,e){var r=e[0]+e[4]+e[8],n;if(r>0)n=Math.sqrt(r+1),t[3]=.5*n,n=.5/n,t[0]=(e[5]-e[7])*n,t[1]=(e[6]-e[2])*n,t[2]=(e[1]-e[3])*n;else{var i=0;e[4]>e[0]&&(i=1),e[8]>e[i*3+i]&&(i=2);var s=(i+1)%3,a=(i+2)%3;n=Math.sqrt(e[i*3+i]-e[s*3+s]-e[a*3+a]+1),t[i]=.5*n,n=.5/n,t[3]=(e[s*3+a]-e[a*3+s])*n,t[s]=(e[s*3+i]+e[i*3+s])*n,t[a]=(e[a*3+i]+e[i*3+a])*n}return t}var ce=Te;(function(){var t=D(),e=M(1,0,0),r=M(0,1,0);return function(n,i,s){var a=oe(i,s);return a<-.999999?(V(t,e,i),Ae(t)<1e-6&&V(t,r,i),W(t,t),le(n,t,Math.PI),n):a>.999999?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(V(t,i,s),n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=1+a,ce(n,n))}})();(function(){var t=B(),e=B();return function(r,n,i,s,a,o){return H(t,n,a,o),H(e,i,s,o),H(r,t,e,2*o*(1-o)),r}})();(function(){var t=ae();return function(e,r,n,i){return t[0]=n[0],t[3]=n[1],t[6]=n[2],t[1]=i[0],t[4]=i[1],t[7]=i[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],ce(e,Fe(e,t))}})();class Le{constructor(e,r=5,n={rotation:1,zoom:.001}){this.canvas=e,this.distance=r,this.rotation=B(),this.position=M(0,0,r),this.target=D(),this.up=M(0,1,0),this.rotationSensitivity=n.rotation||1,this.zoomSensitivity=n.zoom||.001,this.dragging=!1,this.lastMouseX=0,this.lastMouseY=0,e.addEventListener("mousedown",this.onMouseDown.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this)),e.addEventListener("mouseup",this.onMouseUp.bind(this)),e.addEventListener("wheel",this.onWheel.bind(this))}getArcballVector(e,r){const n=this.canvas.getBoundingClientRect(),i={x:n.width*.5,y:n.height*.5},s=(e-i.x)/i.x,a=(i.y-r)/i.y,o=s*s+a*a,l=o<=1?Math.sqrt(1-o):0,d=M(s,a,l);return W(d,d),d}onMouseDown(e){this.dragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY}onMouseMove(e){if(!this.dragging)return;const r=e.clientX,n=e.clientY,i=this.getArcballVector(this.lastMouseX,this.lastMouseY),s=this.getArcballVector(r,n),a=Math.acos(Math.min(1,oe(i,s)))*this.rotationSensitivity,o=D();V(o,s,i),W(o,o);const l=B();le(l,o,a),Re(this.rotation,l,this.rotation),this.lastMouseX=r,this.lastMouseY=n}onMouseUp(){this.dragging=!1}onWheel(e){this.distance+=e.deltaY*this.zoomSensitivity*this.distance,this.distance=Math.max(.1,Math.min(100,this.distance)),Ee(this.position,0,0,this.distance),e.preventDefault()}getViewMatrix(){const e=A(),r=A();ne(r,this.rotation);const n=D();return xe(n,this.position,r),K(e,n,this.target,this.up),e}getModelRotMatrix(){const e=A();return ne(e,this.rotation),e}getViewCamDistanceMatrix(){const e=A();return K(e,this.position,this.target,this.up),e}reset(){this.rotation=B(),this.position=M(0,0,this.distance),this.target=M(0,0,0)}}class J{constructor(e){this.gl=e,this.vao=null,this.vbo=null,this.ebo=null,this.indexCount=0,this.vertices=null,this.normals=null,this.colors=null,this.texCoords=null,this.indices=null,this.faceNormals=null,this.vertexNormals=null}static async load(e,r,n={}){const i=await fetch(r);if(!i.ok)throw new Error(`OBJ 파일 로드 실패: ${r}`);const s=await i.text(),a=new J(e);return a._parse(s,n),a._computeNormals(),a.initBuffers(),a}_parse(e,r){const n=[],i=[],s=[],a=new Map,o=[],l=[],d=[],h=[],u=[],c=r.color||[.8,.8,.8,1],g=e.split(/\r?\n/);for(const b of g){const v=b.trim();if(!v||v.startsWith("#"))continue;const f=v.split(/\s+/),w=f[0];if(w==="v")n.push([parseFloat(f[1]),parseFloat(f[2]),parseFloat(f[3])]);else if(w==="vt")i.push([parseFloat(f[1]),parseFloat(f[2])]);else if(w==="vn")s.push([parseFloat(f[1]),parseFloat(f[2]),parseFloat(f[3])]);else if(w==="f"){const y=f.slice(1).map(m=>{const[p,_,S]=m.split("/").map(R=>R?parseInt(R)-1:-1);return{vi:p,ti:_,ni:S}});for(let m=1;m<y.length-1;m++){const p=[y[0],y[m],y[m+1]];for(const _ of p){const S=`${_.vi}/${_.ti}/${_.ni}`;if(!a.has(S)){const R=o.length/3;a.set(S,R);const L=n[_.vi]||[0,0,0];o.push(L[0],L[1],L[2]);const P=_.ni>=0?s[_.ni]:[0,1,0];l.push(P[0],P[1],P[2]),d.push(...c);const F=_.ti>=0?i[_.ti]:[0,0];h.push(F[0],F[1])}u.push(a.get(S))}}}}this._normalize(o),this.vertices=new Float32Array(o),this.normals=new Float32Array(l),this.colors=new Float32Array(d),this.texCoords=new Float32Array(h),this.indices=new Uint32Array(u)}_normalize(e){let r=1/0,n=-1/0,i=1/0,s=-1/0,a=1/0,o=-1/0;for(let c=0;c<e.length;c+=3)r=Math.min(r,e[c]),n=Math.max(n,e[c]),i=Math.min(i,e[c+1]),s=Math.max(s,e[c+1]),a=Math.min(a,e[c+2]),o=Math.max(o,e[c+2]);const l=(r+n)/2,d=(i+s)/2,h=(a+o)/2,u=1/Math.max(n-r,s-i,o-a);for(let c=0;c<e.length;c+=3)e[c]=(e[c]-l)*u,e[c+1]=(e[c+1]-d)*u,e[c+2]=(e[c+2]-h)*u}_computeNormals(){const e=this.vertices.length/3;this.faceNormals=new Float32Array(this.normals),this.vertexNormals=new Float32Array(this.normals.length);const r=new Float32Array(this.normals.length),n=new Uint32Array(e),i=this.indices,s=this.vertices;for(let a=0;a<i.length;a+=3){const o=i[a],l=i[a+1],d=i[a+2],h=s[l*3]-s[o*3],u=s[l*3+1]-s[o*3+1],c=s[l*3+2]-s[o*3+2],g=s[d*3]-s[o*3],b=s[d*3+1]-s[o*3+1],v=s[d*3+2]-s[o*3+2],f=u*v-c*b,w=c*g-h*v,y=h*b-u*g;for(const m of[o,l,d])r[m*3]+=f,r[m*3+1]+=w,r[m*3+2]+=y,n[m]++}for(let a=0;a<e;a++){const o=n[a]||1;let l=r[a*3]/o,d=r[a*3+1]/o,h=r[a*3+2]/o;const u=Math.sqrt(l*l+d*d+h*h)||1;this.vertexNormals[a*3]=l/u,this.vertexNormals[a*3+1]=d/u,this.vertexNormals[a*3+2]=h/u}this.normals=new Float32Array(this.vertexNormals)}copyVertexNormalsToNormals(){this.normals.set(this.vertexNormals)}copyFaceNormalsToNormals(){this.normals.set(this.faceNormals)}initBuffers(){const e=this.gl;this.vao=e.createVertexArray(),this.vbo=e.createBuffer(),this.ebo=e.createBuffer(),this.indexCount=this.indices.length;const r=this.vertices.byteLength,n=this.normals.byteLength,i=this.colors.byteLength,s=this.texCoords.byteLength,a=r+n+i+s;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW),e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bufferSubData(e.ARRAY_BUFFER,r+n,this.colors),e.bufferSubData(e.ARRAY_BUFFER,r+n+i,this.texCoords),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.ebo),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,r),e.vertexAttribPointer(2,4,e.FLOAT,!1,0,r+n),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,r+n+i),e.enableVertexAttribArray(0),e.enableVertexAttribArray(1),e.enableVertexAttribArray(2),e.enableVertexAttribArray(3),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}updateNormals(){const e=this.gl,r=this.vertices.byteLength;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}draw(e){const r=this.gl;e.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_INT,0),r.bindVertexArray(null)}delete(){const e=this.gl;this.vbo&&e.deleteBuffer(this.vbo),this.ebo&&e.deleteBuffer(this.ebo),this.vao&&e.deleteVertexArray(this.vao),this.vbo=null,this.ebo=null,this.vao=null}}class Pe{constructor(e,r={}){this.gl=e,this.halfW=r.halfW??7,this.halfH=r.halfH??6,this.color=r.color??[.88,.84,.78,1],this.vao=e.createVertexArray(),this.vbo=e.createBuffer(),this.ebo=e.createBuffer(),this._initGeometry(),this._initBuffers()}_initGeometry(){const e=this.halfW,r=this.halfH,n=this.color,i=new Float32Array([-e,0,-r,e,0,-r,e,0,r,-e,0,r]),s=new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),a=new Float32Array([...n,...n,...n,...n]),o=new Float32Array([0,0,1,0,1,1,0,1]),l=new Uint16Array([0,1,2,0,2,3]);this.vertices=i,this.normals=s,this.colors=a,this.texCoords=o,this.indices=l,this.indexCount=l.length}_initBuffers(){const e=this.gl,r=this.vertices.byteLength,n=this.normals.byteLength,i=this.colors.byteLength,s=this.texCoords.byteLength,a=r+n+i+s;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferData(e.ARRAY_BUFFER,a,e.STATIC_DRAW),e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bufferSubData(e.ARRAY_BUFFER,r+n,this.colors),e.bufferSubData(e.ARRAY_BUFFER,r+n+i,this.texCoords),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.ebo),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,r),e.vertexAttribPointer(2,4,e.FLOAT,!1,0,r+n),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,r+n+i),e.enableVertexAttribArray(0),e.enableVertexAttribArray(1),e.enableVertexAttribArray(2),e.enableVertexAttribArray(3),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}draw(e){const r=this.gl;e.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_SHORT,0),r.bindVertexArray(null)}delete(){const e=this.gl;e.deleteBuffer(this.vbo),e.deleteBuffer(this.ebo),e.deleteVertexArray(this.vao)}}const Ce=`#version 300 es\r
\r
layout(location = 0) in vec3 a_position;\r
layout(location = 1) in vec3 a_normal;\r
layout(location = 2) in vec4 a_color;\r
layout(location = 3) in vec2 a_texCoord;\r
\r
uniform mat4 u_model;\r
uniform mat4 u_view;\r
uniform mat4 u_projection;\r
\r
out vec3 fragPos;\r
out vec3 normal;\r
out vec2 texCoord;\r
\r
void main() {\r
    fragPos = vec3(u_model * vec4(a_position, 1.0));\r
    normal = mat3(transpose(inverse(u_model))) * a_normal;\r
    texCoord = a_texCoord;\r
    gl_Position = u_projection * u_view * vec4(fragPos, 1.0);\r
} `,Ie=`#version 300 es\r
\r
precision highp float;\r
\r
out vec4 FragColor;\r
\r
struct Material {\r
    sampler2D diffuse; // diffuse map\r
    vec3 specular;     // 표면의 specular color\r
    float shininess;   // specular 반짝임 정도\r
};\r
\r
struct Light {\r
    vec3 position;\r
\r
    vec3 ambient; // ambient 적용 strength\r
    vec3 diffuse; // diffuse 적용 strength\r
    vec3 specular; // specular 적용 strength\r
\r
    vec3 direction; // spotLight의 target 방향 vector (spotDir)\r
    float cutOff; // inner cut-off angle\r
    float outerCutOff; // outer cut-off angle\r
\r
    // attenuation\r
    float constant;\r
    float linear;\r
    float quadratic;\r
};\r
\r
in vec3 fragPos;  \r
in vec3 normal;  \r
in vec2 texCoord;\r
\r
uniform Material material;\r
uniform Light light;\r
uniform vec3 u_viewPos;\r
\r
void main() {\r
    // ambient\r
    vec3 rgb = texture(material.diffuse, texCoord).rgb;\r
    vec3 ambient = light.ambient * rgb;\r
  	\r
    // diffuse \r
    vec3 norm = normalize(normal);\r
    vec3 lightDir = normalize(light.position - fragPos); // lightDir = from fragPos to light\r
    float dotNormLight = dot(norm, lightDir);\r
    float diff = max(dotNormLight, 0.0);\r
    vec3 diffuse = light.diffuse * diff * rgb;  \r
    \r
      // specular\r
    vec3 viewDir = normalize(u_viewPos - fragPos);\r
    vec3 reflectDir = reflect(-lightDir, norm); // -lightDir = from light to fragPos\r
    float spec = 0.0;\r
    if (dotNormLight > 0.0) {\r
        spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);\r
    }\r
    vec3 specular = light.specular * spec * material.specular;  \r
\r
    // spotlight (soft edges)\r
    // theta: cos(angle) between light direction (fragPos to light) and spotDir\r
    float theta = dot(lightDir, normalize(-light.direction));\r
    float cosCutoff = cos(light.cutOff);\r
    float cosOuterCutoff = cos(light.outerCutOff);\r
    if (theta > cosOuterCutoff) {  // theta angle이 outerCutOff angle보다 작을 때\r
        float epsilon = (cosCutoff - cosOuterCutoff);\r
        // clamp(분자/분모, 최소, 최대) = 분자/분모가 최소보다 작으면 최소, 최대보다 크면 최대\r
        float intensity = clamp((theta - cosOuterCutoff) / epsilon, 0.0, 1.0);\r
        diffuse *= intensity;\r
        specular *= intensity;\r
    }\r
    else { // theta angle이 outerCutOff angle을 벗어날 때\r
        diffuse = vec3(0.0);\r
        specular = vec3(0.0);\r
    }\r
\r
    // attenuation\r
    float distance = length(light.position - fragPos);\r
    float attenuation = 1.0 / (light.constant + light.linear * distance + \r
                        light.quadratic * distance * distance);\r
    ambient *= attenuation;\r
    diffuse *= attenuation;\r
    specular *= attenuation;\r
        \r
    vec3 result = ambient + diffuse + specular;\r
    FragColor = vec4(result, 1.0);\r
} `,Ue=`#version 300 es\r
\r
layout(location = 0) in vec3 a_position;\r
layout(location = 1) in vec3 a_normal;\r
layout(location = 2) in vec4 a_color;\r
layout(location = 3) in vec2 a_texCoord;\r
\r
uniform mat4 u_model;\r
uniform mat4 u_view;\r
uniform mat4 u_projection;\r
\r
void main() {\r
    gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);\r
} `,De=`#version 300 es\r
\r
precision highp float;\r
\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = vec4(1.0, 1.0, 1.0, 1.0);\r
}`,Be=`#version 300 es\r
precision mediump float;\r
\r
layout(location = 0) in vec3 a_position;\r
\r
uniform mat4 u_model;\r
uniform mat4 u_view;\r
uniform mat4 u_projection;\r
\r
void main() {\r
    gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);\r
}\r
`,Oe=`#version 300 es\r
precision mediump float;\r
\r
uniform vec4 u_shadowColor;\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = u_shadowColor;\r
}\r
`;class X{constructor(e,r,n){this.gl=e,this.program=this._createProgram(r,n)}use(){this.gl.useProgram(this.program)}setInt(e,r){this.gl.uniform1i(this.gl.getUniformLocation(this.program,e),r)}setFloat(e,r){this.gl.uniform1f(this.gl.getUniformLocation(this.program,e),r)}setVec3(e,r){this.gl.uniform3fv(this.gl.getUniformLocation(this.program,e),r)}setVec4(e,r){this.gl.uniform4fv(this.gl.getUniformLocation(this.program,e),r)}setMat3(e,r){this.gl.uniformMatrix3fv(this.gl.getUniformLocation(this.program,e),!1,r)}setMat4(e,r){this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program,e),!1,r)}delete(){this.gl.deleteProgram(this.program)}_createProgram(e,r){const n=this.gl,i=this._compileShader(n.VERTEX_SHADER,e),s=this._compileShader(n.FRAGMENT_SHADER,r),a=n.createProgram();if(n.attachShader(a,i),n.attachShader(a,s),n.linkProgram(a),!n.getProgramParameter(a,n.LINK_STATUS)){const o=n.getProgramInfoLog(a);throw n.deleteProgram(a),n.deleteShader(i),n.deleteShader(s),new Error(`Shader program link failed: ${o}`)}return n.deleteShader(i),n.deleteShader(s),a}_compileShader(e,r){const n=this.gl,i=n.createShader(e);if(n.shaderSource(i,r),n.compileShader(i),!n.getShaderParameter(i,n.COMPILE_STATUS)){const s=n.getShaderInfoLog(i);throw n.deleteShader(i),new Error(`Shader compile failed: ${s}`)}return i}}class Q extends ${constructor(e,r){super(e),this.selectedStageId=r,this.timer=0,this.hintCount=0,this.matchRate=0,this._onKeyDown=this._onKeyDown.bind(this),this.arcball=new Le(this.gl.canvas,5,{rotation:1.2,zoom:0}),this.wallX=-5,this.lightPosition=M(6,3,4),this.viewPosition=M(1.5,3,4.5)}async enter(){const e=O.getById(this.selectedStageId);if(!e){console.error(`Stage with ID ${this.selectedStageId} not found!`),E.changeScene(new te(this.gl,{stageId:this.selectedStageId,time:0,hintCount:0}));return}this.stageId=e.id,this.stageName=e?e.name:`Stage ${this.stageId+1}`,this.assetsPath=e?e.assetsPath:null,this.targetShadowImage=e?e.targetShadow:null,this._initGLState(),await this._initSceneResources(),this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI(),this._deleteSceneResources()}update(e){this.timer+=e,this._updateHUD(),this.matchRate>=.95&&this._stageClear(this.stageId)}render(){const e=this.gl;if(!this.cube||!this.wall||!this.objectShader||!this.shadowShader)return;e.clearColor(.94,.94,.94,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT|e.STENCIL_BUFFER_BIT);const{view:r,projection:n}=this._getCameraMatrices(),i=this._getCubeModelMatrix(),s=A();z(s,s,[this.wallX,0,0]),Se(s,s,-Math.PI/2),this._drawLitObject(this.wall,s,r,n,this.wallTexture);const a=this._getShadowModelMatrix(i);e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),e.stencilFunc(e.NOTEQUAL,1,255),e.stencilOp(e.KEEP,e.KEEP,e.REPLACE),e.stencilMask(255),this._drawShadowObject(this.cube,a,r,n),e.stencilMask(0),e.stencilFunc(e.ALWAYS,0,255),e.depthMask(!0),e.disable(e.BLEND),this._drawLitObject(this.cube,i,r,n);const o=A();z(o,o,this.lightPosition),re(o,o,[.14,.14,.14]),this._drawLamp(o,r,n)}_initGLState(){const e=this.gl;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.enable(e.CULL_FACE),e.cullFace(e.BACK),e.enable(e.STENCIL_TEST)}async _initSceneResources(){const e=this.gl;this.cube=await J.load(e,"./assets/stage1/1.obj"),this.wall=new Pe(e,{halfW:8,halfH:7,color:[.88,.84,.78,1]}),this.objectShader=new X(e,Ce,Ie),this.lampShader=new X(e,Ue,De),this.shadowShader=new X(e,Be,Oe),this.whiteTexture=this._createSingleColorTexture([255,255,255,255]),this.wallTexture=this._createSingleColorTexture([224,215,200,255])}_deleteSceneResources(){this.cube?.delete?.(),this.wall?.delete?.(),this.objectShader?.delete?.(),this.lampShader?.delete?.(),this.shadowShader?.delete?.(),this.whiteTexture&&this.gl.deleteTexture(this.whiteTexture),this.wallTexture&&this.gl.deleteTexture(this.wallTexture),this.cube=null,this.wall=null,this.objectShader=null,this.lampShader=null,this.shadowShader=null,this.whiteTexture=null,this.wallTexture=null}_createSingleColorTexture(e){const r=this.gl,n=r.createTexture();return r.bindTexture(r.TEXTURE_2D,n),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(e)),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.bindTexture(r.TEXTURE_2D,null),n}_getCameraMatrices(){const e=this.gl,r=e.canvas.width/Math.max(e.canvas.height,1),n=A(),i=A();return K(n,this.viewPosition,M(-1,.5,0),M(0,1,0)),we(i,Math.PI/4,r,.1,100),{view:n,projection:i}}_getCubeModelMatrix(){const e=A(),r=this.arcball.getModelRotMatrix();return z(e,e,[0,.55,0]),j(e,e,r),re(e,e,[1.45,1.45,1.45]),e}_getShadowModelMatrix(e){const r=this._createPlaneShadowMatrix([1,0,0,-this.wallX],[this.lightPosition[0],this.lightPosition[1],this.lightPosition[2],1]),n=A(),i=A();return z(n,n,[.004,0,0]),j(i,n,r),j(i,i,e),i}_createPlaneShadowMatrix(e,r){const n=e[0]*r[0]+e[1]*r[1]+e[2]*r[2]+e[3]*r[3],i=A();for(let s=0;s<4;s++)for(let a=0;a<4;a++)i[s*4+a]=n*(a===s?1:0)-r[a]*e[s];return i}_drawLitObject(e,r,n,i){const s=this.gl,a=this.objectShader,o=ae();_e(o,r),a.use(),a.setMat4("u_model",r),a.setMat4("u_view",n),a.setMat4("u_projection",i),a.setVec3("u_viewPos",this.viewPosition),a.setVec3("light.position",this.lightPosition),a.setVec3("light.ambient",[.35,.35,.35]),a.setVec3("light.diffuse",[.82,.82,.82]),a.setVec3("light.specular",[.35,.35,.35]),a.setVec3("light.direction",M(-this.lightPosition[0],-this.lightPosition[1],-this.lightPosition[2])),a.setFloat("light.cutOff",Math.PI/5),a.setFloat("light.outerCutOff",Math.PI/4),a.setFloat("light.constant",1),a.setFloat("light.linear",.045),a.setFloat("light.quadratic",.0075),a.setVec3("material.specular",[.2,.2,.2]),a.setFloat("material.shininess",32),a.setInt("material.diffuse",0),s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,this.whiteTexture),e.draw(a)}_drawShadowObject(e,r,n,i){const s=this.shadowShader;s.use(),s.setMat4("u_model",r),s.setMat4("u_view",n),s.setMat4("u_projection",i),s.setVec4("u_shadowColor",[0,0,0,.38]),e.draw(s)}_drawLamp(e,r,n){const i=this.lampShader;i.use(),i.setMat4("u_model",e),i.setMat4("u_view",r),i.setMat4("u_projection",n),this.cube.draw(i)}_stageClear(e){E.changeScene(new te(this.gl,{stageId:e,time:this.timer,hintCount:this.hintCount}))}_useHint(){this.hintCount++,console.log("Hint used!")}_buildUI(){this._ui=document.createElement("div"),this._ui.id="game-hud",this._ui.innerHTML=`

            <!-- header -->
            <header id="game-header">
                <button id="btn-back" aria-label="뒤로가기">←</button>
                <div id="header-title">
                    <span id="header-level">Stage ${String(this.stageId+1)}</span>
                    <span id="header-stage-name">${String(this.stageName)}</span>
                </div>
            </header>

            <!-- body -->
            <div id="game-body">

                <!-- WebGL 캔버스가 뒤에서 비치는 투명 영역 -->
                <div id="game-viewport">
                    <!-- TODO: 조명 컨트롤러(LightController) UI를 여기에 마운트 -->
                    <!-- TODO: 오브젝트 선택 오버레이(ObjectController) UI를 여기에 마운트 -->
                </div>

                <!-- right panel -->
                <aside id="game-panel">

                    <!-- target shadow -->
                    <div id="panel-target-card">
                        <span id="panel-target-label">Target Shadow</span>
                        <div id="panel-target-preview">
                            <!-- TODO: load target shadow image -->
                            <div class="shadow-placeholder"></div>
                        </div>
                    </div>

                    <!-- match gauge -->
                    <div id="panel-match-card">
                        <span id="panel-match-label">Match</span>
                        <div id="panel-match-bar-track">
                            <div id="panel-match-bar-fill" data-level="low"></div>
                        </div>
                    </div>

                    <!-- timer & hint -->
                    <div id="panel-actions">
                        <div id="hud-timer">00:00</div>
                        <button id="btn-hint">Hint</button>
                        <button id="btn-debug-clear">[Debug] Clear</button>
                    </div>

                </aside>
            </div>
        `,document.body.appendChild(this._ui),document.getElementById("btn-back").addEventListener("click",()=>{this._goToStageSelect()}),document.getElementById("btn-hint").addEventListener("click",()=>{this._useHint()}),document.getElementById("btn-debug-clear").addEventListener("click",()=>{this._stageClear(this.stageId)})}_updateHUD(){const e=String(Math.floor(this.timer/60)).padStart(2,"0"),r=String(Math.floor(this.timer%60)).padStart(2,"0"),n=document.getElementById("hud-timer"),i=document.getElementById("panel-match-bar-fill");if(n&&(n.textContent=`${e}:${r}`),i){const s=Math.floor(this.matchRate*100);i.style.width=`${s}%`,s>=80?i.dataset.level="high":s>=40?i.dataset.level="mid":i.dataset.level="low"}}_removeUI(){this._ui?.remove()}_goToStageSelect(){C(async()=>{const{default:e}=await Promise.resolve().then(()=>he);return{default:e}},void 0).then(({default:e})=>{E.changeScene(new e(this.gl))})}_onKeyDown(e){e.key==="h"&&this._useHint(),e.key==="Escape"&&this._goToStageSelect(),e.key==="p"&&console.log("Current Rotation:",this.arcball.rotation)}}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));class q extends ${constructor(e){super(e),this.stages=[],this.selectedStageId=0,this._ui=null,this._onKeyDown=this._onKeyDown.bind(this)}async enter(){if(this.stages=O.getAll(),!this.stages||this.stages.length===0){console.error("No stages loaded.");return}this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._removeUI(),this._ui=document.createElement("div"),this._ui.id="stage-select",this._ui.innerHTML=`
            <h2>Select Stage</h2>

            <div id="stage-list">
                ${this.stages.map((n,i)=>`
                    <button
                        class="stage-card"
                        data-index="${i}"
                    >
                        <strong>Stage ${i+1}</strong>
                        <br>
                        ${n.name??"Untitled"}
                    </button>
                `).join("")}
            </div>

            <button id="btn-back">
                ← Back
            </button>
        `,document.body.appendChild(this._ui),this._ui.querySelectorAll(".stage-card").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.index);G.isUnlocked(i)&&this._startStage(i)})}),this._ui.querySelector("#btn-back").addEventListener("click",async()=>{const{default:n}=await C(async()=>{const{default:i}=await Promise.resolve().then(()=>se);return{default:i}},void 0);E.changeScene(new n(this.gl))})}_removeUI(){this._ui&&(this._ui.remove(),this._ui=null)}_startStage(e){const r=this.stages[e];if(!r){console.error("Invalid stage index:",e);return}console.log("Starting Stage:",r),E.changeScene(new Q(this.gl,e))}async _onKeyDown(e){if(e.key==="Escape"){const{default:r}=await C(async()=>{const{default:n}=await Promise.resolve().then(()=>se);return{default:n}},void 0);E.changeScene(new r(this.gl))}}}const he=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));class de extends ${constructor(e){super(e),this._onKeyDown=this._onKeyDown.bind(this)}enter(){this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="main-menu",this._ui.innerHTML=`
            <h1>Shadow Match</h1>
            <button id="btn-start">New Start</button>
            <button id="btn-stage">Select Stage</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-start").addEventListener("click",()=>{E.changeScene(new Q(this.gl,0))}),document.getElementById("btn-stage").addEventListener("click",()=>{E.changeScene(new q(this.gl))})}_removeUI(){this._ui?.remove()}_onKeyDown(e){e.key==="Enter"&&E.changeScene(new q(this.gl))}}const se=Object.freeze(Object.defineProperty({__proto__:null,default:de},Symbol.toStringTag,{value:"Module"}));class ze{constructor(){this.canvas=null,this.gl=null,this._lastTime=null}async initialize(){if(await O.load(),this.canvas=document.getElementById("gameCanvas"),this.gl=this.canvas.getContext("webgl2",{stencil:!0}),!this.gl){alert("WebGL2 not supported");return}this.resize(),window.addEventListener("resize",()=>{this.resize()}),E.changeScene(new de(this.gl))}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.gl&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}run(){const e=r=>{this._lastTime===null&&(this._lastTime=r);const n=(r-this._lastTime)/1e3;this._lastTime=r,E.update(n),E.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}}window.addEventListener("DOMContentLoaded",()=>{const t=new ze;t.initialize(),t.run()});
