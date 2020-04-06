import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { mqLarge, mqMedium, GRID_GUTTER } from '../constants'
import AnchorRollover from './AnchorRollover'
import styled from 'styled-components'

const FooterContainer = styled.div`
  border-top: #ccc 1px solid;
  display: grid;
  grid-gap: ${GRID_GUTTER}px;
  grid-template: auto / auto;
  margin-top: 2rem;
  padding-top: 2rem;

  ${mqMedium} {
    grid-template: auto / repeat(2, 1fr);
  }

  ${mqLarge} {
    grid-template: auto / 33% repeat(2, 1fr);
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
  font-size: 16px;
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

const VARRollover = styled(Link)`
  font-size: 24px;
  transform: translateY(-4px);
`

const LondonOffice = () => (
  <>
    <strong>LONDON</strong>
    <br />
    <p>
      2nd Floor
      <br />
      107 Charterhouse Street,
      <br />
      Clerkenwell,
      <br />
      London,
      <br />
      EC1M 6HW
    </p>
    <p>
      <AnchorRollover href="mailto:info@var.studio" label="info@var.studio" />
      <br />
      <Tel href="tel:+447838716487">+44 (0)7838 716487</Tel>
    </p>
  </>
)

const HKOffice = () => (
  <>
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
      <Tel href="tel:+85228381710">+852 2838 1710</Tel>
    </p>
  </>
)

const Footer = () => {
  const [location, setLocation] = useState('HK')

  useEffect(() => {
    async function getLocation() {
      const storedLoc = localStorage.getItem('location')
      if (!storedLoc) {
        const res = await fetch('https://ipapi.co/json/')
        const loc = await res.json()
        setLocation(loc.country)
        localStorage.setItem('location', loc.country)
        return
      }
      setLocation(storedLoc)
    }
    getLocation()
  }, [])

  return (
    <FooterContainer>
      <FooterColumn className="col1">
        <AnchorRollover
          as={VARRollover}
          to="/"
          label="VAR"
          style={{ textDecoration: 'none' }}
        />
      </FooterColumn>
      <FooterColumn className="col2">
        {location && location === 'HK' ? (
          <>
            <HKOffice />
            <LondonOffice />
          </>
        ) : (
          <>
            <LondonOffice />
            <HKOffice />
          </>
        )}
      </FooterColumn>
      <FooterColumn className="col3">
        <AnchorRollover
          href="https://www.facebook.com/VAR.DESIGNSTUDIO/"
          target="_blank"
          label="Facebook"
        />
        <br />
        <AnchorRollover
          href="https://www.instagram.com/var.designstudio/"
          target="_blank"
          label="Instagram"
        />
        <br />
        <AnchorRollover
          href="https://www.linkedin.com/company/vardesignstudio"
          target="_blank"
          label="Linkedin"
        />
        <br />
        <AnchorRollover
          href="https://www.behance.net/vardesignstudio"
          target="_blank"
          label="Behance"
        />
      </FooterColumn>
    </FooterContainer>
  )
}
export default Footer
