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
      <body style={{ margin: 0 }}>
        <ReduxProvider>
          <MuiProvider>
            <Header />
            <AuthInitializer />
            {children}

            <footer
              style={{
                background: "#111827",
                color: "#f9fafb",
                padding: "24px 20px",
                marginTop: "32px",
                textAlign: "center",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              <div>© 2026 BuyVerse Mart</div>
              <div>Address: Chandpur Salori Teliyarganj Prayagraj, Uttar Pradesh</div>
              <div>Contact Number: 6392004333</div>
            </footer>
          </MuiProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}