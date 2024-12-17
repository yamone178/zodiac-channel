import Search from '@/Components/Search'
import FollowLayout from '@/Layouts/FollowLayout'
import React, { useEffect, useState } from 'react'
import SuggestCard from '@/Components/Follow/SuggestCard'

const Experts = ({friends}) => {

    const [mates, setMates] = useState()

    useEffect(()=>{
      setMates(friends)
    },[])
    
    
  return (
    <FollowLayout>
       <div className="p-10">
            <Search/>

            <div className="grid grid-cols-3 gap-4 mt-14">
                
                {
                    mates && mates.map((mate) =>  <SuggestCard key={mate.id} mate={mate}/>)
                }
               
               
            </div>
       </div>
    </FollowLayout>
  )
}

export default Experts
