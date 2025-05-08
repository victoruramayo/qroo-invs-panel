import "../styles/main.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { CssVarsProvider, ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import { SessionProvider } from "next-auth/react";
import { CssBaseline } from "@mui/material";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Qroo Dashboard",
  description: "Dashboard para fiscalia",
  icons: [{ rel: "icon", url: "/speedometer.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <InitColorSchemeScript attribute="class" />
      </head>

      <body>
        <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
          <SessionProvider>
            <CssVarsProvider theme={theme}>
              <CssBaseline />
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </CssVarsProvider>
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
