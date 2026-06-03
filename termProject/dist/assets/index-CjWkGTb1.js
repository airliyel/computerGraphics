(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();class gt{constructor(){this.currentScene=null}changeScene(t){this.currentScene&&this.currentScene.exit(),this.currentScene=t,this.currentScene&&this.currentScene.enter()}update(t){this.currentScene&&this.currentScene.update(t)}render(){this.currentScene&&this.currentScene.render()}}const E=new gt;class tt{constructor(t){this.gl=t}enter(){}exit(){}update(){}render(){}}const vt="modulepreload",mt=function(e){return"/"+e},it={},I=function(t,r,i){let s=Promise.resolve();if(r&&r.length>0){let c=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var a=c;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(r.map(h=>{if(h=mt(h),h in it)return;it[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":vt,u||(f.as="script"),f.crossOrigin="",f.href=h,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((m,v)=>{f.addEventListener("load",m),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function n(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&n(l.reason);return t().catch(n)})};var V=1e-6,T=typeof Float32Array<"u"?Float32Array:Array;function et(){var e=new T(9);return T!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function lt(e,t){var r=t[0],i=t[1],s=t[2],n=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],w=t[15],y=r*o-i*a,_=r*l-s*a,S=r*c-n*a,p=i*l-s*o,b=i*c-n*o,R=s*c-n*l,P=h*v-u*m,C=h*g-d*m,L=h*w-f*m,Y=u*g-d*v,B=u*w-f*v,k=d*w-f*g,A=y*k-_*B+S*Y+p*L-b*C+R*P;return A?(A=1/A,e[0]=(o*k-l*B+c*Y)*A,e[1]=(l*L-a*k-c*C)*A,e[2]=(a*B-o*L+c*P)*A,e[3]=(s*B-i*k-n*Y)*A,e[4]=(r*k-s*L+n*C)*A,e[5]=(i*L-r*B-n*P)*A,e[6]=(v*R-g*b+w*p)*A,e[7]=(g*S-m*R-w*_)*A,e[8]=(m*b-v*S+w*y)*A,e):null}function x(){var e=new T(16);return T!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function _t(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function D(e,t,r){var i=t[0],s=t[1],n=t[2],a=t[3],o=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=t[9],f=t[10],m=t[11],v=t[12],g=t[13],w=t[14],y=t[15],_=r[0],S=r[1],p=r[2],b=r[3];return e[0]=_*i+S*o+p*u+b*v,e[1]=_*s+S*l+p*d+b*g,e[2]=_*n+S*c+p*f+b*w,e[3]=_*a+S*h+p*m+b*y,_=r[4],S=r[5],p=r[6],b=r[7],e[4]=_*i+S*o+p*u+b*v,e[5]=_*s+S*l+p*d+b*g,e[6]=_*n+S*c+p*f+b*w,e[7]=_*a+S*h+p*m+b*y,_=r[8],S=r[9],p=r[10],b=r[11],e[8]=_*i+S*o+p*u+b*v,e[9]=_*s+S*l+p*d+b*g,e[10]=_*n+S*c+p*f+b*w,e[11]=_*a+S*h+p*m+b*y,_=r[12],S=r[13],p=r[14],b=r[15],e[12]=_*i+S*o+p*u+b*v,e[13]=_*s+S*l+p*d+b*g,e[14]=_*n+S*c+p*f+b*w,e[15]=_*a+S*h+p*m+b*y,e}function O(e,t,r){var i=r[0],s=r[1],n=r[2],a,o,l,c,h,u,d,f,m,v,g,w;return t===e?(e[12]=t[0]*i+t[4]*s+t[8]*n+t[12],e[13]=t[1]*i+t[5]*s+t[9]*n+t[13],e[14]=t[2]*i+t[6]*s+t[10]*n+t[14],e[15]=t[3]*i+t[7]*s+t[11]*n+t[15]):(a=t[0],o=t[1],l=t[2],c=t[3],h=t[4],u=t[5],d=t[6],f=t[7],m=t[8],v=t[9],g=t[10],w=t[11],e[0]=a,e[1]=o,e[2]=l,e[3]=c,e[4]=h,e[5]=u,e[6]=d,e[7]=f,e[8]=m,e[9]=v,e[10]=g,e[11]=w,e[12]=a*i+h*s+m*n+t[12],e[13]=o*i+u*s+v*n+t[13],e[14]=l*i+d*s+g*n+t[14],e[15]=c*i+f*s+w*n+t[15]),e}function X(e,t,r){var i=r[0],s=r[1],n=r[2];return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*s,e[5]=t[5]*s,e[6]=t[6]*s,e[7]=t[7]*s,e[8]=t[8]*n,e[9]=t[9]*n,e[10]=t[10]*n,e[11]=t[11]*n,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function pt(e,t,r){var i=Math.sin(r),s=Math.cos(r),n=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=n*s+c*i,e[5]=a*s+h*i,e[6]=o*s+u*i,e[7]=l*s+d*i,e[8]=c*s-n*i,e[9]=h*s-a*i,e[10]=u*s-o*i,e[11]=d*s-l*i,e}function bt(e,t,r){var i=Math.sin(r),s=Math.cos(r),n=t[0],a=t[1],o=t[2],l=t[3],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*s-c*i,e[1]=a*s-h*i,e[2]=o*s-u*i,e[3]=l*s-d*i,e[8]=n*i+c*s,e[9]=a*i+h*s,e[10]=o*i+u*s,e[11]=l*i+d*s,e}function wt(e,t,r){var i=Math.sin(r),s=Math.cos(r),n=t[0],a=t[1],o=t[2],l=t[3],c=t[4],h=t[5],u=t[6],d=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=n*s+c*i,e[1]=a*s+h*i,e[2]=o*s+u*i,e[3]=l*s+d*i,e[4]=c*s-n*i,e[5]=h*s-a*i,e[6]=u*s-o*i,e[7]=d*s-l*i,e}function Q(e,t){var r=t[0],i=t[1],s=t[2],n=t[3],a=r+r,o=i+i,l=s+s,c=r*a,h=i*a,u=i*o,d=s*a,f=s*o,m=s*l,v=n*a,g=n*o,w=n*l;return e[0]=1-u-m,e[1]=h+w,e[2]=d-g,e[3]=0,e[4]=h-w,e[5]=1-c-m,e[6]=f+v,e[7]=0,e[8]=d+g,e[9]=f-v,e[10]=1-c-u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function St(e,t,r,i,s){var n=1/Math.tan(t/2);if(e[0]=n/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,s!=null&&s!==1/0){var a=1/(i-s);e[10]=(s+i)*a,e[14]=2*s*i*a}else e[10]=-1,e[14]=-2*i;return e}var ct=St;function $(e,t,r,i){var s,n,a,o,l,c,h,u,d,f,m=t[0],v=t[1],g=t[2],w=i[0],y=i[1],_=i[2],S=r[0],p=r[1],b=r[2];return Math.abs(m-S)<V&&Math.abs(v-p)<V&&Math.abs(g-b)<V?_t(e):(h=m-S,u=v-p,d=g-b,f=1/Math.sqrt(h*h+u*u+d*d),h*=f,u*=f,d*=f,s=y*d-_*u,n=_*h-w*d,a=w*u-y*h,f=Math.sqrt(s*s+n*n+a*a),f?(f=1/f,s*=f,n*=f,a*=f):(s=0,n=0,a=0),o=u*a-d*n,l=d*s-h*a,c=h*n-u*s,f=Math.sqrt(o*o+l*l+c*c),f?(f=1/f,o*=f,l*=f,c*=f):(o=0,l=0,c=0),e[0]=s,e[1]=o,e[2]=h,e[3]=0,e[4]=n,e[5]=l,e[6]=u,e[7]=0,e[8]=a,e[9]=c,e[10]=d,e[11]=0,e[12]=-(s*m+n*v+a*g),e[13]=-(o*m+l*v+c*g),e[14]=-(h*m+u*v+d*g),e[15]=1,e)}function N(){var e=new T(3);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function yt(e){var t=e[0],r=e[1],i=e[2];return Math.sqrt(t*t+r*r+i*i)}function M(e,t,r){var i=new T(3);return i[0]=e,i[1]=t,i[2]=r,i}function xt(e,t,r,i){return e[0]=t,e[1]=r,e[2]=i,e}function J(e,t){var r=t[0],i=t[1],s=t[2],n=r*r+i*i+s*s;return n>0&&(n=1/Math.sqrt(n)),e[0]=t[0]*n,e[1]=t[1]*n,e[2]=t[2]*n,e}function ht(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function H(e,t,r){var i=t[0],s=t[1],n=t[2],a=r[0],o=r[1],l=r[2];return e[0]=s*l-n*o,e[1]=n*a-i*l,e[2]=i*o-s*a,e}function Et(e,t,r){var i=t[0],s=t[1],n=t[2],a=r[3]*i+r[7]*s+r[11]*n+r[15];return a=a||1,e[0]=(r[0]*i+r[4]*s+r[8]*n+r[12])/a,e[1]=(r[1]*i+r[5]*s+r[9]*n+r[13])/a,e[2]=(r[2]*i+r[6]*s+r[10]*n+r[14])/a,e}var At=yt;(function(){var e=N();return function(t,r,i,s,n,a){var o,l;for(r||(r=3),i||(i=0),s?l=Math.min(s*r+i,t.length):l=t.length,o=i;o<l;o+=r)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],n(e,e,a),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2];return t}})();function Mt(){var e=new T(4);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Tt(e,t){var r=t[0],i=t[1],s=t[2],n=t[3],a=r*r+i*i+s*s+n*n;return a>0&&(a=1/Math.sqrt(a)),e[0]=r*a,e[1]=i*a,e[2]=s*a,e[3]=n*a,e}(function(){var e=Mt();return function(t,r,i,s,n,a){var o,l;for(r||(r=4),i||(i=0),s?l=Math.min(s*r+i,t.length):l=t.length,o=i;o<l;o+=r)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],e[3]=t[o+3],n(e,e,a),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2],t[o+3]=e[3];return t}})();function z(){var e=new T(4);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function dt(e,t,r){r=r*.5;var i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e}function Rt(e,t,r){var i=t[0],s=t[1],n=t[2],a=t[3],o=r[0],l=r[1],c=r[2],h=r[3];return e[0]=i*h+a*o+s*c-n*l,e[1]=s*h+a*l+n*o-i*c,e[2]=n*h+a*c+i*l-s*o,e[3]=a*h-i*o-s*l-n*c,e}function G(e,t,r,i){var s=t[0],n=t[1],a=t[2],o=t[3],l=r[0],c=r[1],h=r[2],u=r[3],d,f,m,v,g;return f=s*l+n*c+a*h+o*u,f<0&&(f=-f,l=-l,c=-c,h=-h,u=-u),1-f>V?(d=Math.acos(f),m=Math.sin(d),v=Math.sin((1-i)*d)/m,g=Math.sin(i*d)/m):(v=1-i,g=i),e[0]=v*s+g*l,e[1]=v*n+g*c,e[2]=v*a+g*h,e[3]=v*o+g*u,e}function Lt(e,t){var r=t[0]+t[4]+t[8],i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{var s=0;t[4]>t[0]&&(s=1),t[8]>t[s*3+s]&&(s=2);var n=(s+1)%3,a=(s+2)%3;i=Math.sqrt(t[s*3+s]-t[n*3+n]-t[a*3+a]+1),e[s]=.5*i,i=.5/i,e[3]=(t[n*3+a]-t[a*3+n])*i,e[n]=(t[n*3+s]+t[s*3+n])*i,e[a]=(t[a*3+s]+t[s*3+a])*i}return e}var ut=Tt;(function(){var e=N(),t=M(1,0,0),r=M(0,1,0);return function(i,s,n){var a=ht(s,n);return a<-.999999?(H(e,t,s),At(e)<1e-6&&H(e,r,s),J(e,e),dt(i,e,Math.PI),i):a>.999999?(i[0]=0,i[1]=0,i[2]=0,i[3]=1,i):(H(e,s,n),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=1+a,ut(i,i))}})();(function(){var e=z(),t=z();return function(r,i,s,n,a,o){return G(e,i,a,o),G(t,s,n,o),G(r,e,t,2*o*(1-o)),r}})();(function(){var e=et();return function(t,r,i,s){return e[0]=i[0],e[3]=i[1],e[6]=i[2],e[1]=s[0],e[4]=s[1],e[7]=s[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],ut(t,Lt(t,e))}})();class Pt{constructor(t,r=5,i={rotation:1,zoom:.001}){this.canvas=t,this.distance=r,this.rotation=z(),this.position=M(0,0,r),this.target=N(),this.up=M(0,1,0),this.rotationSensitivity=i.rotation||1,this.zoomSensitivity=i.zoom||.001,this.dragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.locked=!1,t.addEventListener("mousedown",this.onMouseDown.bind(this)),t.addEventListener("mousemove",this.onMouseMove.bind(this)),t.addEventListener("mouseup",this.onMouseUp.bind(this)),t.addEventListener("wheel",this.onWheel.bind(this))}getArcballVector(t,r){const i=this.canvas.getBoundingClientRect(),s={x:i.width*.5,y:i.height*.5},n=(t-s.x)/s.x,a=(s.y-r)/s.y,o=n*n+a*a,l=o<=1?Math.sqrt(1-o):0,c=M(n,a,l);return J(c,c),c}onMouseDown(t){this.locked||(this.dragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}onMouseMove(t){if(this.locked||!this.dragging)return;const r=t.clientX,i=t.clientY,s=this.getArcballVector(this.lastMouseX,this.lastMouseY),n=this.getArcballVector(r,i),a=Math.acos(Math.min(1,ht(s,n)))*this.rotationSensitivity,o=N();H(o,n,s),J(o,o);const l=z();dt(l,o,a),Rt(this.rotation,l,this.rotation),this.lastMouseX=r,this.lastMouseY=i}onMouseUp(){this.dragging=!1}onWheel(t){this.locked||(this.distance+=t.deltaY*this.zoomSensitivity*this.distance,this.distance=Math.max(.1,Math.min(100,this.distance)),xt(this.position,0,0,this.distance),t.preventDefault())}getViewMatrix(){const t=x(),r=x();Q(r,this.rotation);const i=N();return Et(i,this.position,r),$(t,i,this.target,this.up),t}getModelRotMatrix(){const t=x();return Q(t,this.rotation),t}getViewCamDistanceMatrix(){const t=x();return $(t,this.position,this.target,this.up),t}reset(){this.rotation=z(),this.position=M(0,0,this.distance),this.target=M(0,0,0)}getRotationQuaternion(){return[...this.rotation]}}const Ct=[{id:0,name:"Entangled Rings",locked:!1,threestartime:60,highscore:0,modelPath:"./assets/stage1/1.obj",targetRotation:[.8307587504386902,-.269282728433609,-.12238621711730957,-.47153761982917786]},{id:1,name:"Steaming Pot",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage2/2.obj",targetRotation:[-.15073059499263763,.5118417739868164,.08972803503274918,.8409797549247742]},{id:2,name:"Elephant",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage3/elephant.obj",targetRotation:[.4711616635322571,.17007571458816528,-.39803582429885864,.7685361504554749]},{id:3,name:"Orbit",locked:!0,threestartime:30,highscore:0,modelPath:"./assets/stage4/GlobeSphere.obj",targetRotation:[.2292313277721405,.1008806899189949,-.5132355690002441,.8208932876586914]},{id:4,name:"Serpent",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage5/logo-2.obj",targetRotation:[-.8682363033294678,-.08870739489793777,.47231659293174744,-.12335232645273209]},{id:5,name:"Sixth Sense",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage6/logo-4.obj",targetRotation:[-.1802097057688702,-.6439810722828562,-.49313211189775336,.5564541883551011]}],It="/assets/1-CLboCkRT.obj",Ft="/assets/2-BCSWr1XE.obj",Dt="/assets/elephant-Dt6E6wCi.obj",Ut="/assets/GlobeSphere-B0fOtzlk.obj",Bt="/assets/logo-2-Dv-rsnbi.obj",kt="/assets/logo-4-D_RC6HTA.obj",Ot=[It,Ft,Dt,Ut,Bt,kt],U={_stages:Ct.map(e=>({...e,modelPath:Ot[e.id]})),async load(){},getAll(){return this._stages},getById(e){return this._stages.find(t=>t.id===e)||null},getTotalCount(){return this._stages.length}},q="shadowMatch_save",st={cleared:!1,bestScore:5999,bestStars:0},F={_load(){try{const e=window.localStorage.getItem(q);if(e!==null)return JSON.parse(e)}catch(e){console.error(e)}return{stages:{}}},_save(e){localStorage.setItem(q,JSON.stringify(e))},saveResult(e,{score:t,stars:r}){let i=this._load();e in i.stages?(i.stages[e].bestScore=Math.min(i.stages[e].bestScore,t),i.stages[e].bestStars=Math.max(i.stages[e].bestStars,r)):i.stages[e]={cleared:!0,bestScore:t,bestStars:r},this._save(i)},getResult(e){return this._load().stages[e]??st},unlockNext(e){let t=this._load().stages;e+1 in t||(t[e+1]=st)},isUnlocked(e){return e===0||this.getResult(e-1).cleared},reset(){window.localStorage.removeItem(q)}};class Nt{constructor(t){this.selectedStageId=t,this.threestarTime=0}async init(){const t=U.getById(this.selectedStageId);if(!t){console.error(`Stage with ID ${this.selectedStageId} not found!`);return}this.threestarTime=t.threestartime??60}calculate(t,r,i=0){const n=this.threestarTime/.25*(1-.75**r);t+=n;const a=this.threestarTime*2*(1+i);return 1+(t<=this.threestarTime)+(t<=a)}}class j{constructor(t){this.gl=t,this.vao=null,this.vbo=null,this.ebo=null,this.indexCount=0,this.vertices=null,this.normals=null,this.colors=null,this.texCoords=null,this.indices=null,this.faceNormals=null,this.vertexNormals=null}static async load(t,r,i={}){const s=await fetch(r);if(!s.ok)throw new Error(`OBJ 파일 로드 실패: ${r}`);const n=await s.text(),a=new j(t);return a._parse(n,i),a._computeNormals(),a.initBuffers(),a}_parse(t,r){const i=[],s=[],n=[],a=new Map,o=[],l=[],c=[],h=[],u=[],d=r.color||[.8,.8,.8,1],f=t.split(/\r?\n/);for(const m of f){const v=m.trim();if(!v||v.startsWith("#"))continue;const g=v.split(/\s+/),w=g[0];if(w==="v")i.push([parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3])]);else if(w==="vt")s.push([parseFloat(g[1]),parseFloat(g[2])]);else if(w==="vn")n.push([parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3])]);else if(w==="f"){const y=g.slice(1).map(_=>{const[S,p,b]=_.split("/").map(R=>R?parseInt(R)-1:-1);return{vi:S,ti:p,ni:b}});for(let _=1;_<y.length-1;_++){const S=[y[0],y[_],y[_+1]];for(const p of S){const b=`${p.vi}/${p.ti}/${p.ni}`;if(!a.has(b)){const R=o.length/3;a.set(b,R);const P=i[p.vi]||[0,0,0];o.push(P[0],P[1],P[2]);const C=p.ni>=0?n[p.ni]:[0,1,0];l.push(C[0],C[1],C[2]),c.push(...d);const L=p.ti>=0?s[p.ti]:[0,0];h.push(L[0],L[1])}u.push(a.get(b))}}}}this._normalize(o),this.vertices=new Float32Array(o),this.normals=new Float32Array(l),this.colors=new Float32Array(c),this.texCoords=new Float32Array(h),this.indices=new Uint32Array(u)}_normalize(t){let r=1/0,i=-1/0,s=1/0,n=-1/0,a=1/0,o=-1/0;for(let d=0;d<t.length;d+=3)r=Math.min(r,t[d]),i=Math.max(i,t[d]),s=Math.min(s,t[d+1]),n=Math.max(n,t[d+1]),a=Math.min(a,t[d+2]),o=Math.max(o,t[d+2]);const l=(r+i)/2,c=(s+n)/2,h=(a+o)/2,u=1/Math.max(i-r,n-s,o-a);for(let d=0;d<t.length;d+=3)t[d]=(t[d]-l)*u,t[d+1]=(t[d+1]-c)*u,t[d+2]=(t[d+2]-h)*u}_computeNormals(){const t=this.vertices.length/3;this.faceNormals=new Float32Array(this.normals),this.vertexNormals=new Float32Array(this.normals.length);const r=new Float32Array(this.normals.length),i=new Uint32Array(t),s=this.indices,n=this.vertices;for(let a=0;a<s.length;a+=3){const o=s[a],l=s[a+1],c=s[a+2],h=n[l*3]-n[o*3],u=n[l*3+1]-n[o*3+1],d=n[l*3+2]-n[o*3+2],f=n[c*3]-n[o*3],m=n[c*3+1]-n[o*3+1],v=n[c*3+2]-n[o*3+2],g=u*v-d*m,w=d*f-h*v,y=h*m-u*f;for(const _ of[o,l,c])r[_*3]+=g,r[_*3+1]+=w,r[_*3+2]+=y,i[_]++}for(let a=0;a<t;a++){const o=i[a]||1;let l=r[a*3]/o,c=r[a*3+1]/o,h=r[a*3+2]/o;const u=Math.sqrt(l*l+c*c+h*h)||1;this.vertexNormals[a*3]=l/u,this.vertexNormals[a*3+1]=c/u,this.vertexNormals[a*3+2]=h/u}this.normals=new Float32Array(this.vertexNormals)}copyVertexNormalsToNormals(){this.normals.set(this.vertexNormals)}copyFaceNormalsToNormals(){this.normals.set(this.faceNormals)}initBuffers(){const t=this.gl;this.vao=t.createVertexArray(),this.vbo=t.createBuffer(),this.ebo=t.createBuffer(),this.indexCount=this.indices.length;const r=this.vertices.byteLength,i=this.normals.byteLength,s=this.colors.byteLength,n=this.texCoords.byteLength,a=r+i+s+n;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferData(t.ARRAY_BUFFER,a,t.STATIC_DRAW),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bufferSubData(t.ARRAY_BUFFER,r+i,this.colors),t.bufferSubData(t.ARRAY_BUFFER,r+i+s,this.texCoords),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.ebo),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0),t.vertexAttribPointer(1,3,t.FLOAT,!1,0,r),t.vertexAttribPointer(2,4,t.FLOAT,!1,0,r+i),t.vertexAttribPointer(3,2,t.FLOAT,!1,0,r+i+s),t.enableVertexAttribArray(0),t.enableVertexAttribArray(1),t.enableVertexAttribArray(2),t.enableVertexAttribArray(3),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}updateNormals(){const t=this.gl,r=this.vertices.byteLength;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}draw(t){const r=this.gl;t.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_INT,0),r.bindVertexArray(null)}delete(){const t=this.gl;this.vbo&&t.deleteBuffer(this.vbo),this.ebo&&t.deleteBuffer(this.ebo),this.vao&&t.deleteVertexArray(this.vao),this.vbo=null,this.ebo=null,this.vao=null}}class zt{constructor(t,r={}){this.gl=t,this.halfW=r.halfW??7,this.halfH=r.halfH??6,this.color=r.color??[.88,.84,.78,1],this.vao=t.createVertexArray(),this.vbo=t.createBuffer(),this.ebo=t.createBuffer(),this._initGeometry(),this._initBuffers()}_initGeometry(){const t=this.halfW,r=this.halfH,i=this.color,s=new Float32Array([-t,0,-r,t,0,-r,t,0,r,-t,0,r]),n=new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),a=new Float32Array([...i,...i,...i,...i]),o=new Float32Array([0,0,1,0,1,1,0,1]),l=new Uint16Array([0,2,1,0,3,2]);this.vertices=s,this.normals=n,this.colors=a,this.texCoords=o,this.indices=l,this.indexCount=l.length}_initBuffers(){const t=this.gl,r=this.vertices.byteLength,i=this.normals.byteLength,s=this.colors.byteLength,n=this.texCoords.byteLength,a=r+i+s+n;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferData(t.ARRAY_BUFFER,a,t.STATIC_DRAW),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bufferSubData(t.ARRAY_BUFFER,r+i,this.colors),t.bufferSubData(t.ARRAY_BUFFER,r+i+s,this.texCoords),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.ebo),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0),t.vertexAttribPointer(1,3,t.FLOAT,!1,0,r),t.vertexAttribPointer(2,4,t.FLOAT,!1,0,r+i),t.vertexAttribPointer(3,2,t.FLOAT,!1,0,r+i+s),t.enableVertexAttribArray(0),t.enableVertexAttribArray(1),t.enableVertexAttribArray(2),t.enableVertexAttribArray(3),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}draw(t){const r=this.gl;t.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_SHORT,0),r.bindVertexArray(null)}delete(){const t=this.gl;t.deleteBuffer(this.vbo),t.deleteBuffer(this.ebo),t.deleteVertexArray(this.vao)}}const Vt=`#version 300 es\r
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
} `,Ht=`#version 300 es\r
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
} `,$t=`#version 300 es\r
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
} `,jt=`#version 300 es\r
\r
precision highp float;\r
\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = vec4(1.0, 1.0, 1.0, 1.0);\r
}`,Yt=`#version 300 es\r
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
`,Xt=`#version 300 es\r
precision mediump float;\r
\r
uniform vec4 u_shadowColor;\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = u_shadowColor;\r
}\r
`,Gt=98;function nt(e){const t=Math.hypot(e[0],e[1],e[2],e[3]);return t<1e-8?[0,0,0,1]:e.map(r=>r/t)}const qt={getMatchPercentage(e,t){const r=nt(e),i=nt(t),s=Math.abs(r[0]*i[0]+r[1]*i[1]+r[2]*i[2]+r[3]*i[3]);return Math.min(100,s*100)},checkClear(e,t,r=Gt){const i=this.getMatchPercentage(e,t);return{cleared:i>=r,matchPercentage:i}}};class K{constructor(t,r,i){this.gl=t,this.program=this._createProgram(r,i)}use(){this.gl.useProgram(this.program)}setInt(t,r){this.gl.uniform1i(this.gl.getUniformLocation(this.program,t),r)}setFloat(t,r){this.gl.uniform1f(this.gl.getUniformLocation(this.program,t),r)}setVec3(t,r){this.gl.uniform3fv(this.gl.getUniformLocation(this.program,t),r)}setVec4(t,r){this.gl.uniform4fv(this.gl.getUniformLocation(this.program,t),r)}setMat3(t,r){this.gl.uniformMatrix3fv(this.gl.getUniformLocation(this.program,t),!1,r)}setMat4(t,r){this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program,t),!1,r)}delete(){this.gl.deleteProgram(this.program)}_createProgram(t,r){const i=this.gl,s=this._compileShader(i.VERTEX_SHADER,t),n=this._compileShader(i.FRAGMENT_SHADER,r),a=i.createProgram();if(i.attachShader(a,s),i.attachShader(a,n),i.linkProgram(a),!i.getProgramParameter(a,i.LINK_STATUS)){const o=i.getProgramInfoLog(a);throw i.deleteProgram(a),i.deleteShader(s),i.deleteShader(n),new Error(`Shader program link failed: ${o}`)}return i.deleteShader(s),i.deleteShader(n),a}_compileShader(t,r){const i=this.gl,s=i.createShader(t);if(i.shaderSource(s,r),i.compileShader(s),!i.getShaderParameter(s,i.COMPILE_STATUS)){const n=i.getShaderInfoLog(s);throw i.deleteShader(s),new Error(`Shader compile failed: ${n}`)}return s}}class rt extends tt{constructor(t,r){super(t),this.selectedStageId=r,this.timer=0,this.hintCount=0,this.matchRate=0,this._clearTriggered=!1,this._hintActive=!1,this._hintTimer=0,this._hintAlpha=0,this._HINT_IN=.35,this._HINT_HOLD=2,this._HINT_OUT=.55,this._onKeyDown=this._onKeyDown.bind(this),this.arcball=new Pt(this.gl.canvas,5,{rotation:1.2,zoom:0}),this.wallX=-5,this.lightPosition=M(6,3,4),this.viewPosition=M(1.5,3,4.5)}async enter(){const t=U.getById(this.selectedStageId);if(!t){console.error(`Stage with ID ${this.selectedStageId} not found!`),I(async()=>{const{default:r}=await Promise.resolve().then(()=>W);return{default:r}},void 0).then(({default:r})=>{E.changeScene(new r(this.gl))});return}this.stageId=t.id,this.stageName=t?t.name:`Stage ${this.stageId+1}`,this.assetsPath=t?t.assetsPath:null,this.targetShadowImage=t?t.targetShadow:null,this.targetRotation=t.targetRotation,this._initGLState(),await this._initSceneResources(),this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI(),this._deleteSceneResources()}update(t){this.timer+=t;const r=qt.checkClear(this.arcball.getRotationQuaternion(),this.targetRotation);this.matchRate=r.matchPercentage/100,this._updateHUD(),this._updateHint(t),r.cleared&&!this._clearTriggered&&(this._clearTriggered=!0,this._playSuccessEffect())}_updateHint(t){if(!this._hintActive)return;this._hintTimer+=t;const{_HINT_IN:r,_HINT_HOLD:i,_HINT_OUT:s}=this,n=r+i+s;this._hintTimer>=n?(this._hintActive=!1,this._hintAlpha=0):this._hintTimer<r?this._hintAlpha=this._hintTimer/r:this._hintTimer<r+i?this._hintAlpha=1:this._hintAlpha=1-(this._hintTimer-r-i)/s}render(){const t=this.gl;if(!this.cube||!this.wall||!this.objectShader||!this.shadowShader)return;t.viewport(0,0,t.canvas.width,t.canvas.height),t.depthMask(!0),t.stencilMask(255),t.clearColor(.94,.94,.94,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT|t.STENCIL_BUFFER_BIT);const{view:r,projection:i}=this._getCameraMatrices(),s=this._getCubeModelMatrix(),n=x();O(n,n,[this.wallX,0,0]),wt(n,n,-Math.PI/2),this._drawLitObject(this.wall,n,r,i,this.wallTexture);const a=this._getShadowModelMatrix(s);if(t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),t.stencilFunc(t.NOTEQUAL,1,255),t.stencilOp(t.KEEP,t.KEEP,t.REPLACE),t.stencilMask(255),this._drawShadowObject(this.cube,a,r,i),t.stencilMask(0),t.stencilFunc(t.ALWAYS,0,255),t.depthMask(!0),t.disable(t.BLEND),this._hintActive&&this._hintAlpha>.001){const l=this._getHintModelMatrix(),c=this._getShadowModelMatrix(l);t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),this._drawHintShadow(this.cube,c,r,i,this._hintAlpha),t.depthMask(!0),t.disable(t.BLEND)}this._drawLitObject(this.cube,s,r,i);const o=x();O(o,o,this.lightPosition),X(o,o,[.14,.14,.14]),this._drawLamp(o,r,i)}_initGLState(){const t=this.gl;t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.enable(t.CULL_FACE),t.cullFace(t.BACK),t.enable(t.STENCIL_TEST)}async _initSceneResources(){const t=this.gl,r=U.getById(this.selectedStageId);this.cube=await j.load(t,r.modelPath),this.wall=new zt(t,{halfW:8,halfH:7,color:[.88,.84,.78,1]}),this.objectShader=new K(t,Vt,Ht),this.lampShader=new K(t,$t,jt),this.shadowShader=new K(t,Yt,Xt),this.whiteTexture=this._createSingleColorTexture([255,255,255,255]),this.wallTexture=this._createSingleColorTexture([224,215,200,255])}_deleteSceneResources(){this.cube?.delete?.(),this.wall?.delete?.(),this.objectShader?.delete?.(),this.lampShader?.delete?.(),this.shadowShader?.delete?.(),this.whiteTexture&&this.gl.deleteTexture(this.whiteTexture),this.wallTexture&&this.gl.deleteTexture(this.wallTexture),this.cube=null,this.wall=null,this.objectShader=null,this.lampShader=null,this.shadowShader=null,this.whiteTexture=null,this.wallTexture=null}_createSingleColorTexture(t){const r=this.gl,i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(t)),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.bindTexture(r.TEXTURE_2D,null),i}_getCameraMatrices(){const t=this.gl,r=t.canvas.width/Math.max(t.canvas.height,1),i=x(),s=x();return $(i,this.viewPosition,M(-1,.5,0),M(0,1,0)),ct(s,Math.PI/4,r,.1,100),{view:i,projection:s}}_getCubeModelMatrix(){const t=x(),r=this.arcball.getModelRotMatrix();return O(t,t,[0,.55,0]),D(t,t,r),X(t,t,[1.45,1.45,1.45]),t}_getShadowModelMatrix(t){const r=this._createPlaneShadowMatrix([1,0,0,-this.wallX],[this.lightPosition[0],this.lightPosition[1],this.lightPosition[2],1]),i=x(),s=x();return O(i,i,[.004,0,0]),D(s,i,r),D(s,s,t),s}_createPlaneShadowMatrix(t,r){const i=t[0]*r[0]+t[1]*r[1]+t[2]*r[2]+t[3]*r[3],s=x();for(let n=0;n<4;n++)for(let a=0;a<4;a++)s[n*4+a]=i*(a===n?1:0)-r[a]*t[n];return s}_drawLitObject(t,r,i,s){const n=this.gl,a=this.objectShader,o=et();lt(o,r),a.use(),a.setMat4("u_model",r),a.setMat4("u_view",i),a.setMat4("u_projection",s),a.setVec3("u_viewPos",this.viewPosition),a.setVec3("light.position",this.lightPosition),a.setVec3("light.ambient",[.35,.35,.35]),a.setVec3("light.diffuse",[.82,.82,.82]),a.setVec3("light.specular",[.35,.35,.35]),a.setVec3("light.direction",M(-this.lightPosition[0],-this.lightPosition[1],-this.lightPosition[2])),a.setFloat("light.cutOff",Math.PI/5),a.setFloat("light.outerCutOff",Math.PI/4),a.setFloat("light.constant",1),a.setFloat("light.linear",.045),a.setFloat("light.quadratic",.0075),a.setVec3("material.specular",[.2,.2,.2]),a.setFloat("material.shininess",32),a.setInt("material.diffuse",0),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,this.whiteTexture),t.draw(a)}_drawShadowObject(t,r,i,s){const n=this.shadowShader;n.use(),n.setMat4("u_model",r),n.setMat4("u_view",i),n.setMat4("u_projection",s),n.setVec4("u_shadowColor",[0,0,0,.38]),t.draw(n)}_drawLamp(t,r,i){const s=this.lampShader;s.use(),s.setMat4("u_model",t),s.setMat4("u_view",r),s.setMat4("u_projection",i),this.cube.draw(s)}_playSuccessEffect(){const t=this.targetRotation,r=Math.hypot(t[0],t[1],t[2],t[3])||1;this.arcball.rotation[0]=t[0]/r,this.arcball.rotation[1]=t[1]/r,this.arcball.rotation[2]=t[2]/r,this.arcball.rotation[3]=t[3]/r,this.arcball.locked=!0,document.getElementById("btn-hint")?.setAttribute("disabled",""),document.getElementById("btn-back")?.setAttribute("disabled",""),document.querySelectorAll(".match-dot").forEach(n=>{n.classList.add("active","celebrating")});const i=document.createElement("div");i.id="clear-vignette",document.body.appendChild(i);const s=document.createElement("div");s.id="clear-banner",s.textContent="Clear!",document.body.appendChild(s),this._clearOverlays=[i,s],setTimeout(()=>{const n=document.createElement("div");n.id="clear-fade",document.body.appendChild(n),this._clearOverlays.push(n),setTimeout(async()=>{n.remove(),this._clearOverlays=this._clearOverlays.filter(a=>a!==n),i.remove(),s.remove(),this._clearOverlays=[],await this._showClearOverlay()},500)},1600)}async _showClearOverlay(){const t=new Nt(this.stageId);await t.init();const r=t.calculate(this.timer,this.hintCount);F.saveResult(this.stageId,{score:this.timer,stars:r});const i=c=>`${String(Math.floor(c/60)).padStart(2,"0")}:${String(Math.floor(c%60)).padStart(2,"0")}`,s=i(this.timer),n=F.getResult(this.stageId),a=n.bestScore<5999?i(n.bestScore):"--:--",o=this.stageId>=U.getTotalCount()-1,l=document.createElement("div");l.id="clear-overlay",l.innerHTML=`
            <div id="co-backdrop"></div>
            <div id="co-card">
                <p id="co-stage-label">Stage ${this.stageId+1} · ${this.stageName}</p>
                <h2 id="co-title">Stage Clear!</h2>
                <div id="co-stars">
                    <span class="co-star side${r>=1?" active":""}">★</span>
                    <span class="co-star center${r>=2?" active":""}">★</span>
                    <span class="co-star side${r>=3?" active":""}">★</span>
                </div>
                <div id="co-scores">
                    <div class="co-score-card">
                        <span class="co-score-label">Score</span>
                        <span class="co-score-val">${s}</span>
                    </div>
                    <div class="co-score-card">
                        <span class="co-score-label">Best</span>
                        <span class="co-score-val">${a}</span>
                    </div>
                </div>
                <div id="co-actions">
                    <button id="co-retry" class="co-btn-icon" title="Retry">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                        </svg>
                    </button>
                    <button id="co-next" class="co-btn-primary"${o?" disabled":""}>Next</button>
                    <button id="co-menu" class="co-btn-icon" title="Stage Select">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `,document.body.appendChild(l),this._clearOverlays=[l],l.querySelectorAll(".co-star").forEach((c,h)=>{setTimeout(()=>c.classList.add("pop"),200+h*220)}),l.querySelector("#co-retry").addEventListener("click",()=>{I(async()=>{const{default:c}=await Promise.resolve().then(()=>at);return{default:c}},void 0).then(({default:c})=>{E.changeScene(new c(this.gl,this.stageId))})}),l.querySelector("#co-next").addEventListener("click",()=>{I(async()=>{const{default:c}=await Promise.resolve().then(()=>at);return{default:c}},void 0).then(({default:c})=>{E.changeScene(new c(this.gl,this.stageId+1))})}),l.querySelector("#co-menu").addEventListener("click",()=>{I(async()=>{const{default:c}=await Promise.resolve().then(()=>W);return{default:c}},void 0).then(({default:c})=>{E.changeScene(new c(this.gl))})})}_useHint(){this._clearTriggered||this._hintActive||(this.hintCount++,this._hintActive=!0,this._hintTimer=0,this._hintAlpha=0)}_getHintModelMatrix(){const t=x(),r=x(),i=this.targetRotation,s=Math.hypot(i[0],i[1],i[2],i[3])||1;return Q(r,[i[0]/s,i[1]/s,i[2]/s,i[3]/s]),O(t,t,[0,.55,0]),D(t,t,r),X(t,t,[1.45,1.45,1.45]),t}_drawHintShadow(t,r,i,s,n){const a=this.shadowShader;a.use(),a.setMat4("u_model",r),a.setMat4("u_view",i),a.setMat4("u_projection",s),a.setVec4("u_shadowColor",[0,.843,.996,n*.72]),t.draw(a)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="game-hud",this._ui.innerHTML=`

            <!-- header: 뒤로가기 · 스테이지 정보 · 타이머 -->
            <header id="game-header">
                <button id="btn-back" aria-label="뒤로가기">←</button>
                <div id="header-title">
                    <span id="header-level">Stage ${String(this.stageId+1)}</span>
                    <span id="header-stage-name">${String(this.stageName)}</span>
                </div>
                <div id="hud-timer">00:00</div>
            </header>

            <!-- body: 전체 캔버스 영역 + 하단 오버레이 -->
            <div id="game-body">
                <div id="game-viewport"></div>

                <!-- 하단 중앙 오버레이 -->
                <div id="game-bottom">
                    <div id="panel-match-card">
                        <div id="panel-match-info">
                            <span id="panel-match-label">Match</span>
                        </div>
                        <div id="panel-match-divider"></div>
                        <div id="panel-match-dots">
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                        </div>
                    </div>
                    <button id="btn-hint">Hint</button>
                </div>
            </div>
        `,document.body.appendChild(this._ui),document.getElementById("btn-back").addEventListener("click",()=>{this._goToStageSelect()}),document.getElementById("btn-hint").addEventListener("click",()=>{this._useHint()})}_updateHUD(){const t=String(Math.floor(this.timer/60)).padStart(2,"0"),r=String(Math.floor(this.timer%60)).padStart(2,"0"),i=document.getElementById("hud-timer"),s=document.getElementById("panel-match-pct");i&&(i.textContent=`${t}:${r}`);const n=Math.floor(this.matchRate*100);s&&(s.textContent=`${n}%`);const a=this._clearTriggered?5:n>=60?4:n>=40?3:n>=20?2:1;document.querySelectorAll(".match-dot").forEach((o,l)=>{o.classList.toggle("active",l<a)})}_removeUI(){this._ui?.remove(),this._clearOverlays?.forEach(t=>t?.remove())}_goToStageSelect(){I(async()=>{const{default:t}=await Promise.resolve().then(()=>W);return{default:t}},void 0).then(({default:t})=>{E.changeScene(new t(this.gl))})}_onKeyDown(t){this._clearTriggered||(t.key==="h"&&this._useHint(),t.key==="Escape"&&this._goToStageSelect(),t.key==="p"&&console.log("Current Rotation:",this.arcball.rotation))}}const at=Object.freeze(Object.defineProperty({__proto__:null,default:rt},Symbol.toStringTag,{value:"Module"})),Kt=`#version 300 es
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
uniform mat4 u_mvp;
uniform mat3 u_normalMat;
out vec3 v_normal;
void main() {
    gl_Position = u_mvp * vec4(a_position, 1.0);
    v_normal    = normalize(u_normalMat * a_normal);
}`,Wt=`#version 300 es
precision mediump float;
in  vec3 v_normal;
uniform vec3  u_lightDir;
uniform vec3  u_color;
uniform float u_brightness;
out vec4 outColor;
void main() {
    vec3 n    = normalize(v_normal);
    vec3 l    = normalize(u_lightDir);
    float d   = max(dot(n, l), 0.0);
    float rim = max(dot(n, vec3(-l.x * 0.3, -l.y * 0.3, l.z)), 0.0) * 0.10;
    float a   = 0.32;
    outColor  = vec4(u_color * (a + d * 0.68 + rim) * u_brightness, 1.0);
}`;class Qt{constructor(t){this._canvas=t,this._gl=t.getContext("webgl2",{alpha:!0,antialias:!0,depth:!0,premultipliedAlpha:!1,powerPreference:"low-power"}),this._gl||console.error("[Preview] WebGL2 context creation failed for canvas",t.dataset.index),this._program=null,this._shader=null,this._model=null,this._rotY=0,this.ready=!1,this._gl&&this._initGL()}_initGL(){const t=this._gl;t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.enable(t.CULL_FACE),t.cullFace(t.BACK);const r=this._compile(t.VERTEX_SHADER,Kt),i=this._compile(t.FRAGMENT_SHADER,Wt);this._program=this._link(r,i);const s=this._program;this._shader={program:s,use:()=>t.useProgram(s)}}async loadModel(t){if(this._gl)try{this._model=await j.load(this._gl,t),this.ready=!0}catch(r){console.error("[Preview] model load failed:",t,r)}}render(t,r={}){const i=this._gl;if(!i||!this.ready||!this._model||!this._program)return;const{brightness:s=1,rotSpeed:n=.42}=r;this._rotY+=t*n;const a=Math.min(window.devicePixelRatio||1,2),o=this._canvas.clientWidth||this._canvas.width||240,l=this._canvas.clientHeight||this._canvas.height||240,c=o*a|0,h=l*a|0;if(c<=0||h<=0)return;(this._canvas.width!==c||this._canvas.height!==h)&&(this._canvas.width=c,this._canvas.height=h),i.viewport(0,0,c,h),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT);const u=c/Math.max(h,1),d=ct(x(),Math.PI/5.5,u,.05,50),f=$(x(),[0,.12,2.6],[0,0,0],[0,1,0]),m=x();bt(m,m,this._rotY),pt(m,m,.22);const v=D(x(),f,m),g=D(x(),d,v),w=lt(et(),v),y=this._program;i.useProgram(y),i.uniformMatrix4fv(i.getUniformLocation(y,"u_mvp"),!1,g),i.uniformMatrix3fv(i.getUniformLocation(y,"u_normalMat"),!1,w),i.uniform3fv(i.getUniformLocation(y,"u_lightDir"),[1.4,2.2,2.8]),i.uniform3fv(i.getUniformLocation(y,"u_color"),[1,.95,.84]),i.uniform1f(i.getUniformLocation(y,"u_brightness"),s),this._model.draw(this._shader)}destroy(){this._model?.delete?.(),this._program&&this._gl&&this._gl.deleteProgram(this._program),this._model=null,this._program=null,this._shader=null,this.ready=!1}_compile(t,r){const i=this._gl,s=i.createShader(t);return i.shaderSource(s,r),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)?s:(console.error("[Preview shader]",i.getShaderInfoLog(s)),i.deleteShader(s),null)}_link(t,r){if(!t||!r)return null;const i=this._gl,s=i.createProgram();return i.attachShader(s,t),i.attachShader(s,r),i.linkProgram(s),i.deleteShader(t),i.deleteShader(r),i.getProgramParameter(s,i.LINK_STATUS)?s:(console.error("[Preview link]",i.getProgramInfoLog(s)),null)}}class Z extends tt{constructor(t){super(t),this.stages=[],this.currentIndex=0,this._ui=null,this._previews=new Map,this._onKeyDown=this._onKeyDown.bind(this)}async enter(){if(this.stages=U.getAll(),!this.stages||this.stages.length===0){console.error("No stages loaded.");return}this._buildUI(),await this._initPreviews(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._destroyPreviews(),this._removeUI()}update(t){if(!this._ui||this._previews.size===0)return;const r=new Set([this.currentIndex-1,this.currentIndex,this.currentIndex+1].filter(i=>i>=0&&i<this.stages.length));for(const[i,s]of this._previews){if(!r.has(i))continue;const n=i===this.currentIndex,a=!F.isUnlocked(i);s.render(t,{brightness:n?1:a?.35:.52,rotSpeed:n?.42:.22})}}render(){this.gl.clearColor(.13,.12,.12,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._removeUI(),this._ui=document.createElement("div"),this._ui.id="stage-select",this._ui.innerHTML=`
            <header id="ss-header">
                <button id="ss-back" aria-label="뒤로가기">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path d="M19 9H1M1 9L9 1M1 9L9 17"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 id="ss-title">Stages</h1>
            </header>

            <div id="ss-carousel-area">
                <button id="ss-prev" class="ss-nav" aria-label="이전">
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                        <path d="M11 1L1 11L11 21"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div id="ss-track">
                    ${this.stages.map((t,r)=>this._cardHTML(t,r)).join("")}
                </div>

                <button id="ss-next" class="ss-nav" aria-label="다음">
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                        <path d="M1 1L11 11L1 21"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `,document.body.appendChild(this._ui),this._updateCarousel(!1),this._bindEvents()}_cardHTML(t,r){const i=F.isUnlocked(r),s=F.getResult(r),n=s.bestStars||0,o=s.bestScore<5999?`Best · ${this._fmt(s.bestScore)}`:"---",l=String(r+1).padStart(2,"0"),c=[1,2,3].map(h=>`<span class="card-star${n>=h?" filled":""}">★</span>`).join("");return`
            <div class="stage-card${i?"":" locked"}" data-index="${r}">
                <div class="card-circle">
                    ${i?`<div class="card-top">
                        <span class="card-number">${l}</span>
                        <span class="card-name">${t.name||"Stage "+(r+1)}</span>
                    </div>`:""}

                    <canvas class="preview-canvas" data-index="${r}"
                            width="240" height="240"
                            style="pointer-events:none;width:240px;height:240px"></canvas>

                    ${i?`<div class="card-stars">${c}</div>`:`<div class="lock-overlay">
                               <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                                   <rect x="4" y="22" width="36" height="28" rx="5"
                                         fill="currentColor" opacity="0.8"/>
                                   <path d="M11 22V16C11 9.373 15.925 4 22 4C28.075 4 33 9.373 33 16V22"
                                         stroke="currentColor" stroke-width="4"
                                         stroke-linecap="round" fill="none" opacity="0.8"/>
                                   <circle cx="22" cy="36" r="3.5" fill="#201f1f"/>
                               </svg>
                           </div>`}
                </div>
                <p class="card-score${i?"":" locked-text"}">${i?o:"Locked"}</p>
            </div>
        `}async _initPreviews(){const t=this._ui.querySelectorAll(".preview-canvas"),r=[];t.forEach(i=>{const s=Number(i.dataset.index),n=this.stages[s];if(!n?.modelPath)return;const a=new Qt(i);this._previews.set(s,a),r.push(a.loadModel(n.modelPath))}),await Promise.allSettled(r)}_destroyPreviews(){for(const t of this._previews.values())t.destroy();this._previews.clear()}_bindEvents(){document.getElementById("ss-back").addEventListener("click",async()=>{const{default:t}=await I(async()=>{const{default:r}=await Promise.resolve().then(()=>ot);return{default:r}},void 0);E.changeScene(new t(this.gl))}),document.getElementById("ss-prev").addEventListener("click",()=>{this.currentIndex>0&&(this.currentIndex--,this._updateCarousel(!0))}),document.getElementById("ss-next").addEventListener("click",()=>{this.currentIndex<this.stages.length-1&&(this.currentIndex++,this._updateCarousel(!0))}),this._ui.querySelectorAll(".stage-card").forEach(t=>{t.addEventListener("click",()=>{const r=Number(t.dataset.index);r!==this.currentIndex?(this.currentIndex=r,this._updateCarousel(!0)):F.isUnlocked(r)&&this._startStage(r)})})}_updateCarousel(t){const r=this._ui.querySelectorAll(".stage-card"),i=["far-left","left","current","right","far-right"];t||r.forEach(a=>a.classList.add("no-transition")),r.forEach((a,o)=>{a.classList.remove(...i);const l=o-this.currentIndex;l<-1?a.classList.add("far-left"):l===-1?a.classList.add("left"):l===0?a.classList.add("current"):l===1?a.classList.add("right"):a.classList.add("far-right")}),t||requestAnimationFrame(()=>r.forEach(a=>a.classList.remove("no-transition")));const s=this._ui.querySelector("#ss-prev"),n=this._ui.querySelector("#ss-next");s&&(s.disabled=this.currentIndex===0),n&&(n.disabled=this.currentIndex===this.stages.length-1)}_removeUI(){this._ui&&(this._ui.remove(),this._ui=null)}_startStage(t){E.changeScene(new rt(this.gl,t))}_fmt(t){return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(Math.floor(t%60)).padStart(2,"0")}`}async _onKeyDown(t){if(t.key==="ArrowLeft"&&this.currentIndex>0)this.currentIndex--,this._updateCarousel(!0);else if(t.key==="ArrowRight"&&this.currentIndex<this.stages.length-1)this.currentIndex++,this._updateCarousel(!0);else if(t.key==="Enter")F.isUnlocked(this.currentIndex)&&this._startStage(this.currentIndex);else if(t.key==="Escape"){const{default:r}=await I(async()=>{const{default:i}=await Promise.resolve().then(()=>ot);return{default:i}},void 0);E.changeScene(new r(this.gl))}}}const W=Object.freeze(Object.defineProperty({__proto__:null,default:Z},Symbol.toStringTag,{value:"Module"}));class ft extends tt{constructor(t){super(t),this._onKeyDown=this._onKeyDown.bind(this)}enter(){this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.13,.12,.12,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="main-menu",this._ui.innerHTML=`
            <h1 id="menu-title">Shadow<br>Match</h1>
            <div id="menu-buttons">
                <button id="btn-start" class="btn-primary">New Start</button>
                <button id="btn-stage" class="btn-secondary">Select Stage</button>
            </div>
        `,document.body.appendChild(this._ui),document.getElementById("btn-start").addEventListener("click",()=>{E.changeScene(new rt(this.gl,0))}),document.getElementById("btn-stage").addEventListener("click",()=>{E.changeScene(new Z(this.gl))})}_removeUI(){this._ui?.remove()}_onKeyDown(t){t.key==="Enter"&&E.changeScene(new Z(this.gl))}}const ot=Object.freeze(Object.defineProperty({__proto__:null,default:ft},Symbol.toStringTag,{value:"Module"}));class Jt{constructor(){this.canvas=null,this.gl=null,this._lastTime=null}async initialize(){if(await U.load(),this.canvas=document.getElementById("gameCanvas"),this.gl=this.canvas.getContext("webgl2",{stencil:!0}),!this.gl){alert("WebGL2 not supported");return}this.resize(),window.addEventListener("resize",()=>{this.resize()}),E.changeScene(new ft(this.gl))}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.gl&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}run(){const t=r=>{this._lastTime===null&&(this._lastTime=r);const i=(r-this._lastTime)/1e3;this._lastTime=r,E.update(i),E.render(),requestAnimationFrame(t)};requestAnimationFrame(t)}}window.addEventListener("DOMContentLoaded",()=>{const e=new Jt;e.initialize(),e.run()});
