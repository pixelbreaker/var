import React, { useState } from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../components/layout'
import styled from 'styled-components'
import { mqLarge, GRID_GUTTER } from '../constants'

const Container = styled.div`
  display: grid;
  margin-top: ${GRID_GUTTER * 2}px;

  ${mqLarge} {
    grid-gap: ${GRID_GUTTER}px;
    grid-template: auto / 33% auto;
    margin-top: ${GRID_GUTTER * 3}px;
  }
`

const Column = styled.div`
  &:first-child {
    display: none;

    ${mqLarge} {
      display: block;
    }
  }
  W & blockquote {
    background-color: #fafafa;
    margin: 0 0 10px;
    padding: 10px;
  }
`

const FieldsGrid = styled.div`
  display: grid;
  grid-template: auto / auto;
  padding: ${GRID_GUTTER * 2}px ${GRID_GUTTER * 2}px ${GRID_GUTTER}px 0;

  ${mqLarge} {
    grid-template: auto / repeat(2, 1fr);
    grid-gap: ${GRID_GUTTER}px;
  }
`

const Field = styled.label`
  display: block;
  width: 100%;
`

const FieldLabel = styled.div``

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
`

const MessageContainer = styled('div')`
  margin-right: ${GRID_GUTTER * 2}px;
`

const MessageField = styled(InputField)`
  resize: none;
  height: 150px;
  width: 100%;
`

const FieldSelect = styled(InputField)`
  position: relative;

  select {
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  &:after {
    content: attr(data-value);
  }

  &:before {
    content: 'v';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%) scaleY(0.6);
  }
`

const SubmitButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 12px;
  outline: none;
  overflow: hidden;
  padding: 10px 30px;

  ${mqLarge} {
    position: relative;
    transition: background-color 0.5s ease;

    &:before,
    &:after {
      content: '>';
      position: absolute;
      top: 50%;
      transform: translate3d(0, -50%, 0) scaleX(0.8);
      transition: transform 300ms cubic-bezier(0.75, 0, 0, 0.75);
    }

    &:before {
      right: 15px;
    }

    &:after {
      left: 15px;
      transform: translate3d(-25px, -50%, 0) scaleX(0.8);
    }

    &:hover {
      background-color: #333;
    }

    &:hover:before {
      transform: translate3d(25px, -50%, 0) scaleX(0.8);
    }

    &:hover:after {
      transform: translate3d(0px, -50%, 0) scaleX(0.8);
    }
  }
`

const SubmitLabel = styled.div`
  transform: translate3d(-3px, 0, 0);
  transition: transform 300ms cubic-bezier(0.75, 0, 0, 0.75);

  ${SubmitButton}:hover & {
    transform: translate3d(3px, 0, 0);
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const SecondPage = () => {
  const [state, setState] = useState({ isValidated: false, office: 'London' })

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  return (
    <Layout>
      <Container>
        <Column></Column>
        <Column>
          Let us know what you’re looking for — print, web, video, but also tell
          us who you are and what you do. We’ll put together a plan, uniquely
          for you. This will include matters of timing and cost, as well as the
          scope of our work.
          <form
            name="contact"
            action="/thank-you"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={handleChange} />
              </label>
            </div>
            <FieldsGrid>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <InputField
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                ></InputField>
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <InputField
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                ></InputField>
              </Field>
              <Field>
                <FieldLabel>Office</FieldLabel>
                <FieldSelect as="div" data-value={state.office}>
                  <select name="office" onChange={handleChange}>
                    <option value="London">London</option>
                    <option value="Hong Kong">Hong Kong</option>
                  </select>
                </FieldSelect>
              </Field>
            </FieldsGrid>
            <MessageContainer>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <MessageField
                  as="textarea"
                  name="message"
                  required
                  onChange={handleChange}
                ></MessageField>
              </Field>
            </MessageContainer>
            <SubmitButton type="submit">
              <SubmitLabel>Submit</SubmitLabel>
            </SubmitButton>
          </form>
        </Column>
      </Container>
    </Layout>
  )
}

export default SecondPage
