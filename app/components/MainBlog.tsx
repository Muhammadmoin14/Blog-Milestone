'use client'
import React from 'react'
import { useState , useEffect } from 'react';
import TruncateDescription from './TruncateDescription';
import ReadmoreButton from './ReadmoreButton';

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
    
    const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2024-12-26&to=2024-12-26&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
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

    <div className='pt-10'>
      {
      <div
      className="bg-[#FAFAFA] overflow-hidden flex flex-row space-x-6 pt-6  hover:scale-105"
      >
      {blog.urlToImage && (
          <img
          src={blog.urlToImage}
          alt={blog.title}
          className="w-full h-[450px] object-cover rounded-lg"
          />
      )}
      
  

  <div className="flex flex-col space-y-4 px-6">
      
      <div className="flex justify-between items-center ">
      <h6 className="text-xs font-bold text-secondary">{blog.author}</h6>
      <h6 className="text-xs font-medium text-secondarygray break-words">{new Date(blog.publishedAt).toLocaleDateString()}</h6>
      </div>
      <div className="flex flex-col space-y-4  w-full ">
      <h4 className='font-bold text-secondary break-words'>{blog.title}</h4>
      <TruncateDescription description={blog.description} wordLimit={50}/>
      <ReadmoreButton url={blog.url}/>
      </div>
  </div>
    </div>
      }
</div>
  )
}


export default MainBlog