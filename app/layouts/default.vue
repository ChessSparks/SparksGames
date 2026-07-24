<template>
  <div class="spark-bg site">
    <SparkField />
    <header class="site-header">
      <div class="container site-header__inner">
        <NuxtLink to="/" class="logo">
          <span class="logo__text">Sparks<span class="logo__accent">Games</span></span>
        </NuxtLink>
        <nav class="site-nav">
          <NuxtLink to="/games">Games</NuxtLink>
          <NuxtLink to="/#about">About</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container site-footer__inner">
        <p class="site-footer__text">SparksGames — small browser games, built for fun.</p>
        <p class="site-footer__meta">&copy; {{ year }} SparksGames. All games are original builds.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: rgba(13, 9, 6, 0.7);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--text);
}

.logo__accent {
  color: var(--orange-bright);
}

.site-nav {
  display: flex;
  gap: 28px;
  font-weight: 600;
  font-size: 0.95rem;
}

.site-nav a {
  color: var(--text-dim);
  transition: color 0.15s ease;
}

.site-nav a:hover {
  color: var(--orange-bright);
}

.site-main {
  flex: 1;
}

.site-footer {
  border-top: 1px solid var(--border);
  padding: 32px 0;
  margin-top: 64px;
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.site-footer__text {
  margin: 0;
  color: var(--text-dim);
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.site-footer__meta {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.85rem;
}
</style>
