import { Link } from '@inertiajs/react'
import React, { useState } from 'react'
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { NavLink } from 'react-router';

const NavBeforeLogin = () => {
        const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
  return (
    <nav className="sticky top-0 z-10 text-white bg-black/95 backdrop-blur-xl">
    <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between">
            <div className="flex">
                <div className="flex items-center justify-between shrink-0">
                <Link href="#" className="flex items-center gap-2">
                    <div className="w-8 h-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  
                    </div>
                    <h2 className='text-xl font-extrabold'>Zodiac Channel</h2>
                </Link>
                  
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    {/* <a href="" className='text-white'  >
                      
                            <p className='mt-3'>Home</p>          
                    </a>

                    <a href=''  className='text-white'  >
                          
                            <p className='mt-3'>My Horoscope</p>
                    </a>

                    <a href=''  className='text-white' >
                       

                            <p className='mt-3'>Zodiac Mates</p>
                    </a> */}
                 
                </div>
            </div>

            <div className="flex items-center justify-center gap-5">
                <button>
                    <Link href="/register" className='px-5 py-2 text-black bg-white rounded-md'>Register</Link>
                </button>

                <button>
                    <Link href="/login" className='px-5 py-2 text-black bg-white rounded-md'>Login</Link>
                </button>
            </div>
               
           
                  

           
            <div className="flex items-center -me-2 sm:hidden">
                <button
                    onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                    className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                >
                    <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path
                            className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
            </ResponsiveNavLink>
        </div>

       
    </div>
</nav>
  )
}

export default NavBeforeLogin
