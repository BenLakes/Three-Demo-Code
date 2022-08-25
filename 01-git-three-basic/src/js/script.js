import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
import * as dat from 'dat.gui';
console.log("当前Three的版本", THREE.REVISION)
// 目标 使用 dat.GUI 控制属性


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
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(10, 1, 5)
  camera.lookAt(scene.position)
  let cameraHelper = new THREE.CameraHelper(camera)
  scene.add(cameraHelper)
  scene.add(camera)

  // createCube()
  // 创建webGL 渲染器
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 创建轨道控制器
  orbitControls = new OrbitControls(camera, renderer.domElement)
  //设置轨道控制器的阻尼
  orbitControls.enableDamping = true;
  // 添加到body 中
  document.body.appendChild(renderer.domElement)

}
  // 添加物体
  let cubeGeo = new THREE.BoxGeometry(1, 1, 1)
  let cubeMaterial = new THREE.MeshBasicMaterial({ color: "#ff0000" })
  let cubeMesh = new THREE.Mesh(cubeGeo, cubeMaterial)
  
scene.add(cubeMesh)
const params = {
  color: '#ffff00',
  // 执行gsap动画
  fn: () => {
    gsap.to(cubeMesh.position, {x: 5, ease: 'power1.inOut', duration: 5, yoyo: true, repeat: -1})
  }
}

let gui = new dat.GUI();

gui.add(cubeMesh.position, "x").min(0).max(10).step(0.01).name("cubeX").onChange(val => { 
   console.log("值被修改", val)
}).onFinishChange(value => { 
  console.log("完全停止下", value);
})
// 设置颜色
gui.addColor(params, "color").onChange(value => { 
  cubeMesh.material.color.set(value)
})
// 设置几何体 是否可见
gui.add(cubeMesh, "visible").name("是否显示");

let folder = gui.addFolder("设置立方体")
folder.add(cubeMesh.material, 'wireframe');

folder.add(params, "fn").name("立方体运动");



  //渲染场景
renderScene()



window.addEventListener("dblclick", (e) => { 
  const fullScreenElement = document.fullscreenElement;
  // 判断当前是否有 全屏对象
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen();
  } else { 
    // 当有对象存在的时候 退出
    document.exitFullscreen();
  }
})
window.addEventListener("resize", () => { 
  // 设置相机 aspect  和 投影  以及 渲染器的大小
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机矩阵
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})

function renderScene() { 
  renderer.render(scene, camera);
  orbitControls.update()
  requestAnimationFrame(renderScene)
}







