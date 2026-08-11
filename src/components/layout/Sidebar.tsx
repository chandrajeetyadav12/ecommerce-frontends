"use client";

import Link from "next/link";

type Props = {
  role: string;
};

export default function Sidebar({
  role,
}: Props) {
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ddd",
        minHeight: "100vh",
      }}
    >
      {role === "admin" && (
        <>
          <Link href="/admin/dashboard">
            Dashboard
          </Link>

          <br />

          <Link href="/admin/pending-sellers">
            Pending Sellers
          </Link>

          <br />

          <Link href="/admin/products">
            Manage Products
          </Link>
        </>
      )}

      {role === "seller" && (
        <>
          <Link href="/seller/dashboard">
            Dashboard
          </Link>

          <br />

          <Link href="/seller/products">
            My Products
          </Link>

          <br />

          <Link href="/seller/orders">
            Orders
          </Link>
        </>
      )}

      {role === "customer" && (
        <>
          <Link href="/customer/dashboard">
            Dashboard
          </Link>

          <br />

          <Link href="/products">
            Products
          </Link>

          <br />

          <Link href="/customer/orders">
            My Orders
          </Link>
        </>
      )}
    </div>
  );
}