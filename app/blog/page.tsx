'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import TruncateDescription from '../components/TruncateDescription';
import Link from 'next/link';



type datatype = {
    id: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}




const Page = () => {

    const [articles, setarticle] = useState<datatype[]>([]);
    const [visibleCount , setvisibleCount] = useState(3)
    const [loading , setLoading] = useState<boolean>(true);


        useEffect(()=>{
          setLoading(true)

            const fetchData = async ()=>{ 
                try {
                    const response = await fetch(`/api/news?q=apple&from=2024-12-26&to=2024-12-26&sortBy=popularity`)
                    const data = await response.json()
                    
                    const articlesWithId = data.articles.map((article: datatype, index: number) => ({
                        ...article,
                        id: index.toString(),
                        
                    }));
                    
                    setarticle(articlesWithId)
                    

                } catch (error) {
                    console.error('fetching error', error)
                } finally {
                  setLoading(false)
                }
                
    }

    fetchData()
    

    },[])

    const handleShowMore = () => {
        setvisibleCount((prev) => prev + 6) 
    }

    console.log(articles)

  

    return (
    <div className="w-full h-full bg-[#FAFAFA] py-24 max-md:px-4 items-center flex flex-col  space-y-6">
        <h4 className="text-secondarygray text-base  font-bold">OUR BLOGS</h4>
        <h3 className="text-secondary font-bold max-md:text-3xl text-center">
        Find our all blogs from here
        </h3>
        <h4 className="text-secondarygray text-base  font-normal text-center max-md:hidden">
        our blogs are written from very research research and well known
        writers writers so that we can provide <br /> you the best blogs and
        articles articles for you to read them all along
        </h4>
        <h4 className="text-secondarygray text-base  font-normal text-center md:hidden ">
        our blogs are written from very research research and well known
        writers writers so that we can provide you the best blogs and
        articles articles for you to read them all along
        </h4>

        {loading && <p className='text-center font-semibold font-Raleway'>Loading...</p>}
        {/* Grid Start */}

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 md:px-16 sm:px-4 w-full pt-6 ">
        {articles.slice(0 , visibleCount).map((article) => (
            <Link href={`/blog/${article.id}`} 
            key={article.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col space-y-8 pb-6 hover:scale-105"
            >
            {article.urlToImage && (
                <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-60 object-cover"
                />
            )}
            
        

        <div className="flex flex-col space-y-4 px-6">
            
            <div className="flex justify-between items-center ">
            <h6 className="text-xs font-bold text-secondary">{article.author}</h6>
            <h6 className="text-xs font-medium text-secondarygray break-words">{new Date(article.publishedAt).toLocaleDateString()}</h6>
            </div>
            <div className="flex space-y-4 flex-col w-full ">
            <h6 className='font-bold text-secondary break-words'>{article.title}</h6>
            <TruncateDescription description={article.description} wordLimit={30}/>
            </div>
        </div>
        </Link>

    ))}
    </div>

    {/* Grid end */}
    
     <button className='bg-main px-8 py-3 text-white font-Roboto font-bold rounded-md' onClick={handleShowMore}> 
      Show More
    </button> 

    </div>
    );
}

export default Page