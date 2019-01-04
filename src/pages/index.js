import { graphql } from 'gatsby'
import { mqLarge, mqMedium, mqXLarge } from '../constants'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'

const Tiles = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: -20px;
`

const Tile = styled.a`
  flex: 0 0 100%;
  padding: 20px;
  text-decoration: none;
  color: #999;

  ${mqMedium} {
    flex-basis: 50%;
  }

  ${mqLarge} {
    flex-basis: 33.3%;
  }

  ${mqXLarge} {
    flex-basis: 25%;
  }
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

const IndexPage = ({ children, data }) => {
  return (
    <Layout>
      <Tiles>
        {data.allContentfulPage.edges.map(({ node }) => (
          <Tile href={node.slug} key={node.id}>
            <TileImage>
              <TileImg
                style={{ backgroundImage: `url(${node.coverImage.file.url})` }}
              />
            </TileImage>
            <TileLabel>{node.title}</TileLabel>
          </Tile>
        ))}
      </Tiles>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulPage(
      filter: { unlisted: { ne: true } }
      sort: { fields: [presentedAt], order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title
          coverImage {
            file {
              url
            }
          }
        }
      }
    }
  }
`
