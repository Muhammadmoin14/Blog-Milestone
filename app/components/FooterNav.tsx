import Link from 'next/link'
import React from 'react'

function FooterNav() {
  return (
    <div className='flex items-center space-x-10'>
        <Link href='/'><h4 className='text-base font-normal text-black'>Home</h4></Link>
        <Link href='/blog'><h4 className='text-base font-normal text-black'>Blog</h4></Link>
        <Link href='/about'><h4 className='text-base font-normal text-black'>About</h4></Link>
        <Link href='/contactus'><h4 className='text-base font-normal text-black'>Contact Us</h4></Link>
    </div>
  )
}

export default FooterNav