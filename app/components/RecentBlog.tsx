"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import TruncateDescription from "../components/TruncateDescription";
import Link from "next/link";
import ViewmoreButton from "./Viewmore";
import MainBlog from "./MainBlog";
import SkeletonLoader from "./skeletonloader";
import BlogGridSkeleton from "./GridSkeletonCard";

type datatype = {
  id: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type PopularPageProps = {
  startingofPost: number;
  endingofPost: number;
};

const Page: React.FC<PopularPageProps> = ({ startingofPost, endingofPost }) => {
  const [articles, setarticle] = useState<datatype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/news?q=apple`);
        const data = await response.json();

        const articlesWithId = data.articles.map(
          (article: datatype, index: number) => ({
            ...article,
            id: index.toString(),
          })
        );

        setarticle(articlesWithId);
      } catch (error) {
        console.error("fetching error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full bg-[#FAFAFA] py-24  flex flex-col  space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-secondary font-bold md:text-5xl sm:text-2xl">
          Recent Blog
        </h3>
        <ViewmoreButton />
      </div>
      <div className="flex flex-row max-md:hidden">
        <MainBlog mainblog={33} />
      </div>

      {loading && (
        // <p className="text-center font-semibold font-Raleway">Loading...</p>
        <div>
        <SkeletonLoader type="blog-card" />
        <BlogGridSkeleton count={3} />
        </div>
      )}

      {/* Grid Start */}

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6  w-full pt-6 ">
        {articles.slice(startingofPost, endingofPost).map((article) => (
          <Link
            href={`/blog/${article.id}`}
            key={article.id}
            className="bg-[#FAFAFA] rounded-lg overflow-hidden flex flex-col space-y-6 pb-6 hover:scale-105"
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
                <h6 className="text-xs font-bold text-secondary">
                  {article.author}
                </h6>
                <h6 className="text-xs font-medium text-secondarygray break-words">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </h6>
              </div>
              <div className="flex space-y-4 flex-col w-full ">
                <h6 className="font-bold text-secondary break-words">
                  {article.title}
                </h6>
                <TruncateDescription
                  description={article.description}
                  wordLimit={30}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid end */}
    </div>
  );
};

export default Page;
