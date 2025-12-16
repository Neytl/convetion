import { Open_Sans } from "next/font/google";
import "./css/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mini Convención",
  description: "Inscripción para el Mini Convención 2026",
  icons: {
    icon: "/images/favicon.png",
  },
  lang: "es",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${openSans.className}`}>
      <body>{children}</body>
    </html>
  );
}
