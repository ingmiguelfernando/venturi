import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../../theme";
import { GroupedSegments, Learn, Module } from "../../../app/types";

export interface CourseContentProps {
  modules: Module[];
  segments: GroupedSegments[];
  learn?: Learn;
}

const isSegmentDone = (moduleId: string, segmentId: string, learn: Learn) => {
  const currentModule = learn?.modules.find((m) => m.moduleId === moduleId);
  const currentSegment = currentModule?.segments.find((s) => s.segmentId === segmentId);
  return currentSegment ? currentSegment.done : false;
};

export const CourseContent = ({ modules, segments, learn }: CourseContentProps) => {
  const moduleDescription = "Section 1: Let's Dive in";
  const progress = "14";
  const duration = "58 min";

  return (
    <Box>
      <Box bgcolor="background.paper" p={0.5} fontWeight={600}>
        Course Content
      </Box>
      <Divider />
      <Box>
        {modules.map((module) => (
          <Accordion key={module.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{ paddingX: 0.5, background: theme.palette.grey[100] }}
            >
              <Box>
                <Typography fontWeight={600}>{module.name}</Typography>
                <Typography
                  fontWeight={200}
                  fontSize={14}
                >{`${segments.length}/${progress} | ${duration}`}</Typography>
              </Box>
            </AccordionSummary>
            {segments
              .find((s) => s.moduleId === module.id)
              ?.segments.map((segment) => (
                <AccordionDetails
                  key={segment.id}
                  sx={{
                    display: "flex",
                    height: "50px",
                    padding: "15px",
                    "&:hover": {
                      background: theme.palette.grey[300],
                    },
                    cursor: "pointer",
                  }}
                >
                  <Checkbox checked={isSegmentDone(module.id, segment.id, learn!)} />
                  <Typography>{segment.name}</Typography>
                </AccordionDetails>
              ))}
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
