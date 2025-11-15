import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "../../../../sanity/client";

export async function GET() {
  try {
    const query = `*[_type == "project"] | order(date desc)`;
    const projects = await sanityClient.fetch(query);
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
