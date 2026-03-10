"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import Calendar from "@/components/Calendar";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Hero onOpenModal={() => setModalOpen(true)} />
        <About />
        <Gallery />
        <Amenities />
        <Calendar onOpenModal={() => setModalOpen(true)} />
        <CTASection />
      </main>
      <Footer />
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
