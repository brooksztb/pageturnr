<script lang="ts">
  import { defineComponent } from 'vue'
  import { isDark, toggleDark } from '~/logic'

  export default defineComponent({
    setup: () => {
      return { isDark, toggleDark }
    },
  })
</script>
<template>
  <button
    type="button"
    class="icon-btn"
    title="Toggle Dark Mode"
    @click="toggleDark"
  >
    <carbon-moon v-if="isDark" />
    <carbon-sun v-else />
  </button>
</template>
