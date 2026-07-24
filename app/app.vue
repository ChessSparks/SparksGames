<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  titleTemplate: '%s · SparksGames',
  ogSiteName: 'SparksGames',
  ogType: 'website',
  twitterCard: 'summary'
})
</script>
