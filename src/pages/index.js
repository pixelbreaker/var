import React from 'react'
// import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'

const Tiles = styled.div`
  display: flex;
  justify-content: space-between;
`

const Tile = styled.a`
  flex: 0 0 50%;
  padding-right: 10px;
  text-decoration: none;
  color: #999;
`

const TileImage = styled.div`
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`

const TileImg = styled.div`
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: transform 0.5s ease;

  ${Tile}:hover & {
    transform: scale(1.1);
  }
`

const TileLabel = styled.div`
  color: #999;
  font-size: 16px;
  font-weight: 300;
  margin: 10px 0;
`



const IndexPage = ({children, data}) => {
  return (
    <Layout>
      <Tiles>
        {data.allContentfulPage.edges.map((page, index) => (
          <Tile href={page.node.slug} key={index}>
            <TileImage>
              <TileImg style={{ backgroundImage: `url(${page.node.coverImage.file.url})`}} />
            </TileImage>
            <TileLabel>{page.node.title}</TileLabel>
          </Tile>
        ))}
      </Tiles>
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
