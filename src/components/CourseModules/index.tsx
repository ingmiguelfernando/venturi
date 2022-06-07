import { Typography, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getModulesByCourseId } from "../../features/async-thunks";
import { CustomTabs, CustomTab, TabPanel, a11yProps } from "./CustomTabs";

interface TabsAndPanels {
  tabs: React.ReactNode[];
  panels: React.ReactNode[];
}

export const CourseModules = ({ courseId }: { courseId: string | null }) => {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.selectedCourse.modules);

  const [selectedTab, setSelectedTab] = React.useState(0);

  let tabsAndPanels: TabsAndPanels = {
    tabs: [],
    panels: [],
  };

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (courseId !== null && !modules) {
      (async () => {
        dispatch(getModulesByCourseId(courseId));
      })();
    }
  }, [courseId, dispatch, modules]);

  if (modules && modules.length > 0) {
    modules.forEach((module, index) => {
      tabsAndPanels.tabs.push(
        <CustomTab
          key={index}
          label={<div className="tab-label">{module.name}</div>}
          {...a11yProps(index)}
        />
      );
      tabsAndPanels.panels.push(
        <TabPanel
          key={index}
          value={selectedTab}
          index={index}
          picture={module.imageUrl}
          description={module.description}
          name={module.name}
        />
      );
    });
  }

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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "inline", sm: "flex" },
        }}
      >
        <CustomTabs value={selectedTab} onChange={handleChange}>
          {tabsAndPanels.tabs}
        </CustomTabs>
        <Box
          sx={{
            width: "70%",
            flexGrow: 1,
            display: { xs: "inline", sm: "flex" },
          }}
        >
          {tabsAndPanels.panels}
        </Box>
      </Box>
    </Box>
  );
};
