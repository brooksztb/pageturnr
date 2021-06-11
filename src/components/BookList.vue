<script lang="ts">
  import { defineComponent } from 'vue'
  import useBooks from '~/features/books'

  export default defineComponent({
    setup: async () => {
      const { books } = await useBooks()

      return {
        books,
      }
    },
  })
</script>

<template>
  <ul class="[ book-collection ] [ max-width-wrapper extra-wide-wrapper ]">
    <li v-for="book in books" :key="book.id">
      <BookCard :book="book" />
    </li>
  </ul>
</template>

<style scoped>
  .book-collection {
    display: grid;
    padding: 0 1rem;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
  }

  @media all and (min-width: 640px) {
    .book-collection {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media all and (min-width: 800px) {
    .book-collection {
      padding: 0 2rem;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media all and (min-width: 1024px) {
    .book-collection {
      padding: 0 4rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
