import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "VoltAir Solutions | Electrical, Aircon & Property Maintenance", description: "Electrical, air-conditioning and property maintenance services for homeowners, landlords and businesses across Johannesburg.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-ZA"><body>{children}</body></html>; }
