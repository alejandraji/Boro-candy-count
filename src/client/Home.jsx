import React, { useEffect, useState } from "react";
import { 
  Paper, 
  Container, 
  Stack, 
  Table, 
  TableBody, 
  TableContainer, 
  TableCell, 
  TableHead,
  TableRow, 
  FormControlLabel, 
  RadioGroup, 
  FormControl, 
  FormLabel,
  Radio
} from "@mui/material";
import { Healthcheck } from "./components/Healthcheck";

export function Home() {
  const [rows, setRows] = useState([]);
  const [selectedCandy, setSelectedCandy] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

    const handleOptionChange = (event) => {
      const value = event.target.value
      setSelectedCandy(value);
    };

    const candyList =  [
      'kitkat',
      'peanut m&ms', 
      'milky way',
      'snickers',
      'twizzlers',
      'reeses peanut butter cups',
      'almond joy',
      'nerds', 
      'skittles',
      'twix',
      'mounds',
      'sour patch kids',
      'gummy bears'
    ];

    const renderCandyList = () => (
      <>
        {candyList.map((candy)=> (
          <FormControlLabel
            key={candy}
            value={candy}
            control={<Radio />}
            label={candy}
          />
        ))}
      </>
    )

  return (
    <Container
      maxWidth="lg"
      sx={{ flexGrow: 1, display: "flex" }}
    >
      <Paper elevation={1} sx={{ display: "flex", flexGrow: 1, marginTop:"20px" }}>
        <Stack
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
          mt={2}
        >
          <Stack direction={"column"} alignItems={"center"}>
            <TableContainer component={Paper}>
              <Table aria-label="table">
                <TableHead>
                  <TableRow className="leaderBoard">
                    <TableCell><h2>NYC Borough</h2></TableCell>
                    <TableCell><h2>Total Borough Candy</h2></TableCell>
                    <TableCell><h2>Candy Breakdown</h2></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row.total_candy_collected}</TableCell>
                   {selectedCandy && <TableCell align="center">{row.candy_breakdown[selectedCandy] || 0}</TableCell>}
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} my={3.5}>
            <FormControl>
            <FormLabel className="radio-label heading" align="center"><h3>Top Candy Breakdown</h3></FormLabel>
              <RadioGroup
                sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}
                aria-labelledby="radio-label"
                defaultValue="candy"
                className="options"
                name="radio-buttons-group"
                value={selectedCandy}
                onChange={handleOptionChange}
              >
                {renderCandyList()}
              </RadioGroup>
            </FormControl>  
          </Stack>
          <Healthcheck />
        </Stack>
      </Paper>
    </Container>
  );
}