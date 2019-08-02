import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`

const ImageSlider = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Image = styled(Img)`
  width: 100%;
  flex: 0 0 auto;
`

const PageImages = ({ images }) => (
  <ImageContainer>
    <ImageSlider>
      {images &&
        images.map((image, index) => <Image fluid={image.fluid} key={index} />)}
    </ImageSlider>
  </ImageContainer>
)

export default PageImages
