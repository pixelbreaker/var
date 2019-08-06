import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import AnchorRollover from './AnchorRollover'

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
`

const ImageSlider = styled.div`
  display: flex;
  flex-wrap: nowrap;
  transition: transform 800ms cubic-bezier(0.75, 0, 0, 0.75);
`

const Image = styled(Img)`
  width: 100%;
  flex: 0 0 auto;
`

const PrevNext = styled(AnchorRollover)`
  cursor: pointer;
  transform: translateX(0);
  user-select: none;

  &:first-child {
    padding-right: 20px;
  }
`

const PageImages = ({ images }) => {
  const [index, setIndex] = useState(0)

  return (
    <>
      <ImageContainer>
        <ImageSlider style={{ transform: `translateX(-${index * 100}%)` }}>
          {images &&
            images.map((image, index) => (
              <Image fluid={image.fluid} key={index} />
            ))}
        </ImageSlider>
      </ImageContainer>
      {images.length > 0 && (
        <div>
          <PrevNext
            onClick={e => setIndex((index - 1 + images.length) % images.length)}
            label="Previous"
          />
          <PrevNext
            onClick={e => setIndex((index + 1) % images.length)}
            label="Next"
          />
        </div>
      )}
    </>
  )
}

export default PageImages
