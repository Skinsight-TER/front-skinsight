'use client';

import cloudinary from '@/lib/cloudinaryConfig';
import {CldUploadWidget, CldImage} from 'next-cloudinary';
import { useState } from 'react';

async function uploadImageToCloudinary(file: string | Blob) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'skinsight_upload');

  try {
    // Assurez-vous que la variable d'environnement est lue correctement
    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    if (!cloudinaryUrl) {
      throw new Error("Cloudinary URL is not defined in environment variables.");
    }

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Uploaded Image URL:', data.secure_url);
    // Ici, vous pouvez définir l'URL de l'image dans l'état pour l'afficher ou le stocker
  } catch (error) {
    console.error('Upload error:', error);
  }
}

export default function Drive() {
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
  
  const handleUpload = () => {
    if (selectImage) {
      uploadImageToCloudinary(selectImage);
    }
  }

  return(
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='text-2xl'>Ajoutez votre image ici</div>
      {previewUrl && (
        <img src={previewUrl} alt='PReview' width={350} height={150}/>
      )}
      <input type='file' onChange={handleImageChange}/>
      <button onClick={handleUpload}>Upload to Cloudinary</button>
    </div>
  )
}