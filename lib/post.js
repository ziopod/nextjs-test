// Data fetching
//
// From local Markdown file with fs et Graymatter.
//
// Pour des données externes, il est possible d'utiliser fetch.
// ~~~
// const res = await fetch("some-api-url")
// return res.json()
// ~~~
// Next applique un polyfill sur fetch, si bien qu'il n'est pas necessaire
// de l'importer.
//
// Pour des appels de données coté client, il est conseillé d'utiliser
// `SWR`: https://swr.vercel.app/

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data
    }
  })
  // Trier les articles par date
  return allPostsData.sort(({ date: a}, { data: b }) => {
    if (a < b){
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, "")
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
  const contentHtml = processedContent.toString()
  
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}