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

export default function CustomerSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#2563eb",
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
        Customer Panel
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/customer/dashboard"
          >
            <ListItemText
              primary="Dashboard"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/customer/profile"
          >
            <ListItemText
              primary="My Profile"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/customer/order"
          >
            <ListItemText
              primary="My Orders"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/customer/wishlist"
          >
            <ListItemText
              primary="Wishlist"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}