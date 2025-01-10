import React, { useRef, useState } from 'react'


import testImg from '../../../../public/assets/images/test.jpg'
import { TbZodiacTaurus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoStar } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { Link, usePage } from '@inertiajs/react';
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
