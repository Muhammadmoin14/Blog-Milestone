import { NextResponse } from "next/server";
import { projectId } from "@/sanity/env";

export async function POST(req: Request) {
  try {
    const body = await req.json();


    const { blogId } = body;
    if (!blogId) {
      return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
    }

    const response = await fetch(`https://${projectId}.api.sanity.io/v1/data/mutate/production`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [{ delete: { id: blogId } }],
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to delete blog", details: result }, { status: 500 });
    }

    return NextResponse.json({ message: "Blog deleted successfully", result }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}
