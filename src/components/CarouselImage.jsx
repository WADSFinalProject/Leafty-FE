import React, { useEffect, useState } from "react";
import "../style/CarouselImage.css"
import { motion, useAnimationControls } from "framer-motion";

function CarouselImage({ images, initial, animate, transition }) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    useEffect(() => {
        timeOut = autoPlay && setTimeout(slideRight, 2000);

        return () => clearTimeout(timeOut);
    }, [current, autoPlay]);

    const slideRight = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    const slideLeft = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <motion.div initial={initial}
            animate={animate}
            transition={transition} className={`carousel 2xl:block hidden`} onMouseEnter={() => setAutoPlay(false)} onMouseLeave={() => setAutoPlay(true)}>
            <div className="carousel_wrapper">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel_card ${index === current ? 'carousel_card-active' : ''}`}
                    >
                        <h2 className="card_title">{image.title}</h2>
                        <p className="card_text">{image.text}</p>
                        <img className="card_image" src={image.image} alt="" />
                    </div>
                ))}
            </div>
            <div className="carousel_pagination">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`pagination_dot ${index === current ? 'pagination_dot-active' : ''}`}
                        onClick={() => setCurrent(index)}
                    ></div>
                ))}
            </div>
        </motion.div>
    );
}

export default CarouselImage;