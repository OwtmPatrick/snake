<script lang="ts">
import { Snake } from '../game/Snake';
import { Direction } from '../types';

export default {
  data() {
    const snake = new Snake([
      { x: 2, y: 2 },
      { x: 2, y: 3 }
    ]);

    return {
      snake
    };
  },

  methods: {
    moveSnake(): void {
      this.snake.move(Direction.Up);
    }
  }
};
</script>

<template>
  <div class="field">
    <ul class="snake">
      <li
        v-for="(dot, index) in snake.dots"
        class="dot"
        :style="{ left: `${dot.x * 20}px`, bottom: `${dot.y * 20}px` }"
      >
        {{ index }}
      </li>
    </ul>

    <button @click="moveSnake">move</button>
  </div>
</template>

<style scoped>
.field {
  width: 200px;
  height: 200px;
  border: 1px dashed green;
}

.snake {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 100%;
  position: relative;
}

.dot {
  width: 20px;
  height: 20px;
  background: green;
  position: absolute;
}
</style>
