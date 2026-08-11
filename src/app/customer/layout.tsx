import CustomerSidebar from "@/components/layout/CustomerSidebar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <CustomerSidebar />

      <main
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </main>
    </div>
  );
}