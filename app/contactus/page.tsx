import React from 'react'
import { HomeIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function page() {
  return (
    <div className='bg-[#FAFAFA] w-full md:h-lvh h-full md:py-24 md:px-24 sm:py-24 sm:px-4 flex flex-col space-y-10'>
        <div className='flex flex-col space-y-4 items-center '>
            <h2 className='text-secondary max-md:text-3xl'>Get in touch</h2>
            <h6 className='text-secondarysilver text-base text-center'>Contact us to publish your content and show ads to our website and get a good reach.</h6>
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 md:gap-1 sm:gap-2 w-full'>
        <div className='w-[370px] h-[240px] bg-white flex flex-col space-y-4 justify-center items-center rounded-md hover:scale-105 '>
            <div className='w-16 h-16 rounded-full bg-main flex items-center justify-center'><HomeIcon className='w-7 h-7 text-white stroke-1'/></div>
            <h6 className='text-main font-bold'>Office</h6>
            <h6 className='text-secondarysilver text-base '>XYZ Area Office No 123, City, Country</h6>
        </div>
        <div className='w-[370px] h-[240px] bg-white flex flex-col space-y-4 justify-center items-center rounded-md hover:scale-105'>
            <div className='w-16 h-16 rounded-full bg-main flex items-center justify-center'><EnvelopeIcon className='w-7 h-7 text-white stroke-1'/></div>
            <h6 className='text-main font-bold'>Email</h6>
            <h6 className='text-secondarysilver text-base '>Muhammadmoin631@gmail.com</h6>
        </div>
        <div className='w-[370px] h-[240px] bg-white flex flex-col space-y-4 justify-center items-center rounded-md hover:scale-105'>
            <div className='w-16 h-16 rounded-full bg-main flex items-center justify-center'><PhoneIcon className='w-7 h-7 text-white stroke-1'/></div>
            <h6 className='text-main font-bold'>Phone</h6>
            <h6 className='text-secondarysilver text-base '>+92-312-2348010</h6>
        </div>
        </div>

    </div>
  )
}

export default page