import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "../../components/layout"
import { getAllPostIds, getPostData } from "../../lib/post"
import Date from "../../components/date"
import utilStyles from "../../styles/utils.module.css"

export default function Post({
  postData
  }: {
    postData: {
      title: string
      date: string
      contentHtml: string
    }
  }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
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
// TypeScript
// export async function getStaticPaths() {
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// Récuperer les données necessaires pour l'article en utilisant `params.id`
//export async function getStaticProps({ params }) {
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (! params) return { props: {} }
  const postData = await getPostData(params.id as string)
  return {
    props: {
    postData
  }
 }
}