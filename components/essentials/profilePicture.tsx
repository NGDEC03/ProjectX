'use client';

import Image from "next/image";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { useUser } from "@/context/userContext";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Loader2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePicture() {

    const imageRef = useRef<HTMLInputElement | null>(null);
    const { user, updateUser } = useUser();
    const { toast } = useToast();

    const [image, setImage] = useState<File | string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleImageChange = () => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    }

    useEffect(() => {
        setImagePreview(user?.Image || null);
        console.log(user)
    }, [user]);

    const handleImageUpload = async () => {
        if (!image)  {
            toast({
                title: "Error",
                description: "Please select an image to upload.",
                variant: "destructive",
            });
            return;
        }
        try {
            if (user?.Email && image) {
                setIsUploading(true);
                const formdata = new FormData();
                formdata.append("email", user?.Email);
                formdata.append("file", image);
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/image-upload`, formdata, {
                    withCredentials: true,
                });
                if (res.status == 200) {
                    toast({
                        title: "Success",
                        description: "Image uploaded successfully.",
                        duration: 3000,
                    });
                    updateUser();
                } else {
                    toast({
                        title: "Error",
                        description: "An error occurred while uploading the image.",
                        variant: "destructive",
                        duration: 3000,
                    });
                }
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "An error occurred while uploading the image.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file?.size > 1024 * 1024) {
            toast({
                title: "Error",
                description: "Image size should be less than 1MB.",
                variant: "destructive",
            });
            return;
        }
        setImage(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="h-fit p-3 w-full flex justify-center items-center space-x-3">
            <div className="w-fit relative">
                {!isUploading ?
                    <Pencil className="absolute -top-2 -right-2 h-4 w-4" onClick={handleImageChange} /> :
                    <Loader2 className="absolute -top-2 -right-2 h-4 w-4 animate-spin" />
                }
                {user?.Image ?
                    <Image
                        src={imagePreview as string}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full h-16 w-16 border"
                        unoptimized
                        fetchPriority="high"
                    /> :
                    <Avatar >
                        <AvatarImage src={imagePreview as string} />
                        <AvatarFallback className='rounded-full bg-slate-600 text-white p-2'>{user?.FirstName ? user.FirstName.substring(0, 1) : "U"}</AvatarFallback>
                    </Avatar>
                }
                <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleFileChange}
                    hidden
                />
            </div>
            <Button onClick={handleImageUpload} disabled={isUploading}><Check /></Button>
        </div>
    )
}