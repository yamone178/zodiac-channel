

import React, { useRef, useState } from 'react'
import Feed from '@/Components/NewFeed/Feed';
import HomeLayout from '@/Layouts/HomeLayout';


const Home = ({ posts, zodiacs}) => {

    
    return (
         
            <HomeLayout>
              <Feed posts={posts} zodiacs={zodiacs} />
            </HomeLayout>
       
    );
}

export default Home