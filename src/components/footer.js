import React from 'react'
import { mqLarge, mqMedium } from '../constants'
import styled from 'styled-components'
import AnchorRollover from './AnchorRollover'

const FooterContainer = styled.div`
  display: grid;
  grid-template: auto / auto;
  grid-gap: 20px;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: #ccc 1px solid;

  ${mqMedium} {
    grid-template: auto / repeat(2, 1fr);
  }

  ${mqLarge} {
    grid-template: auto / repeat(3, 1fr);
  }

  a {
    color: #444;
    text-decoration: underline;

    ${mqLarge} {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const Tel = styled.a`
  ${mqMedium} {
    pointer-events: none;
  }
`

const FooterColumn = styled.div`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.3;

  &.col1 {
    font-size: 16px;
    font-weight: bold;
  }

  &.col3 {
    ${mqMedium} {
      grid-column-start: 2;
    }

    ${mqLarge} {
      grid-column-start: unset;
    }
  }
`

const Footer = () => (
  <FooterContainer>
    <FooterColumn className="col1">VAR</FooterColumn>
    <FooterColumn className="col2">
      <strong>LONDON</strong>
      <br />
      <p>
        25 Durlston Road
        <br />
        Kingston Upon Thames
        <br />
        Surrey
        <br />
        KT2 5RR
      </p>
      <p>
        <AnchorRollover href="mailto:info@var.studio" label="info@var.studio" />
        <br />
        <Tel href="tel:+440000000000">+ 44 0000 000 000</Tel>
      </p>

      <p>
        <strong>HONG KONG</strong>
        <br />
        4D Tung Kin Factory Building
        <br />
        196-198 Tsat Tsz Mui Road
        <br />
        North Point
      </p>
      <p>
        <AnchorRollover href="mailto:info@var.studio" label="info@var.studio" />
        <br />
        <Tel href="tel:+85228381303">+852 2838 1303</Tel>
      </p>
    </FooterColumn>
    <FooterColumn className="col3">
      <AnchorRollover href="#" target="_blank" label="Facebook" />
      <br />
      <AnchorRollover href="#" target="_blank" label="Instagram" />
      <br />
      <AnchorRollover href="#" target="_blank" label="Linkedin" />
      <br />
      <AnchorRollover href="#" target="_blank" label="Behance" />
      <br />
      <AnchorRollover href="#" target="_blank" label="Pinterest" />
      <br />
    </FooterColumn>
  </FooterContainer>
)

export default Footer
