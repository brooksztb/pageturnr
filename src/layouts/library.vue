<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    setup: () => {
      const state = reactive({
        addBook: false,
        searchBook: false,
      })

      const setAddBook = (val: boolean) => {
        state.addBook = val
      }

      return {
        ...toRefs(state),
        setAddBook,
      }
    },
  })
</script>
<template>
  <TopNavigation :includeBackButton="false">
    <template v-slot:left>
      <button
        class="[ btn icon-btn icon-only ]"
        @click="searchBook = !searchBook"
        title="Search for Books"
      >
        <carbon-search />
      </button>
    </template>
    <template v-slot:right>
      <button
        class="[ btn icon-btn icon-only ]"
        @click="addBook = !addBook"
        title="Add Book"
      >
        <codicon-add />
      </button>
    </template>
  </TopNavigation>
  <Navigation />
  <main id="main">
    <router-view @set-add-book="setAddBook" :addBookState="addBook" />
  </main>
</template>

<style scoped></style>
