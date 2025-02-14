import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Import Sanity client

export async function PUT(req: Request) {
  try {
    const { blogId, status } = await req.json();

    if (!blogId || !status) {
      return NextResponse.json({ message: "Blog ID and status are required" }, { status: 400 });
    }

    // Update blog status in Sanity
    const updatedBlog = await client.patch(blogId)
      .set({ status }) // Update status field
      .commit();

    return NextResponse.json({ message: "Status updated successfully", updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog status:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
