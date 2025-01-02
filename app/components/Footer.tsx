import React from 'react'
import FooterNav from './FooterNav'

function Footer() {
  return (
    <div className='w-full h-full flex flex-col space-y-8 bg-white pt-16 pb-10 items-center'>
        <div><h2 className='text-main font-Roboto font-bold md:text-[52px] sm:text-3xl'>MUHAMMAD</h2></div>
        <div><FooterNav/></div>
        <div className='border border-secondarysilver rounded-md w-[80%] my-10'></div>
        <div><h4 className='text-black font-normal text-base max-md:text-sm max-md:text-center   '>Copyright MuhammadBlogHackhton © 2025. All Right Reserved</h4></div>
    </div>
  )
}

export default Footer