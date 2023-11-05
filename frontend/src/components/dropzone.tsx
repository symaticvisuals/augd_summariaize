"use client";
import { Button, Input, Progress, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import EditorContainer from "./editor";
import { summarizeText } from "@/hooks/open-ai";

function MyDropzone() {
  const [contentMode, setContentMode] = useState<"editor" | "preview">(
    "preview"
  );
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [query, setQuery] = useState("");

  const [content, setContent] = useState("");

  React.useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 10));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading]);
  const { mutate: uploadPdf } = useMutation({
    mutationFn: async ({ file }: { file: any }) => {
      // Create a new FormData object
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectName", projectName);

      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.post(
          "http://127.0.0.1:5000/summarize",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type for file uploads
            },
          }
        );
        await axios.post("http://127.0.0.1:5000/embd", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file uploads
          },
        });

        setLoading(false);
        setContent(response.data.summary);
        return response.data;
      } catch (error) {
        throw error; // Let React Query handle the error
      }
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: () => {
      //   alert("Success");
    },
  });
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      // add two second delay to show the loading state

      uploadPdf({ file: acceptedFiles[0] });
    },
    [uploadPdf]
  );

  const { mutate: askFromAI } = useMutation({
    mutationFn: async ({ query }: { query: string }) => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get(
          "http://127.0.0.1:5000/qa?query=" + JSON.stringify(query)
        );
        setLoading(false);
        setContent(response.data.summary);

        setAskAiResponse(response.data);
        const openApiSource = await summarizeText(response.data);
        setOtherSources(openApiSource);
        return response.data;
      } catch (error) {
        throw error; // Let React Query handle the error
      }
    },
    onError: (error) => {
      console.log("Error:", error);
    },
    onSuccess: () => {},
  });

  const [otherSources, setOtherSources] = useState<any[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [askAi, setAskAi] = useState("");
  const [askAiResponse, setAskAiResponse] = useState("");
  const [projectName, setProjectName] = useState("");

  return (
    <div className="">
      {contentMode === "editor" && (
        <div className="">
          <div className="grid grid-cols-3 gap-4">
            <div className=" col-span-2">
              <EditorContainer title={projectName} content={content} />
            </div>
            <div className="h-auto p-4 bg-zinc-50 rounded-lg border border-zinc-200">
              <div className=" flex items-center gap-4">
                <Input
                  placeholder="Ask from AI"
                  variant="bordered"
                  value={askAi}
                  onChange={(e) => {
                    setAskAi(e.target.value);
                  }}
                />
                <Button
                  className=" bg-primary-500"
                  onClick={() => {
                    askFromAI({ query: askAi });
                  }}
                  size="md"
                >
                  Go
                </Button>
              </div>
              <p className="mt-4">{askAiResponse && askAiResponse}</p>
              <h4 className="mt-4">Other Sources</h4>
              <p>{otherSources}</p>
            </div>
          </div>
          <Button
            type="submit"
            className=" mt-3 bg-primary-500"
            form="blog-form"
          >
            Post
          </Button>
        </div>
      )}

      {contentMode === "preview" && (
        <div className="">
          {!content && (
            <div className="">
              <h1 className="text-3xl font-medium my-4 text-center">
                Upload your Document
              </h1>
              <div className="flex gap-2 items-center mb-4">
                <Input
                  placeholder="Your Project Name!"
                  variant="bordered"
                  className=" flex-grow"
                  size="lg"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
              </div>
              <div
                {...getRootProps()}
                className="w-full bg-neutral-200 rounded-xl cursor-pointer h-[40vh] flex justify-center items-center"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>
                    Drag {"n"} drop some files here, or click to select files
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            {loading && <Spinner />}
            {content && (
              <div className="mt-5">
                <div className="flex gap-2 items-center mb-4">
                  <Input
                    placeholder="Ask from AI"
                    variant="bordered"
                    value={askAi}
                    onChange={(e) => {
                      setAskAi(e.target.value);
                    }}
                  />
                  <Button
                    className=" bg-primary-500"
                    onClick={() => {
                      askFromAI({ query: askAi });
                    }}
                    size="md"
                  >
                    Go
                  </Button>
                </div>
                <h1 className="text-3xl font-medium my-4 text-center">
                  Summary
                </h1>
                <p className="text-lg">{content}</p>
                <div className="flex gap-3">
                  <Button className="mt-4 bg-primary-500">
                    Upload Another PDF
                  </Button>
                  <Button
                    className="mt-4 bg-secondary-500"
                    onClick={() => setContentMode("editor")}
                  >
                    Write a Blog
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyDropzone;
