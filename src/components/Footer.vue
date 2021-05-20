<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'
</script>

<template>
  <nav class="text-xl mt-6">
    <router-link class="icon-btn mx-2" to="/" title="Home">
      <carbon-campsite />
    </router-link>

    <a class="icon-btn mx-2" title="Toggle Dark Mode" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>
  </nav>
</template>
