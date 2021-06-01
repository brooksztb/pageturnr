<script lang="ts">
  import { defineComponent, toRefs, reactive, onBeforeMount } from 'vue'
  import { Book } from '~/types/index'

  export default defineComponent({
    props: {
      addBookState: Boolean,
    },
    emits: ['setAddBook', 'toggleAddBook'],
    setup: (props, { emit }) => {
      const state = reactive({
        books: [] as Array<Book>,
      })

      onBeforeMount(async () => {
        const { books } = await fetch('/api/load-books').then((res) =>
          res.json()
        )
        state.books = books
      })

      const toggleForm = () => {
        let toggleState = props.addBookState
        emit('setAddBook', !toggleState)
      }

      const handleFormClose = (newBook: Book) => {
        emit('setAddBook', false)
        if (newBook) {
          state.books.push(newBook)
        }
      }

      return {
        ...toRefs(state),
        toggleForm,
        handleFormClose,
      }
    },
  })
</script>

<template>
  <section>
    Toolbar to add books which will open a full screen modal
    <button @click="toggleForm">Add Book</button>
    <AddBookForm :active="addBookState" @close="handleFormClose" />
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

<route lang="yaml">
meta:
  layout: library
</route>
