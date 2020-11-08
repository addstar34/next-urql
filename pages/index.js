import Head from 'next/head'
import Nav from '../components/nav'

function HomePage() {
  return (
    <>
      <Head>
        <title>Index</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />

      <main>
        <h1>Home page</h1>
      </main>
    </>
  )
}

export default HomePage