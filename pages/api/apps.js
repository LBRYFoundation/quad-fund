// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json({
    "apps": [
      {title: "one", url: "@grin/one"},
      {title: "two", url: "@grin/two"},
      {title: "three", url: "@coolguy/three"},
    ],
  })
}
