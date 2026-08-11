"use client";

import Link from "next/link";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function AdminSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#1e293b",
        color: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          p: 2,
          textAlign: "center",
        }}
      >
        Admin Panel
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/dashboard"
          >
            <ListItemText
              primary="Dashboard"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/pending-sellers"
          >
            <ListItemText
              primary="Pending Sellers"
            />
          </ListItemButton>
        </ListItem>

          <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/categories"
          >
            <ListItemText
              primary="categories"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/product/pending-products/"
          >
            <ListItemText
              primary="Products"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/orders"
          >
            <ListItemText
              primary="Orders"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/admin/users"
          >
            <ListItemText
              primary="Users"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}