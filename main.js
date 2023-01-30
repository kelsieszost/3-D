import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//Scene
const scene = new THREE.Scene();

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#D81DE3',
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100)
camera.position.z = 15
scene.add(camera)



const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 10, 10)
scene.add(light)

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //udpdate camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  // mesh.rotation.x += 0.1
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop()
