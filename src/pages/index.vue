<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup: () => {
      return {}
    },
  })
</script>

<template>
  <Suspense>
    <template #default>
      <BookEntryList />
    </template>
    <template #fallback>
      <div>Loading Entries...</div>
    </template>
  </Suspense>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped></style>
