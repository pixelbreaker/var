import { Link } from 'gatsby'
import { Location } from '@reach/router'
import { MEDIA_XLARGE, mqSmall, mqMedium } from '../constants'
import AnchorRollover from './AnchorRollover'
import React, { useState } from 'react'
import styled from 'styled-components'
import { HamburgerSlider } from 'react-animated-burgers'

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

const NavContainer = styled.div`
  ${mqSmall} {
    display: ${props => (props.isActive ? 'block' : 'none')};
    background-color: white;
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
    padding: 20vh 0 0;
  }

  ${mqMedium} {
    display: block;
    position: relative;
  }
`

const NavLink = styled(Link)`
  ${mqSmall} {
    font-size: 25px;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none !important;
    width: 100%;
  }

  ${mqMedium} {
    color: black;
    font-size: 15px;
    font-weight: 600;
    margin-left: 20px;
    text-transform: uppercase;
  }
`

const Burger = styled(HamburgerSlider)`
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  outline: none !important;
  position: relative;
  z-index: 101;

  ${mqMedium} {
    display: none;
  }
`

const Header = ({ links }) => {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <Container>
      <Contents>
        <Brand to="/">
          <Logo src="/images/var_logo.svg" alt="VAR logo" />
        </Brand>
        <Filler />
        <Nav>
          <Burger
            buttonWidth={28}
            buttonColor="#fff"
            barColor="#444"
            isActive={navOpen}
            toggleButton={() => setNavOpen(!navOpen)}
          />
          <NavContainer isActive={navOpen}>
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
          </NavContainer>
        </Nav>
      </Contents>
    </Container>
  )
}

export default Header
