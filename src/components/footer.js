import React from 'react'
import { mqLarge, mqMedium } from '../constants'
import styled from 'styled-components'

const FooterContainer = styled.div`
  display: grid;
  grid-template: auto / auto;
  grid-gap: 20px;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: #ccc 1px solid;

  ${mqLarge} {
    grid-template: auto / repeat(3, 1fr);
  }

  a {
    color: #444;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
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
`

const Footer = () => (
  <FooterContainer>
    <FooterColumn className="col1">VAR</FooterColumn>
    <FooterColumn>
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
        <a href="mailto:info@var.studio">info@var.studio</a>
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
        <a href="mailto:info@var.studio">info@var.studio</a>
        <br />
        <Tel href="tel:+85228381303">+852 2838 1303</Tel>
      </p>
    </FooterColumn>
    <FooterColumn>
      <a href="#">Facebook</a>
      <br />
      <a href="#">Instagram</a>
      <br />
      <a href="#">Linkedin</a>
      <br />
      <a href="#">Behance</a>
      <br />
      <a href="#">Pinterest</a>
      <br />
    </FooterColumn>
  </FooterContainer>
)

export default Footer
