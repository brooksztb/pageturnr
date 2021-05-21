<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    setup: () => {
      const router = useRouter()

      return { router }
    },
  })
</script>

<template>
  <main class="not-found">
    <div>
      <p>
        <carbon-warning class="icon" />
      </p>
    </div>
    <router-view />
    <div>
      <button class="btn m-3 text-sm mt-8" @click="router.back()">Back</button>
    </div>
  </main>
</template>

<style scoped>
  .not-found {
    padding: 1rem 2.5rem;
    color: var(--white);
    text-align: center;
  }

  .not-found p {
    font-size: 2.25rem;
  }

  .not-found .icon {
    display: inline-block;
  }
</style>
