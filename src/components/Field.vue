<script setup lang="ts">
import { Snake } from '../game/Snake';
import { Direction } from '../types';

const snake = new Snake([
  { x: 1, y: 2 },
  { x: 1, y: 3 }
]);

console.log(snake);
</script>

<template>
  <div class="field">
    <ul class="snake">
      <li
        v-for="dot in snake.dots"
        class="dot"
        :style="{ left: `${dot.x * 20}px`, bottom: `${dot.y * 20}px` }"
      >
        {{ dot.x }}
      </li>
    </ul>

    <button @click="snake.move(Direction.Down)">move</button>
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
