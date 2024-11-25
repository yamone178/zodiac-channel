import React from 'react'
import Post from './Post'

const Feed = ({posts, zodiacs}) => {

 

  return (
    <div className='flex flex-col gap-3'>
      {
        posts&& posts.map((post)=> <Post key={post.id} post={post} zodiacs={zodiacs}/> )
      }
      
    </div>
  )
}

export default Feed
