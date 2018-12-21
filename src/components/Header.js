import React from 'react'

export default () => {
  return (
    <div className='ui inverted menu'>
      <a className='active grey item'>Home</a>
      <a className='grey item'>How It Works</a>
      <a className='grey item'>Friends</a>

      <div className='right menu'>
        <div className=' grey item'>
          <div className='ui icon input'>
            <input type='text' placeholder='0X00...' />
            <i className='search link icon' />
          </div>
        </div>
        <a className='ui  grey item'>Log In</a>
      </div>
    </div>
  )
}
