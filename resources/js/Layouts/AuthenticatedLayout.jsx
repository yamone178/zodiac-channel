import { useEffect, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import { BiHome } from "react-icons/bi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { TbUserStar } from "react-icons/tb";
import { RiStarLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { flash } = usePage().props
    const [lastMessage, setLastMessage] = useState(null)
    const notify = (message) => toast.success(message);
    const { globalSearchData } = usePage().props;

    useEffect(() => {
        if (flash?.message) {
            console.log(flash.message);

            notify(flash.message)
            setLastMessage(flash.message)
        }
    }, [flash])


    return (
        <div className="min-h-screen bg-main-bg ">
            <nav className="sticky top-0 z-10 border-gray-100 bg-white/50 backdrop-blur-xl">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex">
                            <div className="flex items-center shrink-0">
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
                                            className="text-purple-600"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    </div>
                                </Link>
                                <Search searchUsers={globalSearchData} />
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink className=' text-main-900' href={route('home')} active={route().current('home')}>
                                    <BiHome fontSize="27px" />
                                    <p className='mt-3'>Home</p>
                                </NavLink>

                                <NavLink className=' text-main-900' href={route('horoscope')} active={route().current('horoscope')} >
                                    <RiStarLine fontSize="27px" />
                                    <p className='mt-3'>My Horoscope</p>
                                </NavLink>

                                <NavLink className=' text-main-900' href={route('zodiac-mate')} active={route().current('zodiac-mate')} >
                                    <LiaUserFriendsSolid fontSize="27px" />

                                    <p className='mt-3'>Zodiac Mates</p>
                                </NavLink>

                                <NavLink className=' text-main-900' href={route('expert')} active={route().current('expert')}>
                                    <TbUserStar fontSize="27px" />
                                    <p className='mt-3'>Experts</p>
                                </NavLink>


                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.view')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
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
                        <ResponsiveNavLink href={route('home')} active={route().current('dashboard')}>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('horoscope')} active={route().current('dashboard')}>
                            Horoscope
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('zodiac-mate')} active={route().current('dashboard')}>
                            Zodiac Mates
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('expert')} active={route().current('dashboard')}>
                            Experts
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.view')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {
                <ToastContainer />
            }
        
            <main>{children}</main>
        </div>
    );
}
