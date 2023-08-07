import React, { useEffect } from 'react'
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

const Layout = ({ children, data }) => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', 'G-6PPQPT3J71')
  }, [])
  return (
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
              href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap"
              rel="stylesheet"
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-6PPQPT3J71"
            ></script>
            {/* <script
            dangerouslySetInnerHTML={`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6PPQPT3J71');`}
          ></script> */}
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
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
