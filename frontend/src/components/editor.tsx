"use client";
import { BlogCreationRequest, BlogValidator } from "@/vaidators/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect, FC, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import ReactTextareaAutosize from "react-textarea-autosize";
import type EditorJS from "@editorjs/editorjs";
import { z } from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Kbd } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface EditorProps {
  title: string;
  content: string;
}

type FormData = z.infer<typeof BlogValidator>;

const EditorContainer: FC<EditorProps> = ({ title, content }) => {
  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BlogCreationRequest>({
    resolver: zodResolver(BlogValidator),
    defaultValues: {
      title,
      content,
    },
  });

  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const _titleRef = useRef<HTMLTextAreaElement>(null);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    const createInitialData = () => {
      return {
        time: new Date().getTime(),
        blocks: [
          {
            type: "paragraph",
            data: {
              text: content,
            },
          },
        ],
        version: "2.22.2",
      };
    };

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
          if (content) {
            ref.current.render(createInitialData());
          }
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },

          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  const { mutate: createPost } = useMutation({
    mutationFn: async ({ title, content }: BlogCreationRequest) => {
      const payload: BlogCreationRequest = { title, content };
      const { data } = await axios.post(
        "http://localhost:5000/mongo/post",
        payload
      );
      return data;
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      router.replace("/blogs");
    },
  });

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save();

    const payload: BlogCreationRequest = {
      title: data.title,
      content: blocks,
    };

    createPost(payload);
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="blog-form" className="w-fit" onSubmit={handleSubmit(onSubmit)}>
        <div className="prose prose-stone dark:prose-invert">
          <ReactTextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="w-full" />
          <p className="text-sm text-gray-500">
            Use <Kbd keys={["tab"]}></Kbd>
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditorContainer;
