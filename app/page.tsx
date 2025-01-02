import PopularBlog from "./components/PopularBlog";
import RecentBlog from "./components/RecentBlog";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#FAFAFA] w-full h-full pb-24 md:px-20 sm:px-10 flex flex-col items-center justify-center">
      <div className="bg-main w-full h-4/5 flex flex-col md:items-center sm:items-start py-16 md:px-36 sm:px-8 rounded-b-lg space-y-8">
          <div className="md:text-center sm:text-start space-y-4 ">
            
          <h2 className="font-bold font-roboto max-md:text-3xl  text-white">Welcome to the Ultimate Blogging Website</h2>
          <h5 className="text-lg text-secondarysilver md:mx-16 sm:mx-0">Are you searching for the best blogging platform? Look no further! Whether youre a beginner or an expert, we have all the tools, tips, and content to help you succeed.</h5>
          <p className="text-lg text-secondarysilver">Join our community of writers and readers, explore insightful blogs, and start your own journey with us!</p>
          </div>
         
          
          <Link href='/blog'> <button className="bg-[#FAFAFA]  w-40 h-12 rounded-md font-Raleway text-sm font-bold text-main border-main border-2  flex justify-center items-center hover:bg-main hover:text-white hover:border-white">
          Read More
          </button>
          </Link>

      </div>
      <RecentBlog  startingofPost={12} endingofPost={15}/>
      <PopularBlog startingofPost={4} endingofPost={10}/>

    </div>
  );
}
