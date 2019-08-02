import React from 'react'
import { mqLarge, GRID_GUTTER } from '../constants.js'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: #ccc 1px solid;

  ${mqLarge} {
    grid-gap: ${GRID_GUTTER}px;
    grid-template: auto / 33% repeat(2, 1fr);
    margin-top: ${GRID_GUTTER * 3}px;
  }
`

const Column = styled.div`
  & blockquote {
    background-color: #fafafa;
    margin: 0 0 10px;
    padding: 10px;
  }
`

const Title = styled.div`
  font-weight: bold;
`
const PageTextColumns = ({ column1, column2, column3 }) => (
  <Container>
    <Column>{column1 && <Title>{column1.text}</Title>}</Column>
    {column2 && (
      <Column dangerouslySetInnerHTML={{ __html: column2.md.html }} />
    )}
    {column3 && (
      <Column dangerouslySetInnerHTML={{ __html: column3.md.html }} />
    )}
  </Container>
)

export default PageTextColumns
