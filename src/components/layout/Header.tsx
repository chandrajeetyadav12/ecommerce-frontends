"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { logoutUser } from "@/services/auth.service";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDashboard = () => {
    setOpen(false);

    if (user?.role === "admin") {
      router.push("/admin/dashboard");
    } else if (user?.role === "seller" && user.status === "approved") {
      router.push("/seller/dashboard");
    } else if (user?.role === "seller" && user.status === "pending") {
      router.push("/seller/pending");
    } else {
      router.push("/customer/dashboard");
    }
  };

  const renderNavLinks = (closeMenu?: () => void) => {
    const handleClose = () => {
      closeMenu?.();
    };

    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        <Button color="inherit" component={Link} href="/" onClick={handleClose}>
          Home
        </Button>

        <Button color="inherit" component={Link} href="/products" onClick={handleClose}>
          Products
        </Button>

        {!user ? (
          <>
            <Button color="inherit" component={Link} href="/login" onClick={handleClose}>
              Login
            </Button>
            <Button color="inherit" component={Link} href="/register" onClick={handleClose}>
              Register
            </Button>
          </>
        ) : (
          <>
            <Typography component="span" sx={{ mr: 1, ml: 1, fontWeight: 500 }}>
              {user.name}
            </Typography>

            {user.role === "customer" && (
              <Button color="inherit" component={Link} href="/become-seller/" onClick={handleClose}>
                Become Seller
              </Button>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>

            <Button color="inherit" onClick={handleDashboard}>
              Dashboard
            </Button>
          </>
        )}
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}
        >
          Ecommerce Store
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" aria-label="open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <Box sx={{ width: 260, p: 2 }} role="presentation">
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Menu
                </Typography>

                <List>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/" onClick={() => setOpen(false)}>
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/products" onClick={() => setOpen(false)}>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </ListItem>

                  {!user ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton component={Link} href="/login" onClick={() => setOpen(false)}>
                          <ListItemText primary="Login" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton component={Link} href="/register" onClick={() => setOpen(false)}>
                          <ListItemText primary="Register" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemText primary="Logout" />
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton onClick={handleDashboard}>
                          <ListItemText primary="Dashboard" />
                        </ListItemButton>
                      </ListItem>

                      {user.role === "customer" && (
                        <ListItem disablePadding>
                          <ListItemButton component={Link} href="/become-seller/" onClick={() => setOpen(false)}>
                            <ListItemText primary="Become Seller" />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          renderNavLinks()
        )}
      </Toolbar>
    </AppBar>
  );
}