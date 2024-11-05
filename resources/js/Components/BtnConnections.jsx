import React from 'react'

const BtnConnections = ({children}) => {
  return (
    <div className='flex items-center justify-between p-3 mt-5 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200'>
        {children}
    </div>
  )
}

export default BtnConnections