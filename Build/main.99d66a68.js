(()=>{"use strict";var e,t={6330:(e,t,i)=>{const r=i(7093);let n=new Array;n.push("Assets/FollowCameraPrefab.json"),n.push("Assets/AmbientLightPrefab.json"),n.push("Assets/DirectionalLightPrefab.json"),n.push("Assets/BallPrefab.json"),n.push("Assets/FloorPrefab.json"),new r.GameWorld(n)},4400:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PerspectiveCamera=void 0;var r=i(7010);Object.defineProperty(t,"PerspectiveCamera",{enumerable:!0,get:function(){return r.PerspectiveCamera}})},7010:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PerspectiveCamera=void 0;const r=i(5232),n=i(293);class PerspectiveCamera extends n.RenderableObject{constructor(){super(...arguments),this.fieldOfView=50,this.near=.1,this.far=2e3,this.camera=null,this.onAwake=()=>{this.camera=new r.PerspectiveCamera(this.fieldOfView,window.innerWidth/window.innerHeight,this.near,this.far),this.camera.position.z=25}}getObject(){return this.camera}getCamera(){return this.camera}serialize(){return this.toObject()}deserialize(e){const t=e;this.fieldOfView=t.fieldOfView,this.near=t.near,this.far=t.far}toObject(){return{fieldOfView:this.fieldOfView,near:this.near,far:this.far}}}t.PerspectiveCamera=PerspectiveCamera},2508:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlayerController=void 0;var r=i(4999);Object.defineProperty(t,"PlayerController",{enumerable:!0,get:function(){return r.PlayerController}})},4999:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PlayerController=void 0;const r=i(293),n=i(7158);let o=!1,s=!1,a=!1,d=!1,l=!1;class PlayerController extends r.Component{constructor(){super(...arguments),this.onAwake=()=>{document.addEventListener("keydown",this.onKeyDown,!1),document.addEventListener("keyup",this.onKeyUp,!1),this.mover=this.getComponent(n.Mover)},this.onUpdate=()=>{null!=this.mover&&(d?this.mover.startMove(n.MoveDirection.Forward):s?this.mover.startMove(n.MoveDirection.Backward):this.mover.stopMove(),l&&(this.mover.jump(),l=!1))}}onKeyDown(e){"w"==e.key?o=!0:"s"==e.key?a=!0:"a"==e.key?s=!0:"d"==e.key?d=!0:" "==e.key&&(l=!0)}onKeyUp(e){"w"==e.key?o=!1:"s"==e.key?a=!1:"a"==e.key?s=!1:"d"==e.key&&(d=!1)}}t.PlayerController=PlayerController},293:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Transform=t.Time=t.BoxMesh=t.SphereMesh=t.RigidBody=t.Quaternion=t.Position=t.Mesh=t.RenderableObject=t.GameObject=t.EventManager=t.Component=void 0;var r=i(8755);Object.defineProperty(t,"Component",{enumerable:!0,get:function(){return r.Component}});var n=i(4309);Object.defineProperty(t,"EventManager",{enumerable:!0,get:function(){return n.EventManager}});var o=i(6350);Object.defineProperty(t,"GameObject",{enumerable:!0,get:function(){return o.GameObject}});var s=i(11);Object.defineProperty(t,"RenderableObject",{enumerable:!0,get:function(){return s.RenderableObject}});var a=i(4165);Object.defineProperty(t,"Mesh",{enumerable:!0,get:function(){return a.Mesh}});var d=i(789);Object.defineProperty(t,"Position",{enumerable:!0,get:function(){return d.Position}});var l=i(4228);Object.defineProperty(t,"Quaternion",{enumerable:!0,get:function(){return l.Quaternion}});var h=i(5983);Object.defineProperty(t,"RigidBody",{enumerable:!0,get:function(){return h.RigidBody}});var c=i(4011);Object.defineProperty(t,"SphereMesh",{enumerable:!0,get:function(){return c.SphereMesh}});var u=i(7251);Object.defineProperty(t,"BoxMesh",{enumerable:!0,get:function(){return u.BoxMesh}});var m=i(5646);Object.defineProperty(t,"Time",{enumerable:!0,get:function(){return m.Time}});var b=i(1086);Object.defineProperty(t,"Transform",{enumerable:!0,get:function(){return b.Transform}})},7251:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BoxMesh=void 0;const r=i(5232),n=i(293);class BoxMesh extends n.Mesh{constructor(){super(...arguments),this.width=50,this.height=5,this.depth=50,this.geometry=null,this.material=null,this.onAwake=()=>{this.geometry=new r.BoxGeometry(this.width,this.height,this.depth),this.material=new r.MeshStandardMaterial({color:9849600}),this.mesh=new r.Mesh(this.geometry,this.material)}}serialize(){return this.toObject()}deserialize(e){const t=e;this.width=t.width,this.height=t.height,this.depth=t.depth}toObject(){return{width:this.width,height:this.height,depth:this.depth}}}t.BoxMesh=BoxMesh},8755:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;const r=i(293);t.Component=class Component{constructor(){this.gameObject=new r.GameObject,this.onAwake=()=>{},this.onStart=()=>{},this.onUpdate=()=>{}}setup(e){this.gameObject=e,r.EventManager.getSystem().subscribe("Awake",this.onAwake),r.EventManager.getSystem().subscribe("Start",this.onStart),r.EventManager.getSystem().subscribe("Update",this.onUpdate)}getComponent(e){return this.gameObject.getComponent(e)}serialize(){return null}deserialize(e){}}},4309:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.EventManager=void 0;const r=i(8675);t.EventManager=class EventManager{static getSystem(){return this.eventSystem||(this.eventSystem=new r.default),this.eventSystem}}},6350:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameObject=void 0;const r=i(293);class GameObject{constructor(){this.name="GameObject",this.tag="",this.components=new Array}setup(){GameObject.gameObjects.push(this),this.addComponent(new r.Transform),this.addComponents()}static findWithTag(e){return this.gameObjects.forEach((t=>{var i=t.tag==e;if(console.log(t.name+" "+t.tag+" "+e+" "+i),t.tag==e)return console.log("Berhasil!"),t})),null}getComponent(e){let t=null;return this.components.forEach((i=>{let n=Object.getPrototypeOf(i);for(;n instanceof r.Component;)n.constructor.name===e.name&&(t=i),n=Object.getPrototypeOf(n)})),t||null}addComponent(e){e.setup(this),this.components.push(e)}serialize(){let e=new Array;return e.push({GameObject:this.toObject()}),this.components.forEach((t=>{let i=t.serialize();i&&e.push({[t.constructor.name]:i})})),e.length>0?e:null}deserialize(e){e.forEach((e=>{Object.keys(e).forEach((t=>{var i;if("GameObject"==t){const i=e[t];this.name=i.name,this.tag=i.tag}else null===(i=this.getComponentByString(t))||void 0===i||i.deserialize(e[t])}))}))}toObject(){return{name:this.name,tag:this.tag,prefab:this.constructor.name}}getComponentByString(e){let t=null;return this.components.forEach((i=>{i.constructor.name===e&&(t=i)})),t||null}draw(){}addComponents(){}}t.GameObject=GameObject,GameObject.gameObjects=new Array},4165:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mesh=void 0;const r=i(293);class Mesh extends r.RenderableObject{constructor(){super(...arguments),this.mesh=null}getObject(){return this.mesh}setPosition(e){var t;null===(t=this.mesh)||void 0===t||t.position.set(e.x,e.y,e.z)}setQuaternion(e){var t;null===(t=this.mesh)||void 0===t||t.quaternion.set(e.x,e.y,e.z,e.w)}}t.Mesh=Mesh},789:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Position=void 0;t.Position=class Position{constructor(){this.x=0,this.y=0,this.z=0}serialize(){return this.toObject()}deserialize(e){const t=e;this.x=t.x,this.y=t.y,this.z=t.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}},4228:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Quaternion=void 0;t.Quaternion=class Quaternion{constructor(){this.x=0,this.y=0,this.z=0,this.w=0}serialize(){return this.toObject()}deserialize(e){const t=e;this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}},11:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RenderableObject=void 0;const r=i(293);class RenderableObject extends r.Component{getObject(){return null}setPosition(e){}setQuaternion(e){}}t.RenderableObject=RenderableObject},5983:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RigidBody=void 0;const r=i(3687),n=i(5264),o=i(293);class RigidBody extends o.Component{constructor(){super(...arguments),this.mass=0,this.bodyType="DYNAMIC",this.rigidBody=null,this.meshComponent=null,this.onAwake=()=>{this.meshComponent=this.getComponent(o.Mesh)},this.onStart=()=>{var e;let t=null===(e=this.meshComponent)||void 0===e?void 0:e.getObject();if(!t)return;let i=r.Body.DYNAMIC;"STATIC"===this.bodyType?i=r.Body.STATIC:"KINEMATIC"===this.bodyType&&(i=r.Body.KINEMATIC);let o=n.threeToCannon(t);this.rigidBody=new r.Body({mass:this.mass,type:i,shape:null==o?void 0:o.shape,position:null==o?void 0:o.offset,quaternion:null==o?void 0:o.orientation})}}setPosition(e){var t;null===(t=this.rigidBody)||void 0===t||t.position.set(e.x,e.y,e.z)}setQuaternion(e){var t;null===(t=this.rigidBody)||void 0===t||t.quaternion.set(e.x,e.y,e.z,e.w)}getPosition(){if(!this.rigidBody)return null;let e=new o.Position;return e.x=this.rigidBody.position.x,e.y=this.rigidBody.position.y,e.z=this.rigidBody.position.z,e}getQuaternion(){if(!this.rigidBody)return null;let e=new o.Quaternion;return e.x=this.rigidBody.quaternion.x,e.y=this.rigidBody.quaternion.y,e.z=this.rigidBody.quaternion.z,e.w=this.rigidBody.quaternion.w,e}getRigidBody(){return this.rigidBody}serialize(){return this.toObject()}deserialize(e){const t=e;this.mass=t.mass,this.bodyType=t.bodyType}toObject(){return{mass:this.mass,bodyType:this.bodyType}}}t.RigidBody=RigidBody},4011:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SphereMesh=void 0;const r=i(5232),n=i(293);class SphereMesh extends n.Mesh{constructor(){super(...arguments),this.radius=3,this.geometry=null,this.material=null,this.onAwake=()=>{this.geometry=new r.SphereGeometry(this.radius),this.material=new r.MeshStandardMaterial({color:13697024}),this.mesh=new r.Mesh(this.geometry,this.material)}}serialize(){return this.toObject()}deserialize(e){const t=e;this.radius=t.radius}toObject(){return{radius:this.radius}}}t.SphereMesh=SphereMesh},5646:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Time=void 0;class Time{}t.Time=Time,Time.deltaTime=0},1086:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Transform=void 0;const r=i(293);class Transform extends r.Component{constructor(){super(...arguments),this.position=new r.Position,this.quaternion=new r.Quaternion,this.isFirstSynchronize=!0,this.rigidBody=null,this.renderableObject=null,this.onAwake=()=>{this.rigidBody=this.getComponent(r.RigidBody),this.renderableObject=this.getComponent(r.RenderableObject)},this.onUpdate=()=>{this.isFirstSynchronize&&(this.synchronizeTransform(),this.isFirstSynchronize=!1),this.updateTransform(),this.synchronizeTransform()}}setPosition(e,t,i){this.position.x=e,this.position.y=t,this.position.z=i,this.synchronizeTransform()}setQuaternion(e,t,i,r){this.quaternion.x=e,this.quaternion.y=t,this.quaternion.z=i,this.quaternion.w=r,this.synchronizeTransform()}updateTransform(){if(this.rigidBody){var e=this.rigidBody.getPosition();e&&(this.position=e);var t=this.rigidBody.getQuaternion();t&&(this.quaternion=t)}}synchronizeTransform(){this.rigidBody&&(this.rigidBody.setPosition(this.position),this.rigidBody.setQuaternion(this.quaternion)),this.renderableObject&&(this.renderableObject.setPosition(this.position),this.renderableObject.setQuaternion(this.quaternion))}serialize(){return this.toObject()}deserialize(e){const t=e;t.position&&this.position.deserialize(t.position),t.quaternion&&this.quaternion.deserialize(t.quaternion)}toObject(){return{position:this.position.serialize(),quaternion:this.quaternion.serialize()}}}t.Transform=Transform},8029:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DirectionalLight=t.AmbientLight=void 0;var r=i(3718);Object.defineProperty(t,"AmbientLight",{enumerable:!0,get:function(){return r.AmbientLight}});var n=i(2243);Object.defineProperty(t,"DirectionalLight",{enumerable:!0,get:function(){return n.DirectionalLight}})},3718:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AmbientLight=void 0;const r=i(5232),n=i(293);class AmbientLight extends n.RenderableObject{constructor(){super(...arguments),this.color=4210752,this.intensity=1,this.light=null,this.onAwake=()=>{this.light=new r.AmbientLight(this.color,this.intensity)}}getObject(){return this.light}serialize(){return this.toObject()}deserialize(e){const t=e;this.color=t.color,this.intensity=t.intensity}toObject(){return{color:this.color,intensity:this.intensity}}}t.AmbientLight=AmbientLight},2243:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DirectionalLight=void 0;const r=i(5232),n=i(293);class DirectionalLight extends n.RenderableObject{constructor(){super(...arguments),this.color=16777215,this.intensity=1,this.light=null,this.onAwake=()=>{this.light=new r.DirectionalLight(this.color,this.intensity)}}getObject(){return this.light}serialize(){return this.toObject()}deserialize(e){const t=e;this.color=t.color,this.intensity=t.intensity}toObject(){return{color:this.color,intensity:this.intensity}}}t.DirectionalLight=DirectionalLight},7158:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RotateDirection=t.Mover=t.MoveDirection=void 0;var r=i(1193);Object.defineProperty(t,"MoveDirection",{enumerable:!0,get:function(){return r.MoveDirection}});var n=i(8598);Object.defineProperty(t,"Mover",{enumerable:!0,get:function(){return n.Mover}});var o=i(4505);Object.defineProperty(t,"RotateDirection",{enumerable:!0,get:function(){return o.RotateDirection}})},1193:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MoveDirection=void 0,function(e){e[e.Forward=1]="Forward",e[e.Backward=-1]="Backward",e[e.None=0]="None"}(t.MoveDirection||(t.MoveDirection={}))},8598:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Mover=void 0;const r=i(9542),n=i(293),o=i(7158);class Mover extends n.Component{constructor(){super(...arguments),this.acceleration=20,this.deceleration=2,this.maxSpeed=20,this.rotateSpeed=90,this.jumpForce=20,this.angle=Math.PI/2,this.currentSpeed=0,this.moveDirection=o.MoveDirection.None,this.rotateDirection=o.RotateDirection.None,this.rigidBodyComponent=null,this.onAwake=()=>{this.rigidBodyComponent=this.getComponent(n.RigidBody)},this.onUpdate=()=>{this.move(),this.rotate()}}startMove(e){this.moveDirection=e}stopMove(){this.moveDirection=o.MoveDirection.None}startRotate(e){this.rotateDirection=e}stopRotate(){this.rotateDirection=o.RotateDirection.None}jump(){if(this.rigidBodyComponent){var e=this.rigidBodyComponent.getRigidBody();e&&(e.velocity.y=this.jumpForce)}}move(){if(this.rigidBodyComponent){var e=this.rigidBodyComponent.getRigidBody();e&&(this.moveDirection==o.MoveDirection.Forward?this.currentSpeed=(0,r.clamp)(this.currentSpeed+this.acceleration*n.Time.deltaTime,this.currentSpeed,this.maxSpeed):this.moveDirection==o.MoveDirection.Backward?this.currentSpeed=(0,r.clamp)(this.currentSpeed-this.acceleration*n.Time.deltaTime,-this.maxSpeed,this.currentSpeed):this.currentSpeed>0?this.currentSpeed=(0,r.clamp)(this.currentSpeed-this.deceleration*n.Time.deltaTime,0,this.currentSpeed):this.currentSpeed=(0,r.clamp)(this.currentSpeed+this.deceleration*n.Time.deltaTime,this.currentSpeed,0),e.velocity.x=this.currentSpeed)}}rotate(){this.angle+=this.rotateDirection*Math.PI/180*Math.abs(this.currentSpeed/this.maxSpeed)*this.rotateSpeed*n.Time.deltaTime}serialize(){return this.toObject()}deserialize(e){const t=e;this.acceleration=t.acceleration,this.deceleration=t.deceleration,this.maxSpeed=t.maxSpeed,this.rotateSpeed=t.rotateSpeed,this.jumpForce=t.jumpForce}toObject(){return{acceleration:this.acceleration,deceleration:this.deceleration,maxSpeed:this.maxSpeed,rotateSpeed:this.rotateSpeed,jumpForce:this.jumpForce}}}t.Mover=Mover},4505:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.RotateDirection=void 0,function(e){e[e.Right=1]="Right",e[e.Left=-1]="Left",e[e.None=0]="None"}(t.RotateDirection||(t.RotateDirection={}))},6601:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PrefabInstantiator=t.FollowCameraPrefab=t.FloorPrefab=t.DirectionalLightPrefab=t.BallPrefab=t.AmbientLightPrefab=void 0;var r=i(8264);Object.defineProperty(t,"AmbientLightPrefab",{enumerable:!0,get:function(){return r.AmbientLightPrefab}});var n=i(8744);Object.defineProperty(t,"BallPrefab",{enumerable:!0,get:function(){return n.BallPrefab}});var o=i(4879);Object.defineProperty(t,"DirectionalLightPrefab",{enumerable:!0,get:function(){return o.DirectionalLightPrefab}});var s=i(4483);Object.defineProperty(t,"FloorPrefab",{enumerable:!0,get:function(){return s.FloorPrefab}});var a=i(9648);Object.defineProperty(t,"FollowCameraPrefab",{enumerable:!0,get:function(){return a.FollowCameraPrefab}});var d=i(3261);Object.defineProperty(t,"PrefabInstantiator",{enumerable:!0,get:function(){return d.PrefabInstantiator}})},8264:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.AmbientLightPrefab=void 0;const r=i(293),n=i(8029);class AmbientLightPrefab extends r.GameObject{constructor(){super(...arguments),this.name="AmbientLightPrefab"}addComponents(){this.addComponent(new n.AmbientLight)}}t.AmbientLightPrefab=AmbientLightPrefab},8744:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BallPrefab=void 0;const r=i(293),n=i(2508),o=i(7158);class BallPrefab extends r.GameObject{constructor(){super(...arguments),this.name="BallPrefab"}addComponents(){this.addComponent(new r.SphereMesh),this.addComponent(new r.RigidBody),this.addComponent(new n.PlayerController),this.addComponent(new o.Mover)}}t.BallPrefab=BallPrefab},4879:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DirectionalLightPrefab=void 0;const r=i(293),n=i(8029);class DirectionalLightPrefab extends r.GameObject{constructor(){super(...arguments),this.name="DirectionalLightPrefab"}addComponents(){this.addComponent(new n.DirectionalLight)}}t.DirectionalLightPrefab=DirectionalLightPrefab},4483:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FloorPrefab=void 0;const r=i(293);class FloorPrefab extends r.GameObject{constructor(){super(...arguments),this.name="FloorPrefab"}addComponents(){this.addComponent(new r.BoxMesh),this.addComponent(new r.RigidBody)}}t.FloorPrefab=FloorPrefab},9648:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FollowCameraPrefab=void 0;const r=i(4400),n=i(293);class FollowCameraPrefab extends n.GameObject{constructor(){super(...arguments),this.name="FollowCameraPrefab",this.tag="MainCamera"}addComponents(){this.addComponent(new r.PerspectiveCamera)}}t.FollowCameraPrefab=FollowCameraPrefab},3261:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.PrefabInstantiator=void 0;const r=i(6601),n=i(1265);t.PrefabInstantiator=class PrefabInstantiator{static setupInstance(e){e.setup()}static createInstance(e){var t;switch(e){case"AmbientLightPrefab":t=new r.AmbientLightPrefab;break;case"BallPrefab":t=new r.BallPrefab;break;case"DirectionalLightPrefab":t=new r.DirectionalLightPrefab;break;case"FloorPrefab":t=new r.FloorPrefab;break;case"FollowCameraPrefab":t=new r.FollowCameraPrefab;break;default:return null}return this.setupInstance(t),t}static createInstanceFromJSON(e,t){n.ObjectSerializer.readTextFile(e,(e=>{if(e){var i=null,r=n.ObjectSerializer.deserialize(e);if(r.forEach((e=>{Object.keys(e).forEach((t=>{if("GameObject"==t){const r=e[t];i=r.prefab}}))})),i){var o=this.createInstance(i);null==o||o.deserialize(r),t(o)}else t(null)}else t(null)}))}}},1265:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ObjectSerializer=void 0;var r=i(7128);Object.defineProperty(t,"ObjectSerializer",{enumerable:!0,get:function(){return r.ObjectSerializer}})},7128:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ObjectSerializer=void 0;t.ObjectSerializer=class ObjectSerializer{static serialize(e){return JSON.stringify(e)}static deserialize(e){return JSON.parse(e)}static download(e,t){var i=document.createElement("a");i.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),i.setAttribute("download",e),i.style.display="none",document.body.appendChild(i),i.click(),document.body.removeChild(i)}static readTextFile(e,t){fetch(e,{method:"GET",mode:"no-cors"}).then((function(i){if(200==i.status)return i.text();console.log(e+" doesn't exist!"),t(null)})).then((e=>{e&&t(e)})).catch((function(e){console.log("Error ",e)}))}}},7093:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameWorld=void 0;var r=i(113);Object.defineProperty(t,"GameWorld",{enumerable:!0,get:function(){return r.GameWorld}})},113:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameWorld=void 0;const r=i(3687),n=i(5232),o=i(293),s=i(1265),a=i(3094),d=i(6601);let l=!1,h=!1;t.GameWorld=class GameWorld{constructor(e){this.cameraGameObject=null,this.camera=new n.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e3),this.renderWorld=new n.Scene,this.physicWorld=new r.World({gravity:new r.Vec3(0,-20,0)}),this.renderer=new n.WebGLRenderer,this.lastTime=0,this.instancesLength=0,this.gameObjects=new Array,this.loadedGameObjects=0,this.control=null,this.update=e=>{requestAnimationFrame(this.update),o.Time.deltaTime=(e-this.lastTime)/1e3,this.lastTime=e,this.control&&this.control.update(),this.physicWorld.fixedStep(),this.renderer.render(this.renderWorld,this.camera),l&&(o.GameObject.gameObjects.forEach((e=>{let t=e.serialize();null!=t&&s.ObjectSerializer.download(e.constructor.name+".json",s.ObjectSerializer.serialize(t))})),l=!1),h&&(o.GameObject.gameObjects.forEach((e=>{s.ObjectSerializer.readTextFile("Assets/"+e.constructor.name+".json",(t=>{t&&e.deserialize(s.ObjectSerializer.deserialize(t))}))})),h=!1),o.EventManager.getSystem().notify("Update")},this.camera.position.z=25,this.initRenderWorld(),this.initPhysicWorld(),this.initRenderer(),document.body.appendChild(this.renderer.domElement),e.forEach((e=>{"string"==typeof e?this.addFromJSON(e):this.add(e)})),document.addEventListener("keydown",this.onKeyDown,!1),this.instancesLength=e.length}initRenderWorld(){this.renderWorld.fog=new n.Fog(0,500,1e4);const e=new n.AxesHelper(5);this.renderWorld.add(e)}initPhysicWorld(){this.physicWorld.defaultContactMaterial.restitution=.5}initRenderer(){this.renderer.setSize(window.innerWidth,window.innerHeight),null!=this.renderWorld.fog&&this.renderer.setClearColor(this.renderWorld.fog.color),this.renderer.outputEncoding=n.sRGBEncoding}initEvents(){this.loadedGameObjects<this.instancesLength||(o.EventManager.getSystem().notify("Awake"),o.EventManager.getSystem().notify("Start"),this.control=new a.OrbitControls(this.camera,this.renderer.domElement),this.control.update(),requestAnimationFrame(this.update),this.gameObjects.forEach((e=>{this.draw(e)})))}add(e){d.PrefabInstantiator.setupInstance(e),this.gameObjects.push(e),this.loadedGameObjects++,this.initEvents()}addFromJSON(e){d.PrefabInstantiator.createInstanceFromJSON(e,(e=>{e&&(this.gameObjects.push(e),this.loadedGameObjects++,this.initEvents())}))}draw(e){var t,i;let r=null===(t=e.getComponent(o.RenderableObject))||void 0===t?void 0:t.getObject();r&&this.renderWorld.add(r);let n=null===(i=e.getComponent(o.RigidBody))||void 0===i?void 0:i.getRigidBody();n&&this.physicWorld.addBody(n)}onKeyDown(e){"t"==e.key?l=!0:"l"==e.key&&(h=!0)}}}},i={};function r(e){var n=i[e];if(void 0!==n)return n.exports;var o=i[e]={exports:{}};return t[e].call(o.exports,o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,i,n,o)=>{if(!i){var s=1/0;for(h=0;h<e.length;h++){for(var[i,n,o]=e[h],a=!0,d=0;d<i.length;d++)(!1&o||s>=o)&&Object.keys(r.O).every((e=>r.O[e](i[d])))?i.splice(d--,1):(a=!1,o<s&&(s=o));if(a){e.splice(h--,1);var l=n();void 0!==l&&(t=l)}}return t}o=o||0;for(var h=e.length;h>0&&e[h-1][2]>o;h--)e[h]=e[h-1];e[h]=[i,n,o]},r.d=(e,t)=>{for(var i in t)r.o(t,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,i)=>{var n,o,[s,a,d]=i,l=0;if(s.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(d)var h=d(r)}for(t&&t(i);l<s.length;l++)o=s[l],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(h)},i=self.webpackChunk=self.webpackChunk||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var n=r.O(void 0,[491],(()=>r(6330)));n=r.O(n)})();