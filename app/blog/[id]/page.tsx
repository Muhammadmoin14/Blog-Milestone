'use client'
// import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PopularBlog from '../../components/PopularBlog'


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


const SpecificBlog = ({params} : {params : {id : string}}) => {
  
  
  const [blogPage , setblogPage] = useState<datatype | null >(null)
  const [loading , setLoading] = useState<boolean>(true)

  useEffect(()=>{

    setLoading(true)

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `/api/news?q=apple&from=2024-12-26&to=2024-12-26&sortBy=popularity`
        );
        const data = await response.json();
        
        const selectedArticle = data.articles.map((article: datatype, index: number) => ({
          ...article,
          id: index.toString(),
        })).find((article : datatype) => article.id === params.id);

        setblogPage(selectedArticle || null);

      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    

    };

    fetchPost()

  }, [params.id])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blogPage) {
    return <p>Post not found</p>;
  }
  

  
  return (
    <div className='w-full h-full bg-[#FAFAFA] flex flex-col py-24 md:px-20  sm:px-4 space-y-8   '>
        <div className='flex items-center space-x-4 sm:px-0 md:px-10 max-md:justify-between'>
        <h6 className="text-xs font-bold text-secondary">{blogPage.author}</h6>
        <h6 className="text-xs font-medium text-secondarygray break-words">{new Date(blogPage.publishedAt).toLocaleDateString()}</h6>
        </div>
        <div className='md:px-8 sm:px-0'>
          <h2 className='font-bold md:text-center sm:text-start text-secondary max-md:text-3xl'>{blogPage.title}</h2>
        </div>
        <div>
          
        {blogPage.urlToImage && (
          
          <img
                src={blogPage.urlToImage}
                alt={blogPage.title}
                className='w-full h-full object-contain rounded-lg'
                />
              )}
        </div>
        <div className='md:px-8 sm:px-0'>
          <p className='text-secondarygray md:text-base sm:text-sm font-Roboto md:pt-10 sm:pt-4'>{blogPage.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur quaerat minus perspiciatis officia, totam omnis ipsa autem placeat, vero, nihil hic? Quae explicabo doloribus sapiente, facilis voluptas placeat cumque corrupti, porro incidunt, eum similique! Qui, corporis, debitis similique perspiciatis delectus dolorem, illum expedita quod consequatur quas iure? Excepturi fuga tempore, ratione facilis cupiditate, mollitia reprehenderit minima tempora nisi laudantium veniam, tenetur odit doloribus sapiente ex. Nisi natus provident deserunt tempore nemo nesciunt accusamus nulla quidem consequuntur earum corporis ea odit libero quam amet eum blanditiis veritatis voluptate odio saepe dolorem, eius distinctio ut magnam. Minima est consequatur enim recusandae doloribus eum pariatur, dolore soluta nesciunt assumenda velit reiciendis quasi tempore sequi sed veritatis voluptates nulla amet in distinctio. Sit nobis assumenda nulla illum ipsa dolores quia provident perferendis. Impedit iure fuga dicta veritatis fugit sit iusto, voluptatibus eveniet, iste voluptas temporibus cum debitis voluptatum adipisci reiciendis qui possimus quisquam sed dolorum consequuntur fugiat? Dolores modi quos dolore libero labore! Mollitia id beatae adipisci quis incidunt dolor numquam consectetur ullam rem repellat accusamus accusantium libero dolore eos perspiciatis sapiente error culpa eius nam consequatur, iste autem? Perferendis alias fugiat dignissimos quisquam. Dicta adipisci neque saepe porro nulla quae totam deserunt minima ea! Ab sequi aut impedit quos suscipit deleniti hic ullam, et nisi, rerum illum. Nemo sint esse soluta sequi blanditiis quas aperiam ipsam itaque perspiciatis rerum minus voluptatem vitae rem corporis ab dolore fugit accusantium nesciunt, nisi totam quis molestiae impedit velit. Laudantium quisquam accusamus cupiditate quod et voluptas officiis? Quibusdam reiciendis voluptate tempora accusantium impedit quidem nihil at autem hic veritatis voluptas vel, quos veniam nisi facilis odio earum architecto repellat dolorum alias minus magnam! Quis deserunt et error recusandae placeat accusantium reprehenderit nemo. Recusandae neque voluptatum delectus tempora sapiente voluptatem illum illo cupiditate! Repudiandae et voluptates vitae sit?</p>
        </div>
    
    <PopularBlog startingofPost={4} endingofPost={7}/>
        
    </div>
  )
}

export default SpecificBlog