"use client";

import { useState } from "react";
import { MessageCircle, Mail, Copy, Check } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const EMAIL = "apartman-wow@hotmail.com";

export default function CTASection() {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
            Kontakt
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-6">
            Spremni za <span className="text-gold italic">nezaboravan</span> boravak?
          </h2>
          <p className="text-offwhite-dim max-w-xl mx-auto mb-12 leading-relaxed">
            Pogledajte dostupnost na Booking.com ili nas kontaktirajte
            direktno putem WhatsApp-a i email-a za sva pitanja.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/38269986212?text=Zdravo%2C%20interesuju%20me%20apartmani%20u%20Budvi.%20Da%20li%20imate%20slobodnih%20termina%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#20bd5a] transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20 w-full sm:w-auto justify-center"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            {/* Email Button */}
            <button
              onClick={() => setShowEmail(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-gold text-charcoal font-semibold uppercase tracking-wider text-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 w-full sm:w-auto justify-center cursor-pointer"
            >
              <Mail size={20} />
              Email upit
            </button>
          </div>

          {/* Email reveal */}
          {showEmail && (
            <div className="mt-6 inline-flex items-center gap-3 bg-charcoal-light border border-charcoal-lighter px-6 py-4 rounded-sm">
              <Mail size={18} className="text-gold shrink-0" />
              <a
                href={`mailto:${EMAIL}?subject=Upit%20za%20apartman%20u%20Budvi`}
                className="text-offwhite hover:text-gold transition-colors text-sm md:text-base"
              >
                {EMAIL}
              </a>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-charcoal-lighter rounded-sm transition-colors cursor-pointer"
                title="Kopiraj email"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-offwhite-dim hover:text-gold transition-colors" />
                )}
              </button>
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
