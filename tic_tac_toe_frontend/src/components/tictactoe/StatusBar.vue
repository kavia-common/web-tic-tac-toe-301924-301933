<script setup lang="ts">
/*
PUBLIC_INTERFACE
<StatusBar />
Props:
- status: string full status text to display (e.g., "Player X's turn", "Player O wins!", "It's a draw!")
- winner: 'X' | 'O' | 'Draw' | null for styling emphasis
*/

const props = defineProps<{
  status: string
  winner: 'X' | 'O' | 'Draw' | null
}>()
</script>

<template>
  <div
    class="status surface-subtle"
    :class="{
      x: props.winner === 'X',
      o: props.winner === 'O',
      draw: props.winner === 'Draw',
    }"
    role="status"
    aria-live="polite"
  >
    <span class="dot" />
    <span class="text">{{ props.status }}</span>
  </div>
</template>

<style scoped>
.status {
  margin: 0.5rem 0 0.25rem;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 0.75rem 0.875rem;
  border-radius: 12px;
  background: #f9fafb; /* background */
  color: #111827; /* text */
  border: 1px solid rgba(17, 24, 39, 0.06);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #2563EB; /* primary */
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.x .dot {
  background: #2563EB;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

.o .dot {
  background: #F59E0B;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.18);
}

.draw .dot {
  background: #6b7280; /* neutral */
  box-shadow: 0 0 0 3px rgba(107, 114, 128, 0.18);
}

.text {
  font-weight: 600;
}
</style>
