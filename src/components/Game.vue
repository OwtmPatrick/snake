<script lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core';
import { Snake } from '../game/Snake';
import GameOverNotification from './GameOverNotification.vue';
import { Game } from '../game/Game';
import { Direction, GameStatus } from '../types';

const initialSnake = [
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 2, y: 5 }
];

export default {
  setup() {
    return { GameStatus };
  },
  components: {
    GameOverNotification
  },

  data() {
    const snake = new Snake(initialSnake, Direction.Right);

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
  <h1 class="title">Use arrows to manage snake</h1>

  <div v-if="game.status === GameStatus.Ended" class="field field_game-over">
    <GameOverNotification :status="game.status" />
  </div>

  <div v-if="game.status !== GameStatus.Ended" class="field">
    <ul class="snake">
      <li
        v-for="(dot, index) in snake.dots"
        class="dot"
        :style="{
          left: `${dot.x * 20}px`,
          bottom: `${dot.y * 20}px`,
          background: index === 0 ? 'red' : 'green'
        }"
      ></li>
      <li
        class="dot dot_free"
        :style="{
          left: `${snake.food.x * 20}px`,
          bottom: `${snake.food.y * 20}px`
        }"
      ></li>
    </ul>

    <button @click="startGame()">start game</button>
  </div>
</template>

<style scoped>
.title {
  font-size: 24px;
  margin-bottom: 30px;
}

.field {
  width: 200px;
  height: 200px;
  border: 1px dashed green;
}

.field_game-over {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.game-state {
  margin-bottom: 20px;
}

.snake {
  margin: 0;
  margin-bottom: 20px;
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
  border: 1px solid;
}

.dot_free {
  background: aqua;
}
</style>
