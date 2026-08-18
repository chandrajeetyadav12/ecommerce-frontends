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
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <CustomerSidebar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            minWidth: 0,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}