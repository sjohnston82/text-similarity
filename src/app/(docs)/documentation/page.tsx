import { FC } from "react";

import type { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Paragraph from "@/components/ui/Paragraph";

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description: "Free & open-source text similarity API",
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading  className="">
          Making a request
        </LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>
      </div>
    </div>
  );
};

export default page;
