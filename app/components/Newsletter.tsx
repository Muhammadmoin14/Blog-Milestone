import React from 'react'

function Newsletter() {
  return (
    <div className='bg-main w-full md:h-[534px] sm:h-auto flex flex-col justify-center items-center sm:space-y-6 md:space-y-10 max-md:py-16'>
        <div>
        <h2 className='font-bold text-center md:text-[52px] text-2xl md:leading-none'>Get our stories delivered From <br/> us to your inbox weekly.</h2>
        </div>
        <div className='flex items-center md:space-x-6 space-x-2 max-md:px-4'>
            <input type="text" placeholder='Your Email' className='md:w-80 md:h-14 w-full h-12 p-4 bg-white focus:outline-none rounded-lg ' />
            <button className='bg-transparent text-white p-2 rounded-lg border-2 border-white md:font-bold font-medium max-md:text-sm md:w-40 md:h-14 sm:w-44 sm:h-12 transition-all duration-300 '>Get Started</button>
        </div>
        <div>
            <h4 className='text-base font-normal text-center max-md:px-2'>Get a response tomorrow if you submit by 9pm today. If we received after <br/> 9pm will get a reponse the following day.</h4>
        </div>
        </div>
    
  )
}

export default Newsletter