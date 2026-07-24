<template>
  <section class="game-page">
    <div class="container game-page__inner">
      <NuxtLink to="/games" class="back-link">&larr; Back to all games</NuxtLink>

      <div class="game-hero" v-reveal>
        <div class="game-hero__icon" aria-hidden="true">{{ game.icon }}</div>
        <h1>{{ game.name }}</h1>
        <p class="game-hero__tagline">{{ game.shortDescription }}</p>
        <span class="game-hero__genre">{{ game.genre }}</span>
      </div>

      <div v-if="game.gameplay.length" class="gameplay" v-reveal="80">
        <div class="gameplay__frame">
          <img
            v-for="(shot, i) in game.gameplay"
            :key="shot"
            :src="shot"
            :alt="`${game.name} gameplay ${i + 1}`"
            class="gameplay__img"
            :class="{ 'gameplay__img--active': i === activeShot }"
          />
        </div>
        <div v-if="game.gameplay.length > 1" class="gameplay__dots" aria-hidden="true">
          <span
            v-for="(_, i) in game.gameplay"
            :key="i"
            class="gameplay__dot"
            :class="{ 'gameplay__dot--active': i === activeShot }"
          ></span>
        </div>
      </div>

      <p class="game-description" v-reveal="120">{{ game.longDescription }}</p>

      <div v-if="game.status === 'play' && game.link" class="play-frame" v-reveal="160">
        <a :href="game.link" class="btn btn-primary" target="_blank" rel="noopener">
          Play {{ game.name }} &rarr;
        </a>
      </div>
      <div v-else class="coming-soon" v-reveal="160">
        <p class="coming-soon__label">Coming soon</p>
        <p class="coming-soon__text">
          {{ game.name }} is being built right now. Check back shortly — this page will link
          out to the fully playable version once it's live.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getGame } from '~/data/games'

const route = useRoute()
const slug = route.params.slug as string
const game = getGame(slug)

if (!game) {
  throw createError({ statusCode: 404, statusMessage: 'Game not found' })
}

const activeShot = ref(0)
let carouselId = 0

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || game.gameplay.length <= 1) return
  carouselId = window.setInterval(() => {
    activeShot.value = (activeShot.value + 1) % game.gameplay.length
  }, 3500)
})

onBeforeUnmount(() => {
  clearInterval(carouselId)
})

useSeoMeta({
  title: `${game.name} — Play Free Online`,
  description: `${game.longDescription} Play ${game.name} free in your browser on SparksGames.`,
  ogTitle: `${game.name} — SparksGames`,
  ogDescription: game.longDescription,
  twitterTitle: `${game.name} — SparksGames`,
  twitterDescription: game.longDescription
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: game.name,
        description: game.longDescription,
        genre: game.genre,
        applicationCategory: 'Game',
        operatingSystem: 'Any (Web Browser)'
      })
    }
  ]
})
</script>

<style scoped>
.game-page {
  padding: 56px 0 96px;
}

.game-page__inner {
  max-width: 720px;
}

.back-link {
  display: inline-block;
  margin-bottom: 32px;
  color: var(--text-dim);
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--orange-bright);
}

.game-hero {
  text-align: center;
  padding: 40px 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--surface), var(--bg-soft));
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}

.game-hero::before {
  content: '';
  position: absolute;
  inset: -30% 30% auto 30%;
  height: 200px;
  background: var(--orange);
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.game-hero__icon {
  font-size: 4rem;
  margin-bottom: 12px;
}

.game-hero h1 {
  font-size: 2.25rem;
  margin-bottom: 8px;
}

.game-hero__tagline {
  margin: 0 0 12px;
  color: var(--text-dim);
}

.game-hero__genre {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-faint);
  position: relative;
}

.gameplay {
  margin-bottom: 32px;
}

.gameplay__frame {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}

.gameplay__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.gameplay__img--active {
  opacity: 1;
}

.gameplay__dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.gameplay__dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--border);
  transition: background 0.2s ease, transform 0.2s ease;
}

.gameplay__dot--active {
  background: var(--orange-bright);
  transform: scale(1.3);
}

.game-description {
  font-size: 1.05rem;
  margin-bottom: 32px;
}

.play-frame {
  text-align: center;
}

.coming-soon {
  border: 1px dashed var(--border);
  border-radius: var(--radius);
  padding: 40px 24px;
  text-align: center;
  background: rgba(255, 106, 26, 0.04);
}

.coming-soon__label {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--orange-bright);
  font-size: 0.85rem;
  margin-bottom: 12px;
}

.coming-soon__text {
  margin: 0;
  color: var(--text-dim);
}
</style>
