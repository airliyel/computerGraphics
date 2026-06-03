(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();class vt{constructor(){this.currentScene=null}changeScene(t){this.currentScene&&this.currentScene.exit(),this.currentScene=t,this.currentScene&&this.currentScene.enter()}update(t){this.currentScene&&this.currentScene.update(t)}render(){this.currentScene&&this.currentScene.render()}}const x=new vt;class Z{constructor(t){this.gl=t}enter(){}exit(){}update(){}render(){}}const mt="modulepreload",_t=function(e){return"/computerGraphics/termProject/"+e},rt={},F=function(t,r,i){let s=Promise.resolve();if(r&&r.length>0){let c=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var n=c;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=c(r.map(h=>{if(h=_t(h),h in rt)return;rt[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":mt,u||(f.as="script"),f.crossOrigin="",f.href=h,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((m,v)=>{f.addEventListener("load",m),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&a(l.reason);return t().catch(a)})};var H=1e-6,T=typeof Float32Array<"u"?Float32Array:Array;function tt(){var e=new T(9);return T!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[5]=0,e[6]=0,e[7]=0),e[0]=1,e[4]=1,e[8]=1,e}function ct(e,t){var r=t[0],i=t[1],s=t[2],a=t[3],n=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],b=t[15],S=r*o-i*n,_=r*l-s*n,y=r*c-a*n,p=i*l-s*o,w=i*c-a*o,R=s*c-a*l,C=h*v-u*m,I=h*g-d*m,L=h*b-f*m,G=u*g-d*v,B=u*b-f*v,k=d*b-f*g,A=S*k-_*B+y*G+p*L-w*I+R*C;return A?(A=1/A,e[0]=(o*k-l*B+c*G)*A,e[1]=(l*L-n*k-c*I)*A,e[2]=(n*B-o*L+c*C)*A,e[3]=(s*B-i*k-a*G)*A,e[4]=(r*k-s*L+a*I)*A,e[5]=(i*L-r*B-a*C)*A,e[6]=(v*R-g*w+b*p)*A,e[7]=(g*y-m*R-b*_)*A,e[8]=(m*w-v*y+b*S)*A,e):null}function E(){var e=new T(16);return T!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function pt(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function U(e,t,r){var i=t[0],s=t[1],a=t[2],n=t[3],o=t[4],l=t[5],c=t[6],h=t[7],u=t[8],d=t[9],f=t[10],m=t[11],v=t[12],g=t[13],b=t[14],S=t[15],_=r[0],y=r[1],p=r[2],w=r[3];return e[0]=_*i+y*o+p*u+w*v,e[1]=_*s+y*l+p*d+w*g,e[2]=_*a+y*c+p*f+w*b,e[3]=_*n+y*h+p*m+w*S,_=r[4],y=r[5],p=r[6],w=r[7],e[4]=_*i+y*o+p*u+w*v,e[5]=_*s+y*l+p*d+w*g,e[6]=_*a+y*c+p*f+w*b,e[7]=_*n+y*h+p*m+w*S,_=r[8],y=r[9],p=r[10],w=r[11],e[8]=_*i+y*o+p*u+w*v,e[9]=_*s+y*l+p*d+w*g,e[10]=_*a+y*c+p*f+w*b,e[11]=_*n+y*h+p*m+w*S,_=r[12],y=r[13],p=r[14],w=r[15],e[12]=_*i+y*o+p*u+w*v,e[13]=_*s+y*l+p*d+w*g,e[14]=_*a+y*c+p*f+w*b,e[15]=_*n+y*h+p*m+w*S,e}function z(e,t,r){var i=r[0],s=r[1],a=r[2],n,o,l,c,h,u,d,f,m,v,g,b;return t===e?(e[12]=t[0]*i+t[4]*s+t[8]*a+t[12],e[13]=t[1]*i+t[5]*s+t[9]*a+t[13],e[14]=t[2]*i+t[6]*s+t[10]*a+t[14],e[15]=t[3]*i+t[7]*s+t[11]*a+t[15]):(n=t[0],o=t[1],l=t[2],c=t[3],h=t[4],u=t[5],d=t[6],f=t[7],m=t[8],v=t[9],g=t[10],b=t[11],e[0]=n,e[1]=o,e[2]=l,e[3]=c,e[4]=h,e[5]=u,e[6]=d,e[7]=f,e[8]=m,e[9]=v,e[10]=g,e[11]=b,e[12]=n*i+h*s+m*a+t[12],e[13]=o*i+u*s+v*a+t[13],e[14]=l*i+d*s+g*a+t[14],e[15]=c*i+f*s+b*a+t[15]),e}function it(e,t,r){var i=r[0],s=r[1],a=r[2];return e[0]=t[0]*i,e[1]=t[1]*i,e[2]=t[2]*i,e[3]=t[3]*i,e[4]=t[4]*s,e[5]=t[5]*s,e[6]=t[6]*s,e[7]=t[7]*s,e[8]=t[8]*a,e[9]=t[9]*a,e[10]=t[10]*a,e[11]=t[11]*a,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e}function wt(e,t,r){var i=Math.sin(r),s=Math.cos(r),a=t[4],n=t[5],o=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=a*s+c*i,e[5]=n*s+h*i,e[6]=o*s+u*i,e[7]=l*s+d*i,e[8]=c*s-a*i,e[9]=h*s-n*i,e[10]=u*s-o*i,e[11]=d*s-l*i,e}function bt(e,t,r){var i=Math.sin(r),s=Math.cos(r),a=t[0],n=t[1],o=t[2],l=t[3],c=t[8],h=t[9],u=t[10],d=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*s-c*i,e[1]=n*s-h*i,e[2]=o*s-u*i,e[3]=l*s-d*i,e[8]=a*i+c*s,e[9]=n*i+h*s,e[10]=o*i+u*s,e[11]=l*i+d*s,e}function yt(e,t,r){var i=Math.sin(r),s=Math.cos(r),a=t[0],n=t[1],o=t[2],l=t[3],c=t[4],h=t[5],u=t[6],d=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=a*s+c*i,e[1]=n*s+h*i,e[2]=o*s+u*i,e[3]=l*s+d*i,e[4]=c*s-a*i,e[5]=h*s-n*i,e[6]=u*s-o*i,e[7]=d*s-l*i,e}function K(e,t){var r=t[0],i=t[1],s=t[2],a=t[3],n=r+r,o=i+i,l=s+s,c=r*n,h=i*n,u=i*o,d=s*n,f=s*o,m=s*l,v=a*n,g=a*o,b=a*l;return e[0]=1-u-m,e[1]=h+b,e[2]=d-g,e[3]=0,e[4]=h-b,e[5]=1-c-m,e[6]=f+v,e[7]=0,e[8]=d+g,e[9]=f-v,e[10]=1-c-u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function St(e,t,r,i,s){var a=1/Math.tan(t/2);if(e[0]=a/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,s!=null&&s!==1/0){var n=1/(i-s);e[10]=(s+i)*n,e[14]=2*s*i*n}else e[10]=-1,e[14]=-2*i;return e}var ht=St;function j(e,t,r,i){var s,a,n,o,l,c,h,u,d,f,m=t[0],v=t[1],g=t[2],b=i[0],S=i[1],_=i[2],y=r[0],p=r[1],w=r[2];return Math.abs(m-y)<H&&Math.abs(v-p)<H&&Math.abs(g-w)<H?pt(e):(h=m-y,u=v-p,d=g-w,f=1/Math.sqrt(h*h+u*u+d*d),h*=f,u*=f,d*=f,s=S*d-_*u,a=_*h-b*d,n=b*u-S*h,f=Math.sqrt(s*s+a*a+n*n),f?(f=1/f,s*=f,a*=f,n*=f):(s=0,a=0,n=0),o=u*n-d*a,l=d*s-h*n,c=h*a-u*s,f=Math.sqrt(o*o+l*l+c*c),f?(f=1/f,o*=f,l*=f,c*=f):(o=0,l=0,c=0),e[0]=s,e[1]=o,e[2]=h,e[3]=0,e[4]=a,e[5]=l,e[6]=u,e[7]=0,e[8]=n,e[9]=c,e[10]=d,e[11]=0,e[12]=-(s*m+a*v+n*g),e[13]=-(o*m+l*v+c*g),e[14]=-(h*m+u*v+d*g),e[15]=1,e)}function O(){var e=new T(3);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e}function Et(e){var t=e[0],r=e[1],i=e[2];return Math.sqrt(t*t+r*r+i*i)}function M(e,t,r){var i=new T(3);return i[0]=e,i[1]=t,i[2]=r,i}function xt(e,t,r,i){return e[0]=t,e[1]=r,e[2]=i,e}function Q(e,t){var r=t[0],i=t[1],s=t[2],a=r*r+i*i+s*s;return a>0&&(a=1/Math.sqrt(a)),e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e}function dt(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function $(e,t,r){var i=t[0],s=t[1],a=t[2],n=r[0],o=r[1],l=r[2];return e[0]=s*l-a*o,e[1]=a*n-i*l,e[2]=i*o-s*n,e}function At(e,t,r){var i=t[0],s=t[1],a=t[2],n=r[3]*i+r[7]*s+r[11]*a+r[15];return n=n||1,e[0]=(r[0]*i+r[4]*s+r[8]*a+r[12])/n,e[1]=(r[1]*i+r[5]*s+r[9]*a+r[13])/n,e[2]=(r[2]*i+r[6]*s+r[10]*a+r[14])/n,e}var Mt=Et;(function(){var e=O();return function(t,r,i,s,a,n){var o,l;for(r||(r=3),i||(i=0),s?l=Math.min(s*r+i,t.length):l=t.length,o=i;o<l;o+=r)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],a(e,e,n),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2];return t}})();function Tt(){var e=new T(4);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0),e}function Rt(e,t){var r=t[0],i=t[1],s=t[2],a=t[3],n=r*r+i*i+s*s+a*a;return n>0&&(n=1/Math.sqrt(n)),e[0]=r*n,e[1]=i*n,e[2]=s*n,e[3]=a*n,e}(function(){var e=Tt();return function(t,r,i,s,a,n){var o,l;for(r||(r=4),i||(i=0),s?l=Math.min(s*r+i,t.length):l=t.length,o=i;o<l;o+=r)e[0]=t[o],e[1]=t[o+1],e[2]=t[o+2],e[3]=t[o+3],a(e,e,n),t[o]=e[0],t[o+1]=e[1],t[o+2]=e[2],t[o+3]=e[3];return t}})();function N(){var e=new T(4);return T!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0),e[3]=1,e}function ut(e,t,r){r=r*.5;var i=Math.sin(r);return e[0]=i*t[0],e[1]=i*t[1],e[2]=i*t[2],e[3]=Math.cos(r),e}function Lt(e,t,r){var i=t[0],s=t[1],a=t[2],n=t[3],o=r[0],l=r[1],c=r[2],h=r[3];return e[0]=i*h+n*o+s*c-a*l,e[1]=s*h+n*l+a*o-i*c,e[2]=a*h+n*c+i*l-s*o,e[3]=n*h-i*o-s*l-a*c,e}function X(e,t,r,i){var s=t[0],a=t[1],n=t[2],o=t[3],l=r[0],c=r[1],h=r[2],u=r[3],d,f,m,v,g;return f=s*l+a*c+n*h+o*u,f<0&&(f=-f,l=-l,c=-c,h=-h,u=-u),1-f>H?(d=Math.acos(f),m=Math.sin(d),v=Math.sin((1-i)*d)/m,g=Math.sin(i*d)/m):(v=1-i,g=i),e[0]=v*s+g*l,e[1]=v*a+g*c,e[2]=v*n+g*h,e[3]=v*o+g*u,e}function Pt(e,t){var r=t[0]+t[4]+t[8],i;if(r>0)i=Math.sqrt(r+1),e[3]=.5*i,i=.5/i,e[0]=(t[5]-t[7])*i,e[1]=(t[6]-t[2])*i,e[2]=(t[1]-t[3])*i;else{var s=0;t[4]>t[0]&&(s=1),t[8]>t[s*3+s]&&(s=2);var a=(s+1)%3,n=(s+2)%3;i=Math.sqrt(t[s*3+s]-t[a*3+a]-t[n*3+n]+1),e[s]=.5*i,i=.5/i,e[3]=(t[a*3+n]-t[n*3+a])*i,e[a]=(t[a*3+s]+t[s*3+a])*i,e[n]=(t[n*3+s]+t[s*3+n])*i}return e}var ft=Rt;(function(){var e=O(),t=M(1,0,0),r=M(0,1,0);return function(i,s,a){var n=dt(s,a);return n<-.999999?($(e,t,s),Mt(e)<1e-6&&$(e,r,s),Q(e,e),ut(i,e,Math.PI),i):n>.999999?(i[0]=0,i[1]=0,i[2]=0,i[3]=1,i):($(e,s,a),i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=1+n,ft(i,i))}})();(function(){var e=N(),t=N();return function(r,i,s,a,n,o){return X(e,i,n,o),X(t,s,a,o),X(r,e,t,2*o*(1-o)),r}})();(function(){var e=tt();return function(t,r,i,s){return e[0]=i[0],e[3]=i[1],e[6]=i[2],e[1]=s[0],e[4]=s[1],e[7]=s[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],ft(t,Pt(t,e))}})();class Ct{constructor(t,r=5,i={rotation:1,zoom:.001}){this.canvas=t,this.distance=r,this.rotation=N(),this.position=M(0,0,r),this.target=O(),this.up=M(0,1,0),this.rotationSensitivity=i.rotation||1,this.zoomSensitivity=i.zoom||.001,this.dragging=!1,this.lastMouseX=0,this.lastMouseY=0,this.locked=!1,t.addEventListener("mousedown",this.onMouseDown.bind(this)),t.addEventListener("mousemove",this.onMouseMove.bind(this)),t.addEventListener("mouseup",this.onMouseUp.bind(this)),t.addEventListener("wheel",this.onWheel.bind(this))}getArcballVector(t,r){const i=this.canvas.getBoundingClientRect(),s={x:i.width*.5,y:i.height*.5},a=(t-s.x)/s.x,n=(s.y-r)/s.y,o=a*a+n*n,l=o<=1?Math.sqrt(1-o):0,c=M(a,n,l);return Q(c,c),c}onMouseDown(t){this.locked||(this.dragging=!0,this.lastMouseX=t.clientX,this.lastMouseY=t.clientY)}onMouseMove(t){if(this.locked||!this.dragging)return;const r=t.clientX,i=t.clientY,s=this.getArcballVector(this.lastMouseX,this.lastMouseY),a=this.getArcballVector(r,i),n=Math.acos(Math.min(1,dt(s,a)))*this.rotationSensitivity,o=O();$(o,a,s),Q(o,o);const l=N();ut(l,o,n),Lt(this.rotation,l,this.rotation),this.lastMouseX=r,this.lastMouseY=i}onMouseUp(){this.dragging=!1}onWheel(t){this.locked||(this.distance+=t.deltaY*this.zoomSensitivity*this.distance,this.distance=Math.max(.1,Math.min(100,this.distance)),xt(this.position,0,0,this.distance),t.preventDefault())}getViewMatrix(){const t=E(),r=E();K(r,this.rotation);const i=O();return At(i,this.position,r),j(t,i,this.target,this.up),t}getModelRotMatrix(){const t=E();return K(t,this.rotation),t}getViewCamDistanceMatrix(){const t=E();return j(t,this.position,this.target,this.up),t}reset(){this.rotation=N(),this.position=M(0,0,this.distance),this.target=M(0,0,0)}getRotationQuaternion(){return[...this.rotation]}}const It=[{id:0,name:"Entangled Rings",locked:!1,threestartime:60,highscore:0,modelPath:"./assets/stage1/1.obj",targetRotation:[-.849837601184845,.514435887336731,-.10507441312074661,-.0457659550011158]},{id:1,name:"Steaming Pot",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage2/2.obj",targetRotation:[-.2058609575033188,.584302544593811,-.28841763734817505,.7300848364830017]},{id:2,name:"Elephant",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage3/elephant.obj",targetRotation:[.4465506970882416,-.3039621114730835,.6260358095169067,.5623888373374939]},{id:3,name:"Orbit",locked:!0,threestartime:30,highscore:0,modelPath:"./assets/stage4/GlobeSphere.obj",targetRotation:[.2292313277721405,.1008806899189949,-.5132355690002441,.8208932876586914]},{id:4,name:"Serpent",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage5/logo-2.obj",targetRotation:[-.7148496508598328,.13857387006282806,.6595051288604736,-.18664030730724335]},{id:5,name:"Sixth Sense",locked:!0,threestartime:60,highscore:0,modelPath:"./assets/stage6/logo-4.obj",targetRotation:[-.4800296127796173,-.5572600364685059,-.3961862027645111,.5496070384979248]}],Ft="/computerGraphics/termProject/assets/1-CLboCkRT.obj",Ut="/computerGraphics/termProject/assets/2-BCSWr1XE.obj",Dt="/computerGraphics/termProject/assets/elephant-Dt6E6wCi.obj",Bt="/computerGraphics/termProject/assets/GlobeSphere-B0fOtzlk.obj",kt="/computerGraphics/termProject/assets/logo-2-Dv-rsnbi.obj",Ot="/computerGraphics/termProject/assets/logo-4-D_RC6HTA.obj",Nt=[Ft,Ut,Dt,Bt,kt,Ot],D={_stages:It.map(e=>({...e,modelPath:Nt[e.id]})),async load(){},getAll(){return this._stages},getById(e){return this._stages.find(t=>t.id===e)||null},getTotalCount(){return this._stages.length}},q="shadowMatch_save",st={cleared:!1,bestScore:5999,bestStars:0},P={_load(){try{const e=window.localStorage.getItem(q);if(e!==null)return JSON.parse(e)}catch(e){console.error(e)}return{stages:{}}},_save(e){localStorage.setItem(q,JSON.stringify(e))},saveResult(e,{score:t,stars:r}){let i=this._load();e in i.stages?(i.stages[e].bestScore=Math.min(i.stages[e].bestScore,t),i.stages[e].bestStars=Math.max(i.stages[e].bestStars,r)):i.stages[e]={cleared:!0,bestScore:t,bestStars:r},this._save(i)},getResult(e){return this._load().stages[e]??st},unlockNext(e){let t=this._load().stages;e+1 in t||(t[e+1]=st)},isUnlocked(e){return e===0||this.getResult(e-1).cleared},reset(){window.localStorage.removeItem(q)}};class zt{constructor(t){this.selectedStageId=t,this.threestarTime=0}async init(){const t=D.getById(this.selectedStageId);if(!t){console.error(`Stage with ID ${this.selectedStageId} not found!`);return}this.threestarTime=t.threestartime??60}calculate(t,r,i=0){const a=this.threestarTime/.25*(1-.75**r);t+=a;const n=this.threestarTime*2*(1+i);return 1+(t<=this.threestarTime)+(t<=n)}}class Y{constructor(t){this.gl=t,this.vao=null,this.vbo=null,this.ebo=null,this.indexCount=0,this.vertices=null,this.normals=null,this.colors=null,this.texCoords=null,this.indices=null,this.faceNormals=null,this.vertexNormals=null}static async load(t,r,i={}){const s=await fetch(r);if(!s.ok)throw new Error(`OBJ 파일 로드 실패: ${r}`);const a=await s.text(),n=new Y(t);return n._parse(a,i),n._computeNormals(),n.initBuffers(),n}_parse(t,r){const i=[],s=[],a=[],n=new Map,o=[],l=[],c=[],h=[],u=[],d=r.color||[.8,.8,.8,1],f=t.split(/\r?\n/);for(const m of f){const v=m.trim();if(!v||v.startsWith("#"))continue;const g=v.split(/\s+/),b=g[0];if(b==="v")i.push([parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3])]);else if(b==="vt")s.push([parseFloat(g[1]),parseFloat(g[2])]);else if(b==="vn")a.push([parseFloat(g[1]),parseFloat(g[2]),parseFloat(g[3])]);else if(b==="f"){const S=g.slice(1).map(_=>{const[y,p,w]=_.split("/").map(R=>R?parseInt(R)-1:-1);return{vi:y,ti:p,ni:w}});for(let _=1;_<S.length-1;_++){const y=[S[0],S[_],S[_+1]];for(const p of y){const w=`${p.vi}/${p.ti}/${p.ni}`;if(!n.has(w)){const R=o.length/3;n.set(w,R);const C=i[p.vi]||[0,0,0];o.push(C[0],C[1],C[2]);const I=p.ni>=0?a[p.ni]:[0,1,0];l.push(I[0],I[1],I[2]),c.push(...d);const L=p.ti>=0?s[p.ti]:[0,0];h.push(L[0],L[1])}u.push(n.get(w))}}}}this._normalize(o),this.vertices=new Float32Array(o),this.normals=new Float32Array(l),this.colors=new Float32Array(c),this.texCoords=new Float32Array(h),this.indices=new Uint32Array(u)}_normalize(t){let r=1/0,i=-1/0,s=1/0,a=-1/0,n=1/0,o=-1/0;for(let d=0;d<t.length;d+=3)r=Math.min(r,t[d]),i=Math.max(i,t[d]),s=Math.min(s,t[d+1]),a=Math.max(a,t[d+1]),n=Math.min(n,t[d+2]),o=Math.max(o,t[d+2]);const l=(r+i)/2,c=(s+a)/2,h=(n+o)/2,u=1/Math.max(i-r,a-s,o-n);for(let d=0;d<t.length;d+=3)t[d]=(t[d]-l)*u,t[d+1]=(t[d+1]-c)*u,t[d+2]=(t[d+2]-h)*u}_computeNormals(){const t=this.vertices.length/3;this.faceNormals=new Float32Array(this.normals),this.vertexNormals=new Float32Array(this.normals.length);const r=new Float32Array(this.normals.length),i=new Uint32Array(t),s=this.indices,a=this.vertices;for(let n=0;n<s.length;n+=3){const o=s[n],l=s[n+1],c=s[n+2],h=a[l*3]-a[o*3],u=a[l*3+1]-a[o*3+1],d=a[l*3+2]-a[o*3+2],f=a[c*3]-a[o*3],m=a[c*3+1]-a[o*3+1],v=a[c*3+2]-a[o*3+2],g=u*v-d*m,b=d*f-h*v,S=h*m-u*f;for(const _ of[o,l,c])r[_*3]+=g,r[_*3+1]+=b,r[_*3+2]+=S,i[_]++}for(let n=0;n<t;n++){const o=i[n]||1;let l=r[n*3]/o,c=r[n*3+1]/o,h=r[n*3+2]/o;const u=Math.sqrt(l*l+c*c+h*h)||1;this.vertexNormals[n*3]=l/u,this.vertexNormals[n*3+1]=c/u,this.vertexNormals[n*3+2]=h/u}this.normals=new Float32Array(this.vertexNormals)}copyVertexNormalsToNormals(){this.normals.set(this.vertexNormals)}copyFaceNormalsToNormals(){this.normals.set(this.faceNormals)}initBuffers(){const t=this.gl;this.vao=t.createVertexArray(),this.vbo=t.createBuffer(),this.ebo=t.createBuffer(),this.indexCount=this.indices.length;const r=this.vertices.byteLength,i=this.normals.byteLength,s=this.colors.byteLength,a=this.texCoords.byteLength,n=r+i+s+a;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bufferSubData(t.ARRAY_BUFFER,r+i,this.colors),t.bufferSubData(t.ARRAY_BUFFER,r+i+s,this.texCoords),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.ebo),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0),t.vertexAttribPointer(1,3,t.FLOAT,!1,0,r),t.vertexAttribPointer(2,4,t.FLOAT,!1,0,r+i),t.vertexAttribPointer(3,2,t.FLOAT,!1,0,r+i+s),t.enableVertexAttribArray(0),t.enableVertexAttribArray(1),t.enableVertexAttribArray(2),t.enableVertexAttribArray(3),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}updateNormals(){const t=this.gl,r=this.vertices.byteLength;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}draw(t){const r=this.gl;t.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_INT,0),r.bindVertexArray(null)}delete(){const t=this.gl;this.vbo&&t.deleteBuffer(this.vbo),this.ebo&&t.deleteBuffer(this.ebo),this.vao&&t.deleteVertexArray(this.vao),this.vbo=null,this.ebo=null,this.vao=null}}class Vt{constructor(t,r={}){this.gl=t,this.halfW=r.halfW??7,this.halfH=r.halfH??6,this.color=r.color??[.88,.84,.78,1],this.vao=t.createVertexArray(),this.vbo=t.createBuffer(),this.ebo=t.createBuffer(),this._initGeometry(),this._initBuffers()}_initGeometry(){const t=this.halfW,r=this.halfH,i=this.color,s=new Float32Array([-t,0,-r,t,0,-r,t,0,r,-t,0,r]),a=new Float32Array([0,1,0,0,1,0,0,1,0,0,1,0]),n=new Float32Array([...i,...i,...i,...i]),o=new Float32Array([0,0,1,0,1,1,0,1]),l=new Uint16Array([0,2,1,0,3,2]);this.vertices=s,this.normals=a,this.colors=n,this.texCoords=o,this.indices=l,this.indexCount=l.length}_initBuffers(){const t=this.gl,r=this.vertices.byteLength,i=this.normals.byteLength,s=this.colors.byteLength,a=this.texCoords.byteLength,n=r+i+s+a;t.bindVertexArray(this.vao),t.bindBuffer(t.ARRAY_BUFFER,this.vbo),t.bufferData(t.ARRAY_BUFFER,n,t.STATIC_DRAW),t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices),t.bufferSubData(t.ARRAY_BUFFER,r,this.normals),t.bufferSubData(t.ARRAY_BUFFER,r+i,this.colors),t.bufferSubData(t.ARRAY_BUFFER,r+i+s,this.texCoords),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.ebo),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0),t.vertexAttribPointer(1,3,t.FLOAT,!1,0,r),t.vertexAttribPointer(2,4,t.FLOAT,!1,0,r+i),t.vertexAttribPointer(3,2,t.FLOAT,!1,0,r+i+s),t.enableVertexAttribArray(0),t.enableVertexAttribArray(1),t.enableVertexAttribArray(2),t.enableVertexAttribArray(3),t.bindBuffer(t.ARRAY_BUFFER,null),t.bindVertexArray(null)}draw(t){const r=this.gl;t.use(),r.bindVertexArray(this.vao),r.drawElements(r.TRIANGLES,this.indexCount,r.UNSIGNED_SHORT,0),r.bindVertexArray(null)}delete(){const t=this.gl;t.deleteBuffer(this.vbo),t.deleteBuffer(this.ebo),t.deleteVertexArray(this.vao)}}const nt=`#version 300 es\r
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
`,Gt=`#version 300 es\r
precision mediump float;\r
\r
uniform vec4 u_shadowColor;\r
out vec4 FragColor;\r
\r
void main() {\r
    FragColor = u_shadowColor;\r
}\r
`,Xt=`#version 300 es
precision highp float;

out vec4 FragColor;

in vec3 fragPos;

uniform vec2  u_spotCenter;     // (Y, Z) world-space center of spotlight on wall
uniform float u_spotRadius;     // falloff radius (world units)
uniform vec3  u_wallColor;      // base wall color
uniform float u_introIntensity; // 0→1 intro reveal multiplier

void main() {
    float dist = length(fragPos.yz - u_spotCenter);
    float t    = dist / u_spotRadius;

    // Gaussian spotlight: bright hotspot + wide ambient glow
    float hotspot = exp(-t * t * 14.0);           // tight bright center
    float glow    = exp(-t * t * 1.8);            // wide soft falloff
    float intensity = glow + hotspot * 0.40;
    intensity = clamp(intensity, 0.010, 1.40);

    // Warm tint at center, neutral toward edges
    vec3 warmTint = mix(vec3(0.86, 0.86, 0.90), vec3(1.00, 0.97, 0.91), hotspot);

    FragColor = vec4(u_wallColor * warmTint * intensity * u_introIntensity, 1.0);
}
`,qt=98;function at(e){const t=Math.hypot(e[0],e[1],e[2],e[3]);return t<1e-8?[0,0,0,1]:e.map(r=>r/t)}const Wt={getMatchPercentage(e,t){const r=at(e),i=at(t),s=Math.abs(r[0]*i[0]+r[1]*i[1]+r[2]*i[2]+r[3]*i[3]);return Math.min(100,s*100)},checkClear(e,t,r=qt){const i=this.getMatchPercentage(e,t);return{cleared:i>=r,matchPercentage:i}}};class V{constructor(t,r,i){this.gl=t,this.program=this._createProgram(r,i)}use(){this.gl.useProgram(this.program)}setInt(t,r){this.gl.uniform1i(this.gl.getUniformLocation(this.program,t),r)}setFloat(t,r){this.gl.uniform1f(this.gl.getUniformLocation(this.program,t),r)}setVec2(t,r){this.gl.uniform2fv(this.gl.getUniformLocation(this.program,t),r)}setVec3(t,r){this.gl.uniform3fv(this.gl.getUniformLocation(this.program,t),r)}setVec4(t,r){this.gl.uniform4fv(this.gl.getUniformLocation(this.program,t),r)}setMat3(t,r){this.gl.uniformMatrix3fv(this.gl.getUniformLocation(this.program,t),!1,r)}setMat4(t,r){this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program,t),!1,r)}delete(){this.gl.deleteProgram(this.program)}_createProgram(t,r){const i=this.gl,s=this._compileShader(i.VERTEX_SHADER,t),a=this._compileShader(i.FRAGMENT_SHADER,r),n=i.createProgram();if(i.attachShader(n,s),i.attachShader(n,a),i.linkProgram(n),!i.getProgramParameter(n,i.LINK_STATUS)){const o=i.getProgramInfoLog(n);throw i.deleteProgram(n),i.deleteShader(s),i.deleteShader(a),new Error(`Shader program link failed: ${o}`)}return i.deleteShader(s),i.deleteShader(a),n}_compileShader(t,r){const i=this.gl,s=i.createShader(t);if(i.shaderSource(s,r),i.compileShader(s),!i.getShaderParameter(s,i.COMPILE_STATUS)){const a=i.getShaderInfoLog(s);throw i.deleteShader(s),new Error(`Shader compile failed: ${a}`)}return s}}class et extends Z{constructor(t,r){super(t),this.selectedStageId=r,this.timer=0,this.hintCount=0,this.matchRate=0,this._clearTriggered=!1,this._introActive=!0,this._introElapsed=0,this._introSpotIntensity=0,this._hudVisible=!1,this._introOverlay=null,this._hintActive=!1,this._hintTimer=0,this._hintAlpha=0,this._HINT_IN=.35,this._HINT_HOLD=2,this._HINT_OUT=.55,this._onKeyDown=this._onKeyDown.bind(this),this.arcball=new Ct(this.gl.canvas,5,{rotation:1.2,zoom:0}),this.wallX=-4.5,this.lightPosition=M(4.5,1.2,.5),this.viewPosition=M(2,2.8,5.5)}async enter(){const t=D.getById(this.selectedStageId);if(!t){console.error(`Stage with ID ${this.selectedStageId} not found!`),F(async()=>{const{default:r}=await Promise.resolve().then(()=>W);return{default:r}},void 0).then(({default:r})=>{x.changeScene(new r(this.gl))});return}this.arcball.locked=!0,this.stageId=t.id,this.stageName=t?t.name:`Stage ${this.stageId+1}`,this.assetsPath=t?t.assetsPath:null,this.targetShadowImage=t?t.targetShadow:null,this.targetRotation=t.targetRotation,this._initGLState(),await this._initSceneResources(),this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI(),this._deleteSceneResources()}update(t){if(this._introActive){this._introElapsed+=t,this._tickIntro();return}this.timer+=t;const r=Wt.checkClear(this.arcball.getRotationQuaternion(),this.targetRotation);this.matchRate=r.matchPercentage/100,this._updateHUD(),this._updateHint(t),r.cleared&&!this._clearTriggered&&(this._clearTriggered=!0,this._playSuccessEffect())}_tickIntro(){const t=this._introElapsed,r=.5,s=Math.max(0,Math.min(1,(t-r)/(2.3-r)));this._introSpotIntensity=s*s,!this._hudVisible&&t>=2.2&&(this._hudVisible=!0,this._ui&&(this._ui.style.transition="opacity 0.55s ease",this._ui.style.opacity="1"),this._updateHUD()),t>=2.5&&(this._introActive=!1,this._introSpotIntensity=1,this.arcball.locked=!1,this._introOverlay?.remove(),this._introOverlay=null)}_updateHint(t){if(!this._hintActive)return;this._hintTimer+=t;const{_HINT_IN:r,_HINT_HOLD:i,_HINT_OUT:s}=this,a=r+i+s;this._hintTimer>=a?(this._hintActive=!1,this._hintAlpha=0):this._hintTimer<r?this._hintAlpha=this._hintTimer/r:this._hintTimer<r+i?this._hintAlpha=1:this._hintAlpha=1-(this._hintTimer-r-i)/s}render(){const t=this.gl;if(!this.cube||!this.wall||!this.objectShader||!this.shadowShader||!this.wallShader)return;t.viewport(0,0,t.canvas.width,t.canvas.height),t.depthMask(!0),t.stencilMask(255),t.clearColor(.05,.04,.04,1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT|t.STENCIL_BUFFER_BIT);const{view:r,projection:i}=this._getCameraMatrices(),s=this._getCubeModelMatrix(),a=E();z(a,a,[this.wallX,0,0]),yt(a,a,-Math.PI/2),this._drawWall(a,r,i);const n=this._getShadowModelMatrix(s);if(t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),t.stencilFunc(t.NOTEQUAL,1,255),t.stencilOp(t.KEEP,t.KEEP,t.REPLACE),t.stencilMask(255),this._drawShadowObject(this.cube,n,r,i,.72),t.stencilMask(0),t.stencilFunc(t.ALWAYS,0,255),t.depthMask(!0),t.disable(t.BLEND),this._hintActive&&this._hintAlpha>.001){const o=this._getHintModelMatrix(),l=this._getShadowModelMatrix(o);t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.depthMask(!1),this._drawHintShadow(this.cube,l,r,i,this._hintAlpha),t.depthMask(!0),t.disable(t.BLEND)}this._drawLitObject(this.cube,s,r,i)}_initGLState(){const t=this.gl;t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.enable(t.CULL_FACE),t.cullFace(t.BACK),t.enable(t.STENCIL_TEST)}async _initSceneResources(){const t=this.gl,r=D.getById(this.selectedStageId);this.cube=await Y.load(t,r.modelPath),this.wall=new Vt(t,{halfW:8,halfH:7,color:[.88,.84,.78,1]}),this.objectShader=new V(t,nt,Ht),this.lampShader=new V(t,$t,jt),this.shadowShader=new V(t,Yt,Gt),this.wallShader=new V(t,nt,Xt),this.whiteTexture=this._createSingleColorTexture([255,255,255,255]);const i=this.lightPosition[0],s=this.lightPosition[1],a=this.lightPosition[2],n=(i-this.wallX)/i;this._wallSpotCenter=new Float32Array([s+n*(.55-s),a+n*(0-a)]),this._wallSpotRadius=3.2}_deleteSceneResources(){this.cube?.delete?.(),this.wall?.delete?.(),this.objectShader?.delete?.(),this.lampShader?.delete?.(),this.shadowShader?.delete?.(),this.wallShader?.delete?.(),this.whiteTexture&&this.gl.deleteTexture(this.whiteTexture),this.cube=null,this.wall=null,this.objectShader=null,this.lampShader=null,this.shadowShader=null,this.wallShader=null,this.whiteTexture=null}_createSingleColorTexture(t){const r=this.gl,i=r.createTexture();return r.bindTexture(r.TEXTURE_2D,i),r.texImage2D(r.TEXTURE_2D,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array(t)),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.bindTexture(r.TEXTURE_2D,null),i}_getCameraMatrices(){const t=this.gl,r=t.canvas.width/Math.max(t.canvas.height,1),i=E(),s=E();return j(i,this.viewPosition,M(-1,.4,0),M(0,1,0)),ht(s,Math.PI/4,r,.1,100),{view:i,projection:s}}_getCubeModelMatrix(){const t=E(),r=this.arcball.getModelRotMatrix();return z(t,t,[0,.55,0]),U(t,t,r),it(t,t,[1.45,1.45,1.45]),t}_getShadowModelMatrix(t){const r=this._createPlaneShadowMatrix([1,0,0,-this.wallX],[this.lightPosition[0],this.lightPosition[1],this.lightPosition[2],1]),i=E(),s=E();return z(i,i,[.004,0,0]),U(s,i,r),U(s,s,t),s}_createPlaneShadowMatrix(t,r){const i=t[0]*r[0]+t[1]*r[1]+t[2]*r[2]+t[3]*r[3],s=E();for(let a=0;a<4;a++)for(let n=0;n<4;n++)s[a*4+n]=i*(n===a?1:0)-r[n]*t[a];return s}_drawLitObject(t,r,i,s){const a=this.gl,n=this.objectShader,o=tt();ct(o,r),n.use(),n.setMat4("u_model",r),n.setMat4("u_view",i),n.setMat4("u_projection",s),n.setVec3("u_viewPos",this.viewPosition),n.setVec3("light.position",this.lightPosition),n.setVec3("light.ambient",[.06,.06,.07]),n.setVec3("light.diffuse",[.95,.93,.88]),n.setVec3("light.specular",[.5,.48,.44]),n.setVec3("light.direction",M(-this.lightPosition[0],-this.lightPosition[1],-this.lightPosition[2])),n.setFloat("light.cutOff",Math.PI/5),n.setFloat("light.outerCutOff",Math.PI/4),n.setFloat("light.constant",1),n.setFloat("light.linear",.045),n.setFloat("light.quadratic",.0075),n.setVec3("material.specular",[.2,.2,.2]),n.setFloat("material.shininess",32),n.setInt("material.diffuse",0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,this.whiteTexture),t.draw(n)}_drawShadowObject(t,r,i,s,a=.72){const n=this.shadowShader;n.use(),n.setMat4("u_model",r),n.setMat4("u_view",i),n.setMat4("u_projection",s),n.setVec4("u_shadowColor",[0,0,0,a]),t.draw(n)}_drawWall(t,r,i){const s=this.wallShader;s.use(),s.setMat4("u_model",t),s.setMat4("u_view",r),s.setMat4("u_projection",i),s.setVec2("u_spotCenter",this._wallSpotCenter),s.setFloat("u_spotRadius",this._wallSpotRadius),s.setVec3("u_wallColor",[.88,.85,.79]),s.setFloat("u_introIntensity",this._introSpotIntensity),this.wall.draw(s)}_drawLamp(t,r,i){const s=this.lampShader;s.use(),s.setMat4("u_model",t),s.setMat4("u_view",r),s.setMat4("u_projection",i),this.cube.draw(s)}_playSuccessEffect(){const t=this.targetRotation,r=Math.hypot(t[0],t[1],t[2],t[3])||1;this.arcball.rotation[0]=t[0]/r,this.arcball.rotation[1]=t[1]/r,this.arcball.rotation[2]=t[2]/r,this.arcball.rotation[3]=t[3]/r,this.arcball.locked=!0,document.getElementById("btn-hint")?.setAttribute("disabled",""),document.getElementById("btn-back")?.setAttribute("disabled",""),document.querySelectorAll(".match-dot").forEach(a=>{a.classList.add("active","celebrating")});const i=document.createElement("div");i.id="clear-vignette",document.body.appendChild(i);const s=document.createElement("div");s.id="clear-banner",s.textContent="Clear!",document.body.appendChild(s),this._clearOverlays=[i,s],setTimeout(()=>{const a=document.createElement("div");a.id="clear-fade",document.body.appendChild(a),this._clearOverlays.push(a),setTimeout(async()=>{a.remove(),this._clearOverlays=this._clearOverlays.filter(n=>n!==a),i.remove(),s.remove(),this._clearOverlays=[],await this._showClearOverlay()},500)},1600)}async _showClearOverlay(){const t=new zt(this.stageId);await t.init();const r=t.calculate(this.timer,this.hintCount);P.saveResult(this.stageId,{score:this.timer,stars:r});const i=c=>`${String(Math.floor(c/60)).padStart(2,"0")}:${String(Math.floor(c%60)).padStart(2,"0")}`,s=i(this.timer),a=P.getResult(this.stageId),n=a.bestScore<5999?i(a.bestScore):"--:--",o=this.stageId>=D.getTotalCount()-1,l=document.createElement("div");l.id="clear-overlay",l.innerHTML=`
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
                        <span class="co-score-val">${n}</span>
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
        `,document.body.appendChild(l),this._clearOverlays=[l],l.querySelectorAll(".co-star").forEach((c,h)=>{setTimeout(()=>c.classList.add("pop"),200+h*220)}),l.querySelector("#co-retry").addEventListener("click",()=>{F(async()=>{const{default:c}=await Promise.resolve().then(()=>ot);return{default:c}},void 0).then(({default:c})=>{x.changeScene(new c(this.gl,this.stageId))})}),l.querySelector("#co-next").addEventListener("click",()=>{F(async()=>{const{default:c}=await Promise.resolve().then(()=>ot);return{default:c}},void 0).then(({default:c})=>{x.changeScene(new c(this.gl,this.stageId+1))})}),l.querySelector("#co-menu").addEventListener("click",()=>{F(async()=>{const{default:c}=await Promise.resolve().then(()=>W);return{default:c}},void 0).then(({default:c})=>{x.changeScene(new c(this.gl))})})}_useHint(){this._introActive||this._clearTriggered||this._hintActive||(this.hintCount++,this._hintActive=!0,this._hintTimer=0,this._hintAlpha=0)}_getHintModelMatrix(){const t=E(),r=E(),i=this.targetRotation,s=Math.hypot(i[0],i[1],i[2],i[3])||1;return K(r,[i[0]/s,i[1]/s,i[2]/s,i[3]/s]),z(t,t,[0,.55,0]),U(t,t,r),it(t,t,[1.45,1.45,1.45]),t}_drawHintShadow(t,r,i,s,a){const n=this.shadowShader;n.use(),n.setMat4("u_model",r),n.setMat4("u_view",i),n.setMat4("u_projection",s),n.setVec4("u_shadowColor",[0,.843,.996,a*.72]),t.draw(n)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="game-hud",this._ui.innerHTML=`

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
        `,document.body.appendChild(this._ui),this._ui.style.opacity="0",this._introOverlay=document.createElement("div"),this._introOverlay.id="game-intro-overlay",document.body.appendChild(this._introOverlay),document.getElementById("btn-back").addEventListener("click",()=>{this._goToStageSelect()}),document.getElementById("btn-hint").addEventListener("click",()=>{this._useHint()})}_updateHUD(){const t=String(Math.floor(this.timer/60)).padStart(2,"0"),r=String(Math.floor(this.timer%60)).padStart(2,"0"),i=document.getElementById("hud-timer"),s=document.getElementById("panel-match-pct");i&&(i.textContent=`${t}:${r}`);const a=Math.floor(this.matchRate*100);s&&(s.textContent=`${a}%`);const n=this._clearTriggered?5:a>=60?4:a>=40?3:a>=20?2:1;document.querySelectorAll(".match-dot").forEach((o,l)=>{o.classList.toggle("active",l<n)})}_removeUI(){this._ui?.remove(),this._introOverlay?.remove(),this._introOverlay=null,this._clearOverlays?.forEach(t=>t?.remove())}_goToStageSelect(){F(async()=>{const{default:t}=await Promise.resolve().then(()=>W);return{default:t}},void 0).then(({default:t})=>{x.changeScene(new t(this.gl))})}_onKeyDown(t){if(t.key==="Escape"){this._goToStageSelect();return}this._introActive||this._clearTriggered||(t.key==="h"&&this._useHint(),t.key==="p"&&console.log("Current Rotation:",this.arcball.rotation))}}const ot=Object.freeze(Object.defineProperty({__proto__:null,default:et},Symbol.toStringTag,{value:"Module"})),Kt=`#version 300 es
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
uniform mat4 u_mvp;
uniform mat3 u_normalMat;
out vec3 v_normal;
void main() {
    gl_Position = u_mvp * vec4(a_position, 1.0);
    v_normal    = normalize(u_normalMat * a_normal);
}`,Qt=`#version 300 es
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
}`;class Jt{constructor(t){this._canvas=t,this._gl=t.getContext("webgl2",{alpha:!0,antialias:!0,depth:!0,premultipliedAlpha:!1,powerPreference:"low-power"}),this._gl||console.error("[Preview] WebGL2 context creation failed for canvas",t.dataset.index),this._program=null,this._shader=null,this._model=null,this._rotY=0,this.ready=!1,this._gl&&this._initGL()}_initGL(){const t=this._gl;t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.enable(t.CULL_FACE),t.cullFace(t.BACK);const r=this._compile(t.VERTEX_SHADER,Kt),i=this._compile(t.FRAGMENT_SHADER,Qt);this._program=this._link(r,i);const s=this._program;this._shader={program:s,use:()=>t.useProgram(s)}}async loadModel(t){if(this._gl)try{this._model=await Y.load(this._gl,t),this.ready=!0}catch(r){console.error("[Preview] model load failed:",t,r)}}render(t,r={}){const i=this._gl;if(!i||!this.ready||!this._model||!this._program)return;const{brightness:s=1,rotSpeed:a=.42}=r;this._rotY+=t*a;const n=Math.min(window.devicePixelRatio||1,2),o=this._canvas.clientWidth||this._canvas.width||240,l=this._canvas.clientHeight||this._canvas.height||240,c=o*n|0,h=l*n|0;if(c<=0||h<=0)return;(this._canvas.width!==c||this._canvas.height!==h)&&(this._canvas.width=c,this._canvas.height=h),i.viewport(0,0,c,h),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT);const u=c/Math.max(h,1),d=ht(E(),Math.PI/5.5,u,.05,50),f=j(E(),[0,.12,2.6],[0,0,0],[0,1,0]),m=E();bt(m,m,this._rotY),wt(m,m,.22);const v=U(E(),f,m),g=U(E(),d,v),b=ct(tt(),v),S=this._program;i.useProgram(S),i.uniformMatrix4fv(i.getUniformLocation(S,"u_mvp"),!1,g),i.uniformMatrix3fv(i.getUniformLocation(S,"u_normalMat"),!1,b),i.uniform3fv(i.getUniformLocation(S,"u_lightDir"),[1.4,2.2,2.8]),i.uniform3fv(i.getUniformLocation(S,"u_color"),[1,.95,.84]),i.uniform1f(i.getUniformLocation(S,"u_brightness"),s),this._model.draw(this._shader)}destroy(){this._model?.delete?.(),this._program&&this._gl&&this._gl.deleteProgram(this._program),this._model=null,this._program=null,this._shader=null,this.ready=!1}_compile(t,r){const i=this._gl,s=i.createShader(t);return i.shaderSource(s,r),i.compileShader(s),i.getShaderParameter(s,i.COMPILE_STATUS)?s:(console.error("[Preview shader]",i.getShaderInfoLog(s)),i.deleteShader(s),null)}_link(t,r){if(!t||!r)return null;const i=this._gl,s=i.createProgram();return i.attachShader(s,t),i.attachShader(s,r),i.linkProgram(s),i.deleteShader(t),i.deleteShader(r),i.getProgramParameter(s,i.LINK_STATUS)?s:(console.error("[Preview link]",i.getProgramInfoLog(s)),null)}}class J extends Z{constructor(t){super(t),this.stages=[],this.currentIndex=0,this._ui=null,this._previews=new Map,this._onKeyDown=this._onKeyDown.bind(this)}async enter(){if(this.stages=D.getAll(),!this.stages||this.stages.length===0){console.error("No stages loaded.");return}this._buildUI(),await this._initPreviews(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._destroyPreviews(),this._removeUI()}update(t){if(!this._ui||this._previews.size===0)return;const r=new Set([this.currentIndex-1,this.currentIndex,this.currentIndex+1].filter(i=>i>=0&&i<this.stages.length));for(const[i,s]of this._previews){if(!r.has(i))continue;const a=i===this.currentIndex,n=!P.isUnlocked(i);s.render(t,{brightness:a?1:n?.35:.52,rotSpeed:a?.42:.22})}}render(){this.gl.clearColor(.13,.12,.12,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._removeUI(),this._ui=document.createElement("div"),this._ui.id="stage-select",this._ui.innerHTML=`
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
        `,document.body.appendChild(this._ui),this._updateCarousel(!1),this._bindEvents()}_cardHTML(t,r){const i=P.isUnlocked(r),s=P.getResult(r),a=s.bestStars||0,o=s.bestScore<5999?`Best · ${this._fmt(s.bestScore)}`:"---",l=String(r+1).padStart(2,"0"),c=[1,2,3].map(h=>`<span class="card-star${a>=h?" filled":""}">★</span>`).join("");return`
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
        `}async _initPreviews(){const t=this._ui.querySelectorAll(".preview-canvas"),r=[];t.forEach(i=>{const s=Number(i.dataset.index),a=this.stages[s];if(!a?.modelPath)return;const n=new Jt(i);this._previews.set(s,n),r.push(n.loadModel(a.modelPath))}),await Promise.allSettled(r)}_destroyPreviews(){for(const t of this._previews.values())t.destroy();this._previews.clear()}_bindEvents(){document.getElementById("ss-back").addEventListener("click",async()=>{const{default:t}=await F(async()=>{const{default:r}=await Promise.resolve().then(()=>lt);return{default:r}},void 0);x.changeScene(new t(this.gl))}),document.getElementById("ss-prev").addEventListener("click",()=>{this.currentIndex>0&&(this.currentIndex--,this._updateCarousel(!0))}),document.getElementById("ss-next").addEventListener("click",()=>{this.currentIndex<this.stages.length-1&&(this.currentIndex++,this._updateCarousel(!0))}),this._ui.querySelectorAll(".stage-card").forEach(t=>{t.addEventListener("click",()=>{const r=Number(t.dataset.index);r!==this.currentIndex?(this.currentIndex=r,this._updateCarousel(!0)):P.isUnlocked(r)&&this._startStage(r)})})}_updateCarousel(t){const r=this._ui.querySelectorAll(".stage-card"),i=["far-left","left","current","right","far-right"];t||r.forEach(n=>n.classList.add("no-transition")),r.forEach((n,o)=>{n.classList.remove(...i);const l=o-this.currentIndex;l<-1?n.classList.add("far-left"):l===-1?n.classList.add("left"):l===0?n.classList.add("current"):l===1?n.classList.add("right"):n.classList.add("far-right")}),t||requestAnimationFrame(()=>r.forEach(n=>n.classList.remove("no-transition")));const s=this._ui.querySelector("#ss-prev"),a=this._ui.querySelector("#ss-next");s&&(s.disabled=this.currentIndex===0),a&&(a.disabled=this.currentIndex===this.stages.length-1)}_removeUI(){this._ui&&(this._ui.remove(),this._ui=null)}_startStage(t){x.changeScene(new et(this.gl,t))}_fmt(t){return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(Math.floor(t%60)).padStart(2,"0")}`}async _onKeyDown(t){if(t.key==="ArrowLeft"&&this.currentIndex>0)this.currentIndex--,this._updateCarousel(!0);else if(t.key==="ArrowRight"&&this.currentIndex<this.stages.length-1)this.currentIndex++,this._updateCarousel(!0);else if(t.key==="Enter")P.isUnlocked(this.currentIndex)&&this._startStage(this.currentIndex);else if(t.key==="Escape"){const{default:r}=await F(async()=>{const{default:i}=await Promise.resolve().then(()=>lt);return{default:i}},void 0);x.changeScene(new r(this.gl))}}}const W=Object.freeze(Object.defineProperty({__proto__:null,default:J},Symbol.toStringTag,{value:"Module"}));class gt extends Z{constructor(t){super(t),this._onKeyDown=this._onKeyDown.bind(this)}enter(){this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.05,.04,.04,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="main-menu",this._ui.innerHTML=`
            <h1 id="menu-title">Shadow<br>Match</h1>
            <p id="menu-tagline">Shadow Puzzle Game</p>
            <div id="menu-buttons">
                <button id="btn-start" class="btn-primary">New Game</button>
                <button id="btn-stage" class="btn-secondary">Select Stage</button>
            </div>
            <div id="menu-line"></div>
        `,document.body.appendChild(this._ui),document.getElementById("btn-start").addEventListener("click",()=>{P.reset(),x.changeScene(new et(this.gl,0))}),document.getElementById("btn-stage").addEventListener("click",()=>{x.changeScene(new J(this.gl))})}_removeUI(){this._ui?.remove()}_onKeyDown(t){t.key==="Enter"&&x.changeScene(new J(this.gl))}}const lt=Object.freeze(Object.defineProperty({__proto__:null,default:gt},Symbol.toStringTag,{value:"Module"}));class Zt{constructor(){this.canvas=null,this.gl=null,this._lastTime=null}async initialize(){if(await D.load(),this.canvas=document.getElementById("gameCanvas"),this.gl=this.canvas.getContext("webgl2",{stencil:!0}),!this.gl){alert("WebGL2 not supported");return}this.resize(),window.addEventListener("resize",()=>{this.resize()}),x.changeScene(new gt(this.gl))}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.gl&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}run(){const t=r=>{this._lastTime===null&&(this._lastTime=r);const i=(r-this._lastTime)/1e3;this._lastTime=r,x.update(i),x.render(),requestAnimationFrame(t)};requestAnimationFrame(t)}}window.addEventListener("DOMContentLoaded",()=>{const e=new Zt;e.initialize(),e.run()});
