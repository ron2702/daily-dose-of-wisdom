import { QuoteGenerator } from '@/components/QuoteGenerator';

export default function HomePage() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-12 border-b-4 border-teal-500 pb-2">
        Daily Dose of Wisdom 💡
      </h1>
      
      <QuoteGenerator />
    </main>
  );
}