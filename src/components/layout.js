import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { MEDIA_XLARGE } from '../constants'
import styled from 'styled-components'
import Header from './header'
import Footer from './footer'
import './layout.css'

const PageRow = styled.div`
  margin: 0 auto;
  max-width: ${MEDIA_XLARGE}px;
  padding-top: 0;
  padding: 0px 1.0875rem 1.45rem;
`

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        contentfulHeaderLinks(title: { eq: "header" }) {
          links {
            title
            slug
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Var Studio' },
            {
              name: 'keywords',
              content: 'design, branding, hong kong, london',
            },
          ]}
        >
          <html lang="en" />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Header
          siteTitle={data.site.siteMetadata.title}
          links={data.contentfulHeaderLinks.links}
        />
        <PageRow>{children}</PageRow>
        <PageRow>
          <Footer />
        </PageRow>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
