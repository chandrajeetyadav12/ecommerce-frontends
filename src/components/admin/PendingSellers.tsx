"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

import {
  getPendingSellers,
  approveSeller,
  rejectSeller,
} from "@/services/seller.service";

export default function PendingSellers() {
  const [sellers, setSellers] =
    useState<any[]>([]);

  const fetchSellers =
    async () => {
      try {
        const res =
          await getPendingSellers();

        setSellers(
          res.data.sellers || []
        );
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
      const fetchSellers =
    async () => {
      try {
        const res =
          await getPendingSellers();

        setSellers(
          res.data.sellers || []
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchSellers();
  }, []);



  const handleApprove =
    async (sellerId: string) => {
      try {
        await approveSeller(
          sellerId
        );

        const res = await getPendingSellers();
        setSellers(res.data.sellers || []);
      } catch (err) {
        console.log(err);
      }
    };

  const handleReject =
    async (sellerId: string) => {
      const reason =
        prompt(
          "Enter rejection reason"
        );

      if (!reason) return;

      try {
        await rejectSeller(
          sellerId,
          reason
        );

        fetchSellers();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <Box>
      <Typography
     
      >
        Pending Sellers
      </Typography>

      <Grid
        container
        spacing={2}
      >
        {sellers.map(
          (seller: any) => (
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
              key={
                seller._id
              }
            >
              <Card>
                <CardContent>
                  <Typography>
                    Shop:
                    {
                      seller.shopName
                    }
                  </Typography>

                  <Typography>
                    Name:
                    {
                      seller
                        .userId
                        ?.name
                    }
                  </Typography>

                  <Typography>
                    Email:
                    {
                      seller
                        .userId
                        ?.email
                    }
                  </Typography>

                  <Box
                    
                  >
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleApprove(
                          seller
                            .userId
                            ._id
                        )
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      color="error"
                      sx={{
                        ml: 2,
                      }}
                      variant="contained"
                      onClick={() =>
                        handleReject(
                          seller
                            .userId
                            ._id
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}