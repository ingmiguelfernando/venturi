import { useState } from "react";
import { SearchAppBar } from "../components/SearchAppBar";
import { CourseList } from "../components/Courses";
import Head from "next/head";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className="w-full"
      {...other}
      style={{ outlineStyle: "none" }}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function getTab(id: number, label: string) {
  return (
    <Tab
      label={label}
      {...a11yProps(id)}
      className="h-16"
      style={{ outlineStyle: "none" }}
    />
  );
}

export default function admin() {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <SearchAppBar />
      <div className="bg-black relative h-screen">
        <Head>
          <title>Venturi</title>
          <link rel="icon" href="/venturi_logo.svg" />
        </Head>
        <Container className="flex w-11/12">
          <Button color="secondary">Add +</Button>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={selectedTab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className="text-white pt-12"
            indicatorColor="primary"
            TabIndicatorProps={{
              style: {
                width: "2px",
                borderRight: `1px solid green`,
              },
            }}
          >
            {getTab(0, "Courses")}
            {getTab(1, "Modules")}
            {getTab(2, "Segments")}
          </Tabs>
          <TabPanel value={selectedTab} index={0}>
            <div className="pl-2">
              <CourseList />
            </div>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            tres
          </TabPanel>
        </Container>
      </div>
    </>
  );
}
