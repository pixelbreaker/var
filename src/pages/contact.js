import React from 'react'

import Layout from '../components/layout'

const SecondPage = () => (
  <Layout>
    <form action="/thankyou" method="POST" data-netlify="true">
      <label>
        Your name <input type="text" name="name"></input>
      </label>
      <label>
        Your email <input type="email" name="email"></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  </Layout>
)

export default SecondPage
