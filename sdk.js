const fetch = require('sync-fetch');

export function sdk(method, params) {
  console.log("SDK", method, params)
  return fetch("http://localhost:5279", {
    "method": "POST",
    "headers": {
      "content-type": "application/json-rpc",
    },
    "body": JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
    }),
  }).json()
}

export function fixUrl(url) { return url.replace(/^lbry:\/\//, '').replace('#',':') }

export function grants() {
  const search = sdk("claim_search", {any_tags: ["lbry-funding-demo"]});

  if (search.error) {
    console.log(search)
    return null
  }

  return search.result.items.map((grant) => ({
    url: fixUrl(grant.short_url),
    claim_id: grant.claim_id,
    name: grant.name,
    thumbnail: grant.value.thumbnail.url ?? null,
  }))
}
