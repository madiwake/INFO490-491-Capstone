import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
    const [carouselIndex, setCarouselIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };

    return(
        <div className="homePage">
            <NavigationBar pageTitle={'Home'} />
            <div className="body">
                <h1 className="body-title">
                    Welcome to REACH
                </h1>
                <div className="whatIsREACH">
                    <h2 className="whatIsREACH-question">
                        What is REACH?
                    </h2>
                    <h3 className="whatIsREACH-answer">
                        REACH stands for Resource, Education, Accessibility, and Community Hub.
                    </h3>
                </div>
                <div className="body-missionStatement-container">
                    <div className="body-missionStatement-text">
                        <p className="body-missionStatement-text-paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <ul className="body-missionStatement-text-buttetPoints">
                            <li>
                                mission statement
                            </li>
                            <li>
                                talk about how the project started, our motivations, who we are? (kinda like an about page)
                            </li>
                        </ul>
                    </div>
                    <img 
                        src='./img/homePagePicPlaceholder.png'
                        className="body-missionStatement-picture"
                        alt="placeholder"
                    />
                </div>
                <h2 className="body-carouselTitle">
                    What Can You Do With REACH?
                </h2>
                <Carousel 
                    activeIndex={carouselIndex} 
                    onSelect={handleSelect}
                >
                    <Carousel.Item 
                        interval={2000}
                        pause={'hover'}
                    >
                        <img
                            src='./img/carousel-background.png'
                            alt='light blue carousel background'
                        />
                        <Carousel.Caption className="carousel-text">
                            <h3>RESOURCE HUB</h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item 
                        interval={2000}
                        pause={'hover'}
                    >
                        <img
                            src='./img/carousel-background.png'
                            alt='light blue carousel background'
                        />
                        <Carousel.Caption className="carousel-text">
                            <h3>DISCUSSION FORUM</h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item 
                        interval={2000} 
                        pause={'hover'}
                    >
                        <img
                            src='./img/carousel-background.png'
                            alt='light blue carousel background'
                        />
                        <Carousel.Caption className="carousel-text">
                            <h3>FREQUENTLY ASKED QUESTIONS</h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}