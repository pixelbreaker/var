require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: 'VAR',
    keywords: [`design`, `branding`, `hong kong`, `london`],
    description: 'Design studio Hong Kong / London',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'var-studio',
        short_name: 'var-studio',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/var-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID || '',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
        host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-153107815-1',
      },
    },
  ],
}
