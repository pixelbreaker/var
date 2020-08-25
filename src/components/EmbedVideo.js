import React from 'react'
import styled from 'styled-components'
import getVideoId from 'get-video-id'

const embedUrls = {
  youtube: '//www.youtube.com/embed/:id:',
  vimeo: '//player.vimeo.com/video/:id:',
}

const Container = styled.div`
  background-color: white;
  height: 0;
  margin-top: 15px;
  padding-bottom: 64%;
  position: relative;
  width: 100%;
`

const IFrame = styled.iframe`
  border: none;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const EmbedVideo = ({ url }) => {
  const videoData = getVideoId(url)
  const embedUrl = embedUrls[videoData.service].replace(':id:', videoData.id)

  return (
    <Container>
      <IFrame
        width="100%"
        height="100%"
        src={embedUrl}
        frameborder="0"
        allow="autoplay; fullscreen; encrypted-media;"
        allowfullscreen
      ></IFrame>
    </Container>
  )
}

export default EmbedVideo
