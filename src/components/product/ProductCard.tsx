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
        width: {
          xs: "100%",
          sm: 300,
        },
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

      <CardContent>
        <Typography
          variant="h6"
        >
          {product.name}
        </Typography>

        <Typography>
          ₹ {product.price}
        </Typography>

        <Typography>
          Seller:{" "}
          {
            product.sellerId
              ?.name
          }
        </Typography>

        <Typography>
          Status:{" "}
          {product.status}
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