<script setup lang="ts">
import Game from './components/Game.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
</script>

<template>
  <ErrorBoundary>
    <Game />
  </ErrorBoundary>
</template>
