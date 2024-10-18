<script lang="ts">
import { Snake } from '../game/Snake';
import { Direction } from '../types';

export default {
  data() {
    const snake = new Snake([
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 }
    ]);

    return {
      snake
    };
  },

  methods: {
    moveSnake(direction: Direction): void {
      this.snake.move(direction);
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
        :style="{
          left: `${dot.x * 20}px`,
          bottom: `${dot.y * 20}px`,
          background: index === 0 ? 'red' : 'green'
        }"
      >
        {{ index }}
      </li>
    </ul>

    <div class="btns-wrapper">
      <button class="btn btn_up" @click="moveSnake(0)">→</button>
      <div class="btns-left-rigt-wrapper">
        <button class="btn btn_left" @click="moveSnake(3)">→</button>
        <button class="btn btn_right" @click="moveSnake(1)">→</button>
      </div>
      <button class="btn btn_down" @click="moveSnake(2)">→</button>
    </div>
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
  box-sizing: border-box;
}

.btns-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.btns-left-rigt-wrapper {
  display: flex;
  gap: 10px;
}

.btn_up {
  transform: rotate(-90deg);
}

.btn_down {
  transform: rotate(90deg);
}

.btn_left {
  transform: rotate(180deg);
}
</style>
