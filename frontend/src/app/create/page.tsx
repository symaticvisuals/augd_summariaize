import EditorContainer from "@/components/editor";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

function CreatePage() {
  return (
    <div className="container mt-6">
      <div className="grid grid-cols-3 gap-4">
        <div className=" col-span-2">
          <EditorContainer
            title="Welcome to Summaraize"
            content="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla odio doloremque distinctio ab fugit cumque molestiae obcaecati magnam facilis corrupti."
          />
        </div>

        <div className="w-full h-auto p-4 bg-zinc-50 rounded-lg border border-zinc-200">
          <Input placeholder="Ask from AI" />
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            reprehenderit illum dolorem, dolor est laudantium corrupti fugiat
            blanditiis? Adipisci, quia? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Maxime voluptatibus, natus molestiae eligendi
            accusamus architecto laborum quas excepturi aut est magnam dolor
            facere ut commodi nulla tempora, laboriosam recusandae soluta eaque
            velit adipisci asperiores. Doloremque dolorem laboriosam odio
            ducimus alias?
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            consectetur corrupti iusto qui iste non, debitis quia, deserunt aut,
            unde vitae distinctio ut labore perspiciatis? Delectus alias
            blanditiis mollitia similique.
          </p>
        </div>
      </div>{" "}
      <Button type="submit" className=" mt-3 bg-primary-500" form="blog-form">
        Post
      </Button>
    </div>
  );
}

export default CreatePage;
