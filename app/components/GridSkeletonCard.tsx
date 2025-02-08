const BlogGridSkeleton = ({ count = 3 }) => {
    return (
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 w-full pt-6">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="bg-[#FAFAFA] rounded-lg overflow-hidden flex flex-col space-y-6 pb-6 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="w-full h-60 bg-gray-300"></div>
  
            {/* Text Content Placeholder */}
            <div className="flex flex-col space-y-4 px-6">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 w-1/3 rounded"></div>
                <div className="h-4 bg-gray-300 w-1/4 rounded"></div>
              </div>
  
              <div className="flex space-y-4 flex-col w-full">
                <div className="h-6 bg-gray-400 w-3/4 rounded"></div>
                <div className="h-4 bg-gray-300 w-full rounded"></div>
                <div className="h-4 bg-gray-300 w-5/6 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BlogGridSkeleton;
  