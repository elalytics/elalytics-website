import "./globals.css";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import logo from "./assets/imgs/stanford-gse.png";

config.autoAddCss = false;

const source_sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

const source_serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export const metadata = {
  title: "Elalytics | Stanford GSE",
  description: "Elalytics Visualizations",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${source_sans.variable} ${source_serif.variable}`}
    >
      <body className="bg-gray-100">
        <div className="flex flex-col min-h-screen">
          <header className="bg-cardinal-red-dark text-white text-sm font-serif">
            <p className="ml-6 my-1">Stanford University</p>
          </header>
          <main className="flex-grow">{children}</main>
          <footer>
            <div className="w-full bg-white py-6">
              <Image
                className="m-auto"
                src={logo}
                width={250}
                alt="Stanford Graduate School of Education Logo"
              ></Image>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
