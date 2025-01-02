'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import TruncateDescription from '../components/TruncateDescription';
import Link from 'next/link';
import ViewmoreButton from './Viewmore';



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


    type PopularPageProps = 
    {
        startingofPost : number,
        endingofPost : number
    }

const Page : React.FC<PopularPageProps> = ({startingofPost , endingofPost}) => {

    const [articles, setarticle] = useState<datatype[]>([]);
    // const [visibleCount , setvisibleCount] = useState(3)
    const [loading , setLoading] = useState<boolean>(true);


        useEffect(()=>{
          setLoading(true)

            const fetchData = async ()=>{ 
                try {
                    const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2024-12-26&to=2024-12-26&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
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

    // const handleShowMore = () => {
    //     setvisibleCount((prev) => prev + 6) 
    // }

    // console.log(articles)

  

    return (
    <div className="w-full h-full bg-[#FAFAFA] py-24  flex flex-col  space-y-6">
        <div className='flex items-center justify-between'>

        <h3 className="text-secondary font-bold md:text-5xl sm:text-2xl">
        Popular Blog
        </h3>
        <ViewmoreButton/>
        </div>

        {loading && <p className='text-center font-semibold font-Raleway'>Loading...</p>}
        {/* Grid Start */}

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6  w-full pt-6 ">
        {articles.slice(startingofPost , endingofPost).map((article) => (
            <Link href={`/blog/${article.id}`} 
            key={article.id}
            className="bg-[#FAFAFA] rounded-lg overflow-hidden flex flex-col space-y-6 pb-6 hover:scale-105"
            >
            {article.urlToImage && (
                <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-60 object-cover "
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
    
      

    </div>
    );
}

export default Page