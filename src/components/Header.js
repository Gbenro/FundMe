import React from 'react'
import Link from 'next/link'

export default () => {
  return (
    <div className='ui inverted menu'>
      <Link href='/'>
        <a className='active grey item'>Home</a>
      </Link>

      <div className='right menu'>
        <Link href=''>
          <a className='grey item'>How It Works</a>
        </Link>
        <Link href='/contact'>
          <a className='grey item'>Contact</a>
        </Link>
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
