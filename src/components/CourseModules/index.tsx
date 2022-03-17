import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useModule, Modules } from "../../hooks/useModule";
import { CustomAccordion, CustomAccordionSummary, CustomAccordionDetails } from "./CustomAccordion";
import Image from "next/image";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { lime } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabs, CustomTab } from "./CustomTabs";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const CourseModules = ({ courseId }: { courseId: string | null }) => {
  const theme = useTheme();
  const { getModulesByCourseId } = useModule();
  const [modules, setModules] = useState<Modules[]>([]);
  const [value, setValue] = React.useState(0);
  const upSmScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Box sx={{ backgroundColor: "primary" }}>
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
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "primary",
          display: { xs: "inline", sm: "flex" },
          width: "100%",
        }}
      >
        <CustomTabs value={value} onChange={handleChange}>
          {modules.map((module, index) => (
            <CustomTab
              key={index}
              label={<div className="tab-label">{module.name}</div>}
              {...a11yProps(index)}
            />

            // <CustomAccordion key={index}>
            //   <CustomAccordionSummary>
            //     <BlurOnIcon sx={{ color: lime[900], marginX: 1 }} />
            //     <Typography color="primary.A700">{module.name}</Typography>
            //   </CustomAccordionSummary>
            //   <CustomAccordionDetails>
            //     <picture>
            //       <Image
            //         src={module.imageUrl}
            //         alt={module.name}
            //         blurDataURL={module.imageUrl}
            //         height={60}
            //         width={150}
            //         layout="responsive"
            //         sizes="100vw"
            //         className="rounded-image"
            //       />
            //     </picture>
            //     <Typography variant="body1" component="article" paddingTop={1} color="secondary">
            //       {module.description}
            //     </Typography>
            //   </CustomAccordionDetails>
            // </CustomAccordion>
          ))}
        </CustomTabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </Box>
    </Box>
  );
};
