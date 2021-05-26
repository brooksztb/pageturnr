<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup: () => {
      const router = useRouter()

      return {
        router,
      }
    },
  })
</script>

<template>
  <nav class="top-navigation">
    <button class="[ back-btn btn icon-btn ]" @click="router.back()">
      <ion-arrow-back-sharp />
    </button>
  </nav>
</template>

<style scoped>
  .top-navigation {
    height: 2.5rem;
    padding: 0.5rem 0;
    background: transparent;
  }

  .back-btn {
    background: transparent;
    color: var(--white);
    font-size: 1.25rem;
  }

  @media all and (min-width: 800px) {
    .top-navigation {
      display: none;
    }
  }
</style>
