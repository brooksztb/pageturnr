import { Ref, ref } from 'vue'
import useApi from './api'
import { BookEntry } from '~/types/index'

export type UsableBookEntries = Promise<{
  book_entries: Ref<BookEntry[] | undefined>
}>

export default async function useEntries(): UsableBookEntries {
  const { response: book_entries, request } = useApi<BookEntry[]>(
    '/api/load-book-entries'
  )

  const loaded = ref(false)

  if (loaded.value === false) {
    await request()
    loaded.value = true
  }

  return { book_entries }
}
