import * as PropTypes from "prop-types"
import React from "react"
import Layout from '../components/layout'

const propTypes = {
  data: PropTypes.object.isRequired,
}

const PageTemplate = ({ children, data }) => {
  // const { title } = data.contentfulPage
  return (
    <Layout>
      <div
        style={{
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <h4>{data.contentfulPage.title}</h4>
      </div>
    </Layout>
  )
}

PageTemplate.propTypes = propTypes

export default PageTemplate

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id,
      slug,
      title
    }
  }
`
