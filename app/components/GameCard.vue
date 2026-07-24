<template>
  <NuxtLink
    :to="`/games/${game.slug}`"
    class="card"
    :class="{ 'card--tilting': tilting }"
    :style="{ '--rx': `${rotateX}deg`, '--ry': `${rotateY}deg`, '--mx': `${glareX}%`, '--my': `${glareY}%` }"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <span class="card__glare" aria-hidden="true"></span>
    <div class="card__icon" aria-hidden="true">{{ game.icon }}</div>
    <div class="card__body">
      <h3 class="card__title">{{ game.name }}</h3>
      <p class="card__tagline">{{ game.shortDescription }}</p>
    </div>
    <span class="card__status" :class="{ 'card__status--live': game.status === 'play' }">
      {{ game.status === 'play' ? 'Play now' : 'Coming soon' }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Game } from '~/data/games'

defineProps<{ game: Game }>()

const rotateX = ref(0)
const rotateY = ref(0)
const glareX = ref(50)
const glareY = ref(50)
const tilting = ref(false)

function onPointerMove(e: PointerEvent) {
  if (e.pointerType === 'touch') return
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height

  const maxTilt = 5
  rotateX.value = (0.5 - py) * maxTilt
  rotateY.value = (px - 0.5) * maxTilt
  glareX.value = px * 100
  glareY.value = py * 100
  tilting.value = true
}

function onPointerLeave() {
  tilting.value = false
  rotateX.value = 0
  rotateY.value = 0
  glareX.value = 50
  glareY.value = 50
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border-radius: var(--radius);
  background: linear-gradient(180deg, var(--surface), var(--bg-soft));
  border: 1px solid var(--border);
  overflow: hidden;
  transform-style: preserve-3d;
  transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(0);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s ease, box-shadow 0.2s ease;
}

.card--tilting {
  transition: transform 0.06s linear, border-color 0.2s ease, box-shadow 0.2s ease;
}

.card::before {
  content: '';
  position: absolute;
  inset: -40% -40% auto auto;
  width: 160px;
  height: 160px;
  background: var(--orange);
  filter: blur(60px);
  opacity: 0.25;
  border-radius: 50%;
  pointer-events: none;
}

.card__glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.06), transparent 40%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.card--tilting .card__glare {
  opacity: 1;
}

.card:hover {
  border-color: var(--orange);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.card:hover:not(.card--tilting) {
  transform: perspective(800px) translateY(-4px);
}

.card__icon {
  font-size: 2.5rem;
  line-height: 1;
  transform: translateZ(24px);
}

.card__body {
  transform: translateZ(16px);
}

.card__title {
  margin: 0 0 6px;
  font-size: 1.25rem;
}

.card__tagline {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-dim);
}

.card__status {
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-faint);
  transform: translateZ(16px);
}

.card__status--live {
  color: #170d05;
  background: var(--orange);
  border-color: var(--orange);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
</style>
