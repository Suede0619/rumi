"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { betaSignupSchema, type BetaSignupData } from "@/lib/betaValidation";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function BetaSignupForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BetaSignupData>({
    resolver: zodResolver(betaSignupSchema),
  });

  const onSubmit = async (data: BetaSignupData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: "Beta Signup",
          message: "Beta launch signup request",
        }),
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
      <div>
        <p className="!text-[1.4rem] text-accent">
          A seed has been planted in the quiet earth, wait for the bloom.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4">
        <p className="!text-[1.4rem] text-accent">{errorMessage}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="!text-[1.4rem] text-muted">Sign up for the beta launch</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <input
            {...register("email")}
            type="email"
            className="form-field form-input w-full lg:max-w-[400px]"
            placeholder="Enter your email"
            disabled={status === "submitting"}
          />
          {errors.email && (
            <p className="form-error mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
