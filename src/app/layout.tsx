import "../styles/main.css"

import { Inter } from 'next/font/google'
import { type Metadata } from "next";
import "react-datepicker/dist/react-datepicker.css";

import { TRPCReactProvider } from "@/trpc/react";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Qroo Dashboard",
  description: "Dashboard para fiscalia",
  icons: [{ rel: "icon", url: "/speedometer.ico" }],
};
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
      suppressHydrationWarning={true}
    >
      <body>
        <Provider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </Provider>
      </body>
    </html>
  );
}
