import React, { useState } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'

const Slider = (images) => {

    const [currentIndex, setCurrentIndex] = useState(1)

    const previous = () => {
        console.log('hello')
        if (currentIndex > 1) {
            setCurrentIndex(currentIndex - 1)
        }

    }
    const forward = () => {
        if (currentIndex < images.images.length) {
            setCurrentIndex(currentIndex + 1)
        }
    }
    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-md">
            <div className="absolute z-10 px-2 text-sm text-center text-white bg-gray-600 rounded-full right-5 top-5">
                <span>
                    {currentIndex}
                </span>/<span >
                    {images.images.length}
                </span>
            </div>

            <button
                onClick={previous}
                className="absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md left-5 top-1/2 h-11 w-11">
                <GoArrowLeft className="text-2xl font-bold text-gray-500 " />
            </button>

            <button
                onClick={forward}
                className="absolute z-10 flex items-center justify-center -translate-y-1/2 bg-gray-100 rounded-full shadow-md right-5 top-1/2 h-11 w-11">
                <GoArrowRight className="text-2xl font-bold text-gray-500 " />
            </button>
            <div className="relative" >
                {
                    images && images.images.map((image, index) => <div key={index} className="">
                        {
                            currentIndex == index + 1 &&
                            <img src={image} alt="image" className='w-atuo rounded-lg max-h-[400px] m-auto' />
                        }
                    </div>)}
            </div>
        </div>
    )
}
export default Slider
