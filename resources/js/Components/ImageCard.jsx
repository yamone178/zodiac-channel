import React from 'react'
import { AiTwotoneEdit } from "react-icons/ai";


const ImageCard = ({pf, showUpdateForm, className, imgClass}) => {

  
  

  return (
    <div className={` w-[100px] h-[100px]  relative ${className}`}>
    <img src={pf} alt="" className={`object-cover w-full h-full rounded-full ${imgClass}`}/>

            {
            route().current('home') &&  <div  onClick={showUpdateForm} className="absolute bottom-0 right-0 p-1 bg-white border rounded-full cursor-pointer border-main-900 hover:bg-main-900">
            <AiTwotoneEdit className=' text-[20px] text-main-900  hover:text-white ' />

                </div>
            }
            
</div>
  )
}

export default ImageCard
