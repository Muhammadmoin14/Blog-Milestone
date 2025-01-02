import Link from 'next/link'
import React from 'react'


function ContactButton() {
  return (
    <div>
        <Link href='/contactus'> <button className="bg-main hover:bg-white hover:border-main hover:text-main hover:border-2  md:w-44 md:h-12 sm:w-28 sm:h-10 sm:rounded-sm md:rounded-md font-Raleway md:text-base sm:text-sm font-semibold text-white flex justify-center items-center transition-all duration-300">
        Contact Us
        </button>
        </Link>
    </div>
  )
}

export default ContactButton