import React, { useRef, useState } from 'react'

import { usePage } from '@inertiajs/react';
import HomeLayout from '@/Layouts/HomeLayout';
import AllComments from '@/Components/Comments/AllComments';
import Post from '@/Components/NewFeed/Post';

const Show = ({post}) => {
   
    const {zodiacs} = usePage().props;
    
    return (
     
        <HomeLayout>
          
                <Post zodiacs={zodiacs} post={post}/>

                {
                    post.comments.map((comment)=>
                          <AllComments key={comment.id} comment={comment} account_id={comment.account_id} />
                )
                }


            </HomeLayout>
   
    );
}

export default Show
