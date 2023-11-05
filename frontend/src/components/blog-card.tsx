"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { IBlog } from "@/app/blogs/page";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="w-full">
        <CardHeader className="justify-between">
          <p>{blog.title}</p>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400"></CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className=" text-default-400 text-small">Published on</p>
            <p className="font-semibold text-default-400 text-small">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
