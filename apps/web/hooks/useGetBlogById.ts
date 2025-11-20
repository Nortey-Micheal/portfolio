import { Blog } from "@/src/sanity/types";
import { useState, useEffect } from "react";

export function useGetBlogById(id:string) {
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!id) throw new Error('No id provided')
        const res = await fetch(`/api/getBlogById/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlog(data.blog);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  return { blog, loading, error };
}
