"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onApprove?: (
    id: string
  ) => void;
  onReject?: (
    id: string
  ) => void;
}

export default function ProductCard({
  product,
  onApprove,
  onReject,
}: ProductCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        mx: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {product.images?.[0] && (
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={200}
          unoptimized
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1.5, fontWeight: 600 }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700 }}>Price:</span>
          <span style={{ fontWeight: 400 }}>₹ {product.price}</span>
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700 }}>Stock:</span>
          <span style={{ fontWeight: 400 }}>
            {product.stock} units
          </span>
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 700 }}>Status:</span>
          <span style={{ fontWeight: 400 }}>{product.status}</span>
        </Typography>

        <Typography
          sx={{
            display: "flex",
            // flexDirection: "column",
            gap: 0.5,
          }}
        >
          <span style={{ fontWeight: 700 }}>Description:</span>
          <span style={{ fontWeight: 400, whiteSpace: "pre-wrap" }}>
            {product.description}
          </span>
        </Typography>
      </CardContent>

      {(onApprove ||
        onReject) && (
        <CardActions>
          {onApprove && (
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                onApprove(
                  product._id
                )
              }
            >
              Approve
            </Button>
          )}

          {onReject && (
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                onReject(
                  product._id
                )
              }
            >
              Reject
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}