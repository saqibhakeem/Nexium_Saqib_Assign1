import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Qoute Generator",
  description: "Generate quotes based on topics",
  icons: {
    icon: "/quotation.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
