"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const DAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const MONTHS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];

// Mock booked dates (current month)
function getBookedDates(year: number, month: number): Set<number> {
  const booked = new Set<number>();
  // Always book some dates in any viewed month for demo
  if (month === new Date().getMonth() && year === new Date().getFullYear()) {
    [5, 6, 7, 14, 15, 22, 23, 24, 25].forEach((d) => booked.add(d));
  } else {
    [3, 4, 10, 11, 12, 18, 19, 20].forEach((d) => booked.add(d));
  }
  return booked;
}

export default function Calendar({ onOpenModal }: { onOpenModal: () => void }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const bookedDates = useMemo(
    () => getBookedDates(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Monday-based: 0=Mon, 6=Sun
  const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <section id="calendar" className="py-24 md:py-32 px-6 bg-charcoal-light">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold uppercase tracking-[0.3em] text-sm mb-4">
              Dostupnost
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-4">
              Kalendar <span className="text-gold italic">rezervacija</span>
            </h2>
            <p className="text-offwhite-dim">
              Izaberite slobodan termin i pošaljite upit
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="border border-charcoal-lighter p-6 md:p-8">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="p-2 hover:text-gold transition-colors"
                aria-label="Prethodni mesec"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-serif text-xl text-offwhite">
                {MONTHS[viewMonth]} {viewYear}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:text-gold transition-colors"
                aria-label="Sledeći mesec"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs uppercase tracking-wider text-offwhite-dim py-2"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const booked = bookedDates.has(day);
                const past = isPast(day);
                const todayClass = isToday(day);

                return (
                  <button
                    key={day}
                    disabled={booked || past}
                    onClick={() => !booked && !past && onOpenModal()}
                    className={`
                      relative py-3 text-sm text-center transition-all duration-300 rounded-sm
                      ${todayClass ? "ring-1 ring-gold" : ""}
                      ${
                        booked
                          ? "text-offwhite-dim/40 line-through cursor-not-allowed bg-charcoal-lighter/30"
                          : past
                          ? "text-offwhite-dim/30 cursor-not-allowed"
                          : "text-offwhite hover:bg-gold/20 hover:text-gold cursor-pointer"
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-8 text-xs text-offwhite-dim">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gold/20 border border-gold/40 rounded-sm" />
                Slobodno
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-charcoal-lighter/50 rounded-sm" />
                Zauzeto
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 ring-1 ring-gold rounded-sm" />
                Danas
              </div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="text-center mt-10">
            <button
              onClick={onOpenModal}
              className="px-10 py-4 bg-gold text-charcoal font-semibold uppercase tracking-wider text-sm hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              Pošaljite upit za rezervaciju
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
