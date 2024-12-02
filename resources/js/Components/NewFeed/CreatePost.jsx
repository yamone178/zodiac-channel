import { useForm } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { RiImageAddFill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";



const CreatePost = ({zodiacs, clickRef, closeModal}) => {
 

  const imgRef = useRef()

  const [signs, setSigns] = useState([])

  const [showImg, setShowImg] = useState([])

const {data, setData, post, processing, errors } = useForm({
    caption: '',
    images:[],
    is_banned: 0,
    zodiac_id: 1,
    tagged_zodiacs: []
    
})

function submit(e) {
    e.preventDefault()
    
    const formData = new FormData();
    console.log(data.images)
   if(data.images){
    Array.from(data.images).forEach((img, index)=>{
      formData.append(`files[${index}]`, img)
    })

   }
    closeModal()

    post(route('post.store'),{
      data: formData,
      forceFormData: true,
  
    })

    
  }

  const imgClick = () =>{
    imgRef.current.click()
  }

  const TaggedZodiacs = (id) => {
    setData('zodiac_id', id)

    const tagged_sign = zodiacs.filter(zodiac => zodiac.id == id);

   setSigns((pre)=>[...pre, tagged_sign[0]])

   setData('tagged_zodiacs', [...data.tagged_zodiacs, data.tagged_zodiacs.push(id)])
  
  }

  const delSigns =(id) =>{
    setSigns((prevSigns) => prevSigns.filter( sign=> id !== sign.id));
    setData('tagged_zodiacs', data.images.filter(sign=> id !== sign.id))
 

  }

  const delImg = (index) => {
    setShowImg((pre) => pre.filter((img, i)=> i !==index))
     setData('images', data.images.filter((img,i)=> i!== index))
  }

  const handleImage = (files) => {

    const fileArray = [...files]
    
    
  //  useEffect(()=>{
  //   console.log(data.images);
    
  //  },[data.images])
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


  return (
    <div className="fixed h-screen overflow-hidden top-0 left-0  z-10 bg-[#8080807d] w-[100%]">
        <form ref={clickRef} onSubmit={submit} 
        className='bg-white h-min top-0 bottom-0 m-auto left-0 inline-block right-0 w-[600px] p-[20px] absolute border-2 shadow-md rounded-xl'>
     
        <div className="flex items-center justify-between mb-5">
          <h2 className='text-lg font-bold '>Create Your Post</h2>
          <button className='py-2 text-white bg-gray-700 rounded-md px-9'>Upload</button>
        </div>

        <hr className='h-2 mb-3' />

        
        <textarea type="text" value={data.caption} 
        placeholder='Write Caption'
        className='w-full border-0 pb-[80px] focus:outline-none focus:ring-0'
        onChange={e=> setData('caption', e.target.value)}> </textarea>


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

              <img src={img} alt="" className='w-full h-full ' />
             </div>)
          }
       </div>

       
    </form>
    </div>
  )
}

export default CreatePost
