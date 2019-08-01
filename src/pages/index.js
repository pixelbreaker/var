import { graphql } from 'gatsby'
import { mqLarge, mqMedium, GRID_GUTTER } from '../constants'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Img from 'gatsby-image'

const Tiles = styled.div`
  display: grid;
  grid-template: auto / auto;
  grid-gap: ${GRID_GUTTER}px;

  ${mqMedium} {
    grid-template: auto / repeat(2, 1fr);
  }

  ${mqLarge} {
    grid-template: auto / repeat(3, 1fr);
  }
`

const Tile = styled.a`
  text-decoration: none;
  color: #999;
`

const TileImage = styled.div`
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
`

const TileImg = styled(Img)`
  bottom: 0;
  height: 100%;
  left: 0;
  /* object-fit: cover; */
  position: absolute !important;
  right: 0;
  top: 0;
  transition: filter 0.3s ease;
  transform: translateZ(0);
  filter: grayscale(1);
  width: 100%;

  ${Tile}:hover & {
    filter: grayscale(0);
    /* transform: translateZ(0) scale(1); */
  }
`

// const TileLabel = styled.div`
//   color: #999;
//   font-size: 16px;
//   font-weight: 300;
//   margin: 10px 0;
//   transition: color 0.3s ease, transform 0.3s ease;
//   translate: translate3d(0, 0, 0);

//   ${Tile}:hover & {
//     color: #444;
//     transform: translate3d(5px, 0, 0);
//   }
// `

const TileLabel = styled.a`
  display: block;
  width: 100%;

  ${mqMedium} {
    overflow: hidden;
    position: relative;
    text-decoration: none;
    /* transform: translateX(-3px); */

    &:hover {
      text-decoration: none !important;
    }
  }
`

const Mover = styled.span`
  display: block;
  width: 100%;

  ${mqMedium} {
    display: block;
    padding: 1px 3px;
    position: relative;
    transform: translate3d(0, 0, 0);
    transition: transform 250ms cubic-bezier(0.75, 0, 0.25, 1);

    &:after {
      background-color: #444;
      display: block;
      color: #fff;
      content: attr(data-label);
      left: 0;
      padding: 1px 3px;
      position: absolute;
      top: 100%;
      right: 0;
    }

    ${Tile}:hover & {
      transform: translate3d(0, -100%, 0);
    }
  }
`

const IndexPage = ({ children, data }) => {
  return (
    <Layout>
      <Tiles>
        {data.allContentfulPage.edges.map(({ node }) => (
          <Tile href={node.slug} key={node.id}>
            <TileImage>
              <TileImg
                objectFit="cover"
                objectPosition="50% 50%"
                title={node.title}
                alt={node.title}
                sizes={node.coverImage.sizes}
              />
            </TileImage>
            <TileLabel>
              <Mover data-label={node.title}>{node.title}</Mover>
            </TileLabel>
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
            sizes(quality: 70) {
              ...GatsbyContentfulSizes_tracedSVG
            }
          }
        }
      }
    }
  }
`
