<script lang="ts">
import { PropType } from 'vue';
import { GameStatus } from '../types';

export default {
  setup() {
    return {
      GameStatus
    };
  },
  props: {
    status: { type: Number as PropType<GameStatus> }
  },
  computed: {
    isGameOver() {
      console.log(this);
    }
  },
  methods: {
    restartGame(): void {
      window.location.reload();
    }
  }
};
</script>

<template>
  <h3 v-if="status === GameStatus.Ended">The game is over</h3>
  <div v-if="status === GameStatus.Ended">
    <button @click="restartGame">Restart</button>
  </div>
</template>
