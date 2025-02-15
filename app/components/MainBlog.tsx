'use client'
import React from 'react'
import { useState , useEffect } from 'react';
import TruncateDescription from './TruncateDescription';
import ReadmoreButton from './ReadmoreButton';
import Image from 'next/image';

type Blog = {
    id: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

type Props = {
    mainblog: number;
}



const MainBlog : React.FC<Props> = ({mainblog}) => {

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  setLoading(true)

  const fetchBlog = async () =>  {

  
  try {
    
    const response = await fetch(`/api/news?q=apple&from=2025-01-31&to=2025-01-31&sortBy=popularity`)
    const data = await response.json()
    
    const articlesWithId = data.articles.map((article: Blog, index: number) => ({
      ...article,
      id: index.toString(),
      

    }));  
    setBlog(articlesWithId[mainblog])
  } 

  catch (error) {
    console.error('fetching error', error)
  }
  finally {
    setLoading(false)
  }
}
  
fetchBlog();
  
}, [mainblog]);

if (loading) {
  return <p className='hidden'>Loading...</p>;
}

if (!blog) {
  return <p>No blog found</p>;
}

  return (

    <div className="pt-10">
  <div className="bg-[#FAFAFA] overflow-hidden flex flex-row space-x-6 pt-6 hover:scale-105">
    {blog.urlToImage && (
      <div className="relative w-1/2 h-[450px]">
      <Image
        src={blog.urlToImage}
        alt={blog.title}
        fill
        style={{ objectFit: "cover" }}
        className="rounded-lg"
        priority
      />
    </div>
    
    )}

    <div className="flex flex-col space-y-4 px-6 w-1/2">
      <div className="flex justify-between items-center">
        <h6 className="text-xs font-bold text-secondary">{blog.author}</h6>
        <h6 className="text-xs font-medium text-secondarygray break-words">
          {new Date(blog.publishedAt).toLocaleDateString()}
        </h6>
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <h4 className="font-bold text-secondary break-words">{blog.title}</h4>
        <TruncateDescription description={blog.description} wordLimit={50} />
        <ReadmoreButton url={blog.url} />
      </div>
    </div>
  </div>
</div>
  )
}


export default MainBlog