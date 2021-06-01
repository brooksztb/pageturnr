<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    props: {
      includeBackButton: Boolean,
    },
    setup: (props) => {
      const router = useRouter()

      return {
        router,
      }
    },
  })
</script>

<template>
  <nav class="top-navigation">
    <button
      v-if="includeBackButton"
      class="[ btn icon-btn icon-only ]"
      @click="router.back()"
    >
      <ion-arrow-back-sharp />
    </button>
    <slot name="left"></slot>
    <slot name="right"></slot>
  </nav>
</template>

<style scoped>
  .top-navigation {
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    background: transparent;
  }

  @media all and (min-width: 800px) {
    .top-navigation {
      display: none;
    }
  }
</style>
