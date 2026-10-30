import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christian Names Dictionary",
    short_name: "Christian Names",
    description:
      "A comprehensive, free dictionary of Christian and biblical baby names with verified meanings, origins, and Scripture references.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5EE",
    theme_color: "#581825",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

