import React, { useState } from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../components/layout'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const SecondPage = () => {
  const [state, setState] = useState({ isValidated: false })

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
        <label>
          Your name{' '}
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Your email{' '}
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Which office
          <select name="office" onChange={handleChange}>
            <option value="london">London</option>
            <option value="hk">Hong Kong</option>
          </select>
        </label>
        <label>
          Message:{' '}
          <textarea name="message" required onChange={handleChange}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  )
}

export default SecondPage
