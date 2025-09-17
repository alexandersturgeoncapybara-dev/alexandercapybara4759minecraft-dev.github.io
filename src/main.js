// MiniCraft - simple voxel demo using Three.js modules
import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.152.0/examples/jsm/controls/PointerLockControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 8, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.HemisphereLight(0xffffbb, 0x444455, 0.9));
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(20, 40, 10);
scene.add(dir);

// Simple flat world
const BOX = new THREE.BoxGeometry(1,1,1);
const MATERIALS = { grass: new THREE.MeshLambertMaterial({ color:0x6db34b }) };
for(let x=-5;x<=5;x++){
  for(let z=-5;z<=5;z++){
    const m = new THREE.Mesh(BOX, MATERIALS.grass);
    m.position.set(x+0.5,0.5,z+0.5);
    scene.add(m);
  }
}

// Controls
const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', ()=>controls.lock());
const move = {forward:false,back:false,left:false,right:false};
document.addEventListener('keydown',e=>{
  if(e.code==='KeyW') move.forward=true;
  if(e.code==='KeyS') move.back=true;
  if(e.code==='KeyA') move.left=true;
  if(e.code==='KeyD') move.right=true;
});
document.addEventListener('keyup',e=>{
  if(e.code==='KeyW') move.forward=false;
  if(e.code==='KeyS') move.back=false;
  if(e.code==='KeyA') move.left=false;
  if(e.code==='KeyD') move.right=false;
});

// Animate
function animate(){
  requestAnimationFrame(animate);
  if(move.forward) controls.moveForward(0.1);
  if(move.back) controls.moveForward(-0.1);
  if(move.left) controls.moveRight(-0.1);
  if(move.right) controls.moveRight(0.1);
  renderer.render(scene,camera);
}
animate();
