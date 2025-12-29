<script setup lang="ts">
/*
PUBLIC_INTERFACE
This GameView composes the Tic Tac Toe UI: StatusBar, GameBoard, and Reset button.
- Two local players alternate placing 'X' and 'O'.
- Win/draw detection handled in GameBoard and surfaced via emits/state here.
- No backend calls; purely client-side state.
How to play: Click any empty cell to place your mark. Players alternate turns. Use "Reset Game" to start over.
*/

import { ref, computed } from 'vue'
import StatusBar from '@/components/tictactoe/StatusBar.vue'
import GameBoard from '@/components/tictactoe/GameBoard.vue'

type Mark = 'X' | 'O' | null
const board = ref<Mark[]>(Array(9).fill(null))
const currentPlayer = ref<'X' | 'O'>('X')
const winner = ref<'X' | 'O' | 'Draw' | null>(null)

// Detect if game is in progress (any move placed)
const hasMoves = computed(() => board.value.some((c) => c !== null))

function handleCellPlay(index: number) {
  if (winner.value) return
  if (board.value[index] !== null) return
  board.value[index] = currentPlayer.value
  // Evaluate win/draw after the move
  const result = evaluateBoard(board.value)
  if (result) {
    winner.value = result
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
  }
}

// PUBLIC_INTERFACE
function resetGame(): void {
  /** Reset the board and state to a new game. */
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
}

// PUBLIC_INTERFACE
function evaluateBoard(b: Mark[]): 'X' | 'O' | 'Draw' | null {
  /**
   * Check the board for a win or draw.
   * Returns 'X', 'O', 'Draw', or null if the game should continue.
   */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const [a, c, d] of lines) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) {
      return b[a] as 'X' | 'O'
    }
  }
  return b.every((x) => x !== null) ? 'Draw' : null
}

const statusText = computed(() => {
  if (winner.value === 'Draw') return 'It’s a draw!'
  if (winner.value) return `Player ${winner.value} wins!`
  return `Player ${currentPlayer.value}’s turn`
})
</script>

<template>
  <main class="game-container">
    <section class="panel surface shadow">
      <h1 class="title">Tic Tac Toe</h1>
      <StatusBar :status="statusText" :winner="winner" />
      <GameBoard :board="board" :disabled="!!winner" @play="handleCellPlay" />
      <div class="controls">
        <button class="btn reset" @click="resetGame" :disabled="!hasMoves">Reset Game</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.game-container {
  width: 100%;
  padding: 2rem 1rem;
}

.panel {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 16px;
  padding: 1.25rem 1.25rem 1.5rem;
  background: #ffffff; /* surface */
  backdrop-filter: blur(2px);
  transition: box-shadow 200ms ease, transform 200ms ease;
}

.panel:hover {
  transform: translateY(-1px);
}

.shadow {
  box-shadow:
    0 10px 15px -3px rgba(17, 24, 39, 0.08),
    0 4px 6px -4px rgba(17, 24, 39, 0.06);
}

.title {
  text-align: center;
  color: #111827; /* text */
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-bottom: 0.25rem;
}

.controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.btn {
  appearance: none;
  border: none;
  border-radius: 12px;
  padding: 0.625rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease, color 150ms ease;
}

.reset {
  background: #2563EB; /* primary */
  color: #ffffff;
  box-shadow: 0 6px 14px -6px rgba(37, 99, 235, 0.5);
}

.reset:disabled {
  background: #93c5fd;
  cursor: not-allowed;
  box-shadow: none;
}

.reset:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px -8px rgba(37, 99, 235, 0.6);
}

@media (min-width: 640px) {
  .panel {
    padding: 1.5rem 1.5rem 1.75rem;
  }
}
</style>
