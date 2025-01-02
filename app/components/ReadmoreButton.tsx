import Link from 'next/link'
import React from 'react'

type Props = {
  url : string
}

const ReadmoreButton : React.FC<Props> = ({url}) => {
  return (
    <div>
        <Link href={url}> <button className="bg-transparent  w-40 h-12 rounded-md font-Raleway text-sm font-bold text-main border-main border-2  flex justify-center items-center hover:bg-main hover:text-white">
        Read More
        </button>
        </Link>
    </div>
  )
}

export default ReadmoreButton