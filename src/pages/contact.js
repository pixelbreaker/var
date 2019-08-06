import React from 'react'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <form name="contact" action="/thank-you" method="POST" data-netlify="true">
      <label>
        Your name <input type="text" name="name"></input>
      </label>
      <label>
        Your email <input type="email" name="email"></input>
      </label>
      <label>
        Which office
        <select name="office[]">
          <option value="london">London</option>
          <option value="hk">Hong Kong</option>
        </select>
      </label>
      <label>
        Message: <textarea name="message"></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  </Layout>
)

export default SecondPage
