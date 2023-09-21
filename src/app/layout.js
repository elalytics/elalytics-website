import "./globals.css";
import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import logo from "./assets/imgs/stanford-gse.png";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Elalytics",
  description: "Elalytics Visualizations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
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
      </body>
    </html>
  );
}
