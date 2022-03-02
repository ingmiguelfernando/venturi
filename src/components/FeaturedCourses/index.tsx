import React from 'react'
import Box from '@mui/material/Box';
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card, Typography, CardActionArea, CardMedia } from '@mui/material';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface FeaturedCourseProps {
    imageUrl: string;
    name: string;
    id: string;
}
function FeaturedCourse({ imageUrl, name, id }: FeaturedCourseProps) {
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => console.log(id)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={imageUrl}
                    alt={name}
                />
            </CardActionArea>
        </Card>
    )
}

export const FeaturedCourses = ({ courses }: { courses: FeaturedCourseProps[] }) => {
    return (
        <Box paddingX={2}>
            <Typography variant="h5" component="h1" color="secondary" paddingBottom={1} >
                Featured
            </Typography>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                slidesPerGroup={4}
                autoplay={true}
                speed={1000}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {courses.map((course) => (
                    <SwiperSlide key={course.id}>
                        <FeaturedCourse imageUrl={course.imageUrl} name={course.name} id={course.id} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}
