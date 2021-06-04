<script lang="ts">
  import { defineComponent } from 'vue'
  import useEntries from '~/features/entries'

  export default defineComponent({
    setup: async () => {
      const { book_entries } = await useEntries()

      return {
        book_entries,
      }
    },
  })
</script>

<template>
  <ul class="[ log-entries ] [ max-width-wrapper extra-wide-wrapper ]">
    <li v-for="entry in book_entries" :key="entry.id">
      <BookEntry :entry="entry" />
    </li>
  </ul>
</template>

<style scoped>
  .log-entries {
    display: grid;
    padding: 0 1rem;
    grid-column-gap: 1rem;
    grid-row-gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  @media all and (min-width: 640px) {
    .log-entries {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media all and (min-width: 800px) {
    .log-entries {
      padding: 0 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media all and (min-width: 1024px) {
    .log-entries {
      padding: 0 4rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
