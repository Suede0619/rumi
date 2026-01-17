"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        const result = await response.json();
        throw new Error(result.error || "Failed to submit");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Network error. Please try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <Section>
        <div className="card text-center space-y-4">
          <h3 className="text-accent">Thank You!</h3>
          <p>Your message has been received. We&apos;ll be in touch soon.</p>
        </div>
      </Section>
    );
  }

  if (status === "error") {
    return (
      <Section>
        <div className="card card-bordered space-y-4">
          <p>{errorMessage}</p>
          <button onClick={() => setStatus("idle")} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </Section>
    );
  }

  if (status === "submitting") {
    return (
      <Section>
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="spinner" />
          <p className="text-muted">Submitting...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <header className="text-center mb-8">
        <h2 className="mb-4">The Rumi App</h2>
        <p className="text-muted">
          A Spiritual Wisdom Companion for the Modern World
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <Field label="Name" required error={errors.name?.message}>
          <input
            {...register("name")}
            className="form-field form-input"
            placeholder="Enter your full name"
          />
        </Field>

        <Field label="Email Address" required error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            className="form-field form-input"
            placeholder="Enter your email"
          />
        </Field>

        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            className="form-field form-input"
            placeholder="Your company (optional)"
          />
        </Field>

        <Field label="Message" required error={errors.message?.message}>
          <textarea
            {...register("message")}
            className="form-field form-textarea"
            placeholder="Tell us how we can help..."
          />
        </Field>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit
        </button>
      </form>
    </Section>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="form-label" data-error={!!error}>
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
