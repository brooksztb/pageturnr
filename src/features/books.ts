import { Ref, ref } from 'vue'
import useApi from './api'
import { Book } from '~/types/index'

export type UsableBooks = Promise<{ books: Ref<Book[] | undefined> }>

export default async function useBooks(): UsableBooks {
  const { response: books, request } = useApi<Book[]>('/api/load-books')

  const loaded = ref(false)

  if (loaded.value === false) {
    await request()
    loaded.value = true
  }

  return { books }
}
