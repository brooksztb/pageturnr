<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup: () => {
      let books = ref([
        {
          isbn: '1111319361371638153',
          title: 'Test',
          author: 'A Person',
        },
      ])
      return {
        books,
      }
    },
  })
</script>

<template>
  <section class="book-collection">
    <BookCard v-for="book in books" :key="book.isbn" :book="book" />
  </section>
</template>

<style scoped>
  .book-collection {
    display: grid;
    width: 100%;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
  }

  @media all and (min-width: 640px) {
    .book-collection {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media all and (min-width: 800px) {
    .book-collection {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
