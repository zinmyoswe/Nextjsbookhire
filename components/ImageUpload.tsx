"use client";

import config from '@/lib/config'
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next';
import Image from 'next/image';
import ImageKit from 'imagekit';
import { toast } from "@/hooks/use-toast";


const{
    env: {
        imagekit: {publicKey, urlEndpoint},
    },
} = config;

const authenticator = async () => {
  try{
      const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
  
      if(!response.ok){
        const errorText = await response.text();

        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();

      const { singature, expire, token } = data;

      return { token, expire, singature} ;
    }
  catch(error: any){
    throw new Error(`Authentication request failed: ${error.message}`);
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {

  const ikUploadRef = useRef(null);
  const [file, setFile ] = useState<{ filePath: string} | null>
  (null);

  const onError = (error: any) => {
    console.log(error);

    toast({
          title: "Image Upload failed",
          description: `image cannot be upload. please try again`,
          variant: "destructive",
        });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
          title: "Image Upload Successfully",
          description: `${res.filePath} uploaded successfully!`,
        });
  };

  return(
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload 
        className='hidden' 
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='test-upload.png'  
      />

      <button
        className='upload-btn'
        onClick={(e) => {
          e.preventDefault();

          if(ikUploadRef.current){
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image 
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className='object-contain'
        />

        <p className='text-base text-light-100'>Upload a File</p>
        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file && (
           <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
      )}
    </ImageKitProvider>
  );
}

export default ImageUpload
