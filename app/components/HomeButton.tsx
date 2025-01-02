import Link from 'next/link'
import React from 'react'


function HomeButton() {
  return (
    <div>
        <Link href='/'> <button className="bg-[#FAFAFA]  w-44 h-14 rounded-md font-Raleway text-base font-semibold text-black flex justify-center items-center ">
        Go to Home
        </button>
        </Link>
    </div>
  )
}

export default HomeButton