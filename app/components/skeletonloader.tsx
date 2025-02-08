type SkeletonType = "blog-card" | "main-blog";

interface SkeletonProps {
  type: SkeletonType;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type }) => {
  if (type === "blog-card") {
    return (
      <div className="bg-[#FAFAFA] rounded-lg overflow-hidden flex flex-row space-x-6 pb-6 animate-pulse">
        <div className="w-1/2 h-96 bg-gray-300"></div>
        <div className="w-1/2 px-6 flex flex-col space-y-4">
          <div className="h-6 bg-gray-300 w-1/3 rounded"></div>
          <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
          <div className="h-8 bg-gray-400 w-full rounded"></div>
          <div className="h-6 bg-gray-300 w-5/6 rounded"></div>
          <div className="h-12 bg-gray-300 w-1/6 rounded"></div>
        </div>
      </div>
    );
  }

  if (type === "main-blog") {
    return (
      <div className="w-full h-72 bg-gray-300 rounded-lg animate-pulse"></div>
    );
  }

  return null;
};

export default SkeletonLoader;
