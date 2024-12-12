import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import SideCard from '@/Components/SideCard';

import React, { useRef, useState } from 'react'
import Feed from '@/Components/NewFeed/Feed';
import ExpertRecommend from '@/Components/ExpertRecommend';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import CreatePost from '@/Components/NewFeed/CreatePost';
import HomeLayout from '@/Layouts/HomeLayout';


const Home = ({ posts, zodiacs}) => {

    
    return (
         
            <HomeLayout>
              <Feed posts={posts} zodiacs={zodiacs} />
            </HomeLayout>
       
    );
}

export default Home