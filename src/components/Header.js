import React from 'react'

export default () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container'>
        <a href='#' className='navbar-brand'>Fund Me</a>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarcollapse'
        >
          <span className='navbar-toggler-icon' />
        </button>

      </div>
    </nav>
  )
}
