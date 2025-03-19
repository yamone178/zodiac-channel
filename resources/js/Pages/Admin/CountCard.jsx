import React from 'react'

const CountCard = ({title, count}) => {
  return (
    <div className=' w-[300px]  bg-white shadow-md rounded-lg p-7 text-center'>
        <h1 className='mb-3 text-2xl font-bold text-main-900'>{title}</h1>
        <h3 className='text-2xl font-bold'>{count}</h3>
    </div>
  )
}

export default CountCard
