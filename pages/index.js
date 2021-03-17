import Head from 'next/head'
import Link from 'next/link'
import { grants } from '../sdk'

export async function getStaticProps(context) {
  return {
    props: { grants: grants() },
  }
}

export default function Home({ grants }) {
  return (
      <div>
        <Head>
          <title>LBRY Community Funding Experiment</title>
        </Head>

        <main className="container max-w-2xl mx-auto">
          <h1 className="mb-4">LBRY Community Funding Experiment</h1>

          <ul className="flex space-x-2">
            {grants.map((grant) => (
              <li key={grant.claim_id} className="flex-auto border border-black p-4">
                <Link href={`/grant/${grant.url}`}>
                  <a className="cursor-pointer">
                    <h2 className="font-bold mb-2">{grant.name}</h2>
                    <img className="max-w-md" src={grant.thumbnail ?? "https://via.placeholder.com/300"}></img>
                  </a>
                </Link>
              </li>
            ))}
          </ul>

        </main>
      </div>
  )
}
