import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const submitImage = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={submitImage}
      uploadPreset="i9gbpimn"
      options={{
        maxFiles: 3,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className=" relative 
            cursor-pointer 
            hover:opacity-70
             transition
              border-dashed 
              border-2 p-20
               border-neutral-300 
               flex 
               flex-col 
               justify-center
                items-center 
                gap-4
                 text-neutral-600"
          >
            <TbPhotoPlus />
            <div className=" font-semibold text-lg text-red-500">
              Cick to upload
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
