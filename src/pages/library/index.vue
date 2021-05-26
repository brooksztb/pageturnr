<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup: () => {
      let books = ref([
        {
          isbns: ['1111319361371638153'],
          title: 'Test',
          authors: ['A Person'],
        },
      ])
      let addBookOpen = ref(false)
      return {
        books,
        addBookOpen,
      }
    },
  })
</script>

<template>
  <section>
    Toolbar to add books which will open a full screen modal
    <button @click="addBookOpen = !addBookOpen">Add Book</button>
    <AddBookForm :active="addBookOpen" @close="addBookOpen = false" />
  </section>
  <section class="[ book-collection ] [ max-width-wrapper ]">
    <BookCard v-for="book in books" :key="book.title" :book="book" />
  </section>
</template>

<style scoped>
  .book-collection {
    display: grid;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
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

  @media all and (min-width: 1024px) {
    .book-collection {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media all and (min-width: 1280px) {
    .book-collection {
      max-width: 1600px;
    }
  }
</style>
