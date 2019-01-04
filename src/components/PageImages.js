import React from 'react'
import { graphql } from 'gatsby'

const PageImages = ({ images }) => (
  <div>
    {images.map((image, index) => (
      <img src={image.file.url} key={index} alt={image.title} />
    ))}
  </div>
)

export default PageImages

export const Fragment = graphql`
  fragment ContentfulPageImages on ContentfulPageImages {
    images {
      title
      file {
        url
      }
    }
  }
`
