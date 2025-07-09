"use client";

import QuoteForm from "@/app/components/QuoteForm";
import TopicDrawer from "@/app/components/TopicDrawer";
import { useState } from "react";

export default function Home() {
  const [selectedTopic,setSelectedTopic] = useState("");

  return (
    <>
        

      <main>
        <TopicDrawer onSelect={(topic) => setSelectedTopic(topic)} />
        <QuoteForm initialTopic={selectedTopic} />
      </main>
    </>
  );
}
