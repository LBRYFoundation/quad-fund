import Head from 'next/head'
import Link from 'next/link'

export async function getStaticProps(context) {
  const res = await fetch(`http://localhost:3000/api/apps`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { apps: data.apps },
  }}

function Home({ apps }) {
  return (
      <div>
        <Head>
          <title>LBRY Community Funding Experiment</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto">
          <h1>LBRY Community Funding Experiment</h1>

          <ul>
            {apps.map((app) => (
              <li key={app.url}>
                <Link href={`/a/${app.url}`}>
                  <a>{app.title}</a>
                </Link>
              </li>
            ))}
          </ul>

        </main>
      </div>
  )
}

export default Home
