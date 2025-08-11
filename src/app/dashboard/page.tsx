"use client";

import { Container, Typography } from "@mui/material";

/**
 * Placeholder dashboard page.
 */
export default function DashboardPage() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>
      <Typography>Signed in successfully.</Typography>
    </Container>
  );
}
