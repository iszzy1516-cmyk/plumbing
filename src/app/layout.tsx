import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { BusinessSchema } from "@/components/business-schema/business-schema";
import { CallBar } from "@/components/call-bar/call-bar";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { SmoothScroll } from "@/components/smooth-scroll/smooth-scroll";
import { site } from "@/config/site/site";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Plumbers covering ${site.area}`, template: `%s | ${site.name}` },
  description: `${site.name} fixes leaks, blockages, taps, toilets, radiators and bathrooms across ${site.area}. Ask for a quote or call ${site.phone.display}.`,
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={googleSans.variable}>
      {/* Browser extensions such as Grammarly add attributes to body before React loads. */}
      <body suppressHydrationWarning>
        <BusinessSchema />
        <SmoothScroll />
        <Navbar />
        {children}
        <Footer />
        <CallBar />
      </body>
    </html>
  );
}
