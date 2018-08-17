import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = ({children, data}) => {
  console.log(data)
  return (
    <Layout>
      <h1>Hi people</h1>
      {data.allContentfulPage.edges.map((page, index) => (
        <>
        <h2 key={index}>{page.node.title}</h2>
        <img src={page.node.coverImage.file.url}/>
        </>
      ))}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulPage(filter:{ listed: { eq:true }}) {
      edges {
        node {
          id,
          slug,
          title,
          coverImage {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
    }
  }
`
