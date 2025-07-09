"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { quotes } from "@/data/quotes";
import { useState } from "react";

interface TopicDrawerProps {
  onSelect: (topic: string) => void;
}

export default function TopicDrawer({ onSelect }: TopicDrawerProps) {
  const [open, setOpen] = useState(false);
  const uniqueTopics = Array.from(new Set(quotes.map((q) => q.topic)));

  const handleClick = (topic: string) => {
    onSelect(topic);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
  variant="default" className="mt-4"
>📚 Browse Topics</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="bg-teal-400" >
          <SheetTitle className="text-lg text-center font-bold text-teal-800 " >Available Topics</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-2 max-h-[75vh] overflow-y-auto">
          {uniqueTopics.map((topic) => (
            <Button
              key={topic}
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => handleClick(topic)}
            >
              {topic}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
