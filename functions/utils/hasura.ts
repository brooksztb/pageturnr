import { HasuraQuery } from '~/types/index'
const nodeFetch = require('node-fetch')

const hasuraRequest = async function ({ query, variables = {} }: HasuraQuery) {
  const result = await nodeFetch(process.env.HASURA_URL, {
    method: 'POST',
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res: any) => res.json())

  if (!result || !result.data) {
    console.error(result)
    return []
  }

  return result.data
}

export { hasuraRequest }
