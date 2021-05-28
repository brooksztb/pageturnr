import { Handler } from '@netlify/functions'
import { serializeStringArray } from '~/utils/postgres'
const { hasuraRequest } = require('./utils/hasura')

const handler: Handler = async (event) => {
  const { book } = JSON.parse(event.body || '')

  // convert the string arrays to postgres array literals to insert to DB
  book.authors = serializeStringArray(book.authors)
  book.isbns = serializeStringArray(book.isbns)

  const data = await hasuraRequest({
    query: `
        mutation AddBook($book: books_insert_input = {}) {
            addedBook: insert_books_one(object: $book) {
                id
                title
                authors
                isbns
                page_count
                thumbnail
            }
        }
      `,
    variables: {
      book,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

export { handler }
