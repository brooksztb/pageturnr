<script lang="ts">
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'

  export default defineComponent({
    setup: () => {
      // https://github.com/vueuse/head
      // you can use this to manipulate the document head in any components,
      // they will be rendered correctly in the html results with vite-ssg
      useHead({
        title: 'Pageturnr: Track your Reading Habits',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Pageturnr is an app that lets you log your reading sessions and track your reading speed over time.',
          },
        ],
      })

      return {
        useHead,
      }
    },
  })
</script>

<template>
  <router-view />
</template>
