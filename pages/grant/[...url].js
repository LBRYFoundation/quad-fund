import { grants, sdk, fixUrl } from "../../sdk";
import Head from "next/head";
import Link from "next/link";

export async function getStaticPaths() {
  const grantResults = grants()

  if (grantResults.length < 1) {
    return {fallback: true}
  }

  const paths = grantResults.map((grant) => ({params: { url: grant.url.split("/") }}))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const url = params.url.join('/')
  const resolve = sdk("resolve", {urls: [url]});
  return {
    props: { grant: resolve.result[url] },
  }
}

export default function Grant({grant}) {
  // console.log(grant)
  return (
    <div>
      <Head>
        <title>{grant.value.title}</title>
      </Head>

      <main className="container max-w-2xl mx-auto">
        <h1>{grant.value.title}</h1>
        <img className="max-w-md" src={grant.value.thumbnail.url ?? "https://via.placeholder.com/300"}></img>
        <Link href={"https://open.lbry.com/" + fixUrl(grant.short_url)}>
          <a className="text-red-600">See this grant on LBRY</a>
        </Link>
      </main>
    </div>
  )
}
