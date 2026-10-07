(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`attached`,t=1e3,n=1001,r=1002,i=1003,a=1004,o=1005,s=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,ee=1029,k=1030,te=1031,ne=1033,re=33776,A=33777,ie=33778,j=33779,ae=35840,oe=35841,se=35842,ce=35843,le=36196,ue=37492,de=37496,M=37488,fe=37489,pe=37490,me=37491,he=37808,ge=37809,_e=37810,ve=37811,ye=37812,be=37813,xe=37814,Se=37815,Ce=37816,we=37817,Te=37818,Ee=37819,De=37820,Oe=37821,ke=36492,Ae=36494,je=36495,Me=36283,Ne=36284,Pe=36285,Fe=36286,N=2300,Ie=2301,Le=2302,Re=2303,P=2400,ze=2401,F=2402,Be=3200,Ve=`srgb`,He=`srgb-linear`,Ue=`linear`,We=`srgb`,Ge=7680,Ke=35044,qe=2e3;function Je(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ye(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Xe(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ze(){let e=Xe(`canvas`);return e.style.display=`block`,e}var Qe={};function $e(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function et(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function I(...e){e=et(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function L(...e){e=et(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function tt(...e){let t=e.join(` `);t in Qe||(Qe[t]=!0,I(...e))}function nt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var rt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},it=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},at=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ot=1234567,st=Math.PI/180,ct=180/Math.PI;function lt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(at[e&255]+at[e>>8&255]+at[e>>16&255]+at[e>>24&255]+`-`+at[t&255]+at[t>>8&255]+`-`+at[t>>16&15|64]+at[t>>24&255]+`-`+at[n&63|128]+at[n>>8&255]+`-`+at[n>>16&255]+at[n>>24&255]+at[r&255]+at[r>>8&255]+at[r>>16&255]+at[r>>24&255]).toLowerCase()}function R(e,t,n){return Math.max(t,Math.min(n,e))}function ut(e,t){return(e%t+t)%t}function dt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ft(e,t,n){return e===t?0:(n-e)/(t-e)}function pt(e,t,n){return(1-n)*e+n*t}function mt(e,t,n,r){return pt(e,t,1-Math.exp(-n*r))}function ht(e,t=1){return t-Math.abs(ut(e,t*2)-t)}function gt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function _t(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function vt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function yt(e,t){return e+Math.random()*(t-e)}function bt(e){return e*(.5-Math.random())}function xt(e){e!==void 0&&(ot=e);let t=ot+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function St(e){return e*st}function Ct(e){return e*ct}function wt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Tt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Et(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Dt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:I(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function kt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var At={DEG2RAD:st,RAD2DEG:ct,generateUUID:lt,clamp:R,euclideanModulo:ut,mapLinear:dt,inverseLerp:ft,lerp:pt,damp:mt,pingpong:ht,smoothstep:gt,smootherstep:_t,randInt:vt,randFloat:yt,randFloatSpread:bt,seededRandom:xt,degToRad:St,radToDeg:Ct,isPowerOfTwo:wt,ceilPowerOfTwo:Tt,floorPowerOfTwo:Et,setQuaternionFromProperEuler:Dt,normalize:kt,denormalize:Ot},z=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:I(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(R(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Mt.copy(this).projectOnVector(e),this.sub(Mt)}reflect(e){return this.sub(Mt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Mt=new B,Nt=new jt,Pt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return tt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ft.makeScale(e,t)),this}rotate(e){return tt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ft.makeRotation(-e)),this}translate(e,t){return tt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ft.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ft=new Pt,It=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lt=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rt(){let e={enabled:!0,workingColorSpace:He,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Bt(e.r),e.g=Bt(e.g),e.b=Bt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Vt(e.r),e.g=Vt(e.g),e.b=Vt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ue:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return tt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return tt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[He]:{primaries:t,whitePoint:r,transfer:Ue,toXYZ:It,fromXYZ:Lt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:r,transfer:We,toXYZ:It,fromXYZ:Lt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),e}var zt=Rt();function Bt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Vt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ht,Ut=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ht===void 0&&(Ht=Xe(`canvas`)),Ht.width=e.width,Ht.height=e.height;let t=Ht.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ht}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Xe(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Bt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Bt(t[e]/255)*255):t[e]=Bt(t[e]);return{data:t,width:e.width,height:e.height}}return I(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Wt=0,Gt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Wt++}),this.uuid=lt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Kt(r[t].image)):e.push(Kt(r[t]))}else e=Kt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Kt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Ut.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(I(`Texture: Unable to serialize Texture.`),{})}var qt=0,Jt=new B,Yt=class e extends it{constructor(t=e.DEFAULT_IMAGE,r=e.DEFAULT_MAPPING,i=n,a=n,o=s,c=l,d=T,f=u,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qt++}),this.uuid=lt(),this.name=``,this.source=new Gt(t),this.mipmaps=[],this.mapping=r,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new z(0,0),this.repeat=new z(1,1),this.center=new z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Jt).x}get height(){return this.source.getSize(Jt).y}get depth(){return this.source.getSize(Jt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){I(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case t:e.x-=Math.floor(e.x);break;case n:e.x=e.x<0?0:1;break;case r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case t:e.y-=Math.floor(e.y);break;case n:e.y=e.y<0?0:1;break;case r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null,Yt.DEFAULT_MAPPING=300,Yt.DEFAULT_ANISOTROPY=1;var Xt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this.w=R(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this.w=R(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Zt=class extends it{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:s,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t),this.textures=[];let r=new Yt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:s,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Gt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Qt=class extends Zt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},$t=class extends Yt{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},en=class extends Yt{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},V=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/tn.setFromMatrixColumn(e,0).length(),i=1/tn.setFromMatrixColumn(e,1).length(),a=1/tn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rn,e,an)}lookAt(e,t,n){let r=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),on.crossVectors(n,cn),on.lengthSq()===0&&(Math.abs(n.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),on.crossVectors(n,cn)),on.normalize(),sn.crossVectors(cn,on),r[0]=on.x,r[4]=sn.x,r[8]=cn.x,r[1]=on.y,r[5]=sn.y,r[9]=cn.y,r[2]=on.z,r[6]=sn.z,r[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],k=r[6],te=r[10],ne=r[14],re=r[3],A=r[7],ie=r[11],j=r[15];return i[0]=a*x+o*T+s*ee+c*re,i[4]=a*S+o*E+s*k+c*A,i[8]=a*C+o*D+s*te+c*ie,i[12]=a*w+o*O+s*ne+c*j,i[1]=l*x+u*T+d*ee+f*re,i[5]=l*S+u*E+d*k+f*A,i[9]=l*C+u*D+d*te+f*ie,i[13]=l*w+u*O+d*ne+f*j,i[2]=p*x+m*T+h*ee+g*re,i[6]=p*S+m*E+h*k+g*A,i[10]=p*C+m*D+h*te+g*ie,i[14]=p*w+m*O+h*ne+g*j,i[3]=_*x+v*T+y*ee+b*re,i[7]=_*S+v*E+y*k+b*A,i[11]=_*C+v*D+y*te+b*ie,i[15]=_*w+v*O+y*ne+b*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/ee;return e[0]=(o*O-s*D+c*E)*k,e[1]=(r*D-n*O-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*O-c*w)*k,e[5]=(t*O-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=tn.set(r[0],r[1],r[2]).length(),o=tn.set(r[4],r[5],r[6]).length(),s=tn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),nn.copy(this);let c=1/a,l=1/o,u=1/s;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=l,nn.elements[5]*=l,nn.elements[6]*=l,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,t.setFromRotationMatrix(nn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=qe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},tn=new B,nn=new V,rn=new B(0,0,0),an=new B(1,1,1),on=new B,sn=new B,cn=new B,ln=new V,un=new jt,dn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(R(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-R(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(R(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-R(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(R(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-R(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:I(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ln.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ln,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return un.setFromEuler(this),this.setFromQuaternion(un,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};dn.DEFAULT_ORDER=`XYZ`;var fn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},pn=0,mn=new B,hn=new jt,gn=new V,_n=new B,vn=new B,yn=new B,bn=new jt,xn=new B(1,0,0),Sn=new B(0,1,0),Cn=new B(0,0,1),wn={type:`added`},Tn={type:`removed`},En={type:`childadded`,child:null},Dn={type:`childremoved`,child:null},On=class e extends it{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pn++}),this.uuid=lt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new B,n=new dn,r=new jt,i=new B(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new V},normalMatrix:{value:new Pt}}),this.matrix=new V,this.matrixWorld=new V,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hn.setFromAxisAngle(e,t),this.quaternion.multiply(hn),this}rotateOnWorldAxis(e,t){return hn.setFromAxisAngle(e,t),this.quaternion.premultiply(hn),this}rotateX(e){return this.rotateOnAxis(xn,e)}rotateY(e){return this.rotateOnAxis(Sn,e)}rotateZ(e){return this.rotateOnAxis(Cn,e)}translateOnAxis(e,t){return mn.copy(e).applyQuaternion(this.quaternion),this.position.add(mn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xn,e)}translateY(e){return this.translateOnAxis(Sn,e)}translateZ(e){return this.translateOnAxis(Cn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_n.copy(e):_n.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(vn,_n,this.up):gn.lookAt(_n,vn,this.up),this.quaternion.setFromRotationMatrix(gn),r&&(gn.extractRotation(r.matrixWorld),hn.setFromRotationMatrix(gn),this.quaternion.premultiply(hn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(L(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null):L(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Tn),Dn.child=e,this.dispatchEvent(Dn),Dn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,e,yn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vn,bn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};On.DEFAULT_UP=new B(0,1,0),On.DEFAULT_MATRIX_AUTO_UPDATE=!0,On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=class extends On{constructor(){super(),this.isGroup=!0,this.type=`Group`}},An={type:`move`},jn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(An)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Mn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Pn={h:0,s:0,l:0};function Fn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var H=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ve){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,zt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=zt.workingColorSpace){return this.r=e,this.g=t,this.b=n,zt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=zt.workingColorSpace){if(e=ut(e,1),t=R(t,0,1),n=R(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Fn(i,r,e+1/3),this.g=Fn(i,r,e),this.b=Fn(i,r,e-1/3)}return zt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ve){function n(t){t!==void 0&&parseFloat(t)<1&&I(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:I(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);I(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ve){let n=Mn[e.toLowerCase()];return n===void 0?I(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bt(e.r),this.g=Bt(e.g),this.b=Bt(e.b),this}copyLinearToSRGB(e){return this.r=Vt(e.r),this.g=Vt(e.g),this.b=Vt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ve){return zt.workingToColorSpace(In.copy(this),e),Math.round(R(In.r*255,0,255))*65536+Math.round(R(In.g*255,0,255))*256+Math.round(R(In.b*255,0,255))}getHexString(e=Ve){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=zt.workingColorSpace){zt.workingToColorSpace(In.copy(this),t);let n=In.r,r=In.g,i=In.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=zt.workingColorSpace){return zt.workingToColorSpace(In.copy(this),t),e.r=In.r,e.g=In.g,e.b=In.b,e}getStyle(e=Ve){zt.workingToColorSpace(In.copy(this),e);let t=In.r,n=In.g,r=In.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(Pn);let n=pt(Nn.h,Pn.h,t),r=pt(Nn.s,Pn.s,t),i=pt(Nn.l,Pn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},In=new H;H.NAMES=Mn;var Ln=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new H(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Rn=class extends On{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},zn=new B,Bn=new B,Vn=new B,Hn=new B,Un=new B,Wn=new B,Gn=new B,Kn=new B,qn=new B,Jn=new B,Yn=new Xt,Xn=new Xt,Zn=new Xt,Qn=class e{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),zn.subVectors(e,t),r.cross(zn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){zn.subVectors(r,t),Bn.subVectors(n,t),Vn.subVectors(e,t);let a=zn.dot(zn),o=zn.dot(Bn),s=zn.dot(Vn),c=Bn.dot(Bn),l=Bn.dot(Vn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Hn)!==null&&Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Hn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Hn.x),s.addScaledVector(a,Hn.y),s.addScaledVector(o,Hn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Yn.setScalar(0),Xn.setScalar(0),Zn.setScalar(0),Yn.fromBufferAttribute(e,t),Xn.fromBufferAttribute(e,n),Zn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Yn,i.x),a.addScaledVector(Xn,i.y),a.addScaledVector(Zn,i.z),a}static isFrontFacing(e,t,n,r){return zn.subVectors(n,t),Bn.subVectors(e,t),zn.cross(Bn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),zn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Un.subVectors(r,n),Wn.subVectors(i,n),Kn.subVectors(e,n);let s=Un.dot(Kn),c=Wn.dot(Kn);if(s<=0&&c<=0)return t.copy(n);qn.subVectors(e,r);let l=Un.dot(qn),u=Wn.dot(qn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Un,a);Jn.subVectors(e,i);let f=Un.dot(Jn),p=Wn.dot(Jn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Wn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Gn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Gn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Un,a).addScaledVector(Wn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},$n=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=tr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,tr):tr.fromBufferAttribute(r,t),tr.applyMatrix4(e.matrixWorld),this.expandByPoint(tr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),nr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),nr.copy(e.boundingBox)),nr.applyMatrix4(e.matrixWorld),this.union(nr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,tr),tr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lr),ur.subVectors(this.max,lr),rr.subVectors(e.a,lr),ir.subVectors(e.b,lr),ar.subVectors(e.c,lr),or.subVectors(ir,rr),sr.subVectors(ar,ir),cr.subVectors(rr,ar);let t=[0,-or.z,or.y,0,-sr.z,sr.y,0,-cr.z,cr.y,or.z,0,-or.x,sr.z,0,-sr.x,cr.z,0,-cr.x,-or.y,or.x,0,-sr.y,sr.x,0,-cr.y,cr.x,0];return!pr(t,rr,ir,ar,ur)||(t=[1,0,0,0,1,0,0,0,1],!pr(t,rr,ir,ar,ur))?!1:(dr.crossVectors(or,sr),t=[dr.x,dr.y,dr.z],pr(t,rr,ir,ar,ur))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(er[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),er[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),er[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),er[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),er[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),er[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),er[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),er[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(er),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},er=[new B,new B,new B,new B,new B,new B,new B,new B],tr=new B,nr=new $n,rr=new B,ir=new B,ar=new B,or=new B,sr=new B,cr=new B,lr=new B,ur=new B,dr=new B,fr=new B;function pr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){fr.fromArray(e,a);let o=i.x*Math.abs(fr.x)+i.y*Math.abs(fr.y)+i.z*Math.abs(fr.z),s=t.dot(fr),c=n.dot(fr),l=r.dot(fr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var mr=new B,hr=new z,gr=0,_r=class extends it{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ke,this.updateRanges=[],this.gpuType=g,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXY(t,hr.x,hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix4(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyNormalMatrix(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.transformDirection(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ot(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ot(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ot(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ot(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ot(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),i=kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},vr=class extends _r{constructor(e,t,n){super(new Uint16Array(e),t,n)}},yr=class extends _r{constructor(e,t,n){super(new Uint32Array(e),t,n)}},br=class extends _r{constructor(e,t,n){super(new Float32Array(e),t,n)}},xr=new $n,Sr=new B,Cr=new B,wr=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?xr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);let t=Sr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Sr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Cr)),this.expandByPoint(Sr.copy(e.center).sub(Cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tr=0,Er=new V,Dr=new On,Or=new B,kr=new $n,Ar=new $n,jr=new B,Mr=class e extends it{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tr++}),this.uuid=lt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Je(e)?yr:vr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Pt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Er.makeRotationFromQuaternion(e),this.applyMatrix4(Er),this}rotateX(e){return Er.makeRotationX(e),this.applyMatrix4(Er),this}rotateY(e){return Er.makeRotationY(e),this.applyMatrix4(Er),this}rotateZ(e){return Er.makeRotationZ(e),this.applyMatrix4(Er),this}translate(e,t,n){return Er.makeTranslation(e,t,n),this.applyMatrix4(Er),this}scale(e,t,n){return Er.makeScale(e,t,n),this.applyMatrix4(Er),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new br(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&I(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];kr.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(this.boundingBox.min,kr.min),this.boundingBox.expandByPoint(jr),jr.addVectors(this.boundingBox.max,kr.max),this.boundingBox.expandByPoint(jr)):(this.boundingBox.expandByPoint(kr.min),this.boundingBox.expandByPoint(kr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&L(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(kr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ar.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(kr.min,Ar.min),kr.expandByPoint(jr),jr.addVectors(kr.max,Ar.max),kr.expandByPoint(jr)):(kr.expandByPoint(Ar.min),kr.expandByPoint(Ar.max))}kr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)jr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(jr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)jr.fromBufferAttribute(a,t),o&&(Or.fromBufferAttribute(e,t),jr.add(Or)),r=Math.max(r,n.distanceToSquared(jr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&L(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){L(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new _r(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new B,s[e]=new B;let c=new B,l=new B,u=new B,d=new z,f=new z,p=new z,m=new B,h=new B;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new B,y=new B,b=new B,x=new B;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new _r(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new B,i=new B,a=new B,o=new B,s=new B,c=new B,l=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jr.fromBufferAttribute(e,t),jr.normalize(),e.setXYZ(t,jr.x,jr.y,jr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new _r(a,r,i)}if(this.index===null)return I(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Nr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ke,this.updateRanges=[],this.version=0,this.uuid=lt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=lt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=lt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Pr=new B,Fr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pr.fromBufferAttribute(this,t),Pr.applyMatrix4(e),this.setXYZ(t,Pr.x,Pr.y,Pr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pr.fromBufferAttribute(this,t),Pr.applyNormalMatrix(e),this.setXYZ(t,Pr.x,Pr.y,Pr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pr.fromBufferAttribute(this,t),Pr.transformDirection(e),this.setXYZ(t,Pr.x,Pr.y,Pr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ot(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ot(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ot(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ot(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ot(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),r=kt(r,this.array),i=kt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){$e(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new _r(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){$e(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ir=new B,Lr=new B,Rr=new Pt,zr=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ir.subVectors(n,t).cross(Lr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ir),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Rr.getNormalMatrix(e),r=this.coplanarPoint(Ir).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Br=0,Vr=class extends it{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Br++}),this.uuid=lt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new H(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ge,this.stencilZFail=Ge,this.stencilZPass=Ge,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){I(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new H().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new zr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new z().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new z().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Hr=class extends Vr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new H(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ur,Wr=new B,Gr=new B,Kr=new B,qr=new z,Jr=new z,Yr=new V,Xr=new B,Zr=new B,Qr=new B,$r=new z,ei=new z,ti=new z,ni=class extends On{constructor(e=new Hr){if(super(),this.isSprite=!0,this.type=`Sprite`,Ur===void 0){Ur=new Mr;let e=new Nr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Ur.setIndex([0,1,2,0,2,3]),Ur.setAttribute(`position`,new Fr(e,3,0,!1)),Ur.setAttribute(`uv`,new Fr(e,2,3,!1))}this.geometry=Ur,this.material=e,this.center=new z(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&L(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Gr.setFromMatrixScale(this.matrixWorld),Yr.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Kr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gr.multiplyScalar(-Kr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ri(Xr.set(-.5,-.5,0),Kr,a,Gr,r,i),ri(Zr.set(.5,-.5,0),Kr,a,Gr,r,i),ri(Qr.set(.5,.5,0),Kr,a,Gr,r,i),$r.set(0,0),ei.set(1,0),ti.set(1,1);let o=e.ray.intersectTriangle(Xr,Zr,Qr,!1,Wr);if(o===null&&(ri(Zr.set(-.5,.5,0),Kr,a,Gr,r,i),ei.set(0,1),o=e.ray.intersectTriangle(Xr,Qr,Zr,!1,Wr),o===null))return;let s=e.ray.origin.distanceTo(Wr);s<e.near||s>e.far||t.push({distance:s,point:Wr.clone(),uv:Qn.getInterpolation(Wr,Xr,Zr,Qr,$r,ei,ti,new z),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ri(e,t,n,r,i,a){qr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Jr.copy(qr):(Jr.x=a*qr.x-i*qr.y,Jr.y=i*qr.x+a*qr.y),e.copy(t),e.x+=Jr.x,e.y+=Jr.y,e.applyMatrix4(Yr)}var ii=new B,ai=new B,oi=new B,si=new B,ci=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ai.copy(e).add(t).multiplyScalar(.5),oi.copy(t).sub(e).normalize(),si.copy(this.origin).sub(ai);let i=e.distanceTo(t)*.5,a=-this.direction.dot(oi),o=si.dot(this.direction),s=-si.dot(oi),c=si.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ai).addScaledVector(oi,d),f}intersectSphere(e,t){if(e.radius<0)return null;ii.subVectors(e.center,this.origin);let n=ii.dot(this.direction),r=ii.dot(ii)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,ee,k,te,ne,re;if(y>=b&&y>=x?(w=s,D=u,k=p,re=g,s>=0?(S=c,C=l,T=d,E=f,O=m,ee=h,te=_,ne=v):(S=l,C=c,T=f,E=d,O=h,ee=m,te=v,ne=_)):b>=x?(w=c,D=d,k=m,re=_,c>=0?(S=l,C=s,T=f,E=u,O=h,ee=p,te=v,ne=g):(S=s,C=l,T=u,E=f,O=p,ee=h,te=g,ne=v)):(w=l,D=f,k=h,re=v,l>=0?(S=s,C=c,T=u,E=d,O=p,ee=m,te=g,ne=_):(S=c,C=s,T=d,E=u,O=m,ee=p,te=_,ne=g)),w===0)return null;let A=S/w,ie=C/w,j=1/w,ae=T-A*D,oe=E-ie*D,se=O-A*k,ce=ee-ie*k,le=te-A*re,ue=ne-ie*re,de=le*ce-ue*se,M=ae*ue-oe*le,fe=se*oe-ce*ae;if(r){if(de<0||M<0||fe<0)return null}else if((de<0||M<0||fe<0)&&(de>0||M>0||fe>0))return null;let pe=de+M+fe;if(pe===0)return null;let me=j*(de*D+M*k+fe*re);return(pe>0?me<0:me>0)?null:this.at(me/pe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},li=class extends Vr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new H(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ui=new V,di=new ci,fi=new wr,pi=new B,mi=new B,hi=new B,gi=new B,_i=new B,vi=new B,yi=new B,bi=new B,xi=class extends On{constructor(e=new Mr,t=new li){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){vi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(_i.fromBufferAttribute(s,e),a?vi.addScaledVector(_i,r):vi.addScaledVector(_i.sub(t),r))}t.add(vi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fi.copy(n.boundingSphere),fi.applyMatrix4(i),di.copy(e.ray).recast(e.near),!(fi.containsPoint(di.origin)===!1&&(di.intersectSphere(fi,pi)===null||di.origin.distanceToSquared(pi)>(e.far-e.near)**2))&&(ui.copy(i).invert(),di.copy(e.ray).applyMatrix4(ui),(n.boundingBox===null||di.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ci(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ci(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ci(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ci(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Si(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;bi.copy(s),bi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(bi);return l<n.near||l>n.far?null:{distance:l,point:bi.clone(),object:e}}function Ci(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,mi),e.getVertexPosition(c,hi),e.getVertexPosition(l,gi);let u=Si(e,t,n,r,mi,hi,gi,yi);if(u){let e=new B;Qn.getBarycoord(yi,mi,hi,gi,e),i&&(u.uv=Qn.getInterpolatedAttribute(i,s,c,l,e,new z)),a&&(u.uv1=Qn.getInterpolatedAttribute(a,s,c,l,e,new z)),o&&(u.normal=Qn.getInterpolatedAttribute(o,s,c,l,e,new B),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new B,materialIndex:0};Qn.getNormal(mi,hi,gi,t.normal),u.face=t,u.barycoord=e}return u}var wi=new Xt,Ti=new Xt,Ei=new Xt,Di=new Xt,Oi=new V,ki=new B,Ai=new wr,ji=new V,Mi=new ci,Ni=class extends xi{constructor(t,n){super(t,n),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=e,this.bindMatrix=new V,this.bindMatrixInverse=new V,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $n),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ki),this.boundingBox.expandByPoint(ki)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wr),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,ki),this.boundingSphere.expandByPoint(ki)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ai.copy(this.boundingSphere),Ai.applyMatrix4(r),e.ray.intersectsSphere(Ai)!==!1&&(ji.copy(r).invert(),Mi.copy(e.ray).applyMatrix4(ji),(this.boundingBox===null||Mi.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,Mi)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Xt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():I(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Ti.fromBufferAttribute(r.attributes.skinIndex,e),Ei.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(wi.copy(t),t.set(0,0,0,0)):(wi.set(...t,1),t.set(0,0,0)),wi.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Ei.getComponent(e);if(r!==0){let i=Ti.getComponent(e);Oi.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(Di.copy(wi).applyMatrix4(Oi),r)}}return t.isVector4&&(t.w=wi.w),t.applyMatrix4(this.bindMatrixInverse)}},Pi=class extends On{constructor(){super(),this.isBone=!0,this.type=`Bone`}},Fi=class extends Yt{constructor(e=null,t=1,n=1,r,a,o,s,c,l=i,u=i,d,f){super(null,o,s,c,l,u,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ii=new V,Li=new V,Ri=class e{constructor(e=[],t=[]){this.uuid=lt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){I(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new V)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new V;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:Li;Ii.multiplyMatrices(i,t[r]),Ii.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Fi(t,e,e,T,g);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(I(`Skeleton: No bone found with UUID:`,r),i=new Pi),this.bones.push(i),this.boneInverses.push(new V().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},zi=class extends _r{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Bi=new V,Vi=new V,Hi=[],Ui=new $n,Wi=new V,Gi=new xi,Ki=new wr,qi=class extends xi{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Wi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bi),Ui.copy(e.boundingBox).applyMatrix4(Bi),this.boundingBox.union(Ui)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Bi),Ki.copy(e.boundingSphere).applyMatrix4(Bi),this.boundingSphere.union(Ki)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Gi.geometry=this.geometry,Gi.material=this.material,Gi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ki.copy(this.boundingSphere),Ki.applyMatrix4(n),e.ray.intersectsSphere(Ki)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Bi),Vi.multiplyMatrices(n,Bi),Gi.matrixWorld=Vi,Gi.raycast(e,Hi);for(let e=0,n=Hi.length;e<n;e++){let n=Hi[e];n.instanceId=i,n.object=this,t.push(n)}Hi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new zi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Fi(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ji=new wr,Yi=new z(.5,.5),Xi=new B,Zi=class{constructor(e=new zr,t=new zr,n=new zr,r=new zr,i=new zr,a=new zr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=qe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){return Ji.center.set(0,0,0),Ji.radius=.7071067811865476+Yi.distanceTo(e.center),Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Xi.x=r.normal.x>0?e.max.x:e.min.x,Xi.y=r.normal.y>0?e.max.y:e.min.y,Xi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Qi=class extends Vr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new H(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},$i=new V,ea=new ci,ta=new wr,na=new B,ra=class extends On{constructor(e=new Mr,t=new Qi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ta.copy(n.boundingSphere),ta.applyMatrix4(r),ta.radius+=i,e.ray.intersectsSphere(ta)===!1)return;$i.copy(r).invert(),ea.copy(e.ray).applyMatrix4($i);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);na.fromBufferAttribute(l,n),ia(na,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)na.fromBufferAttribute(l,a),ia(na,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ia(e,t,n,r,i,a,o){let s=ea.distanceSqToPoint(e);if(s<n){let n=new B;ea.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var aa=class extends Yt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},oa=class extends Yt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},sa=class extends Yt{constructor(e,t,n=h,r,a,o,s=i,c=i,l,u=E,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ca=class extends sa{constructor(e,t=h,n=301,r,a,o=i,s=i,c,l=E){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},la=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ua=class e extends Mr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new br(c,3)),this.setAttribute(`normal`,new br(l,3)),this.setAttribute(`uv`,new br(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new B;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},da=class e extends Mr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new B,g=new B;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new br(o,3)),this.setAttribute(`normal`,new br(s,3)),this.setAttribute(`uv`,new br(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},fa=class e extends Mr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new B,l=new z;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new br(a,3)),this.setAttribute(`normal`,new br(o,3)),this.setAttribute(`uv`,new br(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},pa=class e extends Mr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new br(u,3)),this.setAttribute(`normal`,new br(d,3)),this.setAttribute(`uv`,new br(f,2));function _(){let a=new B,_=new B,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new z,m=new B,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ma=class e extends pa{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ha=class e extends Mr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new br(i,3)),this.setAttribute(`normal`,new br(i.slice(),3)),this.setAttribute(`uv`,new br(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new B,r=new B,i=new B;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new B;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new B;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new B,t=new B,n=new B,r=new B,o=new z,s=new z,c=new z;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ga=class e extends ha{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},_a=class e extends Mr{constructor(e=[new z(0,-.5),new z(.5,0),new z(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=R(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new B,d=new z,f=new B,p=new B,m=new B,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new br(a,3)),this.setAttribute(`uv`,new br(o,2)),this.setAttribute(`normal`,new br(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},va=class e extends ha{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ya=class e extends Mr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new br(p,3)),this.setAttribute(`normal`,new br(m,3)),this.setAttribute(`uv`,new br(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ba=class e extends Mr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new B,p=new z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new br(s,3)),this.setAttribute(`normal`,new br(c,3)),this.setAttribute(`uv`,new br(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},xa=class e extends Mr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new B,d=new B,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new br(p,3)),this.setAttribute(`normal`,new br(m,3)),this.setAttribute(`uv`,new br(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Sa=class e extends Mr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new B,f=new B,p=new B;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new br(c,3)),this.setAttribute(`normal`,new br(l,3)),this.setAttribute(`uv`,new br(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},Ca=class e extends Mr{constructor(e=1,t=.4,n=64,r=8,i=2,a=3){super(),this.type=`TorusKnotGeometry`,this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:r,p:i,q:a},n=Math.floor(n),r=Math.floor(r);let o=[],s=[],c=[],l=[],u=new B,d=new B,f=new B,p=new B,m=new B,h=new B,g=new B;for(let o=0;o<=n;++o){let v=o/n*i*Math.PI*2;_(v,i,a,e,f),_(v+.01,i,a,e,p),h.subVectors(p,f),g.addVectors(p,f),m.crossVectors(h,g),g.crossVectors(m,h),m.normalize(),g.normalize();for(let e=0;e<=r;++e){let i=e/r*Math.PI*2,a=-t*Math.cos(i),p=t*Math.sin(i);u.x=f.x+(a*g.x+p*m.x),u.y=f.y+(a*g.y+p*m.y),u.z=f.z+(a*g.z+p*m.z),s.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),l.push(o/n),l.push(e/r)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,s=(r+1)*(e-1)+t;o.push(n,i,s),o.push(i,a,s)}this.setIndex(o),this.setAttribute(`position`,new br(s,3)),this.setAttribute(`normal`,new br(c,3)),this.setAttribute(`uv`,new br(l,2));function _(e,t,n,r,i){let a=Math.cos(e),o=Math.sin(e),s=n/t*e,c=Math.cos(s);i.x=r*(2+c)*.5*a,i.y=r*(2+c)*o*.5,i.z=r*Math.sin(s)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}};function wa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ea(i))i.isRenderTargetTexture?(I(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Ea(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ta(e){let t={};for(let n=0;n<e.length;n++){let r=wa(e[n]);for(let e in r)t[e]=r[e]}return t}function Ea(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Da(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Oa(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:zt.workingColorSpace}var ka={clone:wa,merge:Ta},Aa=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ja=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ma=class extends Vr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Aa,this.fragmentShader=ja,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wa(e.uniforms),this.uniformsGroups=Da(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new H().setHex(r.value);break;case`v2`:this.uniforms[n].value=new z().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Xt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Pt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new V().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Na=class extends Ma{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Pa=class extends Vr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new H(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Fa=class extends Vr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new H(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ia=class extends Vr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Be,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},La=class extends Vr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ra(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function za(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ba=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Va=class extends Ba{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:P,endingEnd:P}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case ze:i=e,o=2*t-n;break;case F:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case ze:a=e,s=2*n-t;break;case F:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ha=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ua=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Wa=class extends Ba{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=qa(n,t,g,y,r);i[p]=Ga(x,o,_,b,m)}return i}};function Ga(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ka(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function qa(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ga(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ka(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Ja=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ra(t,this.TimeBufferType),this.values=Ra(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ra(e.times,Array),values:Ra(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),za(e.settings)&&(n.settings={inTangents:Ra(e.settings.inTangents,Array),outTangents:Ra(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Va(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Wa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case N:t=this.InterpolantFactoryMethodDiscrete;break;case Ie:t=this.InterpolantFactoryMethodLinear;break;case Le:t=this.InterpolantFactoryMethodSmooth;break;case Re:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return I(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return N;case this.InterpolantFactoryMethodLinear:return Ie;case this.InterpolantFactoryMethodSmooth:return Le;case this.InterpolantFactoryMethodBezier:return Re}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;za(this.settings)&&(Ya(this.settings.inTangents,e),Ya(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(L(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(L(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){L(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){L(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ye(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){L(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Le,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,za(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ya(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ja.prototype.ValueTypeName=``,Ja.prototype.TimeBufferType=Float32Array,Ja.prototype.ValueBufferType=Float32Array,Ja.prototype.DefaultInterpolation=Ie;var Xa=class extends Ja{constructor(e,t,n){super(e,t,n)}};Xa.prototype.ValueTypeName=`bool`,Xa.prototype.ValueBufferType=Array,Xa.prototype.DefaultInterpolation=N,Xa.prototype.InterpolantFactoryMethodLinear=void 0,Xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}};Za.prototype.ValueTypeName=`color`;var Qa=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}};Qa.prototype.ValueTypeName=`number`;var $a=class extends Ba{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)jt.slerpFlat(i,0,a,c-o,a,c,s);return i}},eo=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new $a(this.times,this.values,this.getValueSize(),e)}};eo.prototype.ValueTypeName=`quaternion`,eo.prototype.InterpolantFactoryMethodSmooth=void 0;var to=class extends Ja{constructor(e,t,n){super(e,t,n)}};to.prototype.ValueTypeName=`string`,to.prototype.ValueBufferType=Array,to.prototype.DefaultInterpolation=N,to.prototype.InterpolantFactoryMethodLinear=void 0,to.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}};no.prototype.ValueTypeName=`vector`;var ro=class extends On{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new H(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},io=class extends ro{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.groundColor=new H(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ao=new V,oo=new B,so=new B,co=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new z(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new V,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zi,this._frameExtents=new z(1,1),this._viewportCount=1,this._viewports=[new Xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;oo.setFromMatrixPosition(e.matrixWorld),t.position.copy(oo),so.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(so),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ao.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ao,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},lo=new B,uo=new jt,fo=new B,po=class extends On{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new V,this.projectionMatrix=new V,this.projectionMatrixInverse=new V,this.coordinateSystem=qe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(lo,uo,fo),fo.x===1&&fo.y===1&&fo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,uo,fo.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(lo,uo,fo),fo.x===1&&fo.y===1&&fo.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(lo,uo,fo.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},mo=new B,ho=new z,go=new z,_o=class extends po{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ct*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(st*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ct*2*Math.atan(Math.tan(st*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mo.x,mo.y).multiplyScalar(-e/mo.z),mo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mo.x,mo.y).multiplyScalar(-e/mo.z)}getViewSize(e,t){return this.getViewBounds(e,ho,go),t.subVectors(go,ho)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(st*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},vo=class extends co{constructor(){super(new _o(90,1,.5,500)),this.isPointLightShadow=!0}},yo=class extends ro{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new vo}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},bo=class extends po{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},xo=class extends co{constructor(){super(new bo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},So=class extends ro{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.shadow=new xo}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Co=-90,wo=1,To=class extends On{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _o(Co,wo,e,t);r.layers=this.layers,this.add(r);let i=new _o(Co,wo,e,t);i.layers=this.layers,this.add(i);let a=new _o(Co,wo,e,t);a.layers=this.layers,this.add(a);let o=new _o(Co,wo,e,t);o.layers=this.layers,this.add(o);let s=new _o(Co,wo,e,t);s.layers=this.layers,this.add(s);let c=new _o(Co,wo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Eo=class extends _o{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Do=`\\[\\]\\.:\\/`,Oo=RegExp(`[\\[\\]\\.:\\/]`,`g`),ko=`[^\\[\\]\\.:\\/]`,Ao=`[^`+Do.replace(`\\.`,``)+`]`,jo=`((?:WC+[\\/:])*)`.replace(`WC`,ko),Mo=`(WCOD+)?`.replace(`WCOD`,Ao),No=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,ko),Po=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,ko),Fo=RegExp(`^`+jo+Mo+No+Po+`$`),Io=[`material`,`materials`,`bones`,`map`],Lo=class{constructor(e,t,n){let r=n||Ro.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ro=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Oo,``)}static parseTrackName(e){let t=Fo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Io.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){I(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){L(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){L(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){L(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){L(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){L(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;L(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ro.Composite=Lo,Ro.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Ro.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Ro.prototype.GetterByBindingType=[Ro.prototype._getValue_direct,Ro.prototype._getValue_array,Ro.prototype._getValue_arrayElement,Ro.prototype._getValue_toArray],Ro.prototype.SetterByBindingTypeAndVersioning=[[Ro.prototype._setValue_direct,Ro.prototype._setValue_direct_setNeedsUpdate,Ro.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ro.prototype._setValue_array,Ro.prototype._setValue_array_setNeedsUpdate,Ro.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ro.prototype._setValue_arrayElement,Ro.prototype._setValue_arrayElement_setNeedsUpdate,Ro.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ro.prototype._setValue_fromArray,Ro.prototype._setValue_fromArray_setNeedsUpdate,Ro.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zo=new V,Bo=class{constructor(e,t,n=0,r=1/0){this.ray=new ci(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new fn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):L(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return zo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zo),this}intersectObject(e,t=!0,n=[]){return Ho(e,this,n,t),n.sort(Vo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Ho(e[r],this,n,t);return n.sort(Vo),n}};function Vo(e,t){return e.distance-t.distance}function Ho(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Ho(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Uo=new B,Wo=new B,Go=new B,Ko=new B,qo=new B,Jo=new B,Yo=new B,Xo=class{constructor(e=new B,t=new B){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Uo.subVectors(e,this.start),Wo.subVectors(this.end,this.start);let n=Wo.dot(Wo);if(n===0)return 0;let r=Wo.dot(Uo)/n;return t&&(r=R(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=Jo,n=Yo){let r=1e-8*1e-8,i,a,o=this.start,s=e.start,c=this.end,l=e.end;Go.subVectors(c,o),Ko.subVectors(l,s),qo.subVectors(o,s);let u=Go.dot(Go),d=Ko.dot(Ko),f=Ko.dot(qo);if(u<=r&&d<=r)return t.copy(o),n.copy(s),t.sub(n),t.dot(t);if(u<=r)i=0,a=f/d,a=R(a,0,1);else{let e=Go.dot(qo);if(d<=r)a=0,i=R(-e/u,0,1);else{let t=Go.dot(Ko),n=u*d-t*t;i=n===0?0:R((t*f-e*d)/n,0,1),a=(t*i+f)/d,a<0?(a=0,i=R(-e/u,0,1)):a>1&&(a=1,i=R((t-e)/u,0,1))}}return t.copy(o).addScaledVector(Go,i),n.copy(s).addScaledVector(Ko,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function Zo(e,t,n,r){let i=Qo(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case re:case A:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ie:case j:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case oe:case ce:return Math.max(e,16)*Math.max(t,8)/4;case ae:case se:return Math.max(e,8)*Math.max(t,8)/2;case le:case ue:case M:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case de:case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case _e:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Oe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ke:case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Pe:case Fe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Qo(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?I(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function $o(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function es(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ts={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},U={common:{diffuse:{value:new H(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new H(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new H(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new H(16777215)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},ns={basic:{uniforms:Ta([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.fog]),vertexShader:ts.meshbasic_vert,fragmentShader:ts.meshbasic_frag},lambert:{uniforms:Ta([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new H(0)},envMapIntensity:{value:1}}]),vertexShader:ts.meshlambert_vert,fragmentShader:ts.meshlambert_frag},phong:{uniforms:Ta([U.common,U.specularmap,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.fog,U.lights,{emissive:{value:new H(0)},specular:{value:new H(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ts.meshphong_vert,fragmentShader:ts.meshphong_frag},standard:{uniforms:Ta([U.common,U.envmap,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.roughnessmap,U.metalnessmap,U.fog,U.lights,{emissive:{value:new H(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ts.meshphysical_vert,fragmentShader:ts.meshphysical_frag},toon:{uniforms:Ta([U.common,U.aomap,U.lightmap,U.emissivemap,U.bumpmap,U.normalmap,U.displacementmap,U.gradientmap,U.fog,U.lights,{emissive:{value:new H(0)}}]),vertexShader:ts.meshtoon_vert,fragmentShader:ts.meshtoon_frag},matcap:{uniforms:Ta([U.common,U.bumpmap,U.normalmap,U.displacementmap,U.fog,{matcap:{value:null}}]),vertexShader:ts.meshmatcap_vert,fragmentShader:ts.meshmatcap_frag},points:{uniforms:Ta([U.points,U.fog]),vertexShader:ts.points_vert,fragmentShader:ts.points_frag},dashed:{uniforms:Ta([U.common,U.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ts.linedashed_vert,fragmentShader:ts.linedashed_frag},depth:{uniforms:Ta([U.common,U.displacementmap]),vertexShader:ts.depth_vert,fragmentShader:ts.depth_frag},normal:{uniforms:Ta([U.common,U.bumpmap,U.normalmap,U.displacementmap,{opacity:{value:1}}]),vertexShader:ts.meshnormal_vert,fragmentShader:ts.meshnormal_frag},sprite:{uniforms:Ta([U.sprite,U.fog]),vertexShader:ts.sprite_vert,fragmentShader:ts.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ts.background_vert,fragmentShader:ts.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:ts.backgroundCube_vert,fragmentShader:ts.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ts.cube_vert,fragmentShader:ts.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ts.equirect_vert,fragmentShader:ts.equirect_frag},distance:{uniforms:Ta([U.common,U.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ts.distance_vert,fragmentShader:ts.distance_frag},shadow:{uniforms:Ta([U.lights,U.fog,{color:{value:new H(0)},opacity:{value:1}}]),vertexShader:ts.shadow_vert,fragmentShader:ts.shadow_frag}};ns.physical={uniforms:Ta([ns.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new H(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new H(0)},specularColor:{value:new H(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:ts.meshphysical_vert,fragmentShader:ts.meshphysical_frag};var rs={r:0,b:0,g:0},is=new V,as=new Pt;as.set(-1,0,0,0,1,0,0,0,1);function os(e,t,n,r,i,a){let o=new H(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new xi(new ua(1,1,1),new Ma({name:`BackgroundCubeMaterial`,uniforms:wa(ns.backgroundCube.uniforms),vertexShader:ns.backgroundCube.vertexShader,fragmentShader:ns.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(is.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(as),l.material.toneMapped=zt.getTransfer(i.colorSpace)!==We,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new xi(new ya(2,2),new Ma({name:`BackgroundMaterial`,uniforms:wa(ns.background.uniforms),vertexShader:ns.background.vertexShader,fragmentShader:ns.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=zt.getTransfer(i.colorSpace)!==We,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(rs,Oa(e)),n.buffers.color.setClear(rs.r,rs.g,rs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function ss(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function cs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ls(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(I(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&I(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function us(e){let t=this,n=null,r=0,i=!1,a=!1,o=new zr,s=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var ds=4,fs=6,ps=20,ms=256,hs=new bo,gs=new H,_s=null,vs=0,ys=0,bs=!1,xs=new B,Ss=new B,Cs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=xs}=i;_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),ys=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=As(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ks(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_s,vs,ys),this._renderer.xr.enabled=bs,e.scissorTest=!1,Es(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_s=this._renderer.getRenderTarget(),vs=this._renderer.getActiveCubeFace(),ys=this._renderer.getActiveMipmapLevel(),bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:s,minFilter:s,generateMipmaps:!1,type:_,format:T,colorSpace:He,depthBuffer:!1},r=Ts(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ts(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ws(r)),this._blurMaterial=Os(r,e,t),this._ggxMaterial=Ds(r,e,t)}return r}_compileMaterial(e){let t=new xi(new Mr,e);this._renderer.compile(t,hs)}_sceneToCubeUV(e,t,n,r,i){let a=new _o(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(gs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xi(new ua,new li({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(gs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Es(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=As()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ks());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Es(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,hs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-ds?n-d+ds:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Es(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,hs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Es(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,hs)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Es(t,3*l*(r>this._lodMax-ds?r-this._lodMax+ds:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,hs)}};function ws(e){let t=[],n=[],r=e,i=e-ds+1+fs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ss.set(1,r,n):e===1?Ss.set(-n,1,-r):e===2?Ss.set(-n,r,1):e===3?Ss.set(-1,r,-n):e===4?Ss.set(-n,-1,r):Ss.set(n,r,-1),Ss.toArray(l,(e*6+t)*3)}}let u=new Mr;u.setAttribute(`position`,new _r(c,3)),u.setAttribute(`outputDirection`,new _r(l,3)),n.push(new xi(u,null)),r>ds&&r--}return{lodMeshes:n,sizeLods:t}}function Ts(e,t,n){let r=new Qt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Es(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ds(e,t,n){return new Ma({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ms,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Os(e,t,n){return new Ma({name:`SphericalGaussianBlur`,defines:{SAMPLES:ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ks(){return new Ma({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function As(){return new Ma({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function js(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ms=class extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new aa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ua(5,5,5),i=new Ma({name:`CubemapFromEquirect`,uniforms:wa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new xi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=s),new To(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ns(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ms(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Cs(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Cs(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ps(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&tt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Fs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?yr:vr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Is(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ls(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:L(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Rs(e,t,n){let r=new WeakMap,i=new Xt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),_=new $t(h,p,m,u);_.type=g,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new z(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function zs(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Bs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Vs(e,t,n,r,i,a){let o=new Qt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Mr;l.setAttribute(`position`,new br([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new br([0,2,0,0,2,0],2));let u=new Na({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new xi(l,u),f=new bo(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Qt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),c=new Qt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},zt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Bs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Hs=new Yt,Us=new sa(1,1),Ws=new $t,Gs=new en,Ks=new aa,qs=[],Js=[],Ys=new Float32Array(16),Xs=new Float32Array(9),Zs=new Float32Array(4);function Qs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=qs[i];if(a===void 0&&(a=new Float32Array(i),qs[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function $s(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ec(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function tc(e,t){let n=Js[t];n===void 0&&(n=new Int32Array(t),Js[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function nc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2fv(this.addr,t),ec(n,t)}}function ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if($s(n,t))return;e.uniform3fv(this.addr,t),ec(n,t)}}function ac(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4fv(this.addr,t),ec(n,t)}}function oc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Zs.set(r),e.uniformMatrix2fv(this.addr,!1,Zs),ec(n,r)}}function sc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Xs.set(r),e.uniformMatrix3fv(this.addr,!1,Xs),ec(n,r)}}function cc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if($s(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ec(n,t)}else{if($s(n,r))return;Ys.set(r),e.uniformMatrix4fv(this.addr,!1,Ys),ec(n,r)}}function lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2iv(this.addr,t),ec(n,t)}}function dc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($s(n,t))return;e.uniform3iv(this.addr,t),ec(n,t)}}function fc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4iv(this.addr,t),ec(n,t)}}function pc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if($s(n,t))return;e.uniform2uiv(this.addr,t),ec(n,t)}}function hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if($s(n,t))return;e.uniform3uiv(this.addr,t),ec(n,t)}}function gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if($s(n,t))return;e.uniform4uiv(this.addr,t),ec(n,t)}}function _c(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Us.compareFunction=n.isReversedDepthBuffer()?518:515,a=Us):a=Hs,n.setTexture2D(t||a,i)}function vc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Gs,i)}function yc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ks,i)}function bc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Ws,i)}function xc(e){switch(e){case 5126:return nc;case 35664:return rc;case 35665:return ic;case 35666:return ac;case 35674:return oc;case 35675:return sc;case 35676:return cc;case 5124:case 35670:return lc;case 35667:case 35671:return uc;case 35668:case 35672:return dc;case 35669:case 35673:return fc;case 5125:return pc;case 36294:return mc;case 36295:return hc;case 36296:return gc;case 35678:case 36198:case 36298:case 36306:case 35682:return _c;case 35679:case 36299:case 36307:return vc;case 35680:case 36300:case 36308:case 36293:return yc;case 36289:case 36303:case 36311:case 36292:return bc}}function Sc(e,t){e.uniform1fv(this.addr,t)}function Cc(e,t){let n=Qs(t,this.size,2);e.uniform2fv(this.addr,n)}function wc(e,t){let n=Qs(t,this.size,3);e.uniform3fv(this.addr,n)}function Tc(e,t){let n=Qs(t,this.size,4);e.uniform4fv(this.addr,n)}function Ec(e,t){let n=Qs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Dc(e,t){let n=Qs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Oc(e,t){let n=Qs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function kc(e,t){e.uniform1iv(this.addr,t)}function Ac(e,t){e.uniform2iv(this.addr,t)}function jc(e,t){e.uniform3iv(this.addr,t)}function Mc(e,t){e.uniform4iv(this.addr,t)}function Nc(e,t){e.uniform1uiv(this.addr,t)}function Pc(e,t){e.uniform2uiv(this.addr,t)}function Fc(e,t){e.uniform3uiv(this.addr,t)}function Ic(e,t){e.uniform4uiv(this.addr,t)}function Lc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Us:Hs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Rc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Gs,a[e])}function zc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ks,a[e])}function Bc(e,t,n){let r=this.cache,i=t.length,a=tc(n,i);$s(r,a)||(e.uniform1iv(this.addr,a),ec(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Ws,a[e])}function Vc(e){switch(e){case 5126:return Sc;case 35664:return Cc;case 35665:return wc;case 35666:return Tc;case 35674:return Ec;case 35675:return Dc;case 35676:return Oc;case 5124:case 35670:return kc;case 35667:case 35671:return Ac;case 35668:case 35672:return jc;case 35669:case 35673:return Mc;case 5125:return Nc;case 36294:return Pc;case 36295:return Fc;case 36296:return Ic;case 35678:case 36198:case 36298:case 36306:case 35682:return Lc;case 35679:case 36299:case 36307:return Rc;case 35680:case 36300:case 36308:case 36293:return zc;case 36289:case 36303:case 36311:case 36292:return Bc}}var Hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=xc(t.type)}},Uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vc(t.type)}},Wc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Gc=/(\w+)(\])?(\[|\.)?/g;function Kc(e,t){e.seq.push(t),e.map[t.id]=t}function qc(e,t,n){let r=e.name,i=r.length;for(Gc.lastIndex=0;;){let a=Gc.exec(r),o=Gc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Kc(n,l===void 0?new Hc(s,e,t):new Uc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Wc(s),Kc(n,e)),n=e}}}var Jc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);qc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Yc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Xc=37297,Zc=0;function Qc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var $c=new Pt;function el(e){zt._getMatrix($c,zt.workingColorSpace,e);let t=`mat3( ${$c.elements.map(e=>e.toFixed(4))} )`;switch(zt.getTransfer(e)){case Ue:return[t,`LinearTransferOETF`];case We:return[t,`sRGBTransferOETF`];default:return I(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function tl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Qc(e.getShaderSource(t),r)}return i}function nl(e,t){let n=el(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var rl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function il(e,t){let n=rl[t];return n===void 0?(I(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var al=new B;function ol(){return zt.getLuminanceCoefficients(al),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${al.x.toFixed(4)}, ${al.y.toFixed(4)}, ${al.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function sl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ul).join(`
`)}function cl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ll(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ul(e){return e!==``}function dl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var pl=/^[ \t]*#include +<([\w\d./]+)>/gm;function ml(e){return e.replace(pl,gl)}var hl=new Map;function gl(e,t){let n=ts[t];if(n===void 0){let e=hl.get(t);if(e!==void 0)n=ts[e],I(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ml(n)}var _l=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vl(e){return e.replace(_l,yl)}function yl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function bl(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var xl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Sl(e){return xl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Cl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function wl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Cl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Tl={302:`ENVMAP_MODE_REFRACTION`};function El(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Tl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Dl={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Ol(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Dl[e.combine]||`ENVMAP_BLENDING_NONE`}function kl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Al(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Sl(n),l=wl(n),u=El(n),d=Ol(n),f=kl(n),p=sl(n),m=cl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ul).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ul).join(`
`),_.length>0&&(_+=`
`)):(g=[bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ul).join(`
`),_=[bl(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ts.tonemapping_pars_fragment,n.toneMapping===0?``:il(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ts.colorspace_pars_fragment,nl(`linearToOutputTexel`,n.outputColorSpace),ol(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ul).join(`
`)),o=ml(o),o=dl(o,n),o=fl(o,n),s=ml(s),s=dl(s,n),s=fl(s,n),o=vl(o),s=vl(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Yc(i,i.VERTEX_SHADER,y),S=Yc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=tl(i,x,`vertex`),n=tl(i,S,`fragment`);L(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):I(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Jc(i,h),T=ll(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Xc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Zc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var jl=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Nl(e),t.set(e,n)),n}},Nl=class{constructor(e){this.id=jl++,this.code=e,this.usedTimes=0}};function Pl(e){return e===1030||e===37490||e===36285}function Fl(e,t,n,r,i,a){let o=new fn,s=new Ml,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&I(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(C){let e=ns[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,k=t.id}let te=e.getRenderTarget(),ne=e.state.buffers.depth.getReversed(),re=h.isInstancedMesh===!0,A=h.isBatchedMesh===!0,ie=!!i.map,j=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap&&i.wireframe===!1,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,M=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,me=i.clearcoat>0,he=i.dispersion>0,ge=i.retroreflectivity>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=pe&&!!i.anisotropyMap,xe=me&&!!i.clearcoatMap,Se=me&&!!i.clearcoatNormalMap,Ce=me&&!!i.clearcoatRoughnessMap,we=_e&&!!i.iridescenceMap,Te=_e&&!!i.iridescenceThicknessMap,Ee=ve&&!!i.sheenColorMap,De=ve&&!!i.sheenRoughnessMap,Oe=!!i.specularMap,ke=!!i.specularColorMap,Ae=!!i.specularIntensityMap,je=ye&&!!i.transmissionMap,Me=ye&&!!i.thicknessMap,Ne=!!i.gradientMap,Pe=!!i.alphaMap,Fe=i.alphaTest>0,N=!!i.alphaHash,Ie=!!i.extensions,Le=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Le=e.toneMapping);let Re={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:A,batchingColor:A&&h._colorsTexture!==null,instancing:re,instancingColor:re&&h.instanceColor!==null,instancingMorph:re&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:zt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ie,matcap:j,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&Pl(i.normalMap.format),metalnessMap:M,roughnessMap:fe,anisotropy:pe,anisotropyMap:be,clearcoat:me,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:he,retroreflection:ge,iridescence:_e,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:ve,sheenColorMap:Ee,sheenRoughnessMap:De,specularMap:Oe,specularColorMap:ke,specularIntensityMap:Ae,transmission:ye,transmissionMap:je,thicknessMap:Me,gradientMap:Ne,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Pe,alphaTest:Fe,alphaHash:N,combine:i.combine,mapUv:ie&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:M&&m(i.metalnessMap.channel),roughnessMapUv:fe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:De&&m(i.sheenRoughnessMap.channel),specularMapUv:Oe&&m(i.specularMap.channel),specularColorMapUv:ke&&m(i.specularColorMap.channel),specularIntensityMapUv:Ae&&m(i.specularIntensityMap.channel),transmissionMapUv:je&&m(i.transmissionMap.channel),thicknessMapUv:Me&&m(i.thicknessMap.channel),alphaMapUv:Pe&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||pe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ie||Pe),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Le,decodeVideoTexture:ie&&i.map.isVideoTexture===!0&&zt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&zt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ie&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ie&&i.extensions.multiDraw===!0||A)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ns[t];n=ka.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Al(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Il(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Ll(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Rl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function zl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Ll),r.length>1&&r.sort(t||Rl),i.length>1&&i.sort(t||Rl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Bl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new zl,e.set(t,[i])):n>=r.length?(i=new zl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Vl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new B,color:new H};break;case`SpotLight`:n={position:new B,direction:new B,color:new H,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new B,color:new H,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new B,skyColor:new H,groundColor:new H};break;case`RectAreaLight`:n={color:new H,position:new B,halfWidth:new B,halfHeight:new B}}return e[t.id]=n,n}}}function Hl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ul=0;function Wl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Gl(e){let t=new Vl,n=Hl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new B);let i=new B,a=new V,o=new V;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Wl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=U.LTC_FLOAT_1,r.rectAreaLTC2=U.LTC_FLOAT_2):(r.rectAreaLTC1=U.LTC_HALF_1,r.rectAreaLTC2=U.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ul++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Kl(e){let t=new Gl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ql(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Kl(e),t.set(n,[a])):r>=i.length?(a=new Kl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Jl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Xl=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],Zl=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Ql=new V,$l=new B,eu=new B;function tu(e,t,n){let r=new Zi,a=new z,o=new z,c=new Xt,l=new Ia,u=new La,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Ma({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new z},radius:{value:4}},vertexShader:Jl,fragmentShader:Yl}),v=m.clone();v.defines.HORIZONTAL_PASS=1;let y=new Mr;y.setAttribute(`position`,new _r(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new xi(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(I(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){I(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/y.x),a.x=o.x*y.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/y.y),a.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){I(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Qt(a.x,a.y,{format:k,type:_,minFilter:s,magFilter:s,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new sa(a.x,a.y,g),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=E,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i}else d.isPointLight?(p.map=new Ms(a.x),p.map.depthTexture=new ca(a.x,h)):(p.map=new Qt(a.x,a.y),p.map.depthTexture=new sa(a.x,a.y,h)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=E,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),$l.setFromMatrixPosition(d.matrixWorld),e.position.copy($l),eu.copy(e.position),eu.add(Xl[t]),e.up.copy(Zl[t]),e.lookAt(eu),e.updateMatrixWorld(),n.makeTranslation(-$l.x,-$l.y,-$l.z),Ql.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Ql,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(c)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Qt(a.x,a.y,{format:k,type:_}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function nu(e,t){function n(){let t=!1,n=new Xt,r=null,i=new Xt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?M(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=rt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?M(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,A=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(A=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),re=A>=2):(A=parseFloat(/^WebGL (\d)/.exec(ie)[1]),re=A>=1);let j=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Xt().fromArray(oe),le=new Xt().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),M(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),M(e.CULL_FACE),ve(0);function M(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(fe(e.BLEND),g=!1);return}if(g===!1&&(M(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:L(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:L(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:L(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:L(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ge[n],ge[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ye(t,n){t.side===2?fe(e.CULL_FACE):M(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?M(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?fe(e.CULL_FACE):(M(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Se(t){t!==ee&&(re&&e.lineWidth(t),ee=t)}function Ce(t,n,r){t?(M(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function we(t){t?M(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function Te(t){t===void 0&&(t=e.TEXTURE0+ne-1),j!==t&&(e.activeTexture(t),j=t)}function Ee(t,n,r){r===void 0&&(r=j===null?e.TEXTURE0+ne-1:j);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(j!==r&&(e.activeTexture(r),j=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function De(){let t=ae[j];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function ke(){try{e.compressedTexImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ae(){try{e.texSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function je(){try{e.texSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Pe(){try{e.texStorage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Fe(){try{e.texStorage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function N(){try{e.texImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ie(){try{e.texImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Le(t){return d[t]===void 0?e.getParameter(t):d[t]}function Re(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function P(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function ze(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function F(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},j=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:M,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:we,activeTexture:Te,bindTexture:Ee,unbindTexture:De,compressedTexImage2D:Oe,compressedTexImage3D:ke,texImage2D:N,texImage3D:Ie,pixelStorei:Re,getParameter:Le,updateUBOMapping:F,uniformBlockBinding:Be,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ne,scissor:P,viewport:ze,reset:Ve}}function ru(e,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new z,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Xe(`canvas`)}function T(e,t,n){let r=1,i=Le(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),I(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&I(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function O(t){e.generateMipmap(t)}function ee(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(t,n,r,i,a,o=!1){if(t!==null){if(e[t]!==void 0)return e[t];I(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+t+`'`)}let s;i&&(s=u.get(`EXT_texture_norm16`),s||I(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=n;if(n===e.RED&&(r===e.FLOAT&&(c=e.R32F),r===e.HALF_FLOAT&&(c=e.R16F),r===e.UNSIGNED_BYTE&&(c=e.R8),r===e.UNSIGNED_SHORT&&s&&(c=s.R16_EXT),r===e.SHORT&&s&&(c=s.R16_SNORM_EXT)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.R8UI),r===e.UNSIGNED_SHORT&&(c=e.R16UI),r===e.UNSIGNED_INT&&(c=e.R32UI),r===e.BYTE&&(c=e.R8I),r===e.SHORT&&(c=e.R16I),r===e.INT&&(c=e.R32I)),n===e.RG&&(r===e.FLOAT&&(c=e.RG32F),r===e.HALF_FLOAT&&(c=e.RG16F),r===e.UNSIGNED_BYTE&&(c=e.RG8),r===e.UNSIGNED_SHORT&&s&&(c=s.RG16_EXT),r===e.SHORT&&s&&(c=s.RG16_SNORM_EXT)),n===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RG8UI),r===e.UNSIGNED_SHORT&&(c=e.RG16UI),r===e.UNSIGNED_INT&&(c=e.RG32UI),r===e.BYTE&&(c=e.RG8I),r===e.SHORT&&(c=e.RG16I),r===e.INT&&(c=e.RG32I)),n===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGB8UI),r===e.UNSIGNED_SHORT&&(c=e.RGB16UI),r===e.UNSIGNED_INT&&(c=e.RGB32UI),r===e.BYTE&&(c=e.RGB8I),r===e.SHORT&&(c=e.RGB16I),r===e.INT&&(c=e.RGB32I)),n===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),r===e.UNSIGNED_INT&&(c=e.RGBA32UI),r===e.BYTE&&(c=e.RGBA8I),r===e.SHORT&&(c=e.RGBA16I),r===e.INT&&(c=e.RGBA32I)),n===e.RGB&&(r===e.UNSIGNED_SHORT&&s&&(c=s.RGB16_EXT),r===e.SHORT&&s&&(c=s.RGB16_SNORM_EXT),r===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),n===e.RGBA){let t=o?Ue:zt.getTransfer(a);r===e.FLOAT&&(c=e.RGBA32F),r===e.HALF_FLOAT&&(c=e.RGBA16F),r===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT&&s&&(c=s.RGBA16_EXT),r===e.SHORT&&s&&(c=s.RGBA16_SNORM_EXT),r===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&u.get(`EXT_color_buffer_float`),c}function te(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,I(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ne(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function re(e){let t=e.target;t.removeEventListener(`dispose`,re),ie(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),ae(t)}function ie(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&j(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function j(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function ae(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let oe=0;function se(){oe=0}function ce(){return oe}function le(e){oe=e}function ue(){let e=oe;return e>=p.maxTextures&&I(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),oe+=1,e}function de(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function M(t,n){let r=f.get(t);if(t.isVideoTexture&&N(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)I(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)I(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Se(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){Se(r,t,n);return}t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function pe(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){Se(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function me(t,n){let r=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version){Ce(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let he={[t]:e.REPEAT,[n]:e.CLAMP_TO_EDGE,[r]:e.MIRRORED_REPEAT},ge={[i]:e.NEAREST,[a]:e.NEAREST_MIPMAP_NEAREST,[o]:e.NEAREST_MIPMAP_LINEAR,[s]:e.LINEAR,[c]:e.LINEAR_MIPMAP_NEAREST,[l]:e.LINEAR_MIPMAP_LINEAR},_e={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ve(t,n){if(n.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(n.magFilter===1006||n.magFilter===1007||n.magFilter===1005||n.magFilter===1008||n.minFilter===1006||n.minFilter===1007||n.minFilter===1005||n.minFilter===1008)&&I(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(t,e.TEXTURE_WRAP_S,he[n.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,he[n.wrapT]),(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)&&e.texParameteri(t,e.TEXTURE_WRAP_R,he[n.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,ge[n.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,ge[n.minFilter]),n.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,_e[n.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(n.magFilter===1003||n.minFilter!==1005&&n.minFilter!==1008||n.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(n.anisotropy>1||f.get(n).__currentAnisotropy){let r=u.get(`EXT_texture_filter_anisotropic`);e.texParameterf(t,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,p.getMaxAnisotropy())),f.get(n).__currentAnisotropy=n.anisotropy}}}function ye(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,re));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=de(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&j(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function be(e,t,n){return Math.floor(Math.floor(e/n)/t)}function xe(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=be(r.start,n.width,4),c=be(t.start,n.width,4);r.start<=i+1&&s===c&&be(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function Se(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=ye(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=zt.getPrimaries(zt.workingColorSpace),r=n.colorSpace===``?null:zt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=Ie(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=k(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);ve(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=ne(n,t);if(n.isDepthTexture)u=te(n.format===D,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&xe(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=Zo(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=Zo(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Le(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Le(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&O(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Ce(t,n,r){if(n.image.length!==6)return;let i=ye(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=zt.getPrimaries(zt.workingColorSpace),s=n.colorSpace===``?null:zt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=Ie(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=k(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=ne(n,h);ve(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Le(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&O(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function we(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=k(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Fe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Pe(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=te(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Fe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Fe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pe(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pe(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ee(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,re)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),ve(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else M(n.depthTexture,0);let o=a.__webglTexture,s=Pe(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Fe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Fe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function De(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)Ee(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Ee(n.__webglFramebuffer[0],t,0):Ee(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),Te(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),Te(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function Oe(t,n,r){let i=f.get(t);n!==void 0&&we(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&De(t)}function ke(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,A);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Fe(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=k(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Pe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),Te(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ve(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)we(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else we(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&O(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),ve(s,i),we(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&O(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ve(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)we(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else we(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&O(a),d.unbindTexture()}t.depthBuffer&&De(t)}function Ae(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let je=[],Me=[];function Ne(t){if(t.samples>0){if(Fe(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(je.length=0,Me.length=0,je.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(je.push(o),Me.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Me)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Pe(e){return Math.min(p.maxSamples,e.samples)}function Fe(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function N(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Ie(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(zt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&I(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):L(`WebGLTextures: Unsupported texture color space:`,n)),t}function Le(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ue,this.resetTextureUnits=se,this.getTextureUnits=ce,this.setTextureUnits=le,this.setTexture2D=M,this.setTexture2DArray=fe,this.setTexture3D=pe,this.setTextureCube=me,this.rebindTextures=Oe,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function iu(e,t){function n(n,r=``){let i,a=zt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var au=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ou=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,su=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new la(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ma({vertexShader:au,fragmentShader:ou,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xi(new ya(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cu=class extends it{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,_=new su,v={},y=t.getContextAttributes(),x=null,S=null,C=[],w=[],O=new z,ee=null,k=null,te=new _o;te.viewport=new Xt;let ne=new _o;ne.viewport=new Xt;let re=[te,ne],A=new Eo,ie=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new jn,C[e]=t),t.getHandSpace()};function ae(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function oe(){r.removeEventListener(`select`,ae),r.removeEventListener(`selectstart`,ae),r.removeEventListener(`selectend`,ae),r.removeEventListener(`squeeze`,ae),r.removeEventListener(`squeezestart`,ae),r.removeEventListener(`squeezeend`,ae),r.removeEventListener(`end`,oe),r.removeEventListener(`inputsourceschange`,se);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}ie=null,j=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,me.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(O.width,O.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ae),r.addEventListener(`selectstart`,ae),r.addEventListener(`selectend`,ae),r.addEventListener(`squeeze`,ae),r.addEventListener(`squeezestart`,ae),r.addEventListener(`squeezeend`,ae),r.addEventListener(`end`,oe),r.addEventListener(`inputsourceschange`,se),y.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?D:E,a=y.stencil?b:h);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Qt(f.textureWidth,f.textureHeight,{format:T,type:u,depthTexture:new sa(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Qt(p.framebufferWidth,p.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function se(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ce=new B,le=new B;function ue(e,t,n){ce.setFromMatrixPosition(t.matrixWorld),le.setFromMatrixPosition(n.matrixWorld);let r=ce.distanceTo(le),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function de(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),A.near=ne.near=te.near=t,A.far=ne.far=te.far=n,(ie!==A.near||j!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),ie=A.near,j=A.far),A.layers.mask=e.layers.mask|6,te.layers.mask=A.layers.mask&-5,ne.layers.mask=A.layers.mask&-3;let i=e.parent,a=A.cameras;de(A,i);for(let e=0;e<a.length;e++)de(a[e],i);a.length===2?ue(A,te,ne):A.projectionMatrix.copy(te.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),M(e,A,i)};function M(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ct*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(e){return v[e]};let fe=null;function pe(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==A.cameras.length&&(A.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=re[n];o===void 0&&(o=new _o,o.layers.enable(n),o.viewport=new Xt,re[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),i===!0&&A.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new la,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}fe&&fe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let me=new $o;me.setAnimationLoop(pe),this.setAnimationLoop=function(e){fe=e},this.dispose=function(){}}},lu=new V,uu=new Pt;uu.set(-1,0,0,0,1,0,0,0,1);function du(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Oa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(lu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(uu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function fu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return L(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?I(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):I(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var pu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),mu=null;function hu(){return mu===null&&(mu=new Fi(pu,16,16,k,_),mu.name=`DFG_LUT`,mu.minFilter=s,mu.magFilter=s,mu.wrapS=n,mu.wrapT=n,mu.generateMipmaps=!1,mu.needsUpdate=!0),mu}var gu=class{constructor(e={}){let{canvas:t=Ze(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:g=u}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=g,C=new Set([ne,te,ee]),w=new Set([u,h,p,b,v,y]),T=new Uint32Array(4),E=new Int32Array(4),D=new B,O=null,k=null,re=[],A=[],ie=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,ae=!1,oe=null,se=null,ce=null,le=null;this._outputColorSpace=Ve;let ue=0,de=0,M=null,fe=-1,pe=null,me=new Xt,he=new Xt,ge=null,_e=new H(0),ve=0,ye=t.width,be=t.height,xe=1,Se=null,Ce=null,we=new Xt(0,0,ye,be),Te=new Xt(0,0,ye,be),Ee=!1,De=new Zi,Oe=!1,ke=!1,Ae=new V,je=new B,Me=new Xt,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Pe=!1;function Fe(){return M===null?xe:1}let N=n;function Ie(e,n){return t.getContext(e,n)}let Le,Re,P,ze,F,Be,He,Ue,We,Ge,Ke,Je,Ye,Xe,Qe,et,tt,rt,it,at,ot,st,ct;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,ft,!1),N===null){let t=`webgl2`;if(N=Ie(t,e),N===null)throw Ie(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}lt()}catch(e){throw t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),L(`WebGLRenderer: `+e.message),e}function lt(){Le=new Ps(N),Le.init(),ot=new iu(N,Le),Re=new ls(N,Le,e,ot),P=new nu(N,Le),Re.reversedDepthBuffer&&m&&P.buffers.depth.setReversed(!0),se=N.createFramebuffer(),ce=N.createFramebuffer(),le=N.createFramebuffer(),ze=new Ls(N),F=new Il,Be=new ru(N,Le,P,F,Re,ot,ze),He=new Ns(j),Ue=new es(N),st=new ss(N,Ue),We=new Fs(N,Ue,ze,st),Ge=new zs(N,We,Ue,st,ze),rt=new Rs(N,Re,Be),Qe=new us(F),Ke=new Fl(j,He,Le,Re,st,Qe),Je=new du(j,F),Ye=new Bl,Xe=new ql(Le),tt=new os(j,He,P,Ge,x,s),et=new tu(j,Ge,Re),ct=new fu(N,ze,Re,P),it=new cs(N,Le,ze),at=new Is(N,Le,ze),ze.programs=Ke.programs,j.capabilities=Re,j.extensions=Le,j.properties=F,j.renderLists=Ye,j.shadowMap=et,j.state=P,j.info=ze}S!==1009&&(ie=new Vs(S,t.width,t.height,o,r,i));let R=new cu(j,N);this.xr=R,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=Le.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Le.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return xe},this.setPixelRatio=function(e){e!==void 0&&(xe=e,this.setSize(ye,be,!1))},this.getSize=function(e){return e.set(ye,be)},this.setSize=function(e,n,r=!0){if(R.isPresenting){I(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ye=e,be=n,t.width=Math.floor(e*xe),t.height=Math.floor(n*xe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ie!==null&&ie.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ye*xe,be*xe).floor()},this.setDrawingBufferSize=function(e,n,r){ye=e,be=n,xe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){L(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){I(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ie.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(me)},this.getViewport=function(e){return e.copy(we)},this.setViewport=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),P.viewport(me.copy(we).multiplyScalar(xe).round())},this.getScissor=function(e){return e.copy(Te)},this.setScissor=function(e,t,n,r){e.isVector4?Te.set(e.x,e.y,e.z,e.w):Te.set(e,t,n,r),P.scissor(he.copy(Te).multiplyScalar(xe).round())},this.getScissorTest=function(){return Ee},this.setScissorTest=function(e){P.setScissorTest(Ee=e)},this.setOpaqueSort=function(e){Se=e},this.setTransparentSort=function(e){Ce=e},this.getClearColor=function(e){return e.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=C.has(t)}if(e){let e=M.texture.type,t=w.has(e),n=tt.getClearColor(),r=tt.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,N.clearBufferuiv(N.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,N.clearBufferiv(N.COLOR,0,E))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),oe=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),tt.dispose(),Ye.dispose(),Xe.dispose(),F.dispose(),He.dispose(),Ge.dispose(),st.dispose(),ct.dispose(),Ke.dispose(),R.dispose(),R.removeEventListener(`sessionstart`,yt),R.removeEventListener(`sessionend`,bt),xt.stop()};function ut(e){e.preventDefault(),$e(`WebGLRenderer: Context Lost.`),ae=!0}function dt(){$e(`WebGLRenderer: Context Restored.`),ae=!1;let e=ze.autoReset,t=et.enabled,n=et.autoUpdate,r=et.needsUpdate,i=et.type;lt(),ze.autoReset=e,et.enabled=t,et.autoUpdate=n,et.needsUpdate=r,et.type=i}function ft(e){L(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function pt(e){let t=e.target;t.removeEventListener(`dispose`,pt),mt(t)}function mt(e){ht(e),F.remove(e)}function ht(e){let t=F.get(e).programs;t!==void 0&&(t.forEach(function(e){Ke.releaseProgram(e)}),e.isShaderMaterial&&Ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ne);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=z(e,t,n,r,i);P.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=We.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;st.setup(i,r,s,n,c);let h,g=it;if(c!==null&&(h=Ue.get(c),g=at,g.setIndex(h)),i.isMesh)r.wireframe===!0?(P.setLineWidth(r.wireframeLinewidth*Fe()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),P.setLineWidth(e*Fe()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh){if(Le.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ue.get(c).bytesPerElement:1,o=F.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(N,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function gt(e,t,n,r){oe!==null&&e.isNodeMaterial&&oe.setObject(r,e),Oe===!0&&Qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Dt(e,t,r),e.side=0,e.needsUpdate=!0,Dt(e,t,r),e.side=2):Dt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),oe!==null&&oe.renderStart(e,t,n),k=Xe.get(n),k.init(t),A.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),oe!==null&&oe.updateLights(k.state.lightsArray),ke=this.localClippingEnabled,Oe=Qe.init(this.clippingPlanes,ke),Oe===!0&&Qe.setGlobalState(this.clippingPlanes,t),oe!==null&&et.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];gt(o,n,t,e),r.add(o)}else gt(i,n,t,e),r.add(i)}}),k=A.pop(),oe!==null&&oe.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=F.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Le.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){xt.stop()}function bt(){xt.start()}let xt=new $o;xt.setAnimationLoop(vt),typeof self<`u`&&xt.setContext(self),this.setAnimationLoop=function(e){_t=e,R.setAnimationLoop(e),e===null?xt.stop():xt.start()},R.addEventListener(`sessionstart`,yt),R.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){L(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ae===!0)return;oe!==null&&oe.renderStart(e,t);let n=R.enabled===!0&&R.isPresenting===!0,r=ie!==null&&(M===null||n)&&ie.begin(j,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(ie===null||ie.isCompositing()===!1)&&(R.cameraAutoUpdate===!0&&R.updateCamera(t),t=R.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,M),k=Xe.get(e,A.length),k.init(t),k.state.textureUnits=Be.getTextureUnits(),A.push(k),Ae.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),De.setFromProjectionMatrix(Ae,qe,t.reversedDepth),ke=this.localClippingEnabled,Oe=Qe.init(this.clippingPlanes,ke),O=Ye.get(e,re.length),O.init(),re.push(O),R.enabled===!0&&R.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&St(e,t,-1/0,j.sortObjects)}St(e,t,0,j.sortObjects),O.finish(),oe!==null&&oe.updateLights(k.state.lightsArray),j.sortObjects===!0&&O.sort(Se,Ce),Pe=R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1,Pe&&tt.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Oe===!0&&Qe.beginShadows();let i=k.state.shadowsArray;if(et.render(i,e,t),Oe===!0&&Qe.endShadows(),(r&&ie.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];wt(n,r,e,a)}Pe&&tt.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Ct(O,e,n,n.viewport)}}else r.length>0&&wt(n,r,e,t),Pe&&tt.render(e),Ct(O,e,t)}M!==null&&de===0&&(Be.updateMultisampleRenderTarget(M),Be.updateRenderTargetMipmap(M)),r&&ie.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),st.resetDefaultState(),fe=-1,pe=null,A.pop(),A.length>0?(k=A[A.length-1],Be.setTextureUnits(k.state.textureUnits),Oe===!0&&Qe.setGlobalState(j.clippingPlanes,k.state.camera)):k=null,re.pop(),O=re.length>0?re[re.length-1]:null,oe!==null&&oe.renderEnd()};function St(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(De)){r&&Me.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ae);let i=Ge.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Me.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(De))){let i=Ge.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Me.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Me.copy(e.boundingSphere.center)),Me.applyMatrix4(e.matrixWorld).applyMatrix4(Ae)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Me.z,s,t)}}else a.visible&&O.push(e,i,a,n,Me.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)St(i[e],t,n,r)}function Ct(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Oe===!0&&Qe.setGlobalState(j.clippingPlanes,n),r&&P.viewport(me.copy(r)),i.length>0&&Tt(i,t,n),a.length>0&&Tt(a,t,n),o.length>0&&Tt(o,t,n),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function wt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Le.has(`EXT_color_buffer_half_float`)||Le.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Qt(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,Re.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:zt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||me;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),d=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(_e),ve=j.getClearAlpha(),ve<1&&j.setClearColor(16777215,.5),j.clear(),Pe&&tt.render(n);let f=j.toneMapping;j.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Oe===!0&&Qe.setGlobalState(j.clippingPlanes,r),Tt(e,n,r),Be.updateMultisampleRenderTarget(a),Be.updateRenderTargetMipmap(a),Le.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Et(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Be.updateMultisampleRenderTarget(a),Be.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,d),j.setClearColor(_e,ve),p!==void 0&&(r.viewport=p),j.toneMapping=f}function Tt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Et(o,t,n,s,l,c)}}function Et(e,t,n,r,i,a){oe!==null&&i.isNodeMaterial&&oe.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function Dt(e,t,n){t.isScene!==!0&&(t=Ne);let r=F.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ke.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=He.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,pt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return kt(e,s),d}else s.uniforms=Ke.getUniforms(e),oe!==null&&e.isNodeMaterial&&oe.build(e,n,s),e.onBeforeCompile(s,j),d=Ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Qe.uniform),kt(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Jc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function kt(e,t){let n=F.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function At(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function z(e,t,n,r,i){t.isScene!==!0&&(t=Ne),Be.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?j.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:zt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=He.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=F.get(r),y=k.state.lights;if(Oe===!0&&(ke===!0||e!==pe)){let t=e===pe&&r.id===fe;Qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Qe.numPlanes||v.numIntersection!==Qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Dt(r,t,i),oe&&r.isNodeMaterial&&oe.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(P.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==fe&&(fe=r.id,C=!0),v.needsLights){let e=At(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||pe!==e){P.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(N,`projectionMatrix`,e.projectionMatrix),T.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(N,je.setFromMatrixPosition(e.matrixWorld)),Re.logarithmicDepthBuffer&&T.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),pe!==e&&(pe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(N,`sunShadowMap`,y.state.sunShadowMap,Be),y.state.directionalShadowMap.length>0&&T.setValue(N,`directionalShadowMap`,y.state.directionalShadowMap,Be),y.state.spotShadowMap.length>0&&T.setValue(N,`spotShadowMap`,y.state.spotShadowMap,Be),y.state.pointShadowMap.length>0&&T.setValue(N,`pointShadowMap`,y.state.pointShadowMap,Be)),i.isSkinnedMesh){T.setOptional(N,i,`bindMatrix`),T.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(N,`boneTexture`,e.boneTexture,Be))}i.isBatchedMesh&&(T.setOptional(N,i,`batchingTexture`),T.setValue(N,`batchingTexture`,i._matricesTexture,Be),T.setOptional(N,i,`batchingIdTexture`),T.setValue(N,`batchingIdTexture`,i._indirectTexture,Be),T.setOptional(N,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(N,`batchingColorTexture`,i._colorsTexture,Be));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&rt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(N,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=hu()),C){if(T.setValue(N,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&jt(E,w),a&&r.fog===!0&&Je.refreshFogUniforms(E,a),Je.refreshMaterialUniforms(E,r,xe,be,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Jc.upload(N,Ot(v),E,Be)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Jc.upload(N,Ot(v),E,Be),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(N,`center`,i.center),T.setValue(N,`modelViewMatrix`,i.modelViewMatrix),T.setValue(N,`normalMatrix`,i.normalMatrix),T.setValue(N,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ct.update(n,x),ct.bind(n,x)}}return x}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ue},this.getActiveMipmapLevel=function(){return de},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=F.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),F.get(e.texture).__webglTexture=t,F.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=F.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,ue=t,de=n;let r=null,i=!1,a=!1;if(e){let o=F.get(e);if(o.__useDefaultFramebuffer!==void 0){P.bindFramebuffer(N.FRAMEBUFFER,o.__webglFramebuffer),me.copy(e.viewport),he.copy(e.scissor),ge=e.scissorTest,P.viewport(me),P.scissor(he),P.setScissorTest(ge),fe=-1;return}if(o.__webglFramebuffer===void 0)Be.setupRenderTarget(e);else if(o.__hasExternalTextures)Be.rebindTextures(e,F.get(e.texture).__webglTexture,F.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&F.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Be.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=F.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Be.useMultisampledRTT(e)===!1?F.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,me.copy(e.viewport),he.copy(e.scissor),ge=e.scissorTest}else me.copy(we).multiplyScalar(xe).floor(),he.copy(Te).multiplyScalar(xe).floor(),ge=Ee;if(n!==0&&(r=se),P.bindFramebuffer(N.FRAMEBUFFER,r)&&P.drawBuffers(e,r),P.viewport(me),P.scissor(he),P.setScissorTest(ge),i){let r=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=F.get(e.textures[t]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,t.__webglTexture,n)}fe=-1};function Nt(e){let t=F.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Re.textureFormatReadable(e.format),t.__typeReadable=Re.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){P.bindFramebuffer(N.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,ot.convert(c),ot.convert(l),a)}finally{let e=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){P.bindFramebuffer(N.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.bufferData(N.PIXEL_PACK_BUFFER,a.byteLength,N.STREAM_READ),N.readPixels(t,n,r,i,ot.convert(l),ot.convert(u),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let p=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,p);let m=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await nt(N,m,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,a),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(f),N.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Be.setTexture2D(e,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,o,s,i,a),P.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ot.convert(t.format),_=ot.convert(t.type),v;t.isData3DTexture?(Be.setTexture3D(t,0),v=N.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Be.setTexture2DArray(t,0),v=N.TEXTURE_2D_ARRAY):(Be.setTexture2D(t,0),v=N.TEXTURE_2D),P.activeTexture(N.TEXTURE0),P.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,t.flipY),P.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),P.pixelStorei(N.UNPACK_ALIGNMENT,t.unpackAlignment);let y=P.getParameter(N.UNPACK_ROW_LENGTH),b=P.getParameter(N.UNPACK_IMAGE_HEIGHT),x=P.getParameter(N.UNPACK_SKIP_PIXELS),S=P.getParameter(N.UNPACK_SKIP_ROWS),C=P.getParameter(N.UNPACK_SKIP_IMAGES);P.pixelStorei(N.UNPACK_ROW_LENGTH,h.width),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,h.height),P.pixelStorei(N.UNPACK_SKIP_PIXELS,l),P.pixelStorei(N.UNPACK_SKIP_ROWS,u),P.pixelStorei(N.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=F.get(e),r=F.get(t),h=F.get(n.__renderTarget),g=F.get(r.__renderTarget);P.bindFramebuffer(N.READ_FRAMEBUFFER,h.__webglFramebuffer),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(e).__webglTexture,i,d+n),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(t).__webglTexture,a,m+n)),N.blitFramebuffer(l,u,o,s,f,p,o,s,N.DEPTH_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||F.has(e)){let n=F.get(e),r=F.get(t);P.bindFramebuffer(N.READ_FRAMEBUFFER,ce),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,le);for(let e=0;e<c;e++)w?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,n.__webglTexture,i),T?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,r.__webglTexture,a),i===0?T?N.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):N.copyTexSubImage2D(v,a,f,p,l,u,o,s):N.blitFramebuffer(l,u,o,s,f,p,o,s,N.COLOR_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?N.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h);P.pixelStorei(N.UNPACK_ROW_LENGTH,y),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,b),P.pixelStorei(N.UNPACK_SKIP_PIXELS,x),P.pixelStorei(N.UNPACK_SKIP_ROWS,S),P.pixelStorei(N.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&N.generateMipmap(v),P.unbindTexture()},this.initRenderTarget=function(e){F.get(e).__webglFramebuffer===void 0&&Be.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Be.setTextureCube(e,0):e.isData3DTexture?Be.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Be.setTexture2DArray(e,0):Be.setTexture2D(e,0),P.unbindTexture()},this.resetState=function(){ue=0,de=0,M=null,P.reset(),st.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return qe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=zt._getDrawingBufferColorSpace(e),t.unpackColorSpace=zt._getUnpackColorSpace()}},_u=(Date.now()^2654435769)>>>0,vu=!1;function yu(e){_u=e>>>0||1,vu=!0}function bu(){return vu}var xu=()=>_u;function Su(e){_u=e}function W(){_u=_u+1831565813>>>0;let e=_u;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}var Cu=[{id:`base`,alleles:[`ash`,`blue`,`brown`]},{id:`pattern`,alleles:[`tcheck`,`check`,`bar`,`barless`]},{id:`spread`,alleles:[`spread`,`no`]},{id:`dilute`,alleles:[`full`,`dilute`]},{id:`recred`,alleles:[`no`,`red`]},{id:`grizzle`,alleles:[`grizzle`,`no`]},{id:`pied`,alleles:[`solid`,`splash`,`rosewing`,`saddle`,`capped`,`baldhead`,`beard`,`magpie`,`gazzi`,`shield`,`white`]},{id:`almond`,alleles:[`almond`,`no`]},{id:`indigo`,alleles:[`indigo`,`no`]},{id:`sheen`,alleles:[`normal`,`bronze`,`opal`,`galaxy`],mutOnly:{galaxy:1}},{id:`fantasy`,alleles:[`none`,`gold`,`mint`,`lilac`,`bubblegum`,`void`,`diamond`,`emerald`,`goldore`,`diamondore`,`emeraldore`,`redstoneore`,`ironore`,`lapisore`,`coalore`,`gemore`,`rainbow`,`toast`,`zebra`,`sunset`],mutOnly:{rainbow:1,toast:1,zebra:1,sunset:1,gold:1,mint:1,lilac:1,bubblegum:1,void:1,diamond:1,emerald:1,goldore:1,diamondore:1,emeraldore:1,redstoneore:1,ironore:1,lapisore:1,coalore:1,gemore:1}},{id:`fpattern`,alleles:[`none`,`dots`,`hearts`,`stars`],mutOnly:{dots:1,hearts:1,stars:1}},{id:`glow`,alleles:[`none`,`glow`],mutOnly:{glow:1}},{id:`crest`,alleles:[`none`,`peak`,`shell`,`rose`,`lace`,`double`,`horn`],mutOnly:{horn:1}},{id:`muffs`,alleles:[`clean`,`grouse`,`muffed`]},{id:`tail`,alleles:[`normal`,`fantail`]},{id:`mane`,alleles:[`plain`,`hood`,`cascade`]},{id:`crop`,alleles:[`normal`,`globe`]},{id:`frill`,alleles:[`smooth`,`frill`]},{id:`curl`,alleles:[`straight`,`curly`]},{id:`beak`,alleles:[`medium`,`long`,`short`,`stubby`,`duck`],mutOnly:{duck:1}},{id:`wattle`,alleles:[`small`,`large`]},{id:`eye`,alleles:[`orange`,`pearl`,`bull`,`googly`],mutOnly:{googly:1}},{id:`size`,alleles:[`normal`,`king`,`dinky`,`chonk`],mutOnly:{chonk:1}},{id:`neck`,alleles:[`normal`,`noodle`],mutOnly:{noodle:1}},{id:`posture`,alleles:[`normal`,`upright`]},{id:`legs`,alleles:[`normal`,`long`]},{id:`feather`,alleles:[`normal`,`silky`]},{id:`behavior`,alleles:[`steady`,`tumbler`,`parlor`]},{id:`voice`,alleles:[`coo`,`trumpet`,`laugher`]},{id:`gait`,alleles:[`normal`,`speedy`,`sluggish`,`jumpy`,`strutter`,`twirly`],mutOnly:{speedy:1,sluggish:1,jumpy:1,strutter:1,twirly:1}},{id:`outfit`,alleles:[`none`,`suit`,`elvis`,`punk`,`tracksuit`,`hawaiian`,`raincoat`],mutOnly:{suit:1,elvis:1,punk:1,tracksuit:1,hawaiian:1,raincoat:1}}],wu={base:`blue`,pattern:`bar`,spread:`no`,dilute:`full`,recred:`no`,grizzle:`no`,pied:`solid`,almond:`no`,indigo:`no`,sheen:`normal`,fantasy:`none`,fpattern:`none`,glow:`none`,crest:`none`,muffs:`clean`,tail:`normal`,mane:`plain`,crop:`normal`,frill:`smooth`,curl:`straight`,beak:`medium`,wattle:`small`,eye:`orange`,size:`normal`,neck:`normal`,posture:`normal`,legs:`normal`,feather:`normal`,behavior:`steady`,voice:`coo`,gait:`normal`,outfit:`none`};function Tu(e){for(let t of Cu)(!Array.isArray(e[t.id])||e[t.id].length!==2||!e[t.id].every(e=>t.alleles.includes(e)))&&(e[t.id]=[wu[t.id],wu[t.id]]);return e}var Eu={base:{blue:.68,ash:.2,brown:.12},pattern:{bar:.42,check:.36,tcheck:.16,barless:.06},spread:{no:.86,spread:.14},dilute:{full:.85,dilute:.15},recred:{no:.9,red:.1},grizzle:{no:.93,grizzle:.07},pied:{solid:.74,splash:.12,rosewing:.03,saddle:.025,capped:.025,baldhead:.02,beard:.015,magpie:.01,gazzi:.01,shield:.01,white:.015},almond:{no:.97,almond:.03},indigo:{no:.96,indigo:.04},sheen:{normal:.95,bronze:.04,opal:.01},fantasy:{none:1},fpattern:{none:1},glow:{none:1},crest:{none:.8,peak:.12,shell:.04,rose:.015,lace:.01,double:.015},muffs:{clean:.82,grouse:.12,muffed:.06},tail:{normal:.9,fantail:.1},mane:{plain:.93,hood:.05,cascade:.02},crop:{normal:.93,globe:.07},frill:{smooth:.9,frill:.1},curl:{straight:.93,curly:.07},beak:{medium:.84,long:.05,short:.09,stubby:.02},wattle:{small:.93,large:.07},eye:{orange:.82,pearl:.14,bull:.04},size:{normal:.86,king:.07,dinky:.07},neck:{normal:1},posture:{normal:.93,upright:.07},legs:{normal:.94,long:.06},feather:{normal:.95,silky:.05},behavior:{steady:.9,tumbler:.07,parlor:.03},voice:{coo:.92,trumpet:.05,laugher:.03},gait:{normal:1},outfit:{none:1}},Du={"base:ash":{label:`Ash-red`,tier:1},"base:brown":{label:`Brown`,tier:1},"pattern:tcheck":{label:`T-check`,tier:1},"pattern:barless":{label:`Barless`,tier:2},"spread:spread":{label:`Spread`,tier:1},"dilute:dilute":{label:`Dilute`,tier:1},"recred:red":{label:`Recessive red`,tier:1},"grizzle:grizzle":{label:`Grizzle`,tier:1},"pied:splash":{label:`Splash`,tier:1},"pied:saddle":{label:`Saddle`,tier:2},"pied:capped":{label:`Capped`,tier:2},"pied:white":{label:`All-white`,tier:2},"pied:rosewing":{label:`Rosewing`,tier:1},"pied:baldhead":{label:`Baldhead`,tier:2},"pied:beard":{label:`Bearded`,tier:2},"pied:magpie":{label:`Magpie-marked`,tier:2},"pied:gazzi":{label:`Gazzi-marked`,tier:2},"pied:shield":{label:`Wing shield`,tier:2},"almond:almond":{label:`Almond`,tier:2},"indigo:indigo":{label:`Indigo`,tier:1},"crest:double":{label:`Double crest`,tier:2},"beak:long":{label:`Long beak`,tier:1},"beak:stubby":{label:`Button beak`,tier:2},"wattle:large":{label:`Wattled`,tier:2},"eye:bull":{label:`Bull eyes`,tier:1},"posture:upright":{label:`Upright stance`,tier:1},"legs:long":{label:`Stilt legs`,tier:2},"feather:silky":{label:`Silky feathers`,tier:2},"behavior:parlor":{label:`Parlor roller`,tier:2},"voice:laugher":{label:`Laugher voice`,tier:2},"sheen:bronze":{label:`Bronze sheen`,tier:2},"sheen:opal":{label:`Opal sheen`,tier:2},"sheen:galaxy":{label:`Galaxy sheen`,tier:3},"fantasy:gold":{label:`Solid gold`,tier:3},"fantasy:mint":{label:`Mint`,tier:3},"fantasy:lilac":{label:`Lilac`,tier:3},"fantasy:bubblegum":{label:`Bubblegum`,tier:3},"fantasy:void":{label:`Void`,tier:3},"fantasy:diamond":{label:`Diamond`,tier:3},"fantasy:emerald":{label:`Emerald`,tier:3},"fantasy:goldore":{label:`Gold ore`,tier:3},"fantasy:diamondore":{label:`Diamond ore`,tier:3},"fantasy:emeraldore":{label:`Emerald ore`,tier:3},"fantasy:redstoneore":{label:`Redstone ore`,tier:3},"fantasy:ironore":{label:`Iron ore`,tier:3},"fantasy:lapisore":{label:`Lapis ore`,tier:3},"fantasy:coalore":{label:`Coal ore`,tier:3},"fantasy:gemore":{label:`Mixed gemstone`,tier:3},"fantasy:rainbow":{label:`Rainbow`,tier:3},"fantasy:toast":{label:`Toasted`,tier:3},"fantasy:zebra":{label:`Zebra stripes`,tier:3},"fantasy:sunset":{label:`Sunset`,tier:3},"crest:horn":{label:`Unicorn horn`,tier:3},"beak:duck":{label:`Duck bill`,tier:3},"eye:googly":{label:`Googly eyes`,tier:3},"size:chonk":{label:`Absolute unit`,tier:3},"neck:noodle":{label:`Noodle neck`,tier:3},"fpattern:dots":{label:`Polka dots`,tier:3},"fpattern:hearts":{label:`Heart-marked`,tier:3},"fpattern:stars":{label:`Star-spangled`,tier:3},"glow:glow":{label:`Bioluminescent`,tier:3},"crest:peak":{label:`Peak crest`,tier:1},"crest:shell":{label:`Shell crest`,tier:2},"crest:rose":{label:`Rose crest`,tier:2},"crest:lace":{label:`Lace crown`,tier:2},"muffs:grouse":{label:`Grouse legs`,tier:1},"muffs:muffed":{label:`Muffed feet`,tier:1},"tail:fantail":{label:`Fantail`,tier:2},"mane:hood":{label:`Feathered hood`,tier:2},"mane:cascade":{label:`Neck hackles`,tier:2},"crop:globe":{label:`Inflated crop`,tier:2},"frill:frill":{label:`Breast frill`,tier:1},"curl:curly":{label:`Curled feathers`,tier:2},"beak:short":{label:`Short beak`,tier:1},"eye:pearl":{label:`Pearl eyes`,tier:1},"size:king":{label:`Very large`,tier:2},"size:dinky":{label:`Very small`,tier:2},"behavior:tumbler":{label:`Tumbler`,tier:2},"voice:trumpet":{label:`Trumpeter voice`,tier:2},"gait:speedy":{label:`Speedy`,tier:2},"gait:sluggish":{label:`Sluggish`,tier:2},"gait:jumpy":{label:`Jumpy`,tier:2},"gait:strutter":{label:`Strutter`,tier:2},"gait:twirly":{label:`Twirly`,tier:2},"outfit:suit":{label:`Business suit`,tier:3},"outfit:elvis":{label:`Rhinestone jumpsuit`,tier:3},"outfit:punk":{label:`Punk leathers`,tier:3},"outfit:tracksuit":{label:`Tracksuit`,tier:3},"outfit:hawaiian":{label:`Hawaiian shirt`,tier:3},"outfit:raincoat":{label:`Raincoat`,tier:3}};function Ou(e){let t=0;for(let n in e)t+=e[n];let n=W()*t;for(let t in e)if(n-=e[t],n<=0)return t;return Object.keys(e)[0]}function ku(){let e={};for(let t of Cu)e[t.id]=[Ou(Eu[t.id]),Ou(Eu[t.id])];return e}function Au(e,t,n=1){let r={},i=[];for(let a of Cu){let o=[e[a.id][W()<.5?0:1],t[a.id][W()<.5?0:1]];if(W()<.022*n){let e={};a.alleles.forEach((t,n)=>{e[t]=a.mutOnly&&a.mutOnly[t]?.05:n===a.alleles.length-1||n===0?.8:1});let t=Ou(e),n=W()<.5?0:1;o[n]!==t&&(o[n]=t,i.push(a.id+`:`+t))}r[a.id]=o}return{genome:r,mutated:i}}function ju(e){let t={};for(let n of Cu){let[r,i]=e[n.id];t[n.id]=n.alleles[Math.min(n.alleles.indexOf(r),n.alleles.indexOf(i))]}return t}var Mu={blue:`Blue`,blueS:`Black`,blued:`Silver`,blueSd:`Ice`,ash:`Ash-Red`,ashS:`Lavender`,ashd:`Cream`,ashSd:`Pale Lavender`,brown:`Brown`,brownS:`Chocolate`,brownd:`Khaki`,brownSd:`Café-au-lait`,red:`Red`,redd:`Golden Yellow`,white:`White`,almond:`Almond`,indigo:`Indigo`,indigoS:`Andalusian Slate`,gold:`Solid Gold`,mint:`Mint`,lilac:`Lilac`,bubblegum:`Bubblegum`,void:`Void`,diamond:`Diamond`,emerald:`Emerald`,goldore:`Gold Ore`,diamondore:`Diamond Ore`,emeraldore:`Emerald Ore`,redstoneore:`Redstone Ore`,ironore:`Iron Ore`,lapisore:`Lapis Ore`,coalore:`Coal Ore`,gemore:`Mixed Gemstone`,rainbow:`Rainbow`,toast:`Toasted`,zebra:`Zebra`,sunset:`Sunset`},Nu={tcheck:`T-Check`,check:`Check`,bar:`Bar`,barless:`Barless`};function Pu(e,t){let n;n=e.fantasy===`none`?e.pied===`white`?`white`:e.recred===`red`?e.dilute===`dilute`?`redd`:`red`:e.almond===`almond`?`almond`:e.indigo===`indigo`&&e.base===`blue`?e.spread===`spread`?`indigoS`:`indigo`:e.base+(e.spread===`spread`?`S`:``)+(e.dilute===`dilute`?`d`:``):e.fantasy;let r=e.fantasy===`none`&&e.pied!==`white`&&e.recred!==`red`&&e.spread!==`spread`&&e.almond!==`almond`,i=Mu[n];r&&(i+=` `+Nu[e.pattern]),e.grizzle===`grizzle`&&e.pied!==`white`&&e.fantasy===`none`&&(i=`Grizzled `+i);let a={splash:`splashed`,saddle:`saddled`,capped:`capped`,rosewing:`rosewinged`,baldhead:`baldheaded`,beard:`bearded`,magpie:`magpie-marked`,gazzi:`gazzi-marked`,shield:`wing-shielded`};a[e.pied]&&e.fantasy===`none`&&(i+=`, `+a[e.pied]);let o=[],s=[];for(let t of Cu){let n=Du[t.id+`:`+e[t.id]];n&&(o.push({key:t.id+`:`+e[t.id],label:n.label,tier:n.tier}),s.push(t.id+`:`+e[t.id]))}for(let e of Ku(t))o.push({key:`acc:`+e,label:Wu[e].label,tier:2});let c=o.reduce((e,t)=>Math.max(e,t.tier),0);return{e,accessory:t||null,colorKey:n,label:i,patternVisible:r,traits:o,sparkTier:c}}function Fu(e,t){return Pu(ju(e),t)}function Iu(e){return Cu.map(t=>e.e[t.id]).join(`|`)+`|`+(e.accessory||`-`)}function Lu(e){let t=[];for(let n of Cu){let[r,i]=e[n.id],a=Math.min(n.alleles.indexOf(r),n.alleles.indexOf(i));for(let e of new Set([r,i]))if(n.alleles.indexOf(e)>a){let r=n.id+`:`+e,i=Du[r];i&&t.push({key:r,label:i.label,tier:i.tier})}}return t}var Ru=null,zu=``,Bu=``;function Vu(e,t,n){n!==Ru&&(Ru=n,[zu,Bu]=n.split(`:`));let r=zu,i=Bu;if(r===`acc`)return Ku(t.accessory).includes(i)?2:0;if(t.e[r]===i)return 2;let a=e[r];return a&&(a[0]===i||a[1]===i)?1:0}function Hu(e){return Cu.map(t=>e[t.id].map(e=>Math.max(0,t.alleles.indexOf(e)).toString(36)).join(``)).join(``)}function Uu(e){let t={};return Cu.forEach((n,r)=>{let i=n.alleles[parseInt(e[r*2],36)],a=n.alleles[parseInt(e[r*2+1],36)];t[n.id]=i&&a?[i,a]:[wu[n.id],wu[n.id]]}),t}var Wu={tophat:{label:`Top hat`,w:14,slot:`head`},beret:{label:`Beret`,w:14,slot:`head`},cowboy:{label:`Cowboy hat`,w:12,slot:`head`},monocle:{label:`Monocle`,w:12,slot:`face`},sunglasses:{label:`Sunglasses`,w:16,slot:`face`},bowtie:{label:`Bow tie`,w:14,slot:`neck`},scarf:{label:`Tiny scarf`,w:10,slot:`neck`},propeller:{label:`Propeller cap`,w:5,slot:`head`},crown:{label:`Crown`,w:3,slot:`head`},partyhat:{label:`Party hat`,w:8,slot:`head`},chefhat:{label:`Chef hat`,w:6,slot:`head`},mustache:{label:`Magnificent moustache`,w:7,slot:`face`},blackhat:{label:`Black fedora`,w:10,slot:`head`},goldchain:{label:`Gold chain`,w:10,slot:`neck`}},Gu=[`head`,`face`,`neck`],Ku=e=>e?e.split(`+`).filter(e=>Wu[e]):[];function qu(e,t){return Ku(e).filter(e=>Wu[e].slot!==Wu[t].slot).concat(t).sort((e,t)=>Gu.indexOf(Wu[e].slot)-Gu.indexOf(Wu[t].slot)).join(`+`)}var Ju=e=>Gu.filter(t=>!Ku(e).some(e=>Wu[e].slot===t));function Yu(e=.02,t=Gu){if(W()>e)return null;let n={};for(let e in Wu)t.includes(Wu[e].slot)&&(n[e]=Wu[e].w);return Object.keys(n).length?Ou(n):null}var Xu=[{id:`fantail`,name:`Fantail`,real:1,req:{tail:`fantail`,mane:`plain`,crop:`normal`},blurb:`Thirty tail feathers and the confidence to use them.`},{id:`jacobin`,name:`Jacobin`,real:1,req:{mane:`hood`},blurb:`Cannot see sideways. Refuses to discuss it.`},{id:`frillback`,name:`Frillback`,real:1,req:{curl:`curly`},blurb:`Woke up like this. Every feather, a decision.`},{id:`pouter`,name:`English Pouter`,real:1,req:{crop:`globe`},blurb:`Mostly balloon. Legally a bird.`},{id:`ogowl`,name:`Old German Owl`,real:1,req:{beak:`short`,frill:`frill`,crest:`shell`},blurb:`A small opinionated cloud with a cravat.`},{id:`afowl`,name:`African Owl`,real:1,req:{beak:`short`,frill:`frill`,crest:`none`},blurb:`The cravat, without the hat.`},{id:`nun`,name:`Nun`,real:1,req:{pied:`capped`,crest:`shell`},blurb:`Took vows. Mostly of cooing.`},{id:`helmet`,name:`Helmet`,real:1,req:{pied:`capped`,crest:`none`},blurb:`Safety first, since the 1500s.`},{id:`fairyswallow`,name:`Saxon Fairy Swallow`,real:1,req:{pied:`saddle`,muffs:`muffed`},blurb:`Wears slippers at all times. House rules.`},{id:`lahore`,name:`Lahore`,real:1,req:{pied:`saddle`,size:`king`},blurb:`Large, gentle, immaculately two-toned.`},{id:`ice`,name:`Ice Pigeon`,real:1,req:{colorKey:`blueSd`,muffs:[`grouse`,`muffed`]},blurb:`Kept in the fridge overnight. Perfect.`},{id:`archangel`,name:`Archangel`,real:1,req:{sheen:`bronze`,crest:`peak`},blurb:`Polished daily by unseen forces.`},{id:`trumpeter`,name:`English Trumpeter`,real:1,req:{voice:`trumpet`,crest:`rose`},blurb:`The neighbors have filed a petition.`},{id:`roller`,name:`Birmingham Roller`,real:1,req:{behavior:`tumbler`},blurb:`Falls with style. On purpose, allegedly.`},{id:`king`,name:`Show King`,real:1,req:{size:`king`,pied:`white`},blurb:`Enormous. Spotless. Judges wept.`},{id:`modena`,name:`Modena`,real:1,req:{size:`dinky`,pattern:[`tcheck`,`check`],spread:`no`},blurb:`A teacup of a pigeon. Espresso, technically.`},{id:`indianfantail`,name:`Indian Fantail`,real:1,req:{tail:`fantail`,crest:`peak`,muffs:[`grouse`,`muffed`]},blurb:`The fantail, but with slippers and a hat.`},{id:`satinette`,name:`Oriental Frill`,real:1,req:{beak:`short`,frill:`frill`,pied:`saddle`},blurb:`Hand-painted wings. The beak did the painting.`},{id:`brunner`,name:`Brunner Pouter`,real:1,req:{crop:`globe`,size:`dinky`},blurb:`A party balloon that learned to strut.`},{id:`damascene`,name:`Damascene`,real:1,req:{colorKey:`blued`},blurb:`Milk-blue since antiquity. Still smug about it.`},{id:`nicobar`,name:`Nicobar Pigeon`,real:1,exotic:1,req:{mane:`cascade`},sample:{spread:`spread`,sheen:`bronze`},blurb:`Wears every necklace it owns. Simultaneously.`},{id:`victoria`,name:`Victoria Crowned Pigeon`,real:1,exotic:1,req:{crest:`lace`,size:`king`},sample:{dilute:`dilute`},blurb:`The largest pigeon on Earth. The doily is load-bearing.`},{id:`bleedingheart`,name:`Luzon Bleeding-heart`,real:1,exotic:1,req:{fpattern:`hearts`,pied:`white`},blurb:`It is fine. It has always looked like this. It is fine.`},{id:`magpie`,name:`Magpie`,real:1,req:{pied:`magpie`},blurb:`Dressed for a gala. Attends none of them.`},{id:`gazzimodena`,name:`Gazzi Modena`,real:1,req:{pied:`gazzi`,size:`dinky`},blurb:`The Modena, but it read a fashion magazine.`},{id:`danzig`,name:`Danzig Highflyer`,real:1,req:{pied:`baldhead`,beak:`long`},blurb:`White-headed, long-nosed, flies until it forgets why.`},{id:`bearded`,name:`Bearded Tumbler`,real:1,req:{pied:`beard`,behavior:`tumbler`},blurb:`Grows a beard. Does flips. Has a podcast, probably.`},{id:`turbit`,name:`Turbit`,real:1,req:{pied:`shield`,crest:`peak`,frill:`frill`},blurb:`Coloured wings, white everything else, a cowlick for flair.`},{id:`rosewing`,name:`Rosewing Roller`,real:1,req:{pied:`rosewing`,behavior:`tumbler`},blurb:`Roses on the shoulders, chaos in the sky.`},{id:`almondtumbler`,name:`Almond Tumbler`,real:1,req:{almond:`almond`,beak:`stubby`},blurb:`Flecked like a biscotti. Beak like a button. Beloved of Victorians.`},{id:`budapest`,name:`Budapest Short-face`,real:1,req:{beak:`stubby`,posture:`upright`},blurb:`Stands to attention. Has almost no face to stand behind.`},{id:`carrier`,name:`English Carrier`,real:1,req:{wattle:`large`,beak:`long`},blurb:`A beak with a pigeon attached. Wattled for gravitas.`},{id:`barb`,name:`Barb`,real:1,req:{wattle:`large`,beak:`short`},blurb:`A stubby beak and enormous spectacles. Very studious.`},{id:`dragoon`,name:`Dragoon`,real:1,req:{wattle:`large`,size:`king`},blurb:`Big, wattled, and technically a cavalry unit.`},{id:`scandaroon`,name:`Scandaroon`,real:1,req:{beak:`long`,posture:`upright`},blurb:`Nose held high. It has a lot of nose to hold.`},{id:`maltese`,name:`Maltese`,real:1,req:{legs:`long`,posture:`upright`},blurb:`A pigeon on stilts pretending to be a chicken.`},{id:`andalusian`,name:`Andalusian`,real:1,req:{colorKey:`indigoS`},blurb:`Slate-blue, dramatic, would like to be painted.`},{id:`lacefantail`,name:`Lace Fantail`,real:1,req:{tail:`fantail`,feather:`silky`},blurb:`A fantail that went through a tumble dryer. Gloriously.`},{id:`parlorroller`,name:`Parlor Roller`,real:1,req:{behavior:`parlor`},blurb:`Cannot fly. Rolls across the floor instead. Wins anyway.`},{id:`lotan`,name:`Indian Lotan`,real:1,req:{behavior:`parlor`,pied:`white`},blurb:`A white ground-roller. Shake it gently and it somersaults.`},{id:`laugher`,name:`Arabian Laugher`,real:1,req:{voice:`laugher`},blurb:`Laughs at everything. Especially you.`},{id:`bokhara`,name:`Bokhara Trumpeter`,real:1,req:{voice:`trumpet`,crest:`double`,muffs:`muffed`},blurb:`Two crests, full slippers, one very long drumroll.`},{id:`capuchine`,name:`Old Dutch Capuchine`,real:1,req:{mane:`hood`,pied:`baldhead`},blurb:`A monastic hood, a white face, strong opinions.`},{id:`pomeranian`,name:`Pomeranian Pouter`,real:1,req:{crop:`globe`,legs:`long`,muffs:`muffed`},blurb:`Balloon, stilts and slippers. A complete outfit.`},{id:`norwich`,name:`Norwich Cropper`,real:1,req:{crop:`globe`,posture:`upright`},blurb:`Inflates, stands up straight, awaits applause.`},{id:`kite`,name:`Kite Tumbler`,real:1,req:{spread:`spread`,sheen:`bronze`,behavior:`tumbler`},blurb:`Black with bronze wings. Falls out of the sky elegantly.`},{id:`priest`,name:`Saxon Priest`,real:1,req:{pied:`baldhead`,crest:`double`},blurb:`Two crests and a white skullcap. Delivers sermons on seeds.`},{id:`disco`,name:`Disco Pigeon`,real:0,req:{sheen:`galaxy`},blurb:`Contains a small nebula. Do not shake.`},{id:`mintcond`,name:`Mint Condition`,real:0,req:{fantasy:`mint`},blurb:`Never removed from original packaging.`},{id:`nightlight`,name:`Night Light`,real:0,req:{glow:`glow`},blurb:`Afraid of the dark. Solved it personally.`},{id:`constellation`,name:`The Constellation`,real:0,req:{fantasy:`void`,fpattern:`stars`},blurb:`Astronomers keep trying to name it.`},{id:`birthday`,name:`Birthday Pigeon`,real:0,req:{fantasy:`bubblegum`,fpattern:`dots`},blurb:`It is always its birthday. Always.`},{id:`majesty`,name:`His Majesty`,real:0,req:{accessory:`crown`},blurb:`Born wearing it. Ask no questions.`},{id:`pigeonicorn`,name:`Pigeonicorn`,real:0,req:{crest:`horn`,pied:`white`},blurb:`Grants one wish per day. The wish must be bread.`},{id:`narwhal`,name:`Sky Narwhal`,real:0,req:{crest:`horn`,colorKey:[`blueS`,`blueSd`]},blurb:`Lost at sea. Found in a park. Refuses to elaborate.`},{id:`rubberducky`,name:`Rubber Ducky`,real:0,req:{beak:`duck`,colorKey:`redd`},blurb:`Squeaks when stepped on. Please do not test this.`},{id:`platypigeon`,name:`Platypigeon`,real:0,req:{beak:`duck`,colorKey:[`brown`,`brownS`]},blurb:`Lays eggs, which is normal. Everything else is not.`},{id:`googler`,name:`The Googler`,real:0,req:{eye:`googly`},blurb:`Sees everything. Understands nothing. Wobbles.`},{id:`lochness`,name:`Loch Ness Pigeon`,real:0,req:{neck:`noodle`,fantasy:[`mint`,`emerald`]},blurb:`Only ever photographed blurry. Stands perfectly still for the camera anyway.`},{id:`noodle`,name:`Noodle`,real:0,req:{neck:`noodle`},blurb:`Can see over hedges. Mostly uses this to find bread.`},{id:`absoluteunit`,name:`Absolute Unit`,real:0,req:{size:`chonk`},blurb:`In awe at the size of this lad.`},{id:`chonkasaurus`,name:`Chonkasaurus`,real:0,req:{size:`chonk`,neck:`noodle`},blurb:`Palaeontologists have been informed. They are coming.`},{id:`toast`,name:`French Toast`,real:0,req:{fantasy:`toast`},blurb:`Golden brown. Texture like sun. Smells faintly of cinnamon.`},{id:`crouton`,name:`The Crouton`,real:0,req:{fantasy:`toast`,size:`dinky`},blurb:`Bite-sized. Please do not put it in a salad.`},{id:`rainbowroad`,name:`Rainbow Road`,real:0,req:{fantasy:`rainbow`,tail:`fantail`},blurb:`Do not fall off it. Every child of the 90s knows why.`},{id:`prismatic`,name:`Prism Pigeon`,real:0,req:{fantasy:`rainbow`},blurb:`Splits sunlight into seven feelings.`},{id:`zebreon`,name:`Zebreon`,real:0,req:{fantasy:`zebra`},blurb:`Is it a white pigeon with black stripes? It will not say.`},{id:`sunsetstrip`,name:`Sunset Strip`,real:0,req:{fantasy:`sunset`,sheen:`opal`},blurb:`Permanently golden hour. Influencers follow it everywhere.`},{id:`partyanimal`,name:`Party Animal`,real:0,req:{accessory:`partyhat`,fpattern:`dots`},blurb:`Arrived in 1987. The party never ended.`},{id:`chef`,name:`Chef Pigeonnaire`,real:0,req:{accessory:`chefhat`},blurb:`Specialises in crumbs. Michelin inspectors are too scared to visit.`},{id:`mustachio`,name:`Signor Mustachio`,real:0,req:{accessory:`mustache`,voice:`trumpet`},blurb:`Sings opera at dawn. The moustache is load-bearing.`},{id:`homey`,name:`Homey Pigeon`,real:0,fashion:1,req:{accessory:`blackhat+goldchain`},sample:{outfit:`tracksuit`,spread:`spread`},blurb:`Black fedora, gold chain, tracksuit if the occasion demands. Walks this way. Talks this way.`},{id:`manager`,name:`Middle Management`,real:0,fashion:1,req:{outfit:`suit`},blurb:`Has a meeting at three. The meeting is about crumbs. It could have been an email.`},{id:`ceo`,name:`The CEO`,real:0,fashion:1,req:{outfit:`suit`,accessory:`tophat`},blurb:`Owns the bench. Leases it back to you. Very sorry about the layoffs.`},{id:`pigvis`,name:`Pigvis`,real:0,fashion:1,req:{outfit:`elvis`},sample:{spread:`spread`},blurb:`Thank you. Thank you very much. (Coo.) Pigvis has left the bench.`},{id:`vegas`,name:`Vegas Pigvis`,real:0,fashion:1,req:{outfit:`elvis`,accessory:`sunglasses`},sample:{spread:`spread`},blurb:`The late-career residency years. More rhinestones than bird.`},{id:`sexpigeons`,name:`The Sex Pigeons`,real:0,fashion:1,req:{outfit:`punk`},blurb:`Never mind the breadcrumbs. Three chords and an attitude.`},{id:`jogger`,name:`The Jogger`,real:0,fashion:1,req:{outfit:`tracksuit`,gait:`speedy`},blurb:`Training for a race nobody has scheduled. Personal best: the fountain, twice.`},{id:`tourist`,name:`The Tourist`,real:0,fashion:1,req:{outfit:`hawaiian`,accessory:`sunglasses`},blurb:`On holiday. Permanently. Has four hundred photos of the same fountain.`},{id:`fisherman`,name:`The Old Salt`,real:0,fashion:1,req:{outfit:`raincoat`},blurb:`Has never seen the sea. Dresses for it every day, just in case.`},{id:`roadrunner`,name:`Roadrunner`,real:0,req:{gait:`speedy`,legs:`long`},blurb:`Beep beep. (Coo coo.) Leaves a little dust cloud. Allegedly.`},{id:`sloth`,name:`Sloth Pigeon`,real:0,req:{gait:`sluggish`},blurb:`Will get there. Not today. Possibly not this week.`},{id:`popcorn`,name:`Popcorn`,real:0,req:{gait:`jumpy`,size:`dinky`},blurb:`Small, startled, and constantly going off.`},{id:`peacock`,name:`Peacock (Allegedly)`,real:0,req:{gait:`strutter`,tail:`fantail`},blurb:`Insists it is a peacock. Struts accordingly. Nobody has the heart to argue.`},{id:`ballerina`,name:`The Ballerina`,real:0,req:{gait:`twirly`,feather:`silky`},blurb:`Pirouettes between pecks. Has never once been asked to.`},{id:`voidlegend`,name:`THE VOID PIGEON`,real:0,legend:1,req:{fantasy:`void`,glow:`glow`},blurb:`It coos and reality briefly buffers. Summoned, never bred.`},{id:`galaxylegend`,name:`THE GALAXY PIGEON`,real:0,legend:1,req:{sheen:`galaxy`,fpattern:`stars`},blurb:`Contains several billion stars and one (1) crumb. Summoned, never bred.`}];function Zu(e){return Xu.filter(t=>Object.entries(t.req).every(([t,n])=>{if(t===`accessory`){let t=Ku(e.accessory);return(Array.isArray(n)?n:[n]).some(e=>e.split(`+`).every(e=>t.includes(e)))}let r=t===`colorKey`?e.colorKey:e.e[t];return Array.isArray(n)?n.includes(r):r===n}))}function Qu(e){if(e===`red`||e===`redd`)return{recred:`red`,dilute:e===`redd`?`dilute`:`full`};if(e===`indigo`||e===`indigoS`)return{base:`blue`,indigo:`indigo`,spread:e===`indigoS`?`spread`:`no`};let t=/^(blue|ash|brown)(S?)(d?)$/.exec(e);return t?{base:t[1],spread:t[2]?`spread`:`no`,dilute:t[3]?`dilute`:`full`}:{}}function $u(e){return Object.entries(Qu(e)).map(([e,t])=>e+`:`+t).filter(e=>Du[e])}var ed={colorKey:{blueSd:`an icy color (blue + spread + dilute, all at once)`,blued:`a silvery color (blue + dilute, no spread)`,indigoS:`a slate color (indigo + spread on a blue bird)`,blueS:`a black or icy color (blue + spread)`,redd:`a golden-yellow color (recessive red + dilute)`,brown:`a brown color`},accessory:{crown:`be born wearing a very specific hat`,partyhat:`be born ready to party (hat included)`,chefhat:`hatch already employed in hospitality`,mustache:`grow a truly magnificent moustache`,"blackhat+goldchain":`wear a black fedora and a gold chain at the same time`,tophat:`wear a top hat`,sunglasses:`wear sunglasses`}};function td(e){return Object.entries(e.req).map(([e,t])=>ed[e]&&ed[e][Array.isArray(t)?t[0]:t]?ed[e][Array.isArray(t)?t[0]:t]:(Array.isArray(t)?t:[t]).map(t=>{let n=Du[e+`:`+t];return n?n.label.toLowerCase():t===`none`||t===`plain`||t===`normal`||t===`no`||t===`clean`?`no `+e:t}).join(` or `)).join(` + `)}function nd(e){let t={...wu},n=null;for(let[r,i]of Object.entries(e.req)){let e=Array.isArray(i)?i[0]:i;r===`colorKey`?Object.assign(t,Qu(e)):r===`accessory`?n=e:t[r]=e}if(e.sample)for(let[n,r]of Object.entries(e.sample))t[n]=r;return Pu(t,n)}function rd(e){let t=nd(e),n={};for(let e of Cu)n[e.id]=[t.e[e.id],t.e[e.id]];return{genome:n,accessory:t.accessory}}var id={"base:ash":`Ash-red. The color of a brick that has seen things.`,"base:brown":`Brown. Not to be confused with other browns. It insists.`,"pattern:tcheck":`T-check. So many checks the wing is basically plaid.`,"pattern:barless":`Barless. The wing equivalent of forgetting your keys.`,"spread:spread":`Spread. One color, applied with total commitment.`,"dilute:dilute":`Dilute. Same pigeon, 40% more pastel.`,"recred:red":`Recessive red. Paints over everything. The HOA is furious.`,"grizzle:grizzle":`Grizzle. Salt and pepper, hold the salt shaker lid.`,"pied:splash":`Splash. An accident at the paint factory, worn proudly.`,"pied:saddle":`Saddle. White bird, colored wings. Very business casual.`,"pied:capped":`Capped. Wears its color like a tiny swim cap.`,"pied:white":`All-white. Suspiciously innocent.`,"pied:rosewing":`Rosewing. A little bouquet of white on each shoulder.`,"pied:baldhead":`Baldhead. Not bald. White-headed. Please stop saying bald.`,"pied:beard":`Bearded. A white bib under the beak, like it just ate yogurt.`,"pied:magpie":`Magpie-marked. Tuxedo up top, white underneath. Black tie optional.`,"pied:gazzi":`Gazzi. Coloured head, wings and tail on a white body. Paint-by-numbers.`,"pied:shield":`Wing shield. White bird, coloured wing shields. Heraldically correct.`,"almond:almond":`Almond. Speckled like a biscotti. Changes a little every moult.`,"indigo:indigo":`Indigo. Blue with rusty bars. Looks like it slept in the garden.`,"crest:double":`Double crest. One crest on the head, another on the nose. Maximalist.`,"beak:long":`Long beak. Can reach the crumbs other pigeons only dream of.`,"beak:stubby":`Button beak. So short it is mostly a suggestion.`,"wattle:large":`Wattled. Big warty spectacles and a nose to match. Distinguished.`,"eye:bull":`Bull eyes. Dark, deep, unreadable. Probably thinking about bread.`,"posture:upright":`Upright stance. Stands like it is about to give a toast.`,"legs:long":`Stilt legs. Sees over the other pigeons. Tells them what it sees.`,"feather:silky":`Silky feathers. Soft, fluffy, completely useless for flying. Worth it.`,"behavior:parlor":`Parlor roller. Somersaults along the ground. Nobody asked it to.`,"voice:laugher":`Laugher voice. Coos like a sitcom audience.`,"sheen:bronze":`Bronze sheen. Third place, permanently, gloriously.`,"sheen:opal":`Opal sheen. Shimmers when it thinks nobody is looking.`,"sheen:galaxy":`Galaxy sheen. NASA has been notified. They said "wow".`,"fantasy:gold":`Solid gold. Do not take to a pawn shop.`,"fantasy:mint":`Mint. Smells faintly of victory and toothpaste.`,"fantasy:lilac":`Lilac. Botanists deny involvement.`,"fantasy:bubblegum":`Bubblegum. Pink beyond all reason or precedent.`,"fantasy:void":`Void. Light goes in. Coos come out.`,"fantasy:diamond":`Diamond. Hardest known pigeon. Do not sit on.`,"fantasy:emerald":`Emerald. Villagers keep trying to trade for it.`,"fantasy:goldore":`Gold ore. Still embedded in the rock. Refuses smelting.`,"fantasy:diamondore":`Diamond ore. Mine with an iron beak or better.`,"fantasy:emeraldore":`Emerald ore. Found exactly one per mountain.`,"fantasy:redstoneore":`Redstone ore. Glows when stepped on. Powers nothing.`,"fantasy:ironore":`Iron ore. Sturdy. Slightly magnetic. Very proud.`,"fantasy:lapisore":`Lapis ore. Enchanting to be around.`,"fantasy:coalore":`Coal ore. Burns for eight coos exactly.`,"fantasy:gemore":`Mixed gemstone. The whole quarry in one bird.`,"fpattern:dots":`Polka dots. Genetically ready for any party.`,"fpattern:hearts":`Heart-marked. Loves you. Has proof.`,"fpattern:stars":`Star-spangled. Hums anthems at dawn.`,"glow:glow":`Bioluminescent. Reading lamp of the flock.`,"crest:peak":`Peak crest. A single decisive cowlick.`,"crest:shell":`Shell crest. A feathered headrest, always deployed.`,"crest:rose":`Rose crest. A pompom, grown in-house.`,"crest:lace":`Lace crown. Royalty, but doily.`,"muffs:grouse":`Grouse legs. Ankle warmers, non-removable.`,"muffs:muffed":`Muffed feet. Walks around in slippers. Zero regrets.`,"tail:fantail":`Fantail. A hand of cards, all of them winning.`,"mane:hood":`Feathered hood. Peripheral vision traded for drama.`,"mane:cascade":`Neck hackles. A private waterfall of feathers.`,"crop:globe":`Inflated crop. 60% pigeon, 40% party balloon.`,"frill:frill":`Breast frill. A jabot. Yes, it knows the word.`,"curl:curly":`Curled feathers. Permanent perm. No appointment needed.`,"beak:short":`Short beak. Boops at maximum efficiency.`,"eye:pearl":`Pearl eyes. Sees you. Judges gently.`,"size:king":`Very large. Technically still fits in one hand. Whose hand, unclear.`,"size:dinky":`Very small. Travel-sized for your convenience.`,"behavior:tumbler":`Tumbler. Does a little flip. Nobody knows why. Science gave up.`,"gait:speedy":`Speedy. Walks like it has somewhere to be. It does not.`,"gait:sluggish":`Sluggish. Moves at the speed of a Sunday. Eyelids permanently at half-mast.`,"gait:jumpy":`Jumpy. Startles at leaves, crumbs, its own feet, and the concept of Tuesday.`,"gait:strutter":`Strutter. Chest out, knees high, every walk a runway.`,"gait:twirly":`Twirly. Stops now and then for a small, unprompted pirouette.`,"outfit:suit":`Business suit. Hatched in a two-piece and a tie. Already has opinions about synergy.`,"outfit:elvis":`Rhinestone jumpsuit. High collar, quiff, studs. The fountain is now a stage.`,"outfit:punk":`Punk leathers. Studded jacket and a mohawk. Refuses to coo on the beat.`,"outfit:tracksuit":`Tracksuit. Three stripes, zero intention of exercising.`,"outfit:hawaiian":`Hawaiian shirt. Permanently on holiday, emotionally and sartorially.`,"outfit:raincoat":`Raincoat. Bright yellow and ready for weather that rarely comes.`,"voice:trumpet":`Trumpeter voice. Jazz, unfortunately.`,"fantasy:rainbow":`Rainbow. Every colour, none of the restraint.`,"fantasy:toast":`Toasted. Crispy at the edges. Do not add butter.`,"fantasy:zebra":`Zebra stripes. Confuses predators and, frankly, everyone.`,"fantasy:sunset":`Sunset. Permanently 7:42pm on a nice evening in June.`,"crest:horn":`Unicorn horn. Magical, allegedly. Mostly used to open bread bags.`,"beak:duck":`Duck bill. Identity crisis in progress. Quack pending.`,"eye:googly":`Googly eyes. Wobble when it walks. Wobble when it thinks.`,"size:chonk":`Absolute unit. Structurally more loaf than bird.`,"neck:noodle":`Noodle neck. Head is in a different postcode to the feet.`},ad=`Nugget.Crumbsworth.Sir Reginald.Baguette.Sprinkles.Dave.Lord Coo.Madame Flapsby.Pigeon.Toast.Gregory.Beatrice.Waffles.Montgomery.Deborah.Captain.Gerald.Brenda.Kevin.Susan.Barry.Doreen.Nigel.Pam.Clive.Beryl.Trevor.Maude.Colin.Agnes.Derek.Gladys.Norman.Edith.Roger.Mavis.Keith.Olive.Alan.Joan.Gary.Ethel.Dennis.Vera.Stanley.Enid.Reginald.Petunia.Bartholomew.Wilhelmina.Chad.Karen.Steve.Linda`.split(`.`),od=`the Unwise(the Damp(of the Gutter(III(, Esq.(the Round(the Crumbless(who Screams(the Prophet(of the Bakery(the Unbothered(the Moist(Jr. Jr.(the Statue Fancier(of Bench Fame(the Twice-Blessed(the Suspicious(Breadwinner(the Vertical(the Auditor(von Coo(the Slightly Late(of the Roundabout(the Magnificent(the Lesser(the Greater(Who Has Seen Things(of the Bin(the Legally Distinct(the Unemployed(Destroyer of Chips(the Undercover Cop(the Unhinged(PhD(of LinkedIn(the Influencer(the Chronically Online(the Wet(Who Owes Money(the Theatre Kid(the Accountant(of the Car Park(the Twelfth(Formerly of the Zoo`.split(`(`);function sd(){let e=ad[Math.floor(W()*ad.length)];if(W()<.55){let t=od[Math.floor(W()*od.length)];return t.startsWith(`,`)?e+t:e+` `+t}return e}var cd=[`crumb?`,`the void coos back`,`bread is a construct`,`i am the moment`,`statue duty at 3`,`seeds. seeds. seeds.`,`who is Gerald`,`my feet are warm`,`behold me`,`i forgot the sky`,`benches fear me`,`crumb.`,`today i strut`,`the fountain lies`,`wing day`,`coo occurred`,`is this a bench`,`i could fly. i choose not to`,`my neck does the thing`,`bread. bread?? BREAD`,`i have no thoughts only coo`,`the sidewalk is my rival`,`i was a dinosaur once`,`do NOT look at my feet`,`who put this park here`,`im not a spy`,`i know what you did`,`mortgage??`,`the statue is my ex`,`must. find. chip.`,`i am in my flop era`,`i pay no taxes`,`everything is crumb`,`crunch time`,`wait whose egg`,`i am legally a dove`,`the fountain knows`,`emotionally, i am a swan`,`i just remembered the sky`,`what if bread... but more`,`no thoughts, head smooth`,`coo coo ca-choo`,`is anyone else vibrating`,`i peaked in 2019`,`loaf mode: activated`,`let me be clear: crumb`,`i think my feet are shoes`,`the pavement speaks to me`,`bench? bench.`,`a single fry. at last.`,`i have seen a sandwich`,`plot twist: i can read`,`reply all`,`per my last coo`,`this is my good side`,`i would die for a crust`,`somebody has to be the main character`,`i have beef with that duck`,`i contain multitudes (crumbs)`,`the ground is lava (it is not)`,`i should start a podcast`,`who is walking who here`,`my aura is 90% grey`,`i left the oven on. i do not have an oven`,`i am the pigeon your pigeon warned you about`,`if i fits i sits`,`tiny dinosaur, big dreams`,`my ancestors were in world war one`,`the benches are unionising`,`i saw a crumb in 2021 and never recovered`,`is it bread o'clock`,`i have a very specific set of skills (pecking)`,`somebody said bagel`,`i believe in gravel`,`neck forward. neck back. neck forward`,`i am simply vibing`,`the humans think they run this place`,`what is my purpose. oh. bread`,`we should unionise`,`i am in my villain arc`,`crumb economics`,`tell my wife i said coo`,`i am not lost i am exploring`,`this fountain is giving`,`i would like a refund on the sky`,`the squirrels are hiding something`,`i have 3 brain cells and they are all busy`,`my left foot is my favourite`,`hot take: seeds`,`i am absolutely unbothered`,`i am absolutely bothered`,`look at this pavement. incredible`,`does anyone want to fight (politely)`,`im going to walk in a small circle`,`who moved my crumb`,`every day is leg day`,`certified bench inspector`,`i am 40% feathers`,`the wind has betrayed me`,`i know kung coo`,`crumbs are just bread confetti`,`i will be a statue one day`,`trust no seagull`,`i should call my mother`,`i think i am famous`,`this is a pigeon-only zone`,`i am the chosen crumb finder`,`my other car is a bench`,`rent is due. rent is always due`,`i have never seen a baby pigeon. suspicious`,`please clap`,`i am once again asking for bread`,`what if the park is inside ME`,`thinking about that one fry`,`i accidentally walked backwards`,`i am speed (walking)`,`does this bench make me look fat`,`i was here first`,`is that a hawk or a bag`,`i have a meeting at the fountain`,`ok but hear me out: toast`,`i nodded 400 times today`,`feathers are just fancy hair`,`my horoscope said crumbs`,`im just a little guy`,`i demand to see the pigeon manager`,`wings are optional`,`i am doing my best`,`this is my personality now`,`i got here by walking. all of it`],ld=[`same`,`source?`,`ok gerald`,`valid`,`coo.`,`real`,`no`,`bestie…`,`and?`,`we know`,`shh`,`this`,`mood`,`huh`,`go off`,`bread?`,`ratio`,`wow`,`i also have feet`,`big if true`,`citation needed`,`deeply relatable`,`sir this is a fountain`,`noted`,`the audacity`,`i was just thinking that`,`lol`,`say less`,`not now`,`rude`,`respectfully, no`,`ok boomer`,`tell me more`,`huge`,`blocked`,`unfollowed`,`i disagree but politely`,`fair`,`go on…`,`coo coo (agreed)`,`we are so back`,`it's so over`,`touch grass`,`bold of you`],ud=[`is the moon bread`,`the lamps are watching`,`sleep is for doves`,`what is a star but a far crumb`,`the fountain whispers at night`,`nocturnal era`,`who turned the sky off`,`the moon looks like a crumb i knew`,`night shift, baby`,`i can see my house from here (no)`,`the stars are just far-away pigeons`,`shh the lamps are sleeping`,`why is it so dark (it is night)`,`i am an owl now`,`the benches are cold`,`dream of bread`,`bedtime is a social construct`,`is anyone else awake`,`something rustled`,`i will sleep when i am a statue`,`the fountain sounds louder at night`,`counting crumbs to fall asleep`,`midnight snack?`,`i heard a hoot. rival.`,`the dark is just the sky resting`,`tomorrow: bread`],dd=[`PUT ME DOWN`,`i am flying (not)`,`unhand me`,`this is kidnapping`,`wheee`,`i did not consent to this altitude`,`am i the chosen one`,`finally, recognition`,`my lawyer will hear of this`,`is this heaven`,`i can see the whole park`,`help (not really)`,`this is my first time flying first class`,`excuse me??`,`i am a very important bird`,`higher! higher!`,`where are we going`,`i will remember this`,`i knew you would pick me`,`mind the feathers`,`hands off the merch`,`is this about the crumb`,`weeeeee`,`i am being abducted (by a human)`,`call my agent`],fd=[`where am i`,`what is a pigeon`,`mama?`,`i know nothing`,`hello world`,`first coo!!`,`what are feet`,`i am new here`,`is that bread`,`big world`,`am i a pigeon`,`hi!!!!`,`what year is it`,`who are all these birds`,`i have questions`,`is the ground always this big`,`coo? coo!`,`i can walk?!`,`where is the manual`,`who ordered me`,`i am baby`,`feathers, huh`],pd=[`nice feet`,`u come here often`,`u like crumbs?`,`is that a bread in ur pocket`,`your coo is so loud`,`hey`,`marry me (for tax reasons)`,`wanna see my bench`,`are you a crumb because i want you`,`i would share my fry with you`,`your feathers are so grey`,`you had me at coo`,`let me buy you a seed`,`nice neck shimmer`,`i like the way you bob`,`is this seat taken`,`you + me + bench?`,`i saved you a crust`,`my heart goes coo coo`,`we should nest sometime`,`you look like a statue (compliment)`],md=[`excuse me`,`oof`,`watch it`,`sorry!`,`personal space`,`rude`,`after you`,`no, after YOU`,`beep beep`,`coming through`,`hey!`,`do you mind`,`pardon me`,`traffic`,`move`,`we are touching`,`mind the wing`,`bonk`,`i was walking here`];function hd(e,t=new Map){let n=t.get(e);n||t.set(e,n=[]);let r=Math.min(n.length,Math.floor(e.length/2)),i,a=0;do i=e[Math.floor(W()*e.length)];while(n.lastIndexOf(i)>=n.length-r&&++a<12);return n.push(i),n.length>e.length&&n.shift(),i}var gd={birth:[`A chick has been released into the wild. The wild is a car park.`,`Congratulations, it is a pigeon.`,`Another one. Nobody asked, everyone is delighted.`,`A pigeon has occurred.`,`New pigeon. It knows nothing.`,`The egg has opinions now.`,`One (1) pigeon, freshly issued.`,`A pigeon manifests, blinking.`,`Fresh pigeon. Handle with awe.`],flyoff:[`{n} has joined a band.`,`{n} went to find itself. It was in Belgium.`,`{n} has been headhunted.`,`{n} is off to haunt a train station.`,`{n} remembered an appointment.`,`{n} left to pursue jazz.`,`{n} has ascended. Normal reasons.`,`{n} heard a distant sandwich.`,`{n} left no forwarding address.`,`{n} is now a sky problem.`],dismiss:[`{n} was politely asked to leave.`,`{n} has been un-invited.`,`{n} will speak to a manager elsewhere.`,`{n} — escorted to the sky.`,`{n} is pursuing other flocks.`],clone:[`{n} has been xeroxed.`,`Science forgives us: {n} ×2.`,`The lab regrets nothing. Hello, {n}.`,`{n}, but again.`],full:[`No vacancy. The park has bylaws.`,`The park is at capacity. Someone must ascend first.`,`Fire code says no. The park is full.`],roostFull:[`The roost is full. Curate ruthlessly.`,`No perch left. Evict a favorite first.`],roosted:[`{n} moved into the roost. Rent: one coo.`,`{n} is now a kept bird.`,`{n} accepted the penthouse perch.`]};function _d(e){return e[Math.floor(W()*e.length)]}var G=_d,vd=e=>{for(let t=e.length-1;t>0;t--){let n=Math.floor(W()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e},yd=e=>e.pigeons.filter(e=>!e.flying&&!e.held&&!e.courting&&!e.busy&&!e.visitor),bd=(e,t,n,r=2.4)=>{t&&(t.emote={kind:`say`,text:n},t.emoteUntil=e.t+r)};function xd(e,t,n){for(let r of t)r.busy=n,r.stateAt=e.t;return t.map(e=>e.id)}function Sd(e,t){for(let n of t||[]){let t=e.byId(n);t&&(t.busy=null,t.state=`idle`,t.stateUntil=e.t+.3+W())}}var Cd=(e,t)=>t.map(t=>e.byId(t)).filter(e=>e&&!e.flying&&!e.held&&e.busy),wd={bread:{label:`Baguette drop`,blurb:`A tourist drops a baguette. The flock loses its mind.`,start(e){let[t,n]=e.clampToPark((W()-.5)*K.w*.8,(W()-.5)*K.d*.7);e.bread={x:t,z:n,hp:1,a:W()*Math.PI};let r=yd(e).slice(0,18);return e.toast(G([`A tourist dropped an entire baguette. Chaos is imminent.`,`BREAD. ON THE GROUND. THIS IS NOT A DRILL.`,`A baguette has entered the chat.`]),`event`),r.forEach((i,a)=>{let o=a/r.length*Math.PI*2;e.walkTo(i,t+Math.cos(o)*.45,n+Math.sin(o)*.3,.9),i.state=`walk`,bd(e,i,G([`BREAD`,`mine`,`MINE`,`crumb!!`,`go go go`]),1.5)}),{ids:xd(e,r,`bread`),until:e.t+40}},tick(e,t,n){let r=e.bread,i=Cd(e,t.ids),a=0;for(let e of i)Math.hypot(e.x-r.x,e.z-r.z)<.75&&(e.state!==`peck`&&(e.state=`peck`,e.stateAt=n,e.dir=Math.atan2(r.z-e.z,r.x-e.x)),a++);return r.hp-=a*.012,W()<.15&&i.length&&bd(e,G(i),G([`nom`,`crunch`,`this is my bread now`,`carbs!!`,`mmf`]),1.4),r.hp>0&&n<t.until&&i.length>0},end(e,t){e.bread=null,Sd(e,t.ids),e.toast(G([`The baguette is gone. It was beautiful.`,`Not a crumb remains. Legends will speak of this.`]),`event`)}},visitor:{label:`Out-of-town visitor`,blurb:`A rare breed drops in for a while. Clone it before it leaves.`,start(e){let t=Xu.filter(t=>t.real&&!e.breeds[t.id]),n=G(t.length?t:Xu.filter(e=>e.real));if(e.alive()>=e.cap)return null;let{genome:r,accessory:i}=rd(n),a=e.spawn({genome:r,accessory:i,name:`Visiting `+n.name,adult:!0,quiet:!0,x:(W()-.5)*K.w*.6,z:(W()-.2)*K.d*.5,dir:Math.PI/2,how:`visitor`});return a.y=3.5,a.visitor={leaveAt:e.t+50,breed:n.id},e.toast(`A ${n.name} is visiting from out of town. Clone it before it leaves!`,`breed`),e.sound(`chime`),{id:a.id,until:e.t+50}},tick(e,t,n){let r=e.byId(t.id);return r&&n>t.until-8&&!t.warned&&(t.warned=1,bd(e,r,`well, i must be off`,3)),!!r&&!r.flying&&n<t.until},end(e,t){let n=e.byId(t.id);n&&!n.flying&&!n.held&&(e.fly(n,!1),e.toast(`${n.name.replace(`Visiting `,`The `)} has gone home. It will not write.`))}},goldenegg:{label:`The golden egg`,blurb:`An egg nobody laid. It always hatches something strange.`,start(e){let t=e.pigeons.filter(e=>!e.flying);if(!t.length)return null;let n=Au(G(t).genome,G(t).genome,3).genome,r=[];for(let e of Cu)for(let t of Object.keys(e.mutOnly||{}))r.push([e.id,t]);let[i,a]=G(r);n[i]=[a,a];let[o,s]=e.clampToPark((W()-.5)*K.w*.7,(W()-.5)*K.d*.6);return e.eggs.push({id:e.ids++,x:o,z:s,genome:n,gen:e.stats.maxGen+1,laidAt:e.t,hatchAt:e.t+10,golden:!0}),e.sparkle(o,s,3),e.toast(G([`A golden egg has appeared. Nobody laid it. Nobody will admit to it.`,`An egg of pure gold sits in the plaza. It hums slightly.`]),`breed`),{until:e.t+11}},tick(e,t,n){return n<t.until},end(){}},conga:{label:`Conga line`,blurb:`Nobody knows who started it.`,when:e=>yd(e).length>=5,start(e){let t=vd(yd(e)).slice(0,7),n=K.w/2-.8,r=K.d/2-.6;return e.toast(`Conga line! Nobody knows who started it.`,`event`),{ids:xd(e,t,`conga`),way:[[n,r],[-n,r],[-n,-r],[n,-r]].map(([t,n])=>e.clampToPark(t,n)),wi:0,until:e.t+18}},tick(e,t,n){let r=Cd(e,t.ids);if(r.length<2)return!1;let i=r[0],[a,o]=t.way[t.wi%t.way.length];Math.hypot(i.x-a,i.z-o)<.3&&t.wi++;let[s,c]=t.way[t.wi%t.way.length];e.walkTo(i,s,c,.7);for(let t=1;t<r.length;t++){let n=r[t-1],i=n.dir+Math.PI;e.walkTo(r[t],n.x+Math.cos(i)*.5,n.z+Math.sin(i)*.5,.75)}return W()<.3&&bd(e,G(r),G([`♪`,`♪ ♪`,`da da da da da DAH`,`hup!`,`wooo`]),1.2),n<t.until},end(e,t){Sd(e,t.ids)}},gust:{label:`Gust of wind`,blurb:`Everyone is briefly a kite.`,start(e){let t=yd(e),n=W()<.5?-1:1;for(let r of t){let[t,i]=e.clampToPark(r.x+n*(1.6+W()),r.z+(W()-.5));r.tx=t,r.tz=i,r.v=1.5,r.state=`blown`}for(let n of t.slice(0,3))bd(e,n,G([`WHOA`,`aaaAAA`,`i am a kite now`,`not again`]),1.8);return e.toast(G([`A gust of wind. Everyone is briefly a kite.`,`Wind! The flock relocates, involuntarily.`]),`event`),e.sound(`whoosh`),{ids:xd(e,t,`gust`),until:e.t+2.6}},tick(e,t,n){return n<t.until},end(e,t){Sd(e,t.ids)}},statue:{label:`Statue duty`,blurb:`One pigeon practises being a statue. Very seriously.`,start(e){let t=G(yd(e));return t?(t.state=`statue`,bd(e,t,`i am a statue`,3),e.toast(`${t.name} is practising for statue duty. Do not disturb.`,`event`),{ids:xd(e,[t],`statue`),until:e.t+14}):null},tick(e,t,n){let[r]=Cd(e,t.ids);return r&&(r.state=`statue`),!!r&&n<t.until},end(e,t){bd(e,e.byId(t.ids[0]),G([`ok that was hard`,`nailed it`,`my legs are asleep`]),2),Sd(e,t.ids)}},parliament:{label:`Pigeon parliament`,blurb:`The flock convenes at the fountain to vote on bread.`,when:e=>yd(e).length>=6,start(e){let t=vd(yd(e)).slice(0,14),n=zd.lip+.75;t.forEach((r,i)=>{let a=i/t.length*Math.PI*2;e.walkTo(r,zd.x+Math.cos(a)*n,zd.z+Math.sin(a)*n,.55)});let r=G([`more bread`,`ban the seagulls`,`declare the fountain a sea`,`rename Tuesday to Crumbday`,`impeach the statue`,`mandatory naps`,`Gerald for president`]);return e.toast(`The pigeon parliament is now in session. Motion: ${r}.`,`event`),{ids:xd(e,t,`parliament`),speaker:t[0].id,motion:r,phase:0,until:e.t+22,voteAt:e.t+13}},tick(e,t,n){let r=Cd(e,t.ids);if(r.length<3)return!1;for(let e of r)(e.state===`idle`||e.state===`walk`&&Math.hypot(e.tx-e.x,e.tz-e.z)<.02)&&(e.state=`idle`,e.dir=Math.atan2(zd.z-e.z,zd.x-e.x));let i=e.byId(t.speaker);if(i&&n<t.voteAt&&W()<.35&&bd(e,i,G([`order! ORDER!`,`the motion is: `+t.motion,`i yield my time to crumbs`,`point of order: coo`,`hear hear`]),2.2),n>=t.voteAt&&!t.voted){t.voted=1;let n=0;for(let t of r){let r=W()<.65;n+=r,bd(e,t,G(r?[`aye!`,`AYE`,`coo (aye)`]:[`nay`,`boo`,`abstain`]),3)}t.passed=n>r.length/2}return n<t.until},end(e,t){e.toast(t.passed?`Motion passed: ${t.motion}. Democracy prevails.`:`Motion failed: ${t.motion}. The fountain weeps.`,`event`),Sd(e,t.ids)}},crisis:{label:`Existential moment`,blurb:`Everyone stops and stares into the middle distance.`,start(e){let t=yd(e);for(let e of t)e.state=`look`,e.dir=Math.PI/2+(W()-.5)*.6;for(let n of vd([...t]).slice(0,4))bd(e,n,G([`…`,`why are we here`,`what is a park`,`are we the baddies`,`the sky is so big`,`hm.`]),4);return e.toast(`An existential moment passes over the park.`,`event`),{ids:xd(e,t,`crisis`),until:e.t+6}},tick(e,t,n){for(let n of Cd(e,t.ids))n.state=`look`;return n<t.until},end(e,t){Sd(e,t.ids),e.toast(`The moment has passed. Everyone agrees not to talk about it.`)}},dance:{label:`Dance party`,blurb:`Someone put on a banger. Dancing is mandatory.`,start(e){let t=yd(e);for(let e of t)e.state=`dance`;return e.toast(e.night>.5?`Midnight disco! Someone put on a banger.`:`Someone put on a banger. Dancing is mandatory.`,`event`),{ids:xd(e,t,`dance`),until:e.t+12}},tick(e,t,n){let r=Cd(e,t.ids);for(let e of r)e.state=`dance`;if(W()<.5&&r.length){let t=G(r);e.sparkle(t.x,t.z,2)}return W()<.25&&r.length&&bd(e,G(r),G([`♪`,`woo!`,`this slaps`,`feel the beat`,`my jam`,`♪ ♫ ♪`]),1.4),W()<.3&&e.sound(`chime`),n<t.until&&r.length>0},end(e,t){Sd(e,t.ids)}},moonwalk:{label:`Moonwalk`,blurb:`At night, someone moonwalks across the plaza.`,when:e=>e.night>.5,start(e){let t=G(yd(e));if(!t)return null;let[n,r]=e.clampToPark(-Math.sign(t.x||1)*(K.w/2-1),t.z);return t.tx=n,t.tz=r,t.v=.45,t.state=`moonwalk`,bd(e,t,G([`hee-hee`,`shamone`,`watch this`]),2.4),e.toast(`${t.name} is moonwalking. Nobody taught it that.`,`event`),{ids:xd(e,[t],`moonwalk`),until:e.t+14}},tick(e,t,n){let[r]=Cd(e,t.ids);return r&&Math.hypot(r.tx-r.x,r.tz-r.z)>.05&&(r.state=`moonwalk`),!!r&&n<t.until&&r.state===`moonwalk`},end(e,t){Sd(e,t.ids)}}};Object.assign(wd,{seagull:{label:`Seagull sighting`,blurb:`A "seagull" swaggers in. It is a large white pigeon in disguise. The flock panics anyway.`,start(e){if(e.alive()>=e.cap)return null;let t=mf({pied:`white`,size:`king`,beak:`long`,eye:`pearl`}),n=e.spawn({genome:t,name:`Definitely A Seagull`,adult:!0,quiet:!0,x:K.w/2-.6,z:0,dir:Math.PI,how:`visitor`});return n.y=3,n.visitor={leaveAt:e.t+24},n.busy=`seagull`,bd(e,n,`MINE`,2.5),e.toast(G([`A seagull has landed. Hide your chips.`,`SEAGULL. Everyone act natural.`]),`event`),{id:n.id,until:e.t+22}},tick(e,t,n){let r=e.byId(t.id);if(!r||r.flying)return!1;if(r.state!==`walk`||Math.hypot(r.tx-r.x,r.tz-r.z)<.1){let[t,n]=e.randomSpot();e.walkTo(r,t,n,.55)}W()<.2&&bd(e,r,G([`MINE`,`mine?`,`i am a seagull`,`squawk (normal seagull noise)`,`give chips`]),1.8);for(let t of yd(e))if(Math.hypot(t.x-r.x,t.z-r.z)<1.8){let n=Math.atan2(t.z-r.z,t.x-r.x);e.walkTo(t,t.x+Math.cos(n)*1.6,t.z+Math.sin(n)*1.6,.9),W()<.15&&bd(e,t,G([`AAA`,`run`,`not today`,`it has a BEAK`]),1.2)}return n<t.until},end(e,t){let n=e.byId(t.id);n&&!n.flying&&!n.held&&(n.busy=null,e.fly(n,!1)),e.toast(G([`The seagull has left. It was, and we cannot stress this enough, a pigeon.`,`Seagull gone. Nobody mention the costume.`]))}},zoomies:{label:`Zoomies`,blurb:`One pigeon does laps around the fountain for no reason.`,start(e){let t=G(yd(e));return t?(bd(e,t,G([`NYOOM`,`gotta go fast`,`zoom zoom`]),2),e.toast(`${t.name} has the zoomies.`,`event`),{ids:xd(e,[t],`zoomies`),a:Math.atan2(t.z-zd.z,t.x-zd.x),until:e.t+9}):null},tick(e,t,n){let[r]=Cd(e,t.ids);if(!r)return!1;t.a+=.9;let i=zd.lip+.8;return e.walkTo(r,zd.x+Math.cos(t.a)*i,zd.z+Math.sin(t.a)*i,2.2),W()<.15&&bd(e,r,G([`NYOOM`,`wheee`,`lap `+Math.ceil((n-t.until+9)/1.5)]),1),n<t.until},end(e,t){bd(e,e.byId(t.ids[0]),G([`phew`,`i have no regrets`,`dizzy`]),2),Sd(e,t.ids)}},staring:{label:`Staring contest`,blurb:`Two pigeons lock eyes. A crowd gathers. Somebody will blink.`,when:e=>yd(e).length>=4,start(e){let[t,n,...r]=vd(yd(e)),[i,a]=e.clampToPark((t.x+n.x)/2,(t.z+n.z)/2);e.walkTo(t,i-.3,a,.6),e.walkTo(n,i+.3,a,.6);let o=r.slice(0,7);return o.forEach((t,n)=>{let r=n/o.length*Math.PI*2;e.walkTo(t,i+Math.cos(r)*1.3,a+Math.sin(r)*1.1,.6)}),e.toast(`Staring contest: ${t.name} vs ${n.name}. Do not blink.`,`event`),{ids:xd(e,[t,n,...o],`staring`),a:t.id,b:n.id,cx:i,cz:a,at:e.t,until:e.t+14}},tick(e,t,n){let r=Cd(e,t.ids),i=e.byId(t.a),a=e.byId(t.b);if(!i||!a||!i.busy||!a.busy)return!1;for(let e of r)e.state===`idle`&&(e.dir=Math.atan2(t.cz-e.z,t.cx-e.x));return n-t.at>3&&(i.state=a.state=`stare`,i.dir=0,a.dir=Math.PI),W()<.15&&bd(e,G(r.filter(e=>e!==i&&e!==a))||i,G([`ooh`,`intense`,`my money is on the left one`,`dont blink`,`…`]),1.3),n<t.until},end(e,t){let n=e.byId(t.a),r=e.byId(t.b);if(n&&r){let[t,i]=W()<.5?[n,r]:[r,n];bd(e,i,`i blinked`,2.5),bd(e,t,`victory`,2.5),e.toast(`${t.name} wins the staring contest. ${i.name} blinked first.`,`event`)}Sd(e,t.ids)}},synchro:{label:`Synchronised pecking`,blurb:`Everyone pecks in perfect unison. They have been practising.`,start(e){let t=yd(e);for(let e of t)e.state=`sync`,e.dir=Math.PI/2;return e.toast(`Synchronised pecking. They have clearly been practising.`,`event`),{ids:xd(e,t,`synchro`),t0:e.t,until:e.t+9}},tick(e,t,n){for(let n of Cd(e,t.ids))n.state=`sync`,n.stateAt=t.t0;return W()<.2&&e.sound(`pop`),n<t.until},end(e,t){Sd(e,t.ids),e.toast(`The judges award it a 9.4.`)}},ufo:{label:`Close encounter`,blurb:`A flying saucer borrows a pigeon. It comes back with a hat.`,start(e){let t=G(yd(e));return t?(e.ufo={x:t.x,z:t.z,y:9,beam:0},t.state=`abducted`,t.ty=0,e.toast(G([`A flying saucer is hovering over the park. Stay calm.`,`UFO! Everyone look busy.`]),`event`),{ids:xd(e,[t],`ufo`),at:e.t,until:e.t+13}):null},tick(e,t,n){let[r]=Cd(e,t.ids),i=e.ufo,a=n-t.at;return!r||!i?!1:(i.y=Math.max(3.2,9-a*3),i.x+=(r.x-i.x)*.3,i.z+=(r.z-i.z)*.3,i.beam=+(a>2&&a<11),r.state=`abducted`,a<2?r.ty=0:a<6?r.ty=2.6:a<7.5?(r.ty=2.6,t.hat||(t.hat=G(Object.keys(Wu).filter(e=>!Ku(r.accessory).includes(e))),e.setAccessory(r,qu(r.accessory,t.hat)))):r.ty=0,a>3&&a<4&&bd(e,r,G([`take me to your breadder`,`wheeeee`,`hello?`]),1.5),n<t.until)},end(e,t){let n=e.byId(t.ids[0]);e.ufo=null,n&&(n.ty=0,bd(e,n,G([`i have seen things`,`they were nice actually`,`do not ask`]),3),e.toast(`${n.name} is back, wearing a ${Wu[t.hat]?.label.toLowerCase()||`new look`}. It will not discuss it.`,`breed`)),Sd(e,t.ids)}},rain:{label:`Light drizzle`,blurb:`It rains a bit. Everyone turns into a loaf.`,start(e){let t=yd(e);for(let e of t)e.state=`loaf`;return e.rain=1,e.toast(`A light drizzle. Everyone becomes a loaf.`,`event`),{ids:xd(e,t,`rain`),until:e.t+18}},tick(e,t,n){for(let n of Cd(e,t.ids))n.state=`loaf`;return W()<.08&&bd(e,G(Cd(e,t.ids)),G([`i am a loaf`,`wet`,`this is fine`,`i hate this`]),1.6),n<t.until},end(e,t){e.rain=0,Sd(e,t.ids),e.toast(`The sun is back. Everyone pretends nothing happened.`)}},runway:{label:`Pigeon Fashion Week`,blurb:`The best-dressed birds strut a runway down the middle of the plaza.`,when:e=>yd(e).length>=3,start(e){let t=yd(e).sort((e,t)=>t.pheno.traits.length+(t.accessory?3:0)-(e.pheno.traits.length+(e.accessory?3:0))).slice(0,5);return t.forEach((t,n)=>{e.walkTo(t,-K.w/2+.6,-K.d/2+.8+n*.15,.7)}),e.toast(`Pigeon Fashion Week begins. Strike a pose.`,`event`),{ids:xd(e,t,`runway`),at:e.t,until:e.t+26}},tick(e,t,n){let r=t.ids.map(t=>e.byId(t)),i=n-t.at;return r.forEach((t,n)=>{if(!t||t.flying||t.held||!t.busy)return;let r=4+n*3.5;i>r&&i<r+.5&&e.walkTo(t,0,K.d/2-.9,.75),i>r+5&&i<r+5.5&&(t.state=`idle`,t.dir=Math.PI/2,bd(e,t,G([`✨ serve ✨`,`werk`,`look at me`,`couture`,`this is vintage`]),1.8),e.sparkle(t.x,t.z,1)),i>r+7&&i<r+7.5&&e.walkTo(t,K.w/2-.6,K.d/2-.8-n*.2,.75)}),n<t.until},end(e,t){Sd(e,t.ids),e.toast(`Fashion Week is over. The judges are still crying.`)}}});function Td(e,t){let n=Ju(t.accessory);if(n.length&&W()<.45){let r=Yu(1,n);return e.setAccessory(t,qu(t.accessory,r)),`${Wu[r].label.toLowerCase()}`}let r=[];for(let e of Cu)for(let n of Object.keys(e.mutOnly||{}))t.genome[e.id].includes(n)||r.push([e.id,n]);if(!r.length)return null;let[i,a]=G(r),o=structuredClone(t.genome),s=W()<.7;o[i]=s?[a,a]:[o[i][0],a],e.regene(t,o);let c=Du[i+`:`+a]?.label||a;return s?c.toLowerCase():`a hidden gift (carries ${c.toLowerCase()})`}Object.assign(wd,{goddess:{label:`Pigeon goddess`,blurb:`A radiant pigeon goddess descends, and a few lucky birds are blessed with mutations or finery.`,when:e=>yd(e).length>=3,start(e){let t=yd(e),n=vd([...t]).slice(0,3+Math.floor(W()*4));e.goddess={x:1.6,z:-1.5,y:14,beam:null};for(let e of t)e.state=`look`;return e.toast(G([`The sky opens. A pigeon goddess descends. Everyone is very quiet.`,`A radiant pigeon goddess appears above the fountain. Blessings are imminent.`]),`event`),e.sound(`chime`),{ids:xd(e,t,`goddess`),chosen:n.map(e=>e.id),at:e.t,next:e.t+3.4,i:0,until:e.t+17}},tick(e,t,n){let r=e.goddess;if(!r)return!1;let i=n-t.at,a=t.until-n,o=e=>e*e*(3-2*e),s=1.1;r.y=i<3?14-12.9*o(i/3):a<2.5?s+12.9*o(1-a/2.5):s+Math.sin(i*1.3)*.15;for(let n of Cd(e,t.ids))n.state!==`jump`&&(n.state=`look`),n.dir=Math.atan2(r.z-n.z,r.x-n.x);if(r.beam&&n>r.beam.until&&(r.beam=null),n>=t.next&&t.i<t.chosen.length&&a>3){let i=e.byId(t.chosen[t.i++]);if(t.next=n+1.6,i&&!i.flying&&!i.held){let t=Td(e,i);r.beam={x:i.x,z:i.z,until:n+1.2},e.sparkle(i.x,i.z,3),e.sound(`chime`),t&&(e.toast(`The goddess blesses ${i.name} with ${t}.`,`breed`),bd(e,i,G([`i feel different`,`ooh`,`blessed`,`thank u mother`,`sparkly`,`i am chosen`]),2.4))}}return W()<.12&&bd(e,G(Cd(e,t.ids)),G([`ooh`,`mother?`,`so shiny`,`pick me`,`is that god`,`aaaah (choir)`]),1.6),n<t.until},end(e,t){e.goddess=null,Sd(e,t.ids),e.toast(G([`The goddess ascends. The park smells faintly of bread.`,`The goddess is gone. The blessed are insufferable already.`]))}}});var Ed=[{id:`off`,label:`Off`,gap:1/0},{id:`some`,label:`Some`,gap:1},{id:`lots`,label:`Lots`,gap:.4}];function Dd(e){let t=e.t,n=e.happening;if(n){let r=!1;try{r=wd[n.kind].tick(e,n,t)}catch{r=!1}r||(wd[n.kind].end(e,n),e.happening=null,e.nextHappeningAt=t+kd(e));return}t<e.nextHappeningAt||e.alive()<3||Od(e,G(Object.keys(wd).filter(t=>!wd[t].when||wd[t].when(e))))}function Od(e,t){if(!wd[t])return!1;e.happening&&=(wd[e.happening.kind].end(e,e.happening),null);let n=wd[t].start(e);return e.nextHappeningAt=e.t+kd(e),n?(e.happening={kind:t,at:e.t,...n},e.stats.happenings=(e.stats.happenings||0)+1,e.emit({type:`happening`,kind:t}),!0):!1}function kd(e){let t=(Ed.find(t=>t.id===e.whimsy)||Ed[1]).gap;return t===1/0?1/0:(70+W()*70)*t}var Ad=e=>Object.keys(e.breeds).length,jd=(e,t)=>Xu.some(n=>e.breeds[n.id]&&t(n)),Md=(e,t)=>({test:n=>t(n)>=e,progress:n=>[Math.min(e,t(n)),e]}),Nd=[{id:`firstbreed`,name:`First Registration`,monument:`statue`,how:`Discover your first breed.`,blurb:`A modest stone pigeon, erected by the Pigeon Fanciers’ Society to mark your first entry in the Registry.`,...Md(1,Ad)},{id:`breeds5`,name:`Budding Fancier`,monument:`birdbath`,how:`Discover 5 breeds.`,blurb:`A bronze bird bath. The pigeons refuse to bathe in it. It is for looking at.`,...Md(5,Ad)},{id:`breeds10`,name:`Serious Fancier`,monument:`topiary`,how:`Discover 10 breeds.`,blurb:`A hedge, trimmed lovingly into the shape of a pigeon. The real pigeons find it threatening.`,...Md(10,Ad)},{id:`breeds25`,name:`Master Breeder`,monument:`gold`,how:`Discover 25 breeds.`,blurb:`A solid gold pigeon on a marble plinth. Tourists rub its head for luck. It hates that.`,...Md(25,Ad)},{id:`breeds50`,name:`Living Legend`,monument:`obelisk`,how:`Discover 50 breeds.`,blurb:`An obelisk, visible from space if you squint, topped with a pigeon who is extremely proud of this.`,...Md(50,Ad)},{id:`allbreeds`,name:`The Complete Registry`,monument:`trophy`,how:`Discover all ${Xu.length} breeds.`,blurb:`The Golden Crumb. Only one exists. It is enormous. It is yours.`,...Md(Xu.length,Ad)},{id:`cryptid`,name:`Cryptozoologist`,monument:`runestone`,how:`Discover your first cryptid.`,blurb:`A standing stone that hums at night. Nobody installed it. It was simply there one morning.`,test:e=>jd(e,e=>!e.real&&!e.legend),progress:e=>[+!!jd(e,e=>!e.real&&!e.legend),1]},{id:`legend`,name:`Summoner`,monument:`monolith`,how:`Bring a legendary pigeon into the park.`,blurb:`A black monolith full of stars. The pigeons gather at it and coo in a slightly different key.`,test:e=>jd(e,e=>e.legend),progress:e=>[+!!jd(e,e=>e.legend),1]},{id:`exotic`,name:`Globetrotter`,monument:`globe`,how:`Discover an exotic breed.`,blurb:`A globe with a pigeon on top, pointing (with its whole body) at somewhere very far away.`,test:e=>jd(e,e=>e.exotic),progress:e=>[+!!jd(e,e=>e.exotic),1]},{id:`naturalist`,name:`Field Naturalist`,monument:`books`,how:`Fill in half of the Pigeonpedia.`,blurb:`A stack of field guides in bronze. The top one is open to a page that just says “coo”.`,...Md(Math.ceil(Object.keys(id).length/2),e=>Object.keys(e.discovered).length)},{id:`dynasty`,name:`Dynasty`,monument:`familytree`,how:`Breed a line 10 generations deep.`,blurb:`A wrought-iron family tree. The leaves are gold. The drama is also gold.`,...Md(10,e=>e.stats.maxGen)},{id:`hatchery`,name:`The Hatchery`,monument:`egg`,how:`Hatch 100 chicks.`,blurb:`A giant marble egg in a bronze nest. Everyone is waiting for it to hatch. It will not.`,...Md(100,e=>e.stats.births)},{id:`fullroost`,name:`Full House`,monument:`minicote`,how:`Fill every perch in the Roost.`,blurb:`A tiny dovecote for tiny dignitaries. Mostly used by the Crouton.`,...Md(8,e=>e.roost.length)},{id:`weird`,name:`Weirdness Witness`,monument:`spiral`,how:`Witness 10 weird happenings.`,blurb:`A rainbow sculpture of no particular shape. The council calls it “art”. The pigeons call it “a perch”.`,...Md(10,e=>e.stats.happenings||0)}],Pd=[[-8.5,.9],[8.5,.9],[-8.5,-1.1],[8.5,-1.1],[-1.9,-6.8],[1.9,-6.8],[-8.5,3],[8.5,3],[-8.5,-3.2],[8.5,-3.2],[-5.6,-6.8],[5.6,-6.8],[-8,6],[8,6]];function Fd(e,t=!1){let n=[];for(let r of Nd)if(!e.achievements[r.id]&&r.test(e)&&(e.achievements[r.id]={at:Date.now()},n.push(r.id),!t)){let[t,n]=Pd[Nd.indexOf(r)];e.toast(`🏆 ${r.name} — a monument has appeared at the edge of the park.`,`breed`),e.sound(`chime`),e.sparkle(t,n,3),e.emit({type:`achievement`,id:r.id})}return t&&n.length&&e.toast(`${n.length} monument${n.length>1?`s were`:` was`} built in your honour while you were away.`,`note`),n}var Id=1/30,Ld=.45,Rd=170,K={w:10.4,d:6.6},zd={x:-1.7,z:-.8,r:1.3,lip:1.42},Bd={back:.5,front:.31,half:.15},Vd={king:1.42,dinky:.68,chonk:1.25};function Hd(e){return(Vd[e.pheno.e.size]||1)*(e.jit||1)}function Ud(e){let t=Hd(e),n=Math.cos(e.dir),r=Math.sin(e.dir),i=e.x-n*Bd.back*t,a=e.z-r*Bd.back*t,o=e.x+n*Bd.front*t,s=e.z+r*Bd.front*t,c=o-i,l=s-a,u=Math.max(0,Math.min(1,((zd.x-i)*c+(zd.z-a)*l)/(c*c+l*l))),d=i+c*u,f=a+l*u,p=Math.hypot(d-zd.x,f-zd.z);return{gap:p-(zd.lip+Bd.half*t),qx:d,qz:f,d:p}}var Wd={back:.3,front:.17,r:.11},Gd=.02,Kd=.01,qd=.75,Jd=new Set([`walk`,`moonwalk`,`roll`,`blown`]),Yd={speedy:1.55,sluggish:.6,strutter:.85},Xd={speedy:.6,sluggish:1.7},Zd=(e,t)=>e.x-t.x,Qd=e=>e<9?.58:e<18?.78:1;function $d(e,t,n={}){let r=Hd(e)*Qd(t-e.born),i=Math.cos(e.dir),a=Math.sin(e.dir);return n.ax=e.x-i*Wd.back*r,n.az=e.z-a*Wd.back*r,n.bx=e.x+i*Wd.front*r,n.bz=e.z+a*Wd.front*r,n.r=Wd.r*r,n.reach=(Wd.back+Wd.r)*r,n}function ef(e,t){let n=e.bx-e.ax,r=e.bz-e.az,i=t.bx-t.ax,a=t.bz-t.az,o=e.ax-t.ax,s=e.az-t.az,c=n*n+r*r,l=n*i+r*a,u=i*i+a*a,d=n*o+r*s,f=i*o+a*s,p=c*u-l*l,m=p<1e-9?0:cf((l*f-u*d)/p,0,1),h=u<1e-9?0:(l*m+f)/u;h<0?(h=0,m=c<1e-9?0:cf(-d/c,0,1)):h>1&&(h=1,m=c<1e-9?0:cf((l-d)/c,0,1));let g=e.ax+n*m-(t.ax+i*h),_=e.az+r*m-(t.az+a*h),v=Math.hypot(g,_);if(v>1e-6)return{d:v,nx:g/v,nz:_/v};let y=(e.ax+e.bx-t.ax-t.bx)/2,b=(e.az+e.bz-t.az-t.bz)/2,x=Math.hypot(y,b)||1;return{d:0,nx:x>1e-6?y/x:1,nz:x>1e-6?b/x:0}}var tf={x:8.9,z:-6.5},nf=13,rf=.0066,af=1.4,of=[{id:`stroll`,label:`Stroll`,v:.5},{id:`normal`,label:`Normal`,v:1},{id:`bustling`,label:`Bustling`,v:1.7},{id:`frantic`,label:`Frantic`,v:2.5}],sf=[{id:`calm`,label:`Calm`,v:.5},{id:`normal`,label:`Normal`,v:1},{id:`chaos`,label:`Chaos`,v:3}],cf=(e,t,n)=>Math.max(t,Math.min(n,e));function lf(e){return e<.55?0:e<.62?(e-.55)/.07:e<.88?1:e<.95?1-(e-.88)/.07:0}var uf=[[0,7],[.55,18],[.62,20],[.88,29],[1,31]];function df(e){e=(e%1+1)%1;for(let t=1;t<uf.length;t++){let[n,r]=uf[t-1],[i,a]=uf[t];if(e<=i)return(r+(a-r)*(e-n)/(i-n))%24}return 7}function ff(e){e=(e%24+24)%24,e<7&&(e+=24);for(let t=1;t<uf.length;t++){let[n,r]=uf[t-1],[i,a]=uf[t];if(e<=a)return n+(i-n)*(e-r)/(a-r)}return 0}function pf(e){let t=0,n=JSON.stringify(e);for(let e=0;e<n.length;e++)t=t*31+n.charCodeAt(e)|0;return t>>>0}function mf(e){let t={};for(let e of Cu)t[e.id]=[wu[e.id],wu[e.id]];for(let[n,r]of Object.entries(e))t[n]=Array.isArray(r)?[...r]:[r,r];return t}var hf=class{constructor(){this.reset()}reset(){this.t=0,this.wall=0,this.phase0=.16,this.thinkAcc=0,this.ids=1,this.pigeons=[],this.eggs=[],this.poops=[],this.roost=[],this.discovered={},this.breeds={},this.family={},this.lids=1,this.pruneAt=60,this.stats={births:0,flown:0,maxGen:1,happenings:0},this.achievements={},this.court=null,this.selId=null,this.cap=45,this.speed=1,this.mut=`normal`,this.poopEnabled=!0,this.events=[],this.ready=!1,this.happening=null,this.nextHappeningAt=55,this.whimsy=`some`,this.bread=null,this.ufo=null,this.goddess=null,this.rain=0,this.replies=[],this.said=new Map,this.night=lf(this.phase())}phase(){return((this.phase0+this.wall/Rd)%1+1)%1}hour(){return df(this.phase())}setTimeOfDay(e){this.phase0=ff(e)-this.wall/Rd,this.night=lf(this.phase())}mutF(){return(sf.find(e=>e.id===this.mut)||sf[1]).v}age(e){return this.t-e.born}adult(e){return this.age(e)>nf}emit(e){this.events.push(e),this.events.length>200&&this.events.shift()}toast(e,t=`plain`){this.emit({type:`toast`,msg:e,kind:t})}sound(e,t){this.emit({type:`sound`,name:e,...t})}sparkle(e,t,n){this.emit({type:`sparkle`,x:e,z:t,tier:n})}byId(e){return this.pigeons.find(t=>t.id===e)}clampToPark(e,t){e=cf(e,-K.w/2,K.w/2),t=cf(t,-K.d/2,K.d/2);let n=zd.lip+.3,r=e-zd.x,i=t-zd.z,a=Math.hypot(r,i);if(a<n){let o=n/(a||1);e=zd.x+(a?r:1)*o,t=zd.z+i*o}return[e,t]}keepOut(e){let t=e.x-zd.x,n=e.z-zd.z,r=zd.lip+1.3;if(t*t+n*n>r*r)return!1;let i=Ud(e);if(i.gap>=0)return!1;let a=i.qx-zd.x,o=i.qz-zd.z,s=i.d;return s<1e-6&&(a=e.x-zd.x,o=e.z-zd.z,s=Math.hypot(a,o)||1),e.x+=a/s*-i.gap,e.z+=o/s*-i.gap,e.x=cf(e.x,-K.w/2,K.w/2),e.z=cf(e.z,-K.d/2,K.d/2),!0}randomSpot(){for(let e=0;e<6;e++){let e=(W()-.5)*K.w,t=(W()-.5)*K.d;if(Math.hypot(e-zd.x,t-zd.z)>zd.lip+.5)return this.clampToPark(e,t)}return this.clampToPark((W()-.5)*K.w,(W()-.5)*K.d)}spawn({genome:e,accessory:t=null,name:n,gen:r=1,adult:i=!1,x:a,z:o,quiet:s=!1,dir:c,lid:l,how:u=`founder`,par:d=null,of:f}){Tu(e);let p=Fu(e,t);a===void 0||o===void 0?[a,o]=this.randomSpot():[a,o]=this.clampToPark(a,o);let m={id:this.ids++,name:n,genome:e,accessory:t,pheno:p,gen:r,jit:.93+pf(e)%1e3/1e3*.16,born:i?this.t-60:this.t,x:a,z:o,y:0,tx:a,tz:o,v:0,dir:c===void 0?W()<.5?0:Math.PI:c,state:`idle`,stateUntil:this.t+.4+W()*1.5,stateAt:this.t,emote:null,emoteUntil:0,courting:!1,flying:!1,flyAt:0,held:!1,breeds:Zu(p),lid:l??this.lids++};return this.family[m.lid]||(this.family[m.lid]={n,g:Hu(e),a:t,ge:r,par:d,how:u,...f?{of:f}:{}}),this.keepOut(m),this.pigeons.push(m),this.stats.maxGen=Math.max(this.stats.maxGen,m.gen),s||this.notice(m),m}notice(e){for(let t of e.pheno.traits)id[t.key]&&!this.discovered[t.key]&&(this.discovered[t.key]=1,this.toast(`Field note unlocked: `+t.label,`note`));for(let t of e.breeds)this.breeds[t.id]||(this.breeds[t.id]={by:e.name,at:Date.now()},this.toast(`BREED DISCOVERED — `+t.name+`!`,`breed`),this.sound(`chime`),this.sparkle(e.x,e.z,3),this.emit({type:`breed`,id:t.id,pid:e.id}))}initFlock(e){if(this.ready=!0,e&&e.pigeons&&e.pigeons.length){e.pigeons.slice(0,this.cap).forEach(e=>{let t=this.spawn({genome:e.g,accessory:e.a,name:e.n,gen:e.ge||1,adult:!0,quiet:!0,x:e.x,z:e.z,lid:e.l,how:`unknown`});e.d!=null&&(t.dir=e.d)});return}for(let e=0;e<7;e++){let t=ku();e===1&&(t.crest=[`none`,`shell`]),e===2&&(t.tail=[`normal`,`fantail`]),e===3&&(t.dilute=[`full`,`dilute`]),e===4&&(t.pied=[`splash`,`splash`]),e===5&&(t.muffs=[`clean`,`muffed`]),this.spawn({genome:t,name:sd(),gen:1,adult:!0,quiet:!0})}}walkTo(e,t,n,r){[t,n]=this.clampToPark(t,n),e.tx=t,e.tz=n,e.v=r*(Yd[e.pheno.e.gait]||1);let i=Math.hypot(t-e.x,n-e.z);e.state=`walk`,e.stateAt=this.t,e.stateUntil=this.t+Math.max(.4,i/r),i>.01&&(e.dir=Math.atan2(n-e.z,t-e.x))}fly(e,t){e.flying=!0,e.flyAt=this.t,e.state=`fly`,e.emote=null,e.courting=!1,e.held=!1,e.fdx=W()<.5?-1:1,this.stats.flown++,this.sound(`whoosh`),t&&this.toast(_d(gd.flyoff).replace(`{n}`,e.name)),this.selId===e.id&&(this.selId=null,this.emit({type:`deselect`}))}step(){let e=Id*this.speed;for(this.wall+=Id,this.t+=e,this.move(e),this.thinkAcc+=e;this.thinkAcc>=Ld;){this.thinkAcc-=Ld,this.think();for(let e of this.pigeons)!e.flying&&!e.held&&this.keepOut(e);this.separate(!1)}}move(e){for(let t of this.pigeons)if(!t.held){if(t.flying){let n=this.t-t.flyAt;t.y=.2+n*n*2.2+n*1.2,t.x+=t.fdx*e*1.6,t.z-=e*1.1,t.dir=t.fdx>0?-.35:Math.PI+.35;continue}if(t.state===`abducted`){t.y+=((t.ty||0)-t.y)*Math.min(1,e*1.6);continue}if(t.state===`hop`&&t.hop){let e=t.hop,n=Math.min(1,(this.t-e.at)/e.dur);t.x=e.x0+(t.tx-e.x0)*n,t.z=e.z0+(t.tz-e.z0)*n,t.y=Math.sin(n*Math.PI)*e.h,n>=1&&(t.y=0,t.hop=null,t.state=`idle`,t.stateUntil=this.t+.6+W(),this.keepOut(t));continue}if(t.y>0&&(t.y=Math.max(0,t.y-e*3)),t.state===`walk`||t.state===`roll`||t.state===`blown`||t.state===`moonwalk`){let n=t.x,r=t.z,i=t.tx-t.x,a=t.tz-t.z,o=Math.hypot(i,a),s=t.v*e;if(o<=s?(t.x=t.tx,t.z=t.tz,!t.courting&&(t.state===`walk`||t.state===`moonwalk`)&&(t.state=`idle`)):(t.x+=i/o*s,t.z+=a/o*s,t.state===`walk`?t.dir=Math.atan2(a,i):t.state===`moonwalk`&&(t.dir=Math.atan2(a,i)+Math.PI)),t.x=cf(t.x,-K.w/2,K.w/2),t.z=cf(t.z,-K.d/2,K.d/2),this.keepOut(t)&&t.state===`walk`){let e=t.x-n,i=t.z-r;Math.hypot(e,i)>s*.3&&(t.dir=Math.atan2(i,e),this.keepOut(t))}}else this.keepOut(t)}this.separate()}separate(e=!0){let t=this._solid||=[],n=this._cores||=[];t.length=0;for(let e of this.pigeons)!e.flying&&!e.held&&e.state!==`abducted`&&e.y<.3&&t.push(e);let r=t.length,i=this.court;for(let e=0;e<3;e++){t.sort(Zd);let e=0;for(let i=0;i<r;i++)n[i]=$d(t[i],this.t,n[i]),e=Math.max(e,n[i].reach);let a=!1;for(let o=0;o<r;o++){let s=t[o],c=n[o],l=s.x+c.reach+e;for(let e=o+1;e<r;e++){let r=t[e];if(r.x>l)break;let o=n[e],u=c.reach+o.reach,d=s.x-r.x,f=s.z-r.z;if(d*d+f*f>u*u||i&&(i.a===s.id&&i.b===r.id||i.a===r.id&&i.b===s.id))continue;let p=ef(c,o),m=c.r+o.r-Gd-p.d;if(m<=0)continue;let h=Jd.has(s.state),g=Jd.has(r.state),_=h===g?.5:h?qd:.25,v=h?m*_:Math.min(m*_,Kd),y=g?m*(1-_):Math.min(m*(1-_),Kd);s.x+=p.nx*v,s.z+=p.nz*v,r.x-=p.nx*y,r.z-=p.nz*y,s.bump=r.bump=!0,a=!0}}if(!a)break;for(let e of t)e.bump&&=(e.x=cf(e.x,-K.w/2,K.w/2),e.z=cf(e.z,-K.d/2,K.d/2),this.keepOut(e),e.blockedNow=!0,!1)}if(!e){for(let e of t)e.blockedNow=!1;return}for(let e of t){let t=e.state===`walk`,n=t?Math.hypot(e.tx-e.x,e.tz-e.z):0,r=t&&e.prevD!=null?e.prevD-n:0;e.prevD=t?n:null;let i=e.blockedNow&&(!t||r<e.v*.03333333333333333*this.speed*.25);if(e.blockedNow=!1,!i||e.courting||e.busy||e.visitor||e.state===`sleep`||e.state===`hop`){e.stuck&&=Math.max(0,e.stuck-2);continue}if(e.stuck=(e.stuck||0)+1,e.stuck>(t?30:75)){if(e.stuck=0,e.prevD=null,t&&!(this.t-(e.reroutedAt??-99)<6)){e.reroutedAt=this.t;let[t,n]=this.randomSpot();this.walkTo(e,t,n,e.v),this.keepOut(e)}else this.hop(e)}}}hop(e){let t=null,n=-1;for(let r=0;r<8;r++){let[r,i]=this.randomSpot();if(Math.hypot(r-e.x,i-e.z)<1.2)continue;let a=1/0;for(let t of this.pigeons)t!==e&&!t.flying&&(a=Math.min(a,Math.hypot(t.x-r,t.z-i)));a>n&&(n=a,t=[r,i])}if(!t)return;let[r,i]=t,a=Math.hypot(r-e.x,i-e.z);e.state=`hop`,e.courting=!1,e.hop={x0:e.x,z0:e.z,at:this.t,dur:.7+a*.22,h:.35+a*.1},e.tx=r,e.tz=i,e.dir=Math.atan2(i-e.z,r-e.x),e.stateUntil=this.t+e.hop.dur+.5,!e.emote&&W()<.4&&(e.emote={kind:`say`,text:hd(md,this.said)},e.emoteUntil=this.t+1.6),this.sound(`flap`,{id:e.id})}think(){let e=this.t,t=af,n=this.cap;this.night=lf(this.phase()),this.pigeons=this.pigeons.filter(t=>!(t.flying&&e-t.flyAt>1.5));let r=this.pigeons.length;Dd(this),this.replies=this.replies.filter(t=>{if(e<t.at)return!0;let n=this.byId(t.id);return n&&!n.flying&&!n.emote&&(n.emote={kind:`say`,text:t.text},n.emoteUntil=e+2.2),!1});for(let n of this.pigeons)if(!(n.flying||n.held)){if(n.emote&&e>n.emoteUntil&&(n.emote=null),n.visitor&&e>n.visitor.leaveAt&&!n.busy){this.fly(n,!1);continue}if(!(n.courting||n.busy||n.state===`hop`)){if(e>=n.stateUntil){let r=this.night>.6,i=W(),a=n.pheno.e.gait,o=Xd[a]||1;if(n.stateAt=e,r&&i<.55)n.state=`sleep`,n.stateUntil=e+3+W()*5,n.emote={kind:`zzz`},n.emoteUntil=n.stateUntil;else if(n.pheno.e.behavior===`tumbler`&&i<.08)n.state=`tumble`,n.stateUntil=e+.75;else if(n.pheno.e.behavior===`parlor`&&i<.1)n.state=`roll`,n.stateUntil=e+1.1,[n.tx,n.tz]=this.clampToPark(n.x+Math.cos(n.dir)*.6,n.z+Math.sin(n.dir)*.6),n.v=.55;else if(a===`jumpy`&&i<.14)n.state=`jump`,n.stateUntil=e+.55;else if(a===`twirly`&&i<.1)n.state=`twirl`,n.stateUntil=e+.9;else if(a===`sluggish`&&i<.06)n.state=`sleep`,n.stateUntil=e+4+W()*4,n.emote={kind:`zzz`},n.emoteUntil=n.stateUntil;else if(i<(r?.8:.5)){let[e,r]=this.randomSpot();this.walkTo(n,e,r,42*rf*t)}else i<.8?(n.state=`peck`,n.stateUntil=e+(1.2+W()*1.8)*o):(n.state=`idle`,n.stateUntil=e+(.9+W()*2.2)*o)}if(!n.emote&&n.state!==`sleep`&&W()<.004&&(n.emote={kind:`say`,text:this.night>.5&&W()<.4?hd(ud,this.said):hd(cd,this.said)},n.emoteUntil=e+2.6,W()<.3)){let t=null,r=1.6;for(let e of this.pigeons){if(e===n||e.flying||e.held)continue;let i=Math.hypot(e.x-n.x,e.z-n.z);i<r&&(r=i,t=e)}t&&this.replies.push({id:t.id,at:e+.9+W()*.6,text:hd(ld,this.said)})}W()<.012*Math.min(1,9/r)&&this.sound(`coo`,{voice:n.pheno.e.voice,vol:.5,id:n.id})}}if(!this.court&&r>=2&&r<n&&W()<(.1*(1-r/n)+.02)*t){let n=this.pigeons.filter(e=>this.adult(e)&&!e.flying&&!e.held&&!e.busy&&!e.visitor&&e.state!==`sleep`&&e.state!==`hop`);if(n.length>=2){let r=n[Math.floor(W()*n.length)],i=null,a=1e9;for(let e of n){if(e===r)continue;let t=Math.hypot(e.x-r.x,e.z-r.z);t<a&&(a=t,i=e)}if(i){let[n,a]=this.clampToPark((r.x+i.x)/2,(r.z+i.z)/2);n=cf(n,-K.w/2+.3,K.w/2-.3),this.court={a:r.id,b:i.id,mx:n,mz:a,until:e+12,eggAt:0},r.courting=i.courting=!0,this.walkTo(r,n-.24,a,56*rf*t),W()<.45&&(r.emote={kind:`say`,text:hd(pd,this.said)},r.emoteUntil=e+2.4),this.walkTo(i,n+.24,a,56*rf*t)}}}if(this.court){let t=this.court,n=this.byId(t.a),r=this.byId(t.b);if(!n||!r||n.flying||r.flying||n.held||r.held||e>t.until)this.endCourt();else{let i=Math.hypot(n.x-(t.mx-.24),n.z-t.mz)<.2&&Math.hypot(r.x-(t.mx+.24),r.z-t.mz)<.2;if(i&&(n.dir=0,r.dir=Math.PI,n.state=r.state=`court`),i&&!t.eggAt&&(t.eggAt=e+1.6,n.emote={kind:`heart`},n.emoteUntil=e+1.6,r.emote={kind:`heart`},r.emoteUntil=e+1.6,this.sound(`coo`,{voice:n.pheno.e.voice,vol:.8,id:n.id})),t.eggAt&&e>=t.eggAt){let i=Au(n.genome,r.genome,this.mutF());this.eggs.push({id:this.ids++,x:t.mx,z:t.mz+.12,genome:i.genome,gen:Math.max(n.gen,r.gen)+1,laidAt:e,hatchAt:e+6+W()*3.5,parents:[n.lid,r.lid]}),this.sound(`pop`),n.courting=r.courting=!1,n.stateUntil=r.stateUntil=e,n.state=r.state=`idle`,this.court=null}}}for(let t of[...this.eggs])if(e>=t.hatchAt){this.eggs=this.eggs.filter(e=>e!==t);let n=Yu(.02),r=this.spawn({genome:t.genome,accessory:n,name:sd(),gen:t.gen,x:t.x,z:t.z,dir:Math.PI/2,how:t.golden?`golden`:`hatch`,par:t.parents||null});W()<.6&&(r.emote={kind:`say`,text:hd(fd,this.said)},r.emoteUntil=e+2.6),t.golden&&(this.sparkle(t.x,t.z,3),this.toast(`The golden egg hatched… something: `+r.pheno.label+(r.breeds.length?` (`+r.breeds.map(e=>e.name).join(`, `)+`)`:``)+`.`,`breed`)),this.stats.births++,this.sound(`pop`),this.emit({type:`hatch`,x:t.x,z:t.z,pid:r.id});let i=r.pheno.sparkTier;i>=1&&this.sparkle(t.x,t.z,i),i>=2?this.toast(`A remarkable hatch: `+r.pheno.label+`.`,`note`):W()<.13&&this.toast(_d(gd.birth))}let i=this.pigeons.length;if(i>4&&(i>n?W()<.5:W()<.1*(i/n)**3*t)){let e=this.pigeons.filter(e=>!e.flying&&!e.held&&!e.courting&&!e.busy&&!e.visitor&&e.id!==this.selId&&this.adult(e));e.length&&this.fly(e[Math.floor(W()*e.length)],W()<.5)}if(this.poopEnabled&&W()<.05&&this.pigeons.length){let t=this.pigeons[Math.floor(W()*this.pigeons.length)];!t.flying&&!t.held&&(this.poops.push({id:this.ids++,x:t.x-Math.cos(t.dir)*.22,z:t.z-Math.sin(t.dir)*.22,at:e,r:W()}),this.poops.length>14&&this.poops.shift())}this.poops=this.poops.filter(t=>e-t.at<30),Fd(this),e>=this.pruneAt&&(this.pruneFamily(),this.pruneAt=e+60)}setAccessory(e,t){e.accessory=t,e.pheno=Fu(e.genome,t),e.breeds=Zu(e.pheno),this.family[e.lid]&&(this.family[e.lid].a=t),e.rev=(e.rev||0)+1,this.notice(e)}endCourt(){let e=this.court;if(e){for(let t of[e.a,e.b]){let e=this.byId(t);e&&(e.courting=!1,e.stateUntil=this.t)}this.court=null}}regene(e,t){e.genome=Tu(t),e.pheno=Fu(e.genome,e.accessory),e.breeds=Zu(e.pheno),e.rev=(e.rev||0)+1,this.family[e.lid]&&(this.family[e.lid].g=Hu(e.genome)),this.notice(e)}alive(){let e=0;for(let t of this.pigeons)t.flying||e++;return e}full(){return this.alive()>=this.cap&&(this.toast(_d(gd.full)),!0)}clonePigeon(e){let t=this.byId(e);if(!t||t.flying||this.full())return null;let n=`Also `+t.name;n.length>30&&(n=sd());let r=this.spawn({genome:structuredClone(t.genome),accessory:t.accessory,name:n,gen:t.gen,adult:!0,x:t.x+.45,z:t.z+.15,dir:t.dir,how:`clone`,of:t.name,par:this.family[t.lid]?.par||null});return this.stats.births++,this.sparkle(r.x,r.z,1),this.sound(`pop`),this.toast(_d(gd.clone).replace(`{n}`,t.name)),r}dismissPigeon(e){let t=this.byId(e);t&&!t.flying&&(this.fly(t,!1),this.toast(_d(gd.dismiss).replace(`{n}`,t.name)))}roostAdd(e){let t=this.byId(e);return!t||t.flying?!1:this.roost.length>=8?(this.toast(_d(gd.roostFull)),!1):(this.roost.push({name:t.name,genome:t.genome,accessory:t.accessory,gen:t.gen,lid:t.lid}),this.pigeons=this.pigeons.filter(t=>t.id!==e),this.court&&(this.court.a===e||this.court.b===e)&&this.endCourt(),this.selId===e&&(this.selId=null),this.emit({type:`roosted`,x:t.x,z:t.z}),this.toast(_d(gd.roosted).replace(`{n}`,t.name),`note`),this.sound(`coo`,{voice:t.pheno.e.voice,vol:.7}),!0)}releaseRoost(e,t){let n=this.roost[e];if(!n||this.full())return null;let r=this.spawn({genome:structuredClone(n.genome),accessory:n.accessory,name:t?`Also `+n.name:n.name,gen:n.gen,adult:!0,...t?{how:`clone`,of:n.name,par:this.family[n.lid]?.par||null}:{lid:n.lid,how:`unknown`}});return t&&this.stats.births++,this.sparkle(r.x,r.z,1),this.sound(`pop`),t||this.roost.splice(e,1),r}removeRoost(e){let t=this.roost[e];t&&(this.roost.splice(e,1),this.toast(t.name+` retired from public life.`))}cloneBreed(e){let t=Xu.find(t=>t.id===e);if(!t||!this.breeds[e]||this.full())return null;let{genome:n,accessory:r}=rd(t),i=this.spawn({genome:n,accessory:r,name:sd(),gen:this.stats.maxGen,adult:!0,how:`registry`,of:t.name});return this.stats.births++,this.sparkle(i.x,i.z,2),this.sound(`pop`),this.toast(`One `+t.name+`, made to order.`,`note`),i}summonLegends(){let e=[{name:`THE VOID PIGEON`,g:mf({fantasy:`void`,glow:`glow`,eye:`pearl`})},{name:`THE GALAXY PIGEON`,g:mf({sheen:`galaxy`,fpattern:`stars`,tail:`fantail`})}];for(let t of e){let e=this.spawn({genome:t.g,name:t.name,gen:this.stats.maxGen,adult:!0,x:(W()-.5)*2,z:1+W(),how:`summoned`});this.sparkle(e.x,e.z,3)}this.sound(`chime`),this.toast(`W rizz. The legends have descended.`,`breed`)}summonOres(){for(let[e,t]of[[`THE DIAMOND PIGEON`,`diamond`],[`THE EMERALD PIGEON`,`emerald`],[`THE GOLD PIGEON`,`gold`],[`THE GOLD ORE PIGEON`,`goldore`],[`THE DIAMOND ORE PIGEON`,`diamondore`],[`THE EMERALD ORE PIGEON`,`emeraldore`],[`THE REDSTONE ORE PIGEON`,`redstoneore`],[`THE IRON ORE PIGEON`,`ironore`],[`THE LAPIS ORE PIGEON`,`lapisore`],[`THE MIXED GEMSTONE PIGEON`,`gemore`],[`THE COAL ORE PIGEON`,`coalore`]]){let n=this.spawn({genome:mf({fantasy:t}),name:e,gen:this.stats.maxGen,adult:!0,x:(W()-.5)*K.w*.7,z:(W()-.5)*K.d*.5,how:`summoned`});this.sparkle(n.x,n.z,3)}this.sound(`chime`),this.toast(`The mineshaft opens. Eleven ore pigeons surface.`,`breed`)}grab(e){let t=this.byId(e);return!t||t.flying?null:(t.held=!0,t.courting=!1,t.state=`held`,t.busy=null,t.emote={kind:`say`,text:hd(dd,this.said)},t.emoteUntil=this.t+2.4,this.court&&(this.court.a===e||this.court.b===e)&&this.endCourt(),t)}carry(e,t,n){let r=this.byId(e);r&&r.held&&(r.x=t,r.z=n,r.y=.55)}drop(e,t,n){let r=this.byId(e);r&&(r.held=!1,[r.x,r.z]=this.clampToPark(t,n),this.keepOut(r),r.tx=r.x,r.tz=r.z,r.y=.55,r.state=`idle`,r.stateUntil=this.t+.7)}pruneFamily(){let e=this.family,t=new Set,n=(r,i)=>{if(!(r==null||!e[r]||i>3)&&(t.add(String(r)),e[r].par))for(let t of e[r].par)n(t,i+1)};for(let e of this.pigeons)n(e.lid,0);for(let e of this.roost)n(e.lid,0);for(let e of this.eggs)for(let t of e.parents||[])n(t,1);for(let n of Object.keys(e))t.has(n)||delete e[n];return e}whereIs(e){let t=this.pigeons.find(t=>t.lid===e&&!t.flying);if(t)return{park:t.id};let n=this.roost.findIndex(t=>t.lid===e);return n>=0?{roost:n}:null}familyTree(e){let t=this.family,n=(e,r)=>{let i=t[e];return i?{lid:e,rec:i,par:r<3&&i.par?i.par.map(e=>n(e,r+1)):null}:null},r=new Set,i=new Set,a=Object.entries(t).filter(([,e])=>e.how===`hatch`&&e.par);for(let[t,n]of a)n.par.includes(e)&&r.add(+t);for(let[e,t]of a)t.par.some(e=>r.has(e))&&i.add(+e);let o=e=>this.pigeons.filter(t=>!t.flying&&e.has(t.lid)).length;return{root:n(e,0),chicks:o(r),grandchicks:o(i)}}serialize(e){return{v:1,pigeons:this.pigeons.filter(e=>!e.flying&&!e.visitor).map(e=>({n:e.name,g:e.genome,a:e.accessory,ge:e.gen,x:+e.x.toFixed(3),z:+e.z.toFixed(3),d:+e.dir.toFixed(3),l:e.lid})),roost:this.roost,disc:this.discovered,breeds:this.breeds,stats:this.stats,ach:this.achievements,family:this.pruneFamily(),lids:this.lids,speed:this.speed,mut:this.mut,whimsy:this.whimsy,ph:this.phase(),...e}}restore(e){e&&(this.roost=(e.roost||[]).map(e=>({...e,genome:Tu(e.genome)})),this.discovered=e.disc||{},this.breeds=e.breeds||{},this.stats={...this.stats,...e.stats||{}},this.achievements=e.ach||{},this.family=e.family||{},e.lids&&(this.lids=Math.max(this.lids,e.lids)),e.speed!=null&&(this.speed=e.speed),e.mut&&(this.mut=e.mut),e.whimsy&&(this.whimsy=e.whimsy),e.ph!=null&&(this.phase0=e.ph-this.wall/Rd,this.night=lf(this.phase())))}};function gf(e){return!e||!e.pigeons?null:{...e,speed:typeof e.speed==`number`?e.speed:1,pigeons:e.pigeons.map(e=>({n:e.n,g:e.g,a:e.a,ge:e.ge,x:((e.x??400)/800-.5)*K.w,z:((e.y??220)/440-.5)*K.d,d:e.f===-1?Math.PI:0}))}}function _f(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Mr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=vf(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=vf(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function vf(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new _r(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function yf(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${Math.trunc(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}var bf=class extends Rn{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new ua;e.deleteAttribute(`uv`);let t=new Pa({side:1}),n=new Pa,r=new yo(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new xi(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new qi(e,n,6),o=new On;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new xi(e,xf(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new xi(e,xf(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new xi(e,xf(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new xi(e,xf(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new xi(e,xf(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new xi(e,xf(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function xf(e){return new Fa({color:0,emissive:16777215,emissiveIntensity:e})}var Sf={body:`#9b988f`,wing:`#b6b3aa`,head:`#84817a`,pat:`#6b6862`},Cf={goldore:[`#f2c94c`],diamondore:[`#7de8e4`],emeraldore:[`#3bd970`],redstoneore:[`#e8402f`],ironore:[`#dcae86`],lapisore:[`#2f55d4`],coalore:[`#33322f`],gemore:[`#7de8e4`,`#3bd970`,`#e8402f`,`#f2c94c`,`#2f55d4`,`#c95fd6`]},wf={blue:{body:`#97a2b8`,wing:`#c3cad7`,head:`#77839c`,pat:`#34363f`},blueS:{body:`#42454f`,wing:`#4b4e59`,head:`#383b44`,pat:`#303239`},blued:{body:`#c7ccd8`,wing:`#e2e5ec`,head:`#a8afc0`,pat:`#8b90a2`},blueSd:{body:`#dbe1e8`,wing:`#e8edf2`,head:`#c6cfda`,pat:`#b6c1cd`},ash:{body:`#ddc9bc`,wing:`#eee2d7`,head:`#d3b9a9`,pat:`#b5593e`},ashS:{body:`#c7bcc7`,wing:`#d4cbd4`,head:`#b5a7b5`,pat:`#a89aa8`},ashd:{body:`#ecdfc9`,wing:`#f5ecdc`,head:`#e2d0b0`,pat:`#d19c58`},ashSd:{body:`#e0d9df`,wing:`#eae4e9`,head:`#cfc5ce`,pat:`#bdb1bc`},brown:{body:`#a3876b`,wing:`#c1aa8f`,head:`#86694f`,pat:`#5f422a`},brownS:{body:`#64503c`,wing:`#6d5947`,head:`#55432f`,pat:`#4a3826`},brownd:{body:`#c6b096`,wing:`#d9c8b2`,head:`#ad9578`,pat:`#96795c`},brownSd:{body:`#d8c8b1`,wing:`#e3d6c3`,head:`#c4b198`,pat:`#b3a28b`},red:{body:`#ad5338`,wing:`#c16a4e`,head:`#94432c`,pat:`#8f3d28`},redd:{body:`#d8a264`,wing:`#e4bc88`,head:`#c08d4f`,pat:`#b08040`},white:{body:`#f7f4ec`,wing:`#fbf9f4`,head:`#f2eee4`,pat:`#dcd6c8`},almond:{body:`#d4a063`,wing:`#e0b67a`,head:`#c48c50`,pat:`#4a3020`},indigo:{body:`#8e93a8`,wing:`#b0b2c0`,head:`#6c6f86`,pat:`#9a4e2c`},indigoS:{body:`#5f6478`,wing:`#6d7286`,head:`#51556a`,pat:`#4a4e60`},rainbow:{body:`#f2b4c4`,wing:`#bfe3f0`,head:`#c9b6f0`,pat:`#8f6fc0`},toast:{body:`#e2b373`,wing:`#ecc88e`,head:`#c98c4a`,pat:`#8a5226`},zebra:{body:`#f4f1ea`,wing:`#f4f1ea`,head:`#f4f1ea`,pat:`#222020`},sunset:{body:`#f7a86b`,wing:`#f6c27a`,head:`#e0708a`,pat:`#9a5ab0`},gold:{body:`#e5b34d`,wing:`#f1d283`,head:`#cf9a36`,pat:`#b8871f`},mint:{body:`#a9d8b8`,wing:`#c9ead4`,head:`#8cc4a1`,pat:`#609e7c`},lilac:{body:`#c3aade`,wing:`#dcccf0`,head:`#a98cc9`,pat:`#8465a8`},bubblegum:{body:`#f2a9c4`,wing:`#f9cadb`,head:`#e58bad`,pat:`#c9648f`},void:{body:`#2c2541`,wing:`#3a3158`,head:`#221c33`,pat:`#8f86c0`},diamond:{body:`#bdeef0`,wing:`#e0fbfa`,head:`#93dade`,pat:`#4db6bd`},emerald:{body:`#5ecb8a`,wing:`#93e2b2`,head:`#41b06e`,pat:`#1f8a4c`},goldore:Sf,diamondore:Sf,emeraldore:Sf,redstoneore:Sf,ironore:Sf,lapisore:Sf,coalore:Sf,gemore:Sf},Tf=`#f7f4ec`,Ef=`#fbf9f4`,Df=`#cf6a5f`,Of={blue:1,blueS:1,brown:1,brownS:1,void:1,red:1,indigoS:1};function kf(e){let t=wf[e.colorKey]||wf.blue,n=e.e,r=t.body,i=t.wing,a=t.head,o=t.head,s=t.pat,c=e.patternVisible;n.fantasy===`none`&&(n.pied===`saddle`?(r=Tf,a=Tf,o=`#efeadd`):n.pied===`capped`?(r=Tf,i=Ef,c=!1):n.pied===`white`?c=!1:n.pied===`gazzi`?r=Tf:n.pied===`shield`?(r=Tf,a=Tf,o=`#efeadd`):n.pied===`magpie`&&(i=Ef,c=!1));let l=Of[e.colorKey]?`#3a3a42`:`#c4b39e`,u=n.eye===`pearl`?`#dfdbe8`:n.eye===`bull`?`#2b2224`:`#e8912d`;return n.pied===`white`&&n.fantasy===`none`&&(u=`#3a3644`),e.colorKey===`void`&&(u=`#f0edff`),{body:r,wing:i,head:a,tail:o,pat:s,showPat:c,beak:l,eye:u,curl:t.pat}}var q=(e,t,n)=>new B(e,t,n),J=e=>new H(e),Af=(e,t,n)=>e.clone().lerp(t,n),jf=[`root`,`body`,`head`,`wingL`,`wingR`,`legL`,`legR`,`tail`,`eyeL`,`eyeR`,`spin`],Mf=Object.fromEntries(jf.map((e,t)=>[e,t])),Nf={body:`root`,head:`body`,wingL:`body`,wingR:`body`,legL:`root`,legR:`root`,tail:`body`,eyeL:`head`,eyeR:`head`,spin:`head`},Y=q(.19,.5,0),Pf=.09,Ff=q(.05,.22,0);function If(e){let t=q(0,0,0);return e.neck===`noodle`&&t.add(Ff),e.crop===`globe`&&t.add(q(.03,.13,0)),t}var Lf=[q(Y.x+.046,Y.y+.022,-.061),q(Y.x+.046,Y.y+.022,.061)],Rf={root:q(0,0,0),body:q(0,.14,0),head:q(.11,.33,0),wingL:q(.07,.37,-.1),wingR:q(.07,.37,.1),legL:q(.02,.16,-.056),legR:q(.02,.16,.056),tail:q(-.16,.25,0),eyeL:Lf[0],eyeR:Lf[1],spin:q(Y.x-.01,Y.y+.14,0)};function zf(e,t,n,r){let i=Math.sin(e*127.1+t*311.7+n*74.7+r*17.3)*43758.5453;return i-Math.floor(i)}function Bf(e,t){let n=Math.floor(e.x),r=Math.floor(e.y),i=Math.floor(e.z),a=e.x-n,o=e.y-r,s=e.z-i,c=a*a*(3-2*a),l=o*o*(3-2*o),u=s*s*(3-2*s),d=0;for(let e=0;e<2;e++)for(let a=0;a<2;a++)for(let o=0;o<2;o++){let s=(e?c:1-c)*(a?l:1-l)*(o?u:1-u);d+=s*zf(n+e,r+a,i+o,t)}return d}function Vf(e){let t=0;for(let n=0;n<e.length;n++)t=t*31+e.charCodeAt(n)|0;return(t>>>0)%1e3}function Hf(e,t){let n=e.clone().normalize(),r=t||(Math.abs(n.y)>.9?q(1,0,0):q(0,1,0)),i=new B().crossVectors(r,n).normalize(),a=new B().crossVectors(n,i);return new V().makeBasis(i,a,n)}function X(e,t=[0,0,0],n=[1,1,1]){let r=new V;return r.compose(e,new jt().setFromEuler(new dn(t[0],t[1],t[2],`XYZ`)),new B(...n)),r}function Uf(e,t,n=[1,1,1]){let r=new jt().setFromUnitVectors(q(0,1,0),t.clone().normalize());return new V().compose(e,r,new B(...n))}var Wf=class{constructor(e){this.geos=[],this.parts=[],this.seg=e,this.fluff=0,this.fluffSeed=0}blob(e,{ws:t=24,hs:n=16,deform:r,paint:i,color:a,matrix:o,fluff:s=0}){t=Math.max(5,Math.round(t*this.seg)),n=Math.max(4,Math.round(n*this.seg));let c=new xa(1,t,n);c.deleteAttribute(`uv`),c.deleteAttribute(`normal`),c=yf(c);let l=c.attributes.position,u=l.count,d=new Float32Array(u*3),f=new B;for(let e=0;e<u;e++){f.fromBufferAttribute(l,e);let t=i?i(f):a;d[e*3]=t.r,d[e*3+1]=t.g,d[e*3+2]=t.b;let n=r(f.clone());s&&n.multiplyScalar(1+s*(Bf(f.clone().multiplyScalar(7),this.fluffSeed)-.45)),l.setXYZ(e,n.x,n.y,n.z)}return c.setAttribute(`color`,new _r(d,3)),c.computeVertexNormals(),o&&c.applyMatrix4(o),this.push(c,e)}prim(e,t,n,r){let i=t;i.attributes.uv&&i.deleteAttribute(`uv`),i.index||(i=yf(i));let a=i.attributes.position.count,o=new Float32Array(a*3);for(let e=0;e<a;e++)o[e*3]=n.r,o[e*3+1]=n.g,o[e*3+2]=n.b;return i.setAttribute(`color`,new _r(o,3)),r&&i.applyMatrix4(r),this.push(i,e)}ell(e,t,n,r,i=12,a=8){return this.blob(e,{ws:i,hs:a,color:n,deform:e=>e.set(e.x*t[0],e.y*t[1],e.z*t[2]),matrix:r})}push(e,t){let n=e.attributes.position.count,r=new Uint16Array(n*4),i=new Float32Array(n*4);for(let e=0;e<n;e++)r[e*4]=Mf[t],i[e*4]=1;return e.setAttribute(`skinIndex`,new _r(r,4)),e.setAttribute(`skinWeight`,new _r(i,4)),this.geos.push(e),this.parts.push(t),e}lift(e){this.geos.forEach((t,n)=>{this.parts[n]!==`legL`&&this.parts[n]!==`legR`&&t.translate(0,e,0)})}shift(e,t){this.geos.forEach((n,r)=>{e.includes(this.parts[r])&&n.translate(t.x,t.y,t.z)})}done(){let e=_f(this.geos,!1);e.computeBoundingSphere();for(let e of this.geos)e.dispose();return e}};function Gf(e,t){let n=new Pt().getNormalMatrix(t);return{at(r){let i=r.clone().normalize(),a=e(i.clone()),o=.001,s=new B().crossVectors(i,Math.abs(i.y)>.9?q(1,0,0):q(0,1,0)).normalize(),c=new B().crossVectors(i,s),l=e(i.clone().addScaledVector(s,o).normalize()).sub(a),u=e(i.clone().addScaledVector(c,o).normalize()).sub(a),d=new B().crossVectors(l,u).normalize();return d.dot(i)<0&&d.negate(),{p:a.applyMatrix4(t),n:d.applyMatrix3(n).normalize()}}}}function Kf(e,t,n,r=0,i=1,a){let{p:o,n:s}=e.at(t),c=Hf(s,a);return c.multiply(new V().makeRotationZ(r)),c.multiply(new V().makeScale(i,i,i)),c.setPosition(o.addScaledVector(s,n)),c}var qf={diamond:1,emerald:1,goldore:1,diamondore:1,emeraldore:1,redstoneore:1,ironore:1,lapisore:1,coalore:1,gemore:1};function Jf(e){return e.e.glow===`glow`?e.colorKey===`void`?`voidglow`:`glow`:e.colorKey===`diamond`||e.colorKey===`emerald`?`gem`:qf[e.colorKey]?`facet`:e.colorKey===`gold`?`metal`:`clay`}var Yf={lace:.16,horn:.13,hood:.06,shell:.05,rose:.05,double:.06,peak:.06},Xf={tophat:.16,chefhat:.16,partyhat:.16,crown:.1,propeller:.1,cowboy:.08,blackhat:.1};function Zf(e){let t=e.e,n=.6+If(t).y+(t.legs===`long`?Pf:0);return n+=Math.max(Yf[t.crest]||0,t.mane===`hood`?.06:0,t.outfit===`punk`?.07:0,...Ku(e.accessory).map(e=>Xf[e]||0)),t.tail===`fantail`&&(n=Math.max(n,.56)),n}function Qf(e,t=1){return({king:1.42,dinky:.68,chonk:1.1}[e.e.size]||1)*t}var $f=new Map;function ep(e,t=0){let n=Iu(e)+`|`+t,r=$f.get(n);return r||(r=ip(e,t),$f.set(n,r)),r}function tp(){return $f.size}function np(e){let t=0;for(let[n,r]of $f)e.has(r.geometry)||(r.geometry.dispose(),$f.delete(n),t++);return t}function rp(e){let t=ep(e).geometry.clone();for(let e of[`skinIndex`,`skinWeight`,`color`])t.deleteAttribute(e);return t}function ip(e,t=0){let n=e.e,r=kf(e),i=Vf(Iu(e)),a=Jf(e),o=new Wf((a===`facet`||a===`gem`?.42:1)*(t?.5:1)),s={body:J(r.body),wing:J(r.wing),head:J(r.head),tail:J(r.tail),pat:J(r.pat),beak:J(r.beak),eye:J(r.eye),curl:J(r.curl),white:J(Tf),leg:J(Df)},c=n.fantasy===`none`,l=n.sheen===`galaxy`,u=[J(`#2e2a5e`),J(`#6a3f8f`),J(`#35547e`)],d=e=>{let t=(e.x+e.y+2)/4;return t<.5?Af(u[0],u[1],t*2):Af(u[1],u[2],(t-.5)*2)},f=n.pied===`splash`&&c,p=e.colorKey===`almond`,m=[J(`#ffb36b`),J(`#f07fa0`),J(`#8d6ad0`)],h=J(`#9c5a26`),g=J(`#232121`),_={rainbow:(e,t,n)=>new H().setHSL(((t.x+1)/2*.85+n*.07)%1,.78,.63),toast:(e,t)=>t.y>.55||Math.abs(t.z)>.88?Af(e,h,.75):Bf(t.clone().multiplyScalar(14),5)>.8?Af(e,J(`#fff4dc`),.5):e,zebra:(e,t,n)=>Math.sin((t.x*7+t.y*2.2+n*.3)*Math.PI)>.15?g:e,sunset:(e,t)=>{let n=(t.y+1)/2;return n<.5?Af(m[0],m[1],n*2):Af(m[1],m[2],(n-.5)*2)}}[e.colorKey],v=n.feather===`silky`?t?.1:.13:0;o.fluffSeed=i;let y=n.pied===`baldhead`&&c,b=n.pied===`beard`&&c,x=n.pied===`magpie`&&c,S=n.grizzle===`grizzle`&&n.pied!==`white`&&c,C=(e,t,n)=>{let r=e;if(f&&Bf(t.clone().multiplyScalar(2.3).addScalar(i*.01),i)>.6&&(r=s.white),S&&Bf(t.clone().multiplyScalar(9),i+n)>.62&&(r=Af(r,s.white,.75)),p){let e=Bf(t.clone().multiplyScalar(11),i+n);e>.66?r=Af(r,s.pat,.8):e<.2&&(r=Af(r,s.white,.6))}return l&&(r=Af(r,d(t),.85)),_&&(r=_(r,t,n)),r},w=sp[n.outfit]||null,T=e=>{let t=1-.42*Math.max(0,-e.x)**1.4,r=e.x>0?1+.1*e.x*Math.max(0,1-Math.abs(e.y+.1)):1,i=n.size===`chonk`?[1.1,1.32,1.36]:[1,1,1];return e.set(e.x*.235*i[0],e.y*.168*t*r*i[1],e.z*.158*t*(e.y<-.3?1.04:1)*i[2])},E=X(q(0,.275,0),[0,0,.24]);o.blob(`body`,{ws:32,hs:22,deform:T,matrix:E,fluff:v,paint:e=>{let t=s.body;return x&&e.y<-.1?s.white:(e.y>.35&&(t=Af(t,s.head,(e.y-.35)*.35)),e.y<-.5&&(t=Af(t,s.white,(-.5-e.y)*.12)),t=C(t,e,1),w?w.body(e,t):t)}});let D=Gf(T,E),O=(e,t,n)=>q(e,t,n*Math.sqrt(Math.max(.05,1-e*e-t*t))),ee={normal:[`#55a06b`,`#8f5fae`,.55],bronze:[`#d08a3e`,`#7a4a20`,.85],opal:[`#7ec8d8`,`#d8a8e8`,.85]}[n.sheen],k=c&&n.pied!==`white`&&n.pied!==`saddle`&&!l&&ee,te=n.pied===`capped`&&c?J(wf[e.colorKey===`white`?`blue`:e.colorKey].head):null;o.blob(`head`,{ws:18,hs:14,matrix:X(q(.135,.385,0),[0,0,-.38]),fluff:v*.6,deform:e=>e.set(e.x*.088,e.y*.135,e.z*.082),paint:e=>{if(y&&e.y>.15||b&&e.x>.1&&e.y>-.45)return s.white;let t=te?s.white:s.head;if(k&&e.y<.5&&e.y>-.85){let n=(e.y+.85)/1.35,r=Af(J(ee[0]),J(ee[1]),n);t=Af(t,r,ee[2]*Math.sin(n*Math.PI))}return C(t,e,2)}});let ne=e=>e.set(e.x*.092*(e.x>0?1.04:1),e.y*.084,e.z*.078),re=X(Y.clone());o.blob(`head`,{ws:22,hs:16,deform:ne,matrix:re,paint:e=>y||b&&e.x>.2&&e.y<-.25?s.white:C(te||s.head,e,3)});let A=Gf(ne,re),ie={short:.048,stubby:.03,long:.118}[n.beak]||.078,j=n.beak===`long`?.016:n.beak===`stubby`?.021:.019;if(n.beak===`duck`){let e=J(`#f0a53a`);o.blob(`head`,{ws:16,hs:8,color:e,matrix:X(q(Y.x+.1,Y.y-.01,0),[0,0,-.12]),deform:e=>e.set(e.x*.072,e.y*.013,e.z*(.03+.012*Math.max(0,e.x)))}),o.blob(`head`,{ws:14,hs:6,color:Af(e,J(`#b8702a`),.35),matrix:X(q(Y.x+.09,Y.y-.03,0),[0,0,-.18]),deform:e=>e.set(e.x*.06,e.y*.01,e.z*.028)})}else o.prim(`head`,new ma(j,ie,Math.max(6,Math.round(12*o.seg))),s.beak,Uf(q(Y.x+.085+ie/2-.012,Y.y-.012,0),q(1,n.beak===`long`?-.2:-.14,0)));n.beak===`stubby`&&o.ell(`head`,[.07,.06,.07],s.head,X(q(Y.x+.03,Y.y+.03,0)),14,10);let ae=n.wattle===`large`,oe=J(`#e8dfcf`);ae?[[.078,.012,0,.026],[.09,.004,.012,.018],[.09,.004,-.012,.018],[.1,0,0,.016]].forEach(([e,t,n,r])=>o.ell(`head`,[r*1.1,r*.8,r],oe,X(q(Y.x+e,Y.y+t,n)),10,7)):n.beak!==`duck`&&o.ell(`head`,[.022,.012,.019],J(`#e9e2d4`),X(q(Y.x+.08,Y.y+.006,0),[0,0,-.25]));let se=Af(s.head,J(`#2a2622`),.35);Lf.forEach((e,t)=>{let r=t?1:-1,i=t?`eyeR`:`eyeL`,a=q(.35,.05,r).normalize();if(n.eye===`googly`){o.ell(i,[.036,.036,.026],J(`#fbfbf8`),Hf(a).setPosition(e.clone().addScaledVector(a,.012)),16,12),o.ell(i,[.017,.017,.008],J(`#141414`),Hf(a).setPosition(e.clone().addScaledVector(a,.036).add(q(.006,-.01,0))),12,8);return}o.prim(i,new Sa(ae?.028:.024,ae?.012:.0055,6,18),ae?oe:se,new V().makeBasis(...ap(a)).setPosition(e.clone().addScaledVector(a,-.002))),o.ell(i,[.021,.021,.011],s.eye,Hf(a).setPosition(e)),o.ell(i,[.0105,.0105,.006],J(`#1d1b1a`),Hf(a).setPosition(e.clone().addScaledVector(a,.008).add(q(.003,0,0)))),o.ell(i,[.0038,.0038,.002],J(`#ffffff`),Hf(a).setPosition(e.clone().addScaledVector(a,.013).add(q(.006,.006,0))),6,4)});let ce=e=>{let t=Math.max(0,-e.x),n=1-.55*t**1.25;return e.set(e.x*.215,e.y*.1*n,e.z*.042*(1-.3*t))};for(let e of[-1,1]){let t=e>0?`wingR`:`wingL`,i=X(q(-.055,.315,.122*e),[.08*e,-.12*e,.2]);o.blob(t,{ws:28,hs:14,deform:ce,matrix:i,fluff:v,paint:t=>{let r=s.wing;return n.pied===`shield`&&c&&t.x<-.42?s.white:(t.x<-.42?r=Af(r,s.pat,.42+(-.42-t.x)*.5):t.y>.55&&(r=Af(r,s.body,.4)),r=C(r,t,4+e),w?w.wing(t,r):r)}});let a=Gf(ce,i),u=(t,n)=>q(t,n,e*Math.sqrt(Math.max(.02,1-t*t-n*n)));if(r.showPat&&!l){if(n.pattern===`bar`)for(let n of[-.02,-.26])o.ell(t,[.055,.013,.006],s.pat,Kf(a,u(n,-.05),.002,Math.PI/2+.3*e,1));else if(n.pattern===`check`||n.pattern===`tcheck`){let e=n.pattern===`tcheck`,r=e?4:3,i=e?6:5,c=e?.012:.0105;for(let n=0;n<r;n++)for(let r=0;r<i;r++){let i=.38-r*(e?.14:.17)-n%2*.07,l=.45-n*(e?.27:.34);i*i+l*l>.8||o.ell(t,[c*1.2,c,.004],s.pat,Kf(a,u(i,l),.002,0,1),8,5)}}}if(n.pied===`rosewing`&&c&&[[.45,.45],[.3,.55],[.52,.2],[.35,.3],[.2,.45],[.42,.6]].forEach(([e,n])=>o.ell(t,[.02,.018,.005],s.white,Kf(a,u(e,n),.002,0,1),8,5)),n.curl===`curly`)for(let e=0;e<9;e++)o.prim(t,new Sa(.026,.006,5,12,Math.PI*1.4),Af(s.curl,s.wing,.45),Kf(a,u(.5-e%5*.22,e<5?.3:-.25),.001,-.6+e*.3,1).multiply(new V().makeScale(1,1,.35)));if(l)for(let e=0;e<4;e++)o.ell(t,[.004,.004,.003],J(`#ffffff`),Kf(a,u(.3-e*.2,e%2?.3:-.2),.002,0,1),6,4)}let le=r.showPat||n.spread===`spread`&&c&&n.pied!==`white`,ue=n.mane===`cascade`&&n.tail!==`fantail`?J(`#f4f1e7`):s.tail;if(n.tail===`fantail`){let e=q(-.14,.3,0);for(let t=0;t<2;t++)for(let n=0;n<17-t*2;n++){let r=17-t*2,i=(-86+n*172/(r-1))*Math.PI/180,a=t?.15:.205,c=q(-.22,Math.cos(i),Math.sin(i)).normalize(),l=t||n%2?s.wing:ue;o.blob(`tail`,{ws:10,hs:6,matrix:Uf(e.clone().addScaledVector(c,a*.9).add(q(t*.012,0,0)),c),fluff:v*2.2,deform:e=>e.set(e.x*.05*(1-.3*Math.max(0,-e.y)),e.y*a,e.z*.014),paint:e=>C(le&&e.y>.55&&!t?Af(l,s.pat,.6):l,e,7)})}}else o.blob(`tail`,{ws:20,hs:10,matrix:X(q(-.32,.228,0),[0,0,.2]),fluff:v*1.4,deform:e=>e.set(e.x*.19,e.y*(.044-.018*Math.max(0,-e.x))+.006*(1-e.z*e.z),e.z*(.07+.06*Math.max(0,-e.x))),paint:e=>C(le&&e.x<-.5&&e.x>-.8?Af(ue,s.pat,.75):ue,e,7)});for(let e of[-1,1]){let t=e>0?`legR`:`legL`,r=.056*e,i=.15+(n.legs===`long`?Pf:0);o.prim(t,new pa(.011,.013,i,8),s.leg,X(q(.02,.015+i/2,r)));for(let e of[-.45,0,.45])o.prim(t,new da(.0065,.04,2,6),s.leg,X(q(.045+Math.cos(e)*.012,.01,r+Math.sin(e)*.018),[0,-e,-Math.PI/2]));o.prim(t,new da(.006,.025,2,6),s.leg,X(q(0,.01,r),[0,0,Math.PI/2])),n.muffs===`muffed`?[[.03,.035,0,.042],[.06,.02,.012,.034],[0,.025,-.01,.03],[.05,.05,-.006,.03]].forEach(([n,i,a,c],l)=>o.ell(t,[c*1.2,c*.9,c],l%2?s.wing:s.body,X(q(n,i,r+a*e)),10,7)):n.muffs===`grouse`&&o.ell(t,[.03,.038,.028],s.body,X(q(.025,.09,r)),10,7)}if(n.crop===`globe`&&o.blob(`body`,{ws:28,hs:20,matrix:X(q(.165,.41,0)),deform:e=>e.set(e.x*.215,e.y*.215,e.z*.205),paint:e=>C(e.y>.45&&e.x>.1?Af(s.body,s.white,.22):s.body,e,8)}),n.frill===`frill`)for(let e=0;e<6;e++){let t=.3+e*.024,r=n.crop===`globe`?.29-e*.01:.245-e*.012;o.ell(`body`,[.012,.01,.026],J(`#fdfbf5`),X(q(r,t,e%2?.012:-.012),[0,0,.5]),8,5)}if(n.curl===`curly`)for(let e of[-1,1])for(let t=0;t<4;t++)o.prim(`body`,new Sa(.026,.006,5,12,Math.PI*1.4),Af(s.curl,s.body,.45),Kf(D,O(.3-t*.25,-.45+t%2*.15,e),.001,.4+t,1).multiply(new V().makeScale(1,1,.35)));if(n.mane===`cascade`){let e=[`#3fae7e`,`#4f86c8`,`#c98a4a`,`#3fbaa0`,`#6b6bc4`,`#b88040`,`#4fb07a`,`#6fd0a0`,`#7fa9e6`,`#e0a060`,`#5fd8be`,`#8d8de0`,`#d8a050`];for(let t=0;t<2;t++)for(let n=0;n<13;n++){let r=(n-6)/6,i=t?.13:.18,a=q(.1-t*.04,.5-t*.02-Math.abs(r)*.03,r*.06),s=q(-.85,-.2-Math.abs(r)*.55,r*.9).normalize();o.blob(`body`,{ws:8,hs:6,matrix:Uf(a.clone().addScaledVector(s,i*.9),s),deform:e=>e.set(e.x*.026*(1-.6*Math.max(0,e.y)),e.y*i,e.z*.012),color:J(e[(n+t*5)%e.length])})}}if(n.mane===`hood`){let e=q(Y.x-.04,Y.y-.015,0);for(let t=0;t<2;t++){let n=t?9:12,r=t?.075:.092;for(let i=0;i<n;i++){let a=(-155+i*310/(n-1))*Math.PI/180,c=q(-.15,Math.cos(a),Math.sin(a)).normalize();o.blob(`head`,{ws:10,hs:6,matrix:Uf(e.clone().addScaledVector(c,r),c),deform:e=>e.set(e.x*.014,e.y*(t?.055:.07),e.z*(t?.038:.048)),color:t?s.wing:s.body})}}}if(n.crest===`peak`)o.prim(`head`,new ma(.024,.085,8),s.head,Uf(q(Y.x-.07,Y.y+.06,0),q(-.75,1,0)));else if(n.crest===`shell`||n.crest===`double`){let e=q(Y.x-.03,Y.y+.005,0);for(let t=0;t<2;t++)for(let n=0;n<13;n++){let r=(-120+n*20)*Math.PI/180,i=q(-.75-t*.3,Math.cos(r),Math.sin(r)).normalize();o.blob(`head`,{ws:10,hs:6,matrix:Uf(e.clone().addScaledVector(i,.085-t*.01),i),deform:e=>e.set(e.x*.014,e.y*(.05-t*.012),e.z*.036),paint:e=>e.y>.2?s.wing:Af(s.wing,s.head,.5)})}}else if(n.crest===`rose`){let e=q(Y.x+.035,Y.y+.072,0);for(let t=0;t<16;t++){let n=1-(t+.5)/16*1.6,r=Math.sqrt(Math.max(0,1-n*n)),i=t*2.4,a=q(Math.cos(i)*r,Math.abs(n)*.6+.5,Math.sin(i)*r).normalize();o.ell(`head`,[.026,.048,.012],s.wing,Uf(e.clone().addScaledVector(a,.036),a),8,6)}o.ell(`head`,[.03,.028,.03],s.head,X(e),10,7)}else if(n.crest===`lace`){let e=q(Y.x-.015,Y.y+.06,0);for(let t=0;t<11;t++){let n=(-68+t*13.6)*Math.PI/180,r=q(-.22,Math.cos(n),Math.sin(n)).normalize();o.prim(`head`,new pa(.0035,.0045,.14,5),s.head,Uf(e.clone().addScaledVector(r,.07),r)),o.ell(`head`,[.024,.016,.005],J(`#f6f3ea`),Uf(e.clone().addScaledVector(r,.145),r,[1,1,1]).multiply(new V().makeRotationX(Math.PI/2)),10,6)}}if(n.crest===`horn`){let e=q(Y.x+.04,Y.y+.07,0),t=q(.4,1,0).normalize();o.prim(`head`,new ma(.018,.14,12),J(`#f3ecff`),Uf(e.clone().addScaledVector(t,.07),t)),[.02,.05,.08].forEach((n,r)=>o.prim(`head`,new Sa(.016-r*.004,.003,5,14),J(`#e8b64c`),Uf(e.clone().addScaledVector(t,n),t).multiply(new V().makeRotationX(Math.PI/2+.3))))}if(n.crest===`double`){let e=q(Y.x+.075,Y.y+.035,0);for(let t=0;t<10;t++){let n=1-(t+.5)/10*1.6,r=Math.sqrt(Math.max(0,1-n*n)),i=t*2.4,a=q(Math.abs(n)*.4+.4,Math.cos(i)*r*.8+.4,Math.sin(i)*r).normalize();o.ell(`head`,[.016,.03,.008],s.wing,Uf(e.clone().addScaledVector(a,.02),a),8,6)}}let de=[[-.15,.35],[.28,-.15],[.45,.4],[-.05,-.4],[.12,.1],[-.4,.05]],M=n.fpattern===`hearts`&&n.pied===`white`&&c,fe=(e,t,n,r,i=`body`)=>{let a=Kf(e,t,.006,Math.PI,n);o.ell(i,[.009,.009,.004],r,a.clone().multiply(X(q(-.0075,.004,0))),8,5),o.ell(i,[.009,.009,.004],r,a.clone().multiply(X(q(.0075,.004,0))),8,5),o.prim(i,new ma(.0145,.018,3),r,a.clone().multiply(X(q(0,-.007,0),[0,0,Math.PI],[1,1,.3])))},pe=(e,t,n,r,i=`body`)=>{let a=Kf(e,t,.005,0,n);o.ell(i,[.004,.02,.003],r,a.clone(),6,4),o.ell(i,[.02,.004,.003],r,a.clone(),6,4)};if(n.fpattern!==`none`&&!M){let e=J(`#ffffff`);for(let t of[-1,1])for(let[r,i]of de){let a=O(r,i,t);n.fpattern===`dots`?o.ell(`body`,[.016,.016,.004],e,Kf(D,a,.003,0,1),10,6):n.fpattern===`hearts`?fe(D,a,1.1,e):pe(D,a,1,e)}}if(M&&fe(D,q(.95,-.05,0),2.4,J(`#c0392b`)),Cf[e.colorKey]){let t=Cf[e.colorKey].map(J),n=0;for(let e of[-1,1])for(let[r,i]of de)o.prim(`body`,new ua(.034,.034,.03),t[n++%t.length],Kf(D,O(r,i,e),-.004,.3*n,1));for(let e of[-1,1])o.prim(`head`,new ua(.024,.024,.02),t[n++%t.length],Kf(A,q(-.2,.5,e*.8),-.002,.4,1))}if(l||e.colorKey===`void`){let t=e.colorKey===`void`?J(`#cfc8f2`):J(`#ffffff`);for(let e=0;e<16;e++){let n=e%2?1:-1,r=(zf(e,1,2,i)-.5)*1.6,a=(zf(e,3,4,i)-.5)*1.4;o.ell(`body`,[.005,.005,.003],t,Kf(D,O(r,a,n),.002,0,1),6,4)}if(l)for(let[e,t,n]of[[`#b9a8ff`,.1,.2],[`#8fd0ff`,-.3,-.1]])for(let r of[-1,1])pe(D,O(t,n,r),.8,J(e));else pe(D,O(.05,.15,1),.9,t)}let me=Ku(e.accessory),he=me.some(e=>Wu[e].slot===`head`);w&&w.trim?.(o,D,A,{hatted:he,wingShape:null});for(let e of me)lp(o,e,s,D);let ge=If(n);if(ge.lengthSq()&&o.shift([`head`,`eyeL`,`eyeR`,`spin`],ge),n.neck===`noodle`){let e=q(.13,.36,0),t=q(Y.x-.03,Y.y-.03,0).add(ge).clone().sub(e);o.blob(`body`,{ws:14,hs:12,matrix:Uf(e.clone().addScaledVector(t,.5),t),deform:e=>e.set(e.x*.058,e.y*t.length()*.62,e.z*.054),paint:e=>C(k&&e.y<.2?Af(s.head,J(ee[0]),.4):s.head,e,9)})}return n.legs===`long`&&o.lift(Pf),{geometry:o.done(),kind:a}}function ap(e){let t=e.clone().normalize(),n=new B().crossVectors(q(0,1,0),t).normalize();return[n,new B().crossVectors(t,n),t]}var op=e=>J(e),sp={suit:{body:(e,t)=>e.x>.58&&Math.abs(e.z)<.5*(e.y+.85)&&e.y>-.55?op(`#f4f1ea`):op(`#30343f`),wing:()=>op(`#363b48`),trim(e,t){let n=op(`#a8323a`);e.ell(`body`,[.006,.056,.02],n,Kf(t,q(.96,-.12,0),.004,0,1),8,6),e.ell(`body`,[.012,.014,.02],op(`#8a2830`),Kf(t,q(.94,.2,0),.006,0,1),8,6);for(let n of[-1,1])e.ell(`body`,[.007,.05,.02],op(`#262a33`),Kf(t,q(.85,.05,.32*n),.004,.5*n,1),8,6)}},elvis:{body:(e,t)=>op(`#f7f3ea`),wing:e=>e.x<-.5?op(`#e8e2d2`):op(`#f7f3ea`),trim(e,t,n,{hatted:r}){let i=op(`#e2b13c`),a=op(`#18171c`);for(let n=0;n<5;n++)for(let r of[-1,1])e.ell(`body`,[.008,.008,.004],i,Kf(t,q(.9,.35-n*.16,(.08+n*.07)*r),.004,0,1),6,4);e.ell(`body`,[.01,.01,.005],op(`#c0392b`),Kf(t,q(.95,-.5,0),.005,0,1),8,5),e.prim(`body`,new Sa(.082,.018,6,16,Math.PI*1.25),op(`#fbf8f0`),X(q(.1,.43,0),[Math.PI/2,0,Math.PI*.87])),r||(e.blob(`head`,{ws:14,hs:10,color:a,matrix:X(q(Y.x-.005,Y.y+.06,0),[0,0,-.2]),deform:e=>e.set(e.x*.08,e.y*.04,e.z*.07)}),e.blob(`head`,{ws:14,hs:10,color:a,matrix:X(q(Y.x+.05,Y.y+.085,0),[0,0,.55]),deform:e=>e.set(e.x*.055,e.y*.03,e.z*.05)}),e.prim(`head`,new Sa(.022,.008,6,12,Math.PI*1.3),a,X(q(Y.x+.085,Y.y+.075,0),[0,0,-.6])));for(let t of[-1,1])e.ell(`head`,[.016,.03,.006],a,X(q(Y.x+.005,Y.y-.012,.074*t)),8,6)}},punk:{body:(e,t)=>e.x>.7&&Math.abs(e.z)<.22&&e.y>-.4?op(`#c8c2b8`):op(`#1f1e24`),wing:()=>op(`#26252c`),trim(e,t,n,{hatted:r}){let i=op(`#cfd3d8`);for(let n of[-1,1])for(let r=0;r<4;r++)e.prim(`body`,new ma(.007,.014,6),i,Kf(t,q(.1-r*.2,.6,.78*n),.004,0,1).multiply(new V().makeRotationX(Math.PI/2)));if(!r)for(let t=0;t<6;t++){let n=-.9+t*.34,r=q(Math.sin(n)*.5,1,0).normalize();e.prim(`head`,new ma(.014,.06+Math.cos(n)*.02,6),t%2?op(`#e8408a`):op(`#7ad04a`),Uf(q(Y.x-.01+Math.sin(n)*.08,Y.y+.075+Math.cos(n)*.01,0).addScaledVector(r,.03),r))}}},tracksuit:{body:(e,t)=>Math.abs(e.z)<.05&&e.x>.6?op(`#9a9aa2`):Math.abs(e.z)>.5&&[-.5,-.62,-.74].some(t=>Math.abs(e.y-t)<.028)?op(`#f4f2ec`):op(`#22232a`),wing:e=>[.02,.22,.42].some(t=>Math.abs(e.y-t)<.045)&&e.x>-.5?op(`#f4f2ec`):op(`#26272e`)},hawaiian:{body:e=>cp(e,1),wing:e=>cp(e,2)},raincoat:{body:(e,t)=>Math.abs(e.z)<.03&&e.x>.6?op(`#c9971a`):op(`#f2c230`),wing:e=>e.x<-.6?op(`#e0b021`):op(`#f2c230`),trim(e,t){for(let n=0;n<3;n++)e.ell(`body`,[.011,.006,.012],op(`#6b4a2a`),Kf(t,q(.95,.2-n*.24,.06),.006,0,1),8,5)}}};function cp(e,t){let n=Bf(e.clone().multiplyScalar(5.5).addScalar(t*3.1),40+t);return op(n>.78?`#f07aa0`:n>.72?`#ffd34d`:n<.16?`#f6f3ea`:`#2a9ca2`)}function lp(e,t,n,r){let i=q(Y.x-.005,Y.y+.075,0),a=J(`#2a2620`),o=J(`#a8453c`),s=J(`#7a8a5e`),c=J(`#e8b64c`);switch(t){case`tophat`:{let t=X(i,[0,0,.14]);e.prim(`head`,new pa(.088,.088,.012,20),a,t.clone().multiply(X(q(0,0,0)))),e.prim(`head`,new pa(.056,.06,.11,20),a,t.clone().multiply(X(q(0,.06,0)))),e.prim(`head`,new pa(.0615,.0615,.024,20),J(`#c67139`),t.clone().multiply(X(q(0,.022,0))));break}case`beret`:e.ell(`head`,[.095,.032,.095],o,X(i.clone().add(q(0,-.005,0)),[.25,0,.12]),16,10),e.prim(`head`,new pa(.005,.007,.025,6),o,X(i.clone().add(q(0,.035,.008)),[.25,0,.12]));break;case`cowboy`:{let t=J(`#a97b4a`);e.blob(`head`,{ws:22,hs:8,color:t,matrix:X(i.clone().add(q(0,-.005,0)),[0,0,.1]),deform:e=>e.set(e.x*.15,e.y*.012+e.z*e.z*.03,e.z*.13)}),e.ell(`head`,[.068,.06,.058],t,X(i.clone().add(q(0,.035,0)),[0,0,.1]),16,10),e.prim(`head`,new pa(.064,.066,.016,18),J(`#6e4c28`),X(i.clone().add(q(0,.012,0)),[0,0,.1]));break}case`crown`:{let t=X(i.clone().add(q(0,0,0)),[0,0,.08],[1.35,1.35,1.35]);e.prim(`head`,new pa(.052,.048,.045,20,1,!0),c,t.clone().multiply(X(q(0,.022,0)))),e.prim(`head`,new pa(.047,.047,.01,20),J(`#8d3b32`),t.clone().multiply(X(q(0,.012,0))));for(let n=0;n<6;n++){let r=n/6*Math.PI*2;e.prim(`head`,new ma(.015,.04,4),c,t.clone().multiply(X(q(Math.cos(r)*.05,.062,Math.sin(r)*.05)))),e.ell(`head`,[.005,.005,.005],c,t.clone().multiply(X(q(Math.cos(r)*.05,.085,Math.sin(r)*.05))),6,4),e.ell(`head`,[.008,.008,.006],n%2?o:J(`#4f7fc0`),t.clone().multiply(X(q(Math.cos(r)*.053,.024,Math.sin(r)*.053))),6,4)}break}case`monocle`:{let t=Lf[1],n=q(.35,.05,1).normalize();e.prim(`eyeR`,new Sa(.032,.005,6,20),J(`#b18f3e`),new V().makeBasis(...ap(n)).setPosition(t.clone().addScaledVector(n,.012))),e.prim(`head`,new pa(.0018,.0018,.12,4),J(`#b18f3e`),X(t.clone().add(q(-.01,-.07,.02)),[0,0,.25]));break}case`sunglasses`:{let t=J(`#23212b`);Lf.forEach((n,r)=>{let i=q(.35,.05,r?1:-1).normalize();e.prim(r?`eyeR`:`eyeL`,new pa(.03,.03,.006,16),t,Uf(n.clone().addScaledVector(i,.012),i))}),e.prim(`head`,new pa(.004,.004,.1,6),t,X(q(Y.x+.07,Y.y+.03,0),[Math.PI/2,0,0]));break}case`bowtie`:{let t=q(.215,.34,0);for(let n of[-1,1])e.prim(`body`,new ma(.03,.05,4),o,Uf(t.clone().add(q(0,0,.024*n)),q(0,0,-n),[1,1,.5]));e.ell(`body`,[.012,.012,.012],J(`#7c3129`),X(t),8,6);break}case`scarf`:e.prim(`body`,new Sa(.085,.032,10,22),s,X(q(.125,.385,0),[Math.PI/2,-.5,0])),e.blob(`body`,{ws:10,hs:8,color:s,matrix:X(q(.16,.3,.085),[.3,0,-.25]),deform:e=>e.set(e.x*.03,e.y*.085,e.z*.014)});for(let t of[-.012,.012])e.prim(`body`,new pa(.003,.003,.03,4),J(`#56633f`),X(q(.14,.21,.09+t),[.3,0,-.25]));break;case`partyhat`:{let t=X(i.clone().add(q(-.005,.045,0)),[0,0,.25]);e.prim(`head`,new ma(.045,.12,16),J(`#e0508a`),t.clone());for(let n=0;n<5;n++)e.ell(`head`,[.007,.007,.007],n%2?J(`#7ac5e0`):J(`#f2c94c`),t.clone().multiply(X(q(Math.cos(n*2.4)*.026,-.03+n*.014,Math.sin(n*2.4)*.026))),6,4);e.ell(`head`,[.016,.016,.016],J(`#f2c94c`),t.clone().multiply(X(q(0,.065,0))),8,6);break}case`chefhat`:{let t=J(`#fbfaf6`);e.prim(`head`,new pa(.056,.058,.06,18),t,X(i.clone().add(q(0,.02,0)),[0,0,.1])),[[0,.09,0,.05],[.035,.08,.03,.04],[-.035,.08,.03,.04],[.035,.08,-.03,.04],[-.035,.08,-.03,.04]].forEach(([n,r,a,o])=>e.ell(`head`,[o,o*.85,o],t,X(i.clone().add(q(n,r,a))),12,8));break}case`mustache`:{let t=J(`#3a2a20`);for(let n of[-1,1])e.blob(`head`,{ws:12,hs:8,color:t,matrix:X(q(Y.x+.09,Y.y-.032,.036*n),[.5*n,-.35*n,-.15]),deform:e=>e.set(e.x*.022,e.y*.016,e.z*.05)}),e.prim(`head`,new Sa(.016,.007,6,12,Math.PI*1.4),t,X(q(Y.x+.085,Y.y-.02,.082*n),[0,n>0?-.4:Math.PI+.4,0]));break}case`blackhat`:{let t=J(`#1b1a1f`),n=J(`#3b3a42`),r=X(i.clone().add(q(0,-.006,0)),[0,0,.06]);e.blob(`head`,{ws:22,hs:8,color:t,matrix:r.clone(),deform:e=>e.set(e.x*.115,e.y*.01+e.z*e.z*.012,e.z*.108)}),e.prim(`head`,new pa(.05,.062,.075,18),t,r.clone().multiply(X(q(0,.04,0)))),e.ell(`head`,[.052,.012,.042],J(`#121115`),r.clone().multiply(X(q(0,.076,0))),12,6),e.prim(`head`,new pa(.0625,.064,.016,18),n,r.clone().multiply(X(q(0,.013,0))));break}case`goldchain`:{let t=J(`#f0c14b`),n=J(`#c9962e`);for(let r=0;r<26;r++){let i=r/26*Math.PI*2,a=Math.max(0,Math.cos(i)),o=q(.13+Math.cos(i)*(.095+a*.03),.395-a*.085,Math.sin(i)*.1);e.ell(`body`,[.013,.009,.009],r%2?t:n,X(o,[i,0,0]),8,5)}if(r){let i=Kf(r,q(.95,.12,0),.008,0,1);e.prim(`body`,new pa(.03,.03,.008,18),t,i.clone().multiply(new V().makeRotationX(Math.PI/2))),e.prim(`body`,new Sa(.03,.004,6,18),n,i.clone().multiply(X(q(0,0,.004))))}break}case`propeller`:{e.blob(`head`,{ws:16,hs:10,color:J(`#c85b48`),matrix:X(i.clone().add(q(0,-.012,0))),deform:e=>e.set(e.x*.082,Math.max(0,e.y)*.06,e.z*.08)}),e.prim(`head`,new pa(.004,.004,.07,6),J(`#4a4640`),X(i.clone().add(q(0,.06,0))));let t=Rf.spin;e.ell(`spin`,[.07,.006,.018],c,X(t.clone().add(q(.06,0,0))),10,6),e.ell(`spin`,[.07,.006,.018],s,X(t.clone().add(q(-.06,0,0))),10,6),e.ell(`spin`,[.01,.01,.01],J(`#4a4640`),X(t.clone()),6,4);break}}}function up(){let e={vertexColors:!0,roughness:.78,metalness:0};return{clay:new Pa(e),metal:new Pa({...e,roughness:.3,metalness:.85}),glow:new Pa({...e,emissive:new H(`#dff08a`),emissiveIntensity:.12}),voidglow:new Pa({...e,emissive:new H(`#7a5cff`),emissiveIntensity:.12}),facet:new Pa({...e,flatShading:!0,roughness:.85}),gem:new Pa({...e,flatShading:!0,roughness:.12,metalness:.35})}}var dp=new wr(q(0,.4,0),1),fp=class{constructor(e,t,n=!0){let{geometry:r,kind:i}=ep(e),a={},o=[];for(let t of jf){let n=new Pi;n.name=t;let r=Nf[t];n.position.copy(Rf[t]).sub(r?Rf[r]:q(0,0,0)),r===`root`&&(n.position.y+=e.e.legs===`long`?Pf:0),t===`head`&&n.position.add(If(e.e)),a[t]=n,o.push(n),r&&a[r].add(n)}this.rest=Object.fromEntries(jf.map(e=>[e,a[e].position.clone()])),this.restRot=Object.fromEntries(jf.map(e=>[e,new dn])),e.e.posture===`upright`&&(this.restRot.body.z=.4,this.restRot.head.z=-.32,this.restRot.tail.z=-.22),this.pheno=e,this.lod=0;let s=new Ni(r,t[i]);s.add(a.root),s.updateMatrixWorld(!0),s.bind(new Ri(o));for(let e of jf)a[e].rotation.copy(this.restRot[e]);s.castShadow=n,s.receiveShadow=!0,s.boundingSphere=dp,this.mesh=s,this.bones=a,this.group=new kn,this.group.add(s)}setLod(e){e!==this.lod&&(this.lod=e,this.mesh.geometry=ep(this.pheno,e).geometry)}dispose(){this.mesh.skeleton.dispose()}},pp=()=>Fu(Object.fromEntries(Cu.map(e=>[e.id,[wu[e.id],wu[e.id]]])),null),Z=(e,t,n)=>new B(e,t,n),mp=e=>new H(e);function hp(e){return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function gp(e,t,n=0){let r=(e,t)=>{let r=Math.sin(e*127.1+t*311.7+n*91.3)*43758.5453;return r-Math.floor(r)},i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a,c=o*o*(3-2*o),l=s*s*(3-2*s);return(r(i,a)*(1-c)+r(i+1,a)*c)*(1-l)+(r(i,a+1)*(1-c)+r(i+1,a+1)*c)*l}var _p=class{constructor(){this.geos=[]}add(e,t,n,r=0){let i=e;i.attributes.uv&&i.deleteAttribute(`uv`),i.attributes.uv1&&i.deleteAttribute(`uv1`),i=i.index?i.toNonIndexed():i,n&&i.applyMatrix4(n),i.computeBoundingBox();let a=i.attributes.position,o=a.count,s=new Float32Array(o*3),c=typeof t==`function`?null:t,{min:l,max:u}=i.boundingBox,d=Math.max(.001,u.y-l.y);for(let e=0;e<o;e++){let n=c||t(a.getX(e),a.getY(e),a.getZ(e)),i=r?1-r*(1-Math.min(1,(a.getY(e)-l.y)/d)):1;s[e*3]=n.r*i,s[e*3+1]=n.g*i,s[e*3+2]=n.b*i}i.setAttribute(`color`,new _r(s,3)),this.geos.push(i)}mesh(e){let t=_f(this.geos,!1);for(let e of this.geos)e.dispose();t.computeBoundingSphere();let n=new xi(t,e);return n.castShadow=!0,n.receiveShadow=!0,n}},Q=(e,t=[0,0,0],n=[1,1,1])=>new V().compose(e,new jt().setFromEuler(new dn(...t)),new B(...n));function vp(e,t,n,r){let i=new ga(e,t);i.deleteAttribute(`uv`),i.deleteAttribute(`normal`),i=yf(i);let a=i.attributes.position,o=new B;for(let t=0;t<a.count;t++){o.fromBufferAttribute(a,t);let i=gp(o.x*2.2+r,o.z*2.2+o.y*1.7,r)-.5;o.multiplyScalar(1+i*n),o.y<-e*.35&&(o.y=-e*.35+(o.y+e*.35)*.4),a.setXYZ(t,o.x,o.y,o.z)}return i.computeVertexNormals(),i}var yp=[[0,40,`#8ea8ee`,.8,`#27345f`,`#0f1118`,.45,`#0d1330`,`#27305a`,.06],[4.8,32,`#8ea8ee`,.75,`#2a3764`,`#10121a`,.45,`#141b3a`,`#323a66`,.06],[5.8,3,`#ffb08a`,.9,`#8f94b8`,`#5a4c44`,.7,`#6878aa`,`#f2b597`,.25],[7.5,16,`#ffdcb2`,2.4,`#b4c8e4`,`#7b6a55`,.9,`#7fa9d6`,`#efdcc4`,.45],[11,42,`#fff1dc`,2.55,`#c4d8ee`,`#86745c`,.82,`#6fa3d8`,`#dfe6df`,.42],[15,36,`#ffe6c2`,2.8,`#c0d2e6`,`#8a7458`,.88,`#76a4d4`,`#ecdfc6`,.45],[17,16,`#ffcf96`,2.9,`#b8bfd6`,`#8a6a4c`,.85,`#7c98c6`,`#f4cf9e`,.45],[18.4,3,`#ff9564`,1.4,`#8e8cb0`,`#5e4a3c`,.7,`#5d6a9c`,`#f1a07a`,.3],[19.6,32,`#8ea8ee`,.6,`#34406e`,`#15151c`,.5,`#1d2550`,`#454c80`,.1],[24,40,`#8ea8ee`,.8,`#27345f`,`#0f1118`,.45,`#0d1330`,`#27305a`,.06]],bp=yp.map(e=>e.map(e=>typeof e==`string`?mp(e):e)),xp={el:0,sun:new H,sunI:0,hs:new H,hg:new H,hI:0,top:new H,hor:new H,env:0};function Sp(e){e=(e%24+24)%24;let t=1;for(;t<yp.length-1&&yp[t][0]<e;)t++;let n=bp[t-1],r=bp[t],i=(e-n[0])/Math.max(1e-6,r[0]-n[0]),a=e=>n[e]+(r[e]-n[e])*i;return xp.el=a(1),xp.sun.lerpColors(n[2],r[2],i),xp.sunI=a(3),xp.hs.lerpColors(n[4],r[4],i),xp.hg.lerpColors(n[5],r[5],i),xp.hI=a(6),xp.top.lerpColors(n[7],r[7],i),xp.hor.lerpColors(n[8],r[8],i),xp.env=a(9),xp}var Cp=mp(`#8c9a6c`),wp=mp(`#9aa3aa`),Tp=mp(`#c3c7c6`);function Ep(e){return e=(e%24+24)%24,e>=19.3||e<5.2}var Dp=class{constructor(e,t,n){this.renderer=e,this.scene=t,this.q=n,this.t=0,this.propMat=new Pa({vertexColors:!0,roughness:.86,metalness:0}),this.buildLights(),this.buildSky(),this.buildGround(),this.buildPlaza(),this.buildFountain(),this.buildProps(),this.buildLawnScatter(),this.buildSkyline(),t.add(this.static.mesh(this.propMat));let r=new Cs(e);t.environment=r.fromScene(new bf,.04).texture,r.dispose(),this.setHour(16.5,0)}buildLights(){let e=this.scene;this.hemi=new io(`#c0d2e6`,`#8a7458`,1),e.add(this.hemi);let t=this.sun=new So(`#ffe6c2`,3);t.castShadow=this.q.shadows;let n=this.q.shadowMap;t.shadow.mapSize.set(n,n);let r=t.shadow.camera;r.left=-10.5,r.right=10.5,r.top=8,r.bottom=-8,r.near=1,r.far=70,t.shadow.bias=-4e-4,t.shadow.normalBias=.03,t.shadow.radius=3,e.add(t),e.add(t.target),this.lampLights=[];let i=K.w/2+1.35,a=K.d/2+1.35;this.lampSpots=[Z(-i,0,a),Z(i,0,a),Z(-i,0,-a),Z(i,0,-a)];for(let t=0;t<this.q.lampLights;t++){let n=new yo(`#ffc27a`,0,6.5,2);n.position.copy(this.lampSpots[t]).setY(2.35),e.add(n),this.lampLights.push(n)}}buildSky(){let e=new Ma({uniforms:this.skyU={top:{value:mp(`#76a4d4`)},hor:{value:mp(`#ecdfc6`)},bot:{value:mp(`#c9c0a8`)},sunDir:{value:Z(0,1,0)},sunCol:{value:mp(`#ffffff`)},sunGlow:{value:1}},side:1,depthWrite:!1,fog:!1,vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.); gl_Position = projectionMatrix*p; gl_Position.z = gl_Position.w; }`,fragmentShader:`uniform vec3 top, hor, bot, sunDir, sunCol; uniform float sunGlow; varying vec3 vDir;
        void main(){ float h = vDir.y; vec3 c = h > 0. ? mix(hor, top, pow(clamp(h*1.6,0.,1.), .7)) : mix(hor, bot, clamp(-h*5.,0.,1.));
          float s = max(dot(normalize(vDir), sunDir), 0.); c += sunCol * (pow(s, 12.) * .35 + pow(s, 400.) * 1.2) * sunGlow;
          gl_FragColor = vec4(c, 1.); }`});this.sky=new xi(new xa(150,32,16),e),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky);let t=hp(7),n=new Float32Array(1500);for(let e=0;e<500;e++){let r=t()*Math.PI*2,i=.08+t()*.92,a=Math.sqrt(1-i*i);n.set([Math.cos(r)*a*140,i*140,Math.sin(r)*a*140],e*3)}let r=new Mr;r.setAttribute(`position`,new _r(n,3)),this.starMat=new Qi({color:`#fff4dc`,size:1.3,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1}),this.stars=new ra(r,this.starMat),this.stars.frustumCulled=!1,this.scene.add(this.stars),this.scene.fog=new Ln(`#ecdfc6`,38,120)}buildGround(){let e=new ya(160,160,72,72);e.rotateX(-Math.PI/2);let t=e.attributes.position,n=new Float32Array(t.count*3),r=mp(`#93a86b`),i=mp(`#b4c285`),a=mp(`#76905a`),o=mp(`#a3ac80`),s=new H;for(let e=0;e<t.count;e++){let c=t.getX(e),l=t.getZ(e),u=gp(c*.09,l*.09,1),d=gp(c*.5,l*.5,2);s.copy(r).lerp(i,u*.8).lerp(a,Math.max(0,d-.55)*1.2);let f=Math.hypot(c,l*1.3);s.lerp(o,Math.min(1,Math.max(0,(f-25)/40))),f>30?t.setY(e,((f-30)/50)**2*6*(.6+gp(c*.05,l*.05,3))):t.setY(e,-.035),n.set([s.r,s.g,s.b],e*3)}e.setAttribute(`color`,new _r(n,3)),e.computeVertexNormals();let c=new xi(e,new Pa({vertexColors:!0,roughness:.95}));c.receiveShadow=!0,this.scene.add(c)}buildPlaza(){let e=K.w+1.4,t=K.d+1.4,n=.46,r=new ua(.42500000000000004,.06,.42500000000000004),i=r.attributes.position;for(let e=0;e<i.count;e++)i.getY(e)>0&&(i.setX(e,i.getX(e)*.93),i.setZ(e,i.getZ(e)*.93));r.computeVertexNormals();let a=[],o=hp(11);for(let r=0,i=-t/2+n/2;i<t/2;i+=n,r++)for(let t=-e/2+n/2+r%2*n/2;t<e/2;t+=n){if(Math.hypot(t-zd.x,i-zd.z)<zd.r+.05)continue;let n=Math.max(-e/2+.2,Math.min(e/2-.2,t));a.push([n,i,o()])}let s=new qi(r,new Pa({roughness:.9}),a.length),c=new V,l=new H,u=[`#cfc3ad`,`#c5b79f`,`#d6ccb9`,`#bcae96`,`#cbbda4`].map(mp);a.forEach(([e,t,n],r)=>{c.compose(Z(e,-.03+n*.006,t),new jt().setFromEuler(new dn(0,(n-.5)*.06,0)),Z(1,1,1)),s.setMatrixAt(r,c);let i=gp(e*.35,t*.35,5);l.copy(u[Math.floor(n*u.length)]).lerp(mp(`#b3a58b`),i*.45),s.setColorAt(r,l)}),s.receiveShadow=!0,s.castShadow=!1,this.scene.add(s),this.static=new _p;let d=mp(`#bfb29c`),f=(e,t,n,r)=>this.static.add(new ua(n,.12,r),d,Q(Z(e,0,t)),.25);f(0,-t/2-.09,e+.36,.18),f(0,t/2+.09,e+.36,.18),f(-e/2-.09,0,.18,t),f(e/2+.09,0,.18,t)}buildFountain(){let e=this.static,t=zd,n=mp(`#d9d0c0`),r=mp(`#c9bfad`),i=(e,t=40)=>new _a(e.map(([e,t])=>new z(e,t)),t);e.add(i([[0,0],[t.r+.08,0],[t.r+.1,.08],[t.r,.44],[t.r+.1,.5],[t.r+.06,.56],[t.r-.16,.56],[t.r-.18,.12],[0,.12]]),(e,t)=>t>.5?n:r,Q(Z(t.x,0,t.z)),.3),e.add(i([[0,0],[.34,0],[.28,.2],[.2,.35],[.18,.9],[.24,1.02],[0,1.02]],20),r,Q(Z(t.x,.1,t.z)),.3),e.add(i([[0,0],[.2,0],[.62,.12],[.72,.26],[.66,.3],[.2,.2],[0,.2]],28),n,Q(Z(t.x,1,t.z)),.2),e.add(i([[0,0],[.1,0],[.085,.12],[.085,.2],[.16,.24],[.17,.3],[0,.3]],20),n,Q(Z(t.x,1.18,t.z)),.2);let a=rp(pp()),o=1.48,s=1.25;this.statue={x:t.x,y:o,z:t.z,k:s,yaw:.35};let c=mp(`#cfc5b3`),l=mp(`#b7ac98`);e.add(a,(e,t)=>(t-o)/s>.42?l:c,Q(Z(t.x,o,t.z),[0,-.35,0],[s,s,s]),.15);let u=new Pa({color:`#86bfcf`,roughness:.08,metalness:.05,transparent:!0,opacity:.88}),d=new xi(new fa(t.r-.15,40),u);d.rotation.x=-Math.PI/2,d.position.set(t.x,.44,t.z),d.receiveShadow=!0;let f=new xi(new fa(.62,28),u);f.rotation.x=-Math.PI/2,f.position.set(t.x,1.27,t.z),this.scene.add(d,f);let p=this.q.low?40:90;this.drops=new qi(new xa(.028,6,4),new Pa({color:`#cfeaf0`,roughness:.1,transparent:!0,opacity:.85}),p),this.drops.frustumCulled=!1;let m=hp(3);this.dropData=Array.from({length:p},(e,t)=>({a:m()*Math.PI*2,ph:m(),tier:t%3==0?0:1,sp:.8+m()*.4})),this.scene.add(this.drops),this.ripples=new qi(new ba(.9,1,32).rotateX(-Math.PI/2),new li({color:`#e6f4f6`,transparent:!0,opacity:.35,depthWrite:!1}),4),this.ripples.frustumCulled=!1,this.scene.add(this.ripples)}buildProps(){let e=this.static,t=mp(`#b87a48`),n=mp(`#a86c3d`),r=mp(`#3e4a3f`),i=mp(`#7c5b41`),a=(i,a,o)=>{let s=Q(Z(i,0,a),[0,o,0]),c=(t,n,r,i=[0,0,0])=>e.add(t,n,s.clone().multiply(Q(r,i)),.15);for(let e=0;e<3;e++)c(new ua(1.7,.045,.12),e%2?t:n,Z(0,.46,-.14+e*.14));for(let e=0;e<2;e++)c(new ua(1.7,.11,.04),e%2?t:n,Z(0,.66+e*.15,-.25),[-.18,0,0]);for(let e of[-.7,.7])c(new ua(.06,.46,.06),r,Z(e,.23,.1)),c(new ua(.06,.85,.06),r,Z(e,.42,-.22),[-.12,0,0]),c(new ua(.06,.05,.46),r,Z(e,.44,-.05))},o=K.d/2+1.55;a(-2.6,-o,0),a(2.2,-o,0),a(-.8,o+.1,Math.PI),a(3.4,o+.1,Math.PI),a(-K.w/2-1.7,1.6,Math.PI/2);for(let t of this.lampSpots){let n=Q(t);e.add(new pa(.16,.2,.25,12),r,n.clone().multiply(Q(Z(0,.12,0))),.2),e.add(new pa(.045,.06,2.1,10),r,n.clone().multiply(Q(Z(0,1.2,0)))),e.add(new pa(.2,.08,.1,8),r,n.clone().multiply(Q(Z(0,2.2,0)))),e.add(new ma(.24,.22,8),r,n.clone().multiply(Q(Z(0,2.62,0))))}this.globeMat=new Pa({color:`#fff3d6`,emissive:new H(`#ffc27a`),emissiveIntensity:0,roughness:.4});let s=new qi(new xa(.17,16,12),this.globeMat,this.lampSpots.length);this.lampSpots.forEach((e,t)=>s.setMatrixAt(t,Q(Z(e.x,2.38,e.z)))),this.scene.add(s);let c=Z(tf.x,0,tf.z),l=Q(c,[0,-.6,0]),u=mp(`#efe7d8`),d=mp(`#b7593f`),f=mp(`#3a302a`);e.add(new pa(.08,.1,2.2,10),mp(`#8a6a4a`),l.clone().multiply(Q(Z(0,1.1,0)))),e.add(new ua(1.1,.8,.8),u,l.clone().multiply(Q(Z(0,2.55,0))),.15),e.add(new ma(.9,.6,4),d,l.clone().multiply(Q(Z(0,3.25,0),[0,Math.PI/4,0])));for(let t=0;t<4;t++){let n=-.36+t*.24;e.add(new pa(.075,.075,.02,14),f,l.clone().multiply(Q(Z(n,2.62,.405),[Math.PI/2,0,0]))),e.add(new ua(.2,.03,.12),mp(`#8a6a4a`),l.clone().multiply(Q(Z(n,2.46,.46))))}e.add(new ua(1.3,.04,.34),mp(`#8a6a4a`),l.clone().multiply(Q(Z(0,2.13,.5))));let p=hp(21),m=[`#7f9c5a`,`#6c8a4b`,`#93ad6a`,`#86a15f`].map(mp);this.trees=[];let h=(e,t,n)=>{let r=new _p,a=Q(Z(e,0,t),[0,p()*6,0],[n,n,n]);r.add(new pa(.13,.22,2.2,9),i,a.clone().multiply(Q(Z(0,1.1,0),[(p()-.5)*.1,0,(p()-.5)*.1])),.35);let o=5+Math.floor(p()*3);for(let e=0;e<o;e++){let t=e/o*Math.PI*2+p(),n=e===0?0:.55+p()*.35,i=vp(.75+p()*.35,2,.35,p()*50),s=m[Math.floor(p()*m.length)];r.add(i,(e,t)=>s.clone().multiplyScalar(.8+.25*Math.min(1,Math.max(0,(t-2)/2.4))),a.clone().multiply(Q(Z(Math.cos(t)*n,2.6+(e===0?.7:p()*.6),Math.sin(t)*n))))}let s=new Pa({vertexColors:!0,roughness:.86,transparent:!0,opacity:1}),c=r.mesh(s);this.scene.add(c),this.trees.push({mesh:c,mat:s,c:Z(e,3.1*n,t),r:1.75*n,o:1})};for(let[e,t,n]of[[-10.6,-7.4,1.25],[-5.2,-10.2,1.05],[1.4,-10.9,1.3],[6.4,-10.3,1.1],[12.2,-6.6,1.2],[-11.8,-1.2,1.1],[12.3,1.4,1.05],[-11.2,6.2,.95],[11.4,7.4,1],[-14.5,-10.5,1.4],[15.5,-11.5,1.5],[-2,-14,1.6],[8,-15,1.4]])h(e,t,n);for(let t=0;t<30;t++){let n=-12+t*.85,r=-K.d/2-5-Math.sin(t*.7)*.25;Math.abs(n-c.x)<1.1||e.add(vp(.55+p()*.15,1,.3,t*3.1),m[t%4].clone().multiplyScalar(.85),Q(Z(n,.35,r),[0,p()*3,0],[1,.85,1]),.35)}for(let[t,n]of[[-10.4,4.2],[-10.9,3.3],[10.5,4.4],[11,3.5],[-10.4,-4.4],[10.6,-3.8]])e.add(vp(.5+p()*.2,1,.35,t*n),m[Math.floor(p()*4)],Q(Z(t,.3,n)),.4)}buildLawnScatter(){let e=hp(33),t=new ma(.025,.22,3);t.translate(0,.11,0);let n=_f([0,1,2].map(e=>t.clone().applyMatrix4(Q(Z((e-1)*.03,0,0),[0,e*2,(e-1)*.35])))),r=[];for(;r.length<(this.q.low?350:900);){let t=(e()-.5)*34,n=(e()-.5)*24;Math.abs(t)<K.w/2+1.1&&Math.abs(n)<K.d/2+1.1||r.push([t,n])}let i=new qi(n,new Pa({roughness:.9}),r.length),a=new H,o=mp(`#7f9a58`),s=mp(`#a9bd7c`);r.forEach(([t,n],r)=>{let c=.7+e()*.7;i.setMatrixAt(r,Q(Z(t,-.03,n),[0,e()*6,0],[c,c*(.8+e()*.5),c])),i.setColorAt(r,a.copy(o).lerp(s,e()))}),i.receiveShadow=!0,this.scene.add(i);let c=[],l=[`#f2c94c`,`#f6f1e6`,`#e58bad`,`#c95f5f`,`#a98cc9`].map(mp);for(let[t,n,r]of[[-10.2,7.8,26],[10.2,8,26],[-11.8,-3.2,14],[11.8,-2.4,14],[-3.5,7.6,18],[3.5,7.8,18]])for(let i=0;i<r;i++)c.push([t+(e()-.5)*2.2,n+(e()-.5)*1.1,l[Math.floor(e()*l.length)]]);let u=new qi(new ga(.07,0),new Pa({roughness:.7}),c.length);c.forEach(([t,n,r],i)=>{u.setMatrixAt(i,Q(Z(t,.12+e()*.08,n))),u.setColorAt(i,r)}),u.castShadow=!0,this.scene.add(u)}buildSkyline(){let e=hp(55),t=new _p,n=[],r=[`#b9b3c4`,`#c7bfb8`,`#aeb0bf`,`#c2b6ad`].map(mp);for(let i=0;i<26;i++){let a=-60+i*4.8+e()*2,o=-48-e()*14,s=3+e()*3,c=6+e()*16,l=3+e()*2;t.add(new ua(s,c,l),r[i%4],Q(Z(a,c/2-.5,o))),e()<.4&&t.add(new ma(s*.6,2.5,4),r[(i+1)%4],Q(Z(a,c+.7,o),[0,Math.PI/4,0]));for(let t=2;t<c-1;t+=1.6)for(let r=-s/2+.6;r<s/2-.4;r+=1)e()<.45&&n.push(Z(a+r,t,o+l/2+.02))}let i=t.mesh(new Pa({vertexColors:!0,roughness:1}));i.castShadow=i.receiveShadow=!1,this.scene.add(i),this.winMat=new li({color:`#ffd28a`,transparent:!0,opacity:0,fog:!0});let a=new qi(new ya(.45,.6),this.winMat,n.length);n.forEach((e,t)=>a.setMatrixAt(t,Q(e))),this.scene.add(a)}setHour(e,t){if(this.hour!==void 0&&Math.abs(e-this.hour)<.01&&t===this.night&&!this.dirtyLight)return;this.dirtyLight=!1;let n=Sp(e),r=Ep(e);this.hour=e,this.night=t;let i=r?2.1:At.degToRad(30+(At.clamp(e,5,19.5)-8)/8.5*120),a=At.degToRad(Math.max(2,n.el)),o=(this._dir||=Z(0,1,0)).set(Math.cos(i)*Math.cos(a),Math.sin(a),Math.sin(i)*Math.cos(a)).normalize();this.sun.position.copy(o).multiplyScalar(30),this.sun.target.position.set(0,0,0),this.sun.color.copy(n.sun),this.sun.intensity=n.sunI,this.hemi.color.copy(n.hs),this.hemi.groundColor.copy(n.hg),this.hemi.intensity=n.hI,this.scene.environmentIntensity=n.env,this.skyU.top.value.copy(n.top),this.skyU.hor.value.copy(n.hor),this.skyU.bot.value.copy(n.hor).lerp(Cp,.5),this.skyU.sunDir.value.copy(o),this.skyU.sunCol.value.copy(n.sun),this.skyU.sunGlow.value=r?.25:1,this.scene.fog.color.copy(n.hor),this.starMat.opacity=t*.9;let s=At.clamp(t*1.2,0,1);this.globeMat.emissiveIntensity=.15+s*2.2;for(let e of this.lampLights)e.intensity=s*5;this.winMat.opacity=s*.9}setRain(e){e<=.001||(this.dirtyLight=!0,this.sun.intensity*=1-.6*e,this.hemi.intensity*=1-.2*e,this.skyU.top.value.lerp(wp,.7*e),this.skyU.hor.value.lerp(Tp,.6*e),this.skyU.sunGlow.value*=1-e,this.scene.fog.color.lerp(Tp,.6*e))}updateOcclusion(e,t,n){let r=this._ends||=[null,Z(-K.w/2,.3,-K.d/2),Z(K.w/2,.3,-K.d/2),Z(-K.w/2,.3,K.d/2),Z(K.w/2,.3,K.d/2)];r[0]=t;let i=this._seg||=new Xo,a=this._q||=new B;for(let t of this.trees){let o=e.distanceTo(t.c)<t.r*1.3;for(let n of r){if(o)break;i.set(e,n),i.closestPointToPoint(t.c,!0,a),o=a.distanceTo(t.c)<t.r&&a.distanceTo(n)>.5}t.o+=((o?.18:1)-t.o)*Math.min(1,n*6||1),t.mat.opacity=t.o,t.mat.depthWrite=t.o>.95}}treeOpacity(){return this.trees.map(e=>+e.o.toFixed(2))}update(e){this.t+=e;let t=zd,n=this._m||=new V,r=this.t,i=this._qi||=new jt,a=this._p||=new B,o=this._sc||=new B;this.dropData.forEach((e,s)=>{let c=(r*e.sp*.8+e.ph)%1,l,u,d;if(e.tier===0){let t=this.statue,r=Math.cos(t.yaw),f=Math.sin(t.yaw),p=t.x+r*.29*t.k,m=t.z+f*.29*t.k,h=t.y+.485*t.k,g=(e.a-Math.PI)*.01,_=.03+c*.26;l=p+r*_-f*g,d=m+f*_+r*g,u=h+c*.28-c*c*(h+.28-1.27),n.compose(a.set(l,u,d),i,o.set(.6,.6,.6)),this.drops.setMatrixAt(s,n);return}{let n=.72+c*.35;l=t.x+Math.cos(e.a)*n,d=t.z+Math.sin(e.a)*n,u=1.28-c*c*.84}n.makeTranslation(l,u,d),this.drops.setMatrixAt(s,n)}),this.drops.instanceMatrix.needsUpdate=!0;for(let e=0;e<4;e++){let s=.85+(r*.35+e/4)%1*.45;n.compose(a.set(t.x,.445,t.z),i,o.set(s,1,s)),this.ripples.setMatrixAt(e,n)}this.ripples.instanceMatrix.needsUpdate=!0}},Op=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r)),kp=new B;function Ap(e,t,n){kp.subVectors(e.origin,t);let r=kp.dot(e.direction),i=r*r-(kp.lengthSq()-n*n);if(i<0)return 1/0;let a=-r-Math.sqrt(i);return a>0?a:1/0}var jp=new B,Mp={x:0,y:0,z:0,ndcX:0,ndcY:0};function Np(e,t,n,r,i=innerWidth,a=innerHeight){return jp.set(e,t,n).project(r),Mp.x=(jp.x*.5+.5)*i,Mp.y=(-jp.y*.5+.5)*a,Mp.z=jp.z,Mp.ndcX=jp.x,Mp.ndcY=jp.y,Mp}var Pp={2:`#3fbf5f`,1:`#f2c230`},Fp=50,Ip=(e,t,n)=>new B(e,t,n),Lp=[`body`,`head`,`wingL`,`wingR`,`legL`,`legR`,`tail`,`eyeL`,`eyeR`],Rp=new B,zp=new V,Bp=new jt,Vp=new B,Hp=new B,Up=new B(0,1,0),Wp=Math.PI*2;function Gp(e,t,n,r){return e+(((t-e+Math.PI)%Wp+Wp)%Wp-Math.PI)*(1-Math.exp(-n*r))}function Kp(e,t){let n=document.createElement(`canvas`);n.width=n.height=64;let r=n.getContext(`2d`),i=r.createRadialGradient(32,32,0,32,32,32);i.addColorStop(0,e),i.addColorStop(1,t),r.fillStyle=i,r.fillRect(0,0,64,64);let a=new oa(n);return a.colorSpace=Ve,a}function qp(e){return e<9?.58:e<18?.78:1}var Jp=class{constructor(e,t,n){this.pid=e.id,this.rig=new fp(e.pheno,t,n),this.g=this.rig.group,this.b=this.rig.bones,this.rest=this.rig.rest,this.restRot=this.rig.restRot,this.vis=Ip(e.x,e.y,e.z),this.yaw=-e.dir,this.walkPh=0,this.seed=e.id*7.31%10,this.blinkAt=1+Math.random()*3,this.blinkT=0,this.glow=e.pheno.e.glow===`glow`,this.googly=e.pheno.e.eye===`googly`,this.rev=e.rev||0,this.baseSize=Qf(e.pheno,e.jit),this.height=Zf(e.pheno)}size(e,t){return this.baseSize*qp(t-e.born)}update(e,t,n,r){let i=this.b,a=this.rest,o=Rp.set(e.x,e.y,e.z);o.distanceTo(this.vis)>1.2?this.vis.copy(o):(this.vis.x=Op(this.vis.x,o.x,18,n),this.vis.y=Op(this.vis.y,o.y,18,n),this.vis.z=Op(this.vis.z,o.z,18,n)),this.yaw=Gp(this.yaw,-e.dir,e.flying?4:11,n);let s=this.size(e,t),c=t-e.born;this.g.position.copy(this.vis),this.g.rotation.set(0,this.yaw,0),this.g.scale.setScalar(s);for(let e of Lp)i[e].position.copy(a[e]),i[e].rotation.copy(this.restRot[e]),i[e].scale.set(1,1,1);i.root.rotation.set(0,0,0),i.root.position.set(0,0,0);let l=c<9?1.32:c<18?1.16:1;i.head.scale.setScalar(l);let u=e.state,d=(u===`walk`||u===`moonwalk`)&&Math.hypot(e.tx-e.x,e.tz-e.z)>.005,f=e.pheno.e.gait,p=f===`speedy`?1.6:f===`sluggish`?.55:1,m=Math.sin(r*2.3*p+this.seed)*.5+.5,h=1;if(e.flying){let e=Math.sin(r*24+this.seed);i.wingL.rotation.x=1+e*.85,i.wingR.rotation.x=-(1+e*.85),i.legL.rotation.z=i.legR.rotation.z=-1.1,i.body.rotation.z=.25,i.tail.rotation.z=-.2}else if(u===`jump`){let n=Math.min(1,(t-e.stateAt)/.55),r=Math.sin(n*Math.PI);i.root.position.y=r*.09,i.wingL.rotation.x=r*.7,i.wingR.rotation.x=-r*.7,i.legL.rotation.z=i.legR.rotation.z=-r*.5,i.head.rotation.z+=r*.2}else if(u===`twirl`){let n=Math.min(1,(t-e.stateAt)/.9),r=n*n*(3-2*n);i.root.rotation.y=r*Wp,i.wingL.rotation.x=.35*Math.sin(n*Math.PI),i.wingR.rotation.x=-.35*Math.sin(n*Math.PI),i.root.position.y=Math.sin(n*Math.PI)*.02}else if(u===`hop`){let e=Math.sin(r*30+this.seed);i.wingL.rotation.x=.9+e*.8,i.wingR.rotation.x=-(.9+e*.8),i.legL.rotation.z=i.legR.rotation.z=-.7,i.body.rotation.z=-.12,i.tail.rotation.z=-.15}else if(e.held||u===`abducted`){let e=Math.sin(r*13+this.seed);i.wingL.rotation.x=.55+e*.45,i.wingR.rotation.x=-(.55+e*.45),i.legL.rotation.z=-.35+Math.sin(r*5)*.2,i.legR.rotation.z=-.35-Math.sin(r*5)*.2,i.root.rotation.x=Math.sin(r*3)*.12,i.head.rotation.y=Math.sin(r*4)*.4}else if(u===`tumble`){let n=Math.min(1,(t-e.stateAt)/.75),r=n*Wp,a=.28;i.root.rotation.z=r,i.root.position.set(a*Math.sin(r),a-a*Math.cos(r)+Math.sin(n*Math.PI)*.32,0),i.wingL.rotation.x=.6,i.wingR.rotation.x=-.6}else if(u===`roll`){let n=-Math.min(1,(t-e.stateAt)/1.1)*Wp*2,r=.24;i.root.rotation.z=n,i.root.position.set(r*Math.sin(n),r-r*Math.cos(n),0),i.head.rotation.z=-.6,i.legL.rotation.z=i.legR.rotation.z=-.9}else if(u===`blown`){let e=Math.sin(r*18+this.seed);i.wingL.rotation.x=.9+e*.5,i.wingR.rotation.x=-(.9+e*.5),i.root.rotation.x=Math.sin(r*5+this.seed)*.25,i.body.rotation.z=.2,i.legL.rotation.z=Math.sin(r*20)*.7,i.legR.rotation.z=-Math.sin(r*20)*.7,i.root.position.y=.04+Math.abs(Math.sin(r*9))*.05}else if(u===`loaf`)i.head.position.y-=.05,i.head.position.x-=.02,i.head.rotation.z+=.15,i.body.scale.set(1.08,1.06+m*.02,1.12),i.body.position.y-=.03,i.legL.scale.y=i.legR.scale.y=.6,i.tail.rotation.z=.1;else if(u===`sync`){let n=(t-e.stateAt)*1.6%1,r=n<.25?n/.25:n<.4?1:Math.max(0,1-(n-.4)/.3);i.head.rotation.z+=-r*1.05,i.head.position.x+=r*.02,i.body.rotation.z=-r*.12,i.tail.rotation.z=r*.15}else if(u===`stare`)i.body.rotation.z=-.08,i.head.position.x+=.025,i.head.rotation.z+=-.05,h=2;else if(u===`statue`)i.head.rotation.z+=.18,i.body.scale.set(1.02,1.04,1.04),i.tail.rotation.z=-.1,h=2;else if(u===`dance`){let e=r*7.5+this.seed;i.root.position.y=Math.abs(Math.sin(e))*.06,i.root.rotation.y=Math.sin(e*.5)*.7,i.head.rotation.z=Math.sin(e)*.35,i.head.position.x+=Math.sin(e*2)*.015,i.wingL.rotation.x=.25+Math.max(0,Math.sin(e))*.6,i.wingR.rotation.x=-(.25+Math.max(0,Math.sin(e+1))*.6),i.tail.rotation.z=Math.sin(e*2)*.2}else if(u===`look`)i.head.rotation.z+=.3,i.head.rotation.y=Math.sin(r*.3+this.seed)*.15;else if(u===`sleep`)i.head.rotation.z+=.5,i.head.position.y-=.045,i.head.position.x-=.03,i.body.scale.set(1.04,1.02+m*.03,1.06),i.body.position.y-=.02,i.legL.scale.y=i.legR.scale.y=.8,h=0;else if(d||u===`walk`||u===`moonwalk`){d&&(this.walkPh+=n*(e.v/.5)*13*(u===`moonwalk`?-1:1)*(f===`strutter`?.8:1));let t=this.walkPh,r=Math.sin(t),a=f===`strutter`;i.legL.rotation.z=r*(a?.95:.6),i.legR.rotation.z=-r*(a?.95:.6),i.body.position.y+=Math.abs(Math.cos(t))*(a?.02:.012),i.body.rotation.x=r*(a?.09:.05),a&&(i.body.rotation.z+=.12,i.body.scale.set(1.04,1.06,1.06));let o=(t/Math.PI%1+1)%1;i.head.position.x+=((o<.28?o/.28:1-(o-.28)/.72)*.042-.02)*(a?1.6:1),i.tail.rotation.z=-Math.cos(t)*.06+(a?-.15:0)}else if(u===`peck`){let n=((t-e.stateAt)*1.25+this.seed)%1,r=n<.25?n/.25:n<.4?1:Math.max(0,1-(n-.4)/.3);i.head.rotation.z+=-r*1.05,i.head.position.x+=r*.02,i.body.rotation.z=-r*.12,i.tail.rotation.z=r*.15}else if(u===`court`){let e=Math.max(0,Math.sin(r*4.5+this.seed));i.body.scale.set(1.06,1.1,1.1),i.head.rotation.z=-e*.45,i.head.position.y+=.01,i.tail.rotation.z=.25+e*.1,i.wingL.rotation.x=.15*e,i.wingR.rotation.x=-.15*e,i.root.rotation.y=Math.sin(r*1.3+this.seed)*.25}else i.body.scale.y=1+m*.02,i.head.rotation.y=Math.sin(r*.6*p+this.seed*3)*.45*Math.max(0,Math.sin(r*.23*p+this.seed)),i.head.rotation.z=Math.sin(r*.9*p+this.seed)*.06-(f===`sluggish`?.12:0);if(h===1&&(this.blinkAt-=n,this.blinkAt<0&&(this.blinkT=.13,this.blinkAt=2+Math.random()*4),this.blinkT>0&&(this.blinkT-=n,h=0)),i.eyeL.scale.y=i.eyeR.scale.y=h?f===`sluggish`&&h===1?.55:1:.12,this.googly){let e=d?3.2:1;i.eyeL.rotation.x=Math.sin(r*9.3+this.seed)*.5*e,i.eyeL.rotation.y=Math.cos(r*7.1)*.3*e,i.eyeR.rotation.x=Math.sin(r*8.1+2)*.5*e,i.eyeR.rotation.y=Math.cos(r*6.7+this.seed)*.3*e,i.eyeL.scale.y=i.eyeR.scale.y=1}return i.spin.rotation.y+=n*18,s}dispose(){this.rig.dispose()}},Yp=class{constructor(e,t,n){this.scene=e,this.mats=t,this.q=n,this.views=new Map,this.root=new kn,e.add(this.root);let r=Kp(`rgba(40,34,28,0.55)`,`rgba(40,34,28,0)`);this.shadows=new qi(new ya(1,1).rotateX(-Math.PI/2),new li({map:r,transparent:!0,depthWrite:!1}),80),this.shadows.frustumCulled=!1,this.shadows.renderOrder=1,e.add(this.shadows);let i=new Hr({map:Kp(`rgba(234,246,168,0.9)`,`rgba(234,246,168,0)`),blending:2,depthWrite:!1,transparent:!0});this.halos=Array.from({length:12},()=>{let t=new ni(i);return t.visible=!1,e.add(t),t}),this.haloMat=i,this.eggGeo=new xa(1,16,12).scale(.07,.09,.07),this.eggMat=new Pa({color:`#fbf3e0`,roughness:.55});let a=new Sa(.12,.045,6,16).rotateX(Math.PI/2),o=a.attributes.position;for(let e=0;e<o.count;e++)o.setY(e,o.getY(e)*.6+Math.sin(e*2.7)*.008);a.computeVertexNormals(),this.nestGeo=a,this.nestMat=new Pa({color:`#b08d5a`,roughness:1}),this.eggPool=[],this.eggViews=new Map;let s=new da(.075,.5,6,14).rotateZ(Math.PI/2);this.bread=new kn,this.breadLoaf=new xi(s,new Pa({color:`#d9a15a`,roughness:.8})),this.breadLoaf.position.y=.07,this.breadLoaf.castShadow=!0;let c=new Pa({color:`#f1d6a2`,roughness:.9});for(let e=0;e<4;e++){let t=new xi(new ua(.03,.02,.1),c);t.position.set(-.2+e*.13,.07,0),t.rotation.y=.6,this.breadLoaf.add(t),t.position.y=.065}this.bread.add(this.breadLoaf),this.bread.visible=!1,e.add(this.bread),this.crumbs=new qi(new ga(.018,0),c,24),this.crumbs.frustumCulled=!1,this.crumbs.count=0,e.add(this.crumbs),this.goldMat=new Pa({color:`#e8b64c`,roughness:.22,metalness:.9,emissive:new H(`#5a3a00`),emissiveIntensity:.4});let l=this.ufo=new kn,u=new xi(new xa(1,28,14).scale(1.1,.22,1.1),new Pa({color:`#b9c2cc`,metalness:.8,roughness:.3})),d=new xi(new xa(.45,20,12,0,Math.PI*2,0,Math.PI/2),new Pa({color:`#9fe0ff`,roughness:.1,emissive:new H(`#3aa0c0`),emissiveIntensity:.6}));d.position.y=.12,l.add(u,d),this.ufoLights=new Pa({color:`#fff3b0`,emissive:new H(`#ffd84a`),emissiveIntensity:1.5});for(let e=0;e<8;e++){let t=new xi(new xa(.06,8,6),this.ufoLights);t.position.set(Math.cos(e/8*Math.PI*2)*1.02,-.02,Math.sin(e/8*Math.PI*2)*1.02),l.add(t)}this.beam=new xi(new pa(.25,1,1,24,1,!0).translate(0,-.5,0),new li({color:`#c8fbff`,transparent:!0,opacity:.3,depthWrite:!1,side:2,blending:2})),l.add(this.beam),l.visible=!1,u.castShadow=!0,e.add(l);let f=Fu(mf({pied:`white`,crest:`lace`,tail:`fantail`,glow:`glow`,eye:`pearl`,posture:`upright`}),`crown`);this.goddessRig=new fp(f,t,!1);let p=this.goddess=new kn;p.add(this.goddessRig.group),this.goddessRig.group.scale.setScalar(4.2);let m=new Pa({color:`#fff3b0`,emissive:new H(`#ffd24a`),emissiveIntensity:1.5}),h=new xi(new Sa(.62,.05,10,40),m);h.position.set(.75,3.45,0),h.rotation.set(Math.PI/2-.25,0,0);let g=new ni(this.haloMat.clone());g.material.color.set(`#ffe6a0`),g.material.opacity=.55,g.scale.setScalar(7),g.position.set(0,1.6,0),p.add(h,g),this.godHalo=h,this.godAura=g,this.godBeam=new xi(new pa(.12,.5,1,20,1,!0).translate(0,-.5,0),new li({color:`#ffe9a6`,transparent:!0,opacity:.35,depthWrite:!1,side:2,blending:2})),p.visible=!1,this.godBeam.visible=!1,e.add(p,this.godBeam),this.rainN=420,this.rainMesh=new qi(new ua(.012,.35,.012),new li({color:`#dbe8f2`,transparent:!0,opacity:.55,depthWrite:!1}),this.rainN),this.rainMesh.frustumCulled=!1,this.rainMesh.count=0,e.add(this.rainMesh),this.rainData=Array.from({length:this.rainN},()=>[Math.random(),Math.random(),Math.random()]),this.poop=new qi(new xa(1,8,5).scale(.05,.012,.04),new Pa({color:`#f1ece0`,roughness:.7}),16),this.poop.frustumCulled=!1,this.poop.receiveShadow=!0,e.add(this.poop),this.sel=new xi(new ba(.3,.34,40,1).rotateX(-Math.PI/2),new li({color:`#c67139`,transparent:!0,opacity:.9,depthWrite:!1}));let _=new xi(new ba(.37,.39,40,1,0,Math.PI*1.6).rotateX(-Math.PI/2),this.sel.material);this.sel.add(_),this.selDash=_,this.sel.visible=!1,this.sel.renderOrder=2,e.add(this.sel);let v=t=>{let n=new qi(t,new li({toneMapped:!1}),Fp);return n.frustumCulled=!1,n.count=0,n.setColorAt(0,new H),e.add(n),n};this.findGems=v(new va(1,0)),this.findRings=v(new ba(.33,.4,32,1).rotateX(-Math.PI/2)),this.findRings.renderOrder=2,this.findMeshes=[this.findGems,this.findRings],this._fc={1:new H(Pp[1]),2:new H(Pp[2])}}view(e){return this.views.get(e)}update(e,t,n,r,i=null){let a=this._seen||=new Set,o=zp,s=Bp.identity(),c=this.shadows.instanceMatrix.count,l=0,u=0;a.clear();for(let i of e.pigeons){a.add(i.id);let d=this.views.get(i.id);d&&d.rev!==(i.rev||0)&&(this.root.remove(d.g),d.dispose(),this.views.delete(i.id),d=null),d||(d=new Jp(i,this.mats,this.q.birdShadows),this.views.set(i.id,d),this.root.add(d.g));let f=d.update(i,e.t,t,n);r&&d.rig.setLod(+(r.distanceTo(d.vis)>7.5*Math.max(1,f)));let p=d.vis.y,m=f*.62*Math.max(.3,1-p*.5);if(o.compose(Hp.set(d.vis.x+.02*f,.004,d.vis.z),s,Vp.set(m*1.2,1,m)),(!i.flying||p<3)&&l<c&&this.shadows.setMatrixAt(l++,o),d.glow&&u<this.halos.length){let t=this.halos[u++];t.visible=!0,t.position.set(d.vis.x,d.vis.y+.3*f,d.vis.z);let n=f*(.8+e.night*.9);t.scale.set(n,n,n)}}this.shadows.count=l,this.shadows.instanceMatrix.needsUpdate=!0,this.updateFind(e,n,r,i),this.haloMat.opacity=.12+e.night*.7;for(let e=u;e<this.halos.length;e++)this.halos[e].visible=!1;for(let[e,t]of this.views)a.has(e)||(this.root.remove(t.g),t.dispose(),this.views.delete(e));(this.pruneT=(this.pruneT||0)+t)>20&&(this.pruneT=0,np(new Set([...this.views.values()].map(e=>e.rig.mesh.geometry)))),this.mats.glow.emissiveIntensity=.08+e.night*1.2,this.mats.voidglow.emissiveIntensity=.15+e.night*.6;let d=a;d.clear();for(let t of e.eggs){d.add(t.id);let r=this.eggViews.get(t.id);r||(r=this.eggPool.pop()||this.makeEgg(),r.visible=!0,this.eggViews.set(t.id,r)),r.position.set(t.x,0,t.z),r.children[1].material=t.golden?this.goldMat:this.eggMat;let i=Math.max(0,(e.t-t.laidAt)/(t.hatchAt-t.laidAt)),a=Math.sin(n*(6+i*16))*(.08+i*.3);r.children[1].rotation.set(a*.6,0,a),r.scale.setScalar(Math.min(1,(e.t-t.laidAt)*4+.2))}for(let[e,t]of this.eggViews)d.has(e)||(t.visible=!1,this.eggPool.push(t),this.eggViews.delete(e));let f=e.ufo;this.ufo.visible=!!f,f&&(this.ufo.position.set(f.x,f.y,f.z),this.ufo.rotation.y=n*1.5,this.beam.visible=f.beam>0,this.beam.scale.set(1,f.y,1),this.beam.material.opacity=.22+Math.sin(n*9)*.08);let p=e.goddess;if(this.goddess.visible=!!p,p){this.goddess.position.set(p.x,p.y,p.z),this.goddess.rotation.y=-Math.PI/2+Math.sin(n*.4)*.2;let e=this.goddessRig.bones,t=Math.sin(n*2.2);e.wingL.rotation.x=1.25+t*.25,e.wingR.rotation.x=-(1.25+t*.25),e.legL.rotation.z=e.legR.rotation.z=-.6,e.tail.rotation.z=-.1,this.godHalo.rotation.z=n*.6,this.godAura.material.opacity=.4+Math.sin(n*1.7)*.1;let r=p.beam,i=this.godBeam;if(i.visible=!!r,r){Hp.set(p.x,p.y+1.3,p.z),Rp.set(r.x-Hp.x,.05-Hp.y,r.z-Hp.z);let e=Rp.length();i.position.copy(Hp),i.quaternion.setFromUnitVectors(Vp.set(0,-1,0),Rp.normalize()),i.scale.set(1,e,1),i.material.opacity=.3+Math.sin(n*11)*.08}}else this.godBeam.visible=!1;this.rainAmt=(this.rainAmt||0)+(+!!e.rain-(this.rainAmt||0))*Math.min(1,t*1.5);let m=Math.floor(this.rainN*this.rainAmt);for(let e=0;e<m;e++){let t=this.rainData[e],r=9-(n*(7+t[2]*3)+t[2]*9)%9;o.compose(Hp.set((t[0]-.5)*18,r,(t[1]-.5)*13),s.identity(),Vp.set(1,1,1)),this.rainMesh.setMatrixAt(e,o)}this.rainMesh.count=m,m&&(this.rainMesh.instanceMatrix.needsUpdate=!0);let h=e.bread;if(this.bread.visible=!!h,h){this.bread.position.set(h.x,0,h.z),this.bread.rotation.y=h.a;let e=Math.max(.15,h.hp);this.breadLoaf.scale.set(e,1,1);let t=0;for(let e=0;e<24*(1-h.hp)+4;e++){let n=e*2.39+h.a,r=.15+e*.137%.5;if(o.compose(Hp.set(h.x+Math.cos(n)*r,.01,h.z+Math.sin(n)*r*.7),s.setFromAxisAngle(Up,e),Vp.set(1,.6,1)),this.crumbs.setMatrixAt(t++,o),t>=24)break}this.crumbs.count=t,this.crumbs.instanceMatrix.needsUpdate=!0}else this.crumbs.count=0;let g=0;for(let t of e.poops){let n=Math.max(.05,1-(e.t-t.at)/30);o.compose(Hp.set(t.x,.002,t.z),s.setFromAxisAngle(Up,t.r*6),Vp.set(n,1,n)),this.poop.setMatrixAt(g++,o)}this.poop.count=g,this.poop.instanceMatrix.needsUpdate=!0;let _=e.selId==null?null:e.byId(e.selId),v=_&&this.views.get(_.id);if(this.sel.visible=!!v&&!_.flying,this.sel.visible){let t=v.size(_,e.t);this.sel.position.set(v.vis.x,.012,v.vis.z),this.sel.scale.setScalar(t*1.1),this.selDash.rotation.y=n*.8}}updateFind(e,t,n,r){let i=0;if(r){let a=zp,o=Bp;for(let s of e.pigeons){if(s.flying||i>=Fp)continue;let c=Vu(s.genome,s.pheno,r);if(!c)continue;let l=this.views.get(s.id);if(!l)continue;let u=l.size(s,e.t),d=this._fc[c],f=n?At.clamp(n.distanceTo(l.vis)/9,.8,2.2):1;o.setFromAxisAngle(Up,t*2+s.id),a.compose(Hp.set(l.vis.x,l.vis.y+l.height*u+.12*f+Math.sin(t*3+s.id)*.03*f,l.vis.z),o,Vp.set(.06*f,.11*f,.06*f)),this.findGems.setMatrixAt(i,a),this.findGems.setColorAt(i,d),a.compose(Hp.set(l.vis.x,.014,l.vis.z),o.identity(),Vp.setScalar(u*1.05)),this.findRings.setMatrixAt(i,a),this.findRings.setColorAt(i,d),i++}}if(i||this.findGems.count)for(let e of this.findMeshes)e.count=i,e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0}makeEgg(){let e=new kn,t=new xi(this.nestGeo,this.nestMat);t.position.y=.02,t.receiveShadow=t.castShadow=!0;let n=new xi(this.eggGeo,this.eggMat);return n.position.y=.085,n.castShadow=!0,e.add(t,n),this.scene.add(e),e}pick(e,t){let n=null,r=1/0,i=Hp;for(let a of t.pigeons){let o=this.views.get(a.id);if(!o||a.flying)continue;let s=o.size(a,t.t),c=Ap(e,i.set(o.vis.x+.03*s,o.vis.y+.3*s,o.vis.z),.3*s+.06);c<r&&(r=c,n=a.id)}return n}},Xp={x:K.w/2+4.6,z:K.d/2+4.6},Zp=Math.PI*2,Qp=class{constructor(e){this.cam=new _o(34,e,.1,400),this.want={az:0,pol:.98,dist:16,target:new B(0,0,.1)},this.cur={...this.want,target:this.want.target.clone()},this.follow=null,this.name=`overview`,this.fit(e),this.snap()}fitDist(e){let t=At.degToRad(this.cam.fov),n=2*Math.atan(Math.tan(t/2)*e),r=e<.8,i=(r?K.d:K.w)+.9,a=(r?K.w:K.d)+1.2;return Math.max(i/2/Math.tan(n/2),a*(r?.5:.62)/Math.tan(t/2))+1.5}fit(e){this.cam.aspect=e,this.cam.updateProjectionMatrix(),this.home=this.fitDist(e),this.overviewAz=e<.8?Math.PI/2:0,this.name===`overview`&&(this.want.az=this.overviewAz),this.maxDist=this.home*1.6,this.name===`overview`&&(this.want.dist=this.home)}snap(){this.cur={...this.want,target:this.want.target.clone()},this.apply()}nearAz(e){return e+Math.round((this.cur.az-e)/Zp)*Zp}shot(e,t={}){this.name=e,this.follow=null;let n=this.want;e===`overview`||e===`hud-check`?Object.assign(n,{az:this.overviewAz,pol:.98,dist:this.home,target:new B(0,0,.1)}):e===`fountain`?Object.assign(n,{az:.35,pol:1.05,dist:7.5,target:new B(zd.x,.6,zd.z)}):e===`dovecote`?Object.assign(n,{az:-.55,pol:1.15,dist:6,target:new B(tf.x,1.8,tf.z)}):e===`hero-close`?Object.assign(n,{az:t.az??.5,pol:1.3,dist:t.dist??2.1,target:new B(t.x??0,t.y??.28,t.z??0)}):e===`follow`&&(Object.assign(n,{pol:1.12,dist:t.dist??3.6}),this.follow=t.id),n.az=this.nearAz(n.az),t.snap!==!1&&this.snap()}orbit(e,t){this.want.az-=e*.005,this.want.pol=At.clamp(this.want.pol-t*.004,.45,1.38),this.name=`custom`}keyMove(e,t,n,r){if(e||t){let n=this.want.az,i=this.want.dist*.75*r;this.pan((-Math.sin(n)*e+Math.cos(n)*t)*i,(-Math.cos(n)*e-Math.sin(n)*t)*i)}n&&(this.want.az+=n*1.7*r,this.follow??(this.name=`custom`))}zoom(e){this.want.dist=At.clamp(this.want.dist*e,1.6,this.maxDist),this.name=`custom`}zoomAt(e,t){let n=this.want.dist;if(this.zoom(e),!t||this.follow)return;let r=1-this.want.dist/n,i=this.want.target;i.x=At.clamp(i.x+(t.x-i.x)*r,-Xp.x,Xp.x),i.z=At.clamp(i.z+(t.z-i.z)*r,-Xp.z,Xp.z)}pan(e,t){let n=this.want.target;n.x=At.clamp(n.x+e,-Xp.x,Xp.x),n.z=At.clamp(n.z+t,-Xp.z,Xp.z),this.follow=null,this.name=`custom`}snapTarget(){this.cur.target.copy(this.want.target),this.cur.dist=this.want.dist,this.apply()}update(e,t){this.follow!=null&&t&&this.want.target.set(t.x,.3+t.y*.5,t.z);let n=this.cur,r=this.want;n.az=Op(n.az,r.az,7,e),n.pol=Op(n.pol,r.pol,7,e),n.dist=Op(n.dist,r.dist,7,e),n.target.x=Op(n.target.x,r.target.x,7,e),n.target.y=Op(n.target.y,r.target.y,7,e),n.target.z=Op(n.target.z,r.target.z,7,e),this.apply()}apply(){let e=this.cur,t=Math.sin(e.pol);this.cam.position.set(e.target.x+Math.sin(e.az)*t*e.dist,e.target.y+Math.cos(e.pol)*e.dist,e.target.z+Math.cos(e.az)*t*e.dist),this.cam.lookAt(e.target)}},$p=new B(0,1,0),em={1:[`#e8b64c`,`#fff7e0`],2:[`#e8b64c`,`#c67139`,`#fff7e0`],3:[`#e8b64c`,`#c67139`,`#7a8a5e`,`#8f5fae`,`#5aa2c8`,`#fff7e0`]},tm=class{constructor(e){this.N=220,this.mesh=new qi(new va(1,0),new li({toneMapped:!1}),this.N),this.mesh.frustumCulled=!1,this.mesh.count=0,this.mesh.setColorAt(0,new H),e.add(this.mesh),this.parts=[],this.rings=Array.from({length:6},()=>{let t=new xi(new ba(.9,1,40).rotateX(-Math.PI/2),new li({color:`#c67139`,transparent:!0,depthWrite:!1,toneMapped:!1}));return t.visible=!1,t.renderOrder=3,e.add(t),t.userData.t=1,t})}burst(e,t,n,r=1){let i=em[Math.min(3,Math.max(1,r))],a=r>=3?26:r===2?16:9;for(let o=0;o<a;o++){this.parts.length>=this.N&&this.parts.shift();let a=Math.random()*Math.PI*2,s=.8+Math.random()*1.6,c=.5+Math.random()*(r>=3?1.6:1);this.parts.push({p:new B(e,t,n),v:new B(Math.cos(a)*c,s,Math.sin(a)*c),life:0,max:.8+Math.random()*.5,s:.025+Math.random()*(r>=3?.035:.02),c:new H(i[o%i.length]),rot:Math.random()*6})}r>=2&&this.ring(e,n,r>=3?`#8f5fae`:`#c67139`)}ring(e,t,n=`#c67139`){let r=this.rings.find(e=>e.userData.t>=1)||this.rings[0];r.material.color.set(n),r.position.set(e,.02,t),r.userData.t=0,r.visible=!0}update(e){let t=this._m||=new V,n=this._q||=new jt,r=this._s||=new B,i=!1;for(let e of this.rings)if(e.visible){i=!0;break}if(!this.parts.length&&!this.mesh.count&&!i)return;let a=0;for(let i of this.parts){if((i.life+=e)>=i.max)continue;i.v.y-=2.8*e,i.v.multiplyScalar(1-1.8*e),i.p.addScaledVector(i.v,e),i.rot+=e*6;let o=1-i.life/i.max;n.setFromAxisAngle($p,i.rot),t.compose(i.p,n,r.setScalar(i.s*(.3+o))),this.mesh.setMatrixAt(a,t),this.mesh.setColorAt(a,i.c),this.parts[a++]=i}this.parts.length=a,this.mesh.count=a,this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0);for(let t of this.rings){if(t.userData.t>=1){t.visible=!1;continue}t.userData.t=Math.min(1,t.userData.t+e/.9);let n=t.userData.t;t.scale.setScalar(.15+n*.75),t.material.opacity=.9*(1-n)}}},nm=e=>440*2**((e-69)/12),rm=class{constructor(){this.ac=null,this.sfxOn=!0,this.musicOn=!0,this.sfxVol=.8,this.musicVol=.55,this.lastCoo=0,this.music=null,this.mood=`day`,this.duck=1}unlock(){if(this.anyOn()){if(this.ac){this.ac.state!==`running`&&this.ac.state!==`closed`&&this.ac.resume();return}try{let e=new(window.AudioContext||window.webkitAudioContext);this.buildGraph(e),this.applyGains(),this.music=new um(this),this.musicOn&&this.music.start(),e.onstatechange=()=>{e.state===`running`&&!this.anyOn()&&this.shutdown()}}catch{this.ac=null}}}buildGraph(e){this.ac=e,this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-14,this.comp.ratio.value=4,this.comp.attack.value=.005,this.comp.release.value=.2,this.master=e.createGain(),this.master.gain.value=.9,this.master.connect(this.comp),this.comp.connect(e.destination),this.sfx=e.createGain(),this.sfx.connect(this.master),this.mus=e.createGain(),this.mus.connect(this.master)}anyOn(){return this.sfxOn&&this.sfxVol>.02||this.musicOn&&this.musicVol>.02}shutdown(){if(!this.ac)return;this.music?.stop();let e=this.ac;e.onstatechange=null,this.ac=this.music=this.an=this.rainSrc=null,this.master?.disconnect(),e.close().catch(()=>{})}applyGains(){if(!this.ac)return;let e=this.ac.currentTime,t=this.sfxOn?this.sfxVol:0,n=this.musicOn?this.musicVol*this.duck:0;for(let[r,i,a]of[[this.sfx,t,.05],[this.mus,n,.25]])r.gain.cancelScheduledValues(e),i===0?r.gain.setValueAtTime(0,e):(r.gain.setValueAtTime(r.gain.value,e),r.gain.setTargetAtTime(i,e,a));this.anyOn()?this.ac.state===`suspended`&&this.ac.resume():this.shutdown()}setSfx(e,t){e!=null&&(this.sfxOn=e),t!=null&&(this.sfxVol=t),this.ac?this.applyGains():this.unlock()}setMusic(e,t){if(e!=null&&(this.musicOn=e),t!=null&&(this.musicVol=t),!this.ac){this.unlock();return}this.applyGains(),this.ac&&this.music&&(this.musicOn?this.music.start():this.music.stop())}setMood(e){this.mood=e}get songTitle(){return this.music?.timer?this.music.song.title:null}setRain(e){if(this.ac&&this.sfxOn&&!!this.rainSrc!==e){if(e){let e=this.ac.sampleRate*2,t=this.ac.createBuffer(1,e,this.ac.sampleRate),n=t.getChannelData(0);for(let t=0;t<e;t++)n[t]=Math.random()*2-1;let r=this.rainSrc=this.ac.createBufferSource();r.buffer=t,r.loop=!0;let i=this.ac.createBiquadFilter();i.type=`lowpass`,i.frequency.value=1400;let a=this.rainGain=this.ac.createGain();a.gain.setValueAtTime(0,this.ac.currentTime),a.gain.linearRampToValueAtTime(.06,this.ac.currentTime+1.5),r.connect(i),i.connect(a),a.connect(this.sfx),r.start()}else{let e=this.rainSrc,t=this.rainGain,n=this.ac.currentTime;this.rainSrc=null,t.gain.cancelScheduledValues(n),t.gain.setValueAtTime(t.gain.value,n),t.gain.linearRampToValueAtTime(0,n+1.2),e.stop(n+1.3)}}}setDuck(e){this.duck!==e&&(this.duck=e,this.applyGains())}ok(){return this.ac&&this.sfxOn&&this.ac.state===`running`}env(e,t,n=this.sfx,r=this.ac.currentTime,i=.03){let a=this.ac.createGain();return a.gain.setValueAtTime(0,r),a.gain.linearRampToValueAtTime(t,r+i),a.gain.exponentialRampToValueAtTime(.001,r+e),a.connect(n),a}play(e,t={}){if(this.ok()){if(e===`coo`)return this.coo(t.voice,t.vol,t.pitch,t.pan);if(e===`chime`)return this.chime();if(e===`pop`)return this.pop();if(e===`whoosh`)return this.whoosh();if(e===`flap`)return this.flap(t.vol??1,t.pan);if(e===`shutter`)return this.shutter()}}coo(e,t=1,n=1,r=0,i){let a=this.ac,o=i??a.currentTime;if(o-this.lastCoo<.12)return;this.lastCoo=o;let s=a.createStereoPanner?a.createStereoPanner():a.createGain();if(s.pan&&(s.pan.value=Math.max(-.85,Math.min(.85,r))),s.connect(this.sfx),e===`laugher`)return this.laugh(o,t,n,s);if(e===`trumpet`)return this.trumpet(o,t,n,s);let c=(255+Math.random()*70)*n,l=()=>1+(Math.random()-.5)*.06,u=(e,r,i,o,u,d)=>{let f=c*l(),p=f*o*l(),m=f*u*l(),h=a.createOscillator(),g=a.createOscillator();h.type=`sawtooth`,g.type=`sine`;for(let t of[h,g])t.frequency.setValueAtTime(f,e),t.frequency.exponentialRampToValueAtTime(p,e+r*.3),t.frequency.exponentialRampToValueAtTime(m,e+r*.95);let _=a.createBiquadFilter();_.type=`bandpass`,_.frequency.value=480*n,_.Q.value=2.2;let v=a.createBiquadFilter();v.type=`lowpass`,v.frequency.value=900;let y=a.createGain();y.gain.value=.35;let b=this.env(r,i*t,s,e,.05),x=a.createGain();x.gain.value=1-d*.5;let S=a.createOscillator(),C=a.createGain();S.frequency.value=22+Math.random()*14,C.gain.value=d*.5,S.connect(C),C.connect(x.gain),h.connect(_),_.connect(x),g.connect(y),y.connect(v),v.connect(x),x.connect(b);let w=this.noise(r),T=a.createBiquadFilter();T.type=`bandpass`,T.frequency.value=420*n,T.Q.value=1.2,w.connect(T),T.connect(this.env(r,i*t*.45,s,e,.06));for(let t of[h,g,S])t.start(e),t.stop(e+r+.03);w.start(e)},d=[`coo`,`coo`,`double`,`long`,`rattle`,`grumble`],f=d[Math.floor(Math.random()*d.length)];f===`coo`?u(o,.42,.16,1.1,.82,.25):f===`double`?(u(o,.2,.12,1.06,.9,.2),u(o+.24,.45,.16,1.12,.8,.3)):f===`long`?u(o,.75,.15,1.14,.78,.35):f===`rattle`?u(o,.5,.15,1.08,.85,.75):u(o,.38,.13,1.02,.88,.55)}trumpet(e,t,n,r=this.sfx){let i=this.ac,a=i.createOscillator(),o=i.createBiquadFilter();a.type=`sawtooth`,a.frequency.setValueAtTime(210*n,e),a.frequency.linearRampToValueAtTime(160*n,e+.4);let s=i.createOscillator(),c=i.createGain();s.frequency.value=7,c.gain.value=6,s.connect(c),c.connect(a.frequency),o.type=`lowpass`,o.frequency.value=620,a.connect(o),o.connect(this.env(.55,.07*t,r)),a.start(e),a.stop(e+.56),s.start(e),s.stop(e+.56)}laugh(e,t,n,r=this.sfx){let i=this.ac;for(let a=0;a<5;a++){let o=i.createOscillator(),s=i.createBiquadFilter(),c=e+a*.085;o.type=`sine`,o.frequency.setValueAtTime((520-a*30)*n,c),o.frequency.exponentialRampToValueAtTime((380-a*25)*n,c+.07),s.type=`lowpass`,s.frequency.value=1e3,o.connect(s),s.connect(this.env(.08,.09*t,r,c,.015)),o.start(c),o.stop(c+.09)}}chime(){let e=this.ac.currentTime;[740,1108].forEach((t,n)=>{let r=this.ac.createOscillator();r.type=`triangle`,r.frequency.value=t,r.connect(this.env(.7+n*.2,.1,this.sfx,e+n*.09)),r.start(e+n*.09),r.stop(e+1)})}pop(){let e=this.ac.currentTime,t=this.ac.createOscillator();t.type=`sine`,t.frequency.setValueAtTime(300,e),t.frequency.exponentialRampToValueAtTime(90,e+.12),t.connect(this.env(.14,.16)),t.start(e),t.stop(e+.15)}noise(e){let t=this.ac,n=Math.max(1,Math.floor(t.sampleRate*e)),r=t.createBuffer(1,n,t.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e++)i[e]=(Math.random()*2-1)*(1-e/n);let a=t.createBufferSource();return a.buffer=r,a}flap(e=1,t=0){let n=this.ac.currentTime,r=this.ac.createStereoPanner?this.ac.createStereoPanner():this.ac.createGain();r.pan&&(r.pan.value=Math.max(-.85,Math.min(.85,t||0))),r.connect(this.sfx);for(let t=0;t<3;t++){let i=this.noise(.07),a=this.ac.createBiquadFilter();a.type=`bandpass`,a.frequency.value=900+t*120,a.Q.value=.8,i.connect(a),a.connect(this.env(.07,.05*e,r,n+t*.085,.01)),i.start(n+t*.085)}}whoosh(){let e=this.noise(.3),t=this.ac.createBiquadFilter();t.type=`bandpass`,t.frequency.value=700,e.connect(t),t.connect(this.env(.3,.12)),e.start()}shutter(){let e=this.ac.currentTime;[0,.07].forEach(t=>{let n=this.noise(.05),r=this.ac.createBiquadFilter();r.type=`highpass`,r.frequency.value=2500,n.connect(r),r.connect(this.env(.05,.25,this.sfx,e+t,.003)),n.start(e+t)})}},im=[0,2,4,7,9],am=[0,2,4,5,7,9,11],om=[0,2,4,6,8,10],sm={strut:{title:`Pigeon Strut`,bpm:104,steps:16,swing:.08,vol:1,bars:[[60,64,67],[57,60,64],[53,57,60],[55,59,62]],lead:{inst:`coo`,scale:im,root:72,p:1,amp:.07,hold:1.6,rhythms:[[0,4,6,8,12],[0,3,6,10,12,14],[0,2,4,8,11],[0,6,8,10,12],[2,4,8,12,13,14]]},beat(e,t,n,r,i){[0,6,8,12].includes(t)&&e.pizz(n,nm(i[0]-24+(t===6?7:0)),.16),(t===0||t===8)&&i.forEach((t,r)=>e.marimba(n+r*.012,nm(t),.035)),(t===4||t===12)&&e.peck(n,.09),t%4==2&&e.flap(n,.025)}},waltz:{title:`Breadcrumb Waltz`,bpm:150,steps:12,swing:0,vol:1,bars:[[53,57,60],[50,53,57],[55,58,62],[48,52,55,58],[53,57,60],[58,62,65],[48,52,55],[53,57,60]],lead:{inst:`whistle`,scale:am,root:77,p:.95,amp:.06,rhythms:[[0,4,8],[0,6,8],[0,8,10],[0,4,6,8],[0]]},beat(e,t,n,r,i){t===0&&e.pizz(n,nm(i[0]-12),.2),(t===4||t===8)&&i.slice(0,3).forEach((t,r)=>e.marimba(n+r*.008,nm(t),.03)),t===0&&e.bar%2&&e.flap(n,.02)}},shuffle:{title:`Bench Shuffle`,bpm:96,steps:16,swing:.2,vol:1,bars:[[60,64,67,69],[57,61,64,67],[50,53,57,60],[55,59,62,65]],lead:{inst:`kazoo`,scale:[0,3,4,7,9,10],root:72,p:.8,amp:.05,rhythms:[[0,3,6,8],[2,4,6,10,12],[0,6,8,14],[0,2,3,6]]},beat(e,t,n,r,i){t%4==0&&e.pizz(n,nm(i[t/4]-24),.17),(t===4||t===12)&&e.brush(n,.05),(t%4==0||t%4==3)&&e.hat(n,.022,!1),(t===6||t===14)&&i.forEach((t,r)=>e.marimba(n+r*.01,nm(t),.02))}},night:{title:`Pigeon Strut (after dark)`,bpm:80,steps:16,swing:.08,vol:.7,bars:[[60,64,67],[57,60,64],[53,57,60],[55,59,62]],lead:{inst:`coo`,scale:im,root:72,p:.55,amp:.07,hold:1.6,rhythms:[[0,4,6,8,12],[0,3,6,10,12,14],[0,2,4,8,11],[0,6,8,10,12]]},beat(e,t,n,r,i){(t===0||t===8)&&e.pizz(n,nm(i[0]-24),.16),t===0&&i.forEach((t,r)=>e.marimba(n+r*.012,nm(t),.035)),t===12&&e.peck(n,.09),t===0&&e.bar===0&&e.owl(n)}},lullaby:{title:`Streetlamp Lullaby`,bpm:66,steps:12,swing:0,vol:.75,bars:[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],lead:{inst:`musicbox`,scale:im,root:84,p:.8,amp:.05,rhythms:[[0,2,4,6,8,10],[0,4,6,10],[0,2,6,8]]},beat(e,t,n,r,i){t===0&&(e.pad(n,i.map(nm),r*12,.018),e.pizz(n,nm(i[0]-24),.1)),t===6&&e.pizz(n,nm(i[2]-24),.07)}},ufo:{title:`Close Encounter`,bpm:84,steps:16,swing:0,vol:.85,event:1,bars:[[48,51,55,62],[44,48,51,58],[41,44,48,55],[43,47,50,56]],lead:{inst:`theremin`,scale:om,root:72,p:1,amp:.06,rhythms:[[0,8],[0,6,12],[0],[0,4,8,12]]},beat(e,t,n,r,i){t%2==0&&e.throb(n,nm(i[0]-12),r*1.8,t%8==0?.14:.08),t===0&&e.pad(n,i.map(e=>nm(e+12)),r*16,.02,`sawtooth`),Math.random()<.22&&e.bleep(n,nm(84+om[Math.floor(Math.random()*6)]),.02)}},disco:{title:`Coo Fever`,bpm:120,steps:16,swing:0,vol:.8,event:1,bars:[[57,60,64,67],[50,54,57,60],[57,60,64,67],[50,54,57,60]],lead:{inst:`strings`,scale:[0,2,3,5,7,9,10],root:69,p:.9,amp:.04,rhythms:[[0,3,6,10],[2,6,8,11,14],[0,8,10,12]]},beat(e,t,n,r,i){t%4==0&&e.kick(n,.24),t%4==2?e.hat(n,.035,!0):e.hat(n,.014,!1),(t===4||t===12)&&e.clap(n,.07),t%2==0&&e.bass(n,nm(i[0]-24+(t%4==2?12:0)),r*1.6,.13),(t===3||t===11)&&e.stab(n,i.map(nm),.028),t===0&&e.bar===0&&e.swoop(n,.03)}},conga:{title:`Conga Line`,bpm:128,steps:16,swing:0,vol:.75,event:1,bars:[[60,64,67],[53,57,60],[55,59,62],[53,57,60]],lead:{inst:`brass`,scale:am,root:72,p:.7,amp:.045,rhythms:[[0,2,4,6],[0,3,6]]},beat(e,t,n,r,i){(t===0||t===4||t===8)&&e.conga(n,180,.14,!1),(t===2||t===6||t===10)&&e.conga(n,260,.08,!0),t===14&&(e.conga(n,150,.2,!1),e.kick(n,.2),e.stab(n,i.map(e=>nm(e+12)),.04,`brass`)),t%4==0&&e.cowbell(n,.035),(e.bar%2?[4,8]:[0,6,12]).includes(t)&&e.clave(n,.05),[0,3,6,8,11].includes(t)&&i.forEach((r,i)=>e.piano(n,nm(r+(t%2?12:0)),.022)),(t===6||t===12)&&e.pizz(n,nm(i[t===6?0:2]-24),.2)}},goddess:{title:`Heavenly Coo`,bpm:66,steps:12,swing:0,vol:.9,event:1,bars:[[53,57,60,64],[57,60,64,67],[58,62,65,69],[48,52,55,58]],lead:{inst:`choir`,scale:am,root:72,p:.9,amp:.045,rhythms:[[0,6],[0],[0,4,8]]},beat(e,t,n,r,i){t%2==0&&e.harp(n,nm(i[t/2%i.length]+(t>=6?12:0)),.05),t===0&&(e.pad(n,i.map(e=>nm(e)),r*12,.016),e.pizz(n,nm(i[0]-24),.1)),t===0&&e.bar%2==0&&e.bell(n,nm(i[2]+24),.03)}}},cm={day:[`strut`,`waltz`,`shuffle`],night:[`night`,`lullaby`],dance:[`disco`],conga:[`conga`],ufo:[`ufo`],goddess:[`goddess`]},lm=16,um=class{constructor(e){this.a=e,this.ac=e.ac,this.timer=null,this.step=0,this.bar=-1,this.next=0,this.motif=null,this.notes=0,this.songId=null,this.moodNow=null,this.plays={}}start(){this.timer||=(this.next=this.ac.currentTime+.1,this.step=0,this.bar=-1,setInterval(()=>this.schedule(),30))}stop(){clearInterval(this.timer),this.timer=null}get song(){return sm[this.songId]||sm.strut}schedule(e=this.ac.currentTime+(document.hidden?1.6:.15)){for(;this.next<e;){this.pickSong();let e=this.song,t=e.steps,n=this.step%t,r=60/e.bpm/4;n===0&&this.newBar(),this.play(n,this.next,r),this.next+=r*(1+(this.step%2?-e.swing:e.swing)),this.step++}}pickSong(){let e=cm[this.a.mood]?this.a.mood:`day`,t=this.song,n=this.step%t.steps===0;if(e!==this.moodNow&&(n||cm[e].length===1||t.event)){let t=cm[e],n=t.includes(this.lastIn?.[e])?this.lastIn[e]:t[Math.floor(Math.random()*t.length)];sm[n].event&&this.songId&&this.sting(n,this.next),this.setSong(n,e)}else if(n&&this.barsIn>=lm&&cm[e].length>1){let t=cm[e];this.setSong(t[(t.indexOf(this.songId)+1)%t.length],e)}}setSong(e,t){this.songId=e,this.moodNow=t,this.step=0,this.bar=-1,this.barsIn=0,this.motif=null,(this.lastIn||={})[t]=e,this.plays[e]=(this.plays[e]||0)+1}newBar(){let e=this.song,t=e.lead;this.bar=(this.bar+1)%e.bars.length,this.barsIn++,(this.bar%2==0||!this.motif)&&(this.motif={r:t.rhythms[Math.floor(Math.random()*t.rhythms.length)],seed:Math.random()}),this.chord=e.bars[this.bar];let n=t.scale,r=this.bar===e.bars.length-1;this.lead=this.motif.r.filter(()=>Math.random()<t.p).map((i,a,o)=>{let s=n[Math.floor((this.motif.seed*7+a*1.7)%n.length)],c=a===0?this.chord[Math.floor(this.motif.seed*3)]+12*Math.round((t.root-this.chord[0])/12):t.root+s+(r&&a>2?2:0),l=o[a+1]??e.steps;return{s:i,n:c,len:a===o.length-1?Math.min(3,e.steps-i):Math.min(t.hold??3,Math.max(1,(l-i)*.8))}})}play(e,t,n){let r=this.song,i=r.vol;this.vol=i;for(let i of this.lead)i.s===e&&this.leadNote(r.lead.inst,t,nm(i.n),n*i.len,r.lead.amp);r.beat(this,e,t,n,this.chord)}leadNote(e,t,n,r,i){if(e===`coo`)return this.cooLead(t,n,r,i);if(e===`whistle`)return this.whistle(t,n,r,i);if(e===`kazoo`)return this.kazoo(t,n,r,i);if(e===`musicbox`)return this.musicbox(t,n,i);if(e===`theremin`)return this.theremin(t,n,r,i);if(e===`strings`)return this.stab(t,[n],i,`strings`,r);if(e===`brass`)return this.stab(t,[n],i,`brass`,r*.8);if(e===`choir`)return this.choir(t,n,r,i)}out(e,t,n,r=.01){return this.notes++,this.a.env(e,t*2.5*(this.vol??1),this.a.mus,n,r)}osc(e,t,n,r){let i=this.ac.createOscillator();return i.type=e,i.frequency.setValueAtTime(t,n),i.start(n),i.stop(r),i}lp(e,t=.7){let n=this.ac.createBiquadFilter();return n.type=`lowpass`,n.frequency.value=e,n.Q.value=t,n}cooLead(e,t,n,r){let i=this.osc(`triangle`,t*.88,e,e+n+.2),a=this.osc(`sine`,5.5,e,e+n+.2),o=this.ac.createGain();i.frequency.exponentialRampToValueAtTime(t,e+.06),o.gain.value=t*.012,a.connect(o),o.connect(i.frequency);let s=this.lp(2200);i.connect(s),s.connect(this.out(n+.15,r,e,.03))}whistle(e,t,n,r){let i=this.osc(`sine`,t*.97,e,e+n+.15),a=this.osc(`sine`,6,e,e+n+.15),o=this.ac.createGain();i.frequency.exponentialRampToValueAtTime(t,e+.04),o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(t*.01,e+.2),a.connect(o),o.connect(i.frequency),i.connect(this.out(n+.1,r,e,.04))}kazoo(e,t,n,r){let i=this.osc(`sawtooth`,t*.94,e,e+n+.1),a=this.osc(`sine`,5,e,e+n+.1),o=this.ac.createGain();i.frequency.exponentialRampToValueAtTime(t,e+.05),o.gain.value=t*.015,a.connect(o),o.connect(i.frequency);let s=this.ac.createBiquadFilter();s.type=`bandpass`,s.frequency.value=1100,s.Q.value=1.4;let c=this.lp(2600);i.connect(s),s.connect(c),c.connect(this.out(n+.08,r,e,.02))}musicbox(e,t,n){let r=this.out(1.3,n,e,.002);this.osc(`sine`,t,e,e+1.35).connect(r);let i=this.ac.createGain();i.gain.value=.25,this.osc(`sine`,t*4,e,e+.4).connect(i),i.connect(r)}theremin(e,t,n,r){let i=this.lastTheremin||t;this.lastTheremin=t;let a=this.osc(`sine`,i,e,e+n+.3),o=this.osc(`sine`,5.8,e,e+n+.3),s=this.ac.createGain();a.frequency.exponentialRampToValueAtTime(t,e+Math.min(.25,n*.4)),s.gain.setValueAtTime(t*.006,e),s.gain.linearRampToValueAtTime(t*.03,e+n),o.connect(s),s.connect(a.frequency),a.connect(this.out(n+.25,r,e,.08))}pad(e,t,n,r,i=`triangle`){let a=this.ac.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(r*2.5*(this.vol??1),e+n*.3),a.gain.linearRampToValueAtTime(0,e+n);let o=this.lp(i===`sawtooth`?900:1600);o.connect(a),a.connect(this.a.mus),this.notes++,t.forEach((t,r)=>{for(let a of[-4,4]){let s=this.osc(i,t,e,e+n+.05);s.detune.value=a+r,s.connect(o)}})}choir(e,t,n,r){let i=this.out(n+.5,r,e,Math.min(.35,n*.4)),a=this.osc(`sine`,5,e,e+n+.6),o=this.ac.createGain();o.gain.value=t*.008,a.connect(o);for(let[r,a,s]of[[800,6,1],[1150,8,.6]]){let c=this.ac.createBiquadFilter(),l=this.ac.createGain();c.type=`bandpass`,c.frequency.value=r,c.Q.value=a,l.gain.value=s;for(let r of[-6,6]){let i=this.osc(`sawtooth`,t,e,e+n+.6);i.detune.value=r,o.connect(i.frequency),i.connect(c)}c.connect(l),l.connect(i)}}harp(e,t,n){let r=this.out(1.1,n,e,.002);this.osc(`triangle`,t,e,e+1.15).connect(r);let i=this.ac.createGain();i.gain.value=.2,this.osc(`sine`,t*2,e,e+.5).connect(i),i.connect(r)}bell(e,t,n){let r=this.out(2.2,n,e,.002);for(let[n,i]of[[1,1],[2.76,.4],[5.4,.2]]){let a=this.ac.createGain();a.gain.value=i,this.osc(`sine`,t*n,e,e+2.3).connect(a),a.connect(r)}}pizz(e,t,n){let r=this.osc(`triangle`,t,e,e+.3),i=this.lp(600);r.connect(i),i.connect(this.out(.25,n,e,.005))}bass(e,t,n,r){let i=this.osc(`sawtooth`,t,e,e+n+.05),a=this.lp(420,2);i.connect(a),a.connect(this.out(n,r,e,.005))}throb(e,t,n,r){let i=this.osc(`sine`,t,e,e+n+.05);i.frequency.exponentialRampToValueAtTime(t*.985,e+n),i.connect(this.out(n,r,e,.02))}marimba(e,t,n){this.osc(`sine`,t*2,e,e+.4).connect(this.out(.35,n,e,.004))}piano(e,t,n){let r=this.out(.4,n,e,.003);this.osc(`triangle`,t,e,e+.45).connect(r);let i=this.ac.createGain();i.gain.value=.3,this.osc(`sine`,t*2,e,e+.2).connect(i),i.connect(r)}stab(e,t,n,r=`strings`,i=.18){let a=r===`brass`,o=this.lp(a?3200:2e3,a?3:1),s=this.out(i+.08,n,e,a?.025:.012);o.frequency.setValueAtTime(a?3200:2e3,e),o.frequency.exponentialRampToValueAtTime(a?900:1200,e+i+.08),o.connect(s),t.forEach(t=>{for(let n of[-7,7]){let r=this.osc(`sawtooth`,t,e,e+i+.1);r.detune.value=n,r.connect(o)}})}swoop(e,t){let n=this.osc(`sawtooth`,nm(57),e,e+.5),r=this.lp(2400);n.frequency.exponentialRampToValueAtTime(nm(81),e+.45),n.connect(r),r.connect(this.out(.5,t,e,.2))}peck(e,t){let n=this.osc(`sine`,1900,e,e+.05);n.frequency.exponentialRampToValueAtTime(1200,e+.02),n.connect(this.out(.04,t,e,.002))}noiseHit(e,t,n,r,i,a=1,o=.003){let s=this.a.noise(t),c=this.ac.createBiquadFilter();c.type=r,c.frequency.value=i,c.Q.value=a,s.connect(c),c.connect(this.out(t,n,e,o)),s.start(e)}flap(e,t){this.noiseHit(e,.06,t,`highpass`,5e3,.7,.004)}hat(e,t,n){this.noiseHit(e,n?.22:.045,t,`highpass`,7e3)}brush(e,t){this.noiseHit(e,.16,t,`bandpass`,3200,.6,.02)}clap(e,t){for(let n of[0,.012,.026])this.noiseHit(e+n,.09,t,`bandpass`,1500,1.2)}kick(e,t){let n=this.osc(`sine`,130,e,e+.22);n.frequency.exponentialRampToValueAtTime(45,e+.12),n.connect(this.out(.2,t,e,.003))}conga(e,t,n,r){let i=this.osc(`sine`,t*1.5,e,e+.3);i.frequency.exponentialRampToValueAtTime(t,e+.03),i.connect(this.out(r?.12:.26,n,e,.002)),r&&this.noiseHit(e,.03,n*.5,`bandpass`,2500,1)}cowbell(e,t){let n=this.out(.22,t,e,.002),r=this.ac.createBiquadFilter();r.type=`bandpass`,r.frequency.value=800,r.Q.value=2,r.connect(n);for(let t of[587,845])this.osc(`square`,t,e,e+.25).connect(r)}clave(e,t){this.osc(`sine`,2500,e,e+.08).connect(this.out(.06,t,e,.001))}bleep(e,t,n){let r=this.osc(`square`,t,e,e+.07),i=this.lp(3e3);r.connect(i),i.connect(this.out(.06,n,e,.002))}owl(e){[0,.35].forEach((t,n)=>this.cooLead(e+t,nm(n?64:67),.3,.03))}sting(e,t){if(e===`ufo`){let e=this.osc(`sine`,1400,t,t+1.1),n=this.osc(`sine`,9,t,t+1.1),r=this.ac.createGain();r.gain.value=60,n.connect(r),r.connect(e.frequency),e.frequency.exponentialRampToValueAtTime(180,t+1),e.connect(this.out(1.05,.07,t,.05))}else if(e===`disco`)this.noiseHit(t,.25,.12,`bandpass`,900,2.5),this.swoop(t,.04);else if(e===`goddess`)for(let e=0;e<10;e++)this.harp(t+e*.045,nm(60+[0,4,7,11,12,16,19,23,24,28][e]),.04);else if(e===`conga`){let e=this.osc(`sine`,2600,t,t+.5),n=this.osc(`square`,28,t,t+.5),r=this.ac.createGain();r.gain.value=220,n.connect(r),r.connect(e.frequency),e.connect(this.out(.45,.05,t,.01))}}};async function dm(e,t,{sampleRate:n=48e3,extras:r}={}){let i=new OfflineAudioContext(2,Math.ceil(n*t),n),a=new rm;a.buildGraph(i),a.lastCoo=-1,a.sfx.gain.value=.8,a.mus.gain.value=.6,a.mood=Object.keys(cm).find(t=>cm[t].includes(e))||`day`;let o=new um(a);o.setSong(e,a.mood),o.next=.02,o.schedule(t),r?.(a);let s=a.master.gain;return s.setValueAtTime(.9,Math.max(0,t-.6)),s.linearRampToValueAtTime(0,t),{buffer:await i.startRendering(),notes:o.notes}}var fm=class{constructor(e,t){this.r=e,this.mats=up(),this.size=176,this.rt=new Qt(this.size,this.size,{samples:t?0:4}),this.rt.texture.colorSpace=Ve,this.scene=new Rn,this.scene.add(new io(`#dfe8f4`,`#8a7458`,1.1));let n=new So(`#fff0dc`,2.1);n.position.set(2,3,2.5),this.scene.add(n),this.scene.environment=null,this.cam=new _o(30,1,.05,20),this.cache=new Map,this.buf=new Uint8Array(this.size*this.size*4),this.canvas=document.createElement(`canvas`),this.canvas.width=this.canvas.height=this.size,this.ctx=this.canvas.getContext(`2d`)}studio(e,t){let n=new Qt(t,t,{samples:4});n.texture.colorSpace=Ve;let r=new Uint8Array(t*t*4),i=document.createElement(`canvas`);return i.width=i.height=t,this.draw(e,n,r,t),n.dispose(),pm(i.getContext(`2d`),r,t),i}draw(e,t,n,r){let i=new fp(e,this.mats);i.group.rotation.y=-.55,this.scene.add(i.group);let a=Zf(e),o=a*.5,s=1.5*Math.max(1,a/.6);this.cam.position.set(.1+s*.2,o+.28,s),this.cam.lookAt(0,o,0);let c=this.r,l=c.getRenderTarget(),u=c.getClearColor(new H),d=c.getClearAlpha();c.setRenderTarget(t),c.setClearColor(0,0),c.clear(),c.render(this.scene,this.cam),c.readRenderTargetPixels(t,0,0,r,r,n),c.setRenderTarget(l),c.setClearColor(u,d),this.scene.remove(i.group),i.dispose()}get(e){let t=Iu(e),n=this.cache.get(t);return n||(this.draw(e,this.rt,this.buf,this.size),pm(this.ctx,this.buf,this.size),n=this.canvas.toDataURL(`image/png`),this.cache.set(t,n),this.cache.size>300&&this.cache.delete(this.cache.keys().next().value),n)}};function pm(e,t,n){let r=e.createImageData(n,n),i=n*4;for(let e=0;e<n;e++)r.data.set(t.subarray((n-1-e)*i,(n-e)*i),e*i);e.putImageData(r,0,0)}var $=e=>String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),mm=(e,t=16)=>`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${e}</svg>`,hm={book:mm(`<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`),award:mm(`<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`),sound:mm(`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`),mute:mm(`<path d="M11 5 6 9H2v6h4l5 4z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/>`),sun:mm(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.1-17.1 1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>`,15),moon:mm(`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,15),clone:mm(`<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`,14),roost:mm(`<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>`,14),gear:mm(`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`),help:mm(`<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>`),x:mm(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,15),music:mm(`<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`),musicOff:mm(`<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/>`),camera:mm(`<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`,14),download:mm(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,14),share:mm(`<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>`,14),target:mm(`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/>`),pause:mm(`<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>`),play:mm(`<polygon points="6 4 20 12 6 20 6 4"/>`),eye:mm(`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,14),tree:mm(`<circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 7.5v1.5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7.5M12 12v4.5"/>`,14),film:mm(`<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 8h5M2 16h5M17 8h5M17 16h5"/>`,14),search:mm(`<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/>`,13)},gm=matchMedia(`(max-width: 760px)`),_m={1:`uncommon`,2:`rare`,3:`impossible`},vm=e=>Du[e]?.label||Wu[e.split(`:`)[1]]?.label||e,ym=(e,t,n)=>`<button class="chip ${t} findable" data-act="find" data-arg="${$(e)}" title="Find birds with this in the park">${n}</button>`,bm={founder:`A founding feral — it came with the original flock.`,clone:e=>`A clone of ${$(e.of||`another bird`)}, so it shares its parents.`,registry:e=>`Made to order from the Breed Registry${e.of?` (`+$(e.of)+`)`:``}.`,summoned:`Summoned by a secret word. Its parents are not available for comment.`,golden:`Hatched from the golden egg. Nobody laid it.`,visitor:`Visiting from out of town. Its family stayed home.`,unknown:`It arrived before the park kept family records.`};function xm(e){return e>=3?`chip-t3`:e===2?`chip-t2`:`chip-t1`}function Sm(e){if(e<20)return`freshly hatched`;if(e<60)return`a chick`;let t=Math.floor(e/60);return t<60?t+`m in the park`:Math.floor(t/60)+`h in the park`}function Cm(e){let t=Math.floor(e),n=Math.floor((e-t)*60/15)*15,r=t>=12?`pm`:`am`;return(t+11)%12+1+`:`+String(n).padStart(2,`0`)+` `+r}var wm=[[`Tap / click a pigeon`,`Inspect it: colours, traits, hidden DNA`],[`Drag a pigeon`,`Carry it somewhere. Drop it on the Roost to keep it`],[`Drag the park`,`Orbit the camera`],[`W A S D · arrow keys`,`Pan around the park`],[`Q · E`,`Rotate the camera`],[`Scroll / pinch`,`Zoom in and out`],[`Double-click a pigeon · F`,`Follow it around with the camera`],[`P · Space`,`Pause / resume the park`],[`Esc`,`Close a panel, stop searching or following, deselect`],[`?`,`This help sheet`]],Tm=class{constructor(e){this.g=e,this.sim=e.sim,this.root=document.getElementById(`hud`),this.seen={pedia:0,breeds:0},this.dialog=null,this.roostSel=null,this.introDone=!1,this.bubbles=new Map,this.refreshT=0,this.build(),this.root.addEventListener(`click`,e=>this.onClick(e)),this.root.addEventListener(`pointerdown`,e=>e.stopPropagation()),document.addEventListener(`pointerdown`,e=>{let t=e.target;this.suppressClick=!1;let n=this.$(`settings`);!n.classList.contains(`hidden`)&&!n.contains(t)&&!t.closest(`[data-act="settings"]`)&&n.classList.add(`hidden`),this.dialog&&!t.closest(`.dialog`)&&!this.g.clipBusy&&(this.closeDialog(),this.suppressClick=!0)},!0)}build(){this.root.innerHTML=`
      <header class="topbar">
        <div class="brand panel">
          <div class="title">Pigeon Park</div>
          <div class="tagline">a gentle genetics catastrophe</div>
        </div>
        <span class="pill panel" id="pop">…</span>
        <span class="spacer"></span>
        <span class="pill panel clock" id="clock" title="time of day"></span>
        <button class="btn panel" data-act="pedia" id="b-pedia" aria-label="Pigeonpedia">${hm.book}<span class="lbl">Pigeonpedia</span><i class="dot"></i></button>
        <button class="btn panel" data-act="breeds" id="b-breeds" aria-label="Breed Registry">${hm.award}<span class="lbl">Breeds</span> <span class="count" id="breedcount"></span><i class="dot"></i></button>
        <button class="btn icon panel" data-act="pause" id="b-pause" aria-label="Pause" title="Pause (P / Space)"></button>
        <button class="btn icon panel desk" data-act="sfx" id="b-sfx" aria-label="Sound effects" title="Sound effects"></button>
        <button class="btn icon panel desk" data-act="music" id="b-music" aria-label="Music" title="Music"></button>
        <button class="btn icon panel" data-act="settings" id="b-settings" aria-label="Settings">${hm.gear}</button>
        <button class="btn icon panel desk" data-act="help" aria-label="Help">${hm.help}</button>
      </header>
      <div id="bubbles"></div>
      <button id="recenter" class="btn icon panel hidden" data-act="recenter" aria-label="Recenter camera" title="Recenter camera (double-tap the ground)">${hm.target}</button>
      <button id="paused" class="pill panel hidden" data-act="pause">${hm.play}<span>Paused — tap to resume</span></button>
      <div id="finder" class="pill panel hidden"></div>
      <aside id="inspector" class="card panel hidden"></aside>
      <div id="settings" class="card panel pop hidden"></div>
      <div id="intro" class="card panel hidden">
        <div class="card-title">Tap a pigeon. Any pigeon.</div>
        <p>They wander, they flirt, they multiply. Every egg reshuffles real pigeon DNA — dominant and recessive — so the rare stuff hides for generations.</p>
        <p><strong>Clone</strong> a bird to flood the gene pool with its DNA. <strong>Dismiss</strong> the ones holding the flock back. <strong>Drag</strong> anyone onto the Roost to keep them.</p>
        <button class="btn ghost" data-act="intro-ok">Got it</button>
      </div>
      <footer class="roostbar panel" id="roost"></footer>
      <div id="toasts"></div>
      <div id="dialog" class="backdrop hidden" data-act="backdrop"></div>
      <img id="ghost" class="dragghost hidden" alt="">
    `,this.$=e=>document.getElementById(e),this.renderRoost(),this.renderSound(),this.renderPause(),this.root.addEventListener(`input`,e=>{let t=e.target.closest(`[data-act]`);if(!t)return;let n=t.value/100,r=n>.02;t.dataset.act===`sfxvol`&&this.g.audio.setSfx(r,n),t.dataset.act===`musicvol`&&this.g.audio.setMusic(r,n),this.renderSound()}),this.root.addEventListener(`submit`,e=>{let t=e.target.closest(`form[data-code]`);if(!t)return;e.preventDefault(),this.g.audio.unlock();let n=t.querySelector(`input`),r=this.g.enterCode(n.value);n.value=``,r&&this.$(`settings`).classList.add(`hidden`)}),this.root.addEventListener(`change`,e=>{e.target.closest(`[data-act$="vol"]`)&&(this.g.save(),e.target.dataset.act===`sfxvol`&&this.g.audio.play(`coo`,{vol:.8}))})}toast(e,t=`plain`){let n=this.$(`toasts`),r=document.createElement(`div`);for(r.className=`toast t-`+t,r.textContent=e,n.appendChild(r);n.children.length>3;)n.firstChild.remove();this.placeToasts(),setTimeout(()=>{r.classList.add(`out`),setTimeout(()=>r.remove(),300)},4200)}placeToasts(){let e=this.$(`toasts`),t=``;if(gm.matches)for(let e of[`inspector`,`intro`]){let n=this.$(e);if(n.classList.contains(`hidden`))continue;let r=this.root.clientHeight;n.offsetTop+n.offsetHeight>r-140&&(t=Math.max(parseFloat(t)||0,r-n.offsetTop+8)+`px`)}e.style.bottom!==t&&(e.style.bottom=t)}onClick(e){if(this.suppressClick){this.suppressClick=!1;return}let t=e.target.closest(`[data-act]`);if(!t)return;let n=t.dataset.act,r=t.dataset.arg,i=this.g,a=this.sim;if(i.audio.unlock(),n!==`backdrop`||e.target===t){switch(n){case`pedia`:this.openDialog(`pedia`);break;case`breeds`:this.openDialog(`breeds`);break;case`help`:this.openDialog(`help`);break;case`backdrop`:case`close`:this.closeDialog();break;case`pause`:i.togglePause();break;case`recenter`:i.cam.shot(`overview`,{snap:!1});break;case`whimsy`:a.whimsy=r,a.nextHappeningAt=a.t+kd(a),this.renderSettings(!0),i.save();break;case`sfx`:i.audio.setSfx(!i.audio.sfxOn),i.audio.sfxOn&&i.audio.sfxVol<.05&&i.audio.setSfx(!0,.8),this.renderSound(),this.renderSettings(!0),i.save();break;case`music`:i.audio.setMusic(!i.audio.musicOn),i.audio.musicOn&&i.audio.musicVol<.05&&i.audio.setMusic(!0,.55),this.renderSound(),this.renderSettings(!0),i.save();break;case`settings`:this.$(`settings`).classList.toggle(`hidden`),this.renderSettings(!0);break;case`photo`:this.openPhoto({id:+r});break;case`photo-roost`:this.openPhoto({roost:+r});break;case`clip`:this.openClip(+r);break;case`share-clip`:this.shareClip();break;case`share`:this.sharePhoto();break;case`copy-photo`:this.copyPhoto(t);break;case`speed`:a.speed=+r,this.renderSettings(!0),i.save();break;case`mut`:a.mut=r,this.renderSettings(!0),i.save();break;case`reset`:this.resetArmed&&performance.now()-this.resetArmed<5e3?(this.resetArmed=0,i.resetAll(),this.$(`settings`).classList.add(`hidden`)):(this.resetArmed=performance.now(),this.renderSettings(!0),setTimeout(()=>this.renderSettings(!0),5100));break;case`intro-ok`:this.introDone=!0,this.$(`intro`).classList.add(`hidden`),i.save();break;case`clone`:{let e=a.clonePigeon(+r);e&&i.select(e.id);break}case`roost-add`:a.roostAdd(+r),this.roostSel=a.roost.length-1,i.select(null,!0);break;case`dismiss`:a.dismissPigeon(+r),i.select(null);break;case`follow`:i.toggleFollow(+r);break;case`deselect`:i.select(null),this.roostSel=null;break;case`perch`:a.roost[+r]&&(this.roostSel=+r,i.select(null,!0));break;case`release`:{let e=a.releaseRoost(+r,!1);e&&(this.roostSel=null,i.select(e.id));break}case`clone-out`:{let e=a.releaseRoost(+r,!0);e&&i.select(e.id);break}case`let-go`:a.removeRoost(+r),this.roostSel=null;break;case`clone-breed`:{let e=a.cloneBreed(r);e&&(this.closeDialog(),i.select(e.id));break}case`find`:this.closeDialog(),i.findTrait(r);break;case`find-off`:i.findTrait(null);break;case`family`:this.openFamily(+r);break;case`ft-go`:{let e=a.whereIs(+r);if(!e)break;this.closeDialog(),e.park==null?(this.roostSel=e.roost,i.select(null,!0)):i.select(e.park);break}}this.renderRoost(),this.refreshT=0}}renderPause(){let e=this.g.paused;this.$(`b-pause`).innerHTML=e?hm.play:hm.pause,this.$(`b-pause`).classList.toggle(`on`,e),this.$(`paused`).classList.toggle(`hidden`,!e)}renderSound(){let e=this.g.audio;this.$(`b-sfx`).innerHTML=e.sfxOn?hm.sound:hm.mute,this.$(`b-music`).innerHTML=e.musicOn?hm.music:hm.musicOff,this.$(`b-sfx`).classList.toggle(`off`,!e.sfxOn),this.$(`b-music`).classList.toggle(`off`,!e.musicOn)}renderRoost(){let e=this.sim,t=this.g.portraits,n=JSON.stringify([e.roost.map(e=>e.name),this.roostSel,this.overRoost]);if(n===this._roostKey)return;this._roostKey=n;let r=`<div class="roost-title">The&nbsp;Roost</div><div class="perches">`;for(let n=0;n<8;n++){let i=e.roost[n];if(!i){r+=`<div class="perch empty" title="empty perch"></div>`;continue}r+=`<button class="perch ${this.roostSel===n?`on`:``}" data-act="perch" data-arg="${n}" title="${$(i.name)}"><img src="${t.get(Fu(i.genome,i.accessory))}" alt=""></button>`}r+=`</div><div class="roost-hint">Drag a favorite here to keep it forever. Or at least until you change your mind.</div>`;let i=this.$(`roost`);i.innerHTML=r,i.classList.toggle(`over`,!!this.overRoost)}roostRect(){return this.$(`roost`).getBoundingClientRect()}setOverRoost(e){this.overRoost!==e&&(this.overRoost=e,this.renderRoost())}ghost(e,t,n){let r=this.$(`ghost`);if(!e){r.classList.add(`hidden`);return}r.src=this.g.portraits.get(e),r.classList.remove(`hidden`),r.style.transform=`translate(${t-38}px, ${n-56}px) rotate(-6deg)`}renderInspector(){let e=this.sim,t=this.g.portraits,n=this.$(`inspector`),r=e.selId==null?null:e.byId(e.selId),i=r&&!r.flying?r:null,a=i?null:this.roostSel,o=a==null?null:e.roost[a];if(!i&&!o){this._insKey&&=(n.classList.add(`hidden`),null);return}let s=i?`s|${i.id}|${i.rev||0}|${Sm(e.age(i))}|${this.g.cam.follow}`:`r|${a}|${o.name}|${o.lid}`;if(s===this._insKey)return;this._insKey=s;let c;if(i)c={img:t.get(i.pheno),kicker:`Specimen no. `+String(i.id).padStart(3,`0`),name:i.name,meta:`Generation `+i.gen+` · `+Sm(e.age(i)),color:i.pheno.label,breeds:i.breeds,traits:i.pheno.traits,carries:Lu(i.genome),actions:`<button class="btn primary" data-act="clone" data-arg="${i.id}">${hm.clone} Clone</button>
                  <button class="btn" data-act="roost-add" data-arg="${i.id}">${hm.roost} Roost</button>
                  <button class="btn ghost" data-act="dismiss" data-arg="${i.id}">Dismiss<span class="opt"> politely</span></button>`,follow:i.id,photo:`data-act="photo" data-arg="${i.id}"`,lid:i.lid,clip:i.id};else{let e=Fu(o.genome,o.accessory);c={img:t.get(e),kicker:`Roost resident`,name:o.name,meta:`Generation `+o.gen+` · kept bird`,color:e.label,breeds:Zu(e),traits:e.traits,carries:Lu(o.genome),actions:`<button class="btn primary" data-act="clone-out" data-arg="${a}">${hm.clone} Clone into park</button>
                  <button class="btn" data-act="release" data-arg="${a}">Release to park</button>
                  <button class="btn ghost" data-act="let-go" data-arg="${a}">Let go</button>`,photo:`data-act="photo-roost" data-arg="${a}"`,lid:o.lid}}n.classList.remove(`hidden`),n.innerHTML=`
      <button class="btn icon close" data-act="deselect" aria-label="Close">${hm.x}</button>
      <div class="ins-head">
        <div class="portrait"><img src="${c.img}" alt=""></div>
        <div class="ins-id"><div class="kicker">${$(c.kicker)}</div><h3>${$(c.name)}</h3><div class="meta">${$(c.meta)}</div></div>
      </div>
      <div class="colorlabel">${$(c.color)}</div>
      ${c.breeds.length?`<div class="chips">${c.breeds.map(e=>`<span class="chip chip-breed">★ ${$(e.name)}</span>`).join(``)}</div>`:``}
      ${c.traits.length?`<div class="chips">${c.traits.map(e=>ym(e.key,xm(e.tier),$(e.label))).join(``)}</div>`:``}
      ${c.carries.length?`<div><div class="label">Hidden in the DNA</div><div class="chips">${c.carries.map(e=>ym(e.key,`chip-carry`,`½ `+$(e.label))).join(``)}</div></div>`:``}
      <div class="actions">${c.actions}<button class="btn ghost" ${c.photo} title="Take a high-res photo">${hm.camera}<span class="opt"> Photo</span></button>${c.clip==null?``:`<button class="btn ghost" data-act="clip" data-arg="${c.clip}" title="Make a 6-second vertical video">${hm.film}<span class="opt"> Clip</span></button>`}${c.lid!=null&&this.sim.family[c.lid]?`<button class="btn ghost" data-act="family" data-arg="${c.lid}" title="Family tree">${hm.tree}<span class="opt"> Family</span></button>`:``}${c.follow?`<button class="btn ghost ${this.g.cam.follow===c.follow?`on`:``}" data-act="follow" data-arg="${c.follow}" title="Follow with camera (F)">${hm.eye}<span class="opt"> ${this.g.cam.follow===c.follow?`Following`:`Follow`}</span></button>`:``}</div>`}renderSettings(e){let t=this.sim,n=this.$(`settings`);if(n.classList.contains(`hidden`))return;let r=`<div><b>${t.alive()}</b><span>residents</span></div><div><b>${t.stats.births}</b><span>hatched</span></div>
        <div><b>${t.stats.flown}</b><span>departed</span></div><div><b>gen ${t.stats.maxGen}</b><span>deepest line</span></div>`,i=this.g.audio.songTitle,a=i?`♪ ${$(i)}`:``;if(!e&&n.querySelector(`.stats`)){let e=n.querySelector(`.stats`);e.innerHTML!==r&&(e.innerHTML=r);let t=n.querySelector(`.nowplaying`);t&&t.innerHTML!==a&&(t.innerHTML=a);return}let o=this.g.audio,s=(e,t,n)=>`<input type="range" min="0" max="100" value="${n?Math.round(t*100):0}" data-act="${e}" aria-label="${e}">`,c=(e,t,n)=>`<div class="seg">${e.map(e=>`<button class="${t(e)?`on`:``}" data-act="${n}" data-arg="${n===`speed`?e.v:e.id}">${e.label}</button>`).join(``)}</div>`;n.innerHTML=`
      <div class="row phone"><button class="btn icon ${o.sfxOn?``:`off`}" data-act="sfx" aria-label="Sound effects">${o.sfxOn?hm.sound:hm.mute}</button>
        <button class="btn icon ${o.musicOn?``:`off`}" data-act="music" aria-label="Music">${o.musicOn?hm.music:hm.musicOff}</button>
        <span class="spacer"></span><button class="btn small" data-act="help">${hm.help} Help</button></div>
      <div class="row"><div class="label">Music</div>${s(`musicvol`,o.musicVol,o.musicOn)}</div>
      <div class="nowplaying">${a}</div>
      <div class="row"><div class="label">Sounds</div>${s(`sfxvol`,o.sfxVol,o.sfxOn)}</div>
      <div class="row"><div class="label">Park speed</div>${c(of,e=>Math.abs(t.speed-e.v)<.05,`speed`)}</div>
      <div class="row"><div class="label">Mutations</div>${c(sf,e=>t.mut===e.id,`mut`)}</div>
      <div class="row"><div class="label">Weirdness</div>${c(Ed,e=>t.whimsy===e.id,`whimsy`)}</div>
      <div class="stats">${r}</div>
      <form class="row code" data-code><input name="code" placeholder="Secret code" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="go" aria-label="Secret code"><button class="btn small" type="submit">Enter</button></form>
      <button class="btn ghost small" data-act="reset">${this.resetArmed&&performance.now()-this.resetArmed<5e3?`Really? Tap again to start over`:`Start over with fresh ferals`}</button>`}openDialog(e){let t=this.sim;this.dialog=e,e===`pedia`&&(this.seen.pedia=Object.keys(t.discovered).length),e===`breeds`&&(this.seen.breeds=Object.keys(t.breeds).length),this.g.save();let n=this.$(`dialog`);n.classList.remove(`hidden`),n.innerHTML=`<div class="dialog card" role="dialog">${this[`dlg_`+e]()}</div>`}openAchievement(e){let t=Nd.find(t=>t.id===e),n=this.sim;if(!t)return;this.dialog=`achievement`;let r=this.$(`dialog`);r.classList.remove(`hidden`);let i=this.g.monumentPicture(e),a=n.achievements[e],o=Object.keys(n.achievements).length,s=Nd.map(t=>{let[r,i]=t.progress(n),a=!!n.achievements[t.id];return`<div class="ach ${a?`done`:``} ${t.id===e?`this`:``}"><div class="ach-top"><b>${a?$(t.name):`???`}</b><span>${a?`🏆`:`${r} / ${i}`}</span></div>
        <div class="note">${$(t.how)}</div>${a?``:`<div class="bar"><i style="width:${Math.round(r/i*100)}%"></i></div>`}</div>`}).join(``);r.innerHTML=`<div class="dialog card ach-dlg" role="dialog">${this.dlgHead($(t.name),`<span class="chip chip-breed">🏆 ${o} / ${Nd.length}</span>`)}
      <div class="ach-body">
        <div class="ach-hero">${i?`<img src="${i}" alt="">`:``}
          <p class="ach-blurb">${$(t.blurb)}</p>
          <div class="foot">${$(t.how)}${a?` · Earned ${new Date(a.at).toLocaleDateString(void 0,{day:`numeric`,month:`short`,year:`numeric`})}`:``}</div></div>
        <div class="ach-list">${s}</div>
      </div></div>`}async openPhoto(e){this.dialog=`photo`;let t=this.$(`dialog`);t.classList.remove(`hidden`),t.innerHTML=`<div class="dialog card photo-dlg" role="dialog">${this.dlgHead(`Photo`,``)}<div class="photo-wrap"><div class="developing">Developing…</div></div></div>`,await new Promise(e=>requestAnimationFrame(e));let n=await this.g.photo(e);if(this.dialog!==`photo`){n&&URL.revokeObjectURL(n.url);return}if(!n){this.closeDialog();return}this.photoRes&&URL.revokeObjectURL(this.photoRes.url),this.photoRes=n;let r=!!(window.ClipboardItem&&navigator.clipboard?.write),i=!!(navigator.canShare&&navigator.canShare({files:[new File([n.blob],n.file,{type:`image/png`})]}));t.querySelector(`.photo-wrap`).innerHTML=`<img src="${n.url}" alt="${$(n.name)}" class="photo-img">`,t.querySelector(`.dialog`).insertAdjacentHTML(`beforeend`,`<div class="actions photo-actions">
        <a class="btn primary" href="${n.url}" download="${$(n.file)}" data-act="download">${hm.download} Download PNG</a>
        ${r?`<button class="btn" data-act="copy-photo">${hm.clone} <span>Copy image</span></button>`:``}
        ${i?`<button class="btn" data-act="share">${hm.share} Share</button>`:``}
        <span class="foot">${n.w} × ${n.h} px</span></div>`)}async openClip(e){if(this.g.recording)return;this.dialog=`clip`;let t=this.$(`dialog`);t.classList.remove(`hidden`),t.innerHTML=`<div class="dialog card photo-dlg clip-dlg busy" role="dialog">${this.dlgHead(`Video clip`,`<span class="chip chip-t1">6 s · vertical</span>`)}
      <div class="photo-wrap"><div class="filming"><div class="developing">Filming…</div><div class="bar clipbar"><i style="width:0%"></i></div>
      <div class="foot">Rendering every frame at 1080 × 1920 — the park keeps living while the camera rolls.</div></div></div></div>`,await new Promise(e=>requestAnimationFrame(e));let n=t.querySelector(`.clipbar i`),r;try{r=await this.g.clip(e,e=>{n&&(n.style.width=Math.round(e*100)+`%`)})}catch(e){t.querySelector(`.clip-dlg`)?.classList.remove(`busy`),this.dialog===`clip`&&(t.querySelector(`.photo-wrap`).innerHTML=`<p class="clip-err">${$(e.message||String(e))}</p>`);return}if(t.querySelector(`.clip-dlg`)?.classList.remove(`busy`),this.dialog!==`clip`){URL.revokeObjectURL(r.url);return}this.clipRes&&URL.revokeObjectURL(this.clipRes.url),this.clipRes=r;let i=new File([r.blob],r.file,{type:r.mime}),a=!!(navigator.canShare&&navigator.canShare({files:[i]})),o=`${r.mime.includes(`mp4`)?`MP4`:`WebM`} (${{avc:`H.264`,vp9:`VP9`,av1:`AV1`,vp8:`VP8`}[r.codec]||r.codec}${r.audioCodec?` + `+r.audioCodec.toUpperCase():`, silent`})`;t.querySelector(`.photo-wrap`).innerHTML=`<video class="photo-img clip-video" src="${r.url}" autoplay loop muted playsinline controls></video>`,t.querySelector(`.dialog`).insertAdjacentHTML(`beforeend`,`<div class="actions photo-actions">
        <a class="btn primary" href="${r.url}" download="${$(r.file)}" data-act="download">${hm.download} Download</a>
        ${a?`<button class="btn" data-act="share-clip">${hm.share} Share</button>`:``}
        <span class="foot">${r.w} × ${r.h} · ${o} · ${(r.blob.size/1e6).toFixed(1)} MB${r.mime.includes(`mp4`)?``:` · for Instagram, convert to MP4 first`}</span></div>`)}async shareClip(){let e=this.clipRes;if(e)try{await navigator.share({files:[new File([e.blob],e.file,{type:e.mime})],title:e.name,text:`${e.name} — Pigeon Park 🐦 pigeonpark.live`})}catch{}}async copyPhoto(e){let t=this.photoRes;if(!t)return;let n=e.querySelector(`span`);try{await navigator.clipboard.write([new ClipboardItem({"image/png":t.blob})]),n.textContent=`Copied!`,this.toast(`Photo copied to the clipboard.`,`note`)}catch{n.textContent=`Copy failed`}setTimeout(()=>{n.isConnected&&(n.textContent=`Copy image`)},1800)}async sharePhoto(){let e=this.photoRes;if(e)try{await navigator.share({files:[new File([e.blob],e.file,{type:`image/png`})],title:e.name,text:e.name+` — Pigeon Park`})}catch{}}openFamily(e){let t=this.sim,n=this.g.portraits,r=t.familyTree(e),i=r.root;if(!i)return;this.dialog=`family`;let a=[],o=(e,r,i)=>{let s=8>>r,c=r?i%2?`down`:`up`:``,l=`grid-column:${r+1};grid-row:${i*s+1} / span ${s}`;if(!e){a.push(`<div class="ft-cell ${c}" style="${l}"><div class="ft-node unknown"><span class="ft-q">?</span><span class="ft-txt"><b>Unknown</b><small>records lost</small></span></div></div>`);return}let u=e.rec,d=t.whereIs(e.lid),f=!!d,p=e.par&&e.par.length,m=d?d.park==null?`in the roost`:`in the park`:`flown off`,h=Fu(Uu(u.g),u.a),g=Zu(h)[0];a.push(`<div class="ft-cell ${c} ${p?`kids`:``}" style="${l}">
        <button class="ft-node ${r?``:`self`} ${f?`live`:``}" ${f&&r?`data-act="ft-go" data-arg="${e.lid}"`:``} title="${$(u.n)} — ${$(h.label)}${g?` · `+$(g.name):``}">
          <img src="${n.get(h)}" alt=""><span class="ft-txt"><b>${$(u.n)}</b><small>${g?`★ `+$(g.name)+` · `:``}gen ${u.ge} · ${m}</small></span></button></div>`),p&&e.par.forEach((e,t)=>o(e,r+1,i*2+t))};o(i,0,0);let s=i.rec,[c,l]=i.par||[],u=s.how===`hatch`?`Hatched in the park to ${$(c?.rec.n||`a bird lost to history`)} and ${$(l?.rec.n||`a bird lost to history`)}.`:typeof bm[s.how]==`function`?bm[s.how](s):bm[s.how]||bm.unknown,d=(e,t)=>`${e} ${t}${e===1?``:`s`}`,f=r.chicks||r.grandchicks?` In the park now: ${[r.chicks&&d(r.chicks,`chick`),r.grandchicks&&d(r.grandchicks,`grandchick`)].filter(Boolean).join(`, `)}.`:``,p=this.$(`dialog`);p.classList.remove(`hidden`),p.innerHTML=`<div class="dialog card fam-dlg" role="dialog">${this.dlgHead(`Family of `+$(s.n),`<span class="chip chip-t1">generation ${s.ge}</span>`)}
      <p class="fam-sum">${u}${f}</p>
      <div class="ftree-wrap"><div class="ftree ${i.par?``:`solo`}">${a.join(``)}</div></div>
      <div class="foot">Parents, grandparents and great-grandparents. Tap a relative who's still around to go to them.</div></div>`}renderFind(){let e=this.$(`finder`),t=this.g.find;if(!t){e.classList.contains(`hidden`)||(e.classList.add(`hidden`),this._findKey=null);return}let n=0,r=0;for(let e of this.sim.pigeons){if(e.flying)continue;let i=Vu(e.genome,e.pheno,t.key);i===2?n++:i===1&&r++}let i=[t.key,n,r].join(`|`);i!==this._findKey&&(this._findKey=i,e.classList.remove(`hidden`),e.innerHTML=`${hm.search}<b>${$(vm(t.key))}</b>`+(n+r?`<span class="fk"><i class="fdot show"></i>${n} show${n===1?`s`:``} it</span>${t.key.startsWith(`acc:`)?``:`<span class="fk"><i class="fdot carry"></i>${r} carr${r===1?`ies`:`y`} it</span>`}`:`<span class="fk">nobody in the park has it</span>`)+`<button class="btn icon" data-act="find-off" aria-label="Stop finding">${hm.x}</button>`)}closeDialog(){this.dialog=null,this.$(`dialog`).classList.add(`hidden`),this.$(`dialog`).innerHTML=``;for(let e of[`photoRes`,`clipRes`])this[e]&&(URL.revokeObjectURL(this[e].url),this[e]=null)}dlgHead(e,t){return`<div class="dlg-head"><div class="dlg-title">${e}</div>${t}<span class="spacer"></span><button class="btn icon" data-act="close" aria-label="Close">${hm.x}</button></div>`}dlg_pedia(){let e=this.sim,t=Object.keys(id),n=t.map(t=>{let n=Du[t]||{label:t,tier:1},r=!!e.discovered[t];return{k:t,got:r,tier:n.tier,title:r?n.label:`???`,note:r?id[t]:`Not yet observed in your park.`}}).sort((e,t)=>t.got-e.got||e.tier-t.tier||(e.title>t.title?1:-1)),r=t.filter(t=>e.discovered[t]).length;return this.dlgHead(`The Pigeonpedia`,`<span class="chip chip-t1">${r} / ${t.length} observed</span>`)+`<div class="grid pedia">${n.map(e=>`<div class="entry ${e.got?``:`dim`}"><div class="entry-top"><b>${$(e.title)}</b><span class="chip ${xm(e.tier)} tiny">${_m[e.tier]||`odd`}</span></div><div class="note">${$(e.note)}</div>${e.got?`<button class="btn small ghost find" data-act="find" data-arg="${$(e.k)}">${hm.search} Find in park</button>`:``}</div>`).join(``)}</div>
       <div class="foot">Field notes are written the first time a trait hatches in your park. <b>Find in park</b> marks birds that show a trait in green and hidden carriers in yellow.</div>`}missingTraits(e){let t=this.sim,n=[];for(let[t,r]of Object.entries(e.req)){if(t===`accessory`)continue;if(t===`colorKey`){for(let e of $u(Array.isArray(r)?r[0]:r))n.push([e]);continue}let e=(Array.isArray(r)?r:[r]).map(e=>t+`:`+e).filter(e=>Du[e]);e.length&&n.push(e)}return n.filter(e=>!e.some(e=>t.discovered[e]))}recipeTraits(e){let t=[];for(let[n,r]of Object.entries(e.req)){let e=Array.isArray(r)?r:[r];n===`colorKey`?t.push(...$u(e[0])):n===`accessory`?t.push(...e.map(e=>`acc:`+e)):t.push(...e.map(e=>n+`:`+e).filter(e=>Du[e]))}return t}dlg_breeds(){let e=this.sim,t=this.g.portraits,n=Xu.map(t=>({b:t,got:e.breeds[t.id]})).sort((e,t)=>!!t.got-!!e.got),r=Object.keys(e.breeds).length;return this.dlgHead(`Breed Registry`,`<span class="chip chip-breed">${r} / ${Xu.length} discovered</span>`)+`<div class="grid breeds">${n.map(({b:e,got:n})=>{let r=e.legend||n?0:this.missingTraits(e).length,i=n||!e.legend&&!r?this.recipeTraits(e):[];return`
        <div class="entry breed">
          <img src="${t.get(nd(e))}" class="${n?``:`silhouette`}" alt="">
          <b>${n?$(e.name):`???`}</b>
          <span class="chip tiny ${e.legend?`chip-breed`:e.real?`chip-t1`:e.fashion?`chip-t2`:`chip-t3`}">${e.legend?`legendary`:e.real?e.exotic?`exotic`:`real breed`:e.fashion?`fashion`:`cryptid`}</span>
          <div class="note">${n?$(e.blurb):e.legend?`Whispered of in park lore. There is a word…`:r?`Recipe unknown — needs ${r} trait${r>1?`s`:``} you haven't observed yet.`:`Recipe: `+$(td(e))+`.`}</div>
          ${i.length?`<div class="chips recipe">${i.map(e=>ym(e,`chip-t1`,hm.search+` `+$(vm(e)))).join(``)}</div>`:``}
          ${n?`<div class="by">first bred by ${$(n.by)}</div><button class="btn small" data-act="clone-breed" data-arg="${e.id}">${hm.clone} Clone into park</button>`:``}
        </div>`}).join(``)}</div>
       <div class="foot">Match a real fancy-pigeon breed to register it. The cryptids are your problem. Tap a recipe trait to find birds that show or carry it.</div>`}dlg_help(){let e=this.sim;return this.dlgHead(`How the park works`,``)+`
      <div class="help">
        <section><h4>The idea</h4>
          <p>The pigeons run the place. They wander, court, lay eggs and hatch chicks entirely on their own — you shape <em>who</em> gets to breed.
          Every chick gets one copy of each of ${Cu.length} genes from each parent. Recessive traits only show with two copies, so they can hide for generations.</p>
          <p>Goal: discover all <b>${Xu.length} breeds</b> in the Breed Registry and fill all <b>${Object.keys(id).length} field notes</b> in the Pigeonpedia.</p></section>
        <section><h4>Controls</h4><table>${wm.map(([e,t])=>`<tr><td><kbd>${$(e)}</kbd></td><td>${$(t)}</td></tr>`).join(``)}</table></section>
        <section><h4>Weird things happen</h4><ul>${Object.values(wd).map(e=>`<li><b>${$(e.label)}.</b> ${$(e.blurb)}</li>`).join(``)}</ul>
          <p>Turn them up or down with <b>Weirdness</b> in settings.</p></section>
        <section><h4>Tips</h4><ul>
          <li><b>Clone</b> birds that carry what you want (check “Hidden in the DNA”) to flood the gene pool.</li>
          <li><b>Dismiss</b> birds that dilute it. The park holds ${e.cap}; when it fills up, birds fly off on their own.</li>
          <li>The <b>Roost</b> keeps 8 favourites safe. Release or clone them back any time.</li>
          <li>A registry card reveals its recipe once you've observed every trait it needs. Found breeds can be cloned straight into the park.</li>
          <li>Fantasy colours only appear through mutation — turn Mutations up to <b>${sf[2].label}</b> to fish for them.</li>
          <li>Park speed goes from ${of[0].label} to ${of[of.length-1].label}. It's fine to just leave the park running.</li>
          <li>Hunting a breed? Tap a trait (in a bird's card, the Pigeonpedia or a registry recipe) to <b>find</b> it: birds that show it get a green marker, hidden carriers a yellow one. Clone those.</li>
          <li><b>Family</b> on a bird's card shows its parents, grandparents and great-grandparents.</li>
          <li>Tap <b>Photo</b> on any bird for a high-res picture card, or <b>Clip</b> for a 6-second vertical video (with captions and music) to post.</li>
          <li>Music and sound effects have separate buttons in the top bar and volume sliders in settings.</li>
          <li>Milestones build <b>monuments</b> on the lawn around the plaza. Tap one to see what it's for and how close you are to the rest.</li>
          <li>Some words, typed while the park is open (or entered under <b>Secret code</b> in settings), do things.</li>
        </ul></section>
      </div>
      <div class="foot version">Pigeon Park v${$(this.g.version.version)} · build ${$(this.g.version.hash)}${this.g.version.date?` · `+$(this.g.version.date):``}</div>`}frame(e,t){let n=this.sim;if(this.refreshT-=e,this.refreshT<=0){this.refreshT=.4;let e=n.alive();this.$(`pop`).textContent=e+` / `+n.cap+` pigeons`;let t=(n.night>.5?`m`:`s`)+Cm(df(n.phase()));t!==this._clock&&(this._clock=t,this.$(`clock`).innerHTML=(n.night>.5?hm.moon:hm.sun)+`<span>${t.slice(1)}</span>`);let r=Object.keys(n.breeds).length,i=Object.keys(n.discovered).length;this.$(`breedcount`).textContent=r+`/`+Xu.length,this.$(`b-breeds`).classList.toggle(`new`,r>this.seen.breeds),this.$(`b-pedia`).classList.toggle(`new`,i>this.seen.pedia),this.renderInspector(),this.renderSettings(),this.renderRoost(),this.renderFind(),this.$(`intro`).classList.toggle(`hidden`,this.introDone||n.selId!=null||this.roostSel!=null||!!this.dialog),this.placeToasts()}let r=this.g.cam.name===`overview`||this.g.cam.name===`hud-check`;r!==this._rcHidden&&(this._rcHidden=r,this.$(`recenter`).classList.toggle(`hidden`,r)),this.renderBubbles(t)}renderBubbles(e){let t=this.sim,n=this.box||=this.$(`bubbles`),r=this._seen||=new Set,i=!1;r.clear();for(let a of t.pigeons){let o=a.id===t.selId;if(!a.emote&&!o)continue;let s=this.g.flock.view(a.id);if(!s)continue;let c=s.size(a,t.t),l=Np(s.vis.x,s.vis.y+.72*c,s.vis.z,e);if(!(l.z>1)){if(a.emote){r.add(a.id);let e=this.bubbles.get(a.id),t=a.emote.kind===`heart`?`♥`:a.emote.kind===`zzz`?`z z z`:a.emote.text||`!`;e||(e=document.createElement(`div`),n.appendChild(e),this.bubbles.set(a.id,e)),e.textContent!==t&&(e.textContent=t,e.className=`bubble `+(a.emote.kind===`heart`?`heart`:a.emote.kind===`zzz`?`zzz`:`say`));let i=`translate(${l.x|0}px, ${l.y|0}px) translate(-50%, -100%)`;e._tr!==i&&(e._tr=i,e.style.transform=i)}if(o){let t=this.nameTag;t||(t=this.nameTag=document.createElement(`div`),t.className=`nametag`,n.appendChild(t));let r=Np(s.vis.x,s.vis.y,s.vis.z,e);t.textContent!==a.name&&(t.textContent=a.name);let o=`translate(${r.x|0}px, ${(r.y|0)+10}px) translate(-50%, 0)`;t._tr!==o&&(t._tr=o,t.style.transform=o),i=!0}}}this.nameTag&&this.nameTag.style.display!==(i?``:`none`)&&(this.nameTag.style.display=i?``:`none`);for(let[e,t]of this.bubbles)r.has(e)||(t.remove(),this.bubbles.delete(e))}},Em=[`overview`,`fountain`,`dovecote`,`hero-close`],Dm=class{constructor(e,t){if(this.g=e,this.on=t,this.t=0,!t)return;let n=this.el=document.createElement(`pre`);n.id=`diag`,document.body.appendChild(n);let r=0;n.addEventListener(`click`,()=>{r=(r+1)%Em.length,e.cam.shot(Em[r])})}frame(){if(!this.on)return;let e=performance.now();if(e-this.t<250)return;this.t=e;let t=this.g,n=t.renderer.info,r=[...t.frameMs].sort((e,t)=>e-t),i=e=>r.length?r[Math.min(r.length-1,Math.floor(e*r.length))].toFixed(1):`-`;this.el.textContent=[`gpu   ${String(t.gpu).slice(0,48)}`,`tier  ${t.q.tier}  dpr ${t.renderer.getPixelRatio()}  shadows ${t.q.shadows?`on`:`off`}`,`frame p50 ${i(.5)} ms  p99 ${i(.99)} ms`,`draws ${n.render.calls}  tris ${(n.render.triangles/1e3).toFixed(1)}k  programs ${n.programs.length} (boot ${t.programsAfterBoot})`,`birds ${t.sim.pigeons.length}  eggs ${t.sim.eggs.length}  t ${t.sim.t.toFixed(1)}  ${t.sim.hour().toFixed(1)}h`,`cam   ${t.cam.name}${t.frozen?`  FROZEN`:``}`,t.lastShaderError?`SHADER ${t.lastShaderError.slice(0,80)}`:``].join(`
`)}},Om=(e,t,n)=>new B(e,t,n),km=e=>new H(e),Am=(e,t=28)=>new _a(e.map(([e,t])=>new z(e,t)),t),jm=km(`#ece6dc`),Mm=km(`#cfc5b3`),Nm=km(`#b7ac98`),Pm=km(`#a5773c`),Fm=km(`#e8b64c`),Im=km(`#3e4a3f`),Lm=km(`#8a6a4a`);function Rm(e,t=.6,n=Mm){return e.add(new ua(.72,.1,.72),Nm,Q(Om(0,.05,0)),.2),e.add(new ua(.56,t,.56),n,Q(Om(0,.1+t/2,0)),.25),e.add(new ua(.66,.07,.66),n,Q(Om(0,.13+t,0))),.165+t}var zm=(e,t,n,r,i=.5)=>e.add(rp(pp()),typeof r==`function`?r:()=>r,Q(Om(0,t,0),[0,-i,0],[n,n,n]),.1),Bm={statue(e){let t=Rm(e);zm(e,t,1.25,(e,n)=>(n-t)/1.25>.42?Nm:Mm)},birdbath(e,t){e.add(Am([[0,0],[.3,0],[.28,.06],[.1,.12],[.08,.7],[.14,.78],[0,.78]]),Mm,Q(Om(0,0,0)),.25),t.add(Am([[0,0],[.1,0],[.5,.1],[.56,.2],[.5,.22],[.1,.12],[0,.12]],32),Pm,Q(Om(0,.76,0))),t.add(rp(pp()),()=>Pm,Q(Om(.36,.95,0),[0,-1.7,0],[.75,.75,.75]))},topiary(e){e.add(new ua(.8,.4,.6),Lm,Q(Om(0,.2,0)),.3);let t=rp(pp()),n=t.attributes.position,r=new B;for(let e=0;e<n.count;e++)r.fromBufferAttribute(n,e),r.multiplyScalar(1+.06*Math.sin(r.x*60)*Math.cos(r.y*55+r.z*40)),n.setXYZ(e,r.x,r.y,r.z);t.computeVertexNormals(),e.add(t,(e,t,n)=>km(`#6f8f4c`).lerp(km(`#94ad6a`),Math.max(0,Math.min(1,(t-.4)/1.4))),Q(Om(0,.38,0),[0,-.5,0],[2.2,2.2,2.2]))},gold(e,t){let n=Rm(e,.7,jm);t.add(rp(pp()),()=>Fm,Q(Om(0,n,0),[0,-.5,0],[1.35,1.35,1.35]))},obelisk(e,t){let n=new pa(.16,.26,2.1,4,1);n.rotateY(Math.PI/4),e.add(new ua(.7,.16,.7),Nm,Q(Om(0,.08,0)),.2),e.add(n,Mm,Q(Om(0,1.21,0)),.3),e.add(new ma(.19,.22,4).rotateY(Math.PI/4),Nm,Q(Om(0,2.37,0))),t.add(rp(pp()),()=>Fm,Q(Om(0,2.44,0),[0,-.5,0],[.7,.7,.7]))},trophy(e,t){let n=Rm(e,.5,jm);t.add(Am([[0,0],[.22,0],[.2,.04],[.06,.1],[.05,.38],[.12,.44],[.3,.62],[.34,.95],[.3,.95],[.26,.66],[.1,.5],[0,.5]],32),Fm,Q(Om(0,n,0)));for(let e of[-1,1])t.add(new Sa(.13,.025,8,16,Math.PI),Fm,Q(Om(.33*e,n+.72,0),[0,0,-Math.PI/2*e]));t.add(rp(pp()),()=>Fm,Q(Om(0,n+.93,0),[0,-.5,0],[.5,.5,.5]))},runestone(e,t,n){let r=vp(.5,2,.25,7);r.scale(.8,2.1,.55),e.add(r,(e,t)=>km(`#6d6478`).lerp(km(`#8e8499`),Math.min(1,t/1.8)),Q(Om(0,.95,0)),.3);for(let e=0;e<6;e++)n.add(new ua(.06,.12,.03),km(`#b89cff`),Q(Om(-.12+e%2*.24,.6+e*.22,.27),[0,0,(e%3-1)*.5]))},monolith(e,t,n){e.add(new ua(.55,1.9,.16),km(`#16151c`),Q(Om(0,.95,0)));for(let e=0;e<18;e++)n.add(new va(.018),km(`#ffffff`),Q(Om(Math.sin(e*12.9898)*.24,.15+e*.618%1*1.65,.085)))},globe(e,t){t.add(Am([[0,0],[.26,0],[.22,.05],[.06,.12],[.05,.6],[0,.6]]),Pm,Q(Om(0,0,0))),t.add(new Sa(.5,.018,6,40,Math.PI),Pm,Q(Om(0,1.1,0),[0,0,Math.PI/2+.4]));let n=new xa(.44,32,20);e.add(n,(e,t,n)=>Math.sin(e*9)+Math.cos(n*8+t*5)+Math.sin(t*11)>.7?km(`#7f9c5a`):km(`#6a9fd0`),Q(Om(0,1.1,0),[.4,0,0])),e.add(rp(pp()),(e,t)=>Mm,Q(Om(0,1.52,0),[0,-1.3,0],[.6,.6,.6]))},books(e,t){[`#8c3b32`,`#3f5f8c`,`#6e7f3b`,`#b07b2e`].forEach((t,n)=>e.add(new ua(.8-n*.06,.15,.55-n*.03),km(t),Q(Om(0,.075+n*.155,0),[0,n*.15-.2,0])));for(let t of[-1,1])e.add(new ua(.34,.03,.46),km(`#f3ead6`),Q(Om(.17*t,.66,0),[0,.1,.12*t]));t.add(new ma(.02,.5,6),Pm,Q(Om(.15,.88,.1),[.5,0,-.6]))},familytree(e,t){e.add(new pa(.3,.34,.12,20),Nm,Q(Om(0,.06,0))),t.add(new pa(.05,.08,1.3,8),Im,Q(Om(0,.75,0)));let n=(e,t)=>Math.sin(e*91.7+t*17.3)*.5+.5;for(let e=0;e<7;e++){let r=e/7*Math.PI*2,i=.45+n(e,1)*.3,a=Om(Math.cos(r)*i,1.25+n(e,2)*.5,Math.sin(r)*i),o=Om(0,1+e*.06,0),s=a.clone().sub(o);t.add(new pa(.02,.03,s.length(),6),Im,new V().compose(o.clone().addScaledVector(s,.5),new jt().setFromUnitVectors(Om(0,1,0),s.clone().normalize()),Om(1,1,1)));for(let r=0;r<3;r++)t.add(new xa(.06,10,8),Fm,Q(a.clone().add(Om((n(e,r+3)-.5)*.2,(n(e,r+6)-.5)*.15,(n(e,r+9)-.5)*.2))))}},egg(e,t){t.add(new Sa(.42,.12,10,28),Pm,Q(Om(0,.14,0),[Math.PI/2,0,0])),e.add(new xa(1,28,20).scale(.4,.56,.4),jm,Q(Om(0,.62,0)),.15)},minicote(e){e.add(new pa(.05,.06,1.2,8),Lm,Q(Om(0,.6,0))),e.add(new ua(.55,.4,.42),km(`#efe7d8`),Q(Om(0,1.38,0)),.15),e.add(new ma(.46,.32,4).rotateY(Math.PI/4),km(`#b7593f`),Q(Om(0,1.74,0)));for(let t=0;t<2;t++)e.add(new pa(.06,.06,.02,12),km(`#3a302a`),Q(Om(-.12+t*.24,1.42,.215),[Math.PI/2,0,0]))},spiral(e){e.add(new pa(.3,.34,.14,20),Nm,Q(Om(0,.07,0)));let t=new Ca(.32,.07,120,10,2,3);e.add(t,(e,t,n)=>new H().setHSL(((Math.atan2(n,e)/Math.PI+1)/2+t*.3)%1,.75,.6),Q(Om(0,.75,0),[.3,0,.2]))}},Vm=class{constructor(e,t){this.scene=e,this.mats={stone:t,metal:new Pa({vertexColors:!0,roughness:.3,metalness:.85}),glow:new Pa({vertexColors:!0,roughness:.6,emissive:new H(`#ffffff`),emissiveIntensity:.8})},this.built=new Map}add(e,t){if(this.built.has(e))return;let n=Nd.findIndex(t=>t.id===e);if(n<0)return;let r=Nd[n],[i,a]=Pd[n],o=new _p,s=new _p,c=new _p;Bm[r.monument](o,s,c);let l=new kn;for(let[e,t]of[[o,this.mats.stone],[s,this.mats.metal],[c,this.mats.glow]])e.geos.length&&l.add(e.mesh(t));l.position.set(i,0,a),l.rotation.y=Math.atan2(-i,-a)+.3;let u=new $n().setFromObject(l);t&&l.scale.setScalar(.001),this.scene.add(l),this.built.set(e,{group:l,born:t?performance.now():0,x:i,z:a,top:u.max.y,cy:(u.max.y+u.min.y)/2})}sync(e,t=!0){for(let n of Object.keys(e))this.built.has(n)||this.add(n,t)}clear(){for(let e of this.built.values())this.scene.remove(e.group);this.built.clear()}update(){let e=performance.now();for(let t of this.built.values()){if(!t.born)continue;let n=Math.min(1,(e-t.born)/1100),r=n<1?1+Math.sin(n*Math.PI*2.5)*(1-n)*.35*Math.min(1,n*4):1;t.group.scale.setScalar(Math.max(.001,n<.15?n/.15*.6:r)),n>=1&&(t.born=0)}}pick(e){let t=null,n=1/0,r=this._c||=new B;for(let[i,a]of this.built){let o=Ap(e,r.set(a.x,a.cy,a.z),Math.max(.6,a.top*.55));o<n&&(n=o,t=i)}return t}get(e){return this.built.get(e)}},Hm=`modulepreload`,Um=function(e,t){return new URL(e,t).href},Wm={},Gm=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Um(t,n),t=s(t),t in Wm)return;Wm[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Hm,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Km={version:`0.9.0`,hash:`30723cd`,date:`2026-10-07`},qm=`pigeon-park-3d-v1`,Jm=`pigeon-park-save-v1`,Ym=`pigeon-park-gfx`,Xm=new URLSearchParams(location.search),Zm=e=>Xm.has(e)&&Xm.get(e)!==`0`;function Qm(){let e=navigator.userAgent,t=/Android|iPhone|iPad|iPod|Mobile/i.test(e)||navigator.maxTouchPoints>1&&Math.min(innerWidth,innerHeight)<820,n=Xm.get(`quality`)||(()=>{try{return localStorage.getItem(Ym)}catch{return null}})()||(t?`medium`:`high`),r={high:{tier:`high`,antialias:!0,shadows:!0,shadowMap:2048,lampLights:4,low:!1,pr:2,birdShadows:!0},medium:{tier:`medium`,antialias:!1,shadows:!0,shadowMap:1024,lampLights:2,low:!0,pr:2,birdShadows:!1},low:{tier:`low`,antialias:!1,shadows:!1,shadowMap:512,lampLights:0,low:!0,pr:1.5,birdShadows:!1}};return{...r[n]||r.high,mobile:t}}var $m=class{constructor(){this.q=Qm(),this.version=Km,this.sim=new hf,this.frozen=!1,this.paused=!1,this.stepQueue=0,this.acc=0,this.time=0,this.simdt=Xm.has(`simdt`)?+Xm.get(`simdt`):null,this.frameMs=[],this.frameI=0,this.lastShaderError=null,this.contextLost=!1,this.frameCb=e=>this.frame(e),this.nosave=Zm(`nosave`),this.find=null,this.keys=new Set}async boot(){Xm.has(`seed`)&&yu(+Xm.get(`seed`));let e=document.getElementById(`c`),t=this.renderer=new gu({canvas:e,antialias:this.q.antialias,powerPreference:`high-performance`});t.setPixelRatio(Math.min(devicePixelRatio||1,this.q.pr)),t.setSize(innerWidth,innerHeight,!1),t.toneMapping=4,t.toneMappingExposure=1,t.outputColorSpace=Ve,t.shadowMap.enabled=this.q.shadows,t.shadowMap.type=1,t.debug.onShaderError=(e,t,n,r)=>{this.lastShaderError=(e.getProgramInfoLog(t)||`shader error`).slice(0,300),console.error(`[shader]`,this.lastShaderError)},e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.contextLost=!0,this.onContextLost()}),e.addEventListener(`webglcontextrestored`,()=>location.reload());let n=t.getContext(),r=n.getExtension(`WEBGL_debug_renderer_info`);this.gpu=r?n.getParameter(r.UNMASKED_RENDERER_WEBGL):n.getParameter(n.RENDERER),this.scene=new Rn,this.cam=new Qp(innerWidth/innerHeight),this.world=new Dp(t,this.scene,this.q),this.mats=up(),this.flock=new Yp(this.scene,this.mats,this.q),this.fx=new tm(this.scene),this.monuments=new Vm(this.scene,this.world.propMat),this.audio=new rm,this.portraits=new fm(t,this.q.low),this.warmUp(),this.load(),this.ui=new Tm(this),this.ui.seen={...this.ui.seen,...this.savedUI?.seen||{}},this.ui.introDone=!!this.savedUI?.introDone;let i=this.savedUI||{};this.audio.sfxOn=i.sfxOn??!i.muted,this.audio.musicOn=i.musicOn??!0,i.sfxVol!=null&&(this.audio.sfxVol=i.sfxVol),i.musicVol!=null&&(this.audio.musicVol=i.musicVol),this.ui.renderSound(),this.monuments.sync(this.sim.achievements,!1),Fd(this.sim,!0),this.monuments.sync(this.sim.achievements,!1),this.diag=new Dm(this,Zm(`debug`)),this.bindInput(),addEventListener(`resize`,()=>this.resize());for(let e of[`gesturestart`,`gesturechange`])document.addEventListener(e,e=>e.preventDefault(),{passive:!1});document.addEventListener(`dblclick`,e=>e.preventDefault(),{passive:!1}),this.saveTimer=setInterval(()=>this.save(),6e3),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.save()}),addEventListener(`pagehide`,()=>this.save()),this.last=performance.now(),this.render(0),this.programsAfterBoot=t.info.programs.length,document.getElementById(`loading`).classList.add(`done`),setTimeout(()=>document.getElementById(`loading`).remove(),700),requestAnimationFrame(this.frameCb)}warmUp(){let e={clay:{},metal:{fantasy:`gold`},glow:{glow:`glow`},voidglow:{glow:`glow`,fantasy:`void`},facet:{fantasy:`coalore`},gem:{fantasy:`diamond`}},t=[];Object.values(e).forEach((e,n)=>{let r=Fu(mf(e),null),i=new fp(r,this.mats);i.group.position.set(n*.8-1.6,0,2),this.scene.add(i.group),t.push(i),this.portraits.get(r)}),this.sim.eggs.push({id:-1,x:0,z:2,laidAt:0,hatchAt:1,genome:null},{id:-2,x:.5,z:2,laidAt:0,hatchAt:1,genome:null,golden:!0}),this.sim.bread={x:0,z:2.5,hp:.5,a:0},this.sim.ufo={x:0,z:0,y:4,beam:1},this.sim.rain=1,this.flock.rainAmt=1,this.sim.goddess={x:0,z:-1,y:4,beam:{x:0,z:1}},this.fx.burst(0,.5,2,3);let n=xu();this.sim.spawn({genome:mf({}),name:`warm-up`,adult:!0,quiet:!0,x:0,z:1,dir:0}),Su(n),this.flock.update(this.sim,0,0,null,`pattern:bar`),this.sim.family={},this.sim.lids=1,this.sim.ids=1,this.sim.pigeons.length=0,this.flock.halos[0].visible=!0,this.world.setHour(22,1),this.renderer.compile(this.scene,this.cam.cam),this.renderer.render(this.scene,this.cam.cam),t.forEach(e=>{this.scene.remove(e.group),e.dispose()}),this.sim.eggs.length=0,this.sim.bread=null,this.sim.ufo=null,this.sim.goddess=null,this.sim.rain=0,this.flock.rainAmt=0,this.flock.update(this.sim,0,0),this.fx.parts.length=0,this.fx.update(0)}load(){let e=null;if(!Zm(`fresh`))try{e=JSON.parse(localStorage.getItem(qm)||`null`),e||(e=gf(JSON.parse(localStorage.getItem(Jm)||`null`)),e&&(this.migrated=!0))}catch{e=null}e&&(this.sim.restore(e),this.savedUI=e.ui),Xm.has(`hour`)&&this.sim.setTimeOfDay(+Xm.get(`hour`)),this.sim.initFlock(e),this.sim.events.length=0,this.migrated&&setTimeout(()=>this.ui.toast(`Your prototype flock has moved into the new park.`,`note`),600)}save(){if(!this.nosave&&this.sim.ready)try{localStorage.setItem(qm,JSON.stringify(this.sim.serialize({ui:{seen:this.ui?.seen,introDone:this.ui?.introDone,sfxOn:this.audio?.sfxOn,musicOn:this.audio?.musicOn,sfxVol:this.audio?.sfxVol,musicVol:this.audio?.musicVol},build:Km})))}catch{}}resetAll(){try{localStorage.removeItem(qm)}catch{}let e={speed:this.sim.speed,mut:this.sim.mut,whimsy:this.sim.whimsy,ph:this.sim.phase()},t=this.sim.ids;this.sim.reset(),this.sim.restore(e),this.sim.ids=t,this.cam.follow=null,this.findTrait(null),this.sim.initFlock(null),this.monuments.clear(),this.ui.roostSel=null,this.ui.seen={pedia:0,breeds:0},this.cam.shot(`overview`,{snap:!1}),this.ui.toast(`A fresh delegation of civic pigeons arrives.`,`note`),this.save()}select(e,t){this.sim.selId=e,t||(this.ui.roostSel=null),e==null&&this.cam.follow!=null&&this.cam.shot(`overview`,{snap:!1}),this.ui.refreshT=0}toggleFollow(e){this.cam.follow===e?this.cam.shot(`overview`,{snap:!1}):(this.select(e),this.cam.shot(`follow`,{id:e,snap:!1})),this.ui.refreshT=0}findTrait(e){this.find=e?{key:e,until:performance.now()+th}:null,this.ui.renderFind()}bindInput(){let e=this.renderer.domElement,t=new Map,n=null,r=null,i=null,a=null,o={t:0,id:null},s=new Bo,c=new z,l=new zr(new B(0,1,0),0),u=(e,t)=>(c.set(e/innerWidth*2-1,-(t/innerHeight)*2+1),s.setFromCamera(c,this.cam.cam),s.ray),d=(e,t)=>{let n=new B;return u(e,t).intersectPlane(l,n)?n:null};this.pickAt=(e,t,n=!1)=>{let r=this.flock.pick(u(e,t),this.sim);if(r!=null)return r;let i=null,a=n?34:14;for(let n of this.sim.pigeons){let r=this.flock.view(n.id);if(!r||n.flying)continue;let o=Np(r.vis.x,r.vis.y+.25*r.size(n,this.sim.t),r.vis.z,this.cam.cam);if(o.z>1)continue;let s=Math.hypot(o.x-e,o.y-t);s<a&&(a=s,i=n.id)}return i},e.addEventListener(`pointerdown`,s=>{if(this.audio.unlock(),e.setPointerCapture(s.pointerId),t.set(s.pointerId,{x:s.clientX,y:s.clientY}),t.size===2){r=null,i=null;let[e,o]=[...t.values()];if(a={d:Math.hypot(e.x-o.x,e.y-o.y),cx:(e.x+o.x)/2,cy:(e.y+o.y)/2},n){let e=this.sim.byId(n.id);e&&this.sim.drop(n.id,e.x,e.z),n=null,this.ui.ghost(null),this.ui.setOverRoost(!1)}return}let c=this.pickAt(s.clientX,s.clientY,s.pointerType===`touch`),l=c==null?this.monuments.pick(u(s.clientX,s.clientY)):null;if(l){this.ui.openAchievement(l);return}if(c!=null){let e=performance.now();o.id===c&&e-o.t<350&&this.toggleFollow(c),o={t:e,id:c},r={id:c,x:s.clientX,y:s.clientY},this.select(c);let t=this.sim.byId(c);t&&this.audio.play(`coo`,{voice:t.pheno.e.voice,vol:.8,pitch:this.cooPitch(t)})}else i={x:s.clientX,y:s.clientY,moved:0,btn:s.button}}),e.addEventListener(`pointermove`,e=>{let o=t.get(e.pointerId);if(!o)return;let s=e.clientX-o.x,c=e.clientY-o.y;if(o.x=e.clientX,o.y=e.clientY,a&&t.size===2){let[e,n]=[...t.values()],r=Math.hypot(e.x-n.x,e.y-n.y),i=(e.x+n.x)/2,o=(e.y+n.y)/2,s=d(a.cx,a.cy),c=d(i,o);s&&c&&this.cam.pan(s.x-c.x,s.z-c.z),this.cam.zoomAt(a.d/Math.max(20,r),c),this.cam.snapTarget(),a.d=r,a.cx=i,a.cy=o;return}if(r&&!n&&Math.hypot(e.clientX-r.x,e.clientY-r.y)>8){let e=this.sim.grab(r.id);e&&(n={id:r.id,pheno:e.pheno}),this.cam.follow===r.id&&(this.cam.follow=null)}if(n){let t=d(e.clientX,e.clientY);t&&this.sim.carry(n.id,Math.max(-K.w/2,Math.min(K.w/2,t.x)),Math.max(-K.d/2,Math.min(K.d/2,t.z)));let r=this.ui.roostRect(),i=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top-10&&e.clientY<=r.bottom+10;this.ui.setOverRoost(i),this.ui.ghost(i?n.pheno:null,e.clientX,e.clientY)}else if(i){if(i.moved+=Math.abs(s)+Math.abs(c),i.btn===2||e.shiftKey){let e=this.cam.cur.dist*.0012,t=this.cam.cur.az;this.cam.pan((-s*Math.cos(t)-c*Math.sin(t))*e,(s*Math.sin(t)-c*Math.cos(t))*e)}else this.cam.orbit(s,c)}});let f=e=>{if(t.delete(e.pointerId),t.size<2&&(a=null),n){let e=this.sim;if(this.ui.overRoost){if(e.roostAdd(n.id))this.ui.roostSel=e.roost.length-1,this.select(null,!0);else{let t=e.byId(n.id);t&&e.drop(n.id,t.x,t.z)}}else{let t=e.byId(n.id);t&&e.drop(n.id,t.x,t.z)}this.ui.setOverRoost(!1),this.ui.ghost(null),n=null}else if(i&&i.moved<6&&e.type===`pointerup`){let e=performance.now();e-(this.lastEmptyTap||0)<350&&this.cam.name!==`overview`&&this.cam.shot(`overview`,{snap:!1}),this.lastEmptyTap=e,this.select(null),this.ui.roostSel=null}r=null,i=null};e.addEventListener(`pointerup`,f),e.addEventListener(`pointercancel`,f),e.addEventListener(`contextmenu`,e=>e.preventDefault()),e.addEventListener(`wheel`,e=>{e.preventDefault(),this.cam.zoomAt(Math.exp(e.deltaY*.0012),d(e.clientX,e.clientY))},{passive:!1});let p=``;addEventListener(`keyup`,e=>this.keys.delete(e.code)),addEventListener(`blur`,()=>this.keys.clear()),addEventListener(`keydown`,e=>{if(!e.key||e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;if(ih[e.code]&&!this.ui.dialog&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(this.keys.add(e.code),e.code.startsWith(`Arrow`)&&e.preventDefault()),e.key===`Escape`){this.ui.dialog?this.clipBusy||this.ui.closeDialog():this.find?this.findTrait(null):this.cam.follow==null?this.select(null):this.cam.shot(`overview`,{snap:!1});return}if((e.key===`p`||e.key===` `)&&!e.repeat){e.key===` `&&e.preventDefault(),this.togglePause(),e.key===`p`&&(p=``);return}if(e.key===`?`){this.ui.dialog===`help`?this.ui.closeDialog():this.ui.openDialog(`help`);return}if(e.key.length!==1)return;p=(p+e.key.toLowerCase()).slice(-12);let t=Object.keys(ah).find(e=>p.endsWith(e));t?(p=``,this.enterCode(t)):e.key.toLowerCase()===`f`&&this.sim.selId!=null&&this.toggleFollow(this.sim.selId)})}enterCode(e){let t=ah[String(e||``).toLowerCase().replace(/[^a-z]/g,``)];return t?(t(this.sim),!0):(this.ui.toast(eh([`Nothing happens. A pigeon somewhere laughs at you.`,`The park does not recognise that word.`,`Incorrect. The pigeons judge you silently.`])),!1)}togglePause(e=!this.paused){this.paused=e,this.last=performance.now(),this.acc=0,this.ui?.renderPause()}resize(){this.recording||(this.renderer.setSize(innerWidth,innerHeight,!1),this.cam.fit(innerWidth/innerHeight))}onContextLost(){try{let e=[`high`,`medium`,`low`],t=e.indexOf(this.q.tier);localStorage.setItem(Ym,e[Math.min(2,t+1)])}catch{}let e=document.createElement(`div`);e.className=`ctxlost`,e.innerHTML=`<div class="card"><b>Graphics reset</b><p>Your device’s GPU took a nap. Tap to reload at a lighter quality.</p></div>`,e.onclick=()=>location.reload(),document.body.appendChild(e)}frame(e){if(requestAnimationFrame(this.frameCb),this.contextLost||this.recording)return;let t=Math.max(0,(e-this.last)/1e3);this.frameMs[this.frameI++%240]=e-this.last,this.last=e,this.camDt=Math.min(.1,t)||1/60,this.render(this.simdt??Math.min(.25,t))}render(e){let t=this.sim;if(this.paused&&!this.frozen&&(e=0),!this.frozen&&!this.paused){this.acc+=e;let n=0;for(;this.acc>=.03333333333333333&&n<8;)t.step(),this.acc-=Id,n++;n>=8&&(this.acc=0)}else{for(;this.stepQueue>0;)t.step(),this.stepQueue--;e=0}if(this.audio.setRain(!!t.rain),this.audio.setMood(this.musicMood()),this.audio.setDuck(this.paused?.35:1),this.find&&performance.now()>this.find.until&&this.findTrait(null),this.animate(e,this.cam.cam.position),this.keys.size){let e=0,t=0,n=0;for(let r of this.keys){let[i,a,o]=ih[r];e+=i,t+=a,n+=o}this.cam.keyMove(Math.sign(e),Math.sign(t),Math.sign(n),this.camDt||1/60)}let n=null;if(this.cam.follow!=null){let e=this.flock.view(this.cam.follow),r=t.byId(this.cam.follow);e&&r&&!r.flying?n=e.vis:this.cam.shot(`overview`,{snap:!1})}this.cam.update(this.camDt||1/60,n),this.world.updateOcclusion(this.cam.cam.position,this.cam.cur.target,this.camDt||1/60),this.renderer.render(this.scene,this.cam.cam),this.ui?.frame(e,this.cam.cam),this.diag?.frame()}animate(e,t){let n=this.sim;this.time+=e,this.drainEvents(),this.world.setHour(n.hour(),n.night),this.world.setRain(this.flock.rainAmt||0),this.world.update(e),this.flock.update(n,e,this.time,t,this.recording?null:this.find?.key),this.fx.update(e),this.monuments.update()}musicMood(){return rh[this.sim.happening?.kind]||(this.sim.night>.55?`night`:`day`)}cooPitch(e){return(nh[e.pheno.e.size]||1)/(e.jit||1)**2.5}async photo({id:e,roost:t}){let n=this.sim,r=this.q.mobile?1600:2400;if(this.recording)return null;let i,a,o,s;if(e!=null){let t=n.byId(e),c=this.flock.view(e);if(!t||!c)return null;i=t.pheno,a=t.name,o=t.gen;let l=c.size(t,n.t),u=Zf(t.pheno)*l,d=new B(c.vis.x+Math.cos(t.dir)*.04*l,c.vis.y+u*.52,c.vis.z+Math.sin(t.dir)*.04*l),f=new _o(30,1,.05,400),p=t.dir+.8,m=1.9*Math.max(u,.6*l)+.3;f.position.set(d.x+Math.cos(p)*m,d.y+.12*l+.12,d.z+Math.sin(p)*m),f.lookAt(d),s=this.renderView(f,r,r)}else{let e=n.roost[t];if(!e)return null;i=Fu(e.genome,e.accessory),a=e.name,o=e.gen,s=this.portraits.studio(i,r)}this.audio.play(`shutter`);let c=await oh(s,{name:a,gen:o,pheno:i,studio:e==null}),l=await new Promise(e=>c.toBlob(e,`image/png`));return{blob:l,url:URL.createObjectURL(l),name:a,file:`pigeon-`+a.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-|-$/g,``)+`.png`,w:c.width,h:c.height}}async clip(e,t,n={}){if(this.clipBusy)throw Error(`Already filming.`);this.clipBusy=!0;try{let{recordClip:r}=await Gm(async()=>{let{recordClip:e}=await import(`./clip-DC00rNZo.js`);return{recordClip:e}},[],import.meta.url);return this.audio.play(`shutter`),await r(this,e,{...n,onProgress:t})}finally{this.clipBusy=!1}}renderView(e,t,n){if(this.recording)return null;let r=this.renderer,i=r.getPixelRatio();e.aspect=t/n,e.updateProjectionMatrix(),this.flock.sel.visible=!1;for(let e of this.flock.views.values())e.rig.setLod(0);r.setPixelRatio(1),r.setSize(t,n,!1),r.render(this.scene,e);let a=document.createElement(`canvas`);return a.width=t,a.height=n,a.getContext(`2d`).drawImage(r.domElement,0,0,t,n),r.setPixelRatio(i),r.setSize(innerWidth,innerHeight,!1),this.render(0),a}monumentPicture(e,t=720,n=540){let r=this.monuments.get(e);if(!r)return null;let i=new _o(32,t/n,.05,400),a=new B(-r.x,0,-r.z).normalize(),o=1.6+r.top*1.1;return i.position.set(r.x+a.x*o+a.z*.6,r.top*.75+.5,r.z+a.z*o-a.x*.6),i.lookAt(r.x,r.top*.5,r.z),this.renderView(i,t,n)?.toDataURL(`image/jpeg`,.9)??null}drainEvents(){let e=this.sim;for(let t of e.events)if(t.type===`toast`)this.ui?.toast(t.msg,t.kind);else if(t.type===`sound`){let n=t.id!=null&&e.byId(t.id),r={...t,pitch:n?this.cooPitch(n):1};if(this.clipSfx){this.clipSfx(r,this.clipTime);continue}if(n){let e=this.cam.cam.position.distanceTo({x:n.x,y:.3,z:n.z});r.pan=Np(n.x,.3,n.z,this.cam.cam).ndcX*.8,r.vol=(r.vol??1)*Math.min(1,Math.max(.25,9/e))}this.audio.play(t.name,r)}else t.type===`sparkle`?this.fx.burst(t.x,.45,t.z,t.tier):t.type===`hatch`?this.fx.ring(t.x,t.z,`#e8b64c`):t.type===`roosted`?(this.fx.burst(t.x,.4,t.z,1),this.ui?.renderRoost()):t.type===`deselect`?this.ui&&(this.ui.refreshT=0):t.type===`achievement`&&this.monuments.add(t.id,!0);e.events.length=0}},eh=e=>e[Math.floor(Math.random()*e.length)],th=3e4,nh={king:.78,dinky:1.32,chonk:.84},rh={dance:`dance`,conga:`conga`,ufo:`ufo`,goddess:`goddess`},ih={KeyW:[1,0,0],ArrowUp:[1,0,0],KeyS:[-1,0,0],ArrowDown:[-1,0,0],KeyA:[0,-1,0],ArrowLeft:[0,-1,0],KeyD:[0,1,0],ArrowRight:[0,1,0],KeyQ:[0,0,1],KeyE:[0,0,-1]},ah={rizz:e=>e.summonLegends(),ore:e=>e.summonOres(),bread:e=>Od(e,`bread`),boogie:e=>Od(e,`dance`),pray:e=>Od(e,`goddess`)};async function oh(e,{name:t,gen:n,pheno:r,studio:i}){let a=e.width,o=Math.round(a*.2),s=document.createElement(`canvas`);s.width=a,s.height=a+o;let c=s.getContext(`2d`);try{await Promise.all([document.fonts.load(`${a*.06}px Caprasimo`),document.fonts.load(`600 ${a*.03}px Figtree`)])}catch{}if(i){let e=c.createRadialGradient(a/2,a*.42,a*.05,a/2,a/2,a*.75);e.addColorStop(0,`#f0fae1`),e.addColorStop(1,`#ccdbb2`),c.fillStyle=e,c.fillRect(0,0,a,a),c.fillStyle=`rgba(46,43,37,.16)`,c.beginPath(),c.ellipse(a/2,a*.86,a*.26,a*.045,0,0,Math.PI*2),c.fill()}c.drawImage(e,0,0,a,a),c.fillStyle=`#f5ead8`,c.fillRect(0,a,a,o);let l=a*.05;c.fillStyle=`#201e1d`,c.font=`${a*.058}px Caprasimo, serif`,c.textBaseline=`alphabetic`,c.fillText(t,l,a+o*.38,a-l*2),c.font=`600 ${a*.027}px Figtree, sans-serif`,c.fillStyle=`#474238`,c.fillText(`${r.label} · Generation ${n}`,l,a+o*.6,a-l*2);let u=Zu(r).map(e=>`★ `+e.name).join(`   `),d=r.traits.slice(0,5).map(e=>e.label).join(` · `);return c.fillStyle=u?`#c67139`:`#645c50`,c.font=`700 ${a*.024}px Figtree, sans-serif`,c.fillText(u||d||`A perfectly ordinary pigeon`,l,a+o*.8,a-l*2),c.textAlign=`right`,c.fillStyle=`rgba(32,30,29,.45)`,c.font=`600 ${a*.018}px Figtree, sans-serif`,c.fillText(`Pigeon Park · pigeonpark.live`,a-l,a+o*.93),s}var sh=new $m;window.__game=sh,sh.boot().then(()=>{window.pp=ch(sh),window.ppReady=!0}).catch(e=>{console.error(e),document.getElementById(`loading`).innerHTML=`<div class="card"><b>The pigeons could not commute.</b><p>`+String(e.message||e)+`</p></div>`});function ch(e){let t=e.sim,n=(e,t)=>{if(!e.length)return 0;let n=[...e].sort((e,t)=>e-t);return+n[Math.min(n.length-1,Math.floor(t*n.length))].toFixed(2)},r={build:Km,getState(){let r=e.renderer.info;return{t:+t.t.toFixed(3),wall:+t.wall.toFixed(3),hour:+t.hour().toFixed(2),night:t.night,frozen:e.frozen,seeded:bu(),speed:t.speed,mut:t.mut,whimsy:t.whimsy,paused:e.paused,happening:t.happening?.kind||null,bread:t.bread?+t.bread.hp.toFixed(2):null,cap:t.cap,selId:t.selId,follow:e.cam.follow,cam:e.cam.name,pop:t.alive(),eggs:t.eggs.length,poops:t.poops.length,court:!!t.court,find:e.find?.key||null,findMarks:e.flock.findGems.count,camAz:+e.cam.cur.az.toFixed(3),camTarget:e.cam.cur.target.toArray().map(e=>+e.toFixed(2)),dialog:e.ui.dialog,familySize:Object.keys(t.family).length,roost:t.roost.map(e=>e.name),stats:{...t.stats},breedsFound:Object.keys(t.breeds),breedsTotal:Xu.length,traitsFound:Object.keys(t.discovered).length,traitsTotal:Object.keys(id).length,pigeons:t.pigeons.map(e=>({id:e.id,lid:e.lid,name:e.name,x:+e.x.toFixed(3),y:+e.y.toFixed(3),z:+e.z.toFixed(3),dir:+e.dir.toFixed(2),state:e.state,flying:e.flying,held:e.held,gen:e.gen,label:e.pheno.label,breeds:e.breeds.map(e=>e.id)})),render:{frameMsP50:n(e.frameMs,.5),frameMsP99:n(e.frameMs,.99),drawCalls:r.render.calls,triangles:r.render.triangles,programs:r.programs.length,programsAfterBoot:e.programsAfterBoot,geometries:r.memory.geometries,textures:r.memory.textures,pigeonGeoCache:tp(),gpu:e.gpu,quality:e.q.tier,pixelRatio:e.renderer.getPixelRatio(),contextLost:e.contextLost,lastShaderError:e.lastShaderError}}},freeze(){e.frozen=!0},resume(){e.frozen=!1,e.last=performance.now()},step(t=1){e.stepQueue+=t,e.frozen||=!0,e.render(0)},setTimeOfDay(n){t.setTimeOfDay(n),e.render(0)},setSeed(e){yu(e)},setSpeed(e){t.speed=e},happen(n){let r=Od(t,n);return e.render(0),r},happenings:()=>Object.keys(wd),achievements:()=>({earned:Object.keys(t.achievements),built:[...e.monuments.built.keys()],total:Nd.length}),monumentScreen(t){let n=e.monuments.get(t);if(!n)return null;let r=Np(n.x,n.cy,n.z,e.cam.cam);return{x:r.x,y:r.y}},version:()=>Km,code:t=>e.enterCode(t),trees:()=>e.world.treeOpacity(),pause(t=!0){return e.togglePause(t),e.paused},spawn(e=`founder`,n){let r=n||{};if(e===`legends`)return t.summonLegends();if(e===`ores`)return t.summonOres();let i=Xu.find(t=>t.id===e),a;if(i){let e=rd(i);return t.spawn({...e,name:i.name,adult:!0,x:r.x,z:r.z,dir:r.dir}).id}return a=typeof e==`object`?mf(e):ku(),t.spawn({genome:a,accessory:r.accessory||null,name:sd(),adult:!0,x:r.x,z:r.z,dir:r.dir}).id},clearAll(){t.pigeons.length=0,t.eggs.length=0,t.poops.length=0,t.court=null,t.selId=null,t.events.length=0,e.fx.parts.length=0,e.fx.rings.forEach(e=>{e.userData.t=1}),e.render(0)},teleport(n,r,i){let a=t.byId(n);a&&([a.x,a.z]=t.clampToPark(r,i),a.tx=a.x,a.tz=a.z,a.state=`idle`),e.render(0)},select(t){e.select(t),e.render(0)},cam(t,n){return e.cam.shot(t,n),e.render(0),e.cam.name},screenOf(n){let r=e.flock.view(n),i=t.byId(n);if(!r||!i)return null;let a=r.size(i,t.t),o=Np(r.vis.x+.03*a,r.vis.y+.3*a,r.vis.z,e.cam.cam);return{x:o.x,y:o.y,onScreen:Math.abs(o.ndcX)<1&&Math.abs(o.ndcY)<1&&o.z<1}},screenOfWorld(t,n,r){let i=Np(t,n,r,e.cam.cam);return{x:i.x,y:i.y}},pickAt(t,n){return e.pickAt(t,n)},find(t){return e.findTrait(t),e.render(0),e.flock.findGems.count},family(e){let n=t.byId(e);return n?t.familyTree(n.lid):null},win(){for(let e of Xu)t.breeds[e.id]||={by:`debug`,at:Date.now()};for(let e of Object.keys(id))t.discovered[e]=1},lose(){r.clearAll(),t.roost.length=0},render(){e.render(0)},async photo(t){let n=await e.photo({id:t});return n&&{w:n.w,h:n.h,size:n.blob.size,file:n.file}},async clipSupport(){return(await Gm(async()=>{let{clipSupport:e}=await import(`./clip-DC00rNZo.js`);return{clipSupport:e}},[],import.meta.url)).clipSupport()},async clip(t,n={}){let r=await e.clip(t,null,n),i=n.bytes?await new Promise(e=>{let t=new FileReader;t.onload=()=>e(t.result.split(`,`)[1]),t.readAsDataURL(r.blob)}):null;return{w:r.w,h:r.h,size:r.blob.size,mime:r.mime,file:r.file,codec:r.codec,audioCodec:r.audioCodec,frames:r.frames,peeks:r.peeks,b64:i}},async clipScript(e){let n=t.byId(e);return n&&(await Gm(async()=>{let{clipScript:e}=await import(`./clip-DC00rNZo.js`);return{clipScript:e}},[],import.meta.url)).clipScript(n)},audio:()=>({unlocked:!!e.audio.ac,sfxOn:e.audio.sfxOn,musicOn:e.audio.musicOn,sfxVol:e.audio.sfxVol,musicVol:e.audio.musicVol,mood:e.audio.mood,song:e.audio.music?.songId||null,songTitle:e.audio.songTitle,notes:e.audio.music?.notes||0,musicRunning:!!e.audio.music?.timer,state:e.audio.ac?.state}),audioLevel(){let t=e.audio;if(!t.ac)return null;t.an||(t.an=t.ac.createAnalyser(),t.an.fftSize=2048,t.master.connect(t.an));let n=new Float32Array(t.an.fftSize);t.an.getFloatTimeDomainData(n);let r=0;for(let e of n)r+=e*e;return Math.sqrt(r/n.length)},cooPitches(){return t.pigeons.map(t=>+e.cooPitch(t).toFixed(3))},songs:()=>Object.keys(sm),async songLevel(e,t=8){let{buffer:n,notes:r}=await dm(e,t),i=n.getChannelData(0),a=0,o=0;for(let e of i)a+=e*e,o=Math.max(o,Math.abs(e));return{id:e,title:sm[e].title,rms:+Math.sqrt(a/i.length).toFixed(4),peak:+o.toFixed(3),notes:r}},hideHud(e=!0){document.getElementById(`hud`).style.display=e?`none`:``}};return r}export{cd as a,_o as c,id as i,B as l,Zf as n,Lu as o,zd as r,_d as s,dm as t};