"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

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


export default function UserDashboard() {
  const { user } = useUser();
  const [blogs, setBlogs] = useState<datatype[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/user-blogs?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setBlogs(data));
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Your Blogs</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded-lg my-4">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p className="text-gray-600">{blog.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
