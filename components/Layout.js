import React from 'react'

export default props => {
  return (
    <div>
      <h1>I am a header</h1>
      {props.children}
      <h1>I am a Footor</h1>
    </div>
  )
}
