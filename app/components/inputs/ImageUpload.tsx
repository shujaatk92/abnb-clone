"use client"

import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";
import { useCallback } from "react";

declare global {
    var cloudinary: any;
}
interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
}) => {

    const handleUpload = useCallback( (result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return(
        <CldUploadWidget 
        onUpload={handleUpload}
        uploadPreset="fjbpyitk"
        options={{
            maxFiles: 1
        }}
        >
            {({open}) => {
                return(
                    <div 
                    onClick={ () => open?.() }
                    className='flex flex-col items-center justify-center gap-4 p-20 border-dashed border-neutral-300 border-2 text-neutral-600 hover:opacity-70 transition relative cursor-pointer' 
                    >
                        <TbPhotoPlus size={50} />
                        <div className='font-semibold text-lg'>
                            Click to upload
                        </div>
                        {value && (
                            <div className='absolute w-full h-full inset-0'>
                                <Image 
                                fill
                                src={value}
                                style={{objectFit: 'cover'}}
                                alt="upload"
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}
export default ImageUpload;