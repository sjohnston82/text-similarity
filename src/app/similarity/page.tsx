import TextSimilarityForm from "@/components/TextSimilarityForm";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

import { Metadata } from "next";
import { ApiKey } from "@prisma/client";
import { notFound } from "next/navigation";

interface apiKeyProps {
  apiKey: ApiKey | null;
}

export const metadata: Metadata = {
  title: "Similarity API | Analyze Text",
  description: "Free & open-source text similarity API",
};

const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) notFound();

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {/* @ts-expect-error Server Component */}
      <TextSimilarityForm activeApiKey={activeApiKey} />
    </div>
  );
};

export default page;
