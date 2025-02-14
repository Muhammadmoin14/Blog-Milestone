"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SidebarBlog from "../components/SidebarBlog";
import { UserPanel } from "../components/UserPanel";
import { client } from "@/sanity/lib/client";
import toast, { Toaster } from "react-hot-toast";
// import Image from 'next/image';

interface ImageAsset {
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
}

interface BlogType {
  _id: string;
  author: string;
  title: string;
  description: string;
  urlToImage?: ImageAsset;
  publishedAt: string;
  content: string;
  status: string;
}
type UserType = {
  _id: string;
  name: string;
  email: string;
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [SelectedSection, setSelectedSection] = useState("dashboard");
  // const {user} = useUser();
  useEffect(() => {
    client.fetch(`*[_type == "blog"]`).then(setBlogs);
    client.fetch(`*[_type == "user"]`).then(setUsers);
  }, []);

  const handleUpdateStatus = async (blogId: string, status: string) => {
    try {
      console.log("Updating blog ID:", blogId, "New Status:", status);

      const response = await fetch("/api/blogs/updateBlogStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId, status }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success("Blog status updated successfully!");

      // 🔥 Update the local blogs state immediately
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, status } : blog
        )
      );
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.status === selectedTab &&
      (!selectedUser || blog.author === selectedUser)
  );

  console.log(users);
  console.log(blogs);

  return (
    <div className="flex h-full">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Sidebar */}
      <SidebarBlog
        setSelectedUser={setSelectedUser}
        users={users}
        setSelectedSection={setSelectedSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* User Panel */}
        <UserPanel />

        {/* Blog Tabs */}
        {SelectedSection === "dashboard" && (
          <div>
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
            {/* Add dashboard-specific components */}
          </div>
        )}

        {SelectedSection === "analytics" && (
          <div>
            <h2 className="text-xl font-bold">Analytics</h2>
            {/* Add analytics-related content */}
          </div>
        )}
        {SelectedSection === "blogs" && (
          <Tabs
            defaultValue="Pending"
            value={selectedTab}
            onValueChange={setSelectedTab}
          >
            <TabsList>
              <TabsTrigger value="Pending">Pending</TabsTrigger>
              <TabsTrigger value="Approved">Approved</TabsTrigger>
              <TabsTrigger value="Rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Card key={blog._id} className="mb-4">
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-secondary py-4">
                          {blog.title}
                        </h4>
                        <p className="text-secondary">{blog.author}</p>
                      </div>
                      {/* {blog.urlToImage?.asset?._ref ? (
                    <Image 
                      src={sanityImageUrl(blog.urlToImage.asset._ref)}
                      alt={blog.title} 
                      width={500} 
                      height={300} 
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <p className="text-gray-400 italic">No image available</p>
                  )} */}

                      <p className="text-gray-600">{blog.description}</p>

                      <div className="mt-2 flex space-x-2">
                        <Button
                          className="bg-green-500 text-white"
                          onClick={() => {
                            handleUpdateStatus(blog._id, "Approved");
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={() => {
                            handleUpdateStatus(blog._id, "Rejected");
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600">No blogs found.</p>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
