<template>
  <div class="spark-bg error-page">
    <div class="container error-page__inner">
      <p class="error-page__code">{{ error?.statusCode ?? 404 }}</p>
      <h1>Lost in the arcade</h1>
      <p class="error-page__text">
        {{ error?.statusMessage || "That page doesn't exist." }}
      </p>
      <NuxtLink to="/" class="btn btn-primary" @click="handleError">Back to SparksGames</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode?: number; statusMessage?: string } }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.error-page__inner {
  text-align: center;
}

.error-page__code {
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 800;
  color: var(--orange-bright);
  margin: 0;
}

.error-page__text {
  margin-bottom: 24px;
}
</style>
