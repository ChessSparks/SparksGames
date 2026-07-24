<template>
  <div>
    <PageLoader />

    <section class="banners">
      <div class="container">
        <BannerCarousel v-reveal />
      </div>
    </section>

    <section class="hero">
      <div class="container hero__inner">
        <span class="pill" v-reveal>New games added regularly</span>
        <h1 class="hero__title" v-reveal="80">
          Free browser games,<br />
          <span class="hero__accent">built to spark</span> a quick break.
        </h1>
        <p class="hero__subtitle" v-reveal="160">
          SparksGames is a small, growing collection of classic arcade games — playable
          instantly in your browser, no installs, no accounts, no nonsense.
        </p>
        <div class="hero__actions" v-reveal="240">
          <a href="#games" class="btn btn-primary">Browse games</a>
          <NuxtLink to="/games" class="btn btn-ghost">See all games</NuxtLink>
        </div>
      </div>
    </section>

    <section id="games" class="games">
      <div class="container">
        <div class="section-heading" v-reveal>
          <h2>The lineup</h2>
          <p>Four classics, reimagined. More sparks coming soon.</p>
        </div>
        <div class="games__grid">
          <GameCard v-for="(game, i) in games" :key="game.slug" :game="game" v-reveal="i * 80" />
        </div>
        <div class="games__more" v-reveal="games.length * 80">
          <NuxtLink to="/games" class="btn btn-ghost">Browse all games &rarr;</NuxtLink>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <div class="container about__inner" v-reveal>
        <h2>Why SparksGames?</h2>
        <p>
          No downloads, no sign-ups, no ads getting in the way of the fun. Just fast,
          lightweight games that run entirely in your browser — built with plain JavaScript
          and a love for the arcade classics that started it all.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { games } from '~/data/games'

useSeoMeta({
  title: 'SparksGames — Free Browser Games',
  description:
    'Play free classic browser games instantly — Snake, Breakout, 2048, and Flappy Bird. No installs, no accounts. Built with JavaScript.',
  ogTitle: 'SparksGames — Free Browser Games',
  ogDescription:
    'Play free classic browser games instantly — Snake, Breakout, 2048, and Flappy Bird. No installs, no accounts.',
  twitterTitle: 'SparksGames — Free Browser Games',
  twitterDescription: 'Play free classic browser games instantly. No installs, no accounts.'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'SparksGames',
        url: 'https://sparksgames.vercel.app',
        description: 'Free classic browser games — Snake, Breakout, 2048, and Flappy Bird.'
      })
    }
  ]
})
</script>

<style scoped>
.hero {
  padding: 56px 0 72px;
}

.hero__inner {
  max-width: 760px;
}

.hero__title {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.1;
  margin: 20px 0 20px;
}

.hero__accent {
  background: linear-gradient(135deg, var(--orange-bright), var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__subtitle {
  font-size: 1.1rem;
  max-width: 560px;
  margin-bottom: 32px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.banners {
  padding: 40px 0 0;
}

@media (max-width: 640px) {
  .banners {
    padding-top: 0;
  }
}

.games {
  padding: 48px 0 88px;
}

.section-heading {
  margin-bottom: 36px;
}

.section-heading h2 {
  font-size: 1.75rem;
  margin-bottom: 8px;
}

.section-heading p {
  margin: 0;
}

.games__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.games__more {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.about {
  padding: 32px 0 96px;
  border-top: 1px solid var(--border);
}

.about__inner {
  max-width: 640px;
}

.about h2 {
  font-size: 1.5rem;
}
</style>
