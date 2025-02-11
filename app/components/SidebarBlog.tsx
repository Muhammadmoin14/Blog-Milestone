// "use client";

// import { Button } from "@/components/ui/button";

//   type UserType = {
//     _id: string;
//     name: string;
//     email: string;
//   };


// export const SideBar = ({ setSelectedUser, users }: { setSelectedUser: (user: string | null) => void; users: UserType[] }) => {
//   return (
//     <div className="w-64 h-screen bg-main text-white p-4 rounded-lg mx-4 my-6 shadow-lg">
//       <h2 className="text-xl font-bold mb-4 font-Roboto text-cen">Admin Panel</h2>
//       <ul>
//         <li>
//           <Button className="w-full text-left bg-white" onClick={() => setSelectedUser(null)}>
//             All Blogs
//           </Button>
//         </li>
//         {users.map((user) => (
//           <li key={user._id}>
//             <Button className="w-full text-left bg-white" onClick={() => setSelectedUser(user.name)}>
//               {user.name}
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Home, BarChart, Users, Settings, } from "lucide-react";
// import {  Menu } from "lucide-react";

type UserType = {
  _id: string;
  name: string;
  email: string;
};

type SidebarProps = {
  setSelectedUser: (user: string | null) => void;
  setSelectedSection: (section: string) => void; // ✅ Fix: Added this prop
  users: UserType[];
};

const menuItems = [
  { name: "Dashboard", icon: Home, section: "dashboard" },
  { name: "Analytics", icon: BarChart, section: "analytics" },
  { name: "Manage Blogs", icon: Users, section: "blogs" },
  { name: "Users", icon: Users, section: "users" },
  { name: "Settings", icon: Settings, section: "settings" },
];

const SidebarBlog = ({ setSelectedUser, setSelectedSection, users }: SidebarProps) => {
  // const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-main rounded-lg mx-4 my-6 p-4 shadow-lg hidden md:block">
    {/* <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2 md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 h-screen bg-main p-4 shadow-lg"> */}
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map(({ name, icon: Icon, section }) => (
            <Button
              key={section}
              variant="ghost"
              className="w-full flex items-center gap-2 justify-start"
              onClick={() => {
                setSelectedSection(section);
                // setOpen(false);
              }}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Button>
          ))}
        </nav>

        <h3 className="text-lg font-semibold mt-6">Users</h3>
        {users.map((user) => (
          <Button
            key={user._id}
            variant="ghost"
            className="w-full bg-white text-black text-left"
            onClick={() => {
              setSelectedUser(user.name);
              // setOpen(false);
            }}
          >
            {user.name}
          </Button>
        ))}
      {/* </SheetContent> */}
    {/* </Sheet> */}
    </div>
  );
};

export default SidebarBlog;
