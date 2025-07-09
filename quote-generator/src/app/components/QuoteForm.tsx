"use client";

import { useState } from "react";
import { quotes } from "@/data/quotes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "@/lottie/loading.json";
import { Quote } from "lucide-react";

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<{ text: string; author?: string }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredQuotes, setFilteredQuotes] = useState<
  { text: string; author?: string }[]
>([]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered = quotes.filter(
  (q) => q.topic.toLowerCase() === topic.toLowerCase().split(" ")[0]
);
setFilteredQuotes(filtered);

const seen = new Set<string>();
const uniqueQuotes: { text: string; author?: string }[] = [];

while (uniqueQuotes.length < 3 && filtered.length > 0) {
  const random = filtered[Math.floor(Math.random() * filtered.length)];
  if (!seen.has(random.text)) {
    seen.add(random.text);
    uniqueQuotes.push({ text: random.text, author: random.author });
  }
}

setResults(uniqueQuotes);


 
    setLoading(false);
  };

  const refreshQuotes = () => {
  const seen = new Set<string>();
  const uniqueQuotes: { text: string; author?: string }[] = [];

  while (uniqueQuotes.length < 3 && filteredQuotes.length > 0) {
    const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    if (!seen.has(random.text)) {
      seen.add(random.text);
      uniqueQuotes.push({ text: random.text, author: random.author });
    }
  }

  setResults(uniqueQuotes);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-white flex flex-col items-center justify-start px-4 py-8 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">
        Quote Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col md:flex-row items-center gap-3 bg-white shadow-md rounded-xl px-4 py-3"
      >
        <input
          type="text"
          placeholder="Enter a topic (e.g. love, motivation)"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            setResults([]);
            setHasSearched(false);
            setLoading(false);
          }}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <Button
          type="submit"
          className="w-full md:w-auto px-4 py-2 text-sm md:text-base "
          variant="default"
        >
          Get Quotes
        </Button>
      </form>

      <div className="mt-6 w-full max-w-6xl">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center mt-6"
          >
            <Lottie animationData={loadingAnimation} loop className="w-24 h-24" />
          </motion.div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <motion.p
            key="no-quotes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-6"
          >
            No quotes found for topic: <strong>{topic}</strong>
          </motion.p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-2">
          <AnimatePresence mode="wait">
            {!loading &&
              results.length > 0 &&
              results.map((quote, index) => (
                <motion.div
                  key={quote.text + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/80">
                    <CardContent className="p-4">
                      <Quote className="text-teal-600 w-6 h-6 mb-2" />
                      <p className="text-sm italic">“{quote.text}”</p>
                      {quote.author && (
                        <p className="text-xs text-right text-gray-500 mt-2">
                          – {quote.author}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
      {results.length > 0 && (
  <div className="flex justify-center mt-4">
    <Button
      variant="outline"
      onClick={refreshQuotes}
      className="text-sm"
    >
      🔁 Refresh Quotes
    </Button>
  </div>
)}

    </div>
  );
}
