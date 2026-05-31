(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=r(i);fetch(i.href,a)}})();class ue{constructor(){this.currentScene=null}changeScene(e){this.currentScene&&this.currentScene.exit(),this.currentScene=e,this.currentScene&&this.currentScene.enter()}update(e){this.currentScene&&this.currentScene.update(e)}render(){this.currentScene&&this.currentScene.render()}}const E=new ue;class ${constructor(e){this.gl=e}enter(){}exit(){}update(){}render(){}}const ge="modulepreload",fe=function(t){return"/computerGraphics/termProject/"+t},Z={},C=function(e,r,n){let i=Promise.resolve();if(r&&r.length>0){let h=function(d){return Promise.all(d.map(g=>Promise.resolve(g).then(c=>({status:"fulfilled",value:c}),c=>({status:"rejected",reason:c}))))};var s=h;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");i=h(r.map(d=>{if(d=fe(d),d in Z)return;Z[d]=!0;const g=d.endsWith(".css"),c=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${c}`))return;const u=document.createElement("link");if(u.rel=g?"stylesheet":ge,g||(u.as="script"),u.crossOrigin="",u.href=d,l&&u.setAttribute("nonce",l),document.head.appendChild(u),g)return new Promise((b,m)=>{u.addEventListener("load",b),u.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return e().catch(a)})},j="shadowMatch_save",ee={cleared:!1,bestScore:5999,bestStars:0},H={_load(){try{const t=window.localStorage.getItem(j);if(t!==null)return JSON.parse(t)}catch(t){console.error(t)}return{stages:{}}},_save(t){localStorage.setItem(j,JSON.stringify(t))},saveResult(t,{score:e,stars:r}){let n=this._load();t in n.stages?(n.stages[t].bestScore=Math.min(n.stages[t].bestScore,e),n.stages[t].bestStars=Math.max(n.stages[t].bestStars,r)):n.stages[t]={cleared:!0,bestScore:e,bestStars:r},this._save(n)},getResult(t){return this._load().stages[t]??ee},unlockNext(t){let e=this._load().stages;t+1 in e||(e[t+1]=ee)},isUnlocked(t){return t===0||this.getResult(t-1).cleared},reset(){window.localstorage.removeItem(j)}};async function me(){try{return await(await fetch("/computerGraphics/termProject/data/stageConfig.json")).json()}catch(t){return console.error("Error loading stage config:",t),[]}}const O={_stages:[],async load(){this._stages=await me()},getAll(){return this._stages},getById(t){return this._stages.find(e=>e.id===t)||null},getTotalCount(){return this._stages.length}};class ve{constructor(e){this.selectedStageId=e,this.threestarTime=0}async init(){const e=O.getById(this.selectedStageId);if(!e){console.error(`Stage with ID ${this.selectedStageId} not found!`);return}this.threestarTime=e.threestartime??60}calculate(e,r,n=0){const a=this.threestarTime/.25*(1-.75**r);e+=a;const s=this.threestarTime*2*(1+n);return 1+(e<=this.threestarTime)+(e<=s)}}class te extends ${constructor(e,r){super(e),this.result=r,this.stars=0}async enter(){this.stars=await this._calcStars(),H.saveResult(this.result.stageId,{score:this.result.time,stars:this.stars}),this._buildUI()}exit(){this._removeUI()}update(){}render(){this.gl.clearColor(.05,.05,.05,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}async _calcStars(){const e=new ve(this.result.stageId);return await e.init(),await e.calculate(this.result.time,this.result.hintCount)}_padTime(e){const r=String(Math.floor(e/60)).padStart(2,"0"),n=String(Math.floor(e%60)).padStart(2,"0");return`${r}:${n}`}_buildUI(){const{time:e,stageId:r}=this.result,n=this._padTime(e),i="★".repeat(this.stars)+"☆".repeat(3-this.stars),a=this._padTime(H.getResult(r).bestScore);this._ui=document.createElement("div"),this._ui.id="clear-scene",this._ui.innerHTML=`
            <h2>Stage Clear!</h2>
            <p>Stage: ${r+1}</p>
            <div id="clear-stars">${i}</div>
            <p>highscore: ${a}</p>
            <p>Time: ${n}</p>
            <button id="btn-next">Next Stage</button>
            <button id="btn-retry">Retry</button>
            <button id="btn-menu">Menu</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-next").addEventListener("click",()=>{C(async()=>{const{default:s}=await Promise.resolve().then(()=>ie);return{default:s}},void 0).then(({default:s})=>{E.changeScene(new s(this.gl,r+1))})}),r>=O.getTotalCount()-1&&(document.getElementById("btn-next").style.display="none"),document.getElementById("btn-retry").addEventListener("click",()=>{C(async()=>{const{default:s}=await Promise.resolve().then(()=>ie);return{default:s}},void 0).then(({default:s})=>{E.changeScene(new s(this.gl,r))})}),document.getElementById("btn-menu").addEventListener("click",()=>{C(async()=>{const{default:s}=await Promise.resolve().then(()=>he);return{default:s}},void 0).then(({default:s})=>{E.changeScene(new s(this.gl))})})}_removeUI(){this._ui?.remove()}}var N=1e-6,T=typeof Float32Array<"u"?Float32Array:Array;function ae(){var t=new T(9);return T!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function _e(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],s=e[4],o=e[5],l=e[6],h=e[7],d=e[8],g=e[9],c=e[10],u=e[11],b=e[12],m=e[13],f=e[14],y=e[15],w=r*o-n*s,v=r*l-i*s,S=r*h-a*s,_=n*l-i*o,p=n*h-a*o,R=i*h-a*l,L=d*m-g*b,P=d*f-c*b,F=d*y-u*b,Y=g*f-c*m,I=g*y-u*m,D=c*y-u*f,x=w*D-v*I+S*Y+_*F-p*P+R*L;return x?(x=1/x,t[0]=(o*D-l*I+h*Y)*x,t[1]=(l*F-s*D-h*P)*x,t[2]=(s*I-o*F+h*L)*x,t[3]=(i*I-n*D-a*Y)*x,t[4]=(r*D-i*F+a*P)*x,t[5]=(n*F-r*I-a*L)*x,t[6]=(m*R-f*p+y*_)*x,t[7]=(f*S-b*R-y*v)*x,t[8]=(b*p-m*S+y*w)*x,t):null}function A(){var t=new T(16);return T!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function be(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function k(t,e,r){var n=e[0],i=e[1],a=e[2],s=e[3],o=e[4],l=e[5],h=e[6],d=e[7],g=e[8],c=e[9],u=e[10],b=e[11],m=e[12],f=e[13],y=e[14],w=e[15],v=r[0],S=r[1],_=r[2],p=r[3];return t[0]=v*n+S*o+_*g+p*m,t[1]=v*i+S*l+_*c+p*f,t[2]=v*a+S*h+_*u+p*y,t[3]=v*s+S*d+_*b+p*w,v=r[4],S=r[5],_=r[6],p=r[7],t[4]=v*n+S*o+_*g+p*m,t[5]=v*i+S*l+_*c+p*f,t[6]=v*a+S*h+_*u+p*y,t[7]=v*s+S*d+_*b+p*w,v=r[8],S=r[9],_=r[10],p=r[11],t[8]=v*n+S*o+_*g+p*m,t[9]=v*i+S*l+_*c+p*f,t[10]=v*a+S*h+_*u+p*y,t[11]=v*s+S*d+_*b+p*w,v=r[12],S=r[13],_=r[14],p=r[15],t[12]=v*n+S*o+_*g+p*m,t[13]=v*i+S*l+_*c+p*f,t[14]=v*a+S*h+_*u+p*y,t[15]=v*s+S*d+_*b+p*w,t}function z(t,e,r){var n=r[0],i=r[1],a=r[2],s,o,l,h,d,g,c,u,b,m,f,y;return e===t?(t[12]=e[0]*n+e[4]*i+e[8]*a+e[12],t[13]=e[1]*n+e[5]*i+e[9]*a+e[13],t[14]=e[2]*n+e[6]*i+e[10]*a+e[14],t[15]=e[3]*n+e[7]*i+e[11]*a+e[15]):(s=e[0],o=e[1],l=e[2],h=e[3],d=e[4],g=e[5],c=e[6],u=e[7],b=e[8],m=e[9],f=e[10],y=e[11],t[0]=s,t[1]=o,t[2]=l,t[3]=h,t[4]=d,t[5]=g,t[6]=c,t[7]=u,t[8]=b,t[9]=m,t[10]=f,t[11]=y,t[12]=s*n+d*i+b*a+e[12],t[13]=o*n+g*i+m*a+e[13],t[14]=l*n+c*i+f*a+e[14],t[15]=h*n+u*i+y*a+e[15]),t}function re(t,e,r){var n=r[0],i=r[1],a=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*a,t[9]=e[9]*a,t[10]=e[10]*a,t[11]=e[11]*a,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function ne(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],s=r+r,o=n+n,l=i+i,h=r*s,d=n*s,g=n*o,c=i*s,u=i*o,b=i*l,m=a*s,f=a*o,y=a*l;return t[0]=1-g-b,t[1]=d+y,t[2]=c-f,t[3]=0,t[4]=d-y,t[5]=1-h-b,t[6]=u+m,t[7]=0,t[8]=c+f,t[9]=u-m,t[10]=1-h-g,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function pe(t,e,r,n,i){var a=1/Math.tan(e/2);if(t[0]=a/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,i!=null&&i!==1/0){var s=1/(n-i);t[10]=(i+n)*s,t[14]=2*i*n*s}else t[10]=-1,t[14]=-2*n;return t}var Se=pe;function K(t,e,r,n){var i,a,s,o,l,h,d,g,c,u,b=e[0],m=e[1],f=e[2],y=n[0],w=n[1],v=n[2],S=r[0],_=r[1],p=r[2];return Math.abs(b-S)<N&&Math.abs(m-_)<N&&Math.abs(f-p)<N?be(t):(d=b-S,g=m-_,c=f-p,u=1/Math.sqrt(d*d+g*g+c*c),d*=u,g*=u,c*=u,i=w*c-v*g,a=v*d-y*c,s=y*g-w*d,u=Math.sqrt(i*i+a*a+s*s),u?(u=1/u,i*=u,a*=u,s*=u):(i=0,a=0,s=0),o=g*s-c*a,l=c*i-d*s,h=d*a-g*i,u=Math.sqrt(o*o+l*l+h*h),u?(u=1/u,o*=u,l*=u,h*=u):(o=0,l=0,h=0),t[0]=i,t[1]=o,t[2]=d,t[3]=0,t[4]=a,t[5]=l,t[6]=g,t[7]=0,t[8]=s,t[9]=h,t[10]=c,t[11]=0,t[12]=-(i*b+a*m+s*f),t[13]=-(o*b+l*m+h*f),t[14]=-(d*b+g*m+c*f),t[15]=1,t)}function U(){var t=new T(3);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function ye(t){var e=t[0],r=t[1],n=t[2];return Math.sqrt(e*e+r*r+n*n)}function M(t,e,r){var n=new T(3);return n[0]=t,n[1]=e,n[2]=r,n}function we(t,e,r,n){return t[0]=e,t[1]=r,t[2]=n,t}function q(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a)),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a,t}function oe(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function V(t,e,r){var n=e[0],i=e[1],a=e[2],s=r[0],o=r[1],l=r[2];return t[0]=i*l-a*o,t[1]=a*s-n*l,t[2]=n*o-i*s,t}function Ee(t,e,r){var n=e[0],i=e[1],a=e[2],s=r[3]*n+r[7]*i+r[11]*a+r[15];return s=s||1,t[0]=(r[0]*n+r[4]*i+r[8]*a+r[12])/s,t[1]=(r[1]*n+r[5]*i+r[9]*a+r[13])/s,t[2]=(r[2]*n+r[6]*i+r[10]*a+r[14])/s,t}var xe=ye;(function(){var t=U();return function(e,r,n,i,a,s){var o,l;for(r||(r=3),n||(n=0),i?l=Math.min(i*r+n,e.length):l=e.length,o=n;o<l;o+=r)t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],a(t,t,s),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2];return e}})();function Ae(){var t=new T(4);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function Me(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],s=r*r+n*n+i*i+a*a;return s>0&&(s=1/Math.sqrt(s)),t[0]=r*s,t[1]=n*s,t[2]=i*s,t[3]=a*s,t}(function(){var t=Ae();return function(e,r,n,i,a,s){var o,l;for(r||(r=4),n||(n=0),i?l=Math.min(i*r+n,e.length):l=e.length,o=n;o<l;o+=r)t[0]=e[o],t[1]=e[o+1],t[2]=e[o+2],t[3]=e[o+3],a(t,t,s),e[o]=t[0],e[o+1]=t[1],e[o+2]=t[2],e[o+3]=t[3];return e}})();function B(){var t=new T(4);return T!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function le(t,e,r){r=r*.5;var n=Math.sin(r);return t[0]=n*e[0],t[1]=n*e[1],t[2]=n*e[2],t[3]=Math.cos(r),t}function Te(t,e,r){var n=e[0],i=e[1],a=e[2],s=e[3],o=r[0],l=r[1],h=r[2],d=r[3];return t[0]=n*d+s*o+i*h-a*l,t[1]=i*d+s*l+a*o-n*h,t[2]=a*d+s*h+n*l-i*o,t[3]=s*d-n*o-i*l-a*h,t}function G(t,e,r,n){var i=e[0],a=e[1],s=e[2],o=e[3],l=r[0],h=r[1],d=r[2],g=r[3],c,u,b,m,f;return u=i*l+a*h+s*d+o*g,u<0&&(u=-u,l=-l,h=-h,d=-d,g=-g),1-u>N?(c=Math.acos(u),b=Math.sin(c),m=Math.sin((1-n)*c)/b,f=Math.sin(n*c)/b):(m=1-n,f=n),t[0]=m*i+f*l,t[1]=m*a+f*h,t[2]=m*s+f*d,t[3]=m*o+f*g,t}function Re(t,e){var r=e[0]+e[4]+e[8],n;if(r>0)n=Math.sqrt(r+1),t[3]=.5*n,n=.5/n,t[0]=(e[5]-e[7])*n,t[1]=(e[6]-e[2])*n,t[2]=(e[1]-e[3])*n;else{var i=0;e[4]>e[0]&&(i=1),e[8]>e[i*3+i]&&(i=2);var a=(i+1)%3,s=(i+2)%3;n=Math.sqrt(e[i*3+i]-e[a*3+a]-e[s*3+s]+1),t[i]=.5*n,n=.5/n,t[3]=(e[a*3+s]-e[s*3+a])*n,t[a]=(e[a*3+i]+e[i*3+a])*n,t[s]=(e[s*3+i]+e[i*3+s])*n}return t}var ce=Me;(function(){var t=U(),e=M(1,0,0),r=M(0,1,0);return function(n,i,a){var s=oe(i,a);return s<-.999999?(V(t,e,i),xe(t)<1e-6&&V(t,r,i),q(t,t),le(n,t,Math.PI),n):s>.999999?(n[0]=0,n[1]=0,n[2]=0,n[3]=1,n):(V(t,i,a),n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=1+s,ce(n,n))}})();(function(){var t=B(),e=B();return function(r,n,i,a,s,o){return G(t,n,s,o),G(e,i,a,o),G(r,t,e,2*o*(1-o)),r}})();(function(){var t=ae();return function(e,r,n,i){return t[0]=n[0],t[3]=n[1],t[6]=n[2],t[1]=i[0],t[4]=i[1],t[7]=i[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],ce(e,Re(e,t))}})();class Fe{constructor(e,r=5,n={rotation:1,zoom:.001}){this.canvas=e,this.distance=r,this.rotation=B(),this.position=M(0,0,r),this.target=U(),this.up=M(0,1,0),this.rotationSensitivity=n.rotation||1,this.zoomSensitivity=n.zoom||.001,this.dragging=!1,this.lastMouseX=0,this.lastMouseY=0,e.addEventListener("mousedown",this.onMouseDown.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this)),e.addEventListener("mouseup",this.onMouseUp.bind(this)),e.addEventListener("wheel",this.onWheel.bind(this))}getArcballVector(e,r){const n=this.canvas.getBoundingClientRect(),i={x:n.width*.5,y:n.height*.5},a=(e-i.x)/i.x,s=(i.y-r)/i.y,o=a*a+s*s,l=o<=1?Math.sqrt(1-o):0,h=M(a,s,l);return q(h,h),h}onMouseDown(e){this.dragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY}onMouseMove(e){if(!this.dragging)return;const r=e.clientX,n=e.clientY,i=this.getArcballVector(this.lastMouseX,this.lastMouseY),a=this.getArcballVector(r,n),s=Math.acos(Math.min(1,oe(i,a)))*this.rotationSensitivity,o=U();V(o,a,i),q(o,o);const l=B();le(l,o,s),Te(this.rotation,l,this.rotation),this.lastMouseX=r,this.lastMouseY=n}onMouseUp(){this.dragging=!1}onWheel(e){this.distance+=e.deltaY*this.zoomSensitivity*this.distance,this.distance=Math.max(.1,Math.min(100,this.distance)),we(this.position,0,0,this.distance),e.preventDefault()}getViewMatrix(){const e=A(),r=A();ne(r,this.rotation);const n=U();return Ee(n,this.position,r),K(e,n,this.target,this.up),e}getModelRotMatrix(){const e=A();return ne(e,this.rotation),e}getViewCamDistanceMatrix(){const e=A();return K(e,this.position,this.target,this.up),e}reset(){this.rotation=B(),this.position=M(0,0,this.distance),this.target=M(0,0,0)}}class J{constructor(e){this.gl=e,this.vao=null,this.vbo=null,this.ebo=null,this.indexCount=0,this.vertices=null,this.normals=null,this.colors=null,this.texCoords=null,this.indices=null,this.faceNormals=null,this.vertexNormals=null}static async load(e,r,n={}){const i=await fetch(r);if(!i.ok)throw new Error(`OBJ 파일 로드 실패: ${r}`);const a=await i.text(),s=new J(e);return s._parse(a,n),s._computeNormals(),s.initBuffers(),s}_parse(e,r){const n=[],i=[],a=[],s=new Map,o=[],l=[],h=[],d=[],g=[],c=r.color||[.8,.8,.8,1],u=e.split(/\r?\n/);for(const b of u){const m=b.trim();if(!m||m.startsWith("#"))continue;const f=m.split(/\s+/),y=f[0];if(y==="v")n.push([parseFloat(f[1]),parseFloat(f[2]),parseFloat(f[3])]);else if(y==="vt")i.push([parseFloat(f[1]),parseFloat(f[2])]);else if(y==="vn")a.push([parseFloat(f[1]),parseFloat(f[2]),parseFloat(f[3])]);else if(y==="f"){const w=f.slice(1).map(v=>{const[S,_,p]=v.split("/").map(R=>R?parseInt(R)-1:-1);return{vi:S,ti:_,ni:p}});for(let v=1;v<w.length-1;v++){const S=[w[0],w[v],w[v+1]];for(const _ of S){const p=`${_.vi}/${_.ti}/${_.ni}`;if(!s.has(p)){const R=o.length/3;s.set(p,R);const L=n[_.vi]||[0,0,0];o.push(L[0],L[1],L[2]);const P=_.ni>=0?a[_.ni]:[0,1,0];l.push(P[0],P[1],P[2]),h.push(...c);const F=_.ti>=0?i[_.ti]:[0,0];d.push(F[0],F[1])}g.push(s.get(p))}}}}this._normalize(o),this.vertices=new Float32Array(o),this.normals=new Float32Array(l),this.colors=new Float32Array(h),this.texCoords=new Float32Array(d),this.indices=new Uint32Array(g)}_normalize(e){let r=1/0,n=-1/0,i=1/0,a=-1/0,s=1/0,o=-1/0;for(let c=0;c<e.length;c+=3)r=Math.min(r,e[c]),n=Math.max(n,e[c]),i=Math.min(i,e[c+1]),a=Math.max(a,e[c+1]),s=Math.min(s,e[c+2]),o=Math.max(o,e[c+2]);const l=(r+n)/2,h=(i+a)/2,d=(s+o)/2,g=1/Math.max(n-r,a-i,o-s);for(let c=0;c<e.length;c+=3)e[c]=(e[c]-l)*g,e[c+1]=(e[c+1]-h)*g,e[c+2]=(e[c+2]-d)*g}_computeNormals(){const e=this.vertices.length/3;this.faceNormals=new Float32Array(this.normals),this.vertexNormals=new Float32Array(this.normals.length);const r=new Float32Array(this.normals.length),n=new Uint32Array(e),i=this.indices,a=this.vertices;for(let s=0;s<i.length;s+=3){const o=i[s],l=i[s+1],h=i[s+2],d=a[l*3]-a[o*3],g=a[l*3+1]-a[o*3+1],c=a[l*3+2]-a[o*3+2],u=a[h*3]-a[o*3],b=a[h*3+1]-a[o*3+1],m=a[h*3+2]-a[o*3+2],f=g*m-c*b,y=c*u-d*m,w=d*b-g*u;for(const v of[o,l,h])r[v*3]+=f,r[v*3+1]+=y,r[v*3+2]+=w,n[v]++}for(let s=0;s<e;s++){const o=n[s]||1;let l=r[s*3]/o,h=r[s*3+1]/o,d=r[s*3+2]/o;const g=Math.sqrt(l*l+h*h+d*d)||1;this.vertexNormals[s*3]=l/g,this.vertexNormals[s*3+1]=h/g,this.vertexNormals[s*3+2]=d/g}this.normals=new Float32Array(this.vertexNormals)}copyVertexNormalsToNormals(){this.normals.set(this.vertexNormals)}copyFaceNormalsToNormals(){this.normals.set(this.faceNormals)}initBuffers(){const e=this.gl;this.vao=e.createVertexArray(),this.vbo=e.createBuffer(),this.ebo=e.createBuffer(),this.indexCount=this.indices.length;const r=this.vertices.byteLength,n=this.normals.byteLength,i=this.colors.byteLength,a=this.texCoords.byteLength,s=r+n+i+a;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bufferSubData(e.ARRAY_BUFFER,r+n,this.colors),e.bufferSubData(e.ARRAY_BUFFER,r+n+i,this.texCoords),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.ebo),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,r),e.vertexAttribPointer(2,4,e.FLOAT,!1,0,r+n),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,r+n+i),e.enableVertexAttribArray(0),e.enableVertexAttribArray(1),e.enableVertexAttribArray(2),e.enableVertexAttribArray(3),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}updateNormals(){const e=this.gl,r=this.vertices.byteLength;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}draw(e){const r=this.gl;e.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_INT,0),r.bindVertexArray(null)}delete(){const e=this.gl;this.vbo&&e.deleteBuffer(this.vbo),this.ebo&&e.deleteBuffer(this.ebo),this.vao&&e.deleteVertexArray(this.vao),this.vbo=null,this.ebo=null,this.vao=null}}class Le{constructor(e,r={}){this.gl=e,this.radius=r.radius??4,this.segments=Math.max(3,r.segments??96),this.color=r.color??[.78,.78,.72,1],this.vao=e.createVertexArray(),this.vbo=e.createBuffer(),this.ebo=e.createBuffer(),this._initGeometry(),this._initBuffers()}_initGeometry(){const e=[],r=[],n=[],i=[],a=[];e.push(0,0,0),r.push(0,1,0),n.push(...this.color),i.push(.5,.5);for(let s=0;s<=this.segments;s++){const o=s/this.segments*Math.PI*2,l=Math.cos(o)*this.radius,h=Math.sin(o)*this.radius;e.push(l,0,h),r.push(0,1,0),n.push(...this.color),i.push(.5+.5*Math.cos(o),.5+.5*Math.sin(o))}for(let s=1;s<=this.segments;s++)a.push(0,s,s+1);this.vertices=new Float32Array(e),this.normals=new Float32Array(r),this.colors=new Float32Array(n),this.texCoords=new Float32Array(i),this.indices=new Uint16Array(a),this.indexCount=this.indices.length}_initBuffers(){const e=this.gl,r=this.vertices.byteLength,n=this.normals.byteLength,i=this.colors.byteLength,a=this.texCoords.byteLength,s=r+n+i+a;e.bindVertexArray(this.vao),e.bindBuffer(e.ARRAY_BUFFER,this.vbo),e.bufferData(e.ARRAY_BUFFER,s,e.STATIC_DRAW),e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices),e.bufferSubData(e.ARRAY_BUFFER,r,this.normals),e.bufferSubData(e.ARRAY_BUFFER,r+n,this.colors),e.bufferSubData(e.ARRAY_BUFFER,r+n+i,this.texCoords),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.ebo),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW),e.vertexAttribPointer(0,3,e.FLOAT,!1,0,0),e.vertexAttribPointer(1,3,e.FLOAT,!1,0,r),e.vertexAttribPointer(2,4,e.FLOAT,!1,0,r+n),e.vertexAttribPointer(3,2,e.FLOAT,!1,0,r+n+i),e.enableVertexAttribArray(0),e.enableVertexAttribArray(1),e.enableVertexAttribArray(2),e.enableVertexAttribArray(3),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindVertexArray(null)}draw(e){const r=this.gl;e.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_SHORT,0),r.bindVertexArray(null)}delete(){const e=this.gl;e.deleteBuffer(this.vbo),e.deleteBuffer(this.ebo),e.deleteVertexArray(this.vao)}}const Pe=`#version 300 es\r
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
} `,Ce=`#version 300 es\r
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
} `,Ie=`#version 300 es\r
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
}`,Ue=`#version 300 es\r
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
`,Be=`#version 300 es\r
precision mediump float;\r
\r
uniform vec4 u_shadowColor;\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = u_shadowColor;\r
}\r
`;class X{constructor(e,r,n){this.gl=e,this.program=this._createProgram(r,n)}use(){this.gl.useProgram(this.program)}setInt(e,r){this.gl.uniform1i(this.gl.getUniformLocation(this.program,e),r)}setFloat(e,r){this.gl.uniform1f(this.gl.getUniformLocation(this.program,e),r)}setVec3(e,r){this.gl.uniform3fv(this.gl.getUniformLocation(this.program,e),r)}setVec4(e,r){this.gl.uniform4fv(this.gl.getUniformLocation(this.program,e),r)}setMat3(e,r){this.gl.uniformMatrix3fv(this.gl.getUniformLocation(this.program,e),!1,r)}setMat4(e,r){this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program,e),!1,r)}delete(){this.gl.deleteProgram(this.program)}_createProgram(e,r){const n=this.gl,i=this._compileShader(n.VERTEX_SHADER,e),a=this._compileShader(n.FRAGMENT_SHADER,r),s=n.createProgram();if(n.attachShader(s,i),n.attachShader(s,a),n.linkProgram(s),!n.getProgramParameter(s,n.LINK_STATUS)){const o=n.getProgramInfoLog(s);throw n.deleteProgram(s),n.deleteShader(i),n.deleteShader(a),new Error(`Shader program link failed: ${o}`)}return n.deleteShader(i),n.deleteShader(a),s}_compileShader(e,r){const n=this.gl,i=n.createShader(e);if(n.shaderSource(i,r),n.compileShader(i),!n.getShaderParameter(i,n.COMPILE_STATUS)){const a=n.getShaderInfoLog(i);throw n.deleteShader(i),new Error(`Shader compile failed: ${a}`)}return i}}class Q extends ${constructor(e,r){super(e),this.selectedStageId=r,this.timer=0,this.hintCount=0,this.matchRate=0,this._onKeyDown=this._onKeyDown.bind(this),this.arcball=new Fe(this.gl.canvas,5,{rotation:1.2,zoom:0}),this.floorY=-2.2,this.lightPosition=M(2.8,8,2.4),this.viewPosition=M(0,2.4,6.5)}async enter(){const e=O.getById(this.selectedStageId);if(!e){console.error(`Stage with ID ${this.selectedStageId} not found!`),E.changeScene(new te(this.gl,{stageId:this.selectedStageId,time:0,hintCount:0}));return}this.stageId=e.id,this.stageName=e?e.name:`Stage ${this.stageId+1}`,this.assetsPath=e?e.assetsPath:null,this.targetShadowImage=e?e.targetShadow:null,this._initGLState(),await this._initSceneResources(),this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI(),this._deleteSceneResources()}update(e){this.timer+=e,this._updateHUD(),this.matchRate>=.95&&this._stageClear(this.stageId)}render(){const e=this.gl;if(!this.cube||!this.floor||!this.objectShader||!this.shadowShader)return;e.clearColor(.94,.94,.94,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const{view:r,projection:n}=this._getCameraMatrices(),i=this._getCubeModelMatrix(),a=A();z(a,a,[0,this.floorY,0]),this._drawLitObject(this.floor,a,r,n,this.floorTexture);const s=this._getShadowModelMatrix(i);e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.depthMask(!1),this._drawShadowObject(this.cube,s,r,n),e.depthMask(!0),e.disable(e.BLEND),this._drawLitObject(this.cube,i,r,n);const o=A();z(o,o,this.lightPosition),re(o,o,[.14,.14,.14]),this._drawLamp(o,r,n)}_initGLState(){const e=this.gl;e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.enable(e.CULL_FACE),e.cullFace(e.BACK)}async _initSceneResources(){const e=this.gl;this.cube=await J.load(e,"./assets/stage1/1.obj"),this.floor=new Le(e,{radius:4.2,segments:128,color:[.85,.78,.68,1]}),this.objectShader=new X(e,Pe,Ce),this.lampShader=new X(e,Ie,De),this.shadowShader=new X(e,Ue,Be),this.whiteTexture=this._createSingleColorTexture([255,255,255,255]),this.floorTexture=this._createSingleColorTexture([217,199,173,255])}_deleteSceneResources(){this.cube?.delete?.(),this.floor?.delete?.(),this.objectShader?.delete?.(),this.lampShader?.delete?.(),this.shadowShader?.delete?.(),this.whiteTexture&&this.gl.deleteTexture(this.whiteTexture),this.floorTexture&&this.gl.deleteTexture(this.floorTexture),this.cube=null,this.floor=null,this.objectShader=null,this.lampShader=null,this.shadowShader=null,this.whiteTexture=null}_createSingleColorTexture(e){const r=this.gl,n=r.createTexture();return r.bindTexture(r.TEXTURE_2D,n),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(e)),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.bindTexture(r.TEXTURE_2D,null),n}_getCameraMatrices(){const e=this.gl,r=e.canvas.width/Math.max(e.canvas.height,1),n=A(),i=A();return K(n,this.viewPosition,M(0,-.15,0),M(0,1,0)),Se(i,Math.PI/4,r,.1,100),{view:n,projection:i}}_getCubeModelMatrix(){const e=A(),r=this.arcball.getModelRotMatrix();return z(e,e,[0,.55,0]),k(e,e,r),re(e,e,[1.45,1.45,1.45]),e}_getShadowModelMatrix(e){const r=this._createPlaneShadowMatrix([0,1,0,-this.floorY],[this.lightPosition[0],this.lightPosition[1],this.lightPosition[2],1]),n=A(),i=A();return z(n,n,[0,.004,0]),k(i,n,r),k(i,i,e),i}_createPlaneShadowMatrix(e,r){const n=e[0]*r[0]+e[1]*r[1]+e[2]*r[2]+e[3]*r[3],i=A();for(let a=0;a<4;a++)for(let s=0;s<4;s++)i[a*4+s]=n*(s===a?1:0)-r[s]*e[a];return i}_drawLitObject(e,r,n,i){const a=this.gl,s=this.objectShader,o=ae();_e(o,r),s.use(),s.setMat4("u_model",r),s.setMat4("u_view",n),s.setMat4("u_projection",i),s.setVec3("u_viewPos",this.viewPosition),s.setVec3("light.position",this.lightPosition),s.setVec3("light.ambient",[.35,.35,.35]),s.setVec3("light.diffuse",[.82,.82,.82]),s.setVec3("light.specular",[.35,.35,.35]),s.setVec3("light.direction",M(-this.lightPosition[0],-this.lightPosition[1],-this.lightPosition[2])),s.setFloat("light.cutOff",Math.PI/5),s.setFloat("light.outerCutOff",Math.PI/4),s.setFloat("light.constant",1),s.setFloat("light.linear",.045),s.setFloat("light.quadratic",.0075),s.setVec3("material.specular",[.2,.2,.2]),s.setFloat("material.shininess",32),s.setInt("material.diffuse",0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this.whiteTexture),e.draw(s)}_drawShadowObject(e,r,n,i){const a=this.shadowShader;a.use(),a.setMat4("u_model",r),a.setMat4("u_view",n),a.setMat4("u_projection",i),a.setVec4("u_shadowColor",[0,0,0,.38]),e.draw(a)}_drawLamp(e,r,n){const i=this.lampShader;i.use(),i.setMat4("u_model",e),i.setMat4("u_view",r),i.setMat4("u_projection",n),this.cube.draw(i)}_stageClear(e){E.changeScene(new te(this.gl,{stageId:e,time:this.timer,hintCount:this.hintCount}))}_useHint(){this.hintCount++,console.log("Hint used!")}_buildUI(){this._ui=document.createElement("div"),this._ui.id="game-hud",this._ui.innerHTML=`

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
        `,document.body.appendChild(this._ui),document.getElementById("btn-back").addEventListener("click",()=>{this._goToStageSelect()}),document.getElementById("btn-hint").addEventListener("click",()=>{this._useHint()}),document.getElementById("btn-debug-clear").addEventListener("click",()=>{this._stageClear(this.stageId)})}_updateHUD(){const e=String(Math.floor(this.timer/60)).padStart(2,"0"),r=String(Math.floor(this.timer%60)).padStart(2,"0"),n=document.getElementById("hud-timer"),i=document.getElementById("panel-match-bar-fill");if(n&&(n.textContent=`${e}:${r}`),i){const a=Math.floor(this.matchRate*100);i.style.width=`${a}%`,a>=80?i.dataset.level="high":a>=40?i.dataset.level="mid":i.dataset.level="low"}}_removeUI(){this._ui?.remove()}_goToStageSelect(){C(async()=>{const{default:e}=await Promise.resolve().then(()=>he);return{default:e}},void 0).then(({default:e})=>{E.changeScene(new e(this.gl))})}_onKeyDown(e){e.key==="h"&&this._useHint(),e.key==="Escape"&&this._goToStageSelect()}}const ie=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));class W extends ${constructor(e){super(e),this.stages=[],this.selectedStageId=0,this._ui=null,this._onKeyDown=this._onKeyDown.bind(this)}async enter(){if(this.stages=O.getAll(),!this.stages||this.stages.length===0){console.error("No stages loaded.");return}this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._removeUI(),this._ui=document.createElement("div"),this._ui.id="stage-select",this._ui.innerHTML=`
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
        `,document.body.appendChild(this._ui),this._ui.querySelectorAll(".stage-card").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.index);H.isUnlocked(i)&&this._startStage(i)})}),this._ui.querySelector("#btn-back").addEventListener("click",async()=>{const{default:n}=await C(async()=>{const{default:i}=await Promise.resolve().then(()=>se);return{default:i}},void 0);E.changeScene(new n(this.gl))})}_removeUI(){this._ui&&(this._ui.remove(),this._ui=null)}_startStage(e){const r=this.stages[e];if(!r){console.error("Invalid stage index:",e);return}console.log("Starting Stage:",r),E.changeScene(new Q(this.gl,e))}async _onKeyDown(e){if(e.key==="Escape"){const{default:r}=await C(async()=>{const{default:n}=await Promise.resolve().then(()=>se);return{default:n}},void 0);E.changeScene(new r(this.gl))}}}const he=Object.freeze(Object.defineProperty({__proto__:null,default:W},Symbol.toStringTag,{value:"Module"}));class de extends ${constructor(e){super(e),this._onKeyDown=this._onKeyDown.bind(this)}enter(){this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="main-menu",this._ui.innerHTML=`
            <h1>Shadow Match</h1>
            <button id="btn-start">New Start</button>
            <button id="btn-stage">Select Stage</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-start").addEventListener("click",()=>{E.changeScene(new Q(this.gl,0))}),document.getElementById("btn-stage").addEventListener("click",()=>{E.changeScene(new W(this.gl))})}_removeUI(){this._ui?.remove()}_onKeyDown(e){e.key==="Enter"&&E.changeScene(new W(this.gl))}}const se=Object.freeze(Object.defineProperty({__proto__:null,default:de},Symbol.toStringTag,{value:"Module"}));class Oe{constructor(){this.canvas=null,this.gl=null,this._lastTime=null}async initialize(){if(await O.load(),this.canvas=document.getElementById("gameCanvas"),this.gl=this.canvas.getContext("webgl2"),!this.gl){alert("WebGL2 not supported");return}this.resize(),window.addEventListener("resize",()=>{this.resize()}),E.changeScene(new de(this.gl))}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.gl&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}run(){const e=r=>{this._lastTime===null&&(this._lastTime=r);const n=(r-this._lastTime)/1e3;this._lastTime=r,E.update(n),E.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}}window.addEventListener("DOMContentLoaded",()=>{const t=new Oe;t.initialize(),t.run()});
