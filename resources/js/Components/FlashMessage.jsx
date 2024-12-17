import React from 'react'

const FlashMessage = ({message}) => {
  return (
    <div className='absolute px-4 py-2 bg-main-bright/50 text-white border right-0 border-main-bright top-[5px]'>
        <p className='text-xl '>{message}</p>
    </div>
  )
}

export default FlashMessage
