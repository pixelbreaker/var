import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #ddd;
  margin: 0 0 20px;
`

const Contents = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 auto;
  max-width: 960px;
  padding: 20px;
`

const Brand = styled.h1`
  display: block;
  flex: 2 1 auto;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
`

const BrandLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Nav = styled.div`
  flex: 0 1 auto;
  margin: 0;
`

const NavLink = styled(Link)`
  margin-right: 10px;
  color: black;
  text-decoration: none;

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
