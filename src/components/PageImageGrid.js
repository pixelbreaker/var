import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { mqMedium, mqLarge, GRID_GUTTER } from '../constants'

const GridContainer = styled.div`
  display: grid;
  grid-template: auto / auto;
  grid-gap: ${GRID_GUTTER}px;

  ${mqMedium} {
    grid-template: auto / repeat(2, 1fr);
  }

  ${mqLarge} {
    grid-template: auto / repeat(3, 1fr);
  }
`

const Image = styled(Img)`
  height: 0;
  padding-bottom: 100%;
`

const PageImageGrid = ({ images }) => {
  return (
    <GridContainer>
      {images.map((image, index) => (
        <Image
          objectFit="cover"
          objectPosition="50% 50%"
          fluid={image.fluid}
          key={index}
        />
      ))}
    </GridContainer>
  )
}

export default PageImageGrid
