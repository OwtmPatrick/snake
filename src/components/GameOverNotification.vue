<script lang="ts">
export default {
  methods: {
    restartGame(): void {
      window.location.reload();
    }
  }
};
</script>

<template>
  <h3 class="title">The game is over</h3>
  <button @click="restartGame">Restart</button>
</template>

<style scoped>
.title {
  margin: 0;
}
</style>
