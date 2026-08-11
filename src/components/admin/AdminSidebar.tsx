"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        borderRight:
          "1px solid #ddd",
        padding: "20px",
      }}
    >
      <h2>Admin</h2>

      <ul>
        <li>
          <Link href="/admin/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link href="/admin/pending-sellers">
            Pending Sellers
          </Link>
        </li>

        <li>
          <Link href="/admin/products">
            Products
          </Link>
        </li>

        <li>
          <Link href="/admin/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link href="/admin/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}