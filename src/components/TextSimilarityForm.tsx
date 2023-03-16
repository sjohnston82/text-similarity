"use client";

import { ApiKey } from "@prisma/client";
import React, { useRef, useState } from "react";
import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { toast } from "./ui/Toast";

// interface ApiKeyProps {
//   apiKey: ApiKey;
// }

const TextSimilarityForm = (activeApiKey: ApiKey | undefined) => {
  const text1Ref = useRef<HTMLInputElement>(null);
  const text2Ref = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  async function analyzeTextSimilarity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsAnalyzing(true);

    const textObj = {
      text1: text1Ref.current?.value,
      text2: text2Ref.current?.value,
    };

    try {
      console.log(activeApiKey);
      const res = await fetch("http://localhost:3000/api/v1/similarity", {
        method: "POST",
        body: JSON.stringify({ textObj }),
       
        headers: {
          Authorization: activeApiKey?.key,
        },
      });

      const data = await res.json();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          message: error.message,
          type: "error",
        });

        return;
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <>
      <form onSubmit={analyzeTextSimilarity}>
        <Input
          name="text1"
          id="text1"
          ref={text1Ref}
          placeholder="Enter first text to be analyzed..."
        />
        <Input
          name="text2"
          id="text2"
          ref={text2Ref}
          placeholder="Enter second text to be analyzed..."
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default TextSimilarityForm;
