"use client";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

interface Props {
  user: any;
}

export default function ProfileInfo({
  user,
}: Props) {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
        >
          My Profile
        </Typography>

        <Grid
          container
          spacing={2}
        >
          <Grid size={12}>
            <Typography>
              <strong>Name:</strong>{" "}
              {user.name}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography>
              <strong>Email:</strong>{" "}
              {user.email}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Typography>
              <strong>Role:</strong>{" "}
              {user.role}
            </Typography>
          </Grid>

          <Grid size={12}>
            <Chip
              label={user.status}
              color={
                user.status ===
                  "approved" ||
                user.status ===
                  "active"
                  ? "success"
                  : "warning"
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}