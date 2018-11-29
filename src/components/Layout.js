import React from 'react'
export default props => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}
