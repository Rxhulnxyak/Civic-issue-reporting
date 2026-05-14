"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";

const schema = z.object({
  name: z.string().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone is too short")
    .max(20, "Phone is too long")
    .regex(/^[+\d][\d\s()-]{6,}$/i, "Invalid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

type FormState = z.infer<typeof schema>;

export default function ContactForm() {
  const router = useRouter();
  const [data, setData] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isValid = useMemo(() => schema.safeParse(data).success, [data]);

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, [PUBLIC_KEY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((s) => ({ ...s, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      const flat = parsed.error.flatten().fieldErrors;
      (Object.keys(flat) as (keyof FormState)[]).forEach((k) => {
        const msg = flat[k]?.[0];
        if (msg) fieldErrors[k] = msg;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      // Server-side rate limit guard before client-side send
      const res = await fetch("/api/support/guard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        if (res.status === 429) {
          const j = await res.json().catch(() => ({}));
          setServerError(j.error || "Too many requests. Please try again later.");
        } else if (res.status === 400) {
          const j = await res.json().catch(() => ({}));
          setServerError(j.error || "Validation failed");
        } else {
          const j = await res.json().catch(() => ({}));
          setServerError(j.error || "Something went wrong. Please try again.");
        }
        return;
      }
      // Proceed to EmailJS client-side send
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        setServerError("EmailJS is not configured. Add NEXT_PUBLIC_EMAILJS_* to .env.local");
        return;
      }
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        reply_to: data.email,
        subject: `Tech Support | ${data.name}`,
      });
      setConfirmed(true);
      setTimeout(() => router.push("/"), 3500);
    } catch (err) {
      console.error(err);
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center max-w-md w-full p-10 bg-card rounded-lg shadow-md text-center gap-4">
        <CheckCircle2 className="text-green-500" size={72} />
        <h2 className="text-2xl font-semibold">Message sent successfully</h2>
        <p className="text-muted-foreground">We received your request. Redirecting you to the homepage…</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-md w-full p-8 bg-card rounded-lg shadow-md">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Technical Support</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Tell us what’s wrong and we’ll get back to you shortly.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="Your Name" value={data.name} onChange={handleChange} />
          {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" value={data.email} onChange={handleChange} />
          {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={data.phone} onChange={handleChange} />
          {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe the issue in detail"
            className="h-28 w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={6}
            value={data.message}
            onChange={handleChange}
          />
          {errors.message && <p className="text-red-600 text-xs">{errors.message}</p>}
        </div>
        {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
        <Button type="submit" className="w-full" disabled={loading || !isValid}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
