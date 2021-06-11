<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'

  export default defineComponent({
    setup: () => {
      const state = reactive({
        addEntry: false,
      })

      const setAddEntry = (val: boolean) => {
        state.addEntry = val
      }

      return {
        ...toRefs(state),
        setAddEntry,
      }
    },
  })
</script>

<template>
  <Navigation />
  <main id="main">
    <TopNavigation :includeBackButton="false">
      <template v-slot:right>
        <button
          class="[ btn icon-btn icon-only ]"
          @click="addEntry = !addEntry"
          title="Add Entry"
        >
          <codicon-add />
        </button>
      </template>
    </TopNavigation>
    <router-view @set-add-entry="setAddEntry" :addEntryState="addEntry" />
  </main>
</template>

<style scoped></style>
