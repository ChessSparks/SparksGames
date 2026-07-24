<template>
  <div class="banner-carousel">
    <div
      class="banner-carousel__frame"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <component
        :is="slide.link ? 'a' : 'div'"
        v-for="(slide, i) in slides"
        :key="slide.alt"
        :href="slide.link ?? undefined"
        :target="slide.link ? '_blank' : undefined"
        :rel="slide.link ? 'noopener' : undefined"
        class="banner-carousel__slide"
        :class="{ 'banner-carousel__slide--active': i === active }"
        @click="onSlideClick"
      >
        <img :src="slide.image" :alt="slide.alt" class="banner-carousel__img" draggable="false" />
      </component>

      <button
        type="button"
        class="banner-carousel__arrow banner-carousel__arrow--prev"
        aria-label="Previous banner"
        @click="goTo(active - 1)"
      >
        &lsaquo;
      </button>
      <button
        type="button"
        class="banner-carousel__arrow banner-carousel__arrow--next"
        aria-label="Next banner"
        @click="goTo(active + 1)"
      >
        &rsaquo;
      </button>
    </div>

    <div class="banner-carousel__dots">
      <button
        v-for="(slide, i) in slides"
        :key="slide.alt"
        type="button"
        class="banner-carousel__dot"
        :class="{ 'banner-carousel__dot--active': i === active }"
        :aria-label="`Go to banner ${i + 1}`"
        @click="goTo(i)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import snakeBanner from '~/assets/css/images/snake-banner.png'
import chessBanner from '~/assets/css/images/chess-banner.png'
import lifeBanner from '~/assets/css/images/life-banner.png'

interface BannerSlide {
  image: string
  alt: string
  // External URL to the game. Null until it's live.
  link: string | null
}

const slides: BannerSlide[] = [
  { image: snakeBanner, alt: 'Snake — classic game, endless fun', link: null },
  { image: chessBanner, alt: 'Chess — think, plan, conquer', link: null },
  { image: lifeBanner, alt: 'Life — one choice, one night, a lifetime', link: 'https://the-life-game-azure.vercel.app/' }
]

const active = ref(0)
const AUTO_DELAY = 4000
const DRAG_THRESHOLD = 40
let intervalId = 0
let dragStartX = 0
let dragging = false
let draggedFar = false

function goTo(index: number) {
  const len = slides.length
  active.value = ((index % len) + len) % len
  restartAutoplay()
}

function startAutoplay() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || slides.length <= 1) return
  intervalId = window.setInterval(() => {
    active.value = (active.value + 1) % slides.length
  }, AUTO_DELAY)
}

function restartAutoplay() {
  clearInterval(intervalId)
  startAutoplay()
}

function onPointerDown(e: PointerEvent) {
  dragStartX = e.clientX
  dragging = true
  draggedFar = false
}

function onPointerMove(e: PointerEvent) {
  if (!dragging) return
  if (Math.abs(e.clientX - dragStartX) > 10) draggedFar = true
}

function onPointerUp(e: PointerEvent) {
  if (!dragging) return
  dragging = false
  const delta = e.clientX - dragStartX
  if (delta > DRAG_THRESHOLD) goTo(active.value - 1)
  else if (delta < -DRAG_THRESHOLD) goTo(active.value + 1)
}

function onSlideClick(e: MouseEvent) {
  if (draggedFar) e.preventDefault()
}

onMounted(startAutoplay)
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<style scoped>
.banner-carousel {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
}

.banner-carousel__frame {
  position: relative;
  aspect-ratio: 21 / 9;
  touch-action: pan-y;
  cursor: grab;
}

.banner-carousel__frame:active {
  cursor: grabbing;
}

.banner-carousel__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.6s ease;
}

.banner-carousel__slide--active {
  opacity: 1;
  z-index: 1;
}

.banner-carousel__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.banner-carousel__arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(13, 9, 6, 0.55);
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.2s ease;
}

.banner-carousel__arrow--prev {
  left: 16px;
}

.banner-carousel__arrow--next {
  right: 16px;
}

.banner-carousel__arrow:hover {
  background: var(--orange);
  border-color: var(--orange);
  color: #170d05;
}

@media (hover: hover) {
  .banner-carousel__arrow {
    opacity: 0;
  }

  .banner-carousel__frame:hover .banner-carousel__arrow {
    opacity: 1;
  }
}

.banner-carousel__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
}

.banner-carousel__dot {
  width: 6px;
  height: 6px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: var(--border);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.banner-carousel__dot--active {
  background: var(--orange-bright);
  transform: scale(1.3);
}

@media (max-width: 640px) {
  .banner-carousel {
    margin-inline: -24px;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
