"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const UserPanel = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg mb-4">
      <div className="flex items-center">
        <Image
          src={user?.imageUrl || "/default-avatar.png"}
          alt="User Avatar"
          width={45}
          height={45}
          className="rounded-full border"
        />
        <div className="ml-2">
          <h4 className="text-lg font-semibold text-secondary">{user?.fullName || "Admin"}</h4>
          {/* <p className="text-sm text-gray-600">{user?.emailAddresses || 'email address'}</p> */}
          <p className="text-sm text-gray-600">{Array.isArray(user?.emailAddresses) ? user?.emailAddresses.join(", ") : user?.emailAddresses}</p>

        </div>
      </div>
    </div>
  );
};
