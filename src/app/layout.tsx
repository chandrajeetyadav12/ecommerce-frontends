"use client";
import AuthInitializer from "@/components/AuthInitializer";
import Header from "@/components/layout/Header";
import MuiProvider from "@/providers/MuiProvider";
import ReduxProvider from "@/redux/provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <MuiProvider>
            <Header/>
             <AuthInitializer />
          {children}
          </MuiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}