"use client";

import QuoteForm from "@/app/components/QuoteForm";
import { useState } from "react";

export default function Home() {
  const [selectedTopic] = useState("");

  return (
    <>
        

      <main>
       
        <QuoteForm initialTopic={selectedTopic} />
      </main>
    </>
  );
}
