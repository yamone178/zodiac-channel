import AdminLayout from '@/Layouts/AdminLayout'
import { usePage, Link } from '@inertiajs/react'
import React, { useRef, useState } from 'react'
import NoAccount from '../Followers/NoAccount'
import ViewZodiacMatesCard from './ViewZodiacMatesCard'
import { useOutsideClick } from '@/hooks/useOutsideClick'

const Users = ({ users, pagination }) => {

    const { auth } = usePage().props
    const [ViewCard, setViewCard] = useState(false)

    const [selectUser, setSelectUser] = useState(null)

    const clickRef = useRef()


    useOutsideClick(clickRef, () => setViewCard(false))

    const handleViewCard = (user) => {
        setViewCard(true)
        setSelectUser(user)
    }
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>}
        >
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    {users.length > 0 ? <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Profile Picture
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Email
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Zodiac Sign
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Joined At
                                        </th>

                                
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.account.email}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="text-center w-14 h-14">
                                                        <img className="object-cover h-14 w-14" src={user.profile_picture} alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.account.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.account.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.account.zodiac.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.account.joined_at}</div>
                                            </td>

                                            {/* <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.dob}</div>
                                    </td> */}

                                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleViewCard(user)}
                                                    className="text-indigo-600 hover:text-indigo-900">
                                                    View
                                                </button>
                                                {ViewCard &&

                                                    <ViewZodiacMatesCard user={selectUser} setViewCard={setViewCard} clickRef={clickRef} />}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:px-6">
                                <div className="flex justify-end gap-1">
                                    {pagination.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${link.active
                                                ? ' bg-main-900 text-white border-main-900'
                                                : 'bg-white text-gray-700 border-gray-300'
                                                } border rounded-md hover:bg-gray-50`}
                                            disabled={!link.url}
                                        >
                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> :
                        <NoAccount />}
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users
