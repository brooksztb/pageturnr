<script lang="ts">
  import { defineComponent, toRefs, reactive } from 'vue'
  import { BookEntry, Book } from '~/types/index'
  export default defineComponent({
    props: {
      addEntryState: Boolean,
    },
    emits: ['setAddEntry', 'toggleAddEntry'],
    setup: (props, { emit }) => {
      const state = reactive({
        availableBooks: [],
      })
      const toggleForm = () => {
        let toggleState = props.addEntryState
        emit('toggleAddEntry', !toggleState)
      }

      const handleFormClose = (newEntry: BookEntry) => {
        emit('setAddEntry', false)
        // if (newBook) {
        //   state.books.push(newBook)
        // }
      }

      const handleAvailableBooks = (books: Book[]) => {
        state.availableBooks = books
      }

      return {
        ...toRefs(state),
        toggleForm,
        handleFormClose,
        handleAvailableBooks,
      }
    },
  })
</script>

<template>
  <Dropdown :active="addEntryState" @close="handleFormClose">
    <AddEntryForm :availableBooks="availableBooks" />
  </Dropdown>
  <Suspense>
    <template #default>
      <BookEntryList @setAvailableBooks="handleAvailableBooks" />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

<style scoped></style>
