export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null
  let prefersReducedMotion = false

  if (import.meta.client) {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible')
              observer?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      )
    }
  }

  nuxtApp.vueApp.directive('reveal', {
    // Registering this makes the directive resolvable during SSR; the animation itself is client-only.
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement, binding) {
      if (prefersReducedMotion || !observer) return
      el.classList.add('reveal')
      const delay = typeof binding.value === 'number' ? binding.value : 0
      if (delay) el.style.transitionDelay = `${delay}ms`
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
