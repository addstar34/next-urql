import Head from 'next/head'
import { useMutation } from 'urql'
import Nav from '../components/nav'

const signInMutation = `
  mutation($email: String!, $password: String!) {
    signin(email: $email password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

function SignInPage() {
  const [, signIn] = useMutation(signInMutation)

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = Object.fromEntries(new FormData(e.target))
    const response = await signIn(formData)

    if (response.error) {
      return console.warn(response.error)
    }

    localStorage.setItem('token', response.data.signin.token)
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <Nav />

      <main>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input name='email' type='email' value='billy@test.com' />

          <label htmlFor='password'>Password</label>
          <input name='password' type='password' value='password' />

          <button type='submit'>Sign In</button>
        </form>
      </main>
    </>
  )
}

export default SignInPage
