"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import DeleteBlogDialog from "../components/DeleteBlogDailog";
import toast, { Toaster } from "react-hot-toast"; // Add Toaster
import EditBlogDialog from "../components/EditBlogDailog";

type BlogType = {
  _id: string;
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  status: string;
};

const UserDashboard = () => {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [editBlog, setEditBlog] = useState<BlogType | null>(null);
  // Fetch user blogs
  useEffect(() => {
    if (user) {
      client
        .fetch(`*[_type == "blog" && author == $author]`, { author: user.fullName })
        .then(setBlogs)
        .catch((err) => console.error("Error fetching blogs:", err));
    }
  }, [user]);

  // Delete blog function
  const handleDelete = async (blogId: string) => {
    try {
      const response = await fetch("/api/delete-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId }),
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        return true; // Indicate success
      } else {
        console.error("Error deleting blog:", await response.json());
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error:", error);
      return false; // Indicate failure
    }
    
  };
  const handleEditSave = async (updatedBlog: { id: string; title: string; description: string }) => {
    try {
      await fetch(`/api/edit-blog`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      // Update UI
      setBlogs(prev => prev.map(blog => (blog._id === updatedBlog.id ? { ...blog, ...updatedBlog } : blog)));
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.log(error)
      toast.error("Failed to update blog!");
    } finally {
      
      setEditBlog(null);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-right" reverseOrder={false} /> {/* Add Toaster here */}
      {/* Header */}
      <div className="flex items-center justify-between bg-[#7C4EE4] text-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          <Image
            src={user?.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            width={50}
            height={50}
            className="rounded-full border-2 border-white"
          />
          <h2 className="text-xl font-semibold">{user?.fullName || "User"}</h2>
        </div>
      </div>

      {/* Blog List */}
      <div className="mt-6 space-y-4">
        <h3 className="text-2xl font-bold text-[#7C4EE4]">Your Blogs</h3>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card key={blog._id} className="bg-white shadow-md rounded-lg p-4">
              <CardContent>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">{blog.title}</h4>
                  <h4 className="text-lg font-normal text-gray-900">
                    {blog.publishedAt.slice(0, 10).split("-").reverse().join("-")}
                  </h4>
                </div>
                <p className="text-gray-600 mt-1">{blog.description}</p>
                <div>
                  <div className="flex gap-2 items-center py-2">
                    <p className="text-sm font-Raleway text-secondary">Status:</p>
                    <p className="text-sm font-Raleway text-yellow-600">{blog.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button onClick={() => setEditBlog(blog)}  className="bg-[#7C4EE4] text-white px-4 py-1 rounded-md">
                    Edit
                  </Button>
                  <Button
                    onClick={() => setDeleteBlogId(blog._id)} // Open the dialog
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No blogs found.</p>
        )}
      </div>
      <DeleteBlogDialog
        blogId={deleteBlogId}
        onClose={() => setDeleteBlogId(null)}
        onDelete={handleDelete}
      />
      <EditBlogDialog
        blog={editBlog}
        onClose={() => setEditBlog(null)}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default UserDashboard;