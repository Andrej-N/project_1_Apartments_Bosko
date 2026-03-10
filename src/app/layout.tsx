import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apartman Boško | Luxury Stay in Serbia",
  description:
    "Experience the charm of Serbia in our beautifully appointed luxury apartment. Fully equipped, centrally located, and available for short and long-term stays. Book directly for the best rates.",
  keywords:
    "apartment rental Serbia, luxury accommodation, short term rental, Apartman Boško, vacation rental Serbia",
  openGraph: {
    title: "Apartman Boško | Luxury Stay in Serbia",
    description:
      "Experience the charm of Serbia in our beautifully appointed luxury apartment.",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Apartman Boško",
              description:
                "Luxury apartment rental in Serbia with modern amenities and traditional charm.",
              image: "/images/room-overview.jpg",
              address: {
                "@type": "PostalAddress",
                addressCountry: "RS",
                addressLocality: "Serbia",
              },
              priceRange: "$$",
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
                { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
                { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
                { "@type": "LocationFeatureSpecification", name: "Washing Machine", value: true },
              ],
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
