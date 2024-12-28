import AdminLayout from '@/Layouts/AdminLayout'
import { usePage } from '@inertiajs/react'
import React from 'react'

const AdminHome = () => {

    const {auth} = usePage().props

  return (
    <AdminLayout
        user ={auth.user}
        header={<h2 className="text-xl font-semibold leading-tight text-gray-800">HomeLayout</h2>}

    >
        <h2>Hello</h2>
    </AdminLayout>
  )
}

export default AdminHome
