<script lang="ts">
  import { defineComponent } from 'vue'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    props: {
      slug: {
        type: String,
        required: true,
      },
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
