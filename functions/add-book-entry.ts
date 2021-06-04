import { Handler } from '@netlify/functions'
const { hasuraRequest } = require('./utils/hasura')

const handler: Handler = async (event) => {
  const { entry } = JSON.parse(event.body || '')

  const data = await hasuraRequest({
    query: `
        mutation AddBookEntry($entry: book_entries_insert_input = {}) {
          addedBookEntry: insert_book_entries_one(object: $entry) {
            id
            book_id
            date
            minutes
            pages
          }
        }
      `,
    variables: {
      entry,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data.addedBookEntry),
  }
}

export { handler }
