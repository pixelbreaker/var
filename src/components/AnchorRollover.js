import React from 'react'
import styled from 'styled-components'
import { mqMedium } from '../constants'

const Container = styled.a`
  display: inline-block;

  ${mqMedium} {
    overflow: hidden;
    position: relative;
    text-decoration: none;

    &:hover {
      text-decoration: none !important;
    }
  }
`

const Mover = styled.div`
  display: inline;

  ${mqMedium} {
    display: inline-block;
    padding: 1px 3px;
    position: relative;
    transform: translate3d(0, 0, 0);
    transition: transform 300ms ease;

    &:after {
      background-color: #444;
      color: #fff;
      content: attr(data-label);
      left: 0;
      padding: 1px 3px;
      position: absolute;
      top: 100%;
    }

    ${Container}:hover & {
      transform: translate3d(0, -100%, 0);
    }
  }
`

const AnchorRollover = ({ label, href, target }) => (
  <Container href={href} target={target}>
    <Mover data-label={label}>{label}</Mover>
  </Container>
)

export default AnchorRollover
