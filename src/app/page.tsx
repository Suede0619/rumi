import Image from "next/image";
import BetaSignupForm from "@/components/BetaSignupForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--grid-gap)] items-center">
          {/* Content (appears first on mobile, right on desktop) */}
          <div className="flex flex-col justify-center py-16 px-4 lg:px-8 order-1 lg:order-2">
            <header className="mb-12">
              <Image
                src="/images/shape.svg"
                alt=""
                width={150}
                height={150}
                className="mx-auto lg:mx-0 mb-[50px] w-[130px] h-[130px] lg:w-[150px] lg:h-[150px]"
              />
              <h1 className="!mb-0 text-center lg:text-left">The Rumi App</h1>
              <h4 className="text-muted text-center lg:text-left">
                A Spiritual Wisdom Companion for the Modern World
              </h4>
            </header>

            <BetaSignupForm />
          </div>

          {/* Image (appears second on mobile, left on desktop) */}
          <div className="flex justify-center px-4 pb-16 lg:p-5 order-2 lg:order-1">
            <Image
              src="/images/horse-left.webp"
              alt="Decorative horse illustration"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
