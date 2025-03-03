"use client";
import React from 'react'
import { Carousel } from "flowbite-react";
import { imageurl } from '../services/API';

const theme = {
    "control": {
        "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    },
    "scrollContainer": {
        "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
    }
}

const ImagesCarousel = ({ array }) => {
    return (
        <div className="w-full h-full">
            {array.length > 0 ?
                <Carousel theme={theme}>
                    {array.map((item, i) => (
                        <img key={i} src={`${imageurl}/carousels/${item.image}`} alt="carousel image" className='w-full h-full object-cover' />
                    ))}
                </Carousel>
                :
                <div className='bg-primary w-full h-full animate-pulse'></div>
            }
        </div>
    )
}

export default ImagesCarousel