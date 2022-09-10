import Head from "next/head"
import Image from "next/image"
import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"

const author = "Ziopod"
export const siteTitle = "Next.js Sample Website"

export default function Layout({ children, home }) {
  return <div className={styles.container}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Hello, default descrition here"
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header className={styles.header}>
      {home ? (
        <>
          <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt={author}
            />
          <h1 className={utilStyles.heading2Xl}>{author}</h1>
        </>
      ) : (
        <>
          <Link href="/">
              <Image
                priority
                src="/image/profle.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt={author}
              />
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/">
              <a>{author}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    )}
  </div>
}