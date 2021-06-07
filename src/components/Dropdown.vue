<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      active: Boolean,
    },
    emits: ['close'],
    setup: () => {},
  })
</script>

<template>
  <div class="dropdown" :data-state="active ? 'open' : 'closed'">
    <button type="button" @click="$emit('close')" class="[ btn close ]">
      <ant-design-close-square-outlined class="icon" />
    </button>
    <slot></slot>
  </div>
</template>

<style scoped>
  .dropdown {
    position: fixed;
    top: -200%;
    right: 0;
    left: 0;
    overflow: auto;
    /* background-color: var(--primary); */
    background-color: #111d2a;
    opacity: 0;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0, -100%, 0);
    transition: transform 0.2s, top 0s ease 0.2s, bottom 0s ease 0.2s,
      left 0s ease 0.2s, opacity 0.25s;
  }

  .dropdown[data-state='open'] {
    z-index: 1100;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 1;
    transform: translateZ(0);
    transition: transform 0.25s, top 0s, bottom 0s, left 0s, opacity 0s;
  }

  .btn.close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0;
    background-color: transparent;
    color: var(--white);
    font-size: 1.5rem;
  }

  @media all and (min-width: 800px) {
    .btn.close {
      padding: 0.25rem 1rem;
      font-size: 2rem;
    }
  }
</style>
