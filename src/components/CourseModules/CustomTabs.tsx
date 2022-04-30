import React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab, { TabProps } from "@mui/material/Tab";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { lime } from "@mui/material/colors";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { EnrolButton } from "../EnrolButton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  picture: string;
  description: string;
  name: string;
}

export const CustomTabs = styled((props: TabsProps) => {
  const theme = useTheme();
  const upSmScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Tabs
      scrollButtons="auto"
      variant="scrollable"
      orientation={upSmScreen ? "vertical" : "horizontal"}
      indicatorColor="secondary"
      sx={{ borderRight: 1, borderColor: () => theme.palette.grey[800] }}
      {...props}
    />
  );
})(({ theme }) => ({
  // border: `1px solid ${theme.palette.grey[600]}`,
  // "&:not(:last-child)": {
  //   borderBottom: 0,
  // },
  // "&:before": {
  //   display: "none",
  // },
  // borderLeft: "none",
  // borderRight: "none",
}));

export const CustomTab = styled((props: TabProps) => (
  <Tab icon={<BlurOnIcon sx={{ color: lime[900], width: "20%" }} />} {...props} />
))(({ theme }) => ({
  flexDirection: "row",
  minWidth: "260px",

  "&>.tab-label": {
    width: "100%",
  },

  "&>.MuiTab-iconWrapper": {
    marginBottom: "0px",
  },

  color: theme.palette.grey[600],
  "&:hover": {
    color: theme.palette.grey[700],
  },

  "&.Mui-selected": {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.grey[900],
    "&:hover": {
      color: theme.palette.grey[400],
    },
  },
}));

export const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};

export const TabPanel = (props: TabPanelProps) => {
  const { value, index, picture, description, name } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
    >
      {value === index && (
        <Box padding={1}>
          <Box position="relative" height="10rem">
            <Image
              src={picture}
              alt={name}
              layout="fill"
              objectFit="cover"
              objectPosition="right center"
            />
          </Box>
          <Typography variant="body1" component="article" paddingTop={1} color="secondary" pb={3}>
            {description}
          </Typography>
          <EnrolButton />
        </Box>
      )}
    </div>
  );
};
