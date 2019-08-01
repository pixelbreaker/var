import { graphql } from 'gatsby'
import { pageComponents, mqLarge, GRID_GUTTER } from '../constants.js'
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
  &:first-child {
    font-weight: bold;
  }

  & blockquote {
    background-color: #fafafa;
    margin: 0 0 10px;
    padding: 10px;
  }
`

const propTypes = {
  data: PropTypes.object.isRequired,
}

const PageTemplate = ({ data }) => {
  const { headerImages, title, bodyCopy, components } = data.contentfulPage

  return (
    <Layout>
      <div>
        <HeaderImages>
          {headerImages &&
            headerImages.map(props => (
              <HeaderImage>
                <HeaderImg sizes={props.sizes} />
              </HeaderImage>
            ))}
        </HeaderImages>
        <IntroTextContainer>
          <IntroTextColumn>{title}</IntroTextColumn>
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
            const CurrentComponent = pageComponents[component.__typename]
            return <CurrentComponent {...component} key={index} />
          })}
      </div>
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      slug
      title
      components {
        __typename
      }
      bodyCopy {
        childMarkdownRemark {
          html
        }
      }
      headerImages {
        sizes(maxWidth: 1800, quality: 75) {
          ...GatsbyContentfulSizes_tracedSVG
        }
        # fluid(maxWidth: 1800, quality: 70) {
        #   ...GatsbyContentfulFluid
        # }
      }
    }
  }
`
