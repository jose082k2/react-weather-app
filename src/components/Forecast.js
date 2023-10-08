import React, { useState } from "react";
//material ui package use pannirukom
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from "@mui/material/LinearProgress";
import "./Forecast.css";

function Forecast({ city, forecast: { forecastday } }) {
  const [expanded, setExpanded] = useState(false);
  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="forecastsection">
      Forecast for  {city}
      {forecastday.map((curdateforecast) => {
        //d structure
        const { date, day, hour } = curdateforecast;
        const {
          maxtemp_c,
          mintemp_c,
          daily_chance_of_rain,
          condition: { icon, text },
        } = day;

        return (
            
          <Accordion expanded={expanded === date} onChange={handleChange(date)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={date}
            >
                
              <img src={icon} />
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {date}({text})
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <b>Temp:</b> {mintemp_c}deg to {maxtemp_c}degs
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <b>{daily_chance_of_rain}</b>% of rain possible
              </Typography>
              
            </AccordionSummary>
            
            <AccordionDetails>
              {hour.map((curhourforecast, index) => {
                return (
                  <div className="hourtrack">
                    <b>{index}:00</b>
                    <img src={curhourforecast.condition.icon} />
                    <div className="progress">
                      <LinearProgress
                        variant="determinate"
                        value={(curhourforecast.temp_c * 100) / maxtemp_c}
                      />
                      {curhourforecast.temp_c}deg
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

export default Forecast;
