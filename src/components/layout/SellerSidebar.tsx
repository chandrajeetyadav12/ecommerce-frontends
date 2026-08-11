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

export default function SellerSidebar() {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#0f766e",
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
        Seller Panel
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/seller/dashboard"
          >
            <ListItemText
              primary="Dashboard"
            />
          </ListItemButton>
        </ListItem>

           <ListItem disablePadding>
   
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/seller/profile"
          >
            <ListItemText
              primary="My Profile"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/seller/products/create"
          >
            <ListItemText
              primary="Products"
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/seller/orders"
          >
            <ListItemText
              primary="Orders"
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}