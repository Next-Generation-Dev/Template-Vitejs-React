import { WebSite, WithContext, Organization, LocalBusiness } from "schema-dts";

const title = "Next Generation - Agence Web";
const description =
  "Next Generation est une agence web spécialisée dans la création de sites vitrines, e-commerce et la refonte de sites web. Découvrez nos réalisations et les avis de nos clients satisfaits.";

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  keywords: [
    "Agence web",
    "Création de site vitrine",
    "Création de site e-commerce",
    "Refonte de site web",
    "Référencement naturel",
    "Développement web sur mesure",
  ],
  authors: [
    {
      name: "Next Generation",
      url: "https://next-generation.dev/",
    },
  ],
  creator: "Next Generation - Agence web",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description,
    url: "https://next-generation.dev",
    siteName: "Next Generation",
    images: [
      {
        url: "https://next-generation.dev/api/og",
        width: 1200,
        height: 630,
        alt: "Next Generation - Agence Web",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@nextgeneration",
    site: "@nextgeneration",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://next-generation.dev",
    languages: {
      "fr-FR": "https://next-generation.dev",
    },
  },
};

export function generateWebsiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    description: description,
    url: "https://next-generation.dev",
  };
}

export function generateOrganizationJsonLd(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Next Generation",
    url: "https://next-generation.dev",
    logo: "https://next-generation.dev/logo.png",
    sameAs: [
      "https://www.facebook.com/nextgeneration",
      "https://www.twitter.com/nextgeneration",
      "https://www.linkedin.com/company/nextgeneration",
    ],
  };
}

export function generateLocalBusinessJsonLd(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Next Generation",
    image: "https://next-generation.dev/store-image.jpg",
    "@id": "https://next-generation.dev",
    url: "https://next-generation.dev",
    telephone: "+33123456789",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Rue de l'Innovation",
      addressLocality: "Paris",
      postalCode: "75001",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}
