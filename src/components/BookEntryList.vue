<script lang="ts">
  import { defineComponent, computed, Ref } from 'vue'
  import { GroupedEntriesByMonth, Book, BookEntry } from '~/types/index'
  import useEntries from '~/features/entries'
  import { groupBy } from '~/utils/array'
  import { parseISO, format } from 'date-fns'

  export default defineComponent({
    emits: ['setAvailableBooks'],
    setup: async (props, { emit }) => {
      const availableBooks = (book_entries: Ref<BookEntry[] | undefined>) => {
        let availableBooks: Book[] = []
        if (book_entries) {
          availableBooks = Object.entries(
            groupBy(book_entries.value, (obj) => obj.book.title)
          ).map(
            ([title, entries]) =>
              ({
                id: entries[0].book.id,
                title: title,
                authors: entries[0].book.authors,
                status: entries[0].book.status,
              } as Book)
          )
        }

        return availableBooks
      }
      const { book_entries } = await useEntries().then((res) => {
        if (res.book_entries) {
          let books = availableBooks(res.book_entries)
          emit('setAvailableBooks', books)
        }
        return res
      })

      const groupedEntries = computed(() => {
        let entries: GroupedEntriesByMonth[] = []
        if (book_entries) {
          entries = Object.entries(
            groupBy(book_entries.value, (obj) =>
              format(parseISO(obj.date), 'MMMM yyyy')
            )
          ).map(
            ([title, entries]) => ({ title, entries } as GroupedEntriesByMonth)
          )
        }
        return entries
      })

      return {
        book_entries,
        groupedEntries,
      }
    },
  })
</script>

<template>
  <div
    class="[ grouped-entries ] [ max-width-wrapper extra-wide-wrapper ]"
    v-for="(group, index) in groupedEntries"
    :key="index"
  >
    <h2 class="group-title">{{ group.title }}</h2>
    <ul class="[ log-entries ]">
      <li v-for="entry in group.entries" :key="entry.id">
        <BookEntry :entry="entry" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .grouped-entries {
    padding: 0 1rem;
    margin-bottom: 1rem;
  }

  .log-entries {
    display: grid;
    padding: 1rem 0;
    grid-column-gap: 1rem;
    grid-row-gap: 0.75rem;
    grid-template-columns: 1fr;
  }

  .group-title {
    color: var(--white);
  }

  @media all and (min-width: 640px) {
    .log-entries {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media all and (min-width: 800px) {
    .grouped-entries {
      padding: 0 2rem;
      margin-bottom: 1.5rem;
    }

    .log-entries {
      padding: 1.5rem 0;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media all and (min-width: 1024px) {
    .grouped-entries {
      padding: 0 4rem;
    }

    .log-entries {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
