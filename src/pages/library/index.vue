<script lang="ts">
  import { defineComponent } from 'vue'
  import { Book } from '~/types/index'

  export default defineComponent({
    props: {
      addBookState: Boolean,
    },
    emits: ['setAddBook', 'toggleAddBook'],
    setup: (props, { emit }) => {
      const toggleForm = () => {
        let toggleState = props.addBookState
        emit('setAddBook', !toggleState)
      }

      const handleFormClose = (newBook: Book) => {
        emit('setAddBook', false)
        // if (newBook) {
        //   state.books.push(newBook)
        // }
      }

      return {
        // ...toRefs(state),
        toggleForm,
        handleFormClose,
      }
    },
  })
</script>

<template>
  <AddBookForm :active="addBookState" @close="handleFormClose" />
  <Suspense>
    <template #default>
      <BookList />
    </template>
    <template #fallback>
      <div>Loading Books...</div>
    </template>
  </Suspense>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: library
</route>
