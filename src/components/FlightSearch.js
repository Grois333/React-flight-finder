import React, { useState, useEffect } from "react"; 
import { 
  Select, MenuItem, InputLabel, FormControl, TextField, Button, Grid, 
  Typography, Card, CardContent, CircularProgress 
} from "@mui/material"; 
import { fetchAirport } from "../api/airports"; // Import function to fetch airport data
import { fetchFlights } from "../api/flights"; // Import function to fetch flight data

const FlightSearch = () => {
  // State to store form data for flight search
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "2024-12-15" // Default date set
  });

  // State to store flight search results
  const [flights, setFlights] = useState([]);

  // State to manage loading state during API calls
  const [loading, setLoading] = useState(false);

  // State to store fetched airport data
  const [airports, setAirports] = useState([]);

  // Fetch airport data when the component mounts
  useEffect(() => {
    const getAirports = async () => {
      try {
        const airportData = await fetchAirport("new"); // API call to fetch airport data
        setAirports(airportData.data || []); // Store airport data in state
      } catch (error) {
        console.error("Error fetching airports:", error); // Handle errors
      }
    };
    getAirports();
  }, []);

  // Function to handle input changes in form fields
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle search button click
  const handleSearch = async () => {
    setLoading(true); // Show loading indicator
    try {
      // Find selected origin and destination airports from fetched airport list
      const origin = airports.find(a => a.skyId === formData.from);
      const destination = airports.find(a => a.skyId === formData.to);

      if (!origin || !destination) {
        throw new Error("Airport not found"); // Error handling for invalid airport selection
      }

      // Fetch flights based on selected airports and date
      const results = await fetchFlights(
        origin.skyId, destination.skyId, origin.entityId, destination.entityId, formData.date
      );

      console.log(results); // Log results to console for debugging
      setFlights(results || []); // Store fetched flight results
    } catch (error) {
      console.error("Error during search:", error.message); // Handle errors
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Function to render dropdown for airport selection
  const renderSelect = (label, name) => (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select label={label} name={name} value={formData[name]} onChange={handleChange}>
        {airports.map(({ skyId }) => (
          <MenuItem key={skyId} value={skyId}>{skyId}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>Flight Search</Typography>

      {/* Form Fields for Flight Search */}
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} sm={4}>{renderSelect("From", "from")}</Grid>
        <Grid item xs={12} sm={4}>{renderSelect("To", "to")}</Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth label="Date" type="date" name="date"
            value={formData.date} onChange={handleChange}
            variant="outlined" InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Search Button */}
      <Button 
        variant="contained" color="primary" onClick={handleSearch} 
        disabled={loading} fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Search Flights"}
      </Button>

      {/* Flight Results Display */}
      <div style={{ marginTop: "24px" }}>
        {flights.length ? (
          flights.map((flight, index) => (
            <Card key={index} style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6">{flight.airline}</Typography>
                <Typography>{flight.departure} → {flight.arrival}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${flight.price}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          // Display message if no flights are found
          <Typography variant="body2" color="textSecondary" marginTop="16px">
            No flights found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
