import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center bg-muted/30 p-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-3">Contact Technical Support</h1>
            <p className="text-muted-foreground mb-6">
              Having trouble with the platform? Reach out to our technical team. We typically respond within 24 hours.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Logged-in users only (helps us debug faster)</li>
              <li>• Provide a short summary and detailed steps to reproduce</li>
              <li>• Include any error messages or screenshots if relevant</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
