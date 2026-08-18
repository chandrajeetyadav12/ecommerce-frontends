"use client";

import Link from "next/link";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const navItems = [
  { label: "Dashboard", href: "/customer/dashboard" },
  { label: "My Profile", href: "/customer/profile" },
  { label: "My Orders", href: "/customer/order" },
  { label: "Wishlist", href: "/customer/wishlist" },
];

export default function CustomerSidebar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: 260, md: 250 },
        height: "100%",
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
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {!isDesktop && (
        <Box
          sx={{
            width: 64,
            minHeight: "100vh",
            bgcolor: "#2563eb",
            p: 1,
            position: "sticky",
            top: 0,
            zIndex: 1200,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="Open sidebar"
            onClick={() => setMobileOpen(true)}
            sx={{ color: "white", mt: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {isDesktop ? (
        <Box sx={{ width: 250, minHeight: "100vh", flexShrink: 0 }}>{sidebarContent}</Box>
      ) : (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 260,
              height: "100vh",
              bgcolor: "#2563eb",
              color: "white",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}
    </>
  );
}