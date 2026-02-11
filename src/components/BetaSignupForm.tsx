"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { betaSignupSchema, type BetaSignupData } from "@/lib/betaValidation";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface BetaSignupFormProps {
  variant?: "default" | "inline" | "stacked";
}

export default function BetaSignupForm({
  variant = "default",
}: BetaSignupFormProps) {
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
          phoneType: data.phoneType,
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
      <div className={variant === "inline" ? "" : "text-center lg:text-left"}>
        <p className="!text-[1.2rem] text-accent">
          A seed has been planted in the quiet earth, wait for the bloom.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div
        className={`space-y-4 ${variant === "inline" ? "" : "text-center lg:text-left"}`}
      >
        <p className="!text-[1.2rem] text-accent">{errorMessage}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form-stacked"
        noValidate
      >
        <div className="signup-input-wrapper">
          <input
            {...register("email")}
            type="email"
            className="form-field form-input"
            placeholder="Enter your email"
            disabled={status === "submitting"}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <fieldset
          className="phone-type-fieldset"
          disabled={status === "submitting"}
        >
          <legend className="phone-type-legend">Select your device</legend>
          <div className="phone-type-options">
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="iphone"
                className="phone-type-radio"
              />
              <span>iPhone</span>
            </label>
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="android"
                className="phone-type-radio"
              />
              <span>Android</span>
            </label>
          </div>
          {errors.phoneType && (
            <p className="form-error">{errors.phoneType.message}</p>
          )}
        </fieldset>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "..." : "Send"}
        </button>
      </form>
    );
  }

  if (variant === "inline") {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="signup-form-inline"
        noValidate
      >
        <div className="signup-input-wrapper">
          <input
            {...register("email")}
            type="email"
            className="form-field form-input"
            placeholder="Enter your email"
            disabled={status === "submitting"}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <fieldset
          className="phone-type-fieldset"
          disabled={status === "submitting"}
        >
          <legend className="phone-type-legend">Select your device</legend>
          <div className="phone-type-options">
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="iphone"
                className="phone-type-radio"
              />
              <span>iPhone</span>
            </label>
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="android"
                className="phone-type-radio"
              />
              <span>Android</span>
            </label>
          </div>
          {errors.phoneType && (
            <p className="form-error">{errors.phoneType.message}</p>
          )}
        </fieldset>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "..." : "Send"}
        </button>
      </form>
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
        <fieldset
          className="phone-type-fieldset"
          disabled={status === "submitting"}
        >
          <legend className="phone-type-legend">Select your device</legend>
          <div className="phone-type-options">
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="iphone"
                className="phone-type-radio"
              />
              <span>iPhone</span>
            </label>
            <label className="phone-type-label">
              <input
                {...register("phoneType")}
                type="radio"
                value="android"
                className="phone-type-radio"
              />
              <span>Android</span>
            </label>
          </div>
          {errors.phoneType && (
            <p className="form-error">{errors.phoneType.message}</p>
          )}
        </fieldset>
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
