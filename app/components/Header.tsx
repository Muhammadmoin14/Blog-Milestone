'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import GetStartedButton from './GetStartedButton';
import { useUser, UserButton } from '@clerk/nextjs';


function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user , isSignedIn } = useUser()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='md:w-full  md:h-20 sm:h-16 bg-white px-4 md:px-24 sm:px-8 items-center flex justify-between'>
        <div >
          <Link href='/'>
          <h4 className='text-main font-bold font-Roboto md:text-3xl sm:text-xl'>MUHAMMAD</h4>
          </Link>
          </div>
          <div className="md:hidden">
          {isMenuOpen ? (
            <XMarkIcon
              className="h-6 w-6 text-main cursor-pointer"
              onClick={toggleMenu}
            />
            ) : (
              <Bars3Icon
                className="h-6 w-6 text-main cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>
            <ul className={`md:flex items-center md:space-x-8 ${
          isMenuOpen ? 'absolute top-16 left-0 w-full bg-white shadow-md flex flex-col space-y-4 px-8 py-4 z-50' : 'hidden'
        }`}>
                <Link href="/blog"><li className='font-Raleway font-normal text-main md:text-base'>Blog</li></Link>
                <Link href="/about"><li className='font-Raleway font-normal text-secondary md:text-base'>About</li></Link>
                <Link href="/contactus"><li className='font-Raleway font-normal text-secondary md:text-base'>Contact Us</li></Link>
                <Link href="/add-blog"><li className='font-Raleway font-normal text-secondary md:text-base'>Create</li></Link>
                <Link href="/"><li><MagnifyingGlassIcon className='h-6 w-6 text-secondary md:text-base'/></li></Link>
                {
                  isSignedIn ? (
                    <div className='flex gap-4 items-center '>
                    <div className='font-Raleway font-medium text-secondary md:text-lg '>{user?.firstName}</div>
                    <UserButton 
                    appearance={
                      {
                        elements: {
                          avatarBox: "w-10 h-10",
                        }
                      }
                    }
                    />
                    </div>
                  )
                 : (
                  <GetStartedButton/>
                )
              }
                
                
                
                
            </ul>
        
    </div>
  )
}

export default Header