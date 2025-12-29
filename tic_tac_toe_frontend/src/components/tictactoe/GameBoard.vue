<script setup lang="ts">
/*
PUBLIC_INTERFACE
<GameBoard />
Props:
- board: (Array of 'X' | 'O' | null) current board state
- disabled: boolean indicating whether moves are disabled (e.g., after a win)
Emits:
- play(index: number) when a legal move is attempted on an empty cell
*/

import { computed } from 'vue'

type Mark = 'X' | 'O' | null

const props = withDefaults(
  defineProps<{
    board: Mark[]
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'play', index: number): void
}>()

function handleClick(i: number) {
  if (props.disabled) return
  if (props.board[i] !== null) return
  emit('play', i)
}

const cells = computed(() => props.board)
</script>

<template>
  <div class="board surface-subtle">
    <button
      v-for="(cell, i) in cells"
      :key="i"
      class="cell"
      :class="{
        filled: cell !== null,
        x: cell === 'X',
        o: cell === 'O',
      }"
      type="button"
      @click="handleClick(i)"
      :aria-label="`Cell ${i + 1}: ${cell ?? 'empty'}`"
    >
      <span class="mark">{{ cell }}</span>
    </button>
  </div>
</template>

<style scoped>
.board {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  padding: 10px;
  border-radius: 14px;
  background: linear-gradient(
    180deg,
    rgba(37, 99, 235, 0.06) 0%,
    rgba(17, 24, 39, 0.03) 100%
  );
}

.cell {
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 12px;
  background: #ffffff; /* surface white */
  box-shadow:
    0 4px 8px -4px rgba(17, 24, 39, 0.08),
    inset 0 0 0 1px rgba(17, 24, 39, 0.06);
  color: #111827; /* text */
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.5px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
}

.cell:hover {
  transform: translateY(-1px);
  box-shadow:
    0 10px 18px -12px rgba(17, 24, 39, 0.2),
    inset 0 0 0 1px rgba(37, 99, 235, 0.25);
}

.cell.filled {
  cursor: default;
  transform: none;
  box-shadow:
    0 4px 8px -6px rgba(17, 24, 39, 0.08),
    inset 0 0 0 1px rgba(17, 24, 39, 0.08);
}

.cell.x .mark {
  color: #2563EB; /* primary */
  text-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
}

.cell.o .mark {
  color: #F59E0B; /* secondary/success */
  text-shadow: 0 6px 20px rgba(245, 158, 11, 0.25);
}

.mark {
  transform: translateY(-1px);
}
</style>
