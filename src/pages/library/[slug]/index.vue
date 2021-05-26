<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    props: {
      slug: String,
    },
    setup: (props) => {
      const router = useRouter()

      return {
        router,
      }
    },
  })
</script>

<template></template>

<route lang="yaml">
meta:
  layout: nested
</route>
