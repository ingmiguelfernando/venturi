import Head from "next/head";
import Image from "next/image";
import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { Container, Typography } from "@mui/material";
import { FeaturedCourses } from "../components/FeaturedCourses";
import { FeaturedCourseProps } from "../components/FeaturedCourses";


const WELCOME_MESSAGE = "Welcome to the next generation of training";

const FeaturedCoursesData: FeaturedCourseProps[] = [
    {
        imageUrl: "https://s3.amazonaws.com/marquee-test-akiaisur2rgicbmpehea/zxiUQohCQHyefOfibnJV_GCA%20Digital%20Images_Weather.jpg",
        name: "React",
        id: "1"
    },
    {
        imageUrl: "https://www.aviationbusinessnews.com/resources/uploads/2019/12/lighter-version-front-cover.jpg",
        name: "React",
        id: "2"
    },
    {
        imageUrl: "https://aviationweek.com/sites/default/files/styles/crop_freeform/public/gallery_images/5-ThinkstockPhotos-159005317.jpg?itok=tERjj9wT",
        name: "React",
        id: "3"
    },
    {
        imageUrl: "https://marvel-b1-cdn.bc0a.com/f00000000249826/nbaa.org/wp-content/uploads/2018/01/weather-risks.jpg",
        name: "React",
        id: "4"
    },
];

export default function Home() {

    return (
        <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            alignContent="stretch"
            height="100vh"
            wrap="wrap"
            style={{
                backgroundImage: `url('/venturi-a350-cover-3.png')`,
                backgroundSize: 'cover', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'
            }}>
            <Head>
                <title>Venturi</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Grid item xs={0} sm={6}>
                <Box sx={{ p: 2 }}>
                    <Image src="/venturi_logo.png" alt="me" width={320} height={70} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} alignItems="center" height="65vh" display="flex" >
                <Typography variant="h3" component="h1" color="secondary" sx={{ pr: 2 }}>
                    {WELCOME_MESSAGE}
                </Typography>
            </Grid>
            <Grid item xs={12} alignItems="center">
                <FeaturedCourses courses={FeaturedCoursesData} />
            </Grid>
        </Grid>
    );
}
