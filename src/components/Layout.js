import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Head from 'react-helmet'

export default props => {
  return (
    <div className='ui container'>
      <Head />
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css'
      />
      <script src='https://apis.google.com/js/api.js' />
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
