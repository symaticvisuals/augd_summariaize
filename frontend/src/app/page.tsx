import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center -mt-24 min-h-screen  container">
      <div className="grid grid-cols-3 gap-5 items-center">
        <div className="col-span-2">
          <h1 className="text-4xl font-medium mt-[12vh]  leading-normal">
            Unlocking the <span className="bg-primary-500">Power</span> of
            Knowledge – Introducing
            <span className=" ml-3 bg-primary-500">Summaraize.</span>
          </h1>
          <p className="mt-3">
            Summaraize is your gateway to a smarter, more efficient way of
            reading and extracting knowledge from PDFs. Harness the AI-driven
            transformation of your documents and unlock the potential of
            seamless information retrieval.
          </p>

          <div className="mt-5 flex gap-3">
            <Button className="rounded-full bg-primary-500 border border-black font-medium">
              <Link href="/upload">Upload </Link>
            </Button>
            {/* <Button className="rounded-full bg-secondary-300 border border-black font-medium">
              Get Answers
            </Button> */}
          </div>
        </div>
        <div className="flex justify-end items-end">
          <Image src="/assets/home.png" height={300} width={200} alt="hero" />
        </div>
      </div>
    </main>
  );
}
