"use client";

import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 overflow-visible">
          <Image
            src="/menulogo.png"
            alt="Menu Logo"
            fill
            className="object-contain animate-slide-up will-change-transform"
            priority
          />
        </div>
        <div className="mt-4 text-2xl sm:text-3xl font-black text-green-700 opacity-0 animate-fade-in tracking-wide">
          जनसेतु
        </div>
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          0% { transform: translateY(60px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 1200ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .animate-fade-in { animation: fade-in 900ms ease-out 300ms both; }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up, .animate-fade-in { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
