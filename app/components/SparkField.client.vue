<template>
  <canvas ref="canvasEl" class="spark-field" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const canvasEl = ref<HTMLCanvasElement | null>(null)
let renderer: THREE.WebGLRenderer | null = null
let animationId = 0

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 18)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const count = window.innerWidth < 700 ? 160 : 320
  const positions = new Float32Array(count * 3)
  const speeds = new Float32Array(count)
  const drift = new Float32Array(count)
  const colors = new Float32Array(count * 3)

  const warm = new THREE.Color('#ff6a1a')
  const gold = new THREE.Color('#ffb703')

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34
    positions[i * 3 + 1] = (Math.random() - 0.5) * 24
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14

    speeds[i] = 0.4 + Math.random() * 0.9
    drift[i] = Math.random() * Math.PI * 2

    const mixed = warm.clone().lerp(gold, Math.random())
    colors[i * 3] = mixed.r
    colors[i * 3 + 1] = mixed.g
    colors[i * 3 + 2] = mixed.b
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  const mouse = { x: 0, y: 0 }
  const targetRotation = { x: 0, y: 0 }

  function onPointerMove(e: PointerEvent) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  function onResize() {
    if (!renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('resize', onResize)

  const clock = new THREE.Clock()
  const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute

  function animate() {
    animationId = requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()
    const delta = Math.min(clock.getDelta(), 0.05)

    if (!prefersReducedMotion) {
      for (let i = 0; i < count; i++) {
        let y = posAttr.getY(i) + speeds[i] * delta
        const x = posAttr.getX(i) + Math.sin(elapsed * 0.6 + drift[i]) * 0.002
        if (y > 12) y = -12
        posAttr.setY(i, y)
        posAttr.setX(i, x)
      }
      posAttr.needsUpdate = true
      points.rotation.y += delta * 0.02
    }

    targetRotation.x += (mouse.y * 0.12 - targetRotation.x) * 0.03
    targetRotation.y += (mouse.x * 0.16 - targetRotation.y) * 0.03
    camera.position.x = targetRotation.y * 4
    camera.position.y = -targetRotation.x * 3
    camera.lookAt(0, 0, 0)

    renderer!.render(scene, camera)
  }

  animate()

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('resize', onResize)
    geometry.dispose()
    material.dispose()
    renderer?.dispose()
    renderer = null
  })
})
</script>

<style scoped>
.spark-field {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
}
</style>
