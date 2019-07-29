import { graphql } from 'gatsby'
import * as PropTypes from 'prop-types'
import Layout from '../components/layout'
import React from 'react'
import { pageComponents } from '../constants.js'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const PageTemplate = ({ children, data }) => {
  const { title, components } = data.contentfulPage
  return (
    <Layout>
      <div>
        <h4>{title}</h4>
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
        ...ContentfulPageImages
      }
    }
  }
`
