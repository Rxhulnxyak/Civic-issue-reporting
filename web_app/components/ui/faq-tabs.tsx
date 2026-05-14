"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Main reusable FAQ component
type Categories = Record<string, string>;
type FAQItemData = { question: string; answer: string };
type FAQData = Record<string, FAQItemData[]>;

type FAQProps = {
  title?: string;
  subtitle?: string;
  categories: Categories;
  faqData: FAQData;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const FAQ: React.FC<FAQProps> = ({ 
  title = "FAQs",
  subtitle = "Frequently Asked Questions",
  categories,
  faqData,
  className,
  ...props 
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section 
      className={cn(
        "relative overflow-hidden bg-background px-4 py-12 text-foreground",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

type FAQHeaderProps = { title: string; subtitle: string };
const FAQHeader: React.FC<FAQHeaderProps> = ({ title, subtitle }) => (
  <div className="relative z-10 flex flex-col items-center justify-center">
    <span className="mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text font-medium text-transparent">
      {subtitle}
    </span>
    <h2 className="mb-8 text-5xl font-bold">{title}</h2>
    <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-primary/10 to-primary/5 blur-3xl" />
  </div>
);

type FAQTabsProps = { 
  categories: Categories; 
  selected: string; 
  setSelected: (key: string) => void; 
};
const FAQTabs: React.FC<FAQTabsProps> = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
    {Object.entries(categories).map(([key, label]) => (
      <button
        key={key}
        onClick={() => setSelected(key)}
        className={cn(
          "relative overflow-hidden whitespace-nowrap rounded-md border px-3 py-1.5 text-sm font-medium transition-colors duration-500",
          selected === key
            ? "border-primary text-background"
            : "border-border bg-transparent text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="relative z-10">{label}</span>
        {selected === key && (
          <span
            className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary/80 transition-transform duration-500"
            style={{ transform: 'translateY(0%)' }}
          />
        )}
      </button>
    ))}
  </div>
);

type FAQListProps = { faqData: FAQData; selected: string };
const FAQList: React.FC<FAQListProps> = ({ faqData, selected }) => (
  <div className="mx-auto mt-12 max-w-3xl">
    {Object.entries(faqData).map(([category, questions]) => (
      selected === category ? (
        <div key={category} className="space-y-4">
          {questions.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      ) : null
    ))}
  </div>
);

type FAQItemProps = FAQItemData;
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        isOpen ? "bg-muted/50" : "bg-card"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cn(
            "text-lg font-medium transition-colors",
            isOpen ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {question}
        </span>
        <span
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <Plus
            className={cn(
              "h-5 w-5 transition-colors",
              isOpen ? "text-foreground" : "text-muted-foreground"
            )}
          />
        </span>
      </button>
      <div
        className="overflow-hidden px-4"
        style={{ height: isOpen ? "auto" : "0px", marginBottom: isOpen ? "16px" : "0px", transition: "height 0.3s ease-in-out, margin-bottom 0.3s ease-in-out" }}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
};