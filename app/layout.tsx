import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidNote - Transform YouTube Videos Into Actionable Insights",
  description: "Paste any YouTube URL and let AI extract key takeaways, action items, and insights. Never miss an important point from your favorite videos again.",
  keywords: ["YouTube", "video notes", "actionable insights", "AI", "productivity", "learning", "Gemini AI", "video summarizer"],
  authors: [{ name: "VidNote" }],
  openGraph: {
    title: "VidNote - Transform YouTube Videos Into Actionable Insights",
    description: "Paste any YouTube URL and let AI extract key takeaways, action items, and insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VidNote - Transform YouTube Videos Into Actionable Insights",
    description: "Paste any YouTube URL and let AI extract key takeaways, action items, and insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#f4e8ec" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
