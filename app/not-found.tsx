import React from 'react'
import HomeButton from './components/HomeButton'

function notfound() {
  return (
    <div className='bg-[#FAFAFA] flex justify-center items-center w-full h-lvh'> 
      <div className='bg-main w-[816px] h-[472px] flex justify-center items-center shadow-lg rounded-md flex-col space-y-8'>
      <h1 className='text-white text-9xl'>404</h1>
      <div className='flex flex-col space-y-2 items-center'>
      <h4 className='font-normal'>Sorry!</h4>
      <h4 className='font-normal'>
      The link is broken, try to refresh or go to home</h4>
      </div>
      <div>
        <HomeButton/>
      </div>
      </div>
    </div>
  )
}

export default notfound