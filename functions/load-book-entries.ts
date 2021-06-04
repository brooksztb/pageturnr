import { Handler } from '@netlify/functions'
const { hasuraRequest } = require('./utils/hasura')

const handler: Handler = async (event) => {
  const data = await hasuraRequest({
    query: `
        query BookEntries {
            book_entries(order_by: { date: desc }) {
                book {
                    id
                    title
                    authors
                }
                date
                id
                minutes
                pages
            }
        }
      `,
    variables: {},
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data.book_entries),
  }
}

export { handler }
