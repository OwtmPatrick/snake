<script lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { Snake } from '../game/Snake';
import GameOverNotification from './GameOverNotification.vue';
import { Game } from '../game/Game';
import { Direction, GameStatus } from '../types';

export default {
  setup() {
    return { GameStatus };
  },
  components: {
    GameOverNotification
  },

  data() {
    const snake = new Snake(
      [
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },
        { x: 2, y: 5 }
      ],
      Direction.Right
    );

    const game = new Game(snake);

    const { arrowUp, arrowRight, arrowDown, arrowLeft } = useMagicKeys();

    whenever(arrowUp, (v: boolean) => {
      if (v) game.changeSnakeDirection(Direction.Up);
    });

    whenever(arrowRight, (v: boolean) => {
      if (v) game.changeSnakeDirection(Direction.Right);
    });

    whenever(arrowDown, (v: boolean) => {
      if (v) game.changeSnakeDirection(Direction.Down);
    });

    whenever(arrowLeft, (v: boolean) => {
      if (v) game.changeSnakeDirection(Direction.Left);
    });

    return {
      game,
      snake
    };
  },

  methods: {
    changeDirection(direction: Direction): void {
      this.game.changeSnakeDirection(direction);
    },
    startGame(): void {
      this.game.start();
    }
  },

  computed: {
    isChangindDirectionDisabled(): boolean {
      return this.game.status !== GameStatus.Started;
    }
  }
};
</script>

<template>
  <GameOverNotification :status="game.status" />

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

    <p>Use arrows to manage snake</p>
    <div class="btns-wrapper">
      <button disabled class="btn btn_up">→</button>
      <div class="btns-bottom-wrapper">
        <button disabled class="btn btn_left">→</button>
        <button disabled class="btn btn_down">→</button>
        <button disabled class="btn btn_right">→</button>
      </div>
    </div>

    <div><button @click="startGame()">start game</button></div>
  </div>
</template>

<style scoped>
.field {
  width: 200px;
  height: 200px;
  border: 1px dashed green;
}

.game-state {
  margin-bottom: 20px;
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

.btns-bottom-wrapper {
  display: flex;
  gap: 10px;
  margin: 20px;
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
