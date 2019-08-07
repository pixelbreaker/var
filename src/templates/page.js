import { graphql, Link } from 'gatsby'
import { mqLarge, GRID_GUTTER } from '../constants'
import { pageComponents } from '../contentful'
import * as PropTypes from 'prop-types'
import Layout from '../components/layout'
import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import AnchorRollover from '../components/AnchorRollover'

const HeaderImages = styled.div`
  display: grid;
  grid-gap: ${GRID_GUTTER}px;

  ${mqLarge} {
    grid-template: auto / repeat(2, 1fr);
  }
`

const HeaderImage = styled.div`
  position: relative;

  ${mqLarge} {
    &:nth-child(3n - 2):not(:nth-last-child(2)) {
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }
`

const HeaderImg = styled(Img)`
  height: auto;
  width: 100%;
`

const IntroTextContainer = styled.div`
  display: grid;
  margin-top: ${GRID_GUTTER * 2}px;

  ${mqLarge} {
    grid-gap: ${GRID_GUTTER}px;
    grid-template: auto / 33% auto;
    margin-top: ${GRID_GUTTER * 3}px;
  }
`

const IntroTextColumn = styled.div`
  & blockquote {
    background-color: #fafafa;
    margin: 0 0 10px;
    padding: 10px;
  }
`

const Title = styled.div`
  font-weight: bold;
`

const Subtitle = styled.div``

const PrevNextContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: #ccc 1px solid;
  transform: none;
  display: flex;
`

const PrevNextSeparator = styled.span`
  margin: 0 11px 0 5px;
`

const PrevNextLink = styled(Link)`
  text-transform: uppercase;
`

const propTypes = {
  data: PropTypes.object.isRequired,
}

const PageTemplate = ({ data }) => {
  const {
    headerImages,
    title,
    subtitle,
    bodyCopy,
    components,
    slug,
    unlisted,
  } = data.page

  const neighbours = data.pages.edges.find(edge => {
    return edge.node.slug === slug
  })
  let previous, next
  if (neighbours) {
    previous = neighbours.previous
    next = neighbours.next
  }

  return (
    <Layout>
      <div>
        {slug !== 'inspiration' && (
          <>
            <HeaderImages>
              {headerImages &&
                headerImages.map((props, index) => (
                  <HeaderImage key={index}>
                    <HeaderImg fluid={props.fluid} />
                  </HeaderImage>
                ))}
            </HeaderImages>
            <IntroTextContainer>
              <IntroTextColumn>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
              </IntroTextColumn>
              {bodyCopy && (
                <IntroTextColumn
                  dangerouslySetInnerHTML={{
                    __html: bodyCopy.childMarkdownRemark.html,
                  }}
                ></IntroTextColumn>
              )}
            </IntroTextContainer>
          </>
        )}
        {unlisted !== true && (
          <PrevNextContainer>
            {previous && (
              <AnchorRollover
                as={PrevNextLink}
                to={`/${previous.slug}`}
                label="Previous"
              />
            )}
            {previous && next && <PrevNextSeparator>/</PrevNextSeparator>}
            {next && (
              <AnchorRollover
                as={PrevNextLink}
                to={`/${next.slug}`}
                label="Next"
              />
            )}
          </PrevNextContainer>
        )}
        {components &&
          components.map((component, index) => {
            const { __typename, ...props } = component
            const CurrentComponent = pageComponents[__typename]

            return <CurrentComponent {...props} key={index} />
          })}
      </div>
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      id
      slug
      title
      subtitle
      unlisted
      components {
        __typename
        ... on ContentfulPageImages {
          id
          images {
            fluid(maxWidth: 1800, quality: 75) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
        ... on ContentfulPageTextColumns {
          id
          column1 {
            text: column1
          }
          column2 {
            md: childMarkdownRemark {
              html
            }
          }
          column3 {
            md: childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulPageImageGrid {
          id
          images {
            fluid(maxWidth: 800, quality: 75) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
      bodyCopy {
        childMarkdownRemark {
          html
        }
      }
      headerImages {
        fluid(maxWidth: 1800, quality: 75) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
    }
    pages: allContentfulPage(
      filter: { unlisted: { ne: true } }
      sort: { fields: [presentedAt], order: DESC }
    ) {
      edges {
        node {
          slug
        }
        next {
          slug
        }
        previous {
          slug
        }
      }
    }
  }
`
