import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useModule, Modules } from "../../hooks/useModule";
import { CustomAccordion, CustomAccordionSummary, CustomAccordionDetails } from "./CustomAccordion";
import Image from "next/image";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { lime } from "@mui/material/colors";

export const CourseModules = ({ courseId }: { courseId: string | null }) => {
  const { getModulesByCourseId } = useModule();
  const [modules, setModules] = useState<Modules[]>([]);

  useEffect(() => {
    if (courseId !== null) {
      (async () => {
        const modules = await getModulesByCourseId(courseId);
        if (modules && modules.length > 0) {
          setModules(modules);
        }
      })();
    }
  }, [courseId, getModulesByCourseId]);

  return (
    <Box>
      <Typography
        variant="h6"
        color="white"
        fontWeight={300}
        justifyContent="center"
        display="flex"
        paddingY={1}
      >
        Course Modules
      </Typography>
      {modules.map((module, index) => (
        <CustomAccordion key={index}>
          <CustomAccordionSummary>
            <BlurOnIcon sx={{ color: lime[900], marginX: 1 }} />
            <Typography color="primary.A700">{module.name}</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <picture>
              <Image
                src={module.imageUrl}
                alt={module.name}
                blurDataURL={module.imageUrl}
                height={60}
                width={150}
                layout="responsive"
                sizes="100vw"
                className="rounded-image"
              />
            </picture>
            <Typography variant="body1" component="article" paddingTop={1} color="secondary">
              {module.description}
            </Typography>
          </CustomAccordionDetails>
        </CustomAccordion>
      ))}
    </Box>
  );
};
