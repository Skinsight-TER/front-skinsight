'use client';

import {CldUploadWidget} from 'next-cloudinary';
import { useState } from 'react';

export default function Drive() {
  const [selectImage, setSelectedImage] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return(
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='text-2xl'>Upload your Image</div>
      
    </div>
  )
}