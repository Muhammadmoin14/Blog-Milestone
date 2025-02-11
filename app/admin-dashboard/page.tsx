'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import  SidebarBlog  from '../components/SidebarBlog';
import { UserPanel } from '../components/UserPanel';
import { client } from '@/sanity/lib/client';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarHeader,
// } from "@/components/ui/sidebar"


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
type UserType = {
  _id: string;
  name: string;
  email: string;
};


const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [SelectedSection , setSelectedSection] = useState('dashboard');
  // const {user} = useUser();
  useEffect(() => {
    client.fetch(`*[_type == "blog"]`).then(setBlogs);
    client.fetch(`*[_type == "user"]`).then(setUsers);
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) => blog.status === selectedTab && (!selectedUser || blog.author === selectedUser)
  );
  
  console.log(users)
  return (
    <div className="flex h-full">

      {/* Sidebar */}
      <SidebarBlog setSelectedUser={setSelectedUser} users={users} setSelectedSection={setSelectedSection}/>
      {/* <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar> */}
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
          <Tabs defaultValue="pending" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          
          <TabsContent value={selectedTab}>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(blog => (
                <Card key={blog._id} className="mb-4">
                  <CardContent>
                    <h4 className="font-bold text-secondary py-4">{blog.title}</h4>
                    <p className="text-gray-600">{blog.description}</p>
                    <div className="mt-2 flex space-x-2">
                      <Button className="bg-green-500 text-white">Approve</Button>
                      <Button className="bg-red-500 text-white">Reject</Button>
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
