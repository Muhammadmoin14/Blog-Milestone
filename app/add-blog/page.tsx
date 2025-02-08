'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
// import SkeletonLoader from "../components/skeletonloader";

// Define the schema for the form using zod
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(25, "Title must be at most 100 characters long")
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters long")
    .max(300, "Description must be at most 300 characters long"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters long"),
  tags: z
    .string()
    .regex(/^[a-zA-Z0-9, ]*$/, "Tags should only contain letters, numbers, and commas"),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file === null || file.size <= 5 * 1024 * 1024, "Image must be less than 5MB"),
});

interface ImageAsset {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}

interface NewBlog {
  _type: "blog";
  title: string;
  description: string;
  content: string;
  tags: string[];
  author: string;
  publishedAt: string;
  image?: ImageAsset;
}

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
    image: null as File | null,
  });

  const router = useRouter();
  const {user} = useUser()

  // react-hook-form setup with zod
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if file exists before proceeding
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      setValue("image", file);
    }
  };
  const previewData = watch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: { title: string; description: string; content: string;  tags: string; image: File | null; }) => {
    if (!user?.fullName && !user?.firstName) { 
      alert("User not logged in or missing name!");
      return;
    }
    const newBlog: NewBlog = {
      _type: "blog",
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags.split(",").map(tag => tag.trim()), // Ensure 'tags' is a string and split it
      author: user.fullName || user.firstName || 'anonymous' ,
      publishedAt: new Date().toISOString(),
    };

    try {
      // Upload image if provided
      if (data.image) {
        const imageAsset = await client.assets.upload("image", data.image); // Ensure 'image' is uploaded as an asset
        newBlog.image = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        };
      }

      // Create the new blog in Sanity
      await client.create(newBlog);
      alert("Blog submitted successfully!");
      router.push("/");
    } catch (err) {
      console.error("Sanity error:", err);
      alert("Submission failed! Please try again.");
    }
  };

  // Only render the form after mounted
  if (!mounted) return <p>loading</p>;

  return (
    <div className="w-full h-full flex items-center justify-center py-24 ">
      <div className="max-w-2xl mx-auto shadow-lg rounded-xl p-8 w-full md:max-w-[600px] bg-white ">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Add a New Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          <div>
            <textarea
              placeholder="Content"
              {...register("content")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              {...register("tags")}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.tags && <p className="text-red-500">{errors.tags.message}</p>}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          <button type="submit" className="w-full bg-purple-700 text-white p-3 rounded-md hover:bg-purple-800 transition font-semibold">
            Submit
          </button>
        </form>
      </div>
      
      {/* Preview */}
      <div className="w-full max-w-2xl mx-auto mt-8 shadow-lg rounded-2xl p-8 bg-white ">
        <h2 className="font-bold text-xl text-purple-700 mb-4">Blog Preview</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-secondary">{previewData.title.charAt(0).toUpperCase() + previewData.title.slice(1)}</h3>
            <div className="flex items-center space-x-4 justify-between pt-2">
            <p className="text-sm text-secondarygray">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-secondarygray">{user?.fullName}</p>
            </div>
          </div>

          {previewData.image && (
          <div className="w-full h-80  rounded-lg my-4  relative" >
          <Image
            src={previewData.image instanceof File 
              ? URL.createObjectURL(previewData.image) 
              : ""}
            alt="Preview"
            // width={600}
            // height={400}
            objectFit="contain"
            layout="fill"
            
            />
            </div>
            )}


          <p className="text-gray-700 break-words whitespace-pre-wrap overflow-hidden">{previewData.description}</p>

          <div className="flex flex-wrap space-x-2">
            {previewData.tags.split(",").map((tag, index) => (
              <span key={index} className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{tag.trim()}</span>
            ))}
          </div>

          <p className="mt-4 text-gray-800 break-words whitespace-pre-wrap overflow-hidden">{previewData.content}</p>
        </div>
      </div>
    </div>
  );
}

