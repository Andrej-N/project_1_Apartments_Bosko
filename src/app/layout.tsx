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

const SITE_URL = "https://luxapartmanibudva.me";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lux Apartmani Budva | Luksuzni smeštaj u centru Budve, Crna Gora",
    template: "%s | Lux Apartmani Budva",
  },
  description:
    "5 luksuznih apartmana u samom centru Budve sa pogledom na more i Stari grad. Potpuno opremljeni apartmani sa klima uređajem, WiFi-jem i parkingom. Idealno za letovanje u Crnoj Gori. Rezervišite direktno za najbolju cenu.",
  keywords: [
    "apartmani Budva",
    "smeštaj Budva",
    "luksuzni apartmani Budva",
    "apartmani sa pogledom na more Budva",
    "apartman Budva centar",
    "privatni smeštaj Budva",
    "letovanje Budva",
    "Crna Gora apartmani",
    "Montenegro apartments Budva",
    "vacation rental Budva",
    "Budva accommodation",
    "Budva old town apartments",
    "apartmani blizu mora Budva",
    "apartmani Stari grad Budva",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lux Apartmani Budva | Luksuzni smeštaj u centru Budve",
    description:
      "5 luksuznih apartmana u srcu Budve sa pogledom na more i Stari grad. Potpuno opremljeni, savršena lokacija za nezaboravan odmor u Crnoj Gori.",
    type: "website",
    locale: "sr_RS",
    url: SITE_URL,
    siteName: "Lux Apartmani Budva",
    images: [
      {
        url: `${basePath}/images/hero-budva-panorama.jpg`,
        width: 1200,
        height: 630,
        alt: "Lux Apartmani Budva - Panoramski pogled na Stari grad i more",
      },
      {
        url: `${basePath}/images/apartments/1102-1104/city-sea-panorama.jpg`,
        width: 1200,
        height: 630,
        alt: "Pogled sa apartmana na more i grad Budvu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Apartmani Budva | Luksuzni smeštaj u centru Budve",
    description:
      "5 luksuznih apartmana u srcu Budve sa pogledom na more i Stari grad. Rezervišite direktno za najbolju cenu.",
    images: [`${basePath}/images/hero-budva-panorama.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "ME-02",
    "geo.placename": "Budva",
    "geo.position": "42.2911;18.8403",
    ICBM: "42.2911, 18.8403",
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
              "@graph": [
                {
                  "@type": "LodgingBusiness",
                  "@id": `${SITE_URL}/#lodging`,
                  name: "Lux Apartmani Budva",
                  description:
                    "5 luksuznih apartmana u centru Budve sa pogledom na more i Stari grad. Moderan komfor, savršena lokacija za odmor u Crnoj Gori.",
                  url: SITE_URL,
                  telephone: "+382 69 986 212",
                  email: "apartman-wow@hotmail.com",
                  image: `${SITE_URL}${basePath}/images/hero-budva-panorama.jpg`,
                  priceRange: "$$",
                  currenciesAccepted: "EUR",
                  paymentAccepted: "Cash, Credit Card",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Budva",
                    addressLocality: "Budva",
                    addressRegion: "Crna Gora",
                    postalCode: "85310",
                    addressCountry: "ME",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 42.2911,
                    longitude: 18.8403,
                  },
                  hasMap: "https://maps.google.com/?q=42.2911,18.8403",
                  starRating: {
                    "@type": "Rating",
                    ratingValue: "4",
                  },
                  checkinTime: "14:00",
                  checkoutTime: "10:00",
                  numberOfRooms: 5,
                  amenityFeature: [
                    { "@type": "LocationFeatureSpecification", name: "Besplatan WiFi", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Klima uređaj", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Potpuno opremljena kuhinja", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Veš mašina", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Pogled na more", value: true },
                    { "@type": "LocationFeatureSpecification", name: "Terasa", value: true },
                  ],
                  containsPlace: [
                    {
                      "@type": "Accommodation",
                      name: "Apartman 302",
                      description: "Luksuzni apartman sa pogledom na more i Stari grad Budve",
                      occupancy: {
                        "@type": "QuantitativeValue",
                        maxValue: 4,
                      },
                      numberOfBedrooms: 1,
                      floorLevel: "3",
                    },
                    {
                      "@type": "Accommodation",
                      name: "Apartman 1106",
                      description: "Panoramski apartman na visokom spratu sa pogledom na grad",
                      occupancy: {
                        "@type": "QuantitativeValue",
                        maxValue: 4,
                      },
                      numberOfBedrooms: 1,
                      floorLevel: "11",
                    },
                    {
                      "@type": "Accommodation",
                      name: "Apartman 1102",
                      description: "Apartman sa pogledom na more i Stari grad",
                      occupancy: {
                        "@type": "QuantitativeValue",
                        maxValue: 3,
                      },
                      numberOfBedrooms: 1,
                      floorLevel: "11",
                    },
                    {
                      "@type": "Accommodation",
                      name: "Apartman 1103",
                      description: "Apartman sa pogledom na more i Stari grad",
                      occupancy: {
                        "@type": "QuantitativeValue",
                        maxValue: 3,
                      },
                      numberOfBedrooms: 1,
                      floorLevel: "11",
                    },
                    {
                      "@type": "Accommodation",
                      name: "Apartman 1104",
                      description: "Apartman sa pogledom na more i grad",
                      occupancy: {
                        "@type": "QuantitativeValue",
                        maxValue: 3,
                      },
                      numberOfBedrooms: 1,
                      floorLevel: "11",
                    },
                  ],
                },
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Početna",
                      item: SITE_URL,
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Lux Apartmani Budva",
                  description: "Luksuzni apartmani u centru Budve, Crna Gora",
                  inLanguage: "sr",
                },
                {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}/#webpage`,
                  url: SITE_URL,
                  name: "Lux Apartmani Budva | Luksuzni smeštaj u centru Budve",
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                  about: { "@id": `${SITE_URL}/#lodging` },
                  inLanguage: "sr",
                },
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
