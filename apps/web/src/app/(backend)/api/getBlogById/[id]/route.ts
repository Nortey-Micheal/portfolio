import { NextResponse } from "next/server";
import { sanityClient } from "../../../../../sanity/client";
import { defineQuery } from "next-sanity";

const Blog_BY_ID_QUERY = defineQuery(`
  *[_type == "blog" && _id == $id][0]
`);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Missing blog id" }, { status: 400 });
    }

    const blog = await sanityClient.fetch(Blog_BY_ID_QUERY, { id });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Sanity error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
