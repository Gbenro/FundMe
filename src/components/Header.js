import React from 'react'


export default () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container'>
        <a href='index.html' className='navbar-brand'>
          Fund Me
        </a>
        <button
          className='navbar-toggler'
          data-toggle='collapse'
          data-target='#navbarCollapse'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <a href='index.html' className='nav-link'>
                Home
              </a>
            </li>
            <li className='nav-item active'>
              <a href='about.html' className='nav-link'>
                How It Works
              </a>
            </li>
            <li className='nav-item '>
              <a href='services.html' className='nav-link'>
                Sign In
              </a>
            </li>
            <li className='nav-item '>
              <a href='blog.html' className='nav-link'>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
