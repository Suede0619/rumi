"use client";

import Image from "next/image";
import BetaSignupForm from "@/components/BetaSignupForm";

export default function Home() {
  const scrollToContent = () => {
    document
      .getElementById("content-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Hero Section - Full Viewport */}
      <section className="hero-section">
        {/* Left: Content (2/3) */}
        <div className="hero-content">
          <div className="hero-content-inner">
            <p className="coming-soon">COMING SOON</p>

            <h1>Rumi</h1>

            <blockquote className="hero-quote">
              "Silence is the language of God, all else
              <br />
              is poor translation."
            </blockquote>

            <p className="hero-description">
              Sign up for the beta launch.
              <br />
              Experience the new way to connect with nature and yourself.
            </p>

            <BetaSignupForm variant="stacked" />

            <button
              onClick={scrollToContent}
              className="scroll-indicator"
              aria-label="Scroll to discover our vision"
            >
              <span>Scroll to discover our vision</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="scroll-arrow"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Image (1/3) with fade */}
        <div className="hero-image">
          <div className="hero-image-fade"></div>
          <Image
            src="/images/garden1.webp"
            alt="Mystical garden"
            fill
            className="object-cover"
            style={{ objectPosition: "right center" }}
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section id="content-section" className="content-section">
        <div className="container">
          {/* Two-column: Spiritual Famine */}
          <div className="two-column-section">
            <div className="column-left">
              <h2>The Spiritual Famine</h2>
              <p>
                There is a spiritual famine happening in our world today. We are
                emotionally malnourished, disconnected, overwhelmed — where we
                once looked to spiritual texts, rituals, or mystics for
                guidance, today we scroll through never ending wellness content
                and productivity hacks, failing to find true nourishment for the
                soul.
              </p>
            </div>
            <div className="column-right">
              <p className="poetic italic-quote">
                The modern seeker is left wandering — with no map, no mentor, no
                meaning.
              </p>
              <p>
                More people than ever are deconstructing belief systems —
                turning away from religion, politics, even science — and seeking
                their own definition of truth, purpose, and inner peace.
              </p>
            </div>
          </div>

          {/* Full width: Introducing */}
          <div className="full-width-section introducing-section">
            <h2>Introducing The Rumi App</h2>
            <p className="lead-text">
              A first of its kind — emotionally intelligent guide to Rumi's
              teachings, powered by generative AI.
            </p>
          </div>

          {/* Two-column: Belief & Mission */}
          <div className="two-column-section belief-mission-section">
            <div className="column-left">
              <h3>OUR BELIEF</h3>
              <p>
                Inner life is not optional — it is the foundation of everything.
              </p>
            </div>
            <div className="column-right">
              <h3>OUR MISSION</h3>
              <p>
                To help seekers navigate the mystery of being human by
                rekindling their connection to spirit.
              </p>
            </div>
          </div>

          {/* Full width: Footer */}
          <div className="full-width-section footer-block">
            <p className="poetic closing-quote">
              "Re-imagining the wisdom of the ancients."
            </p>
            <p className="signature">WITH LOVE ~ RUMI SCRIBES</p>
          </div>
        </div>
      </section>
    </main>
  );
}
