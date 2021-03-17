import { grants, sdk, fixUrl } from "../../sdk";
import Head from "next/head";
import Link from "next/link";

const fetch = require('sync-fetch');

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
  let content;
  if (grant.value.source.media_type == "text/markdown") {
    const md = fetch(
      "https://cdn.lbryplayer.xyz/api/v4/streams/free/" +
      [grant.name, grant.claim_id, grant.value.source.sd_hash.substring(0,6)].join("/")
    ).text()
    content = <pre>{md}</pre>
  } else {
    content = <iframe id="lbry-iframe" width="560" height="315"
            src={"https://lbry.tv/$/embed/" + grant.name + "/" + grant.claim_id}
            allowFullScreen></iframe>
  }

  return (
    <div>
      <Head>
        <title>{grant.value.title}</title>
      </Head>

      <main className="container max-w-2xl mx-auto">
        <Link href="/">
          <a className="text-blue-500">{"<"}- Back</a>
        </Link>

        <h1>{grant.value.title}</h1>
        <img className="max-w-md mb-4" src={grant.value.thumbnail.url ?? "https://via.placeholder.com/300"}></img>

        {content}

        <Link href={"https://open.lbry.com/" + fixUrl(grant.short_url)}>
          <a className="text-red-600">Support this grant on LBRY</a>
        </Link>

        <pre>{JSON.stringify(grant.value, null, 2)}</pre>

      </main>
    </div>
  )
}
