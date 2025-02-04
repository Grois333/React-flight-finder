import React from "react";
import FlightSearch from "../components/FlightSearch";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";

const Home = () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ height: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Welcome to Flight Finder
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Search for the best flights, compare prices, and book your next adventure.
          </Typography>
          <FlightSearch />
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
