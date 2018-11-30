import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default props => {
  return (
    <div>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
        crossOrigin='anonymous'
      />
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
