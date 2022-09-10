import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/post"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"

export default function Post({ postData }) {
  return (
    <Layout>
      <head>
        <title>{postData.title}</title>
      </head>
      <article>
        <h1 className={utilStyles.headingXL}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
    </Layout>
  )
}

// Retourner la liste des valeurs possible pour `id`
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Récuperer les données necessaires pour l'article en utilisant `params.id`
export async function getStaticProps({ params }) {
 const postData = await getPostData(params.id)
 return {
  props: {
    postData
  }
 }
}