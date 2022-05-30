import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../../theme";

export const CourseContent = () => {
  const moduleDescription = "Section 1: Let's Dive in";
  const progress = "11/14";
  const duration = "58 min";

  return (
    <Box>
      <Box bgcolor="background.paper" p={0.5} fontWeight={600}>
        Course Content
      </Box>
      <Divider />
      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ paddingX: 0.5, background: theme.palette.grey[100] }}
          >
            <Box>
              <Typography fontWeight={600}>{moduleDescription}</Typography>
              <Typography fontWeight={200} fontSize={14}>{`${progress} | ${duration}`}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Checkbox />
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
