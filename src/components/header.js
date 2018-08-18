import { Link } from 'gatsby'
import { MEDIA_XLARGE } from '../constants'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 0 20px;
`

const Contents = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 auto;
  max-width: ${MEDIA_XLARGE}px;
  padding: 20px;
`

const Brand = styled.h1`
  display: block;
  flex: 2 1 auto;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
`

const BrandLink = styled(Link)`
  color: black;
  text-decoration: none;
  transition: color 0.1s ease;

  &:hover {
    color: #333;
  }
`

const Nav = styled.div`
  flex: 0 1 auto;
  margin: 0;
`

const NavLink = styled(Link)`
  color: black;
  margin-right: 10px;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`

const Header = ({ siteTitle, links }) => (
  <Container>
    <Contents>
      <Brand>
        <BrandLink to="/">
          {siteTitle}
        </BrandLink>
      </Brand>
      <Nav>
        {links.map((link, index) => (
          <NavLink to={link.slug} key={index}>{link.title}</NavLink>
        ))}
      </Nav>
    </Contents>
  </Container>
)

export default Header
