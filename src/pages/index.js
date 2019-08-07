import { graphql } from 'gatsby'
import { mqLarge, mqMedium, GRID_GUTTER } from '../constants'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const Tiles = styled.div`
  display: grid;
  grid-template: auto / auto;
  grid-gap: ${GRID_GUTTER}px;

  ${mqMedium} {
    grid-template: auto / repeat(2, 1fr);
    grid-row-gap: ${GRID_GUTTER * 3}px;
  }

  ${mqLarge} {
    grid-template: auto / repeat(3, 1fr);
  }
`

const Tile = styled(Link)`
  text-decoration: none;
  color: #999;
`

const TileImage = styled.div`
  overflow: hidden;
  padding-bottom: 100%;
  position: relative;
`

const TileImg = styled(Img)`
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute !important;
  right: 0;
  top: 0;
  width: 100%;

  ${mqLarge} {
    filter: grayscale(1) contrast(1.6);
    transform: translateZ(0);
    transition: filter 0.3s ease;

    ${Tile}:hover & {
      filter: grayscale(0) contrast(1);
    }
  }
`

const TileLabel = styled.div`
  display: block;
  width: 100%;

  ${mqMedium} {
    overflow: hidden;
    position: relative;
    text-decoration: none;

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
      color: #fff;
      content: attr(data-label);
      display: block;
      left: 0;
      padding: 1px 3px;
      position: absolute;
      right: 0;
      top: -100%;
    }

    ${Tile}:hover & {
      transform: translate3d(0, 100%, 0);
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Tiles>
        {data.pages.edges.map(({ node }) => (
          <Tile to={`/${node.slug}`} key={node.id}>
            <TileImage>
              <TileImg
                objectFit="cover"
                objectPosition="50% 50%"
                title={node.title}
                alt={node.title}
                fluid={node.coverImage.fluid}
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
    pages: allContentfulPage(
      filter: { unlisted: { ne: true } }
      sort: { fields: [presentedAt], order: DESC }
    ) {
      edges {
        node {
          id
          slug
          title
          coverImage {
            fluid(quality: 70) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
