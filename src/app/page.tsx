import ProductList from "@/components/product/ProductList";
import {
  Box,
  Typography,
} from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        px: 2,
         }}
    >
      <Box
        sx={{
          textAlign: "center",
          mt: 8,
        }}
      >
        <Typography variant="h3">
          Welcome To Ecommerce Store
        </Typography>

        <Typography
          sx={{ mt: 2 }}
        >
          Browse products and shop online.
        </Typography>
        {/* Featured Products */}
        <ProductList />




      </Box>
    </Box>
  );
}