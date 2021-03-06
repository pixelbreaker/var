import React from 'react'
import styled from 'styled-components'
import { mqMedium } from '../constants'

const Container = styled.a`
  display: inline-block;

  ${mqMedium} {
    overflow: hidden;
    position: relative;
    text-decoration: none;
    transform: translateX(-3px);

    &:hover {
      text-decoration: none !important;
    }
  }
`

const Mover = styled.span`
  display: inline;

  ${mqMedium} {
    backface-visibility: hidden;
    display: inline-block;
    padding: 1px 3px;
    position: relative;
    transform: translate3d(0, 0, 0);
    transition: transform 250ms cubic-bezier(0.75, 0, 0.25, 1);

    &:after {
      background-color: black;
      color: #fff;
      content: attr(data-label);
      left: 0;
      padding: 1px 3px;
      position: absolute;
      top: 100%;
    }

    ${Container}.active & {
      text-decoration: underline !important;
    }

    ${Container}:hover & {
      transform: translate3d(0, -100%, 0);
    }
  }
`

const AnchorRollover = ({ label, as, active, ...props }) => (
  <Container as={as} className={active ? 'active' : ''} {...props}>
    <Mover data-label={label}>{label}</Mover>
  </Container>
)

export default AnchorRollover
