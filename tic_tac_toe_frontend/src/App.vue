<script setup lang="ts">
import GameView from './views/GameView.vue'
</script>

<template>
  <div class="app-shell">
    <GameView />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;

  /* Light gradient background as per Ocean Professional */
  background: linear-gradient(180deg, rgba(37,99,235,0.08) 0%, #f9fafb 60%);
}
</style>
