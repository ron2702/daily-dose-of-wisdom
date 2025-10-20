import { QuoteGenerator } from "@/components/QuoteGenerator";
import { AnimatedTitle } from "@/components/AnimatedTitle";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-gray-100">
      <AnimatedTitle />

      <QuoteGenerator />
    </main>
  );
}
