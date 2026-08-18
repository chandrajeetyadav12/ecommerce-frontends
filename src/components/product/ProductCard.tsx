"use client";

import Image from "next/image";
import Link from "next/link";
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
        maxWidth: "none",
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

      <CardActions sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          component={Link}
          href={`/products/${product._id}`}
          variant="outlined"
          size="small"
        >
          View Details
        </Button>

        {(onApprove ||
          onReject) && (
          <>
            {onApprove && (
              <Button
                variant="contained"
                color="success"
                size="small"
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
                size="small"
                onClick={() =>
                  onReject(
                    product._id
                  )
                }
              >
                Reject
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
}