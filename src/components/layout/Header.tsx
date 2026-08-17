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

import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { getCart } from "@/services/cart.service";
import { logoutUser } from "@/services/auth.service";
import { setCartCount } from "@/redux/slices/cartSlice";
import { useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector((state: RootState) => state.cart.count);

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        const res = await getCart();

        if (res.success) {
          const total = (res.cart?.items || []).reduce(
            (sum: number, item: { quantity: number }) => sum + item.quantity,
            0
          );

          dispatch(setCartCount(total));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCartCount();
  }, [dispatch]);

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

        <Button color="inherit" component={Link} href="/cart" onClick={handleClose} sx={{ position: "relative" }}>
          Cart
          {cartCount > 0 && (
            <Box
              component="span"
              sx={{
                position: "absolute",
                top: -6,
                right: -8,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                bgcolor: "error.main",
                color: "#fff",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 0.5,
              }}
            >
              {cartCount}
            </Box>
          )}
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
          BuyVerse Mart
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

                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/cart" onClick={() => setOpen(false)}>
                      <ListItemText primary={`Cart (${cartCount})`} />
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