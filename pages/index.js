import Head from "next/head"
import Layout, {siteTitle} from "../components/layout"
import Link from "next/link"
import Date from "../components/date"
import utilStyles from "../styles/utils.module.css"
import { getSortedPostsData } from "../lib/post"

// Note: getStaticProps n'est autorisé que sur des `page`.
// Cela ne (devrais pas) fonctionneras pas sur des composant par exemple.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.HeadingMd}>
        <p>Quelques contenus pour tester NextJS</p>
      </section>
      <section className={`${utilStyles.HeadingMd}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
