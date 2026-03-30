"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ExternalLink } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { apartments, type ApartmentId } from "./Apartments";

const DAYS = ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"];
const MONTHS = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];

// Booking.com links per apartment (replace with individual property links)
const bookingLinks: Record<ApartmentId, string> = {
  "302":  "https://www.booking.com/Share-9D3tSgQ",
  "1102": "https://www.booking.com/Share-9D3tSgQ",
  "1103": "https://www.booking.com/Share-9D3tSgQ",
  "1104": "https://www.booking.com/Share-9D3tSgQ",
  "1106": "https://www.booking.com/Share-9D3tSgQ",
};

// Mock booked dates per apartment
// TODO: Replace with real iCal feed from Booking.com Extranet
function getBookedDates(year: number, month: number, apartmentId: ApartmentId): Set<number> {
  const booked = new Set<number>();
  const isCurrentMonth = month === new Date().getMonth() && year === new Date().getFullYear();

  const mockData: Record<ApartmentId, { current: number[]; other: number[] }> = {
    "302":  { current: [5, 6, 7, 14, 15], other: [3, 4, 10, 11, 12] },
    "1102": { current: [8, 9, 10, 20, 21, 22], other: [5, 6, 15, 16] },
    "1103": { current: [12, 13, 14, 25, 26], other: [7, 8, 18, 19] },
    "1104": { current: [3, 4, 5, 18, 19], other: [10, 11, 22, 23] },
    "1106": { current: [1, 2, 3, 22, 23, 24, 25], other: [6, 7, 13, 14, 20] },
  };

  const dates = isCurrentMonth ? mockData[apartmentId].current : mockData[apartmentId].other;
  dates.forEach((d) => booked.add(d));
  return booked;
}

export default function Calendar({
  selectedApartment,
  onApartmentChange,
}: {
  selectedApartment: ApartmentId;
  onApartmentChange: (id: ApartmentId) => void;
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bookedDates = useMemo(
    () => getBookedDates(viewYear, viewMonth, selectedApartment),
    [viewYear, viewMonth, selectedApartment]
  );

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
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

  const currentApt = apartments.find((a) => a.id === selectedApartment)!;
  const bookingUrl = bookingLinks[selectedApartment];

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
              Pogledajte slobodne termine i rezervišite preko Booking.com
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="border border-charcoal-lighter p-6 md:p-8">
            {/* Apartment selector */}
            <div className="mb-8">
              <label className="block text-offwhite-dim text-xs uppercase tracking-wider mb-2">
                Izaberite apartman
              </label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full bg-charcoal border border-charcoal-lighter px-4 py-3 text-offwhite text-sm flex items-center justify-between hover:border-gold/40 transition-colors cursor-pointer"
                >
                  <span>{currentApt.name} — {currentApt.floor}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gold transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 z-20 bg-charcoal border border-charcoal-lighter border-t-0 shadow-xl">
                    {apartments.map((apt) => (
                      <button
                        key={apt.id}
                        onClick={() => {
                          onApartmentChange(apt.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-sm text-left transition-colors cursor-pointer flex items-center justify-between ${
                          apt.id === selectedApartment
                            ? "bg-gold/10 text-gold"
                            : "text-offwhite-dim hover:bg-charcoal-lighter hover:text-offwhite"
                        }`}
                      >
                        <span>{apt.name} — {apt.floor}</span>
                        <span className="text-xs text-offwhite-dim/60">{apt.view}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="p-2 hover:text-gold transition-colors cursor-pointer"
                aria-label="Prethodni mesec"
              >
                <ChevronLeft size={20} />
              </button>
              <h3 className="font-serif text-xl text-offwhite">
                {MONTHS[viewMonth]} {viewYear}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:text-gold transition-colors cursor-pointer"
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
                  <div
                    key={day}
                    className={`
                      relative py-3 text-sm text-center transition-all duration-300 rounded-sm
                      ${todayClass ? "ring-1 ring-gold" : ""}
                      ${
                        booked
                          ? "text-offwhite-dim/40 line-through bg-charcoal-lighter/30"
                          : past
                          ? "text-offwhite-dim/30"
                          : "text-offwhite"
                      }
                    `}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 mt-8 text-xs text-offwhite-dim">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-charcoal border border-charcoal-lighter rounded-sm" />
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
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#003580] text-white font-semibold uppercase tracking-wider text-sm hover:bg-[#00264d] transition-all duration-300 hover:shadow-lg hover:shadow-[#003580]/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M2.27 7.277a3.2 3.2 0 1 1 6.4 0 3.2 3.2 0 0 1-6.4 0Zm7.097 9.882a5.527 5.527 0 0 1-3.897 1.614 5.527 5.527 0 0 1-3.897-1.614A5.49 5.49 0 0 1 0 13.273V7.277a7.47 7.47 0 0 1 5.47-7.2v3.048a3.2 3.2 0 1 0 0 6.303v3.845a1.327 1.327 0 0 1-2.654 0v-.827H0v.827a4.127 4.127 0 0 0 5.47 3.897 4.127 4.127 0 0 0 3.897-3.897v-.827H6.72v.827c0 .695-.55 1.26-1.25 1.26-.7 0-1.25-.565-1.25-1.26v-.827H1.573v.827a3.9 3.9 0 0 0 3.897 3.897 3.9 3.9 0 0 0 3.897-3.897ZM20.8 7.277a3.2 3.2 0 1 0-6.4 0 3.2 3.2 0 0 0 6.4 0Z" />
              </svg>
              Rezervišite na Booking.com
              <ExternalLink size={16} className="opacity-60" />
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
