import React, { useState, useEffect, useCallback } from "react";
import { 
  Select, MenuItem, InputLabel, FormControl, TextField, Button, Grid, 
  Typography, Card, CardContent, CircularProgress 
} from "@mui/material";
import { fetchAirport } from "../api/airports";
import { fetchFlights } from "../api/flights";

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "2024-12-15"
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const getAirports = async () => {
      try {
        const airportData = await fetchAirport("new");
        setAirports(airportData.data || []);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };
    getAirports();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const origin = airports.find(a => a.skyId === formData.from);
      const destination = airports.find(a => a.skyId === formData.to);

      if (!origin || !destination) {
        throw new Error("Airport not found");
      }

      const results = await fetchFlights(
        origin.skyId, destination.skyId, origin.entityId, destination.entityId, formData.date
      );
      console.log(results);
      setFlights(results || []);
    } catch (error) {
      console.error("Error during search:", error.message);
    } finally {
      setLoading(false);
    }
  };

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
      <Button 
        variant="contained" color="primary" onClick={handleSearch} 
        disabled={loading} fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Search Flights"}
      </Button>

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
          <Typography variant="body2" color="textSecondary" marginTop="16px">
            No flights found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
