'use client';

import cloudinary from '@/lib/cloudinaryConfig';
import {CldUploadWidget, CldImage} from 'next-cloudinary';
import { useState } from 'react';

async function uploadImageToCloudinary(file: string | Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'skinsight_upload');

  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  if (!cloudinaryUrl) {
    throw new Error("Cloudinary URL is not defined in environment variables.");
  }

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url; // Retourne l'URL de l'image si l'upload réussit
  } catch (error) {
    console.error('Upload error:', error);
    throw error; // Lance l'erreur pour que la fonction retourne toujours une Promise
  }
}

export default function Drive({ onImageUpload }: { onImageUpload: (url: string) => void }) {
  const [selectImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      }
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };
  
  const handleUpload = async () => {
    if (selectImage) {
      const imageUrl = await uploadImageToCloudinary(selectImage);
      console.log('Uploaded Image Url', imageUrl);
      if (imageUrl) {
        onImageUpload(imageUrl);
      }
    }
  }

  return(
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='text-2xl'>Ajoutez votre image ici</div>
      {previewUrl && (
        <img src={previewUrl} alt='PReview' width={350} height={150} className='rounded-xl my-5'/>
      )}
      <input type='file' onChange={handleImageChange}/>
      <button onClick={handleUpload} className='bg-main-green px-2 py-2 my-2 rounded-lg'>Importez votre image</button>
    </div>
  )
}