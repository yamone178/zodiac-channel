import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';


const Index = ({ result, name }) => {

  const { auth, zodiacs } = usePage().props;

  console.log(result);


  const [loading, setLoading] = useState(false);



  if (loading == true) {
    return <h2>Loading</h2>
  }

  return (
    <HomeLayout>

      {
        result !== null && <div className=" w-full md:w-[550px] rounded-xl bg-white border border-main-bright p-[50px]">

          <div className="">
            <h2 className='text-xl font-bold text-center text-main-900 '>Your Daily Horoscope</h2>
          </div>

          <div className="flex justify-between mt-8">
            <p className='font-bold text-main-bright '>{name}</p>
            <h4 className=''>Date -  {result.date}</h4>
          </div>

          <p className='mt-8 text-justify'>
            {result.horoscope_data}
          </p>


        </div>
      }

    </HomeLayout>
  )
}

export default Index
