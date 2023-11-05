import React from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
function Navbar() {
  return (
    <div className="container py-3">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold">
          Summaraize
        </Link>
        <div className="">
          <Button
            size="md"
            className="ml-3  bg-primary-500 rounded-full font-medium border border-black"
          >
            <Link href={"/upload"}>Explain me</Link>
          </Button>
          <Button
            variant="bordered"
            size="md"
            className="ml-3  rounded-full font-medium border border-black"
          >
            <Link href={"/blogs"}>Read Blogs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
