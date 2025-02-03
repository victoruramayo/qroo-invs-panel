import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Provider } from "@/components/ui/provider";

export const metadata: Metadata = {
  title: "Qroo Dashboard",
  description: "Dashboard para fiscalia",
  icons: [{ rel: "icon", url: "/speedometer.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
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
