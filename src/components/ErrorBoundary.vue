<script lang="ts">
export default {
  data() {
    return {
      error: null,
      errorMessage: ''
    };
  },
  errorCaptured(error, _, info) {
    // console.log('error:', (error as any).toString(), vm, info);
    this.error = error as any;
    this.errorMessage = info;

    return false;
  },
  methods: {
    restartGame(): void {
      // TODO: handle restart game
      window.location.reload();
    }
  }
};
</script>

<template>
  <div v-if="error">
    <h3>Game over</h3>
    <button @click="restartGame">Restart</button>
  </div>
  <div v-else><slot></slot></div>
</template>
