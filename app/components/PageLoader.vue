<template>
  <Transition name="page-loader-fade">
    <div v-if="loading" class="page-loader" role="status" aria-live="polite" aria-label="Loading">
      <div class="page-loader__inner">
        <span class="page-loader__mark">Sparks<span class="page-loader__accent">Games</span></span>
        <div class="page-loader__bar">
          <span class="page-loader__bar-fill"></span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const loading = ref(true)
const MIN_VISIBLE_MS = 500

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const minDelay = new Promise<void>((resolve) => setTimeout(resolve, prefersReducedMotion ? 0 : MIN_VISIBLE_MS))
  const pageReady =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))

  Promise.all([minDelay, pageReady]).then(() => {
    loading.value = false
  })
})

watch(loading, (isLoading) => {
  document.body.style.overflow = isLoading ? 'hidden' : ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}

.page-loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.page-loader__mark {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--text);
  animation: page-loader-pulse 1.4s ease-in-out infinite;
}

.page-loader__accent {
  color: var(--orange-bright);
}

.page-loader__bar {
  width: 160px;
  height: 3px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
}

.page-loader__bar-fill {
  display: block;
  height: 100%;
  width: 40%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--orange-bright), var(--gold));
  animation: page-loader-slide 1.1s ease-in-out infinite;
}

.page-loader-fade-enter-active,
.page-loader-fade-leave-active {
  transition: opacity 0.4s ease;
}

.page-loader-fade-enter-from,
.page-loader-fade-leave-to {
  opacity: 0;
}

@keyframes page-loader-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}

@keyframes page-loader-slide {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(160%); }
  100% { transform: translateX(160%); }
}

@media (prefers-reduced-motion: reduce) {
  .page-loader__mark {
    animation: none;
  }

  .page-loader__bar-fill {
    animation: none;
    width: 100%;
  }
}
</style>
