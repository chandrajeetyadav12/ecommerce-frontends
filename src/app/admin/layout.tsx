import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({
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
        <AdminSidebar />

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