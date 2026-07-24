<template>
  <section class="browse">
    <div class="container">
      <div class="browse__header" v-reveal>
        <h1>Browse games</h1>
        <p>Search the lineup or filter by genre and availability.</p>
      </div>

      <div class="browse__controls" v-reveal="80">
        <div class="search">
          <svg class="search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
            <path d="M20 20L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            v-model="query"
            type="search"
            placeholder="Search games…"
            class="search__input"
            aria-label="Search games"
          />
        </div>

        <div class="filters">
          <div class="filters__group">
            <span class="filters__label">Genre</span>
            <div class="filters__chips">
              <button
                class="chip"
                :class="{ 'chip--active': activeTag === null }"
                @click="activeTag = null"
              >
                All
              </button>
              <button
                v-for="genre in allGenres"
                :key="genre"
                class="chip"
                :class="{ 'chip--active': activeTag === genre }"
                @click="activeTag = activeTag === genre ? null : genre"
              >
                {{ genre }}
              </button>
            </div>
          </div>

          <div class="filters__group">
            <span class="filters__label">Status</span>
            <div class="filters__chips">
              <button
                v-for="option in statusOptions"
                :key="option.value"
                class="chip"
                :class="{ 'chip--active': activeStatus === option.value }"
                @click="activeStatus = option.value"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p class="browse__count" v-reveal="120">
        {{ filteredGames.length }} game{{ filteredGames.length === 1 ? '' : 's' }} found
      </p>

      <div v-if="filteredGames.length" class="browse__grid">
        <GameCard v-for="(game, i) in filteredGames" :key="game.slug" :game="game" v-reveal="i * 60" />
      </div>
      <div v-else class="browse__empty" v-reveal>
        <p>No games match your search. Try a different keyword or clear the filters.</p>
        <button class="btn btn-ghost" @click="clearFilters">Clear filters</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { games, allGenres } from '~/data/games'

const query = ref('')
const activeTag = ref<string | null>(null)
const activeStatus = ref<'all' | 'live' | 'soon'>('all')

const statusOptions = [
  { value: 'all' as const, label: 'All' },
  { value: 'live' as const, label: 'Playable' },
  { value: 'soon' as const, label: 'Coming soon' }
]

const filteredGames = computed(() => {
  const q = query.value.trim().toLowerCase()
  return games.filter((game) => {
    const matchesQuery =
      !q ||
      game.name.toLowerCase().includes(q) ||
      game.shortDescription.toLowerCase().includes(q) ||
      game.longDescription.toLowerCase().includes(q)
    const matchesTag = !activeTag.value || game.genre === activeTag.value
    const matchesStatus =
      activeStatus.value === 'all' ||
      (activeStatus.value === 'live' && game.status === 'play') ||
      (activeStatus.value === 'soon' && game.status === 'coming-soon')
    return matchesQuery && matchesTag && matchesStatus
  })
})

function clearFilters() {
  query.value = ''
  activeTag.value = null
  activeStatus.value = 'all'
}

useSeoMeta({
  title: 'Browse Games',
  description: 'Search and filter every free browser game on SparksGames by genre and availability.',
  ogTitle: 'Browse Games — SparksGames',
  ogDescription: 'Search and filter every free browser game on SparksGames.'
})
</script>

<style scoped>
.browse {
  padding: 64px 0 96px;
}

.browse__header {
  margin-bottom: 32px;
}

.browse__header h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  margin-bottom: 8px;
}

.browse__header p {
  margin: 0;
}

.browse__controls {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--surface), var(--bg-soft));
  margin-bottom: 24px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search__icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--text-faint);
  pointer-events: none;
}

.search__input {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-soft);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 0.95rem;
}

.search__input:focus {
  outline: none;
  border-color: var(--orange);
}

.search__input::placeholder {
  color: var(--text-faint);
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filters__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filters__label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.chip:hover {
  border-color: var(--orange);
  color: var(--orange-bright);
}

.chip--active {
  background: var(--orange);
  border-color: var(--orange);
  color: #170d05;
}

.chip--active:hover {
  color: #170d05;
}

.browse__count {
  color: var(--text-faint);
  font-size: 0.85rem;
  margin-bottom: 20px;
}

.browse__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.browse__empty {
  text-align: center;
  padding: 48px 24px;
  border: 1px dashed var(--border);
  border-radius: var(--radius);
}

.browse__empty p {
  margin-bottom: 16px;
}
</style>
