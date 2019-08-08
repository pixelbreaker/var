import { Link } from 'gatsby'
import { Location } from '@reach/router'
import { MEDIA_XLARGE } from '../constants'
import AnchorRollover from './AnchorRollover'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 20px 0;
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

const Brand = styled(Link)`
  display: block;
  flex: 0 0 auto;
`

const Filler = styled.div`
  flex: 2 1 auto;
`

const Logo = styled.img`
  margin-bottom: 0 !important;
  width: 80px;
`

const Nav = styled.div`
  flex: 0 1 auto;
  margin: 0;
`

const NavLink = styled(Link)`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
  text-transform: uppercase;
`

const Header = ({ siteTitle, links }) => (
  <Container>
    <Contents>
      <Brand to="/">
        <Logo src="/images/var_logo.svg" alt="VAR logo" />
      </Brand>
      <Filler />
      <Nav>
        <Location>
          {({ location: { pathname } }) => (
            <>
              <AnchorRollover
                as={NavLink}
                to="/"
                label="Projects"
                active={pathname === '/'}
              />
              {links.map((link, index) => (
                <AnchorRollover
                  as={NavLink}
                  to={`/${link.slug}`}
                  key={index}
                  label={link.title}
                  active={pathname === `/${link.slug}`}
                />
              ))}
            </>
          )}
        </Location>
      </Nav>
    </Contents>
  </Container>
)

export default Header
