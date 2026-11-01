"use client";

import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="grid gap-2">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question} className="rounded-3xl bg-surface-2 px-6 transition-colors duration-200 data-[state=open]:bg-blue-soft">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg py-5 text-left text-[1.25rem] font-medium tracking-[-0.01em]">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-[60ch] pb-5 text-ink-soft">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
