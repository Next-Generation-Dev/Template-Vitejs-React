import { WebSite, WithContext } from "schema-dts";

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
