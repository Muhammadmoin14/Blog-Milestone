import Link from 'next/link'
import React from 'react'


function ViewmoreButton() {
  return (
    <div>
        <Link href='/blog'> <button className="bg-main hover:bg-transparent hover:border-main hover:border-2 hover:text-main  md:w-44 md:h-12 sm:w-28 sm:h-10 rounded-md font-Raleway md:text-base sm:text-sm  md:font-semibold font-medium text-white flex justify-center items-center ">
        View More
        </button>
        </Link>
    </div>
  )
}

export default ViewmoreButton