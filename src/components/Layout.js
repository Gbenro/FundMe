import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default props => {
  return (
    <div className='ui container'>
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css'
      />
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
