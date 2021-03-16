import { useRouter } from 'next/router'

const Application = () => {
  const router = useRouter()
  const { slug } = router.query

  return <h2>Slug: { slug ? slug.join("/") : "" }</h2>
}

export default Application
