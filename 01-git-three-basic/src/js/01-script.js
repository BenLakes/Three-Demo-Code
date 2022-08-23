// 最基础场景  包含最基本的场景内容
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

console.log("当前Three的版本", THREE.REVISION)

let scene = null;
let camera = null;
let renderer = null;
let orbitControls = null;
initScene()
// 初始化 场景
function initScene() {
  // 创建场景
  scene = new THREE.Scene()

  let axes = new THREE.AxesHelper(10)
  scene.add(axes)

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(10, 10, 10)
  camera.lookAt(scene.position)
  let cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)
  scene.add(camera)

  createCube()
  // 创建webGL 渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 创建轨道控制器
  orbitControls = new OrbitControls(camera, renderer.domElement)
  //设置轨道控制器的阻尼
  orbitControls.enableDamping = true;
  // 添加到body 中
  document.body.appendChild(renderer.domElement)
  //渲染场景
  renderScene()
}
function createCube() {
  // 添加物体
  let cubeGeo = new THREE.BoxGeometry(1, 1, 1)
  let cubeMaterial = new THREE.MeshBasicMaterial({ color: "#ff0000" })
  let cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial)
  scene.add(cubeMesh)
}

function renderScene() { 
  renderer.render(scene, camera);
  orbitControls.update()
  requestAnimationFrame(renderScene)
}







