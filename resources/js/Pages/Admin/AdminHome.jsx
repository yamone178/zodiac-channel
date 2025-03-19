import AdminLayout from '@/Layouts/AdminLayout'
import { usePage } from '@inertiajs/react'
import React from 'react'
import CountCard from './CountCard'

const AdminHome = ({totalUsers, experts, users}) => {

    const {auth} = usePage().props

  return (
    <AdminLayout
        user ={auth.user}
        header={<h2 className="text-xl font-semibold leading-tight text-gray-800">HomeLayout</h2>}

    >
        <div className="flex justify-center gap-8 my-4">
            <CountCard title="Total Users" count={totalUsers} />
            <CountCard title="Zodiac Mates" count={users} />
            <CountCard title="Experts" count={experts} />
        </div>
    </AdminLayout>
  )
}

export default AdminHome
