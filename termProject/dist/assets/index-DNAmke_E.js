(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();class C{constructor(){this.currentScene=null}changeScene(e){this.currentScene&&this.currentScene.exit(),this.currentScene=e,this.currentScene&&this.currentScene.enter()}update(e){this.currentScene&&this.currentScene.update(e)}render(){this.currentScene&&this.currentScene.render()}}const c=new C;class v{constructor(e){this.gl=e}enter(){}exit(){}update(){}render(){}}const D="modulepreload",B=function(a){return"/computerGraphics/termProject/"+a},b={},m=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){let u=function(d){return Promise.all(d.map(g=>Promise.resolve(g).then(_=>({status:"fulfilled",value:_}),_=>({status:"rejected",reason:_}))))};var r=u;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");n=u(t.map(d=>{if(d=B(d),d in b)return;b[d]=!0;const g=d.endsWith(".css"),_=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${_}`))return;const h=document.createElement("link");if(h.rel=g?"stylesheet":D,g||(h.as="script"),h.crossOrigin="",h.href=d,l&&h.setAttribute("nonce",l),document.head.appendChild(h),g)return new Promise((L,T)=>{h.addEventListener("load",L),h.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return n.then(o=>{for(const l of o||[])l.status==="rejected"&&s(l.reason);return e().catch(s)})},U={constructor(a){this.selectedStageId=a,this.threestarTime=0},async init(){const a=StageManager.getById(this.selectedStageId);if(!a){console.error(`Stage with ID ${this.selectedStageId} not found!`);return}this.threestarTime=a.threestartime??60},calculate(a,e){return 1}};async function O(){try{return await(await fetch("./public/data/stageConfig.json")).json()}catch(a){return console.error("Error loading stage config:",a),[]}}const f={_stages:[],async load(){this._stages=await O()},getAll(){return this._stages},getById(a){return this._stages.find(e=>e.id===a)||null},getTotalCount(){return this._stages.length}};class w extends v{constructor(e,t){super(e),this.result=t,this.stars=0}enter(){this.stars=this._calcStars(),this._buildUI()}exit(){this._removeUI()}update(){}render(){this.gl.clearColor(.05,.05,.05,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_calcStars(){return U.calculate(this.result.time,this.result.hintCount)}_buildUI(){const{time:e,stageId:t}=this.result,i=String(Math.floor(e/60)).padStart(2,"0"),n=String(Math.floor(e%60)).padStart(2,"0"),s="★".repeat(this.stars)+"☆".repeat(3-this.stars);this._ui=document.createElement("div"),this._ui.id="clear-scene",this._ui.innerHTML=`
            <h2>Stage Clear!</h2>
            <p>Stage: ${t+1}</p>
            <div id="clear-stars">${s}</div>
            <p>highscore: ${i}:${n}</p> <!-- todo: 스테이지별 최고 기록 표시 -->
            <p>Time: ${i}:${n}</p>
            <button id="btn-next">Next Stage</button>
            <button id="btn-retry">Retry</button>
            <button id="btn-menu">Menu</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-next").addEventListener("click",()=>{m(async()=>{const{default:r}=await Promise.resolve().then(()=>y);return{default:r}},void 0).then(({default:r})=>{c.changeScene(new r(this.gl,t+1))})}),t>=f.getTotalCount()-1&&(document.getElementById("btn-next").style.display="none"),document.getElementById("btn-retry").addEventListener("click",()=>{m(async()=>{const{default:r}=await Promise.resolve().then(()=>y);return{default:r}},void 0).then(({default:r})=>{c.changeScene(new r(this.gl,t))})}),document.getElementById("btn-menu").addEventListener("click",()=>{m(async()=>{const{default:r}=await Promise.resolve().then(()=>I);return{default:r}},void 0).then(({default:r})=>{c.changeScene(new r(this.gl))})})}_removeUI(){this._ui?.remove()}}class P{constructor(e,t=5,i={rotation:1,zoom:.001}){this.canvas=e,this.distance=t,this.rotation=quat.create(),this.position=vec3.fromValues(0,0,t),this.target=vec3.create(),this.up=vec3.fromValues(0,1,0),this.rotationSensitivity=i.rotation||1,this.zoomSensitivity=i.zoom||.001,this.dragging=!1,this.lastMouseX=0,this.lastMouseY=0,e.addEventListener("mousedown",this.onMouseDown.bind(this)),e.addEventListener("mousemove",this.onMouseMove.bind(this)),e.addEventListener("mouseup",this.onMouseUp.bind(this)),e.addEventListener("wheel",this.onWheel.bind(this))}getArcballVector(e,t){const i=this.canvas.getBoundingClientRect(),n={x:i.width*.5,y:i.height*.5},s=(e-n.x)/n.x,r=(n.y-t)/n.y,o=s*s+r*r,l=o<=1?Math.sqrt(1-o):0,u=vec3.fromValues(s,r,l);return vec3.normalize(u,u),u}onMouseDown(e){this.dragging=!0,this.lastMouseX=e.clientX,this.lastMouseY=e.clientY}onMouseMove(e){if(!this.dragging)return;const t=e.clientX,i=e.clientY,n=this.getArcballVector(this.lastMouseX,this.lastMouseY),s=this.getArcballVector(t,i),r=Math.acos(Math.min(1,vec3.dot(n,s)))*this.rotationSensitivity,o=vec3.create();vec3.cross(o,s,n),vec3.normalize(o,o);const l=quat.create();quat.setAxisAngle(l,o,r),quat.multiply(this.rotation,l,this.rotation),this.lastMouseX=t,this.lastMouseY=i}onMouseUp(){this.dragging=!1}onWheel(e){this.distance+=e.deltaY*this.zoomSensitivity*this.distance,this.distance=Math.max(.1,Math.min(100,this.distance)),vec3.set(this.position,0,0,this.distance),e.preventDefault()}getViewMatrix(){const e=mat4.create(),t=mat4.create();mat4.fromQuat(t,this.rotation);const i=vec3.create();return vec3.transformMat4(i,this.position,t),mat4.lookAt(e,i,this.target,this.up),e}getModelRotMatrix(){const e=mat4.create();return mat4.fromQuat(e,this.rotation),e}getViewCamDistanceMatrix(){const e=mat4.create();return mat4.lookAt(e,this.position,this.target,this.up),e}reset(){this.rotation=quat.create(),this.position=vec3.fromValues(0,0,this.distance),this.target=vec3.fromValues(0,0,0)}}class p extends v{constructor(e,t){super(e),this.selectedStageId=t,this.timer=0,this.hintCount=0,this.matchRate=0,this._onKeyDown=this._onKeyDown.bind(this),this.arcball=new P(this.gl.canvas)}async enter(){const e=f.getById(this.selectedStageId);if(!e){console.error(`Stage with ID ${this.selectedStageId} not found!`),c.changeScene(new w(this.gl,{stageId:this.selectedStageId,time:0,hintCount:0}));return}if(this.stageId=e.id,this.stageName=e?e.name:`Stage ${this.stageId+1}`,this.assetsPath=e?e.assetsPath:null,this.targetShadowImage=e?e.targetShadow:null,!document.getElementById("game-scene-css")){const t=document.createElement("link");t.id="game-scene-css",t.rel="stylesheet",t.href="./src/styles/gameScene.css",document.head.appendChild(t)}this.gl.enable(this.gl.DEPTH_TEST),this.gl.depthFunc(this.gl.LEQUAL),this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(e){this.timer+=e,this._updateHUD(),this.matchRate>=.95&&this._stageClear(this.stageId)}render(){const e=this.gl;e.clearColor(.94,.94,.94,1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)}_stageClear(e){c.changeScene(new w(this.gl,{stageId:e,time:this.timer,hintCount:this.hintCount}))}_useHint(){this.hintCount++,console.log("Hint used!")}_buildUI(){this._ui=document.createElement("div"),this._ui.id="game-hud",this._ui.innerHTML=`

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
        `,document.body.appendChild(this._ui),document.getElementById("btn-back").addEventListener("click",()=>{this._goToStageSelect()}),document.getElementById("btn-hint").addEventListener("click",()=>{this._useHint()}),document.getElementById("btn-debug-clear").addEventListener("click",()=>{this._stageClear(this.stageId)})}_updateHUD(){const e=String(Math.floor(this.timer/60)).padStart(2,"0"),t=String(Math.floor(this.timer%60)).padStart(2,"0"),i=document.getElementById("hud-timer"),n=document.getElementById("panel-match-bar-fill");if(i&&(i.textContent=`${e}:${t}`),n){const s=Math.floor(this.matchRate*100);n.style.width=`${s}%`,s>=80?n.dataset.level="high":s>=40?n.dataset.level="mid":n.dataset.level="low"}}_removeUI(){this._ui?.remove()}_goToStageSelect(){m(async()=>{const{default:e}=await Promise.resolve().then(()=>I);return{default:e}},void 0).then(({default:e})=>{c.changeScene(new e(this.gl))})}_onKeyDown(e){e.key==="h"&&this._useHint(),e.key==="Escape"&&this._goToStageSelect()}}const y=Object.freeze(Object.defineProperty({__proto__:null,default:p},Symbol.toStringTag,{value:"Module"}));class S extends v{constructor(e){super(e),this.stages=[],this.selectedStageId=0,this._ui=null,this._onKeyDown=this._onKeyDown.bind(this)}async enter(){if(this.stages=f.getAll(),!this.stages||this.stages.length===0){console.error("No stages loaded.");return}this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._removeUI(),this._ui=document.createElement("div"),this._ui.id="stage-select",this._ui.innerHTML=`
            <h2>Select Stage</h2>

            <div id="stage-list">
                ${this.stages.map((i,n)=>`
                    <button
                        class="stage-card"
                        data-index="${n}"
                    >
                        <strong>Stage ${n+1}</strong>
                        <br>
                        ${i.name??"Untitled"}
                    </button>
                `).join("")}
            </div>

            <button id="btn-back">
                ← Back
            </button>
        `,document.body.appendChild(this._ui),this._ui.querySelectorAll(".stage-card").forEach(i=>{i.addEventListener("click",()=>{const n=Number(i.dataset.index);this._startStage(n)})}),this._ui.querySelector("#btn-back").addEventListener("click",async()=>{const{default:i}=await m(async()=>{const{default:n}=await Promise.resolve().then(()=>E);return{default:n}},void 0);c.changeScene(new i(this.gl))})}_removeUI(){this._ui&&(this._ui.remove(),this._ui=null)}_startStage(e){const t=this.stages[e];if(!t){console.error("Invalid stage index:",e);return}console.log("Starting Stage:",t),c.changeScene(new p(this.gl,e))}async _onKeyDown(e){if(e.key==="Escape"){const{default:t}=await m(async()=>{const{default:i}=await Promise.resolve().then(()=>E);return{default:i}},void 0);c.changeScene(new t(this.gl))}}}const I=Object.freeze(Object.defineProperty({__proto__:null,default:S},Symbol.toStringTag,{value:"Module"}));class M extends v{constructor(e){super(e),this._onKeyDown=this._onKeyDown.bind(this)}enter(){this._buildUI(),window.addEventListener("keydown",this._onKeyDown)}exit(){window.removeEventListener("keydown",this._onKeyDown),this._removeUI()}update(){}render(){this.gl.clearColor(.1,.1,.1,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)}_buildUI(){this._ui=document.createElement("div"),this._ui.id="main-menu",this._ui.innerHTML=`
            <h1>Shadow Match</h1>
            <button id="btn-start">New Start</button>
            <button id="btn-stage">Select Stage</button>
        `,document.body.appendChild(this._ui),document.getElementById("btn-start").addEventListener("click",()=>{c.changeScene(new p(this.gl,0))}),document.getElementById("btn-stage").addEventListener("click",()=>{c.changeScene(new S(this.gl))})}_removeUI(){this._ui?.remove()}_onKeyDown(e){e.key==="Enter"&&c.changeScene(new S(this.gl))}}const E=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));class k{constructor(){this.canvas=null,this.gl=null,this._lastTime=null}async initialize(){if(await f.load(),this.canvas=document.getElementById("gameCanvas"),this.gl=this.canvas.getContext("webgl2"),!this.gl){alert("WebGL2 not supported");return}this.resize(),window.addEventListener("resize",()=>{this.resize()}),c.changeScene(new M(this.gl))}resize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.gl&&this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}run(){const e=t=>{this._lastTime===null&&(this._lastTime=t);const i=(t-this._lastTime)/1e3;this._lastTime=t,c.update(i),c.render(),requestAnimationFrame(e)};requestAnimationFrame(e)}}window.addEventListener("DOMContentLoaded",()=>{const a=new k;a.initialize(),a.run()});
