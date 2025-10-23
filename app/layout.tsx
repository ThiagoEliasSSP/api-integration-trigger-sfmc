import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popup Notes",
  description:
    "Plataforma minimalista para registrar notas digitais em popups com QR codes",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
