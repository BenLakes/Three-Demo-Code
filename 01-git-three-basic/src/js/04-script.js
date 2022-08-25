import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
console.log("当前Three的版本", THREE.REVISION)
// 目标 gsap 导入动画库


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

  //渲染场景
renderScene()

// gsap 动画  to 是从头到尾  from 是从尾到头  的过程
let cubePositionXAnimate = gsap.from(cubeMesh.position, {
  // 设置对象属性的值
  y: 5,
  // 执行时间
  duration: 5,
  // 动画类型
  ease: "power1.inOut",
  // 是否重复
  repeat: -1,
  // 两次重复之间的间隔时间
  // repeatDelay
  // true 每次重复播放都会前后交替进行 类似 from 和 to 都执行一遍
  yoyo: true,
  // 延迟动画执行属性
  // delay
  onComplete: () => {
    console.log("动画完成");
  },
  onStart: () => { 
    console.log("动画开始");
  }
})
// 暂停和开启动画
window.addEventListener('dblclick', (e) => { 
  if (cubePositionXAnimate.isActive()) {
    // 暂停动画
    cubePositionXAnimate.pause();
    cubeRotationXAni.pause();
  } else { 
    // 继续动画
    cubePositionXAnimate.resume()
    cubeRotationXAni.resume()
  }
})

//设置旋转
let cubeRotationXAni = gsap.to(cubeMesh.rotation, {
  x: 2 * Math.PI,
  duration: 10,
  yoyo: true,
  repeat: -1,
  ease: 'power1.inOut'
})




function renderScene() { 
  renderer.render(scene, camera);
  orbitControls.update()
  requestAnimationFrame(renderScene)
}







