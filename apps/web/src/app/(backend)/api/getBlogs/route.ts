import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "../../../../sanity/client";

export async function GET() {
  try {
    const query = `*[_type == "blog"] | order(date desc)`;
    const blogs = await sanityClient.fetch(query);
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
