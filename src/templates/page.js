import { graphql } from 'gatsby'
import { mqLarge, GRID_GUTTER } from '../constants'
import { pageComponents } from '../contentful'
import * as PropTypes from 'prop-types'
import Layout from '../components/layout'
import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

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

const propTypes = {
  data: PropTypes.object.isRequired,
}

const PageTemplate = ({ data }) => {
  const { headerImages, title, subtitle, bodyCopy, components } = data.page
  console.log(components)

  return (
    <Layout>
      <div>
        <HeaderImages>
          {headerImages &&
            headerImages.map(props => (
              <HeaderImage>
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
  }
`
