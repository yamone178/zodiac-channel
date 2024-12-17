import { formatDistance, formatDistanceToNow, subDays } from 'date-fns'
import React, { useEffect, useState } from 'react'

const DateFormat = ({initialTimeStamp}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second
        return () => clearInterval(timer); // Cleanup on unmount
    },[])
  
    const relativeTime = formatDistanceToNow(new Date(initialTimeStamp), { addSuffix: true });


  return (
    <p className='text-sm text-gray-600'>
        {relativeTime}
    </p>
  )
}

export default DateFormat
