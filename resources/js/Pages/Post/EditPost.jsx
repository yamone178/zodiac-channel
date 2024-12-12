import { useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { RiImageAddFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { router } from '@inertiajs/react'




const EditPost = ({singlePost, clickRef, setShowEditForm}) => {
 

  const imgRef = useRef()

  const [signs, setSigns] = useState(singlePost.zodiacs)

  const [showImg, setShowImg] = useState(singlePost.images)

  const {zodiacs} = usePage().props

  console.log(singlePost);

 
 
  

const {data, setData, post, processing, errors } = useForm({
    caption: singlePost.caption,
    images:singlePost.images,
    is_banned: 0,
    zodiac_id: singlePost.account.zodiac_id,
    tagged_zodiacs: singlePost.zodiacs.map(zodiac=> zodiac.id),
    del_images: [] 
})
console.log(data.tagged_zodiacs);


function update(e) {
    e.preventDefault()
    
    const formData = new FormData();
    console.log(data.images)
   if(data.images){
    Array.from(data.images).forEach((img, index)=>{
      formData.append(`files[${index}]`, img)
    })

   }
   setShowEditForm(false)

    router.post(route('post.update', singlePost.id),{
     _method: 'patch',
      data: data,
      forceFormData: true,
  
    })

    
  }

  const imgClick = () =>{
    imgRef.current.click()
  }

  const TaggedZodiacs = (id) => {

    console.log(id, data.tagged_zodiacs);  // return  [1, 2, 3, 4, 5]
    
    // setData('zodiac_id', id)

    const tagged_sign = zodiacs.filter(zodiac => zodiac.id == id);

    if (tagged_sign) {
      setSigns((pre)=>[...pre, tagged_sign[0]])

    }

   
   setData('tagged_zodiacs', [...data.tagged_zodiacs.map(Number), Number(id)])  
  }

  const delSigns =(id) =>{
    setSigns((prevSigns) => prevSigns.filter( sign=> id !== sign.id));
    setData('tagged_zodiacs', data.tagged_zodiacs.filter(sign=> id !== sign))

  }

  const delImg = (index) => {
    console.log(index);
    
    setShowImg((pre) => pre.filter((img, i)=> i !==index))
     setData('images', data.images.filter((img,i)=> i!== index))
      setData('del_images',[...data.del_images, index])
     console.log(data.del_images);
  }

  const handleImage = (files) => {

    const fileArray = Array.from(files);
    
   
    const newImages = [...data.images, ...fileArray];
    setData('images', newImages);

    const imagePromises = fileArray.map((file)=>{
      // setData('images', [...data.images, file]);

      return new Promise((resolve)=>{
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file)
      })      

    })

    Promise.all(imagePromises).then((images) => {
    
      setShowImg((prevImages) => [...prevImages, ...images]); // Add all images to state
  });
};

console.log(data.tagged_zodiacs);

  return (
    <div className="fixed h-screen overflow-hidden top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
        <form ref={clickRef} onSubmit={update} 
        className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[600px] p-[20px] absolute border-2 shadow-md rounded-xl'>
     
        <div className="flex items-center justify-between mb-5">
          <h2 className='text-lg font-bold '>Edit Your Post</h2>
          <button className='py-2 text-white bg-gray-700 rounded-md px-9'>Update</button>
        </div>

        <hr className='h-2 mb-3' />

        
        <textarea type="text" value={data.caption} 
        placeholder='Write Caption'
        className='w-full border-0 pb-[80px] focus:outline-none focus:ring-0'
        onChange={e=> setData('caption', e.target.value)}>
           {data.caption}
        </textarea>


        <div className="flex gap-2 mb-5">
          {
            signs.map((sign)=> <p key={sign.id} className=' gap-2 text-gray-600 px-[6px] py-[2px] bg-yellow-100 rounded-md flex items-center'>
              <span className='text-[13px]'>@ {sign.name}</span> 
               <IoIosClose 
               onClick={()=>delSigns(sign.id)}
               fontSize="20px" className='font-semibold cursor-pointer'/>

              </p>)
          }
        </div>

       
       <div className="flex items-center gap-5">
        <RiImageAddFill  onClick={imgClick} className=' imgInput text-[35px] text-gray-700 cursor-pointer' />

          <input 

          hidden ref={imgRef} 
          type="file" multiple 
          onChange={e=>handleImage(e.target.files)} />
          
          <select
            placeholder="tagged zodiac"
            id="zodiac"                    
      
          className=" inline-block w-[110px] py-[3px] px-[10px] mt-1 text-[14px] rounded-lg "
          onChange={(e) => TaggedZodiacs(e.target.value)}
          required
          >

              {
              zodiacs.map((zodiac)=> <option key={zodiac.id} value={zodiac.id}>{zodiac.name}</option>)
              } 
          </select>
       </div>

       <div className="flex flex-wrap gap-2 image-viewer">
          {
             showImg && showImg.map((img,index)=> <div key={index} className=' w-[180px] h-[180px] object-cover'>
               <IoIosClose 
               onClick={()=>delImg(index)}
               fontSize="20px" className='font-semibold cursor-pointer'/>

              <img src={img} alt="" className='w-auto h-[100px] ' />
             </div>)
          }
       </div>

       
    </form>
    </div>
  )
}

export default EditPost
