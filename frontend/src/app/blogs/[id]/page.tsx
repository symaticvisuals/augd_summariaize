"use client";

import EditorOutput from "@/components/editor-output";
import { useAllBlogsById } from "@/hooks/get-by-blog-id";
import React from "react";

function BlogPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { data: blog, isLoading } = useAllBlogsById(params.id);
  if (!params.id) return <div>404</div>;
  return (
    <div className="container">
      <h1 className="text-3xl font-semibold">{blog?.title}</h1>
      <EditorOutput content={blog?.content} />
    </div>
  );
}

export default BlogPage;
