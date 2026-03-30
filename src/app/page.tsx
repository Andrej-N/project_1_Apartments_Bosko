"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Apartments, { apartments, type ApartmentId } from "@/components/Apartments";
import Gallery from "@/components/Gallery";
import Amenities from "@/components/Amenities";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ApartmentGalleryModal from "@/components/ApartmentGalleryModal";

export default function Home() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryApartment, setGalleryApartment] = useState<ApartmentId | null>(null);

  const handleOpenGallery = useCallback((id: ApartmentId) => {
    setGalleryApartment(id);
    setGalleryOpen(true);
  }, []);

  const handleBookFromGallery = useCallback((id: ApartmentId) => {
    setGalleryOpen(false);
    const apt = apartments.find(a => a.id === id);
    if (apt) window.open(apt.bookingUrl, "_blank");
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Apartments onSelectApartment={handleOpenGallery} onOpenGallery={handleOpenGallery} />
        <Gallery />
        <Amenities />
        <CTASection />
      </main>
      <Footer />
      <ApartmentGalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        apartmentId={galleryApartment}
        onBook={handleBookFromGallery}
      />
    </>
  );
}
