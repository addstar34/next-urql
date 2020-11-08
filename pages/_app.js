import { withUrqlClient } from 'next-urql'
import { dedupExchange, fetchExchange } from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { devtoolsExchange } from '@urql/devtools'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withUrqlClient(
  (ssrExchange) => {
    return {
      url: 'http://localhost:4000/gql',
      fetchOptions: () => {
        const options = { credentials: 'include' }

        if (typeof window === 'undefined') {
          return options
        }

        const token = localStorage.getItem('token')

        if (token) {
          return {
            ...options,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        }

        return options
      },
      exchanges: [
        process.env.NODE_ENV === 'development' && devtoolsExchange,
        dedupExchange,
        cacheExchange({
          updates: {
            Mutation: {
              signin: (result, args, cache, info) => {
                cache.updateQuery(
                  { query: `{ currentUser { id, email } }` },
                  (data) => {
                    console.log('data', data)
                    data.currentUser = result.signin.user
                    // data = { currentUser: result.signin.user }
                    return data
                  }
                )
              },
            },
          },
        }),
        ssrExchange,
        fetchExchange,
      ],
    }
  },
  { ssr: true }
)(MyApp)
